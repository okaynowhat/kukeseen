import { chromium, devices } from 'playwright';
const b = await chromium.launch(); const ctx = await b.newContext({ ...devices['iPhone 13'], locale: 'et-EE' }); const p = await ctx.newPage();
p.on('pageerror', e => console.log('pageerror', e.message)); p.on('console', m => { if (m.type() === 'error') console.log('console', m.text()); });
await p.goto('http://localhost:8793/', { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
await p.evaluate(() => { window.KS.map.setView([58.2705, 26.8709], 15); window.KS.setHab(true); }); await p.waitForTimeout(5000);
const info = await p.evaluate(() => {
  const L = window.L, map = window.KS.map; let hit = null, n = 0;
  window.KS.HAB.group.eachLayer(cell => cell.eachLayer(l => { n++; if (!hit && l.getBounds && l.getBounds().contains([58.2705, 26.8709])) hit = l; }));
  if (!hit) { window.KS.HAB.group.eachLayer(cell => cell.eachLayer(l => { if (!hit && l.options.interactive !== false) hit = l; })); }
  if (!hit) return { n, hit: false };
  const c = hit.getBounds().getCenter(); map.setView(c, 16); hit.fire('click', { latlng: c, originalEvent: new MouseEvent('click') });
  return { n, hit: true, props: hit.feature.properties, center: [c.lat, c.lng] };
});
console.log(JSON.stringify(info));
await p.waitForTimeout(800);
const popup = await p.evaluate(() => { const e = document.querySelector('.hab-popup .leaflet-popup-content'); return e ? e.innerText : null; }); console.log('popup:', popup);
await p.screenshot({ path: 'docs/screenshots/light-16-stand-popup.png' });
await b.close();
