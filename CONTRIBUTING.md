# Contribuire a Barman PRO

Grazie per l'interesse! Segnalazioni, proposte e pull request sono benvenute.
Partecipando al progetto accetti il [codice di condotta](CODE_OF_CONDUCT.md).

## Prima di iniziare

- **Bug e proposte:** apri una
  [issue](https://github.com/raccasamuele/barman-pro/issues/new/choose)
  scegliendo il modello adatto. Cerca prima se esiste già.
- **Problemi di sicurezza:** non aprire una issue pubblica, segui
  [SECURITY.md](SECURITY.md).
- **Modifiche importanti** (nuove funzioni, cambi al motore di calcolo o al
  design): apri prima una issue per parlarne, così non lavori su qualcosa che
  poi non può entrare.

## Ambiente di sviluppo

Serve Node.js **22.12** o successivo.

```bash
npm install
npm run serve      # http://127.0.0.1:8099
```

Per i test serve anche il browser di Playwright:

```bash
npx playwright install chromium
npm test
```

Il sito è statico: tutto ciò che viene pubblicato sta in `public/`, senza
framework e senza librerie a runtime. Mantieni questa scelta: niente
dipendenze esterne caricate dal browser, niente CDN, font self-hostati.

## La regola sul motore di calcolo

**Il motore di calcolo non si tocca senza far girare i test golden.**

`calcolaSpesa` e `stimaBudget` sono due implementazioni dello stesso modello
di costo e devono restare d'accordo; i test in `tests/golden-calc.spec.js`
confrontano entrambe su venti scenari e congelano il database delle ricette.
Se cambi una formula o un prezzo di riferimento, il golden va rigenerato di
proposito e la ragione va spiegata nella pull request:

```bash
UPDATE_GOLDEN=1 npx playwright test --project=golden
```

Se cambia da solo, è una regressione.

## Traduzioni

L'app è in sette lingue: italiano, inglese, spagnolo, francese, tedesco,
portoghese e olandese. Le chiavi vivono in `public/app.js`, ripartite su più
oggetti che vengono uniti a `translations`. Non aggiungerle a mano seguendo
un elenco: `scripts/check-i18n.mjs` li enumera da solo e segnala le chiavi
mancanti in ognuna delle lingue. Ogni nuovo testo visibile va tradotto in
tutte e sette.

## Prima di aprire una pull request

```bash
npm test              # golden, UI, CSP, PWA
npm run check         # traduzioni e residui
```

La CI esegue gli stessi controlli (`check:i18n` e `check:forbidden` in
modalità `--strict`): una pull request con la CI rossa non viene unita.

Inoltre:

- tieni ogni pull request su un solo argomento;
- aggiungi o aggiorna i test quando cambi un comportamento;
- se tocchi `public/sw.js` o i file in precache, verifica che il progetto
  `pwa` passi;
- scrivi i messaggi di commit in italiano, al presente, descrivendo cosa
  cambia per chi usa l'app.

## Licenza dei contributi

Il codice è rilasciato sotto [licenza MIT](LICENSE). Inviando un contributo
accetti che venga distribuito con la stessa licenza.
