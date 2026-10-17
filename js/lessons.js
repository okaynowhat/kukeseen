// Learning content. Each lesson: id, minutes, title, sections [{h, p:[...], ul:[...]}] per language.
window.KS_LESSONS = [
  {
    id: 'id', minutes: 4, icon: '◐',
    et: { title: 'Tunne kukeseen ära', sections: [
      { h: 'Mis on kukeseen', p: ['Kukeseen (Cantharellus cibarius) on munakollane kuni oranžikas, lehtrikujuline seen. Kübar on algul kumer, hiljem nõgus ja lainelise servaga. Jalg on kübaraga sama värvi ja läheb sujuvalt kübarasse üle.', 'Kõige kindlam tunnus on kübara alumine külg: päris eoslehekesi ei ole, vaid paksud, tömbid, hargnevad voldid, mis jooksevad kaugele jalale alla.'] },
      { h: 'Lõhn ja liha', p: ['Liha on kahvatu, tihke ja ei muutu murdes värvi. Lõhn on kergelt puuviljane, meenutab aprikoosi. Kukeseen ussitab harva, mis on üks põhjus, miks seda nii hinnatakse.'] },
      { h: 'Vale-kukeseen', p: ['Vale-kukeseen (Hygrophoropsis aurantiaca) kasvab samades männikutes ja sageli kõdupuidul. Ta on ühtlasemalt oranž, kübar on sametine ja õhuke, alumine külg on õhukeste, tihedate, korduvalt hargnevate päris eoslehekestega, mitte voltidega. Liha on pehme ja pruunikas. Ta ei ole tugevalt mürgine, aga ei ole ka söögiseen ja võib kõhtu rikkuda.'],
        ul: ['Kukeseen: paksud voldid, mis jooksevad jalale. Vale-kukeseen: õhukesed eoslehekesed.', 'Kukeseen: tihke liha, aprikoosilõhn. Vale-kukeseen: pehme liha, lõhnatu.', 'Kukeseen: kasvab mullas sambla sees. Vale-kukeseen: sageli kändudel ja okstel.'] },
      { h: 'Söödavad sugulased', p: ['Lehter-kukeseen (Craterellus tubaeformis) on pruunikashall õhukese kübaraga ja kollase õõnsa jalaga, kasvab hilissügisel rühmiti sambla sees. Kollakas kukeseen (Craterellus lutescens) on sarnane, oranžikaskollase jalaga. Mõlemad on head söögiseened ja pikendavad hooaega oktoobrisse ja novembrisse.'] }
    ] },
    en: { title: 'Know the chanterelle', sections: [
      { h: 'What a chanterelle is', p: ['The chanterelle (Cantharellus cibarius) is egg-yolk yellow to orange and funnel shaped. The cap starts convex, becomes depressed with a wavy margin. The stem is the same colour and merges smoothly into the cap.', 'The surest feature is the underside: there are no true gills, only thick, blunt, forking ridges that run far down the stem.'] },
      { h: 'Smell and flesh', p: ['The flesh is pale, firm and does not change colour when broken. The smell is faintly fruity, like apricot. Chanterelles are rarely maggoty, one reason they are prized.'] },
      { h: 'The false chanterelle', p: ['The false chanterelle (Hygrophoropsis aurantiaca) grows in the same pine forests, often on rotting wood. It is more evenly orange, the cap is velvety and thin, and the underside carries thin, crowded, repeatedly forking true gills, not ridges. The flesh is soft and brownish. It is not seriously poisonous but it is not food and can upset the stomach.'],
        ul: ['Chanterelle: thick ridges running onto the stem. False: thin gills.', 'Chanterelle: firm flesh, apricot smell. False: soft flesh, no smell.', 'Chanterelle: grows in soil under moss. False: often on stumps and sticks.'] },
      { h: 'Edible relatives', p: ['The funnel chanterelle (Craterellus tubaeformis) has a thin brownish-grey cap and a hollow yellow stem, and grows in groups in moss late in autumn. The yellowfoot (Craterellus lutescens) is similar with an orange-yellow stem. Both are good and stretch the season into October and November.'] }
    ] }
  },
  {
    id: 'habitat', minutes: 4, icon: '⟁',
    et: { title: 'Kus kukeseen kasvab', sections: [
      { h: 'Mükoriisa', p: ['Kukeseen elab puujuurtega sümbioosis. Eestis on partneriteks eelkõige mänd ja kuusk, ka kask. Ilma elava puuta kukeseent ei ole, seega lageraie tapab koha aastateks.'] },
      { h: 'Seenekorjaja juhend', p: ['Vana koriluse juhend ütleb lihtsalt: hele, kõrge ja ilus männik, kus kasvab ka kuuski ja mõni kask sekka. Metsaalune peaks olema pigem kuivapoolne ja puhas, mitte kõrge rohu, sõnajala ega tiheda mustikavarvikuga. Samblavaip on hea, eriti kui see on õhem päikesepaistelistel servadel.'],
        ul: ['Head märgid: kanarbik, pohl, põdrasamblik, kõva tallatud pinnas.', 'Esimesed nööbid ilmuvad vanadele metsaveoteedele ja raja servadele.', 'Pärast pikka põuda otsi madalamaid männi-kuuse segametsi.', 'Lehtmetsas, soos ja tihedas kuusenoorendikus kukeseent peaaegu ei ole.'] },
      { h: 'Kuidas kaarti lugeda', p: ['Maa-ameti kaardil on männikud heledama rohelisega ja liivane pinnas paistab ortofotol kuivade, hõredate võradena. Riigimetsa teed on sageli kruusateed, mille äärde saab auto jätta. Kõrgemad liivaseljakud, mõhnad ja voorte nõlvad on paremad kui lohud.', 'Kaardikihtide menüüst saab sisse lülitada metsaregistri puistud: kuldsed on vähemalt 40-aastased männikud, rohelised kuusikud, paksu pruuni joonega need, mille kasvukohatüüp on palu- või nõmmemets (pohla, mustika, sambliku, kanarbiku, jänesekapsa-pohla). Puuduta puistut: näed vanust, kõrgust, kasvukohatüüpi ja omandivormi. Kõige lootustandvam on vana männik palumetsa kasvukohatüübil tee või raja servas.'] }
    ] },
    en: { title: 'Where chanterelles grow', sections: [
      { h: 'Mycorrhiza', p: ['The chanterelle lives in symbiosis with tree roots. In Estonia the partners are mainly pine and spruce, also birch. No living tree, no chanterelle, so a clearcut kills a spot for years.'] },
      { h: 'The forager\'s rule', p: ['An old foraging guide puts it simply: a bright, tall, handsome pine forest with some spruce and a few birches mixed in. The floor should be on the dry side and clean, not tall grass, fern or a dense blueberry carpet. A moss carpet is good, especially where it thins out on sunny edges.'],
        ul: ['Good signs: heather, lingonberry, reindeer lichen, hard trodden ground.', 'The first buttons appear on old forest tracks and trail edges.', 'After a long drought search lower pine-spruce mixed forest.', 'Deciduous forest, bog and dense young spruce hold almost none.'] },
      { h: 'Reading the map', p: ['On the Land Board map pine forest is a lighter green, and sandy ground shows on the aerial layer as dry, open crowns. State forest roads are usually gravel with room to leave a car. Higher sand ridges, kames and drumlin slopes beat hollows.', 'The layer menu can switch on forest-register stands: gold for pine stands at least 40 years old, green for spruce, and a thick brown outline where the site type is heath pine or dry heath forest (lingonberry, blueberry, lichen, heather, wood sorrel-lingonberry types). Tap a stand to see age, height, site type and ownership. The most promising target is an old pine stand on a heath site type along a track or trail edge.'] }
    ] }
  },
  {
    id: 'season', minutes: 3, icon: '☂',
    et: { title: 'Hooaeg ja ilm', sections: [
      { h: 'Millal', p: ['Esimesed kukeseened tulevad Lõuna-Eestis juuni lõpus, parim aeg on juuli lõpust septembrini. Hoog tuleb 10 kuni 14 päeva pärast korralikku vihma, kui öö on soe. Kuiv juuli lükkab hooaja augustisse.'] },
      { h: 'Sügis', p: ['Esimesed tugevamad öökülmad lõpetavad kollase kukeseene. Lehter-kukeseen ja kollakas kukeseen peavad vastu novembrini, mõnel pehmel aastal ka detsembrisse. Rakenduse hooajavaade loeb Open-Meteo sademeid ja öiseid miinimume ja annab lihtsa indeksi. See on heuristika, mitte prognoos.'] },
      { h: 'Aastad on erinevad', p: ['2019 ja 2024 olid Eestis väga head kukeseeneaastad, 2023 põuane. Ära tee ühe aasta põhjal järeldusi koha kohta: mükoriisa on alles ka vaiksel aastal.'] }
    ] },
    en: { title: 'Season and weather', sections: [
      { h: 'When', p: ['The first chanterelles appear in southern Estonia at the end of June; the best time runs from late July to September. A flush follows a proper rain by 10 to 14 days if nights stay warm. A dry July pushes the season into August.'] },
      { h: 'Autumn', p: ['The first hard night frosts end the golden chanterelle. Funnel chanterelles and yellowfoots last into November, in a mild year into December. The Season view reads Open-Meteo rain and night minimums and gives a simple index. It is a heuristic, not a forecast.'] },
      { h: 'Years differ', p: ['2019 and 2024 were very good chanterelle years in Estonia, 2023 was a drought. Do not judge a spot by one year: the mycorrhiza is still there in a quiet year.'] }
    ] }
  },
  {
    id: 'forest', minutes: 4, icon: '♠',
    et: { title: 'Eesti metsatüübid', sections: [
      { h: 'Palumets', p: ['Kuiv kuni parasniiske männik liivasel mullal, pohla, mustika ja kanarbikuga, paks samblavaip. Eesti klassikaline seenemets ja kukeseene kodu. Tartu ümbruses Kiidjärve, Taevaskoja ja Peipsi liivavöönd.'] },
      { h: 'Nõmmemets', p: ['Veel kuivem ja vaesem männik, põdrasamblik, kanarbik. Kukeseeni vähem, aga pärast vihma servades küll. Hea kitsemampli ja männiriisika mets.'] },
      { h: 'Laanemets', p: ['Viljakas kuusik või kuuse-männi segamets, jänesekapsas, sinilill. Kukeseen kasvab, kui kuuse all on valgust ja sammalt. Tihe kuusik ilma sambalta on tühi.'] },
      { h: 'Salumets ja soovik', p: ['Salumets on lehtpuurikas ja viljakas, soovik ja raba märjad. Kukeseeni neis sisuliselt ei ole. Vooremaal (Vooremäe, Saadjärve ümbrus) vahelduvad voorte kuivad nõlvad märgade lohkudega: otsi nõlvu.'] }
    ] },
    en: { title: 'Estonian forest types', sections: [
      { h: 'Heath pine forest (palumets)', p: ['Dry to moderately moist pine on sandy soil with lingonberry, blueberry and heather and a thick moss carpet. Estonia\'s classic mushroom forest and the chanterelle\'s home. Around Tartu: Kiidjärve, Taevaskoja and the Peipsi sand belt.'] },
      { h: 'Dry heath (nõmmemets)', p: ['Even drier and poorer pine with reindeer lichen and heather. Fewer chanterelles, but edges fruit after rain. Good for goat boletes and pine milkcaps.'] },
      { h: 'Boreal spruce (laanemets)', p: ['Fertile spruce or spruce-pine mixed forest with wood sorrel and hepatica. Chanterelles grow where light and moss reach under the spruce. Dense mossless spruce is empty.'] },
      { h: 'Rich deciduous and wet forest', p: ['Rich deciduous forest and wet alder or bog forest hold essentially no chanterelles. In the drumlin country (Vooremäe, Saadjärv) dry slopes alternate with wet hollows: search the slopes.'] }
    ] }
  },
  {
    id: 'law', minutes: 3, icon: '§',
    et: { title: 'Igaüheõigus ja reeglid', sections: [
      { h: 'Mida tohib', p: ['Eestis võib võõras metsas liikuda ning seeni ja marju korjata, kui maa ei ole piiratud või tähistatud. Riigimets (RMK) on avatud kõigile. Eramaal on korjamine lubatud, kui omanik ei ole seda keelanud tara, sildi või suuliselt.'],
        ul: ['Ära sõida autoga metsa, jäta see tee äärde nii, et metsaveok mahub mööda.', 'Õue ja hoonete lähedale ära mine.', 'Lõket tohib teha ainult selleks ette nähtud kohas.', 'Ära lõhu sammalt ega riisu metsaalust.'] },
      { h: 'Kaitsealad', p: ['Looduskaitsealal kehtivad kaitse-eeskirja reeglid. Piiranguvööndis on korjamine tavaliselt lubatud, sihtkaitsevööndis võib liikumine olla piiratud teatud ajal (näiteks lindude pesitsusajal) ja mõnes reservaadis keelatud. Järvselja ürgmets on range kaitsega: sinna korjama ei lähe. Padakõrve ja Vooremäe reeglid kontrolli Riigi Teatajast enne minekut.'] },
      { h: 'Teiste kohad', p: ['Ära pargi otse teise seenelise auto kõrvale ja ära mine metsa, kus keegi juba ilmselgelt korjab. Jaga oma kohti ainult siis, kui tahad. Selle rakenduse "Minu leiud" jääb sinu telefoni.'] }
    ] },
    en: { title: 'Everyman\'s right and rules', sections: [
      { h: 'What is allowed', p: ['In Estonia you may walk in another person\'s forest and pick mushrooms and berries unless the land is fenced or signed. State forest (RMK) is open to everyone. On private land picking is allowed unless the owner forbids it by fence, sign or in person.'],
        ul: ['Do not drive into the forest; park so a timber truck can pass.', 'Stay away from yards and buildings.', 'Fires only at designated sites.', 'Do not tear up moss or rake the forest floor.'] },
      { h: 'Protected areas', p: ['Nature reserves follow their own protection rules. Picking is usually allowed in the limited-management zone; in strict zones access may be restricted in certain periods (bird nesting) and in some reserves forbidden. Järvselja old-growth forest is strictly protected: no picking there. Check Padakõrve and Vooremäe rules in Riigi Teataja before you go.'] },
      { h: 'Other people\'s spots', p: ['Do not park right next to another forager\'s car and do not enter a forest where someone is clearly already picking. Share your spots only if you want to. "My finds" in this app stays on your phone.'] }
    ] }
  },
  {
    id: 'field', minutes: 3, icon: '⌖',
    et: { title: 'Metsas: ohutus ja varustus', sections: [
      { h: 'Enne minekut', p: ['Ütle kellelegi, kuhu lähed ja millal tagasi oled. Lae telefon täis, võta akupank. Laadi selle rakenduse kaart kohale ette alla, sest metsas ei ole levi. Pane kodu ja auto asukoht leiuna kirja, siis leiab kompass tagasi.'] },
      { h: 'Varustus', ul: ['Korv, mitte kilekott: seened hingavad ja ei lähe puruks.', 'Nuga ja hari, puhasta seen kohe.', 'Pikad püksid ja sokid püksi peale: puugid. Kontrolli end õhtul.', 'Erksavärviline müts või vest jahihooajal (september kuni veebruar).', 'Kompass või see rakendus; GPS täpsus on metsas 5 kuni 20 m.'] },
      { h: 'Seenesilm', p: ['Kõnni aeglaselt ja vaata enne, kui kiirustad kohale. Kukeseen on sambla vahel sageli pooleldi peidus; kui leiad ühe, kükita ja vaata ringi, neid on tavaliselt rohkem. Kui ei tea, mis seen see on, jäta see kasvama.'] }
    ] },
    en: { title: 'In the forest: safety and kit', sections: [
      { h: 'Before you go', p: ['Tell someone where you are going and when you will be back. Charge the phone, bring a power bank. Download this app\'s map for the spot in advance; there is no signal in the forest. Log the car and home as finds so the compass can lead you back.'] },
      { h: 'Kit', ul: ['A basket, not a plastic bag: mushrooms breathe and do not crush.', 'A knife and brush; clean on the spot.', 'Long trousers with socks over them: ticks. Check yourself in the evening.', 'A bright hat or vest in hunting season (September to February).', 'A compass or this app; GPS accuracy under trees is 5 to 20 m.'] },
      { h: 'The mushroom eye', p: ['Walk slowly and look before you rush over. Chanterelles hide half under the moss; when you find one, crouch and look around, there are usually more. If you do not know what it is, leave it growing.'] }
    ] }
  },
  {
    id: 'harvest', minutes: 3, icon: '✂',
    et: { title: 'Korjamine ja köök', sections: [
      { h: 'Korja õigesti', p: ['Lõika või keera seen jalast lahti, ära rebi sammalt lahti. Jäta kõige pisemad nööbid kasvama. Ära korja tee äärest: raskmetallid.'] },
      { h: 'Hoiusta', p: ['Kukeseen säilib külmkapis paar päeva. Kõige parem on praadida kuival pannil, kuni vesi on aurustunud, ja siis külmutada. Kuivatamine teeb kukeseene sitkeks, see sobib pulbriks. Toorelt ära söö.'] },
      { h: 'Klassika', p: ['Kukeseenekaste värske kartuliga: võis sibul, kukeseened, koor, tilli ja soola. Lihtne ja Eesti suve maitse.'] }
    ] },
    en: { title: 'Harvest and kitchen', sections: [
      { h: 'Pick properly', p: ['Cut or twist the mushroom off at the stem; do not tear up the moss. Leave the smallest buttons to grow. Do not pick next to roads: heavy metals.'] },
      { h: 'Store', p: ['Chanterelles keep a couple of days in the fridge. Best is to dry-fry until the water has gone, then freeze. Drying makes them tough, fine for powder. Do not eat raw.'] },
      { h: 'The classic', p: ['Chanterelle sauce with new potatoes: onion in butter, chanterelles, cream, dill and salt. Simple, and the taste of an Estonian summer.'] }
    ] }
  },
  {
    id: 'data', minutes: 2, icon: '◍',
    et: { title: 'Kust kohad pärinevad', sections: [
      { h: 'Avaandmed', p: ['Kohad on kokku pandud avalikest elurikkuse andmebaasidest: iNaturalist ja GBIF, kuhu jõuavad ka Tartu Ülikooli loodusmuuseumi ja PlutoF vaatlused. Lisaks RMK valla riigimetsa kavad, Elroni ja RMK Seeneekspressi nimekiri ning ajakirjandus. Ükski foorum Tartumaa koordinaate ei avalda; inimesed hoiavad kohti saladuses.'] },
      { h: 'Tõendite tasemed', ul: ['A: viljakeha vaatlus koordinaatidega. Täpsus 1 m kuni 3 km, näidatud iga koha juures.', 'B: kukeseene DNA mullaproovis. Niidistik on, viljumine tõendamata.', 'C: RMK, Elron või ajakirjandus nimetab metsa kukeseenemetsaks.', 'D: sobiv riigimets ilma kirjeta.'] },
      { h: 'Mida see ei luba', p: ['Vaatlus ei tähenda, et seened on seal täna. See tähendab, et mükoriisa on seal olnud ja mets on olnud sobiv. Mine, vaata, ja märgi oma leid, see on parim andmestik.'] }
    ] },
    en: { title: 'Where the spots come from', sections: [
      { h: 'Open data', p: ['The spots were compiled from public biodiversity databases: iNaturalist and GBIF, which also carry Tartu University natural history museum and PlutoF observations. Plus RMK state forest plans, the Elron and RMK Seeneekspress list and the press. No forum publishes Tartu-area coordinates; people keep spots secret.'] },
      { h: 'Evidence tiers', ul: ['A: fruiting-body observation with coordinates. Accuracy 1 m to 3 km, shown per spot.', 'B: chanterelle DNA in a soil sample. Mycelium present, fruiting unproven.', 'C: RMK, Elron or press names the forest as a chanterelle forest.', 'D: suitable state forest without a record.'] },
      { h: 'What it does not promise', p: ['An observation does not mean mushrooms are there today. It means the mycorrhiza has been there and the forest has suited it. Go, look, and log your own find; that is the best dataset.'] }
    ] }
  }
];

window.KS_QUIZ = {
  et: [
    { q: 'Mis on kukeseene kübara all?', a: ['Õhukesed tihedad eoslehekesed', 'Paksud hargnevad voldid, mis jooksevad jalale', 'Torukesed nagu puravikul'], c: 1, why: 'Kukeseenel ei ole päris eoslehekesi. Õhukesed eoslehekesed viitavad vale-kukeseenele.' },
    { q: 'Milline mets on kõige lootustandvam?', a: ['Tihe kuusenoorendik', 'Märg sanglepik', 'Hele kõrge männik kuuse ja kasega, samblavaip'], c: 2, why: 'Vana juhend: hele männik, kuuski ja mõni kask sekka, kuivapoolne puhas metsaalune.' },
    { q: 'Kui palju aega kulub vihmast seenteni?', a: ['1 kuni 2 päeva', '10 kuni 14 päeva', 'Umbes kuu'], c: 1, why: 'Niidistik vajab umbes kaks nädalat sooja ja niisket, et viljakehad üles tuua.' },
    { q: 'Mis lõpetab kollase kukeseene hooaja?', a: ['Esimesed tugevamad öökülmad', 'Augusti lõpp', 'Esimene vihm'], c: 0, why: 'Öökülmad lõpetavad kukeseene, lehter-kukeseen peab vastu lumeni.' },
    { q: 'Kas eramaal tohib seeni korjata?', a: ['Ei, kunagi', 'Jah, kui maa ei ole piiratud ega tähistatud', 'Ainult loaga'], c: 1, why: 'Igaüheõigus: korjata tohib, kui omanik ei ole keelanud tara, sildi või suuliselt.' },
    { q: 'Vale-kukeseen kasvab sageli', a: ['Kändudel ja kõdupuidul', 'Lagedal niidul', 'Vees'], c: 0, why: 'Vale-kukeseen on saprotroof ja kasvab tihti kõdupuidul; kukeseen kasvab mullas puujuurte juures.' },
    { q: 'Mida tähendab tõendite tase B?', a: ['Keegi nägi seent', 'Kukeseene DNA leiti mullaproovist', 'RMK nimetab seenemetsaks'], c: 1, why: 'B on mulla-DNA: niidistik on olemas, viljumist pole dokumenteeritud.' },
    { q: 'Milline kott on seentele parim?', a: ['Kilekott', 'Korv', 'Seljakoti põhi'], c: 1, why: 'Korvis seened hingavad ja ei lähe puruks.' }
  ],
  en: [
    { q: 'What is under a chanterelle cap?', a: ['Thin crowded gills', 'Thick forking ridges running onto the stem', 'Tubes like a bolete'], c: 1, why: 'Chanterelles have no true gills. Thin gills point to the false chanterelle.' },
    { q: 'Which forest is most promising?', a: ['Dense young spruce', 'Wet alder forest', 'Bright tall pine with spruce and birch, moss carpet'], c: 2, why: 'The old rule: bright pine, some spruce and birch, dry clean floor.' },
    { q: 'How long from rain to mushrooms?', a: ['1 to 2 days', '10 to 14 days', 'About a month'], c: 1, why: 'The mycelium needs about two weeks of warmth and moisture to push up fruiting bodies.' },
    { q: 'What ends the golden chanterelle season?', a: ['The first hard night frosts', 'The end of August', 'The first rain'], c: 0, why: 'Night frost ends it; funnel chanterelles last until snow.' },
    { q: 'May you pick on private land?', a: ['Never', 'Yes, unless the land is fenced or signed', 'Only with a permit'], c: 1, why: 'Everyman\'s right: picking is allowed unless the owner forbids it by fence, sign or in person.' },
    { q: 'The false chanterelle often grows', a: ['On stumps and rotting wood', 'In open meadow', 'In water'], c: 0, why: 'It is a saprotroph and often grows on rotting wood; the true chanterelle grows in soil with tree roots.' },
    { q: 'What does evidence tier B mean?', a: ['Someone saw the mushroom', 'Chanterelle DNA was found in a soil sample', 'RMK names it a mushroom forest'], c: 1, why: 'B is soil DNA: mycelium present, fruiting undocumented.' },
    { q: 'Best container for mushrooms?', a: ['Plastic bag', 'Basket', 'Bottom of a backpack'], c: 1, why: 'In a basket mushrooms breathe and do not crush.' }
  ]
};
