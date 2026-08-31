import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { openApp, calcola, stima, toNumber } from './helpers.js';
import { CASI, CASI_RIFIUTATI } from './cases.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GOLDEN_FILE = path.join(__dirname, 'golden', 'calc.json');

const UPDATE = process.env.UPDATE_GOLDEN === '1';

function loadGolden() {
  if (!fs.existsSync(GOLDEN_FILE)) return null;
  return JSON.parse(fs.readFileSync(GOLDEN_FILE, 'utf8'));
}

/**
 * Il golden e' la rete di sicurezza dell'intero progetto: dalla Fase 5 si
 * riscrivono le template string dentro lo stesso file dove vive il motore di
 * calcolo. Senza una baseline numerica, una regressione sui totali non fa
 * rumore — l'app continua a mostrare un numero, semplicemente sbagliato.
 *
 * Rigenerare SOLO quando il modello di costo cambia di proposito:
 *   UPDATE_GOLDEN=1 npx playwright test golden-calc --project=golden
 */
test.describe('golden · motore di calcolo', () => {
  const golden = loadGolden();
  const risultati = {};

  test.afterAll(() => {
    if (!UPDATE) return;
    fs.mkdirSync(path.dirname(GOLDEN_FILE), { recursive: true });
    fs.writeFileSync(GOLDEN_FILE, JSON.stringify(risultati, null, 2) + '\n', 'utf8');
    console.log(`\ngolden rigenerato: ${Object.keys(risultati).length} casi -> ${GOLDEN_FILE}`);
  });

  for (const caso of CASI) {
    test(caso.nome, async ({ page }) => {
      const app = await openApp(page);
      const out = await calcola(page, caso);
      app.assertNoLicenseCalls();

      expect(out.ok, 'il calcolo doveva andare a buon fine').not.toBe(false);
      expect(out.budgetAmount, 'nessun totale prodotto').toMatch(/\d/);

      const snapshot = {
        budgetAmount: out.budgetAmount,
        perPersona: out.perPersona,
        righeCount: out.righeCount,
        righe: out.righe,
      };

      if (UPDATE) {
        risultati[caso.nome] = snapshot;
        return;
      }

      expect(golden, `golden mancante: rigenera con UPDATE_GOLDEN=1`).not.toBeNull();
      expect(golden[caso.nome], `caso non presente nel golden: ${caso.nome}`).toBeDefined();
      expect(snapshot).toEqual(golden[caso.nome]);
    });
  }

  for (const caso of CASI_RIFIUTATI) {
    test(`rifiutato · ${caso.nome}`, async ({ page }) => {
      await openApp(page);
      const out = await calcola(page, caso);
      // Deve rifiutare esplicitamente, non produrre un totale a caso.
      expect(out.ok, 'il calcolo doveva rifiutare questo input').toBe(false);
    });
  }
});

/**
 * `calcolaSpesa` e `stimaBudget` sono due implementazioni separate dello
 * stesso modello di costo e devono coincidere. E' un debito noto del
 * progetto: questo test non lo paga, lo rende visibile prima che diverga.
 */
test.describe('golden · calcolaSpesa vs stimaBudget', () => {
  for (const caso of CASI) {
    test(`coerenza · ${caso.nome}`, async ({ page }) => {
      await openApp(page);

      const out = await calcola(page, caso);
      test.skip(out.ok === false, 'caso rifiutato dal calcolo');

      const est = await stima(page, caso);
      const totCalcolato = toNumber(out.budgetAmount);

      expect(Number.isFinite(totCalcolato), `totale non numerico: ${out.budgetAmount}`).toBe(true);
      expect(Number.isFinite(est.totale), 'stimaBudget non ha prodotto un totale').toBe(true);

      // Tolleranza 1 centesimo: le due funzioni arrotondano in punti diversi.
      expect(Math.abs(totCalcolato - est.totale)).toBeLessThanOrEqual(0.01);
    });
  }
});
