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
  test('salvare porta all\'evento: nome, ospiti, totale e quattro azioni', async ({ page }) => {
    const { totale } = await salvaUnEvento(page);
    await expect(page.locator('.bpc-chkhead h2')).toHaveText('Festa di Giulia');
    await expect(page.locator('.bpc-chkhead .sub')).toContainText('40');
    await expect(page.locator('.bpe-tot b')).toHaveText(totale);
    await expect(page.locator('.bpe-azioni button')).toHaveCount(4);
    // si parte dalla lista da spuntare
    await expect(page.locator('.bpc-chkitem').first()).toBeVisible();
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
