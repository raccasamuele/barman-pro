import { test, expect } from '@playwright/test';
import { openApp } from './helpers.js';

/**
 * Correzioni del 27 novembre 2026, dopo l'analisi dell'app.
 *
 * - "Crea nuovo evento" entra subito nel guidato: il foglio "Come vuoi
 *   preparare l'evento?" non si chiudeva toccando fuori e per chi usa l'app
 *   una volta sola era un passo in piu'. La creazione manuale resta, come
 *   "Salta" al primo passo.
 * - Litri E bottiglie: accanto ai litri degli alcolici c'e' quante bottiglie
 *   servono nel formato piu' comune.
 * - Numeri, prezzi, paesi e unita' seguono la lingua dell'app.
 */

async function lista(page) {
  await page.evaluate(() => {
    const set = (id, v) => {
      const e = document.getElementById(id);
      e.value = String(v);
      e.dispatchEvent(new Event('input', { bubbles: true }));
      e.dispatchEvent(new Event('change', { bubbles: true }));
    };
    set('ospiti', 40);
    set('drink_testa', 3);
    window.bpMenuAggiungi('Negroni');
    window.vaiAStep('risultati');
    window.calcolaSpesa(true);
  });
  await expect(page.locator('#lista_alcolici li').first()).toBeVisible();
}

test.describe('Nuovo evento · si parte dal guidato', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('dalla Home si apre il guidato, senza il foglio di scelta', async ({ page }) => {
    await openApp(page);
    await page.locator('.bph-hero').click();
    await expect(page.locator('#bp-config')).toBeVisible();
    await expect(page.locator('#bp-welcome')).toBeHidden();
  });

  test('"Salta" porta alla creazione manuale', async ({ page }) => {
    await openApp(page);
    await page.locator('.bph-hero').click();
    await page.locator('#bp-config .bpc-salta').click();
    await expect(page.locator('#bp-config')).toBeHidden();
    await expect(page.locator('#step-setup')).toBeVisible();
  });

  test('"Indietro" al primo passo chiude il guidato invece di riaprire la scelta', async ({ page }) => {
    await openApp(page);
    await page.locator('.bph-hero').click();
    await page.locator('#bp-cfg-back').click();
    await expect(page.locator('#bp-config')).toBeHidden();
    await expect(page.locator('#bp-welcome')).toBeHidden();
  });
});

test.describe('Lista · litri e bottiglie', () => {
  test('accanto ai litri di un alcolico ci sono le bottiglie del formato comune', async ({ page }) => {
    await openApp(page);
    await lista(page);
    const righe = await page.$$eval('#lista_alcolici li strong', els => els.map(e => e.textContent.trim()));
    expect(righe.length).toBeGreaterThan(0);
    for (const r of righe) expect(r).toMatch(/^\d+(,\d+)? L( · \d+ × \d+(,\d+)? L)?$/);
    expect(righe.some(r => r.includes('×'))).toBe(true);
    // Il Bitter Campari si trova da 1 L: niente formato da 0,7 per lui.
    const campari = await page.$$eval('#lista_alcolici li', els => (els.find(e => e.textContent.startsWith('Bitter Campari')) || {}).textContent || '');
    expect(campari).toMatch(/× 1 L|^Bitter Campari1 L≈/);
  });

  test('fra 0,7 e 1 L si sceglie il formato che avanza meno', async ({ page }) => {
    await openApp(page);
    const v = await page.evaluate(() => [1000, 3000, 3500, 1400, 500].map(ml =>
      window.bpSuggerimentoBottiglie({ gruppo: 'alcolici', baseUnit: 'ml', ingrediente: 'Gin', roundedPurchaseQty: ml })));
    // Una bottiglia esatta non ha bisogno del suggerimento: "1 L" basta.
    expect(v).toEqual(['', '3 × 1 L', '5 × 0,7 L', '2 × 0,7 L', '1 × 0,7 L']);
  });

  test('gli analcolici restano in litri', async ({ page }) => {
    await openApp(page);
    await lista(page);
    const righe = await page.$$eval('#lista_analcolici li strong', els => els.map(e => e.textContent.trim()));
    for (const r of righe) expect(r).not.toContain('×');
  });
});

test.describe('Lista · la lingua decide numeri, prezzi e paesi', () => {
  test('in italiano i decimali hanno la virgola anche nei litri', async ({ page }) => {
    await openApp(page);
    await lista(page);
    const testo = await page.locator('#risultati').textContent();
    expect(testo).not.toMatch(/\d\.\d L/);
  });

  test('in inglese: punto decimale, paese tradotto, "pcs" e niente "tier medium"', async ({ page }) => {
    await openApp(page, { locale: 'en' });
    await lista(page);
    const sub = await page.locator('#budget-sub').textContent();
    expect(sub).toBe('Italy · medium prices');
    const tot = await page.locator('#budget-amount').textContent();
    expect(tot).toMatch(/^€ [\d,]+\.\d\d$/);
    const extra = await page.locator('#lista_extra').textContent();
    expect(extra).toContain('pcs');
    expect(extra).not.toMatch(/\bpz\b/);
    const paesi = await page.$$eval('#sel-nazione option', os => os.map(o => o.textContent));
    expect(paesi).toContain('Belgium');
    expect(paesi).not.toContain('Belgio');
    // Il valore salvato resta il nome italiano: eventi, link e backup non cambiano.
    expect(await page.locator('#sel-nazione').inputValue()).toBe('Italia');
  });

  test('i costi salvati si rileggono in entrambi i formati', async ({ page }) => {
    await openApp(page);
    const v = await page.evaluate(() => [
      window._bpParseCost('≈ € 1.234,50'), window._bpParseCost('≈ € 1,234.50'),
      window._bpParseCost('€ 15,00'), window._bpParseCost('€ 15.00'), window._bpParseCost('€ 1.000'),
    ]);
    expect(v).toEqual([1234.5, 1234.5, 15, 15, 1000]);
  });
});
