import { test, expect } from '@playwright/test';
import { openApp } from './helpers.js';

/**
 * La quantita' corretta a mano.
 *
 * Regole decise con l'utente, e che questi test tengono ferme:
 *  · vuol dire "compra questo": sostituisce il numero e il costo, e su quella
 *    riga la scorta smette di contare;
 *  · sopravvive al ricalcolo — e' un giudizio, non un risultato intermedio;
 *  · si vede sempre, anche a modalita' "Correggi" spenta;
 *  · si annulla, e la riga torna al numero dell'app.
 *
 * ⚠️ Le correzioni si scrivono nei CAMPI, mai assegnando `bpQuantita`:
 *    seminare lo stato salta lo scrittore vero e nasconde proprio i difetti
 *    che questo file dovrebbe trovare.
 */

/** Prepara una lista con qualche riga e apre la modalita' correzione. */
async function listaConCorrezioneAperta(page) {
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
    ['Aperol Spritz', 'Negroni', 'Gin Tonic'].forEach((n) => {
      // eslint-disable-next-line no-undef
      if (databaseDrink[n]) { inp.value = n; window.aggiungiDrinkSerata(); }
    });
    window.vaiAStep('risultati');
    window.calcolaSpesa(true);
  });
  /* ⚠️ Si PREME il bottone, non si chiama `bpAlternaModifica()`.
     La prima stesura chiamava la funzione: cosi' i test dicevano verde anche
     se il bottone fosse stato coperto, disabilitato o scollegato dal
     dispatcher `data-do` — cioe' proprio il modo in cui "Correggi" puo'
     smettere di funzionare per chi lo usa. */
  const btn = page.locator('#bp-modifica-btn');
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  await expect(btn).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#lista_alcolici li .mod-qta').first()).toBeVisible();
}

/** Legge la prima riga alcolici. */
function leggiRiga(page) {
  return page.evaluate(() => {
    const li = document.querySelector('#lista_alcolici li');
    const q = li.querySelector('.mod-qta');
    return {
      quantita: li.querySelector('strong').textContent.trim(),
      marcata: li.querySelector('strong').classList.contains('qta-tua'),
      costo: (li.querySelector('.costo-voce') || {}).textContent || '',
      totale: document.getElementById('budget-amount').textContent.trim(),
      segnaposto: q ? q.placeholder : null,
      haReset: !!li.querySelector('.mod-qta-reset'),
      scortaInerte: !!li.querySelector('.mod-campo-inerte'),
    };
  });
}

/** Scrive un valore nel campo "Da comprare" della prima riga. */
async function scrivi(page, valore) {
  await page.evaluate((v) => {
    const c = document.querySelector('#lista_alcolici li .mod-qta');
    c.value = String(v);
    c.dispatchEvent(new Event('input', { bubbles: true }));
  }, valore);
}

test.describe('Quantita\' corretta a mano', () => {

  test('sostituisce il numero e il costo la segue', async ({ page }) => {
    await listaConCorrezioneAperta(page);
    const prima = await leggiRiga(page);
    expect(prima.marcata, 'la riga risulta corretta prima di correggerla').toBe(false);

    await scrivi(page, 4);
    const dopo = await leggiRiga(page);

    expect(dopo.quantita).toBe('4 L');
    expect(dopo.costo, 'il costo non ha seguito la quantita\'').not.toBe(prima.costo);
    expect(dopo.totale, 'il totale non ha seguito la quantita\'').not.toBe(prima.totale);
  });

  test('si vede: la riga e\' marcata e il campo mostra ancora il valore calcolato', async ({ page }) => {
    await listaConCorrezioneAperta(page);
    const calcolata = (await leggiRiga(page)).quantita;

    await scrivi(page, 4);
    const dopo = await leggiRiga(page);

    expect(dopo.marcata, 'niente dice che quella quantita\' e\' stata decisa a mano').toBe(true);
    expect(dopo.haReset, 'manca il modo di tornare indietro').toBe(true);
    expect(dopo.scortaInerte, '"Ho gia\'" non dichiara di non contare piu\'').toBe(true);
    // il segnaposto continua a dire cosa direbbe l'app
    expect(calcolata).toContain(dopo.segnaposto);
  });

  test('la marcatura resta anche a modalita\' "Correggi" spenta', async ({ page }) => {
    await listaConCorrezioneAperta(page);
    await scrivi(page, 4);
    await page.locator("#bp-modifica-btn").click();   // spegne, premendo

    const li = page.locator('#lista_alcolici li').first();
    await expect(li.locator('.mod-qta')).toHaveCount(0);
    await expect(li.locator('strong')).toHaveClass(/qta-tua/);
    await expect(li.locator('strong')).toHaveText('4 L');
  });

  test('sopravvive al ricalcolo: cambiano gli ospiti, la correzione resta', async ({ page }) => {
    await listaConCorrezioneAperta(page);
    await scrivi(page, 4);

    await page.evaluate(() => {
      const o = document.getElementById('ospiti');
      o.value = '80';
      o.dispatchEvent(new Event('input', { bubbles: true }));
      o.dispatchEvent(new Event('change', { bubbles: true }));
      window.calcolaSpesa(true);
    });

    const dopo = await leggiRiga(page);
    expect(dopo.quantita, 'il ricalcolo ha cancellato la correzione').toBe('4 L');
    expect(dopo.marcata).toBe(true);
    // e il segnaposto ora dice il nuovo valore calcolato, che e' diverso
    expect(dopo.segnaposto).not.toBe('4');
  });

  test('si annulla, e la riga torna al numero dell\'app', async ({ page }) => {
    await listaConCorrezioneAperta(page);
    const prima = await leggiRiga(page);

    await scrivi(page, 4);
    await page.locator('#lista_alcolici li .mod-qta-reset').first().click();

    const dopo = await leggiRiga(page);
    expect(dopo.quantita).toBe(prima.quantita);
    expect(dopo.costo).toBe(prima.costo);
    expect(dopo.totale).toBe(prima.totale);
    expect(dopo.marcata).toBe(false);
    // e la voce e' stata cancellata davvero, non solo svuotata a schermo
    // eslint-disable-next-line no-undef
    expect(await page.evaluate(() => Object.keys(bpQuantita).length)).toBe(0);
  });

  test('zero e\' una correzione valida, e non e\' il campo vuoto', async ({ page }) => {
    await listaConCorrezioneAperta(page);

    await scrivi(page, 0);
    const conZero = await leggiRiga(page);
    expect(conZero.quantita, '"non comprarne" non e\' stato accettato').toBe('0 L');
    expect(conZero.marcata).toBe(true);

    await scrivi(page, '');
    const vuoto = await leggiRiga(page);
    expect(vuoto.marcata, 'svuotare il campo doveva togliere la correzione').toBe(false);
  });

  test('la correzione e\' registrata in unita\' BASE, non in litri (regola R3)', async ({ page }) => {
    await listaConCorrezioneAperta(page);
    await scrivi(page, 4);

    /* Il contratto numerico dice che nella riga non convivono litri e
       millilitri. Scrivere "4" in un campo etichettato litri deve diventare
       4000 nel magazzino, non 4: e' l'errore gia' fatto una volta con
       bpLitriArrotondati. */
    /* `bpQuantita` e' dichiarata con `let` a livello di script: vive nello
       scope lessicale globale e si legge per nome, NON come `window.bpQuantita`
       — che sarebbe `undefined`, e l'asserzione passerebbe leggendo un
       ripiego. Stesso inciampo gia' fatto con `bpScorte` e `bpPilaModali`. */
    const salvato = await page.evaluate(() => {
      const c = document.querySelector('#lista_alcolici li .mod-qta');
      // eslint-disable-next-line no-undef
      return bpQuantita[c.dataset.riga];
    });
    expect(salvato, 'la correzione e\' stata registrata in litri invece che in ml').toBe(4000);
  });

  test('la stima in tempo reale e la lista dicono lo stesso numero', async ({ page }) => {
    await listaConCorrezioneAperta(page);
    await scrivi(page, 4);

    /* Due strade verso lo stesso modello: se una delle due non passa i
       modificatori, il totale in cima e quello della stima divergono. E' un
       difetto che questo progetto ha gia' avuto con le scorte. */
    const { lista, stimato } = await page.evaluate(() => {
      const lista = document.getElementById('budget-amount').textContent.trim();
      // eslint-disable-next-line no-undef
      const s = window.stimaBudget(window.bpParametriDalForm());
      return { lista, stimato: s.totale };
    });

    const n = parseFloat(lista.replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.'));
    expect(Math.abs(n - stimato), `lista ${lista} vs stima ${stimato}`).toBeLessThan(0.01);
  });

  test('sopravvive a un ricaricamento vero, passando dallo scrittore reale', async ({ page }) => {
    await listaConCorrezioneAperta(page);
    await scrivi(page, 4);

    // il salvataggio e' differito: lo si forza come fa l'app
    await page.evaluate(() => window.salvaStato && window.salvaStato());
    await page.reload({ waitUntil: 'load' });
    await page.waitForFunction(() => typeof window.calcolaSpesa === 'function');

    await page.evaluate(() => { window.vaiAStep('risultati'); window.calcolaSpesa(true); });
    const dopo = await leggiRiga(page);
    expect(dopo.quantita, 'la correzione non e\' sopravvissuta al ricaricamento').toBe('4 L');
    expect(dopo.marcata).toBe(true);
  });
});
