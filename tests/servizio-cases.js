/**
 * Menu salvati con i nomi di prima della fase (c): "(HV)" e "(IBA)".
 *
 * I valori attesi in golden/servizio-prima.json sono stati presi dal codice
 * in produzione PRIMA del lavoro (commit dbadf0b, versione CF 7c8c12d1),
 * calcolando questi stessi menu con i nomi vecchi. Non si rigenerano: sono
 * la prova che un evento salvato ieri ridà oggi lo stesso totale.
 */
export const CASI_PRIMA = [
  {
    nome: 'serata con quattro HV',
    ospiti: 80, drinkTesta: 3, shotTesta: 1, scarto: 15, pct: 80,
    drink: { 'Vodka Redbull (HV)': 4, 'Rum & Coca (HV)': 4, 'Gin Lemon (HV)': 3, 'Mojito': 3, 'Gin Tonic (HV)': 3 },
    mocktail: { 'Virgin Mojito': 3 },
    shot: { 'Jägermeister': 3, 'Tequila': 2 },
  },
  {
    nome: 'matrimonio con un solo HV',
    ospiti: 120, drinkTesta: 3, shotTesta: 0.5, scarto: 15, pct: 85,
    drink: { 'Spritz': 4, 'Negroni': 3, 'Gin Tonic (HV)': 3, 'Bellini': 3, 'Americano': 3 },
    mocktail: { 'Virgin Mojito': 3 },
    shot: { 'Mirto': 2, 'Amaro Montenegro': 2 },
    ferm: { rosso: 0.25, bianco: 0.5, bollicine: 1, birra: 0.1 },
  },
  {
    nome: 'aperitivo con i nomi IBA',
    ospiti: 50, drinkTesta: 2, shotTesta: 0, scarto: 15, pct: 80,
    drink: { 'Spritz': 5, 'Garibaldi (IBA)': 3, 'Moscow Mule (IBA)': 2 },
  },
  {
    nome: 'tutti i 21 HV',
    ospiti: 200, drinkTesta: 4, shotTesta: 0, scarto: 10, pct: 90,
    drink: Object.fromEntries([
      'Vodka Redbull', 'Vodka Lemon', 'Vodka Menta Redbull', 'Vodka Pesca Redbull', 'Vodka Fragola Redbull',
      'Vodka Melone Redbull', 'Vodka Menta Lemon', 'Vodka Pesca Lemon', 'Vodka Fragola Lemon', 'Vodka Melone Lemon',
      'Gin Tonic', 'Gin Lemon', 'Rum & Coca', 'Monte & Coca', 'Jager & Redbull', 'Malibu & Ananas', 'Midori Lemon',
      'Garibaldi', 'Fernandito', 'Dark N Stormy', 'Horses Neck',
    ].map((n, i) => [n + ' (HV)', 1 + (i % 3)])),
  },
];
