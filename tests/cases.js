/**
 * Casi del golden test.
 *
 * Coprono tre assi: scala (10 -> 150 ospiti), composizione del menu
 * (alcolici / mocktail / shot / misti) e i limiti che rompono le formule
 * (0% e 100% bevitori, menu vuoti, decimali, pesi sbilanciati).
 *
 * I nomi dei drink devono esistere nel database: se una ricetta viene
 * rinominata, il test fallisce — ed e' il comportamento voluto, perche' il
 * database e' congelato dal freeze in golden-db.spec.js.
 */

const CLASSICI = { 'Negroni': 3, 'Spritz': 5, 'Mojito': 2 };
const MOCKTAIL = { 'Virgin Mojito': 3, 'Shirley Temple': 2 };
const SHOT = { 'Tequila': 2, 'Sambuca': 1 };

export const CASI = [
  // ── scala ────────────────────────────────────────────────────────────
  { nome: '10 ospiti · menu classico', ospiti: 10, drinkTesta: 3, shotTesta: 1, scarto: 15, pct: 80, drink: CLASSICI },
  { nome: '50 ospiti · menu classico', ospiti: 50, drinkTesta: 3, shotTesta: 1, scarto: 15, pct: 80, drink: CLASSICI },
  { nome: '80 ospiti · menu classico', ospiti: 80, drinkTesta: 3, shotTesta: 1, scarto: 15, pct: 80, drink: CLASSICI },
  { nome: '150 ospiti · menu classico', ospiti: 150, drinkTesta: 3, shotTesta: 1, scarto: 15, pct: 80, drink: CLASSICI },

  // ── percentuale bevitori, inclusi i due estremi ──────────────────────
  { nome: '80 ospiti · 0% bevitori', ospiti: 80, drinkTesta: 3, shotTesta: 1, scarto: 15, pct: 0, drink: CLASSICI, mocktail: MOCKTAIL },
  { nome: '80 ospiti · 1% bevitori', ospiti: 80, drinkTesta: 3, shotTesta: 1, scarto: 15, pct: 1, drink: CLASSICI, mocktail: MOCKTAIL },
  { nome: '80 ospiti · 50% bevitori', ospiti: 80, drinkTesta: 3, shotTesta: 1, scarto: 15, pct: 50, drink: CLASSICI, mocktail: MOCKTAIL },
  { nome: '80 ospiti · 100% bevitori', ospiti: 80, drinkTesta: 3, shotTesta: 1, scarto: 15, pct: 100, drink: CLASSICI, mocktail: MOCKTAIL },

  // ── composizione del menu ────────────────────────────────────────────
  { nome: 'solo mocktail', ospiti: 60, drinkTesta: 3, shotTesta: 0, scarto: 15, pct: 0, mocktail: MOCKTAIL },
  { nome: 'solo shot', ospiti: 60, drinkTesta: 0, shotTesta: 2, scarto: 15, pct: 100, shot: SHOT },
  { nome: 'misto completo', ospiti: 100, drinkTesta: 3, shotTesta: 1, scarto: 15, pct: 75, drink: CLASSICI, mocktail: MOCKTAIL, shot: SHOT },
  { nome: 'un solo drink in menu', ospiti: 40, drinkTesta: 4, shotTesta: 0, scarto: 10, pct: 90, drink: { 'Negroni': 1 } },

  // ── limiti numerici ──────────────────────────────────────────────────
  { nome: 'decimali su drink/testa', ospiti: 33, drinkTesta: 2.5, shotTesta: 0.5, scarto: 12, pct: 70, drink: CLASSICI, shot: SHOT },
  { nome: 'scarto 0%', ospiti: 50, drinkTesta: 3, shotTesta: 1, scarto: 0, pct: 80, drink: CLASSICI },
  { nome: 'scarto alto (50%)', ospiti: 50, drinkTesta: 3, shotTesta: 1, scarto: 50, pct: 80, drink: CLASSICI },
  { nome: 'pesi sbilanciati', ospiti: 70, drinkTesta: 3, shotTesta: 1, scarto: 15, pct: 80, drink: { 'Negroni': 1, 'Spritz': 20 } },
  { nome: '1 solo ospite', ospiti: 1, drinkTesta: 3, shotTesta: 1, scarto: 15, pct: 100, drink: CLASSICI },
  // 0 ospiti non e' raggiungibile dall'interfaccia (l'input ha min="1"), ma
  // impostandolo a mano il calcolo NON rifiuta: produce "€ 0,00" e lascia
  // vuoto il costo a persona, perche' la divisione per zero e' gia' guardata.
  // Il golden registra questo comportamento reale — non quello desiderabile.
  { nome: '0 ospiti · degrada a zero', ospiti: 0, drinkTesta: 3, shotTesta: 1, scarto: 15, pct: 80, drink: CLASSICI },

  // ── fascia di prezzo e paese (entrano in indiciGeo) ───────────────────
  { nome: 'fascia bassa', ospiti: 50, drinkTesta: 3, shotTesta: 1, scarto: 15, pct: 80, fascia: 'bassa', drink: CLASSICI },
  { nome: 'fascia alta', ospiti: 50, drinkTesta: 3, shotTesta: 1, scarto: 15, pct: 80, fascia: 'alta', drink: CLASSICI },
];

/** Casi che devono essere RIFIUTATI dal calcolo, non calcolati male. */
export const CASI_RIFIUTATI = [
  { nome: 'menu completamente vuoto', ospiti: 50, drinkTesta: 3, shotTesta: 1, scarto: 15, pct: 80 },
];
