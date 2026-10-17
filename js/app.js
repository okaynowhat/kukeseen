/* Kukeseen app logic. Vanilla JS, no build step. */
(function () {
  'use strict';
  const D = window.KS_DATA, I18N = window.KS_I18N, LESSONS = window.KS_LESSONS, QUIZ = window.KS_QUIZ;
  const VERSION = '0.1.0';
  const $ = (s, r) => (r || document).querySelector(s);
  const el = (tag, attrs, children) => {
    const n = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') n.className = attrs[k];
      else if (k === 'html') n.innerHTML = attrs[k];
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== undefined && attrs[k] !== null) n.setAttribute(k, attrs[k]);
    }
    (children || []).forEach((c) => { if (c === null || c === undefined) return; n.append(c.nodeType ? c : document.createTextNode(String(c))); });
    return n;
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---------- state ----------
  const S = {
    lang: localStorage.getItem('ks.lang') || ((navigator.language || 'et').startsWith('et') ? 'et' : 'en'),
    theme: localStorage.getItem('ks.theme') || 'auto',
    home: JSON.parse(localStorage.getItem('ks.home') || 'null') || D.home,
    layer: localStorage.getItem('ks.layer') || 'osm',
    tab: 'map', sheet: 'peek', selected: null, pos: null, heading: null, headingSrc: null, follow: false,
    filterTiers: new Set(['A', 'B', 'C', 'D']), maxKm: 60, finds: [], compassTarget: null, watchId: null,
    deferredInstall: null
  };
  const T = () => I18N[S.lang];
  const tr = (obj) => (obj && typeof obj === 'object' && (obj.et || obj.en)) ? (obj[S.lang] || obj.et || obj.en) : obj;

  // ---------- geo utils ----------
  const R = 6371000;
  const rad = (d) => d * Math.PI / 180, deg = (r) => r * 180 / Math.PI;
  function dist(a, b) { const dLat = rad(b.lat - a.lat), dLon = rad(b.lon - a.lon); const x = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(x)); }
  function bearing(a, b) { const y = Math.sin(rad(b.lon - a.lon)) * Math.cos(rad(b.lat)); const x = Math.cos(rad(a.lat)) * Math.sin(rad(b.lat)) - Math.sin(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.cos(rad(b.lon - a.lon)); return (deg(Math.atan2(y, x)) + 360) % 360; }
  function fmtDist(m) { if (m < 1000) return `${Math.round(m)} ${T().unitsM}`; if (m < 10000) return `${(m / 1000).toFixed(1)} km`; return `${Math.round(m / 1000)} km`; }
  const fmtCoord = (lat, lon) => `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
  const origin = () => S.pos || S.home;

  // ---------- toast ----------
  let toastTimer;
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2600); }

  // ---------- theme & lang ----------
  function applyTheme() { if (S.theme === 'auto') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', S.theme); }
  function applyLang() {
    document.documentElement.lang = S.lang;
    document.querySelectorAll('[data-t]').forEach((n) => { const v = n.getAttribute('data-t').split('.').reduce((o, k) => (o ? o[k] : undefined), T()); if (typeof v === 'string') n.textContent = v; });
    $('#btnLayers').setAttribute('aria-label', T().layers); $('#btnLocate').setAttribute('aria-label', T().locate); $('#btnFollow').setAttribute('aria-label', T().follow);
    renderAll();
  }

  // ---------- IndexedDB for finds ----------
  const DB = {
    open() { return new Promise((res, rej) => { const r = indexedDB.open('kukeseen', 1); r.onupgradeneeded = () => { r.result.createObjectStore('finds', { keyPath: 'id' }); }; r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); }); },
    async all() { const db = await this.open(); return new Promise((res) => { const q = db.transaction('finds').objectStore('finds').getAll(); q.onsuccess = () => res(q.result || []); q.onerror = () => res([]); }); },
    async put(f) { const db = await this.open(); return new Promise((res) => { const tx = db.transaction('finds', 'readwrite'); tx.objectStore('finds').put(f); tx.oncomplete = res; }); },
    async del(id) { const db = await this.open(); return new Promise((res) => { const tx = db.transaction('finds', 'readwrite'); tx.objectStore('finds').delete(id); tx.oncomplete = res; }); }
  };

  // ---------- map ----------
  let map, spotLayer, findLayer, userMarker, accCircle, homeMarker, line, baseLayers = {}, currentBase;
  const ATTR_OSM = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  const ATTR_MA = '&copy; <a href="https://geoportaal.maaamet.ee/">Maa-amet</a>';
  function initMap() {
    map = L.map('map', { zoomControl: false, attributionControl: true, maxZoom: 18, worldCopyJump: false }).setView([S.home.lat, S.home.lon], 11);
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);
    baseLayers.osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: ATTR_OSM });
    baseLayers.kaart = L.tileLayer('https://tiles.maaamet.ee/tm/tms/1.0.0/kaart@GMC/{z}/{x}/{y}.png', { tms: true, maxZoom: 18, minZoom: 4, attribution: ATTR_MA });
    baseLayers.foto = L.tileLayer('https://tiles.maaamet.ee/tm/tms/1.0.0/foto@GMC/{z}/{x}/{y}.png', { tms: true, maxZoom: 18, minZoom: 4, attribution: ATTR_MA });
    baseLayers.hybriid = L.tileLayer('https://tiles.maaamet.ee/tm/tms/1.0.0/hybriid@GMC/{z}/{x}/{y}.png', { tms: true, maxZoom: 18, minZoom: 4, attribution: ATTR_MA });
    setBase(S.layer);
    spotLayer = L.layerGroup().addTo(map);
    findLayer = L.layerGroup().addTo(map);
    homeMarker = L.marker([S.home.lat, S.home.lon], { icon: L.divIcon({ className: 'home-pin', html: '⌂', iconSize: [24, 24], iconAnchor: [12, 12] }), title: T().homeName }).addTo(map);
    homeMarker.bindTooltip(() => T().homeName);
    renderSpotMarkers();
    map.on('click', () => { closeMenus(); });
    map.on('dragstart', () => { if (S.follow) { S.follow = false; $('#btnFollow').classList.remove('active'); } });
    map.on('contextmenu', (e) => { openFindForm({ lat: e.latlng.lat, lon: e.latlng.lng, acc: null }); });
  }
  function setBase(key) { if (currentBase) map.removeLayer(currentBase); currentBase = baseLayers[key] || baseLayers.osm; currentBase.addTo(map); S.layer = key; localStorage.setItem('ks.layer', key); }
  function pinSvg(tier, size) {
    const color = { A: '#D9A21B', B: '#7A4A1E', C: '#5B7F4A', D: '#8A948B' }[tier];
    const ink = tier === 'A' ? '#2B2208' : '#fff';
    return `<svg width="${size}" height="${size * 1.25}" viewBox="0 0 32 40"><path d="M16 39C16 39 3 24 3 14a13 13 0 0 1 26 0c0 10-13 25-13 25z" fill="${color}" stroke="rgba(0,0,0,.25)"/><text x="16" y="19" text-anchor="middle" font-family="Alegreya Sans, sans-serif" font-weight="700" font-size="14" fill="${ink}">${tier}</text></svg>`;
  }
  function spotIcon(spot, selected) { const size = selected ? 34 : (spot.tier === 'A' ? 28 : 24); return L.divIcon({ className: 'ks-marker' + (selected ? ' sel' : ''), html: pinSvg(spot.tier, size), iconSize: [size, size * 1.25], iconAnchor: [size / 2, size * 1.25], popupAnchor: [0, -size] }); }
  const markers = {};
  function renderSpotMarkers() {
    spotLayer.clearLayers();
    D.spots.filter(visible).forEach((s) => {
      const m = L.marker([s.lat, s.lon], { icon: spotIcon(s, S.selected === s.id), title: tr(s.name) }).addTo(spotLayer);
      m.on('click', () => selectSpot(s.id, { pan: false }));
      if (s.acc && s.acc >= 300) L.circle([s.lat, s.lon], { radius: s.acc, color: '#8A948B', weight: 1, dashArray: '4 4', fillOpacity: .05, interactive: false }).addTo(spotLayer);
      markers[s.id] = m;
    });
  }
  function renderFindMarkers() {
    findLayer.clearLayers();
    S.finds.forEach((f) => {
      const m = L.marker([f.lat, f.lon], { icon: L.divIcon({ className: 'ks-marker', html: `<svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" fill="#F0B92E" stroke="#2B2208" stroke-width="1"/></svg>`, iconSize: [26, 26], iconAnchor: [13, 13] }), title: f.notes || T().finds.title });
      m.on('click', () => { setTab('finds'); setTimeout(() => { const n = document.getElementById('find-' + f.id); if (n) n.scrollIntoView({ block: 'center' }); }, 50); });
      m.addTo(findLayer);
    });
  }
  function visible(s) { if (!S.filterTiers.has(s.tier)) return false; return dist(origin(), s) / 1000 <= S.maxKm; }
  function updateUserMarker() {
    if (!S.pos) return;
    const ll = [S.pos.lat, S.pos.lon];
    if (!userMarker) {
      userMarker = L.marker(ll, { icon: L.divIcon({ className: '', html: '<div class="user-dot"></div>', iconSize: [18, 18], iconAnchor: [9, 9] }), zIndexOffset: 1000, title: T().you }).addTo(map);
      accCircle = L.circle(ll, { radius: S.pos.acc || 20, color: '#3E6F8E', weight: 1, fillOpacity: .12, interactive: false }).addTo(map);
    } else { userMarker.setLatLng(ll); accCircle.setLatLng(ll).setRadius(S.pos.acc || 20); }
    const dot = userMarker.getElement() && userMarker.getElement().querySelector('.user-dot');
    if (dot) { if (S.heading != null) { dot.classList.add('heading'); dot.style.transform = `rotate(${S.heading}deg)`; } else dot.classList.remove('heading'); }
    if (S.follow) map.panTo(ll, { animate: true });
    drawLine();
  }
  function drawLine() {
    if (line) { map.removeLayer(line); line = null; }
    const s = D.spots.find((x) => x.id === S.selected);
    if (s && S.pos) line = L.polyline([[S.pos.lat, S.pos.lon], [s.lat, s.lon]], { color: '#D9A21B', weight: 2, dashArray: '6 6', interactive: false }).addTo(map);
  }

  // ---------- geolocation ----------
  function startWatch(opts) {
    if (!navigator.geolocation) { toast(T().gpsDenied); return; }
    if (S.watchId != null) return;
    S.watchId = navigator.geolocation.watchPosition((p) => {
      const prev = S.pos;
      S.pos = { lat: p.coords.latitude, lon: p.coords.longitude, acc: p.coords.accuracy, t: Date.now() };
      if (p.coords.heading != null && !Number.isNaN(p.coords.heading) && p.coords.speed > 0.7) { S.heading = p.coords.heading; S.headingSrc = 'gps'; }
      else if (prev && S.headingSrc !== 'compass' && dist(prev, S.pos) > 6) { S.heading = bearing(prev, S.pos); S.headingSrc = 'gps'; }
      updateUserMarker(); renderSheet(); renderCompass();
      if (opts && opts.center && !opts.done) { opts.done = true; map.setView([S.pos.lat, S.pos.lon], Math.max(map.getZoom(), 14)); }
    }, (err) => { toast(err.code === 1 ? T().gpsDenied : T().gpsWait); S.watchId = null; }, { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 });
  }
  function locate() { if (S.pos) { map.setView([S.pos.lat, S.pos.lon], Math.max(map.getZoom(), 14)); } else { startWatch({ center: true }); setTimeout(() => { if (!S.pos) toast(T().gpsWait); }, 4000); } }

  // ---------- compass heading ----------
  let orientationBound = false;
  function onOrientation(e) {
    let h = null;
    if (typeof e.webkitCompassHeading === 'number') h = e.webkitCompassHeading;
    else if (e.absolute && typeof e.alpha === 'number') h = (360 - e.alpha) % 360;
    else if (typeof e.alpha === 'number' && e.absolute !== false) h = (360 - e.alpha) % 360;
    if (h == null) return;
    const so = (screen.orientation && screen.orientation.angle) || window.orientation || 0;
    S.heading = (h + so + 360) % 360; S.headingSrc = 'compass';
    renderCompass(); if (userMarker) updateUserMarker();
  }
  async function enableCompass() {
    if (orientationBound) return true;
    try {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        const r = await DeviceOrientationEvent.requestPermission(); if (r !== 'granted') return false;
      }
      const evName = 'ondeviceorientationabsolute' in window ? 'deviceorientationabsolute' : 'deviceorientation';
      window.addEventListener(evName, onOrientation, true); orientationBound = true; return true;
    } catch (e) { return false; }
  }

  // ---------- sheet ----------
  function setSheet(state) { S.sheet = state; const sh = $('#sheet'); sh.classList.remove('half', 'full'); if (state !== 'peek') sh.classList.add(state); $('.mapbtns').style.bottom = state === 'peek' ? '' : (state === 'half' ? 'calc(48% + 12px)' : '48%'); }
  (function sheetDrag() {
    const h = $('#handle'), sh = $('#sheet'); let startY = 0, startH = 0, dragging = false;
    const onDown = (e) => { dragging = true; startY = e.clientY; startH = sh.getBoundingClientRect().height; sh.classList.add('dragging'); h.setPointerCapture(e.pointerId); };
    const onMove = (e) => { if (!dragging) return; const nh = Math.max(90, startH + (startY - e.clientY)); sh.style.height = nh + 'px'; };
    const onUp = () => { if (!dragging) return; dragging = false; sh.classList.remove('dragging'); const hgt = sh.getBoundingClientRect().height, H = window.innerHeight; sh.style.height = ''; setSheet(hgt < H * 0.28 ? 'peek' : hgt < H * 0.68 ? 'half' : 'full'); };
    h.addEventListener('pointerdown', onDown); h.addEventListener('pointermove', onMove); h.addEventListener('pointerup', onUp); h.addEventListener('pointercancel', onUp);
    h.addEventListener('click', () => { if (!dragging) setSheet(S.sheet === 'peek' ? 'half' : S.sheet === 'half' ? 'full' : 'peek'); });
  })();

  function renderSheet() {
    const head = $('#sheetHead'), body = $('#sheetBody');
    const s = D.spots.find((x) => x.id === S.selected);
    if (s) { renderDetail(s, head, body); return; }
    const o = origin();
    const list = D.spots.filter(visible).map((x) => ({ s: x, d: dist(o, x) })).sort((a, b) => a.d - b.d);
    head.innerHTML = ''; head.append(el('h2', {}, [T().nav.spots]), el('span', { class: 'muted small' }, [T().nSpots(list.length) + ' · '.replace(' · ', ', ') + (S.pos ? T().fromYou : T().fromHome)]));
    body.innerHTML = '';
    const chips = el('div', { class: 'chips' });
    ['A', 'B', 'C', 'D'].forEach((tier) => chips.append(el('button', { class: 'chip' + (S.filterTiers.has(tier) ? ' on' : ''), title: T().tierHelp[tier], onclick: () => { if (S.filterTiers.has(tier)) S.filterTiers.delete(tier); else S.filterTiers.add(tier); renderSpotMarkers(); renderSheet(); } }, [el('i', { class: 'dot ' + tier }), T().tier[tier]])));
    const sel = el('select', { class: 'chip', 'aria-label': T().within, onchange: (e) => { S.maxKm = +e.target.value; renderSpotMarkers(); renderSheet(); } });
    [10, 25, 40, 60, 200].forEach((k) => sel.append(el('option', { value: k, selected: k === S.maxKm ? '' : null }, [`${T().within} ${k} ${T().km}`])));
    chips.append(sel); body.append(chips);
    if (!list.length) { body.append(el('div', { class: 'empty' }, [el('b', {}, [T().nSpots(0)]), T().tabsHint])); return; }
    const ul = el('ul', { class: 'spotlist' });
    list.forEach(({ s: x, d }) => {
      ul.append(el('li', { class: 'spot', onclick: () => selectSpot(x.id, { pan: true }) }, [
        el('div', { class: 'tierpin ' + x.tier }, [el('span', {}, [x.tier])]),
        el('div', {}, [el('div', { class: 'name' }, [tr(x.name)]), el('div', { class: 'sub' }, [tr(D.regions[x.region]) + (x.evidence && x.evidence[0] ? `, ${x.evidence[0].date.slice(0, 4)}` : '')])]),
        el('div', { class: 'dist' }, [fmtDist(d), el('small', {}, [x.min ? `${x.km} km, ${x.min} ${T().min}` : ''])])
      ]));
    });
    body.append(ul);
  }
  function selectSpot(id, opts) {
    const prev = S.selected; S.selected = id;
    if (prev && markers[prev]) markers[prev].setIcon(spotIcon(D.spots.find((x) => x.id === prev), false));
    const s = D.spots.find((x) => x.id === id);
    if (markers[id]) { markers[id].setIcon(spotIcon(s, true)); markers[id].setZIndexOffset(500); }
    setTab('map'); if (S.sheet === 'peek') setSheet('half');
    if (opts && opts.pan) map.flyTo([s.lat, s.lon], Math.max(map.getZoom(), 13), { duration: .6 });
    drawLine(); renderSheet();
    const body = $('#sheetBody'); body.scrollTop = 0;
  }
  function deselect() { const prev = S.selected; S.selected = null; if (prev && markers[prev]) markers[prev].setIcon(spotIcon(D.spots.find((x) => x.id === prev), false)); drawLine(); renderSheet(); }

  function renderDetail(s, head, body) {
    const t = T(); const o = origin(); const d = dist(o, s);
    head.innerHTML = '';
    head.append(el('button', { class: 'btn ghost', style: 'min-height:36px;padding:4px 10px', onclick: deselect }, ['‹ ' + t.detailBack]));
    body.innerHTML = '';
    const w = el('div', { class: 'detail' });
    w.append(el('h2', {}, [tr(s.name)]));
    w.append(el('div', { class: 'meta' }, [
      el('span', { class: 'badge ' + s.tier, title: t.tierHelp[s.tier] }, [s.tier + ' ', t.tier[s.tier]]),
      el('span', {}, [`${fmtDist(d)} ${S.pos ? t.fromYou : t.fromHome}`]),
      s.acc ? el('span', {}, [`${t.accuracy} ${s.acc >= 1000 ? (s.acc / 1000) + ' km' : s.acc + ' m'}`]) : null
    ]));
    const coords = el('div', { class: 'row small' }, [el('span', { class: 'coords' }, [fmtCoord(s.lat, s.lon)]), el('button', { class: 'chip', onclick: () => copy(fmtCoord(s.lat, s.lon)) }, [t.copyCoords]), el('button', { class: 'chip', onclick: () => share(s) }, [t.share])]);
    w.append(coords);
    const acts = el('div', { class: 'actions' });
    acts.append(el('button', { class: 'btn primary', onclick: () => openCompass(s) }, [svgIcon('compass'), t.walk]));
    acts.append(el('button', { class: 'btn', onclick: (e) => openNavMenu(e.currentTarget, s.park || s, tr(s.name)) }, [svgIcon('car'), t.drive]));
    const dl = el('button', { class: 'btn wide', onclick: () => downloadTiles(s, dl) }, [svgIcon('download'), t.download]);
    acts.append(dl);
    acts.append(el('button', { class: 'btn wide ghost', onclick: () => openFindForm({ lat: s.lat, lon: s.lon, acc: null, spotId: s.id }) }, [svgIcon('star'), t.addFindHere]));
    w.append(acts);
    if (s.park) w.append(section(t.parking, [el('p', {}, [tr(s.park.label) + ' ', el('span', { class: 'coords muted small' }, [fmtCoord(s.park.lat, s.park.lon)])])]));
    w.append(section(t.route, [el('p', {}, [(s.km ? `${s.km} km, ${s.min} ${t.min}. ` : '') + tr(s.route)])]));
    w.append(section(t.habitat, [el('p', {}, [tr(s.habitat)])]));
    const ev = el('ul', { class: 'ev' });
    (s.evidence || []).forEach((e) => ev.append(el('li', {}, [el('time', {}, [e.date]), el('span', {}, [e.src + ' ', e.url ? el('a', { href: e.url, target: '_blank', rel: 'noopener' }, ['↗']) : null])])));
    w.append(section(t.evidence, [ev]));
    body.append(w);
  }
  const section = (h, kids) => el('div', { class: 'section' }, [el('h3', {}, [h]), ...kids]);
  function svgIcon(name) {
    const p = { compass: '<circle cx="12" cy="12" r="9"/><path d="m15 9-2 6-4 0 2-6z"/>', car: '<path d="M3 13l2-5h14l2 5v5H3z"/><circle cx="7.5" cy="16" r="1.5"/><circle cx="16.5" cy="16" r="1.5"/>', download: '<path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v3h16v-3"/>', star: '<path d="M12 3l2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 17l-5.4 2.8 1.1-6.1L3.2 9.4l6.1-.8z"/>' }[name];
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.setAttribute('viewBox', '0 0 24 24'); s.innerHTML = p; return s;
  }
  function copy(txt) { (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => toast(T().copied), () => { prompt('', txt); }); }
  function share(s) { const txt = `${tr(s.name)}: ${fmtCoord(s.lat, s.lon)} https://www.openstreetmap.org/?mlat=${s.lat}&mlon=${s.lon}#map=15/${s.lat}/${s.lon}`; if (navigator.share) navigator.share({ title: tr(s.name), text: txt }).catch(() => {}); else copy(txt); }

  // nav menu (drive)
  function openNavMenu(anchor, target, label) {
    const m = $('#navMenu'); m.innerHTML = ''; const t = T();
    const lat = target.lat, lon = target.lon, enc = encodeURIComponent(label || 'Kukeseen');
    const links = [
      [t.google, `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=driving`],
      [t.apple, `https://maps.apple.com/?daddr=${lat},${lon}&dirflg=d`],
      [t.waze, `https://waze.com/ul?ll=${lat},${lon}&navigate=yes`],
      [t.osmand, `geo:${lat},${lon}?q=${lat},${lon}(${enc})`]
    ];
    m.append(el('div', { class: 'small muted', style: 'padding:6px 12px' }, [t.openIn]));
    links.forEach(([n, href]) => m.append(el('a', { href, target: '_blank', rel: 'noopener', onclick: closeMenus }, [n])));
    const r = anchor.getBoundingClientRect(); m.style.left = Math.max(8, Math.min(window.innerWidth - 220, r.left)) + 'px'; m.style.top = (r.top - 8 - 4 * 44 - 30) + 'px'; m.classList.add('open');
    setTimeout(() => document.addEventListener('click', closeMenusOnce, { once: true }), 0);
  }
  function closeMenus() { document.querySelectorAll('.menu.open').forEach((m) => m.classList.remove('open')); }
  function closeMenusOnce(e) { if (!e.target.closest('.menu')) closeMenus(); else document.addEventListener('click', closeMenusOnce, { once: true }); }

  // layer menu
  function renderLayerMenu() {
    const m = $('#layerMenu'); m.innerHTML = '';
    ['osm', 'kaart', 'foto', 'hybriid'].forEach((k) => m.append(el('button', { class: S.layer === k ? 'on' : '', onclick: () => { setBase(k); renderLayerMenu(); closeMenus(); } }, [T().layer[k]])));
  }
  $('#btnLayers').addEventListener('click', (e) => { e.stopPropagation(); const m = $('#layerMenu'); const open = m.classList.contains('open'); closeMenus(); if (!open) { renderLayerMenu(); m.classList.add('open'); setTimeout(() => document.addEventListener('click', closeMenusOnce, { once: true }), 0); } });
  $('#btnLocate').addEventListener('click', locate);
  $('#btnFollow').addEventListener('click', () => { S.follow = !S.follow; $('#btnFollow').classList.toggle('active', S.follow); if (S.follow) { startWatch({ center: true }); enableCompass(); if (S.pos) map.panTo([S.pos.lat, S.pos.lon]); } });
  $('#btnAbout').addEventListener('click', () => setTab('about'));

  // ---------- tile download ----------
  function lon2tile(lon, z) { return Math.floor((lon + 180) / 360 * 2 ** z); }
  function lat2tile(lat, z) { return Math.floor((1 - Math.log(Math.tan(rad(lat)) + 1 / Math.cos(rad(lat))) / Math.PI) / 2 * 2 ** z); }
  async function downloadTiles(s, btn) {
    if (!('caches' in window)) { toast('Cache API puudub'); return; }
    const t = T(); const radiusKm = 1.6; const zooms = [12, 13, 14, 15, 16];
    const dLat = radiusKm / 111, dLon = radiusKm / (111 * Math.cos(rad(s.lat)));
    const urls = [];
    const tpl = currentBase._url, tms = !!currentBase.options.tms;
    zooms.forEach((z) => {
      const x0 = lon2tile(s.lon - dLon, z), x1 = lon2tile(s.lon + dLon, z), y0 = lat2tile(s.lat + dLat, z), y1 = lat2tile(s.lat - dLat, z);
      for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) { const yy = tms ? (2 ** z - 1 - y) : y; urls.push(tpl.replace('{z}', z).replace('{x}', x).replace('{y}', yy).replace('{s}', 'a')); }
    });
    btn.disabled = true; const label = btn.lastChild; let done = 0, ok = 0;
    const cache = await caches.open('ks-tiles');
    const worker = async () => { while (urls.length) { const u = urls.shift(); try { const hit = await cache.match(u); if (!hit) { const r = await fetch(u, { mode: 'no-cors' }); await cache.put(u, r); } ok++; } catch (e) { /* skip */ } done++; if (done % 10 === 0) label.textContent = `${t.downloading} ${done}`; } };
    await Promise.all([worker(), worker(), worker(), worker()]);
    label.textContent = t.offlineReady; toast(t.downloaded(ok)); btn.disabled = false;
  }

  // ---------- compass view ----------
  function openCompass(target) { S.compassTarget = target; $('#compass').classList.add('on'); $('#cmpTitle').textContent = tr(target.name) || target.label || T().finds.title; startWatch({ center: false }); enableCompass().then((ok) => { $('#cmpPerm').style.display = (ok || typeof DeviceOrientationEvent === 'undefined' || typeof DeviceOrientationEvent.requestPermission !== 'function') ? 'none' : ''; }); renderCompass(); }
  function closeCompass() { $('#compass').classList.remove('on'); S.compassTarget = null; }
  $('#cmpClose').addEventListener('click', closeCompass);
  $('#cmpMap').addEventListener('click', () => { const tg = S.compassTarget; closeCompass(); if (tg && tg.id && D.spots.find((x) => x.id === tg.id)) selectSpot(tg.id, { pan: true }); else if (tg) map.setView([tg.lat, tg.lon], 16); });
  $('#cmpLog').addEventListener('click', () => { closeCompass(); openFindForm({ useGps: true }); });
  $('#cmpPerm').addEventListener('click', async () => { const ok = await enableCompass(); if (ok) $('#cmpPerm').style.display = 'none'; else toast(T().compassNo); });
  (function ticks() { const g = $('#ringTicks'); let s = ''; for (let i = 0; i < 72; i++) { const a = i * 5 * Math.PI / 180, long = i % 18 === 0, mid = i % 6 === 0; const r1 = 48, r0 = long ? 41 : mid ? 44 : 46; s += `<line x1="${50 + r0 * Math.sin(a)}" y1="${50 - r0 * Math.cos(a)}" x2="${50 + r1 * Math.sin(a)}" y2="${50 - r1 * Math.cos(a)}" ${long ? 'stroke-width="2" stroke="rgba(239,233,214,.7)"' : ''}/>`; } g.innerHTML = s; })();
  let lastRot = 0;
  function renderCompass() {
    const tg = S.compassTarget; if (!tg || !$('#compass').classList.contains('on')) return; const t = T();
    $('#cmpMap').textContent = t.nav.map; $('#cmpLog').textContent = t.finds.add; $('#cmpPerm').textContent = t.compassPerm;
    if (!S.pos) { $('#cmpDist').textContent = '–'; $('#cmpSub').textContent = t.gpsWait; $('#cmpOk').textContent = ''; return; }
    const d = dist(S.pos, tg), b = bearing(S.pos, tg);
    const h = S.heading == null ? 0 : S.heading;
    let rot = ((b - h) % 360 + 360) % 360; // shortest rotation path
    let delta = rot - (lastRot % 360); if (delta > 180) delta -= 360; if (delta < -180) delta += 360; lastRot += delta;
    $('#cmpArrow').style.transform = `rotate(${lastRot}deg)`; $('#cmpArrow').style.opacity = S.heading == null ? .35 : 1;
    $('#cmpDist').innerHTML = d < 1000 ? `${Math.round(d)}<small>m</small>` : `${(d / 1000).toFixed(2)}<small>km</small>`;
    const eta = Math.max(1, Math.round(d / 1000 / 4 * 60));
    $('#cmpSub').textContent = `${t.bearing} ${Math.round(b)}°, ${t.gpsAcc(Math.round(S.pos.acc || 0))}. ${t.eta} ${eta} ${t.min}.` + (S.heading == null ? ' ' + t.noHeading : '');
    $('#cmpOk').textContent = d <= Math.max(25, (S.pos.acc || 0)) ? t.arrived : '';
  }

  // ---------- tabs & panes ----------
  function setTab(tab) {
    S.tab = tab; document.querySelectorAll('.tab').forEach((b) => b.classList.toggle('on', b.dataset.tab === tab || (tab === 'about' && false)));
    document.querySelectorAll('.pane').forEach((p) => p.classList.remove('on'));
    const sheet = $('#sheet'); const mapView = tab === 'map' || tab === 'spots';
    sheet.style.display = mapView ? '' : 'none'; $('.mapbtns').style.display = mapView ? '' : 'none'; $('.topbar').style.display = mapView ? '' : 'none';
    if (tab === 'spots') { if (S.selected) deselect(); setSheet('full'); }
    if (tab === 'map' && S.sheet === 'full') setSheet('half');
    if (tab === 'finds') { $('#paneFinds').classList.add('on'); renderFinds(); }
    if (tab === 'learn') { $('#paneLearn').classList.add('on'); renderLearn(); }
    if (tab === 'season') { $('#paneSeason').classList.add('on'); renderSeason(); }
    if (tab === 'about') { $('#paneAbout').classList.add('on'); renderAbout(); }
    if (mapView) setTimeout(() => map.invalidateSize(), 50);
  }
  $('#tabs').addEventListener('click', (e) => { const b = e.target.closest('.tab'); if (b) setTab(b.dataset.tab); });

  // ---------- finds ----------
  async function loadFinds() { S.finds = (await DB.all()).sort((a, b) => b.t - a.t); renderFindMarkers(); }
  function renderFinds() {
    const t = T(); const p = $('#paneFinds'); p.innerHTML = '';
    p.append(el('div', { class: 'pane-head' }, [el('h1', {}, [t.finds.title]), el('button', { class: 'btn primary', onclick: () => openFindForm({ useGps: true }) }, [svgIcon('star'), t.finds.add])]));
    p.append(el('p', { class: 'muted small' }, [t.finds.privacy]));
    if (!S.finds.length) { p.append(el('div', { class: 'empty' }, [el('b', {}, [t.finds.empty]), t.finds.emptyHint])); }
    S.finds.forEach((f) => {
      const card = el('div', { class: 'card find', id: 'find-' + f.id });
      card.append(f.photo ? el('img', { src: f.photo, alt: '' }) : el('div', { class: 'noimg' }, ['✶']));
      const sp = t.finds.speciesList[f.species] || f.species;
      card.append(el('div', {}, [el('div', { class: 'name', style: 'font-weight:500' }, [sp + (f.amount ? `, ${t.finds.amounts[f.amount] || f.amount}` : '')]), el('div', { class: 'small muted' }, [new Date(f.t).toLocaleDateString(S.lang === 'et' ? 'et-EE' : 'en-GB') + ', ' + fmtCoord(f.lat, f.lon) + (f.acc ? ` (±${Math.round(f.acc)} m)` : '')]), f.notes ? el('div', { class: 'small' }, [f.notes]) : null]));
      const acts = el('div', { class: 'row', style: 'flex-direction:column;align-items:stretch' }, [
        el('button', { class: 'chip', onclick: () => openCompass({ lat: f.lat, lon: f.lon, label: sp }) }, [t.finds.navigateBack]),
        el('button', { class: 'chip', onclick: () => { setTab('map'); map.setView([f.lat, f.lon], 16); } }, [t.finds.showOnMap]),
        el('button', { class: 'chip', onclick: () => openFindForm({ edit: f }) }, [t.finds.edit])
      ]);
      card.append(acts); p.append(card);
    });
    const io = el('div', { class: 'row', style: 'margin-top:14px' }, [
      el('button', { class: 'btn', onclick: exportJson }, [t.finds.export]), el('button', { class: 'btn', onclick: exportGpx }, [t.finds.exportGpx]),
      el('label', { class: 'btn' }, [t.finds.import, el('input', { type: 'file', accept: 'application/json,.json', style: 'display:none', onchange: importJson })])
    ]);
    p.append(io);
  }
  function openFindForm(opts) {
    const t = T(); const f = opts.edit || { id: 'f' + Date.now().toString(36), t: Date.now(), lat: opts.lat || (S.pos && S.pos.lat) || S.home.lat, lon: opts.lon || (S.pos && S.pos.lon) || S.home.lon, acc: opts.acc || (S.pos && S.pos.acc) || null, species: 'kukeseen', amount: 'handful', notes: '', photo: null, spotId: opts.spotId || null };
    setTab('finds'); const p = $('#paneFinds'); p.innerHTML = '';
    p.append(el('div', { class: 'pane-head' }, [el('button', { class: 'btn ghost', onclick: renderFinds }, ['‹ ' + t.detailBack]), el('h1', {}, [opts.edit ? t.finds.edit : t.finds.add])]));
    const status = el('div', { class: 'small muted', style: 'margin-bottom:10px' }, [f.acc ? t.finds.gpsFixed(Math.round(f.acc)) : fmtCoord(f.lat, f.lon)]);
    if (opts.useGps && !opts.edit) {
      status.textContent = t.finds.usingGps; startWatch({});
      const tick = setInterval(() => { if (S.pos) { f.lat = S.pos.lat; f.lon = S.pos.lon; f.acc = S.pos.acc; status.textContent = t.finds.gpsFixed(Math.round(S.pos.acc)); if (S.pos.acc < 15) clearInterval(tick); } }, 1000);
      setTimeout(() => clearInterval(tick), 60000);
    }
    const form = el('div', { class: 'card' });
    form.append(status);
    const spSel = el('select', { id: 'fSpecies' }); Object.keys(t.finds.speciesList).forEach((k) => spSel.append(el('option', { value: k, selected: f.species === k ? '' : null }, [t.finds.speciesList[k]])));
    const amSel = el('select', { id: 'fAmount' }); Object.keys(t.finds.amounts).forEach((k) => amSel.append(el('option', { value: k, selected: f.amount === k ? '' : null }, [t.finds.amounts[k]])));
    const notes = el('textarea', { id: 'fNotes' }); notes.value = f.notes || '';
    const img = el('img', { class: 'photo-preview', alt: '', style: f.photo ? '' : 'display:none', src: f.photo || '' });
    const file = el('input', { type: 'file', accept: 'image/*', capture: 'environment', onchange: async (e) => { const fl = e.target.files[0]; if (!fl) return; f.photo = await compressImage(fl, 1000, .8); img.src = f.photo; img.style.display = ''; } });
    form.append(el('div', { class: 'field' }, [el('label', { for: 'fSpecies' }, [t.finds.species]), spSel]));
    form.append(el('div', { class: 'field' }, [el('label', { for: 'fAmount' }, [t.finds.amount]), amSel]));
    form.append(el('div', { class: 'field' }, [el('label', { for: 'fNotes' }, [t.finds.notes]), notes]));
    form.append(el('div', { class: 'field' }, [el('label', {}, [t.finds.photo]), img, file]));
    const lat = el('input', { type: 'number', step: '0.00001', value: f.lat.toFixed(5) }), lon = el('input', { type: 'number', step: '0.00001', value: f.lon.toFixed(5) });
    form.append(el('div', { class: 'row' }, [el('div', { class: 'field', style: 'flex:1' }, [el('label', {}, ['Lat']), lat]), el('div', { class: 'field', style: 'flex:1' }, [el('label', {}, ['Lon']), lon])]));
    const row = el('div', { class: 'actions' });
    row.append(el('button', { class: 'btn primary wide', onclick: async () => { f.species = spSel.value; f.amount = amSel.value; f.notes = notes.value.trim(); f.lat = +lat.value; f.lon = +lon.value; await DB.put(f); await loadFinds(); toast(t.finds.saved); renderFinds(); } }, [t.finds.save]));
    if (opts.edit) row.append(el('button', { class: 'btn danger wide', onclick: async () => { if (confirm(t.finds.deleteConfirm)) { await DB.del(f.id); await loadFinds(); renderFinds(); } } }, [t.finds.delete]));
    form.append(row); p.append(form);
  }
  function compressImage(file, max, q) { return new Promise((res) => { const img = new Image(); const url = URL.createObjectURL(file); img.onload = () => { const sc = Math.min(1, max / Math.max(img.width, img.height)); const c = document.createElement('canvas'); c.width = Math.round(img.width * sc); c.height = Math.round(img.height * sc); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url); res(c.toDataURL('image/jpeg', q)); }; img.onerror = () => res(null); img.src = url; }); }
  function download(name, type, content) { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([content], { type })); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); }
  function exportJson() { download(`kukeseen-leiud-${new Date().toISOString().slice(0, 10)}.json`, 'application/json', JSON.stringify({ app: 'kukeseen', version: VERSION, finds: S.finds }, null, 2)); }
  function exportGpx() {
    const t = T(); const wpts = S.finds.map((f) => `  <wpt lat="${f.lat}" lon="${f.lon}"><time>${new Date(f.t).toISOString()}</time><name>${esc(t.finds.speciesList[f.species] || f.species)}</name><desc>${esc(f.notes || '')}</desc></wpt>`).join('\n');
    download(`kukeseen-leiud-${new Date().toISOString().slice(0, 10)}.gpx`, 'application/gpx+xml', `<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="Kukeseen ${VERSION}" xmlns="http://www.topografix.com/GPX/1/1">\n${wpts}\n</gpx>`);
  }
  async function importJson(e) { const fl = e.target.files[0]; if (!fl) return; try { const data = JSON.parse(await fl.text()); const arr = Array.isArray(data) ? data : data.finds || []; let n = 0; for (const f of arr) { if (typeof f.lat === 'number' && typeof f.lon === 'number') { if (!f.id) f.id = 'f' + Math.random().toString(36).slice(2); if (!f.t) f.t = Date.now(); await DB.put(f); n++; } } await loadFinds(); renderFinds(); toast(T().finds.imported(n)); } catch (err) { toast('JSON?'); } }

  // ---------- learn ----------
  function renderLearn() {
    const t = T(); const p = $('#paneLearn'); p.innerHTML = '';
    p.append(el('div', { class: 'pane-head' }, [el('h1', {}, [t.learn.title])]));
    p.append(el('p', { class: 'muted' }, [t.learn.intro]));
    LESSONS.forEach((ls) => { const c = ls[S.lang] || ls.et; p.append(el('div', { class: 'card tap lesson-row', onclick: () => renderLesson(ls), role: 'button', tabindex: 0 }, [el('div', { class: 'ic' }, [ls.icon]), el('div', {}, [el('h3', {}, [c.title]), el('div', { class: 'mins' }, [t.learn.readMin(ls.minutes)])]), el('span', { class: 'muted' }, ['›'])])); });
    p.append(el('div', { class: 'card tap lesson-row', onclick: renderQuiz, role: 'button', tabindex: 0 }, [el('div', { class: 'ic' }, ['?']), el('div', {}, [el('h3', {}, [t.learn.quiz]), el('div', { class: 'mins' }, [QUIZ[S.lang].length + ' Q'])]), el('span', { class: 'muted' }, ['›'])]));
  }
  function renderLesson(ls) {
    const t = T(); const c = ls[S.lang] || ls.et; const p = $('#paneLearn'); p.innerHTML = ''; p.scrollTop = 0;
    p.append(el('div', { class: 'pane-head' }, [el('button', { class: 'btn ghost', onclick: renderLearn }, ['‹ ' + t.detailBack]), el('h1', {}, [c.title])]));
    const body = el('div', { class: 'card lesson-body' });
    c.sections.forEach((sec) => { body.append(el('h2', {}, [sec.h])); (sec.p || []).forEach((para) => body.append(el('p', {}, [para]))); if (sec.ul) body.append(el('ul', {}, sec.ul.map((li) => el('li', {}, [li])))); });
    p.append(body);
  }
  function renderQuiz() {
    const t = T(); const qs = QUIZ[S.lang]; const p = $('#paneLearn'); let i = 0, score = 0;
    const step = () => {
      p.innerHTML = ''; p.scrollTop = 0;
      p.append(el('div', { class: 'pane-head' }, [el('button', { class: 'btn ghost', onclick: renderLearn }, ['‹ ' + t.detailBack]), el('h1', {}, [t.learn.quiz])]));
      if (i >= qs.length) { p.append(el('div', { class: 'card' }, [el('h2', {}, [t.learn.result(score, qs.length)]), el('p', { class: 'muted' }, [score === qs.length ? '★★★' : score >= qs.length / 2 ? '★★' : '★']), el('button', { class: 'btn primary', onclick: renderQuiz }, [t.learn.again])])); return; }
      const q = qs[i]; const card = el('div', { class: 'card quiz' }); card.append(el('div', { class: 'muted small' }, [`${i + 1} / ${qs.length}`]), el('h2', {}, [q.q]));
      const why = el('p', { style: 'display:none;margin-top:10px' }, [q.why]); const next = el('button', { class: 'btn primary', style: 'display:none', onclick: () => { i++; step(); } }, [t.learn.next]);
      q.a.forEach((a, k) => card.append(el('button', { class: 'btn opt', onclick: (e) => { if (card.dataset.done) return; card.dataset.done = 1; if (k === q.c) { score++; e.currentTarget.classList.add('right'); } else { e.currentTarget.classList.add('wrong'); card.querySelectorAll('.opt')[q.c].classList.add('right'); } why.style.display = ''; next.style.display = ''; } }, [a])));
      card.append(why, next); p.append(card);
    };
    step();
  }

  // ---------- season ----------
  async function renderSeason(force) {
    const t = T(); const p = $('#paneSeason'); p.innerHTML = '';
    p.append(el('div', { class: 'pane-head' }, [el('h1', {}, [t.season.title]), el('button', { class: 'btn', onclick: () => renderSeason(true) }, [t.season.fetch])]));
    const o = origin(); const key = `ks.weather.${o.lat.toFixed(2)}.${o.lon.toFixed(2)}`;
    let data = JSON.parse(localStorage.getItem(key) || 'null'); const stale = !data || Date.now() - data.t > 3 * 3600e3;
    const holder = el('div'); p.append(holder);
    if (stale || force) {
      holder.append(el('p', { class: 'muted' }, [t.season.loading]));
      try {
        const end = new Date(); const start = new Date(end.getTime() - 16 * 86400e3);
        const f = (d) => d.toISOString().slice(0, 10);
        const [arch, fc] = await Promise.all([
          fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=${o.lat}&longitude=${o.lon}&start_date=${f(start)}&end_date=${f(end)}&daily=precipitation_sum,temperature_2m_min,temperature_2m_mean&timezone=Europe%2FTallinn`).then((r) => r.json()),
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${o.lat}&longitude=${o.lon}&daily=precipitation_sum,temperature_2m_min&hourly=soil_temperature_6cm&past_days=2&forecast_days=7&timezone=Europe%2FTallinn`).then((r) => r.json())
        ]);
        const days = arch.daily.time.map((d, i) => ({ d, rain: arch.daily.precipitation_sum[i], tmin: arch.daily.temperature_2m_min[i], tmean: arch.daily.temperature_2m_mean[i] })).filter((x) => x.rain != null);
        const fcDays = fc.daily.time.map((d, i) => ({ d, rain: fc.daily.precipitation_sum[i], tmin: fc.daily.temperature_2m_min[i] }));
        const soil = fc.hourly && fc.hourly.soil_temperature_6cm ? fc.hourly.soil_temperature_6cm.slice(48, 72).filter((v) => v != null) : [];
        data = { t: Date.now(), days: days.slice(-14), fc: fcDays, soil: soil.length ? soil.reduce((a, b) => a + b, 0) / soil.length : null };
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e) { if (!data) { holder.innerHTML = ''; holder.append(el('p', { class: 'muted' }, [t.season.none])); return; } toast(t.season.offline); }
    }
    holder.innerHTML = '';
    const rain14 = data.days.reduce((a, x) => a + (x.rain || 0), 0);
    const lastBig = [...data.days].reverse().findIndex((x) => x.rain >= 5); const daysSince = lastBig < 0 ? 99 : lastBig;
    const minFc = Math.min(...data.fc.map((x) => x.tmin).filter((v) => v != null));
    const meanT = data.days.slice(-7).reduce((a, x) => a + (x.tmean || 0), 0) / Math.max(1, data.days.slice(-7).length);
    // heuristic index 0..100
    let score = 0;
    score += Math.min(40, rain14 * 1.2);                      // moisture
    score += daysSince >= 7 && daysSince <= 16 ? 25 : daysSince < 7 ? 12 : 0; // lag window
    score += meanT >= 12 ? 25 : meanT >= 7 ? 15 : meanT >= 3 ? 6 : 0;        // warmth
    if (minFc < 0) score -= 20; if (minFc < -3) score -= 15;                   // frost
    score = Math.max(0, Math.min(100, Math.round(score)));
    const band = score < 20 ? 0 : score < 40 ? 1 : score < 60 ? 2 : score < 80 ? 3 : 4;
    const color = ['#8A948B', '#7A4A1E', '#C9920F', '#5B7F4A', '#3F7A4A'][band];
    const circ = 2 * Math.PI * 46; const dash = circ * score / 100;
    const g = el('div', { class: 'card' });
    g.append(el('div', { class: 'gauge' }, [
      el('div', { html: `<svg viewBox="0 0 110 110"><circle cx="55" cy="55" r="46" fill="none" stroke="var(--line)" stroke-width="10"/><circle cx="55" cy="55" r="46" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${dash} ${circ}" transform="rotate(-90 55 55)"/><text x="55" y="62" text-anchor="middle" font-size="26" font-weight="700" fill="currentColor">${score}</text></svg>` }),
      el('div', {}, [el('div', { class: 'lab' }, [t.season.idx]), el('div', { class: 'val', style: `color:${color};font-size:28px` }, [t.season.labels[band]]), el('div', { class: 'small muted' }, [t.season.heur])])
    ]));
    const tip = minFc < 0 ? t.season.tip.frost : rain14 < 10 ? t.season.tip.dry : daysSince < 7 ? t.season.tip.lag : t.season.tip.wet;
    g.append(el('p', { style: 'margin-top:12px' }, [tip]));
    g.append(el('div', { class: 'stats' }, [
      el('div', { class: 'stat' }, [el('b', {}, [`${rain14.toFixed(0)} mm`]), el('span', {}, [t.season.rain14])]),
      el('div', { class: 'stat' }, [el('b', {}, [daysSince === 99 ? '>14 d' : t.season.daysAgo(daysSince)]), el('span', {}, [t.season.lastRain])]),
      el('div', { class: 'stat' }, [el('b', {}, [`${minFc.toFixed(1)} °C`]), el('span', {}, [t.season.nightMin + ', ' + t.season.frost.toLowerCase()])]),
      el('div', { class: 'stat' }, [el('b', {}, [data.soil != null ? `${data.soil.toFixed(1)} °C` : '–']), el('span', {}, [t.season.soil + ' 6 cm'])])
    ]));
    const maxR = Math.max(5, ...data.days.map((x) => x.rain || 0), ...data.fc.map((x) => x.rain || 0));
    const bars = el('div', { class: 'bars', title: 'mm' });
    data.days.forEach((x) => bars.append(el('i', { style: `height:${Math.max(3, (x.rain || 0) / maxR * 100)}%`, title: `${x.d}: ${x.rain} mm` })));
    data.fc.slice(2).forEach((x) => bars.append(el('i', { class: 'f', style: `height:${Math.max(3, (x.rain || 0) / maxR * 100)}%;opacity:.5`, title: `${x.d}: ${x.rain} mm` })));
    g.append(bars); g.append(el('div', { class: 'small muted' }, [`${t.season.rain14} + 7 ${t.min === 'min' ? 'd' : 'd'} (${t.season.locationUsed}: ${fmtCoord(o.lat, o.lon)})`]));
    holder.append(g);
  }

  // ---------- about ----------
  function renderAbout() {
    const t = T(); const p = $('#paneAbout'); p.innerHTML = '';
    p.append(el('div', { class: 'pane-head' }, [el('button', { class: 'btn ghost', onclick: () => setTab('map') }, ['‹ ' + t.detailBack]), el('h1', {}, [t.about.title])]));
    const c1 = el('div', { class: 'card' });
    c1.append(el('div', { class: 'field' }, [el('label', {}, [t.about.lang]), el('div', { class: 'chips' }, [['et', 'Eesti'], ['en', 'English']].map(([k, n]) => el('button', { class: 'chip' + (S.lang === k ? ' on' : ''), onclick: () => { S.lang = k; localStorage.setItem('ks.lang', k); applyLang(); renderAbout(); } }, [n])))]));
    c1.append(el('div', { class: 'field' }, [el('label', {}, [t.about.theme]), el('div', { class: 'chips' }, [['auto', t.about.auto], ['light', t.about.light], ['dark', t.about.dark]].map(([k, n]) => el('button', { class: 'chip' + (S.theme === k ? ' on' : ''), onclick: () => { S.theme = k; localStorage.setItem('ks.theme', k); applyTheme(); renderAbout(); } }, [n])))]));
    c1.append(el('div', { class: 'row' }, [el('button', { class: 'btn', onclick: () => { if (!S.pos) { toast(t.gpsWait); startWatch({}); return; } S.home = { lat: S.pos.lat, lon: S.pos.lon, name: t.homeName }; localStorage.setItem('ks.home', JSON.stringify(S.home)); homeMarker.setLatLng([S.home.lat, S.home.lon]); toast(t.about.homeSet); renderSheet(); } }, [t.about.setHome]), el('span', { class: 'small muted coords' }, [`${t.home}: ${fmtCoord(S.home.lat, S.home.lon)}`])]));
    p.append(c1);
    const c2 = el('div', { class: 'card' });
    const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    c2.append(el('h3', {}, [t.about.install]));
    if (standalone) c2.append(el('p', { class: 'muted' }, [t.about.installed]));
    else if (S.deferredInstall) c2.append(el('button', { class: 'btn primary', onclick: async () => { S.deferredInstall.prompt(); await S.deferredInstall.userChoice; S.deferredInstall = null; renderAbout(); } }, [t.about.install]));
    else c2.append(el('p', { class: 'muted' }, [isIos ? t.about.installIos : t.about.installIos]));
    c2.append(el('button', { class: 'btn', onclick: async () => { if ('caches' in window) { await caches.delete('ks-tiles'); toast(t.about.tilesCleared); } } }, [t.about.clearTiles]));
    p.append(c2);
    const c3 = el('div', { class: 'card' });
    c3.append(el('h3', {}, [t.about.sources]));
    c3.append(el('ul', { class: 'small' }, [
      el('li', {}, [el('a', { href: 'https://www.inaturalist.org/', target: '_blank', rel: 'noopener' }, ['iNaturalist']), ' (CC BY-NC vaatlused)']),
      el('li', {}, [el('a', { href: 'https://www.gbif.org/', target: '_blank', rel: 'noopener' }, ['GBIF']), ', sh PlutoF ja TÜ loodusmuuseum']),
      el('li', {}, [el('a', { href: 'https://rmk.ee/', target: '_blank', rel: 'noopener' }, ['RMK']), ' valla riigimetsa kavad; ', el('a', { href: 'https://elron.ee/seeneekspress', target: '_blank', rel: 'noopener' }, ['Elron Seeneekspress'])]),
      el('li', {}, ['Kaart: ', el('a', { href: 'https://www.openstreetmap.org/copyright', target: '_blank', rel: 'noopener' }, ['OpenStreetMap']), ', ', el('a', { href: 'https://geoportaal.maaamet.ee/', target: '_blank', rel: 'noopener' }, ['Maa-amet']), '. Ilm: ', el('a', { href: 'https://open-meteo.com/', target: '_blank', rel: 'noopener' }, ['Open-Meteo'])]),
      el('li', {}, ['Leaflet 1.9.4 (BSD-2), Alegreya Sans (OFL)'])
    ]));
    c3.append(el('h3', {}, [t.about.disclaimer])); c3.append(el('p', { class: 'small' }, [t.about.disclaimerText]));
    c3.append(el('p', { class: 'small muted' }, [`${t.about.version} ${VERSION}`]));
    p.append(c3);
  }

  // ---------- PWA ----------
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); S.deferredInstall = e; });
  window.addEventListener('online', () => toast(T().online)); window.addEventListener('offline', () => toast(T().offline));
  if ('serviceWorker' in navigator && location.protocol !== 'file:') { window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => {}); }); }

  // ---------- boot ----------
  function renderAll() { renderSpotMarkers(); renderSheet(); if (S.tab === 'finds') renderFinds(); if (S.tab === 'learn') renderLearn(); if (S.tab === 'season') renderSeason(); if (S.tab === 'about') renderAbout(); }
  applyTheme(); initMap(); applyLang(); setSheet('peek'); loadFinds();
  // Expose a little for debugging
  window.KS = { S, map, selectSpot, setTab, openCompass };
})();
