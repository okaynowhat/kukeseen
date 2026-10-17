// Spot data compiled 2026-10-17 from open sources. See notes/kukeseened-tartu-haaslava-2026-10-17.md in the repo.
// Tiers: A = georeferenced fruiting-body observation, B = soil DNA detection (mycelium, not fruiting),
// C = named as chanterelle forest by RMK, Elron or press, D = habitat inference only.
// Coordinates WGS84. Routes are from Haaslava village centre (58.3286, 26.8164), computed with OSRM.
window.KS_DATA = {
  home: { lat: 58.3286, lon: 26.8164, name: 'Haaslava' },
  regions: {
    kastre:  { et: 'Kastre vald, alla 10 km', en: 'Kastre parish, under 10 km' },
    polva:   { et: 'Põlvamaa männivöönd', en: 'Põlva pine belt' },
    elva:    { et: 'Elva ja Nõo', en: 'Elva and Nõo' },
    jarvselja: { et: 'Järvselja', en: 'Järvselja' },
    peipsi:  { et: 'Peipsi liivavöönd', en: 'Peipsi sand belt' },
    tartu:   { et: 'Tartu ümbrus', en: 'Around Tartu' }
  },
  spots: [
    {
      id: 'unikula-vooremae', region: 'kastre', tier: 'A', lat: 58.27049, lon: 26.87095, acc: 20,
      name: { et: 'Uniküla / Vooremäe riigimets', en: 'Uniküla / Vooremäe state forest' },
      park: { lat: 58.2846, lon: 26.8915, label: { et: 'Vooremäe tervisekeskuse parkla', en: 'Vooremäe health centre car park' } },
      km: 7.9, min: 13,
      route: { et: 'Haaslavalt teele 22140 (Tõrvandi–Roiu–Uniküla), läbi Roiu, edasi Uniküla suunas. Tervisekeskus jääb paremale. Leiukoht on massiivi edelaservas, parklast umbes 1,7 km mööda suusaradu.',
               en: 'From Haaslava take road 22140 (Tõrvandi–Roiu–Uniküla), through Roiu and on toward Uniküla. The health centre is on the right. The find is on the south-west edge of the massif, about 1.7 km from the car park along the ski loops.' },
      habitat: { et: 'Künklik segamets riigimetsas, suusa- ja terviserajad, kelgumägi. RMK: Vooremäe suusarajad 104 ha kõrgendatud avaliku huviga mets. 8 ha raadatakse alajaama tarbeks, oota uusi raiesmikke.',
                 en: 'Hilly mixed state forest with ski and health trails. RMK lists the 104 ha Vooremäe ski-trail forest as public-interest forest. An 8 ha substation clearing is planned, so expect fresh clearcuts.' },
      evidence: [
        { date: '2020-08-01', src: 'iNaturalist 55035730, research grade, täpsus 20 m', url: 'https://www.inaturalist.org/observations/55035730' },
        { date: '2024', src: 'RMK Kastre valla riigimetsa kava: Vooremäe suusarajad 104 ha', url: 'https://rmk.ee/wp-content/uploads/2024/10/Kastre_valla_riigimets.pdf' }
      ]
    },
    {
      id: 'kaagvere', region: 'kastre', tier: 'A', lat: 58.3439, lon: 26.87405, acc: 100,
      name: { et: 'Kaagvere riigimets', en: 'Kaagvere state forest' },
      park: { lat: 58.3395, lon: 26.8818, label: { et: 'Kaagvere tee ääres, metsatee suue', en: 'Roadside on Kaagvere tee at the forest track' } },
      km: 9.3, min: 16,
      route: { et: 'Roiule teed 22140, siis 22269 Sooru–Kure, 22260 Vana-Kastre–Roiu ja Kaagvere tee. Linnulennult vaid 3,8 km Haaslavalt, Kurepalu kaudu ka rattaga.',
               en: 'To Roiu on road 22140, then 22269 Sooru–Kure, 22260 Vana-Kastre–Roiu and Kaagvere tee. Only 3.8 km in a straight line from Haaslava, also bikeable via Kurepalu.' },
      habitat: { et: 'Okasmets ja segamets kõrvuti (OSM). RMK: Kaagvere 32 ha kõrgendatud avaliku huviga riigimets.', en: 'Conifer and mixed blocks side by side (OSM). RMK lists Kaagvere, 32 ha, as public-interest state forest.' },
      evidence: [
        { date: '2013-08-18', src: 'GBIF, Irja Saar (TÜ mükoloog), täpsus 100 m', url: 'https://www.gbif.org/occurrence/search?taxon_key=5249504&country=EE' },
        { date: '2024', src: 'RMK Kastre valla kava: Kaagvere 32 ha', url: 'https://rmk.ee/wp-content/uploads/2024/10/Kastre_valla_riigimets.pdf' }
      ]
    },
    {
      id: 'roiu-pakste', region: 'kastre', tier: 'A', lat: 58.30, lon: 26.90, acc: 3000,
      name: { et: 'Roiu–Päkste–Sillaotsa metsad', en: 'Forests east of Roiu (Päkste, Sillaotsa)' },
      km: 7.8, min: 14,
      route: { et: 'Tee 22140 läbi Roiu, siis 22266 Sillaotsa–Kriimani. Koordinaat on ümardatud, viga kuni 3 km: otsi Roiust ida pool asuvaid männi-kuuse segametsi.',
               en: 'Road 22140 through Roiu, then 22266 Sillaotsa–Kriimani. The coordinate is rounded, error up to 3 km: search the pine-spruce mixed forests east of Roiu.' },
      habitat: { et: 'Elupaik kirjes "forest". Leid oktoobri algusest, seega sobib hilissügiseks.', en: 'Habitat recorded as "forest". Found in early October, so a late-season candidate.' },
      evidence: [ { date: '2017-10-07', src: 'GBIF, Eesti Looduseuurijate Selts, Andres Kohv, koordinaadid ümardatud', url: 'https://www.gbif.org/occurrence/search?taxon_key=5249504&country=EE' } ]
    },
    {
      id: 'kurepalu', region: 'kastre', tier: 'D', lat: 58.3120, lon: 26.8420, acc: 1500,
      name: { et: 'Kurepalu riigimets', en: 'Kurepalu state forest' },
      km: 3.0, min: 6,
      route: { et: 'Haaslavalt Kurepalu suunas, riigimetsa lõigud jäävad Kurepalu ja Roiu vahele.', en: 'From Haaslava toward Kurepalu; the state forest blocks lie between Kurepalu and Roiu.' },
      habitat: { et: 'RMK: Kurepalu 41 ha ja Kurepalu suvilad 52 ha kõrgendatud avaliku huviga riigimets. Leidu andmebaasides pole, kontrolli samblase männi-kuuse seguga lõike.',
                 en: 'RMK: Kurepalu 41 ha and Kurepalu summer houses 52 ha public-interest state forest. No recorded find; check mossy pine-spruce sections.' },
      evidence: [ { date: '2024', src: 'RMK Kastre valla kava, kõrgendatud avaliku huviga alad', url: 'https://rmk.ee/wp-content/uploads/2024/10/Kastre_valla_riigimets.pdf' } ]
    },
    {
      id: 'tartu-tamme', region: 'tartu', tier: 'A', lat: 58.36583, lon: 26.71189, acc: 200,
      name: { et: 'Tartu lõunaserv (Tamme/Ropka)', en: 'Tartu south edge (Tamme/Ropka)' },
      km: 10.6, min: 18,
      route: { et: 'Roiu tee Tartusse, Võru tänav. Tõenäoliselt aia- või pargileid, mitte seenemets.', en: 'Roiu road into Tartu, Võru street. Probably a garden or park find, not a foraging forest.' },
      habitat: { et: 'Mändidega liivane elurajoon. Näitab, et Tartu männialune kannab kukeseeni.', en: 'Sandy residential area with pines. Shows that Tartu pine stands carry chanterelles.' },
      evidence: [ { date: '2024-08-19', src: 'GBIF, Leho Tedersoo (TÜ)', url: 'https://www.gbif.org/occurrence/search?taxon_key=5249504&country=EE' } ]
    },
    {
      id: 'kiidjarve', region: 'polva', tier: 'C', lat: 58.1288, lon: 26.9942, acc: 300,
      name: { et: 'Kiidjärve rongipeatus ja riigimets', en: 'Kiidjärve rail stop and state forest' },
      park: { lat: 58.1405, lon: 27.0336, label: { et: 'RMK Kiidjärve looduskeskus', en: 'RMK Kiidjärve visitor centre' } },
      km: 32.3, min: 40,
      route: { et: 'Haaslava–Aadami–Uniküla (22262), Igevere–Vana-Kuuste (22263), Haaslava–Vana-Kuuste (22141), maantee 61 Põlva–Reola lõunasse, siis 18138 Akste–Häätaru.',
               en: 'Haaslava–Aadami–Uniküla (22262), Igevere–Vana-Kuuste (22263), Haaslava–Vana-Kuuste (22141), road 61 Põlva–Reola south, then 18138 Akste–Häätaru.' },
      habitat: { et: 'Männikud liivasel pinnasel. Elron/RMK Seeneekspress: "Kukeseened ja kivipuravikud, leiab ka sirmikuid!" Riigimets 200 m peatusest.', en: 'Pine on sand. Elron/RMK Seeneekspress: "Chanterelles and penny buns, parasols too!" State forest 200 m from the stop.' },
      evidence: [
        { date: '2026', src: 'Elron Seeneekspress, RMK valitud riigimetsad', url: 'https://elron.ee/seeneekspress' },
        { date: '2022-06-17', src: 'GBIF, Kiidjärve küla, Jaan Poska Gümnaasium', url: 'https://www.gbif.org/occurrence/search?taxon_key=5249504&country=EE' },
        { date: '2015-06-26', src: 'Tartu Postimees: turu kukeseened Ahja metsadest', url: 'https://tartu.postimees.ee/3236831/tartu-turg-pakub-nii-metsmaasikaid-kui-ka-kukeseeni' }
      ]
    },
    {
      id: 'vastse-kuuste', region: 'polva', tier: 'A', lat: 58.12644, lon: 27.04866, acc: 50,
      name: { et: 'Vastse-Kuuste mets', en: 'Vastse-Kuuste forest' },
      km: 36.4, min: 47,
      route: { et: 'Nagu Kiidjärvele, maanteelt 61 edasi 18138 Akste–Häätaru ja 18146 Kanariku–Kiidjärve.', en: 'As for Kiidjärve, then 18138 Akste–Häätaru and 18146 Kanariku–Kiidjärve.' },
      habitat: { et: 'Ahja jõe ürgoru männikud, Natura 2000 ala. Samas kandis Ahja N2000 leid 2024.', en: 'Pine forests of the Ahja river valley, Natura 2000. Ahja N2000 record 2024 nearby.' },
      evidence: [
        { date: '2021-08-28', src: 'iNaturalist 92778416, research grade', url: 'https://www.inaturalist.org/observations/92778416' },
        { date: '2024-08-14', src: 'GBIF, Ahja N2000, täpsus 7 m (58.13204, 27.04634)', url: 'https://www.gbif.org/occurrence/search?taxon_key=5249504&country=EE' }
      ]
    },
    {
      id: 'taevaskoja', region: 'polva', tier: 'A', lat: 58.11531, lon: 27.04144, acc: 50,
      name: { et: 'Taevaskoja ja Saesaare', en: 'Taevaskoja and Saesaare' },
      park: { lat: 58.1150, lon: 27.0440, label: { et: 'Saesaare parkla, matkaraja algus', en: 'Saesaare car park, trail head' } },
      km: 36.0, min: 43,
      route: { et: 'Maantee 61 Põlva–Reola, siis 18146 Kanariku–Kiidjärve Taevaskojale. Rongiga: Taevaskoja peatus, mets 800 m.', en: 'Road 61 Põlva–Reola, then 18146 Kanariku–Kiidjärve to Taevaskoja. By train: Taevaskoja stop, forest 800 m.' },
      habitat: { et: 'Seeneekspress: "Männi- ja segametsad, korja kukeseeni ja puravikke!" Leiud 2020, 2021 ja september 2025, lisaks lehter-kukeseen 23.08.2025.', en: 'Seeneekspress: "Pine and mixed forests, pick chanterelles and boletes!" Finds 2020, 2021 and Sept 2025, plus funnel chanterelle 23 Aug 2025.' },
      evidence: [
        { date: '2021-08-28', src: 'iNaturalist 92817104 Saesaare', url: 'https://www.inaturalist.org/observations/92817104' },
        { date: '2020-08-30', src: 'iNaturalist 59866822 Pargi (58.10384, 27.02767) ja 58034678 Kadi (58.10715, 27.06971)', url: 'https://www.inaturalist.org/observations/59866822' },
        { date: '2025-09-14', src: 'GBIF, Taevaskoja küla, täpsus 6 m (58.11317, 27.05197); ka 2025-09-27 (58.10202, 27.07004)', url: 'https://www.gbif.org/occurrence/search?taxon_key=5249504&country=EE' },
        { date: '2025-08-23', src: 'iNaturalist 308382522, lehter-kukeseen, Kiidjärve metskond 79 (58.11358, 27.05233)', url: 'https://www.inaturalist.org/observations/308382522' },
        { date: '2026', src: 'Elron Seeneekspress, Taevaskoja peatus', url: 'https://elron.ee/seeneekspress' }
      ]
    },
    {
      id: 'valgesoo', region: 'polva', tier: 'A', lat: 58.10902, lon: 27.05905, acc: 59,
      name: { et: 'Valgesoo, Ottenipõllu', en: 'Valgesoo, Ottenipõllu' },
      km: 36.9, min: 53,
      route: { et: 'Roiu, 22266 Sillaotsa–Kriimani, 22265 Reola–Hammaste, maantee 45 Tartu–Räpina, siis 18181 Kärsa–Eoste. Või Taevaskoja kaudu.', en: 'Roiu, 22266 Sillaotsa–Kriimani, 22265 Reola–Hammaste, road 45 Tartu–Räpina, then 18181 Kärsa–Eoste. Or via Taevaskoja.' },
      habitat: { et: 'Valgesoo raba servamännikud, liivane pinnas, vana kuusik raja lõpus.', en: 'Edge pine forests of Valgesoo bog, sandy soil, old spruce at the trail end.' },
      evidence: [ { date: '2023-09-13', src: 'iNaturalist 183069322, research grade, täpsus 59 m', url: 'https://www.inaturalist.org/observations/183069322' } ]
    },
    {
      id: 'palojarv', region: 'polva', tier: 'A', lat: 58.08235, lon: 26.91613, acc: 10,
      name: { et: 'Palojärv', en: 'Palojärv' },
      park: { lat: 58.0835, lon: 26.9120, label: { et: 'RMK Palojärve telkimisala', en: 'RMK Palojärve camping area' } },
      km: 33.2, min: 47,
      route: { et: 'Vana-Kuuste kaudu maanteele 61, siis 18115 Vooreküla–Puskaru.', en: 'Via Vana-Kuuste to road 61, then 18115 Vooreküla–Puskaru.' },
      habitat: { et: 'Palumännik järve ümber. Värskeim kirje kogu andmestikus: 13.09.2026. Puhkaeestis nimetab telkimisala korjealaks.', en: 'Heath pine forest around the lake. Freshest record in the dataset: 13 Sept 2026. Puhkaeestis lists the camping area as a picking area.' },
      evidence: [
        { date: '2026-09-13', src: 'GBIF, Allar Antson, täpsus 1 m', url: 'https://www.gbif.org/occurrence/search?taxon_key=5249504&country=EE' },
        { date: '2023-08-13', src: 'GBIF, Karilatsi/Ihamaru (58.0940, 26.9178)', url: 'https://www.gbif.org/occurrence/search?taxon_key=5249504&country=EE' },
        { date: '2026-08-22', src: 'iNaturalist 393417562, lehter-kukeseen, Karilatsi (58.09725, 26.91024)', url: 'https://www.inaturalist.org/observations/393417562' }
      ]
    },
    {
      id: 'haataru', region: 'polva', tier: 'A', lat: 58.09926, lon: 26.88326, acc: 5,
      name: { et: 'Häätaru', en: 'Häätaru' },
      km: 32.3, min: 45,
      route: { et: 'Maantee 61, siis 18115 Vooreküla–Puskaru ja 18118 Karilatsi–Heisri.', en: 'Road 61, then 18115 Vooreküla–Puskaru and 18118 Karilatsi–Heisri.' },
      habitat: { et: 'Männik talumaastiku vahel. Kaks leidu samalt vaatlejalt, 2018 ja 2023.', en: 'Pine forest among farmland. Two finds by the same observer, 2018 and 2023.' },
      evidence: [
        { date: '2023-07-13', src: 'GBIF, Külli Kalamees, täpsus 5 m', url: 'https://www.gbif.org/occurrence/search?taxon_key=5249504&country=EE' },
        { date: '2018-07-10', src: 'GBIF, Külli Kalamees, Metsatuka (58.10343, 26.88669)', url: 'https://www.gbif.org/occurrence/search?taxon_key=5249504&country=EE' }
      ]
    },
    {
      id: 'jarvselja', region: 'jarvselja', tier: 'A', lat: 58.2695, lon: 27.3105, acc: 400,
      name: { et: 'Järvselja park ja mets Rasina suunas', en: 'Järvselja park and forest toward Rasina' },
      park: { lat: 58.2617, lon: 27.3130, label: { et: 'Järvselja küla, metskonna juures', en: 'Järvselja village, by the forestry office' } },
      km: 36.8, min: 48,
      route: { et: 'Roiu, 22266 Sillaotsa–Kriimani, 22265 Reola–Hammaste, 22280 Hammaste–Rasina, 22286 Kõnnu–Ahunapalu. Ürgmetsa sihtkaitsevööndisse (187 ha) korjama ei lähe.',
               en: 'Roiu, 22266 Sillaotsa–Kriimani, 22265 Reola–Hammaste, 22280 Hammaste–Rasina, 22286 Kõnnu–Ahunapalu. Do not pick inside the 187 ha old-growth strict reserve.' },
      habitat: { et: 'EMÜ õppe- ja katsemetskond. TÜ mükoloogia praktikum leiab kukeseeni peaaegu igal aastal 2008–2025. Prooviruute mitte segada.', en: 'University training and experimental forest. The mycology field course records chanterelles almost every year 2008 to 2025. Leave research plots alone.' },
      evidence: [
        { date: '2025-08-23', src: 'GBIF, Allar Antson (58.25039, 27.30122)', url: 'https://www.gbif.org/occurrence/search?taxon_key=5249504&country=EE' },
        { date: '2023-09-02', src: 'GBIF, Pärtel ja Varvas, mükoloogia praktikum (58.2685, 27.3122)', url: 'https://www.gbif.org/occurrence/search?taxon_key=5249504&country=EE' },
        { date: '2008-08-27', src: 'GBIF, Tedersoo ja Sadam: "Järvselja park ja mets Rasina suunas"', url: 'https://www.gbif.org/occurrence/search?taxon_key=5249504&country=EE' }
      ]
    },
    {
      id: 'peedu', region: 'elva', tier: 'C', lat: 58.2371, lon: 26.4480, acc: 300,
      name: { et: 'Peedu rongipeatus ja männik', en: 'Peedu rail stop and pine forest' },
      km: 29.1, min: 36,
      route: { et: 'Roiu teed Tartusse, Lennu tee, maantee 3 Tartu–Valga Elvasse, Peedu. Rongiga Tartust 25 min.', en: 'Roiu road into Tartu, Lennu tee, road 3 Tartu–Valga to Elva, Peedu. 25 min by train from Tartu.' },
      habitat: { et: 'Seeneekspress: "Leia kukeseeni ja porgandiriisikaid!" Mets 1,3 km peatusest. Elva peatus: "Männikud ja kuusikud! Leia männiriisikaid, kukeseeni ja puravikke!"', en: 'Seeneekspress: "Find chanterelles and carrot milkcaps!" Forest 1.3 km from the stop. Elva stop: "Pine and spruce! Find milkcaps, chanterelles and boletes!"' },
      evidence: [
        { date: '2026', src: 'Elron Seeneekspress, Peedu ja Elva peatused', url: 'https://elron.ee/seeneekspress' },
        { date: '2025-08', src: 'eesti.org.au blogi: Elva lähedal samblane männik, kolm korvitäit paari tunniga', url: 'https://eesti.org.au/?p=65921' },
        { date: '2020-06-22', src: 'Võrumaa Teataja: Elva lähedalt esimesed kukeseened', url: 'https://www.vorumaateataja.ee/koik-uudised/eesti-elu/25292-esimestele-kukeseentele-kaeib-tormijooks' }
      ]
    },
    {
      id: 'elva-linn', region: 'elva', tier: 'A', lat: 58.21822, lon: 26.42286, acc: 11,
      name: { et: 'Elva linna serv', en: 'Elva town edge' },
      km: 32.2, min: 41,
      route: { et: 'Maantee 3 Tartu–Valga Elvasse, linna lõunaserv.', en: 'Road 3 Tartu–Valga to Elva, southern edge of town.' },
      habitat: { et: 'Männik linna piiril. Kaks vaatlejat samal päeval, 24.09.2025, seega hilissügisene koht.', en: 'Pine stand at the town boundary. Two observers on the same day, 24 Sept 2025, so a late-season spot.' },
      evidence: [
        { date: '2025-09-24', src: 'GBIF, kaks kirjet, täpsus 11 m', url: 'https://www.gbif.org/occurrence/search?taxon_key=5249504&country=EE' },
        { date: '2021-10-02', src: 'GBIF, Illi küla seenepäev (58.19391, 26.43191, täpsus 500 m)', url: 'https://www.gbif.org/occurrence/search?taxon_key=5249504&country=EE' }
      ]
    },
    {
      id: 'keeri', region: 'elva', tier: 'C', lat: 58.3206, lon: 26.4898, acc: 1500,
      name: { et: 'Keeri metsad', en: 'Keeri forests' },
      km: 25.8, min: 32,
      route: { et: 'Tartu Lääneringtee (maantee 2), 92 Tartu–Viljandi, Meeri tee, 22190 Rõhu–Meeri–Tõravere.', en: 'Tartu western ring (road 2), 92 Tartu–Viljandi, Meeri tee, 22190 Rõhu–Meeri–Tõravere.' },
      habitat: { et: 'Tartu Postimees 2011: "Keeri metsades võib tähelepanelik kuuseotsija leida sambliku seest ka kollaseid kukeseeni." Detsembrikuine leid, seega pehme sügise lõpuni.', en: 'Tartu Postimees 2011: a careful Christmas-tree hunter can find yellow chanterelles in the moss of the Keeri forests. A December find, so until the end of a mild autumn.' },
      evidence: [ { date: '2011-12-19', src: 'Tartu Postimees, piltuudis', url: 'https://tartu.postimees.ee/term/57184/kukeseened' } ]
    },
    {
      id: 'vitipalu', region: 'elva', tier: 'C', lat: 58.1650, lon: 26.4158, acc: 1000,
      name: { et: 'Vitipalu, Haldjarada', en: 'Vitipalu, Fairy trail' },
      km: 39.3, min: 50,
      route: { et: 'Maantee 3 Tartu–Valga Elvast edasi, Vitipalu.', en: 'Road 3 Tartu–Valga past Elva, Vitipalu.' },
      habitat: { et: 'Elva-Vitipalu maastikukaitseala männikud. Puhkaeestis: Haldjarada, seened ja mustikad.', en: 'Pine forests of the Elva-Vitipalu landscape reserve. Puhkaeestis: Fairy trail, mushrooms and blueberries.' },
      evidence: [ { date: '2026', src: 'Puhkaeestis, parimad marja- ja seenekohad', url: 'https://puhkaeestis.ee/et/mida-teha/parimad-marja-ja-seenekohad' } ]
    },
    {
      id: 'kambja-dna', region: 'tartu', tier: 'B', lat: 58.20462, lon: 26.73888, acc: 500,
      name: { et: 'Kambja ümbrus (mulla-DNA)', en: 'Around Kambja (soil DNA)' },
      km: 21.9, min: 30,
      route: { et: 'Vana-Kuuste kaudu maanteele 61, siis 22135 Kambja–Sirvaku.', en: 'Via Vana-Kuuste to road 61, then 22135 Kambja–Sirvaku.' },
      habitat: { et: 'Mullaproovides kukeseene DNA 25 korda (2016). Niidistik on, viljumist pole dokumenteeritud. RMK Kambja kava: suusarajad 72 ha, Pangodi 117 ha.', en: 'Chanterelle DNA found 25 times in soil samples (2016). Mycelium present, fruiting undocumented. RMK Kambja plan: ski trails 72 ha, Pangodi 117 ha.' },
      evidence: [ { date: '2016-11-23', src: 'GBIF, Tedersoo jt globaalne mullaproov, ka 58.21442, 26.68597 ja 58.1886, 26.79476', url: 'https://www.gbif.org/occurrence/search?taxon_key=5249504&country=EE' } ]
    },
    {
      id: 'padakorve', region: 'peipsi', tier: 'A', lat: 58.58618, lon: 27.02359, acc: 100,
      name: { et: 'Padakõrve looduskaitseala', en: 'Padakõrve nature reserve' },
      park: { lat: 58.58487, lon: 27.04232, label: { et: 'Matkaraja algus, tasuta parkla', en: 'Trail start, free car park' } },
      km: 46.7, min: 61,
      route: { et: 'Tartu, Narva mnt, 95 Tartu–Kõrveküla, maantee 3, siis 43 Aovere–Kallaste–Omedu. Rada 3,6 km kruusateel, avatud 1.06–31.08. Kontrolli kaitse-eeskirja: kolm sihtkaitsevööndit.',
               en: 'Tartu, Narva mnt, 95 Tartu–Kõrveküla, road 3, then 43 Aovere–Kallaste–Omedu. 3.6 km gravel-road trail, open 1 June to 31 Aug. Check the protection rules: three strict zones.' },
      habitat: { et: 'Mõhnastikud, laanekuklased, vanad loodusmetsad. Samas kandis ka vale-kukeseen (13.10.2024).', en: 'Kame ridges, wood ants, old natural forests. False chanterelle also recorded nearby (13 Oct 2024).' },
      evidence: [
        { date: '2024-08-04', src: 'iNaturalist 233776162, research grade', url: 'https://www.inaturalist.org/observations/233776162' },
        { date: '2025-09-08', src: 'GBIF, Välgi (58.59464, 26.87293); Mustametsa 2021 (58.59506, 26.86041)', url: 'https://www.gbif.org/occurrence/search?taxon_key=5249504&country=EE' },
        { date: '2024-10-13', src: 'iNaturalist 247097183, lehter-kukeseen, Kaiavere/Välgi (58.54988, 26.88226)', url: 'https://www.inaturalist.org/observations/247097183' }
      ]
    },
    {
      id: 'sooru-pedassaare', region: 'peipsi', tier: 'A', lat: 58.65275, lon: 26.86995, acc: 12,
      name: { et: 'Sõõru, Pedassaare, Kaiu järv', en: 'Sõõru, Pedassaare, Kaiu lake' },
      km: 50.7, min: 55,
      route: { et: 'Tartu, maantee 3 Jõhvi–Tartu, 14101 Saare–Pala–Kodavere. RMK Peipsiääre kava: Pala matkarajad 66 ha.', en: 'Tartu, road 3 Jõhvi–Tartu, 14101 Saare–Pala–Kodavere. RMK Peipsiääre plan: Pala trails 66 ha.' },
      habitat: { et: 'Segamets ja männikud Peipsi liivavööndis. Tartu turu kukeseened 2015 Sõõru metsadest.', en: 'Mixed and pine forest in the Peipsi sand belt. Tartu market chanterelles in 2015 came from Sõõru forests.' },
      evidence: [
        { date: '2025-08-15', src: 'iNaturalist 306452920, research grade, täpsus 12 m', url: 'https://www.inaturalist.org/observations/306452920' },
        { date: '2024-08-13', src: 'GBIF, Pedassaare küla, segamets (58.64865, 26.83115)', url: 'https://www.gbif.org/occurrence/search?taxon_key=5249504&country=EE' },
        { date: '2023-08-12', src: 'iNaturalist 178000150 Sõõru (58.64264, 26.92187)', url: 'https://www.inaturalist.org/observations/178000150' },
        { date: '2015-06-26', src: 'Tartu Postimees: turu kukeseened Sõõru metsadest', url: 'https://tartu.postimees.ee/3236831/tartu-turg-pakub-nii-metsmaasikaid-kui-ka-kukeseeni' }
      ]
    },
    {
      id: 'kallaste', region: 'peipsi', tier: 'A', lat: 58.66416, lon: 27.15677, acc: 300,
      name: { et: 'Kallaste männikud', en: 'Kallaste pine forests' },
      km: 54.9, min: 63,
      route: { et: 'Maantee 45 Luunjasse, 22250 Luunja–Kavastu–Koosa, 43 Aovere–Kallaste–Omedu.', en: 'Road 45 to Luunja, 22250 Luunja–Kavastu–Koosa, 43 Aovere–Kallaste–Omedu.' },
      habitat: { et: 'Peipsi-äärsed liivamännikud.', en: 'Lakeside pine on sand.' },
      evidence: [ { date: '2020-07-24', src: 'iNaturalist 57743935, research grade', url: 'https://www.inaturalist.org/observations/57743935' } ]
    },
    {
      id: 'sirgumetsa', region: 'tartu', tier: 'A', lat: 58.4288, lon: 27.06529, acc: 500,
      name: { et: 'Sirgumetsa männik', en: 'Sirgumetsa pine forest' },
      km: 26.3, min: 32,
      route: { et: 'Roiu, 22269, 22260 Vana-Kastre–Roiu, maantee 45, 22250 Luunja–Kavastu–Koosa.', en: 'Roiu, 22269, 22260 Vana-Kastre–Roiu, road 45, 22250 Luunja–Kavastu–Koosa.' },
      habitat: { et: 'Kirjes: "Pinus forest with Corylus underwood", männik sarapuu alusmetsaga.', en: 'Record habitat: "Pinus forest with Corylus underwood".' },
      evidence: [ { date: '2012-07-05', src: 'GBIF, Irma Zettur', url: 'https://www.gbif.org/occurrence/search?taxon_key=5249504&country=EE' } ]
    }
  ]
};
