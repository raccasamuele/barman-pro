/*
 * Cloudflare Web Analytics · conteggio delle visite, senza cookie.
 *
 * ─────────────────────────────────────────────────────────────────────
 *  PER ATTIVARE: incolla qui sotto il token del sito, e basta.
 * ─────────────────────────────────────────────────────────────────────
 *
 * Il token si prende dalla dashboard Cloudflare:
 *   Analytics & Logs → Web Analytics → Add a site
 *   hostname: barman-pro.raccasamuele2004.workers.dev
 * Nello snippet che viene mostrato, il token e' il valore dentro
 * `data-cf-beacon='{"token": "..."}'`.
 *
 * ⚠️ Il token e' legato all'HOSTNAME configurato. Quello della versione
 *    precedente (05c0492a…) apparteneva a demo.barmanpro.app: riusarlo
 *    qui non avrebbe dato errori visibili, semplicemente Cloudflare
 *    avrebbe scartato i dati perche' l'hostname non corrisponde. E'
 *    stato tolto proprio per questo.
 *
 * Finche' TOKEN e' vuoto non parte nessuna richiesta verso terzi.
 *
 * Chi forka il progetto: metti il TUO token, o lascia vuoto. Con quello
 * di un altro manderesti i dati delle tue visite al suo account, dove
 * peraltro verrebbero scartati.
 */
(function () {
    var TOKEN = '';

    if (!TOKEN) return;

    var s = document.createElement('script');
    s.defer = true;
    s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    s.setAttribute('data-cf-beacon', JSON.stringify({ token: TOKEN }));
    document.head.appendChild(s);
})();
