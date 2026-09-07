import { test, expect } from '@playwright/test';
import { openApp } from './helpers.js';

/**
 * I dialoghi veri: quelli che si sovrappongono a una sezione invece di
 * sostituirla.
 *
 * Dichiaravano `aria-modal="true"` e non facevano niente di quello che
 * quell'attributo promette: il focus non ci entrava, si usciva col Tab e si
 * continuava a tabbare sulla pagina dietro, Escape non chiudeva, e alla
 * chiusura il focus finiva sul body invece che sul comando che li aveva
 * aperti. Con uno screen reader era una finestra che si apre e non ti ci
 * porta dentro.
 *
 * L'inventario e' piu' lungo di quanto sembrasse: oltre a welcome e wizard ci
 * sono #bp-menu, che ha role="dialog" ma una classe tutta sua, e
 * #suggeritore-modal, che non aveva alcuna semantica.
 */

const apri = (page, id) => page.evaluate((i) => window.bpApriModale(i), id);

test.describe('Dialoghi · focus e tastiera', () => {
  test('aprire porta il focus dentro la finestra', async ({ page }) => {
    await openApp(page);
    await apri(page, 'bp-welcome');

    const dentro = await page.evaluate(() => {
      const d = document.getElementById('bp-welcome');
      return d.contains(document.activeElement);
    });
    expect(dentro, 'il focus e\' rimasto fuori dal dialogo').toBe(true);
  });

  test('Escape chiude', async ({ page }) => {
    await openApp(page);
    await apri(page, 'bp-welcome');

    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);

    expect(await page.evaluate(() =>
      document.getElementById('bp-welcome').classList.contains('show'))).toBe(false);
  });

  test('chiudere riporta il focus su chi aveva aperto', async ({ page }) => {
    await openApp(page);

    // Si apre da un comando vero, per poterci tornare sopra.
    await page.evaluate(() => {
      const b = document.querySelector('.bp-tab[data-sezione="home"]');
      b.focus();
      window.bpApriModale('bp-welcome', b);
    });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);

    const tornato = await page.evaluate(() =>
      document.activeElement === document.querySelector('.bp-tab[data-sezione="home"]'));
    expect(tornato, 'il focus non e\' tornato sul comando che aveva aperto').toBe(true);
  });

  test('la pagina dietro diventa inert', async ({ page }) => {
    await openApp(page);
    await apri(page, 'bp-welcome');

    const stato = await page.evaluate(() => ({
      barra: document.getElementById('bp-tabbar').hasAttribute('inert'),
      dialogo: document.getElementById('bp-welcome').hasAttribute('inert'),
    }));
    expect(stato.barra, 'si puo\' ancora tabbare sulla barra dietro al dialogo').toBe(true);
    expect(stato.dialogo, 'il dialogo stesso e\' stato reso inert').toBe(false);
  });

  test('lo scroll del body si sblocca solo quando non resta nessun dialogo', async ({ page }) => {
    await openApp(page);

    await apri(page, 'bp-welcome');
    await apri(page, 'bp-config');
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');

    await page.evaluate(() => window.bpChiudiModale('bp-config'));
    expect(await page.evaluate(() => document.body.style.overflow),
      'lo scroll si e\' sbloccato con un dialogo ancora aperto').toBe('hidden');

    await page.evaluate(() => window.bpChiudiModale('bp-welcome'));
    expect(await page.evaluate(() => document.body.style.overflow),
      'lo scroll e\' rimasto bloccato senza dialoghi aperti').toBe('');
  });

  test('Escape chiude quello in cima, non tutti', async ({ page }) => {
    await openApp(page);
    await apri(page, 'bp-welcome');
    await apri(page, 'bp-config');

    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);

    const s = await page.evaluate(() => ({
      config: document.getElementById('bp-config').classList.contains('show'),
      welcome: document.getElementById('bp-welcome').classList.contains('show'),
    }));
    expect(s.config, 'non ha chiuso quello in cima').toBe(false);
    expect(s.welcome, 'ha chiuso anche quello sotto').toBe(true);
  });
});

test.describe('Dialoghi · l\'inventario e\' completo', () => {
  test('anche il menu\' da esporre e il suggeritore passano dal gestore', async ({ page }) => {
    await openApp(page);

    for (const id of ['bp-menu', 'suggeritore-modal']) {
      await apri(page, id);
      const dentro = await page.evaluate((i) => {
        const d = document.getElementById(i);
        return d.classList.contains('show') && d.contains(document.activeElement);
      }, id);
      expect(dentro, `"${id}" non e' gestito come dialogo`).toBe(true);
      await page.evaluate((i) => window.bpChiudiModale(i), id);
    }
  });

  test("con un dialogo aperto la barra non si puo' usare", async ({ page }) => {
    await openApp(page);
    await apri(page, 'bp-welcome');

    // Voluto: mentre un dialogo e' aperto non si cambia sezione. E' quello che
    // significa `inert`, ed e' il motivo per cui la barra sta SOTTO i dialoghi
    // nella scala di z-index invece che sopra.
    await page.locator('.bp-tab[data-sezione=\"salvati\"]').click({ force: true });
    await page.waitForTimeout(200);

    expect(await page.evaluate(() => document.body.dataset.sezione),
      "la barra ha cambiato sezione da sotto un dialogo").toBe('home');
  });

  test("navigare a codice chiude i dialoghi invece di lasciarli sospesi", async ({ page }) => {
    await openApp(page);
    await apri(page, 'bp-welcome');

    // Le scorciatoie interne (una card, un link) navigano senza passare dalla
    // barra: li' il dialogo va chiuso, altrimenti resta una finestra sopra una
    // sezione che non e' piu' la sua.
    await page.evaluate(() => window.bpVaiA('salvati'));
    await page.waitForTimeout(200);

    const s = await page.evaluate(() => ({
      aperto: document.getElementById('bp-welcome').classList.contains('show'),
      sezione: document.body.dataset.sezione,
      scroll: document.body.style.overflow,
    }));
    expect(s.aperto, "il dialogo e' rimasto sospeso sopra un'altra sezione").toBe(false);
    expect(s.sezione).toBe('salvati');
    expect(s.scroll, "lo scroll e' rimasto bloccato").toBe('');
  });
});
