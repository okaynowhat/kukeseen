# Kukeseen roadmap

Written 2026-10-17 after the first build (v0.1.0) and the competition scan in `notes/competition-analysis.md`. Each item names the user problem, the evidence for it, and what it depends on. Dates are targets, not commitments.

## Executive Overview

- v0.1.0 does the three things no Estonian app does together: a public, evidence-tiered chanterelle map, a walk-to-spot compass, and the legal and lookalike content, in Estonian and English, as a PWA and an Android APK.
- The competition moved this month: Seeneleidja (forest-register habitat map, offline) and Seenetuvastaja (AI ID with private find map) both shipped updates on 16 Oct 2026, and 4est (Latvia) launched on 5 Oct. None shows public evidence or a compass. The window to own "evidence, not guesses" is open but short.
- The weakest part of the product is data density: the whole country has 77 iNaturalist and about 295 human-observation GBIF chanterelle records. The roadmap therefore invests first in habitat (forest register) and the private log, and only then in community features.
- Decisions that gate the roadmap: hosting and name (OQ-1, OQ-2), tile provider (OQ-3), whether photo ID is ever added (OQ-5), and whether finds may leave the phone (OQ-7).

## Now (v0.1, shipped 2026-10-17)

Map with four base layers (OSM, Maa-amet kaart, ortofoto, hübriid), 21 curated spots with tiers and dated sources, distance-sorted list with filters, spot detail with route text from Haaslava, drive hand-off (Google, Apple, Waze, geo:), compass walk-in screen with GPS bearing and device heading, per-spot offline tile download, private find log (GPS, photo, notes, IndexedDB, JSON and GPX export/import), eight lessons and a quiz, season index from Open-Meteo, ET/EN, light/dark, PWA install, Android APK.

## Next (v0.2, by end of November 2026): make it trustworthy in the field

1. **Forest-register habitat layer.** The state forest register is open data; Seeneleidja proved people pay for stands filtered by species and age. Show pine and spruce stands aged 40 plus as a toggle layer, so a tier D spot becomes "here is the exact stand". Depends on OQ-3 (tile budget) and a one-off conversion script (WFS to vector tiles or GeoJSON per region).
2. **Scripted spot importer.** Pull GBIF and iNaturalist records for all of Estonia, auto-tier them (human observation with photo = A, material sample = B), respect obscured records and licences, and merge with the curated list. Resolves OQ-8. Depends on accuracy and deduplication rules.
3. **Field reliability.** Keep the screen awake in compass mode (Wake Lock API), add a "mark the car" quick action, haptic tick when within 30 m, and a breadcrumb trail of the walk so the user can return the same way. All browser APIs, no backend.
4. **Offline polish.** Download tiles for a whole region (one tap for "Kastre vald"), show cache size, and precache Maa-amet kaart rather than OSM because it carries the forest-type colouring.
5. **iPhone compass permission flow.** Test on a real iPhone; iOS asks for motion access only on a user gesture inside the standalone app. Document the exact steps in the Learn section.

## Later (v0.3 to v0.5, winter 2026 to spring 2027): grow the content and the loop

6. **More species.** Funnel chanterelle, yellowfoot, porcini, saffron milkcap: each with its own habitat note, season window and lookalike card. The data file already supports per-find species; spots need a `species` field.
7. **Lookalike-first ID cards.** Side-by-side photo cards (licensed or own photos) for chanterelle vs false chanterelle, with the three checks (ridges, flesh, substrate). No AI verdict (OQ-5). ERR and Norway's FHI both warn against AI edibility calls; Danish Svampeatlas and Norway's Digital soppkontroll use humans.
8. **Season index calibration.** After one season, compare the index against the user's own finds and the national GBIF record dates; publish the weights (OQ-9). Add soil temperature and a 10 to 14 day lag visualisation.
9. **Protected-area rules on the pin.** Pull the Keskkonnaamet protected area polygons (EELIS WFS) and show the zone and the one-line rule under each spot. No app does this today.
10. **Share to iNaturalist.** Optional one-tap export of a find as an iNaturalist observation draft (the user decides what becomes public). Gives the ecosystem a reason to prefer Kukeseen and feeds the public layer back. Depends on OQ-7.

## Someday (2027+): community and partners

11. **Trusted-circle sync.** Share private spots with named friends only, end-to-end, reusing the nostr relay model from Carve and Trip-split. Avoids the "anonymous crowd pins" trust problem seen in Mushroom Spot and Falling Fruit.
12. **Partner distribution.** A PWA link on Elron Seeneekspress, Tartu loodusmaja and the UT natural history museum mushroom-week pages; RMK as content partner for everyman's right text. Stores only if partners need them (OQ-4).
13. **Human ID check channel.** A photo queue reviewed by Eesti Mükoloogiaühing volunteers in season, modelled on Digital soppkontroll. Needs a partner agreement before any build.
14. **All of Estonia, then Latvia.** Latvian press says no app shows mushroom spots there either; 4est is already Baltic-first on ID. The data pipeline from item 2 is country-agnostic.

## What we will not do

- No AI edibility verdicts. No ads. No weekly subscriptions (Mushroom Map earns 1.4 stars with that model). No server-side storage of user finds without an explicit, revocable opt-in.
