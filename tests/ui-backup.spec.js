import { test, expect } from '@playwright/test';
import { openApp } from './helpers.js';

/**
 * Esporta e importa.
 *
 * Nasce da una domanda dell'utente: "ha senso un database con account per
 * ritrovare sempre i propri eventi?". Il problema era vero — localStorage e'
 * legato all'origine e sparisce con una pulizia del browser, e chi prepara la
 * lista sul portatile la usa poi sul telefono — ma la risposta scelta e' un
 * file, non un account.
 *
 * La parte delicata non e' leggere un JSON: e' scrivere CINQUE chiavi senza
 * lasciare mai lo stato a meta'. Da qui staging per transazione, prenotazione
 * dello spazio, marcatore di commit e recupero all'avvio — e i test che
 * seguono provano proprio i momenti in cui le cose si rompono.
 */

const semina = (page, dati) => page.addInitScript((d) => {
  localStorage.setItem('bp_onboarded', '1');
  localStorage.setItem('bp_license', JSON.stringify({ key: 'X', instanceId: 'y', lastOk: Date.now() }));
  for (const [k, v] of Object.entries(d)) localStorage.setItem(k, JSON.stringify(v));
}, dati);

const EV = (id, nome) => ({ id, nome, data: 1, config: {}, menu: {}, lista: [], check: {}, scorte: {} });

const pacchetto = (dati) => ({ app: 'barman-pro', versione: 1, esportatoIl: '2026-09-07T00:00:00Z', dati });

async function importa(page, contenuto, modalita = 'unione') {
  return page.evaluate(async ({ c, m }) => {
    const file = new File([JSON.stringify(c)], 'backup.json', { type: 'application/json' });
    return window.bpImportaFile(file, m);
  }, { c: contenuto, m: modalita });
}

test.describe('Backup · il manifest', () => {
  test('esporta le chiavi giuste e non quelle di questo dispositivo', async ({ page }) => {
    // Su un'app vuota quegli store non esistono ancora, e non esportarli e'
    // corretto: il manifest si prova su un'app che ha davvero dei dati.
    await semina(page, {
      bp_events_v2: [EV('ev_1', 'Uno')],
      bp_recipes_v2: { mods: {}, custom: [], amari: ['Amaro'] },
      bp_settings_v2: { lingua: 'it' },
      bp_menu_style: 'minimal',
      barmanProState_v8: { passo: 'step-setup' },
      // Da quando il parcheggio esiste contiene una bozza intera che si
      // puo' ancora riprendere: se un backup non la porta con se', la
      // perde in silenzio.
      bp_bozza_parcheggiata: { nome: 'Messa da parte', parcheggiataIl: 1 },
    });
    await openApp(page);
    const dati = await page.evaluate(() => {
      let catturato = null;
      const vero = URL.createObjectURL;
      URL.createObjectURL = (blob) => { catturato = blob; return 'blob:finto'; };
      const veroClick = HTMLAnchorElement.prototype.click;
      HTMLAnchorElement.prototype.click = function () {};
      window.bpEsportaTutto();
      URL.createObjectURL = vero;
      HTMLAnchorElement.prototype.click = veroClick;
      return catturato ? catturato.text() : null;
    });

    const p = JSON.parse(dati);
    expect(p.app).toBe('barman-pro');
    expect(p.versione).toBe(1);
    // Il test guardava solo le esclusioni, e cosi' non si era accorto che
    // bp_menu_style non veniva esportato affatto. NB: qui gli store sono
    // seminati gia' serializzati, quindi questo test prova il MANIFEST e non
    // il codec di scrittura — ed e' per questo che non aveva visto il difetto.
    // Il codec e' provato dal test che segue, che passa dallo scrittore vero.
    for (const atteso of ['eventi', 'ricette', 'impostazioni', 'stileMenu', 'bozza', 'bozzaParcheggiata']) {
      expect(Object.keys(p.dati), `lo store "${atteso}" non e' nel backup`).toContain(atteso);
    }
    // bp_onboarded e' stato di QUESTO dispositivo, non un dato dell'utente.
    expect(Object.keys(p.dati)).not.toContain('bp_onboarded');
    // Le chiavi legacy sono solo sorgenti di migrazione: esportarle
    // rimetterebbe in circolo dati morti.
    expect(JSON.stringify(p.dati)).not.toContain('barmanProState_v7');
  });
});

test.describe('Backup · cosa rifiuta', () => {
  test('un file che non e\' nostro', async ({ page }) => {
    await openApp(page);
    page.on('dialog', (d) => d.accept());
    const r = await importa(page, { qualcosa: 'altro' });
    expect(r.ok).toBe(false);
    expect(r.motivo).toBe('non-nostro');
  });

  test('una versione piu\' recente di quella che conosciamo', async ({ page }) => {
    await openApp(page);
    page.on('dialog', (d) => d.accept());
    // Non si indovina un formato futuro: si rifiuta e lo si dice.
    const r = await importa(page, { app: 'barman-pro', versione: 99, dati: {} });
    expect(r.ok).toBe(false);
    expect(r.motivo).toBe('versione-futura');
  });

  test('una versione assente o corrotta', async ({ page }) => {
    await openApp(page);
    page.on('dialog', (d) => d.accept());
    for (const v of [undefined, 'due', 0, null]) {
      const r = await importa(page, { app: 'barman-pro', versione: v, dati: {} });
      expect(r.ok, `versione "${v}" accettata`).toBe(false);
    }
  });

  test('un annidamento ostile non manda in overflow il controllo', async ({ page }) => {
    await openApp(page);
    page.on('dialog', (d) => d.accept());

    // La validazione e' iterativa apposta: una ricorsiva andrebbe in
    // overflow proprio sul dato da cui deve difendere.
    const r = await page.evaluate(async () => {
      let v = 'fondo';
      for (let i = 0; i < 500; i++) v = { dentro: v };
      const file = new File([JSON.stringify({ app: 'barman-pro', versione: 1, dati: { eventi: v } })],
        'b.json', { type: 'application/json' });
      return window.bpImportaFile(file, 'unione');
    });
    expect(r.ok).toBe(false);
    expect(r.motivo).toBe('validazione');
  });

  test("una chiave __proto__ resta una chiave, non un'istruzione", async ({ page }) => {
    await openApp(page);
    page.on("dialog", (d) => d.accept());

    // Attenzione: scrivere __proto__ dentro un letterale NON crea una
    // proprieta' enumerabile, cambia il prototipo di quell'oggetto — e
    // JSON.stringify non la mette mai nel file. Il test di prima faceva
    // cosi' e non provava niente: qui la chiave si scrive nel JSON a mano.
    const inquinato = await page.evaluate(async () => {
      const json = '{"app":"barman-pro","versione":1,"dati":{"eventi":[{"id":"x","__proto__":{"avvelenato":true}}]}}';
      const file = new File([json], "b.json", { type: "application/json" });
      await window.bpImportaFile(file, "unione");
      return { suOggetto: ({}).avvelenato, suArray: [].avvelenato };
    });
    expect(inquinato.suOggetto, "un oggetto qualunque e' stato avvelenato dal file").toBeUndefined();
    expect(inquinato.suArray).toBeUndefined();
  });
});

test.describe('Backup · unione e sostituzione', () => {
  test('in unione gli eventi si aggiungono, non si sovrascrivono', async ({ page }) => {
    await semina(page, { bp_events_v2: [EV('ev_mio', 'Il mio')] });
    await openApp(page);

    const r = await importa(page, pacchetto({ eventi: [EV('ev_tuo', 'Il tuo')] }), 'unione');
    expect(r.ok).toBe(true);

    const nomi = await page.evaluate(() => window.bpGetEvents().map((e) => e.nome));
    expect(nomi).toContain('Il mio');
    expect(nomi).toContain('Il tuo');
  });

  test('un id in collisione prende un id nuovo, e nessuno dei due si perde', async ({ page }) => {
    await semina(page, { bp_events_v2: [EV('stesso', 'Il mio')] });
    await openApp(page);

    await importa(page, pacchetto({ eventi: [EV('stesso', 'Il tuo')] }), 'unione');

    const ev = await page.evaluate(() => window.bpGetEvents());
    expect(ev, 'un evento e\' stato sovrascritto').toHaveLength(2);
    expect(new Set(ev.map((e) => e.id)).size, 'due eventi hanno lo stesso id').toBe(2);
  });

  test('in unione le mie impostazioni restano le mie', async ({ page }) => {
    await semina(page, { bp_settings_v2: { lingua: 'it', tema: 'dark' } });
    await openApp(page);

    await importa(page, pacchetto({ impostazioni: { lingua: 'de', tema: 'light' } }), 'unione');

    const s = await page.evaluate(() => JSON.parse(localStorage.getItem('bp_settings_v2')));
    expect(s.lingua, 'l\'import in unione ha cambiato le impostazioni').toBe('it');
  });

  test('in sostituisci le impostazioni arrivano dal file', async ({ page }) => {
    await semina(page, { bp_settings_v2: { lingua: 'it', tema: 'dark' } });
    await openApp(page);

    await importa(page, pacchetto({ impostazioni: { lingua: 'de', tema: 'light' } }), 'sostituisci');

    const s = await page.evaluate(() => JSON.parse(localStorage.getItem('bp_settings_v2')));
    expect(s.lingua).toBe('de');
  });

  test('ricette in conflitto: si conservano entrambe', async ({ page }) => {
    const A = [{ nome: 'Gin', ml: 50, tipo: 'alcolico' }];
    const B = [{ nome: 'Rum', ml: 60, tipo: 'alcolico' }];
    await semina(page, { bp_recipes_v2: { mods: { Mio: A }, custom: ['Mio'], amari: [] } });
    await openApp(page);

    await importa(page, pacchetto({ ricette: { mods: { Mio: B }, custom: ['Mio'], amari: [] } }), 'unione');

    const r = await page.evaluate(() => JSON.parse(localStorage.getItem('bp_recipes_v2')));
    expect(r.mods.Mio, 'la mia ricetta e\' stata sovrascritta').toEqual(A);
    expect(r.mods['Mio (2)'], 'la ricetta importata in conflitto e\' stata scartata').toEqual(B);
  });
});

test.describe('Backup · la transazione', () => {
  test('un import riuscito non lascia staging in giro', async ({ page }) => {
    await openApp(page);
    await importa(page, pacchetto({ eventi: [EV('ev_1', 'Uno')] }), 'unione');

    const residui = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.indexOf('bp_import_') === 0));
    expect(residui, `staging rimasto: ${residui.join(', ')}`).toEqual([]);
  });

  test('un crash prima del marcatore non lascia quota persa', async ({ page }) => {
    // E' il caso che il protocollo copre con lo staging PER TRANSAZIONE: senza
    // marcatore non c'e' niente da completare, e quei valori resterebbero li'
    // a occupare spazio senza che nessuno sappia spiegare perche'.
    await page.addInitScript(() => {
      localStorage.setItem('bp_onboarded', '1');
      localStorage.setItem('bp_license', JSON.stringify({ key: 'X', instanceId: 'y', lastOk: Date.now() }));
      localStorage.setItem('bp_import_abc123__bp_events_v2', JSON.stringify([{ id: 'orfano' }]));
    });
    await openApp(page);

    const residui = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.indexOf('bp_import_') === 0));
    expect(residui, 'lo staging orfano non e\' stato spazzato all\'avvio').toEqual([]);
  });

  test('un crash dopo il marcatore viene completato all\'avvio', async ({ page }) => {
    // Dopo il marcatore si puo' solo completare: e' l'unico modo di uscirne
    // senza copie dei valori vecchi.
    await page.addInitScript(() => {
      localStorage.setItem('bp_onboarded', '1');
      localStorage.setItem('bp_license', JSON.stringify({ key: 'X', instanceId: 'y', lastOk: Date.now() }));
      localStorage.setItem('bp_import_t1__bp_events_v2', JSON.stringify([{ id: 'ev_recuperato', nome: 'Recuperato', data: 1, config: {}, menu: {}, check: {} }]));
      // fase "commit": qualche chiave viva puo' essere gia' cambiata, quindi
      // si puo' solo completare. In fase "preparazione" nessuna chiave viva e'
      // stata toccata e si butta via tutto senza perdere niente.
      localStorage.setItem('bp_import_lock', JSON.stringify({ transazione: 't1', fase: 'commit', chiavi: ['bp_events_v2'] }));
    });
    await openApp(page);

    const s = await page.evaluate(() => ({
      eventi: window.bpGetEvents().map((e) => e.nome),
      marcatore: localStorage.getItem('bp_import_lock'),
      staging: Object.keys(localStorage).filter((k) => k.indexOf('bp_import_') === 0),
    }));
    expect(s.eventi, 'la transazione interrotta non e\' stata completata').toContain('Recuperato');
    expect(s.marcatore, 'il marcatore e\' rimasto').toBeNull();
    expect(s.staging).toEqual([]);
  });

  test('finche\' il marcatore esiste, nessuno scrive', async ({ page }) => {
    await openApp(page);
    // La guardia sta negli scrittori dalla Fase 0, apposta perche' anche una
    // scheda ferma a una versione precedente la rispetti.
    const esito = await page.evaluate(() => {
      localStorage.setItem('bp_import_lock', JSON.stringify({ transazione: 'x', chiavi: [] }));
      const r = window.bpStorageWrite('bp_events_v2', [{ id: 'intruso' }]);
      localStorage.removeItem('bp_import_lock');
      window.bpStorageRiallineato();
      return r;
    });
    expect(esito.ok).toBe(false);
    expect(esito.motivo).toBe('import');
  });
});

test.describe("Backup . cio che entra dal file e testo di qualcun altro", () => {
  test("un id ostile in un evento importato non diventa markup", async ({ page }) => {
    await openApp(page);

    // bpEventsList incollava ev.id dentro data-id="..." senza sfuggirlo, in
    // quattro punti. Il nome e il totale erano sfuggiti, l'id no: eppure e'
    // esattamente il campo che arriva grezzo da un file o da un link. La CSP
    // ferma l'esecuzione di script, non l'iniezione di markup nel DOM.
    const ID = '"><img src=x onerror=alert(1)><b id=bp-intruso>';
    await page.evaluate((id) => {
      localStorage.setItem("bp_events_v2", JSON.stringify([
        { id, nome: "Festa", data: 1, config: {}, menu: {}, lista: [], check: {}, scorte: {} },
      ]));
      window.bpEventsOpen();
    }, ID);
    await page.waitForTimeout(200);

    const esito = await page.evaluate(() => ({
      intrusi: document.querySelectorAll("#bp-ev-mount img, #bp-intruso").length,
      schede: document.querySelectorAll("#bp-ev-mount .bpc-evcard").length,
      idLetto: (document.querySelector("#bp-ev-mount .bpc-evcard-main") || {}).dataset?.id,
    }));
    expect(esito.intrusi, "l'id ha piantato elementi nuovi nella pagina").toBe(0);
    expect(esito.schede, "la scheda dell'evento non e' stata disegnata").toBe(1);
    // Sfuggire non deve rompere il round-trip: l'attributo torna decodificato.
    expect(esito.idLetto, "l'id riletto non e' piu' quello salvato").toBe(ID);
  });

  test("l'evento con id ostile resta apribile e cancellabile", async ({ page }) => {
    await openApp(page);
    // Sfuggire l'attributo sarebbe inutile se poi l'evento non si potesse piu'
    // toccare: e' il confronto per uguaglianza in bpEventOpen che deve reggere.
    const ID = 'a"b'+'<c';
    await page.evaluate((id) => {
      localStorage.setItem("bp_events_v2", JSON.stringify([
        { id, nome: "Festa", data: 1, config: {}, menu: {}, lista: [], check: {}, scorte: {} },
      ]));
      window.bpEventsOpen();
    }, ID);
    await page.waitForTimeout(200);
    await page.click("#bp-ev-mount .bpc-evcard-main");
    await page.waitForTimeout(200);

    const aperto = await page.evaluate(() => document.getElementById("bp-ev-mount")._evId);
    expect(aperto, "l'evento non si apre piu' dopo lo sfuggimento").toBe(ID);
  });
});

test.describe("Backup . il codec, provato dallo scrittore vero", () => {
  test("lo stile del menu sopravvive al ricaricamento", async ({ page }) => {
    await openApp(page);

    // Il difetto era sopravvissuto a un giro di correzione: avevo sistemato il
    // chiamante (bpMenuSetStyle -> bpStorageWrite) ma non il codec, e
    // bpStorageWrite aveva un'eccezione per le stringhe che le scriveva
    // grezze. bpStorageRead pero' fa sempre JSON.parse: la rilettura falliva e
    // ricadeva su 'elegant'. Lo stile scelto spariva a ogni ricaricamento.
    // Il test di prima seminava un valore GIA' serializzato, quindi lo
    // scrittore vero non veniva mai eseguito e il difetto restava invisibile.
    // Qui si passa dalla funzione che usa l'utente.
    await page.evaluate(() => window.bpMenuSetStyle("minimal"));

    const grezzo = await page.evaluate(() => localStorage.getItem("bp_menu_style"));
    expect(grezzo, "lo stile e' stato scritto in un formato che il lettore non sa leggere")
      .toBe(JSON.stringify("minimal"));

    await page.reload({ waitUntil: "load" });
    await page.waitForFunction(() => typeof window.bpStorageRead === "function");
    const riletto = await page.evaluate(() => window.bpStorageRead("bp_menu_style", "elegant"));
    expect(riletto, "dopo il ricaricamento lo stile e' tornato al predefinito").toBe("minimal");
  });

  test("uno stile scelto davvero finisce nel backup", async ({ page }) => {
    await openApp(page);
    await page.evaluate(() => window.bpMenuSetStyle("minimal"));

    const dati = await page.evaluate(() => {
      let catturato = null;
      const vero = URL.createObjectURL;
      URL.createObjectURL = (blob) => { catturato = blob; return "blob:finto"; };
      const veroClick = HTMLAnchorElement.prototype.click;
      HTMLAnchorElement.prototype.click = function () {};
      window.bpEsportaTutto();
      URL.createObjectURL = vero;
      HTMLAnchorElement.prototype.click = veroClick;
      return catturato ? catturato.text() : null;
    });
    const pacco = JSON.parse(dati);
    expect(pacco.dati.stileMenu, "lo stile scelto non e' arrivato nel backup").toBe("minimal");
  });
});
