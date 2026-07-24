import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import YearPage from './YearPage';

import img2016patricia from '@/assets/journey/2016-patricia.png';
import img2016team from '@/assets/journey/2016-team.png';
import img2016flavorBox from '@/assets/journey/2016-flavor-box.png';
import img2017banner from '@/assets/journey/2017-patricia-banner.jpg';
import img2018korkort from '@/assets/journey/2018-korkort.png';
import img2018distortion from '@/assets/journey/2018-distortion.jpg';
import img2018festival from '@/assets/festival.jpg';
import img2018serbian from '@/assets/serbian.png';
import img2018ninasdotter from '@/assets/ninasdotter.png';
import img2019mataam from '@/assets/journey/2019-mataam.png';
import img2019truck from '@/assets/journey/2019-truck.png';
import img2019farika from '@/assets/farika.png';
import img2019filip from '@/assets/FILIP.png';
import img2019halebop from '@/assets/Halebop.png';
import img2020team from '@/assets/journey/2020-team.png';
import img2020rapidus from '@/assets/Rapidus.jpg';
import img2021friskt from '@/assets/journey/2021-friskt-vagat.png';
import img2021ohboy from '@/assets/ohboy.jpg';
import img2022sf from '@/assets/2022sf.jpg';
import img2023aretsforetagare from '@/assets/ÅretsFöretagare.jpg';
import img2023sm from '@/assets/sm2023.jpg';
import img2023aretsunga from '@/assets/åretsunga.jpg';
import img2024gravid from '@/assets/gravid.jpg';
import img2024tioUnga from '@/assets/10unga.png';
import img2024ko from '@/assets/ko.png';
import img2024hugboss from '@/assets/hugboss1.png';
import img2025dryckor from '@/assets/dryckor.png';
import img2025ovan from '@/assets/ovan.jpg';
import img2025kamali from '@/assets/kamali.jpeg';
import img2025gbg from '@/assets/gbg.jpg';
import img2026hb from '@/assets/hb.png';
import img2026backdrop from '@/assets/26dp.jpg';
import video2026castella from '@/assets/castella.mp4';
import imgRick from '@/assets/rick.jpeg';

type SourceLink = {
  url: string;
  labelSv: string;
  labelEn: string;
};

type YearEntry = {
  year: string;
  sv: string;
  en: string;
  images?: string[];
  extraTextSv?: string;
  extraTextEn?: string;
  expandableTextSv?: string;
  expandableTextEn?: string;
  sources?: SourceLink[];
  isFinale?: boolean;
  inlineNext?: boolean;
  expandableImage?: string;
  expandableImages?: string[];
  expandableImageSizes?: ('sm' | 'md')[];
  expandableVideo?: string;
  expandableVideoSize?: 'sm' | 'md';
  bodyVideo?: string;
  bodyImages?: string[];
  headerImage?: string;
  headerImageAlt?: string;
  headerImageDesktopSide?: boolean;
  titleSv?: string;
  titleEn?: string;
  // Cinematic theme per year
  gradient?: string;          // CSS background for full-bleed bg
  accentColor?: string;       // hex accent for highlights / pin
  pattern?: 'palms' | 'waves' | 'tribal' | 'burst' | 'mask' | 'notes' | 'sun' | 'zigzag' | 'dancer' | 'hut';
  layout?: 'imageLeft' | 'imageRight' | 'imageBackdrop' | 'twoUp' | 'centered';
  // Render the main text as one uniform block (no oversized lead line, no
  // forced-bold last line) so it reads as a single continuous piece.
  uniformText?: boolean;
  // Move the accent-colored left "backline" bar from the lead line onto the
  // body block instead (used when the emphasized callout is the body text).
  bodyBackline?: boolean;
  // Vertically center the slide's content column in the viewport instead of
  // the default top alignment (used when short "centered" text sits too high).
  centerVertically?: boolean;
  // Render the "centered" layout's lead + body as a left-aligned column
  // instead of centered text, with the lead as a bold backlined callout.
  leftAlignedContent?: boolean;
};

const years: YearEntry[] = [
  {
    year: '2016',
    sv: '2016 — Början',
    en: '2016 — The Origin',
    titleSv: 'EVERY ENDING BECOMES A BEGINNING',
    titleEn: 'EVERY ENDING BECOMES A BEGINNING',
    gradient: 'linear-gradient(135deg,#3a0a0a 0%,#7a1f1f 35%,#c2410c 75%,#f59e0b 100%)',
    accentColor: '#fbbf24',
    pattern: 'palms',
    layout: 'twoUp',
    uniformText: true,
    images: [img2016flavorBox, img2016patricia, img2016team],
    extraTextSv: 'Flavor-Boss började aldrig med en affärsplan.\nDet började med en dröm.\nEfter att livet tagit en oväntad vändning föddes en ny drivkraft i Patricia Dianda, grundaren av Flavor-Boss. En vilja att bygga något som kunde leva vidare. Något som samlade människor, skapade glädje och gav livet en ny riktning.\nMed rötter från Kongo, Sverige och familj från Kuba började en vision ta form.\nInte om en restaurang eller en specifik plats.\nUtan om en mobil upplevelse.\nEn plats där mat, musik, färg, kultur och människor möts.\nOch alla känner sig välkomna och inkluderade.',
    extraTextEn: 'Flavor-Boss never began with a business plan.\nIt began with a dream.\nAfter life took an unexpected turn, a new drive was born in Patricia Dianda, the founder of Flavor-Boss. A will to build something that could live on. Something that brought people together, created joy and gave life a new direction.\nWith roots in Congo, Sweden and family from Cuba, a vision began to take shape.\nNot about a restaurant or a specific place.\nBut about a mobile experience.\nA place where food, music, color, culture and people meet.\nAnd everyone feels welcome and included.',
    expandableTextSv: 'Visionen tog sina första steg i ett hemmakök i Malmö.\nEn grill.\nNågra afrikanska tyger.\nEn högtalare.\nOch en idé som var betydligt större än budgeten.\nVia Facebook började de första beställningarna komma in och planeringen av den allra första Afro-Karibiska Backyard BBQ:n tog fart.\nIngen visste om tio eller hundra personer skulle dyka upp.\nÖver 150 gäster kom.\nGrannar hjälpte.\nFamiljer kom.\nVänner dansade.\nOch människor som aldrig tidigare hade träffats.\n[[VIDEO]]\nMat.\nMusik.\nDans.\nSköna vibes.\nDen första riktigt soliga dagen på året.\nDet som skulle bli en grillfest blev något mycket större.\nEn känsla.\nEn gemenskap.\nEtt ögonblick som ingen ville skulle ta slut.\nDet var då visionen fick liv.\nFlavor-Boss skulle aldrig bara handla om mat.\nDet skulle handla om upplevelsen.\nOm kulturen.\nOm människorna.\nOch om att skapa minnen som lever kvar långt efter att tallriken är tom.\nBland gästerna fanns även artisten Sabina Ddumba och sitt crew. Ett tidigt tecken på att känslan hade börjat nå längre än den egna gården.\nRedan från början var drömmen större än gården där allting började.\nHur resan skulle se ut visste ingen.\nMen en sak var säker.\nDen var alldeles för stor för att stanna där den började.\nDen första Backyard BBQ:n blev inte slutmålet.\nDen blev beviset.\nAtt en dröm faktiskt kunde bli verklighet.\nOch att Flavor-Boss hade tagit sitt allra första steg',
    expandableTextEn: 'The vision took its first steps in a home kitchen in Malmö.\nA grill.\nA few African fabrics.\nA speaker.\nAnd an idea that was considerably bigger than the budget.\nThrough Facebook the first orders started coming in, and the planning of the very first Afro-Caribbean Backyard BBQ took off.\nNo one knew if ten or a hundred people would show up.\nOver 150 guests came.\nNeighbors helped.\nFamilies came.\nFriends danced.\nAnd people who had never met before.\n[[VIDEO]]\nFood.\nMusic.\nDance.\nGood vibes.\nThe first truly sunny day of the year.\nWhat was supposed to be a BBQ party became something much bigger.\nA feeling.\nA community.\nA moment no one wanted to end.\nThat’s when the vision came to life.\nFlavor-Boss would never just be about food.\nIt would be about the experience.\nAbout the culture.\nAbout the people.\nAnd about creating memories that live on long after the plate is empty.\nAmong the guests was also the artist Sabina Ddumba and her crew. An early sign that the feeling had begun to reach further than the backyard itself.\nFrom the very beginning, the dream was bigger than the yard where it all started.\nNo one knew what the journey would look like.\nBut one thing was certain.\nIt was far too big to stay where it began.\nThe first Backyard BBQ wasn’t the destination.\nIt was the proof.\nThat a dream could actually become reality.\nAnd that Flavor-Boss had taken its very first step',
    expandableVideo: '/videos/videoplaybackcomp.mp4',
    sources: [
      {
        url: 'https://sverigesradio.se/artikel/6483467',
        labelSv: 'Hör Patricias berättelse på Sveriges Radio',
        labelEn: 'Hear Patricia’s story on Sveriges Radio',
      },
    ],
  },
  {
    year: '2017',
    sv: '2017 — Folk börjar lägga märke till henne',
    en: '2017 — People start to take notice',
    titleSv: 'RYKTET SPRIDER SIG',
    titleEn: 'WORD SPREADS',
    gradient: 'linear-gradient(135deg,#0f3d2e 0%,#2d6a4f 40%,#f59e0b 100%)',
    accentColor: '#fde047',
    pattern: 'tribal',
    layout: 'imageBackdrop',
    uniformText: true,
    images: [img2017banner],
    extraTextSv: 'Flavor-Boss hade hittat sin publik.\nDe första följarna började hitta fram.\nPatricias Backyard BBQ:s på Värnhem blev större.\n[[VIDEO]]\nKöerna blev längre.\nHemmaköket blev mindre.\nDet blev tydligt att drömmen hade vuxit ur platsen där allting började.',
    extraTextEn: 'Flavor-Boss had found its audience.\nThe first followers began to find their way.\nPatricia’s Backyard BBQs at Värnhem grew bigger.\n[[VIDEO]]\nThe queues got longer.\nThe home kitchen got smaller.\nIt became clear that the dream had outgrown the place where it all began.',
    bodyVideo: '/videos/varnhem.mp4',
    expandableTextSv: 'Människor kom tillbaka.\nRyktet spreds genom känslan.\nMaten. Musiken. Gemenskapen.\nDe första festivalerna.\nDe första stegen utanför Malmö.\nFlavor-Boss var fortfarande litet.\nMen visionen hade redan vuxit ur hemmaköket.\nNu var det dags att [ge drömmen mer utrymme](https://startaochdriva.se/2017/06/16/flavor-boss-gor-nagot-du-brinner/).',
    expandableTextEn: 'People came back.\nThe word spread through the feeling.\nThe food. The music. The community.\nThe first festivals.\nThe first steps outside Malmö.\nFlavor-Boss was still small.\nBut the vision had already outgrown the home kitchen.\nNow it was time to [give the dream more room](https://startaochdriva.se/2017/06/16/flavor-boss-gor-nagot-du-brinner/).',
    inlineNext: true,
    sources: [
      {
        url: 'https://africanent.se/2017/10/intervju-med-patricia-dianda-flavor-boss-catering-det-basta-fran-det-afro-karibiska-koket/',
        labelSv: 'Läs intervjun i African Entertainment',
        labelEn: 'Read the interview in African Entertainment',
      },
      {
        url: 'https://startaochdriva.se/2017/06/16/flavor-boss-gor-nagot-du-brinner/',
        labelSv: 'Porträtt i Starta och Driva',
        labelEn: 'Portrait in Starta och Driva',
      },
    ],
  },
  {
    year: '2018',
    sv: '2018 — Verksamheten växer organiskt',
    en: '2018 — The business grows organically',
    titleSv: 'DRÖMMEN TAR FORM',
    titleEn: 'THE DREAM TAKES SHAPE',
    gradient: 'linear-gradient(135deg,#1e1b4b 0%,#0e7490 40%,#f97316 90%)',
    accentColor: '#fde047',
    pattern: 'hut',
    layout: 'imageLeft',
    bodyBackline: true,
    images: [img2018distortion],
    extraTextSv: 'Visionen var tydlig. Nu återstod bara att bygga den.\nEtt nytt kapitel tog sin början.\n[Klaffbron blev den nya mötesplatsen](https://www.instagram.com/p/BkpLNj9n_-R/).\nVisionen växte.\nOch för första gången började drömmen få en tydlig riktning.\nStora drömmar.\nSmå resurser.\nIngen färdig karta.\nBara viljan att hitta vägen.',
    extraTextEn: 'The vision was clear. All that remained was to build it.\nA new chapter began.\n[Klaffbron became the new meeting place](https://www.instagram.com/p/BkpLNj9n_-R/).\nThe vision grew.\nAnd for the first time the dream began to take a clear direction.\nBig dreams.\nSmall resources.\nNo finished map.\nJust the will to find the way.',
    expandableTextSv: 'Backyard BBQ:s blev större.\nFestivalerna blev fler.\n[[IMAGE]]\nOch Flavor-Boss började hitta sin identitet.\nPatricia gjorde sin första TV-debut på [Serbiens största TV-kanal](https://www.instagram.com/p/BjpaNO7FtWm/?hl=en) tillsammans med en välkänd TV-kock.\n[[IMAGE]]\nPlötsligt hade Flavor-Boss hittat följare även utanför Sveriges gränser.\nDet blev tydligt att människor inte bara kom för maten.\n[[IMAGE]]\nDe kom för musiken, kulturen och känslan.\nFestivaler.\nFoodtrucks.\nCatering.\nEvents.\nInte olika verksamheter.\nOlika sätt att uppleva samma vision.\n[[IMAGE]]',
    expandableTextEn: 'Backyard BBQs grew bigger.\nThe festivals grew in number.\n[[IMAGE]]\nAnd Flavor-Boss began to find its identity.\nPatricia made her first TV debut on [Serbia’s biggest TV channel](https://www.instagram.com/p/BjpaNO7FtWm/?hl=en) together with a well-known TV chef.\n[[IMAGE]]\nSuddenly Flavor-Boss had found followers even beyond Sweden’s borders.\nIt became clear that people didn’t come only for the food.\n[[IMAGE]]\nThey came for the music, the culture and the feeling.\nFestivals.\nFood trucks.\nCatering.\nEvents.\nNot different businesses.\nDifferent ways to experience the same vision.\n[[IMAGE]]',
    inlineNext: true,
    expandableImages: [img2018festival, img2018serbian, img2018ninasdotter, img2018korkort],
  },
  {
    year: '2019',
    sv: '2019 — Telefonen ringer. Patricia är i Afrika.',
    en: '2019 — The phone rings. Patricia is in Africa.',
    titleSv: 'GENOMBROTTET',
    titleEn: 'THE BREAKTHROUGH',
    gradient: 'linear-gradient(135deg,#7c2d12 0%,#dc2626 50%,#facc15 100%)',
    accentColor: '#fde047',
    pattern: 'burst',
    layout: 'centered',
    leftAlignedContent: true,
    bodyImages: [img2019farika],
    extraTextSv: 'Drömmen hade fått fart. Nu började världen svara tillbaka.\n2019 blev året då allt började falla på plats.\nFör första gången reste Patricia till Afrika.\n[[IMAGE]]\nEn resa som blev mer än ett resmål.\nDen blev ett återseende med rötterna.\nFärgerna.\nKulturen.\nGemenskapen.\nDet som länge hade funnits inom henne fick nu ta plats på riktigt och blev en självklar del av Flavor-Boss identitet.',
    extraTextEn: 'The dream had gained momentum. Now the world started answering back.\n2019 became the year everything started falling into place.\nFor the first time, Patricia traveled to Africa.\n[[IMAGE]]\nA trip that became more than a destination.\nIt became a reunion with her roots.\nThe colors.\nThe culture.\nThe community.\nWhat had long existed within her now truly took its place and became a natural part of Flavor-Boss’s identity.',
    expandableTextSv: 'Samtidigt började dörrarna öppnas.\nEtt enkelt DM ledde hela vägen till [Halebop Mataam](https://www.facebook.com/halebop/posts/10156061773126297), ett mat- och koncepttävlingsprogram där Patricia tog sig hela vägen till topp 4. Tillsammans med juryn, matprofilen Zeina Mourtada (Zeinas Kitchen), och programledaren Filip Dikmen, komiker och TV-profil, utmanades deltagarna att utveckla både sin mat och sitt koncept.\n[[IMAGE]]\nDet blev en vändpunkt.\nInte bara för maten.\nUtan för hela visionen.\nFlavor-Boss började hitta sin plats i världen.\nEfter programmet tog resan fart. Med stöd från Halebop fortsatte Flavor-Boss ut på festivalerna, bland annat Malmöfestivalen och Big Slap.\n[[IMAGE]]\nDet blev steget som gjorde den första Flavor-Boss foodtrucken möjlig.\nMöjligheterna fortsatte att växa. Flavor-Boss tog plats i nya sammanhang, från festivaler till musikvärlden, där [Patricia medverkade i Cherries musikvideo Mami](https://www.youtube.com/watch?v=rS2y_KQvpFo). Visionen började hitta sin väg.',
    expandableTextEn: 'At the same time, doors started to open.\nA simple DM led all the way to [Halebop Mataam](https://www.facebook.com/halebop/posts/10156061773126297), a food and concept competition show where Patricia made it all the way to the top 4. Together with the jury — food personality Zeina Mourtada (Zeinas Kitchen) and host Filip Dikmen, comedian and TV personality — the contestants were challenged to develop both their food and their concept.\n[[IMAGE]]\nIt became a turning point.\nNot just for the food.\nBut for the whole vision.\nFlavor-Boss began to find its place in the world.\nAfter the show, the journey picked up speed. With support from Halebop, Flavor-Boss went on to festivals, including Malmöfestivalen and Big Slap.\n[[IMAGE]]\nIt became the step that made the first Flavor-Boss food truck possible.\nThe opportunities kept growing. Flavor-Boss took its place in new contexts, from festivals to the music world, where [Patricia appeared in Cherrie’s music video Mami](https://www.youtube.com/watch?v=rS2y_KQvpFo). The vision began to find its way.',
    inlineNext: true,
    expandableImages: [img2019filip, img2019halebop],
    sources: [
      {
        url: 'https://www.facebook.com/halebop/posts/10156061773126297/',
        labelSv: 'Halebops hyllning på Facebook',
        labelEn: 'Halebop’s shout-out on Facebook',
      },
    ],
  },
  {
    year: '2020',
    sv: '2020 — Hela världen stannar. Patricia startar.',
    en: '2020 — The whole world stops. Patricia starts.',
    titleSv: 'NÄR VÄRLDEN STANNADE… FORTSATTE VI',
    titleEn: 'WHEN THE WORLD STOPPED… WE KEPT GOING',
    gradient: 'linear-gradient(135deg,#1e1b4b 0%,#581c87 45%,#be185d 100%)',
    accentColor: '#f9a8d4',
    pattern: 'mask',
    layout: 'imageLeft',
    images: [img2020team],
    extraTextSv: 'Flavor-Boss hade lärt sig att varje motgång kunde bli början på nästa kapitel.\n2020 skulle bli året då den första Flavor-Boss foodtrucken rullade ut.\nIstället stannade världen.\nFestivaler ställdes in.\nBokningar försvann.\nPlaner ritades om.\nMen en sak förändrades aldrig.\nViljan att hitta nya vägar.\n\nAlla sa att det var fel tid.',
    extraTextEn: 'Flavor-Boss had learned that every setback could become the start of the next chapter.\n2020 was supposed to be the year the first Flavor-Boss food truck rolled out.\nInstead, the world stopped.\nFestivals were cancelled.\nBookings disappeared.\nPlans were redrawn.\nBut one thing never changed.\nThe will to find new ways forward.\n\nEveryone said it was the wrong time.',
    expandableTextSv: 'När pandemin slog till blev kreativiteten Flavor-Boss starkaste drivkraft.\n[Ett samarbete med Plan B](https://www.instagram.com/p/B_AesxjJpJH/?hl=en&img_index=1) förvandlade rockklubben till en afro-karibisk restaurang när världen stod still. Kort därefter flyttade Flavor-Boss vidare till Sofielunds Folkets Hus, där nya idéer tog form genom matlådor, lokala samarbeten och nya mötesplatser.\nTillsammans med Hela Malmö fick Flavor-Boss sin första grafiska profil sponsrad och skapad av designern Fedja. Samtidigt växte uppdragen vidare, från områdes fester på MKB:s gårdar och köpcentret Malmö Mobilia till en livestream från Malmö Live i samarbete med Nöjesguiden och Jubel Agency.\nMitt i allt lanserades den första foodtrucken.\n[[IMAGE]]\nGamla Bettan.\nEn färgsprakande dröm på hjul.\nPremiären blev minst sagt minnesvärd när [Bettan gav sig ut på ett oväntat äventyr](https://africanent.se/2020/07/flavor-boss-kitchen-forsvunnen-foodtruck-pa-premiardagen/) innan hon hittade hem igen.\nNär året summerades belönades omställningen med Rapidus "Årets Friskt Vågat", ett erkännande för modet att tänka nytt när nästan allt annat stod still.\n[[IMAGE]]\nFlavor-Boss hade lärt sig att varje motgång kunde bli början på nästa kapitel.',
    expandableTextEn: 'When the pandemic hit, creativity became Flavor-Boss’s strongest driving force.\nA collaboration with Plan B turned the rock club into an Afro-Caribbean restaurant while the world stood still. Shortly after, Flavor-Boss moved on to Sofielunds Folkets Hus, where new ideas took shape through meal boxes, local collaborations and new meeting places.\nTogether with Hela Malmö, Flavor-Boss got its first graphic profile sponsored and created by designer Fedja. At the same time, the assignments kept growing, from neighborhood parties at MKB’s courtyards and the Malmö Mobilia shopping center to a livestream from Malmö Live in collaboration with Nöjesguiden and Jubel Agency.\nIn the middle of it all, the first food truck launched.\n[[IMAGE]]\nGamla Bettan.\nA colorful dream on wheels.\nThe premiere became memorable, to say the least, when Bettan set off on an unexpected adventure before finding her way home again.\nWhen the year was summed up, the turnaround was rewarded with Rapidus’s “Boldest Bet of the Year,” a recognition for the courage to think new when almost everything else stood still.\n[[IMAGE]]\nFlavor-Boss had learned that every setback could become the start of the next chapter.',
    expandableImages: [img2019truck, img2020rapidus],
    sources: [
      {
        url: 'https://www.sydsvenskan.se/2020-04-15/rockklubben-plan-b-forvandlas-till-afro-karibisk-restaurang-under-coronakrisen',
        labelSv: 'Läs Sydsvenskans reportage om Plan B',
        labelEn: 'Read Sydsvenskan’s feature on Plan B',
      },
    ],
  },
  {
    year: '2021',
    sv: '2021 — Sverige börjar förstå vad Patricia redan visste',
    en: '2021 — Sweden starts to understand what Patricia already knew',
    titleSv: 'MOD BELÖNAS',
    titleEn: 'BOLDEST BET',
    gradient: 'linear-gradient(135deg,#0c4a6e 0%,#0e7490 40%,#fb923c 100%)',
    accentColor: '#fde047',
    pattern: 'sun',
    layout: 'imageRight',
    images: [img2021friskt],
    extraTextSv: 'Det som en gång började med en grill i ett hemmakök hade nu fått en plats runt borden där framtiden diskuterades.\n\nNär världen sakta började öppna upp igen började också nya dörrar öppnas för Flavor-Boss.\n\nDet som hade byggts genom hårt arbete, kreativitet och envishet började nu uppmärksammas av fler.',
    extraTextEn: 'What had once begun with a grill in a home kitchen had now earned a seat at the tables where the future was being discussed.\n\nAs the world slowly began to open up again, new doors also started opening for Flavor-Boss.\n\nWhat had been built through hard work, creativity and persistence was now starting to be noticed by more people.',
    expandableTextSv: '[Patricia tilldelades Rapidus "Årets Friskt Vågat"](https://www.youtube.com/watch?v=KxSIpcfPZ-4), ett pris som uppmärksammade modet att tänka nytt och våga ställa om när världen förändrades.\n\nSamtidigt började en ny resa.\n\nInte bara bakom grillen.\n\nUtan även på scen.\n\nPå en catering till nätverket Västra Hamnen på Oh Boy Hotel kom en oväntad inbjudan att hålla sin första presentation.\n[[IMAGE]]\nNervöst, ovant och långt utanför komfortzonen. Men det blev också början på något nytt.\n\nFlavor-Boss började ta plats i samtalen om entreprenörskap, kreativitet och framtidens matupplevelser.\n\nSamma år [bjöds Patricia in som jurymedlem](https://www.sydsvenskan.se/dygnet-runt/har-ar-juryn-som-ska-avgora-malmo-gastronomy-award/) i Malmö Gastronomy Awards.\n\nDet blev ännu ett kvitto på att Flavor-Boss inte längre bara växte genom gästerna.\n\nBranschen hade också börjat lägga märke till resan.',
    expandableImages: [img2021ohboy],
    expandableTextEn: 'Patricia was awarded Rapidus\' "Boldest Bet of the Year," a prize recognizing the courage to think differently and dare to change course as the world was changing.\n\nAt the same time, a new journey began.\n\nNot just behind the grill.\n\nBut also on stage.\n\nAt a catering event for the Västra Hamnen network at Oh Boy Hotel came an unexpected invitation to give her first presentation.\n[[IMAGE]]\nNerve-wracking, unfamiliar and far outside her comfort zone. But it also became the start of something new.\n\nFlavor-Boss began to take part in conversations about entrepreneurship, creativity and the future of food experiences.\n\nThat same year, Patricia was invited to join the jury of the Malmö Gastronomy Awards.\n\nIt became yet another sign that Flavor-Boss was no longer growing only through its guests.\n\nThe industry, too, had started to take notice of the journey.',
    sources: [
      {
        url: 'https://rapidus.se/tre-fragor-till-arets-friskt-vagat-2/',
        labelSv: 'Läs Rapidus intervju om utmärkelsen',
        labelEn: 'Read Rapidus’ interview about the award',
      },
      {
        url: 'https://www.sydsvenskan.se/2021-11-04/sveriges-storsta-streetfoodexpert-malmo-ar-inte-huvudstaden-for-falafel-och-kebab',
        labelSv: 'Sydsvenskan om Patricia som streetfood-expert',
        labelEn: 'Sydsvenskan on Patricia as a street food expert',
      },
    ],
  },
  {
    year: '2022',
    sv: '2022 — Sex år. Från ett Facebook-inlägg till Sveriges bästa.',
    en: '2022 — Six years. From a Facebook post to Sweden’s best.',
    titleSv: 'VÄRLDEN ÖPPNAR UPP IGEN',
    titleEn: 'THE WORLD OPENS UP AGAIN',
    gradient: 'linear-gradient(135deg,#422006 0%,#b45309 40%,#fde047 100%)',
    accentColor: '#fef08a',
    pattern: 'burst',
    layout: 'centered',
    bodyBackline: true,
    extraTextSv: 'När världen öppnade upp igen var Flavor-Boss redo.\n\nDet blev året då drömmen bevisade att den hörde hemma bland de bästa.',
    extraTextEn: 'When the world opened up again, Flavor-Boss was ready.\n\nThis became the year the dream proved it belonged among the best.',
    expandableImages: [img2022sf],
    expandableTextSv: '[Flavor-Boss tog hem sin allra första titel som Sverigemästare i Streetfood.](https://europeanstreetfood.com/2022/06/19/for-sverige-i-tiden/)\n[[IMAGE]]\n\nEtt ögonblick som förändrade allt.\n\nMen vägen dit var långt ifrån enkel.\n\nGamla Bettan hade kämpat sig genom ännu en säsong och började säga ifrån. Motorn gav upp på vägen in, bilen fick bärgas hem och under sommaren blev teamet lika mycket mekaniker som kockar. Mellan festivalerna lagades, skruvades och löstes problem, bara för att kunna rulla vidare mot nästa destination.\n\nDet blev tydligt att nästa kapitel krävde en ny investering.\n\nEn ny foodtruck.\n\nSamtidigt började Patricia hålla sina första inspirationsföreläsningar om entreprenörskap. Flavor-Boss inspirerade nu människor, inte bara genom maten, utan också genom berättelsen bakom den.',
    expandableTextEn: 'Flavor-Boss took home its very first title as Swedish Street Food Champion.\n[[IMAGE]]\n\nA moment that changed everything.\n\nBut the road there was far from easy.\n\nGamla Bettan had fought its way through yet another season and started to give out. The engine gave up on the way there, the truck had to be towed home, and over the summer the team became just as much mechanics as cooks. Between festivals, things were fixed, tightened and solved, just to be able to roll on to the next destination.\n\nIt became clear that the next chapter required a new investment.\n\nA new food truck.\n\nAt the same time, Patricia began holding her first inspirational talks on entrepreneurship. Flavor-Boss now inspired people not only through the food, but also through the story behind it.',
    sources: [
      {
        url: 'https://europeanstreetfood.com/2022/06/19/for-sverige-i-tiden/',
        labelSv: 'European Street Food Awards om Sveriges vinst',
        labelEn: 'European Street Food Awards on Sweden’s win',
      },
    ],
  },
  {
    year: '2023',
    sv: '2023 — Segrar, strid och en fasad som vägrade tystas',
    en: '2023 — Victories, a fight, and a facade that refused to be silenced',
    titleSv: 'ALL IN. INGEN VÄG TILLBAKA.',
    titleEn: 'ALL IN. NO WAY BACK.',
    gradient: 'linear-gradient(135deg,#831843 0%,#be123c 40%,#f59e0b 100%)',
    accentColor: '#ff5f1f',
    pattern: 'dancer',
    layout: 'centered',
    bodyBackline: true,
    centerVertically: true,
    headerImage: img2023aretsforetagare,
    headerImageAlt: 'Årets Unga Företagare i Burlöv',
    extraTextSv: 'Flavor-Boss hade blivit en destination.\n\n2023 blev året då Flavor-Boss satsade fullt ut.\n\nEfter flera år av festivaler, catering och foodtrucks var det dags att bygga något som kunde bära visionen ännu längre.',
    extraTextEn: 'Flavor-Boss had become a destination.\n\n2023 became the year Flavor-Boss went all in.\n\nAfter several years of festivals, catering and food trucks, it was time to build something that could carry the vision even further.',
    expandableTextSv: 'Flavor-Boss expanderade från Malmö och öppnade sitt första egna cateringkök, Flavor-Boss Kitchen, i Arlöv.\n\nEn anonym industrilokal förvandlades till en färgsprakande mötesplats. Byggd med stora drömmar, små resurser och tusentals timmar av hårt arbete.\n\n[Invigningen lockade hundratals besökare.](https://www.facebook.com/watch/?v=756052502866815)\n\nFör första gången fick människor kliva rakt in i Flavor-Boss värld.\n\nKort därefter tog resan en oväntad vändning.\n\nDen [färgsprakande fasadmålningen](https://www.foretagarna.se/nyheter/blekinge/2023/september/nekat-bygglov-for-fasadmalning/) ifrågasattes och ombads tas bort.\n\nDet som först såg ut som ett bakslag blev istället ett av de finaste ögonblicken i Flavor-Boss historia.\n\n[Tusentals människor.](https://www.skrivunder.com/flavor-boss_fargglada_fasadmalning_i_arlov_riskeras_att_tas_bort_vi_behover_er_hjalp_att_overklaga_beslutet_for_att_behalla_malningen_sa_vi_kan_stanna_kvar_i_omradet)\nGrannar.\nFöretagare.\nFöljare från hela Sverige.\n\nDe ställde sig bakom visionen.\n\nDet blev aldrig bara en fasadmålning. Det blev en symbol för modet att sticka ut, sätta färg på tillvaron och våga tänka annorlunda.\n\nMed stöd från Företagarna i Burlöv överklagades beslutet och fasaden fick till slut stanna kvar. Det som började som en utmaning avslutades på bästa sätt,\n\n[[VIDEO]]\n\nnär Flavor-Boss senare fick möjlighet att servera mat till Burlövs kommun. Ett fint avslut som visade att dialog och samarbete alltid är starkare än konflikt.\n\nSamma år [utsågs Patricia till Årets Unga Företagare](https://www.foretagarna.se/nyheter/blekinge/2024/maj/arets-unga-foretagare-i-burlov/) i Burlöv, ett erkännande för modet att tänka nytt och för att [sätta både Flavor-Boss och Burlöv på kartan](https://www.mynewsdesk.com/se/burlovs_kommun/pressreleases/grattis-aarets-foeretagare-burloev-3317947).\n[[IMAGE]]\n\nFlavor-Boss försvarade sin plats i toppen genom att [vinna Sverigemästerskapet i Streetfood](https://www.instagram.com/p/CuY9ZblMM5u/?img_index=1), den här gången i ett nytt mästerskap och på en ny scen.\n[[IMAGE]]\n\nFör första gången tävlade Flavor-Boss också i Nordiska Mästerskapen, där två nya titlar följde med hem: Mest Kreativa Rätt och Barnjuryns Favorit.\n\nKöerna blev längre.\nFler började resa för upplevelsen.\nVisionen blev större.\n\nFlavor-Boss hade blivit en destination.',
    expandableTextEn: 'Flavor-Boss expanded beyond Malmö and opened its first own catering kitchen, Flavor-Boss Kitchen, in Arlöv.\n\nAn anonymous industrial unit was transformed into a vibrant, colourful meeting place. Built with big dreams, small resources and thousands of hours of hard work.\n\n[The opening drew hundreds of visitors.](https://www.facebook.com/watch/?v=756052502866815)\n\nFor the first time, people could step right into the Flavor-Boss world.\n\nShortly after, the journey took an unexpected turn.\n\nThe colourful facade mural was questioned and asked to be removed.\n\nWhat at first looked like a setback instead became one of the finest moments in Flavor-Boss history.\n\nThousands of people.\nNeighbours.\nBusiness owners.\nFollowers from all over Sweden.\n\nThey stood behind the vision.\n\nIt never became just a mural. It became a symbol of the courage to stand out, add colour to everyday life and dare to think differently.\n\nWith support from Företagarna (the Swedish Federation of Business Owners) in Burlöv, the decision was appealed, and the facade was ultimately allowed to stay. What began as a challenge ended in the best possible way,\n\n[[VIDEO]]\n\nwhen Flavor-Boss later got the chance to serve food to the Burlöv municipality. A fitting conclusion that showed dialogue and collaboration are always stronger than conflict.\n\nThat same year, [Patricia was named Young Entrepreneur of the Year](https://www.foretagarna.se/nyheter/blekinge/2024/maj/arets-unga-foretagare-i-burlov/) in Burlöv, a recognition of the courage to think differently and for putting both Flavor-Boss and Burlöv on the map.\n[[IMAGE]]\n\nFlavor-Boss defended its place at the top by [winning the Swedish Street Food Championship](https://www.instagram.com/p/CuY9ZblMM5u/?img_index=1), this time in a new championship and on a new stage.\n[[IMAGE]]\n\nFor the first time, Flavor-Boss also competed in the Nordic Championships, bringing home two new titles: Most Creative Dish and Kids’ Jury Favourite.\n\nThe queues grew longer.\nMore people started travelling for the experience.\nThe vision grew bigger.\n\nFlavor-Boss had become a destination.',
    expandableVideo: '/videos/skrivning.mp4',
    expandableImages: [img2023aretsunga, img2023sm],
    expandableImageSizes: ['sm', 'md'],
    sources: [
      {
        url: 'https://www.sydsvenskan.se/2023-07-19/foodtrucksresan-i-arlov-borjade-med-en-tragedi',
        labelSv: 'Sydsvenskan: Foodtrucksresan i Arlöv',
        labelEn: 'Sydsvenskan: The food truck journey in Arlöv',
      },
      {
        url: 'https://etidning.lokaltidningen.se/p/lomma-burlov/2023-08-26/a/dubbla-priser-for-afro-karibiska-smaker/2897/1055651/42272847',
        labelSv: 'Lokaltidningen: Dubbla priser för afro-karibiska smaker',
        labelEn: 'Lokaltidningen: Double awards for Afro-Caribbean flavours',
      },
      {
        url: 'https://www.skd.se/2023-06-30/besokare-hungrar-efter-mer-pa-streetfoodfestivalen/',
        labelSv: 'SkD: Besökare hungrar efter mer',
        labelEn: 'SkD: Visitors hungry for more',
      },
    ],
  },
  {
    year: '2024',
    sv: '2024 — Ett av världens mäktigaste modevarumärken väljer att ta sig an Patricia Dianda från Malmö',
    en: '2024 — One of the world’s most powerful fashion brands takes on Patricia Dianda from Malmö',
    titleSv: 'STORMEN FÖRE NÄSTA NIVÅ',
    titleEn: 'THE STORM BEFORE THE NEXT LEVEL',
    gradient: 'linear-gradient(135deg,#020617 0%,#1e293b 40%,#dc2626 100%)',
    accentColor: '#f87171',
    pattern: 'zigzag',
    layout: 'centered',
    leftAlignedContent: true,
    bodyBackline: true,
    headerImage: img2024hugboss,
    headerImageAlt: 'Hugo Boss',
    headerImageDesktopSide: true,
    extraTextSv: '[Hugo Boss skickar ett brev](https://www.expressen.se/nyheter/sverige/hugo-boss-hotar-stamma-skansk-smaforetagare/).\n\n2024 blev året då allt hände på en gång.\n\nFlavor-Boss växte snabbare än någonsin.\n\nSamtidigt väntade Patricia sitt andra barn.\n\nOch mitt i allt fortsatte resan framåt.',
    extraTextEn: '[Hugo Boss sends a letter](https://www.expressen.se/nyheter/sverige/hugo-boss-hotar-stamma-skansk-smaforetagare/).\n\n2024 became the year everything happened at once.\n\nFlavor-Boss grew faster than ever.\n\nAt the same time, Patricia was expecting her second child.\n\nAnd in the middle of it all, the journey kept moving forward.',
    expandableImages: [img2024gravid, img2024ko, img2024tioUnga],
    expandableVideo: '/videos/3000.mp4',
    expandableVideoSize: 'sm',
    expandableTextSv: 'Precis innan Street Food Festivalen lanserades Flavor-Boss andra foodtruck.\n\nBossen.\n\nHon rullade in direkt på sitt första mästerskap.\n\nFlavor-Boss försvarade titeln och blev ännu en gång Sverigemästare i Streetfood i Malmö.\n[[IMAGE]]\n\nTre dagar senare väntade en helt annan utmaning.\n\nSamma natt som guldet firades väntade en helt annan utmaning, när det landade ett juridiskt [brev från den globala modejätten Hugo Boss](https://tv.aftonbladet.se/video/374830/fick-brev-fraan-hugo-boss-byt-namn). Bara några dagar senare föddes Patricia och familjens andra barn.\n\nIstället för att bara få njuta av framgångarna fick teamet plötsligt [lära sig nästan lika mycket om juridik som om matlagning](https://www.wyz.se/).\n\nMen resan stannade aldrig.\n\nPå Malmöfestivalen växte köerna till flera hundra meter och Flavor-Boss blev det första konceptet att belönas med 5 av 5 stjärnor i Sydsvenskans mattest ”Bong”. Trycket blev större än någon kunnat föreställa sig.\n[[IMAGE]]\n\nSamtidigt utsågs Patricia till en av Sveriges tio främsta unga entreprenörer av Företagarna, blev finalist i Årets Unga Idé (Företagarna).\n[[IMAGE]]\n\nOch hon stod på scen inför 3 000 UF-elever på Sparbanken Arena i Lund för att inspirera nästa generation entreprenörer på ett lekfullt och kreativt sätt.\n[[VIDEO]]\n\nSäsongen avslutades på samma sätt som den började.\n\nFlavor-Boss stod högst upp på pallen ännu en gång och försvarade sin plats i toppen genom att vinna ännu ett Sverigemästerskapet i Streetfood, denna gången när vi landade i Göteborg för första gången.\n\n2024 blev året som bevisade att de största prövningarna ofta kommer precis innan nästa nivå.',
    expandableTextEn: 'Just before the Street Food Festival, Flavor-Boss launched its second food truck.\n\nBossen.\n\nShe rolled straight into her first championship.\n\nFlavor-Boss defended the title and once again became Swedish Street Food Champion, this time in Malmö.\n[[IMAGE]]\n\nThree days later, a completely different challenge was waiting.\n\nThe same night the gold was celebrated, a legal letter landed from the global fashion giant Hugo Boss. Just a few days later, Patricia and the family’s second child was born.\n\nInstead of simply enjoying the success, the team suddenly had to learn almost as much about law as about cooking.\n\nBut the journey never stopped.\n\nAt Malmöfestivalen, the queues grew to several hundred meters, and Flavor-Boss became the first concept to be awarded 5 out of 5 stars in Sydsvenskan’s food review “Bong.” The pressure became bigger than anyone could have imagined.\n[[IMAGE]]\n\nAt the same time, Patricia was named one of Sweden’s top ten young entrepreneurs by Företagarna, and became a finalist for Young Idea of the Year (Företagarna).\n[[IMAGE]]\n\nShe also took the stage in front of 3,000 student entrepreneurs at Sparbanken Arena in Lund to inspire the next generation of entrepreneurs in a playful and creative way.\n[[VIDEO]]\n\nThe season ended the same way it began.\n\nFlavor-Boss stood at the very top of the podium once again, defending its place at the top by winning yet another Swedish Street Food Championship, this time landing in Gothenburg for the first time.\n\n2024 became the year that proved the biggest trials often come right before the next level.',
    sources: [
      {
        url: 'https://tv.aftonbladet.se/video/374830/fick-brev-fraan-hugo-boss-byt-namn',
        labelSv: 'Se Aftonbladets inslag om Hugo Boss-brevet',
        labelEn: 'Watch Aftonbladet’s feature on the Hugo Boss letter',
      },
      {
        url: 'https://www.expressen.se/nyheter/sverige/hugo-boss-hotar-stamma-skansk-smaforetagare/',
        labelSv: 'Expressen om hotet från Hugo Boss',
        labelEn: 'Expressen on the threat from Hugo Boss',
      },
      {
        url: 'https://www.youtube.com/watch?v=TcLW29V5N_Y',
        labelSv: 'Se intervjun på YouTube',
        labelEn: 'Watch the interview on YouTube',
      },
    ],
  },
  {
    year: '2025',
    sv: '2025 — Ingen stoppar henne längre',
    en: '2025 — No one stops her anymore',
    titleSv: 'EN VÄRLD TAR FORM',
    titleEn: 'A WORLD TAKES SHAPE',
    gradient: 'linear-gradient(135deg,#451a03 0%,#b45309 40%,#fde047 100%)',
    accentColor: '#dc2626',
    pattern: 'sun',
    layout: 'imageRight',
    images: [imgRick],
    extraTextSv: 'Fyra nationella mästerskap i rad.\n\n2025 blev året då Flavor-Boss växte långt bortom maten.\n\nDet som en gång började med en grill på en bakgård hade blivit en värld av smaker, musik, kultur och upplevelser.\n\nFlavor-Boss World hade tagit sina första steg.',
    extraTextEn: 'Four national championships in a row.\n\n2025 became the year Flavor-Boss grew far beyond the food.\n\nWhat had once begun with a grill in a backyard had become a world of flavors, music, culture and experiences.\n\nFlavor-Boss World had taken its first steps.',
    expandableImages: [img2025ovan, img2025dryckor, img2025kamali, img2025gbg],
    expandableVideo: '/videos/dansa.mp4',
    expandableTextSv: 'På Malmöfestivalen byggde Flavor-Boss för första gången upp ett helt eget område.\n[[IMAGES]]\nHär lanserades **Flavor-Booze Bar**,\nmed egna cocktails i samarbete med **Smaksak Winery** och egen öl tillsammans med **Hyllie Bryggeri**. Samtidigt fick **Gamla Bettan** nytt liv och byggdes om till en bar, medan den dansande maskoten **Kankurang** gjorde entré och förvandlade köerna till en del av showen.\n[[VIDEO]]\nMusiken.\nDansen.\nMaten.\nKulturen.\nAllt började smälta samman.\nFlavor-Boss var inte längre bara något man åt.\nDet var något man upplevde.\nSamtidigt fortsatte tävlingssäsongen att skriva historia.\nFlavor-Boss tog hem [Sweet Food Award](https://www.facebook.com/photo.php?fbid=1295855029217225&type=3) i Malmö och vann den nya svenska mästartiteln i en helt ny kategori - Sweetfood.\n[[IMAGE]]\nFör första gången rullade teamet vidare till **Stockholm**.\nKöerna slingrade sig genom parkerna.\nMänniskor dansade medan de väntade.\n[Och Flavor-Boss åkte hem som Sverigemästare i Streetfood igen.](https://www.facebook.com/photo/?fbid=1276538324482229)\nSedan fortsatte resan till **Göteborg**.\n[[IMAGE]]\nSamma resultat.\nSamma energi.\nSamma glädje.\nÄnnu ett **Sverigemästerskap**.\nDet började spela mindre roll vilken stad Flavor-Boss rullade in i.\nVisionen följde alltid med.\nSamma år lanserades den tredje foodtrucken.\n**Champen**.\nCateringupplevelsen utvecklades med nya dekorationskoncept där varje bokning blev en scen, inte bara en servering.\nNär året summerades kom ännu ett kvitto.\nPå bara tre år hade Flavor-Boss vuxit med över **800 procent.**\n==Flavor-Boss hade slutat jaga drömmen. Nu var det drömmen som började komma ikapp Flavor-Boss==',
    expandableTextEn: 'At Malmöfestivalen, Flavor-Boss built its own dedicated area for the first time.\n[[IMAGES]]\nHere, **Flavor-Booze Bar** launched,\nwith its own cocktails in collaboration with **Smaksak Winery** and its own beer together with **Hyllie Bryggeri**. At the same time, **Gamla Bettan** got a new lease on life and was rebuilt into a bar, while the dancing mascot **Kankurang** made his entrance and turned the queues into part of the show.\n[[VIDEO]]\nThe music.\nThe dancing.\nThe food.\nThe culture.\nIt all began to merge.\nFlavor-Boss was no longer just something you ate.\nIt was something you experienced.\nMeanwhile, the competition season kept writing history.\nFlavor-Boss took home the [Sweet Food Award](https://www.facebook.com/photo.php?fbid=1295855029217225&type=3) in Malmö and won the new Swedish champion title in a brand new category — Sweetfood.\n[[IMAGE]]\nFor the first time, the team rolled on to **Stockholm**.\nThe queues wound through the parks.\nPeople danced while they waited.\n[And Flavor-Boss went home as Swedish Street Food Champion again.](https://www.facebook.com/photo/?fbid=1276538324482229)\nThen the journey continued to **Gothenburg**.\n[[IMAGE]]\nSame result.\nSame energy.\nSame joy.\nAnother **Swedish Championship.**\nIt started to matter less which city Flavor-Boss rolled into.\nThe vision always came along.\nThat same year, the third food truck launched.\n**Champen.**\nThe catering experience evolved with new decoration concepts, where every booking became a stage, not just a serving.\nWhen the year was summed up, another milestone arrived.\nIn just three years, Flavor-Boss had grown by over **800 percent.**\n==Flavor-Boss had stopped chasing the dream. Now it was the dream that started catching up to Flavor-Boss==',
    sources: [
      {
        url: 'https://www.facebook.com/streetfoodfestivalen/posts/783730680899312/',
        labelSv: 'Streetfoodfestivalen om vinsten 2025',
        labelEn: 'Streetfoodfestivalen on the 2025 win',
      },
    ],
  },
  {
    year: '2026',
    sv: '2026 — Berättelsen är inte slut. Den byter bara form.',
    en: '2026 — The story isn’t over. It’s just changing shape.',
    titleSv: 'NÄSTA KAPITEL HAR REDAN BÖRJAT.',
    titleEn: 'THE NEXT CHAPTER HAS ALREADY BEGUN.',
    gradient: 'linear-gradient(135deg,#1e1b4b 0%,#7c3aed 40%,#f472b6 80%,#fbbf24 100%)',
    accentColor: '#fde047',
    pattern: 'waves',
    layout: 'imageBackdrop',
    leftAlignedContent: true,
    images: [img2026backdrop],
    expandableImages: [img2026hb],
    expandableVideo: video2026castella,
    extraTextSv: 'Äventyret fortsätter\n\n2026 blev året då Flavor-Boss började blicka långt bortom nästa festival.\nVisionen hade vuxit.\nDrömmen hade blivit större än Sverige.\nOch resan hade bara börjat.',
    extraTextEn: 'The adventure continues\n\n2026 became the year Flavor-Boss started looking far beyond the next festival.\nThe vision had grown.\nThe dream had become bigger than Sweden.\nAnd the journey had only just begun.',
    expandableTextSv: 'Året började med ett viktigt besked.\n[Flavor-Boss vann 75 % av varumärkeskampen mot Hugo Boss.](https://www.svt.se/nyheter/lokalt/skane/hugo-boss-backar-fran-nagra-av-kraven-mot-den-skanska-smaforetagaren)\n[[IMAGE]]\nResan fortsätter fortfarande men ännu en gång blev det ett bevis på att stora visioner är värda att kämpa för.\nKort därefter fick Patricia och [Flavor-Boss representera Malmö och Sverige på det internationella gastronomitoppmötet Chefs Beyond Borders i Barcelona.](https://www.thefoodcapitals.com/events/the-food-capitals-summit-2026-18-21-may-castelldefels-spain/chefs-beyond-borders)\nDet blev ett ögonblick som förändrade perspektivet.\nEn masterclass där framtidens kockar fyllde salen med energi.\n[[VIDEO]]\nEn live cooking-show där hela torget dansade.\nMinistrar, näringsliv och publik som battlede om Mikate på scen.\nMaten blev ett språk.\nMusiken blev en bro.\nOch Flavor-Boss gjorde precis det som alltid varit visionen.\nAtt samla människor.\nOavsett språk.\nOavsett bakgrund.\nOavsett var i världen de kommer ifrån.\nSamtidigt fortsatte visionen att växa hemma.\nTillsammans med **Yangi** AB utvecklas nya hållbara lösningar för att minska svinn och bygga framtidens Flavor-Boss.\nDen första Flavor-Boss-låten **Dance While You Wait**, släpps.\nDen nya hemsidan lanseras.\nBakom scenen började ett nytt kapitel. Under Hampafestivalen tog Flavor-Boss för första gången hand om hela backstage-upplevelsen och serverade mat till svenska och internationella reggae- och hiphopartister med deras team. Ett samarbete som nu fortsätter att växa vidare mot nästa stopp, Uppsala Reggae Festival.\nOch bakom kulisserna fortsätter arbetet med det största projektet hittills.\n**Flavor-Boss World.**\nEn plats där allt som byggts sedan den första Backyard BBQ:n får leva vidare.\nVi letar fortfarande efter platsen där nästa kapitel ska börja.\nKanske blir det i Malmö.\nKanske någon annanstans.\nMen en sak är säker.\n**Äventyret fortsätter.**\n**Follow the adventure.**',
    expandableTextEn: 'The year started with important news.\n[Flavor-Boss won 75% of the brand battle against Hugo Boss.](https://www.svt.se/nyheter/lokalt/skane/hugo-boss-backar-fran-nagra-av-kraven-mot-den-skanska-smaforetagaren)\n[[IMAGE]]\nThe journey is still ongoing, but once again it became proof that big visions are worth fighting for.\nShortly after, Patricia and [Flavor-Boss got to represent Malmö and Sweden at the international gastronomy summit Chefs Beyond Borders in Barcelona.](https://www.thefoodcapitals.com/events/the-food-capitals-summit-2026-18-21-may-castelldefels-spain/chefs-beyond-borders)\nIt became a moment that changed the perspective.\nA masterclass where the chefs of the future filled the room with energy.\n[[VIDEO]]\nA live cooking show where the whole square danced.\nMinisters, business leaders and the audience battling over Mikate on stage.\nThe food became a language.\nThe music became a bridge.\nAnd Flavor-Boss did exactly what the vision had always been.\nTo bring people together.\nRegardless of language.\nRegardless of background.\nRegardless of where in the world they come from.\nMeanwhile, the vision kept growing back home.\nTogether with **Yangi** AB, new sustainable solutions are being developed to reduce waste and build the Flavor-Boss of the future.\nThe first Flavor-Boss song, **Dance While You Wait**, is released.\nThe new website launches.\nBehind the scenes, a new chapter began. During Hampafestivalen, Flavor-Boss took full charge of the backstage experience for the first time, serving food to Swedish and international reggae and hip-hop artists and their teams. A collaboration that keeps growing toward the next stop, Uppsala Reggae Festival.\nAnd behind the scenes, work continues on the biggest project so far.\n**Flavor-Boss World.**\nA place where everything built since the very first Backyard BBQ gets to live on.\nWe’re still searching for the place where the next chapter should begin.\nMaybe it’ll be in Malmö.\nMaybe somewhere else.\nBut one thing is certain.\n**The adventure continues.**\n**Follow the adventure.**',
    isFinale: true,
  },
];

type TimelineJourneyProps = {
  initialYear?: string;
};

const TimelineJourney = ({ initialYear }: TimelineJourneyProps = {}) => {
  const initialIndex = initialYear
    ? Math.max(0, years.findIndex((y) => y.year === initialYear))
    : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const prevIndexRef = useRef<number>(initialIndex);
  const [fromIndex, setFromIndex] = useState<number>(initialIndex);
  const { t } = useLanguage();

  useEffect(() => {
    return () => {
      prevIndexRef.current = currentIndex;
    };
  }, [currentIndex]);

  const goNext = () => {
    if (currentIndex < years.length - 1) {
      setFromIndex(currentIndex);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setFromIndex(currentIndex);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Top scrim: sits above scrolling slide content but below the fixed nav
          buttons, so any content that scrolls up (text, image, anything) fades
          out before it reaches the buttons instead of visually colliding with them. */}
      <div className="fixed top-0 left-0 right-0 h-28 md:h-32 z-40 pointer-events-none bg-gradient-to-b from-black/85 via-black/55 to-transparent" />

      {/* Floating navigation: back to Home — gives the user a way out of the immersive view */}
      <Link
        to="/"
        aria-label={t('Tillbaka till start', 'Back to home')}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md text-white font-display font-bold uppercase tracking-wider text-xs border border-white/30 hover:bg-white/25 hover:scale-105 transition-all shadow-lg"
      >
        <Home className="w-4 h-4" />
        {t('Hem', 'Home')}
      </Link>
      <AnimatePresence mode="wait">
        <YearPage
          key={years[currentIndex].year}
          year={years[currentIndex].year}
          description={t(years[currentIndex].sv, years[currentIndex].en)}
          title={years[currentIndex].titleSv ? t(years[currentIndex].titleSv!, years[currentIndex].titleEn!) : undefined}
          gradient={years[currentIndex].gradient}
          accentColor={years[currentIndex].accentColor}
          pattern={years[currentIndex].pattern}
          layout={years[currentIndex].layout}
          uniformText={years[currentIndex].uniformText}
          bodyBackline={years[currentIndex].bodyBackline}
          centerVertically={years[currentIndex].centerVertically}
          leftAlignedContent={years[currentIndex].leftAlignedContent}
          yearIndex={currentIndex}
          totalYears={years.length}
          fromIndex={fromIndex}
          fromYear={years[fromIndex].year}
          onNext={currentIndex < years.length - 1 ? goNext : undefined}
          onPrev={currentIndex > 0 ? goPrev : undefined}
          images={years[currentIndex].images}
          extraText={years[currentIndex].extraTextSv ? t(years[currentIndex].extraTextSv!, years[currentIndex].extraTextEn!) : undefined}
          expandableText={years[currentIndex].expandableTextSv ? t(years[currentIndex].expandableTextSv!, years[currentIndex].expandableTextEn!) : undefined}
          sources={years[currentIndex].sources?.map((s) => ({
            url: s.url,
            label: t(s.labelSv, s.labelEn),
          }))}
          isFinale={years[currentIndex].isFinale}
          inlineNext={years[currentIndex].inlineNext}
          expandableImage={years[currentIndex].expandableImage}
          expandableImages={years[currentIndex].expandableImages}
          expandableImageSizes={years[currentIndex].expandableImageSizes}
          expandableVideo={years[currentIndex].expandableVideo}
          expandableVideoSize={years[currentIndex].expandableVideoSize}
          bodyVideo={years[currentIndex].bodyVideo}
          bodyImages={years[currentIndex].bodyImages}
          headerImage={years[currentIndex].headerImage}
          headerImageAlt={years[currentIndex].headerImageAlt}
          headerImageDesktopSide={years[currentIndex].headerImageDesktopSide}
        />
      </AnimatePresence>
    </div>
  );
};

export default TimelineJourney;
