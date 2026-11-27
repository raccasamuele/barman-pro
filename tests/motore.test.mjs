/**
 * Il motore di calcolo, in Node e senza browser.
 *
 * public/motore.js non tocca il DOM: lo si carica qui cosi' com'e' e lo si
 * fa girare sugli stessi casi dei golden. Il golden fotografa il testo che
 * l'app disegna; qui si confrontano i numeri che il motore restituisce. Se
 * divergono, o il motore e' cambiato, o il disegno lo legge male.
 *
 * Gira in un secondo: `npm run test:motore`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CASI } from './cases.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
await import('../public/motore.js');
const M = globalThis.BarmanMotore;
const GOLDEN = JSON.parse(fs.readFileSync(path.join(__dirname, 'golden', 'calc.json'), 'utf8'));

/* "€ 1.097,50" -> 1097.5 */
const euro = (s) => parseFloat(String(s).replace(/[^\d,]/g, '').replace(',', '.'));

const parametri = (c) => ({
  ospiti: c.ospiti, drinkTesta: c.drinkTesta, shotTesta: c.shotTesta, scarto: c.scarto, pct: c.pct,
  nazione: c.nazione ?? 'Italia', fascia: c.fascia ?? 'media', fasciaFerm: c.fasciaFerm ?? c.fascia ?? 'media',
  ferm: c.ferm || {}, drink: c.drink || {}, mocktail: c.mocktail || {}, shot: c.shot || {},
});

test('il motore si carica senza DOM ed espone i suoi dati', () => {
  assert.equal(typeof M.calcolaModello, 'function');
  assert.equal(Object.keys(M.ricetteIniziali()).length, 136);
  assert.equal(M.dati.indiciGeo.Italia, 1);
});

test('ricetteIniziali e\' una copia: modificarla non tocca il motore', () => {
  const r = M.ricetteIniziali();
  r.Negroni = [];
  assert.ok(M.ricetteIniziali().Negroni.length > 0);
});

for (const caso of CASI) {
  test(`stesso totale del golden · ${caso.nome}`, () => {
    const atteso = GOLDEN[caso.nome];
    assert.ok(atteso, `caso assente dal golden: ${caso.nome}`);
    const m = M.calcolaModello(parametri(caso));
    if (!atteso.budgetAmount) {
      assert.equal(m.ok, false, 'il golden non ha un totale, il motore invece calcola');
      return;
    }
    assert.equal(m.ok, true, `rifiutato: ${m.motivo}`);
    assert.equal(m.totale, euro(atteso.budgetAmount));
  });
}

test('il servizio festa usa la dose grande solo dove esiste', () => {
  const base = { ospiti: 50, drinkTesta: 3, shotTesta: 0, scarto: 15, pct: 100, nazione: 'Italia', fascia: 'media' };
  const bar = M.calcolaModello({ ...base, servizio: 'bar', drink: { 'Gin Tonic': 1 } });
  const festa = M.calcolaModello({ ...base, servizio: 'festa', drink: { 'Gin Tonic': 1 } });
  const gin = (m) => m.righe.find((r) => r.ingrediente === 'Gin').requiredBaseQty;
  assert.ok(gin(festa) > gin(bar));
  const negroniBar = M.calcolaModello({ ...base, servizio: 'bar', drink: { Negroni: 1 } });
  const negroniFesta = M.calcolaModello({ ...base, servizio: 'festa', drink: { Negroni: 1 } });
  assert.equal(negroniFesta.totale, negroniBar.totale);
});

test('una ricetta riscritta dall\'utente vale uguale nei due servizi', () => {
  const ricette = M.ricetteIniziali();
  const mia = [{ nome: 'Gin', tipo: 'alcolico', ml: 50 }, { nome: 'Acqua Tonica', tipo: 'analcolico', ml: 100 }];
  ricette['Gin Tonic'] = mia;
  const p = { ospiti: 20, drinkTesta: 2, shotTesta: 0, scarto: 0, pct: 100, nazione: 'Italia', fascia: 'media', drink: { 'Gin Tonic': 1 } };
  const ctx = { ricette, ricetteModificate: { 'Gin Tonic': mia } };
  assert.equal(M.calcolaModello({ ...p, servizio: 'festa' }, ctx).totale, M.calcolaModello({ ...p, servizio: 'bar' }, ctx).totale);
});
