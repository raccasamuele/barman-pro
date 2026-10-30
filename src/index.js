/*
 * Barman PRO vive su barmanpro.raccasamuele.it. Il vecchio indirizzo workers.dev
 * resta acceso solo per rimandare li': risultati su Google, QR e link gia'
 * condivisi (il percorso e la query si conservano, il frammento lo tiene il browser).
 *
 * Qui il codice decide solo il rimando: tutto il resto sono i file di public/.
 * Le anteprime (staging-*, <id>-*) hanno un altro hostname e non vengono toccate.
 */
const VECCHIO = 'barman-pro.raccasamuele2004.workers.dev';
const NUOVO = 'https://barmanpro.raccasamuele.it';

/* Chi ha gia' aperto il vecchio indirizzo ha li' un service worker che serve l'app
   dalla cache, e che il rimando da solo non toglierebbe: lo script di un service
   worker non puo' essere rediretto, l'aggiornamento fallirebbe e resterebbe per
   sempre. A /sw.js risponde quindi questo, che svuota, si toglie e ricarica. */
const SW_ADDIO = `self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
    event.waitUntil((async () => {
        const nomi = await caches.keys();
        await Promise.all(nomi.map(n => caches.delete(n)));
        await self.registration.unregister();
        const finestre = await self.clients.matchAll({ type: 'window' });
        finestre.forEach(f => f.navigate(f.url));
    })());
});
`;

export default {
    fetch(request, env) {
        const url = new URL(request.url);
        if (url.hostname !== VECCHIO) return env.ASSETS.fetch(request);
        if (url.pathname === '/sw.js') {
            return new Response(SW_ADDIO, {
                headers: { 'Content-Type': 'text/javascript; charset=utf-8', 'Cache-Control': 'no-store' },
            });
        }
        return Response.redirect(NUOVO + url.pathname + url.search, 301);
    },
};
