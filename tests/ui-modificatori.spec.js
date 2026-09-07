import { test, expect } from '@playwright/test';
import { openApp, toNumber } from './helpers.js';

/**
 * "Ce l'ho gia'" e "il tuo prezzo".
 *
 * Sono le due funzioni che il grill aveva scelto per prime, ed erano anche
 * quelle che il piano prometteva "a valle" di un calcolo che pero' non
 * produceva dati: e' per questo che e' nata la Fase 0.
 *
 * Due cose vanno tenute ferme e sono verificate qui.
 *
 * La prima: con i modificatori spenti il modello e il DOM devono essere
 * identici a prima, perche' e' quella la proiezione che i 42 golden
 * fotografano. Per questo gli editor esistono solo in modalita' correzione.
 *
 * La seconda: si sottrae PRIMA e si arrotonda DOPO. La quantita' che paghi e
 * quella che compri sono due numeri diversi di proposito — servono 6.65 L, ne
 * hai 2, ne restano 4.65 da pagare ma ne compri 5 perche' le bottiglie sono
 * quelle. La formula sbagliata della rev. 2 del piano confondeva i due.
 */

const CASO = {
  ospiti: 80, drinkTesta: 3, shotTesta: 0, scarto: 15, pct: 80,
  nazione: 'Italia', fascia: 'media', drink: { Negroni: 3 }, mocktail: {}, shot: {},
};

const modello = (page, extra = {}) => page.evaluate(
  (p) => window.bpCalcolaModello(p), { ...CASO, ...extra });

const rigaGin = (m) => m.righe.find((r) => r.id === 'ing:Gin');

test.describe('Modificatori · spenti, non esistono', () => {
  test('senza modificatori il modello e\' quello di sempre', async ({ page }) => {
    await openApp(page);
    const m = await modello(page);
    for (const r of m.righe) {
      if (!r.baseUnit) continue;
      expect(r.stockBaseQty, `${r.id} ha una scorta che nessuno ha dichiarato`).toBe(0);
      expect(r.pricingQty).toBe(r.requiredBaseQty);
      expect(r.prezzoTuo, `${r.id} risulta con prezzo personalizzato`).toBeFalsy();
    }
  });

  test('gli editor non sono nel DOM finche\' non si entra in correzione', async ({ page }) => {
    await openApp(page);
    await page.evaluate(() => {
      // eslint-disable-next-line no-undef
      menuSerataDrink = { Negroni: 3 };
      window.vaiAStep('risultati');
    });
    await page.waitForTimeout(300);

    // E' cio' che tiene invarianti i golden: un campo sempre presente dentro
    // ogni <li> avrebbe cambiato la loro fotografia senza cambiare un numero.
    expect(await page.locator('.riga-mod').count()).toBe(0);

    await page.evaluate(() => window.bpAlternaModifica());
    await page.waitForTimeout(200);
    expect(await page.locator('.riga-mod').count()).toBeGreaterThan(0);
  });

  test('le guarnizioni non accettano scorte: non hanno dose', async ({ page }) => {
    await openApp(page);
    await page.evaluate(() => {
      // eslint-disable-next-line no-undef
      menuSerataDrink = { Negroni: 3 };
      window.vaiAStep('risultati');
      window.bpAlternaModifica();
    });
    await page.waitForTimeout(300);

    const garnishConEditor = await page.evaluate(() =>
      document.querySelectorAll('#lista_garnish .riga-mod').length);
    expect(garnishConEditor, 'una guarnizione ha un campo scorte').toBe(0);
  });
});

test.describe('Modificatori · "ce l\'ho gia\'"', () => {
  test('si sottrae dal fabbisogno, non dalla quantita\' arrotondata', async ({ page }) => {
    await openApp(page);
    const base = rigaGin(await modello(page));
    expect(base, 'il caso di prova non contiene il gin').toBeTruthy();

    const scorta = 2000;   // 2 litri, in unita' base
    const con = rigaGin(await modello(page, { scorte: { 'ing:Gin': scorta } }));

    expect(con.remainingBaseQty).toBe(base.requiredBaseQty - scorta);
    expect(con.pricingQty, 'si paga una quantita\' diversa da quella che resta')
      .toBe(con.remainingBaseQty);
    // Si compra al taglio, si paga al bisogno: due numeri diversi, e va bene.
    // Entrambi in ml: il confronto prima divideva per 1000 perche' la
    // quantita' d'acquisto era in litri, contro il requisito R3.
    expect(con.roundedPurchaseQty).toBeGreaterThanOrEqual(con.remainingBaseQty);
    expect(con.costo).toBeLessThan(base.costo);
  });

  test('avere piu\' del necessario porta a zero, mai sotto', async ({ page }) => {
    await openApp(page);
    const con = rigaGin(await modello(page, { scorte: { 'ing:Gin': 999999 } }));
    expect(con.remainingBaseQty).toBe(0);
    expect(con.roundedPurchaseQty).toBe(0);
    expect(con.costo).toBe(0);
  });

  test('le scorte abbassano il totale', async ({ page }) => {
    await openApp(page);
    const prima = (await modello(page)).totale;
    const dopo = (await modello(page, { scorte: { 'ing:Gin': 2000 } })).totale;
    expect(dopo).toBeLessThan(prima);
  });
});

test.describe('Modificatori · "il tuo prezzo"', () => {
  test('sostituisce fascia e moltiplicatore, non ci si somma', async ({ page }) => {
    await openApp(page);

    // Stesso prezzo, due paesi con moltiplicatore geografico diverso: se il
    // prezzo tuo e' davvero finale, il costo non cambia.
    const it = rigaGin(await modello(page, { prezzi: { 'ing:Gin': 10 }, nazione: 'Italia' }));
    const ch = rigaGin(await modello(page, { prezzi: { 'ing:Gin': 10 }, nazione: 'Svizzera' }));

    expect(it.prezzoTuo).toBe(true);
    expect(it.unitPrice).toBe(10);
    expect(ch.costo, 'il moltiplicatore geografico e\' stato riapplicato sopra il tuo prezzo')
      .toBe(it.costo);
  });

  test('un prezzo tuo si applica alla quantita\' che paghi, non a quella che compri', async ({ page }) => {
    await openApp(page);
    const r = rigaGin(await modello(page, { prezzi: { 'ing:Gin': 10 } }));
    const atteso = Math.ceil(((r.pricingQty / 1000) * 10) * 2) / 2;   // stesso arrotondamento a mezzo euro
    expect(r.costo).toBe(atteso);
  });

  test('un valore non valido non diventa un prezzo', async ({ page }) => {
    await openApp(page);
    for (const brutto of ['', 'abc', -5, null]) {
      const r = rigaGin(await modello(page, { prezzi: { 'ing:Gin': brutto } }));
      expect(r.prezzoTuo, `"${brutto}" e' stato accettato come prezzo`).toBeFalsy();
    }
  });
});

test.describe('Modificatori · dove vivono', () => {
  test('le scorte stanno nell\'evento, i prezzi nelle impostazioni', async ({ page }) => {
    await openApp(page);
    await page.evaluate(() => {
      // eslint-disable-next-line no-undef
      menuSerataDrink = { Negroni: 3 };
      window.vaiAStep('risultati');
      window.bpAlternaModifica();
    });
    await page.waitForTimeout(300);

    await page.evaluate(() => {
      const s = document.querySelector('.mod-scorta[data-riga="ing:Gin"]');
      s.value = '2'; s.dispatchEvent(new Event('input', { bubbles: true }));
      const p = document.querySelector('.mod-prezzo[data-riga="ing:Gin"]');
      p.value = '10'; p.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await page.waitForTimeout(500);

    const dove = await page.evaluate(() => ({
      prezziInImpostazioni: (JSON.parse(localStorage.getItem('bp_settings_v2') || '{}').prezzi || {})['ing:Gin'],
      scorteInImpostazioni: JSON.parse(localStorage.getItem('bp_settings_v2') || '{}').scorte,
    }));
    expect(dove.prezziInImpostazioni, 'il prezzo non e\' finito nelle impostazioni').toBe(10);
    expect(dove.scorteInImpostazioni, 'le scorte sono finite nelle impostazioni').toBeUndefined();
  });

  test('duplicare un evento azzera le scorte', async ({ page }) => {
    await openApp(page);
    // Una scorta descrive un acquisto gia' fatto: portarsela in una copia
    // direbbe una bugia. Deciso durante il grill, non in implementazione.
    await page.evaluate(() => {
      // eslint-disable-next-line no-undef
      menuSerataDrink = { Negroni: 3 };
      window.vaiAStep('risultati');
      bpScorte = { 'ing:Gin': 2000 };
      window.bpSalvaEvento();
    });
    await page.waitForTimeout(300);

    const copia = await page.evaluate(() => {
      const id = window.bpGetEvents()[0].id;
      window.bpEventDup(id);
      const l = window.bpGetEvents();
      return l[l.length - 1];
    });
    expect(Object.keys(copia.scorte || {}), 'la copia si e\' portata dietro le scorte').toEqual([]);
    expect(copia.check, 'la copia si e\' portata dietro le spunte').toEqual({});
  });

  test('gli id degli eventi non collidono', async ({ page }) => {
    await openApp(page);
    // Date.now() come id collide fra due eventi creati nello stesso
    // millisecondo: improbabile a mano, non importando un file.
    const ids = await page.evaluate(() => {
      const out = [];
      for (let i = 0; i < 50; i++) out.push(window.bpNuovoId());
      return out;
    });
    expect(new Set(ids).size, 'due id generati di fila sono uguali').toBe(ids.length);
  });
});

test.describe("Il ricalcolo differito . chi salva non si porta via numeri vecchi", () => {
  /* L'unico ingresso che rimanda il conto al frame dopo e' lo slider "% che
     beve alcolici": aggiornaPctBevitori -> ricalcolaSeVisibile ->
     programmaRicalcoloLista -> requestAnimationFrame. Gli altri campi del
     form ricalcolano subito, o non ricalcolano affatto. La prima versione di
     questo test muoveva #ospiti — che non pianifica proprio niente — e quindi
     non provava il difetto: passava e falliva a seconda di cosa era rimasto
     in coda dal passo precedente. Qui si usa il vero innesco. */
  const suiRisultati = async (page) => {
    await openApp(page);
    await page.evaluate(() => {
      // eslint-disable-next-line no-undef
      menuSerataDrink = { Negroni: 3 };
      document.getElementById("ospiti").value = 100;
      window.vaiAStep("risultati");
    });
    await page.waitForTimeout(400);
  };

  // Muove lo slider e restituisce, SENZA lasciar passare un frame, cio' che
  // l'app produrrebbe adesso.
  const senzaAspettareIlFrame = (page, azione) => page.evaluate((a) => {
    const prima = document.getElementById("budget-amount").textContent.trim();
    const r = document.getElementById("pct-bevitori");
    r.value = 20;                       // da 80 a 20: il totale deve crollare
    window.aggiornaPctBevitori();       // pianifica il ricalcolo, non lo esegue
    const inCoda = window.bpRicalcoloInCoda();
    let dopo;
    if (a === "salva") {
      window.bpSalvaEvento();
      dopo = window.bpGetEvents().slice(-1)[0].totale;
    } else {
      dopo = document.getElementById("budget-amount").textContent.trim();
      window.costruisciTestoLista();
      dopo = document.getElementById("budget-amount").textContent.trim();
    }
    return { prima, dopo, inCoda };
  }, azione);

  test("salvare subito dopo lo slider fotografa la lista nuova", async ({ page }) => {
    await suiRisultati(page);
    const e = await senzaAspettareIlFrame(page, "salva");
    expect(e.inCoda, "lo slider non ha pianificato nessun ricalcolo: il test non prova niente").toBe(true);
    expect(e.dopo, "l'evento ha salvato il totale di prima dello slider").not.toBe(e.prima);
  });

  test("condividere subito dopo lo slider non copia la lista vecchia", async ({ page }) => {
    await suiRisultati(page);
    const e = await senzaAspettareIlFrame(page, "condividi");
    expect(e.inCoda).toBe(true);
    expect(e.dopo, "il testo condiviso e' rimasto quello di prima dello slider").not.toBe(e.prima);
  });
});

test.describe("Condividere . cosa esce dalla lista", () => {
  test("in correzione il testo non porta fuori le etichette degli editor", async ({ page }) => {
    await openApp(page);
    await page.evaluate(() => {
      // eslint-disable-next-line no-undef
      menuSerataDrink = { Negroni: 3 };
      document.getElementById("ospiti").value = 80;
      window.vaiAStep("risultati");
    });
    await page.waitForTimeout(300);

    // Il testo si costruiva da li.innerText, e in correzione dentro ogni <li>
    // c'e' il blocco .riga-mod. NB: i VALORI digitati non trapelano — il
    // valore di un <input> non fa parte di innerText, e la prima versione di
    // questo test lo asseriva e passava anche senza la correzione, cioe' non
    // provava niente. A trapelare sono le ETICHETTE: ogni voce della lista
    // condivisa si portava dietro "Ce l'ho gia' (L)" e "Il tuo prezzo".
    await page.evaluate(() => window.bpAlternaModifica());
    await page.waitForTimeout(400);
    const etichetta = await page.evaluate(() => {
      const l = document.querySelector(".riga-mod .mod-lbl");
      return l ? l.textContent : null;
    });
    expect(etichetta, "gli editor non sono aperti: il test non prova niente").toBeTruthy();

    const testo = await page.evaluate(() => window.costruisciTestoLista());
    // Confronto senza maiuscole/minuscole: le etichette hanno
    // text-transform: uppercase, e innerText restituisce il testo RESO, cioe'
    // "HO GIA' (L)". La versione precedente confrontava con textContent
    // ("Ho gia' (L)") e per questo passava anche senza la correzione — un
    // altro test verde per il motivo sbagliato, nello stesso giro in cui li
    // stavo cercando.
    expect(testo.toLowerCase(), `l'etichetta "${etichetta}" e' finita nel testo condiviso`)
      .not.toContain(etichetta.toLowerCase());
    // Ripulire non vuol dire svuotare: le voci devono esserci ancora.
    expect(testo, "il testo condiviso ha perso le voci").toContain("Gin");
  });
});
