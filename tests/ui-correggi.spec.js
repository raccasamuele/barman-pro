import { test, expect } from '@playwright/test';
import { openApp } from './helpers.js';

/**
 * "Il tasto Correggi non funziona, non succede proprio niente."
 *
 * Era vero. `bpAlternaModifica()` accendeva la modalita' e poi chiamava
 * `calcolaSpesa(true)`; quando il modello non sa calcolare — menu' vuoto, o
 * ospiti e drink non impostati — `calcolaSpesa` esce prima di ridisegnare e,
 * essendo silenziosa, non dice niente. La classe finiva sul body, la lista non
 * veniva rifatta, i campi non comparivano: a schermo, nulla. Nessun errore in
 * console.
 *
 * ⚠️ Perche' i test non l'avevano visto: preparavano SEMPRE un evento completo
 *    prima di premere. Il difetto vive nel caso in cui non c'e' niente da
 *    correggere — cioe' in quello che capita esplorando l'app la prima volta.
 *    Un caso mai costruito e' un caso mai protetto.
 */

test.describe('Correggi · quando non c\'e\' niente da correggere', () => {

  test('senza menu\' la modalita\' non si accende, e l\'app dice perche\'', async ({ page }) => {
    await openApp(page);

    /* ⚠️ Non si puo' arrivare alla lista SENZA menu': `vaiAStep('risultati')`
       si rifiuta, quindi il bottone non e' nemmeno raggiungibile — verificato,
       e la mia prima ricostruzione del difetto era sbagliata proprio qui.
       La via raggiungibile e' l'altra: si arriva alla lista con un menu', e
       POI lo stato smette di essere calcolabile (si torna indietro e si svuota
       il menu', o si azzerano gli ospiti). Il pannello resta aperto, il
       bottone resta li', e premerlo non faceva niente in silenzio. */
    await page.evaluate(() => {
      const set = (id, v) => {
        const e = document.getElementById(id);
        e.value = String(v);
        e.dispatchEvent(new Event('input', { bubbles: true }));
        e.dispatchEvent(new Event('change', { bubbles: true }));
      };
      set('ospiti', 40);
      set('drink_testa', 3);
      const inp = document.getElementById('search-drink-input');
      // eslint-disable-next-line no-undef
      if (databaseDrink['Negroni']) { inp.value = 'Negroni'; window.aggiungiDrinkSerata(); }
      window.vaiAStep('risultati');
      window.calcolaSpesa(true);

      // ora il menu' si svuota: la lista resta a schermo, il modello non calcola piu'
      // eslint-disable-next-line no-undef
      menuSerataDrink = {};
      // eslint-disable-next-line no-undef
      menuSerataMocktail = {};
      // eslint-disable-next-line no-undef
      menuSerataShot = {};
    });

    const btn = page.locator('#bp-modifica-btn');
    await btn.scrollIntoViewIfNeeded();
    await btn.click();

    // niente modalita' accesa a vuoto...
    await expect(btn).toHaveAttribute('aria-pressed', 'false');
    expect(await page.evaluate(() => document.body.classList.contains('bp-modifica-lista')),
      'la modalita\' si e\' accesa pur non avendo niente da mostrare').toBe(false);

    // ...e soprattutto: qualcosa lo ha detto
    const avviso = await page.evaluate(() => {
      const t = [...document.querySelectorAll('.toast, #toast, [class*="toast"]')]
        .map((e) => (e.textContent || '').trim()).filter(Boolean);
      return t.join(' | ');
    });
    expect(avviso, 'premendo non e\' comparso nessun messaggio: il silenzio era il difetto').not.toBe('');
  });

  test('con un menu\' vero si accende e mostra i campi', async ({ page }) => {
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
      const inp = document.getElementById('search-drink-input');
      // eslint-disable-next-line no-undef
      if (databaseDrink['Negroni']) { inp.value = 'Negroni'; window.aggiungiDrinkSerata(); }
      window.vaiAStep('risultati');
      window.calcolaSpesa(true);
    });

    const btn = page.locator('#bp-modifica-btn');
    await btn.scrollIntoViewIfNeeded();
    await btn.click();

    await expect(btn).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#lista_alcolici li .mod-qta').first()).toBeVisible();
    await expect(page.locator('#lista_alcolici li .mod-scorta').first()).toBeVisible();
  });
});
