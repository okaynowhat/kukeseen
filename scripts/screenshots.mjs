// Screenshot and smoke-test the PWA with Playwright. Usage: node scripts/screenshots.mjs [baseUrl]
import { chromium, devices } from 'playwright';
import fs from 'node:fs';
const base = process.argv[2] || 'http://localhost:8793/';
const out = 'docs/screenshots'; fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const errors = [];
async function run(scheme) {
  const ctx = await browser.newContext({ ...devices['iPhone 13'], locale: 'et-EE', colorScheme: scheme, geolocation: { latitude: 58.2835, longitude: 26.8890, accuracy: 9 }, permissions: ['geolocation'] });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`[${scheme}] console: ${m.text()}`); });
  page.on('pageerror', (e) => errors.push(`[${scheme}] pageerror: ${e.message}`));
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const shot = (n) => page.screenshot({ path: `${out}/${scheme}-${n}.png` });
  await shot('01-map');
  await page.click('#btnLocate'); await page.waitForTimeout(1200); await shot('02-located');
  await page.click('.tab[data-tab="spots"]'); await page.waitForTimeout(500); await shot('03-spots');
  await page.click('.spot >> nth=0'); await page.waitForTimeout(1200); await shot('04-detail');
  await page.click('text=Kompass kohani'); await page.waitForTimeout(1200); await shot('05-compass');
  await page.click('#cmpClose');
  await page.click('.tab[data-tab="finds"]'); await page.waitForTimeout(300); await shot('06-finds-empty');
  await page.click('text=Uus leid'); await page.waitForTimeout(1500); await page.fill('#fNotes', 'Test: kolm nööpi sambla sees'); await shot('07-find-form');
  await page.click('text=Salvesta leid'); await page.waitForTimeout(600); await shot('08-finds');
  await page.click('.tab[data-tab="learn"]'); await page.waitForTimeout(300); await shot('09-learn');
  await page.click('.lesson-row >> nth=0'); await page.waitForTimeout(300); await shot('10-lesson');
  await page.click('#paneLearn >> text=Tagasi'); await page.click('#paneLearn >> text=Seenesilma test'); await page.waitForTimeout(300); await page.click('.quiz .opt >> nth=1'); await page.waitForTimeout(300); await shot('11-quiz');
  await page.click('.tab[data-tab="season"]'); await page.waitForTimeout(4000); await shot('12-season');
  await page.click('.tab[data-tab="map"]'); await page.waitForTimeout(300); await page.click('#btnAbout'); await page.waitForTimeout(300); await shot('13-about');
  await page.click('.tab[data-tab="map"]'); await page.click('#btnLayers'); await page.waitForTimeout(200); await page.click('text=Maa-amet kaart'); await page.waitForTimeout(2500); await shot('14-maaamet');
  const sw = await page.evaluate(async () => { const r = await navigator.serviceWorker.getRegistration(); return r ? (r.active ? 'active' : 'installing') : 'none'; });
  console.log(`[${scheme}] service worker: ${sw}`);
  await ctx.close();
}
await run('light'); await run('dark');
// desktop
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, locale: 'en-GB', colorScheme: 'light' });
const page = await ctx.newPage(); await page.goto(base, { waitUntil: 'networkidle' }); await page.waitForTimeout(800); await page.screenshot({ path: `${out}/desktop-map.png` }); await ctx.close();
await browser.close();
if (errors.length) { console.log('ERRORS:'); errors.forEach((e) => console.log(e)); process.exit(1); } else console.log('no console errors');
