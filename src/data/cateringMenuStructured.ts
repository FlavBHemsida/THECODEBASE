// Structured catering menu content for the Meny → Catering page.
// IDs map 1:1 to item_name in cateringItems.json so cost/MOQ logic keeps working.

export type LocalString = { sv: string; en: string };

export type CardData = {
  id: string;
  tag: LocalString;
  name: LocalString;
  tagline: LocalString;
  tagline2?: LocalString;
  awardTag?: LocalString;
  hero?: LocalString[];          // featured proteins / stars
  heroLabel?: LocalString;       // override for the "I fokus" label
  heroSeparatorLabel?: LocalString; // small label rendered between hero items
  servedWith?: LocalString[];    // pills
  servedWithLabel?: LocalString; // override for the "Serveras med" label
  extraSection?: { label: LocalString; items: LocalString[] };
  contents?: LocalString[];      // dot list
  twoColumn?: {
    included: LocalString[];
    addons: LocalString[];
  };
  rightFor?: LocalString;
  smallNote?: LocalString;
  infoNote?: LocalString;
  allergens?: LocalString;
  accentTier?: 1 | 2 | 3;        // 1 = lightest, 3 = darkest
  maxQty?: number;
};

export type SectionData = {
  id: string;
  title: LocalString;
  subtitle: LocalString;
  cards: CardData[];
};

const allergenList = (svItems: string[], enItems: string[]): LocalString => ({
  sv: `Innehåller:\n${svItems.join('\n')}`,
  en: `Contains:\n${enItems.join('\n')}`,
});

export const cateringSections: SectionData[] = [
  // ─────────────────────── 1. THE BOXES ───────────────────────
  {
    id: 'boxes',
    title: { sv: 'Catering Buffe', en: 'Catering Buffet' },
    subtitle: {
      sv: '',
      en: '',
    },
    cards: [
      {
        id: 'snack_box',
        tag: { sv: 'Lättare måltid', en: 'Light meal' },
        name: { sv: 'Snack-Box', en: 'Snack-Box' },
        tagline: {
          sv: 'Grillad kaneldoftande Jamaican Fusioned Jerk Chicken och Jerk Cauliflower blomkål vegansk/vegetarisk. Serveras med Samosa västafrikansk frasig pirog med vegetarisk/köttfyllning, Boss Garlic Sauce, Flavorheat homemade hotsauce Våra prisbelönta kongolesiska beroendeframkallande söta donuts "Mikaté"',
          en: 'Grilled cinnamon-scented Jamaican Fusioned Jerk Chicken and Jerk Cauliflower (vegan/vegetarian). Served with Samosa — crispy West African pastry with vegetarian/meat filling, Boss Garlic Sauce, Flavorheat homemade hot sauce, and our award-winning Congolese addictive sweet donuts "Mikaté".',
        },
        hero: [
          { sv: 'Grillad Jamaican Fusion Jerk Chicken', en: 'Grilled cinnamon-scented Jamaican Fusion Jerk Chicken' },
          { sv: 'Jerk Cauliflower (Vegan)', en: 'Jerk Cauliflower (Vegan)' },
          { sv: 'Krispiga Västafrikanska Piroger Samosa', en: 'Crispy West African Samosas' },
        ],
        servedWithLabel: { sv: 'I boxen ingår', en: 'In the box' },
        servedWith: [
          { sv: 'Våra Sweetfood Champion-vinnande kongolesiska donuts Mikaté (2st)', en: 'Våra Sweetfood Champion-vinnande kongolesiska donuts Mikaté (2st)' },
          { sv: 'Boss Garlic Sauce', en: 'Boss Garlic Sauce' },
          { sv: 'Flavor-Heat Dancing Hot Sauce', en: 'Flavor-Heat Dancing Hot Sauce' },
        ],
        extraSection: {
          label: { sv: 'Rekommenderat tillägg', en: 'Recommended add-on' },
          items: [
            { sv: 'Grillad majs i vitlöksolja', en: 'Grilled corn in garlic oil' },
          ],
        },
        allergens: allergenList(
          ['Gluten (Mikaté, samosa)', 'Ägg (Boss Garlic Sauce)', 'Laktos (Boss Garlic Sauce, samosa)', 'Soja och baljväxter (jerkmarinad)'],
          ['Gluten (Mikaté, samosa)', 'Egg (Boss Garlic Sauce)', 'Lactose (Boss Garlic Sauce, samosa)', 'Soy and legumes (jerk marinade)'],
        ),
      },
      {
        id: 'snack_box_with_corn',
        tag: { sv: 'Lättare måltid', en: 'Light meal' },
        name: { sv: 'Snack-Box med Grillad Majs', en: 'Snack-Box with Grilled Corn' },
        tagline: {
          sv: 'Grillad kaneldoftande Jamaican Fusioned Jerk Chicken och Jerk Cauliflower blomkål vegansk/vegetarisk. Serveras med Samosa västafrikansk frasig pirog med vegetarisk/köttfyllning, Boss Garlic Sauce Grillad majs i vitlöksolja, Flavorheat homemade hotsauce Våra prisbelönta kongolesiska beroendeframkallande söta donuts "Mikaté"',
          en: 'Grilled cinnamon-scented Jamaican Fusioned Jerk Chicken and Jerk Cauliflower (vegan/vegetarian). Served with Samosa — crispy West African pastry with vegetarian/meat filling, Boss Garlic Sauce, grilled corn in garlic oil, Flavorheat homemade hot sauce, and our award-winning Congolese addictive sweet donuts "Mikaté".',
        },
        heroLabel: { sv: 'Snack Box', en: 'Snack Box' },
        servedWithLabel: { sv: 'I boken ingår', en: 'In the box' },
        hero: [
          { sv: 'Grillad Jamaican Fusion Jerk Chicken', en: 'Grilled Jamaican Fusion Jerk Chicken' },
          { sv: 'Jerk Cauliflower (Vegan)', en: 'Jerk Cauliflower (Vegan)' },
          { sv: 'Krispiga Västafrikanska Piroger Samosa', en: 'Crispy West African Samosas' },
        ],
        servedWith: [
          { sv: 'Grillad Majs i vitlöksolja', en: 'Grilled Corn in garlic oil' },
          { sv: 'Våra Sweetfood Champion-vinnande kongolesiska donuts Mikaté (2st)', en: 'Våra Sweetfood Champion-vinnande kongolesiska donuts Mikaté (2st)' },
          { sv: 'Boss Garlic Sauce', en: 'Boss Garlic Sauce' },
          { sv: 'Flavor-Heat Dancing Hot Sauce', en: 'Flavor-Heat Dancing Hot Sauce' },
        ],
        allergens: allergenList(
          ['Gluten (Mikaté, Samosa)', 'Ägg (Boss Garlic Sauce)', 'Laktos (Boss Garlic Sauce, Samosa)', 'Soja och baljväxter (jerkmarinad)'],
          ['Gluten (Mikaté, Samosa)', 'Egg (Boss Garlic Sauce)', 'Lactose (Boss Garlic Sauce, Samosa)', 'Soy and legumes (jerk marinade)'],
        ),
      },
      {
        id: 'jerk_box',
        tag: { sv: 'Mellanmåltid', en: 'Medium meal' },
        name: { sv: 'Jerk-Box', en: 'Jerk-Box' },
        tagline: {
          sv: 'Njut av en varm och riklig buffe med en fusion av smaker från Västafrika, Centralafrika & Karibien.',
          en: 'Enjoy a warm and generous buffet with a fusion of flavors from West Africa, Central Africa & the Caribbean.',
        },
        heroLabel: { sv: 'Välj mellan', en: 'Choose between' },
        heroSeparatorLabel: { sv: 'Eller', en: 'Or' },
        hero: [
          { sv: 'Grillad Jamaican Fusion Jerk Chicken', en: 'Grilled Jamaican Fusion Jerk Chicken' },
          { sv: 'Jerk Cauliflower (Vegan)', en: 'Jerk Cauliflower (Vegan)' },
        ],
        servedWith: [
          { sv: 'Jollof Rice', en: 'Jollof rice' },
          { sv: 'Coleslaw', en: 'Coleslaw' },
          { sv: 'Mikaté, våra Sweetfood Champion-vinnande kongolesiska donuts (2st)', en: 'Mikaté, our Sweetfood Champion-winning Congolese donuts (2st)' },
          { sv: 'Boss Garlic Sauce', en: 'Boss Garlic Sauce' },
          { sv: 'Flavor-Heat Dancing Hot Sauce', en: 'Flavor-Heat Dancing Hot Sauce' },
        ],
        allergens: allergenList(
          ['Gluten (Mikaté)', 'Ägg och laktos (Boss Garlic Sauce)', 'Soja och baljväxter (jerkmarinad)'],
          ['Gluten (Mikaté)', 'Egg and lactose (Boss Garlic Sauce)', 'Soy and legumes (jerk marinade)'],
        ),
      },
      {
        id: 'flavorbox',
        tag: { sv: 'Hel måltid', en: 'Full meal' },
        name: { sv: 'Flavor-Box', en: 'Flavor-Box' },
        tagline: {
          sv: 'Vår signaturbox – Fyrfaldig vinnare av Streetfood-SM. Finns även som vegetarisk och vegansk variant.',
          en: 'Our signature box – Four-time winner of the Swedish Streetfood Championship. Also available as vegetarian and vegan.',
        },
        tagline2: {
          sv: 'Grillad Jamaican Fusion Jerk Chicken, Jerk Cauliflower (Vegan), Krispig västafrikansk pirog Samosa (1 st) med valfri fyllning (veg eller nötkött).',
          en: 'Grilled Jamaican Fusion Jerk Chicken, Jerk Cauliflower (Vegan), Crispy West African Samosa (1 pc) with your choice of filling (veg or beef).',
        },
        hero: [
          { sv: 'Grillad Jamaican Fusion Jerk Chicken', en: 'Grilled Jamaican Fusion Jerk Chicken' },
          { sv: 'Jerk Cauliflower (Vegan)', en: 'Jerk Cauliflower (Vegan)' },
          { sv: 'Krispig Västafrikansk Pirog Samosa (1st)', en: 'Crispy West African Samosa (1pc)' },
        ],
        servedWith: [
          { sv: 'Jollof Rice', en: 'Jollof rice' },
          { sv: 'Coleslaw', en: 'Coleslaw' },
          { sv: 'Mikaté, våra Sweetfood Champion-vinnande kongolesiska donuts (2st)', en: 'Mikaté, our Sweetfood Champion-winning Congolese donuts (2st)' },
          { sv: 'Grillad majs i vitlöksolja', en: 'Grilled corn in garlic oil' },
          { sv: 'Boss Garlic Sauce', en: 'Boss Garlic Sauce' },
          { sv: 'Flavor-Heat Dancing Hot Sauce', en: 'Flavor-Heat Dancing Hot Sauce' },
        ],
        allergens: allergenList(
          ['Gluten (Mikaté, samosas)', 'Laktos (Boss Garlic Sauce, coleslaw, samosas)', 'Ägg (Boss Garlic Sauce, coleslaw)', 'Soja och baljväxter (jerkmarinad)'],
          ['Gluten (Mikaté, samosas)', 'Lactose (Boss Garlic Sauce, coleslaw, samosas)', 'Egg (Boss Garlic Sauce, coleslaw)', 'Soy and legumes (jerk marinade)'],
        ),
      },
    ],
  },

  // ─────────────────────── 2. SNACKS & DESSERT ───────────────────────
  {
    id: 'snacks',
    title: { sv: 'Snacks & Dessert', en: 'Snacks & Dessert' },
    subtitle: {
      sv: '',
      en: '',
    },
    cards: [
      {
        id: 'sweet_flavors_mikate',
        tag: { sv: 'Dessert', en: 'Dessert' },
        name: { sv: 'Sweet Flavors Mikaté', en: 'Sweet Flavors Mikaté' },
        awardTag: { sv: 'Vinnande SM-Dessert 2025', en: 'SM Dessert Winner 2025' },
        tagline: {
          sv: 'Prisbelönta söta kongolesiska Donuts "Mikaté" (6pcs) serveras med valfri topping.',
          en: 'Award-winning sweet Congolese donuts "Mikaté" (6pcs) served with your choice of topping.',
        },
        heroLabel: { sv: 'Välj topping', en: 'Choose topping' },
        heroSeparatorLabel: { sv: 'Eller', en: 'Or' },
        hero: [
          { sv: 'Oreo Crunch med choklad- & vit chokladsås', en: 'Oreo Crunch with chocolate & white chocolate sauce' },
          { sv: 'Salted karamellsås med Lotus Crush', en: 'Salted caramel sauce with Lotus Crush' },
        ],
        smallNote: { sv: 'Antal = antal boxar (6 st per box)', en: 'Quantity = number of boxes (6 pcs each)' },
        allergens: allergenList(
          ['Gluten (Mikaté)', 'Kan innehålla laktos & nötter (toppings)'],
          ['Gluten (Mikaté)', 'May contain lactose & nuts (toppings)'],
        ),
      },
    ],
  },

  // ─────────────────────── 2b. SNACK ERBJUDANDEN ───────────────────────
  {
    id: 'snack_erbjudanden',
    title: { sv: 'Snack Erbjudanden', en: 'Snack Offers' },
    subtitle: {
      sv: 'Plocksnacks och pack — perfekt för fika, kontor och förbeställning.',
      en: 'Pick-up snacks and packs — perfect for fika, the office, and pre-orders.',
    },
    cards: [
      {
        id: 'samosa_mikate_snack',
        tag: { sv: 'Snack', en: 'Snack' },
        name: { sv: 'Samosa & Mikaté Snack-Upplevelse', en: 'Samosa & Mikaté Snack Experience' },
        tagline: {
          sv: 'Västafrikanska frasiga piroger fyllda med kryddig vego- eller nötköttsfyllning — serveras med vår Boss Garlic Sauce och Flavor-Heat Dancing Hot Sauce. Avsluta med våra beroendeframkallande kongolesiska donuts Mikaté.',
          en: 'West African crispy pastries filled with spicy veggie or beef filling — served with our Boss garlic sauce and Flavor-Heat Dancing Hot Sauce. Finish with our addictive Congolese donuts Mikaté.',
        },
        contents: [
          { sv: 'Krispiga Västafrikanska Piroger Samosa per person (vegetarisk eller nötkött) (2st)', en: 'Crispy West African Samosas per person (vegetarian or beef filling) (2pcs)' },
          { sv: 'Våra Sweetfood Champion-vinnande kongolesiska donuts Mikaté (2st) per person', en: 'Our Sweetfood Champion-winning Congolese donuts Mikaté (2st) per person' },
          { sv: 'Boss Garlic Sauce', en: 'Boss Garlic Sauce' },
          { sv: 'Flavor-Heat Dancing Hot Sauce', en: 'Flavor-Heat Dancing Hot Sauce' },
        ],
        smallNote: { sv: 'Pris och beställning per person', en: 'Priced and ordered per person' },
        allergens: allergenList(
          ['Gluten: Mikaté & Samosa', 'Laktos: Boss Garlic Sauce & Samosa', 'Ägg: Boss Garlic Sauce'],
          ['Gluten: Mikaté & Samosa', 'Lactose: Boss Garlic Sauce & Samosa', 'Egg: Boss Garlic Sauce'],
        ),
      },
      {
        id: 'samosa_pack',
        tag: { sv: 'Tillägg', en: 'Add-on' },
        name: { sv: 'Samosa Snack Pack', en: 'Samosa Snack Pack' },
        tagline: {
          sv: 'Vill du njuta av våra prisbelönta smaker när det passar dig? Förbeställ & hämta ditt Snack Pack enligt överenskommelse. Fritera eller värm upp hemma när helgen kommer.',
          en: 'Want to enjoy our award-winning flavors whenever it suits you? Pre-order & pick up your Snack Pack by arrangement. Fry or heat at home when the weekend rolls in.',
        },
        contents: [
          { sv: '10 Krispiga Västafrikanska Piroger Samosa per box', en: '10 Crispy West African Samosas per box' },
          { sv: 'Val av fyllning: kryddig vegetarisk eller nötkött', en: 'Choice of filling: spicy vegetarian or beef' },
        ],
        smallNote: { sv: 'Antal = antal boxar (10 st per box)', en: 'Quantity = number of boxes (10 pcs each)' },
        allergens: allergenList(
          ['Laktos (samosa)', 'Gluten (samosa)'],
          ['Lactose (samosa)', 'Gluten (samosa)'],
        ),
      },
      {
        id: 'mikate_pack',
        tag: { sv: 'Tillägg', en: 'Add-on' },
        name: { sv: 'Mikaté Snack Pack', en: 'Mikaté Snack Pack' },
        tagline: {
          sv: 'Festen som aldrig tar slut med våra kongolesiska beroendeframkallande söta donuts som har tagit vinsten i SM Sweetfood Competition.',
          en: 'The party that never ends with our addictive Congolese donuts — winners of the SM Sweetfood Competition.',
        },
        contents: [{ sv: '40 Mikaté, Vår Sweetfood Champion Vinnande Kongolesiska Donuts per box', en: '40 Mikaté, our Sweetfood Champion Winning Congolese Donuts per box' }],
        smallNote: { sv: 'Antal = antal boxar (40 st per box)', en: 'Quantity = number of boxes (40 pcs each)' },
      },
    ],
  },

  // ─────────────────────── 4. CATERING PACKAGES ───────────────────────
  {
    id: 'packages',
    title: { sv: 'Cateringpaket', en: 'Catering Packages' },
    subtitle: {
      sv: 'Allt samlat. För event som vill ha det skött från start till mål.',
      en: "Everything bundled. For events that want it handled from start to finish.",
    },
    cards: [
      {
        id: 'catering_package_light_base',
        tag: { sv: 'Paket', en: 'Package' },
        accentTier: 1,
        maxQty: 1,
        name: { sv: 'Cateringpaket — Light', en: 'Catering Package — Light' },
        tagline: {
          sv: 'En komplett afro-karibisk helhetsupplevelse för upp till 15 gäster. Vi sköter mat, dekoration och uppställning — ni njuter av festen.',
          en: 'A complete Afro-Caribbean experience for up to 15 guests. We handle the food, decoration and setup — you enjoy the party.',
        },
        contents: [
          { sv: 'Flavor-Box per gäst (upp till 15 personer)', en: 'Flavor-Box per guest (up to 15 people)' },
          { sv: 'Light-dekoration (lyktor, dukar, växter)', en: 'Light decoration (lanterns, tablecloths, plants)' },
          { sv: 'Engångstallrikar, bestick, servetter', en: 'Disposable plates, cutlery, napkins' },
          { sv: 'Professionell buffeuppsättning på plats', en: 'Professional buffet setup on site' },
          { sv: 'Leverans inom Malmö / Burlöv', en: 'Delivery within Malmö / Burlöv' },
        ],
        rightFor: {
          sv: 'Passar intima event, lunchträffar och mindre firanden',
          en: 'Right for intimate events, office lunches, and small celebrations',
        },
        smallNote: {
          sv: 'Extra gäster utöver 15 läggs till för 380 kr/person (i förfrågan)',
          en: 'Extra guests beyond 15 can be added at 380 kr per person (handled in enquiry)',
        },
      },
      {
        id: 'catering_package_meduim_base',
        tag: { sv: 'Paket', en: 'Package' },
        accentTier: 2,
        maxQty: 1,
        name: { sv: 'Cateringpaket — Medium', en: 'Catering Package — Medium' },
        tagline: {
          sv: 'Hela vår catering-helhet för upp till 30 gäster. Smaker, dekoration och servering — allt på plats för en minnesvärd kväll.',
          en: 'Our full catering experience for up to 30 guests. Flavors, decoration and service — all in place for a memorable night.',
        },
        contents: [
          { sv: 'Flavor-Box per gäst (upp till 30 personer)', en: 'Flavor-Box per guest (up to 30 people)' },
          { sv: 'Light-dekoration (lyktor, dukar, växter)', en: 'Light decoration (lanterns, tablecloths, plants)' },
          { sv: 'Engångstallrikar, bestick, servetter', en: 'Disposable plates, cutlery, napkins' },
          { sv: 'Professionell buffeuppsättning på plats', en: 'Professional buffet setup on site' },
          { sv: 'Leverans inom Malmö / Burlöv', en: 'Delivery within Malmö / Burlöv' },
        ],
        rightFor: {
          sv: 'Passar företagsevent, födelsedagar och sammankomster på 20–30 pers.',
          en: 'Right for corporate events, birthday parties, and gatherings of 20–30 people',
        },
        smallNote: {
          sv: 'Extra gäster utöver 30 läggs till för 380 kr/person (i förfrågan)',
          en: 'Extra guests beyond 30 can be added at 380 kr per person (handled in enquiry)',
        },
      },
    ],
  },

  // ─────────────────────── 5. EXPERIENCES ───────────────────────
  {
    id: 'experiences',
    title: { sv: 'Upplevelser', en: 'Experiences' },
    subtitle: {
      sv: 'Bortom maten. Live service, närvaro på plats, full produktion.',
      en: 'Beyond the food. Live service, on-site presence, full production.',
    },
    cards: [
      {
        id: 'food_truck_base',
        tag: { sv: 'Upplevelse', en: 'Experience' },
        maxQty: 1,
        name: { sv: 'Food Truck-Upplevelse', en: 'Food Truck Experience' },
        tagline: {
          sv: 'Vi rullar in vår färgsprakande foodtruck till er plats och bjuder på live-servering direkt från luckan. Doft, energi och prisbelönta smaker — på riktigt.',
          en: 'We roll our colorful foodtruck up to your location and serve live straight from the hatch. Aroma, energy and award-winning flavors — for real.',
        },
        twoColumn: {
          included: [
            { sv: '1 timmes aktiv varm matservering', en: '1 hour of active warm food service' },
            { sv: 'Full truck-uppsättning + transport', en: 'Full truck setup + travel' },
            { sv: 'Engångstallrikar, bestick, servetter', en: 'Disposable plates, cutlery, napkins' },
          ],
          addons: [
            { sv: 'Extra serveringstimme — 1 500 kr/st', en: 'Extra service hour — 1 500 kr each' },
            {
              sv: 'Saknas 16–32A el på plats — gasavgift tillkommer (995 kr)',
              en: 'No 16–32A electricity on site — gas fee applies (995 kr)',
            },
          ],
        },
        infoNote: {
          sv: 'Maten beställs separat och prissätts per person. Den här avgiften täcker truck, transport och första timmens service.',
          en: 'Food items are ordered separately and priced per person. This fee covers the truck, travel, and first hour of service only.',
        },
      },
      {
        id: 'flavor_booze_truck_base',
        tag: { sv: 'Upplevelse · Bar', en: 'Experience · Bar' },
        maxQty: 1,
        name: { sv: 'Flavor Booze Truck', en: 'Flavor Booze Truck' },
        tagline: {
          sv: 'Vår festliga bar-truck rullar in med 3 timmars full barservice, streetbites och dessert. En upplevelse där gästerna samlas, skålar och dansar.',
          en: 'Our festive bar truck rolls in with 3 hours of full bar service, street bites and dessert. An experience where guests gather, toast and dance.',
        },
        contents: [
          { sv: '3 timmars barservice', en: '3 hours of bar service' },
          { sv: 'Full bar-uppsättning + personal ingår', en: 'Full bar setup + staff included' },
          { sv: 'Streetbites, dessert och soppa ingår', en: 'Street bites, dessert, and soup included' },
          { sv: 'Alkohol och tillstånd ordnas separat', en: 'Alcohol and permit arranged separately' },
        ],
        infoNote: {
          sv: 'Endast bar/booze-trucken. Inkluderar inte matcatering — kombinera med maträtter separat.',
          en: 'Explicitly for the bar/booze truck. Does not include food catering — pair with food items separately.',
        },
      },
      {
        id: 'grill_experience_base',
        tag: { sv: 'Upplevelse · Live grill', en: 'Experience · Live grill' },
        name: { sv: 'Grill-Upplevelse', en: 'Grill Experience' },
        tagline: {
          sv: 'Vår grillmaster tar plats med kaneldoftande Jamaican Fusioned Jerk direkt från en rykande grill. Smaker, doft och show — perfekt för takfester och trädgårdar.',
          en: 'Our grill master sets up with cinnamon-scented Jamaican Fusioned Jerk straight off a smoking grill. Flavor, aroma and show — perfect for rooftops and gardens.',
        },
        contents: [
          { sv: 'Professionell grillmaster + personal på plats', en: 'Professional grill master + staff on site' },
          { sv: 'Alla tillbehör ingår', en: 'All side dishes included' },
          { sv: 'Leverans ingår', en: 'Delivery included' },
          { sv: '3 timmars service (1–1,5 h aktiv grillning)', en: '3 hours of service (1–1.5 hrs active grilling)' },
        ],
        twoColumn: {
          included: [],
          addons: [
            { sv: 'Förlängd service: 995 kr per extra timme', en: 'Extended service: 995 kr per extra hour' },
            { sv: 'Grillhyra (om grill saknas): + 1 500 kr', en: 'Grill rental (if no grill at venue): + 1 500 kr' },
            { sv: 'Grill-leveransavgift (Malmö/Burlöv): + 299 kr', en: 'Grill delivery fee (Malmö/Burlöv): + 299 kr' },
          ],
        },
        rightFor: {
          sv: 'Passar takfester, trädgårdsevent och utomhussamlingar på sommaren',
          en: 'Right for rooftop parties, garden events, and outdoor summer gatherings',
        },
        smallNote: {
          sv: 'Minst 40 gäster för per-personspris. Grupper på 13–39 personer offereras till en fast event-avgift — nämn detta i förfrågan.',
          en: 'Minimum 40 guests for per-person rate. Groups of 13–39 people are quoted at a flat event fee — mention this in your enquiry.',
        },
      },
    ],
  },

  // ─────────────────────── 6. DECORATION ───────────────────────
  {
    id: 'decoration',
    title: { sv: 'Dekoration', en: 'Decoration' },
    subtitle: {
      sv: 'Från en varm touch till full visuell produktion.',
      en: 'From a warm touch to a full visual production.',
    },
    cards: [
      {
        id: 'decoration_light',
        tag: { sv: 'Dekoration', en: 'Decoration' },
        accentTier: 1,
        maxQty: 1,
        name: { sv: 'Light-Paket', en: 'Light Package' },
        tagline: {
          sv: 'En enkel och färgsprakande dekoration som ger buffen en varm afro-karibisk känsla — lyktor, dukar och gröna växter, uppsatt på plats.',
          en: 'A simple, vibrant decoration that gives the buffet a warm Afro-Caribbean feeling — lanterns, tablecloths and green plants, set up on site.',
        },
        contents: [
          {
            sv: 'En färgglad dekoration som ger buffen en varm, atmosfärisk känsla utan att ta över rummet.',
            en: 'A colorful decoration that gives the buffet a warm, atmospheric feeling without overpowering the space.',
          },
        ],
        rightFor: {
          sv: 'Passar mindre event eller som en ren, elegant bakgrund',
          en: 'Right for smaller events or as a clean, elegant backdrop',
        },
      },
      {
        id: 'decoration_medium',
        tag: { sv: 'Dekoration', en: 'Decoration' },
        accentTier: 2,
        maxQty: 1,
        name: { sv: 'Medium-Paket', en: 'Medium Package' },
        tagline: {
          sv: 'Ta dekorationen till nästa nivå med färgrika fat, palmer, kaktusar, lyktor och dekorationsbollar — arrangerade i olika nivåer som väcker buffen till liv.',
          en: 'Take the decoration to the next level with colorful platters, palms, cacti, lanterns and decorative balls — arranged across multiple levels that bring the buffet to life.',
        },
        contents: [
          {
            sv: 'Arrangerat i olika nivåer som väcker buffen till liv. En riktigt visuell närvaro.',
            en: 'Arranged across different levels to bring the buffet to life. A proper visual presence.',
          },
        ],
        rightFor: {
          sv: 'Passar medelstora event som vill ha en full, minnesvärd buffeupplevelse',
          en: 'Right for mid-size events that want a full, memorable buffet presentation',
        },
        smallNote: { sv: 'Professionell uppsättningshjälp finns', en: 'Professional setup assistance available' },
      },
      {
        id: 'decoration_luxury',
        tag: { sv: 'Dekoration', en: 'Decoration' },
        accentTier: 3,
        maxQty: 1,
        name: { sv: 'Lyx-Paket', en: 'Luxury Package' },
        tagline: {
          sv: 'Hela vårt dekorationsutbud arrangerat över varje plan i lokalen — matzoner, takdekor och custom multi-nivå-produktion. Buffen blir en del av showen.',
          en: 'Our full decoration range arranged across every plane of the venue — dining zones, ceiling decor and custom multi-level production. The buffet becomes part of the show.',
        },
        contents: [
          {
            sv: 'Hela dekorationsutbudet arrangerat över varje visuellt plan i lokalen. Buffen blir en del av showen.',
            en: 'The complete decoration range arranged across every visual plane of the event space. The buffet becomes part of the show.',
          },
        ],
        rightFor: {
          sv: 'Passar profilerade event, brand-aktiveringar och tillfällen där presentation är allt',
          en: 'Right for high-profile events, brand activations, and occasions where presentation is everything',
        },
        smallNote: { sv: 'Professionell uppsättningshjälp finns', en: 'Professional setup assistance available' },
      },
    ],
  },

  // ─────────────────────── 7. ENTERTAINMENT ───────────────────────
  {
    id: 'entertainment',
    title: { sv: 'Underhållning', en: 'Entertainment' },
    subtitle: {
      sv: 'Ljud, ljus och energi. Tre uppställningar för varje storlek av event.',
      en: 'Sound, light, and energy. Three setups for every scale of event.',
    },
    cards: [
      {
        id: 'dj_flavor_light',
        tag: { sv: 'Underhållning', en: 'Entertainment' },
        accentTier: 1,
        maxQty: 1,
        name: { sv: 'DJ Flavor — Light', en: 'DJ Flavor — Light' },
        tagline: {
          sv: 'En stämningsfull start med ljud och ljus som sätter rätt känsla utan att ta över rummet. Perfekt när musiken ska följa med — inte stjäla showen.',
          en: 'An atmospheric start with sound and lighting that sets the right mood without taking over the room. Perfect when music should follow along — not steal the show.',
        },
        rightFor: {
          sv: 'Passar mindre lokaler, intima event och bakgrundsmusik',
          en: 'Right for smaller venues, intimate events, and background music settings',
        },
      },
      {
        id: 'dj_flavor_boost',
        tag: { sv: 'Underhållning', en: 'Entertainment' },
        accentTier: 2,
        maxQty: 1,
        name: { sv: 'DJ Flavor — Boost', en: 'DJ Flavor — Boost' },
        tagline: {
          sv: 'Lyft festen ett snäpp med vår Flavor Boost mobil-setup. Förstärkt ljud, mer energi och full närvaro — gjort för att få gästerna i rörelse.',
          en: 'Lift the party a notch with our Flavor Boost mobile setup. Enhanced sound, more energy and full presence — built to get guests moving.',
        },
        rightFor: {
          sv: 'Passar utomhusevent, större inomhus-lokaler och event där musiken sätter stämningen',
          en: 'Right for outdoor events, larger indoor spaces, and events where music sets the mood',
        },
      },
      {
        id: 'dj_full_on_flavor',
        tag: { sv: 'Underhållning', en: 'Entertainment' },
        accentTier: 3,
        maxQty: 1,
        name: { sv: 'DJ Full-On Flavor', en: 'DJ Full-On Flavor' },
        tagline: {
          sv: 'Den ultimata helhetsupplevelsen — full ljudproduktion, staging och ljus. Förvandla din fest till ett minnesvärt dansgolv där alla blir en del av något större.',
          en: 'The ultimate full experience — full sound production, staging and lighting. Turn your party into a memorable dancefloor where everyone becomes part of something bigger.',
        },
        rightFor: {
          sv: 'Passar event där musiken är centrum — fester, lanseringar, stora firanden',
          en: 'Right for events where music is a centrepiece — parties, launches, large celebrations',
        },
        smallNote: { sv: 'Extra timmar tillgängliga för 995 kr/st', en: 'Additional hours available at 995 kr each' },
      },
    ],
  },

  // ─────────────────────── 8. STAFF & HOSTING ───────────────────────
  {
    id: 'staff',
    title: { sv: 'Personal & Värdinnor', en: 'Staff & Hosting' },
    subtitle: {
      sv: 'Professionell närvaro på plats. Från servering till VIP-värdinna.',
      en: 'Professional on-site presence. From serving staff to a VIP hostess.',
    },
    cards: [
      {
        id: 'serving_staff_per_hour',
        tag: { sv: 'Personal', en: 'Staff' },
        name: { sv: 'Serveringspersonal', en: 'Serving Staff' },
        tagline: {
          sv: 'Vår erfarna serveringspersonal på plats — varma, närvarande och alltid med ett leende. Minst 2 personer för event på 50+ gäster.',
          en: 'Our experienced serving staff on site — warm, present and always smiling. Minimum 2 people for events of 50+ guests.',
        },
      },
      {
        id: 'hostess_standard_2h',
        tag: { sv: 'Personal', en: 'Staff' },
        maxQty: 1,
        name: { sv: 'Värdinna (2 timmar)', en: 'Hostess (2 hours)' },
        tagline: {
          sv: 'En professionell värdinna som tar emot era gäster i 2 timmar — välkomnande, organiserad och full av positiv energi från första hälsningen.',
          en: 'A professional hostess who welcomes your guests for 2 hours — warm, organized and full of positive energy from the first greeting.',
        },
      },
      {
        id: 'hostess_patricia_2h',
        tag: { sv: 'Personal · VIP', en: 'Staff · VIP' },
        maxQty: 1,
        name: { sv: 'VIP-Värdinna — Patricia', en: 'VIP Hostess — Patricia' },
        tagline: {
          sv: 'Patricia Dianda själv på plats i 2 timmar — kraften bakom Flavor Boss tar hand om era gäster med personlig värme och hela varumärkets själ.',
          en: 'Patricia Dianda herself on site for 2 hours — the force behind Flavor Boss takes care of your guests with personal warmth and the full soul of the brand.',
        },
      },
      {
        id: 'maskot_surprise',
        tag: { sv: 'Underhållning · Maskot', en: 'Entertainment · Mascot' },
        maxQty: 1,
        name: { sv: 'Dansande Maskot — Surprise', en: 'Dancing Mascot — Surprise' },
        tagline: {
          sv: 'Vår dansande maskot dyker upp i 1 timme med mat, dans och foton. En glittrande överraskning som får hela rummet att lysa upp.',
          en: 'Our dancing mascot drops in for 1 hour with food, dancing and photos. A sparkling surprise that lights up the whole room.',
        },
        rightFor: {
          sv: 'Passar familjeevent, barnkalas och roliga brand-stunder',
          en: "Right for family events, children's parties, and fun brand moments",
        },
      },
      {
        id: 'maskot_party_starter',
        tag: { sv: 'Underhållning · Maskot', en: 'Entertainment · Mascot' },
        maxQty: 1,
        name: { sv: 'Dansande Maskot — Party Starter', en: 'Dancing Mascot — Party Starter' },
        tagline: {
          sv: 'Vår dansande maskot på plats i 2 timmar med live-servering, dans och underhållning. För er som vill ha hög energi från första gästen till sista låten.',
          en: 'Our dancing mascot on site for 2 hours with live serving, dancing and entertainment. For those who want high energy from the first guest to the last song.',
        },
        rightFor: {
          sv: 'Passar medelstora firanden som vill ha hög energi från start till mål',
          en: 'Right for mid-size celebrations that want high energy from start to finish',
        },
      },
      {
        id: 'maskot_full_exp',
        tag: { sv: 'Underhållning · Maskot', en: 'Entertainment · Mascot' },
        maxQty: 1,
        name: { sv: 'Dansande Maskot — Full Experience', en: 'Dancing Mascot — Full Experience' },
        tagline: {
          sv: 'Vår dansande maskot genom hela eventet i 3 timmar — full underhållning, interaktion och afro-karibisk närvaro som blir kvällens minnesvärda centrum.',
          en: 'Our dancing mascot throughout the entire event for 3 hours — full entertainment, interaction and Afro-Caribbean presence that becomes the memorable heart of the night.',
        },
        rightFor: {
          sv: 'Passar stora event som vill ha ett minnesvärt, engagerande centrum',
          en: 'Right for large events that want a memorable, engaging centrepiece',
        },
      },
    ],
  },

  // ─────────────────────── 9. LOGISTICS ───────────────────────
  {
    id: 'logistics',
    title: { sv: 'Logistik', en: 'Logistics' },
    subtitle: {
      sv: 'Leverans, avhämtning och uppsättning. Välj det som funkar för ert event.',
      en: 'Delivery, pickup, and setup. Choose what works for your event.',
    },
    cards: [
      {
        id: 'pickup_arlov_kitchen',
        tag: { sv: 'Logistik', en: 'Logistics' },
        maxQty: 1,
        name: { sv: 'Avhämtning — Arlöv-köket', en: 'Self-Pickup — Arlöv Kitchen' },
        tagline: {
          sv: 'Hämta er varma mat direkt från vårt kök på Hantverkaregatan 4 i Arlöv — färdig att njutas så fort ni är hemma.',
          en: 'Pick up your warm food straight from our kitchen at Hantverkaregatan 4 in Arlöv — ready to enjoy the moment you get home.',
        },
        contents: [
          { sv: 'Avhämtningsadress: Hantverkaregatan 4, Arlöv', en: 'Pickup address: Hantverkaregatan 4, Arlöv' },
          { sv: 'Maten är varm och klar vid ankomst', en: 'Food is warm and ready on arrival' },
          { sv: 'Ingen leveransavgift', en: 'No delivery fee' },
        ],
      },
      {
        id: 'delivery_local',
        tag: { sv: 'Logistik', en: 'Logistics' },
        maxQty: 1,
        name: { sv: 'Lokal Leverans — Malmö / Burlöv', en: 'Local Delivery — Malmö / Burlöv' },
        tagline: {
          sv: 'Vi levererar varm mat direkt till er plats inom Malmö och Burlöv — bara att duka upp och njuta tillsammans.',
          en: 'We deliver warm food straight to your location in Malmö and Burlöv — just set the table and enjoy together.',
        },
      },
      {
        id: 'buffet_set_up_malmö_burlöv',
        tag: { sv: 'Logistik', en: 'Logistics' },
        maxQty: 1,
        name: { sv: 'Buffeuppsättning', en: 'Buffet Setup' },
        tagline: {
          sv: 'Vi levererar, dukar upp buffen och bjuder på en energifylld presentation av smakupplevelsen — sedan är det bara att njuta.',
          en: 'We deliver, set up the buffet and treat you to an energetic presentation of the flavor experience — then just enjoy.',
        },
        contents: [
          { sv: 'Varm mat levererad till plats', en: 'Warm food delivered to location' },
          { sv: 'Professionell buffeuppställning av Flavor-Boss-personal', en: 'Professional buffet layout by Flavor Boss staff' },
          { sv: 'Full visuell presentation och staging vid ankomst', en: 'Full visual presentation and staging on arrival' },
        ],
      },
      {
        id: 'disposable_set',
        tag: { sv: 'Tillägg', en: 'Add-on' },
        name: { sv: 'Engångsset', en: 'Disposable Set' },
        tagline: {
          sv: 'Miljövänlig tallrik, träbestick och servett — ett komplett set per gäst så ni slipper tänka på disken efteråt.',
          en: 'Eco-friendly plate, wooden cutlery and napkin — a complete set per guest so you don\'t have to worry about dishes afterwards.',
        },
      },
      {
        id: 'setup_medium',
        tag: { sv: 'Tillägg', en: 'Add-on' },
        maxQty: 1,
        name: { sv: 'Professionell uppsättningshjälp', en: 'Setup Assistance' },
        tagline: {
          sv: 'Låt vår personal sköta hela den visuella presentationen och buffens staging på plats — så blir bordet en upplevelse i sig.',
          en: 'Let our staff handle the full visual presentation and buffet staging on site — so the table becomes an experience in itself.',
        },
      },
    ],
  },
];