import { test, expect } from '@playwright/test';

/**
 * La migrazione dalle chiavi vecchie a quelle nuove.
 *
 * E' l'unica parte della Fase 0 che tocca dati gia' sui dispositivi delle
 * persone, quindi e' quella con piu' test.
 *
 * Due cose la rendono necessaria. La prima: la Fase 0 cambia la forma di
 * quello che c'e' sul disco, e scrivendo sulle stesse chiavi basterebbe una
 * scheda ancora aperta sulla versione precedente per riscriverci sopra il
 * formato vecchio — il bump della cache del service worker non chiude i client
 * gia' attivi. La seconda: le ricette dell'utente vivevano in DUE archivi che
 * non si parlavano, `bp_recipes` e i campi `customDrinks`/`customShots` dentro
 * la bozza, ed entrambi si riversavano su databaseDrink all'avvio.
 *
 * La regola non negoziabile: non si butta via il lavoro dell'utente, mai.
 */

const RICETTA_A = [{ nome: 'Gin', ml: 50, tipo: 'alcolico' }];
const RICETTA_B = [{ nome: 'Rum', ml: 60, tipo: 'alcolico' }];

async function apriCon(browser, semi) {
  const contesto = await browser.newContext();
  const page = await contesto.newPage();
  await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
  await page.addInitScript((s) => {
    localStorage.setItem('bp_onboarded', '1');
    localStorage.setItem('bp_license', JSON.stringify({ key: 'X', instanceId: 'y', lastOk: Date.now() }));
    for (const [k, v] of Object.entries(s)) localStorage.setItem(k, JSON.stringify(v));
  }, semi);
  await page.goto('/index.html', { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.bpMigraStorage === 'function');
  await page.waitForTimeout(400);
  return { contesto, page };
}

const leggi = (page, k) => page.evaluate((key) => {
  const raw = localStorage.getItem(key);
  return raw === null ? null : JSON.parse(raw);
}, k);

test.describe('Migrazione · le chiavi', () => {
  test('i dati vecchi arrivano sulle chiavi nuove', async ({ browser }) => {
    const { contesto, page } = await apriCon(browser, {
      bp_events: [{ id: 'ev_1', nome: 'Festa vecchia', data: 1, config: {}, menu: {}, check: {} }],
      bp_settings: { lingua: 'en', tema: 'dark', autosave: 1 },
    });

    const eventi = await leggi(page, 'bp_events_v2');
    expect(eventi, 'gli eventi salvati non sono arrivati sulla chiave nuova').toHaveLength(1);
    expect(eventi[0].nome).toBe('Festa vecchia');

    const set = await leggi(page, 'bp_settings_v2');
    expect(set.lingua).toBe('en');

    await contesto.close();
  });

  test('le chiavi vecchie restano intatte: sono la rete', async ({ browser }) => {
    const { contesto, page } = await apriCon(browser, {
      bp_events: [{ id: 'ev_1', nome: 'Festa vecchia', data: 1, config: {}, menu: {}, check: {} }],
    });

    const vecchi = await leggi(page, 'bp_events');
    expect(vecchi, 'la migrazione ha cancellato la chiave vecchia').not.toBeNull();
    expect(vecchi[0].nome).toBe('Festa vecchia');

    await contesto.close();
  });

  test('e\' idempotente: ricaricare non duplica niente', async ({ browser }) => {
    const { contesto, page } = await apriCon(browser, {
      bp_events: [{ id: 'ev_1', nome: 'Una sola', data: 1, config: {}, menu: {}, check: {} }],
    });

    // Si sporca la chiave nuova: una seconda migrazione la sovrascriverebbe.
    await page.evaluate(() => {
      const l = JSON.parse(localStorage.getItem('bp_events_v2'));
      l[0].nome = 'Rinominata dopo';
      localStorage.setItem('bp_events_v2', JSON.stringify(l));
    });

    await page.reload({ waitUntil: 'load' });
    await page.waitForFunction(() => typeof window.bpMigraStorage === 'function');
    await page.waitForTimeout(400);

    const eventi = await leggi(page, 'bp_events_v2');
    expect(eventi, 'la migrazione ha girato una seconda volta e ha duplicato').toHaveLength(1);
    expect(eventi[0].nome, 'la migrazione ha sovrascritto dati piu\' recenti').toBe('Rinominata dopo');

    await contesto.close();
  });
});

test.describe('Migrazione · i due archivi di ricette', () => {
  test('le ricette della bozza vecchia non si perdono', async ({ browser }) => {
    const { contesto, page } = await apriCon(browser, {
      bp_recipes: { mods: {}, custom: [], amari: ['Amaro del Capo'] },
      barmanProState_v7: { customDrinks: { 'Mio Cocktail': RICETTA_A }, customShots: ['Mirto di zio'] },
    });

    const r = await leggi(page, 'bp_recipes_v2');
    expect(r.mods['Mio Cocktail'], 'una ricetta della bozza vecchia e\' sparita').toEqual(RICETTA_A);
    expect(r.custom).toContain('Mio Cocktail');
    expect(r.amari, 'uno shot della bozza vecchia e\' sparito').toContain('Mirto di zio');
    expect(r.amari, 'gli amari gia\' presenti sono stati persi').toContain('Amaro del Capo');

    await contesto.close();
  });

  test('stesso nome e contenuto diverso: si conservano entrambi', async ({ browser }) => {
    const { contesto, page } = await apriCon(browser, {
      bp_recipes: { mods: { 'Mio Cocktail': RICETTA_A }, custom: ['Mio Cocktail'], amari: [] },
      barmanProState_v7: { customDrinks: { 'Mio Cocktail': RICETTA_B } },
    });

    const r = await leggi(page, 'bp_recipes_v2');

    // Vince bp_recipes con il suo nome...
    expect(r.mods['Mio Cocktail']).toEqual(RICETTA_A);
    // ...ma l'altra versione non si butta: e' comunque lavoro dell'utente.
    expect(r.mods['Mio Cocktail (2)'], 'la ricetta in conflitto e\' stata scartata').toEqual(RICETTA_B);
    expect(r.custom).toContain('Mio Cocktail (2)');

    await contesto.close();
  });

  test('stesso nome e stesso contenuto: nessun doppione inutile', async ({ browser }) => {
    const { contesto, page } = await apriCon(browser, {
      bp_recipes: { mods: { 'Mio Cocktail': RICETTA_A }, custom: ['Mio Cocktail'], amari: [] },
      barmanProState_v7: { customDrinks: { 'Mio Cocktail': RICETTA_A } },
    });

    const r = await leggi(page, 'bp_recipes_v2');
    expect(r.mods['Mio Cocktail (2)'],
      'ha creato una copia di una ricetta identica').toBeUndefined();

    await contesto.close();
  });

  test('la bozza nuova non si porta piu\' dietro le ricette', async ({ browser }) => {
    const { contesto, page } = await apriCon(browser, {
      barmanProState_v7: { customDrinks: { 'Mio Cocktail': RICETTA_A }, customShots: ['Mirto di zio'], passo: 'step-menu' },
    });

    const bozza = await leggi(page, 'barmanProState_v8');
    expect(bozza.customDrinks, 'le ricette sono rimaste anche nella bozza').toBeUndefined();
    expect(bozza.customShots).toBeUndefined();
    // Il resto della bozza passa intatto.
    expect(bozza.passo).toBe('step-menu');

    await contesto.close();
  });

  test('le ricette migrate sono utilizzabili, non solo salvate', async ({ browser }) => {
    const { contesto, page } = await apriCon(browser, {
      barmanProState_v7: { customDrinks: { 'Mio Cocktail': RICETTA_A } },
    });

    // Devono essere finite in databaseDrink, altrimenti il calcolo non le vede.
    const presente = await page.evaluate(() =>
      // eslint-disable-next-line no-undef
      Array.isArray(databaseDrink['Mio Cocktail']));
    expect(presente, 'la ricetta migrata non e\' arrivata nel database usato dal calcolo').toBe(true);

    await contesto.close();
  });
});
