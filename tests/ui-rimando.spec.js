import { test, expect } from '@playwright/test';
import worker from '../src/index.js';

/* Il rimando dal vecchio indirizzo vive nel Worker, che qui viene chiamato davvero:
   in locale non esiste un hostname workers.dev su cui provarlo con il browser. */
const VECCHIO = 'https://barman-pro.raccasamuele2004.workers.dev';
const assets = (chiamate) => ({ ASSETS: { fetch: (r) => { chiamate.push(r.url); return new Response('file'); } } });

test.describe('Rimando dal vecchio indirizzo', () => {
  test('il vecchio indirizzo rimanda al nuovo, conservando percorso e query', async () => {
    const chiamate = [];
    const r = await worker.fetch(new Request(VECCHIO + '/presentazione?ref=share'), assets(chiamate));
    expect(r.status).toBe(301);
    expect(r.headers.get('location')).toBe('https://barmanpro.raccasamuele.it/presentazione?ref=share');
    expect(chiamate, 'il vecchio indirizzo non deve servire i file').toEqual([]);
  });

  test('sul vecchio indirizzo /sw.js toglie il service worker invece di rimandare', async () => {
    const r = await worker.fetch(new Request(VECCHIO + '/sw.js'), assets([]));
    expect(r.status).toBe(200);
    expect(r.headers.get('content-type')).toContain('javascript');
    const script = await r.text();
    expect(script).toContain('unregister');
    expect(script).toContain('caches.delete');
  });

  for (const altro of ['https://barmanpro.raccasamuele.it/', 'https://staging-barman-pro.raccasamuele2004.workers.dev/', 'https://21a0b5c0-barman-pro.raccasamuele2004.workers.dev/sw.js']) {
    test(`${new URL(altro).hostname} serve i file, senza rimandi`, async () => {
      const chiamate = [];
      const r = await worker.fetch(new Request(altro), assets(chiamate));
      expect(r.status).toBe(200);
      expect(chiamate).toEqual([altro]);
    });
  }
});
