import { motion } from 'framer-motion';
import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import {
  UtensilsCrossed,
  Cookie,
  Truck,
  Flame,
  Sparkles,
  Wine,
  Music,
  Package,
  MapPin,
  ChevronRight,
  Link2,
  ShoppingBasket,
  ArrowRight,
  Plus,
  Minus,
  X,
} from 'lucide-react';
import { Instagram, Facebook } from 'lucide-react';

// Imagery from across the project — re-used for consistency
import flavorBox from '@/assets/flavor-box.jpg';
import grill1 from '@/assets/grill-1.jpg';
import buffe2 from '@/assets/cateringbuffe-2.png';
import menuSamosaBoxImg from '@/assets/menu-samosa-box.jpg';
import menuSweetFlavorsDeluxeImg from '@/assets/menu-sweet-flavors-deluxe.jpg';
import mikateCloseup from '@/assets/mikate-closeup.jpg';

// Half-set of journey patterns for living background — same recipe as Grill page
import patternPalm from '@/assets/journey/pattern-palm.png';
import patternArrow from '@/assets/journey/pattern-arrow.png';
import patternZigzag from '@/assets/journey/pattern-zigzag.png';
import patternMask from '@/assets/journey/pattern-mask.png';
import patternBurst from '@/assets/journey/pattern-burst.png';
import patternDancer from '@/assets/journey/pattern-dancer.png';
import patternWave1 from '@/assets/journey/pattern-wave1.png';
import patternNote from '@/assets/journey/pattern-note.png';
import patternTribal from '@/assets/journey/pattern-tribal.png';
import patternHut from '@/assets/journey/pattern-hut.png';
import patternSun from '@/assets/journey/pattern-sun.png';
import patternPalm3 from '@/assets/journey/pattern-palm3.png';

// Leaves used by Cateringpaket page
import leaf1 from '@/assets/leaf-1.png';
import leaf2 from '@/assets/leaf-2.png';
import leaf3 from '@/assets/leaf-3.png';

// Reuse the same brand line-pattern strip used on Foodtruck/Grill pages
import linePattern from '@/assets/foodtruck-line-pattern.png';
// Catering hero imagery — re-used as the backdrop for the Helhetsupplevelse hero
import cateringHeroLeft from '@/assets/catering-hero-left.png';
import cateringHeroMiddle from '@/assets/catering-hero-middle.png';
import cateringHeroRight from '@/assets/catering-hero-right.png';
import lightCateringPdf from '@/assets/light-catering-experience.png';
import circleBar from '@/assets/circle-bar.png';
import circleMenus from '@/assets/circle-menus.png';
import circleDecoration from '@/assets/circle-decoration.png';
import circleDj from '@/assets/circle-dj.png';
import circleEvent from '@/assets/circle-event.png';

// Hunger carousel imagery — same set used on the Meny page
import menuCarousel1 from '@/assets/menu-carousel-1.jpg';
import menuCarousel3 from '@/assets/menu-carousel-3.jpg';
import menuCarousel5 from '@/assets/menu-carousel-5.jpg';
import menuCarousel6 from '@/assets/menu-carousel-6.jpg';
import grillExtra1 from '@/assets/grill-extra-1.jpg';
import grillExtra2 from '@/assets/grill-extra-2.jpg';
import grillExtra3 from '@/assets/grill-extra-3.jpg';
import grillExtra5 from '@/assets/grill-extra-5.jpg';
import uppMenu1 from '@/assets/upp-menu-1.png.asset.json';
import uppMenu2 from '@/assets/upp-menu-2.png.asset.json';
import uppMenu3 from '@/assets/upp-menu-3.png.asset.json';
import uppMenu4 from '@/assets/upp-menu-4.png.asset.json';
import uppMenu5 from '@/assets/upp-menu-5.png.asset.json';
import uppEvent1 from '@/assets/upp-event-1.webp';
import uppEvent2 from '@/assets/upp-event-2.webp';
import uppEvent3 from '@/assets/upp-event-3.webp';
import uppEvent4 from '@/assets/upp-event-4.webp';
import uppEvent5 from '@/assets/upp-event-5.webp';
import uppLunchPopup from '@/assets/upp-lunch-popup.webp';
import uppFoodtruck1 from '@/assets/upp-foodtruck-1.webp';
import uppFoodtruck2 from '@/assets/upp-foodtruck-2.webp';
import uppFoodtruck3 from '@/assets/upp-foodtruck-3.webp';
import uppFoodtruck4 from '@/assets/upp-foodtruck-4.webp';
import cateringMikatéPhotoAsset from '@/assets/catering-mikate-photo.webp';
import cateringMikatéPackAsset from '@/assets/catering-mikate-pack.webp';
import cateringNavUpplevelserAsset from '@/assets/catering-nav-upplevelser-v2.webp';
import uppDecoration1 from '@/assets/upp-decoration-1.webp';
import uppDecoration2 from '@/assets/upp-decoration-2.webp';
import uppDecoration3 from '@/assets/upp-decoration-3.webp';
import uppDecoration4 from '@/assets/upp-decoration-4.webp';
import uppDecoration5 from '@/assets/upp-decoration-5.webp';
import uppBar1 from '@/assets/upp-bar-1.webp';
import uppBar2 from '@/assets/upp-bar-2.webp';
import uppBar3 from '@/assets/upp-bar-3.webp';
import uppDj1 from '@/assets/upp-dj-1.webp';
import uppDj2 from '@/assets/upp-dj-2.webp';
import uppDj3 from '@/assets/upp-dj-3.webp';
import TrustQuotes from '@/components/TrustQuotes';
import CateringExtras from '@/components/CateringExtras';

const carouselPlaceholder = '/placeholder.svg';

const NEWSLETTER_WEBHOOK_URL = 'https://meggamind.app.n8n.cloud/webhook/Nyhetsbrev';

const NewsletterSignup = ({ t }: { t: (sv: string, en: string) => string }) => {
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('sending');
    try {
      const res = await fetch(NEWSLETTER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'Lunch Popup', timestamp: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="mt-4">
      <label className="inline-flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="w-4 h-4 rounded border-white/40 bg-white/10 accent-white"
        />
        <span className="text-sm md:text-base opacity-90">
          {t('Prenumerera på vårt nyhetsbrev', 'Subscribe to our newsletter')}
        </span>
      </label>
      {checked && (
        <form onSubmit={handleSubmit} className="mt-3 flex flex-col sm:flex-row gap-2 max-w-md">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('Din e-postadress', 'Your email address')}
            className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/25 text-sm placeholder:text-current/60 focus:outline-none focus:border-white/60"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-4 py-2 rounded-lg bg-white/15 hover:bg-white/25 border border-white/30 text-xs md:text-sm font-bold uppercase tracking-wider transition disabled:opacity-50"
          >
            {status === 'sending' ? t('Skickar...', 'Sending...') : t('Prenumerera', 'Subscribe')}
          </button>
        </form>
      )}
      {status === 'success' && (
        <p className="mt-2 text-xs md:text-sm opacity-85">{t('Tack! Du är nu prenumerant.', 'Thanks! You are now subscribed.')}</p>
      )}
      {status === 'error' && (
        <p className="mt-2 text-xs md:text-sm opacity-85">{t('Något gick fel. Försök igen.', 'Something went wrong. Please try again.')}</p>
      )}
    </div>
  );
};

const PhotoStrip = ({
  images,
  label,
  cols = 5,
  fit = 'cover',
  heightClass = 'h-28 md:h-40',
}: {
  images: string[];
  label: string;
  cols?: number;
  fit?: 'cover' | 'contain';
  heightClass?: string;
}) => {
  // Use flex-wrap with justify-center so an orphan item on the last row stays centered
  // (text-max / "textmaxing" fix for mobile when image count is uneven).
  const desktopBasis =
    cols === 6
      ? 'md:basis-[calc(16.666%-1.04rem)]'
      : cols === 3
      ? 'md:basis-[calc(33.333%-0.834rem)]'
      : 'md:basis-[calc(20%-1rem)]';
  return (
    <div className="relative mt-6 md:mt-8 mb-10 md:mb-14">
      <div className="absolute inset-x-0 top-1/2 h-40 -translate-y-1/2 rounded-[2rem] bg-white/10 blur-3xl opacity-60" />
      <div className="relative flex flex-wrap justify-center gap-3 md:gap-5">
        {images.map((src, idx) => (
          <div
            key={idx}
            className={`overflow-hidden rounded-2xl ring-2 ring-white/20 bg-white/10 shadow-2xl basis-[calc(50%-0.375rem)] ${desktopBasis}`}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className={`w-full ${heightClass} ${fit === 'contain' ? 'object-contain bg-white/5 p-2 md:p-3' : 'object-cover'}`}
            />
          </div>
        ))}
      </div>
    <p className="mt-4 text-center font-display font-extrabold uppercase tracking-widest text-white/85 text-xs md:text-sm drop-shadow">
      {label}
    </p>
  </div>
  );
};

const menuStripImages = [uppMenu1.url, uppMenu2.url, uppMenu3.url, uppMenu4.url, uppMenu5.url, cateringNavUpplevelserAsset];
const eventStripImages = [uppEvent1, uppEvent2, uppEvent3, uppEvent4, uppEvent5];
const decorationStripImages = [uppDecoration1, uppDecoration2, uppDecoration3, uppDecoration4, uppDecoration5];
const barStripImages = [uppBar1, uppBar2, uppBar3];
const djStripImages = [uppDj1, uppDj2, uppDj3];

// Source PDFs/PNGs for download buttons — served from /public so the browser
// downloads them directly without going through Vite's auth-protected dev routes.
const srcFlavorBox = '/sources/Flavor_box.png';
const srcSnackBox = '/sources/Snack_box.png';
const srcLunchPopup = '/sources/Flavor-Boss-Lunch-Popup.png';
const srcSweetMikaté = '/sources/add_something_sweet.png';
const srcSamosaMikaté = '/sources/erbjudande.png';
const srcTakeHome = '/sources/ta_med_dig_flavorn_hem.png';
const srcCateringBuffe = '/sources/03_FB_CateringBuffeupplevelseA5_Q1_2026_1.png';
const srcLightCatering = '/sources/05_FB_LightCateringExp_A5_1.png';
const srcFoodtruck = '/sources/food_truck_upplevelse.png';
const srcGrill = '/sources/grillupplevelse.png';
const srcDekoration = '/sources/Dekorations_upplevelse.png';
const srcBoozeTruck = '/sources/09_FB_FlavorBoozeTruck_A5_Q1_2026_1.png';
const srcDjPaket = '/sources/dj_paket.png';

// Downloadable brochure PDFs — served from /public/brochures for direct browser download.
// Prefixed with BASE_URL (the app is deployed under the /THECODEBASE/ subpath) so the
// browser resolves them against the deployed site instead of the domain root.
const brochureFlavorBox = `${import.meta.env.BASE_URL}brochures/13_FB_FlavorBox_A5_2026_Dig.pdf`;
const brochureSnackBox = `${import.meta.env.BASE_URL}brochures/14_FB_SnackBox_A5_2026_Dig.pdf`;
const brochureCateringBuffe = `${import.meta.env.BASE_URL}brochures/03_FB_CateringBuffeupplevelseA5_2026_Dig.pdf`;
const brochureFoodtruckForetag = `${import.meta.env.BASE_URL}brochures/04_FB_FoodtruckUppl_Businessevenemang_A5_Dig.pdf`;
const brochureLightDekoration = `${import.meta.env.BASE_URL}brochures/05_FB_LightCateringExp_A5_Dig.pdf`;
const brochureMediumDekoration = `${import.meta.env.BASE_URL}brochures/06_FB_MedCateringExp_A5_2026_Dig.pdf`;
const brochureBoozeTruck = `${import.meta.env.BASE_URL}brochures/10_FB_FlavorBoozeTruck_A5_2026_Dig.pdf`;
const brochureLunchPopup = `${import.meta.env.BASE_URL}brochures/16_FB_LunchPopupA5_2026_Dig.pdf`;
const brochureTakeHome = `${import.meta.env.BASE_URL}brochures/17_FB_TameddigFlavornhemA5_2026_Dig.pdf`;
const brochureSamosaMikaté = `${import.meta.env.BASE_URL}brochures/18_FB_ErbjudandeA5_2026_Dig.pdf`;
const brochureSweetMikaté = `${import.meta.env.BASE_URL}brochures/19_FB_AddsomethingsweetA5_2026_Dig.pdf`;
const brochureDjSim = `${import.meta.env.BASE_URL}brochures/20_FB_DJ-paketA5_Q1_2026_Dig.pdf`;
const brochureFoodtruckPrivat = `${import.meta.env.BASE_URL}brochures/25_FB_Foodtruckupplevelse-PrivEvent_2026_Dig.pdf`;

const sectionCircleImages: Record<string, string> = {
  menus: circleMenus,
  catering: circleEvent,
  decoration: circleDecoration,
  bar: circleBar,
  dj: circleDj,
  snacks: mikateCloseup,
};

const journeyIcons = [
  { src: patternPalm, size: 110, x: '5%', y: '8%' },
  { src: patternArrow, size: 80, x: '88%', y: '6%' },
  { src: patternMask, size: 105, x: '82%', y: '22%' },
  { src: patternBurst, size: 90, x: '4%', y: '28%' },
  { src: patternNote, size: 95, x: '92%', y: '40%' },
  { src: patternZigzag, size: 100, x: '6%', y: '52%' },
  { src: patternDancer, size: 120, x: '90%', y: '60%' },
  { src: patternHut, size: 110, x: '4%', y: '72%' },
  { src: patternSun, size: 95, x: '88%', y: '82%' },
  { src: patternTribal, size: 90, x: '6%', y: '90%' },
  { src: patternWave1, size: 120, x: '70%', y: '94%' },
  { src: patternPalm3, size: 110, x: '40%', y: '50%' },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] as const },
};

const sharedCategoryIds = ['packages', 'experiences', 'decoration', 'entertainment', 'staff', 'logistics'];

type BasketItem = {
  id: string;
  title: string;
  cost: number;
};

type CateringItemRecord = {
  item_name: string;
  display_name: string;
  cost: number;
};

const SharedImageAlbum = ({ images, alt }: { images: string[]; alt: string }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full">
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[2500ms] ease-in-out"
          style={{ opacity: index === current ? 1 : 0 }}
        />
      ))}
    </div>
  );
};

type Item = {
  basketId?: string;
  titleSv: string;
  titleEn: string;
  descSv: string;
  descEn: string;
  image?: string;
  slideshowImages?: string[];
  downloadUrl?: string;
  downloadName?: string;
  brochureUrl?: string;
  brochureName?: string;
  socialLinks?: { instagram?: string; facebook?: string; tiktok?: string };
  newsletter?: boolean;
};

const bookingButtonStyles: Record<string, { background: string; color: string }> = {
  'Flavor Box — vår mest populära meny': { background: '#ea552a', color: '#000000' },
  'FLAVOR BOX - VÅR MEST POPULÄRA MENY': { background: '#ea552a', color: '#000000' },
  Snackbox: { background: 'linear-gradient(135deg, #f7a100 0%, #ec6708 100%)', color: '#feed00' },
  'Lunch Popup': { background: 'linear-gradient(135deg, #c44581 0%, #f7a800 100%)', color: '#ffe400' },
  'Sweet Flavors — Mikaté': { background: 'linear-gradient(135deg, #eb6132 0%, #f7ac2f 100%)', color: '#ffe500' },
  'Samosa & Mikaté Snack-upplevelse': { background: 'linear-gradient(135deg, #569b58 0%, #8fbc2b 100%)', color: '#ffe500' },
  'Ta Med Dig Flavorn Hem — Snackpack': { background: 'linear-gradient(135deg, #f28a1b 0%, #e62c2d 100%)', color: '#fded00' },
  'TA MED DIG FLAVRON HEM — Snackpack': { background: 'linear-gradient(135deg, #f28a1b 0%, #e62c2d 100%)', color: '#fded00' },
  'Foodtruck-upplevelse — Företagsevent': { background: 'linear-gradient(135deg, #d70258 0%, #fd7309 100%)', color: '#040005' },
  'Foodtruck Upplevelse — Privat': { background: 'linear-gradient(135deg, #d70258 0%, #fd7309 100%)', color: '#040005' },
  'Catering-buffé Upplevelse': { background: 'linear-gradient(135deg, #41935f 0%, #93bc2c 100%)', color: '#f5ee06' },
  'Light Catering Upplevelse': { background: 'linear-gradient(135deg, #782b4e 0%, #f2a107 100%)', color: '#feeb0f' },
  'Grill-upplevelse': { background: 'linear-gradient(135deg, #ff7007 0%, #d90a54 100%)', color: '#000400' },
  'Light Dekorations paket': { background: 'linear-gradient(135deg, #d46120 0%, #750744 100%)', color: '#ffffff' },
  'Medium Dekorations paket': { background: 'linear-gradient(135deg, #d46120 0%, #750744 100%)', color: '#ffffff' },
  'Lyx Dekorations paket': { background: 'linear-gradient(135deg, #d46120 0%, #750744 100%)', color: '#ffffff' },
  'The Flavor-Boss Experience': { background: 'linear-gradient(135deg, #d46120 0%, #750744 100%)', color: '#ffffff' },
  'Flavor-Booze Truck': { background: 'linear-gradient(135deg, #e96711 0%, #cf5117 100%)', color: '#ffe61d' },
  'DJ Sim — Ljud, Ljus & Vibes': { background: 'linear-gradient(135deg, #0baea9 0%, #fc730a 100%)', color: '#830049' },
};

type Section = {
  id: string;
  icon: typeof UtensilsCrossed;
  labelSv: string;
  labelEn: string;
  titleSv: string;
  titleEn: string;
  accent: string; // background color class for the section
  textOnAccent: string; // text color class for that bg
  items: Item[];
};

const sections: Section[] = [
  {
    id: 'menus',
    icon: UtensilsCrossed,
    labelSv: '01 — MENYER',
    labelEn: '01 — MENUS',
    titleSv: 'Menyer',
    titleEn: 'Menus',
    accent: 'bg-surface-yellow',
    textOnAccent: 'text-surface-yellow-foreground',
    items: [
      {
        titleSv: 'FLAVOR BOX - VÅR MEST POPULÄRA MENY',
        titleEn: 'FLAVOR BOX - VÅR MEST POPULÄRA MENY',
        descSv:
          'Vår prisbelönta signaturbox och fyrfaldiga vinnare av Streetfood-SM. Grillad Jamaican Fusion Jerk Chicken och Jerk Cauliflower (Veg/Vegan), serverad med Jollof Rice, krispig västafrikansk samosa, coleslaw, grillad majs med vitlöksolja, Boss Garlic Sauce, Flavor-Heat Dancing Hot Sauce och våra Sweetfood Champion-vinnande kongolesiska donuts Mikaté. Perfekt för både stora och små event.',
        descEn:
          'Our four-time championship-winning centerpiece. Grilled, cinnamon-scented Jamaican Fusioned Jerk Chicken alongside Jerk Cauliflower — fully vegan/vegetarian friendly. Served with Jollof Rice, a crispy West African samosa, Boss Garlic Sauce, Flavorheat homemade hotsauce, coleslaw, grilled corn and our legendary Congolese Mikaté donuts. The full Afro-Caribbean experience in one box.',
        image: flavorBox,
        downloadUrl: srcFlavorBox,
        downloadName: 'Flavor-Boss-Flavor-Box.png',
        brochureUrl: brochureFlavorBox,
        brochureName: 'Flavor-Boss-Flavor-Box-Broschyr.pdf',
      },
      {
        titleSv: 'Snackbox',
        titleEn: 'Snackbox',
        descSv:
          'Grillad kaneldoftande Jamaican Fusioned Jerk Chicken och Jerk Cauliflower blomkål vegansk/vegetarisk. Serveras med Samosa västafrikansk frasig pirog med vegetarisk/köttfyllning, Boss Garlic Sauce Grillad majs i vitlökolja Flavorheat homemade hotsauce & Våra prisbelönta kongolesiska beroendeframkallande söta donuts "Mikaté"',
        descEn:
          'A taste of the Flavor Box experience — same bold flavors, perfectly portioned. Ideal for lunches, mingles and corporate events.',
        downloadUrl: srcSnackBox,
        downloadName: 'Flavor-Boss-Snack-Box.png',
        brochureUrl: brochureSnackBox,
        brochureName: 'Flavor-Boss-Snack-Box-Broschyr.pdf',
      },
      {
        titleSv: 'Lunch Popup',
        titleEn: 'Lunch Popup',
        descSv:
          'Afro-Karibisk lunchupplevelse direkt från Flavor-Boss Kitchen på Hantverkaregatan 4, Arlöv. Vi serverar prisbelönta Flavor Box, Veckans Gryta med fufu eller ris, samt Kids Box. Schema släpps löpande via sociala medier och via vårt nyhetsbrev.',
        descEn:
          'Rotating popup lunches featuring the award-winning Flavor-Box, a weekly West African stew served with fufu or rice, and a Kids Box. Schedules are released through social media and our newsletter during festival season.',
        image: uppLunchPopup,
        downloadUrl: srcLunchPopup,
        downloadName: 'Flavor-Boss-Lunch-Popup.png',
        brochureUrl: brochureLunchPopup,
        brochureName: 'Flavor-Boss-Lunch-Popup-Broschyr.pdf',
        socialLinks: {
          instagram: 'https://instagram.com/flavorboss',
          facebook: 'https://facebook.com/flavorboss',
          tiktok: 'https://tiktok.com/@flavorboss',
        },
        newsletter: true,
      },
    ],
  },
  {
    id: 'snacks',
    icon: Cookie,
    labelSv: '02 — SNACKS & SÖTT',
    labelEn: '02 — SNACKS & SWEETS',
    titleSv: 'SÖT SAKER',
    titleEn: 'Sweets',
    accent: 'bg-surface-pink',
    textOnAccent: 'text-primary-foreground',
    items: [
      {
        titleSv: 'Sweet Flavors — Mikaté',
        titleEn: 'Sweet Flavors — Mikaté',
        descSv:
          'Vinnarna av Sweetfood Championship 2025. Våra Kongolesiska beroendeframkallande donuts Mikaté serveras med valfri topping – Salted Caramel med Lotus Crush eller Vit & Mjölkchoklad med Oreo Crush. Finns även som Limited Edition Deal om 30 portioner. Förboka vardagar 11–16.',
        descEn:
          'Our award-winning Congolese donuts served with your choice of topping: Salted Caramel + Lotus Crush or White & Milk Chocolate + Oreo Crush. A dessert experience with its own championship title. Available as a fika deal for teams and groups — pre-order for pickup or delivery weekdays 11–16.',
        basketId: 'sweet_flavors_mikate',
        image: cateringMikatéPhotoAsset,
        downloadUrl: srcSweetMikaté,
        downloadName: 'Flavor-Boss-Sweet-Mikaté.png',
        brochureUrl: brochureSweetMikaté,
        brochureName: 'Flavor-Boss-Sweet-Mikaté-Broschyr.pdf',
      },
      {
        titleSv: 'Samosa & Mikaté Snack-upplevelse',
        titleEn: 'Samosa & Mikaté Snack Experience',
        descSv:
          'Ge mötet eller AW:n en Flavor Boost. Två Västafrikanska handgjorda frasiga piroger per person med kryddig vego- eller nötköttsfyllning, serverade med Boss Garlic Sauce och Flavorheat Hot Sauce – avslutat med prisbelönta Mikaté. Finns som Limited Edition Deal om 30 portioner.',
        descEn:
          'Crispy West African piroger filled with spiced veg or minced meat, served with Boss Garlic Sauce and Flavorheat Hotsauce, finished with Mikaté donuts. Perfect for meetings, after-works and events. Available as a group deal — pre-order for pickup or delivery weekdays 11–16.',
        basketId: 'samosa_mikate_snack',
        downloadUrl: srcSamosaMikaté,
        downloadName: 'Flavor-Boss-Samosa-Mikaté.png',
        brochureUrl: brochureSamosaMikaté,
        brochureName: 'Flavor-Boss-Samosa-Mikaté-Broschyr.pdf',
      },
      {
        titleSv: 'TA MED DIG FLAVRON HEM — Snackpack',
        titleEn: 'Take The Flavor Home — Snack Pack',
        descSv:
          'Vill du njuta av våra prisbelönta smaker när det passar dig? Förbeställ & hämta ditt Snackpack enligt överrenskommelse. Fritera eller värm upp hemma när helgen kommer! Perfekt till hemmafester, brunch, lunchlådor eller mysiga kvällar med vänner. Allt är färdiglagat (fryst) och redo – bara att fritera/värma, servera & njut!',
        descEn:
          'Want to enjoy our award-winning flavors whenever it suits you? Pre-order & pick up your SNACK PACK by arrangement. Fry or heat at home when the weekend rolls in! Perfect for home parties, brunch, lunch boxes or cozy nights in with friends. Everything is pre-cooked (frozen) and ready — just fry/heat, serve & enjoy!',
        basketId: 'mikate_pack',
        image: cateringMikatéPackAsset,
        downloadUrl: srcTakeHome,
        downloadName: 'Flavor-Boss-Take-Home-Snacks.png',
        brochureUrl: brochureTakeHome,
        brochureName: 'Flavor-Boss-Take-Home-Snacks-Broschyr.pdf',
      },
    ],
  },
  {
    id: 'catering',
    icon: Truck,
    labelSv: '03 — CATERING & EVENT',
    labelEn: '03 — CATERING & EVENT',
    titleSv: 'EVENTPAKET',
    titleEn: 'Event package',
    accent: 'bg-surface-green',
    textOnAccent: 'text-primary-foreground',
    items: [
      {
        titleSv: 'Foodtruck-upplevelse — Företagsevent',
        titleEn: 'Foodtruck Experience — Corporate Events',
        descSv:
          'Med över 30 000 följare i sociala medier bidrar Flavor-Boss inte bara med mat – vi lockar människor till ert event. Vår färgstarka foodtruck passar butiksinvigningar, kundevent, sommarfester och nätverksträffar. Menyer är flexibla från smakportioner till fullständiga måltider.',
        descEn:
          "Let Flavor-Boss be the highlight of your event. Whether it's a store opening, customer event, summer party or networking meet — our menus scale from tasting portions to full meals for the whole team. We don't just bring food. We attract people to your event.",
        slideshowImages: [uppFoodtruck1, uppFoodtruck2, uppFoodtruck3, uppFoodtruck4],
        downloadUrl: srcFoodtruck,
        downloadName: 'Flavor-Boss-Foodtruck-Foretagsevent.png',
        brochureUrl: brochureFoodtruckForetag,
        brochureName: 'Flavor-Boss-Foodtruck-Foretagsevent-Broschyr.pdf',
      },
      {
        titleSv: 'Foodtruck Upplevelse — Privat',
        titleEn: 'Foodtruck Experience — Private',
        descSv:
          'Upplev äkta afro-karibiska smaker serverade från vår färgstarka foodtruck — en levande kulinarisk resa fylld av dofter, musik och energi som mättar alla era sinnen.',
        descEn:
          'Experience authentic Afro-Caribbean flavors served from our colorful foodtruck — a vibrant culinary journey filled with aromas, music and energy that feeds all your senses.',
        brochureUrl: brochureFoodtruckPrivat,
        brochureName: 'Flavor-Boss-Foodtruck-Privat-Broschyr.pdf',
      },
      {
        titleSv: 'Catering-buffé Upplevelse',
        titleEn: 'Catering Buffet Experience',
        descSv:
          'En varm och riklig buffé med smaker från Västafrika, Centralafrika och Karibien. Välj mellan Fullservice där vi levererar, dukar upp och presenterar buffén – eller Enkel Leverans där ni sköter uppdukningen själva. Afro-Karibiska dukar och lyktor ingår i alla beställningar.',
        descEn:
          'A warm, generous buffet fusing West African, Central African and Caribbean flavors. Choose how you want it delivered — we handle the rest. Full-service includes delivery, setup and a live presentation. Simple delivery is also available for those who want to handle setup themselves. Afro-Caribbean tablecloths and lanterns are included with every order.',
        downloadUrl: srcCateringBuffe,
        downloadName: 'Flavor-Boss-Catering-Buffe-Upplevelse.png',
        brochureUrl: brochureCateringBuffe,
        brochureName: 'Flavor-Boss-Catering-Buffe-Upplevelse-Broschyr.pdf',
      },
      {
        titleSv: 'Light Catering Upplevelse',
        titleEn: 'Light Catering Experience',
        descSv:
          'En komplett Afro-Karibisk helhetsupplevelse för 15 personer – perfekt för hemmamiddagar, mindre tillställningar och födelsedagar. Inkluderar Flavor Box, light dekoration med bordsljus, dukar och växter, engångsartiklar samt uppställning på plats. Fri frakt inom Malmö/Burlöv ingår.',
        descEn:
          'The full Flavor-Boss experience brought directly to your home, office or venue. Includes the Flavor Box menu plus light Afro-Caribbean decoration — candles, tablecloths, plants and disposables, all set up and presented on-site. Perfect for smaller gatherings, dinner parties and birthdays.',
        downloadUrl: srcLightCatering,
        downloadName: 'Flavor-Boss-Light-Catering-Experience.png',
      },
      {
        titleSv: 'Grill-upplevelse',
        titleEn: 'Grill Experience',
        descSv:
          'Den ultimata takterrass- eller trädgårdsfesten. Vår grillmaster levererar kaneldoftande Jamaican Fusioned Jerk direkt från en rykande grill med egen personal och alla tillbehör. Tre timmars service varav upp till 1,5h aktiv grillning. Passar sällskap från 13 personer och uppåt.',
        descEn:
          'Imagine the ultimate rooftop or garden party. Our grill master arrives with the smoky, aromatic scent of Jamaican fusioned jerk and serves hot, fresh food with a warm smile. Works on our own colorful grill or yours. Includes staff, all accessories and delivery.',
        image: grill1,
        downloadUrl: srcGrill,
        downloadName: 'Flavor-Boss-Grill-Upplevelse.png',
      },
    ],
  },
  {
    id: 'decoration',
    icon: Sparkles,
    labelSv: '04 — CATERINGPAKET',
    labelEn: '04 — CATERING PACKAGES',
    titleSv: 'Cateringpaket',
    titleEn: 'Catering Packages',
    accent: 'bg-accent',
    textOnAccent: 'text-accent-foreground',
    items: [
      {
        titleSv: 'Light Dekorations paket',
        titleEn: 'Light Package',
        descSv:
          'Lyktor, dukar och gröna växter ingår. En färgstark dekoration som ger buffén en varm känsla. Perfekt för en enkel men stämningsfull touch.',
        descEn:
          'Lanterns, tablecloths and green plants. A colorful, warm touch that elevates any buffet setup.',

        downloadUrl: srcDekoration,
        downloadName: 'Flavor-Boss-Dekoration-Light.png',
        brochureUrl: brochureLightDekoration,
        brochureName: 'Flavor-Boss-Dekoration-Light-Broschyr.pdf',
      },
      {
        titleSv: 'Medium Dekorations paket',
        titleEn: 'Medium Package',
        descSv:
          'En afro-karibisk upplevelse på nästa nivå! Perfekt för examensfest, födelsedagsmiddagen, nätverksträffar & mycket mer!\n\nInnehåll: Meny: Flavor-Box. Medium dekoration med afro-karibisk känsla, inklusive allt som ingår i Small dekorationspaket. Plus färgrika fat, palm, kaktus, färgsprakande dekorationsbollar m.m. Dekorations set up, engångsartiklar, uppställning & presentation på plats.',
        descEn:
          'Colorful serving dishes, lanterns, tablecloths, palms, cacti, green plants and vibrant decoration balls — arranged at multiple levels to bring the buffet to life.',

        downloadUrl: srcDekoration,
        downloadName: 'Flavor-Boss-Dekoration-Medium.png',
        brochureUrl: brochureMediumDekoration,
        brochureName: 'Flavor-Boss-Dekoration-Medium-Broschyr.pdf',
      },
      {
        titleSv: 'The Flavor-Boss Experience',
        titleEn: 'The Flavor-Boss Experience',
        descSv:
          'För er som vill bjuda på mer än bara mat. Här jobbar vi i alla nivåer med vårdekoration från golv, buffé, matplatser & tak.\n\nVi skapar en helhetsupplevelse med hängande dekorationer som förvandlar lokalen till en färgsprakande fest.\n\nEn komplett afro-karibisk upplevelse med vår prisbelönta Flavor-Box, lyxig uppdukning, dekoration och en färgsprakande presentation som förvandlar måltiden till en upplevelse gästerna minns länge efter sista tuggan.\n\nInnehåll. Meny: Flavor-Box. Vår fyrfaldiga svenska mästarbox i streetfood. Bestick & serveringsmaterial. Lyxigt dekorationspaket. Uppsättning av dekoration & styling på plats. Uppdukning av buffé & presentation av maten.',
        descEn:
          'Everything in Light and Medium, plus hanging decorations that transform the entire venue into a vivid, colorful celebration. Floor, buffet, dining areas and ceiling — all levels covered. Scalable for larger events and custom solutions.',

        
        downloadUrl: srcDekoration,
        downloadName: 'Flavor-Boss-Dekoration-Lyx.png',
      },
    ],
  },
  {
    id: 'bar',
    icon: Wine,
    labelSv: '05 — BAR & DRYCK',
    labelEn: '05 — BAR & DRINKS',
    titleSv: 'Bar & Dryck',
    titleEn: 'Bar & Drinks',
    accent: 'bg-surface-dark',
    textOnAccent: 'text-surface-dark-foreground',
    items: [
      {
        titleSv: 'Flavor-Booze Truck',
        titleEn: 'Flavor-Booze Truck',
        descSv:
          'En showstopper som lyfter hela stämningen. Vår färgsprakande bartruck serverar öl, vin, Flavor-Booze cocktails och mocktails tillsammans med Afro-Karibiska streetbites. Finns som Truck Experience eller Bar Experience utan truck. Vi hanterar alkoholtillstånd. Minimum 50 personer per event.',
        descEn:
          'A full bar and snacks experience on wheels. Lager, IPA, wine, exotic cocktails and non-alcoholic options. Pair the bar with Samosa Snack Packs, Sweet Flavors Mikaté or a warming Peppeh Soup for the perfect late-night kick. Available as a full bartruck experience or as a bar setup without the truck. Ideal for corporate events and private parties. Requires advance booking due to serving permits.',
        downloadUrl: srcBoozeTruck,
        downloadName: 'Flavor-Boss-Booze-Truck.png',
        brochureUrl: brochureBoozeTruck,
        brochureName: 'Flavor-Boss-Booze-Truck-Broschyr.pdf',
      },
    ],
  },
  {
    id: 'dj',
    icon: Music,
    labelSv: '06 — DJ & MUSIK',
    labelEn: '06 — DJ & MUSIC',
    titleSv: 'DJ & Musik',
    titleEn: 'DJ & Music',
    accent: 'bg-primary',
    textOnAccent: 'text-primary-foreground',
    items: [
      {
        titleSv: 'DJ Sim — Ljud, Ljus & Vibes',
        titleEn: 'DJ Sim — Sound, Light & Vibes',
        descSv:
          'Förvandla din fest till ett minnesvärt dansgolv. DJ Sim erbjuder tre paket: Flavor Light med 2h spelning och ljud & ljus, Flavor Boost med 3h DJ-set och full setup, samt Full On Flavor – den ultimata helhetsupplevelsen med DJ, PA-system, högtalare, ljus och glow.',
        descEn:
          'Turn your event into a dance floor. DJ Sim delivers professional DJ sets with full sound and light setups. Choose from a light DJ package for intimate events, a music wagon experience for something bigger, or a full-blown all-in production that maxes out the party. Extra hours available. Follow the vibe at @simthedj / djsim.se.',
        downloadUrl: srcDjPaket,
        downloadName: 'Flavor-Boss-DJ-Sim.png',
        brochureUrl: brochureDjSim,
        brochureName: 'Flavor-Boss-DJ-Sim-Broschyr.pdf',
      },
    ],
  },
];

const buildSteps = [
  {
    sv: 'Välj din meny och smakupplevelse',
    en: 'Choose your menu and flavor experience',
  },
  {
    sv: 'Välj önskat serveringssätt',
    en: 'Choose your preferred serving style',
    subSv: 'foodtruck, cateringbuffé, grillupplevelse eller portionsförpackat',
    subEn: 'foodtruck, catering buffet, grill experience or portioned packs',
  },
  {
    sv: 'Höj upplevelsen med våra färgsprakande dekorationspaket',
    en: 'Elevate the experience with our vibrant decoration packages',
    subSv: 'palmer, dukar, girlanger, dekorativa fat m.m.',
    subEn: 'palms, tablecloths, garlands, decorative platters and more',
  },
  {
    sv: 'Låt oss skapa festen med våra afro-karibiska upplevelser',
    en: 'Let us create the party with our Afro-Caribbean experiences',
    subSv: 'DJ, värdinna, serveringspersonal, dansande maskot och mycket mer.',
    subEn: 'DJ, hostess, serving staff, dancing mascot and much more.',
  },
];

const Upplevelser = () => {
  const { t } = useLanguage();

  useEffect(() => {
    if (window.location.hash) {
      // Defer to allow sections to mount
      const id = window.location.hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top, behavior: 'auto' });
          return;
        }
        window.scrollTo(0, 0);
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <SEOHead
        title={t(
          'Helhetsupplevelse — Flavor-Boss Malmö & Skåne',
          'Complete Experience — Flavor-Boss Malmö & Skåne'
        )}
        description={t(
          'Bygg din kompletta afro-karibiska eventupplevelse — menyer, catering, foodtruck, grill, dekoration, bar och DJ. Allt på ett ställe.',
          'Build your complete Afro-Caribbean event experience — menus, catering, food truck, grill, decoration, bar and DJ. All in one place.'
        )}
        canonical="https://www.flavorboss.se/upplevelser"
      />

      <div className="relative min-h-screen overflow-hidden">
        {/* Animated funky gradient base — orange → pink → green */}
        <div
          className="absolute inset-0 animate-gradient-shift"
          style={{
            backgroundImage:
              'linear-gradient(160deg, #F07020 0%, #E8186D 45%, #2D6A4F 100%)',
            backgroundSize: '220% 220%',
          }}
        />

        {/* Floating journey icons — same recipe as Grill page */}
        {journeyIcons.map((icon, i) => (
          <motion.img
            key={i}
            src={icon.src}
            alt=""
            aria-hidden="true"
            className="absolute pointer-events-none select-none opacity-[0.18] mix-blend-screen"
            style={{
              left: icon.x,
              top: icon.y,
              width: icon.size,
              height: icon.size,
            }}
            animate={{
              y: [0, -14, 8, 0],
              rotate: [0, 5, -3, 0],
            }}
            transition={{
              duration: 12 + (i % 5),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: (i % 6) * 0.3,
            }}
          />
        ))}

        {/* Floating leaves — borrowed from Cateringpaket */}
        <motion.img
          src={leaf1}
          alt=""
          aria-hidden="true"
          className="absolute top-32 right-0 w-40 md:w-60 pointer-events-none select-none opacity-60 drop-shadow-lg translate-x-1/3"
          animate={{ y: [0, -20, 10, 0], rotate: [0, 6, -4, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.img
          src={leaf2}
          alt=""
          aria-hidden="true"
          className="absolute top-1/2 left-0 w-44 md:w-64 pointer-events-none select-none opacity-50 drop-shadow-lg -translate-x-1/3"
          animate={{ y: [0, 15, -10, 0], rotate: [0, -5, 4, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.img
          src={leaf3}
          alt=""
          aria-hidden="true"
          className="absolute bottom-32 right-0 w-44 md:w-56 pointer-events-none select-none opacity-55 drop-shadow-lg translate-x-1/3"
          animate={{ y: [0, -12, 18, 0], rotate: [0, 4, -6, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Soft dark vignette for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 pointer-events-none" />

        <main id="main-content" className="relative z-10">
          {/* Top brand line-pattern strip */}
          <div
            aria-hidden="true"
            className="absolute top-24 left-0 right-0 h-8 md:h-12 select-none pointer-events-none w-screen opacity-90"
            style={{
              backgroundImage: `url(${linePattern})`,
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 100%',
              backgroundPosition: 'left center',
            }}
          />

          {/* HERO */}
          <section className="container-site pt-44 md:pt-52 pb-16 md:pb-24 text-center relative">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-display text-sm md:text-base tracking-[0.35em] uppercase mb-8 md:mb-10"
              style={{ color: '#ffeb02' }}
            >
              {t('FLAVOR-BOSS PRESENTERAR', 'FLAVOR-BOSS PRESENTS')}
            </motion.p>
            {/* Backdrop: three hero images (desktop) / single mobile image, behind the title block only */}
            <div className="relative aspect-square md:aspect-auto">
              <div className="absolute inset-0 -z-0 pointer-events-none hidden md:grid grid-cols-3 gap-4 md:gap-6 px-2 md:px-8">
                {[cateringHeroLeft, cateringHeroMiddle, cateringHeroRight].map((src, i) => (
                  <motion.img
                    key={i}
                    src={src}
                    alt=""
                    loading="lazy"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="w-full h-full object-cover rounded-2xl shadow-2xl ring-2 ring-white/20"
                  />
                ))}
              </div>
              <div className="absolute inset-0 -z-0 md:hidden rounded-2xl overflow-hidden">
                <img src={cateringHeroMiddle} alt="" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10 h-full md:h-auto flex items-center justify-center py-10 md:py-16">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              className="font-display font-extrabold uppercase text-[2.8125rem] md:text-[5.625rem] lg:text-[7.5rem] tracking-tight leading-[0.95] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
            >
              {t('Helhetsupplevelse', 'Complete Experience')}
            </motion.h1>
              </div>
            </div>

            {/* Quick anchor nav */}
            <motion.nav
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="mt-20 md:mt-28 flex flex-wrap justify-center gap-x-10 gap-y-14 md:gap-x-14 md:gap-y-16"
              aria-label={t('Snabbnavigering', 'Quick navigation')}
            >
              {sections.map((s) => {
                const Icon = s.icon;
                const isDj = s.id === 'dj';
                const commonClass =
                  'group relative flex flex-col items-center w-28 md:w-36 transition-transform hover:-translate-y-1';
                const inner = (
                  <>
                    {/* Circle image (placeholder) */}
                    <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden bg-white border-4 border-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] ring-2 ring-white/40 ring-offset-2 ring-offset-transparent">
                      <img
                        src={sectionCircleImages[s.id] ?? '/placeholder.svg'}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      {isDj && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/50 group-hover:opacity-100">
                          <Link2 className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>
                    {/* Pill on top of circle */}
                    <span
                      className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-[10px] md:text-xs font-extrabold uppercase tracking-wider shadow-lg whitespace-nowrap"
                      style={{ background: '#ff632b' }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {t(s.titleSv, s.titleEn)}
                    </span>
                  </>
                );
                if (isDj) {
                  return (
                    <a
                      key={s.id}
                      href="https://www.djsim.se/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={commonClass}
                    >
                      {inner}
                    </a>
                  );
                }
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={commonClass}
                  >
                    {inner}
                  </a>
                );
              })}
              {/* Grill quick access — links to the standalone Grill experience page */}
              <Link to="/grill" className="group relative flex flex-col items-center w-28 md:w-36 transition-transform hover:-translate-y-1">
                <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden bg-white border-4 border-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] ring-2 ring-white/40 ring-offset-2 ring-offset-transparent">
                  <img src={grill1} alt="" loading="lazy" className="w-full h-full object-cover" />
                </div>
                <span
                  className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-[10px] md:text-xs font-extrabold uppercase tracking-wider shadow-lg whitespace-nowrap"
                  style={{ background: '#ff632b' }}
                >
                  <Flame className="w-3.5 h-3.5" />
                  {t('Grill', 'Grill')}
                </span>
              </Link>
            </motion.nav>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-20 md:mt-24 max-w-2xl mx-auto text-center text-sm md:text-lg font-bold text-white leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
            >
              {t(
                'Allt vi erbjuder, samlat på ett ställe. Bygg din egen afro-karibiska upplevelse — meny, servering, dekoration, bar och musik — innan du skickar din offertförfrågan.',
                'Everything we offer, gathered in one place. Build your own Afro-Caribbean experience — menu, service, decoration, bar and music — before you send your quote request.'
              )}
            </motion.p>
          </section>

          {/* SECTIONS */}
          <div className="container-site pb-12 space-y-20 md:space-y-28">
            {sections.map((section, secIdx) => {
              const Icon = section.icon;
              return (
                <div key={section.id} className="space-y-20 md:space-y-28">
                <motion.section
                  id={section.id}
                  {...fadeUp}
                  className="scroll-mt-32"
                >
                  {/* Section header */}
                  <div className="flex flex-col items-center text-center mb-10 md:mb-14">
                    <span
                      className="font-display text-xs md:text-sm tracking-[0.3em] uppercase mb-3"
                      style={{ color: '#ffeb02' }}
                    >
                      {t(section.labelSv, section.labelEn)}
                    </span>
                    <div className="inline-flex items-center gap-4">
                      <div className="hidden md:block h-[2px] w-16 bg-white/40" />
                      <Icon className="w-9 h-9 md:w-11 md:h-11 text-white" strokeWidth={1.7} />
                      <h2 className="font-display font-extrabold uppercase text-3xl md:text-5xl text-white tracking-tight">
                        {t(section.titleSv, section.titleEn)}
                      </h2>
                      <div className="hidden md:block h-[2px] w-16 bg-white/40" />
                    </div>
                    {section.id === 'catering' && (
                      <PhotoStrip
                        images={eventStripImages}
                        label={t('Stämning från våra event', 'Atmosphere from our events')}
                      />
                    )}
                    {section.id === 'decoration' && (
                      <PhotoStrip
                        images={decorationStripImages}
                        label={t('Dekoration som ger känsla', 'Decoration that sets the mood')}
                        cols={3}
                      />
                    )}
                    {section.id === 'bar' && (
                      <PhotoStrip
                        images={barStripImages}
                        label={t('Bar & dryck i sin rätta känsla', 'Bar & drinks in the right atmosphere')}
                        cols={3}
                      />
                    )}
                    {section.id === 'dj' && (
                      <PhotoStrip
                        images={djStripImages}
                        label={t('DJ & musik med energi', 'DJ & music with energy')}
                        cols={3}
                      />
                    )}
                  </div>

                  {/* Items */}
                  <Accordion
                    type="multiple"
                    className="max-w-3xl mx-auto space-y-4 md:space-y-5"
                  >
                    {section.items.map((item, idx) => (
                      (() => {
                        const bookingStyle = bookingButtonStyles[item.titleSv] ?? {
                          background: 'linear-gradient(135deg, #ff632b 0%, #E8186D 50%, #ff632b 100%)',
                          color: '#ffffff',
                        };

                        return (
                      <AccordionItem
                        key={idx}
                        value={`${section.id}-${idx}`}
                        className={`border-0 overflow-hidden shadow-2xl animate-gradient-shift ${section.textOnAccent}`}
                        style={{
                          borderRadius:
                            idx % 2 === 0
                              ? '2rem 1rem 2rem 1rem'
                              : '1rem 2rem 1rem 2rem',
                          backgroundImage:
                            section.accent === 'bg-surface-yellow'
                              ? 'linear-gradient(135deg, #f5c518 0%, #ffd84d 40%, #ff9d2b 75%, #f5c518 100%)'
                              : section.accent === 'bg-surface-pink'
                              ? 'linear-gradient(135deg, #E8186D 0%, #ff4d94 45%, #c4135c 80%, #E8186D 100%)'
                              : section.accent === 'bg-surface-green'
                              ? 'linear-gradient(135deg, #2D6A4F 0%, #3f9971 45%, #1f4d39 80%, #2D6A4F 100%)'
                              : 'linear-gradient(135deg, #2a1a3a 0%, #4a2960 45%, #1a0f25 80%, #2a1a3a 100%)',
                          backgroundSize: '200% 200%',
                        }}
                      >
                        {/* Always-visible image */}
                        {item.image && (
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <img
                              src={item.image}
                              alt=""
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                          </div>
                        )}
                        {!item.image && item.slideshowImages && item.slideshowImages.length > 0 && (
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <SharedImageAlbum images={item.slideshowImages} alt={t(item.titleSv, item.titleEn)} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                          </div>
                        )}
                        {/* Always-visible title + chevron toggle */}
                        <AccordionTrigger className="px-5 md:px-7 py-5 md:py-6 font-display font-extrabold uppercase text-base md:text-xl leading-tight tracking-tight hover:no-underline text-left gap-3">
                          <span className="flex-1">{t(item.titleSv, item.titleEn)}</span>
                        </AccordionTrigger>
                        {/* Only description collapses */}
                        <AccordionContent className="px-5 md:px-7 pb-6 md:pb-7">
                          <p className="text-sm md:text-base leading-relaxed opacity-95 whitespace-pre-line">
                            {t(item.descSv, item.descEn)}
                          </p>
                          {item.socialLinks && (
                            <div className="mt-4 flex flex-wrap items-center gap-3">
                              <span className="text-xs md:text-sm font-display font-extrabold uppercase tracking-wider opacity-90">
                                {t('Följ oss för schema', 'Follow us for the schedule')}:
                              </span>
                              {item.socialLinks.instagram && (
                                <a
                                  href={item.socialLinks.instagram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="Instagram"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-xs md:text-sm font-bold uppercase tracking-wider transition"
                                >
                                  <Instagram className="w-4 h-4" /> Instagram
                                </a>
                              )}
                              {item.socialLinks.facebook && (
                                <a
                                  href={item.socialLinks.facebook}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="Facebook"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-xs md:text-sm font-bold uppercase tracking-wider transition"
                                >
                                  <Facebook className="w-4 h-4" /> Facebook
                                </a>
                              )}
                              {item.socialLinks.tiktok && (
                                <a
                                  href={item.socialLinks.tiktok}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="TikTok"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-xs md:text-sm font-bold uppercase tracking-wider transition"
                                >
                                  <Music className="w-4 h-4" /> TikTok
                                </a>
                              )}
                            </div>
                          )}
                          {item.newsletter && <NewsletterSignup t={t} />}
                          {item.titleSv === 'DJ Sim — Ljud, Ljus & Vibes' ? (
                            <div className="mt-5 flex flex-wrap items-center gap-4">
                              <a
                                href={item.brochureUrl}
                                download={item.brochureName}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-[1.5rem_2rem_1.5rem_2rem] hover:rounded-[2rem_1.5rem_2rem_1.5rem] font-display font-extrabold uppercase tracking-wider text-xs md:text-sm transition-all duration-200 hover:-translate-y-0.5 border-2 border-white/60 ring-1 ring-black/20"
                                style={{
                                  backgroundImage: bookingStyle.background.includes('gradient') ? bookingStyle.background : undefined,
                                  backgroundColor: bookingStyle.background.includes('gradient') ? undefined : bookingStyle.background,
                                  color: bookingStyle.color,
                                  opacity: 1,
                                  boxShadow: '0 6px 18px rgba(0,0,0,0.45), 0 2px 6px rgba(0,0,0,0.35)',
                                  textShadow:
                                    bookingStyle.color.toLowerCase() === '#ffffff'
                                      ? '0 1px 2px rgba(0,0,0,0.35)'
                                      : '0 1px 1px rgba(255,255,255,0.35)',
                                }}
                              >
                                <ArrowRight className="w-4 h-4" />
                                {t('Ladda ner broschyr', 'Download Flyer')}
                              </a>
                              <span
                                className="text-xl md:text-2xl leading-none tracking-wide"
                                style={{
                                  fontFamily: "'Bungee', sans-serif",
                                  color: '#ffe500',
                                  textShadow: '0 2px 6px rgba(0,0,0,0.55)',
                                }}
                              >
                                FOLLOW THE VIBE!
                              </span>
                            </div>
                          ) : item.brochureUrl ? (
                            <a
                              href={item.brochureUrl}
                              download={item.brochureName}
                              className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-[1.5rem_2rem_1.5rem_2rem] hover:rounded-[2rem_1.5rem_2rem_1.5rem] font-display font-extrabold uppercase tracking-wider text-xs md:text-sm transition-all duration-200 hover:-translate-y-0.5 border-2 border-white/60 ring-1 ring-black/20"
                              style={{
                                backgroundImage: bookingStyle.background.includes('gradient') ? bookingStyle.background : undefined,
                                backgroundColor: bookingStyle.background.includes('gradient') ? undefined : bookingStyle.background,
                                color: bookingStyle.color,
                                opacity: 1,
                                boxShadow: '0 6px 18px rgba(0,0,0,0.45), 0 2px 6px rgba(0,0,0,0.35)',
                                textShadow:
                                  bookingStyle.color.toLowerCase() === '#ffffff'
                                    ? '0 1px 2px rgba(0,0,0,0.35)'
                                    : '0 1px 1px rgba(255,255,255,0.35)',
                              }}
                            >
                              <ArrowRight className="w-4 h-4" />
                              {t('Ladda ner broschyr', 'Download Flyer')}
                            </a>
                          ) : (
                            <Link
                              to="/boka-oss"
                              onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
                              className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-[1.5rem_2rem_1.5rem_2rem] hover:rounded-[2rem_1.5rem_2rem_1.5rem] font-display font-extrabold uppercase tracking-wider text-xs md:text-sm transition-all duration-200 hover:-translate-y-0.5 border-2 border-white/60 ring-1 ring-black/20"
                              style={{
                                backgroundImage: bookingStyle.background.includes('gradient') ? bookingStyle.background : undefined,
                                backgroundColor: bookingStyle.background.includes('gradient') ? undefined : bookingStyle.background,
                                color: bookingStyle.color,
                                opacity: 1,
                                boxShadow: '0 6px 18px rgba(0,0,0,0.45), 0 2px 6px rgba(0,0,0,0.35)',
                                textShadow:
                                  bookingStyle.color.toLowerCase() === '#ffffff'
                                    ? '0 1px 2px rgba(0,0,0,0.35)'
                                    : '0 1px 1px rgba(255,255,255,0.35)',
                              }}
                            >
                              <ArrowRight className="w-4 h-4" />
                              {t('Boka Oss', 'Book Us')}
                            </Link>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                        );
                      })()
                    ))}
                  </Accordion>
                </motion.section>
                </div>
              );
            })}

            {/* BUILD YOUR PACKAGE */}
            <motion.section
              id="build"
              {...fadeUp}
              className="scroll-mt-32"
            >
              <div className="flex flex-col items-center text-center mb-10 md:mb-14">
                <span
                  className="font-display text-xs md:text-sm tracking-[0.3em] uppercase mb-3"
                  style={{ color: '#ffeb02' }}
                >
                  {t('07 — BYGG DITT PAKET', '07 — BUILD YOUR PACKAGE')}
                </span>
                <div className="inline-flex items-center gap-4">
                  <div className="hidden md:block h-[2px] w-16 bg-white/40" />
                  <Package className="w-9 h-9 md:w-11 md:h-11 text-white" strokeWidth={1.7} />
                  <h2 className="font-display font-extrabold uppercase text-3xl md:text-5xl text-white tracking-tight">
                    {t('Bygg ditt Flavor-Boss-paket', 'Build your Flavor-Boss package')}
                  </h2>
                  <div className="hidden md:block h-[2px] w-16 bg-white/40" />
                </div>
                <p className="mt-5 max-w-2xl text-white/85 text-base md:text-lg">
                  {t(
                    'Att skapa din upplevelse är enkelt — fyra steg och festen är riggad.',
                    'Creating your experience is simple — four steps and the party is set.'
                  )}
                </p>
              </div>

              <ol className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
                {buildSteps.map((step, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/25 text-white shadow-lg"
                  >
                    <span
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-display font-extrabold text-xl shadow-md"
                      style={{
                        backgroundImage:
                          'linear-gradient(135deg, #ff632b 0%, #E8186D 50%, #ffeb02 100%)',
                        color: '#1a1a1a',
                      }}
                    >
                      {i + 1}
                    </span>
                    <div className="pt-1 flex-1">
                      <p className="font-display font-extrabold uppercase tracking-tight text-base md:text-lg leading-snug">
                        {t(step.sv, step.en)}
                      </p>
                      {(step as any).subSv && (
                        <p className="mt-1.5 text-sm md:text-base text-white/80 leading-relaxed">
                          {t((step as any).subSv, (step as any).subEn)}
                        </p>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ol>
            </motion.section>

            {/* PRACTICAL INFO */}
            <motion.section id="practical" {...fadeUp} className="scroll-mt-32">
              <div className="flex flex-col items-center text-center mb-10">
                <span
                  className="font-display text-xs md:text-sm tracking-[0.3em] uppercase mb-3"
                  style={{ color: '#ffeb02' }}
                >
                  {t('08 — PRAKTISK INFO', '08 — PRACTICAL INFO')}
                </span>
                <div className="inline-flex items-center gap-4">
                  <Flame className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={1.7} />
                  <h2 className="font-display font-extrabold uppercase text-3xl md:text-5xl text-white tracking-tight">
                    {t('Praktisk information', 'Practical information')}
                  </h2>
                </div>
              </div>

              <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-white/25 rounded-3xl p-6 md:p-10 text-white shadow-2xl text-center">
                <p className="text-base md:text-lg leading-relaxed mb-6">
                  {t(
                    'All praktisk information — leverans, upphämtning, el & utrustning, allergier och våra serviceområden — hittar du samlat på vår informationssida.',
                    'All practical information — delivery, pickup, power & equipment, allergies and our service areas — is collected on our information page.'
                  )}
                </p>
                <Link
                  to="/information"
                  className="inline-flex items-center gap-2 font-display font-extrabold uppercase tracking-wide text-white text-sm md:text-base px-6 md:px-8 py-3 md:py-4 rounded-full shadow-xl transition-transform duration-300 hover:scale-105"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg, #ff632b 0%, #E8186D 50%, #ff632b 100%)',
                  }}
                >
                  <MapPin className="w-5 h-5" style={{ color: '#ffeb02' }} />
                  {t('Gå till praktisk information', 'Go to practical information')}
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.section>

            {/* CTA */}
            <motion.section {...fadeUp} className="text-center pt-4 pb-8">
              <h3 className="font-display font-extrabold uppercase text-2xl md:text-4xl text-white mb-6 max-w-2xl mx-auto">
                {t(
                  'Redo att bygga er upplevelse?',
                  'Ready to build your experience?'
                )}
              </h3>
              <div className="relative z-20 isolate inline-block" style={{ isolation: 'isolate' }}>
                <Link
                  to="/boka-oss"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
                  className="animate-cta-glow inline-block font-display font-extrabold uppercase tracking-wide text-white text-lg md:text-2xl px-10 md:px-14 py-4 md:py-5 rounded-full shadow-2xl transition-transform duration-300 hover:scale-105"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg, #ff632b 0%, #E8186D 50%, #ff632b 100%)',
                    backgroundSize: '200% 200%',
                    opacity: 1,
                  }}
                >
                  {t('SKICKA OFFERTFÖRFRÅGAN', 'SEND QUOTE REQUEST')}
                </Link>
              </div>
            </motion.section>

          </div>

          {/* Catering extras moved from /meny → /upplevelser */}
          <CateringExtras />

          {/* Bottom brand line-pattern strip */}
          <div
            aria-hidden="true"
            className="relative h-8 md:h-12 select-none pointer-events-none w-screen opacity-90 mt-4"
            style={{
              backgroundImage: `url(${linePattern})`,
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 100%',
              backgroundPosition: 'left center',
            }}
          />
                <TrustQuotes seed="upplevelser" count={3} variant="light" headingSv="Vad våra kunder säger" headingEn="What Our Clients Say" />
      </main>
      </div>
    </>
  );
};

export default Upplevelser;
