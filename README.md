# Barman PRO

Quante bottiglie servono per una festa da 80 persone? E quanto ghiaccio? E
quanto viene a costare?

Barman PRO risponde. Dici quanti ospiti hai, quanto si beve e cosa vuoi
servire; ottieni la lista della spesa con quantità e costi — alcolici,
analcolici, ghiaccio, bicchieri — pronta da stampare, condividere o spuntare
al supermercato.

**[Apri l'app →](https://barmanpro.raccasamuele.it/)**

Gratuito, senza account, senza pubblicità. Funziona offline.

---

## Cosa fa

- **Calcolo delle quantità** su 136 ricette, con le proporzioni ricalibrate
  per il servizio ad alto volume, non per il singolo drink al banco.
- **Percentuale di bevitori:** chi non beve alcolici viene contato per i
  mocktail, non ignorato.
- **Costo stimato** per fascia di prezzo e paese, con il costo a persona.
- **Configuratore guidato** per chi non sa da dove partire: tipo di evento,
  durata, quanto si beve, e il menu si compone da solo.
- **Eventi salvati** con checklist della spesa da spuntare mentre compri.
- **Menu da esporre** per gli ospiti, in quattro stili, stampabile.
- **Sette lingue:** italiano, inglese, spagnolo, francese, tedesco,
  portoghese, olandese.
- **Installabile** come app e utilizzabile senza connessione.

## Come funziona, tecnicamente

Niente account, niente backend, niente database. È una pagina web statica:
HTML, CSS e JavaScript, senza framework e senza librerie a runtime.

Tutto quello che salvi resta nel `localStorage` del tuo dispositivo. Non
esiste un server che possa vedere i tuoi eventi, perché non esiste un
server: i file sono serviti staticamente da Cloudflare e basta.

```
public/           l'intero sito: è la sola cartella pubblicata
  index.html      markup
  app.css         design system e stili
  app.js          logica, calcolo, traduzioni
  sw.js           service worker (funzionamento offline)
tests/            Playwright: golden del calcolo, UI, CSP, PWA
scripts/          controlli su traduzioni e residui
```

## Farlo girare in locale

```bash
npm install
npm run serve      # http://127.0.0.1:8099
```

Per i test serve anche il browser di Playwright:

```bash
npx playwright install chromium
npm test
```

## Contribuire

Le segnalazioni e le proposte sono benvenute nelle
[issue](https://github.com/raccasamuele/barman-pro/issues). Prima di aprire
una pull request leggi la [guida per contribuire](CONTRIBUTING.md): spiega
come far girare i test e l'unica regola davvero seria, cioè che **il motore
di calcolo non si tocca senza far girare i test golden.**

Chi partecipa al progetto è tenuto a rispettare il
[codice di condotta](CODE_OF_CONDUCT.md).

## Sicurezza

Hai trovato una vulnerabilità? Non aprire una issue pubblica: scrivi a
[security@raccasamuele.it](mailto:security@raccasamuele.it) o usa la
segnalazione privata di GitHub. I dettagli sono in [SECURITY.md](SECURITY.md).

## Statistiche di visita

Sono spente. `public/analytics.js` contiene una costante `TOKEN` vuota:
finché resta vuota, **nessuna richiesta parte verso terzi**.

Per accenderle serve un token di Cloudflare Web Analytics legato
all'hostname su cui il sito gira davvero (Analytics & Logs → Web Analytics
→ Add a site). Il token va incollato in quell'unica costante.

Il token è legato all'hostname: usarne uno di un altro sito non produce
errori visibili, semplicemente Cloudflare scarta i dati. Chi forka il
progetto dovrebbe mettere il proprio, o lasciare vuoto.

## Licenza

Codice: **MIT** (vedi [LICENSE](LICENSE)).

I font Poppins (interfaccia) e Manrope (colonne numeriche e presentazione)
sono self-hostati e distribuiti sotto SIL Open Font License; il database
delle ricette è un adattamento delle ricette IBA: i dettagli sono in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).


---

© 2026 Samuele Racca
