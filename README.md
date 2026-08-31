# Barman PRO

Quante bottiglie servono per una festa da 80 persone? E quanto ghiaccio? E
quanto viene a costare?

Barman PRO risponde. Dici quanti ospiti hai, quanto si beve e cosa vuoi
servire; ottieni la lista della spesa con quantità e costi — alcolici,
analcolici, ghiaccio, bicchieri — pronta da stampare, condividere o spuntare
al supermercato.

**[Apri l'app →](https://barman-pro.raccasamuele2004.workers.dev/)**

Gratuito, senza account, senza pubblicità. Funziona offline.

---

## Cosa fa

- **Calcolo delle quantità** su 137 ricette, con le proporzioni ricalibrate
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
[issue](https://github.com/raccasamuele/barman-pro/issues).

Una sola regola, ed è seria: **il motore di calcolo non si tocca senza far
girare i test golden.** `calcolaSpesa` e `stimaBudget` sono due
implementazioni dello stesso modello di costo e devono restare d'accordo; i
test in `tests/golden-calc.spec.js` confrontano entrambe su venti scenari e
congelano il database delle ricette. Se cambi una formula o un prezzo di
riferimento, il golden va rigenerato di proposito:

```bash
UPDATE_GOLDEN=1 npx playwright test --project=golden
```

Se cambia da solo, è una regressione.

Prima di aprire una pull request:

```bash
npm test              # golden, UI, CSP, PWA
npm run check         # traduzioni e residui
```

**Traduzioni:** le chiavi vivono in `app.js` e sono ripartite su quindici
oggetti che vengono uniti a `translations`. Non aggiungerle a mano seguendo
un elenco: `scripts/check-i18n.mjs` li enumera da solo e segnala le chiavi
mancanti in ognuna delle sette lingue.

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

Il font Manrope è distribuito sotto SIL Open Font License, e il database
delle ricette è un adattamento delle ricette IBA: i dettagli sono in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

Il ricettario PDF che accompagnava la versione a pagamento **non fa parte**
di questo repository.

## Storia

Barman PRO è stato un prodotto a pagamento. Ha avuto un cliente. Da agosto
2026 è gratuito e open source: il codice è più utile a qualcuno così che
chiuso in un archivio.

---

© 2026 Samuele Racca
