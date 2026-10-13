import { test, expect } from '@playwright/test';
import { openApp, apriVoce } from './helpers.js';

/**
 * La disposizione delle righe della lista.
 *
 * Per mesi la griglia della lista e' stata scritta su `.result-section li`
 * mentre `#risultati li` — che ha un id, quindi vince — imponeva
 * `display: flex`. Risultato: `grid-template-columns` e `grid-column: 1 / -1`
 * erano lettera morta, e ne uscivano tre difetti diversi che sembravano
 * scollegati:
 *   · le colonne non si allineavano fra righe;
 *   · il blocco "Correggi" non andava a capo e si infilava come quarta
 *     colonna;
 *   · a schermo stretto il nome veniva schiacciato: "Bitter Campari" occupava
 *     44px di larghezza per 115 di altezza, a capo quasi lettera per lettera.
 *
 * Nessun test guardava la disposizione, quindi nessuno se n'e' accorto. Questi
 * la guardano — e in particolare il primo impedisce che una regola con un id
 * torni a scavalcare quella giusta senza che nessuno lo noti.
 */

async function listaPronta(page) {
  await openApp(page);
  await page.evaluate(() => {
    const set = (id, v) => {
      const e = document.getElementById(id);
      e.value = String(v);
      e.dispatchEvent(new Event('input', { bubbles: true }));
      e.dispatchEvent(new Event('change', { bubbles: true }));
    };
    set('ospiti', 40);
    set('drink_testa', 3);
    ['Aperol Spritz', 'Negroni', 'Gin Tonic'].forEach((n) => {
      // eslint-disable-next-line no-undef
      if (databaseDrink[n]) { window.bpMenuAggiungi(n); }
    });
    window.vaiAStep('risultati');
    window.calcolaSpesa(true);
  });
  await expect(page.locator('#lista_alcolici li').first()).toBeVisible();
}

test.describe('Lista · disposizione delle righe', () => {

  test('la riga e\' una griglia, non un flex', async ({ page }) => {
    await listaPronta(page);
    const display = await page.evaluate(() =>
      getComputedStyle(document.querySelector('#lista_alcolici li')).display);
    expect(display, 'una regola con id ha ripreso il sopravvento su quella della griglia')
      .toBe('grid');
  });

  test('quantita\' e prezzo stanno attaccati a destra, non sparsi', async ({ page }) => {
    await listaPronta(page);
    const g = await page.evaluate(() => {
      const li = document.querySelector('#lista_alcolici li');
      const r = (s) => { const e = li.querySelector(s); return e ? e.getBoundingClientRect() : null; };
      return { li: li.getBoundingClientRect(), qta: r('strong'), costo: r('.costo-voce') };
    });
    const destraLi = g.li.right;
    // il prezzo finisce al margine destro della riga...
    expect(destraLi - g.costo.right).toBeLessThan(24);
    // ...e la quantita' gli sta subito prima, non dall'altra parte
    expect(g.costo.left - g.qta.right).toBeLessThan(40);
  });

  test('le colonne sono allineate fra righe diverse', async ({ page }) => {
    await listaPronta(page);

    /* ⚠️ La prima stesura guardava solo il bordo sinistro del PREZZO, e
       passava anche sul codice rotto: con `space-between` il prezzo e'
       l'ultimo elemento, quindi tocca sempre il margine destro, e i prezzi di
       questo fixture hanno tutti lo stesso numero di cifre — stessa larghezza,
       stesso bordo sinistro. Passava per coincidenza dei dati.
       La QUANTITA' invece sta in mezzo: con space-between la sua posizione
       dipende dalla larghezza del nome accanto, e balla da una riga all'altra.
       E' quella la colonna che distingue una griglia vera da un flex. */
    const bordi = await page.evaluate(() =>
      [...document.querySelectorAll('#lista_alcolici li')].map((li) => ({
        nome: li.querySelector('span').textContent,
        qta: Math.round(li.querySelector('strong').getBoundingClientRect().left),
        costo: (() => { const c = li.querySelector('.costo-voce'); return c ? Math.round(c.getBoundingClientRect().left) : null; })(),
      })).filter((r) => r.costo !== null));

    expect(bordi.length, 'servono almeno due righe per parlare di allineamento').toBeGreaterThan(1);
    // i nomi devono avere lunghezze diverse, altrimenti il test non prova niente
    const lunghezze = new Set(bordi.map((r) => r.nome.length));
    expect(lunghezze.size, 'tutti i nomi hanno la stessa lunghezza: il caso non discrimina').toBeGreaterThan(1);

    expect(new Set(bordi.map((r) => r.qta)).size,
      'le quantita\' partono da ascisse diverse: ' + bordi.map((r) => r.qta).join(', ')).toBe(1);
    expect(new Set(bordi.map((r) => r.costo)).size,
      'i prezzi partono da ascisse diverse: ' + bordi.map((r) => r.costo).join(', ')).toBe(1);
  });

  test.describe('su telefono', () => {
    test.use({ viewport: { width: 375, height: 812 } });

    /* Una voce corretta prende il segno "corretta" accanto al nome: e' il
       caso in cui il nome ha meno spazio, quindi e' quello da misurare. */
    const correggiPrima = async (page) => {
      await apriVoce(page);
      await page.locator('#bp-voce [data-arg="mod-scorta|1"]').click();
      await page.locator('#bp-voce .bp-print-ok').click();
      await expect(page.locator('#lista_alcolici li').first()).toHaveClass(/voce-corretta/);
    };

    test('il nome sta su una riga, non incolonnato lettera per lettera', async ({ page }) => {
      await listaPronta(page);
      await correggiPrima(page);

      const n = await page.evaluate(() => {
        const s = document.querySelector('#lista_alcolici li > span');
        const r = s.getBoundingClientRect();
        return { w: Math.round(r.width), h: Math.round(r.height), testo: s.textContent };
      });
      /* Il difetto vero misurava 44x115. Una riga di testo a questo corpo sta
         sotto i 60px di altezza; e il nome deve poter usare la larghezza. */
      expect(n.h, `"${n.testo}" alto ${n.h}px: sta andando a capo troppe volte`).toBeLessThan(60);
      expect(n.w, `"${n.testo}" largo solo ${n.w}px`).toBeGreaterThan(120);
    });

    test('con una voce corretta non si sovrappone niente', async ({ page }) => {
      await listaPronta(page);
      await correggiPrima(page);

      const sovrapposizioni = await page.evaluate(() => {
        const li = document.querySelector('#lista_alcolici li');
        // solo le foglie: i contenitori si sovrappongono ai figli per definizione
        const foglie = [...li.querySelectorAll('*')].filter((e) => e.children.length === 0);
        const box = foglie.map((e) => ({
          id: e.className || e.tagName.toLowerCase(),
          r: e.getBoundingClientRect(),
        })).filter((b) => b.r.width > 0 && b.r.height > 0);

        const out = [];
        for (let i = 0; i < box.length; i++) {
          for (let j = i + 1; j < box.length; j++) {
            const a = box[i].r, b = box[j].r;
            const dx = Math.min(a.right, b.right) - Math.max(a.left, b.left);
            const dy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
            if (dx > 1 && dy > 1) out.push(box[i].id + ' ∩ ' + box[j].id);
          }
        }
        return out;
      });

      expect(sovrapposizioni, 'elementi sovrapposti: ' + sovrapposizioni.join(' · ')).toEqual([]);
    });

    test('nella scheda ogni etichetta sta accanto al suo campo, dentro lo schermo', async ({ page }) => {
      await listaPronta(page);
      await apriVoce(page);

      const coppie = await page.evaluate(() =>
        [...document.querySelectorAll('#bp-voce-campi .bp-riga')].map((c) => {
          const l = c.querySelector('label').getBoundingClientRect();
          const i = c.querySelector('input').getBoundingClientRect();
          return {
            etichetta: c.querySelector('label').textContent,
            scarto: Math.round(Math.abs((l.top + l.bottom) / 2 - (i.top + i.bottom) / 2)),
            fuori: i.right > window.innerWidth || i.left < 0,
          };
        }));

      expect(coppie.length).toBe(3);
      for (const c of coppie) {
        expect(c.scarto, `"${c.etichetta}" e il suo campo su righe diverse`).toBeLessThan(20);
        expect(c.fuori, `il campo di "${c.etichetta}" esce dallo schermo`).toBe(false);
      }
    });
  });
});
