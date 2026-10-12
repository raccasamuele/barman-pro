/*
 * Tema delle pagine statiche (privacy e pagine guida).
 *
 * L'app scrive il tema scelto in bp_settings_v2 (BP_SETTINGS_KEY); queste pagine non caricano
 * app.js e seguivano solo prefers-color-scheme: con il telefono in modalita'
 * scura la privacy si apriva tutta nera anche se l'app era chiara. Qui si
 * legge la stessa preferenza. Senza una scelta vale il chiaro, come nell'app
 * (data-theme="light" e' gia' nel markup, cosi' non c'e' un lampo di scuro).
 *
 * Caricato in <head> senza defer apposta: deve agire prima del primo disegno.
 * Stessa normalizzazione di bpNormalizzaTema() in app.js.
 */
(function () {
    try {
        var s = JSON.parse(localStorage.getItem('bp_settings_v2') || 'null');
        var t = s && s.tema;
        if (t === 'night') t = 'dark';
        if (t === 'wedding') t = 'light';
        var root = document.documentElement;
        if (t === 'dark') root.setAttribute('data-theme', 'dark');
        else if (t === 'auto') root.removeAttribute('data-theme');
    } catch (e) { /* storage non disponibile: resta il chiaro */ }
})();
