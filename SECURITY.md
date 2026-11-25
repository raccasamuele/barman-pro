# Sicurezza

Grazie per voler segnalare un problema di sicurezza in Barman PRO.

## Versioni supportate

Barman PRO è un sito statico pubblicato da un solo ramo. Riceve correzioni
solo la versione in produzione su
[barmanpro.raccasamuele.it](https://barmanpro.raccasamuele.it/), cioè
l'ultimo stato del ramo `main`. Fork e copie self-hostate sono responsabilità
di chi le gestisce.

| Versione                     | Supportata |
| ---------------------------- | ---------- |
| `main` / sito in produzione  | ✅         |
| Versioni precedenti          | ❌         |

## Come segnalare una vulnerabilità

**Non aprire una issue pubblica** per un problema di sicurezza.

Scrivi a **[security@raccasamuele.it](mailto:security@raccasamuele.it)**
oppure usa la
[segnalazione privata di GitHub](https://github.com/raccasamuele/barman-pro/security/advisories/new).

Nella segnalazione, se puoi, indica:

- il tipo di problema (per esempio XSS, bypass della Content Security
  Policy, service worker che serve contenuti non attesi, dati esposti);
- la pagina o il file coinvolto e i passaggi per riprodurlo;
- l'impatto che ti aspetti e, se ce l'hai, una prova di concetto;
- browser e sistema operativo usati.

## Cosa aspettarti

- Conferma di ricezione entro **72 ore**.
- Una prima valutazione entro **7 giorni**.
- Aggiornamenti sullo stato fino alla correzione. Il progetto è mantenuto da
  una persona sola: i tempi sono un impegno sincero, non uno SLA.

Una volta pubblicata la correzione, se lo desideri, verrai citato nei
ringraziamenti. Chiediamo di non divulgare il problema prima che sia corretto
o prima di 90 giorni dalla segnalazione, se non diversamente concordato.

## Cosa rientra

Barman PRO non ha backend, account o database: tutti i dati restano nel
`localStorage` del dispositivo. Le segnalazioni più utili riguardano quindi
il codice che gira nel browser (`public/`), le intestazioni di sicurezza
(`public/_headers`), il service worker e il Worker di Cloudflare (`src/`).

Non rientrano: attacchi che richiedono l'accesso fisico al dispositivo
sbloccato, problemi di browser non aggiornati, segnalazioni automatiche senza
un impatto dimostrato, attacchi DoS/volumetrici e ingegneria sociale.

---

**English:** please do not open public issues for security problems. Email
[security@raccasamuele.it](mailto:security@raccasamuele.it) or use
[GitHub private vulnerability reporting](https://github.com/raccasamuele/barman-pro/security/advisories/new).
You will get an acknowledgement within 72 hours.
