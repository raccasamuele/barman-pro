import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { openApp, calcola } from './helpers.js';
import { CASI_PRIMA } from './servizio-cases.js';

/**
 * Fase (c): un nome per drink, dose da bar o da festa scelta per evento.
 *
 * Il cancello e' questo: un evento salvato PRIMA, con i nomi "(HV)" e
 * "(IBA)" e senza il campo servizio, deve ridare lo stesso totale e le
 * stesse righe. I valori attesi vengono dal codice in produzione prima del
 * lavoro e non si rigenerano (vedi servizio-cases.js).
 *
 * Il servizio vale per quattro ingressi diversi, e ognuno ha il suo test:
 * la bozza in corso, l'evento salvato riaperto con "Modifica", il link
 * condiviso e la libreria ricette.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PRIMA = JSON.parse(fs.readFileSync(path.join(__dirname, 'golden', 'servizio-prima.json'), 'utf8'));
const SERVIZIO_ATTESO = {
  'serata con quattro HV': 'festa',
  'matrimonio con un solo HV': 'festa',
  'aperitivo con i nomi IBA': 'bar',
  'tutti i 21 HV': 'festa',
};
/* L'unica differenza voluta. "Garibaldi (HV)" non aveva guarnizioni,
   "Garibaldi (IBA)" la fetta d'arancia: il Garibaldi unificato ha quella.
   E' una riga promemoria senza prezzo, quindi il totale non si muove. */
const RIGHE_NUOVE = { 'tutti i 21 HV': ["Fetta d'arancia"] };
const attesa = (nome) => {
  const p = PRIMA[nome], extra = RIGHE_NUOVE[nome] || [];
  return { ...p, righe: [...p.righe, ...extra], righeCount: p.righeCount + extra.length };
};

const configVecchia = (c) => ({
  ospiti: String(c.ospiti), drink_testa: String(c.drinkTesta), shot_testa: String(c.shotTesta),
  scarto: String(c.scarto), nazione: 'Italia', fascia: 'media', pct_bevitori: String(c.pct),
  ferm_vino_rosso: String(c.ferm?.rosso ?? 0), ferm_vino_bianco: String(c.ferm?.bianco ?? 0),
  ferm_bollicine: String(c.ferm?.bollicine ?? 0), ferm_birra: String(c.ferm?.birra ?? 0),
  fascia_fermentati: 'media',
});

async function apriCon(browser, semi) {
  const contesto = await browser.newContext({ serviceWorkers: 'block', locale: 'it-IT' });
  const page = await contesto.newPage();
  await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
  await page.addInitScript((s) => {
    localStorage.setItem('bp_onboarded', '1');
    for (const [k, v] of Object.entries(s)) localStorage.setItem(k, JSON.stringify(v));
  }, semi);
  return { contesto, page };
}

/** Calcola con quello che l'app ha caricato: NON reimposta il menu. */
const fotografa = (page) => page.evaluate(() => {
  document.getElementById('sel-nazione').value = 'Italia';
  const ok = window.calcolaSpesa(true);
  const txt = (id) => (document.getElementById(id)?.textContent || '').trim();
  const righe = [...document.querySelectorAll('#risultati .lista-item, #risultati li')]
    .map((el) => el.textContent.replace(/\s+/g, ' ').trim()).filter(Boolean);
  return {
    ok,
    snap: { budgetAmount: txt('budget-amount'), perPersona: txt('budget-perperson'), righeCount: righe.length, righe },
    // eslint-disable-next-line no-undef
    nomi: Object.keys({ ...menuSerataDrink, ...menuSerataMocktail, ...menuSerataShot }),
    servizio: document.getElementById('servizio').value,
  };
});

test.describe('servizio · gli eventi salvati prima ridanno gli stessi numeri', () => {
  for (const caso of CASI_PRIMA) {
    test(`bozza in corso · ${caso.nome}`, async ({ browser }) => {
      const { contesto, page } = await apriCon(browser, {
        barmanProState_v8: {
          menuSerataDrink: caso.drink || {}, menuSerataMocktail: caso.mocktail || {},
          menuSerataShot: caso.shot || {}, passo: 'step-setup', config: configVecchia(caso),
        },
      });
      await page.goto('/index.html', { waitUntil: 'load' });
      await page.waitForFunction(() => typeof window.calcolaSpesa === 'function');
      const r = await fotografa(page);
      expect(r.ok).toBe(true);
      expect(r.nomi.filter((n) => /\((HV|IBA)\)$/.test(n)), 'nomi vecchi rimasti nel menu').toEqual([]);
      expect(r.servizio).toBe(SERVIZIO_ATTESO[caso.nome]);
      expect(r.snap.budgetAmount, 'il totale di un evento salvato prima e\' cambiato').toBe(PRIMA[caso.nome].budgetAmount);
      expect(r.snap).toEqual(attesa(caso.nome));
      await contesto.close();
    });
  }

  test('evento salvato, riaperto con "Modifica"', async ({ browser }) => {
    const caso = CASI_PRIMA[0];
    const { contesto, page } = await apriCon(browser, {
      bp_events_v2: [{
        id: 'ev_vecchio', nome: 'Festa di prima', data: Date.now(), config: configVecchia(caso),
        menu: { drink: caso.drink, mocktail: caso.mocktail, shot: caso.shot },
        totale: PRIMA[caso.nome].budgetAmount, lista: [], scorte: {}, quantita: {}, ricetteEvento: {}, check: {},
      }],
    });
    await page.goto('/index.html', { waitUntil: 'load' });
    await page.waitForFunction(() => typeof window.bpEventsOpen === 'function');
    await page.evaluate(() => window.bpEventsOpen());
    await page.locator('.bpc-evkebab').first().click();
    await page.locator('.bpc-evmenu.show button[data-act="edit"]').click();
    const r = await fotografa(page);
    expect(r.servizio).toBe('festa');
    expect(r.nomi).toContain('Gin Tonic');
    expect(r.snap).toEqual(PRIMA[caso.nome]);
    await contesto.close();
  });

  test('link condiviso prima, senza il campo servizio', async ({ browser }) => {
    const caso = CASI_PRIMA[1];
    const { contesto, page } = await apriCon(browser, {});
    // Il payload si costruisce con il codificatore vero, da una pagina gia' aperta.
    await page.goto('/index.html', { waitUntil: 'load' });
    await page.waitForFunction(() => typeof window._bpB64urlEnc === 'function');
    const payload = await page.evaluate((c) => {
      const st = {
        o: String(c.ospiti), d: String(c.drinkTesta), s: String(c.shotTesta), sc: String(c.scarto), p: String(c.pct),
        n: 'Italia', f: 'media', ff: 'media',
        fe: { r: String(c.ferm?.rosso ?? 0), b: String(c.ferm?.bianco ?? 0), bo: String(c.ferm?.bollicine ?? 0), bi: String(c.ferm?.birra ?? 0) },
        dr: c.drink || {}, mo: c.mocktail || {}, sh: c.shot || {},
      };
      // eslint-disable-next-line no-undef
      return BP_LINK_PREFISSO + window._bpB64urlEnc(JSON.stringify(st));
    }, caso);
    await contesto.close();

    const altro = await apriCon(browser, {});
    altro.page.on('dialog', (d) => d.accept());
    await altro.page.goto('/index.html#e=' + payload, { waitUntil: 'load' });
    await altro.page.waitForFunction(() => document.getElementById('servizio').value === 'festa', null, { timeout: 5000 });
    const r = await fotografa(altro.page);
    expect(r.nomi).toContain('Gin Tonic');
    expect(r.snap).toEqual(PRIMA[caso.nome]);
    await altro.contesto.close();
  });
});

test.describe('servizio · bar e festa', () => {
  const GT = { ospiti: 100, drinkTesta: 2, shotTesta: 0, scarto: 0, pct: 100, drink: { 'Gin Tonic': 1 } };

  test('il Gin Tonic: 45 + 120 al bar, 60 + 140 in festa', async ({ page }) => {
    await openApp(page);
    const bar = await calcola(page, GT);
    await page.evaluate(() => window.bpServizioImposta('festa'));
    const festa = await calcola(page, GT);
    // 200 drink: 9 L di gin e 24 di tonica al bar, 12 e 28 in festa.
    expect(bar.righe.find((r) => r.startsWith('Gin'))).toMatch(/^Gin9 L/);
    expect(bar.righe.find((r) => r.startsWith('Acqua Tonica'))).toMatch(/^Acqua Tonica24 L/);
    expect(festa.righe.find((r) => r.startsWith('Gin'))).toMatch(/^Gin12 L/);
    expect(festa.righe.find((r) => r.startsWith('Acqua Tonica'))).toMatch(/^Acqua Tonica28 L/);
  });

  test('in un menu misto cambia solo l\'highball', async ({ page }) => {
    const caso = { ospiti: 80, drinkTesta: 3, shotTesta: 0, scarto: 15, pct: 80, drink: { 'Spritz': 3, 'Gin Tonic': 2 } };
    await openApp(page);
    const bar = await calcola(page, caso);
    await page.evaluate(() => window.bpServizioImposta('festa'));
    const festa = await calcola(page, caso);
    const riga = (o, n) => o.righe.find((r) => r.startsWith(n));
    for (const n of ['Prosecco', 'Aperol', 'Soda']) expect(riga(festa, n), n).toBe(riga(bar, n));
    expect(riga(festa, 'Gin')).not.toBe(riga(bar, 'Gin'));
  });

  test('la stima dal vivo e la lista danno lo stesso totale in festa', async ({ page }) => {
    await openApp(page);
    const caso = { ospiti: 60, drinkTesta: 3, shotTesta: 0, scarto: 15, pct: 80, drink: { 'Vodka Lemon': 2, 'Rum & Coca': 2 } };
    await page.evaluate(() => window.bpServizioImposta('festa'));
    const lista = await calcola(page, caso);
    const stima = await page.evaluate(() => window.stimaBudget(bpParametriDalForm()).totale);
    const num = (s) => parseFloat(s.replace(/[^\d,]/g, '').replace(',', '.'));
    expect(stima).toBeCloseTo(num(lista.budgetAmount), 2);
  });

  test('una ricetta riscritta dall\'utente vale uguale nei due servizi', async ({ browser }) => {
    const sua = [{ nome: 'Gin', tipo: 'alcolico', ml: 50 }, { nome: 'Acqua Tonica', tipo: 'analcolico', ml: 150 }];
    const { contesto, page } = await apriCon(browser, { bp_recipes_v2: { mods: { 'Gin Tonic (HV)': sua }, custom: [] } });
    await page.goto('/index.html', { waitUntil: 'load' });
    await page.waitForFunction(() => typeof window.calcolaSpesa === 'function');
    // eslint-disable-next-line no-undef
    expect(await page.evaluate(() => Object.keys(bpRecipes.mods))).toEqual(['Gin Tonic']);
    const bar = await calcola(page, GT);
    await page.evaluate(() => window.bpServizioImposta('festa'));
    const festa = await calcola(page, GT);
    expect(festa.righe).toEqual(bar.righe);
    expect(bar.righe.find((r) => r.startsWith('Gin'))).toMatch(/^Gin10 L/);   // 200 x 50 ml
    await contesto.close();
  });
});

test.describe('servizio · casi limite della migrazione', () => {
  test('i due Garibaldi diventano uno, con i pesi sommati fino a 5', async ({ page }) => {
    await openApp(page);
    const out = await page.evaluate(() => [
      window.bpMigraMenu({ 'Garibaldi (HV)': 3, 'Garibaldi (IBA)': 3, 'Negroni': 2 }),
      window.bpMigraMenu({ 'Garibaldi (HV)': 1, 'Garibaldi (IBA)': 2 }),
    ]);
    expect(out[0]).toEqual({ Garibaldi: 5, Negroni: 2 });
    expect(out[1]).toEqual({ Garibaldi: 3 });
  });

  test('Moscow Mule (IBA) insieme a un HV: diventa festa e passa a 60 ml (dichiarato nel piano)', async ({ page }) => {
    await openApp(page);
    const r = await page.evaluate(() => ({
      s: window.bpServizioDi(undefined, { 'Moscow Mule (IBA)': 2, 'Gin Tonic (HV)': 2 }),
      solo: window.bpServizioDi(undefined, { 'Moscow Mule (IBA)': 2 }),
      scelto: window.bpServizioDi('bar', { 'Gin Tonic (HV)': 2 }),
    }));
    expect(r).toEqual({ s: 'festa', solo: 'bar', scelto: 'bar' });
  });
});
