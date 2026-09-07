import { test, expect } from '@playwright/test';
import { openApp } from './helpers.js';

/**
 * I quattro stili del menu' da esporre.
 *
 * L'utente aveva segnalato che "i colori non vanno bene, spesso non si legge
 * bene la lista". Non era una questione di gusto: era una regressione.
 *
 * Tre stili su quattro prendevano il fondo — o il colore del titolo — da
 * `var(--bp-panel)`, che nel vecchio tema notte era SCURO. Quando il chiaro e'
 * diventato il default quel token e' passato a quasi-bianco, e i testi chiari
 * ci sono rimasti sopra:
 *
 *     Elegante · nome del drink   1.24:1
 *     Lavagna  · nome del drink   1.24:1
 *     Minimal  · titolo           1.09:1
 *
 * Crema su crema. Adesso ogni stile porta il proprio fondo e i propri colori,
 * e questi test lo verificano sui pixel: se qualcuno rimette un token
 * dell'interfaccia li' dentro, il difetto torna e il test lo dice.
 */

const STILI = ['elegant', 'minimal', 'chalk', 'festa'];

/* Contrasto WCAG calcolato sui colori RISOLTI dal browser, non sui valori
   scritti nel foglio: e' l'unico modo per accorgersi se un token cambia. */
async function contrasti(page, stile) {
  return page.evaluate((s) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const x = canvas.getContext('2d', { willReadFrequently: true });
    const rgb = (col) => {
      x.clearRect(0, 0, 1, 1);
      x.fillStyle = '#fff'; x.fillRect(0, 0, 1, 1);
      x.fillStyle = col; x.fillRect(0, 0, 1, 1);
      const d = x.getImageData(0, 0, 1, 1).data;
      return [d[0], d[1], d[2]];
    };
    const lum = (col) => {
      const [r, g, b] = rgb(col).map((v) => {
        v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const cr = (a, b) => {
      const L = [lum(a), lum(b)].sort((p, q) => q - p);
      return (L[0] + 0.05) / (L[1] + 0.05);
    };

    const canv = document.getElementById('bpm-canvas');
    canv.className = 'bpm-canvas bpm-' + s;
    const cs = getComputedStyle(canv);
    const fondo = cs.backgroundColor;

    const leggi = (sel) => {
      const el = canv.querySelector(sel);
      return el ? getComputedStyle(el).color : null;
    };
    return {
      fondo,
      nome: leggi('.bpm-name') ? cr(leggi('.bpm-name'), fondo) : null,
      titolo: leggi('.bpm-title') ? cr(leggi('.bpm-title'), fondo) : null,
      categoria: leggi('.bpm-cat-title') ? cr(leggi('.bpm-cat-title'), fondo) : null,
      data: leggi('.bpm-date') ? cr(leggi('.bpm-date'), fondo) : null,
    };
  }, stile);
}

async function conMenu(page) {
  await openApp(page);
  await page.evaluate(() => {
    // eslint-disable-next-line no-undef
    menuSerataDrink = { Negroni: 3, Spritz: 2 };
    document.getElementById('ospiti').value = 80;
    window.bpMenuOpenFromList();
  });
  await page.waitForTimeout(400);
}

test.describe('Menu da esporre · si legge, in tutti e quattro gli stili', () => {
  for (const stile of STILI) {
    test(`"${stile}": ogni testo sta sopra le soglie`, async ({ page }) => {
      await conMenu(page);
      const c = await contrasti(page, stile);

      // Il nome del drink e' il contenuto: soglia piu' alta.
      expect(c.nome, `"${stile}": nome del drink a ${c.nome?.toFixed(2)}:1`).toBeGreaterThanOrEqual(7);
      // Tutto il resto e' testo, e vale la soglia normale.
      for (const [che, val] of [['titolo', c.titolo], ['categoria', c.categoria], ['data', c.data]]) {
        if (val === null) continue;
        expect(val, `"${stile}": ${che} a ${val.toFixed(2)}:1`).toBeGreaterThanOrEqual(4.5);
      }
    });
  }

  test('nessuno stile dipende piu\' dai token dell\'interfaccia', async ({ page }) => {
    await conMenu(page);

    // E' la causa esatta del difetto: un fondo preso da var(--bp-panel)
    // cambia quando cambia il tema dell'app, e i testi restano dov'erano.
    const fondiPerTema = await page.evaluate((stili) => {
      const canv = document.getElementById('bpm-canvas');
      const out = {};
      for (const s of stili) {
        canv.className = 'bpm-canvas bpm-' + s;
        document.documentElement.setAttribute('data-theme', 'light');
        const chiaro = getComputedStyle(canv).backgroundColor;
        document.documentElement.setAttribute('data-theme', 'dark');
        const scuro = getComputedStyle(canv).backgroundColor;
        out[s] = { chiaro, scuro };
      }
      document.documentElement.setAttribute('data-theme', 'light');
      return out;
    }, STILI);

    for (const s of STILI) {
      expect(fondiPerTema[s].chiaro,
        `lo stile "${s}" cambia fondo con il tema dell'app: e' da li' che veniva il difetto`)
        .toBe(fondiPerTema[s].scuro);
    }
  });

  test('gli stili reggono anche con il tema scuro attivo', async ({ page }) => {
    await conMenu(page);
    await page.evaluate(() => window.cambiaTema('dark'));

    for (const stile of STILI) {
      const c = await contrasti(page, stile);
      expect(c.nome, `"${stile}" in tema scuro: nome a ${c.nome?.toFixed(2)}:1`).toBeGreaterThanOrEqual(7);
    }
  });
});
