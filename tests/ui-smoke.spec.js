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

  test('il bottone Home reagisce al clic', async ({ page }) => {
    await openApp(page);
    await page.evaluate(() => document.body.classList.remove('bp-home'));

    await page.locator('#bp-burger').click();

    await expect
      .poll(() => page.evaluate(() => document.body.classList.contains('bp-home')), { timeout: 5000 })
      .toBe(true);
  });

  test('la card "eventi" della home apre il pannello', async ({ page }) => {
    await openApp(page);
    await page.locator('[data-home="events"]').first().click();

    await expect
      .poll(() => page.evaluate(() => document.getElementById('bp-events')?.classList.contains('show')), { timeout: 5000 })
      .toBe(true);
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
