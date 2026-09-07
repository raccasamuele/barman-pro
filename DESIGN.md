# DESIGN.md — Barman PRO

Registro: **product**. Strategia colore: **Restrained** (neutri tinti + un accento
sotto il 10% della superficie).

## Strategia

Grigio e inchiostro, con un solo accento blu ardesia. La superficie è una lista della
spesa, non una vetrina: il colore marca **azione, selezione e stato**, mai decorazione.

Una tinta sola. I neutri sono **veri** (hue 250, croma quasi nullo): non tirano né al
caldo né al freddo, così l'unico colore della pagina è l'accento e la gerarchia la fanno
tipografia e spazio. L'accento è raro, sotto il 10% della superficie.

> Fino a settembre 2026 i neutri erano tinti caldi (hue 85) e l'accento era verde
> bottiglia (hue 162): una direzione più "editoriale". È stata abbandonata perché in
> tema scuro il verde su grigio caldo leggeva acceso, più da terminale che da strumento
> di lavoro. Se qualcuno rimette in discussione la scelta, il punto è quello.

## Colore

Tutto in OKLCH. Nessun `#000`, nessun `#fff`: il bianco puro su schermo pieno in un
supermercato abbaglia, e il nero puro su carta sbava.

### Tema chiaro (default)

| Token | Valore | Uso |
|---|---|---|
| `--bg` | `oklch(97.2% 0.002 250)` | fondo pagina |
| `--panel` | `oklch(99% 0.001 250)` | superfici rialzate: schede, pannelli |
| `--sunken` | `oklch(94.5% 0.003 250)` | campi, barre, aree incassate |
| `--ink` | `oklch(22% 0.004 250)` | testo primario |
| `--ink-soft` | `oklch(43% 0.005 250)` | testo secondario |
| `--ink-faint` | `oklch(52% 0.006 250)` | etichette, metadati (AA su `--bg`) |
| `--line` | `oklch(88% 0.004 250)` | bordi |
| `--line-strong` | `oklch(78% 0.005 250)` | bordi enfatizzati, separatori |
| `--accent` | `oklch(45% 0.105 258)` | azione primaria, selezione, focus |
| `--accent-hover` | `oklch(38% 0.108 258)` | hover dell'azione primaria |
| `--accent-soft` | `oklch(95% 0.020 258)` | fondo di stati selezionati |
| `--accent-ink` | `oklch(34% 0.090 258)` | testo su `--accent-soft` |
| `--on-accent` | `oklch(99% 0.005 258)` | testo su `--accent` |

### Tema scuro (derivato dagli stessi ruoli)

Non un secondo design: gli stessi token, altri valori. Chi legge il CSS trova una sola
struttura.

| Token | Valore |
|---|---|
| `--bg` | `oklch(18% 0.003 250)` |
| `--panel` | `oklch(22.5% 0.004 250)` |
| `--sunken` | `oklch(14.5% 0.003 250)` |
| `--ink` | `oklch(93% 0.003 250)` |
| `--ink-soft` | `oklch(75% 0.004 250)` |
| `--ink-faint` | `oklch(62% 0.005 250)` |
| `--line` | `oklch(30% 0.005 250)` |
| `--line-strong` | `oklch(42% 0.006 250)` |
| `--accent` | `oklch(72% 0.095 258)` |
| `--accent-hover` | `oklch(78% 0.090 258)` |
| `--accent-soft` | `oklch(28% 0.045 258)` |
| `--accent-ink` | `oklch(85% 0.070 258)` |
| `--on-accent` | `oklch(17% 0.030 258)` |

Precedenza: **scelta manuale salvata > `prefers-color-scheme` > chiaro**. Deve esistere
anche il ritorno ad "automatico".

### Semantici

`--danger oklch(52% 0.170 27)` · `--warn oklch(64% 0.130 70)` · `--ok` coincide con
`--accent`: un secondo colore per "a posto" sarebbe un colore in più da imparare, e in
un'app che non ha stati di errore persistenti non serve.

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
