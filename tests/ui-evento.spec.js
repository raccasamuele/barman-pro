import { test, expect } from '@playwright/test';
import { openApp } from './helpers.js';

/**
 * Pagina evento (ottobre 2026): Setup e Menu insieme, righe con − / +,
 * "chi beve" in persone, una barra in fondo con costo e "Genera la lista".
 *
 * I campi hanno tenuto gli id (#ospiti, #drink_testa, #pct-bevitori...):
 * il calcolo e i golden non se ne accorgono. Qui si verifica che la nuova
 * presentazione li muova davvero, e che le azioni dichiarate nel markup
 * (salvataggio, stima) girino anche quando il valore cambia da un bottone.
 */
async function apriEvento(page) {
  await openApp(page);
  await page.evaluate(() => window.vaiAStep('step-setup'));
}

test.describe('Evento · − / +', () => {
  test('il + arrotonda al passo e il − si ferma al minimo', async ({ page }) => {
    await apriEvento(page);
    await page.fill('#ospiti', '47');
    await page.locator('[data-arg="ospiti|5"]').click();
    await expect(page.locator('#ospiti')).toHaveValue('50');

    await page.fill('#shot_testa', '0.5');
    await page.locator('[data-arg="shot_testa|-0.5"]').click();
    await page.locator('[data-arg="shot_testa|-0.5"]').click();
    await expect(page.locator('#shot_testa'), 'e\' sceso sotto il minimo').toHaveValue('0');
  });

  test('cambiare con i bottoni salva, come scrivere nel campo', async ({ page }) => {
    await apriEvento(page);
    await page.evaluate(() => { bpAutoSave = true; });
    await page.locator('[data-arg="ospiti|5"]').click();
    await page.waitForFunction(
      () => (JSON.parse(localStorage.getItem('barmanProState_v8') || '{}').config || {}).ospiti === '55',
      null, { timeout: 5000 },
    );
  });

  test('chi beve si legge in persone e segue gli ospiti', async ({ page }) => {
    await apriEvento(page);
    await page.fill('#pct-bevitori', '80');
    await page.locator('#pct-bevitori').dispatchEvent('input');
    await expect(page.locator('#bp-bevitori-pers')).toHaveText('40');
    await page.locator('[data-arg="ospiti|5"]').click();
    await expect(page.locator('#bp-bevitori-pers')).toHaveText('44');
    await expect(page.locator('#bp-bevitori-tot')).toHaveText('55');
  });
});

test.describe('Evento · una pagina sola', () => {
  test('Setup e Menu si vedono insieme, con la barra; nella lista no', async ({ page }) => {
    await apriEvento(page);
    await expect(page.locator('[data-stepid="step-setup"]')).toBeVisible();
    await expect(page.locator('[data-stepid="step-menu"]')).toBeVisible();
    await expect(page.locator('.bp-ev-azione:not(.bp-lista-azione)')).toBeVisible();

    // Il passo salvato resta quello chiesto: "riprendi" deve portare al menu.
    await page.evaluate(() => window.vaiAStep('step-menu'));
    expect(await page.evaluate(() => bpPassoCorrente)).toBe('step-menu');
    await expect(page.locator('.app-stepper .step.active')).toHaveAttribute('data-step', 'step-setup');

    await page.evaluate(() => {
      menuSerataDrink = { 'Negroni': 3 };
      window.vaiAStep('risultati');
    });
    await expect(page.locator('[data-stepid="risultati"]')).toBeVisible();
    await expect(page.locator('[data-stepid="step-setup"]')).toBeHidden();
    await expect(page.locator('.bp-ev-azione:not(.bp-lista-azione)')).toBeHidden();
    // nella lista c'e' la sua barra, con "Salva evento"
    await expect(page.locator('.bp-lista-azione')).toBeVisible();
  });

  test('la barra mostra il costo appena c\'e\' un menu', async ({ page }) => {
    await apriEvento(page);
    await page.evaluate(() => { menuSerataDrink = { 'Negroni': 3 }; aggiornaStimaForm(); });
    await expect(page.locator('#stima-live-form')).toBeVisible();
    await expect(page.locator('#stima-live-tot')).toContainText('€');
  });

  test('le altre opzioni partono chiuse e si aprono', async ({ page }) => {
    await apriEvento(page);
    await expect(page.locator('#scarto')).toBeHidden();
    await page.locator('.bp-altre > summary').click();
    await expect(page.locator('#scarto')).toBeVisible();
  });
});
