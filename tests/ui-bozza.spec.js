import { test, expect } from '@playwright/test';

/**
 * La bozza in corso: a che punto sei, e se c'e' qualcosa da riprendere.
 *
 * `vaiAStep()` non memorizzava il passo raggiunto e `bpHomeResume()` riapriva
 * sempre 'step-setup': chi era arrivato alla lista veniva rispedito all'inizio.
 * E `bpHasInProgress()` guardava solo il menu e il nome dell'evento, quindi chi
 * impostava 120 ospiti e chiudeva l'app non aveva, per l'app, "niente in corso".
 *
 * Servono ricaricamenti veri: a runtime il difetto non si vede.
 */

async function apri(browser) {
  const contesto = await browser.newContext();
  const page = await contesto.newPage();
  await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
  await page.addInitScript(() => {
    localStorage.setItem('bp_onboarded', '1');
    localStorage.setItem('bp_license', JSON.stringify({
      key: 'TEST-TEST-TEST-TEST', instanceId: 'playwright-fixture', lastOk: Date.now(),
    }));
  });
  await page.goto('/index.html', { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.vaiAStep === 'function');
  await page.waitForTimeout(300);
  return { contesto, page };
}

const passoAttivo = (page) => page.evaluate(() => {
  const p = document.querySelector('.step-panel.active');
  return p ? p.dataset.stepid : null;
});

test.describe('Bozza · il passo raggiunto', () => {
  test('riprendere torna dove eri, non all\'inizio', async ({ browser }) => {
    const { contesto, page } = await apri(browser);

    await page.evaluate(() => window.vaiAStep('step-menu'));
    expect(await passoAttivo(page)).toBe('step-menu');

    // Il passo deve essere finito su disco, non solo in memoria.
    await page.waitForFunction(
      () => (JSON.parse(localStorage.getItem('barmanProState_v7') || '{}')).passo === 'step-menu',
      null, { timeout: 4000 });

    await page.reload({ waitUntil: 'load' });
    await page.waitForFunction(() => typeof window.bpHomeResume === 'function');
    await page.waitForTimeout(300);

    await page.evaluate(() => window.bpHomeResume());
    expect(await passoAttivo(page),
      'riprendere ha rispedito al setup invece che al passo raggiunto').toBe('step-menu');

    await contesto.close();
  });

  test('un passo salvato che non esiste piu\' non rompe niente', async ({ browser }) => {
    const contesto = await browser.newContext();
    const page = await contesto.newPage();
    await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
    await page.addInitScript(() => {
      localStorage.setItem('bp_onboarded', '1');
      localStorage.setItem('bp_license', JSON.stringify({ key: 'X', instanceId: 'y', lastOk: Date.now() }));
      // Bozza scritta da una versione con un passo che qui non esiste.
      localStorage.setItem('barmanProState_v7', JSON.stringify({ passo: 'step-inventato' }));
    });
    await page.goto('/index.html', { waitUntil: 'load' });
    await page.waitForFunction(() => typeof window.bpHomeResume === 'function');
    await page.waitForTimeout(300);

    await page.evaluate(() => window.bpHomeResume());
    expect(await passoAttivo(page), 'un passo sconosciuto non e\' stato riportato al default')
      .toBe('step-setup');

    await contesto.close();
  });
});

test.describe('Bozza · c\'e\' qualcosa da riprendere?', () => {
  test('un form intatto non e\' un lavoro in corso', async ({ browser }) => {
    const { contesto, page } = await apri(browser);
    expect(await page.evaluate(() => window.bpHasInProgress())).toBe(false);
    await contesto.close();
  });

  test('cambiare solo il numero di ospiti conta come lavoro in corso', async ({ browser }) => {
    const { contesto, page } = await apri(browser);

    await page.evaluate(() => { document.getElementById('ospiti').value = '120'; });

    expect(await page.evaluate(() => window.bpHasInProgress()),
      'chi imposta gli ospiti e chiude non si vede offrire di riprendere').toBe(true);

    await contesto.close();
  });

  test('cambiare la fascia di prezzo conta anche senza toccare i numeri', async ({ browser }) => {
    const { contesto, page } = await apri(browser);

    await page.evaluate(() => { document.getElementById('sel-fascia').value = 'alta'; });
    expect(await page.evaluate(() => window.bpHasInProgress())).toBe(true);

    await contesto.close();
  });
});
