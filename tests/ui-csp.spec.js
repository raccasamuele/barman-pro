import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HEADERS = fs.readFileSync(path.join(__dirname, '..', 'public', '_headers'), 'utf8');

/** Legge la CSP direttamente da _headers: il test verifica quella vera. */
function cspDaHeaders() {
  const m = HEADERS.match(/^\s*Content-Security-Policy:\s*(.+)$/m);
  if (!m) throw new Error('Content-Security-Policy non trovata in public/_headers');
  return m[1].trim();
}

/**
 * La CSP e' inutile se non viene provata.
 *
 * Il server statico dei test non applica _headers, quindi la policy viene
 * iniettata a mano nella risposta: cosi' si verifica la policy REALE, quella
 * che sara' servita in produzione, e non una sua approssimazione.
 *
 * Serve soprattutto per il futuro: il giorno in cui qualcuno rimette un
 * handler negli attributi, l'app si rompe in produzione e in silenzio.
 * Qui si rompe subito, con il motivo scritto.
 */
test.describe('CSP · la policy reale non rompe l\'app', () => {
  test('nessuna violazione al caricamento e all\'uso', async ({ page }) => {
    const csp = cspDaHeaders();
    const violazioni = [];

    page.on('console', (m) => {
      const t = m.text();
      if (/Content Security Policy|Refused to/i.test(t)) violazioni.push(t);
    });

    // Applica gli header veri a ogni documento servito.
    await page.route('**/*', async (route) => {
      const res = await route.fetch();
      const h = { ...res.headers() };
      if ((h['content-type'] || '').includes('text/html')) {
        h['content-security-policy'] = csp;
      }
      await route.fulfill({ response: res, headers: h });
    });

    await page.addInitScript(() => {
      try {
        localStorage.setItem('bp_settings', JSON.stringify({ lingua: 'it', autoSave: false }));
        localStorage.setItem('bp_onboarded', '1');
      } catch (e) { /* niente storage: il test fallira' in modo visibile */ }
    });

    await page.goto('/index.html', { waitUntil: 'load' });
    await page.waitForFunction(() => typeof window.calcolaSpesa === 'function');

    // Un giro d'uso reale: e' cliccando che si scopre se la policy blocca
    // qualcosa, non stando fermi sulla home.
    await page.locator('#bp-burger').click();
    await page.locator('[data-home="events"]').first().click();
    await page.waitForTimeout(400);

    expect(violazioni, `la CSP blocca qualcosa che serve:\n${violazioni.join('\n')}`).toEqual([]);
  });

  test('la policy vieta davvero gli script inline', () => {
    const csp = cspDaHeaders();
    const scriptSrc = csp.match(/script-src ([^;]+)/);

    expect(scriptSrc, 'script-src non dichiarata').not.toBeNull();
    expect(
      scriptSrc[1],
      'script-src contiene \'unsafe-inline\': la difesa principale contro l\'XSS e\' disattivata',
    ).not.toMatch(/unsafe-inline/);
    expect(
      scriptSrc[1],
      'script-src contiene \'unsafe-eval\'',
    ).not.toMatch(/unsafe-eval/);
  });

  test('le direttive essenziali ci sono tutte', () => {
    const csp = cspDaHeaders();
    for (const d of ['default-src', 'script-src', 'style-src', 'img-src', 'font-src',
      'connect-src', 'object-src', 'base-uri', 'frame-ancestors']) {
      expect(csp, `direttiva mancante: ${d}`).toContain(d);
    }
  });
});
