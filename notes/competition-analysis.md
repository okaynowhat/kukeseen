# Kukeseen: competition analysis

Date: 2026-10-17. Scope: chanterelle and mushroom spot finders, ID apps, foraging logbooks and outdoor map apps relevant to an Estonian (Tartu-first) PWA + Android product. Store figures are from the Apple iTunes Search API and Google Play pages opened on 17 Oct 2026 unless stated; "n" is the rating count.

## Answer first

1. Estonia is not empty. Three Estonian-made apps were pushed to Google Play or the App Store in the last four months, two of them updated on 16 Oct 2026: **Seeneleidja** (forest-register habitat map, offline, favourites), **Seenetuvastaja / Mushroom ID: Forager Guide** (AI ID with Estonian habitat context and a private find map) and **Mushby** (AI ID, 50K+ installs). A Baltic logbook, **4est**, launched on 5 Oct 2026 with Estonian UI.
2. Nobody, in Estonia or the Nordics, shows a **public map of chanterelle finds built from open biodiversity records with evidence tiers**. The two closest ideas are habitat models (Seeneleidja, Tattis, Hitta Skog, Kantarellappen) and user-submitted spot crowds (Mushroom Spot, Sporecast, Falling Fruit). Kukeseen's core is still unoccupied.
3. Nobody bundles **compass navigation to a spot, offline tiles, lookalike warnings, everyman's right content and a season index** in Estonian. Everyman's right content exists only on RMK's website; no app carries it.
4. The data is thinner than the idea assumes: GBIF holds 886 *Cantharellus cibarius* records for Estonia (797 with coordinates), but 400 are material samples (DNA or soil, not pickable sites) and 85 machine observations; iNaturalist holds 77 observations (69 research grade, 4 obscured). Evidence tiers are therefore not a nicety but the product's honesty mechanism.
5. The fastest threat is Seeneleidja or Seenetuvastaja adding an observation layer; the strategic threat is RMK adding a mushroom layer to "Loodusega koos" on the back of the Elron Seeneekspress partnership.

## Group 1: Estonia

| Product | Maker | Platform | Core | Languages | Price | Signal | Overlap |
|---|---|---|---|---|---|---|---|
| **Seeneleidja** (ee.mushroomfinder.app) | V. Miki Productions OÜ | Android (no iOS listing found) | Map of 23,478 spruce and birch stands from the state forest register (species, age, height, last measured); save map area offline; own position; Google Maps/Waze hand-off; copy coordinates; favourites; location never leaves the phone; state and public forests only | Store text English; UI language unverified | Free base map, annual subscription for Estonia-wide "spruce map" | 1K+ installs, updated 16 Oct 2026, no rating shown | High: same "where to look" job, habitat model instead of observations, no compass, no ID, no legal content |
| **Seenetuvastaja / Mushroom Identifier: Fungi ID** (iOS: Mushroom ID: Forager Guide) | Rahanetis.ee / Rasta MTÜ | Android, iOS | AI photo ID with edibility category and lookalikes; private find map with species and edibility filters; weather stored per find (temperature, humidity, 7-day rain); habitat from Estonian and Finnish forest registers used as ID context | EN, ET, LV, LT, FI, RU | Free, Pro weekly/monthly/yearly/lifetime | iOS first release 15 Sep 2026, v1.7.0 15 Oct 2026, rating 3.0 (n=2); Play 500+ installs, updated 16 Oct 2026 | High on own-log and lookalikes; no public map, no navigation, no offline tiles |
| **Mushby** (app.pixoby.mushby) | Pixoby OÜ (Estonia) | Android, iOS | AI ID with confidence score, lookalike alerts, expert chat assistant, personal collection with location | Many incl. ET | Free with ads and IAP | Play 50K+ installs, 4.4 (n=3K), updated Jul 2026; iOS v8.0.4 | Medium: a generic AI ID app that happens to be Estonian-owned; no map product |
| **RMK Loodusega koos** | RMK (built by CGI Eesti, 2019) | iOS, Android | RMK visitor objects by type, region, location; descriptions, photos, directions; position on hiking trails; trail branch tracks; Land Board base maps; protected area info | ET, RU, EN | Free | iOS v1.8.3 25 Nov 2025, 3.75 (n=28) | Low today, but it is the app Elron and RMK tell mushroom pickers to use |
| **Elron Seeneekspress** | Elron, RMK, Eesti Loodusmuuseum, UT loodusmuuseum, Tartu loodusmaja | Web page | List and map of state forests near rail stops with walking distance (100 m to 2 km) and species to expect (chanterelle, porcini, saffron milk cap, boletes); September 2026 exhibitions and guided "Seenelise ABC" walks | ET | Free | 2026 season live; recommends RMK app for navigation | Medium as a distribution partner; it is editorial, not data |
| **PlutoF GO / Legulus / eElurikkus** | University of Tartu Natural History Museum (app by Cloudberry Solutions OÜ) | iOS, Android, web | PlutoF GO records observations, sounds, specimens with photo/video, offline taxonomy, upload later; no map of public records in the app. Legulus is a browser entry form. eElurikkus shows about 7M occurrence records for 45,544 species with area search and species maps | Web ET/EN; app store lists EN only (UI language unverified) | Free | PlutoF GO v1.24.51 30 Sep 2026, no ratings | Data source and upstream partner, not a competitor; eElurikkus is the only Estonian public fungi map and is a research portal, not a foraging tool |
| Tartu loodusmuuseum, Eesti Mükoloogiaühing | UT | Web, events | Mushroom week exhibition in September, school programme "Seened 1", chanterelle fact sheet; identification help at exhibitions | ET | Free | Active | Content partners; no digital ID or map tool found |
| "seened", "Eesti seened" (2018 blog) and UT 2019 / TalTech 2021 thesis ID apps | unknown, students | Android, iOS | Photo guides with edibility; neural-net ID prototypes | ET | Free | Not found on Google Play on 17 Oct 2026 (unverified) | None |

Everyman's right: RMK's igaüheõigus page states that wild berries, mushrooms and other non-protected natural products may be picked; on unfenced, unmarked private land unless the owner forbids it (sign or verbal); fenced or marked land needs permission; protected areas follow their own regulation. No app in this review carries this content.

## Group 2: Nordic and Baltic

| Product | Maker, country | Platform | Core | Languages | Price | Signal | Overlap |
|---|---|---|---|---|---|---|---|
| **Tattis** | Lait On Oy, FI | iOS, Android | Species-specific heatmaps from forest type, soil, terrain and daily FMI weather; offline maps; harvest push notifications; private journal; 32 edible species (Luontoportti texts); one-tap sharing to laji.fi; no sign-in | EN listed | Free (IAP not shown) | First release 12 May 2026, v2.2.1 30 Sep 2026, 4.1 (n=8), 1k+ | Highest conceptual overlap outside Estonia: habitat plus weather plus journal plus offline, but Finland only |
| **Hitta Skog: Svamp och Bär** | Ecotype AB, SE | iOS (Android unverified) | Filter forests by tree species, age, soil moisture; species models; rain history; track trips and finds; save spots; "find the car" function; key biotopes and species observations layers | SV/EN | Free tier plus paid | Since 2021, v1.0.28 Jul 2026, 3.9 (n=405) | High on concept, Sweden only |
| **Kantarellappen** | STC AB, SE | iOS (Android unverified) | Computed chanterelle areas, chanterelle roads and trails, forest filter; partial coverage of Sweden | SV | Subscription | Since 2023, 3.1 (n=104) | Proves a chanterelle-only paid app exists and gets mediocre ratings |
| **Mina Kantarellställen / My Mushroom Spots** | VNIL AB, SE | iOS | GPS spots with photo and note, accuracy readout, "Mycelium Compass" direction and distance to a spot, filters, hunt sessions, iCloud sync, CSV/JSON export | SV, EN | 5 free spots, 5.99 USD one-time | Since 2015, v2.1.1 Sep 2026, 3.25 (n=8 SE) | The only app found with a true walk-to-spot compass |
| **Svampguiden+** | semaro / Michael Krikorev (SLU Artdatabanken mycologist), SE | iOS, Android | ID keys, glossary, texts and photos beyond the website; site has 10,000 visitors/day in season | SV, EN | Free listing | v2.3.2 Oct 2026, 4.56 (n=709) | ID reference only; his books exist in Estonian translation |
| **Sieniäppi** | SuperApp Oy, FI | iOS | Camera ID of 200+ Finnish species, distribution maps, map notes, gamified levels | FI | Annual subscription required | 3.1 (n=22) | Low |
| **Nature Notebook (Mobiilivihko)** | University of Helsinki / FinBIF, FI | iOS, Android | Record observations with GPS and photos to laji.fi; open source | EN listed | Free | v1.9.13 Oct 2026, 3.0 (n=2) | Data collection, not finding |
| **Atlas of Danish Fungi (Svampeatlas)** | CareSupport ApS / Noque ApS for Natural History Museum of Denmark, DK | iOS, Android | Map of all user observations with photos, species found near you, AI ID suggestions, expert validation, offline personal collection, 3,000+ species; 700,000+ app observations | DA, EN, CS | Free | iOS v3.0 Oct 2022, 3.2 (n=56) | The best public-observation map model in the region; stale on iOS |
| **Artsorakel** | Artsdatabanken, NO | iOS, Android | AI photo ID of wild species, no account, photos sent to server | NB, NN, SV, EN, NL, ES | Free | v4.0.2 Dec 2025, 3.3 (n=128) | ID only |
| **Digital soppkontroll** | Infohub AS for Norges sopp- og nyttevekstforbund, NO | iOS, Android, web | Human expert checks your photos; lists physical check points; endorsed by FHI | NB | Free | v2.5.0 Aug 2026, 4.2 (n=61) | Shows a human-verification model that beats AI on trust |
| Artportalen (SE), Artsobservasjoner (NO) | SLU Artdatabanken; Artsdatabanken | Web, mobile web | National reporting portals with today's finds maps and atlas maps; no native app mentioned | SV/EN; NB/EN | Free | Live | Data sources, like eElurikkus |
| **4est: Mushroom Logbook** | Ugis Karulis, LV | iOS (Android unverified) | On-device offline photo recognition, 2,800-species library, private journal with maps, achievements, community sharing with locations private by default | EN, ET, LV, LT, RU | Free, no subscription | First release 5 Oct 2026, v1.1.0 11 Oct 2026, no ratings | High on own-log, Baltic languages, offline ID; no public evidence map, no compass |
| LVM GEO Mobile, Dabas dati, Dabas Tūrisms, BalticMaps | LVM, Jāņa sēta, DAP, LV | iOS, Android | Forest compartments and spot saving (LVM GEO), observation reporting, trails, topo maps | LV/EN | Free or freemium | LVM GEO v5.4.0 Apr 2026, 4.0 (n=86) | Latvian press (LSM, 2024) states no app shows the best mushroom spots; same gap as Estonia |
| Lithuania | | | Only a 2021 VU thesis found; no public grybų app verified | | | | Unverified gap |

## Group 3: global ID apps

| Product | Maker | Platform | Core | Price | Signal | Overlap |
|---|---|---|---|---|---|---|
| **Picture Mushroom** | Next Vision Ltd (Glority) | iOS, Android | Photo ID, toxicity warnings, seasonal recommendations with distribution maps, collection-spot tracking, 18 languages | Free, yearly premium with 7-day trial | iOS 4.7 (n=24,572), Play 4.6 (n=59.6K), 2.5M+ installs, v2.14.0 Oct 2025 | Category leader; spot tracking is a side feature |
| **Mushroom Identificator (Champignouf)** | AnnapurnApp Technologies UG, DE | iOS, Android | Photo ID of 2,000+ types, edible list, save finds on a map, quiz | Free, 4.99 USD/yr sync | Since 2017, v1.35 Sep 2026, 4.7 (n=20 EE store) | This is the "mushroom identify" app Estonian bloggers used in 2018 |
| **Shroomify** | Simon Grogan | iOS, Android | Trait-based ID, geo-targeted calendar, 400 species, regional editions | 5.99 USD paid, no IAP | 4.66 (n=2,086), v2.1.33 Oct 2026 | Low; good model for lookalike and calendar content |
| **ShroomID** | ZH Creations LLC | iOS, Android | Photo ID, calendars, encyclopedia with lookalikes, forum | Free | 4.6 (n=434), last iOS update Nov 2023 | Stale |
| **iNaturalist** and **Seek** | iNaturalist (nonprofit) | iOS, Android, web | 300M+ observations, AI suggestions, community ID, per-observation maps, Estonian UI; obscures sensitive taxa and user-chosen records. Seek is the gamified family version with no public map | Free | Seek 4.75 (n=30,914), v2.18.2 Sep 2026 | Primary data source; its map is research-oriented, not forager-oriented |
| **Mushroom Observer** | Mushroom Observer, Inc., US | Web, iOS | Observation records; site currently restricted to verified accounts | Free | iOS v1.2.4 Oct 2024, 1 rating | None for Estonia |

## Group 4: foraging maps, spot logs, outdoor GPS

| Product | Maker | Platform | Core | Price | Signal | Overlap |
|---|---|---|---|---|---|---|
| **Mushroom Spot: mushroom map** | FOREST SPOT LLC | iOS (Android unverified) | Claims 1,000,000+ public spots across 800 species; private spots; arrow-and-line guidance to a spot plus hand-off to phone navigation; AI ID; languages EN, FI, DE, NB, RU, SV | Free, PRO 19.99 USD/yr, 13.99/month, 79.99 lifetime | v2.6.2 Sep 2026, 4.5 (n=25); developer says spot density depends on country | Closest global analogue to a public map with guidance; data is unverified crowd pins |
| **Sporecast** | Sporecast Ltd | iOS, Android | AI spot discovery from climate, soil and tree data; photo ID; daily forecasts; personal log; map of reported locations by species | Free, Pro annual | First release Jul 2025, 75K+ installs, 4.5 (n=23) | High on concept, no Estonian data or language |
| Mushroom Map: Spots near you | Picture & Photo Identifier Company Ltd | iOS | Community sightings map, route planning in premium | 4.99 USD/week or 29.99/yr | 1.4 (n=10), last update May 2026 | Cautionary example: weekly subscription, poor trust |
| **Falling Fruit** | Falling Fruit (nonprofit), US | Web, iOS, Android | Crowd map of edibles incl. fungi, about one million locations claimed | 0.99 USD iOS | v0.3.2 Sep 2026, 2.4 (n=116) | Low in Estonia; proves nonprofit open-data maps age badly without a mobile focus |
| **Locus Map** | Asamm Software, CZ | Android, iOS Lite | Offline vector maps, personal points, "beeline guidance to a point on map or by compass", 5M+ installs, 30+ languages | Free tier, Silver/Gold | Mature | The generic tool a skilled forager already uses for walk-to-spot |
| Komoot, Gaia GPS, Avenza Maps | komoot GmbH; Gaia (maker not shown on site); Avenza Systems (Blue Marble) | iOS, Android, web | Offline routes and maps, placemarks, follow a heading to coordinates (Avenza), turn-by-turn (komoot) | Free plus premium | Mature | Substitutes for navigation only; no mushroom semantics |

Note: Forager's Diary, Shroom Spots and Fungi Map were searched for by name and not found (unverified; names may be misremembered).

## Feature matrix

Legend: Y yes, P partial, N no or not found, ? unverified. "Public map" means a map of finds not made by the user.

| Product | Public finds map | Own spot log | Compass to spot | Offline tiles | ID help | Lookalike warnings | Everyman's right | Season index | Estonian UI | Price |
|---|---|---|---|---|---|---|---|---|---|---|
| Kukeseen (planned) | Y, evidence tiers | Y | Y | Y | Y (learning) | Y | Y | Y | Y + EN | tbd |
| Seeneleidja | N (habitat model) | P (favourite forests) | N (hand-off to Maps/Waze) | Y | N | N | N | N | ? likely | free + sub |
| Seenetuvastaja | N | Y | N | N | Y (AI) | Y | N | P (weather per find) | Y | free + Pro |
| Mushby | N | P (collection) | N | N | Y (AI, chat) | Y | N | N | Y | free, ads, IAP |
| 4est | P (community shares) | Y | N | ? (offline ID yes) | Y (on-device) | ? | N | N | Y | free |
| RMK Loodusega koos | N | N | N (directions) | N | N | N | N | N | Y | free |
| Elron Seeneekspress | P (editorial forests) | N | N | N | N | N | N | N | Y | free |
| eElurikkus / PlutoF GO | Y (research portal) / N | N / Y (upload) | N | N / P (taxonomy) | N | N | N | N | Y / ? | free |
| iNaturalist | Y (obscuring) | Y | N | N | Y (AI + community) | N | N | N | Y | free |
| Tattis | N (heatmap model) | Y | N | Y | P (32 species) | ? | N | Y (FI weather) | N | free |
| Hitta Skog | P (species obs layer) | Y | P (find the car) | ? | P | N | N | P (rain history) | N | freemium |
| Kantarellappen | N (model) | ? | N | ? | N | N | N | N | N | subscription |
| Mina Kantarellställen | N | Y | Y | N | N | N | N | N | N | 5.99 one-time |
| Atlas of Danish Fungi | Y (700K+) | Y | N | P (own collection) | Y (AI + experts) | N | N | N | N | free |
| Artsorakel / Soppkontroll | N | N | N | N | Y (AI) / Y (human) | N | N | N | N | free |
| Picture Mushroom | P (distribution maps) | Y | N | N | Y (AI) | Y | N | P | N (18 langs) | subscription |
| Shroomify / ShroomID | N | N | N | ? | Y (traits / AI) | Y | N | Y (calendar) | N | paid / free |
| Mushroom Spot | Y (crowd, unverified) | Y | Y (arrow) | N | Y (AI) | ? | N | N | N (FI, SV, RU) | free + PRO |
| Sporecast | Y (reported) | Y | N | ? | Y (AI) | ? | N | Y (forecast) | N | free + Pro |
| Falling Fruit | Y (crowd) | Y | N | N | N | N | N | N | N | 0.99 |
| Locus Map | N | Y (points) | Y (beeline) | Y | N | N | N | N | Y (30+ langs) | freemium |

## Gap analysis

1. **Open-data evidence map for Estonia**: nobody. eElurikkus has the records but is a research portal; iNaturalist's map is per observation and obscures some fungi; Seeneleidja and the Nordic apps model habitat instead of showing evidence; Mushroom Spot and Sporecast show unverifiable crowd pins. An evidence-tiered layer (material sample vs human observation vs research-grade photo, with dates) is new in the region.
2. **Habitat plus evidence**: Seeneleidja already ships forest-register stands offline; Tattis and Hitta Skog add weather. Nobody fuses forest-register habitat with observation evidence, which is the combination a Tartu forager actually wants.
3. **Walk-to-spot compass**: only Mina Kantarellställen, Mushroom Spot and generic Locus Map. None in Estonian, none on a public evidence layer.
4. **Everyman's right and protected-area rules**: zero apps. RMK's web page is the only source; Kukeseen can be the first app to put the sign rule and protected-area caveat next to the pin.
5. **Honest ID learning instead of AI verdicts**: ERR (Estonia) and FHI (Norway) both warn against AI edibility calls, Danish Svampeatlas uses expert validation, Norway uses human photo checks. A lookalike-first learning module (false chanterelle, jack-o'-lantern) with no edibility verdict is a credible, under-served stance.
6. **PWA**: every competitor is a native store app with subscriptions. A PWA can be linked from Seeneekspress, RMK or museum pages without store friction.
7. **Season index for Estonia**: Tattis does it for Finland, Sporecast globally with no Estonian tuning. Nothing for Estonia.
8. **Data thinness is the real gap**: 77 iNaturalist and 295 GBIF human-observation chanterelle records for the whole country means Tartu-region density will be low. The product must say so and lean on habitat and the user's own log to stay useful.

## Threats

- **Seeneleidja** (updated 16 Oct 2026) has offline tiles, forest-register habitat and favourites; adding an observation layer and a compass is weeks of work. It is the incumbent to watch and possibly partner with.
- **Seenetuvastaja** (updated 16 Oct 2026) already stores weather and habitat per find and speaks ET/FI/LV/LT/RU; making private finds optionally public would produce a crowd map overnight.
- **4est** (5 Oct 2026) is Baltic-first with community sharing and offline on-device ID; a public map is a natural next release.
- **Tattis** could port its forest-type and weather model to Estonia; the Estonian forest register is open and the species list overlaps.
- **RMK** could add a mushroom forest layer to Loodusega koos using Seeneekspress content; it has distribution via Elron and the museums and ships Land Board base maps already.
- **Mushroom Spot or Sporecast** adding Estonian language and seeding from GBIF would claim the "public map" word first, with unverifiable data.
- **iNaturalist** itself: free, Estonian UI, growing (12,820 fungi observations in Estonia). If the Estonian mycology community pushes foragers to it, a separate finder must justify itself through evidence tiers, habitat and navigation, not through "having a map".
- **Policy risk**: exposing precise chanterelle locations may be read as harvesting pressure; iNaturalist already obscures 4 of the 77 Estonian records. Respect obscuring and record licences.

## Positioning recommendations

1. **Claim "evidence, not guesses"**: Kukeseen is the only product that shows where chanterelles have actually been documented, with the tier and date on each pin, and says plainly where there is no evidence. Contrast with habitat heatmaps and anonymous crowd pins.
2. **Fuse the two Estonian strengths**: evidence layer plus forest-register habitat (the thing Seeneleidja proved people pay for), then let the compass take you there. That triple does not exist anywhere in this review.
3. **Be the legal and safety layer**: everyman's right rules, sign and fence logic, protected-area caveat and lookalike cards shipped in ET and EN. No competitor does this; RMK and the museums are natural co-signers.
4. **No edibility verdicts, no AI promise**: position identification as learning. Link out to iNaturalist for community ID, consider a later human-check channel modelled on Digital soppkontroll with Eesti Mükoloogiaühing.
5. **Pricing**: free core with a one-time or supporter payment. Weekly subscriptions earn 1.4-star reviews (Mushroom Map); Kantarellappen's subscription earns 3.1. Local-first private log (no account, nothing uploaded) matches what Seeneleidja and 4est already promise.
6. **Distribution through partners, not stores**: PWA link on Seeneekspress and museum mushroom-week pages; Tartu-first density matched to Tartu loodusmaja and UT museum events.
7. **Roadmap defence**: ship compass, offline tiles and evidence tiers before Seeneleidja or 4est add a public layer; contribute user finds back to PlutoF or iNaturalist optionally so the ecosystem has a reason to prefer Kukeseen.

## Unverified items

- Seeneleidja UI language, iOS availability and subscription price.
- "seened" and "Eesti seened" apps from 2018: not found in Google Play on 17 Oct 2026, assumed removed.
- Sieniopas (FI, 200-species offline guide listed in a 2020 Finnish forager leaflet) current status; Forager's Diary, Shroom Spots, Fungi Map, "Mushroom ID: Fungi Identifier" exact products; Lithuanian consumer apps.
- Android availability for Hitta Skog, Kantarellappen, 4est and Mushroom Spot; Svampguiden+ in-app pricing; Tattis in-app pricing; PlutoF GO UI language.
- Mushroom Spot's "1,000,000 spots" and Falling Fruit's location counts are developer claims.

## Sources (opened)

Estonia: https://plutof.ut.ee/go ; https://elurikkus.ee/en ; https://elurikkus.ee/en/lvm/kkk ; https://elron.ee/seeneekspress ; https://news.err.ee/1610122894/mushroom-train-to-cater-to-estonia-s-foraging-enthusiasts-this-fall ; https://rmk.ee/looduses-liikumine/juhised/igauheoigus/ ; https://rmk.ee/loodusope/lahme-metsa-seenele-ja-marjule/ ; https://dspace.ut.ee/items/6ef57db4-e44b-4614-8531-a659d50df1a4 ; https://www.goodreads.com/author_blog_posts/17381606-5-nippi-ppi-seenelk-iguks?tab=author ; https://play.google.com/store/apps/details?id=ee.mushroomfinder.app ; https://play.google.com/store/apps/details?id=ee.rahanetis.seenetuvastaja ; https://play.google.com/store/apps/details?id=app.pixoby.mushby ; https://play.google.com/store/apps/details?id=bazinac.aplikacenahouby ; https://www.similarweb.com/app/apple/6764726334/

Nordic and Baltic: https://mwm.ai/apps/tattis/6763710165 ; https://svampguiden.com/ ; https://svampguiden.com/om ; https://svampguiden.com/app ; https://www.artportalen.se/ ; https://www.artsobservasjoner.no/ ; https://apps.apple.com/no/app/id1522271415 ; https://apps.apple.com/app/id1467728588 ; https://www.similarweb.com/app/google/com.noque.svampeatlas/ ; https://apps.apple.com/app/id930379621 ; https://luontoportti.com/en ; https://www.sll.fi/wp-content/uploads/sites/72/2020/09/hyodyllisia-sovelluksia-sienestajalle.pdf ; https://www.lsm.lv/raksts/dzive--stils/tehnologijas-un-zinatne/28.08.2024-senotaju-slepenie-sabiedrotie-praktiskas-lietotnes-kas-noderes-daba-gajejiem.a566126/

Global and foraging maps: https://www.inaturalist.org/ ; https://mushroomobserver.org/ ; https://mwm.ai/de/apps/picture-mushroom-identifier/1474578078 ; https://realmushrooms.com/blogs/rm/best-mushroom-identification-app-top-3-reviewed/ ; https://mwm.ai/apps/shroomify-mushroom-id/6775295473 ; https://mwm.ai/apps/sporecast-mushroom-map/6745700034 ; https://apps.apple.com/app/id1660126297 ; https://apps.appfollow.io/ios/mushroom-map-spots-near-you/6746188596?country=nl ; https://en.wikipedia.org/wiki/Locus_Map ; https://www.komoot.com/ ; https://www.gaiagps.com/ ; https://store.avenza.com/

APIs queried directly: https://itunes.apple.com/search (terms listed in the tables, countries ee, fi, se, no, dk, lv, lt, us, fr) ; https://api.gbif.org/v1/occurrence/search?taxonKey=5249504&country=EE ; https://api.inaturalist.org/v1/observations?taxon_id=47347&place_id=8265 ; https://play.google.com/store/search?q=seened&c=apps&hl=et&gl=EE (and related queries).

Not opened (rate limited or 404), so no claims beyond store API fields: Falling Fruit site and App Store page, Digital soppkontroll App Store page, Seek page, RMK app web page, Shroomify store page, Mushroom Observer app page, svampe.databasen.org.
