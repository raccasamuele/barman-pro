import { test, expect } from '@playwright/test';
import { openApp } from './helpers.js';

/**
 * Menu a righe e selettore drink (ottobre 2026).
 *
 * Il menu non si costruisce piu' da tre campi di ricerca con il datalist del
 * browser: lo riempie il selettore, che lavora su una copia e cambia il menu
 * solo con "Usa". Le tre mappe nome -> frequenza restano quelle che leggono
 * calcolo e golden, quindi qui si guarda che il selettore le scriva giuste.
 */
async function apriMenu(page) {
  await openApp(page);
  await page.evaluate(() => {
    menuSerataDrink = {}; menuSerataMocktail = {}; menuSerataShot = {};
    window.vaiAStep('step-menu');
    renderizzaMenu();
  });
}
const menu = (page) => page.evaluate(() => ({
  drink: { ...menuSerataDrink }, mocktail: { ...menuSerataMocktail }, shot: { ...menuSerataShot },
}));

test.describe('Selettore drink', () => {
  test('spuntare e premere Usa mette ogni voce nel menu giusto, a frequenza 3', async ({ page }) => {
    await apriMenu(page);
    await page.locator('[data-do="bpPickerApri"]').click();
    await expect(page.locator('#bp-picker')).toBeVisible();

    for (const [cat, nome] of [['drink', 'Negroni'], ['mocktail', 'Virgin Mojito'], ['shot', 'Tequila']]) {
      await page.locator(`#bp-pk-chips [data-pk-cat="${cat}"]`).click();
      await page.fill('#bp-pk-q', nome);
      await page.locator(`#bp-pk-lista [data-k="${cat}|${nome}"]`).click();
    }
    await expect(page.locator('#bp-pk-n')).toHaveText('3');
    await page.locator('[data-do="bpPickerUsa"]').click();

    const m = await menu(page);
    expect(m.drink).toEqual({ Negroni: 3 });
    expect(m.mocktail).toEqual({ 'Virgin Mojito': 3 });
    expect(m.shot).toEqual({ Tequila: 3 });
    await expect(page.locator('#bp-menu-righe .bp-voce')).toHaveCount(3);
  });

  test('chiudere senza Usa non cambia il menu', async ({ page }) => {
    await apriMenu(page);
    await page.evaluate(() => { menuSerataDrink = { Negroni: 4 }; renderizzaMenu(); });
    await page.locator('[data-do="bpPickerApri"]').click();
    await page.locator('#bp-pk-lista [data-k="drink|Negroni"]').click();   // tolta...
    await page.locator('[data-do="bpPickerChiudi"]').click();              // ...ma senza Usa
    expect((await menu(page)).drink).toEqual({ Negroni: 4 });
  });

  test('chi resta nel menu tiene la sua frequenza, chi viene tolto esce', async ({ page }) => {
    await apriMenu(page);
    await page.evaluate(() => { menuSerataDrink = { Negroni: 5, Americano: 2 }; renderizzaMenu(); });
    await page.locator('[data-do="bpPickerApri"]').click();
    await page.locator('#bp-pk-lista [data-k="drink|Americano"]').click();
    await page.locator('[data-do="bpPickerUsa"]').click();
    expect((await menu(page)).drink).toEqual({ Negroni: 5 });
  });

  test('la ricerca ignora maiuscole e accenti e non mostra la sigla (HV)', async ({ page }) => {
    await apriMenu(page);
    await page.locator('[data-do="bpPickerApri"]').click();
    await page.fill('#bp-pk-q', 'JAGER');
    const nomi = await page.locator('#bp-pk-lista .bp-voce-nome').allTextContents();
    expect(nomi.some((n) => /J[aä]ger/i.test(n)), `nessun risultato per JAGER: ${nomi.join(', ')}`).toBe(true);
    expect(nomi.some((n) => n.includes('(HV)')), 'la sigla (HV) e\' ancora visibile').toBe(false);
  });

  test('"Crea" fra gli shot aggiunge una bottiglia nuova e la spunta', async ({ page }) => {
    await apriMenu(page);
    await page.locator('[data-do="bpPickerApri"]').click();
    await page.locator('#bp-pk-chips [data-pk-cat="shot"]').click();
    await page.fill('#bp-pk-q', 'Grappa di zio');
    await page.locator('#bp-pk-lista [data-crea]').click();
    await page.locator('[data-do="bpPickerUsa"]').click();
    expect((await menu(page)).shot).toEqual({ 'Grappa di zio': 3 });
    expect(await page.evaluate(() => bpRecipes.amari.includes('Grappa di zio'))).toBe(true);
  });

  test('"Crea" un cocktail apre l\'editor e al salvataggio torna al menu con il drink', async ({ page }) => {
    await apriMenu(page);
    await page.locator('[data-do="bpPickerApri"]').click();
    await page.fill('#bp-pk-q', 'Spritz della casa');
    await page.locator('#bp-pk-lista [data-crea]').click();
    await expect(page.locator('#bpl-name')).toHaveValue('Spritz della casa');
    const riga = page.locator('#bpl-ing .creator-row').first();
    await riga.locator('.ing-nome').fill('Prosecco');
    await riga.locator('.ing-ml').fill('90');
    await page.locator('[data-act="savecocktail"]').click();

    expect(await page.evaluate(() => document.body.dataset.sezione)).toBe('evento');
    expect((await menu(page)).drink).toHaveProperty('Spritz della casa');
  });
});

test.describe('Menu a righe', () => {
  test('i pallini cambiano la frequenza', async ({ page }) => {
    await apriMenu(page);
    await page.evaluate(() => { menuSerataDrink = { Negroni: 3 }; renderizzaMenu(); });
    await page.locator('#bp-menu-righe .bp-voce [data-freq="5"]').click();
    expect((await menu(page)).drink).toEqual({ Negroni: 5 });
    await expect(page.locator('#bp-menu-righe .bp-pallino.on')).toHaveCount(5);
  });

  test('la x toglie la voce', async ({ page }) => {
    await apriMenu(page);
    await page.evaluate(() => { menuSerataDrink = { Negroni: 3, Americano: 3 }; renderizzaMenu(); });
    await page.locator('#bp-menu-righe .bp-voce[data-nome="Americano"] [data-togli]').click();
    expect((await menu(page)).drink).toEqual({ Negroni: 3 });
  });

  test('"Vino e birra" mostra calici e birre al posto delle righe', async ({ page }) => {
    await apriMenu(page);
    await expect(page.locator('#ferm_birra')).toBeHidden();
    await page.locator('#step-menu [data-filtro="ferm"]').click();
    await expect(page.locator('#ferm_birra')).toBeVisible();
    await expect(page.locator('#bp-menu-elenco')).toBeHidden();
  });
});
