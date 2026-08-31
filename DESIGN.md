# DESIGN.md — Barman PRO

Registro: **product**. Strategia colore: **Restrained** (neutri tinti + un accento
sotto il 10% della superficie).

## Strategia

Carta e inchiostro, con un solo accento verde bottiglia. La superficie è una lista della
spesa, non una vetrina: il colore marca **azione, selezione e stato**, mai decorazione.

Due tinte, non una. I neutri sono tinti **caldi** (hue 85), non verso il verde: tingere i
grigi di verde li fa sembrare malati, e la metà "editoriale calda" dell'identità sta
proprio nella carta. Il verde resta l'accento, e resta raro.

## Colore

Tutto in OKLCH. Nessun `#000`, nessun `#fff`: il bianco puro su schermo pieno in un
supermercato abbaglia, e il nero puro su carta sbava.

### Tema chiaro (default)

| Token | Valore | Uso |
|---|---|---|
| `--bg` | `oklch(97.2% 0.008 85)` | fondo pagina, carta |
| `--panel` | `oklch(99% 0.005 85)` | superfici rialzate: schede, pannelli |
| `--sunken` | `oklch(94.5% 0.010 85)` | campi, barre, aree incassate |
| `--ink` | `oklch(23% 0.012 85)` | testo primario |
| `--ink-soft` | `oklch(43% 0.010 85)` | testo secondario |
| `--ink-faint` | `oklch(52% 0.009 85)` | etichette, metadati (AA su `--bg`) |
| `--line` | `oklch(88% 0.010 85)` | bordi |
| `--line-strong` | `oklch(78% 0.012 85)` | bordi enfatizzati, separatori |
| `--accent` | `oklch(43% 0.088 162)` | azione primaria, selezione, focus |
| `--accent-hover` | `oklch(36% 0.090 162)` | hover dell'azione primaria |
| `--accent-soft` | `oklch(94% 0.024 162)` | fondo di stati selezionati |
| `--accent-ink` | `oklch(31% 0.072 162)` | testo su `--accent-soft` |
| `--on-accent` | `oklch(98% 0.012 162)` | testo su `--accent` |

### Tema scuro (derivato dagli stessi ruoli)

Non un secondo design: gli stessi token, altri valori. Chi legge il CSS trova una sola
struttura.

| Token | Valore |
|---|---|
| `--bg` | `oklch(19% 0.008 85)` |
| `--panel` | `oklch(23.5% 0.009 85)` |
| `--sunken` | `oklch(15.5% 0.007 85)` |
| `--ink` | `oklch(94% 0.006 85)` |
| `--ink-soft` | `oklch(75% 0.008 85)` |
| `--ink-faint` | `oklch(62% 0.008 85)` |
| `--line` | `oklch(31% 0.010 85)` |
| `--line-strong` | `oklch(42% 0.012 85)` |
| `--accent` | `oklch(74% 0.105 162)` |
| `--accent-hover` | `oklch(80% 0.100 162)` |
| `--accent-soft` | `oklch(28% 0.038 162)` |
| `--accent-ink` | `oklch(86% 0.070 162)` |
| `--on-accent` | `oklch(17% 0.030 162)` |

Precedenza: **scelta manuale salvata > `prefers-color-scheme` > chiaro**. Deve esistere
anche il ritorno ad "automatico".

### Semantici

`--danger oklch(52% 0.170 27)` · `--warn oklch(64% 0.130 70)` · `--ok` coincide con
`--accent` (il verde qui significa già "a posto", sdoppiarlo creerebbe due verdi che si
somigliano senza voler dire cose diverse).

## Tipografia

**Una famiglia sola**: Manrope Variable, self-hostata, con fallback di sistema. Niente
serif da display: in un'interfaccia di prodotto un font decorativo su etichette e
pulsanti è rumore. Cinzel esce di scena.

Scala fissa in rem, rapporto ~1.2 (stretto, perché qui gli elementi di testo sono tanti e
un contrasto esagerato diventa caos):

`--t-xs .75rem` · `--t-sm .875rem` · `--t-base 1rem` · `--t-md 1.125rem` ·
`--t-lg 1.375rem` · `--t-xl 1.75rem` · `--t-2xl 2.25rem`

Pesi: 400 corpo · 500 etichette e controlli · 600 titoli · 700 numeri.

**`font-variant-numeric: tabular-nums` su ogni quantità e prezzo.** In una colonna di
costi le cifre devono incolonnarsi: è la differenza fra una lista che si legge a colpo
d'occhio e una che va decifrata.

Lunghezza riga di prosa: 65–75ch. Tabelle e liste dense possono andare oltre.

## Spaziatura

Scala a base 4, usata con ritmo variabile (stessa spaziatura ovunque = monotonia):
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64`.

## Forma

Raggi contenuti: `--r-sm 6px` · `--r-md 10px` · `--r-lg 14px`. Niente pillole, niente
bordi da 3px colorati su un lato.

Superfici **piatte con bordi sottili**. Zero `backdrop-filter`: costava un intero
pacchetto di ottimizzazioni su mobile e non aggiungeva informazione. Una sola ombra
morbida, riservata agli overlay che devono galleggiare davvero.

## Movimento

150–220 ms, `cubic-bezier(0.25, 1, 0.5, 1)` (ease-out-quart). Il movimento comunica
**stato**: apertura, chiusura, conferma, caricamento. Niente sequenze d'ingresso, niente
particelle, niente rimbalzi. `prefers-reduced-motion` azzera tutto.

## Stati

Ogni controllo interattivo definisce: default, hover, **focus-visible**, active,
disabled. Il focus è un anello `--accent` a 2px con 2px di offset, visibile su entrambi i
temi: l'app si usa anche da tastiera, e con una mano sola sul telefono il focus è spesso
l'unico riscontro che qualcosa ha risposto.

## Stampa

Non è un ripensamento, è il formato finale. Con il tema chiaro il foglio è già quasi
identico allo schermo: il CSS di stampa nasconde la navigazione e i controlli, forza i
colori a inchiostro su bianco, e lascia la lista con le sue quantità incolonnate.
