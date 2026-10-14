import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, '..', 'public');
const HEADERS = fs.readFileSync(path.join(PUBLIC, '_headers'), 'utf8');
const CSP = HEADERS.match(/^\s*Content-Security-Policy:\s*(.+)$/m)[1].trim();

/**
 * Pagina di presentazione (/presentazione), quella collegata al Linktree.
 * Non usa app.js: va provata da sola, con la CSP vera, perche' e' la prima
 * cosa che vede chi arriva da Instagram.
 */
async function apriConCsp(page, violazioni) {
  page.on('console', (m) => {
    if (/Content Security Policy|Refused to/i.test(m.text())) violazioni.push(m.text());
  });
  page.on('pageerror', (e) => violazioni.push('errore JS: ' + e.message));
  await page.route('**/*', async (route) => {
    const res = await route.fetch();
    const h = { ...res.headers() };
    if ((h['content-type'] || '').includes('text/html')) h['content-security-policy'] = CSP;
    await route.fulfill({ response: res, headers: h });
  });
  await page.goto('/presentazione', { waitUntil: 'load' });
}

test.describe('Presentazione', () => {
  test('si carica con la CSP reale, senza violazioni ne\' errori', async ({ page }) => {
    const violazioni = [];
    await apriConCsp(page, violazioni);
    // Lo script gira davvero: la striscia ha le bandiere e i pallini ci sono.
    await expect(page.locator('#nastro .flag').first()).toBeVisible();
    await expect(page.locator('#pallini i')).toHaveCount(80);
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(400);
    expect(violazioni, violazioni.join('\n')).toEqual([]);
  });

  test('i dati strutturati sono validi e le FAQ coincidono con quelle visibili', async ({ page }) => {
    await page.goto('/presentazione');
    const grezzo = await page.locator('script[type="application/ld+json"]').textContent();
    const dati = JSON.parse(grezzo);
    const tipi = dati['@graph'].map((n) => n['@type']);
    expect(tipi).toEqual(expect.arrayContaining(['WebPage', 'WebApplication', 'VideoObject', 'FAQPage']));

    // Google ignora (e penalizza) le FAQ marcate ma non visibili: domande e
    // risposte devono essere le stesse, nello stesso ordine.
    const faq = dati['@graph'].find((n) => n['@type'] === 'FAQPage').mainEntity;
    const visibili = await page.locator('.faq details').evaluateAll((ds) =>
      ds.map((d) => ({ q: d.querySelector('summary').textContent.trim(), a: d.querySelector('p').textContent.trim() })));
    expect(visibili).toEqual(faq.map((f) => ({ q: f.name, a: f.acceptedAnswer.text })));

    // I file citati dai dati strutturati esistono davvero.
    const video = dati['@graph'].find((n) => n['@type'] === 'VideoObject');
    for (const url of [video.contentUrl, video.thumbnailUrl]) {
      const locale = new URL(url).pathname;
      expect(fs.existsSync(path.join(PUBLIC, locale)), locale).toBe(true);
    }
  });

  test('video e copertina rispondono, e la pagina e\' nella sitemap', async ({ page, request }) => {
    await page.goto('/presentazione');
    const sorgenti = await page.locator('#filmato source').evaluateAll((s) => s.map((x) => x.getAttribute('src')));
    // HLS prima dell'MP4: e' l'unico modo per Safari su iPhone, visto che
    // Cloudflare non serve i file statici a pezzi (Range).
    expect(sorgenti).toEqual(['media/hls/presentazione.m3u8', 'media/presentazione.mp4']);
    const poster = await page.locator('#filmato').getAttribute('poster');
    for (const u of [...sorgenti, poster, 'media/presentazione-og.jpg']) {
      const r = await request.get('/' + u);
      expect(r.status(), u).toBe(200);
    }
    // Ogni pezzo citato dalla playlist esiste.
    const playlist = fs.readFileSync(path.join(PUBLIC, 'media', 'hls', 'presentazione.m3u8'), 'utf8');
    const pezzi = playlist.split('\n').filter((r) => r.trim() && !r.startsWith('#'));
    expect(pezzi.length).toBeGreaterThan(5);
    for (const p of pezzi) expect(fs.existsSync(path.join(PUBLIC, 'media', 'hls', p.trim())), p).toBe(true);
    const sitemap = fs.readFileSync(path.join(PUBLIC, 'sitemap.xml'), 'utf8');
    expect(sitemap).toContain('/presentazione</loc>');
  });

  test('al telefono non scorre di lato', async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await ctx.newPage();
    await page.goto('/presentazione');
    await page.waitForTimeout(300);
    const largo = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(largo).toBeLessThanOrEqual(375);
    await ctx.close();
  });

  test('si apre la scheda di installazione del telefono che guarda', async ({ browser }) => {
    const casi = [
      ['Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Instagram 350.0', '#p-insta'],
      ['Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1', '#p-ios'],
      ['Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 Chrome/130.0 Mobile Safari/537.36', '#p-android'],
    ];
    for (const [ua, pannello] of casi) {
      const ctx = await browser.newContext({ userAgent: ua });
      const page = await ctx.newPage();
      await page.goto('/presentazione');
      await expect(page.locator(pannello)).toBeVisible();
      await expect(page.locator('.pannello:visible')).toHaveCount(1);
      await ctx.close();
    }
  });
});
