#!/usr/bin/env node
/**
 * Cerca i residui del prodotto commerciale in cio' che viene PUBBLICATO.
 *
 * Scansiona solo `public/`, mai l'intero repo: altrimenti troverebbe le
 * proprie stringhe vietate in questo stesso file, nel piano e nei commit —
 * e un controllo che fallisce sempre viene disattivato, quindi non protegge
 * piu' niente.
 *
 * Modalita': informativa per default (exit 0), bloccante con --strict.
 *
 * In CI gira con --strict. Nasceva informativo perche' i residui erano 88 e
 * un controllo sempre rosso viene ignorato — a quel punto non protegge piu'
 * niente. Ora sono zero: ogni nuova occorrenza e' una regressione, non
 * lavoro arretrato, ed e' giusto che fermi la build.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, '..', 'public');

const STRICT = process.argv.includes('--strict');

const VIETATI = [
  { re: /noindex/i,                       cosa: 'meta robots noindex (l\'app ora deve essere indicizzabile)' },
  { re: /demo\.barmanpro\.app/i,          cosa: 'vecchio dominio demo' },
  { re: /barmanpro\.app/i,                cosa: 'vecchio dominio (non rinnovato)' },
  { re: /lemonsqueezy/i,                  cosa: 'checkout / API Lemon Squeezy' },
  { re: /senja\.io/i,                     cosa: 'widget recensioni Senja' },
  { re: /eula/i,                          cosa: 'riferimento all\'EULA (sostituito dalla licenza MIT)' },
  { re: /\b(14,90|19,90)\b/,              cosa: 'prezzo del prodotto a pagamento' },
  { re: /102 ricette/i,                   cosa: 'claim "102 ricette" (il database ne ha 137)' },
  { re: /barmanproapp@gmail\.com/i,       cosa: 'vecchio indirizzo email' },
  { re: /#722F37/i,                       cosa: 'colore borgogna legacy (theme-color / manifest)' },
  { re: /Tutti i diritti riservati/i,     cosa: 'claim di copyright proprietario' },
  { re: /fonts\.googleapis\.com/i,        cosa: 'Google Fonts da CDN (i font vanno self-hostati)' },
  { re: /\.\/app\.html/,                  cosa: 'link a app.html: era la demo, il calcolatore ora sta in ./' },
];

/**
 * Occorrenze legittime, da non segnalare.
 * Ogni voce va motivata: un'allowlist senza motivazione diventa il posto dove
 * si nascondono i problemi.
 */
const ALLOWLIST = [
  // esempio: { file: 'public/privacy.html', re: /barmanpro\.app/, perche: '…' },
];

const ESTENSIONI = new Set(['.html', '.js', '.json', '.txt', '.xml', '.css', '.webmanifest']);

function* fileDaControllare(dir) {
  for (const voce of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, voce.name);
    if (voce.isDirectory()) yield* fileDaControllare(p);
    else if (ESTENSIONI.has(path.extname(voce.name))) yield p;
  }
}

const trovati = [];

for (const file of fileDaControllare(PUBLIC)) {
  const rel = path.relative(path.resolve(__dirname, '..'), file).replace(/\\/g, '/');
  const righe = fs.readFileSync(file, 'utf8').split(/\r?\n/);

  righe.forEach((riga, i) => {
    for (const { re, cosa } of VIETATI) {
      if (!re.test(riga)) continue;
      const scusato = ALLOWLIST.some((a) => a.file === rel && a.re.test(riga));
      if (scusato) continue;
      trovati.push({ file: rel, riga: i + 1, cosa, testo: riga.trim().slice(0, 110) });
    }
  });
}

// Raggruppa per tipo: 40 occorrenze dello stesso problema sono un problema
// solo, e un elenco piatto lo nasconde.
const perTipo = new Map();
for (const t of trovati) {
  if (!perTipo.has(t.cosa)) perTipo.set(t.cosa, []);
  perTipo.get(t.cosa).push(t);
}

console.log(`\n  scansionato: public/  ·  ${trovati.length} occorrenze in ${perTipo.size} categorie\n`);

if (trovati.length === 0) {
  console.log('  ✓ nessun residuo del prodotto commerciale\n');
  process.exit(0);
}

for (const [cosa, occ] of [...perTipo.entries()].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`  ${String(occ.length).padStart(3)}x  ${cosa}`);
  for (const o of occ.slice(0, 3)) console.log(`         ${o.file}:${o.riga}`);
  if (occ.length > 3) console.log(`         … e altre ${occ.length - 3}`);
}

console.log(
  STRICT
    ? '\n  ✗ residui presenti (modalita\' bloccante)\n'
    : '\n  ⚠ modalita\' informativa. In CI questo controllo gira con --strict:\n    ogni occorrenza e\' una regressione e ferma la build.\n',
);

process.exit(STRICT ? 1 : 0);
