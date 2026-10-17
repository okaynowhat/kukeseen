# Kukeseen

## In a nutshell
Kukeseen is a phone app that shows where chanterelles have actually been documented around Tartu, lets you walk to a spot with a GPS compass, keeps a private log of your own finds, and teaches identification, habitat and the rules of picking. It runs as an installable web app (iPhone and Android, from a website) and as an Android APK built from the same code. Version 0.1.0 was built on 2026-10-17 and works end to end; hosting, name and tile provider are still open decisions.

## Executive Overview
- **What exists.** A buildless PWA in `app/` and a Capacitor Android project in `android/`. 21 curated chanterelle spots with evidence tiers (A observation, B soil DNA, C named forest, D habitat guess), each with dated sources, route text from Haaslava, parking where known. Map layers: OpenStreetMap plus three Maa-amet layers. Compass walk-in screen, drive hand-off, per-spot offline tiles, private find log with photos and GPX export, eight lessons and a quiz in Estonian and English, a season index from Open-Meteo.
- **What it enables.** Going out this weekend with the two nearest proven spots (Uniküla/Vooremäe, Kaagvere) on the phone, offline, with a compass. Sharing an installable link once hosted.
- **What it does not claim.** A spot is evidence that the mycorrhiza has been there, not that mushrooms are there today. No edibility verdicts. All find data stays on the device.
- **Open.** OQ-1 name and bundle id, OQ-2 hosting, OQ-3 public tile provider, OQ-4 signing and stores, OQ-5 photo ID policy. See OPEN-QUESTIONS.md and ROADMAP.md.

## Status
- 2026-10-17: v0.1.0. Smoke test passes in light and dark mode with no console errors (`npm run shots`). Debug APK built and verified on the Android 14 emulator (GPS fix, spot detail, compass); copy at `~/Downloads/kukeseen/kukeseen-v0.1.0-debug.apk`. Web preview (no GPS in the sandbox): https://claude.ai/artifact/1sANDJbkwrWSTBkyCKm9Pz

## File map
- `app/index.html`, `app/css/app.css`, `app/js/app.js`: the application (vanilla JS, Leaflet 1.9.4 vendored).
- `app/js/data.js`: spot dataset (source of truth), `app/js/i18n.js`: UI strings, `app/js/lessons.js`: learning content and quiz.
- `app/sw.js`, `app/manifest.webmanifest`, `app/icons/`, `app/fonts/`: PWA shell, icons, self-hosted Alegreya Sans.
- `android/`: Capacitor Android project (location permissions, launcher icons, splash). `capacitor.config.json` points at `app/`.
- `scripts/screenshots.mjs`: Playwright smoke test and screenshots into `docs/screenshots/`.
- `docs/DEPLOY.md`: hosting on GitHub Pages, installing on iPhone and Android, building the APK. `docs/adr/`: decisions.
- `notes/kukeseened-tartu-haaslava-2026-10-17.md`: spot research with sources. `notes/competition-analysis.md`: competitor scan.
- `ROADMAP.md`, `OPEN-QUESTIONS.md`, `CLAUDE.md`.

## Run
```
npm install
npm run serve        # http://localhost:8793/
npm run shots        # screenshots + console error check
npx cap sync android && npm run apk:debug   # Android APK
```
Install instructions for phones are in `docs/DEPLOY.md`.

## Data and licences
Spot evidence from iNaturalist (observations CC BY-NC by their authors), GBIF (incl. PlutoF and the University of Tartu natural history museum), RMK parish forest plans, Elron Seeneekspress and press articles cited per spot. Map tiles: OpenStreetMap contributors (ODbL), Maa-amet. Weather: Open-Meteo. Leaflet (BSD-2), Alegreya Sans (OFL).
