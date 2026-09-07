import { test, expect } from '@playwright/test';
import { openApp } from './helpers.js';

/**
 * Il link condivisibile.
 *
 * Sta nel fragment (#e=…), che non viene mai inviato al server. Ma non e' un
 * segreto — vive nella cronologia e in mano a chi lo riceve — e va trattato
 * come dato in chiaro proveniente da fuori.
 *
 * Due cose il piano le aveva imposte dopo la review, ed erano giuste:
 *  - il fragment si legge e si rimuove nel PRIMO bootstrap, prima che
 *    qualunque script opzionale possa vedere l'URL completo;
 *  - non si applica MAI in automatico: si valida, si chiede, e si apre come
 *    copia lasciando intatto quello che l'utente stava preparando.
 *
 * E una la aveva tolta: la compressione. Misurato dopo, un evento da 40 drink
 * con nome lungo fa 1136 caratteri di URL. Una libreria per stare sotto un
 * tetto che non era ancora stato misurato era ottimizzazione prima della
 * misura.
 */

async function conEvento(page) {
  await openApp(page);
  await page.evaluate(() => {
    // eslint-disable-next-line no-undef
    menuSerataDrink = { Negroni: 3, Spritz: 2 };
    document.getElementById('ospiti').value = 80;
    window.bpAggiornaNomeEvento('Festa di prova');
  });
}

const creaLink = (page) => page.evaluate(() => window.bpCreaLink());

test.describe('Link · creare', () => {
  test('l\'evento ci sta dentro un URL ragionevole', async ({ page }) => {
    await conEvento(page);
    const r = await creaLink(page);
    expect(r.ok).toBe(true);
    expect(r.url).toContain('#e=v1.');
    // Il tetto misurato: nessun caso realistico deve avvicinarsi al limite.
    expect(r.lunghezza, `payload di ${r.lunghezza} caratteri`).toBeLessThan(2000);
  });

  test('scorte e spunte non viaggiano: sono di chi condivide', async ({ page }) => {
    await conEvento(page);
    await page.evaluate(() => { bpScorte = { 'ing:Gin': 2000 }; });

    const r = await creaLink(page);
    const dati = await page.evaluate((u) => {
      const p = u.split('#e=v1.')[1];
      const b64 = p.replace(/-/g, '+').replace(/_/g, '/');
      return atob(b64 + '==='.slice((b64.length + 3) % 4));
    }, r.url);

    expect(dati, 'le scorte di chi condivide sono finite nel link').not.toContain('scorte');
    expect(dati).not.toContain('2000');
  });

  test('le ricette personalizzate citate viaggiano con il link', async ({ page }) => {
    await openApp(page);
    // Senza, chi riceve avrebbe un menu che nomina una ricetta che non ha —
    // e prima della Fase 0 mandava proprio in eccezione il calcolo.
    const dati = await page.evaluate(() => {
      bpRecipes.mods['Mio Drink'] = [{ nome: 'Gin', ml: 50, tipo: 'alcolico' }];
      // eslint-disable-next-line no-undef
      menuSerataDrink = { 'Mio Drink': 3 };
      const r = window.bpCreaLink();
      const p = r.url.split('#e=v1.')[1];
      const b64 = p.replace(/-/g, '+').replace(/_/g, '/');
      return atob(b64 + '==='.slice((b64.length + 3) % 4));
    });
    expect(dati).toContain('Mio Drink');
    expect(dati, 'la definizione della ricetta non viaggia con il link').toContain('rc');
  });
});

test.describe('Link · ricevere', () => {
  test('un link valido si legge, ma non si applica da solo', async ({ page }) => {
    await conEvento(page);
    const r = await creaLink(page);
    const v = await page.evaluate((u) => window.bpValidaLink(u.split('#e=')[1]), r.url);

    expect(v.ok).toBe(true);
    expect(v.stato.nome).toBe('Festa di prova');
    expect(v.stato.ospiti).toBe(80);
    expect(v.quanti).toBe(2);
  });

  test('valori fuori scala vengono riportati entro limiti sensati', async ({ page }) => {
    await openApp(page);
    const v = await page.evaluate(() => {
      const st = { o: 99999999, d: -3, s: 'abc', sc: 500, p: 300, n: 'Atlantide', f: 'lussuosa',
                   dr: { Negroni: 2 }, mo: {}, sh: {} };
      const enc = btoa(unescape(encodeURIComponent(JSON.stringify(st))))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      return window.bpValidaLink('v1.' + enc);
    });
    expect(v.ok).toBe(true);
    expect(v.stato.drinkTesta, 'un valore negativo e\' passato').toBe(3);
    expect(v.stato.pct, 'una percentuale oltre 100 e\' passata').toBe(80);
    expect(v.stato.nazione, 'un paese inesistente e\' passato').toBe('Italia');
    expect(v.stato.fascia, 'una fascia inventata e\' passata').toBe('media');
  });

  test('un link rotto o troncato viene rifiutato', async ({ page }) => {
    await openApp(page);
    for (const brutto of ['v1.@@@', 'v2.abc', 'senza-prefisso', 'v1.' + 'A'.repeat(5000)]) {
      const v = await page.evaluate((b) => window.bpValidaLink(b), brutto);
      expect(v.ok, `"${brutto.slice(0, 20)}" e' stato accettato`).toBe(false);
    }
  });

  test('un menu vuoto non e\' un evento da aprire', async ({ page }) => {
    await openApp(page);
    const v = await page.evaluate(() => {
      const enc = btoa(JSON.stringify({ o: 50, dr: {}, mo: {}, sh: {} }))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      return window.bpValidaLink('v1.' + enc);
    });
    expect(v.ok).toBe(false);
    expect(v.motivo).toBe('menu-vuoto');
  });

  test('rifiutando l\'apertura, la bozza in corso resta intatta', async ({ page }) => {
    await conEvento(page);
    const r = await creaLink(page);

    // Si prepara un altro evento, e si rifiuta il link.
    await page.evaluate(() => {
      // eslint-disable-next-line no-undef
      menuSerataDrink = { Americano: 1 };
      window.bpAggiornaNomeEvento('Il mio lavoro');
    });
    page.on('dialog', (d) => d.dismiss());
    await page.evaluate((u) => window.bpChiediApriLink(u.split('#e=')[1]), r.url);
    await page.waitForTimeout(200);

    const nome = await page.evaluate(() => bpCfgNomeEvento);
    expect(nome, 'il link ha sovrascritto la bozza in corso nonostante il rifiuto')
      .toBe('Il mio lavoro');
  });

  test('accettando si apre come copia, senza id di modifica', async ({ page }) => {
    await conEvento(page);
    const r = await creaLink(page);

    page.on('dialog', (d) => d.accept());
    await page.evaluate((u) => window.bpChiediApriLink(u.split('#e=')[1]), r.url);
    await page.waitForTimeout(400);

    const s = await page.evaluate(() => ({
      nome: bpCfgNomeEvento,
      // Salvandola nasce un evento nuovo, non si sovrascrive quello di nessuno.
      editing: bpEditingId,
      scorte: Object.keys(bpScorte || {}),
    }));
    expect(s.nome).toBe('Festa di prova');
    expect(s.editing, 'la copia e\' agganciata a un evento esistente').toBeNull();
    expect(s.scorte, 'la copia si e\' portata dietro le scorte di chi ha condiviso').toEqual([]);
  });

  test("le ricette del link non entrano nella libreria di chi riceve", async ({ page }) => {
    await openApp(page);
    page.on("dialog", (d) => d.accept());

    // Il test di prima guardava bpRecipes.mods, ma la libreria "I miei
    // cocktail" enumera databaseDrink: la ricetta ci finiva dentro e il test
    // passava lo stesso. Adesso si guarda proprio quello.
    const dopo = await page.evaluate(async () => {
      const st = { o: 50, d: 3, s: 0, sc: 15, p: 80, n: "Italia", f: "media",
                   dr: { "Drink Altrui": 2 }, mo: {}, sh: {},
                   rc: { "Drink Altrui": [{ nome: "Gin", ml: 50, tipo: "alcolico" }] } };
      const enc = btoa(unescape(encodeURIComponent(JSON.stringify(st))))
        .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      window.bpChiediApriLink("v1." + enc);
      await new Promise((r) => setTimeout(r, 400));
      const m = window.bpCalcolaModello(window.bpParametriDalForm());
      return {
        // Calcolabile: il modello la trova fra le ricette dell'evento.
        calcolabile: m.ok && m.righe.some((r) => r.id === "ing:Gin"),
        // eslint-disable-next-line no-undef
        nelDatabaseGlobale: Object.prototype.hasOwnProperty.call(databaseDrink, "Drink Altrui"),
        nellaLibreria: !!(bpRecipes.mods || {})["Drink Altrui"],
      };
    });
    expect(dopo.calcolabile, "la ricetta del link non e' utilizzabile dal calcolo").toBe(true);
    expect(dopo.nelDatabaseGlobale,
      "la ricetta del link e' finita in databaseDrink, che e' cio' che la libreria mostra").toBe(false);
    expect(dopo.nellaLibreria).toBe(false);
  });
});

test.describe('Link · il fragment non resta in giro', () => {
  test('viene tolto dall\'indirizzo prima che qualcuno possa leggerlo', async ({ page }) => {
    await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
    await page.addInitScript(() => {
      localStorage.setItem('bp_onboarded', '1');
      localStorage.setItem('bp_license', JSON.stringify({ key: 'X', instanceId: 'y', lastOk: Date.now() }));
    });
    page.on('dialog', (d) => d.dismiss());

    const st = { o: 50, d: 3, s: 0, sc: 15, p: 80, n: 'Italia', f: 'media', dr: { Negroni: 2 }, mo: {}, sh: {} };
    const enc = Buffer.from(JSON.stringify(st), 'utf8').toString('base64')
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    await page.goto('/index.html#e=v1.' + enc, { waitUntil: 'load' });
    await page.waitForFunction(() => typeof window.bpValidaLink === 'function');
    await page.waitForTimeout(400);

    // analytics.js oggi non chiama nessuno, ma se un domani il token venisse
    // riempito non deve trovarsi un evento intero nell'indirizzo.
    expect(await page.evaluate(() => location.hash),
      'il fragment e\' rimasto nell\'indirizzo').toBe('');
  });
});

test.describe("Link . la bozza in corso, davvero al sicuro", () => {
  const conBozzaEParcheggioPieno = async (page) => {
    await openApp(page);
    await page.evaluate(() => {
      localStorage.setItem("bp_bozza_parcheggiata", JSON.stringify({ nome: "Vecchia", parcheggiataIl: 1 }));
      // eslint-disable-next-line no-undef
      menuSerataDrink = { Negroni: 3 };
      bpCfgNomeEvento = "In corso";
      document.getElementById("ospiti").value = 77;
    });
  };

  const stato = (page) => page.evaluate(() => ({
    // eslint-disable-next-line no-undef
    menu: Object.keys(menuSerataDrink),
    ospiti: document.getElementById("ospiti").value,
    parcheggio: JSON.parse(localStorage.getItem("bp_bozza_parcheggiata") || "null"),
  }));

  test("se rifiuti di sostituire il parcheggio, il link non viene applicato", async ({ page }) => {
    await conBozzaEParcheggioPieno(page);
    const prima = await stato(page);

    // bpParcheggiaBozza torna false quando l'utente dice no al secondo prompt.
    // Il valore veniva buttato via: si applicava il link lo stesso e la bozza
    // in corso spariva, mentre il messaggio prometteva che non si toccava.
    page.on("dialog", (d) => d.dismiss());
    const esito = await page.evaluate(() => window.bpApriLinkComeCopia({
      nome: "Dal link", menu: { dr: { Spritz: 1 }, mo: {}, sh: {} }, ricette: {},
      ospiti: 10, drinkTesta: 2, shotTesta: 0, scarto: 15, pct: 80,
      nazione: "Italia", fascia: "media", ferm: { r: 0, b: 0, bo: 0, bi: 0 },
    }));
    await page.waitForTimeout(200);

    const dopo = await stato(page);
    expect(esito, "ha aperto il link nonostante il rifiuto").toBe(false);
    expect(dopo.menu, "il menu in corso e' stato sostituito da quello del link").toEqual(prima.menu);
    expect(dopo.ospiti, "gli ospiti in corso sono stati sovrascritti").toBe(prima.ospiti);
    expect(dopo.parcheggio.nome, "il parcheggio e' stato sostituito comunque").toBe("Vecchia");
  });

  test("se accetti, la bozza finisce nel parcheggio e il link si apre", async ({ page }) => {
    await conBozzaEParcheggioPieno(page);
    page.on("dialog", (d) => d.accept());
    const esito = await page.evaluate(() => window.bpApriLinkComeCopia({
      nome: "Dal link", menu: { dr: { Spritz: 1 }, mo: {}, sh: {} }, ricette: {},
      ospiti: 10, drinkTesta: 2, shotTesta: 0, scarto: 15, pct: 80,
      nazione: "Italia", fascia: "media", ferm: { r: 0, b: 0, bo: 0, bi: 0 },
    }));
    await page.waitForTimeout(300);

    const dopo = await stato(page);
    expect(esito).toBe(true);
    expect(dopo.menu, "il link non e' stato applicato").toEqual(["Spritz"]);
    // E la bozza di prima deve essere DAVVERO recuperabile, non solo
    // dichiarata tale: e' la promessa del messaggio.
    expect(dopo.parcheggio.nome, "la bozza in corso non e' finita nel parcheggio").toBe("In corso");
    expect(dopo.parcheggio.config.ospiti, "il parcheggio non contiene i dati della bozza").toBe("77");
  });
});

test.describe("Link . la ricetta di chi manda vale per l'evento di chi manda", () => {
  test("un omonimo locale non cambia i numeri dell'evento ricevuto", async ({ page }) => {
    await openApp(page);

    // Vinceva la ricetta locale, e sembrava la scelta gentile. Faceva pero'
    // una cosa che nessuno aveva chiesto: chi riceveva un evento con un
    // Negroni diverso dal proprio vedeva ingredienti e costo del PROPRIO
    // Negroni, sotto il nome di un evento preparato da qualcun altro.
    const base = {
      ospiti: 100, drinkTesta: 3, shotTesta: 0, scarto: 15, pct: 80,
      nazione: "Italia", fascia: "media", mocktail: {}, shot: {},
      drink: { "Special Mio": 3 },
    };
    const r = await page.evaluate((b) => {
      // Una ricetta con lo STESSO nome, in libreria e nell'evento, con dosi
      // diverse: se i totali coincidono, l'evento non sta usando la sua.
      // eslint-disable-next-line no-undef
      databaseDrink["Special Mio"] = [{ nome: "Gin", ml: 30 }];
      const locale = window.bpCalcolaModello(b);
      const ospite = window.bpCalcolaModello(Object.assign({}, b, {
        ricetteEvento: { "Special Mio": [{ nome: "Gin", ml: 90 }] },
      }));
      const gin = (m) => (m.righe.find((x) => x.id === "ing:Gin") || {}).requiredBaseQty;
      return { locale: gin(locale), ospite: gin(ospite) };
    }, base);

    expect(r.locale, "il caso di prova non produce gin").toBeTruthy();
    expect(r.ospite, "l'evento ha usato la ricetta locale invece della propria")
      .toBeGreaterThan(r.locale);
    expect(r.ospite).toBe(r.locale * 3);
  });

  test("senza ricetta nell'evento si usa comunque la libreria", async ({ page }) => {
    await openApp(page);
    // La precedenza non deve trasformarsi in "la libreria non conta piu'".
    const r = await page.evaluate(() => {
      // eslint-disable-next-line no-undef
      databaseDrink["Solo Mio"] = [{ nome: "Gin", ml: 40 }];
      const m = window.bpCalcolaModello({
        ospiti: 100, drinkTesta: 3, shotTesta: 0, scarto: 15, pct: 80,
        nazione: "Italia", fascia: "media", drink: { "Solo Mio": 3 }, mocktail: {}, shot: {},
        ricetteEvento: { "Altro": [{ nome: "Rum", ml: 50 }] },
      });
      return (m.righe.find((x) => x.id === "ing:Gin") || {}).requiredBaseQty;
    });
    expect(r, "la ricetta della libreria non e' stata usata").toBeTruthy();
  });
});
