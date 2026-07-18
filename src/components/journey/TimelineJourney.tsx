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
import img2019mataam from '@/assets/journey/2019-mataam.png';
import img2019truck from '@/assets/journey/2019-truck.png';
import img2019africa from '@/assets/journey/2019-africa.jpg';
import img2019mataamArticle from '@/assets/journey/2019-mataam-article.jpg';
import img2020team from '@/assets/journey/2020-team.png';
import img2021friskt from '@/assets/journey/2021-friskt-vagat.png';

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
    expandableTextSv: 'Visionen tog sina första steg i ett hemmakök i Malmö.\nEn grill.\nNågra afrikanska tyger.\nEn högtalare.\nOch en idé som var betydligt större än budgeten.\nVia Facebook började de första beställningarna komma in och planeringen av den allra första Afro-Karibiska Backyard BBQ:n tog fart.\nIngen visste om tio eller hundra personer skulle dyka upp.\nÖver 150 gäster kom.\nGrannar hjälpte.\nFamiljer kom.\nVänner dansade.\nOch människor som aldrig tidigare hade träffats.\nMat.\nMusik.\nDans.\nSköna vibes.\nDen första riktigt soliga dagen på året.\nDet som skulle bli en grillfest blev något mycket större.\nEn känsla.\nEn gemenskap.\nEtt ögonblick som ingen ville skulle ta slut.\nDet var då visionen fick liv.\nFlavor-Boss skulle aldrig bara handla om mat.\nDet skulle handla om upplevelsen.\nOm kulturen.\nOm människorna.\nOch om att skapa minnen som lever kvar långt efter att tallriken är tom.\nBland gästerna fanns även artisten Sabina Ddumba och sitt crew. Ett tidigt tecken på att känslan hade börjat nå längre än den egna gården.\nRedan från början var drömmen större än gården där allting började.\nHur resan skulle se ut visste ingen.\nMen en sak var säker.\nDen var alldeles för stor för att stanna där den började.\nDen första Backyard BBQ:n blev inte slutmålet.\nDen blev beviset.\nAtt en dröm faktiskt kunde bli verklighet.\nOch att Flavor-Boss hade tagit sitt allra första steg',
    expandableTextEn: 'The vision took its first steps in a home kitchen in Malmö.\nA grill.\nA few African fabrics.\nA speaker.\nAnd an idea that was considerably bigger than the budget.\nThrough Facebook the first orders started coming in, and the planning of the very first Afro-Caribbean Backyard BBQ took off.\nNo one knew if ten or a hundred people would show up.\nOver 150 guests came.\nNeighbors helped.\nFamilies came.\nFriends danced.\nAnd people who had never met before.\nFood.\nMusic.\nDance.\nGood vibes.\nThe first truly sunny day of the year.\nWhat was supposed to be a BBQ party became something much bigger.\nA feeling.\nA community.\nA moment no one wanted to end.\nThat’s when the vision came to life.\nFlavor-Boss would never just be about food.\nIt would be about the experience.\nAbout the culture.\nAbout the people.\nAnd about creating memories that live on long after the plate is empty.\nAmong the guests was also the artist Sabina Ddumba and her crew. An early sign that the feeling had begun to reach further than the backyard itself.\nFrom the very beginning, the dream was bigger than the yard where it all started.\nNo one knew what the journey would look like.\nBut one thing was certain.\nIt was far too big to stay where it began.\nThe first Backyard BBQ wasn’t the destination.\nIt was the proof.\nThat a dream could actually become reality.\nAnd that Flavor-Boss had taken its very first step',
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
    extraTextSv: 'Flavor-Boss hade hittat sin publik.\nDe första följarna började hitta fram.\nPatricias Backyard BBQ:s på Värnhem blev större.\nKöerna blev längre.\nHemmaköket blev mindre.\nDet blev tydligt att drömmen hade vuxit ur platsen där allting började.',
    extraTextEn: 'Flavor-Boss had found its audience.\nThe first followers began to find their way.\nPatricia’s Backyard BBQs at Värnhem grew bigger.\nThe queues got longer.\nThe home kitchen got smaller.\nIt became clear that the dream had outgrown the place where it all began.',
    expandableTextSv: 'Människor kom tillbaka.\nRyktet spreds genom känslan.\nMaten. Musiken. Gemenskapen.\nDe första festivalerna.\nDe första stegen utanför Malmö.\nFlavor-Boss var fortfarande litet.\nMen visionen hade redan vuxit ur hemmaköket.\nNu var det dags att ge drömmen mer utrymme.',
    expandableTextEn: 'People came back.\nThe word spread through the feeling.\nThe food. The music. The community.\nThe first festivals.\nThe first steps outside Malmö.\nFlavor-Boss was still small.\nBut the vision had already outgrown the home kitchen.\nNow it was time to give the dream more room.',
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
    titleSv: 'RIKTNINGEN SÄTTS',
    titleEn: 'THE DIRECTION IS SET',
    gradient: 'linear-gradient(135deg,#1e1b4b 0%,#0e7490 40%,#f97316 90%)',
    accentColor: '#fde047',
    pattern: 'hut',
    layout: 'imageLeft',
    images: [img2018distortion],
    extraTextSv: 'Under 2018 fortsatte Flavor Boss att växa – organiskt och på riktigt.\n\nGårdsfesterna blev fler och köerna blev längre och längre.\n\nAfrokaribiska Backyard BBQ festerna på Klaffbron fortsatte att växa, människor kom tillbaka, tog med sig andra och började sprida känslan vidare.',
    extraTextEn: 'During 2018 Flavor Boss kept growing — organically and for real.\n\nThe backyard parties grew in number and the queues kept getting longer.\n\nThe Afro-Caribbean Backyard BBQ events at Klaffbron kept growing, people came back, brought others with them and started spreading the feeling further.',
    expandableTextSv: 'Från Klaffbron byggdes verksamheten vidare genom festivaler, grillar och nya sammanhang – från [Distortion i Köpenhamn](https://www.instagram.com/p/BjeviMYFQE-/) till att erbjuda grillupplevelser på Hamnfestivalen i Limhamn och flera nya scener.\n\nFlavor Boss började ta plats utanför den egna gården.\n\nSamtidigt växte en tydlig vision fram.\n\nEfter en målmedveten satsning tog Patricia sitt körkort och började arbeta mot målet att skapa en egen foodtruck.\n[[IMAGE]]\nGenom internationella möten och resor – från matlagning med en internationell Tv-kock som uppmärksammades utomlands till en första [USA resa](https://www.instagram.com/p/BocahUqny0o/?img_index=5) där nya smaker utforskades – utvecklades både hantverket och identiteten.\n\nDet blev klart att det här var än där det började.\n\nAtt det behövde röra sig, nå fler människor och ta nya ytor.\n\nDet var här riktningen sattes.\n\nOch grunden för nästa steg började byggas.',
    expandableTextEn: 'From Klaffbron the business was built further through festivals, grills and new contexts – from [Distortion in Copenhagen](https://www.instagram.com/p/BjeviMYFQE-/) to offering grill experiences at Hamnfestivalen in Limhamn and several new stages.\n\nFlavor Boss began to take space outside its own backyard.\n\nAt the same time a clear vision emerged.\n\nAfter a deliberate effort, Patricia got her driver’s license and started working toward the goal of building her own food truck.\n[[IMAGE]]\nThrough international meetings and travels – from cooking with an international TV chef that was noticed abroad to a first [USA trip](https://www.instagram.com/p/BocahUqny0o/?img_index=5) where new flavors were explored – both the craft and the identity grew.\n\nIt became clear that this was where it began.\n\nThat it needed to move, reach more people, take new spaces.\n\nThis is where the direction was set.\n\nAnd the foundation for the next step began to be built.',
    inlineNext: true,
    expandableImage: img2018korkort,
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
    layout: 'imageLeft',
    images: [img2019mataamArticle],
    extraTextSv: '2019 blev ett avgörande år både personligt och professionellt.',
    extraTextEn: '2019 became a pivotal year — both personally and professionally.',
    expandableTextSv: 'Det var första gången [Patricia reste till Afrika](https://www.instagram.com/p/Btf7dvwFOem/).\nEn resa som förändrade allt.\n\nDär mötte hon kulturen, gemenskapen och värmen på riktigt.\nEn upplevelse hon länge saknat – att få känna sina egna rötter fullt ut.\n\nUppvuxen i en stad där många kulturer möts, men där hennes egna varit underrepresenterade, fick hon för första gången uppleva det hon burit inom sig.\n\nDet var inte bara en resa – det var ett återknytande.\n\nDet var här allt föll på plats.\nKänslan. Identiteten. Riktningen.\n\nSamma år tog allt fart på riktigt.\n\nFrån ett DM till en plats i [TV-programmet Mataam](https://filmguide.nu/2019/04/12/nya-matlagningsserien-mataam-till-viafree/) tog Patricia sig hela vägen till final som topp 4 – och satte Flavor Boss på kartan.\n[[IMAGE]]\nDet var här nästa nivå började.\nInte bara i köket – utan i hela tänket.\n\nKonceptet förfinades.\nVarumärket växte.\nSjälvförtroendet tog plats.\n\nDet människor redan hade börjat känna på gårdarna började nu synas för fler.\n\nSamtidigt växte trycket hemma i Malmö.\nBackyard BBQ-festerna hade nått sin gräns – köerna fyllde gatorna och det blev tydligt:\ndet här var för stort för att stanna kvar där det började.\n\nMöjligheterna började öppna sig.\nScenerna blev större.\nSamarbetena fler.\n\nOch mitt i allt tog en ny vision form –\natt ta Flavor Boss vidare ut i rörelse.\n\nInte bara som en plats.\nUtan som en upplevelse som kan nå människor överallt.\n\nDet var här nästa kapitel började byggas.\n[[IMAGE]]\nGrunden till den första foodtrucken var lagd.',
    expandableTextEn: 'It was the first time [Patricia traveled to Africa](https://www.instagram.com/p/Btf7dvwFOem/).\nA journey that changed everything.\n\nThere she truly met the culture, the community and the warmth.\nAn experience she had long been missing – to feel her own roots fully.\n\nGrowing up in a city where many cultures meet, but where her own had been underrepresented, she got to experience for the first time what she had carried inside her.\n\nIt wasn’t just a trip – it was a reconnection.\n\nThis is where everything fell into place.\nThe feeling. The identity. The direction.\n\nThat same year, everything truly took off.\n\nFrom a DM to a spot on the [TV show Mataam](https://filmguide.nu/2019/04/12/nya-matlagningsserien-mataam-till-viafree/), Patricia made it all the way to the final as top 4 – and put Flavor Boss on the map.\n[[IMAGE]]\nThis is where the next level began.\nNot only in the kitchen – but in the whole mindset.\n\nThe concept was refined.\nThe brand grew.\nConfidence took its place.\n\nWhat people had already begun to feel in the backyards now started to be seen by many more.\n\nMeanwhile the pressure grew at home in Malmö.\nThe Backyard BBQ parties had reached their limit – the queues filled the streets and it became clear:\nthis was too big to stay where it had started.\n\nOpportunities started to open up.\nThe stages got bigger.\nThe collaborations more.\n\nAnd in the middle of it all, a new vision took shape –\nto take Flavor Boss out into movement.\n\nNot only as a place.\nBut as an experience that can reach people everywhere.\n\nThis is where the next chapter began to be built.\n[[IMAGE]]\nThe foundation for the first food truck was laid.',
    inlineNext: true,
    expandableImages: [img2019africa, img2019truck],
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
    titleSv: 'VÄRLDEN STANNAR',
    titleEn: 'THE WORLD STOPS',
    gradient: 'linear-gradient(135deg,#1e1b4b 0%,#581c87 45%,#be185d 100%)',
    accentColor: '#f9a8d4',
    pattern: 'mask',
    layout: 'imageLeft',
    images: [img2020team],
    extraTextSv: 'En pandemi. Inställda bokningar. Inget inkommande.\n\nSedan dess har Patricia byggt verksamheten steg för steg från matlådor och gårdsfester till festivaler, TV, foodtruck, catering, stora event och nationella tävlingar. Hon har blivit finalist i Halebop Mataam, vunnit Rapidus "Årets Friskt Vågat", blivit svensk och nordisk mästare i streetfood och utsetts till en av Sveriges mest uppmärksammade unga entreprenörer.\n\nOch när rocklubben Plan B slår igen sina dörrar öppnar Patricia dem igen — som afro-karibisk restaurang.\n\nAlla sa att det var fel tid.\n\nDet visade sig vara rätt.',
    extraTextEn: 'A pandemic. Cancelled bookings. Nothing coming in.\n\nSince then, Patricia has built the business step by step — from food boxes and backyard parties to festivals, TV, food truck, catering, major events and national competitions. She has been a Halebop Mataam finalist, won Rapidus "Boldest Bet of the Year", been crowned Swedish and Nordic Street Food Champion, and named one of Sweden\'s most acclaimed young entrepreneurs.\n\nAnd when the rock club Plan B closes its doors, Patricia opens them again — as an Afro-Caribbean restaurant.\n\nEveryone said it was the wrong time.\n\nIt turned out to be the right one.',
    expandableTextSv: 'Flavor Boss är idag mer än mat.\nDet är energi. Kultur. Motståndskraft. Glädje.\nEn upplevelse där människor samlas, köar, dansar, äter och blir en del av något större.',
    expandableTextEn: 'Flavor Boss is today more than food.\nIt is energy. Culture. Resilience. Joy.\nAn experience where people gather, queue, dance, eat and become part of something bigger.',
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
    titleSv: 'ÅRETS FRISKT VÅGAT',
    titleEn: 'BOLDEST BET',
    gradient: 'linear-gradient(135deg,#0c4a6e 0%,#0e7490 40%,#fb923c 100%)',
    accentColor: '#fde047',
    pattern: 'sun',
    layout: 'imageRight',
    images: [img2021friskt],
    extraTextSv: 'Den 13 april 2021 ringer det igen.\n\nDen här gången är det ett pris.\n\nRapidus utser henne till "Årets Friskt Vågat" — för modet att satsa när ingen annan vågade.\n\nSom om det fanns något annat alternativ för Patricia.\n\nHon sitter även i juryn för Malmö Gastronomy Awards.\n\nInte längre en utmanare. Nu en auktoritet.',
    extraTextEn: 'On April 13, 2021, the phone rings again.\n\nThis time it’s an award.\n\nRapidus names her "Boldest Bet of the Year" — for daring when no one else did.\n\nAs if there was ever another option for Patricia.\n\nShe also joins the jury of the Malmö Gastronomy Awards.\n\nNo longer a challenger. Now an authority.',
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
    titleSv: 'SVERIGES BÄSTA',
    titleEn: 'SWEDEN’S BEST',
    gradient: 'linear-gradient(135deg,#422006 0%,#b45309 40%,#fde047 100%)',
    accentColor: '#fef08a',
    pattern: 'burst',
    layout: 'centered',
    extraTextSv: 'Patricia packar Flavor Boss och åker till Tyskland.\n\nHon ställer sig mot Europas bästa foodtrucks — och vinner.\n\nEuropean Street Food Awards. Sveriges representant. Europas vinnare.\n\nOch när hon kommer hem? Sverigemästare i Streetfood 2022.\n\nTvå titlar. Ett år. Sex år efter att hon sålde sin första matlåda ur sitt eget kök.',
    extraTextEn: 'Patricia packs Flavor Boss and heads to Germany.\n\nShe lines up against Europe’s best food trucks — and wins.\n\nEuropean Street Food Awards. Sweden’s representative. Europe’s winner.\n\nAnd when she comes home? Swedish Street Food Champion 2022.\n\nTwo titles. One year. Six years after selling her first food box out of her own kitchen.',
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
    titleSv: 'FASADEN SOM VÄGRADE TYSTAS',
    titleEn: 'THE WALL THAT REFUSED TO BE SILENCED',
    gradient: 'linear-gradient(135deg,#831843 0%,#be123c 40%,#f59e0b 100%)',
    accentColor: '#fde047',
    pattern: 'dancer',
    layout: 'centered',
    extraTextSv: 'Patricia öppnar äntligen sin egna lokal i Arlöv.\n\nEn färgstark fasadmålning — full av liv, precis som hon.\n\nKommunen nekar bygglov. Vill ta bort den.\n\nEn namninsamling startar. Malmö reagerar.\n\nMitt i den striden vinner Patricia Årets Unga Företagare i Burlöv, försvarar sin nationella streetfood-titel, koras till Nordiska Mästare och tar hem Barnens Favorit.\n\nTre titlar. En strid. Noll steg bakåt.',
    extraTextEn: 'Patricia finally opens her own venue in Arlöv.\n\nA bold facade mural — full of life, just like her.\n\nThe municipality denies the permit. Wants it removed.\n\nA petition starts. Malmö reacts.\n\nIn the middle of that fight, Patricia wins Young Entrepreneur of the Year in Burlöv, defends her national street food title, is crowned Nordic Champion, and takes home Kids’ Favourite.\n\nThree titles. One fight. Zero steps back.',
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
    titleSv: 'HUGO BOSS VS FLAVOR BOSS',
    titleEn: 'HUGO BOSS VS FLAVOR BOSS',
    gradient: 'linear-gradient(135deg,#020617 0%,#1e293b 40%,#dc2626 100%)',
    accentColor: '#f87171',
    pattern: 'zigzag',
    layout: 'centered',
    extraTextSv: 'Hugo Boss skickar ett brev.\n\nByt namn — annars stämmer vi.\n\nSverige reagerar. Media exploderar.\n\nPatricia backar inte en millimeter.\n\nSamma år tar hon sig till den nationella finalen av Årets Unga Idé i Göteborg. Topp 10 unga entreprenörer i hela Sverige. Och på tävlingsplanen — tredje titeln i rad som Sverigemästare i Streetfood.\n\nHugo Boss fick inget namnbyte.\n\nPatricia fick ett nytt mästerskap.',
    extraTextEn: 'Hugo Boss sends a letter.\n\nChange the name — or we sue.\n\nSweden reacts. Media explodes.\n\nPatricia doesn’t back down a millimetre.\n\nThe same year, she reaches the national final of Young Idea of the Year in Gothenburg. Top 10 young entrepreneurs in all of Sweden. And on the competition floor — her third Swedish Street Food championship in a row.\n\nHugo Boss got no name change.\n\nPatricia got a new championship.',
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
    titleSv: 'OSTOPPBAR',
    titleEn: 'UNSTOPPABLE',
    gradient: 'linear-gradient(135deg,#451a03 0%,#b45309 40%,#fde047 100%)',
    accentColor: '#fef08a',
    pattern: 'sun',
    layout: 'centered',
    extraTextSv: 'Fyra nationella mästerskap i rad.\n\nMalmö. Stockholm. Göteborg.\n\nSverigemästare i Streetfood 2025 — och Sweetfood-kategorin med på köpet.\n\nDet är inte en streak längre.\n\nDet är ett arv.',
    extraTextEn: 'Four national championships in a row.\n\nMalmö. Stockholm. Gothenburg.\n\nSwedish Street Food Champion 2025 — and the Sweetfood category on top.\n\nIt’s not a streak anymore.\n\nIt’s a legacy.',
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
    titleSv: 'NÄSTA KAPITEL',
    titleEn: 'THE NEXT CHAPTER',
    gradient: 'linear-gradient(135deg,#1e1b4b 0%,#7c3aed 40%,#f472b6 80%,#fbbf24 100%)',
    accentColor: '#fde047',
    pattern: 'waves',
    layout: 'centered',
    extraTextSv: 'Flavor Boss World. Retail. Mötesplats. Något som ingen riktigt sett förut.\n\nDet som en gång var ett sätt att överleva en svår dag håller på att bli en hel värld.\n\nFölj med på resan — och låt oss skapa nästa kapitel tillsammans.',
    extraTextEn: 'Flavor Boss World. Retail. A meeting place. Something no one has quite seen before.\n\nWhat once was a way to survive a hard day is becoming an entire world.\n\nCome along on the journey — and let’s write the next chapter together.',
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
        />
      </AnimatePresence>
    </div>
  );
};

export default TimelineJourney;
