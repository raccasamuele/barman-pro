# Plan: ridisegno interfaccia Barman PRO — navigazione mobile-first, stampa, tre funzionalità nuove, Canva
_Locked via grill — by Claude + Samuele Racca, 2026-09-07 · rev. 6 dopo i Round 1-5 di Codex_

## Goal

Barman PRO ha oggi due sistemi di navigazione sovrapposti (un flusso lineare a 3 passi con
stepper in alto, e una home-hub con card che aprono overlay a schermo intero) più un
bottone Home flottante che non sa dove si trova. Non esiste un posto stabile da cui
orientarsi. L'obiettivo è **una sola navigazione**, mobile-first, con una barra in basso a
quattro voci che a schermi larghi diventa una sidebar; una Home che dice a colpo d'occhio a
che punto sei; una stampa che stampa quello che deve; e tre funzionalità che rendono la
lista utilizzabile davvero al supermercato. In coda, separata perché rompe vincoli storici,
l'integrazione con Canva per il menù da esporre.

Il piano prevedeva funzionalità che lavorano "a valle" del calcolo, ma **a valle non c'era
niente**: `calcolaSpesa()` costruisce quantità e prezzi al suo interno, muta il DOM e
ritorna un booleano. Da qui la **Fase 0**, che estrae quel modello senza cambiare un pixel.
Tutto il resto poggia lì.

---

## Stato di partenza verificato

Fatti misurati sul repo. **[R1]**…**[R5]** marcano ciò che i round di Codex
hanno trovato sbagliato o mancante nelle revisioni precedenti.

- `public/` = `index.html` (577 righe) + `app.css` (~2450 righe, fusione di 9 blocchi
  `<style>`: l'ordine è comportamento) + `app.js` (~4900 righe, non un modulo: `let` a
  livello di script, funzioni globali, i test ci parlano via `window.<fn>`) + 4 pagine SEO
  + `privacy.html` + `sw.js` + `manifest.json`.
- **68 test Playwright verdi** (`golden` / `ui` / `pwa`) + `npm run check`.
- Flusso `step-setup` → `step-menu` → `risultati` (`vaiAStep`, app.js:2682).
- CSP (`_headers`): `connect-src 'self' https://cloudflareinsights.com`, `frame-src 'none'`,
  `form-action 'none'`, **niente script inline**.

### I due difetti riportati

1. **La stampa manda in stampa tutta la pagina.** Colpevole: **un** blocco `@media print`
   (app.css:1297) che lavora per sottrazione. **[R1]** Gli altri 8 non sono il difetto:
   servono componenti specifici e le pagine SEO/privacy. Lo schema giusto esiste già nello
   stesso file: `body.bp-printing-menu > *:not(#bp-menu)` (app.css:1865).
2. **Il bottone Home resta in home.** `.bp-homebtn` (index.html:76) non ha regole legate a
   `body.bp-home`, la classe applicata da `bpGoHome()` (app.js:4029).

### Trappole trovate dai round, verificate una per una nel codice

- **[R1] `.bp-nav` esiste già** (app.css:1601, index.html:77) ed è un menu **modale a
  schermo intero**. La barra nuova non può chiamarsi così.
- **[R1] `cambiaLingua()` traduce per posizione** (app.js:1818): `abtn[0..3].textContent`,
  che **cancella anche gli `<span data-i18n>` figli**.
- **[R1] Le azioni della schermata risultati sono 8, non 7.**
- **[R1] Non esiste nessun Worker**: `wrangler.jsonc` dice *"main non definito → nessun JS
  server-side"*.
- **[R1] I golden fotografano il testo di `#risultati li`** (helpers.js:107).
- **[R1] `bpSaveSettings()` scrive e sovrascrive solo 3 campi.**
- **[R1] `bpSetEvents()` ingoia gli errori** e il toast di successo esce comunque.
- **[R1] `vaiAStep()` non memorizza il passo**; `bpHomeResume()` riapre sempre `step-setup`.
- **[R1] `bpEventsList()` interpola `ev.id` non-escapato** in attributi.
- **[R1] Il service worker mette in cache ogni navigazione same-origin.**
- **[R2] `check-i18n` riconosce già `data-i18n-aria`** (regex `data-i18n(?:-[a-z]+)?=`,
  check-i18n.mjs:62). Il buco è a **runtime**: `cambiaLingua()` applica `[data-i18n]` e
  `[data-i18n-ph]`, **mai** `aria-label` (app.js:1792). La rev. 2 proponeva di aggiustare
  il controllo, che funzionava già.
- **[R2] `condividiLista()` ricade su `copiaListaTesto()`** quando Web Share manca o
  fallisce (app.js:4653): togliere la funzione romperebbe la condivisione da desktop.
- **[R2] L'inventario dei modali è più lungo di due**: oltre a `bp-welcome` e `bp-config`,
  ci sono `#bp-menu` (`role="dialog"`, ma classe `.bpm-overlay`, index.html:88) e
  `#suggeritore-modal` (index.html:283), modale a schermo intero **senza alcuna semantica
  di dialogo**.
- **[R2] Due archivi di ricette convivono**: `customDrinks` (dentro la bozza, formato
  vecchio) e `bp_recipes`, ed entrambi mutano `databaseDrink` all'avvio
  (`Object.assign(databaseDrink, customDrinks)`, app.js:2377, e app.js:4752).
- **[R2] Le quantità liquide sono mostrate arrotondate a 0,5 L** (app.js:4385) ma il costo
  usa i **millilitri grezzi** (app.js:4431): "sottrai le scorte dalla quantità d'acquisto"
  è ambiguo finché non si dice su quale numero si calcola il prezzo.
- **[R2] L'identità delle ricette è il loro nome visibile**: i menù sono mappe con chiave
  il nome, risolto contro il `databaseDrink` globale. Una ricetta condivisa con lo stesso
  nome di una locale diversa la sovrascrive o viene usata al posto suo.
- **[R2] Chiavi di `localStorage` realmente usate**: `barmanProState_v7`, `bp_events`,
  `bp_recipes`, `bp_settings`, `bp_menu_style`, `bp_onboarded`.

---

## Approach

### FASE 0 — Fondamenta (nessun cambiamento visibile)

Nessuna schermata cambia. Si rilascia da sola perché per l'utente non succede niente.

1. **Modello di righe canonico**, estratto da `calcolaSpesa()`. `calcolaSpesa()` e
   `stimaBudget()` restano **involucri compatibili**: stessa firma, stessi totali. I golden
   continuano a girare su Playwright contro l'app vera.
   *Prova di non-regressione:* i 42 golden passano **senza aggiornare gli attesi**.
   **[R2] Contratto numerico esplicito**, perché oggi quantità mostrata e quantità usata per
   il prezzo sono due numeri diversi. Ogni riga porta:

   **[R3] Ogni quantità è nell'unità base della riga** (ml, g, pezzi): niente numeri in
   litri accanto a numeri in millilitri, che è esattamente l'errore in cui era caduta la
   rev. 2.

   | Campo | Significato |
   |---|---|
   | `id` | identità stabile della riga, non il nome visibile |
   | `baseUnit` | `ml` · `g` · `pezzi` — l'unità in cui vivono tutte le quantità |
   | `displayUnit` / `packSize` | come si mostra (L, bottiglie, kg) e il taglio confezione |
   | `requiredBaseQty` | fabbisogno grezzo dal calcolo |
   | `stockBaseQty` | scorte dichiarate, stessa unità base (Fase 3, default 0) |
   | `remainingBaseQty` | `max(0, requiredBaseQty − stockBaseQty)` |
   | `roundedPurchaseQty` | `remainingBaseQty` arrotondata al taglio d'acquisto |
   | `pricingQty` | `remainingBaseQty` |
   | `unitPrice` | prezzo unitario applicato, per unità base |

   **[R3] Formule bloccate, corrette dopo il Round 3.** La rev. 2 sottraeva le scorte dalla
   quantità **già arrotondata** e poi riscalava il fabbisogno grezzo: due operazioni
   incoerenti. Con 600 ml richiesti, 1 L arrotondato e 200 ml di scorte produceva 480 ml da
   pagare quando ne restano 400. L'ordine giusto è **sottrarre, poi arrotondare**:

   ```
   remainingBaseQty  = max(0, requiredBaseQty − stockBaseQty)
   roundedPurchaseQty = arrotonda(remainingBaseQty, tagliaAcquisto)
   pricingQty        = remainingBaseQty          // identico con e senza prezzo tuo
   costo             = pricingQty × unitPrice
   ```

   Con `stockBaseQty = 0` si ottiene `pricingQty = requiredBaseQty`, che è il comportamento
   attuale — **è ciò che rende i golden invarianti**. Il prezzo personalizzato cambia solo
   `unitPrice`, mai la quantità: è il **prezzo unitario finale locale** e sostituisce fascia
   e moltiplicatore geografico, che non vengono riapplicati.
   **[R3] Il contratto d'ingresso dei golden va preservato**: `tests/helpers.js:91` assegna
   direttamente le mappe globali con chiave il **nome** (`menuSerataDrink = {…}`). Passando
   i menù agli id serve un confine di compatibilità che accetti ancora i nomi — oppure
   `helpers.js` risolve nome→id **nella Fase 0**, lasciando ogni valore atteso invariato.
   Non basta preservare le firme delle funzioni.
2. **Un solo punto di verità per i totali mostrati** (Home, stima dal vivo, riepilogo
   guidato, risultati), con modalità **senza modificatori** (quella dei golden) e **con
   modificatori** (Fase 3). Senza questo, in Fase 3 la Home direbbe un totale e i risultati
   un altro.
3. **[R2] Identità delle ricette per id, non per nome.** Le ricette prendono un id stabile;
   i menù salvati fanno riferimento all'id. Un evento salvato porta con sé le definizioni
   delle ricette che cita, versionate: cancellare una ricetta non rende più inapribile un
   evento vecchio.
   **[R3] Gli archivi vecchi da migrare sono due, non uno**: nella bozza vivono sia
   `customDrinks` sia **`customShots`** (app.js:2343, 2375), mentre gli shot nuovi finiscono
   in `bpRecipes.amari` (app.js:2270). Entrambi confluiscono in `bp_recipes`, con precedenza
   dichiarata in caso di conflitto e assegnazione degli id deterministica. I campi vecchi si
   rimuovono **solo dopo** una migrazione verificata. Migrazione **idempotente**, con test su
   dati vecchi in conflitto.
4. **[R3][R4] Ogni archivio che cambia schema cambia chiave, non solo la bozza.** Il
   ragionamento della rev. 4 era giusto ma applicato a metà: bastava una scheda vecchia
   ancora aperta per riscrivere `bp_recipes` (app.js:2273), `bp_events` (app.js:3353) o le
   impostazioni (app.js:2409) e corrompere lo stato migrato agli id, nonostante la bozza
   fosse al sicuro su `v8`. Il bump della cache del service worker **non chiude i client già
   attivi**.

   | Vecchia chiave | Nuova | Ruolo della vecchia |
   |---|---|---|
   | `barmanProState_v7` | `barmanProState_v8` | sola lettura, sorgente di migrazione |
   | `bp_recipes` | `bp_recipes_v2` | sola lettura, sorgente di migrazione |
   | `bp_events` | `bp_events_v2` | sola lettura, sorgente di migrazione |
   | `bp_settings` | `bp_settings_v2` | sola lettura, sorgente di migrazione |

   Il codice vecchio continua a scrivere sulle chiavi vecchie e **non può più toccare le
   nuove**. Le vecchie non si cancellano subito: restano una release come rete.
   **[R4] Nessun canale permanente fra schede** resta necessario — la separazione delle
   chiavi fa il lavoro, come argomentato nel Round 3 e confermato nel Round 4.
5. **[R5] Gli scrittori nascono già compatibili con un marcatore che non producono ancora.**
   La rev. 5 metteva la guardia del marcatore di import in Fase 3, ma il rilascio a fasi
   **lascia vivi di proposito i client vecchi**: una scheda ferma alla Fase 1 non contiene
   codice introdotto in Fase 3 e scrive sulle stesse chiavi `v8`/`_v2`, quindi può calpestare
   un import a metà o cancellare campi che ancora non conosce. Perciò **già in Fase 0** ogni
   scrittore: (a) si sospende finché esiste il marcatore `bp_import_lock`; (b) quando il
   marcatore sparisce **scarta la propria fotografia in memoria e si riprende dallo storage
   prima di scrivere**, invece di riversare uno stato ormai vecchio; (c) fa scritture
   **additive**, senza cancellare campi che non riconosce. Il marcatore è **prenotato**
   adesso e usato dalla Fase 3: costa poche righe qui e rende impossibile un guasto che
   altrimenti si vedrebbe solo in produzione, su una scheda dimenticata aperta.
6. **[R4] Precedenza della migrazione, decisa adesso** invece di rimandata: vince
   `bp_recipes` con il suo nome; una ricetta vecchia con lo stesso nome ma contenuto diverso
   **si conserva** con nome suffissato e id nuovo (non si scarta mai il lavoro dell'utente);
   gli `customShots` che non hanno corrispondenza in `bpRecipes.amari` si aggiungono in
   unione. Migrazione **idempotente**, test con entrambi gli archivi popolati e in conflitto.
7. **[R4] Eventi vecchi con riferimenti a ricette cancellate.** Gli eventi salvati oggi
   citano i nomi e conservano una fotografia della lista: se la ricetta è stata cancellata
   in passato, la Fase 0 **non può inventarne la definizione** che ora promette di
   incorporare. Politica: si migrano i riferimenti risolvibili; gli eventi con riferimenti
   irrisolvibili si conservano come **fotografia leggibile**, si marcano *incompleti*, e la
   checklist continua a funzionare — ma **ricalcolo e modifica sono bloccati** finché
   l'utente non ricollega la ricetta mancante. Meglio dirlo che ricalcolare in silenzio un
   totale sbagliato.
8. **Un solo modello di impostazioni**: `bp_settings` caricato, validato, migrato e
   riscritto **per intero**.
9. **Le scritture su storage riportano l'esito.** Toast e conferme solo dopo una scrittura
   verificata. Copre la quota piena, oggi invisibile.
10. **Passo corrente persistito** + predicato esplicito "bozza sporca" (che considera anche
   le modifiche al solo setup). Bozze vecchie migrate a un default sicuro.
11. **Fine della traduzione posizionale**: ogni controllo con la sua chiave `data-i18n`; il
   blocco `abtn[0..3]` sparisce. **Va fatto prima** di toccare l'ordine dei bottoni.
12. **[R2] `cambiaLingua()` impara `aria-label`**: si aggiunge la gestione runtime di
   `[data-i18n-aria]`, che oggi manca (il controllo statico la conosce già). Un test che
   cambia lingua e **osserva l'attributo**, non la chiave.
13. **Bump di `CACHE_VERSION` e `ASSET_CACHE`** in `sw.js`. **[R1] Vale per ogni fase**:
    JS e CSS sono cache-first.

### FASE 1 — Navigazione (rilasciabile)

14. **Barra unica a quattro voci: Home · Evento · Salvati · Altro.**
    - Componente **nuovo**, nome nuovo (`#bp-tabbar`): **[R1]** `.bp-nav` è occupato dal
      vecchio menu modale, che viene **eliminato** con `bpToggleNav()` e il burger nello
      stesso commit.
    - Markup statico in `index.html`. `<900px`: fissa in basso, 56px +
      `env(safe-area-inset-bottom)`. `≥900px`: colonna a sinistra (240px), contenuto in
      colonna `max-width: 900px`.
    - **[R3] Il meta viewport guadagna `viewport-fit=cover`** (index.html:18 oggi è solo
      `width=device-width, initial-scale=1.0`). Senza, `env(safe-area-inset-bottom)` vale
      **0** e la barra finisce sotto la barretta home dell'iPhone: la regola scritta sopra
      si appoggerebbe a un valore che non esiste.
    - **[R1] Scala di z-index dichiarata** (oggi convivono 1400, 9000 e 100000 senza
      ordine), padding del contenuto pari all'altezza della barra, offset di 240px in
      sidebar.
    - **[R3][R4] Politica della tastiera virtuale, con soglia e ricaduta**: la barra si
      nasconde quando `visualViewport.height` scende sotto l'**85%** di
      `window.innerHeight` (soglia da tarare su dispositivo reale), così non copre il campo
      attivo né si stacca a metà schermo; si ripristina alla chiusura. Dove
      `visualViewport` non esiste, la barra resta visibile: peggio nascondere una
      navigazione per un falso positivo che lasciarla dov'è.
    - Stato attivo: `aria-current="page"` **e** un segnale non cromatico. Target ≥44×44 px.
15. **[R1] Un guscio unico del contenuto** con le quattro sezioni e **un router di sezione**.
    Le sezioni-tab non toccano mai `document.body.style.overflow`.
    **[R3] I modali non sono un contatore ma una pila** di voci `{dialogo, aprente}`: un
    numero non sa dire qual è il modale in cima, chi lo ha aperto, quale superficie diventa
    `inert` né dove torna il focus alla chiusura. Con i modali annidati (dal menù si apre il
    dialogo di stampa) il contatore darebbe la risposta sbagliata.
16. **[R3] "Altro" ha un albero di rotte dichiarato**, non tre overlay riciclati dietro una
    voce. Landing con le voci (Ricette · Amari · Impostazioni · Menù da esporre · Privacy ·
    Licenza · GitHub), ciascuna una **sottorotta**; il tasto Indietro del browser risale di
    un livello e dalla landing esce dalla sezione; entrando da una scorciatoia
    programmatica si atterra sulla sottorotta giusta con il focus sul suo titolo; toccare la
    voce "Altro" mentre ci sei già riporta alla landing. Tabella delle transizioni scritta
    prima di implementare.
17. **[R2][R3] `body.bp-home` smette di essere una seconda autorità sulla visibilità.**
    Oggi `vaiAStep()` la toglie, `bpGoHome()` la mette, e il CSS ci nasconde i pannelli
    (app.css:1927). **La rev. 3 lo metteva in Fase 0, che è sbagliato**: togliere l'unico
    controllore prima che esista il router lascerebbe la Fase 0 visibilmente rotta. Va qui,
    nello stesso commit del router, che diventa l'unica fonte; la classe resta al più come
    stile non-autoritativo.
18. **[R1] Le sezioni promosse perdono la semantica di dialogo** (`bp-events`,
    `bp-library`, `bp-settings` escono da `.bpc-overlay` e da `aria-modal`).
    **[R2] Inventario completo dei modali rimasti**, tutti sotto lo stesso gestore:
    `bp-welcome`, `bp-config`, **`#bp-menu`** (che ha `role="dialog"` ma classe diversa),
    **`#suggeritore-modal`** (che oggi non ha alcuna semantica) e il nuovo dialogo di
    stampa. Per ciascuno: focus all'apertura, trappola del focus, sfondo `inert`, Escape,
    focus restituito, blocco annidato coerente.
19. **Home = cruscotto.** Nome evento, ospiti, drink a testa, costo stimato e a persona
    (dall'involucro della Fase 0), passo raggiunto, "Riprendi da <passo>", ultimi salvati.
    Stato vuoto con "Crea nuovo evento".
20. **"Evento" contiene il flusso** e **mantiene lo stepper**: la barra dice *in che
    sezione* sei, lo stepper *a che punto* sei.
21. **[R1] Le 8 azioni della schermata risultati, inventariate.** Restano 4: **Condividi**,
    **Stampa**, **Salva evento**, **Modifica menu**. Escono 4: *Copia testo*, *Nuovo
    evento*, *Crea menù da esporre* (va in Altro), *Apri i miei eventi salvati*.
    **[R2] Esce il bottone, non la funzione**: `copiaListaTesto()` resta come ricaduta di
    `condividiLista()` quando Web Share manca. Condividi emette **testo leggibile**; il
    link condivisibile della Fase 3 sarà un'azione distinta, non un cambio silenzioso di
    ciò che Condividi produce.
    *Apri i miei eventi salvati* ricompare come **conferma transitoria dopo un salvataggio
    verificato**: "Evento salvato — Apri i miei eventi". Mai prima.
22. **[R1] I test che si romperanno vengono riscritti nella stessa fase**: `ui-css` pretende
    `#bp-burger` fisso; `ui-smoke` e `ui-csp` lo cliccano e si aspettano `#bp-events.show`.
23. **[R1] Il riordino dei breakpoint esce dalla Fase 1**: spostare comportamenti da 560 a
    600 px *è* un cambiamento visivo.

### FASE 2 — Stampa (rilasciabile)

24. **Allowlist mirata, non consolidamento.** **[R1]** Si sostituisce **il solo blocco
    largo** (app.css:1297). Gli altri restano: servono privacy e pagine SEO.
25. **[R2] Una macchina a stati sola, con contratto esplicito**, condivisa da lista e menù —
    il difetto di smontaggio esiste **già** per `bp-printing-menu`, che si affida al solo
    `afterprint`:
    - `beginPrint(target)` **prima azzera ogni bersaglio**, poi ne imposta esattamente uno,
      **in modo sincrono prima di `window.print()`**;
    - si ricalcola su **`beforeprint`**, così anche Ctrl+P (che non passa dai nostri
      bottoni) trova lo stato giusto;
    - si azzera su `afterprint`, all'uscita dal media di stampa, al ritorno di
      focus/visibilità, **alla chiusura della vista o del dialogo** e sui percorsi d'errore;
    - **[R1] mai con un timer cieco**: su mobile l'anteprima non è bloccante.
    - **[R1] Correzione a un rischio scritto male nella rev. 1**: una classe rimasta
      attaccata **non** rende l'app invisibile — il selettore vive dentro `@media print`.
      Avvelena le stampe successive.
26. **[R1] `#print-sheet` è figlio diretto di `<body>`**, requisito esplicito perché
    l'allowlist funzioni.
27. **Il foglio si compone dalle righe canoniche** (Fase 0). Dalla stessa fonte escono
    testo condiviso, checklist e foglio: una proiezione, quattro resi.
28. **Due formati, scelta prima di stampare**, in un `<dialog>` nativo, ultima scelta
    ricordata: **lista da spuntare** (default: caselle, quantità grande a sinistra,
    raggruppata per reparto, costo piccolo in fondo) e **preventivo** (prezzo unitario,
    totale per riga, totale, spazio note). `break-inside: avoid` per gruppo, unità in `mm`.
29. **[R3] Tabella di precedenza del bersaglio**, perché Ctrl+P non passa dai nostri
    bottoni e oggi non saprebbe cosa stampare: se il menù da esporre è aperto → menù; se la
    lista è generata e sei in "Evento" → lista; altrimenti → **nessun bersaglio**, e si
    stampa la pagina normale invece di un foglio vuoto o vecchio.
30. **[R2] Test**: asserzioni di visibilità in `emulateMedia({ media: 'print' })` su app,
    menù, privacy e una pagina SEO, **più** test del ciclo di vita con `window.print`
    sostituito da uno stub (`beginPrint` → `beforeprint` → `afterprint` → bersaglio
    azzerato), che `emulateMedia` da solo non dimostra.
    **[R3] E soprattutto il percorso in cui `afterprint` non arriva mai** — che è il motivo
    per cui esiste la macchina a stati, e che la rev. 3 descriveva a parole senza provarlo:
    test separati che innescano uscita dal media di stampa, ritorno del focus, cambio di
    visibilità, chiusura di rotta o dialogo, e percorso d'errore, verificando ogni volta che
    si azzerino bersaglio, `inert` e blocchi dello scroll. Nessuna baseline binaria.
    Impaginazione, contrasto e **stampa-e-annulla su iOS Safari reale** restano una
    verifica manuale, dichiarata come **condizione di rilascio** della fase.
31. **Menù da esporre**: i 4 stili ridisegnati sulla palette attuale — il difetto
    riportato è *"i colori non vanno bene, spesso non si legge bene la lista"*.
    **[R4] Soglia dichiarata**: ogni accoppiata testo/fondo, a schermo e in stampa, ad
    almeno **4,5:1**; i nomi dei drink, che sono il contenuto, ad almeno **7:1**. Resa di
    stampa sistemata insieme all'altra.

### FASE 3 — Tre funzionalità + export/import (rilasciabile)

32. **"Ce l'ho già" — scala le scorte.** Sulle righe canoniche, con le formule bloccate al
    punto 1. Le righe senza quantità (guarnizioni) non accettano scorte. Stato **per
    evento**, definito su tutto il ciclo di vita: bozza, salva, modifica, duplica, azzera,
    importa.
    **[R2] Duplicazione, deciso** (era aperto): duplicare un evento **azzera scorte e
    spunte**. Una copia è una spesa nuova; scorte e spunte descrivono un acquisto già
    avvenuto e portarsele dietro mentirebbe. Detto nell'interfaccia al momento della copia.
33. **Prezzi tuoi, per singola voce.** Override **per id di riga**, con unità e valuta,
    definiti come **prezzo unitario finale locale** (punto 1). Salvati nel modello di
    impostazioni, ritorno al prezzo stimato in un tocco.
34. **[R1] I golden restano invariati**: i campi "ho già" e "prezzo tuo" **non entrano**
    nelle righe fotografate da `helpers.js`, ma in un livello separato dell'interfaccia.
35. **[R1] Nessuna corsa fra input e output**: il ricalcolo differito (rAF) viene forzato a
    completare prima di salvare, condividere o stampare — o quegli output si generano dal
    modello canonico senza passare dal DOM.
36. **Link condivisibile**, nel **fragment** (`#e=…`), con contratto scritto:
    - **[R2] Nessuna compressione.** Il formato è `v1.` + JSON minimale in UTF-8 →
      base64url, senza dipendenze e senza codec da nominare. **Primo passo: misurare** la
      lunghezza reale su un evento grande. Se sfora il budget di URL fissato, si passa alla
      ricaduta **file** (esporta/importa, punto 31) invece di introdurre una libreria di
      compressione.
    - **[R3] limiti numerici, non aggettivi**: la misura del punto precedente fissa i
      valori (lunghezza codificata, numero di elementi, lunghezza delle stringhe,
      profondità), che diventano **criteri di rilascio** scritti nel codice, non
      "ragionevoli". La validazione è **iterativa, non ricorsiva**: un annidamento ostile
      manderebbe in overflow proprio il controllo che deve difendere. Test su
      limite-più-uno, UTF-8 non valido, annidamento oltre soglia e ricaduta sul file;
    - decodifica in oggetti **senza prototipo**, validazione campo per campo (enum,
      intervalli, chiavi — `__proto__` compreso);
    - **[R2] include le definizioni delle ricette citate**, per id e versionate, senza
      toccare la libreria di chi riceve (risolutore **a scope evento**, che rinomina i
      conflitti invece di sovrascrivere);
    - **[R1] mai applicato in automatico**: anteprima validata, "apri come copia", bozza
      corrente intatta, id nuovi, fragment rimosso con `history.replaceState`;
    - **[R2] letto e rimosso nel primo bootstrap same-origin**, prima di qualunque script
      opzionale di terze parti: `analytics.js` ha una costante `TOKEN` oggi vuota, ma se un
      giorno viene riempita non deve mai vedere l'URL completo. Test che lo dimostra.
    - detto in interfaccia: un link è **dato in chiaro**, resta nella cronologia e in mano
      a chi lo riceve.
37. **Esporta / importa tutto, come file.** **[R2] Manifest per chiave, esplicito:**

    | Chiave | Esportata | Politica in unione |
    |---|---|---|
    | `bp_events_v2` | sì | id rimappati con `crypto.randomUUID()`, mai sovrascrittura |
    | `bp_recipes_v2` | sì | conflitto di nome → rinomina con suffisso, mai sostituzione |
    | `bp_settings_v2` | sì | solo in modalità *sostituisci*; in *unione* restano le tue |
    | `bp_menu_style` | sì | come `bp_settings_v2` (non cambia schema, non cambia chiave) |
    | `barmanProState_v8` (bozza) | sì | solo in *sostituisci*; in *unione* la bozza corrente resta |
    | `bp_onboarded` | **no** | è uno stato di questo dispositivo, non un dato tuo |
    | chiavi `v7` / senza suffisso | **no** | **[R4]** solo sorgenti di migrazione: esportarle rimetterebbe in circolo dati morti |

    **[R4] La rev. 4 esportava ancora `barmanProState_v7`**: dopo il cambio di chiave della
    Fase 0 i backup avrebbero salvato la bozza morta invece di quella viva, e un import in
    *sostituisci* avrebbe riportato indietro dati vecchi. Corretto qui.

    - versione **intera** con catena di migrazioni; versioni mancanti, corrotte o più
      recenti del codice → **rifiuto con messaggio**, mai interpretazione a caso;
    - **[R2] limiti prima di leggere**: si rifiuta per `File.size` **prima** di caricare il
      file in memoria, poi si applicano gli stessi tetti del fragment;
    - **[R2] import a due fasi con marcatore di commit**, **[R3] con il protocollo scritto
      per intero** — la rev. 3 diceva "completato o annullato", ma dopo che la prima chiave
      viva è stata toccata annullare non è più possibile senza copie dei valori vecchi:
      1. **[R4] uno spazio di staging per transazione** (`bp_import_<id>/…`), non un
         prefisso unico: un crash **prima** del marcatore lascerebbe altrimenti valori
         orfani senza alcun percorso di recupero, cioè una perdita di quota invisibile.
         All'avvio si cancella ogni transazione di staging priva di marcatore valido;
      2. si scrive tutto nello spazio di staging, poi **[R4] si prenota davvero lo spazio**
         invece di stimarlo: una scrittura di prova grande quanto il marcatore più il
         peggior sovrappiù transitorio (durante lo scambio, il valore vecchio e il nuovo
         coesistono). Se la prenotazione fallisce si annulla e si ripulisce lo staging;
         una stima approssimativa dello spazio libero non garantisce che il completamento
         dopo il marcatore riesca;
      3. si scrive il marcatore di commit con l'elenco delle chiavi da scambiare, e si
         libera la prenotazione durante lo scambio;
      4. **dopo il marcatore si può solo completare**, mai tornare indietro: lo scambio è
         idempotente e ogni valore di staging si cancella **solo dopo** che la scrittura
         viva corrispondente è stata riletta e confrontata;
      5. il **recupero gira all'avvio prima di qualunque idratazione o autosave**,
         altrimenti l'app si popola da uno stato misto e poi lo salva.
      Salvataggi e ricalcoli in attesa vengono annullati prima di iniziare.
      **[R4] E non basta annullarli nella scheda che importa**: ogni scrittore controlla il
      marcatore di import e **si sospende** finché esiste — **[R5] guardia già presente dalla
      Fase 0**, così anche una scheda ferma a una fase precedente la rispetta,
      altrimenti un'altra scheda scrive una chiave viva a metà scambio. L'evento `storage`
      del browser, che già esiste e non è un canale da mantenere, serve ad avvisare
      l'utente nell'altra scheda;
    - **[R1] `bpEventsList()` smette di interpolare stringhe**: interfaccia dei dati
      importati costruita con API del DOM e proprietà testuali;
    - **[R3] matrice dei conflitti con gli id**, non solo con i nomi: stesso id e contenuto
      identico → si ignora; stesso id e contenuto diverso → l'importato prende un id nuovo;
      nome uguale e id diverso → rinomina con suffisso. Si costruisce **una sola tabella di
      rimappatura** e la si applica a **ogni** riferimento (eventi, menù, scorte, spunte,
      prezzi), poi si verifica l'integrità referenziale: nessun menù deve puntare a un id
      inesistente;
    - **[R3] due test diversi, non uno**: *round-trip identico* vale solo in modalità
      **sostituisci**; in **unione** id e nomi cambiano di proposito, quindi lì si verificano
      **invarianti** (numero di eventi, integrità dei riferimenti, nessuna perdita di
      contenuto) — pretendere l'uguaglianza sarebbe un test che non può passare.
    - **[R3] La provenienza della modifica va persistita.** `bpEditingId` vive solo in
      memoria (app.js:3350): ricaricando dopo "Modifica", il salvataggio successivo crea un
      **duplicato** invece di aggiornare. È un difetto già presente oggi, e l'import lo
      peggiorerebbe. Va persistito e validato.
    - **[R4] Lo slot di recupero ha una politica**: ne esiste **uno solo**; una seconda
      bozza spostata chiede conferma prima di sostituire quella parcheggiata, e lo slot si
      svuota quando l'utente la riprende o la scarta esplicitamente — mai da solo, mai a
      tempo.
    - **[R3] La bozza spostata ha un posto dove andare.** "La bozza corrente resta intatta"
      non regge finché la bozza è una sola chiave: aprire una copia condivisa e lasciar
      partire l'autosave la sovrascriverebbe. Serve uno **slot di recupero separato** dove
      parcheggiare la bozza spostata, con un modo per riprenderla. Le copie condivise
      **azzerano scorte e spunte** come la duplicazione, per la stessa ragione.
38. Ogni stringa nuova × 7 lingue.

### FASE 4 — Canva: **cancello, non piano** **[R2]**

Questa fase **non è pianificata**, ed è un errore trattarla come tale finché non si sa se la
cosa è possibile. Qui c'è solo il cancello e cosa deve produrre.

39. **Prova usa-e-getta, fuori dal repo**, che stabilisca **quale flusso Canva produce un
    design davvero modificabile** dal nostro menù, e con quali requisiti di account.
    L'autofill richiede Canva Enterprise; creare un design da un asset produce un design
    **immagine**; le integrazioni pubbliche richiedono revisione. Se nessuna strada dà un
    risultato modificabile, **la funzione si ridiscute invece di consegnarla a metà**.
40. **Solo dopo, un secondo piano bloccato** che copra: entry point del Worker
    (`wrangler.jsonc` oggi non ha `main`) e dispatch `/api/*` con `run_worker_first`;
    contratto metodo/percorso/richiesta/risposta completo (avvio, callback, creazione,
    attesa del lavoro asincrono, redirect finale); **dove vivono** `code_verifier`, payload
    del menù e token attraverso il redirect — **[R2] un cookie cifrato non è
    automaticamente praticabile**, i token Canva possono arrivare a 4 KB; TTL, controlli
    CSRF/Origin, tetti di payload e limiti di frequenza.
41. **OAuth 2.0 Authorization Code + PKCE (SHA-256)**: lo scambio del token è autenticato in
    Basic con `client_id:client_secret` e **non può partire dal browser** (CORS). Segreto
    via `wrangler secret put`. `code_verifier` e `state` generati **lato server**, verificati
    una sola volta, query ripulita subito.
42. **[R1] Flusso a colpo singolo: autorizza → crea → scarta.** I refresh token sono monouso
    e ruotano. **[R2] "Scartare" non basta**: dimenticare un token lo lascia valido fino
    alla scadenza. Il refresh token **non si persiste mai**, e la sessione si chiude
    chiamando l'endpoint di **revoca** di Canva, sia dopo il successo sia dopo l'errore.
43. **[R1] Il service worker deve saltare `/api/`** prima di qualunque logica di cache.
44. **[R1] Il Worker non eredita `_headers`**: emette da sé `Cache-Control: no-store`,
    `Referrer-Policy: no-referrer`, intestazioni di sicurezza, redirect puliti, log redatti.
    Token fuori da JavaScript e da `localStorage`.
45. **[R2] Verifica del Worker**: la suite oggi avvia un `http-server` statico e non può
    esercitare `/api/*`. Servono test con risposte Canva simulate su bypass del SW, replay
    del callback, redazione dei log e percorsi di errore, più metriche di stadio prive di
    payload — `observability.enabled` da solo non dà diagnostica sicura.
46. **La CSP non va aperta verso Canva**: il browser parla solo con la nostra origine.
    **[R1] Vale finché** non si caricano miniature da Canva, non si incorpora nulla in
    iframe e non si chiama la loro API dal browser. **[R2]** `form-action 'none'` implica
    che l'avvio dell'autorizzazione **non può** essere l'invio di un form.
47. **[R1] Le promesse da riscrivere sono più di tre**: oltre a `README.md`, `PRODUCT.md` e
    `privacy.html`, anche `index.html` e i commenti in `_headers` dichiarano "nessun
    backend". Tutte, nello stesso commit, con avviso all'utente **prima** che i dati del
    menù lascino il dispositivo.

---

### Condizione di rilascio, uguale per ogni fase **[R3]**

Finora ogni fase nominava le proprie prove e nessuna diceva il minimo comune. Una fase è
rilasciabile solo se, tutte insieme:

- l'**intera** suite Playwright preesistente passa, non solo i test della fase;
- passano i test nuovi della fase;
- `npm run check` (parità i18n + nessun residuo commerciale) è verde;
- prova di funzionamento **offline** e del service worker dopo il bump di
  `CACHE_VERSION`/`ASSET_CACHE`, incluso l'aggiornamento da una versione precedente;
- **zero errori inattesi in console** al caricamento e nel percorso principale;
- verifica su un **telefono vero** per le fasi che toccano navigazione o stampa.

---

## Key decisions & tradeoffs

- **Fase 0 prima di tutto.** O si estrae il modello, o scorte, prezzi e foglio di stampa
  restano tre modi diversi di rileggere il DOM.
- **Quattro voci, non tre né cinque.** Cinque etichette non stanno leggibili a 320px in
  tedesco; tre lascerebbero la Home a fare da hub, cioè il problema di partenza.
- **Il flusso lineare vive dentro una voce sola.**
- **La Home diventa un cruscotto** per non essere un doppione di "Evento".
- **Sidebar a ≥900px, stesso markup.**
- **Allowlist mirata, non consolidamento dei 9 blocchi.**
- **[R2] Nessuna compressione nel link.** Una libreria in più per stare dentro un budget di
  URL che non abbiamo ancora misurato è ottimizzazione prima della misura. Se il JSON piano
  non ci sta, la risposta è il file, che esiste già.
- **[R2] Duplicare azzera scorte e spunte.** Descrivono un acquisto già fatto.
- **Canva a occhi aperti, ma solo dopo il cancello.** L'alternativa senza costi (esportare
  un file da caricare a mano) è stata proposta e scartata dall'utente dopo aver letto cosa
  cade.
- **Niente account, niente database per gli utenti.** Valutati e scartati: Supabase e
  codice di sincronizzazione su Cloudflare D1. La risposta scelta è **export/import più
  link**: copre backup e multi-dispositivo senza far uscire i dati, senza rendere l'autore
  titolare del trattamento, e senza legare gli eventi degli utenti alla sopravvivenza del
  progetto. La Fase 4 fa comunque uscire dati verso Canva su richiesta esplicita: quella
  promessa va **riscritta con precisione lì**.

### Rinviato in costruzione, con motivo

- **Identita' delle ricette per id e definizioni incorporate nell'evento**
  (parte del punto sulle ricette) e **politica per gli eventi con ricette
  irrisolvibili**: spostati all'inizio della **Fase 3**, dove vivono i loro
  consumatori (link condivisibile e import). Farli in Fase 0 significherebbe
  cambiare la forma degli eventi salvati **due volte** — una adesso senza che
  nessuno usi gli id, e una quando il consumatore arriva e ne scopre i
  requisiti veri — e portarsi quella superficie in piu' per tutta la
  riscrittura della navigazione. La parte di sicurezza dei dati e' stata fatta
  qui per intero: chiavi versionate, migrazione dei due archivi vecchi con
  precedenza dichiarata, e nessun dato buttato.
  Il rischio che il rinvio lasciava scoperto — `calcolaSpesa()` che
  dereferenziava `databaseDrink[nome]` **senza guardia** e andava in eccezione
  su una ricetta mancante — e' gia' chiuso: il modello canonico usa
  `(databaseDrink[nome] || [])`.

### Critiche respinte, con motivo

- **[R1] Baseline PDF/screenshot per la stampa.** Respinta: artefatti binari da rigenerare
  a ogni ritocco tipografico, in una suite oggi veloce e deterministica. Accolta la parte
  che coglie il difetto vero (visibilità in `media: 'print'`), **[R2]** integrata con i test
  del ciclo di vita che Codex ha giustamente indicato come mancanti. *Codex ha accettato la
  respinta nel Round 2.*
- **[R1] Matrice di test per ognuna delle 7 lingue.** Respinta: moltiplica la suite per un
  rischio che la parità delle chiavi già intercetta. **[R2] La mia contro-proposta era però
  sbagliata** — `check-i18n` riconosce già `data-i18n-aria`; il buco è a runtime. Corretto
  al punto 8. *Codex ha accettato la respinta e corretto la sostituzione.*
- **[R2] Envelope unico committato con un solo `setItem`, o journal durevole completo.**
  Respinta la riscrittura dell'intero schema di storage in un solo oggetto: cambierebbe
  ogni percorso di lettura e scrittura dell'app per proteggere un'operazione che l'utente
  avvia a mano e può **ripetere**, perché il file di origine è ancora lì. Accolta la metà
  economica — staging + marcatore di commit + recupero all'avvio (punto 31) — che copre il
  crash a metà scrittura senza toccare il resto.
- **[R2] Web Worker terminabile per il tempo di parsing dei file importati.** Respinta:
  aggiunge un file e un ciclo di vita per difendersi da un file che l'utente sceglie da sé
  sul proprio dispositivo. Accolto il rifiuto per `File.size` **prima** della lettura, che
  è il controllo che conta; il tetto sul *tempo* di parsing esce dai requisiti invece di
  essere finto. *Codex ha accettato la respinta nel Round 3.*
- **[R3] Lock fra schede e `BroadcastChannel` per coordinare la migrazione.** Respinta la
  parte pesante: è un'app locale, usata da una persona, e il caso "due schede aperte
  esattamente durante la migrazione" si risolve quasi tutto **cambiando chiave**
  (`barmanProState_v7` → `v8`, punto 4). Una scheda vecchia continua a scrivere su `v7` e
  **non può più sovrascrivere** lo stato nuovo; nel peggiore dei casi perde il proprio
  lavoro, che è già ciò che succede oggi con due schede aperte. Il canale fra schede e il
  reload forzato costerebbero un meccanismo permanente per un margine che non cambia
  l'esito.
- **[R3] Verifica degli hash dei valori di staging prima del commit.** Respinta: i valori
  sono stati scritti dalla stessa scheda un istante prima e rientrano subito dopo dalla
  stessa API; un hash proteggerebbe da una corruzione che non ha un percorso plausibile.
  Accolto invece il **controllo di spazio disponibile** prima del commit, che difende da un
  guasto reale e osservabile — la quota esaurita mentre staging e valori vivi coesistono.

---

## Risks / open questions

- **L'estrazione del modello canonico è la parte più delicata del piano.** Il paracadute:
  i 42 golden devono passare **senza toccare gli attesi**.
- **[R2][R4] La migrazione tocca dati reali degli utenti, e gli archivi coinvolti sono
  quattro**: `customDrinks` e `customShots` dentro la bozza, più `bp_recipes` e `bp_events`
  che cambiano schema. Serve un test con tutti popolati e in conflitto; la migrazione
  dev'essere idempotente, e gli eventi con ricette irrisolvibili devono restare leggibili
  invece di sparire.
- **La lunghezza del link condivisibile non è nota.** È il primo passo del punto 30, non la
  verifica finale.
- **Quale flusso Canva produce un design modificabile** non è accertato: è un cancello.
- **`app.css` è la fusione di 9 blocchi in cui l'ordine è comportamento.** Ogni intervento
  sulle regole di stampa va verificato a schermo.
- **La navigazione va provata su un telefono vero** prima della Fase 3.
- **Migrazione dello stato salvato**: eventi già in `localStorage` devono continuare ad
  aprirsi. Campi nuovi additivi con default, test che carica uno stato vecchio.

---

## Out of scope

- **Checklist disponibile senza salvare l'evento**: proposta, non selezionata.
- **Account utente, login, database lato server** (Supabase o Cloudflare D1) e la variante
  con codice di sincronizzazione: valutati e scartati.
- Qualsiasi modifica al **modello di costo** e al database delle 137 ricette.
- Riscrittura di `app.js` in moduli ES.
- **Riordino dei breakpoint**: intervento a sé, con verifica visiva.
- Le 4 pagine SEO, se non per le regole di stampa.
- Nuove lingue oltre alle 7 esistenti.
- Il dominio `barmanpro.app` e le questioni SEO chiuse nella sessione precedente.
