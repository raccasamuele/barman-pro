import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { openApp } from './helpers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = (f) => fs.readFileSync(path.join(__dirname, '..', 'public', f), 'utf8');

/**
 * Le azioni passano per event delegation: il markup dichiara COSA fare
 * (`data-do`), non COME farlo. E' la condizione per poter vietare gli script
 * inline nella CSP.
 *
 * Questi test verificano che il meccanismo funzioni davvero, cliccando: un
 * refuso in un `data-do` produce un bottone silenziosamente inerte, che e'
 * il modo peggiore di rompersi.
 */
test.describe('UI · azioni per delega', () => {
  test('nessun handler inline resta nel markup', () => {
    for (const f of ['index.html', 'app.js']) {
      const inline = (pub(f).match(/\son(click|change|input|submit|keydown)=/g) || []);
      expect(inline, `${f} contiene ancora handler inline: ${inline.join(', ')}`).toEqual([]);
    }
  });

  /* Un campo puo' dichiarare piu' azioni separate da spazi. Il dispatcher le
     divideva con /s+/ — la lettera "s", non lo spazio — e per un mese i campi
     a due azioni (Ospiti, Cocktail a persona...) non hanno ne' salvato ne'
     aggiornato la stima, mentre "ricalcolaSeVisibile" diventava due nomi
     inesistenti. Nessun errore visibile: solo un console.warn. */
  test("i campi con piu' azioni le eseguono tutte", async ({ page }) => {
    const avvisi = [];
    page.on('console', (m) => { if (m.type() === 'warning') avvisi.push(m.text()); });
    await openApp(page);

    await page.evaluate(() => {
      for (const sel of ['#ospiti', '#drink_testa', '#ferm_birra', '#sel-fascia', '#sel-nazione', '#sel-fascia-fermentati']) {
        const el = document.querySelector(sel);
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    expect(avvisi.filter((a) => a.includes('azione sconosciuta')), 'azioni non trovate dal dispatcher').toEqual([]);
  });

  test('ogni data-do punta a una funzione che esiste', async ({ page }) => {
    await openApp(page);

    const mancanti = await page.evaluate(() => {
      const nomi = new Set();
      document.querySelectorAll('[data-do]').forEach((el) => nomi.add(el.getAttribute('data-do')));
      return [...nomi].filter((n) => typeof window[n] !== 'function');
    });

    expect(
      mancanti,
      `data-do che non corrispondono a nessuna funzione: i bottoni sarebbero inerti`,
    ).toEqual([]);
  });

  /* Il bottone Home flottante e il menu modale non esistono piu': li ha
     sostituiti la barra. Il difetto che avevano — restare visibili anche
     quando eri gia' li' — spariva solo cambiando meccanismo, e questi test
     sono cambiati con lui. */
  test('la barra riporta alla Home', async ({ page }) => {
    await openApp(page);
    await page.evaluate(() => window.bpVaiA('salvati'));

    await page.locator('.bp-tab[data-sezione="home"]').click();

    await expect
      .poll(() => page.evaluate(() => document.body.dataset.sezione), { timeout: 5000 })
      .toBe('home');
  });

  /* Le quattro card della home (eventi, cocktail, amari, impostazioni) non ci
     sono piu': erano un menu, e adesso quel menu e' la barra. Tenerle avrebbe
     voluto dire due strade per lo stesso posto. */
  test('dalla home si raggiungono i salvati con una voce', async ({ page }) => {
    await openApp(page);
    await page.locator('.bp-tab[data-sezione="salvati"]').click();

    await expect
      .poll(() => page.evaluate(() => document.body.dataset.sezione), { timeout: 5000 })
      .toBe('salvati');
  });

  test('i controlli non nativi rispondono anche da tastiera', async ({ page }) => {
    await openApp(page);

    // Su uno <span role="button"> il tasto Invio non genera un click da solo:
    // prima questi controlli si raggiungevano col Tab ma non si potevano
    // azionare. Il dispatcher ora gestisce Invio e Spazio.
    const risultato = await page.evaluate(() => {
      const el = document.querySelector('[data-toggle]');
      if (!el) return 'nessun elemento con data-toggle';
      const cls = el.getAttribute('data-toggle');
      const prima = el.classList.contains(cls);
      el.focus();
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      return prima === el.classList.contains(cls) ? 'nessun cambiamento' : 'ok';
    });

    expect(risultato, 'Invio su un controllo non nativo non ha avuto effetto').toBe('ok');
  });

  test('nessun errore JavaScript al caricamento', async ({ page }) => {
    const errori = [];
    page.on('pageerror', (e) => errori.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error') errori.push(m.text()); });

    await openApp(page);
    await page.waitForTimeout(800);

    const veri = errori.filter((e) => !/ServiceWorker|net::ERR_FAILED/i.test(e));
    expect(veri, 'errori JavaScript in pagina').toEqual([]);
  });
});

/* Privacy, Licenza e Contatti si comportavano in tre modi diversi: pagina a
   parte, GitHub, mailto: che senza app email non faceva niente. Ora aprono
   lo stesso pannello dentro l'app, dal menu Altro. */
test.describe('UI · pannello Info', () => {
  for (const [voce, titolo] of [['privacy', 'Privacy'], ['licenza', 'Licenza'], ['contatti', 'Contatti']]) {
    test(`Altro apre "${voce}" dentro l'app`, async ({ page }) => {
      await openApp(page);
      await page.evaluate(() => bpVaiA('altro'));
      const url = page.url();
      await page.locator(`#bp-altro [data-arg="${voce}"]`).click();
      await expect(page.locator('#bp-info')).toBeVisible();
      await expect(page.locator('#bp-info-title')).toHaveText(titolo);
      expect(page.url(), 'il link e\' stato seguito invece di aprire il pannello').toBe(url);
    });
  }

  test("Contatti mostra l'indirizzo, senza dipendere da un'app email", async ({ page }) => {
    await openApp(page);
    await page.evaluate(() => bpVaiA('altro'));
    await page.locator('#bp-altro [data-arg="contatti"]').click();
    await expect(page.locator('#bp-info .bp-info-mail')).toContainText('@');
    await expect(page.locator('#bp-info [data-do="bpInfoCopiaMail"]')).toBeVisible();
  });
});
