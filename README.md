# Barman PRO &middot; Calcolatore Eventi

[![Try Demo](https://img.shields.io/badge/TRY%20DEMO-free-722F37?style=for-the-badge&labelColor=B8924B&logoColor=F5EEDC)](https://raccasamuele.github.io/barman-pro/demo/)
[![Full Version](https://img.shields.io/badge/FULL%20VERSION-15%E2%82%AC-1F1A17?style=for-the-badge&labelColor=B8924B)](mailto:raccasamuele2004@gmail.com?subject=Richiesta%20versione%20completa%20Barman%20PRO)
[![License](https://img.shields.io/badge/license-proprietary-722F37?style=for-the-badge&labelColor=B8924B)](LICENSE)
[![Languages](https://img.shields.io/badge/languages-7-1F1A17?style=for-the-badge&labelColor=B8924B)](#multilingua)

> **[Prova la demo gratuita &rarr;](https://raccasamuele.github.io/barman-pro/demo/)** &middot; 7 lingue, 20 ricette, nessuna registrazione richiesta.

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
- **Google Fonts** &mdash; EB Garamond e Cormorant Garamond
- **localStorage** per la persistenza dello stato

Nessun build step. Nessun server. Si esegue aprendo `index.html` in un browser.

## Identita visiva &mdash; design system

L'estetica si ispira a un volume editoriale di mixologia classica.

### Tipografia

- **EB Garamond** &mdash; corpo del testo, valori, etichette
- **Cormorant Garamond** &mdash; titoli, intestazioni, lettering decorativo

### Palette colori

| Ruolo | HEX |
| --- | --- |
| Oro / accenti decorativi | `#B8924B` |
| Oro chiaro | `#D4B271` |
| Oro scuro | `#8E6F35` |
| Bordeaux / titoli e azioni primarie | `#722F37` |
| Bordeaux scuro / hover | `#4F1E24` |
| Sepia / testo principale | `#1F1A17` |
| Avorio / sfondo pagina | `#F5EEDC` |
| Avorio chiaro / sfondo input | `#FAF6E9` |
| Crema / sfondo card | `#FFFBF0` |
| Bordo tenue | `#D4C5A0` |
| Testo tenue | `#6B5D4A` |
| Verde bottiglia / sezione analcolici | `#3D5A3D` |
| Viola scuro / sezione attrezzatura | `#4A2C4F` |

### Elementi grafici

- Ornamenti tipografici al posto delle emoji: `&#10086;` (fleuron), `&#10022;` (stella a quattro punte), `+` `&times;`
- Filetti doppi in oro a delimitazione delle card
- Bordo laterale colorato per categorizzare le sezioni
- Separatori `&mdash;&mdash;&mdash;&mdash;&mdash; &#10022; &mdash;&mdash;&mdash;&mdash;&mdash;`
- Maiuscoletto a lettere spaziate per le label e i bottoni
- Spigoli vivi (mai arrotondati)

### Componenti chiave

- **Card editoriale** &mdash; doppio filetto oro sopra e sotto, sfondo crema
- **Input** &mdash; sottolineatura oro come bordo inferiore, sfondo avorio
- **Bottone primario** &mdash; sfondo bordeaux con bordo oro, lettering maiuscolo spaziato
- **Bottone primario oro** &mdash; sfondo oro per la call-to-action principale
- **Bottone secondario** &mdash; trasparente con bordo bordeaux
- **Slider** &mdash; accent color bordeaux con valore in tag oro
- **Toast** &mdash; notifica sepia con bordo oro, posizionata in basso al centro

## Struttura della pagina

1. Intestazione con titolo, sottotitolo e ornamenti
2. Sezione ricettario PDF (modale di lettura + download)
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
├── demo/
│   └── index.html                          DEMO pubblica gratuita (20 cocktail, 7 lingue)
├── index.html                              VERSIONE COMPLETA (con password / a pagamento)
├── manifest.json                           PWA manifest
├── sw.js                                   service worker (offline + cache)
├── Cocktail_IBA_adattamento_a_feste.pdf    ricettario (versione completa, 36 pagine)
├── favicon.svg                             icona vettoriale
├── icon-192.png                            icona PWA (192x192)
├── icon-512.png                            icona PWA (512x512)
├── icon-maskable-512.png                   icona PWA maskable (Android)
├── apple-touch-icon.png                    icona iOS / homescreen (512x512)
├── og-image.png                            preview per social media (1200x630)
├── LICENSE                                 licenza proprietaria (codice)
├── LICENSE-PDF                             licenza CC BY-NC-ND 4.0 (documento PDF)
└── README.md                               questo file
```

## Multilingua

La demo è disponibile in 7 lingue: **Italiano** (default), **English**, **Español**, **Français**, **Deutsch**, **Português**, **Nederlands**. La lingua viene rilevata automaticamente dal browser e può essere cambiata dal selettore in alto. La preferenza è salvata localmente.

## Versione DEMO vs Versione COMPLETA

| Funzionalità | Demo (gratis) | Completa (15 €) |
| --- | --- | --- |
| Numero cocktail nel database | 20 più famosi | 65+ (IBA + party drink HV) |
| Cocktail nel menu serata | Max 3 | Illimitati |
| Shot nel menu serata | Max 2 | Illimitati |
| Creazione cocktail e shot personalizzati | &mdash; | ✓ |
| Ricettario PDF (36 pagine) | &mdash; | ✓ |
| Esportazione lista | Con watermark "DEMO" | Pulita |
| Multilingua | 7 lingue | 7 lingue |
| Installazione come PWA | &mdash; | ✓ |

La versione completa è acquistabile contattando l'autore. È in lavorazione l'integrazione con Lemon Squeezy per il checkout automatico e la gestione fiscale globale.

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
| Demo pubblica (`demo/`) | Gratuita, valutativa | Proprietaria | [`LICENSE`](LICENSE) |
| Versione completa | A pagamento, licenza personale | Proprietaria | [`LICENSE`](LICENSE) |
| Documento PDF (`Cocktail_IBA_adattamento_a_feste.pdf`) | Lettura libera, condivisione consentita | CC BY-NC-ND 4.0 | [`LICENSE-PDF`](LICENSE-PDF) |

In sintesi:

- **Il codice del software** è coperto da copyright e non può essere copiato, modificato, ridistribuito o rivenduto senza autorizzazione scritta.
- **La demo** è offerta gratuitamente a scopo dimostrativo. Si può usarla e condividerne l'URL, ma non riprodurne il codice.
- **La versione completa** è acquistabile tramite i canali ufficiali; la licenza concessa è personale e non trasferibile.
- **Il documento PDF** può essere letto, scaricato e condiviso citando l'autore, ma non modificato né usato a fini commerciali.

Le 102 ricette IBA 2024 analizzate nel documento appartengono all'International Bartenders Association.

Copyright © 2026 Samuele Racca · Tutti i diritti riservati.
