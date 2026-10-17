# Kukeseen app

Chanterelle spot finder for the Tartu region: a PWA (installable on iPhone and Android from the website) plus a Capacitor-wrapped Android APK built from the same `app/` folder. Read README.md first, then OPEN-QUESTIONS.md, then `app/js/data.js` (the spot dataset) before changing anything.

## Ground rules

1. `app/js/data.js` is the source of truth for spots. Every spot carries an evidence tier (A observation, B soil DNA, C named by RMK/Elron/press, D habitat guess) and at least one dated, sourced evidence row. No spot without a source. The research note `notes/kukeseened-tartu-haaslava-2026-10-17.md` documents how the first 21 spots were derived; when the dataset changes, update that note or add a dated successor.
2. Never present a tier D or B spot as a confirmed find in UI copy. Tier labels and the per-spot accuracy value must stay visible wherever a spot is shown.
3. No AI edibility verdicts, ever. The app teaches identification and lookalikes; it does not tell the user a mushroom is safe to eat (OQ-5).
4. Owner decisions reserved: app name and bundle id (OQ-1), hosting domain (OQ-2), tile provider for public release (OQ-3), store publishing and signing identity (OQ-4), pricing (OQ-6). Use the current placeholders and cite the OQ.
5. User finds are local-first: IndexedDB on the device, export/import by file. No server, no analytics, no third-party SDKs without an explicit decision (OQ-7).
6. `app/` must stay buildless: plain HTML, CSS, JS, vendored Leaflet and fonts. Anything that needs a bundler is a new ADR.
7. Both UI languages (et, en) are updated together. A string added to one language without the other is a bug.
8. Every `sw.js` change bumps `VERSION` in `sw.js` and in `app/js/app.js`.

## Writing style

- No em-dashes or en-dashes as punctuation; use commas, colons, parentheses, or split the sentence.
- No arrows between words in prose ("A to B", not "A -> B"). Arrows inside actual diagrams are fine.
- No middle dots as separators.

## Source documents

- `notes/kukeseened-tartu-haaslava-2026-10-17.md`: spot research with sources (iNaturalist, GBIF, RMK parish plans, Elron Seeneekspress, press).
- `notes/competition-analysis.md`: competitor and adjacent product scan, 2026-10-17.
- RMK state forest overviews per parish (rmk.ee PDFs, Oct 2024), cited inside the data file.
- Maa-amet TMS tiles: `https://tiles.maaamet.ee/tm/tms/1.0.0/{kaart|foto|hybriid}@GMC/{z}/{x}/{y}.png` with `tms: true`.

## Working agreements

- Unit of work: one feature or fix per commit, screenshots regenerated with `npm run shots` when UI changes (needs the static server from `npm run serve`).
- Decisions recorded as ADRs in `docs/adr/`.
- Completion gate: `node --check` on every JS file, `npm run shots` passes with "no console errors", APK builds with `npm run apk:debug`.
- Android: `npx cap sync android` after any change under `app/`; the APK bundles `app/` so it works offline without hosting.
