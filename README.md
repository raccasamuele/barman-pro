# Barman PRO &middot; Calcolatore Eventi

[![Live demo](https://img.shields.io/badge/LIVE%20DEMO-online-722F37?style=for-the-badge&labelColor=B8924B&logoColor=F5EEDC)](https://raccasamuele.github.io/barman-pro/)
[![License](https://img.shields.io/badge/license-MIT-1F1A17?style=for-the-badge&labelColor=B8924B)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-vanilla-722F37?style=for-the-badge&labelColor=B8924B)](#stack-tecnologico)

> **[Apri il calcolatore in browser &rarr;](https://raccasamuele.github.io/barman-pro/)**

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

## File del progetto

```
barman-pro/
├── index.html                              applicazione completa
├── Cocktail_IBA_adattamento_a_feste.pdf    ricettario di riferimento
├── favicon.svg                             icona vettoriale
├── apple-touch-icon.png                    icona iOS / homescreen (512x512)
├── og-image.png                            preview per social media (1200x630)
├── LICENSE                                 licenza MIT
└── README.md                               questo file
```

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

## Licenza

MIT &mdash; copyright (c) 2026 Samuele Racca. Vedi [`LICENSE`](LICENSE).
