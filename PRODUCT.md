# PRODUCT.md — Barman PRO

register: product

## Cos'è

Un calcolatore per feste ed eventi. Dici quanti ospiti hai, quanto si beve e cosa vuoi
servire; ottieni la lista della spesa con quantità e costi: bottiglie, analcolici,
ghiaccio, bicchieri. Poi la stampi, la condividi o la spunti al supermercato.

Gratuito, open source (MIT), senza account e senza backend. Funziona offline come PWA.
Tutto vive nel `localStorage` del dispositivo.

## Utenti

Non professionisti del bar. Persone che organizzano **una** festa e non sanno quante
bottiglie servano: matrimoni, compleanni, lauree, feste di paese, aperitivi in ufficio.
Usano l'app due o tre volte in tutta la vita, poi sparisce.

Ne discende quasi tutto:

- **Zero apprendimento ammesso.** Nessuno investe tempo per imparare uno strumento che
  userà una volta. Se serve una spiegazione, il design ha fallito.
- **Il momento d'uso è diviso in due.** Prima a casa, seduti, mentre si progetta la
  serata. Poi in piedi al supermercato, con una mano sola e il carrello nell'altra.
- **Il vero deliverable non è la schermata: è la lista.** Stampata, condivisa, spuntata.
  L'interfaccia esiste per produrla e poi togliersi di mezzo.

## Scena fisica (decide il tema)

Una persona in piedi nella corsia del supermercato, sabato pomeriggio, sotto i neon,
telefono in una mano, che spunta bottiglie da una lista.

Luce ambientale alta, schermo al massimo, lettura di sfuggita. **Chiaro**, non scuro. E
poiché quella stessa lista finisce spesso su carta, schermo e foglio devono somigliarsi:
un tema scuro obbligherebbe il CSS di stampa a smontare mezza interfaccia per non
sprecare inchiostro, che è esattamente quello che faceva prima.

## Tono

Concreto e sobrio. L'app dà numeri su cui qualcuno spenderà soldi veri: deve sembrare
affidabile, non entusiasta. Niente punti esclamativi, niente complimenti all'utente,
niente "fantastico!". Un buon modello è l'etichetta di un prodotto ben fatto: dice cosa
c'è dentro e in che quantità.

## Anti-riferimenti

Cosa NON deve sembrare, con il motivo:

- **Il vecchio Barman PRO.** Nero, oro, Cinzel, calice gigante in filigrana, particelle
  dorate, card in vetro. Quel vestito serviva a giustificare un prezzo di 14,90 €. Ora
  che l'app è gratuita è solo attrito: un calcolatore di liste della spesa travestito da
  cocktail bar di lusso.
- **Lusso, "premium", "esclusivo".** Oro, nero, serif altisonanti, ornamenti ✦.
- **SaaS generico.** Card tutte uguali con icona-titolo-testo, gradienti viola, numeroni
  con etichetta piccola, dashboard che non è una dashboard.
- **App da chef televisivo.** Foto di cocktail a tutto schermo, atmosfera, mood.

## Principi

1. **La lista vince su tutto.** Ogni scelta che rende la lista più leggibile, stampabile
   o spuntabile batte qualunque scelta che renda l'app più bella.
2. **Schermo e carta convergono.** Il CSS di stampa non deve combattere l'interfaccia.
3. **Familiarità guadagnata.** Controlli standard, comportamenti prevedibili. Non è il
   posto per inventare affordance.
4. **Il colore significa qualcosa.** L'accento marca azione, selezione e stato. Mai
   decorazione.
5. **Leggibile con una mano, in piedi, sotto i neon.** Bersagli grandi, contrasto pieno,
   niente testo grigio chiaro su fondo chiaro.
6. **Sette lingue.** Ogni etichetta può diventare il 40% più lunga in tedesco. Nessun
   layout può dipendere dalla lunghezza di una parola.
