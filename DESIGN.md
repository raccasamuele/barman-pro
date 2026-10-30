# DESIGN.md — Barman PRO

Registro: **product**. Interfaccia mobile prima a 375px, con superfici e tipografia
della famiglia blu di raccasamuele.it. La lista resta il centro del prodotto;
gerarchia, gruppi e controlli seguono le convenzioni iOS.

## Colore

I ruoli --bp-* sono l'unica autorità; i nomi storici sono alias. Il bianco puro
è ammesso sulle schede e sul testo dei pulsanti blu, come sulla landing.

| Token | Chiaro | Scuro |
|---|---|---|
| --bp-bg | #eaf1fc | #0b1426 |
| --bp-panel | #ffffff | #17243a |
| --bp-sunken | #f2f6fd | #101b2e |
| --bp-band | #e2ecff | #1e304b |
| --bp-ink | #172b4b | #edf3ff |
| --bp-ink-soft | #4f607a | #bdcbe0 |
| --bp-ink-faint | #596b85 | #9cacbf |
| --bp-line | #c7d6ed | #30435e |
| --bp-line-control | #7b8ba3 | #71839d |
| --bp-line-strong | #91a4c0 | #627895 |
| --bp-accent | #2563eb | #93b4ff |
| --bp-accent-hover | #1d4ed8 | #b3cbff |
| --bp-accent-soft | #e2ecff | #1c3057 |
| --bp-accent-ink | #1d4ed8 | #b7ceff |
| --bp-on-accent | #ffffff | #102143 |

Fondo e accento sono espressi in OKLCH con precisione sufficiente a riprodurre gli
stessi canali sRGB. Scuro manuale e Auto devono restare identici. --bp-ink-faint
supera AA sul fondo; --bp-line-control supera 3:1 su fondo, pannello e superficie
secondaria. Il filo di superficie è più discreto. Testo blu: --bp-accent-ink;
riempimento: --bp-accent. Semantici pericolo e avviso conservano i propri ruoli.
In scuro --bp-danger diventa #ffb4ad, con --bp-on-danger #102143 quando è pieno;
in chiaro il pericolo resta oklch(52% 0.170 27), con testo bianco sul pieno.

La scelta salvata prevale. Senza preferenze l'app parte chiara anche su sistema
scuro; Auto segue il sistema. data-theme="light" resta nel markup, perché la CSP
vieta script inline. theme-color, manifest e BP_THEME_COLOR seguono il fondo.

## Tipografia

--bp-font: **Poppins**, poi sistema. File locali separati per pesi 400, 500, 600,
700 e sottoinsiemi latin / latin-ext con unicode-range. font-display: swap.
Titoli 500–600, spaziatura da −0.025em a −0.045em; large title a 32px.
Scala in rem: .75 / .875 / 1 / 1.125 / 1.375 / 1.75 / 2.25.
Nessun maiuscolo forzato nelle etichette dell'app.

**Poppins non ha cifre tabulari.** --bp-font-num mette Manrope variabile prima di
Poppins. Usarlo solo per quantità, prezzi, valori degli stepper e numeri aggiornati
dal vivo, con font-variant-numeric: tabular-nums. Il totale grande resta Poppins.
Il file Manrope distribuito misura cifre da 62 a 62.15625px a 100px: solo il 6 è
leggermente più largo; a 18px lo scarto è inferiore a 0.03px. Poppins a peso 600
varia invece di circa 30px a 100px. I test verificano caricamento reale, pesi,
sottoinsiemi e questi limiti misurati. /presentazione conserva il suo CSS e Manrope.

## Componenti e spaziatura

Scala spazi: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64px.
Schede con raggio 18px e ombra 0 8px 28px rgb(23 43 75 / 6%).
Liste raggruppate senza bordo esterno, separatori rientrati, righe almeno 44–48px,
pressione tenue e chevron sottile. Stepper in una sola capsula, campi in riga,
scelte singole con spunta a destra. Input, ordine e semantica restano quelli esistenti.

I segmenti hanno un cursore mobile sotto i pulsanti. Lo pseudo-elemento non aggiunge
figli al DOM: alcune traduzioni dipendono dagli indici. Switch con track compatto
dentro un bersaglio da 44px; slider con traccia sottile e pollice bianco.
Primario pieno, raggio 14px, altezza almeno 50px; secondario tenue.
Nessun sollevamento all'hover; pressione leggera a scale(.98).

La barra d'azione resta fissa sopra la navigazione: il padding della pagina ne
riserva l'altezza anche sotto il footer e alla fine dello scorrimento.
Scontrino bianco, filo tratteggiato,
quantità a destra, totale grande blu, quota a persona e fondo a zigzag.
Clay locali con srcset e alt vuoto: Home, scontrino, sezioni e stati vuoti.
Comandi e navigazione mantengono icone a linea. Niente clay su ogni voce.

## Navigazione e fogli

La stessa barra inferiore diventa laterale da 900px. A 1400px Setup e Menù sono
affiancati; la lista ha una colonna leggibile con scontrino laterale da 1100px.

**Eccezione prestazioni:** backdrop-filter è ammesso esclusivamente su testata e
barra di navigazione, con blur 16px e fondo traslucido. Fuori da @supports le
superfici hanno un ripiego opaco. Nessun altro pannello usa sfocatura.

Voce, condivisione, stampa, selettore, Info e benvenuto salgono dal basso sotto
900px, angoli superiori 24px e safe area. Sul desktop sono centrati. Il guidato
occupa tutta l'altezza mobile, con progresso sottile e navigazione a pollice.
Il menù da esporre resta a tutto schermo, con quattro palette --bpm-* autonome.
Nessuna maniglia decorativa e nessun trascinamento non implementato.

## Movimento e accessibilità

200–320ms, cubic-bezier(0.32, 0.72, 0, 1) per i fogli; ease-out per il resto.
Dissolvenza breve fra i pannelli; niente rimbalzi, ingressi in sequenza o
transition: all. prefers-reduced-motion azzera animazioni, transizioni e scroll.
Focus a 2px in accento. Bersagli almeno 44px, zoom consentito, sette lingue.
Prosa limitata a 65–75ch.

## Stampa

Il foglio #print-sheet resta figlio diretto del body, composto dalle righe canoniche.
Inchiostro su bianco: niente clay, ombre, sfondi o zigzag. Le palette del menù
rimangono autonome. Nessuna modifica d'interfaccia deve cambiare il testo dei golden.
