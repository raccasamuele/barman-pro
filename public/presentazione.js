/**
 * Barman PRO · pagina di presentazione
 * © 2026 Samuele Racca · MIT
 *
 * Nessuna libreria: le quattro animazioni della pagina (pallini, video che
 * cresce, testo che si accende, numeri che si compongono) stanno in poche
 * righe, e la pagina resta senza dipendenze come l'app.
 *
 * Senza questo script la pagina e' completa e ferma: il movimento parte solo
 * aggiungendo la classe `anim` a <html>, e solo se chi guarda non ha chiesto
 * meno animazioni.
 */
(function () {
  'use strict';

  var fermo = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 80 pallini, 16 vuoti sparsi: chi non beve alcolici (come nel video) ── */
  var VUOTI = [3, 9, 14, 22, 27, 31, 38, 44, 49, 53, 58, 61, 67, 72, 76, 79];
  var pallini = document.getElementById('pallini');
  if (pallini) {
    var html = '';
    for (var i = 0; i < 80; i++) {
      // ondata dal centro: il ritardo cresce con la distanza dal centro della griglia 10x8
      var r = Math.floor(i / 10), c = i % 10;
      var d = Math.sqrt(Math.pow(c - 4.5, 2) + Math.pow(r - 3.5, 2));
      html += '<i' + (VUOTI.indexOf(i) > -1 ? ' class="no"' : '') + ' style="--d:' + (d * 0.06).toFixed(2) + 's"></i>';
    }
    pallini.innerHTML = html;
  }

  /* ── striscia delle lingue: due giri identici per lo scorrimento continuo ── */
  var F = {
    it: '<rect width="20" height="40" fill="#009246"/><rect x="20" width="20" height="40" fill="#fff"/><rect x="40" width="20" height="40" fill="#ce2b37"/>',
    en: '<rect width="60" height="40" fill="#012169"/><path d="M0 0L60 40M60 0L0 40" stroke="#fff" stroke-width="8"/><path d="M0 0L60 40M60 0L0 40" stroke="#c8102e" stroke-width="3"/><path d="M30 0V40M0 20H60" stroke="#fff" stroke-width="12"/><path d="M30 0V40M0 20H60" stroke="#c8102e" stroke-width="7"/>',
    es: '<rect width="60" height="40" fill="#aa151b"/><rect y="10" width="60" height="20" fill="#f1bf00"/>',
    fr: '<rect width="20" height="40" fill="#0055a4"/><rect x="20" width="20" height="40" fill="#fff"/><rect x="40" width="20" height="40" fill="#ef4135"/>',
    de: '<rect width="60" height="14" fill="#000"/><rect y="13.3" width="60" height="13.4" fill="#dd0000"/><rect y="26.7" width="60" height="13.3" fill="#ffce00"/>',
    pt: '<rect width="60" height="40" fill="#da291c"/><rect width="24" height="40" fill="#046a38"/><circle cx="24" cy="20" r="8" fill="#ffe900"/><rect x="21" y="15.5" width="6" height="8" rx="1.5" fill="#da291c"/><rect x="22.5" y="17" width="3" height="5" rx=".8" fill="#fff"/>',
    nl: '<rect width="60" height="40" fill="#ae1c28"/><rect y="13.3" width="60" height="13.4" fill="#fff"/><rect y="26.7" width="60" height="13.3" fill="#21468b"/>'
  };
  var nastro = document.getElementById('nastro');
  if (nastro) {
    // Il primo giro e' gia' nel markup (lo leggono motori e lettori di schermo);
    // qui si aggiungono solo le bandiere e, se si muove, la copia nascosta.
    Array.prototype.forEach.call(nastro.querySelectorAll('.voce'), function (v) {
      var f = document.createElement('span');
      f.className = 'flag';
      f.innerHTML = '<svg viewBox="0 0 60 40" preserveAspectRatio="none" aria-hidden="true">' + F[v.lang] + '</svg>';
      v.insertBefore(f, v.firstChild);
    });
    if (!fermo) {
      Array.prototype.forEach.call(nastro.querySelectorAll('.voce'), function (v) {
        var copia = v.cloneNode(true);
        copia.setAttribute('aria-hidden', 'true');
        nastro.appendChild(copia);
      });
    }
  }

  /* ── installazione ──
   * Android/Chrome: il browser offre l'evento beforeinstallprompt e il tasto
   * apre l'installazione vera. Altrove (iPhone, Instagram, gia' installata)
   * l'evento non arriva e il tasto resta un normale link all'app. */
  var invito = null;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    invito = e;
  });
  window.addEventListener('appinstalled', function () {
    invito = null;
    var n = document.getElementById('installata');
    if (n) n.hidden = false;
  });
  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-installa]') : null;
    if (!t || !invito) return;
    e.preventDefault();
    var p = invito;
    invito = null;
    p.prompt();
  });

  if ('serviceWorker' in navigator) {
    // Lo stesso service worker dell'app: chi installa da qui la ritrova
    // gia' pronta anche senza rete.
    navigator.serviceWorker.register('/sw.js').catch(function () {});
  }

  /* ── schede di installazione: si apre quella del telefono che sta guardando ── */
  var schede = Array.prototype.slice.call(document.querySelectorAll('.schede [role="tab"]'));
  function apri(id) {
    schede.forEach(function (b) {
      var on = b.id === id;
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
      document.getElementById(b.getAttribute('aria-controls')).hidden = !on;
    });
  }
  schede.forEach(function (b, k) {
    b.addEventListener('click', function () { apri(b.id); });
    b.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      var n = schede[(k + d + schede.length) % schede.length];
      apri(n.id);
      n.focus();
    });
  });
  var ua = navigator.userAgent || '';
  if (/Instagram|FBAN|FBAV/i.test(ua)) apri('s-insta');
  else if (/iPhone|iPad|iPod/i.test(ua)) apri('s-ios');
  else apri('s-android');

  /* ── schermo intero ── */
  var filmato = document.getElementById('filmato');
  var intero = document.getElementById('intero');
  if (filmato && intero) {
    intero.addEventListener('click', function () {
      var fs = filmato.requestFullscreen || filmato.webkitRequestFullscreen || filmato.webkitEnterFullscreen;
      try {
        var r = fs && fs.call(filmato);
        if (r && r.catch) r.catch(function () {});
      } catch (err) { /* il browser non lo consente: resta il video nella pagina */ }
      try {
        var pr = filmato.play();
        if (pr && pr.catch) pr.catch(function () {});
      } catch (err) { /* niente */ }
    });
  }

  if (fermo) return;
  document.documentElement.classList.add('anim');

  /* ── i riquadri salgono quando entrano (quelli gia' visibili non aspettano) ── */
  var carte = document.querySelectorAll('.card');
  var altezza = window.innerHeight;
  Array.prototype.forEach.call(carte, function (c) {
    if (c.getBoundingClientRect().top > altezza * 0.92) c.classList.add('attesa');
  });

  /* ── i numeri si compongono una volta, quando arrivano ── */
  function euro(n) { return '€ ' + n.toFixed(2).replace('.', ','); }
  function conta(el) {
    var fine = parseFloat(el.getAttribute('data-n')), u = el.getAttribute('data-u') || '';
    var soldi = el.hasAttribute('data-euro'), durata = soldi ? 1600 : 1100, t0 = null;
    function passo(t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / durata), v = fine * (1 - Math.pow(1 - k, 3));
      el.textContent = soldi ? euro(v) : Math.round(v) + u;
      if (k < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (voci) {
      voci.forEach(function (v) {
        if (!v.isIntersecting) return;
        io.unobserve(v.target);
        if (v.target.classList.contains('card')) v.target.classList.remove('attesa');
        else conta(v.target);
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    Array.prototype.forEach.call(document.querySelectorAll('.card.attesa, [data-n]'), function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(carte, function (c) { c.classList.remove('attesa'); });
  }

  /* ── scorrendo: il video cresce entrando, il testo si accende parola per parola ── */
  var cornice = document.querySelector('.cornice');
  var leggi = document.querySelector('.leggi');
  var parole = [];
  if (leggi) {
    leggi.innerHTML = leggi.textContent.trim().split(/\s+/).map(function (w) {
      return '<span class="w">' + w + '</span>';
    }).join(' ');
    parole = leggi.querySelectorAll('.w');
  }
  function limita(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  var inCoda = false;
  function aggiorna() {
    inCoda = false;
    var h = window.innerHeight;
    if (cornice) {
      var top = cornice.parentNode.getBoundingClientRect().top;
      var k = limita((h * 0.95 - top) / (h * 0.6));
      cornice.style.transform = 'scale(' + (0.92 + 0.08 * k).toFixed(4) + ')';
    }
    if (parole.length) {
      var b = leggi.getBoundingClientRect();
      var p = limita((h * 0.8 - b.top) / (b.height + h * 0.35));
      var accese = p * parole.length;
      for (var j = 0; j < parole.length; j++) {
        parole[j].style.opacity = (0.14 + 0.86 * limita(accese - j)).toFixed(3);
      }
    }
  }
  function chiedi() {
    if (!inCoda) { inCoda = true; requestAnimationFrame(aggiorna); }
  }
  window.addEventListener('scroll', chiedi, { passive: true });
  window.addEventListener('resize', chiedi);
  aggiorna();
})();
