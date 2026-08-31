import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SW = fs.readFileSync(path.join(__dirname, '..', 'public', 'sw.js'), 'utf8');

function leggiCostante(nome) {
  const m = SW.match(new RegExp(`const ${nome} = '([^']+)'`));
  if (!m) throw new Error(`${nome} non trovata in sw.js`);
  return m[1];
}

function leggiPrecache() {
  const m = SW.match(/const PRECACHE_ASSETS = \[([\s\S]*?)\]/);
  if (!m) throw new Error('PRECACHE_ASSETS non trovato in sw.js');
  return [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]);
}

const ASSET_CACHE = leggiCostante('ASSET_CACHE');
const PRECACHE = leggiPrecache();

/**
 * Perche' questi test esistono.
 *
 * `install` fa `cache.addAll(PRECACHE_ASSETS).catch(err => console.warn(...))`:
 * il catch INGHIOTTE l'errore. E `addAll` e' atomico. Quindi un solo asset
 * mancante non fa fallire nulla di visibile — l'app risulta installata, la
 * cache resta VUOTA e l'offline semplicemente non funziona, senza un errore
 * che qualcuno possa notare.
 *
 * Verificare "l'install e' andata a buon fine" non prova niente: va verificato
 * che la cache sia davvero popolata.
 */
/**
 * In serie, non in parallelo.
 *
 * Questi test registrano service worker e creano cache sulla STESSA origine:
 * eseguiti insieme si pestano i piedi, e il test sull'aggiornamento di
 * versione falliva a intermittenza pur passando sempre da solo. Non e' un
 * difetto dell'app, e' la natura di cio' che stanno verificando — il service
 * worker e' uno stato globale del browser per quell'origine.
 */
test.describe.configure({ mode: 'serial' });

test.describe('PWA · precache', () => {
  test(`i ${PRECACHE.length} asset di PRECACHE_ASSETS esistono davvero`, async ({ request, baseURL }) => {
    const mancanti = [];

    for (const asset of PRECACHE) {
      const url = new URL(asset.replace(/^\.\//, ''), `${baseURL}/`).href;
      const res = await request.get(url);
      if (!res.ok()) mancanti.push(`${asset} → HTTP ${res.status()}`);
    }

    expect(
      mancanti,
      `asset in PRECACHE_ASSETS che non rispondono 200.\n` +
      `addAll e' atomico: anche uno solo azzera l'intero precache, e il catch in sw.js nasconde l'errore.`,
    ).toEqual([]);
  });

  test('dopo l\'attivazione la cache e\' popolata, non vuota', async ({ page, baseURL }) => {
    await page.goto('/index.html', { waitUntil: 'load' });

    await page.evaluate(async () => {
      const reg = await navigator.serviceWorker.register('./sw.js');
      await navigator.serviceWorker.ready;
      return reg.scope;
    });

    const chiavi = await page.evaluate(async (cacheName) => {
      // L'install puo' completare poco dopo `ready`: qualche tentativo.
      for (let i = 0; i < 20; i++) {
        if (await caches.has(cacheName)) {
          const c = await caches.open(cacheName);
          const k = await c.keys();
          if (k.length > 0) return k.map((r) => new URL(r.url).pathname);
        }
        await new Promise((r) => setTimeout(r, 250));
      }
      return [];
    }, ASSET_CACHE);

    expect(
      chiavi.length,
      `la cache "${ASSET_CACHE}" e' vuota: addAll ha fallito e sw.js ha inghiottito l'errore`,
    ).toBeGreaterThan(0);

    // Ogni asset dichiarato deve essere finito in cache.
    const attesi = PRECACHE.filter((a) => a !== './').map((a) => a.replace(/^\./, ''));
    const mancanti = attesi.filter((a) => !chiavi.some((k) => k.endsWith(a)));
    expect(mancanti, 'asset dichiarati nel precache ma assenti dalla cache').toEqual([]);
  });

  test('l\'aggiornamento di versione elimina le cache vecchie', async ({ page }) => {
    await page.goto('/index.html', { waitUntil: 'load' });

    // index.html registra il service worker da solo (riga ~8188), quindi a
    // questo punto `activate` e' GIA' scattato. Per osservare davvero un
    // aggiornamento di versione bisogna riportare l'origine allo stato
    // "installazione precedente": disinstallare e ripulire, poi ricreare la
    // cache vecchia, poi registrare di nuovo.
    await page.evaluate(async () => {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));
      const nomi = await caches.keys();
      await Promise.all(nomi.map((n) => caches.delete(n)));
    });

    // Simula l'installazione precedente (v2.5.0) senza servire la vecchia
    // app: cio' che si vuole verificare e' il meccanismo di pulizia in
    // `activate`, non il contenuto della versione passata.
    await page.evaluate(async () => {
      const vecchia = await caches.open('barman-pro-assets-v2.5.0');
      await vecchia.put('/finto-asset-vecchio', new Response('vecchio'));
    });

    expect(await page.evaluate(() => caches.has('barman-pro-assets-v2.5.0'))).toBe(true);

    await page.evaluate(async () => {
      const reg = await navigator.serviceWorker.register('./sw.js');
      await reg.update().catch(() => {});
      await navigator.serviceWorker.ready;
    });

    const vecchiaRimossa = await page.evaluate(async () => {
      for (let i = 0; i < 20; i++) {
        if (!(await caches.has('barman-pro-assets-v2.5.0'))) return true;
        await new Promise((r) => setTimeout(r, 250));
      }
      return false;
    });

    expect(
      vecchiaRimossa,
      'la cache della versione precedente non e\' stata eliminata: gli utenti gia\' installati continuerebbero a ricevere asset vecchi',
    ).toBe(true);
  });
});
