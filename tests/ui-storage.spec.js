import { test, expect } from '@playwright/test';
import { openApp } from './helpers.js';

/**
 * Le scritture su disco, e cosa succede quando falliscono.
 *
 * Prima ogni funzione faceva il suo `try { localStorage.setItem } catch(e){}`.
 * Con la quota piena un salvataggio fallito era indistinguibile da uno riuscito:
 * usciva comunque "Evento salvato". Ora la scrittura ritorna l'esito e il
 * messaggio di successo esce solo dopo una scrittura verificata.
 *
 * C'e' anche la guardia del marcatore di import, che in Fase 0 non ha ancora un
 * import da proteggere. Nasce comunque adesso: il rilascio a fasi lascia vive le
 * schede ferme alle versioni precedenti, e se la guardia arrivasse insieme
 * all'import (Fase 3) quelle schede scriverebbero in mezzo a uno scambio di
 * chiavi senza saperlo.
 */

test.describe('Storage · l\'esito della scrittura', () => {
  test('una scrittura riuscita lo dice, e i dati ci sono', async ({ page }) => {
    await openApp(page);

    const esito = await page.evaluate(() =>
      window.bpStorageWrite('bp_test_scrittura', { a: 1 }));
    expect(esito.ok).toBe(true);

    const riletto = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('bp_test_scrittura')));
    expect(riletto).toEqual({ a: 1 });
  });

  test('la quota esaurita non passa per riuscita', async ({ page }) => {
    await openApp(page);

    const esito = await page.evaluate(() => {
      const vero = Storage.prototype.setItem;
      Storage.prototype.setItem = function () {
        const e = new Error('quota');
        e.name = 'QuotaExceededError';
        throw e;
      };
      try { return window.bpStorageWrite('bp_test_quota', { a: 1 }); }
      finally { Storage.prototype.setItem = vero; }
    });

    expect(esito.ok, 'una scrittura fallita si e\' dichiarata riuscita').toBe(false);
    expect(esito.motivo).toBe('quota');
  });

  test('salvare un evento con il disco pieno non dice "salvato"', async ({ page }) => {
    await openApp(page);

    const esito = await page.evaluate(() => {
      const vero = Storage.prototype.setItem;
      Storage.prototype.setItem = function (k) {
        if (k === 'bp_events') {
          const e = new Error('quota'); e.name = 'QuotaExceededError'; throw e;
        }
        return vero.apply(this, arguments);
      };
      try { return window.bpSalvaEvento(); }
      finally { Storage.prototype.setItem = vero; }
    });

    expect(esito.ok, 'bpSalvaEvento ha riportato successo su una scrittura fallita').toBe(false);

    const salvati = await page.evaluate(() => window.bpGetEvents().length);
    expect(salvati, 'un evento risulta salvato anche se la scrittura e\' fallita').toBe(0);
  });
});

test.describe('Storage · la guardia del marcatore di import', () => {
  test('mentre il marcatore esiste nessuno scrive', async ({ page }) => {
    await openApp(page);

    const esito = await page.evaluate(() => {
      localStorage.setItem('bp_import_lock', '1');
      try { return window.bpStorageWrite('bp_test_lock', { a: 1 }); }
      finally { localStorage.removeItem('bp_import_lock'); }
    });

    expect(esito.ok).toBe(false);
    expect(esito.motivo).toBe('import');

    const scritto = await page.evaluate(() => localStorage.getItem('bp_test_lock'));
    expect(scritto, 'ha scritto lo stesso mentre l\'import era in corso').toBeNull();
  });

  test('dopo un rifiuto la copia in memoria non viene riversata', async ({ page }) => {
    await openApp(page);

    // Il punto: sparito il marcatore, quello che avevamo in memoria e' vecchio.
    // Riscriverlo cancellerebbe quello che ha appena scritto l'import.
    const dopo = await page.evaluate(() => {
      localStorage.setItem('bp_import_lock', '1');
      window.bpStorageWrite('bp_test_stale', { vecchio: true });
      localStorage.removeItem('bp_import_lock');
      return window.bpStorageWrite('bp_test_stale', { vecchio: true });
    });

    expect(dopo.ok, 'ha riversato uno stato vecchio appena sparito il marcatore').toBe(false);
    expect(dopo.motivo).toBe('stale');

    // Si torna a scrivere solo dopo essersi ripresi dallo storage.
    const riallineato = await page.evaluate(() => {
      window.bpStorageRiallineato();
      return window.bpStorageWrite('bp_test_stale', { nuovo: true });
    });
    expect(riallineato.ok).toBe(true);
  });
});

test.describe('Storage · impostazioni additive', () => {
  test('un campo che questa versione non conosce sopravvive', async ({ page }) => {
    await openApp(page);

    // Simula una preferenza scritta da una versione futura dell'app.
    await page.evaluate(() => {
      const s = JSON.parse(localStorage.getItem('bp_settings') || '{}');
      s.preferenzaDiDomani = 'non cancellarmi';
      localStorage.setItem('bp_settings', JSON.stringify(s));
    });

    await page.evaluate(() => window.cambiaTema('dark'));   // provoca bpSaveSettings

    const dopo = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('bp_settings')));

    expect(dopo.preferenzaDiDomani,
      'salvare il tema ha cancellato un campo sconosciuto').toBe('non cancellarmi');
    expect(dopo.tema, 'il tema non e\' stato salvato').toBe('dark');
  });
});
