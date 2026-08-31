import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { openApp } from './helpers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSS = fs.readFileSync(path.join(__dirname, '..', 'public', 'app.css'), 'utf8');

/**
 * Il CSS fallisce in silenzio, ed e' il modo peggiore di fallire.
 *
 * Durante la Fase 4 una regex ha rimosso l'inizio di un blocco @keyframes
 * lasciando orfano il pezzo finale: una graffa di troppo. Il browser ha
 * smesso di interpretare il foglio dopo 182 regole su oltre duemila righe,
 * l'app e' apparsa completamente rotta e nessun test se n'e' accorto —
 * i golden passavano, perche' il calcolo non c'entra niente con il CSS.
 *
 * Da qui in poi la salute del foglio di stile e' verificata, non sperata.
 */
test.describe('CSS · il foglio di stile viene interpretato per intero', () => {
  test('le graffe sono bilanciate', () => {
    let profondita = 0;
    let rigaRotta = -1;
    const righe = CSS.replace(/\/\*[\s\S]*?\*\//g, '').split('\n');

    righe.forEach((riga, i) => {
      for (const c of riga) {
        if (c === '{') profondita++;
        else if (c === '}') profondita--;
      }
      if (profondita < 0 && rigaRotta < 0) rigaRotta = i + 1;
    });

    expect(rigaRotta, `graffa di chiusura in eccesso intorno alla riga ${rigaRotta}`).toBe(-1);
    expect(profondita, `${profondita} blocchi aperti e mai chiusi`).toBe(0);
  });

  test('nessun frammento di @keyframes orfano', () => {
    const righe = CSS.split('\n');
    const orfani = [];
    let dentroKeyframes = false;
    let profondita = 0;

    righe.forEach((riga, i) => {
      if (/@keyframes/.test(riga)) dentroKeyframes = true;
      for (const c of riga) {
        if (c === '{') profondita++;
        else if (c === '}') { profondita--; if (profondita === 0) dentroKeyframes = false; }
      }
      // Uno step percentuale fuori da un blocco @keyframes e' un resto di
      // rimozione mal riuscita, non CSS valido.
      if (!dentroKeyframes && /^\s*\d{1,3}%\s*\{/.test(riga)) orfani.push(i + 1);
    });

    expect(orfani, `step di keyframes fuori da @keyframes alle righe: ${orfani.join(', ')}`).toEqual([]);
  });

  test('il browser interpreta tutte le regole, non solo le prime', async ({ page }) => {
    await openApp(page);

    const stato = await page.evaluate(() => {
      const fogli = [...document.styleSheets].filter((s) => (s.href || '').includes('app.css'));
      if (!fogli.length) return { trovato: false, regole: 0 };
      try {
        return { trovato: true, regole: fogli[0].cssRules.length };
      } catch (e) {
        return { trovato: true, regole: -1, errore: String(e) };
      }
    });

    expect(stato.trovato, 'app.css non risulta caricato').toBe(true);

    // Soglia volutamente bassa e assoluta: non serve inseguire il numero
    // esatto di regole a ogni modifica, serve accorgersi quando il parser
    // si ferma dopo poche centinaia perche' il foglio e' rotto.
    expect(
      stato.regole,
      `app.css interpretato solo parzialmente (${stato.regole} regole): probabile errore di sintassi`,
    ).toBeGreaterThan(400);
  });

  test('le fondamenta visive sono quelle nuove', async ({ page }) => {
    await openApp(page);

    const t = await page.evaluate(() => {
      const cs = getComputedStyle(document.documentElement);
      return {
        bg: cs.getPropertyValue('--bp-bg').trim(),
        accento: cs.getPropertyValue('--bp-accent').trim(),
        font: cs.getPropertyValue('--bp-font').trim(),
        // il burger deve essere fisso: se il foglio si rompe torna "static"
        burger: getComputedStyle(document.getElementById('bp-burger')).position,
      };
    });

    expect(t.bg, 'token --bp-bg mancante').toMatch(/oklch/);
    expect(t.accento, 'token --bp-accent mancante').toMatch(/oklch/);
    expect(t.font, 'la famiglia tipografica non e\' quella nuova').toMatch(/Manrope/);
    expect(t.burger, 'il bottone Home non e\' posizionato: il foglio non e\' applicato').toBe('fixed');
  });
});
