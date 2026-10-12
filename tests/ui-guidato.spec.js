import { test, expect } from '@playwright/test';
import { openApp } from './helpers.js';

/**
 * Flusso guidato a 5 passi (ottobre 2026): evento, ospiti, chi beve, menu,
 * riepilogo. Erano 13 schermate da una domanda. Al passo Menu c'e' il
 * selettore drink con le proposte del tipo di evento gia' spuntate.
 */
async function apriGuidato(page) {
  await openApp(page);
  await page.evaluate(() => window.bpCfgStart());
  await expect(page.locator('#bp-config')).toBeVisible();
}
const avanti = (page) => page.locator('#bp-cfg-next').click();
const passo = (page) => page.evaluate(() => BP_CFG_STEPS[bpCfgIdx]);

test.describe('Guidato · 5 passi', () => {
  test('i passi sono cinque, nell\'ordine giusto', async ({ page }) => {
    await apriGuidato(page);
    const visti = [];
    for (let i = 0; i < 5; i++) {
      visti.push(await passo(page));
      if (i < 4) await avanti(page);
    }
    expect(visti).toEqual(['evento', 'ospiti', 'bevitori', 'menu', 'riepilogo']);
    await expect(page.locator('#bp-cfg-count')).toContainText('5');
  });

  test('al passo Menu le proposte sono gia\' spuntate e segnate', async ({ page }) => {
    await apriGuidato(page);
    await page.locator('[data-cfg-tipo="matrimonio"]').click();
    for (let i = 0; i < 3; i++) await avanti(page);
    expect(await passo(page)).toBe('menu');
    const spuntate = page.locator('#bp-cfg-mount .bp-pk-voce.on');
    expect(await spuntate.count()).toBeGreaterThan(2);
    await expect(spuntate.first().locator('.bp-pk-tag')).toBeVisible();
    await expect(page.locator('#bp-cfg-mount .bp-pk-n')).toHaveText(String(await spuntate.count()));
  });

  test('aggiungere e togliere al passo Menu finisce nel menu dell\'evento', async ({ page }) => {
    await apriGuidato(page);
    for (let i = 0; i < 3; i++) await avanti(page);
    const primo = await page.locator('#bp-cfg-mount .bp-pk-voce.on').first().getAttribute('data-k');
    await page.locator('#bp-cfg-mount .bp-pk-voce.on').first().click();
    await page.fill('#bp-cfg-mount .bp-pk-q', 'Negroni');
    await page.locator('#bp-cfg-mount [data-k="drink|Negroni"]').click();
    await avanti(page);
    await avanti(page);   // Genera la lista

    const m = await page.evaluate(() => ({ d: { ...menuSerataDrink }, m: { ...menuSerataMocktail }, s: { ...menuSerataShot } }));
    const [tipo, nome] = [primo.slice(0, primo.indexOf('|')), primo.slice(primo.indexOf('|') + 1)];
    const mappa = tipo === 'drink' ? m.d : tipo === 'mocktail' ? m.m : m.s;
    expect(mappa, `"${nome}" e' stato tolto ma e' nel menu`).not.toHaveProperty(nome);
    expect(m.d.Negroni, 'aggiunto a mano: parte da frequenza 3').toBe(3);
  });

  test('tornare indietro non perde le scelte; cambiare tipo di evento si', async ({ page }) => {
    await apriGuidato(page);
    for (let i = 0; i < 3; i++) await avanti(page);
    // Zombie non e' fra le proposte di nessun tipo: se c'e', l'ha messo l'utente.
    await page.fill('#bp-cfg-mount .bp-pk-q', 'Zombie');
    await page.locator('#bp-cfg-mount [data-k="drink|Zombie"]').click();

    await page.locator('#bp-cfg-back').click();   // a "chi beve"...
    await avanti(page);                             // ...e di nuovo al menu
    expect(await page.evaluate(() => bpCfgScelta.has('drink|Zombie'))).toBe(true);

    // Il tipo di evento cambia le proposte: si riparte da quelle nuove.
    for (let i = 0; i < 3; i++) await page.locator('#bp-cfg-back').click();
    await page.locator('[data-cfg-tipo="aziendale"]').click();
    for (let i = 0; i < 3; i++) await avanti(page);
    expect(await page.evaluate(() => bpCfgScelta.has('drink|Zombie'))).toBe(false);
  });

  test('ospiti, durata e interruttori arrivano ai campi dell\'evento', async ({ page }) => {
    await apriGuidato(page);
    await page.fill('#bpc-nome', 'Laurea di Giulia');
    await avanti(page);
    await page.locator('[data-cfg-passo="5"]').click();   // 50 -> 55
    await page.locator('[data-cfg-seg="durata"][data-val="lunga"]').click();
    await expect(page.locator('[data-cfg-seg="durata"][data-val="lunga"]')).toHaveAttribute('aria-checked', 'true');
    await avanti(page);
    await page.locator('[data-cfg-sw="fermentati"]').click();   // spento
    await avanti(page); await avanti(page); await avanti(page);

    const r = await page.evaluate(() => ({
      ospiti: document.getElementById('ospiti').value,
      birra: document.getElementById('ferm_birra').value,
      nome: bpCfgNomeEvento,
      passo: bpPassoCorrente,
    }));
    expect(r).toEqual({ ospiti: '55', birra: '0', nome: 'Laurea di Giulia', passo: 'risultati' });
  });

  test('il costo e\' in barra durante i passi, nel riquadro grande al riepilogo', async ({ page }) => {
    await apriGuidato(page);
    await expect(page.locator('#bp-cfg-costo')).toContainText('€');
    for (let i = 0; i < 4; i++) await avanti(page);
    expect(await passo(page)).toBe('riepilogo');
    await expect(page.locator('#bp-cfg-costo')).toBeEmpty();
    await expect(page.locator('#bp-cfg-mount .bpc-totale')).toContainText('€');
  });
});
