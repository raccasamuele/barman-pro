import { test, expect } from '@playwright/test';
import { openApp } from './helpers.js';

/**
 * Traduzione: una chiave per elemento, e le etichette di accessibilita' incluse.
 *
 * `cambiaLingua()` conteneva un blocco di assegnazioni per POSIZIONE — abtn[0..3],
 * bsArr[0..1], rh3[0..2] — che girava DOPO il ciclo generico su [data-i18n] e ne
 * riscriveva il risultato, cancellando anche gli <span data-i18n> figli.
 *
 * Non era solo ridondante. `.result-section h3` sono cinque, e la terza e'
 * l'intestazione dei fermentati: rh3[2] la sovrascriveva con "Attrezzatura", cosi'
 * due sezioni si chiamavano uguale in tutte e 7 le lingue. Il difetto e' rimasto
 * invisibile per mesi perche' #block_fermentati e' display:none finche' non metti
 * vino o birra nel menu — nessun test guardava quel testo.
 *
 * Da qui in poi lo si guarda.
 */

const LINGUE = ['it', 'en', 'es', 'fr', 'de', 'pt', 'nl'];

test.describe('i18n · una chiave per elemento', () => {
  test('ogni sezione dei risultati ha la sua intestazione, in tutte le lingue', async ({ page }) => {
    await openApp(page);

    for (const lang of LINGUE) {
      await page.evaluate((l) => window.cambiaLingua(l), lang);

      const intestazioni = await page.evaluate(() =>
        [...document.querySelectorAll('.result-section h3')].map((h) => ({
          chiave: h.dataset.i18n || null,
          testo: h.textContent.trim(),
        })));

      // Ogni intestazione dichiara la propria chiave: nessuna si traduce per posizione.
      for (const h of intestazioni) {
        expect(h.chiave, `intestazione senza data-i18n in "${lang}": "${h.testo}"`).toBeTruthy();
      }

      // E nessuna coppia di sezioni finisce per chiamarsi allo stesso modo.
      const testi = intestazioni.map((h) => h.testo);
      expect(new Set(testi).size,
        `in "${lang}" due sezioni hanno lo stesso titolo: ${JSON.stringify(testi)}`)
        .toBe(testi.length);
    }
  });

  test('i fermentati restano i fermentati, non l\'attrezzatura', async ({ page }) => {
    await openApp(page);

    for (const lang of LINGUE) {
      await page.evaluate((l) => window.cambiaLingua(l), lang);

      const { fermentati, attrezzatura, atteso } = await page.evaluate(() => {
        const q = (k) => document.querySelector(`.result-section h3[data-i18n="${k}"]`);
        return {
          fermentati: q('risultatiFermentati')?.textContent.trim(),
          attrezzatura: q('risultatiAttrezzatura')?.textContent.trim(),
          // eslint-disable-next-line no-undef
          atteso: translations[document.documentElement.lang].risultatiFermentati,
        };
      });

      expect(fermentati, `in "${lang}" l'intestazione dei fermentati non e' la sua`).toBe(atteso);
      expect(fermentati, `in "${lang}" fermentati e attrezzatura hanno lo stesso titolo`)
        .not.toBe(attrezzatura);
    }
  });

  test('i bottoni della lista conservano i loro <span data-i18n>', async ({ page }) => {
    await openApp(page);

    // Il vecchio blocco assegnava textContent sul <button>, cancellando lo span.
    const prima = await page.evaluate(() =>
      document.querySelectorAll('.action-buttons button [data-i18n]').length);
    expect(prima, 'i bottoni azione non hanno span con chiave').toBeGreaterThan(0);

    await page.evaluate(() => window.cambiaLingua('de'));

    const dopo = await page.evaluate(() =>
      document.querySelectorAll('.action-buttons button [data-i18n]').length);
    expect(dopo, 'cambiare lingua ha distrutto gli span dei bottoni azione').toBe(prima);
  });
});

test.describe('i18n · etichette di accessibilita\'', () => {
  test('aria-label viene tradotto davvero, non solo dichiarato', async ({ page }) => {
    await openApp(page);

    // Si osserva l'ATTRIBUTO, non la chiave: check-i18n conosceva gia'
    // data-i18n-aria, ma nessuno lo applicava a runtime.
    const leggi = () => page.evaluate(() => {
      const el = document.querySelector('[data-i18n-aria="ariaChiudi"]');
      return el ? el.getAttribute('aria-label') : null;
    });

    await page.evaluate(() => window.cambiaLingua('it'));
    expect(await leggi()).toBe('Chiudi');

    await page.evaluate(() => window.cambiaLingua('de'));
    expect(await leggi(), 'aria-label e\' rimasto in italiano').toBe('Schließen');

    await page.evaluate(() => window.cambiaLingua('nl'));
    expect(await leggi()).toBe('Sluiten');
  });

  test('nessuna etichetta agganciata resta senza traduzione', async ({ page }) => {
    await openApp(page);

    for (const lang of LINGUE) {
      await page.evaluate((l) => window.cambiaLingua(l), lang);

      const orfane = await page.evaluate(() =>
        [...document.querySelectorAll('[data-i18n-aria]')]
          // eslint-disable-next-line no-undef
          .filter((el) => translations[document.documentElement.lang][el.dataset.i18nAria] === undefined)
          .map((el) => el.dataset.i18nAria));

      expect(orfane, `chiavi aria senza traduzione in "${lang}"`).toEqual([]);
    }
  });
});

/**
 * Lingua al primo avvio: quella del dispositivo se l'app la ha, altrimenti
 * l'inglese. Prima partiva sempre in inglese e la lingua si sceglieva da un
 * selettore che ricompariva a ogni nuovo evento.
 *
 * La lingua indovinata NON si salva: se finisse in bp_settings_v2, al prossimo
 * avvio varrebbe come una scelta e un cambio di lingua del telefono non
 * verrebbe piu' seguito. Si salva solo quella scelta nelle Impostazioni.
 */
test.describe('i18n · lingua del dispositivo', () => {
  async function apriSenzaPreferenze(browser, locale) {
    const ctx = await browser.newContext({ locale });
    const page = await ctx.newPage();
    await page.addInitScript(() => { try { localStorage.setItem('bp_onboarded', '1'); } catch (e) { /* */ } });
    await page.goto('/index.html', { waitUntil: 'load' });
    await page.waitForFunction(() => typeof window.calcolaSpesa === 'function');
    return { ctx, page };
  }
  const salvata = (page) => page.evaluate(() => (JSON.parse(localStorage.getItem('bp_settings_v2') || '{}')).lingua);

  test('un telefono in tedesco apre l\'app in tedesco, senza salvarla come scelta', async ({ browser }) => {
    const { ctx, page } = await apriSenzaPreferenze(browser, 'de-DE');
    expect(await page.evaluate(() => linguaCorrente)).toBe('de');
    expect(await page.evaluate(() => document.documentElement.lang)).toBe('de');
    expect(await salvata(page), 'la lingua indovinata e\' finita su disco').toBeUndefined();
    await ctx.close();
  });

  test('una lingua che l\'app non ha ricade sull\'inglese', async ({ browser }) => {
    const { ctx, page } = await apriSenzaPreferenze(browser, 'ja-JP');
    expect(await page.evaluate(() => linguaCorrente)).toBe('en');
    await ctx.close();
  });

  test('la scelta nelle Impostazioni vince sul dispositivo e resta', async ({ browser }) => {
    const { ctx, page } = await apriSenzaPreferenze(browser, 'de-DE');
    await page.evaluate(() => bpVaiA('altro/impostazioni'));
    await page.selectOption('#lang-selector', 'pt');
    expect(await salvata(page)).toBe('pt');
    await page.reload({ waitUntil: 'load' });
    await page.waitForFunction(() => typeof window.calcolaSpesa === 'function');
    expect(await page.evaluate(() => linguaCorrente)).toBe('pt');
    await ctx.close();
  });

  test('il benvenuto non ha piu\' un selettore di lingua', async ({ browser }) => {
    const { ctx, page } = await apriSenzaPreferenze(browser, 'it-IT');
    expect(await page.locator('#bp-welcome select').count()).toBe(0);
    await ctx.close();
  });
});
