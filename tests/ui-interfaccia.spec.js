import {test, expect} from '@playwright/test';
import {openApp} from './helpers.js';

for (const width of [375, 1400]) {
  test.describe(`Interfaccia · ${width}px`, () => {
    test.use({viewport:{width,height:900}});

    test('il guidato copre la testata e resta raggiungibile da tastiera', async ({page}) => {
      await openApp(page);
      await page.locator('.bph-hero').click();
      await page.locator('#bp-welcome [data-do="bpCfgStart"]').click();
      await expect(page.locator('#bp-config')).toBeVisible();
      await expect.poll(() => page.evaluate(() => {
        const r=document.querySelector('#bp-config .bpc-close').getBoundingClientRect();
        return !!document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)?.closest('#bp-config');
      })).toBe(true);
      await page.keyboard.press('Escape');
      await expect(page.locator('#bp-config')).toBeHidden();
    });

    test('i fogli salgono dal bordo su telefono e sono centrati su desktop', async ({page}) => {
      await openApp(page);
      await page.locator('[data-sezione="altro"]').click();
      await page.locator('#bp-altro [data-arg="privacy"]').click();
      await expect(page.locator('#bp-info')).toBeVisible();
      await expect.poll(() => page.locator('#bp-info .bpc-shell').evaluate(e => {
        const r=e.getBoundingClientRect();
        return innerWidth<900 ? Math.abs(r.bottom-innerHeight) : Math.abs((r.top+r.bottom)/2-innerHeight/2);
      })).toBeLessThan(2);
      await page.keyboard.press('Escape');
      await expect(page.locator('#bp-info')).toBeHidden();
    });

    test('a fine lista la barra lascia raggiungere tutte le voci', async ({page}) => {
      await openApp(page);
      await page.evaluate(() => {bpMenuAggiungi('Negroni','drink');bpMenuAggiungi('Gin Tonic','drink');vaiAStep('risultati');});
      const last=page.locator('#risultati li.voce-tocca:visible').last();
      await last.scrollIntoViewIfNeeded();
      await page.evaluate(() => window.scrollTo(0,document.body.scrollHeight));
      const r=await page.evaluate(() => {
        const all=[...document.querySelectorAll('#risultati li.voce-tocca')].filter(e=>e.getClientRects().length);
        const bar=document.querySelector('.bp-lista-azione');
        return {last:all.at(-1).getBoundingClientRect().bottom,bar:bar.getBoundingClientRect().top,bottom:bar.getBoundingClientRect().bottom,expected:innerWidth<900?innerHeight-64:innerHeight,position:getComputedStyle(bar).position};
      });
      expect(r.last).toBeLessThanOrEqual(r.bar);
      expect(r.position).toBe('fixed');
      expect(Math.abs(r.bottom-r.expected)).toBeLessThan(1);
      await last.click();
      await expect(page.locator('#bp-voce')).toBeVisible();
    });

    test('il cursore segue la scelta reale senza aggiungere bottoni', async ({page}) => {
      await openApp(page);
      await page.evaluate(()=>vaiAStep('step-setup'));
      const group=page.locator('#bp-servizio-seg');
      await group.locator('button').nth(1).click();
      await expect(group.locator('button').nth(1)).toHaveAttribute('aria-checked','true');
      await expect.poll(() => group.evaluate(e=>{
        const s=getComputedStyle(e,'::before'), a=e.querySelector('[aria-checked="true"]');
        const x=new DOMMatrixReadOnly(s.transform).m41;
        return Math.abs(x-a.offsetLeft);
      })).toBeLessThan(1);
      await expect(group.locator('button')).toHaveCount(2);
    });

    test('la voce Amari mostra la libreria della rotta esistente', async ({page}) => {
      await openApp(page);
      await page.locator('.bp-tab[data-sezione="altro"]').click();
      await page.locator('#bp-altro [data-arg="altro/amari"]').click();
      await expect(page.locator('#bp-library')).toBeVisible();
      await expect(page.locator('#bpl-wrap')).not.toBeEmpty();
    });
  });
}
