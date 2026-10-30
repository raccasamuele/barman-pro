import { test, expect } from '@playwright/test';
import { openApp } from './helpers.js';

/**
 * Il font dichiarato deve essere il font reso.
 *
 * Per tutta la vita del progetto `--bp-font` ha chiesto 'Manrope', sei
 * pagine hanno fatto il preload dei due woff2 e sw.js li ha precacati —
 * mentre in `app.css` non c'era **nessun** @font-face. Senza dichiarazione
 * il nome vale solo per chi ha Manrope installato nel sistema: tutti gli
 * altri vedevano system-ui, e scaricavano 40 KB di font per non usarli.
 * Nessun test se n'era accorto perche' nessuno guardava la tipografia.
 *
 * ⚠️ Il controllo comodo mente. `document.fonts.check('16px Manrope')`
 *    risponde **true** anche a faccia assente — verificato in produzione
 *    sul difetto vero. Per questo qui non si usa: si guarda il registro
 *    delle facce, e si MISURA una riga contro una famiglia inventata.
 *
 * ⚠️ E il registro va guardato per primo, non la misura. Se la macchina che
 *    esegue i test avesse Manrope installato nel sistema, la sola misura
 *    passerebbe **anche senza @font-face**: sarebbe un test verde per il
 *    motivo sbagliato, che e' il difetto che questo repository ha gia'
 *    pagato sei volte.
 */
test.describe('Tipografia · Poppins e Manrope sono dichiarati e vengono resi', () => {

  test('il documento registra almeno una faccia Manrope servita da noi', async ({ page }) => {
    await openApp(page);

    const facce = await page.evaluate(async () => {
      await document.fonts.ready;
      const out = [];
      document.fonts.forEach(f => out.push({ family: f.family, status: f.status }));
      return { totale: document.fonts.size, facce: out };
    });

    // Senza @font-face il registro e' VUOTO, comunque sia messa la macchina.
    expect(facce.totale, 'nessuna @font-face dichiarata in app.css').toBeGreaterThan(0);
    expect(
      facce.facce.some(f => f.family.replace(/['"]/g, '') === 'Manrope'),
      'il registro non contiene nessuna faccia Manrope'
    ).toBe(true);
  });

  test('una riga in Manrope non misura come una famiglia inesistente', async ({ page }) => {
    await openApp(page);

    const m = await page.evaluate(async () => {
      await document.fonts.load('700 40px Manrope');
      await document.fonts.ready;

      const misura = (famiglia) => {
        const s = document.createElement('span');
        s.style.cssText = 'position:absolute;left:-9999px;white-space:nowrap;font:700 40px ' + famiglia;
        s.textContent = 'Negroni Spritz Daiquiri';
        document.body.appendChild(s);
        const w = s.getBoundingClientRect().width;
        s.remove();
        return w;
      };

      return {
        manrope: misura('Manrope'),
        inesistente: misura('ZzqxFamigliaInesistente'),
        // il ripiego dichiarato nella pila di --bp-font
        systemui: misura('system-ui'),
      };
    });

    expect(m.manrope).toBeGreaterThan(0);
    expect(
      Math.abs(m.manrope - m.inesistente),
      `Manrope misura ${m.manrope}px, esattamente come una famiglia che non esiste `
      + `(${m.inesistente}px): la faccia non e' stata caricata`
    ).toBeGreaterThan(1);
  });

  test('le facce dichiarano un asse di pesi, e i due sottoinsiemi sono separati', async ({ page }) => {
    await openApp(page);

    /* ⚠️ La prima stesura di questo test misurava una riga a peso 400 e una a
       700 e pretendeva che differissero. Passava **anche senza @font-face**:
       il ripiego ha pesi veri suoi, quindi 400 e 700 misurano diverso comunque.
       Era un test verde per il motivo sbagliato — visto fallire? no: visto
       PASSARE sul codice rotto, che e' lo stesso difetto letto dall'altro lato.
       La misura non sa distinguere "asse variabile" da "due pesi del ripiego":
       quello lo sa solo il descrittore della faccia. */
    const facce = await page.evaluate(async () => {
      await document.fonts.ready;
      const out = [];
      document.fonts.forEach(f => {
        if (f.family.replace(/['"]/g, '') === 'Manrope') {
          out.push({ weight: f.weight, unicodeRange: f.unicodeRange });
        }
      });
      return out;
    });

    // Un file variabile per l'asse dei pesi: il descrittore e' un intervallo
    // ("200 800"), non un numero solo. Se fosse un numero, i pesi fuori da
    // quello verrebbero sintetizzati dal browser invece che disegnati.
    expect(facce.length).toBeGreaterThan(0);
    for (const f of facce) {
      expect(f.weight, `la faccia dichiara un peso singolo (${f.weight}), non un intervallo`)
        .toMatch(/^\d+\s+\d+$/);
    }

    // latin ed extended sono due file distinti: chi scrive solo latino non
    // deve scaricare anche l'altro.
    const intervalli = new Set(facce.map(f => f.unicodeRange));
    expect(intervalli.size, 'i sottoinsiemi non sono separati da unicode-range').toBeGreaterThan(1);
  });
  test('il documento registra almeno una faccia Poppins servita da noi', async ({ page }) => {
    await openApp(page);

    const facce = await page.evaluate(async () => {
      await document.fonts.ready;
      const out = [];
      document.fonts.forEach(f => out.push({ family: f.family, status: f.status }));
      return { totale: document.fonts.size, facce: out };
    });

    // Senza @font-face il registro e' VUOTO, comunque sia messa la macchina.
    expect(facce.totale, 'nessuna @font-face dichiarata in app.css').toBeGreaterThan(0);
    expect(
      facce.facce.some(f => f.family.replace(/['"]/g, '') === 'Poppins'),
      'il registro non contiene nessuna faccia Poppins'
    ).toBe(true);
  });

  test('una riga in Poppins non misura come una famiglia inesistente', async ({ page }) => {
    await openApp(page);

    const m = await page.evaluate(async () => {
      await document.fonts.load('700 40px Poppins');
      await document.fonts.ready;

      const misura = (famiglia) => {
        const s = document.createElement('span');
        s.style.cssText = 'position:absolute;left:-9999px;white-space:nowrap;font:700 40px ' + famiglia;
        s.textContent = 'Negroni Spritz Daiquiri';
        document.body.appendChild(s);
        const w = s.getBoundingClientRect().width;
        s.remove();
        return w;
      };

      return {
        poppins: misura('Poppins'),
        inesistente: misura('ZzqxFamigliaInesistente'),
        // il ripiego dichiarato nella pila di --bp-font
        systemui: misura('system-ui'),
      };
    });

    expect(m.poppins).toBeGreaterThan(0);
    expect(
      Math.abs(m.poppins - m.inesistente),
      `Poppins misura ${m.poppins}px, esattamente come una famiglia che non esiste `
      + `(${m.inesistente}px): la faccia non e' stata caricata`
    ).toBeGreaterThan(1);
  });


  test('Poppins ha tutti i pesi locali, con sottoinsiemi separati', async ({page}) => {
    await openApp(page);
    const faces = await page.evaluate(() => [...document.fonts].filter(f => f.family.replace(/['"]/g,'') === 'Poppins').map(f => ({weight:f.weight,range:f.unicodeRange})));
    for (const weight of ['400','500','600','700']) {
      const ranges = new Set(faces.filter(f => f.weight === weight).map(f => f.range));
      expect(ranges.size, 'sottoinsiemi Poppins del peso ' + weight).toBe(2);
    }
  });

  test('le cifre Manrope si misurano tabulari e i campi numerici lo usano', async ({page}) => {
    await openApp(page);
    await page.evaluate(() => vaiAStep('step-setup'));
    const m = await page.evaluate(async () => {
      await document.fonts.load('600 100px Manrope');
      await document.fonts.load('600 100px Poppins');
      const width = (family,digit) => {
        const e = document.createElement('span');
        e.style.cssText = 'position:absolute;font:600 100px '+family+';font-variant-numeric:tabular-nums;white-space:nowrap';
        e.textContent=digit; document.body.append(e); const w=e.getBoundingClientRect().width; e.remove(); return w;
      };
      return {manrope:[...'0123456789'].map(n=>width('Manrope',n)), poppins:[...'0123456789'].map(n=>width('Poppins',n)), field:getComputedStyle(document.getElementById('ospiti')).fontFamily, body:getComputedStyle(document.body).fontFamily};
    });
    // In the shipped variable font only "6" differs by 0.15625px at 100px.
    // At the actual 18px UI size this is below 0.03px, versus Poppins' 5.38px.
    expect(Math.max(...m.manrope)-Math.min(...m.manrope)).toBeLessThan(.25);
    expect(Math.max(...m.poppins)-Math.min(...m.poppins)).toBeGreaterThan(1);
    expect(m.field).toMatch(/^Manrope/);
    expect(m.body).toMatch(/^Poppins/);
    await page.evaluate(() => { bpMenuAggiungi('Negroni', 'drink'); vaiAStep('risultati'); });
    const roles = await page.evaluate(() => {
      const font = selector => getComputedStyle(document.querySelector(selector)).fontFamily;
      return {live:font('#stima-live-tot'),action:font('#bp-lista-tot'),qty:font('#lista_alcolici li strong'),price:font('#lista_alcolici li .costo-voce'),total:font('#budget-amount')};
    });
    for (const key of ['live','action','qty','price']) expect(roles[key], key).toMatch(/^Manrope/);
    expect(roles.total).toMatch(/^Poppins/);
    await page.locator('#lista_alcolici li.voce-tocca').first().click();
    expect(await page.locator('#bp-voce .mod-prezzo').evaluate(e => getComputedStyle(e).fontFamily)).toMatch(/^Manrope/);
  });
});
