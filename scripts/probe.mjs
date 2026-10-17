import { chromium, devices } from 'playwright';
const b = await chromium.launch(); const ctx = await b.newContext({ ...devices['iPhone 13'], geolocation: { latitude: 58.2835, longitude: 26.889, accuracy: 9 }, permissions: ['geolocation'] }); const p = await ctx.newPage();
p.on('console', m => console.log('console', m.type(), m.text().slice(0, 300))); p.on('pageerror', e => console.log('pageerror', e.message));
await p.goto('http://localhost:8793/', { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
await p.click('.tab[data-tab="spots"]'); await p.waitForTimeout(500);
const info = await p.evaluate(() => ({ sheetClass: document.querySelector('#sheet').className, sheetDisplay: getComputedStyle(document.querySelector('#sheet')).display, bodyHtml: document.querySelector('#sheetBody').innerHTML.slice(0, 400), spots: document.querySelectorAll('.spot').length, pos: window.KS && window.KS.S.pos, filter: window.KS && [...window.KS.S.filterTiers], maxKm: window.KS && window.KS.S.maxKm }));
console.log(JSON.stringify(info, null, 1)); await p.screenshot({ path: 'docs/screenshots/probe.png' }); await b.close();
