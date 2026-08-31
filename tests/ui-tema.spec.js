import { test, expect } from '@playwright/test';
import { openApp } from './helpers.js';

/**
 * Il cambio tema era rimasto muto dopo il nuovo design system.
 *
 * Scriveva `data-theme` su <body>, mentre i token sono definiti su :root —
 * cioe' su <html>. Il pulsante rispondeva, salvava la preferenza, e non
 * cambiava niente a schermo. Nessun test se ne era accorto perche' nessun
 * test guardava i colori.
 */
test.describe('Tema · tre stati e migrazione', () => {
  test('"Chiaro" e "Scuro" cambiano davvero i colori', async ({ page }) => {
    await openApp(page);

    const sfondo = () => page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--bp-bg').trim());

    await page.evaluate(() => window.cambiaTema('light'));
    const chiaro = await sfondo();

    await page.evaluate(() => window.cambiaTema('dark'));
    const scuro = await sfondo();

    expect(chiaro, 'nessun valore per --bp-bg in tema chiaro').toMatch(/oklch/);
    expect(scuro, 'il tema scuro non ha cambiato --bp-bg').not.toBe(chiaro);

    // L'attributo va su <html>: sul body non avrebbe effetto sui token.
    const dove = await page.evaluate(() => ({
      html: document.documentElement.getAttribute('data-theme'),
      body: document.body.getAttribute('data-theme'),
    }));
    expect(dove.html, 'data-theme non e\' su <html>').toBe('dark');
    expect(dove.body, 'il vecchio attributo sul body non e\' stato rimosso').toBeNull();
  });

  test('"Auto" torna a seguire il sistema', async ({ page }) => {
    await openApp(page);

    await page.evaluate(() => window.cambiaTema('dark'));
    expect(await page.evaluate(() => document.documentElement.getAttribute('data-theme'))).toBe('dark');

    await page.evaluate(() => window.cambiaTema('auto'));
    expect(
      await page.evaluate(() => document.documentElement.getAttribute('data-theme')),
      'in "auto" l\'attributo deve sparire, altrimenti prefers-color-scheme non decide piu\' nulla',
    ).toBeNull();
  });

  // Un contesto pulito per ciascun valore: `openApp` scrive a sua volta
  // bp_settings, quindi sovrascriverebbe proprio il valore da verificare.
  for (const [vecchio, atteso] of [['night', 'dark'], ['wedding', 'light']]) {
    test(`il tema salvato "${vecchio}" viene tradotto in "${atteso}"`, async ({ browser }) => {
      const contesto = await browser.newContext();
      const page = await contesto.newPage();

      await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
      await page.addInitScript((t) => {
        localStorage.setItem('bp_settings', JSON.stringify({ lingua: 'it', tema: t, autoSave: false }));
        localStorage.setItem('bp_onboarded', '1');
        localStorage.setItem('bp_license', JSON.stringify({ key: 'X', instanceId: 'y', lastOk: Date.now() }));
      }, vecchio);

      await page.goto('/index.html', { waitUntil: 'load' });
      await page.waitForFunction(() => typeof window.cambiaTema === 'function');
      await page.waitForTimeout(300);

      expect(
        await page.evaluate(() => document.documentElement.getAttribute('data-theme')),
        `chi ha gia' l'app installata ha "${vecchio}" salvato: senza migrazione si ritroverebbe il tema cambiato sotto il naso`,
      ).toBe(atteso);

      await contesto.close();
    });
  }

  test('i tre pulsanti riflettono lo stato attivo', async ({ page }) => {
    await openApp(page);

    for (const scelta of ['light', 'dark', 'auto']) {
      await page.evaluate((s) => window.cambiaTema(s), scelta);
      const attivi = await page.evaluate(() =>
        ['auto', 'light', 'dark'].filter((n) =>
          document.getElementById('theme-btn-' + n)?.classList.contains('active')));
      expect(attivi, `con "${scelta}" deve risultare attivo un solo pulsante`).toEqual([scelta]);
    }
  });
});
