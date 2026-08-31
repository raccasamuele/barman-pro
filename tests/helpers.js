import { expect } from '@playwright/test';

export const LEMON_HOST = 'api.lemonsqueezy.com';

/**
 * Prepara una pagina in cui l'app parte senza gate licenza e senza rete.
 *
 * Serve finche' il gate esiste (fino alla Fase 2). `window.onload` esegue
 * `await bpLicense.check()`: senza questo setup l'overlay di attivazione
 * copre l'app e i test dipenderebbero da un servizio esterno.
 *
 * `check()` ritorna true senza chiamate di rete se `lastOk` e' recente,
 * quindi seminare lo storage e' sufficiente. Il route-block resta come
 * seconda rete: se un giorno qualcuno chiama Lemon Squeezy da un altro
 * punto, il test lo scopre invece di subirlo.
 */
export async function openApp(page, { locale = 'it' } = {}) {
  const lemonRequests = [];

  await page.route(`**://${LEMON_HOST}/**`, (route) => {
    lemonRequests.push(route.request().url());
    return route.abort();
  });

  await page.addInitScript(({ lang }) => {
    try {
      localStorage.setItem('bp_license', JSON.stringify({
        key: 'TEST-TEST-TEST-TEST',
        instanceId: 'playwright-fixture',
        lastOk: Date.now(),
        lastTry: Date.now(),
      }));
      localStorage.setItem('bp_settings', JSON.stringify({ lingua: lang, tema: 'night', autoSave: false }));
      localStorage.setItem('bp_onboarded', '1');
    } catch (e) { /* storage non disponibile: il test fallira' piu' avanti, in modo visibile */ }
  }, { lang: locale });

  await page.goto('/index.html', { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.calcolaSpesa === 'function');

  return {
    /**
     * NB: l'asserzione e' ristretta a Lemon Squeezy, non a "nessuna richiesta
     * esterna". Fino alla Fase 4 l'app carica ancora Google Fonts da CDN, quindi
     * un'asserzione generica fallirebbe sempre. Il test "zero origini non
     * autorizzate" arriva dopo la rimozione di Google Fonts.
     */
    assertNoLicenseCalls() {
      expect(lemonRequests, `chiamate a ${LEMON_HOST}: ${lemonRequests.join(', ')}`).toEqual([]);
    },
  };
}

/**
 * Imposta uno stato di calcolo deterministico e invoca la funzione REALE.
 *
 * Il menu vive in tre globali (`menuSerataDrink`, `menuSerataMocktail`,
 * `menuSerataShot`): mappe nome -> peso. Impostarle direttamente evita di
 * dipendere dall'interfaccia, che nella Fase 5 verra' riscritta: cosi' il
 * golden misura il motore di calcolo e non il markup.
 */
export async function calcola(page, params) {
  return page.evaluate((p) => {
    const setVal = (id, v) => {
      const el = document.getElementById(id);
      if (!el) throw new Error(`campo mancante: #${id}`);
      el.value = String(v);
    };

    setVal('ospiti', p.ospiti);
    setVal('drink_testa', p.drinkTesta);
    setVal('shot_testa', p.shotTesta);
    setVal('scarto', p.scarto);
    if (p.pct != null) setVal('pct-bevitori', p.pct);

    // Fascia di prezzo e paese entrano nel calcolo (indiciGeo): vanno fissati
    // esplicitamente, altrimenti il golden dipende dai default del markup —
    // che nella Fase 5 verranno riscritti.
    setVal('sel-nazione', p.nazione ?? 'Italia');
    setVal('sel-fascia', p.fascia ?? 'media');
    const ff = document.getElementById('sel-fascia-fermentati');
    if (ff) ff.value = p.fasciaFerm ?? p.fascia ?? 'media';

    // NB: assegnazione SENZA `window.`. `menuSerataDrink` & co. sono dichiarate
    // con `let` a livello di script, quindi vivono nel global lexical scope e
    // NON sono proprieta' di window: `window.menuSerataDrink = x` creerebbe una
    // variabile diversa, che calcolaSpesa non legge mai.
    // eslint-disable-next-line no-undef
    menuSerataDrink = { ...(p.drink || {}) };
    // eslint-disable-next-line no-undef
    menuSerataMocktail = { ...(p.mocktail || {}) };
    // eslint-disable-next-line no-undef
    menuSerataShot = { ...(p.shot || {}) };

    const ok = window.calcolaSpesa(true);

    const txt = (id) => (document.getElementById(id)?.textContent || '').trim();

    // Righe della lista della spesa: quantita' per ingrediente.
    const righe = [...document.querySelectorAll('#risultati .lista-item, #risultati li')]
      .map((el) => el.textContent.replace(/\s+/g, ' ').trim())
      .filter(Boolean);

    return {
      ok,
      budgetAmount: txt('budget-amount'),
      perPersona: txt('budget-perperson'),
      righeCount: righe.length,
      righe,
    };
  }, params);
}

/**
 * Invoca `stimaBudget` sugli stessi input.
 *
 * Va confrontata con `calcolaSpesa` in ogni caso: sono due implementazioni
 * separate dello stesso modello di costo e devono coincidere. E' un debito
 * noto del progetto — questo test non lo paga, lo rende visibile.
 */
export async function stima(page, params) {
  return page.evaluate((p) => {
    return window.stimaBudget({
      ospiti: p.ospiti,
      drinkTesta: p.drinkTesta,
      shotTesta: p.shotTesta,
      scarto: p.scarto,
      pct: p.pct,
      nazione: p.nazione ?? 'Italia',
      fascia: p.fascia ?? 'media',
      fasciaFerm: p.fasciaFerm ?? p.fascia ?? 'media',
      drink: p.drink || {},
      mocktail: p.mocktail || {},
      shot: p.shot || {},
    });
  }, params);
}

/** Estrae il totale numerico da una stringa "€ 1.544,00". */
export function toNumber(euro) {
  const m = String(euro).replace(/[^\d.,]/g, '').replace(/\./g, '').replace(',', '.');
  return Number.parseFloat(m);
}
