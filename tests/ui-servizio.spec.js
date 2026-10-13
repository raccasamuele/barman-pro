import { test, expect } from '@playwright/test';

/**
 * "Come servi": Bar / ricevimento oppure Festa / disco. Si preme davvero,
 * nella pagina Evento e nel guidato; il valore deve arrivare al calcolo, ai
 * salvataggi e al link.
 */

async function apri(browser) {
  const contesto = await browser.newContext({ locale: 'it-IT' });
  const page = await contesto.newPage();
  await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
  await page.addInitScript(() => localStorage.setItem('bp_onboarded', '1'));
  await page.goto('/index.html', { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.bpServizioScegli === 'function');
  return { contesto, page };
}
const valore = (page) => page.inputValue('#servizio');

test.describe('Servizio · pagina Evento', () => {
  test('premere "Festa / disco" cambia il valore, la nota e la stima, e resta dopo il ricaricamento', async ({ browser }) => {
    const { contesto, page } = await apri(browser);
    await page.evaluate(() => { menuSerataDrink = { 'Gin Tonic': 3, 'Vodka Lemon': 2 }; aggiornaStimaForm(); });
    await page.evaluate(() => window.vaiAStep('step-setup'));
    await expect(page.locator('#stima-live-tot')).not.toHaveText('€ 0');
    const prima = await page.locator('#stima-live-tot').textContent();
    expect(await valore(page)).toBe('bar');

    const festa = page.locator('#bp-servizio-seg [data-arg="festa"]');
    await festa.click();
    expect(await valore(page)).toBe('festa');
    await expect(festa).toHaveAttribute('aria-checked', 'true');
    await expect(page.locator('#bp-servizio-seg [data-arg="bar"]')).toHaveAttribute('aria-checked', 'false');
    await expect(page.locator('#bp-servizio-nota')).toContainText('60 ml');
    await expect(page.locator('#stima-live-tot')).not.toHaveText(prima);

    await page.waitForFunction(
      () => (JSON.parse(localStorage.getItem('barmanProState_v8') || '{}').config || {}).servizio === 'festa',
      null, { timeout: 4000 });
    await page.reload({ waitUntil: 'load' });
    await page.waitForFunction(() => typeof window.bpServizioScegli === 'function');
    expect(await valore(page)).toBe('festa');
    await expect(page.locator('#bp-servizio-seg [data-arg="festa"]')).toHaveClass(/\bon\b/);
    await contesto.close();
  });

  test('il servizio viaggia nell\'evento salvato e nel link', async ({ browser }) => {
    const { contesto, page } = await apri(browser);
    await page.evaluate(() => { menuSerataDrink = { 'Gin Tonic': 3 }; window.vaiAStep('step-setup'); });
    await page.locator('#bp-servizio-seg [data-arg="festa"]').click();
    expect(await page.evaluate(() => bpStatoPerLink().sv)).toBe('festa');
    await page.evaluate(() => window.bpSalvaEvento());
    const ev = await page.evaluate(() => JSON.parse(localStorage.getItem('bp_events_v2'))[0]);
    expect(ev.config.servizio).toBe('festa');
    await contesto.close();
  });

  test('cambiare lingua traduce la nota senza cambiare la scelta', async ({ browser }) => {
    const { contesto, page } = await apri(browser);
    await page.evaluate(() => window.vaiAStep('step-setup'));
    await page.locator('#bp-servizio-seg [data-arg="festa"]').click();
    await page.evaluate(() => window.cambiaLingua('en'));
    await expect(page.locator('#bp-servizio-nota')).toHaveText('Big glass, 60 ml in highballs');
    await expect(page.locator('#bp-servizio-seg [data-arg="festa"]')).toHaveText('Party / club');
    expect(await valore(page)).toBe('festa');
    await contesto.close();
  });
});

test.describe('Servizio · guidato', () => {
  const avanti = (page) => page.locator('#bp-cfg-next').click();
  const seg = (page, v) => page.locator(`[data-cfg-seg="servizio"][data-val="${v}"]`);

  test('il predefinito segue il tipo di evento', async ({ browser }) => {
    const { contesto, page } = await apri(browser);
    for (const [tipo, atteso] of [['matrimonio', 'bar'], ['serata', 'festa'], ['aperitivo', 'bar'], ['compleanno', 'festa'], ['aziendale', 'bar']]) {
      await page.evaluate(() => window.bpCfgStart());
      await page.locator(`[data-cfg-tipo="${tipo}"]`).click();
      await avanti(page);
      await expect(seg(page, atteso), `${tipo} -> ${atteso}`).toHaveAttribute('aria-checked', 'true');
      await page.evaluate(() => window.bpCfgClose());
    }
    await contesto.close();
  });

  test('una scelta fatta a mano resta anche cambiando tipo, e arriva all\'evento', async ({ browser }) => {
    const { contesto, page } = await apri(browser);
    await page.evaluate(() => window.bpCfgStart());
    await page.locator('[data-cfg-tipo="serata"]').click();
    await avanti(page);
    const stimaFesta = await page.locator('#bp-cfg-costo b').textContent();
    await seg(page, 'bar').click();
    await expect(page.locator('#bpc-serv-sub')).toContainText('45 ml');
    await expect(page.locator('#bp-cfg-costo b')).not.toHaveText(stimaFesta);

    await page.locator('#bp-cfg-back').click();
    await page.locator('[data-cfg-tipo="compleanno"]').click();   // sarebbe "festa"
    await avanti(page);
    await expect(seg(page, 'bar')).toHaveAttribute('aria-checked', 'true');

    for (let i = 0; i < 3; i++) await avanti(page);   // fino al riepilogo
    await expect(page.locator('#bp-cfg-mount')).toContainText('Bar / ricevimento');
    await avanti(page);   // Genera la lista
    expect(await valore(page)).toBe('bar');
    await expect(page.locator('#bp-servizio-seg [data-arg="bar"]')).toHaveAttribute('aria-checked', 'true');
    await contesto.close();
  });
});
