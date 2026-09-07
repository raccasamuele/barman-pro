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
      () => (JSON.parse(localStorage.getItem('barmanProState_v8') || '{}')).passo === 'step-menu',
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
      // Chiave VECCHIA di proposito: cosi' il test passa anche dalla migrazione.
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

test.describe("Bozza . quale evento stai modificando", () => {
  test("dopo un ricaricamento il salvataggio aggiorna, non duplica", async ({ browser }) => {
    const { contesto, page } = await apri(browser);

    // bpEditingId viveva solo in memoria. La bozza sopravviveva al
    // ricaricamento, l'id no: si riapriva un evento salvato, si cambiava un
    // numero, il telefono ricaricava la scheda e il salvataggio successivo
    // creava un SECONDO evento con lo stesso nome invece di aggiornare il
    // primo. Il difetto si vede solo con un ricaricamento vero.
    await page.evaluate(() => {
      // eslint-disable-next-line no-undef
      menuSerataDrink = { Negroni: 3 };
      document.getElementById("ospiti").value = 50;
      window.vaiAStep("risultati");
      window.bpSalvaEvento();
    });
    await page.waitForTimeout(300);

    const id = await page.evaluate(() => {
      const ev = window.bpGetEvents()[0];
      window.bpEventEdit(ev.id);        // entra in modifica
      return ev.id;
    });
    await page.waitForTimeout(300);

    // L'id deve essere finito su disco insieme alla bozza.
    await page.waitForFunction(
      (atteso) => (JSON.parse(localStorage.getItem("barmanProState_v8") || "{}")).modifica === atteso,
      id, { timeout: 4000 });

    await page.reload({ waitUntil: "load" });
    await page.waitForFunction(() => typeof window.bpSalvaEvento === "function");
    await page.waitForTimeout(400);

    const dopo = await page.evaluate(() => {
      document.getElementById("ospiti").value = 120;
      window.vaiAStep("risultati");
      window.bpSalvaEvento();
      return window.bpGetEvents();
    });

    expect(dopo.length, "il salvataggio ha creato un doppione invece di aggiornare").toBe(1);
    expect(dopo[0].id, "l'evento aggiornato ha cambiato identita'").toBe(id);
    expect(dopo[0].config.ospiti).toBe("120");

    await contesto.close();
  });

  test("se l'evento e' stato cancellato nel frattempo, si riparte da capo", async ({ browser }) => {
    const { contesto, page } = await apri(browser);
    // Un id che non punta piu' a niente non deve far fallire il salvataggio:
    // ricade su "aggiungi", ed e' giusto cosi'.
    await page.evaluate(() => {
      localStorage.setItem("barmanProState_v8", JSON.stringify({ modifica: "fantasma", config: {} }));
      localStorage.setItem("bp_events_v2", JSON.stringify([]));
    });
    await page.reload({ waitUntil: "load" });
    await page.waitForFunction(() => typeof window.bpSalvaEvento === "function");
    await page.waitForTimeout(400);

    const stato = await page.evaluate(() => {
      // eslint-disable-next-line no-undef
      menuSerataDrink = { Negroni: 3 };
      document.getElementById("ospiti").value = 60;
      window.vaiAStep("risultati");
      window.bpSalvaEvento();
      return window.bpGetEvents().map((e) => e.id);
    });
    expect(stato.length).toBe(1);
    expect(stato[0], "ha riusato l'id di un evento che non esiste piu'").not.toBe("fantasma");

    await contesto.close();
  });
});
