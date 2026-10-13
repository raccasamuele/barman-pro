# Fase (c) — Motore "servizio": dosi da bar e dosi da festa

Stato: **approvato e costruito** il 2026-10-13 (decisioni in sez. 8). Suite 277 → 294 test.

## 1. Il problema, misurato nel codice

- In `databaseDrink` (`public/app.js:2212-2232`) ci sono **21 ricette "(HV)"**, tutte
  `60 ml di distillato + 140 ml di mixer`: la dose da festa/disco, bicchiere da 300 ml.
  (In memoria avevo scritto 28: le altre 7 occorrenze sono riferimenti nei profili.)
- Accanto ci sono le ricette a dose IBA (45-50 ml + 100-120 ml). Il risultato: lo stesso
  menu mescola due modi di servire. Un matrimonio propone `Spritz` a dose IBA e
  `Gin Tonic (HV)` a dose disco.
- **Doppioni veri: uno solo.** `Garibaldi (HV)` 60/140 e `Garibaldi (IBA)` 45/120.
  `Moscow Mule (IBA)` ha il suffisso ma non ha gemello. Le altre 20 HV **non hanno**
  una versione da bar: non esiste un "Gin Tonic" semplice.
- La sigla oggi è solo nascosta a schermo (`_bpmStripHV`, 13 chiamate). Il dato resta
  quello.
- La parola "stile" è già usata due volte: `bpCfg.stile` = quanto è ricco il menu
  (essenziale/classico/ricco) e gli stili di stampa del menu. Il concetto nuovo si chiama
  quindi **servizio**, mai "stile".

## 2. La proposta

**Un nome per drink, due dosi possibili, e la scelta sta nell'evento.**

- Le ricette perdono il suffisso: `Gin Tonic (HV)` → `Gin Tonic`, `Garibaldi (HV)` e
  `Garibaldi (IBA)` → `Garibaldi`, `Moscow Mule (IBA)` → `Moscow Mule`.
- `databaseDrink[nome]` contiene la **dose da bar** (quella "normale").
- Una tabella nuova `BP_DOSI_FESTA = { 'Gin Tonic': [...60/140], ... }` contiene la **dose
  da festa**, solo per i drink dove cambia (i 21 highball di oggi, più Moscow Mule).
- L'evento ha un campo nuovo `servizio: 'bar' | 'festa'`.
- Nel motore cambia **una funzione sola**, `_ricetta(nome)` in `bpCalcolaModello`
  (`app.js:6546`): se `p.servizio === 'festa'` e il drink ha una dose da festa, usa quella.
  Tutto il resto della matematica resta identico.

Precedenza, dalla più forte: ricetta incorporata nell'evento (`ricetteEvento`) → ricetta
modificata dall'utente nella libreria → dose da festa (se servizio festa) → dose da bar.
Una ricetta che l'utente ha modificato vale **uguale in entrambi i servizi**: l'ha scritta
lui, non la reinterpretiamo.

### Le dosi

| Drink | Bar (nuova) | Festa (= oggi) |
|---|---|---|
| Gin Tonic, Gin Lemon, Vodka Lemon, Vodka Redbull e varianti aromatizzate (8), Rum & Coca, Monte & Coca, Jager & Redbull, Malibu & Ananas, Midori Lemon, Fernandito | 45 + 120 | 60 + 140 |
| Garibaldi | 45 + 120 (IBA, già nel DB) | 60 + 140 |
| Moscow Mule | 45 + 120 + 10 lime (IBA, già nel DB) | 60 + 140 + 10 lime |
| Dark N Stormy | 60 + 100 (IBA) | 60 + 140 |
| Horses Neck | 40 + 120 (IBA) | 60 + 140 |

La dose festa è **esattamente quella di oggi**: chi aveva un evento da festa ritrova gli
stessi numeri al centesimo.

### Dove si sceglie

- **Guidato, passo 2** "Ospiti e consumo": una riga "Come servi" con due scelte affiancate,
  *Bar / ricevimento* e *Festa / disco*, con il sottotitolo "dosi IBA" / "più distillato,
  bicchiere grande". È quella del mockup approvato.
- **Pagina Evento**, nel Setup accanto a durata e consumo: la stessa scelta.
- **Predefinito per tipo**: matrimonio, aperitivo, aziendale → bar; compleanno, serata →
  festa. Cambiare tipo cambia il predefinito solo finché l'utente non l'ha toccato.
- Il riepilogo del guidato e la lista mostrano il servizio scelto ("Dosi da festa").

## 3. Compatibilità: nessun numero salvato deve cambiare da solo

I nomi vecchi possono arrivare da **sei** ingressi, tutti verificati:

1. stato corrente in `localStorage` (`app.js:3586`)
2. eventi salvati, aperti con `bpEventOpen` (`app.js:5421`)
3. link condiviso `#e=…`
4. file di backup importato (`bpImportaFile`, `app.js:2890`)
5. libreria ricette `bp_recipes_v2`: `mods` e `custom` sono **indicizzati per nome**
6. la migrazione dal formato più vecchio (`app.js:2628`)

**Una funzione sola**, `bpMigraNomiServizio(menu)`, chiamata da tutti e sei:

- rinomina le chiavi `(HV)`/`(IBA)` nel nome nuovo, sommando i pesi se nello stesso menu
  c'erano sia `Garibaldi (HV)` sia `Garibaldi (IBA)`;
- se l'evento **non ha** il campo `servizio`: `festa` se conteneva almeno un nome `(HV)`,
  altrimenti `bar`. Così un evento vecchio ricalcola **identico**.

Casi limite che cambiano numeri, e li dichiaro invece di nasconderli:
- un menu vecchio con `Moscow Mule (IBA)` **insieme** a drink HV diventa "festa" e il
  Moscow Mule passa a 60 ml;
- un menu vecchio con entrambi i Garibaldi li unisce in una riga sola con la dose del
  servizio.

Nei test, entrambi i casi hanno un caso dedicato che fissa il comportamento.

Per la libreria: un `mods['Gin Tonic (HV)']` diventa `mods['Gin Tonic']`. Se l'utente
aveva modificato la ricetta, la sua modifica vince in entrambi i servizi (vedi sopra).

**Le chiavi di storage non cambiano.** La migrazione è additiva (aggiunge `servizio`,
rinomina chiavi del menu): una scheda vecchia ancora aperta che rilegge un evento migrato
trova nomi che non conosce e li salta. È lo stesso rischio, già accettato, delle fasi
precedenti, e dura fino al ricaricamento (lo forza `bpSorvegliaAggiornamentoSW`).

## 4. Test

- **Golden calcolo (`tests/golden/calc.json`)**: i 28 casi non usano nessun drink HV.
  Restano identici byte per byte con servizio `bar` **e** con servizio assente. Questo è
  il cancello: se un caso storico si muove, il lavoro si ferma.
- **Freeze DB (`golden/db.json`)**: cambia per forza (21 nomi, 137 → 136 ricette).
  Si rigenera **una volta**, a mano, guardando il diff ricetta per ricetta.
- **Golden nuovi**: lo stesso menu di highball in `bar` e in `festa`; un menu misto
  (Spritz + Gin Tonic) dove cambia solo il gin; un evento vecchio con nomi HV che deve
  dare il **totale di prima** (valore preso dalla produzione attuale prima del lavoro).
- **UI**: la scelta si preme davvero (non si chiama la funzione); il predefinito segue il
  tipo; si salva, si ricarica e resta; link e backup portano il servizio.
- Regola di sempre: ogni test di regressione va visto **fallire** sul codice vecchio.

## 5. Lingue

Testi nuovi in 7 lingue: titolo "Come servi", due scelte con sottotitolo, l'etichetta
nella lista. Circa 6 chiavi × 7. `check-i18n --strict` le controlla. I nomi dei drink non
sono tradotti oggi e non lo diventano.

## 6. Fuori da questa fase

- **Categorie nel DB** (long drink, classici, aperitivi) per i filtri del mockup:
  è un lavoro di dati separato, 136 ricette da classificare.
- **Ghiaccio e bicchieri per servizio** (bicchiere da 300 ml = più ghiaccio): oggi
  `100 g a bicchiere` fisso. Si può fare dopo, con lo stesso campo `servizio`.
- **Shot**: restano 40 ml in entrambi i servizi.

## 7. Ordine di lavoro

1. Prendere dalla produzione i totali di 3 eventi con nomi HV (fixture "prima").
2. Migrazione dei nomi + campo `servizio`, senza ancora la scelta in UI → i golden
   storici devono passare, i fixture "prima" devono tornare identici.
3. Dosi da bar e `BP_DOSI_FESTA`, freeze DB rigenerato.
4. Scelta in UI (guidato + pagina Evento) e 7 lingue.
5. Anteprima staging, verifica in un browser **che ha già visitato il sito**, poi
   produzione su richiesta.

## 8. Decisioni dell'utente (2026-10-13)

1. Dose da bar per gli highball senza IBA: **45 + 120 ml**.
2. Rum & Coca e Cuba Libre: **restano separati**.
3. Predefinito per tipo: **come proposto** (matrimonio/aperitivo/aziendale = bar,
   compleanno/serata = festa).

## 9. Com'è andata

- Totali "prima" presi dal codice in produzione (`dbadf0b`) in
  `tests/golden/servizio-prima.json`: 4 menu con nomi vecchi. Tornano identici dalla
  bozza, dall'evento riaperto con "Modifica" e dal link.
- **Uno scostamento, voluto**: "Garibaldi (HV)" non aveva guarnizioni, "Garibaldi (IBA)"
  la fetta d'arancia. Il Garibaldi unificato ha quella. È una riga promemoria senza prezzo:
  il totale non cambia. Il test lo dichiara (`RIGHE_NUOVE`).
- I 28 casi golden storici sono rimasti identici senza toccarli. Il freeze del DB è
  stato rigenerato una volta: −23 nomi con sigla, +22 nomi puliti, ingredienti uguali.
- Ogni test nuovo è stato visto fallire rompendo apposta cinque pezzi del lavoro
  (migrazione nomi, deduzione del servizio, dose da festa nel motore, libreria,
  precedenza delle ricette dell'utente).
