# Materiale di terzi

La licenza MIT nel file `LICENSE` copre il codice scritto dall'autore. Questo
documento elenca ciò che è di altri, o che deriva da fonti esterne, con la
relativa licenza. Serve a chi forka il progetto: senza, non sarebbe chiaro
cosa può ridistribuire e a quali condizioni.

---

## Manrope (font)

- **Percorso:** `public/fonts/manrope-latin-wght-normal.woff2`,
  `public/fonts/manrope-latin-ext-wght-normal.woff2`
- **Autore:** Mikhail Sharanda / Mirko Velimirović
- **Licenza:** SIL Open Font License 1.1
- **Testo della licenza:** `public/fonts/OFL.txt`
- **Origine del testo di licenza:**
  `https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt`
  (scaricato il 2026-08-31 · 4384 byte · sha256 `e01b637272e0cbdf…`)
- **Copyright:** 2018 The Manrope Project Authors

I file sono i subset variabili `latin` e `latin-ext`. Servono entrambi: le
sette lingue dell'interfaccia usano lettere accentate che il solo subset
`latin` non copre.

La OFL consente uso, modifica e ridistribuzione, anche commerciale, ma il
font non può essere venduto da solo e le versioni modificate non possono
usare il nome riservato. Ridistribuendo questo progetto si ridistribuisce
anche il font: il testo della licenza deve restare accanto ai file.

---

## Database delle ricette

- **Percorso:** oggetto `databaseDrink` in `public/app.js` (137 ricette)
- **Natura:** adattamento, non riproduzione

Le proporzioni di partenza derivano dalle ricette ufficiali della
**International Bartenders Association (IBA)**, poi ricalibrate dall'autore
per il servizio ad alto volume, che è il problema che questa applicazione
risolve.

Un elenco di ingredienti e dosi è in larga parte un insieme di fatti, e i
fatti non sono soggetti a copyright: per questo il database è distribuito
con il codice sotto licenza MIT. L'attribuzione è resa esplicita qui perché
è corretto dire da dove viene il lavoro, non perché sia obbligatorio.

L'IBA non è affiliata a questo progetto e non lo approva.

---

## Cloudflare Web Analytics

- **Dove:** pagine dei contenuti in `public/`
- **Natura:** servizio esterno, non codice ridistribuito

Il conteggio delle visite avviene tramite lo script `beacon.min.js` servito
da `static.cloudflareinsights.com`. È senza cookie e non profila; è
dichiarato in `public/privacy.html` ed è l'unica terza parte che riceve
qualcosa quando qualcuno usa l'app.

Chi forka il progetto e lo pubblica altrove dovrebbe **rimuovere il token o
sostituirlo con il proprio**: altrimenti manderebbe i dati delle proprie
visite all'account di qualcun altro, dove peraltro verrebbero scartati
perché l'hostname non corrisponde.

---

## Icone e immagini

Le icone dell'applicazione (`favicon.svg`, `icon-*.png`,
`apple-touch-icon.png`, `og-image.png`) sono opera dell'autore e sono
coperte dalla licenza MIT insieme al resto.

---

## Cosa NON fa parte di questo repository

Il ricettario PDF *«Cocktail IBA · Adattamento per Feste»* era un'opera
editoriale distribuita con la versione a pagamento. **Non è incluso qui**, in
nessuna forma, e la funzione che lo apriva è stata rimossa dall'applicazione
insieme ad esso: non troverai un pulsante che non porta da nessuna parte.
