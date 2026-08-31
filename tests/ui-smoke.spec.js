import { test, expect } from '@playwright/test';
import { openApp } from './helpers.js';

/**
 * Verifica che gli handler `onclick` inline funzionino con app.js caricato
 * in `defer`.
 *
 * I test golden non lo dimostrano: usano `page.evaluate` e chiamano le
 * funzioni direttamente, quindi passerebbero anche se nessun bottone della
 * pagina rispondesse. Qui si clicca davvero.
 *
 * Il rischio e' concreto: nel markup ci sono 79 attributi `onclick="fn()"`,
 * e con `defer` lo script viene eseguito dopo il parsing. Le funzioni devono
 * essere globali e definite prima del primo clic dell'utente — cosa vera in
 * teoria, ma da dimostrare, non da dedurre.
 *
 * Questi test diventeranno ridondanti nella Fase 5, quando gli `onclick`
 * inline verranno sostituiti da event delegation.
 */
test.describe('UI · gli handler inline rispondono con app.js in defer', () => {
  test('le funzioni chiamate dagli onclick sono globali', async ({ page }) => {
    await openApp(page);

    const mancanti = await page.evaluate(() => {
      const nomi = new Set();
      document.querySelectorAll('[onclick]').forEach((el) => {
        const code = el.getAttribute('onclick') || '';
        // Il lookbehind esclude le chiamate di metodo: in
        // `this.classList.toggle('active')` il nome globale non e' `toggle`,
        // ed e' un membro di un oggetto, non di window.
        for (const m of code.matchAll(/(?<![.\w$])([a-zA-Z_$][\w$]*)\s*\(/g)) nomi.add(m[1]);
      });
      const parole = new Set(['if', 'return', 'typeof', 'catch', 'for', 'while', 'switch', 'function']);
      return [...nomi].filter((n) => !parole.has(n) && typeof window[n] !== 'function');
    });

    expect(
      mancanti,
      'funzioni richiamate da onclick= ma non presenti come globali: con defer i bottoni sarebbero inerti',
    ).toEqual([]);
  });

  test('il bottone Home reagisce al clic', async ({ page }) => {
    await openApp(page);

    // Porta l'app fuori dalla home, poi ci torna col bottone.
    await page.evaluate(() => document.body.classList.remove('bp-home'));
    expect(await page.evaluate(() => document.body.classList.contains('bp-home'))).toBe(false);

    await page.locator('#bp-burger').click();

    await expect
      .poll(() => page.evaluate(() => document.body.classList.contains('bp-home')), { timeout: 5000 })
      .toBe(true);
  });

  test('la card "eventi" della home apre il pannello', async ({ page }) => {
    await openApp(page);

    // La home e' costruita da JS e le sue card usano `data-home` con event
    // delegation, non `onclick` inline: e' l'altra meta' del meccanismo, e
    // va verificata anche quella.
    await page.locator('[data-home="events"]').first().click();

    await expect
      .poll(() => page.evaluate(() => document.getElementById('bp-events')?.classList.contains('show')), { timeout: 5000 })
      .toBe(true);
  });

  test('nessun errore JavaScript al caricamento', async ({ page }) => {
    const errori = [];
    page.on('pageerror', (e) => errori.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error') errori.push(m.text()); });

    await openApp(page);
    await page.waitForTimeout(1000);

    // Google Fonts e' bloccato di proposito dalle fixture: i suoi errori di
    // rete non sono difetti dell'app.
    const veri = errori.filter((e) => !/fonts\.(googleapis|gstatic)|net::ERR_FAILED/i.test(e));
    expect(veri, 'errori JavaScript in pagina').toEqual([]);
  });
});
