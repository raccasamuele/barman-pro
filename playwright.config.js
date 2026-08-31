import { defineConfig, devices } from '@playwright/test';

/**
 * L'app viene servita davvero, e i test girano contro quella — non contro
 * copie delle sue funzioni. `calcolaSpesa()` legge e muta il DOM: estrarla
 * in un modulo Node produrrebbe un duplicato libero di divergere dal codice
 * che gli utenti eseguono.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,

  // La rigenerazione del golden DEVE girare su un worker solo: ogni worker ha
  // una propria copia del modulo e scriverebbe nell'afterAll soltanto i casi
  // che ha eseguito lui, lasciando sul disco un frammento invece del golden
  // completo (bug osservato: "golden rigenerato: 3 casi", poi "1 casi").
  //
  // Altrimenti massimo 4 worker. Ogni worker apre un Chromium che carica una
  // pagina da ~536 KB con sette dizionari di traduzioni: con il numero di
  // worker di default la macchina va in contesa e i test superano il timeout
  // per esaurimento di risorse, non per un difetto dell'app. Con 4 la suite
  // e' stabile e non piu' lenta.
  workers: process.env.UPDATE_GOLDEN === '1' ? 1 : 4,
  reporter: process.env.CI ? [['github'], ['list']] : [['list']],

  webServer: {
    command: 'npx --yes http-server public -p 8099 -c-1 --silent',
    url: 'http://127.0.0.1:8099/index.html',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },

  use: {
    baseURL: 'http://127.0.0.1:8099',
    trace: 'retain-on-failure',
    // Il service worker va disattivato ovunque tranne nella suite che lo
    // testa apposta: con il SW attivo un golden puo' misurare asset cachati
    // da una fase precedente, cioe' passare verificando il passato.
    serviceWorkers: 'block',
  },

  projects: [
    {
      name: 'golden',
      testMatch: /golden-.*\.spec\.js/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'ui',
      testMatch: /ui-.*\.spec\.js/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      // Qui il service worker e' il soggetto del test, non un disturbo.
      name: 'pwa',
      testMatch: /pwa-.*\.spec\.js/,
      use: { ...devices['Desktop Chrome'], serviceWorkers: 'allow' },
    },
  ],
});
