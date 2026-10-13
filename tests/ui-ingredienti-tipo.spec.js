import { test, expect } from '@playwright/test';

/**
 * Segnalato dall'utente il 13/10/2026: creando un cocktail con il Succo di
 * Lime e lasciando il tipo su "alcolico" (il predefinito), il lime finiva
 * fra gli alcolici della lista. Per gli ingredienti che il database conosce
 * il tipo lo decide l'app; si sceglie a mano solo per un ingrediente nuovo.
 */

async function apri(browser, semi = {}) {
  const contesto = await browser.newContext({ locale: 'it-IT' });
  const page = await contesto.newPage();
  await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
  await page.addInitScript((s) => {
    localStorage.setItem('bp_onboarded', '1');
    for (const [k, v] of Object.entries(s)) localStorage.setItem(k, JSON.stringify(v));
  }, semi);
  await page.goto('/index.html', { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.bpLibShowEditor === 'function');
  return { contesto, page };
}

test.describe('Ingredienti · il tipo di quelli noti lo decide l\'app', () => {
  test('nell\'editor il tipo si imposta e si blocca; un ingrediente nuovo resta libero', async ({ browser }) => {
    const { contesto, page } = await apri(browser);
    await page.evaluate(() => { window.bpLibraryOpen('cocktail'); window.bpLibShowEditor('cocktail'); });
    await page.fill('#bpl-name', 'Prova Lime');
    const righe = page.locator('#bpl-ing .creator-row');

    await righe.nth(0).locator('.ing-nome').fill('succo di lime');   // minuscolo: deve riconoscerlo lo stesso
    await expect(righe.nth(0).locator('.ing-tipo')).toHaveValue('analcolico');
    await expect(righe.nth(0).locator('.ing-tipo')).toBeDisabled();
    await righe.nth(0).locator('.ing-ml').fill('20');

    await righe.nth(1).locator('.ing-nome').fill('Liquore della nonna');
    await expect(righe.nth(1).locator('.ing-tipo')).toBeEnabled();
    await righe.nth(1).locator('.ing-tipo').selectOption('alcolico');
    await righe.nth(1).locator('.ing-ml').fill('40');

    await page.locator('[data-act="savecocktail"]').click();
    const salvata = await page.evaluate(() => JSON.parse(localStorage.getItem('bp_recipes_v2')).mods['Prova Lime']);
    expect(salvata.map((i) => i.tipo)).toEqual(['analcolico', 'alcolico']);
    await contesto.close();
  });

  test('una ricetta salvata prima con il lime "alcolico" mette il lime fra gli analcolici', async ({ browser }) => {
    const sbagliata = [{ nome: 'Rum Bianco', tipo: 'alcolico', ml: 50 }, { nome: 'Succo di Lime', tipo: 'alcolico', ml: 20 }];
    const { contesto, page } = await apri(browser, { bp_recipes_v2: { mods: { 'Test Lime': sbagliata }, custom: ['Test Lime'] } });
    const gruppi = await page.evaluate(() => {
      menuSerataDrink = { 'Test Lime': 3 };
      const m = bpCalcolaModello({ ...bpParametriDalForm(), drink: { 'Test Lime': 3 }, mocktail: {}, shot: {} });
      const g = (id) => (m.righe.find((r) => r.id === id) || {}).gruppo;
      return { lime: g('ing:Succo di Lime'), rum: g('ing:Rum Bianco') };
    });
    expect(gruppi).toEqual({ lime: 'analcolici', rum: 'alcolici' });
    await contesto.close();
  });
});
