import { test, expect } from '@playwright/test';
import { openApp } from './helpers.js';

/**
 * La navigazione: una barra, quattro voci, un'autorita' sola.
 *
 * Prima decidevano in due e non erano d'accordo. `body.bp-home` nascondeva i
 * pannelli del flusso; gli overlay a schermo intero si mostravano da soli con
 * `.show` e si bloccavano lo scroll del body a testa. E il bottone Home
 * flottante non sapeva dove si trovava: restava li' anche quando eri gia' in
 * home, perche' nessuna regola lo legava a `body.bp-home`.
 *
 * Adesso comanda `body[data-sezione]`, e il bottone flottante non esiste piu':
 * il difetto e' chiuso per costruzione, non con una regola display:none.
 */

const stato = (page) => page.evaluate(() => ({
  sezione: document.body.dataset.sezione,
  sotto: document.body.dataset.sotto || null,
  attiva: document.querySelector('.bp-tab[aria-current="page"]')?.dataset.sezione || null,
  visibili: ['bp-home', 'bp-events', 'bp-library', 'bp-settings', 'bp-altro']
    .filter((id) => {
      const e = document.getElementById(id);
      return e && getComputedStyle(e).display !== 'none';
    }),
}));

test.describe('Navigazione · una sezione per volta', () => {
  test('si parte dalla Home, e la voce attiva lo dice', async ({ page }) => {
    await openApp(page);
    const s = await stato(page);
    expect(s.sezione).toBe('home');
    expect(s.attiva, 'nessuna voce risulta attiva').toBe('home');
    expect(s.visibili).toEqual(['bp-home']);
  });

  test('ogni voce mostra la sua sezione e nasconde le altre', async ({ page }) => {
    await openApp(page);

    for (const [voce, atteso] of [['salvati', 'bp-events'], ['altro', 'bp-altro'], ['home', 'bp-home']]) {
      await page.locator(`.bp-tab[data-sezione="${voce}"]`).click();
      const s = await stato(page);
      expect(s.sezione, `la voce "${voce}" non ha cambiato sezione`).toBe(voce);
      expect(s.attiva, `lo stato attivo non segue la sezione`).toBe(voce);
      expect(s.visibili, `con "${voce}" e' visibile piu' di una sezione`).toEqual([atteso]);
    }
  });

  test('il bottone Home flottante non esiste piu\'', async ({ page }) => {
    await openApp(page);
    // Era questo il difetto riportato: restava visibile anche in home.
    expect(await page.locator('#bp-burger').count()).toBe(0);
    expect(await page.locator('#bp-nav').count(), 'il vecchio menu modale e\' ancora nel markup').toBe(0);
  });

  test('le sezioni non bloccano lo scroll del body', async ({ page }) => {
    await openApp(page);
    await page.locator('.bp-tab[data-sezione="salvati"]').click();

    // Solo i dialoghi veri hanno il diritto di bloccare lo scroll. Una
    // sezione che lo blocca lascia la pagina inchiodata quando esci.
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
  });
});

test.describe('Navigazione · l\'albero di "Altro"', () => {
  test('la landing porta alle sottorotte', async ({ page }) => {
    await openApp(page);
    await page.locator('.bp-tab[data-sezione="altro"]').click();
    expect((await stato(page)).visibili).toEqual(['bp-altro']);

    await page.locator('.bp-altro-voce').nth(2).click();   // Impostazioni
    const s = await stato(page);
    expect(s.sotto).toBe('impostazioni');
    expect(s.visibili).toEqual(['bp-settings']);
  });

  test('toccare la voce in cui sei gia\' riporta alla landing', async ({ page }) => {
    await openApp(page);
    await page.evaluate(() => window.bpVaiA('altro/ricette'));
    expect((await stato(page)).sotto).toBe('ricette');

    await page.locator('.bp-tab[data-sezione="altro"]').click();
    expect((await stato(page)).sotto, 'e\' rimasto nella sottorotta').toBeNull();
  });

  test('Indietro del browser risale di un livello', async ({ page }) => {
    await openApp(page);
    await page.locator('.bp-tab[data-sezione="altro"]').click();
    await page.locator('.bp-altro-voce').nth(2).click();
    expect((await stato(page)).sotto).toBe('impostazioni');

    await page.goBack();
    await page.waitForTimeout(300);
    expect((await stato(page)).sotto, 'Indietro non e\' tornato alla landing').toBeNull();
  });
});

test.describe('Navigazione · due layout, un markup', () => {
  test('sotto i 900px sta in fondo', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 780 });
    await openApp(page);

    const m = await page.evaluate(() => {
      const b = document.getElementById('bp-tabbar');
      const cs = getComputedStyle(b);
      const r = b.getBoundingClientRect();
      return { pos: cs.position, dir: cs.flexDirection, giuInFondo: Math.abs(r.bottom - window.innerHeight) < 2 };
    });
    expect(m.pos).toBe('fixed');
    expect(m.dir).toBe('row');
    expect(m.giuInFondo, 'la barra non e\' agganciata al fondo').toBe(true);
  });

  test('sopra i 900px diventa una colonna a sinistra', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await openApp(page);

    const m = await page.evaluate(() => {
      const b = document.getElementById('bp-tabbar');
      const cs = getComputedStyle(b);
      const r = b.getBoundingClientRect();
      return {
        dir: cs.flexDirection,
        aSinistra: r.left < 2 && r.height > window.innerHeight * 0.9,
        contenutoScostato: getComputedStyle(document.body).paddingLeft,
      };
    });
    expect(m.dir, 'la barra non e\' diventata una colonna').toBe('column');
    expect(m.aSinistra, 'la colonna non occupa il bordo sinistro').toBe(true);
    expect(m.contenutoScostato, 'il contenuto finisce sotto la sidebar').toBe('240px');
  });

  test('e\' lo stesso elemento, non due componenti diversi', async ({ page }) => {
    await openApp(page);
    // Due barre da tenere allineate divergono sempre: qui ce n'e' una sola.
    expect(await page.locator('nav.bp-tabbar').count()).toBe(1);
    expect(await page.locator('.bp-tab').count()).toBe(4);
  });

  test('le voci hanno un bersaglio grande abbastanza per il dito', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 780 });
    await openApp(page);

    const altezze = await page.evaluate(() =>
      [...document.querySelectorAll('.bp-tab')].map((t) => t.getBoundingClientRect().height));
    for (const h of altezze) expect(h, 'voce piu\' bassa di 44px').toBeGreaterThanOrEqual(44);
  });

  test('lo stato attivo non e\' affidato al solo colore', async ({ page }) => {
    await openApp(page);
    const m = await page.evaluate(() => {
      const attiva = document.querySelector('.bp-tab[aria-current="page"]');
      const altra = document.querySelector('.bp-tab:not([aria-current])');
      return {
        trattoAttivo: getComputedStyle(attiva.querySelector('.bp-tab-ic')).strokeWidth,
        trattoAltro: getComputedStyle(altra.querySelector('.bp-tab-ic')).strokeWidth,
        pesoAttivo: getComputedStyle(attiva.querySelector('.bp-tab-tx')).fontWeight,
        pesoAltro: getComputedStyle(altra.querySelector('.bp-tab-tx')).fontWeight,
      };
    });
    expect(m.trattoAttivo, 'il tratto dell\'icona attiva non cambia').not.toBe(m.trattoAltro);
    expect(m.pesoAttivo, 'il peso dell\'etichetta attiva non cambia').not.toBe(m.pesoAltro);
  });
});
