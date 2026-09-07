import { test, expect } from '@playwright/test';
import { openApp } from './helpers.js';

/**
 * La stampa.
 *
 * Il difetto riportato: stampando usciva tutta la pagina invece della sola
 * lista. La causa non erano i nove blocchi @media print sparsi nel foglio —
 * otto servono componenti specifici e le pagine SEO — ma uno solo, che
 * lavorava per SOTTRAZIONE (`footer, .btn-installa { display: none }`). Una
 * blocklist: tutto quello che nessuno ha pensato di nascondere finisce sulla
 * carta, e ogni elemento nuovo dell'app ci finisce da solo.
 *
 * Qui non si contano i blocchi — un test che li conta passa anche se il blocco
 * e' sbagliato, e vieta regole di stampa legittime. Si guarda cosa e'
 * VISIBILE in `media: 'print'`, che e' esattamente il guasto riportato.
 *
 * E si prova lo smontaggio, compreso il percorso in cui `afterprint` non
 * arriva mai: e' il motivo per cui esiste la macchina a stati.
 */

async function conLista(page) {
  await openApp(page);
  await page.evaluate(() => {
    // eslint-disable-next-line no-undef
    menuSerataDrink = { Negroni: 3, Spritz: 2 };
    document.getElementById('ospiti').value = 80;
    window.vaiAStep('risultati');
  });
  await page.waitForTimeout(300);
}

const visibiliInStampa = (page) => page.evaluate(() =>
  [...document.body.children]
    .filter((e) => getComputedStyle(e).display !== 'none')
    .map((e) => e.id || e.tagName.toLowerCase()));

test.describe('Stampa · si stampa solo cio che si e scelto', () => {
  test('con il bersaglio impostato resta solo il foglio', async ({ page }) => {
    await conLista(page);
    await page.emulateMedia({ media: 'print' });
    await page.evaluate(() => window.bpBeginPrint('lista'));

    const visibili = await visibiliInStampa(page);
    expect(visibili, `in stampa e' visibile altro oltre al foglio: ${visibili.join(', ')}`)
      .toEqual(['print-sheet']);
  });

  test('il foglio deve restare figlio diretto del body', async ({ page }) => {
    await conLista(page);
    // Requisito, non dettaglio: l'allowlist e'
    // `body.bp-stampa-lista > *:not(#print-sheet)`. Dentro .container il foglio
    // si nasconderebbe da se' insieme al suo contenitore.
    const padre = await page.evaluate(() =>
      document.getElementById('print-sheet').parentElement.tagName);
    expect(padre).toBe('BODY');
  });

  test('senza bersaglio si stampa la pagina, non un foglio vuoto', async ({ page }) => {
    await conLista(page);
    await page.emulateMedia({ media: 'print' });

    const visibili = await visibiliInStampa(page);
    expect(visibili.length, 'senza bersaglio non dovrebbe restare solo il foglio')
      .toBeGreaterThan(1);
  });

  test('il menu da esporre ha il suo bersaglio, e i due non si mescolano', async ({ page }) => {
    await conLista(page);
    await page.evaluate(() => window.bpBeginPrint('lista'));
    expect(await page.evaluate(() => document.body.className)).toContain('bp-stampa-lista');

    // Impostare un bersaglio azzera SEMPRE il precedente: due classi insieme
    // vorrebbero dire due allowlist in conflitto.
    await page.evaluate(() => window.bpBeginPrint('menu'));
    const cls = await page.evaluate(() => document.body.className);
    expect(cls).toContain('bp-printing-menu');
    expect(cls, 'il bersaglio precedente e\' rimasto attaccato').not.toContain('bp-stampa-lista');
  });
});

test.describe('Stampa · lo smontaggio', () => {
  test('afterprint azzera il bersaglio', async ({ page }) => {
    await conLista(page);
    await page.evaluate(() => {
      window.bpBeginPrint('lista');
      window.dispatchEvent(new Event('afterprint'));
    });
    expect(await page.evaluate(() => document.body.className)).not.toContain('bp-stampa-lista');
  });

  test('se afterprint non arriva mai, ci pensa l\'uscita dal media di stampa', async ({ page }) => {
    await conLista(page);
    // E' il caso di Safari su iOS, e il motivo per cui non basta afterprint.
    // Non si usa un timer cieco: su mobile l'anteprima non e' bloccante e un
    // timeout la smonterebbe mentre sta ancora disegnando.
    await page.evaluate(() => window.bpBeginPrint('lista'));
    expect(await page.evaluate(() => document.body.className)).toContain('bp-stampa-lista');

    // Prima questo test lanciava un evento `focus`: e' una rete di sicurezza
    // DIVERSA, quindi la ricaduta su matchMedia restava non provata. Il
    // secondo tentativo dispacciava 'change' su `window.matchMedia('print')`
    // — e nemmeno quello funzionava: matchMedia restituisce un oggetto NUOVO
    // a ogni chiamata, e l'ascoltatore dell'app sta su quello creato
    // all'avvio. Si dispacciava a un oggetto che non ascoltava nessuno.
    // Qui il media cambia davvero: e' l'unico modo di far scattare
    // l'ascoltatore vero.
    await page.emulateMedia({ media: 'print' });
    await page.emulateMedia({ media: 'screen' });
    await page.waitForTimeout(100);
    expect(await page.evaluate(() => document.body.className),
      'il bersaglio e\' rimasto attaccato e avvelena le stampe successive')
      .not.toContain('bp-stampa-lista');
  });

  test('anche il ritorno di visibilita\' azzera', async ({ page }) => {
    await conLista(page);
    await page.evaluate(() => {
      window.bpBeginPrint('lista');
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect(await page.evaluate(() => document.body.className)).not.toContain('bp-stampa-lista');
  });

  test('Ctrl+P trova il bersaglio giusto anche senza passare dal bottone', async ({ page }) => {
    await conLista(page);
    // beforeprint e' l'unico aggancio che abbiamo su Ctrl+P.
    await page.evaluate(() => window.dispatchEvent(new Event('beforeprint')));

    expect(await page.evaluate(() => document.body.className),
      'con Ctrl+P dalla lista non e\' stato scelto nessun bersaglio')
      .toContain('bp-stampa-lista');
  });

  test('Ctrl+P dalla Home non stampa una lista vecchia', async ({ page }) => {
    await conLista(page);
    await page.evaluate(() => { window.bpVaiA('home'); window.dispatchEvent(new Event('beforeprint')); });

    expect(await page.evaluate(() => document.body.className),
      'ha impostato il bersaglio lista da una sezione che non e\' l\'evento')
      .not.toContain('bp-stampa-lista');
  });
});

test.describe('Stampa · il foglio', () => {
  test('si compone dalle righe canoniche, non rileggendo la pagina', async ({ page }) => {
    await conLista(page);
    await page.evaluate(() => window.bpBeginPrint('lista'));

    const f = await page.evaluate(() => {
      const s = document.getElementById('print-sheet');
      return {
        gruppi: [...s.querySelectorAll('.ps-gruppo-tit')].map((h) => h.textContent),
        voci: s.querySelectorAll('.ps-voce').length,
        caselle: s.querySelectorAll('.ps-box').length,
      };
    });
    expect(f.gruppi.length, 'il foglio non ha reparti').toBeGreaterThan(0);
    expect(f.voci, 'il foglio non ha voci').toBeGreaterThan(0);
    expect(f.caselle, 'la lista da spuntare non ha caselle').toBe(f.voci);
  });

  test('il formato preventivo mostra i prezzi, la lista no', async ({ page }) => {
    await conLista(page);

    const lista = await page.evaluate(() => {
      window.bpBeginPrint('lista');
      const s = document.getElementById('print-sheet');
      return { formato: s.dataset.formato, prezzi: s.querySelectorAll('.ps-tot').length };
    });
    expect(lista.formato).toBe('lista');
    expect(lista.prezzi, 'la lista da spuntare mostra i totali per riga').toBe(0);

    const prev = await page.evaluate(() => {
      window.bpRicordaFormatoStampa('preventivo');
      window.bpBeginPrint('lista');
      const s = document.getElementById('print-sheet');
      return { formato: s.dataset.formato, prezzi: s.querySelectorAll('.ps-tot').length,
               caselle: s.querySelectorAll('.ps-box').length };
    });
    expect(prev.formato).toBe('preventivo');
    expect(prev.prezzi, 'il preventivo non mostra i totali per riga').toBeGreaterThan(0);
    expect(prev.caselle, 'il preventivo ha le caselle da spuntare').toBe(0);
  });

  test('la scelta del formato si ricorda', async ({ page }) => {
    await conLista(page);
    await page.evaluate(() => window.bpRicordaFormatoStampa('preventivo'));

    const salvato = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('bp_settings_v2')).formatoStampa);
    expect(salvato).toBe('preventivo');
  });
});

test.describe('Stampa · le altre pagine non sono state toccate', () => {
  test('privacy resta stampabile', async ({ page }) => {
    await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
    await page.goto('/privacy.html', { waitUntil: 'load' });
    await page.emulateMedia({ media: 'print' });

    const testoVisibile = await page.evaluate(() => document.body.innerText.trim().length);
    expect(testoVisibile, 'la pagina privacy stampa vuota').toBeGreaterThan(200);
  });

  test('una pagina SEO resta stampabile', async ({ page }) => {
    await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
    await page.goto('/quanto-ghiaccio-per-una-festa.html', { waitUntil: 'load' });
    await page.emulateMedia({ media: 'print' });

    const testoVisibile = await page.evaluate(() => document.body.innerText.trim().length);
    expect(testoVisibile, 'la pagina SEO stampa vuota').toBeGreaterThan(200);
  });
});
