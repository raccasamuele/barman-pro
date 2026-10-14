import { test, expect } from '@playwright/test';
import { openApp, toNumber } from './helpers.js';

/**
 * L'evento salvato come posto da cui si fa tutto (ottobre 2026).
 *
 * Richiesta dell'utente: in fondo alla lista solo "Salva evento"; poi
 * dall'evento salvato si rivede tutto, si condivide, si stampa, si prepara
 * il menu'. E dagli eventi salvati si doveva poter rivedere il preventivo,
 * che prima non c'era; "Modifica" c'era ma nascosto nei tre puntini.
 */

async function salvaUnEvento(page) {
  // Condividere e stampare escono dal browser: si catturano invece.
  await page.addInitScript(() => {
    window.__copiato = [];
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: (t) => { window.__copiato.push(t); return Promise.resolve(); } },
    });
    window.__stampe = 0;
    window.print = () => { window.__stampe++; };
  });
  await openApp(page);
  await page.evaluate(() => {
    const set = (id, v) => { const e = document.getElementById(id); e.value = String(v); e.dispatchEvent(new Event('input', { bubbles: true })); };
    set('ospiti', 40);
    document.getElementById('nome-evento').value = 'Festa di Giulia';
    window.bpAggiornaNomeEvento('Festa di Giulia');
    window.bpMenuAggiungi('Negroni');
    window.bpMenuAggiungi('Gin Tonic');
    window.vaiAStep('risultati');
  });
  await expect(page.locator('#lista_alcolici li').first()).toBeVisible();
  const totale = (await page.locator('#budget-amount').textContent()).trim();
  await page.locator('.bp-lista-azione button').click();   // "Salva evento", premuto
  await expect(page.locator('.bpe-azioni')).toBeVisible();
  return { totale };
}

test.describe('Lista · un\'azione sola', () => {
  test('in fondo alla lista c\'e\' solo "Salva evento", con il totale', async ({ page }) => {
    await openApp(page);
    await page.evaluate(() => { menuSerataDrink = { 'Negroni': 3 }; window.vaiAStep('risultati'); });
    await expect(page.locator('.bp-lista-azione')).toBeVisible();
    await expect(page.locator('.bp-lista-azione button')).toHaveCount(1);
    await expect(page.locator('#risultati .action-buttons, #risultati .wizard-actions')).toHaveCount(0);
    // la barra mostra il totale arrotondato all'euro, come quella della pagina Evento
    const n = toNumber(await page.locator('#budget-amount').textContent());
    await expect(page.locator('#bp-lista-tot')).toHaveText('€ ' + Math.round(n).toLocaleString('it-IT'));
  });
});

test.describe('Evento salvato', () => {
  test('salvare porta all\'evento: nome, ospiti, totale e tre azioni', async ({ page }) => {
    const { totale } = await salvaUnEvento(page);
    await expect(page.locator('.bpc-chkhead h2')).toHaveText('Festa di Giulia');
    await expect(page.locator('.bpc-chkhead .sub')).toContainText('40');
    await expect(page.locator('.bpe-tot b')).toHaveText(totale);
    // Modifica, Condividi, Stampa. "Menu'" e' stato tolto (ottobre 2026).
    await expect(page.locator('.bpe-azioni button')).toHaveCount(3);
    await expect(page.locator('.bpe-azioni [data-do="bpMenuOpenFromEvent"]')).toHaveCount(0);
    // si parte dalla lista da spuntare
    await expect(page.locator('.bpc-chkitem').first()).toBeVisible();
  });

  /* Richiesta dell'utente: "Modifica" era blu pieno e sembrava gia'
     selezionato; e i tasti senza icona sembravano vuoti. */
  test('le azioni hanno un\'icona e nessuna sembra gia\' scelta', async ({ page }) => {
    await salvaUnEvento(page);
    const az = await page.evaluate(() => [...document.querySelectorAll('.bpe-azioni button')].map((b) => ({
      icona: !!b.querySelector('svg'),
      sfondo: getComputedStyle(b).backgroundColor,
    })));
    expect(az.every((a) => a.icona), 'una delle azioni non ha icona').toBe(true);
    // stesso aspetto per tutte: nessuna in evidenza come se fosse attiva
    expect(new Set(az.map((a) => a.sfondo)).size).toBe(1);
    const accento = await page.evaluate(() => getComputedStyle(document.querySelector('.bpe-sw-cursore')).backgroundColor);
    expect(az[0].sfondo).not.toBe(accento);
  });

  test('l\'interruttore passa da Da comprare a Preventivo e il cursore lo segue', async ({ page }) => {
    const { totale } = await salvaUnEvento(page);
    const sw = page.locator('.bpe-switch');
    await expect(sw).toHaveAttribute('data-tab', 'compra');
    await expect(sw.locator('[role="tab"]')).toHaveCount(2);
    // il dato sotto ogni scelta: quante voci prese e il totale
    await expect(page.locator('#bp-sw-prog')).toHaveText(/^0\/\d+ acquistati$/);
    await expect(sw.locator('[data-do="bpEventSchedaPrev"] .bpe-sw-dato')).toHaveText(totale);

    await sw.locator('[data-do="bpEventSchedaPrev"]').click();
    await expect(sw).toHaveAttribute('data-tab', 'preventivo');
    await expect(sw.locator('[data-do="bpEventSchedaPrev"]')).toHaveAttribute('aria-selected', 'true');
    const x = await page.evaluate(() => {
      const s = document.querySelector('.bpe-switch'), c = s.querySelector('.bpe-sw-cursore');
      c.style.transition = 'none';   // la posizione d'arrivo, non un fotogramma a meta'
      const r = c.getBoundingClientRect(), rs = s.getBoundingClientRect();
      return { cursore: r.left + r.width / 2, meta: rs.left + rs.width / 2 };
    });
    expect(x.cursore, 'il cursore non e\' sulla meta\' destra').toBeGreaterThan(x.meta);

    // con le frecce si torna indietro, e il fuoco resta sull'interruttore
    await sw.locator('[aria-selected="true"]').focus();
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('.bpe-switch')).toHaveAttribute('data-tab', 'compra');
    await expect(page.locator('.bpe-switch [data-do="bpEventSchedaCompra"]')).toBeFocused();
  });

  test('spuntare una voce aggiorna il conteggio nell\'interruttore', async ({ page }) => {
    await salvaUnEvento(page);
    await page.locator('.bpc-chkitem').first().click();
    await expect(page.locator('#bp-sw-prog')).toHaveText(/^1\/\d+ acquistati$/);
  });

  test('il preventivo si rivede: voci con il costo, subtotali e lo stesso totale', async ({ page }) => {
    const { totale } = await salvaUnEvento(page);
    await page.locator('.bpe-schede [data-do="bpEventSchedaPrev"]').click();
    await expect(page.locator('.bpe-schede [data-do="bpEventSchedaPrev"]')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('.bpe-prev-riga').first()).toBeVisible();
    await expect(page.locator('.bpe-prev-riga', { hasText: 'Gin' }).first().locator('.cs')).toContainText('€');
    await expect(page.locator('.bpe-prev-sub').first()).toBeVisible();
    await expect(page.locator('.bpe-prev-totale b')).toHaveText(totale);
    await expect(page.locator('.bpc-chkitem')).toHaveCount(0);
  });

  test('"Modifica" e\' nell\'evento e riapre la pagina Evento su quello', async ({ page }) => {
    await salvaUnEvento(page);
    const id = await page.evaluate(() => window.bpGetEvents()[0].id);
    await page.locator('.bpe-azioni [data-do="bpEventEdit"]').click();
    await expect(page.locator('[data-stepid="step-setup"]')).toBeVisible();
    expect(await page.evaluate(() => bpEditingId)).toBe(id);
    expect(await page.inputValue('#nome-evento')).toBe('Festa di Giulia');
  });

  test('nei tre puntini restano Duplica ed Elimina', async ({ page }) => {
    await salvaUnEvento(page);
    await page.evaluate(() => window.bpEventsList());
    await expect(page.locator('.bpc-evmenu').first().locator('button')).toHaveCount(2);
    await expect(page.locator('.bpc-evmenu button[data-act="edit"]')).toHaveCount(0);
  });

  test('Condividi: la lista come testo, dalla fotografia salvata', async ({ page }) => {
    await salvaUnEvento(page);
    await page.locator('.bpe-azioni [data-do="bpEventCondividi"]').click();
    await expect(page.locator('#bp-share-dialog')).toBeVisible();
    await page.locator('#bp-share-dialog button[value="testo"]').click();
    await page.waitForFunction(() => window.__copiato.length > 0);
    const testo = await page.evaluate(() => window.__copiato[0]);
    expect(testo).toContain('Festa di Giulia');
    expect(testo).toContain('Gin');
    expect(testo).toMatch(/€ \d/);
  });

  test('Condividi: un link che riapre lo stesso evento', async ({ page }) => {
    await salvaUnEvento(page);
    // la bozza cambia: il link deve portare l'evento salvato, non la bozza
    await page.evaluate(() => { menuSerataDrink = { 'Mojito': 2 }; });
    await page.locator('.bpe-azioni [data-do="bpEventCondividi"]').click();
    await page.locator('#bp-share-dialog button[value="link"]').click();
    await page.waitForFunction(() => window.__copiato.length > 0);
    const url = await page.evaluate(() => window.__copiato[0]);
    expect(url).toContain('#e=');
    const v = await page.evaluate((u) => window.bpValidaLink(u.slice(u.indexOf('#e=') + 3)), url);
    expect(v.ok).toBe(true);
    expect(v.stato.nome).toBe('Festa di Giulia');
    expect(Object.keys(v.stato.menu.dr).sort()).toEqual(['Gin Tonic', 'Negroni']);
  });

  test('Stampa dal preventivo: il foglio e\' il preventivo di quell\'evento', async ({ page }) => {
    await salvaUnEvento(page);
    await page.locator('.bpe-schede [data-do="bpEventSchedaPrev"]').click();
    // la bozza cambia nome: il foglio deve essere quello dell'evento salvato
    await page.evaluate(() => window.bpAggiornaNomeEvento('Bozza diversa'));
    await page.locator('.bpe-azioni [data-do="bpEventStampa"]').click();
    const dlg = page.locator('#bp-print-dialog');
    await expect(dlg).toBeVisible();
    await expect(dlg.locator('input[value="preventivo"]')).toBeChecked();
    await dlg.locator('button[value="stampa"]').click();
    await page.waitForFunction(() => window.__stampe > 0);
    const foglio = await page.evaluate(() => ({
      formato: document.getElementById('print-sheet').dataset.formato,
      titolo: (document.querySelector('#print-sheet .ps-titolo') || {}).textContent,
      prezzi: document.querySelectorAll('#print-sheet .ps-tot').length,
      bersaglio: document.body.classList.contains('bp-stampa-lista'),
    }));
    expect(foglio).toEqual({ formato: 'preventivo', titolo: 'Festa di Giulia', prezzi: expect.any(Number), bersaglio: true });
    expect(foglio.prezzi).toBeGreaterThan(0);
  });

  test('Ctrl+P su un evento aperto stampa quell\'evento, non la pagina', async ({ page }) => {
    await salvaUnEvento(page);
    const r = await page.evaluate(() => {
      window.bpAggiornaNomeEvento('Bozza diversa');
      window.dispatchEvent(new Event('beforeprint'));
      return {
        bersaglio: document.body.classList.contains('bp-stampa-lista'),
        titolo: (document.querySelector('#print-sheet .ps-titolo') || {}).textContent,
      };
    });
    expect(r).toEqual({ bersaglio: true, titolo: 'Festa di Giulia' });
  });
});
