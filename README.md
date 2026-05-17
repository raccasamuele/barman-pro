# Barman PRO &middot; Calcolatore Eventi

[![Try Demo](https://img.shields.io/badge/TRY%20DEMO-free-0d0d0f?style=for-the-badge&labelColor=B38E46&logoColor=fcfcfc)](https://raccasamuele.github.io/barman-pro/)
[![Full Version](https://img.shields.io/badge/FULL%20VERSION-9.90%E2%82%AC-0d0d0f?style=for-the-badge&labelColor=B38E46)](mailto:raccasamuele2004@gmail.com?subject=Richiesta%20versione%20completa%20Barman%20PRO)
[![License](https://img.shields.io/badge/license-proprietary-0d0d0f?style=for-the-badge&labelColor=B38E46)](LICENSE)
[![Languages](https://img.shields.io/badge/languages-7-0d0d0f?style=for-the-badge&labelColor=B38E46)](#multilingua)

> **[Prova la demo gratuita &rarr;](https://raccasamuele.github.io/barman-pro/)** &middot; 7 lingue, 20 ricette, nessuna registrazione richiesta.

Strumento web per il calcolo della lista della spesa di eventi di miscelazione, basato sulle 102 ricette ufficiali IBA 2024 e sulle matrici volumetriche per il servizio ad alto volume (party drink 60/140/100).

---

## Cosa fa

Inserendo numero di ospiti, cocktail e shot a persona, l'app calcola automaticamente:

- la quantita di ogni alcolico e di ogni filler analcolico in litri,
- il ghiaccio in chilogrammi,
- il fabbisogno di bicchieri, bicchierini da shot e cannucce.

L'utente sceglie i drink della serata da un ricettario integrato (cocktail IBA classici e party drink "high volume") e ne regola la frequenza con uno slider da 1 a 5. Possono essere creati cocktail e shot personalizzati. Lo stato dell'evento viene salvato automaticamente in `localStorage`.

## Stack tecnologico

Pagina HTML singola, autonoma:

- **HTML5** semantico
- **CSS3** con variabili custom, niente framework
- **JavaScript** vanilla (nessuna dipendenza esterna)
- **Google Fonts** &mdash; Manrope e Cinzel
- **localStorage** per la persistenza dello stato
- **Service Worker** per il funzionamento offline (PWA)
- **Sistema di License Key** per la gestione dell'accesso alla versione completa

Nessun build step. Nessun server. Si esegue aprendo `index.html` in un browser.

## Identita visiva &mdash; design system

L'estetica si ispira all'universo della miscelazione contemporanea: interfaccia dark glass, contrasti netti, tipografia classica su fondo scuro.

### Tipografia

- **Manrope** &mdash; corpo del testo, valori, etichette, UI generale
- **Cinzel** &mdash; titoli, intestazioni, lettering decorativo

### Palette colori

| Ruolo | HEX / valore |
| --- | --- |
| Sfondo pagina | `#0d0d0f` |
| Card / glass container | `rgba(22, 22, 22, 0.80)` |
| Bordo card oro | `rgba(179, 142, 70, 0.40)` |
| Bordo secondario | `rgba(255, 255, 255, 0.10)` |
| Testo principale | `#fcfcfc` |
| Testo attenuato | `#999999` |
| Oro accento 1 | `#EAD0A1` |
| Oro accento 2 | `#B38E46` |

### Elementi grafici

- Ornamenti tipografici al posto delle emoji: `&#10086;` (fleuron), `&#10022;` (stella a quattro punte), `&times;`
- Card con effetto **glass morphism** (`backdrop-filter: blur`) e bordo oro semitrasparente
- **Ambient background**: div fisso con gradienti radiali sfumati e filtro blur per l'effetto mesh gradient
- Maiuscoletto a lettere spaziate per le label e i bottoni
- Angoli leggermente arrotondati (`border-radius: 12px` per le card)

### Componenti chiave

- **Card glass** &mdash; sfondo semitrasparente scuro, bordo oro sfumato, backdrop blur
- **Input** &mdash; sfondo scuro con bordo oro inferiore, testo chiaro
- **Bottone primario** &mdash; sfondo oro `#B38E46`, testo scuro, Cinzel
- **Bottone outline** &mdash; trasparente con bordo oro semitrasparente
- **Slider** &mdash; accent color oro con valore in tag gold
- **Toast** &mdash; notifica dark con bordo oro, posizionata in basso al centro
- **Modale PDF** &mdash; overlay scuro con iframe e barra header glass

## Struttura della pagina

1. Intestazione con titolo, sottotitolo e ornamenti
2. Sezione ricettario PDF bilingue IT/EN (modale di lettura + download)
3. Parametri evento (4 input in linea)
4. Cocktail della serata (ricerca + slider di frequenza)
5. Shot e amari (ricerca + slider di frequenza)
6. Creazioni personalizzate (creator dinamico per cocktail e bottiglie)
7. Pulsante "Genera lista della spesa"
8. Risultati &mdash; alcolici, analcolici, attrezzatura
9. Esportazione &mdash; copia testo, stampa o salva PDF

## Struttura del progetto

```
barman-pro/
├── docs/
│   ├── index.html                          DEMO pubblica gratuita (20 cocktail, 7 lingue)
│   ├── eula.html                           EULA versione demo
│   └── privacy.html                        Privacy Policy versione demo
├── index.html                              VERSIONE COMPLETA (con License Key)
├── index_senza_key.html                    VERSIONE COMPLETA (senza sistema di chiavi)
├── eula.html                               EULA versione completa
├── privacy.html                            Privacy Policy versione completa
├── manifest.json                           PWA manifest
├── sw.js                                   service worker (offline + cache)
├── Cocktail_IBA_adattamento_a_feste.pdf    ricettario IT (versione completa, 36 pagine)
├── Cocktail_IBA_party_adaptation.pdf       ricettario EN (versione completa, 36 pagine)
├── favicon.svg                             icona vettoriale
├── icon-192.png                            icona PWA (192x192)
├── icon-512.png                            icona PWA (512x512)
├── icon-maskable-512.png                   icona PWA maskable (Android)
├── apple-touch-icon.png                    icona iOS / homescreen (512x512)
├── og-image.png                            preview per social media (1200x630)
├── LICENSE                                 licenza proprietaria (codice)
├── LICENSE-PDF                             licenza CC BY-NC-ND 4.0 (documenti PDF)
└── README.md                               questo file
```

## Multilingua

La demo è disponibile in 7 lingue: **Italiano** (default), **English**, **Español**, **Français**, **Deutsch**, **Português**, **Nederlands**. La lingua viene rilevata automaticamente dal browser e può essere cambiata dal selettore in alto. La preferenza è salvata localmente.

## Versione DEMO vs Versione COMPLETA

| Funzionalità | Demo (gratis) | Completa (9,90 €) |
| --- | --- | --- |
| Numero cocktail nel database | 20 più famosi | 102 (IBA 2024 + party drink HV) |
| Cocktail nel menu serata | Max 3 | Illimitati |
| Shot nel menu serata | Max 2 | Illimitati |
| Creazione cocktail e shot personalizzati | &mdash; | ✓ |
| Ricettario PDF bilingue IT/EN (36 pagine) | &mdash; | ✓ |
| Esportazione lista | Con watermark "DEMO" | Pulita |
| Multilingua | 7 lingue | 7 lingue |
| Installazione come PWA | &mdash; | ✓ |
| License Key personale | &mdash; | ✓ |

La versione completa sarà disponibile a breve.

## Installazione come app (PWA)

Barman PRO è una **Progressive Web App**: si può installare sul telefono o sul desktop come una vera app, con icona sulla home, schermata di lancio dedicata, e funzionamento offline (una volta visitato il sito almeno una volta).

**Su Android (Chrome / Edge / Brave / Samsung Internet)**

1. Apri `https://raccasamuele.github.io/barman-pro/`.
2. Tocca i tre puntini in alto a destra del browser.
3. Scegli **Installa app** o **Aggiungi alla schermata Home**.
4. L'app appare sulla home con la sua icona.

**Su iPhone / iPad (Safari)**

1. Apri il sito in Safari.
2. Tocca il pulsante **Condividi** (icona quadrato con freccia, in basso al centro).
3. Scorri e tocca **Aggiungi alla schermata Home**.
4. Conferma con **Aggiungi**.

**Su desktop (Chrome / Edge)**

Nel sito comparirà un piccolo bottone "Installa app" in alto. Cliccandolo, l'app viene installata come applicazione nativa sul sistema operativo.

Una volta installata, l'app funziona anche senza connessione (cache offline gestita dal service worker `sw.js`).

## Esecuzione locale

```bash
# Clona il repo
git clone https://github.com/raccasamuele/barman-pro.git
cd barman-pro

# Apri index.html in qualsiasi browser
# Su macOS:    open index.html
# Su Linux:    xdg-open index.html
# Su Windows:  start index.html
```

Non serve nessun server. Tutte le dipendenze (font, stili) sono caricate via CDN o inline.

## Deploy

Il sito e pubblicato gratuitamente tramite **GitHub Pages** all'indirizzo:

**[https://raccasamuele.github.io/barman-pro/](https://raccasamuele.github.io/barman-pro/)**

Ogni commit sul branch `main` rideploya automaticamente in 1-2 minuti.

## Modello e licenze

Barman PRO è distribuito in due modalità, con licenze distinte.

| Componente | Modalità | Licenza | File |
| --- | --- | --- | --- |
| Demo pubblica (`docs/`) | Gratuita, valutativa | Proprietaria | [`LICENSE`](LICENSE) |
| Versione completa | A pagamento, licenza personale | Proprietaria | [`LICENSE`](LICENSE) |
| Ricettario IT (`Cocktail_IBA_adattamento_a_feste.pdf`) | Lettura libera, condivisione consentita | CC BY-NC-ND 4.0 | [`LICENSE-PDF`](LICENSE-PDF) |
| Ricettario EN (`Cocktail_IBA_party_adaptation.pdf`) | Lettura libera, condivisione consentita | CC BY-NC-ND 4.0 | [`LICENSE-PDF`](LICENSE-PDF) |

In sintesi:

- **Il codice del software** è coperto da copyright e non può essere copiato, modificato, ridistribuito o rivenduto senza autorizzazione scritta.
- **La demo** è offerta gratuitamente a scopo dimostrativo. Si può usarla e condividerne l'URL, ma non riprodurne il codice.
- **La versione completa** è acquistabile tramite i canali ufficiali; la licenza concessa è personale e non trasferibile.
- **I documenti PDF** possono essere letti, scaricati e condivisi citando l'autore, ma non modificati né usati a fini commerciali.

Le 102 ricette IBA 2024 analizzate nei documenti appartengono all'International Bartenders Association.

Copyright &copy; 2026 Samuele Racca &middot; Tutti i diritti riservati.
