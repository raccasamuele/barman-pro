#!/usr/bin/env node
/**
 * Verifica delle traduzioni.
 *
 * Le chiavi DEFINITE vengono lette a runtime dall'oggetto `translations` dopo
 * che tutti i merge sono stati applicati. E' l'unico modo affidabile: i merge
 * sono 13 `Object.assign` verso 15 oggetti diversi (`_extraI18n`,
 * `_extraI18n2`, `_extraI18nCfg`, `_menuI18n`, `_garnishI18n`, `_cfgMore`…),
 * e un elenco scritto a mano e' gia' stato sbagliato due volte in questo
 * progetto. Se domani ne compare un sedicesimo, questo metodo lo vede da solo.
 *
 * Le chiavi USATE vengono estratte staticamente: `data-i18n="…"`, `T('…')`,
 * `_T('…')`. Le famiglie costruite a runtime stanno nell'allowlist.
 *
 * Modalita': informativa per default (exit 0), bloccante con --strict.
 * In CI gira con --strict: le sette lingue sono allineate, quindi da qui in
 * poi uno scostamento e' una regressione.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const INDEX = path.join(ROOT, 'public', 'index.html');

/**
 * Le chiavi si usano in due posti e vanno cercate in entrambi.
 *
 * Fino allo split del monolite bastava index.html, perche' conteneva anche
 * tutto il JavaScript. Dopo lo split le chiamate T() sono finite in app.js e
 * questo controllo ha smesso di vederle: continuava a passare, ma su meta'
 * del progetto era cieco. Se ne e' accorto solo perche' il numero di chiavi
 * "definite ma mai usate" e' saltato da 52 a 189 di colpo.
 */
const SORGENTI = [INDEX, path.join(ROOT, 'public', 'app.js')];

const STRICT = process.argv.includes('--strict');

/**
 * Famiglie di chiavi costruite a runtime: vanno ignorate dal confronto perche'
 * non esiste, nel sorgente, una stringa letterale che le contenga per intero.
 *
 * Es. `T('cfgTipo' + _bpCap(bpCfg.tipo))` produce `cfgTipoMatrimonio`,
 * `cfgTipoCompleanno`, … Cercare "cfgTipoMatrimonio" nel sorgente non lo
 * trova mai, e cercare "cfgTipo" trova un prefisso che non e' una chiave.
 */
const ALLOWLIST_DINAMICHE = [
  /^drink\./,
  /^ing\./,
  /^garnish\./,
  // prefissi del configuratore guidato (concatenati con il valore scelto)
  /^cfg(Tipo|Int|Dur|Durata|Fascia|Stile)[A-Z]/,
];

/** Lingue attese. Se una sparisce, e' un errore, non un dettaglio. */
const LINGUE = ['it', 'en', 'es', 'fr', 'de', 'pt', 'nl'];

function chiaviUsate(sorgente) {
  const usate = new Set();
  for (const m of sorgente.matchAll(/data-i18n(?:-[a-z]+)?="([^"]+)"/g)) {
    if (m[1] && m[1] !== 'true' && m[1] !== 'false') usate.add(m[1]);
  }
  // La stringa deve essere l'argomento COMPLETO: `T('x')` o `T('x', …)`.
  // Senza il lookahead su [,)] si cattura anche il prefisso di una
  // concatenazione — `T('cfgTipo' + valore)` darebbe la falsa chiave
  // "cfgTipo", che non e' definita da nessuna parte e non lo sara' mai.
  for (const m of sorgente.matchAll(/\b_?T\(\s*'([^']+)'\s*(?=[,)])/g)) usate.add(m[1]);
  for (const m of sorgente.matchAll(/\b_?T\(\s*"([^"]+)"\s*(?=[,)])/g)) usate.add(m[1]);
  return usate;
}

async function chiaviDefinite() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errori = [];
  page.on('pageerror', (e) => errori.push(e.message));

  await page.goto(pathToFileURL(INDEX).href, { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.translations === 'object' || typeof translations === 'object');

  const dati = await page.evaluate(() => {
    // eslint-disable-next-line no-undef
    const t = typeof translations !== 'undefined' ? translations : window.translations;
    const out = {};
    for (const lang of Object.keys(t)) out[lang] = Object.keys(t[lang]).sort();
    return out;
  });

  await browser.close();
  return { dati, errori };
}

const sorgente = SORGENTI.map((f) => fs.readFileSync(f, 'utf8')).join('\n');
const usate = chiaviUsate(sorgente);
const { dati, errori } = await chiaviDefinite();

const linguePresenti = Object.keys(dati).sort();
const problemi = [];

console.log(`\n  chiavi usate nel sorgente : ${usate.size}`);
console.log(`  lingue trovate           : ${linguePresenti.join(', ')}`);

for (const l of LINGUE) {
  if (!linguePresenti.includes(l)) problemi.push(`lingua mancante: ${l}`);
}

const base = dati.it || [];
console.log(`  chiavi definite (it)     : ${base.length}\n`);

for (const lang of linguePresenti) {
  const definite = new Set(dati[lang]);
  const mancanti = [...usate].filter(
    (k) => !definite.has(k) && !ALLOWLIST_DINAMICHE.some((r) => r.test(k)),
  );
  // Rispetto a `it`, per scoprire lingue rimaste indietro.
  const rispettoBase = base.filter((k) => !definite.has(k));

  const stato = mancanti.length === 0 && rispettoBase.length === 0 ? 'ok' : 'DA SISTEMARE';
  console.log(`  ${lang.padEnd(3)} ${String(dati[lang].length).padStart(4)} chiavi  ${stato}`);

  if (mancanti.length) {
    problemi.push(`[${lang}] ${mancanti.length} chiavi usate ma non definite: ${mancanti.slice(0, 8).join(', ')}${mancanti.length > 8 ? '…' : ''}`);
  }
  if (rispettoBase.length) {
    problemi.push(`[${lang}] ${rispettoBase.length} chiavi presenti in 'it' ma assenti qui: ${rispettoBase.slice(0, 8).join(', ')}${rispettoBase.length > 8 ? '…' : ''}`);
  }
}

// Orfane: definite ma mai usate. Segnalazione, mai bloccante: molte chiavi
// legittime vengono risolte dinamicamente.
const orfane = base.filter((k) => !usate.has(k) && !ALLOWLIST_DINAMICHE.some((r) => r.test(k)));

console.log('');
if (errori.length) {
  problemi.push(`errori JS al caricamento della pagina: ${errori.join(' | ')}`);
}
if (orfane.length) {
  console.log(`  ℹ ${orfane.length} chiavi definite ma non trovate nel sorgente (probabile uso dinamico)`);
}

if (problemi.length === 0) {
  console.log('  ✓ traduzioni coerenti\n');
  process.exit(0);
}

console.log(`  ${STRICT ? '✗' : '⚠'} ${problemi.length} problemi:\n`);
for (const p of problemi) console.log(`    - ${p}`);
console.log(STRICT ? '\n  (modalita\' bloccante)\n' : '\n  (modalita\' informativa: diventa bloccante con --strict, previsto dalla Fase 6)\n');

process.exit(STRICT ? 1 : 0);
