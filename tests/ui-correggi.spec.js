import { test, expect } from '@playwright/test';
import { openApp, apriVoce } from './helpers.js';

/**
 * Correggere una voce della lista (ottobre 2026).
 *
 * Prima "Correggi" era una modalita': accesa, apriva tre campi sotto OGNI
 * riga ("Da comprare", "Ho gia'", "Il tuo prezzo"). Con quattordici voci
 * erano quarantadue campi e una pagina lunghissima; l'utente l'ha chiamata
 * "un po' confusionaria". Ora si tocca una voce e sale una scheda solo per
 * lei. La lista resta pulita: nessun campo dentro, nessun bottone da
 * accendere.
 */

async function lista(page) {
  await openApp(page);
  await page.evaluate(() => {
    const set = (id, v) => {
      const e = document.getElementById(id);
      e.value = String(v);
      e.dispatchEvent(new Event('input', { bubbles: true }));
      e.dispatchEvent(new Event('change', { bubbles: true }));
    };
    set('ospiti', 40);
    set('drink_testa', 3);
    window.bpMenuAggiungi('Negroni');
    window.vaiAStep('risultati');
    window.calcolaSpesa(true);
  });
  await expect(page.locator('#lista_alcolici li').first()).toBeVisible();
}

test.describe('Correggi · una scheda per voce', () => {
  test('nella lista non c\'e\' piu\' un bottone Correggi ne\' un campo', async ({ page }) => {
    await lista(page);
    await expect(page.locator('#bp-modifica-btn')).toHaveCount(0);
    await expect(page.locator('#risultati input')).toHaveCount(0);
    await expect(page.locator('.bp-lista-tocca')).toBeVisible();
  });

  test('toccare una voce apre la sua scheda, con il suo nome e i tre campi', async ({ page }) => {
    await lista(page);
    const nome = (await page.locator('#lista_alcolici li > span').first().textContent()).trim();
    await apriVoce(page);
    await expect(page.locator('#bp-voce-tit')).toHaveText(nome);
    for (const c of ['.mod-qta', '.mod-scorta', '.mod-prezzo']) {
      await expect(page.locator('#bp-voce ' + c)).toBeVisible();
    }
    // senza correzioni non c'e' niente da ripristinare
    await expect(page.locator('#bp-voce-ripristina')).toBeDisabled();
  });

  test('la tastiera apre la scheda: Tab sulla riga, poi Invio', async ({ page }) => {
    await lista(page);
    await page.locator('#lista_alcolici li[data-voce]').first().focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#bp-voce')).toBeVisible();
  });

  test('i bottoni − / + cambiano la quantita\' partendo dal numero dell\'app', async ({ page }) => {
    await lista(page);
    await apriVoce(page);
    const calcolata = parseFloat(await page.locator('#bp-voce .mod-qta').getAttribute('data-calc'));
    await page.locator('#bp-voce [data-arg="mod-qta|1"]').click();
    await expect(page.locator('#bp-voce .mod-qta')).toHaveValue(String(calcolata + 0.5));
    await expect(page.locator('#lista_alcolici li').first().locator('strong')).toHaveText((calcolata + 0.5) + ' L');
    await expect(page.locator('#bp-voce-ripristina')).toBeEnabled();
  });

  test('una voce corretta e\' segnata, ma il suo testo non cambia', async ({ page }) => {
    await lista(page);
    const li = page.locator('#lista_alcolici li').first();
    const nome = await li.locator('span').first().textContent();
    await apriVoce(page);
    await page.locator('#bp-voce [data-arg="mod-scorta|1"]').click();
    await page.locator('#bp-voce .bp-print-ok').click();
    await expect(page.locator('#bp-voce')).toBeHidden();

    await expect(li).toHaveClass(/voce-corretta/);
    // il segno e' un ::after: il nome nel DOM resta quello, e cosi' cio' che
    // finisce nell'evento salvato e nei golden
    expect(await li.locator('span').first().textContent()).toBe(nome);
    const segno = await li.locator('span').first().evaluate((s) => getComputedStyle(s, '::after').content);
    expect(segno).toContain('corretta');
  });

  test('un tocco fuori dalla scheda la chiude', async ({ page }) => {
    await lista(page);
    await apriVoce(page);
    await page.mouse.click(5, 5);
    await expect(page.locator('#bp-voce')).toBeHidden();
  });

  test('le guarnizioni non si toccano: non hanno dose', async ({ page }) => {
    await lista(page);
    await expect(page.locator('#lista_garnish li').first()).toBeVisible();
    await expect(page.locator('#lista_garnish li[data-voce]')).toHaveCount(0);
  });
});
