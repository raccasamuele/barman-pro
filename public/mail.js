/*
 * Indirizzo email offuscato.
 *
 * Una `mailto:` scritta in chiaro su una pagina indicizzata viene raccolta
 * dai bot che scandagliano il web in cerca di indirizzi. Qui l'indirizzo non
 * compare mai nel sorgente per intero: viene ricomposto al momento del
 * caricamento e messo nell'href.
 *
 * Non è una protezione forte — chi vuole leggerlo può eseguire lo script —
 * ma ferma i raccoglitori automatici, che si limitano a cercare "mailto:"
 * nell'HTML. Per l'utente non cambia niente: vede un link e ci clicca.
 *
 * Applica a ogni elemento con l'attributo `data-mail`.
 */
(function () {
    var utente = ['raccasamuele', '2004'].join('');
    var dominio = ['gmail', 'com'].join('.');
    var indirizzo = utente + String.fromCharCode(64) + dominio;

    document.querySelectorAll('[data-mail]').forEach(function (el) {
        el.setAttribute('href', 'mailto:' + indirizzo);
        el.setAttribute('rel', 'nofollow');
        // Se l'elemento non ha un testo proprio, mostra l'indirizzo.
        if (!el.textContent.trim()) el.textContent = indirizzo;
    });
})();
