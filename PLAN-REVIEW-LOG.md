# Plan Review Log: ridisegno interfaccia Barman PRO

Act 1 (grill) complete — plan locked with the user. MAX_ROUNDS=5.

**Reviewer model:** `gpt-5.6-sol` (da `~/.codex/config.toml`), `model_reasoning_effort`
alzato a `xhigh` per questa sessione su richiesta dell'utente — codex-cli 0.144.0.

## Act 1 — le otto decisioni uscite dal grill

1. Barra di navigazione a quattro voci: Home · Evento · Salvati · Altro. Scartate 3 voci
   (la Home resterebbe un hub per quattro cose), 5 voci (le etichette non stanno a 320px in
   tedesco) e l'eliminazione della Home.
2. La Home diventa un cruscotto dell'evento in corso (nome, ospiti, costo stimato e a
   persona, passo raggiunto, ultimi salvati), non uno smistatore: altrimenti sarebbe una
   seconda porta per la stessa stanza di "Evento".
3. Stampa: meccanismo ad allowlist — non chiesto all'utente perché il codice contiene già
   il precedente che funziona (`body.bp-printing-menu > *:not(#bp-menu)`), mentre
   `stampaLista()` non ha nulla di equivalente. Chiesto invece cosa deve *essere* il foglio:
   risposta "entrambi", lista da spuntare e preventivo, con scelta prima di stampare.
4. A ≥900px la barra diventa una sidebar sinistra, stesso markup, contenuto in colonna
   max ~900px.
5. Funzionalità nuove selezionate: "ce l'ho già" (scala le scorte), prezzi personalizzati
   per voce, link condivisibile senza backend. **Non** selezionata: checklist senza dover
   salvare l'evento.
6. Quattro fasi, ognuna rilasciabile, la più rischiosa per ultima.
7. Bottoni della schermata risultati da 7 a 4 (via Copia testo, Nuovo evento, Crea menù,
   Apri eventi salvati). Il menù da esporre si sposta in "Altro".
8. Menù da esporre: colori e leggibilità da rifare, più **integrazione Canva reale** —
   scelta dall'utente dopo che gli è stato mostrato cosa cade (account, dati verso terzi,
   privacy e README da riscrivere) e dopo che gli è stata proposta l'alternativa a costo
   zero (esporta un file, lo carichi tu).
9. Domanda arrivata a piano già scritto — account utente con database: **scartati** account
   veri (Supabase) e sincronizzazione con codice (Cloudflare D1) a favore di export/import
   di un file più il link condivisibile.

## Correzioni fatte durante il grill

- Detto all'utente che la CSP andava aperta verso Canva. **Sbagliato**: lo scambio del
  token deve partire da un backend (bloccato da CORS), quindi il browser parla solo con il
  nostro Worker e `connect-src 'self'` regge. Corretto prima di scrivere il piano.

## Round 1 — Codex

_thread_id: 01a07bef-c93b-7370-910c-3ecf8b63adce · gpt-5.6-sol · reasoning xhigh_

The plan is not ready to implement. Its central direction is reasonable, but several assumptions conflict with the current code.

### Claims verified

- `app.css` does contain exactly nine `@media print` blocks. However, only the block around line 1297 is the broad blocklist; the others are component and content-page overrides. “Nine blocks” is not itself the defect.
- `body.bp-printing-menu > *:not(#bp-menu)` is a real allowlist, and `#bp-menu` is currently a direct child of `<body>`.
- `.bp-homebtn` has no `body.bp-home` rule.
- Keeping `connect-src 'self'` is valid only if every fetch goes through same-origin Worker endpoints and Canva is opened solely by top-level navigation. Thumbnails, iframe embedding, or direct Canva fetches would invalidate that conclusion.

### Calculation and state blockers

- **No downstream row model exists.** `calcolaSpesa()` builds quantities and prices internally, mutates the DOM, and returns only `true/false`; `applicaScorte(righe, scorte)` therefore has no `righe` to consume. **Fix:** Extract a pure canonical calculation returning typed rows and totals, then retain `calcolaSpesa()` and `stimaBudget()` as API-compatible wrappers so the existing golden contract remains testable.
- **Leaving `stimaBudget()` untouched produces contradictory totals.** Home, the live estimate, and the guided summary will ignore stock and custom prices while Results shows adjusted totals. **Fix:** Route every displayed effective total through a modifier-aware wrapper while preserving a modifier-free base mode for golden tests.
- **Stock subtraction is underspecified.** Current liquid costs use raw millilitres while displayed quantities round up to 0.5 L; fermented drinks use bottles, ice uses kilograms, supplies use pieces, and garnishes have no quantity. **Fix:** Define each row with a stable ID, raw quantity, displayed purchase quantity, unit, pack size, and an explicit point at which stock is subtracted and rounding occurs.
- **Custom-price semantics are missing.** It is unclear whether an override is per litre, bottle, kilogram, or piece and whether `geoMult` and price band still apply. **Fix:** Store overrides by canonical row ID with unit/currency and define them as either final local unit prices or pre-geography prices—not an ambiguous replacement.
- **`bp_settings` currently overwrites itself.** `bpSaveSettings()` writes only `lingua`, `tema`, and `autosave`, so print preferences and price overrides added there would disappear on the next theme/language/autosave change. **Fix:** Introduce one validated settings model that loads, migrates, mutates, and writes all fields atomically.
- **The event lifecycle does not carry stock.** `bpSalvaEvento`, `bpEventEdit`, duplication, draft autosave, reset, and import have no stock handling; “stored inside the event” does not cover unsaved work. **Fix:** Specify stock behavior across draft/save/edit/duplicate/reset and add it to both the current-draft and saved-event schemas.
- **Home cannot show or resume the actual step.** `vaiAStep()` stores no current step, `bpHomeResume()` always opens `step-setup`, and `bpHasInProgress()` ignores setup-only edits. **Fix:** Add a persisted `currentStep` plus an explicit draft-dirty predicate and migrate old drafts to a safe default.
- **Successful saving cannot currently be confirmed.** `bpSetEvents()` swallows quota/storage failures, after which `bpSalvaEvento()` still displays a success toast. **Fix:** Make storage writes return/throw a result and show the “open saved events” confirmation only after a verified write.
- **Deferred recalculation creates a save/print race.** Stock or price input followed immediately by Save, Share, or Print can snapshot the old DOM before the animation-frame calculation runs. **Fix:** Generate these outputs synchronously from the canonical model or explicitly flush pending calculation before every consuming action.

### Navigation and overlays

- **`.bp-nav` is already a full-screen modal menu.** It is `position:fixed; inset:0; display:none`, controlled by `.show`, `bpToggleNav()`, and body scroll locking; it cannot simply become the proposed persistent bar. **Fix:** Replace the old component and lifecycle completely, or use a new class/ID and delete the obsolete modal-navigation code.
- **The promoted panels share their class with real dialogs.** `bp-events`, `bp-library`, and `bp-settings` use `.bpc-overlay`, but so do `bp-welcome` and `bp-config`; changing `.bpc-overlay` into an in-flow section would break onboarding. **Fix:** Give tab sections a separate non-modal structure and leave only welcome/configuration flows under modal styling.
- **Their DOM locations are inconsistent.** Library/settings are direct body children while events is inside `.container`, so sidebar offsets, widths, and scrolling cannot be applied uniformly. **Fix:** Introduce one main content shell containing all four route sections.
- **Existing open/close functions will leave the page locked or doubly visible.** They toggle `.show` and write `document.body.style.overflow` independently; `bp-events` opened from Home currently relies on covering Home rather than leaving `bp-home`. **Fix:** Implement one section router and a separate reference-counted modal manager; tab sections must never touch body overflow.
- **Dialog accessibility is already incomplete.** The overlays declare `aria-modal="true"` but do not focus the dialog, trap focus, mark the background inert, respond to Escape, or restore focus. Retaining those attributes after promotion would be incorrect. **Fix:** Remove dialog semantics from promoted sections and implement full focus/inert/Escape restoration for the remaining real dialogs.
- **The fixed layout lacks collision rules.** Current overlays use z-index 1400, the menu 100000, and another modal 9000; a bottom bar also needs matching content padding, while a sidebar needs a 240px content offset. **Fix:** Define an explicit z-index stack and content-shell padding/offsets at both layouts, including safe-area and keyboard behavior.
- **Breakpoint consolidation cannot be “no visual change.”** Moving behavior from 560px or 600px to one threshold necessarily changes the 40px interval and adds risk unrelated to navigation. **Fix:** Defer breakpoint cleanup to a separate visual-regression change or document and test every intentional remapping.
- **The Results screen currently has eight actions, not seven.** There are four `.action-buttons`, three `.wizard-actions`, and one separate saved-events button; the plan also says four remain while four leave. **Fix:** Inventory all eight and define the post-save fifth/transient action explicitly.
- **Reordering actions silently breaks translation.** `cambiaLingua()` assigns the first four `.action-buttons` by positional index as Share, Copy, Print, Menu; the proposed order would mislabel buttons. **Fix:** Remove positional translation code and translate each control through its own stable key.
- **Existing tests will fail in Phase 1.** `ui-css` requires `#bp-burger` to be fixed; `ui-smoke` and `ui-csp` click it, click `[data-home="events"]`, and expect `#bp-events.show`. **Fix:** Replace these assertions in the same phase with responsive navigation, active-state, and section-visibility tests.
- **The golden tests are not purely engine tests.** They snapshot all `#risultati li` text and counts, so stock/price labels inserted into those rows can change the golden even with no modifiers. **Fix:** Preserve the base rendered projection or make the helper snapshot explicit canonical quantity/cost fields while retaining the old modifier-free expected values.
- **`check-i18n` does not guarantee all UI text is translated.** It does not apply translations to ARIA labels and cannot detect hard-coded errors or many dynamic-key uses. **Fix:** Add attribute translation support and locale UI tests for navigation, dialogs, import errors, units, and accessibility labels.

### Printing

- **Consolidating nine blocks is unnecessary and risky.** Several blocks print `privacy.html` and the SEO pages, not the shopping list. **Fix:** Replace the broad unscoped list-print block with target-specific rules first; consolidate only after equivalent PDF regression coverage exists.
- **A block-count test proves nothing useful.** One malformed or semantically wrong print block still passes, while legitimate component-local print rules become forbidden. **Fix:** Test print-mode visibility and render representative app, menu, privacy, and SEO pages to PDF or screenshots.
- **`#print-sheet` placement is a hidden requirement.** The proposed direct-child selector will hide it if implementation places it inside `.container`. **Fix:** Require `#print-sheet` to be a direct body child or change the allowlist selector to match its actual shell.
- **The stated “invisible app” failure is inaccurate.** Because the hiding selector is inside `@media print`, a stale class does not hide the screen; it poisons later print attempts. Worse, an unconditional timeout can remove the class while a non-blocking mobile print preview is still rendering. **Fix:** Keep all isolation print-only and clean up on `afterprint`, print-media exit, focus/visibility recovery, and error paths—never by a blind timer while print media is active.
- **The same teardown defect already exists for menu printing.** `bp-printing-menu` relies only on `afterprint`, yet Phase 2 discusses fallback only for list printing. **Fix:** Use one shared print-target state machine for list and menu and clear it when the relevant view closes.
- **The print document depends on the missing structured row model.** Building it from the rendered list repeats the fragile snapshot coupling. **Fix:** Render screen, text share, checklist snapshot, and print sheet from the same canonical rows.

### Share links and import/export

- **Config plus menu is not sufficient to reproduce an event.** Shared menus may reference custom recipes absent from the recipient’s `databaseDrink`; the alcoholic branch of `calcolaSpesa()` dereferences such a name without a guard and throws. **Fix:** Include validated definitions for every referenced custom recipe or share flattened canonical ingredient rows.
- **The URL encoding contract is missing.** “Compressed” and “about 2000 characters” do not specify UTF-8 handling, base64url, codec availability, or delivery-channel limits. **Fix:** Version a UTF-8/base64url format, feature-detect or bundle its codec, and test actual target apps with both encoded and decoded size ceilings.
- **Compressed input needs two limits.** A short malicious fragment can expand into a huge JSON payload. **Fix:** Enforce maximum encoded length, maximum decompressed bytes, collection counts, string lengths, and parsing time before constructing state.
- **Fragment data cannot be trusted.** Unknown menu names can crash calculation, and unsafe object keys such as `__proto__` can poison ordinary objects during assignment. **Fix:** Decode into null-prototype objects and validate every allowed field, enum, number range, key, and referenced recipe before rendering or persistence.
- **Automatic fragment application can destroy local work and repeat on reload.** The plan does not define consent, conflict handling, or fragment removal. **Fix:** Show a validated preview, require “open as copy,” preserve the current draft, assign fresh IDs, then remove the fragment with `history.replaceState`.
- **A fragment is not confidential.** It is excluded from HTTP requests automatically, but remains visible to page scripts, browser history/sync, screenshots, and anyone receiving the link. **Fix:** Describe it as portable plaintext-equivalent data, clear it promptly, and ensure analytics never records the full URL.
- **Import version handling is only half-designed.** Rejecting future versions does not handle missing versions, corrupt versions, or supported older versions. **Fix:** Define an integer schema version and explicit migration chain from every accepted older format.
- **Imported events currently have a stored-markup injection path.** `bpEventsList()` interpolates unescaped `ev.id` into several attributes; imported `lista`, recipes, and object shapes are also assumed valid. CSP reduces script execution but does not prevent DOM/UI injection through permitted styles and existing actions. **Fix:** Validate opaque IDs and build imported-data UI with DOM APIs/text properties rather than string interpolation.
- **Merge semantics are undefined.** Event-ID collisions, recipe-name conflicts, checks, stock, and settings need different rules; `Date.now()` IDs can also collide. **Fix:** Use `crypto.randomUUID()`, remap imported event IDs, and present deterministic per-type conflict policies.
- **Replace/import is not transactional.** Multiple `localStorage` writes can partially succeed, and an already scheduled autosave can overwrite the newly imported draft afterward. **Fix:** Validate everything first, cancel pending save/recalculation work, snapshot existing keys, commit with rollback on failure, then hydrate memory from the committed state.
- **“Export everything” lacks an inventory.** Relevant state currently spans `barmanProState_v7`, `bp_events`, `bp_recipes`, `bp_settings`, and `bp_menu_style`; the plan does not say whether the draft or menu style is included. **Fix:** Publish an explicit export manifest and test round-trip equality for every included store.

### PWA and Canva

- **Every phase must bump the service-worker cache.** Current JS and CSS are cache-first, and `sw.js` explicitly requires `CACHE_VERSION` and `ASSET_CACHE` changes on every release; the plan omits this. **Fix:** Add a cache-version bump and mixed-version/offline validation to every phase’s release checklist.
- **The service worker will intercept OAuth callbacks.** Every same-origin navigation is fetched and then put into the browser Cache API, including `/api/canva/callback?code=…`; fallback can also return the app shell for a failed callback. **Fix:** Bypass `/api/` before all cache logic and never cache OAuth/API requests or responses.
- **There is no backend Worker today.** `wrangler.jsonc` explicitly has no `main`; Cloudflare route configuration does not create endpoint handlers. **Fix:** Add a Worker entry point and explicit `/api/*` dispatch, optionally using `assets.run_worker_first`; Cloudflare documents this full-stack asset/Worker pattern in its [Worker script routing guide](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/).
- **Two endpoints are insufficient.** Callback and refresh do not initiate authorization, submit a menu, call/import/autofill a design, poll asynchronous jobs, or return an edit URL. **Fix:** Define the complete method/path/request/response contract before implementation.
- **PKCE and CSRF state are absent from the plan.** Canva requires a unique verifier/challenge and says the verifier must be securely held outside browser-accessible code; `state` must be verified and single-use. **Fix:** Generate verifier and state server-side, bind them to a short-lived encrypted session, verify once at callback, and immediately strip the authorization query. See [Canva authentication](https://www.canva.dev/docs/connect/authentication/).
- **Refresh is race-prone.** Canva refresh tokens are single-use and rotate, so two tabs or concurrent jobs refreshing the same token can invalidate the session. **Fix:** Prefer a one-shot authorize→create→discard flow, or serialize refresh with durable server-side state and atomic token rotation. See [Canva token generation](https://www.canva.dev/docs/connect/api-reference/authentication/generate-access-token/).
- **The feasibility gate must precede OAuth work.** Autofill requires Canva Enterprise for users, public integrations require Canva review, Create Design with an asset yields an image-based design, and template-copy modes are preview-limited. **Fix:** Run a disposable proof of concept first and lock one supported, editable workflow and eligibility matrix before building authentication. See [Autofill requirements](https://www.canva.dev/docs/connect/autofill-guide/) and [Create Design limitations](https://www.canva.dev/docs/connect/api-reference/designs/create-design/).
- **Token and API security are unspecified.** A public refresh/design proxy needs least-privilege scopes, token confinement, CSRF/Origin checks, payload limits, rate limiting, and generic errors. **Fix:** Keep tokens out of JavaScript/localStorage, use secure HttpOnly session material, accept state-changing calls only by validated POST, and enforce per-session abuse limits.
- **Worker responses will not automatically inherit the static `_headers` policy.** Callback HTML/redirects also risk authorization codes appearing in referrers and logs. **Fix:** Emit explicit `Cache-Control: no-store`, `Referrer-Policy: no-referrer`, CSP/security headers, clean redirects, and redacted structured logs from the Worker.
- **Observability is not designed.** `observability.enabled` alone does not provide safe OAuth-stage diagnostics and can encourage logging codes, tokens, or menu contents. **Fix:** Define redacted stage/error metrics with correlation IDs and tests proving secrets and payloads never enter logs.
- **The promise inventory is incomplete.** Besides README, PRODUCT, and privacy content, `index.html` and `_headers` comments explicitly claim no backend/server, while users need an upfront disclosure before menu data leaves the device. **Fix:** Search all published claims, update both privacy languages and visible consent/error UI, and state exactly what Cloudflare and Canva process and retain.

As written, none of the four phases is reliably releasable: Phase 1 breaks explicit tests and overlay state, Phase 2 risks print regressions across other pages, Phase 3 lacks a viable data model and safe migration/import boundary, and Phase 4 has neither a complete Worker architecture nor a proven Canva workflow.

VERDICT: REVISE
### Claude's response — Round 1

**Verificate nel codice prima di accettarle** (Codex poteva sbagliare; non ha sbagliato):
`.bp-nav` esiste già come menu modale a schermo intero (app.css:1601) → collisione di nome
reale; `cambiaLingua()` traduce per indice con `textContent` su `.action-buttons button`
(app.js:1818) → togliere un bottone avrebbe mislabellato gli altri in 7 lingue; le azioni
della schermata risultati sono 8, non 7; `wrangler.jsonc` dichiara esplicitamente "main non
definito → nessun JS server-side"; `helpers.js:107` fotografa il testo di `#risultati li`,
quindi i campi "ho già" cambierebbero i golden; `bpSaveSettings()` scrive e sovrascrive solo
3 campi.

**Cambiamento strutturale accolto:** nasce una **FASE 0** che estrae un modello di righe
canonico, con `calcolaSpesa()`/`stimaBudget()` come involucri compatibili. La rev. 1
prometteva `applicaScorte(righe, scorte)` senza che esistesse alcun `righe`: era la critica
più grave e la più giusta. Nella Fase 0 confluiscono anche il modello unico di impostazioni,
le scritture che riportano l'esito, il passo corrente persistito e la fine della traduzione
posizionale.

**Altre correzioni accolte:** allowlist mirata al solo blocco largo invece del
consolidamento dei 9 (gli altri servono privacy e pagine SEO); macchina a stati unica per
la stampa, senza timer ciechi, applicata anche al menù che ha già lo stesso difetto; il
riordino dei breakpoint esce dalla Fase 1; sezioni-tab fuori da `.bpc-overlay` con router di
sezione e gestore di modali separati, e i dialoghi veri guadagnano il focus management che
oggi dichiarano senza avere; contratto scritto per il fragment (doppio limite, oggetti senza
prototipo, ricette personalizzate incluse, mai applicato in automatico); import
transazionale con manifest e `crypto.randomUUID()`; SW che salta `/api/`; entry point Worker
vero; cancello di fattibilità Canva prima di qualunque riga di OAuth; bump della cache SW in
ogni fase.

**Correzione accettata contro me stesso:** avevo scritto che una classe di stampa rimasta
attaccata rende l'app invisibile. Falso — il selettore vive dentro `@media print`. Avvelena
le stampe successive, difetto diverso e meno vistoso.

**Respinte, con motivo:**
1. *Regressione su PDF/screenshot delle pagine stampate.* Introduce artefatti binari di
   riferimento in una suite oggi veloce e deterministica, da rigenerare a ogni ritocco
   tipografico. Accolta la parte che coglie il difetto vero: asserzioni di visibilità in
   `media: 'print'` su app, menù, privacy e una pagina SEO — il guasto riportato è "si
   stampa roba che non c'entra", ed è esattamente ciò che quelle asserzioni misurano.
2. *Test di interfaccia in tutte le lingue per navigazione, dialoghi, errori di import,
   unità ed etichette di accessibilità.* Accolto il supporto agli attributi in `check:i18n`
   (`data-i18n-aria`), che è la lacuna reale. Respinta la matrice per lingua: moltiplica la
   suite per coprire un rischio che il controllo di parità delle chiavi già intercetta.

## Round 2 — Codex

Rev. 2 is materially better—especially FASE 0—but it is still not implementation-ready.

### Rechecked claims

- Correct: [app.css](C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/public/app.css:1288) contains nine print blocks, but only the block at line 1297 is the broad blocklist; the menu rule at line 1865 is a genuine direct-child allowlist.
- Correct: `.bp-homebtn` has no rule tied to `body.bp-home`; only generic styling exists at [app.css:1924](C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/public/app.css:1924).
- Corrected adequately: `calcolaSpesa()` cannot remain internally untouched. The canonical-model extraction is necessary because it owns calculation, pricing and rendering, while `stimaBudget()` duplicates its arithmetic. Keeping only their public signatures compatible is the right interpretation.
- Largely corrected: one responsive `<nav>` is viable after completely replacing the existing modal `.bp-nav`, adding the common shell and separating routing from modal locking.
- Correct, narrowly: `connect-src 'self'` can remain if API calls go exclusively to the Worker and Canva authorization is a top-level navigation—not a `fetch()` following a cross-origin redirect. `_headers` also keeps `form-action 'none'`, so the OAuth launch cannot depend on form submission.

### Material findings

1. **The canonical-row cost contract is still ambiguous.** Liquids are displayed rounded to 0.5 L at [app.js:4385](C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/public/app.js:4385), but their current cost uses raw millilitres at [app.js:4431](C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/public/app.js:4431); subtracting stock from “quantità d’acquisto” leaves undefined whether an override prices the raw requirement, the rounded quantity, or the post-stock quantity.  
   **Fix:** Define separate numeric fields such as `requiredBaseQty`, `roundedPurchaseQty`, `stockQty`, `effectivePurchaseQty`, and `pricingQty`, with exact formulas for default and custom pricing.

2. **Recipe identity remains coupled to user-visible names.** Menus are maps keyed by recipe name and calculation resolves those names through global `databaseDrink`; a shared recipe named like a different local custom recipe can overwrite or silently use the wrong definition, while deleting a custom recipe can make an old saved event uneditable.  
   **Fix:** Give recipes stable IDs and embed/version referenced definitions per event, or use an event-scoped resolver that rewrites conflicting names without mutating the recipient’s global library.

3. **The proposed i18n replacement does not do what the plan claims.** `check-i18n` already recognizes `data-i18n-aria` through its generic regex at [check-i18n.mjs:62](C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/scripts/check-i18n.mjs:62); the missing behavior is that `cambiaLingua()` only applies text and placeholders at [app.js:1792](C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/public/app.js:1792), never `aria-label`.  
   **Fix:** Implement runtime `[data-i18n-aria] → aria-label` handling and add one test that switches to a non-Italian locale and observes the actual attribute.

4. **The export manifest is still not explicit.** [PLAN.md:253](C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/PLAN.md:253) says the plan specifies whether each key is included, but it only lists keys; it also omits `bp_onboarded`, without declaring that omission intentional.  
   **Fix:** Add a per-key table with include/exclude, schema, merge/replace policy and reason for every local-storage key.

5. **Two recipe stores can already disagree.** The draft still carries legacy `customDrinks`, while `bp_recipes` independently stores modern recipes; both mutate `databaseDrink` during startup at [app.js:2367](C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/public/app.js:2367) and [app.js:4752](C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/public/app.js:4752). Importing both without precedence can resurrect or overwrite recipes.  
   **Fix:** Migrate `customDrinks` into one canonical recipe store in FASE 0, remove the duplicate field, and test conflicting legacy data.

6. **The claimed transactional import is not transactional across five `localStorage` writes.** An in-memory snapshot and rollback do not protect against a tab crash, reload, or rollback itself failing from quota exhaustion.  
   **Fix:** Use a durable two-phase journal/staging namespace with a final commit marker and startup recovery, or move imported state into one versioned envelope committed by one `setItem`.

7. **Merge behavior is explicitly still undecided.** The plan says rules are “declared” without declaring them, and [PLAN.md:364](C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/PLAN.md:364) leaves stock/check behavior on duplication open. FASE 3 therefore cannot satisfy its own lifecycle requirement.  
   **Fix:** Freeze deterministic rules for recipe conflicts, settings, checks, stock, replace versus merge, and duplication before calling FASE 3 releasable.

8. **Untrusted-file resource limits are missing, and a synchronous parse timeout is not enforceable.** URL fragments receive size limits, but an imported file can be arbitrarily large; `JSON.parse()` and synchronous decompression cannot be interrupted merely by checking elapsed time afterward.  
   **Fix:** Reject by `File.size` before reading, apply the same byte/count/depth/string limits as fragments, and use a terminable Web Worker if parsing time is a hard requirement.

9. **The fragment codec is still not actually specified.** UTF-8 plus base64url is an encoding, while references to “decompressed” limits imply an unnamed compression algorithm and implementation.  
   **Fix:** Name and version the compression codec—or explicitly use no compression—and establish a tested maximum URL budget plus file/text fallback.

10. **Fragment confidentiality can still be lost to page scripts.** The fragment does not reach the HTTP server, but `analytics.js` can load a permitted third-party beacon if its token is enabled; parsing only during `window.onload` leaves the fragment readable beforehand. The Round 1 requirement that analytics never receive the full URL disappeared.  
    **Fix:** Capture and remove `#e` in the earliest same-origin bootstrap before any optional third-party script, and test that telemetry receives a fragment-free URL.

11. **Print cleanup is improved but not fail-safe yet.** The plan does not require setting the target synchronously before `window.print()`, resetting stale targets when the menu closes, or clearing before selecting every new target; `emulateMedia()` also does not prove the `beforeprint`/`afterprint` lifecycle.  
    **Fix:** Make `beginPrint(target)` first clear all targets, set exactly one before calling `print()`, recompute on `beforeprint` for Ctrl+P, clear on view/dialog close and recovery events, and test those transitions with `window.print` stubbed.

12. **The modal inventory is incomplete.** After promotion, welcome/config are not the only real modal surfaces: `#bp-menu` declares `role="dialog"` at [index.html:88](C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/public/index.html:88), and `#suggeritore-modal` is a fixed full-screen modal with no dialog semantics at [index.html:283](C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/public/index.html:283).  
    **Fix:** Put menu, suggester, welcome, config and the new print dialog in the modal inventory, with consistent focus, inert background, Escape, nested locking and focus restoration.

13. **The new router does not explicitly retire `body.bp-home` as a second visibility authority.** Currently `vaiAStep()` removes it, `bpGoHome()` adds it, and CSS uses it to hide every step panel; leaving that machinery alongside the router permits contradictory active states.  
    **Fix:** Make the section router the sole visibility source and either delete `bp-home` routing rules or derive the class strictly as non-authoritative styling state.

14. **Removing “Copia testo” can break Share on desktop.** `condividiLista()` currently calls `copiaListaTesto()` whenever Web Share is absent or fails at [app.js:4653](C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/public/app.js:4653).  
    **Fix:** Remove only the visible button; retain/refactor the clipboard fallback and define whether Share emits the new URL, readable text, or a user choice.

15. **FASE 4 remains a feasibility gate, not an implementable Worker design.** It lacks the method/path contract and does not explain where the verifier, menu payload and access token live across the Canva redirect; an encrypted cookie is not automatically viable because Canva access tokens may themselves be up to 4 KB. [Canva authentication](https://www.canva.dev/docs/connect/authentication/), [token limits](https://www.canva.dev/docs/connect/api-reference/authentication/generate-access-token/).  
    **Fix:** After the spike, write a second locked plan covering POST/session creation, top-level authorization redirect, callback, creation/polling, edit redirect, TTL storage or measured cookie limits, CSRF/Origin checks, payload caps and rate limiting.

16. **“Crea → scarta” does not necessarily revoke authorization.** Canva returns both access and refresh tokens; merely forgetting them leaves authorization material valid until expiry. Canva exposes a server-side revocation endpoint. [Canva token revocation](https://www.canva.dev/docs/connect/api-reference/authentication/revoke-token/).  
    **Fix:** Never persist the refresh token, revoke the token lineage after success/failure where appropriate, and clear all session material.

17. **Worker verification and observability are still absent.** Current Playwright starts a static `http-server`, so it cannot exercise `/api/*`, Worker security headers, SW bypass, callback replay, redaction or Canva failure paths; `observability.enabled` alone supplies no safe stage metrics.  
    **Fix:** Add Worker tests with mocked Canva responses plus structured, payload-free stage/error metrics and assertions that codes, tokens and menu contents never enter logs.

### On the two rejected findings

- I accept rejecting committed PDF/screenshot baselines for the original “extra content is printed” regression. Visibility assertions are appropriate for that bug. They are not sufficient for the additional promises about pagination, clipping and contrast; add lifecycle/computed-style checks and a documented real-device print gate without storing binary baselines.
- I also accept rejecting a full 7×dialog test matrix. But the chosen replacement is ineffective because the checker already parses the attribute and does not execute its translation. One runtime locale-switch smoke test is sufficient; a full matrix is unnecessary.

FASE 0 fixes the sequencing problem, but FASE 3 remains unreleasable while merge/duplication semantics and crash-safe import are unresolved, and FASE 4 must be replanned after its feasibility spike.

VERDICT: REVISE
### Claude's response — Round 2

**Verificate nel codice prima di accettarle.** Tutte confermate, e una corregge me:
`check-i18n.mjs:62` usa il regex `data-i18n(?:-[a-z]+)?=` e quindi **riconosceva già**
`data-i18n-aria` — la mia contro-proposta del Round 1 aggiustava una cosa che funzionava,
lasciando il buco vero, che è a runtime (`cambiaLingua()` applica testo e placeholder, mai
`aria-label`, app.js:1792). Confermate anche: `condividiLista()` ricade su
`copiaListaTesto()` (app.js:4653); `#bp-menu` ha `role="dialog"` con classe `.bpm-overlay` e
`#suggeritore-modal` non ha semantica di dialogo (index.html:88, 283); due archivi di
ricette con `Object.assign(databaseDrink, customDrinks)` (app.js:2377); `bp_onboarded` fra
le chiavi, che avevo dimenticato nel manifest.

**Accolte:** contratto numerico esplicito delle righe canoniche con formule bloccate per
prezzo di default, scorte e prezzo personalizzato; identità delle ricette per id con
migrazione di `customDrinks` dentro `bp_recipes` in Fase 0 e risolutore a scope evento;
gestione runtime di `data-i18n-aria` con test che osserva l'attributo; manifest di export
per chiave, con `bp_onboarded` escluso e motivo; regole di unione congelate per tipo;
duplicazione decisa (azzera scorte e spunte); import a due fasi con marcatore di commit e
recupero all'avvio; rifiuto per `File.size` prima della lettura; `beginPrint(target)`
sincrono che azzera prima di impostare, ricalcolo su `beforeprint` per coprire Ctrl+P,
azzeramento alla chiusura della vista; inventario dei modali esteso a `#bp-menu`,
`#suggeritore-modal` e al dialogo di stampa; `body.bp-home` degradata a stile
non-autoritativo; `copiaListaTesto()` mantenuta come funzione mentre sparisce il bottone;
revoca del token Canva invece del semplice "scarta"; test del Worker con Canva simulata;
Fase 4 declassata da piano a **cancello di fattibilità**, con un secondo piano bloccato da
scrivere solo dopo la prova.

**Respinte, con motivo:**
1. *Envelope unico committato con un solo `setItem`, o journal durevole completo.*
   Riscriverebbe ogni percorso di lettura e scrittura dell'app per proteggere
   un'operazione che l'utente avvia a mano e **può ripetere** — il file di origine è ancora
   sul suo disco. Accolta la metà economica: staging + marcatore di commit + recupero
   all'avvio, che copre il crash a metà scrittura senza toccare il resto.
2. *Web Worker terminabile per il tempo di parsing dei file importati.* Aggiunge un file e
   un ciclo di vita per difendersi da un file che l'utente sceglie da sé sul proprio
   dispositivo. Accolto il rifiuto per `File.size` prima della lettura, che è il controllo
   che conta; il tetto sul **tempo** di parsing esce dai requisiti invece di essere finto.
3. *Compressione nel fragment.* Non respinta a Codex ma **rimossa dal piano**: la rev. 2
   parlava di limiti "decompressi" senza nominare un codec. Introdurre una libreria per
   stare dentro un budget di URL non ancora misurato è ottimizzazione prima della misura.
   Il formato è JSON piano in base64url; se non ci sta, la ricaduta è il file, che esiste.

**Note sulle due respinte del Round 1:** Codex le ha accettate entrambe, chiedendo però
integrazioni che ho accolto — test del ciclo di vita della stampa oltre alla sola
visibilità, e un test di cambio lingua a runtime.

## Round 3 — Codex

Rev. 3 is materially stronger, but FASE 0–3 are not yet independently releasable.

### Deliberately rejected fixes

- **Single envelope/full journal:** rejecting the envelope is reasonable, but the proposed staging protocol is still incomplete; see finding 8.
- **Terminable Web Worker:** accepted. A hard pre-read `File.size` limit is proportionate once the parsing-time requirement is removed—but the limit must be numeric.
- **Compression:** accepted. Plain UTF-8/base64url plus file fallback is simpler and testable.
- The earlier PDF-baseline and full-locale-matrix rejections remain reasonable. The remaining print objection concerns an untested teardown path, not visual baselines.

The CSP conclusion is also correct: `connect-src` governs script-driven connections such as `fetch`, while `form-action 'none'` blocks form submissions; OAuth can start through a normal top-level navigation. [MDN connect-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/connect-src), [MDN form-action](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/form-action).

### Material findings

1. **The newly “locked” stock/pricing formula is wrong, not merely ambiguous.** [PLAN.md:109](/C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/PLAN.md:109) mixes millilitres with displayed litres and subtracts stock after rounding: for 600 ml required, 1 L rounded and 200 ml stock, it produces 800 ml “effective” and 480 ml default pricing, although only 400 ml remain; a custom price then prices 800 ml.  
   **Fix:** add `remainingBaseQty=max(0,requiredBaseQty-stockBaseQty)`, round that for purchasing, normalize every numeric quantity to its base unit, and use the same pricing quantity for default and override prices.

2. **The legacy recipe migration is incomplete.** The plan migrates `customDrinks`, but the draft also persists and reloads `customShots` at [app.js:2343](/C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/public/app.js:2343) and [app.js:2375](/C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/public/app.js:2375), while new shots are simultaneously written to `bpRecipes.amari` at [app.js:2827](/C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/public/app.js:2827).  
   **Fix:** migrate both legacy fields, specify conflict precedence and deterministic ID assignment, test idempotence, then remove both only after successful verified migration.

3. **FASE 0 destructively changes the schema without handling old and new tabs concurrently.** Keeping the name `barmanProState_v7` while removing fields and changing menu references means an already-open old client can overwrite migrated ID-based state; bumping the service-worker cache does not terminate existing clients.  
   **Fix:** introduce an explicit schema version/new storage key, retain backward-compatible reads for one release, and coordinate migrations through a lock plus `BroadcastChannel`/forced reload.

4. **FASE 0 depends on a router that only exists in FASE 1.** Point 9 removes `body.bp-home` as the visibility authority, but today that class is the only controller at [app.css:1927](/C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/public/app.css:1927); removing it before the router exists makes FASE 0 visibly broken.  
   **Fix:** move this change into the FASE 1 router commit or introduce a temporary equivalent controller in FASE 0.

5. **The promised golden compatibility overlooks the tests’ real input contract.** The tests directly replace the name-keyed global lexical menu maps at [helpers.js:91](/C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/tests/helpers.js:91); preserving only function signatures does not preserve that contract after switching menus to IDs.  
   **Fix:** retain a name-keyed compatibility boundary or update `helpers.js` in FASE 0 to resolve names to IDs while leaving every golden expectation unchanged.

6. **FASE 1 still lacks a navigable information architecture for “Altro.”** Three former overlays must fit behind one tab, but the plan does not define its landing page, subroutes, back behavior, active-tab behavior, or focus destination; the actual functions currently open full-screen `.show` overlays and directly lock body scrolling.  
   **Fix:** specify the complete route tree and transition table for Library, Settings and Menu, including browser/back buttons, programmatic entry points and focus placement.

7. **A modal counter is insufficient for the promised nested accessibility behavior.** A count cannot identify the topmost dialog, its opener, which surface becomes inert, or where focus returns. Additionally, the safe-area rule lacks `viewport-fit=cover` in the existing viewport meta at [index.html:18](/C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/public/index.html:18), and “keyboard behavior” has no actual policy.  
   **Fix:** require a modal stack of `{dialog, opener}` entries, add `viewport-fit=cover`, lock the virtual-keyboard policy, and test both navigation layouts plus nested Escape/focus restoration.

8. **The print fallback exists in prose but is not tested.** [PLAN.md:209](/C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/PLAN.md:209) tests the happy `afterprint` sequence only; it does not prove cleanup when `afterprint` never fires, including removal of `inert`, overflow locks and dialog state. Ctrl+P target precedence is also undefined and can produce an empty or stale sheet.  
   **Fix:** add a target-selection decision table and tests that omit `afterprint` and independently trigger media-exit, focus, visibility, route/dialog close and error cleanup; make real iOS Safari print-and-cancel an explicit release gate.

9. **Staging plus a marker can work, but “completed or cancelled” is false after the first live key changes.** Without old-value backups, recovery cannot roll back a partially swapped import; keeping all staged values can also exhaust quota while live replacements temporarily duplicate them. User repeatability does not prevent the app from hydrating mixed state first.  
   **Fix:** before commit verify staged hashes and headroom; after the marker permit only idempotent completion, delete each staged value only after verified live write, record/infer progress, and run recovery before any normal hydration or autosave.

10. **Stable recipe IDs are not reflected in merge rules.** [PLAN.md:260](/C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/PLAN.md:260) handles only recipe-name conflicts, not same-ID/different-content conflicts or rewriting imported event/menu references; “identical round-trip” is impossible in merge mode because IDs and names deliberately change.  
    **Fix:** define the ID/content/name conflict matrix, build one remapping table applied to every reference, verify referential integrity, and separate exact replace-round-trip tests from merge-invariant tests.

11. **The event lifecycle still loses edit provenance and does not really preserve the current draft.** `bpEditingId` exists only in memory at [app.js:3350](/C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/public/app.js:3350), so reload after “Modifica” turns the next save into a duplicate; opening a shared copy cannot leave the sole `barmanProState_v7` draft intact once autosave runs. Stock/check behavior for a shared “copy” is also unspecified.  
    **Fix:** persist validated edit provenance, define a separate recovery/snapshot slot for the displaced draft, and decide explicitly whether shared copies reset stocks and checks like UI duplication.

12. **Security limits are named but not locked.** “Measure first” is sensible, but FASE 3 has no actual maximum fragment length, file bytes, item count, string length or depth, and recursive validation itself can overflow on hostile nesting.  
    **Fix:** make the measured numeric limits release criteria, validate with an iterative traversal, and test boundary-plus-one, invalid UTF-8, oversized nesting and file fallback.

13. **There is no universal release gate for each phase.** FASE 0 names only 42 golden tests, FASE 1 says some tests will be rewritten, and later phases never require all existing tests plus both static checks.  
    **Fix:** require after every phase the complete pre-existing Playwright suite, all new phase tests, `npm run check`, offline/service-worker smoke tests and zero unexpected console errors.

### Releaseability

- **FASE 0:** no—invalid formulas, incomplete/destructive migration, FASE 1 dependency and test-contract mismatch.
- **FASE 1:** no—“Altro,” modal stacking and mobile viewport/keyboard behavior remain underspecified.
- **FASE 2:** close, but no—the exact unreliable-`afterprint` path and Ctrl+P selection policy remain unproved.
- **FASE 3:** no—transaction recovery, identity remapping, draft provenance and resource limits remain unsafe.
- **FASE 4:** acceptable as a feasibility gate; it correctly requires a second locked plan after the spike.

VERDICT: REVISE
### Claude's response — Round 3

**Verificate nel codice.** Tutte confermate, e due erano difetti che avrei spedito:
il meta viewport (index.html:18) **non ha `viewport-fit=cover`**, quindi
`env(safe-area-inset-bottom)` vale 0 e la barra sarebbe finita sotto la barretta home
dell'iPhone — avevo scritto la regola giusta appoggiata a un valore inesistente; e la
formula che avevo appena "bloccato" era **aritmeticamente sbagliata** (600 ml richiesti,
1 L arrotondato, 200 ml di scorte → 480 ml da pagare invece di 400), perché sottraeva dopo
l'arrotondamento e poi riscalava il grezzo. Confermati anche `customShots` come secondo
archivio vecchio accanto a `bpRecipes.amari`, `bpEditingId` solo in memoria (app.js:3350) e
il contratto d'ingresso dei golden via mappe con chiave il nome (helpers.js:91).

**Accolte:** ordine corretto sottrai→arrotonda, con tutte le quantità nell'unità base;
migrazione anche di `customShots`, non idempotente per caso ma per requisito; bozza su
chiave nuova `v8`; **spostamento di `body.bp-home` dalla Fase 0 alla Fase 1** — dipendeva
da un router che in Fase 0 non esiste ancora, e l'avrei lasciata visibilmente rotta;
confine di compatibilità per i golden; albero di rotte di "Altro" con tabella delle
transizioni; **pila** di modali `{dialogo, aprente}` invece del contatore;
`viewport-fit=cover`; politica esplicita della tastiera virtuale; tabella di precedenza del
bersaglio di stampa per Ctrl+P; test del percorso in cui `afterprint` non arriva mai;
protocollo di staging completo (spazio verificato, solo completamento dopo il marcatore,
cancellazione dopo scrittura verificata, recupero prima dell'idratazione); matrice dei
conflitti su id e non solo su nomi, con tabella di rimappatura unica; test di round-trip
separato dai test di invarianza in unione; provenienza della modifica persistita; slot di
recupero per la bozza spostata; limiti numerici come criteri di rilascio con validazione
iterativa; **condizione di rilascio comune a tutte le fasi**.

**Respinte, con motivo:**
1. *Lock fra schede e `BroadcastChannel` per la migrazione.* È un'app locale usata da una
   persona. Il caso "due schede aperte esattamente durante la migrazione" si risolve quasi
   tutto cambiando chiave (`v7` → `v8`): una scheda vecchia continua a scrivere su `v7` e
   non può più sovrascrivere lo stato nuovo; nel peggiore dei casi perde il proprio lavoro,
   che è già ciò che succede oggi con due schede aperte. Canale fra schede e reload forzato
   costerebbero un meccanismo permanente per un margine che non cambia l'esito.
2. *Verifica degli hash dei valori di staging prima del commit.* I valori sono stati scritti
   dalla stessa scheda un istante prima e rientrano dalla stessa API: un hash proteggerebbe
   da una corruzione senza percorso plausibile. Accolto invece il **controllo di spazio
   disponibile** prima del commit, che difende da un guasto reale — la quota esaurita mentre
   staging e valori vivi coesistono.

## Round 4 — Codex

Rev. 4 resolves almost all Round 3 findings. FASE 1 and 2 are now sufficiently specified, but FASE 0 and 3 retain storage/data-loss defects.

### Release blockers — actual breakage or data loss

1. **Bumping only the draft key does not isolate the changed schemas.** FASE 0 also changes `bp_recipes` and `bp_events`, while old clients still write them at [app.js:2273](/C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/public/app.js:2273) and [app.js:3353](/C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/public/app.js:3353); old `bpSaveSettings()` can likewise overwrite the expanded settings object at [app.js:2409](/C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/public/app.js:2409). An old tab can therefore corrupt ID-based recipes/events despite the `v8` draft key.  
   **Fix:** version every schema-changing store (`bp_recipes_v2`, `bp_events_v2`, and the expanded settings store), leaving old keys as read-only migration sources; no permanent `BroadcastChannel` is required.

2. **The cross-tab narrowing also leaves imports vulnerable to current-version tabs.** Cancelling pending saves only in the importing tab does not stop another tab from writing a live key halfway through the staged commit.  
   **Fix:** make every new-version storage writer check the import marker and defer while it exists; optionally use the ordinary `storage` event for immediate UI warning, without introducing a permanent channel.

3. **The export manifest still exports the obsolete draft.** Despite the FASE 0 bump, [PLAN.md:326](/C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/PLAN.md:326) explicitly exports `barmanProState_v7`, so backups silently omit the active `v8` draft and importing “replace” restores stale data.  
   **Fix:** export `barmanProState_v8`; treat `v7` only as a legacy import/migration source, and update the manifest if the other stores are versioned.

4. **Recipe-migration precedence is promised but not actually decided.** [PLAN.md:145](/C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/PLAN.md:145) says precedence will be declared later, leaving the implementation free to discard either conflicting recipe.  
   **Fix:** lock the rule now—for example, preserve `bp_recipes` under its current name, retain differing legacy content under a suffixed name/new ID, and union missing `customShots`.

5. **Legacy saved events can contain irrecoverable recipe references.** Existing events store names and a rendered shopping-list snapshot; if a custom recipe was later deleted, FASE 0 cannot manufacture the definition it now promises to embed. Opening the checklist remains possible, but editing would silently recalculate without that recipe.  
   **Fix:** migrate resolvable recipes, preserve unresolved events as readable snapshots, mark them degraded, and require explicit recipe rebinding before recalculation/editing.

6. **The staging protocol does not cover a crash before the commit marker.** Partial staging values would have no marker and therefore no recovery path, leaving an invisible quota leak.  
   **Fix:** use a transaction-specific staging namespace and delete every orphan staging transaction lacking a valid marker before startup hydration.

7. **“Check available space” is not itself a reliable quota guarantee.** Writing all staging proves that old-live plus new-staged fits, but each live replacement temporarily creates another copy; an approximate storage estimate cannot guarantee that post-marker completion succeeds.  
   **Fix:** perform an actual reservation write sized for the marker and worst transient live-value delta, abort and clear staging if it fails, then release that reservation during commit.

The hash narrowing is otherwise acceptable: cryptographic hashes add little when values are written and immediately compared through the same `localStorage` API. Exact read-back comparison is sufficient once concurrent writers are blocked by the commit marker and old schemas are isolated.

### Non-blocking implementation refinements

- Define the `visualViewport` keyboard threshold and fallback for browsers without that API.
- Give printed text/background combinations an explicit contrast threshold.
- Define recovery-slot retention and replacement behavior.
- Update stale point references and the risk entry that still mentions only `customDrinks`.

These can be settled during implementation and verified by the common release gate.

### Releaseability

- **FASE 0:** **No.** Other schema-changing keys remain writable by old clients, migration precedence is undecided, and orphaned legacy recipe references lack a safe policy.
- **FASE 1:** **Yes, after a corrected FASE 0.** The route tree, modal stack, safe-area handling, keyboard policy and router ownership are now adequate.
- **FASE 2:** **Yes, after its prerequisites.** Ctrl+P precedence, missing-`afterprint` teardown tests and the real-iOS release gate address the material print risks.
- **FASE 3:** **No.** The manifest exports the wrong draft, concurrent writers can violate import atomicity, and pre-marker/quota recovery is incomplete.
- **FASE 4:** Still sound as a feasibility gate rather than an implementation plan.

VERDICT: REVISE
### Claude's response — Round 4

Fase 1 e 2 dichiarate rilasciabili, Fase 4 confermata come cancello. I sette bloccanti
residui riguardano tutti storage e dati, e sono stati **accolti per intero**: non c'era
niente da respingere, e uno era una mia incoerenza netta.

- **Chiave nuova per ogni archivio che cambia schema**, non solo per la bozza
  (`bp_recipes_v2`, `bp_events_v2`, `bp_settings_v2` oltre a `barmanProState_v8`). Il
  ragionamento della rev. 4 era giusto ma applicato a metà: bastava una scheda vecchia per
  riscrivere ricette o eventi migrati agli id. Codex ha confermato che così **non serve
  comunque alcun canale permanente fra schede** — la respinta del Round 3 regge, andava
  solo estesa.
- **Il manifest esportava ancora `barmanProState_v7`**: dopo il cambio di chiave i backup
  avrebbero salvato la bozza morta, e un import in *sostituisci* avrebbe riportato indietro
  dati vecchi. Corretto.
- **Precedenza della migrazione decisa adesso** invece di rimandata all'implementazione:
  vince `bp_recipes` con il suo nome, il contenuto vecchio in conflitto si conserva con nome
  suffissato e id nuovo, gli `customShots` orfani si uniscono. Non si scarta mai il lavoro
  dell'utente.
- **Eventi vecchi con ricette cancellate**: non se ne può inventare la definizione. Restano
  leggibili come fotografia, marcati incompleti, con ricalcolo e modifica bloccati finché
  l'utente non ricollega la ricetta. Meglio dirlo che ricalcolare in silenzio un totale
  sbagliato.
- **Staging per transazione** con spazzata degli orfani all'avvio: un crash *prima* del
  marcatore lasciava valori senza percorso di recupero, cioè una perdita di quota invisibile.
- **Prenotazione reale dello spazio** invece della stima, perché durante lo scambio valore
  vecchio e nuovo coesistono.
- **Gli scrittori della versione nuova si sospendono** mentre esiste il marcatore di import:
  annullare i salvataggi solo nella scheda che importa non ferma le altre. L'evento
  `storage`, che esiste già e non è un canale da mantenere, avvisa l'utente nell'altra
  scheda.

Codex ha inoltre accettato la respinta sugli hash dello staging: *"Exact read-back
comparison is sufficient once concurrent writers are blocked by the commit marker and old
schemas are isolated."*

Accolte anche le quattro rifiniture non bloccanti: soglia dell'85% e ricaduta per la
tastiera virtuale, soglie di contrasto dichiarate per il menù stampato (4,5:1, e 7:1 per i
nomi dei drink), politica dello slot di recupero, e la voce di rischio aggiornata ai quattro
archivi coinvolti invece del solo `customDrinks`.

## Round 5 — Codex (ultimo, MAX_ROUNDS=5)

Rev. 5 incorporates all seven Round 4 fixes coherently. One material cross-phase race remains.

### Remaining release blocker

**The import-marker guard is introduced too late.** FASE 3 says every new-version writer waits while the marker exists ([PLAN.md:389](/C:/Users/racca/OneDrive/Desktop/ALTRO/App_drink/barman-pro-open/PLAN.md:389)), but an already-open FASE 0–2 client cannot contain logic introduced in FASE 3 and writes the same `v8`/`v2` keys. During import it can therefore overwrite staged results; afterward its full settings write can erase new price overrides. Even a current client must not replay a suspended stale write after the marker disappears.

This is not ordinary same-version last-write-wins: phased deployment deliberately leaves older clients alive, and the common release gate does not require a concurrent previous-phase-tab/import test.

**One-line fix:** ship the reserved-marker guard and forward-compatible writers in FASE 0; when a marker clears, other tabs must discard pending snapshots and rehydrate before writing—alternatively bump every imported store again in FASE 3.

### Releaseability

- **FASE 0:** Yes.
- **FASE 1:** Yes after FASE 0.
- **FASE 2:** Yes after its prerequisites.
- **FASE 3:** No as written because a still-open previous-phase client can violate import atomicity and erase newly introduced fields.
- **FASE 4:** Sound as a feasibility gate.

All other remaining choices are implementation refinements appropriately covered by the stated tests and release gates.

VERDICT: REVISE
### Claude's response — Round 5

Un solo bloccante, accolto: la guardia del marcatore di import stava in Fase 3, ma il
rilascio a fasi lascia vivi di proposito i client vecchi. Una scheda ferma alla Fase 1 non
contiene codice introdotto in Fase 3 e scrive sulle stesse chiavi `v8`/`_v2`. La guardia si
sposta in **Fase 0** — dove tutti gli scrittori vengono comunque riscritti — insieme a due
proprietà che servono allo stesso scopo: alla scomparsa del marcatore lo scrittore **scarta
la propria fotografia in memoria e si riprende dallo storage** invece di riversare uno stato
vecchio, e le scritture sono **additive**, senza cancellare campi non riconosciuti.

## Esito dell'Atto 2

**MAX_ROUNDS=5 esaurito. L'ultimo verdetto formale è REVISE**, su questo unico punto, e la
correzione applicata in rev. 6 **non è stata rivista da Codex** — non restano round.

Non è però un disaccordo: la correzione è **quella che Codex stesso ha proposto**
("ship the reserved-marker guard and forward-compatible writers in FASE 0"), e la
condivido. Le altre quattro fasi erano già dichiarate rilasciabili nel Round 5:

| Fase | Round 5 |
|---|---|
| 0 | rilasciabile |
| 1 | rilasciabile dopo la 0 |
| 2 | rilasciabile dopo i prerequisiti |
| 3 | **no** — corretta in rev. 6, non ri-rivista |
| 4 | valida come cancello di fattibilità |

Chiusura dell'Atto 2: 5 round, ~40 rilievi, 5 respinti con motivo (4 dei quali Codex ha poi
accettato), 3 errori miei corretti da Codex (formula delle scorte, `viewport-fit=cover`,
i18n a runtime) e 2 errori miei trovati da me durante il grill (la CSP di Canva, il manifest
che esportava la bozza morta).

## Act 3 — Build

### Round 0 — passaggio di consegne

Il lancio di `codex exec` con accesso in scrittura e' stato **bloccato dal classificatore
della modalita' auto di Claude Code**, sia con `--yolo`
(`--dangerously-bypass-approvals-and-sandbox`) sia con la variante piu' stretta
`--full-auto` (`-s workspace-write`). Le run in sola lettura dei cinque round di review
erano passate: e' la capacita' di scrittura a essere rifiutata, non la singola bandiera.

Nessun tentativo di aggiramento. La cosa e' stata portata all'utente con tre strade
(costruisco io / lancia lui il comando / sblocca il permesso in settings). **Ha scelto che
costruisca Claude.** Il valore dell'Atto 2 resta acquisito: cinque round, ~40 rilievi, e la
specifica congelata che ne e' uscita.

Cancello di verifica invariato rispetto a quello che sarebbe stato chiesto a Codex:
42 golden **senza toccare un solo valore atteso**, 68 test preesistenti verdi,
`npm run check` verde, nessun cambiamento a schermo, niente commit senza approvazione.

### Round 1 — Claude build · Fase 0, fetta 1 di 3 (i18n per chiave)

Punti 11 e 12 della Fase 0. Fetta autoconsistente: non tocca calcolo ne' storage, quindi si
rilascia da sola.

**Difetto trovato durante il lavoro, non previsto dal piano.** `cambiaLingua()` traduceva
per posizione non solo i 4 bottoni azione (`abtn[0..3]`, gia' noto dal Round 1 di Codex) ma
anche `bsArr[0..1]` sui `.btn-secondary` e `rh3[0..2]` sulle `.result-section h3`. Le
sezioni dei risultati pero' sono **cinque**, e la terza e' l'intestazione dei fermentati:
`rh3[2]` la sovrascriveva con "Attrezzatura". Due sezioni si chiamavano uguale, in tutte e
7 le lingue. Verificato dal vivo prima di correggere:

    i=2  chiave risultatiFermentati  -> mostrato "Equipment"
    i=3  chiave risultatiAttrezzatura -> mostrato "Equipment"

Invisibile per mesi perche' `#block_fermentati` resta `display:none` finche' non metti vino
o birra nel menu, e nessun test guardava quel testo.

Tutti quegli elementi avevano gia' il proprio `data-i18n` nel markup: il blocco manuale era
ridondante, arrivava dopo il ciclo generico e ne cancellava il risultato insieme agli
`<span data-i18n>` figli. Rimosso per intero. Aggiunte le due chiavi mancanti alle
intestazioni alcolici/analcolici.

**Etichette di accessibilita'.** Zero `data-i18n-aria` nel progetto e 25 `aria-label` fissi
in italiano: chi naviga con uno screen reader in un'altra lingua si sentiva leggere
"Chiudi", "Passi", "Tema" in italiano. Aggiunto il ciclo runtime in `cambiaLingua()`, un
blocco `_ariaI18n` con 11 chiavi x 7 lingue, e agganciate le 25 etichette.

**Nulla cambia a schermo**, verificato: le cinque intestazioni tornano distinte e corrette,
i bottoni azione identici. Un dettaglio scoperto e sistemato: il markup del bottone
Condividi aveva `&#10148;` (U+27A4) mentre il JavaScript scriveva U+279C, e vinceva il
JavaScript; togliendo il blocco sarebbe comparsa una freccia diversa. Markup allineato a
cio' che si vedeva.

**Prova.** `npm run check` verde (363 chiavi x 7 lingue in parita'), **73 test verdi**: i 68
preesistenti piu' 5 nuovi in `tests/ui-i18n.spec.js`. I 42 golden passano **senza che sia
stato toccato un solo valore atteso**. I test nuovi sono stati verificati contro il codice
non corretto: **4 su 5 falliscono**, quindi bloccano davvero il difetto.
