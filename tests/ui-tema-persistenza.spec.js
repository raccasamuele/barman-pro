import { test, expect } from '@playwright/test';

/**
 * Quello che di un tema si vede solo ricaricando.
 *
 * `ui-tema.spec.js` verifica il comportamento a runtime: chiama `cambiaTema`
 * e guarda subito il risultato. Con quel taglio un bug e' passato inosservato
 * a lungo: `bpSaveSettings` leggeva il tema da
 * `document.body.getAttribute('data-theme')`, ma `bpApplicaTema` quell'attributo
 * lo RIMUOVE dal body (i token stanno su :root). La lettura tornava sempre
 * null, il fallback era la stringa 'night', e cosi' la scelta dell'utente non
 * finiva mai su disco: chi selezionava "Chiaro" se lo ritrovava scuro al
 * riavvio, e il pannello Impostazioni mostrava "Scuro" attivo comunque.
 *
 * Qui si ricarica sempre. E' l'unico modo per accorgersene.
 */

/** Contesto pulito: nessuna preferenza di tema seminata, altrimenti il test
 *  verificherebbe il proprio fixture invece del default dell'app. */
async function apriPulita(browser, opzioni = {}) {
  const contesto = await browser.newContext(opzioni);
  const page = await contesto.newPage();
  await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
  await page.addInitScript(() => {
    localStorage.setItem('bp_onboarded', '1');
    localStorage.setItem('bp_license', JSON.stringify({
      key: 'TEST-TEST-TEST-TEST', instanceId: 'playwright-fixture', lastOk: Date.now(),
    }));
  });
  await page.goto('/index.html', { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.cambiaTema === 'function');
  await page.waitForTimeout(300);
  return { contesto, page };
}

const temaAttivo = (page) =>
  page.evaluate(() => document.documentElement.getAttribute('data-theme'));

test.describe('Tema · cio che sopravvive al ricaricamento', () => {
  test('la scelta finisce su disco e regge il ricaricamento', async ({ browser }) => {
    const { contesto, page } = await apriPulita(browser);

    await page.evaluate(() => window.cambiaTema('dark'));

    const salvato = await page.evaluate(
      () => JSON.parse(localStorage.getItem('bp_settings')).tema);
    expect(salvato, "la scelta non e' arrivata in bp_settings").toBe('dark');

    await page.reload({ waitUntil: 'load' });
    await page.waitForFunction(() => typeof window.cambiaTema === 'function');
    await page.waitForTimeout(300);

    expect(await temaAttivo(page),
      "al ricaricamento il tema scelto e' stato perso").toBe('dark');

    await contesto.close();
  });

  test('anche "Chiaro" viene salvato, non solo lo scuro', async ({ browser }) => {
    // Il vecchio fallback era 'night': un test che provava solo lo scuro
    // sarebbe passato per caso, misurando il bug invece della correzione.
    const { contesto, page } = await apriPulita(browser, { colorScheme: 'dark' });

    await page.evaluate(() => window.cambiaTema('light'));
    await page.reload({ waitUntil: 'load' });
    await page.waitForFunction(() => typeof window.cambiaTema === 'function');
    await page.waitForTimeout(300);

    expect(await temaAttivo(page),
      'con il sistema in scuro, "Chiaro" deve restare la scelta salvata').toBe('light');

    await contesto.close();
  });

  test('senza preferenze si parte dal chiaro, anche col sistema in scuro', async ({ browser }) => {
    const { contesto, page } = await apriPulita(browser, { colorScheme: 'dark' });

    expect(await temaAttivo(page),
      'il default e il chiaro: "Auto" resta a un clic, ma non e il punto di partenza')
      .toBe('light');

    await contesto.close();
  });

  test('il chiaro e gia nel markup, non lo mette il JavaScript', async ({ browser }) => {
    // La CSP vieta gli script inline, quindi non c'e' modo di decidere il tema
    // prima del primo disegno: senza l'attributo statico, chi ha il sistema in
    // scuro vedrebbe un lampo di scuro prima che l'app passi al chiaro.
    const { contesto, page } = await apriPulita(browser, { colorScheme: 'dark' });

    const markup = await page.content();
    expect(markup).toContain('data-theme="light"');

    await contesto.close();
  });

  test('la barra del browser segue il tema, non il sistema', async ({ browser }) => {
    const { contesto, page } = await apriPulita(browser, { colorScheme: 'dark' });

    const colore = () => page.evaluate(() =>
      document.querySelector('meta[name="theme-color"]').getAttribute('content'));

    await page.evaluate(() => window.cambiaTema('light'));
    expect(await colore(),
      'app chiara su sistema scuro: la barra del browser deve restare chiara')
      .toBe('#f5f6f7');

    await page.evaluate(() => window.cambiaTema('dark'));
    expect(await colore()).toBe('#111213');

    await contesto.close();
  });
});
