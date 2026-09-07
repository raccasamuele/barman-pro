import { test, expect } from '@playwright/test';
import { openApp, calcola, stima, toNumber } from './helpers.js';

/**
 * Il modello canonico della lista.
 *
 * calcolaSpesa() faceva tre lavori in uno — leggeva il form, calcolava, e
 * scriveva il DOM — ritornando un booleano. Non esisteva nessun dato da cui
 * partire, e stimaBudget() e' nata duplicandone la matematica dei costi con un
 * commento che ricordava di tenerle allineate a mano.
 *
 * Qui si verifica che il modello esista davvero come dato, che le sue quantita'
 * rispettino il contratto, e che la formula corretta dopo il Round 3 resti
 * corretta. Quella formula e' gia' stata scritta sbagliata una volta: teneva
 * insieme millilitri e litri e sottraeva le scorte dalla quantita' gia'
 * arrotondata.
 */

const CASO = {
  ospiti: 80, drinkTesta: 3, shotTesta: 1, scarto: 15, pct: 80,
  nazione: 'Italia', fascia: 'media',
  drink: { Negroni: 3, Spritz: 2 },
  mocktail: {}, shot: {},
};

test.describe('Modello · la formula delle quantita\'', () => {
  test('si sottrae prima e si arrotonda dopo', async ({ page }) => {
    await openApp(page);

    // Il caso esatto che la revisione aveva trovato sbagliato: 600 ml
    // richiesti, 200 gia' in casa. Ne restano 400, non 800.
    const q = await page.evaluate(() =>
      window.bpQuantitaRiga(600, 200, window.bpLitriArrotondati));

    expect(q.remainingBaseQty, 'non ha sottratto le scorte dal fabbisogno grezzo').toBe(400);
    expect(q.pricingQty, 'si paga una quantita\' diversa da quella che serve').toBe(400);
    expect(q.roundedPurchaseQty, 'mezzo litro per eccesso su 400 ml').toBe(0.5);
  });

  test('senza scorte il modello e\' quello di sempre', async ({ page }) => {
    await openApp(page);
    const q = await page.evaluate(() =>
      window.bpQuantitaRiga(600, 0, window.bpLitriArrotondati));

    // E' questa identita' che rende i 42 golden invarianti.
    expect(q.pricingQty).toBe(q.requiredBaseQty);
    expect(q.roundedPurchaseQty).toBe(1);
  });

  test('le scorte non fanno mai scendere sotto zero', async ({ page }) => {
    await openApp(page);
    const q = await page.evaluate(() =>
      window.bpQuantitaRiga(300, 1000, window.bpLitriArrotondati));

    expect(q.remainingBaseQty).toBe(0);
    expect(q.pricingQty).toBe(0);
    expect(q.roundedPurchaseQty).toBe(0);
  });
});

test.describe('Modello · il contratto di una riga', () => {
  test('ogni riga con quantita\' rispetta le sue relazioni', async ({ page }) => {
    await openApp(page);

    const righe = await page.evaluate((p) => {
      // eslint-disable-next-line no-undef
      menuSerataDrink = { ...p.drink };
      return window.bpCalcolaModello({ ...p, drink: p.drink }).righe;
    }, CASO);

    expect(righe.length).toBeGreaterThan(0);

    for (const r of righe) {
      expect(r.id, 'riga senza id stabile').toBeTruthy();
      expect(r.gruppo).toBeTruthy();

      if (r.baseUnit === null) {
        // Le guarnizioni non hanno dose: niente quantita', e quindi niente scorte.
        expect(r.requiredBaseQty, `${r.id} senza unita' ma con quantita'`).toBeNull();
        expect(r.stockBaseQty).toBeNull();
        continue;
      }

      expect(r.requiredBaseQty, `${r.id} senza fabbisogno`).toBeGreaterThanOrEqual(0);
      expect(r.remainingBaseQty).toBe(Math.max(0, r.requiredBaseQty - r.stockBaseQty));
      expect(r.pricingQty, `${r.id}: si paga una quantita' diversa da quella che resta`)
        .toBe(r.remainingBaseQty);
      expect(typeof r.unitPrice, `${r.id} senza prezzo unitario`).toBe('number');
      expect(r.costo).toBeGreaterThanOrEqual(0);
    }
  });

  test('gli id sono unici: servono a identificare una riga', async ({ page }) => {
    await openApp(page);
    const ids = await page.evaluate((p) => {
      // eslint-disable-next-line no-undef
      menuSerataDrink = { ...p.drink };
      return window.bpCalcolaModello(p).righe.map((r) => r.id);
    }, CASO);

    expect(new Set(ids).size, `id duplicati: ${ids.join(', ')}`).toBe(ids.length);
  });

  test('il totale e\' la somma dei costi delle righe', async ({ page }) => {
    await openApp(page);
    const { totale, somma } = await page.evaluate((p) => {
      // eslint-disable-next-line no-undef
      menuSerataDrink = { ...p.drink };
      const m = window.bpCalcolaModello(p);
      return { totale: m.totale, somma: m.righe.reduce((s, r) => s + r.costo, 0) };
    }, CASO);

    expect(Math.abs(totale - somma), 'il totale non corrisponde alle righe').toBeLessThan(1e-9);
  });
});

test.describe('Modello · una sola fonte per i totali', () => {
  test('la stima veloce e la lista dicono lo stesso numero', async ({ page }) => {
    await openApp(page);

    // Erano due implementazioni separate della stessa matematica, tenute
    // allineate da un commento. Ora stimaBudget e' una vista sul modello.
    const risultato = await calcola(page, CASO);
    const veloce = await stima(page, CASO);

    expect(toNumber(risultato.budgetAmount)).toBeCloseTo(veloce.totale, 2);
  });

  test('anche quando non c\'e\' niente da calcolare le due concordano', async ({ page }) => {
    await openApp(page);
    const vuoto = { ...CASO, drink: {}, mocktail: {}, shot: {}, drinkTesta: 0, shotTesta: 0 };

    const veloce = await stima(page, vuoto);
    expect(veloce.totale).toBe(0);
    expect(veloce.drinkMostrati).toBe(0);
  });
});
