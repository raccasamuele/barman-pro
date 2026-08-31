import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { openApp } from './helpers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, 'golden', 'db.json');
const UPDATE = process.env.UPDATE_GOLDEN === '1';

/**
 * Congela il database ricette.
 *
 * Non e' un test di qualita' delle ricette: e' un sigillo. Nelle Fasi 3 e 5 si
 * sposta e si riscrive il file che contiene questo literal, ed e' esattamente
 * il tipo di operazione in cui una ricetta puo' sparire o cambiare dose senza
 * che nessuno se ne accorga — il totale continuerebbe a essere "un numero".
 *
 * Congela il literal `databaseDrink`, NON lo stato utente: le ricette aggiunte
 * a runtime vivono in `bp_recipes` e non fanno parte di questo sigillo.
 */
test('golden · il database ricette e\' invariato', async ({ page }) => {
  await openApp(page);

  const snapshot = await page.evaluate(() => {
    // DB_ORIGINAL e' la copia fatta al load, prima che bp_recipes venga
    // riapplicato: e' il literal, non lo stato dell'utente.
    // eslint-disable-next-line no-undef
    const db = typeof DB_ORIGINAL !== 'undefined' ? DB_ORIGINAL : databaseDrink;
    const nomi = Object.keys(db).sort();

    // Impronta stabile: nome + ingredienti in ordine dichiarato, con dosi.
    const impronta = nomi.map((n) => {
      const ing = (db[n] || []).map((i) => `${i.nome}|${i.tipo}|${i.ml}`).join(';');
      return `${n}=>${ing}`;
    }).join('\n');

    // Hash djb2: non serve robustezza crittografica, serve che cambi se
    // cambia qualcosa.
    let h = 5381;
    for (let i = 0; i < impronta.length; i++) h = ((h << 5) + h + impronta.charCodeAt(i)) | 0;

    const ingredienti = new Set();
    nomi.forEach((n) => (db[n] || []).forEach((i) => ingredienti.add(i.nome)));

    return {
      conteggio: nomi.length,
      nomi,
      ingredienti: [...ingredienti].sort(),
      hash: (h >>> 0).toString(16),
    };
  });

  if (UPDATE) {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(snapshot, null, 2) + '\n', 'utf8');
    console.log(`\ndb congelato: ${snapshot.conteggio} ricette, ${snapshot.ingredienti.length} ingredienti, hash ${snapshot.hash}`);
    return;
  }

  expect(fs.existsSync(DB_FILE), 'freeze del db mancante: rigenera con UPDATE_GOLDEN=1').toBe(true);
  const atteso = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

  expect(snapshot.conteggio, 'il numero di ricette e\' cambiato').toBe(atteso.conteggio);
  expect(snapshot.nomi, 'l\'elenco delle ricette e\' cambiato').toEqual(atteso.nomi);
  expect(snapshot.ingredienti, 'l\'elenco degli ingredienti e\' cambiato').toEqual(atteso.ingredienti);
  expect(snapshot.hash, 'una dose o un ingrediente e\' cambiato').toBe(atteso.hash);
});
