# ADR 0002: Forest-register habitat layer as live WFS vectors, cached per cell

Date: 2026-10-17. Status: accepted.

## Context
Chanterelle evidence is sparse (21 spots). Foragers want to see where mature pine and spruce stand on suitable site types. The Estonian forest register (metsaregister, Keskkonnaagentuur) publishes stands (eraldis) with main species, mean age, site type, height, area and ownership under CC BY 4.0 through a public GeoServer at gsavalik.envir.ee with WMS and WFS, and the server allows cross-origin requests.

## Options
1. WMS raster overlay. Rejected: the eraldis layer renders only in EPSG:3301 (Web Mercator and EPSG:4326 requests return blank tiles), and even the EPSG:3301 render carried no usable styling at forest scale. Reprojecting tiles would need proj4leaflet and would misalign by about 2.5 degrees of grid convergence near Tartu.
2. Bundled vector data. Rejected for now: a country-wide filtered extract is tens of megabytes and would need a build step and a refresh process; it stays an option for a fully offline edition.
3. Live WFS GeoJSON per map cell. Chosen.

## Decision
When the layer is on and zoom is 13 or more, the app requests the stands intersecting each z13 web-mercator cell in view with a CQL filter (main species MA or KU, mean age 40 or more) and a trimmed property list. A filtered cell is about 130 KB raw, 30 KB gzipped, 150 stands, under 100 ms server time. Cells are keyed by tile x/y and a version tag in the URL; the service worker caches them cache-first together with map tiles, and "Download map" prefetches the cells around a spot. Styling is client side: gold for pine, green for spruce, fill opacity by age band, a thick peat outline for heath and dry-heath site types. Tapping a stand shows species, age, site type with its type class, height, area, ownership and a chanterelle suitability verdict derived from the site-type class, plus a compass button to that point.

## Consequences
- Works offline only for downloaded or previously viewed cells; the UI says so.
- The age filter above 40 is applied client side so cached cells are shared between filters.
- Depends on a third-party server with no stated quota; if it goes away the layer degrades to nothing rather than breaking the app. Attribution is shown on the map and in About.
