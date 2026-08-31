/**
 * Barman PRO · Service Worker
 * Strategy: cache-first per gli asset, network-first per il documento HTML.
 * © 2026 Samuele Racca · MIT
 *
 * ⚠️ RELEASE CHECKLIST — bumpa SEMPRE CACHE_VERSION + ASSET_CACHE a ogni
 *    rilascio (anche per fix piccoli). Senza bump, i client già installati
 *    continuano a servire gli asset vecchi dalla cache e i fix non arrivano.
 *    Convenzione: barman-pro-v{MAJOR}.{MINOR}.{PATCH}
 */

const CACHE_VERSION = 'barman-pro-v3.0.0';
const ASSET_CACHE = 'barman-pro-assets-v3.0.0';

// Asset da pre-cachare alla prima installazione.
//
// ⚠️ cache.addAll è ATOMICO: se un solo file risponde 404, NIENTE viene
//    messo in cache. E l'install qui sotto cattura l'errore e si limita a
//    un console.warn, quindi il fallimento è silenzioso: l'app risulta
//    installata e semplicemente non funziona offline, senza che nessuno
//    se ne accorga. Tienici dentro solo file che esistono davvero —
//    tests/pwa-precache.spec.js lo verifica a ogni esecuzione della CI.
// ⚠️ E i percorsi devono essere quelli FINALI: Cloudflare serve gli URL
//    senza estensione e rimanda /privacy.html a /privacy con un 307.
//    cache.addAll() rifiuta le risposte reindirizzate, quindi bastava un
//    './privacy.html' qui per azzerare l'intero precache in produzione —
//    senza che i test locali potessero accorgersene, perche' http-server
//    serve il file direttamente.
const PRECACHE_ASSETS = [
    './',
    // NB: niente './index.html' — Cloudflare lo rimanda a './' con un 307,
    // e addAll() rifiuta i redirect. './' serve gia' lo stesso documento.
    './app.css',
    './app.js',
    './mail.js',
    './analytics.js',
    './favicon.svg',
    './apple-touch-icon.png',
    './icon-192.png',
    './icon-512.png',
    './icon-maskable-512.png',
    './privacy',
    './manifest.json',
    './fonts/manrope-latin-wght-normal.woff2',
    './fonts/manrope-latin-ext-wght-normal.woff2'
];

// ─── INSTALL ───
self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(ASSET_CACHE).then(cache => {
            return cache.addAll(PRECACHE_ASSETS).catch(err => {
                console.warn('[SW] Pre-cache parziale:', err);
            });
        })
    );
});

// ─── ACTIVATE — pulizia cache vecchie ───
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(names => {
            return Promise.all(
                names
                    .filter(n => n !== ASSET_CACHE && n.startsWith('barman-pro'))
                    .map(n => caches.delete(n))
            );
        }).then(() => self.clients.claim())
    );
});

// ─── FETCH ───
self.addEventListener('fetch', event => {
    const req = event.request;

    // Solo GET, ignora POST/PUT/DELETE
    if (req.method !== 'GET') return;

    const url = new URL(req.url);

    // Ignora richieste cross-origin (CDN font Google) — lascia gestire al browser
    if (url.origin !== location.origin) return;

    // PDF: network-first (file pesante, vogliamo sempre l'ultima versione se possibile)
    if (url.pathname.endsWith('.pdf')) {
        event.respondWith(
            fetch(req).catch(() => caches.match(req))
        );
        return;
    }

    // HTML principale: network-first con fallback a cache
    if (req.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname.endsWith('/')) {
        event.respondWith(
            fetch(req)
                .then(resp => {
                    const clone = resp.clone();
                    caches.open(ASSET_CACHE).then(c => c.put(req, clone));
                    return resp;
                })
                .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
        );
        return;
    }

    // Tutto il resto (immagini, css, js, manifest): cache-first
    event.respondWith(
        caches.match(req).then(cached => {
            if (cached) return cached;
            return fetch(req).then(resp => {
                if (resp && resp.status === 200) {
                    const clone = resp.clone();
                    caches.open(ASSET_CACHE).then(c => c.put(req, clone));
                }
                return resp;
            });
        })
    );
});
