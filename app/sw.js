// Kukeseen service worker: app shell precache + runtime tile cache.
const VERSION = 'ks-v0.1.0';
const SHELL = `${VERSION}-shell`;
const TILES = 'ks-tiles';
const TILE_HOSTS = ['tile.openstreetmap.org', 'tiles.maaamet.ee'];
const ASSETS = [
  './', './index.html', './manifest.webmanifest',
  './css/app.css', './js/app.js', './js/data.js', './js/i18n.js', './js/lessons.js',
  './vendor/leaflet/leaflet.js', './vendor/leaflet/leaflet.css',
  './vendor/leaflet/images/marker-icon.png', './vendor/leaflet/images/marker-icon-2x.png', './vendor/leaflet/images/marker-shadow.png', './vendor/leaflet/images/layers.png', './vendor/leaflet/images/layers-2x.png',
  './fonts/fonts.css',
  './fonts/alegreya-sans-400-normal-latin.woff2', './fonts/alegreya-sans-400-normal-latin-ext.woff2',
  './fonts/alegreya-sans-500-normal-latin.woff2', './fonts/alegreya-sans-500-normal-latin-ext.woff2',
  './fonts/alegreya-sans-700-normal-latin.woff2', './fonts/alegreya-sans-700-normal-latin-ext.woff2',
  './fonts/alegreya-sans-400-italic-latin.woff2', './fonts/alegreya-sans-400-italic-latin-ext.woff2',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== SHELL && k !== TILES).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', (e) => { if (e.data === 'skipWaiting') self.skipWaiting(); });

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (TILE_HOSTS.includes(url.hostname)) {
    // Tiles: cache first, then network, store on success. Opaque responses are fine for images.
    e.respondWith(caches.open(TILES).then(async (cache) => {
      const hit = await cache.match(e.request);
      if (hit) return hit;
      try {
        const res = await fetch(e.request);
        if (res && (res.ok || res.type === 'opaque')) cache.put(e.request, res.clone());
        return res;
      } catch (err) {
        return new Response('', { status: 504, statusText: 'offline tile' });
      }
    }));
    return;
  }
  if (url.hostname.includes('open-meteo.com')) {
    // Weather: network first, fall back to cache.
    e.respondWith(fetch(e.request).then((res) => { const copy = res.clone(); caches.open(SHELL).then((c) => c.put(e.request, copy)); return res; }).catch(() => caches.match(e.request)));
    return;
  }
  if (url.origin === self.location.origin) {
    e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request).then((res) => { if (res.ok) { const copy = res.clone(); caches.open(SHELL).then((c) => c.put(e.request, copy)); } return res; })));
  }
});
