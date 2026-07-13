import { useState, useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import {
  Trophy, Plus, Minus, ShoppingBasket, X, ArrowRight, Send, Award,
  User, Users, Crown, Drama, MapPin, Truck, LayoutGrid, Wrench, Utensils, Info, Check, Cookie, Boxes, Sparkles,
  Image as ImageIcon, Download, ChevronDown,
} from 'lucide-react';
import cateringData from '@/data/cateringItems.json';
import { cateringSections } from '@/data/cateringMenuStructured';
import { movedCateringSectionIds } from '@/components/CateringExtras';
import journeyPalm from '@/assets/journey/pattern-palm.png';
import journeyBurst from '@/assets/journey/pattern-burst.png';
import journeyMask from '@/assets/journey/pattern-mask.png';
import journeyTribal from '@/assets/journey/pattern-tribal.png';
import journeyZigzag from '@/assets/journey/pattern-zigzag.png';
import journeySun from '@/assets/journey/pattern-sun.png';
import journeyDancer from '@/assets/journey/pattern-dancer.png';
import journeyWave1 from '@/assets/journey/pattern-wave1.png';
import journeyNote from '@/assets/journey/pattern-note.png';
import journeyHut from '@/assets/journey/pattern-hut.png';
import patternWhiteImg from '@/assets/pattern-white.png';
import patternOrangeImg from '@/assets/pattern-orange.png';
import patternGreenImg from '@/assets/pattern-green.png';
import menuFlavorBoxImg from '@/assets/menu-flavor-box.jpg';
import menuSamosaBoxImg from '@/assets/menu-samosa-box.jpg';
import menuSweetFlavorsDeluxeAsset from '@/assets/menu-sweet-flavors-deluxe.webp';
import menuCarousel1 from '@/assets/menu-carousel-1.jpg';
import menuCarousel2 from '@/assets/menu-carousel-2.jpg';
import menuCarousel3 from '@/assets/menu-carousel-3.jpg';
import menuCarousel4 from '@/assets/menu-carousel-4.jpg';
import cateringHeroMobileAsset from '@/assets/catering-hero-mobile-v2.webp';
import menuCarousel5 from '@/assets/menu-carousel-5.jpg';
import menuCarousel6 from '@/assets/menu-carousel-6.jpg';
import menuCarousel7 from '@/assets/menu-carousel-7.jpg';
import cateringHeroLeftAsset from '@/assets/catering-hero-left.webp';
import cateringHeroMiddleAsset from '@/assets/catering-hero-middle.webp';
import cateringHeroRightAsset from '@/assets/catering-hero-right.webp';
import grillWingsFire from '@/assets/grill-wings-fire.jpg';
import cateringNavBuffeAsset from '@/assets/catering-nav-buffe.webp';
import cateringNavBulk from '@/assets/catering-nav-bulk.png';
import cateringNavPaketAsset from '@/assets/catering-nav-paket.webp';
import cateringNavUpplevelserAsset from '@/assets/catering-nav-upplevelser-v2.webp';
import cateringNavStaffAsset from '@/assets/catering-nav-staff-v2.webp';
import cateringNavEntertainmentAsset from '@/assets/catering-nav-entertainment.webp';
import cateringNavDecorationAsset from '@/assets/catering-nav-decoration-v2.webp';
import cateringCardFlavorbox from '@/assets/catering-card-flavorbox.png';
import cateringCardSnackbox from '@/assets/catering-card-snackbox.png';
import cateringCardJerkbox from '@/assets/catering-card-jerkbox.png';
import cateringSamosaMikatéSnackAsset from '@/assets/catering-samosa-mikate-snack.webp';
import cateringCardSamosaPackAsset from '@/assets/catering-card-samosa-pack.webp';
import jerkWrapIcon from '@/assets/jerk-wrap-icon.png';
import snackBoxBrochure from '@/assets/snack-box-brochure.pdf.asset.json';
import cateringSnackboxCornAsset from '@/assets/catering-snackbox-corn.png.asset.json';
import cateringMikatéPackAsset from '@/assets/catering-mikate-pack.webp';
import cateringMikatéPhotoAsset from '@/assets/catering-mikate-photo.webp';
import cateringLogisticsNavAsset from '@/assets/catering-logistics-nav.webp';
import jerkBoxPlateAsset from '@/assets/jerk-box-plate.webp';
import decorationLightAsset from '@/assets/decoration-light.png.asset.json';
import { useCateringBasket } from '@/hooks/useCateringBasket';

const CARD_IMAGE_BY_ID: Record<string, string> = {
  flavorbox: cateringCardFlavorbox,
  snack_box: cateringCardSnackbox,
  snack_box_with_corn: cateringSnackboxCornAsset.url,
  jerk_box: jerkBoxPlateAsset,
  sweet_flavors_mikate: cateringMikatéPhotoAsset,
  samosa_mikate_snack: cateringSamosaMikatéSnackAsset,
  samosa_pack: cateringCardSamosaPackAsset,
  mikate_pack: cateringMikatéPackAsset,
  decoration_light: decorationLightAsset.url,
};

// Per-image zoom to crop transparent/empty edges baked into the asset
const CARD_IMAGE_SCALE: Record<string, string> = {};
import grillExtra1 from '@/assets/grill-extra-1.jpg';
import grillExtra2 from '@/assets/grill-extra-2.jpg';
import grillExtra3 from '@/assets/grill-extra-3.jpg';
import grillExtra4 from '@/assets/grill-extra-4.jpg';
import grillExtra5 from '@/assets/grill-extra-5.jpg';

const hungerCarouselImages = [
  menuCarousel3, menuCarousel4,
];

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const HungerCarousel = ({ label }: { label: string }) => {
  const { images, duration, reverse } = useRef({
    images: shuffle(hungerCarouselImages),
    duration: 30 + Math.random() * 30, // 30-60s
    reverse: Math.random() < 0.5,
  }).current;
  return (
    <div className="my-10 md:my-16">
      <p className="text-center font-display font-extrabold uppercase tracking-widest text-white/90 text-sm md:text-base mb-4 drop-shadow">
        {label}
      </p>
      <div className="relative -mx-2 sm:-mx-4 md:-mx-8 overflow-hidden">
        <div
          className="flex animate-scroll-photos gap-3 md:gap-5"
          style={{
            width: 'max-content',
            animationDuration: `${duration}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
          }}
        >
          {[...images, ...images].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading="eager"
              className="h-44 md:h-64 w-auto object-cover flex-shrink-0 rounded-2xl shadow-2xl ring-2 ring-white/20"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

type CateringItem = {
  item_name: string;
  display_name: string;
  category: string;
  cost: number;
  price_type: string;
  count: number;
  item_description: string;
};
const MIN_ORDER_VALUE = 4500;

import patternPalm from '@/assets/journey/pattern-palm.png';
import patternArrow from '@/assets/journey/pattern-arrow.png';
import patternZigzag from '@/assets/journey/pattern-zigzag.png';
import patternMask from '@/assets/journey/pattern-mask.png';
import patternBurst from '@/assets/journey/pattern-burst.png';
import patternDancer from '@/assets/journey/pattern-dancer.png';
import patternWave1 from '@/assets/journey/pattern-wave1.png';
import patternWave2 from '@/assets/journey/pattern-wave2.png';
import patternNote from '@/assets/journey/pattern-note.png';
import patternMusic from '@/assets/journey/pattern-music.png';
import patternDancer2 from '@/assets/journey/pattern-dancer2.png';
import patternDancer3 from '@/assets/journey/pattern-dancer3.png';
import patternPalm2 from '@/assets/journey/pattern-palm2.png';
import patternTribal from '@/assets/journey/pattern-tribal.png';
import patternZigzag2 from '@/assets/journey/pattern-zigzag2.png';
import patternPalm3 from '@/assets/journey/pattern-palm3.png';
import patternPalm4 from '@/assets/journey/pattern-palm4.png';
import patternHut from '@/assets/journey/pattern-hut.png';
import patternFace from '@/assets/journey/pattern-face.png';
import patternPalm5 from '@/assets/journey/pattern-palm5.png';
import patternSun from '@/assets/journey/pattern-sun.png';
import patternNotes2 from '@/assets/journey/pattern-notes2.png';
import patternDancer4 from '@/assets/journey/pattern-dancer4.png';
import TrustQuotes from '@/components/TrustQuotes';

// Same dancing floating icons used on the Information ("Mer Info") page hero
const floatingPatterns = [
  { src: patternPalm, size: 110, x: '6%', y: '18%', delay: 0 },
  { src: patternArrow, size: 75, x: '85%', y: '12%', delay: 0.5 },
  { src: patternZigzag, size: 90, x: '14%', y: '72%', delay: 1.2 },
  { src: patternMask, size: 100, x: '80%', y: '68%', delay: 0.8 },
  { src: patternBurst, size: 85, x: '92%', y: '42%', delay: 1.5 },
  { src: patternDancer, size: 120, x: '4%', y: '48%', delay: 0.3 },
  { src: patternWave1, size: 115, x: '70%', y: '85%', delay: 1.0 },
  { src: patternWave2, size: 90, x: '32%', y: '8%', delay: 1.8 },
  { src: patternNote, size: 95, x: '58%', y: '20%', delay: 0.6 },
  { src: patternMusic, size: 95, x: '40%', y: '82%', delay: 1.3 },
  { src: patternDancer2, size: 125, x: '24%', y: '38%', delay: 0.4 },
  { src: patternDancer3, size: 80, x: '66%', y: '55%', delay: 1.1 },
  { src: patternPalm2, size: 100, x: '48%', y: '90%', delay: 0.7 },
  { src: patternTribal, size: 90, x: '93%', y: '25%', delay: 1.6 },
  { src: patternZigzag2, size: 85, x: '20%', y: '60%', delay: 0.9 },
  { src: patternPalm3, size: 115, x: '76%', y: '35%', delay: 1.4 },
  { src: patternPalm4, size: 90, x: '12%', y: '30%', delay: 0.2 },
  { src: patternHut, size: 115, x: '60%', y: '6%', delay: 1.7 },
  { src: patternFace, size: 80, x: '88%', y: '58%', delay: 0.55 },
  { src: patternPalm5, size: 100, x: '36%', y: '62%', delay: 1.05 },
  { src: patternSun, size: 105, x: '50%', y: '45%', delay: 0.85 },
  { src: patternNotes2, size: 75, x: '82%', y: '88%', delay: 1.35 },
  { src: patternDancer4, size: 120, x: '44%', y: '24%', delay: 0.15 },
];

const dramaticFade = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] as const },
};

const staggerItem = {
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.3 },
};

const Meny = () => {
  const location = useLocation();
  const { t, lang } = useLanguage();
  const [revealedCount, setRevealedCount] = useState(0);
  const [headerRevealed, setHeaderRevealed] = useState(false);
  const [view, setView] = useState<'festival' | 'catering'>('festival');
  const [flavorBoxMode, setFlavorBoxMode] = useState<'standard' | 'vegetarian' | 'vegan'>('standard');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const menuRef = useRef<HTMLDivElement>(null);

  // ── Catering menu state ──────────────────────────────────────────────
  const cateringItems = (cateringData as CateringItem[]).map(it => ({
    id: it.item_name,
    title: it.display_name,
    desc: it.item_description,
    priceType: it.price_type,
    count: it.count,
    cost: it.cost, // hidden — used only to compute internal total
  }));

  // ── Catering categories ──────────────────────────────────────────────
  const itemMetaById = Object.fromEntries(cateringItems.map(it => [it.id, it]));
  const scrollToCategory = (id: string) => {
    const el = document.getElementById(`cat-${id}`);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };
  const { quantities, setQty, inc, dec, clear, totalItems } = useCateringBasket();
  const [basketOpen, setBasketOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [offerSent, setOfferSent] = useState(false);
  const [offerForm, setOfferForm] = useState({
    name: '', email: '', phone: '', guests: '', date: '', eventType: '', allergies: '', notes: '',
  });
  const selectedEntries = cateringItems
    .map(it => ({ ...it, qty: quantities[it.id] || 0 }))
    .filter(it => it.qty > 0);
  const orderTotal = selectedEntries.reduce((sum, it) => sum + it.cost * it.qty, 0);
  const meetsMinimum = orderTotal >= MIN_ORDER_VALUE;

  useEffect(() => {
    if (location.hash === '#catering') {
      setView('catering');
    }
  }, [location.hash]);

  const handleSendOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...offerForm,
      items: selectedEntries.map(it => ({
        item_name: it.id,
        title: it.title,
        quantity: it.qty,
        unit_price: it.cost,
        line_total: it.cost * it.qty,
      })),
      order_total: orderTotal,
      submitted_at: new Date().toISOString(),
    };
    try {
      await fetch('https://meggamind.app.n8n.cloud/webhook/MenyCatering', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('MenyCatering webhook failed', err);
    }
    setOfferSent(true);
    setTimeout(() => {
      setCheckoutOpen(false);
      setBasketOpen(false);
      clear();
      setOfferForm({ name: '', email: '', phone: '', guests: '', date: '', eventType: '', allergies: '', notes: '' });
      setOfferSent(false);
    }, 2200);
  };

  // ── Catering rendering helpers ────────────────────────────────────────
  const pickL = (s: { sv: string; en: string }) => (lang === 'sv' ? s.sv : s.en);
  const peopleify = (txt: string) =>
    txt
      .replace(/\bportioner\b/gi, 'personer')
      .replace(/\bportions\b/gi, 'people')
      .replace(/\bportion\b/gi, 'person');

  const SNACK_BADGES: Record<string, { count: string; subSv: string; subEn: string }> = {
    sweet_flavors_mikate: {
      count: '6',
      subSv: 'st per box · räcker till ~6 personer',
      subEn: 'pcs per box · serves ~6 people',
    },
    samosa_pack: { count: '10', subSv: 'st per box', subEn: 'pcs per box' },
    mikate_pack: { count: '40', subSv: 'st per box', subEn: 'pcs per box' },
  };

  const STAFF_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
    hostess_patricia_2h: Crown,
    hostess_standard_2h: User,
    serving_staff_per_hour: Users,
    maskot_surprise: Drama,
    maskot_party_starter: Drama,
    maskot_full_exp: Drama,
  };
  const LOGISTICS_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
    pickup_arlov_kitchen: MapPin,
    delivery_local: Truck,
    'buffet_set_up_malmö_burlöv': LayoutGrid,
    setup_medium: Wrench,
    disposable_set: Utensils,
  };

  const TIER_COLORS: Record<string, [string, string, string]> = {
    packages: ['#5DCAA5', '#1D9E75', '#085041'],
    decoration: ['#FCD34D', '#F59E0B', '#B45309'],
    entertainment: ['#C4B5FD', '#8B5CF6', '#5B21B6'],
  };

  const staffDuration = (name: string): { sv: string; en: string } | null => {
    const n = name.toLowerCase();
    if (n.includes('per timme') || n.includes('per hour'))
      return { sv: 'Faktureras per timme', en: 'Billed per hour' };
    if (n.includes('1-timmes') || n.includes('1-hour') || n.includes('1 timme'))
      return { sv: '1 timme på plats', en: '1 hour on site' };
    if (n.includes('2 timmar') || n.includes('2-timmars') || n.includes('2-hour') || n.includes('2 hours'))
      return { sv: '2 timmar på plats', en: '2 hours on site' };
    if (n.includes('3-timmars') || n.includes('3-hour') || n.includes('3 timmar'))
      return { sv: '3 timmar på plats', en: '3 hours on site' };
    return null;
  };

  const QtySelector = ({ id, qty, atMax, compact = false }: { id: string; qty: number; atMax: boolean; compact?: boolean }) => {
    const sz = compact ? 'w-7 h-7' : 'w-9 h-9';
    const ic = compact ? 'w-3.5 h-3.5' : 'w-4 h-4';
    const num = compact ? 'text-sm min-w-6' : 'text-lg min-w-8';
    return (
      <div className={`flex items-center justify-center gap-2 ${compact ? '' : 'pt-2 mt-1'}`}>
        <button
          type="button"
          onClick={() => dec(id)}
          disabled={qty === 0}
          aria-label={t('Minska antal', 'Decrease quantity')}
          className={`${sz} rounded-full bg-white/15 border border-white/30 text-white backdrop-blur-md flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/25 transition`}
        >
          <Minus className={ic} />
        </button>
        <input
          type="number"
          min={0}
          value={qty}
          onChange={e => setQty(id, parseInt(e.target.value, 10))}
          className={`font-display font-extrabold text-white ${num} text-center tabular-nums bg-transparent border-none outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
        />
        <button
          type="button"
          onClick={() => !atMax && inc(id)}
          disabled={atMax}
          aria-label={t('Öka antal', 'Increase quantity')}
          className={`${sz} rounded-full bg-primary text-primary-foreground border border-white/30 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent transition`}
        >
          <Plus className={ic} />
        </button>
      </div>
    );
  };

  const GLASS_STYLE: React.CSSProperties = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 100%)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
  };

  const cardWrap = (id: string, qty: number, idx: number, children: React.ReactNode, extra = '') => (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: (idx % 6) * 0.05 }}
      className={`relative rounded-2xl overflow-hidden border transition-all flex flex-col ${qty > 0 ? 'border-white/60 shadow-[0_12px_40px_rgba(232,24,109,0.45)]' : 'border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.25)]'} ${extra}`}
      style={GLASS_STYLE}
    >
      {children}
    </motion.div>
  );

  const TagPill = ({ label }: { label: string }) => (
    <span className="inline-block text-[10px] md:text-xs uppercase tracking-wider font-bold text-white bg-white/15 border border-white/25 rounded-full px-2.5 py-1 backdrop-blur-md">
      {label}
    </span>
  );

  const QtyBadge = ({ qty }: { qty: number }) => (
    qty > 0 ? (
      <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full min-w-7 h-7 px-2 flex items-center justify-center shadow-lg">×{qty}</span>
    ) : null
  );

  // Template A — Boxes
  const renderTemplateA = (card: import('@/data/cateringMenuStructured').CardData, idx: number) => {
    const qty = quantities[card.id] || 0;
    const atMax = card.maxQty != null && qty >= card.maxQty;
    return cardWrap(card.id, qty, idx, (
      <div className="p-5 md:p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3"><TagPill label={pickL(card.tag)} /><QtyBadge qty={qty} /></div>
        <h4 className="font-display font-extrabold uppercase text-white text-xl md:text-2xl drop-shadow leading-tight">{pickL(card.name)}</h4>
        <p className="text-white/75 text-sm leading-snug -mt-1">{pickL(card.tagline)}</p>
        {card.hero && (
          <ul className="flex flex-col gap-1 mt-1">
            {card.hero.map((h, i) => (
              <li key={i} className="text-white font-medium text-[15px] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
                {pickL(h)}
              </li>
            ))}
          </ul>
        )}
        {card.servedWith && card.servedWith.length > 0 && (
          <div>
            <p className="text-[10px] md:text-xs uppercase tracking-wider font-bold text-white/55 mb-1.5">{t('Serveras med', 'Served with')}</p>
            <div className="flex flex-wrap gap-1.5">
              {card.servedWith.map((p, i) => (
                <span key={i} className="text-[11px] md:text-xs text-white/90 bg-white/10 border border-white/20 rounded-full px-2.5 py-0.5">{pickL(p)}</span>
              ))}
            </div>
          </div>
        )}
        {card.allergens && (
          <div className="mt-auto pt-2 border-t border-white/10">
            <p className="text-[10px] uppercase tracking-wider font-bold text-white/55 mb-1">
              {t('Allergener:', 'Allergens:')}
            </p>
            <p className="text-white/55 text-[10px] md:text-[11px] leading-snug whitespace-pre-line">{pickL(card.allergens)}</p>
          </div>
        )}
        <QtySelector id={card.id} qty={qty} atMax={atMax} />
      </div>
    ));
  };

  // Template B — Experiences
  const renderTemplateB = (card: import('@/data/cateringMenuStructured').CardData, idx: number) => {
    const qty = quantities[card.id] || 0;
    const atMax = card.maxQty != null && qty >= card.maxQty;
    const hasIncluded = card.twoColumn && card.twoColumn.included.length > 0;
    const hasAddons = card.twoColumn && card.twoColumn.addons.length > 0;
    return cardWrap(card.id, qty, idx, (
      <div className="p-5 md:p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3"><TagPill label={pickL(card.tag)} /><QtyBadge qty={qty} /></div>
        <h4 className="font-display font-extrabold uppercase text-white text-xl md:text-2xl drop-shadow leading-tight">{pickL(card.name)}</h4>
        <p className="text-white/75 text-sm leading-snug -mt-1">{pickL(card.tagline)}</p>

        {card.twoColumn && hasIncluded && hasAddons && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 mt-1 rounded-xl bg-white/5 border border-white/15 overflow-hidden">
            <div className="p-3 sm:border-r border-white/15">
              <p className="text-[10px] uppercase tracking-wider font-bold text-white/60 mb-1.5">{t('Ingår', 'Included')}</p>
              <ul className="flex flex-col gap-1 text-white/90 text-xs leading-snug">
                {card.twoColumn.included.map((c, i) => (
                  <li key={i} className="flex gap-2 items-start"><Check className="w-3 h-3 mt-0.5 text-secondary flex-shrink-0" />{peopleify(pickL(c))}</li>
                ))}
              </ul>
            </div>
            <div className="p-3">
              <p className="text-[10px] uppercase tracking-wider font-bold text-white/60 mb-1.5">{t('Tillägg', 'Add on')}</p>
              <ul className="flex flex-col gap-1 text-white/85 text-xs leading-snug">
                {card.twoColumn.addons.map((c, i) => (
                  <li key={i} className="flex gap-2 items-start"><Plus className="w-3 h-3 mt-0.5 text-accent flex-shrink-0" />{peopleify(pickL(c))}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {card.contents && card.contents.length > 0 && (!card.twoColumn || !hasIncluded) && (
          <ul className="flex flex-col gap-1.5 text-white/85 text-sm">
            {card.contents.map((c, i) => (
              <li key={i} className="flex gap-2 leading-snug items-start">
                <span className="w-1 h-1 rounded-full bg-secondary mt-2 flex-shrink-0" />
                <span>{peopleify(pickL(c))}</span>
              </li>
            ))}
          </ul>
        )}

        {card.twoColumn && !hasIncluded && hasAddons && (
          <div className="mt-1 pt-3 border-t border-white/10">
            <p className="text-[10px] uppercase tracking-wider font-bold text-white/60 mb-1.5">{t('Tillägg', 'Add on')}</p>
            <ul className="flex flex-col gap-1 text-white/85 text-xs leading-snug">
              {card.twoColumn.addons.map((c, i) => (
                <li key={i} className="flex gap-2 items-start"><Plus className="w-3 h-3 mt-0.5 text-accent flex-shrink-0" />{peopleify(pickL(c))}</li>
              ))}
            </ul>
          </div>
        )}

        {card.infoNote && (
          <div className="text-[11px] md:text-xs text-white/75 bg-white/5 border-l-2 border-white/30 rounded-r-md px-3 py-2 leading-snug flex gap-2 items-start">
            <Info className="w-3.5 h-3.5 mt-0.5 text-white/70 flex-shrink-0" />
            <span>{peopleify(pickL(card.infoNote))}</span>
          </div>
        )}
        {card.rightFor && <p className="text-white/65 text-xs italic">{pickL(card.rightFor)}</p>}
        {card.smallNote && <p className="text-white/55 text-[11px] italic leading-snug">{peopleify(pickL(card.smallNote))}</p>}

        <QtySelector id={card.id} qty={qty} atMax={atMax} />
      </div>
    ));
  };

  // Template C — Snacks & Dessert
  const renderTemplateC = (card: import('@/data/cateringMenuStructured').CardData, idx: number) => {
    const qty = quantities[card.id] || 0;
    const atMax = card.maxQty != null && qty >= card.maxQty;
    const badge = SNACK_BADGES[card.id];
    return cardWrap(card.id, qty, idx, (
      <div className="p-5 md:p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3"><TagPill label={pickL(card.tag)} /><QtyBadge qty={qty} /></div>
        <h4 className="font-display font-extrabold uppercase text-white text-xl md:text-2xl drop-shadow leading-tight">{pickL(card.name)}</h4>
        <p className="text-white/75 text-sm leading-snug -mt-1">{pickL(card.tagline)}</p>

        {badge && (
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 border border-amber-300/30" style={{ background: 'linear-gradient(135deg, rgba(252,211,77,0.18), rgba(245,158,11,0.10))' }}>
            <span className="font-display font-medium text-white text-[28px] leading-none">{badge.count}</span>
            <span className="text-white/80 text-xs leading-tight">{lang === 'sv' ? badge.subSv : badge.subEn}</span>
          </div>
        )}

        {card.contents && card.contents.length > 0 && (
          <ul className="flex flex-col gap-1.5 text-white/85 text-xs">
            {card.contents.map((c, i) => (
              <li key={i} className="flex gap-2 leading-snug items-start">
                <span className="w-1 h-1 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                <span>{peopleify(pickL(c))}</span>
              </li>
            ))}
          </ul>
        )}
        {card.smallNote && <p className="text-white/55 text-[11px] italic leading-snug">{peopleify(pickL(card.smallNote))}</p>}
        {card.allergens && (
          <div className="mt-auto pt-2 border-t border-white/10">
            <p className="text-[10px] uppercase tracking-wider font-bold text-white/55 mb-1">
              {t('Allergener:', 'Allergens:')}
            </p>
            <p className="text-white/55 text-[10px] md:text-[11px] leading-snug whitespace-pre-line">{pickL(card.allergens)}</p>
          </div>
        )}
        <QtySelector id={card.id} qty={qty} atMax={atMax} />
      </div>
    ));
  };

  // Template D — Bulk
  const renderTemplateD = (card: import('@/data/cateringMenuStructured').CardData, idx: number) => {
    const qty = quantities[card.id] || 0;
    const atMax = card.maxQty != null && qty >= card.maxQty;
    return cardWrap(card.id, qty, idx, (
      <div className="p-5 md:p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3"><TagPill label={pickL(card.tag)} /><QtyBadge qty={qty} /></div>
        <h4 className="font-display font-extrabold uppercase text-white text-xl md:text-2xl drop-shadow leading-tight">{pickL(card.name)}</h4>
        <p className="text-white/75 text-sm leading-snug -mt-1">{pickL(card.tagline)}</p>

        <div className="flex items-baseline gap-3 rounded-xl px-4 py-4 border border-emerald-300/30" style={{ background: 'linear-gradient(135deg, rgba(45,106,79,0.35), rgba(45,106,79,0.10))' }}>
          <span className="font-display font-medium text-emerald-200 text-[40px] leading-none">30</span>
          <span className="text-white/85 text-xs">{t('personer per order', 'people per order')}</span>
        </div>

        {card.contents && (
          <ul className="flex flex-col gap-1.5 text-white/85 text-sm">
            {card.contents.map((c, i) => (
              <li key={i} className="flex gap-2 leading-snug items-start">
                <span className="w-1 h-1 rounded-full bg-secondary mt-2 flex-shrink-0" />
                <span>{peopleify(pickL(c))}</span>
              </li>
            ))}
          </ul>
        )}
        {card.smallNote && <p className="text-white/55 text-[11px] italic leading-snug">{peopleify(pickL(card.smallNote))}</p>}
        <QtySelector id={card.id} qty={qty} atMax={atMax} />
      </div>
    ));
  };

  // Template E — Staff
  const renderTemplateE = (card: import('@/data/cateringMenuStructured').CardData, idx: number) => {
    const qty = quantities[card.id] || 0;
    const atMax = card.maxQty != null && qty >= card.maxQty;
    const Icon = STAFF_ICON[card.id] || User;
    const dur = staffDuration(pickL(card.name));
    return cardWrap(card.id, qty, idx, (
      <div className="p-5 md:p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3"><TagPill label={pickL(card.tag)} /><QtyBadge qty={qty} /></div>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-white/12 border border-white/25 flex items-center justify-center backdrop-blur-md flex-shrink-0">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-white text-base leading-tight">{pickL(card.name)}</p>
            {dur && <p className="text-white/65 text-xs mt-0.5">{lang === 'sv' ? dur.sv : dur.en}</p>}
          </div>
        </div>
        <p className="text-white/75 text-[13px] leading-relaxed">{pickL(card.tagline)}</p>
        {card.rightFor && (
          <p className="text-white/60 text-[11px] italic pt-2 border-t border-white/10">{pickL(card.rightFor)}</p>
        )}
        <QtySelector id={card.id} qty={qty} atMax={atMax} />
      </div>
    ));
  };

  // Template F — Logistics (horizontal tile)
  const renderTemplateF = (card: import('@/data/cateringMenuStructured').CardData, idx: number) => {
    const qty = quantities[card.id] || 0;
    const atMax = card.maxQty != null && qty >= card.maxQty;
    const Icon = LOGISTICS_ICON[card.id] || MapPin;
    return cardWrap(card.id, qty, idx, (
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white/12 border border-white/20 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4.5 h-4.5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-white text-sm leading-tight">{pickL(card.name)}</p>
          <p className="text-white/65 text-[11px] mt-0.5 leading-snug">{pickL(card.tagline)}</p>
          {card.contents && card.contents.length > 0 && (
            <ul className="mt-1 flex flex-col gap-0.5">
              {card.contents.map((c, i) => (
                <li key={i} className="text-white/70 text-[11px] flex gap-1.5 items-start leading-snug">
                  <span className="w-1 h-1 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                  {pickL(c)}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex-shrink-0">
          <QtySelector id={card.id} qty={qty} atMax={atMax} compact />
        </div>
      </div>
    ), 'min-h-0');
  };

  // Template G — Tiered packages (one unified card per section)
  const renderTemplateG = (sec: import('@/data/cateringMenuStructured').SectionData) => {
    const colors = TIER_COLORS[sec.id] || ['#5DCAA5', '#1D9E75', '#085041'];
    const firstTag = sec.cards[0] ? pickL(sec.cards[0].tag) : '';
    const sectionTotalQty = sec.cards.reduce((sum, c) => sum + (quantities[c.id] || 0), 0);
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5 }}
        className={`relative rounded-2xl overflow-hidden border ${sectionTotalQty > 0 ? 'border-white/60 shadow-[0_12px_40px_rgba(232,24,109,0.45)]' : 'border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.25)]'}`}
        style={GLASS_STYLE}
      >
        <div className="p-5 md:p-6">
          <div className="mb-4"><TagPill label={firstTag} /></div>
          <div className="flex flex-col">
            {sec.cards.map((card, i) => {
              const qty = quantities[card.id] || 0;
              const atMax = card.maxQty != null && qty >= card.maxQty;
              const tierIdx = (card.accentTier || 1) - 1;
              const accent = colors[tierIdx];
              const isLast = i === sec.cards.length - 1;
              return (
                <div key={card.id} className={`flex items-stretch gap-3 py-4 ${isLast ? '' : 'border-b border-white/10'}`}>
                  <div className="w-1 rounded-full self-stretch flex-shrink-0" style={{ background: accent }} aria-hidden />
                  <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white text-[14px] leading-tight break-words">{pickL(card.name)}</p>
                      <p className="text-white/70 text-xs mt-1 leading-relaxed break-words">{pickL(card.tagline)}</p>
                      {card.rightFor && <p className="text-white/55 text-[11px] italic mt-1 break-words">{pickL(card.rightFor)}</p>}
                      {card.smallNote && <p className="text-white/50 text-[10px] italic mt-1 break-words">{peopleify(pickL(card.smallNote))}</p>}
                      {card.contents && card.contents.length > 0 && (
                        <ul className="mt-2 flex flex-col gap-0.5">
                          {card.contents.map((c, j) => (
                            <li key={j} className="text-white/75 text-[11px] flex gap-1.5 items-start leading-snug break-words">
                              <span className="w-1 h-1 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                              <span className="min-w-0 break-words">{peopleify(pickL(c))}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="mt-3 sm:mt-0 flex items-center justify-start sm:justify-end flex-shrink-0">
                      <QtySelector id={card.id} qty={qty} atMax={atMax} compact />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  };

  // ── Airy item renderer (unified for every catering section) ──────────
  // Brochures available in /public/sources (same source folder used on the
  // Helhetsupplevelse page). Per-item overrides take precedence; otherwise
  // a section-level default brochure is used.
  const BROCHURE_BY_SECTION: Record<string, { url: string; name: string } | undefined> = {
    boxes: { url: '/sources/03_FB_CateringBuffeupplevelseA5_Q1_2026_1.png', name: 'Flavor-Boss-Catering-Buffe.png' },
    bulk: { url: '/sources/ta_med_dig_flavorn_hem.png', name: 'Flavor-Boss-Take-Home.png' },
    packages: { url: '/sources/05_FB_LightCateringExp_A5_1.png', name: 'Flavor-Boss-Light-Catering.png' },
    decoration: { url: '/sources/Dekorations_upplevelse.png', name: 'Flavor-Boss-Dekoration.png' },
    entertainment: { url: '/sources/dj_paket.png', name: 'Flavor-Boss-DJ-Paket.png' },
    experiences: { url: '/sources/05_FB_LightCateringExp_A5_1.png', name: 'Flavor-Boss-Light-Catering.png' },
    snacks: { url: '/sources/add_something_sweet.png', name: 'Flavor-Boss-Sweet-Mikaté.png' },
  };
  const BROCHURE_BY_ITEM: Record<string, { url: string; name: string }> = {
    flavorbox: { url: '/sources/Flavor_box.png', name: 'Flavor-Boss-Flavor-Box.png' },
    snack_box: { url: snackBoxBrochure.url, name: 'Flavor-Boss-Snack-Box.pdf' },
    snack_box_with_corn: { url: snackBoxBrochure.url, name: 'Flavor-Boss-Snack-Box.pdf' },
    sweet_flavors_mikate: { url: '/sources/add_something_sweet.png', name: 'Flavor-Boss-Sweet-Mikaté.png' },
    samosa_mikate_snack: { url: '/sources/samosa-mikate-brochure.png', name: 'Flavor-Boss-Samosa-Mikaté.png' },
    samosa_pack: { url: '/sources/samosa-mikate-brochure.png', name: 'Flavor-Boss-Samosa-Mikaté.png' },
    food_truck_base: { url: '/sources/food_truck_upplevelse.png', name: 'Flavor-Boss-Foodtruck.png' },
    grill_experience_base: { url: '/sources/grillupplevelse.png', name: 'Flavor-Boss-Grill.png' },
    flavor_booze_truck_base: { url: '/sources/09_FB_FlavorBoozeTruck_A5_Q1_2026_1.png', name: 'Flavor-Boss-Booze-Truck.png' },
  };

  const AiryItem = ({
    card,
    sectionId,
    featured = false,
    imageOverlay,
  }: {
    card: import('@/data/cateringMenuStructured').CardData;
    sectionId: string;
    featured?: boolean;
    imageOverlay?: ReactNode;
  }) => {
    const [open, setOpen] = useState(false);
    const qty = quantities[card.id] || 0;
    const atMax = card.maxQty != null && qty >= card.maxQty;
    const brochure = BROCHURE_BY_ITEM[card.id] || BROCHURE_BY_SECTION[sectionId];

    const hasIncluded = card.twoColumn && card.twoColumn.included.length > 0;
    const hasAddons = card.twoColumn && card.twoColumn.addons.length > 0;
    const hasDetails =
      (card.hero && card.hero.length > 0) ||
      (card.servedWith && card.servedWith.length > 0) ||
      (card.contents && card.contents.length > 0) ||
      hasIncluded || hasAddons ||
      !!card.infoNote || !!card.rightFor || !!card.smallNote || !!card.allergens;

    return (
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5 }}
        className={featured
          ? "relative grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 p-5 md:p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/[0.02] ring-1 ring-white/20 shadow-[0_20px_60px_-20px_rgba(232,24,109,0.35)]"
          : "flex flex-col gap-5"}
      >
        {/* 4x Streetfood Vinnare tag removed per request */}
        {/* Image placeholder */}
        <div className={`relative w-full ${featured ? 'md:col-span-3 aspect-[4/3] md:aspect-[4/3]' : 'aspect-[4/3]'} rounded-2xl overflow-hidden ring-1 ring-white/15 bg-neutral-700`}>
          {CARD_IMAGE_BY_ID[card.id] ? (
            <img
              src={CARD_IMAGE_BY_ID[card.id]}
              alt={pickL(card.name)}
              loading="eager"
              className={`absolute inset-0 w-full h-full object-cover ${CARD_IMAGE_SCALE[card.id] ?? ''}`}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/40">
              <ImageIcon className="w-10 h-10" />
              <span className="text-[10px] uppercase tracking-wider font-bold">{t('Bild kommer', 'Image coming')}</span>
            </div>
          )}
          {card.awardTag && CARD_IMAGE_BY_ID[card.id] && (
            <span
              className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 text-[10px] md:text-xs uppercase tracking-wider font-extrabold text-white px-3 py-1.5 rounded-full shadow-lg"
              style={{ backgroundImage: 'linear-gradient(135deg, #ff632b 0%, #E8186D 100%)' }}
            >
              <Award className="w-3.5 h-3.5" />
              {pickL(card.awardTag)}
            </span>
          )}
          {qty > 0 && (
            <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold rounded-full min-w-7 h-7 px-2 flex items-center justify-center shadow-lg">
              ×{qty}
            </span>
          )}
          {imageOverlay}
        </div>

        <div className={featured ? "md:col-span-2 flex flex-col gap-5" : "contents"}>
        {card.awardTag && !CARD_IMAGE_BY_ID[card.id] && (
          <span
            className="self-start inline-flex items-center gap-1.5 text-[10px] md:text-xs uppercase tracking-wider font-extrabold text-white px-3 py-1.5 rounded-full shadow-lg"
            style={{ backgroundImage: 'linear-gradient(135deg, #ff632b 0%, #E8186D 100%)' }}
          >
            <Award className="w-3.5 h-3.5" />
            {pickL(card.awardTag)}
          </span>
        )}
        {/* Floating title */}
        <h4 className={`font-display font-extrabold uppercase text-white leading-tight drop-shadow ${featured ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
          {pickL(card.name)}
        </h4>

        {/* Floating description */}
        <motion.div
          animate={{ opacity: open ? 0 : 1, height: open ? 0 : 'auto', marginBottom: open ? 0 : undefined }}
          initial={false}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
          className="flex flex-col gap-2"
        >
          <p className="text-white/85 text-sm md:text-base leading-relaxed">
            {pickL(card.tagline)}
          </p>
          {card.tagline2 && (
            <p className="text-white/85 text-sm md:text-base leading-relaxed">
              {pickL(card.tagline2)}
            </p>
          )}
        </motion.div>

        {/* Läs mer toggle */}
        {hasDetails && (
          <div>
            <button
              type="button"
              onClick={() => setOpen(o => !o)}
              className="inline-flex items-center gap-1.5 text-white/90 text-sm font-medium underline underline-offset-4 decoration-white/50 hover:decoration-white transition"
              aria-expanded={open}
            >
              {open ? t('Visa mindre', 'Show less') : t('Läs mer', 'Read more')}
              <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-4 flex flex-col gap-4 text-white/85"
              >
                {card.hero && card.hero.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-white/55 mb-1.5">
                      {card.heroLabel ? pickL(card.heroLabel) : t('I fokus', 'Featured')}
                    </p>
                    <ul className="flex flex-col gap-1">
                      {card.hero.map((h, i) => (
                        <li key={i} className="flex flex-col gap-1.5">
                          <div className="text-white text-[15px] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
                            {pickL(h)}
                          </div>
                          {card.heroSeparatorLabel && i < card.hero!.length - 1 && (
                            <p className="text-[10px] uppercase tracking-wider font-bold text-white/55 pl-3.5">
                              {pickL(card.heroSeparatorLabel)}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {card.servedWith && card.servedWith.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-white/55 mb-1.5">
                      {card.servedWithLabel ? pickL(card.servedWithLabel) : t('Serveras med', 'Served with')}
                    </p>
                    <ul className="flex flex-col gap-1 text-sm">
                      {card.servedWith.map((p, i) => (
                        <li key={i} className="flex gap-2 items-start leading-snug">
                          <span className="w-1 h-1 rounded-full bg-secondary mt-2 flex-shrink-0" />
                          {pickL(p)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {card.extraSection && card.extraSection.items.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-white/55 mb-1.5">
                      {pickL(card.extraSection.label)}
                    </p>
                    <ul className="flex flex-col gap-1 text-sm">
                      {card.extraSection.items.map((p, i) => (
                        <li key={i} className="flex gap-2 items-start leading-snug">
                          <span className="w-1 h-1 rounded-full bg-secondary mt-2 flex-shrink-0" />
                          {pickL(p)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {hasIncluded && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-white/55 mb-1.5">
                      {t('Ingår', 'Included')}
                    </p>
                    <ul className="flex flex-col gap-1 text-sm">
                      {card.twoColumn!.included.map((c, i) => (
                        <li key={i} className="flex gap-2 items-start leading-snug">
                          <Check className="w-3.5 h-3.5 mt-1 text-secondary flex-shrink-0" />
                          {peopleify(pickL(c))}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {hasAddons && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-white/55 mb-1.5">
                      {t('Tillägg', 'Add on')}
                    </p>
                    <ul className="flex flex-col gap-1 text-sm">
                      {card.twoColumn!.addons.map((c, i) => (
                        <li key={i} className="flex gap-2 items-start leading-snug">
                          <Plus className="w-3.5 h-3.5 mt-1 text-accent flex-shrink-0" />
                          {peopleify(pickL(c))}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {card.contents && card.contents.length > 0 && !hasIncluded && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-white/55 mb-1.5">
                      {t('Innehåller', 'Includes')}
                    </p>
                    <ul className="flex flex-col gap-1 text-sm">
                      {card.contents.map((c, i) => (
                        <li key={i} className="flex gap-2 items-start leading-snug">
                          <span className="w-1 h-1 rounded-full bg-secondary mt-2 flex-shrink-0" />
                          {peopleify(pickL(c))}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {card.infoNote && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-white/55 mb-1.5">
                      {t('Bra att veta', 'Good to know')}
                    </p>
                    <p className="text-sm leading-relaxed">{peopleify(pickL(card.infoNote))}</p>
                  </div>
                )}

                {card.rightFor && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-white/55 mb-1.5">
                      {t('Passar för', 'Right for')}
                    </p>
                    <p className="text-sm italic leading-relaxed">{pickL(card.rightFor)}</p>
                  </div>
                )}

                {card.smallNote && (
                  <p className="text-white/60 text-xs italic leading-snug">{peopleify(pickL(card.smallNote))}</p>
                )}

                {card.allergens && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-white/55 mb-1.5">
                      {t('Allergener:', 'Allergens:')}
                    </p>
                    <p className="text-white/70 text-xs leading-snug whitespace-pre-line">{pickL(card.allergens)}</p>
                  </div>
                )}

                {/* Brochure download intentionally hidden from users; keep code for future re-enable. */}
                {false && brochure && (
                  <a
                    href={brochure.url}
                    download={brochure.name}
                    className="inline-flex items-center gap-2 self-start text-white text-sm font-bold uppercase tracking-wider px-4 py-2.5 rounded-full border border-white/30 hover:bg-white/10 transition"
                  >
                    <Download className="w-4 h-4" />
                    {t('Ladda ner broschyr', 'Download brochure')}
                  </a>
                )}
              </motion.div>
            )}
          </div>
        )}

        {/* Quantity controls */}
        <div className="pt-1">
          <QtySelector id={card.id} qty={qty} atMax={atMax} />
        </div>
        </div>
      </motion.article>
    );
  };

  const SnackBoxToggle = ({
    plain,
    corn,
    sectionId,
  }: {
    plain: import('@/data/cateringMenuStructured').CardData;
    corn: import('@/data/cateringMenuStructured').CardData;
    sectionId: string;
  }) => {
    const [withCorn, setWithCorn] = useState(false);
    const active = withCorn ? corn : plain;
    return (
      <AiryItem
        card={active}
        sectionId={sectionId}
        imageOverlay={(
          <div className="absolute inset-x-3 bottom-3 z-10">
            <div className="inline-flex max-w-full items-center gap-1 rounded-full border border-white/25 bg-black/50 p-1 shadow-lg backdrop-blur-md">
              <button
                type="button"
                onClick={() => setWithCorn(false)}
                className={`rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider transition md:text-xs ${
                  !withCorn ? 'bg-white text-neutral-900 shadow' : 'text-white/85 hover:text-white'
                }`}
              >
                {t('Utan majs', 'No corn')}
              </button>
              <button
                type="button"
                onClick={() => setWithCorn(true)}
                className={`rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider transition md:text-xs ${
                  withCorn ? 'bg-white text-neutral-900 shadow' : 'text-white/85 hover:text-white'
                }`}
              >
                {t('Med majs', 'With corn')}
              </button>
            </div>
          </div>
        )}
      />
    );
  };

  const renderJerkWrapShowcase = (badgeText: string, expandKey: string) => {
    const isOpen = !!expandedCards[expandKey];
    const desc = t(
      'Grillad kaneldoftande Jamaican jerk chicken eller jerk cauliflower, grillad majs i vitlöksolja och coleslaw serveras i bröd tillsammans med Beroendeframkallande kongolesiska donuts "Mikate", Boss Garlic Sauce & FlavorHeat Dancing Hot Sauce',
      'Served with our Champion congolese donuts "Mikate" (2 pcs), coleslaw, grilled corn in garlic oil, wrapped in bread & our signature sauces.'
    );
    const items = [
      { text: t('Grillad Jamaican Fusion Jerk Chicken Eller Jerk Cauliflower', 'Grilled Jamaican Fusion Jerk Chicken Or Jerk Cauliflower'), color: 'bg-primary' },
      { text: t('Grillad Majs I Vitlöksolja', 'Grilled Corn In Garlic Oil'), color: 'bg-accent' },
      { text: 'Coleslaw', color: 'bg-accent' },
      { text: t('Vår sweetfood Champion - Vinnande Kongolesiska donuts Mikaté', 'Our Sweetfood Champion - Winning Congolese donuts Mikaté'), color: 'bg-secondary' },
      { text: t('Serveras i bröd', 'Served in bread'), color: 'bg-surface-yellow', note: t('Tillsammans med:', 'Together with:') as string },
      { text: t('Våra signatursåser Boss Garlic Sauce', 'Our signature Boss Garlic Sauce'), color: 'bg-surface-yellow' },
      { text: 'FlavorHeat Dancing Hotsauce', color: 'bg-surface-yellow' },
    ] as { text: string; color: string; note?: string }[];
    const allergens = t(
      'Innehåller:\nLaktos: Coleslaw & Vitlökssås\nÄgg: Coleslaw & Vitlökssås\nBaljväxter/soja: Jerkmarinad\nGluten: Mikaté',
      'Contains:\nLactose: Coleslaw & Garlic Sauce\nEgg: Coleslaw & Garlic Sauce\nLegumes/soy: Jerk Marinade\nGluten: Mikaté'
    );
    return (
      <div className="relative">
        <div className="relative bg-primary-foreground/10 backdrop-blur-sm rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-l-4 border-secondary flex flex-row">
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute z-10 right-2 sm:right-3 md:right-5 lg:right-6 top-1/2 -translate-y-1/2"
          >
            <img
              src={jerkWrapIcon}
              alt=""
              className="drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)] opacity-95 animate-float-y w-24 sm:w-28 md:w-36 lg:w-40 h-auto object-contain"
            />
          </div>
          <div className="p-3 sm:p-5 md:p-7 flex flex-col justify-center min-w-0 flex-1 pr-32 sm:pr-44 md:pr-60 lg:pr-68 min-h-32 sm:min-h-40 md:min-h-52 lg:min-h-60">
            <h2 className="font-display text-xl md:text-3xl font-extrabold uppercase text-secondary mb-1 md:mb-2 leading-tight">JERK WRAP</h2>
            <p className="text-primary-foreground/70 text-xs md:text-base mb-2 md:mb-4 leading-snug md:leading-relaxed">{desc}</p>
            <button
              type="button"
              onClick={() => setExpandedCards(s => ({ ...s, [expandKey]: !s[expandKey] }))}
              className="mt-1 self-start text-[11px] md:text-xs font-bold uppercase tracking-wider text-primary-foreground underline underline-offset-4 decoration-primary-foreground/60 hover:decoration-primary-foreground"
              aria-expanded={isOpen}
            >
              {isOpen ? t('Visa mindre', 'Show less') : t('Läs mer', 'Read more')}
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="expanded"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ height: { duration: 0.45, ease: [0.25, 1, 0.5, 1] }, opacity: { duration: 0.3, ease: 'easeInOut' } }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="mt-3 flex flex-col gap-3 md:gap-4">
                    <ul className="flex flex-col gap-1.5 md:gap-2 text-[11px] min-[380px]:text-xs md:text-base text-primary-foreground">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className={`w-1.5 h-1.5 md:w-2 md:h-2 mt-1.5 md:mt-2 rounded-full ${item.color} flex-shrink-0`} />
                          <span className="leading-snug">
                            {item.text}
                            {item.note && (
                              <span className="block text-[10px] md:text-xs italic opacity-75 mt-0.5">{item.note}</span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-1">
                      <p className="text-[10px] md:text-xs uppercase tracking-wider font-bold text-primary-foreground/70">
                        {t('Allergener:', 'Allergens:')}
                      </p>
                      <p className="text-[10px] md:text-xs text-primary-foreground/60 italic leading-snug whitespace-pre-line">
                        {allergens}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <span className="absolute -top-2 -right-2 z-20 funky-gradient text-primary-foreground px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-xl ring-2 ring-white/40 whitespace-nowrap">
          {badgeText}
        </span>
      </div>
    );
  };

  const renderSectionBody = (sec: import('@/data/cateringMenuStructured').SectionData) => {
    const cols = 'md:grid-cols-2 xl:grid-cols-3';
    if (sec.id === 'boxes') {
      const featured = sec.cards.find(c => c.id === 'flavorbox');
      const snackPlain = sec.cards.find(c => c.id === 'snack_box');
      const snackCorn = sec.cards.find(c => c.id === 'snack_box_with_corn');
      const jerkBox = sec.cards.find(c => c.id === 'jerk_box');
      const rest = sec.cards.filter(
        c => c.id !== 'flavorbox' && c.id !== 'snack_box' && c.id !== 'snack_box_with_corn' && c.id !== 'jerk_box' && itemMetaById[c.id]
      );
      return (
        <div className="flex flex-col gap-12 md:gap-16">
          {featured && itemMetaById[featured.id] && (
            <AiryItem card={featured} sectionId={sec.id} featured />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
            {snackPlain && snackCorn && itemMetaById[snackPlain.id] && itemMetaById[snackCorn.id] && (
              <SnackBoxToggle plain={snackPlain} corn={snackCorn} sectionId={sec.id} />
            )}
            {jerkBox && itemMetaById[jerkBox.id] && (
              <AiryItem card={jerkBox} sectionId={sec.id} />
            )}
          </div>
          <div className={`grid grid-cols-1 ${cols} gap-10 md:gap-14`}>
            {rest.map(card => <AiryItem key={card.id} card={card} sectionId={sec.id} />)}
          </div>
          {renderJerkWrapShowcase(t('Ny på Menyn', 'New on the menu'), 'jerk_wrap_catering')}
        </div>
      );
    }
    if (sec.id === 'snacks') {
      const featured = sec.cards.find(c => c.id === 'sweet_flavors_mikate');
      const rest = sec.cards.filter(c => c.id !== 'sweet_flavors_mikate' && itemMetaById[c.id]);
      return (
        <div className="flex flex-col gap-12 md:gap-16">
          {featured && itemMetaById[featured.id] && (
            <AiryItem
              card={featured}
              sectionId={sec.id}
              featured
            />
          )}
          {rest.length > 0 && (
            <div className={`grid grid-cols-1 ${cols} gap-10 md:gap-14`}>
              {rest.map(card => <AiryItem key={card.id} card={card} sectionId={sec.id} />)}
            </div>
          )}
        </div>
      );
    }
    return (
      <div className={`grid grid-cols-1 ${cols} gap-10 md:gap-14`}>
        {sec.cards.map(card => itemMetaById[card.id]
          ? <AiryItem key={card.id} card={card} sectionId={sec.id} />
          : null
        )}
      </div>
    );
  };

  const visibleCardCount = 8;
  const allRevealed = revealedCount >= visibleCardCount;

  // Hide navbar on menu entry and only reveal it when the user scrolls upward
  useEffect(() => {
    if (view === 'catering') {
      window.dispatchEvent(new Event('navbar:show'));
      return;
    }
    window.dispatchEvent(new Event('navbar:hide'));

    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      window.dispatchEvent(new Event(currentY < lastY ? 'navbar:show' : 'navbar:hide'));
      lastY = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.dispatchEvent(new Event('navbar:show'));
    };
  }, [view]);

  // After 1s of empty screen, start revealing cards one by one
  useEffect(() => {
    const start = setTimeout(() => setRevealedCount(1), 1000);
    return () => clearTimeout(start);
  }, []);

  // Land the user already centered on the first menu card row — no visible scroll glitch.
  useEffect(() => {
    if (view !== 'festival') return;
    let raf1 = 0;
    let raf2 = 0;
    const scrollToCenter = () => {
      if (!menuRef.current) return;
      const el = menuRef.current;
      const firstCard = el.querySelector<HTMLElement>(':scope > *') ?? el;
      const rect = firstCard.getBoundingClientRect();
      const cardCenter = rect.top + window.scrollY + rect.height / 2;
      const top = cardCenter - window.innerHeight / 2;
      window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
    };
    // Wait two frames so layout (fonts, images, gradient) is settled before the instant jump.
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(scrollToCenter);
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [view]);

  return (
    <>
      <SEOHead
        title={t('Vår Meny — Jerk Chicken, Jollof Rice & mer', 'Our Menu — Jerk Chicken, Jollof Rice & more')}
        description={t(
          'Flavor-Boss signaturrätt: Jamaican Jerk Chicken, Jollof Rice, Mikaté-donuts & mer. Sverigemästare i streetfood 2022–2025.',
          'Flavor-Boss signature dishes: Jamaican Jerk Chicken, Jollof Rice, Mikaté donuts & more. Swedish champions in street food 2022–2025.'
        )}
        canonical="https://www.flavorboss.se/meny"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Menu',
          name: 'Flavor-Boss Meny',
          description:
            'Afro-karibisk streetfood-meny: festival- och cateringalternativ med jerk chicken, jollof rice, mikate-donuts, vegetariskt, veganskt och halal.',
          hasMenuSection: [
            {
              '@type': 'MenuSection',
              name: 'Festivalmeny',
              description: 'Snabb streetfood serverad från foodtrucken på festivaler och event.',
            },
            {
              '@type': 'MenuSection',
              name: 'Cateringmeny',
              description: 'Buffe- och cateringalternativ för bröllop, företagsevent och privata fester.',
            },
          ],
        }}
      />
      <main id="main-content">
        {view === 'festival' && (
        <section className="relative overflow-hidden px-0 py-8 sm:py-10 md:py-16">
          {/* Animated gradient background */}
          <div className="absolute inset-0 animate-gradient-shift" style={{
            background: 'linear-gradient(180deg, #660745 0%, #a7342a 25%, #fb7007 50%, #f48c0d 75%, #ffb83c 100%)',
            backgroundSize: '100% 400%',
          }} />

          {/* Dancing pattern icons — between gradient and grid */}
          {floatingPatterns.map((icon, i) => (
            <motion.img
              key={i}
              src={icon.src}
              alt=""
              className="absolute pointer-events-none select-none"
              style={{
                left: icon.x,
                top: icon.y,
                width: icon.size,
                height: icon.size,
                objectFit: 'contain',
                opacity: 0.5,
                filter: 'brightness(1.3) drop-shadow(0 2px 8px rgba(0,0,0,0.1))',
                zIndex: 1,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 0.5,
                scale: 1,
                y: [0, -18, 5, -12, 0],
                x: [0, 10, -8, 12, 0],
                rotate: [0, 20, -15, 25, -10, 0],
              }}
              transition={{
                opacity: { duration: 0.6, delay: icon.delay },
                scale: { duration: 0.6, delay: icon.delay },
                y: { duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: icon.delay },
                x: { duration: 5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: icon.delay },
                rotate: { duration: 3.5 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: icon.delay },
              }}
            />
          ))}

          {/* Organic dot pattern overlay */}
          <div className="absolute inset-0 opacity-[0.08]" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, hsl(0 0% 100%) 1px, transparent 1px), radial-gradient(circle at 75% 75%, hsl(0 0% 100%) 1px, transparent 1px)',
            backgroundSize: '60px 60px, 40px 40px',
            zIndex: 2,
          }} />

          <div className="absolute -top-16 -left-16 w-56 h-56 bg-primary-foreground/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary-foreground/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />

          <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: 'linear-gradient(90deg, hsl(45 95% 55%), hsl(22 95% 52%), hsl(332 90% 48%), hsl(160 60% 28%))' }} />
          <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{ background: 'linear-gradient(90deg, hsl(160 60% 28%), hsl(332 90% 48%), hsl(22 95% 52%), hsl(45 95% 55%))' }} />

          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-2 sm:px-4 md:px-8">
            {/* Title with dramatic entrance */}
            <motion.h1
              initial={{ opacity: 0, y: 80, scale: 0.8 }}
              animate={headerRevealed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.8 }}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
              className="text-3xl md:text-6xl lg:text-7xl font-display font-extrabold text-center mb-2 text-primary-foreground uppercase"
            >
              {t('Festival-Meny', 'Festival Menu')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={headerRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm md:text-subheading text-primary-foreground/80 text-center mb-4"
            >
              {t('Prisbelönt afro-karibisk streetfood', 'Award-winning Afro-Caribbean street food')}
            </motion.p>

            {/* Champion badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={headerRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-center mb-8"
            >
              {[
                t('Sveriges bästa streetfood 4 år i rad', 'Sweden\'s best street food 4 years running'),
                t('Nordiska mästare', 'Nordic champions'),
                t('Mest kreativ rätt', 'Most creative dish'),
                t('Barnens favorit', 'Kids\' favorite'),
              ].map((text, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={headerRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 200, damping: 12 }}
                  className="flex items-center gap-2 text-primary-foreground/90 text-[10px] md:text-sm font-display font-bold uppercase tracking-wider"
                >
                  <Trophy className="w-4 h-4 text-surface-yellow flex-shrink-0" />
                  {text}
                </motion.span>
              ))}
            </motion.div>

            {/* Festival / Catering toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex justify-center mb-8"
            >
              <div className="inline-flex items-center bg-black/30 backdrop-blur-md rounded-full p-1 shadow-lg border border-primary-foreground/20">
                <button
                  type="button"
                  onClick={() => setView('festival')}
                  className={`px-5 py-2 rounded-full text-sm font-display font-bold uppercase tracking-wider transition-all ${view === 'festival' ? 'bg-primary text-primary-foreground shadow' : 'text-primary-foreground/70 hover:text-primary-foreground'}`}
                >
                  {t('Festival', 'Festival')}
                </button>
                <button
                  type="button"
                  onClick={() => setView('catering')}
                  className={`px-5 py-2 rounded-full text-sm font-display font-bold uppercase tracking-wider transition-all ${(view as string) === 'catering' ? 'bg-primary text-primary-foreground shadow' : 'text-primary-foreground/70 hover:text-primary-foreground'}`}
                >
                  {t('Catering', 'Catering')}
                </button>
              </div>
            </motion.div>

            {/* Menu Cards — one per row, image left, text right */}
            <div ref={menuRef} className="grid grid-cols-1 gap-4 md:gap-6 max-w-3xl mx-auto">
              {(() => {
                const mikateRow = { text: t('Vår sweetfood Champion - Vinnande Kongolesiska donuts Mikaté', 'Our Sweetfood Champion - Winning Congolese donuts Mikaté'), color: 'bg-secondary' };
                const samosaRow = { text: t('Krispiga Västafrikanska Piroger Samosa', 'Crispy West African Samosas'), color: 'bg-secondary' };
                const samosaRowFlavorBox = { text: t('Krispig Västafrikansk Pirog Samosa (1st)', 'Crispy West African Samosa (1pc)'), color: 'bg-secondary' };
                const jerkChickenRow = { text: t('Grillad Jamaican Fusion Jerk Chicken', 'Grilled Jamaican Fusion Jerk Chicken'), color: 'bg-primary' };
                const jerkCauliflowerRow = { text: t('Jerk Cauliflower (Vegan)', 'Jerk Cauliflower (Vegan)'), color: 'bg-secondary' };
                const flavorBoxVariants = {
                  standard: {
                    title: 'FLAVOR BOX',
                    image: menuFlavorBoxImg,
                    desc: t(
                      'Vår signaturbox – Fyrfaldig vinnare av streetfood-SM. finns även som vegetarisk och vegansk variant.',
                      'our signature box, four-time winner of streetfood-SM. also available vegetarian and vegan.'
                    ),
                    items: [
                      jerkChickenRow,
                      jerkCauliflowerRow,
                      { text: 'Jollof Rice', color: 'bg-accent' },
                      { text: 'Coleslaw', color: 'bg-accent' },
                      { text: t('Grillad Majs I Vitlöksolja', 'Grilled Corn In Garlic Oil'), color: 'bg-primary' },
                      mikateRow,
                      samosaRowFlavorBox,
                    ],
                    servedOn: [
                      { text: 'Flavor-Heat Dancing Hot Sauce', color: 'bg-primary' },
                      { text: 'Boss Garlic Sauce', color: 'bg-surface-yellow' },
                    ],
                     allergens: t(
                       'Innehåller:\nGluten: Mikaté & Samosa\nLaktos: Vitlökssås, Coleslaw & Samosa\nÄgg: Vitlökssås & Coleslaw\nBaljväxter/soja: Jerkmarinad',
                       'Contains:\nGluten: Mikaté & Samosa\nLactose: Garlic Sauce, Coleslaw & Samosa\nEgg: Garlic Sauce & Coleslaw\nLegumes/soy: Jerk Marinade'
                     ),
                   },
                   vegetarian: {
                    title: 'FLAVOR BOX — VEGETARIAN',
                    image: null,
                    desc: t(
                      'Vår signaturbox i vegetarisk variant. Finns även som standard och vegansk variant.',
                      'Our signature box, fully vegetarian. Also available as standard and vegan.'
                    ),
                    items: [
                      jerkCauliflowerRow,
                      { text: 'Jollof Rice', color: 'bg-accent' },
                      { text: 'Coleslaw', color: 'bg-accent' },
                      { text: t('Grillad Majs I Vitlöksolja', 'Grilled Corn In Garlic Oil'), color: 'bg-primary' },
                      mikateRow,
                      samosaRowFlavorBox,
                    ],
                    servedOn: [
                      { text: 'Flavor-Heat Dancing Hot Sauce', color: 'bg-primary' },
                      { text: 'Boss Garlic Sauce', color: 'bg-surface-yellow' },
                    ],
                    allergens: t(
                      'Innehåller:\nGluten: Mikaté & Samosa\nLaktos: Vitlökssås, Coleslaw & Samosa\nÄgg: Vitlökssås & Coleslaw\nBaljväxter/soja: Jerkmarinad',
                      'Contains:\nGluten: Mikaté & Samosa\nLactose: Garlic Sauce, Coleslaw & Samosa\nEgg: Garlic Sauce & Coleslaw\nLegumes/soy: Jerk Marinade'
                    ),
                   },
                   vegan: {
                    title: 'FLAVOR BOX — VEGAN',
                    image: null,
                    desc: t(
                      'Vår signaturbox i vegansk variant. Finns även som standard och vegetarisk variant.',
                      'Our signature box, fully vegan. Also available as standard and vegetarian.'
                    ),
                    items: [
                      jerkCauliflowerRow,
                      { text: 'Jollof Rice', color: 'bg-accent' },
                      { text: t('Extra Grillad Majs I Vitlöksolja', 'Extra Grilled Corn In Garlic Oil'), color: 'bg-primary' },
                      mikateRow,
                    ],
                    servedOn: [
                      { text: 'Flavor-Heat Dancing Hot Sauce', color: 'bg-primary' },
                    ],
                     allergens: t(
                       'Innehåller:\nGluten: Mikaté\nBaljväxter/soja: Jerkmarinad',
                       'Contains:\nGluten: Mikaté\nLegumes/soy: Jerk Marinade'
                     ),
                  },
                } as const;
                const fbv = flavorBoxVariants[flavorBoxMode];
                const cards = [
                {
                  id: 'flavor_box',
                  title: fbv.title,
                  image: fbv.image,
                  alt: 'Flavor Box',
                  badge: t('4x SM-vinnare', '4x Championship Winner'),
                  border: 'border-surface-yellow',
                  titleClass: 'funky-gradient-text',
                  desc: fbv.desc,
                  items: fbv.items,
                  servedOn: fbv.servedOn,
                  servedOnLabel: t('Serveras på sidan:', 'Served on the side:'),
                  modeSwitch: true,
                  allergens: fbv.allergens,
                  show: true,
                },
                {
                  id: 'samosa_box',
                  title: 'SAMOSA BOX',
                  image: menuSamosaBoxImg,
                  alt: 'Samosa Box',
                  badge: null,
                  border: 'border-primary',
                  titleClass: 'warm-gradient-text',
                  desc: t(
                    'Krispiga Västafrikanska Piroger med Kött eller Vegetarisk Fyllning',
                    'Crispy West African pastries with meat or vegetarian filling.'
                  ),
                  items: [
                    { text: t('Grillad Majs I Vitlöksolja', 'Grilled Corn In Garlic Oil'), color: 'bg-primary' },
                    mikateRow,
                    { text: 'Boss Garlic Sauce', color: 'bg-surface-yellow' },
                    { text: 'Flavor-Heat Dancing Hot Sauce', color: 'bg-primary' },
                    samosaRow,
                  ],
                  allergens: t(
                    'Innehåller:\nGluten: Mikaté & Samosa\nLaktos: Boss Garlic Sauce & Samosa',
                    'Contains:\nGluten: Mikaté & Samosa\nLactose: Boss Garlic Sauce & Samosa'
                  ),
                  show: true,
                },
                {
                  id: 'jerk_wrap',
                  title: 'JERK WRAP',
                  image: null,
                  alt: 'Jerk Wrap',
                  badge: t('Limited Edition', 'Limited Edition'),
                  border: 'border-secondary',
                  titleClass: 'text-secondary',
                  desc: t(
                    'Grillad kaneldoftande Jamaican jerk chicken eller jerk cauliflower, grillad majs i vitlöksolja och coleslaw serveras i bröd tillsammans med Beroendeframkallande kongolesiska donuts "Mikate", Boss Garlic Sauce & FlavorHeat Dancing Hot Sauce',
                    'Served with our Champion congolese donuts "Mikate" (2 pcs), coleslaw, grilled corn in garlic oil, wrapped in bread & our signature sauces.'
                  ),
                  items: [
                    { text: t('Grillad Jamaican Fusion Jerk Chicken Eller Jerk Cauliflower', 'Grilled Jamaican Fusion Jerk Chicken Or Jerk Cauliflower'), color: 'bg-primary' },
                    { text: t('Grillad Majs I Vitlöksolja', 'Grilled Corn In Garlic Oil'), color: 'bg-accent' },
                    { text: 'Coleslaw', color: 'bg-accent' },
                    { text: t('Vår sweetfood Champion - Vinnande Kongolesiska donuts Mikaté', 'Our Sweetfood Champion - Winning Congolese donuts Mikaté'), color: 'bg-secondary' },
                    { text: t('Serveras i bröd', 'Served in bread'), color: 'bg-surface-yellow', note: t('Tillsammans med:', 'Together with:') },
                    { text: t('Våra signatursåser Boss Garlic Sauce', 'Our signature Boss Garlic Sauce'), color: 'bg-surface-yellow' },
                    { text: 'FlavorHeat Dancing Hotsauce', color: 'bg-surface-yellow' },
                  ],
                  floatingIcon: jerkWrapIcon,
                  allergens: t(
                    'Innehåller:\nLaktos: Coleslaw & Vitlökssås\nÄgg: Coleslaw & Vitlökssås\nBaljväxter/soja: Jerkmarinad\nGluten: Mikaté',
                    'Contains:\nLactose: Coleslaw & Garlic Sauce\nEgg: Coleslaw & Garlic Sauce\nLegumes/soy: Jerk Marinade\nGluten: Mikaté'
                  ),
                  show: true,
                },
                {
                  id: 'sweet_flavors',
                  title: 'SWEET FLAVORS DELUXE',
                  image: menuSweetFlavorsDeluxeAsset,
                  alt: 'Sweet Flavors Deluxe',
                  badge: t('SM-vinnare dessert 2025', 'SM Dessert Winner 2025'),
                  border: 'border-surface-yellow',
                  titleClass: 'warm-gradient-text',
                  desc: t(
                    'Prisbelönta söta kongolesiska Donuts "Mikaté" (6pcs) serveras med valfri topping.',
                    'Award-winning sweet Congolese donuts "Mikaté" (6pcs) served with your choice of topping.'
                  ),
                  items: [],
                  servedOn: [
                    { text: t('Oreo crush + choklad & vit choklad', 'Oreo crush + chocolate & white chocolate'), color: 'bg-secondary' },
                    { text: t('Lotus crush + salted caramel', 'Lotus crush + salted caramel'), color: 'bg-surface-yellow' },
                  ],
                  servedOnLabel: t('Välj Topping:', 'Choose Topping:'),
                  servedOnSeparator: t('Eller', 'Or'),
                  allergens: t(
                    'Gluten (Mikaté).\nKan innehålla laktos & nötter (topping)',
                    'Gluten (Mikaté).\nMay contain lactose & nuts (topping)'
                  ),
                  show: true,
                },
                {
                  id: 'sides_addons',
                   title: t('TILLÄGG', 'ADD-ONS'),
                  image: null,
                  alt: 'Sides & Extra Add-Ons',
                  badge: null,
                  border: 'border-accent',
                  titleClass: 'text-accent',
                  desc: t(
                    'Tillbehör & Sides som höjer upplevelsen ytterligare',
                    'Sides & extras that take the experience up a notch'
                  ),
                  items: [
                    { text: t('Vår sweetfood Champion - Vinnande Kongolesiska donuts Mikaté', 'Our Sweetfood Champion - Winning Congolese donuts Mikaté'), color: 'bg-secondary' },
                    { text: t('Grillad Majs I Vitlöksolja', 'Grilled Corn In Garlic Oil'), color: 'bg-accent' },
                    { text: t('Krispigt Friterad Plantain', 'Crispy Fried Plantain'), color: 'bg-surface-yellow' },
                    { text: t('Jerk Chicken / Jerk Cauliflower', 'Jerk Chicken / Jerk Cauliflower'), color: 'bg-primary' },
                    { text: 'Boss Garlic Sauce', color: 'bg-surface-yellow' },
                    { text: 'Flavor-Heat Dancing Hot Sauce', color: 'bg-primary' },
                    { text: 'Samosa', color: 'bg-secondary' },
                  ],
                  show: true,
                },
              ].filter(card => card.show);
              return cards.map((card, idx) => (
                <div key={card.title} className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={revealedCount > idx ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                  onAnimationComplete={() => {
                    if (revealedCount === idx + 1 && idx + 1 < cards.length) {
                      setRevealedCount(idx + 2);
                    }
                    if (idx === 2 && !headerRevealed) {
                      setTimeout(() => setHeaderRevealed(true), 500);
                    }
                  }}
                   className={`relative bg-primary-foreground/10 backdrop-blur-sm rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-l-4 ${card.border} flex flex-row ${['flavor_box', 'samosa_box', 'sweet_flavors'].includes((card as { id?: string }).id || '') ? 'animate-neon-cyan' : ''}`}
                >
                  {(() => {
                    const cardId = (card as { id?: string }).id || card.title;
                    const isOpen = !!expandedCards[cardId];
                    const growImage = isOpen && (cardId === 'flavor_box' || cardId === 'samosa_box');
                    return (<>
                  {/* Phone-format image on the LEFT — only if image exists */}
                   {card.image && (
                      <div className={`relative flex-shrink-0 w-[40%] max-w-48 sm:w-56 md:w-64 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${growImage ? 'self-stretch' : 'self-start'}`}>
                       <img
                         src={card.image}
                         alt={card.alt}
                         className={`w-full block transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${growImage ? 'h-full object-cover' : 'h-auto object-contain'}`}
                       />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      {card.badge && (
                        <div className="absolute bottom-2 left-2 right-2">
                          <span className="funky-gradient text-primary-foreground px-2 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-lg inline-block">
                            {card.badge}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  {(card as { floatingIcon?: string }).floatingIcon && (
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none select-none absolute z-10 ${
                        card.id === 'jerk_wrap'
                          ? 'right-2 sm:right-3 md:right-5 lg:right-6 top-1/2 -translate-y-1/2'
                          : '-right-2 sm:right-2 md:right-4 bottom-0 translate-y-1/2'
                      }`}
                    >
                      <img
                        src={(card as { floatingIcon: string }).floatingIcon}
                        alt=""
                        className={`drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)] opacity-95 animate-float-y ${
                          card.id === 'jerk_wrap'
                            ? 'w-24 sm:w-28 md:w-36 lg:w-40 h-auto object-contain'
                            : 'w-24 sm:w-32 md:w-44 lg:w-52'
                        }`}
                      />
                    </div>
                  )}
                  {/* Text area on the RIGHT — auto-sized to content with padding */}
                  <div className={`p-3 sm:p-5 md:p-7 flex flex-col justify-center min-w-0 flex-1 ${(card as { floatingIcon?: string }).floatingIcon ? 'pr-32 sm:pr-44 md:pr-60 lg:pr-68 min-h-32 sm:min-h-40 md:min-h-52 lg:min-h-60' : ''}`}>
                     {(card as { modeSwitch?: boolean }).modeSwitch && (
                       <div className="flex gap-1 mb-2 self-end bg-black/30 rounded-full p-1 border border-white/20">
                         {(['standard', 'vegetarian', 'vegan'] as const).map(mode => (
                           <button
                             key={mode}
                             type="button"
                             onClick={() => setFlavorBoxMode(mode)}
                             className={`px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wider transition-all ${flavorBoxMode === mode ? 'bg-primary text-primary-foreground shadow' : 'text-primary-foreground/70 hover:text-primary-foreground'}`}
                           >
                             {mode === 'standard' ? t('Standard', 'Standard') : mode === 'vegetarian' ? t('Veg', 'Veg') : t('Vegan', 'Vegan')}
                           </button>
                         ))}
                       </div>
                     )}
                    <h2 className={`font-display text-xl md:text-3xl font-extrabold uppercase ${card.titleClass} mb-1 md:mb-2 leading-tight`}>{card.title}</h2>
                     <p className="text-primary-foreground/70 text-xs md:text-base mb-2 md:mb-4 leading-snug md:leading-relaxed">{card.desc}</p>
                    {(() => {
                      const cardId = (card as { id?: string }).id || card.title;
                      const isOpen = !!expandedCards[cardId];
                      const servedOn = (card as { servedOn?: { text: string; color: string }[] }).servedOn;
                      const servedOnLabel = (card as { servedOnLabel?: string }).servedOnLabel;
                      const servedOnSeparator = (card as { servedOnSeparator?: string }).servedOnSeparator;
                      const details = (card as { details?: string[] }).details;
                      const allergens = (card as { allergens?: string }).allergens;
                      const hasExpand = (card.items && card.items.length > 0) || !!servedOn || !!details || !!allergens;
                      if (!hasExpand) return null;
                      // Sides/add-ons card shows its items inline without a Läs mer toggle
                      if (cardId === 'sides_addons') {
                        return (
                          <div className="mt-3 flex flex-col gap-3 md:gap-4">
                            {card.items && card.items.length > 0 && (
                              <ul className="flex flex-col gap-1.5 md:gap-2 text-[11px] min-[380px]:text-xs md:text-base text-primary-foreground">
                                {card.items.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2.5">
                                    <span className={`w-1.5 h-1.5 md:w-2 md:h-2 mt-1.5 md:mt-2 rounded-full ${item.color} flex-shrink-0`} />
                                    <span className="leading-snug">
                                      {item.text}
                                      {(item as any).note && (
                                        <span className="block text-[10px] md:text-xs italic opacity-75 mt-0.5">{(item as any).note}</span>
                                      )}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      }
                      return (
                        <>
                          <button
                            type="button"
                            onClick={() => setExpandedCards(s => ({ ...s, [cardId]: !s[cardId] }))}
                            className="mt-1 self-start text-[11px] md:text-xs font-bold uppercase tracking-wider text-primary-foreground underline underline-offset-4 decoration-primary-foreground/60 hover:decoration-primary-foreground"
                            aria-expanded={isOpen}
                          >
                            {isOpen ? t('Visa mindre', 'Show less') : t('Läs mer', 'Read more')}
                          </button>
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                key="expanded"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ height: { duration: 0.45, ease: [0.25, 1, 0.5, 1] }, opacity: { duration: 0.3, ease: 'easeInOut' } }}
                                style={{ overflow: 'hidden' }}
                              >
                                <div className="mt-3 flex flex-col gap-3 md:gap-4">
                              {card.items && card.items.length > 0 && (
                                <ul className="flex flex-col gap-1.5 md:gap-2 text-[11px] min-[380px]:text-xs md:text-base text-primary-foreground">
                                  {card.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2.5">
                                      <span className={`w-1.5 h-1.5 md:w-2 md:h-2 mt-1.5 md:mt-2 rounded-full ${item.color} flex-shrink-0`} />
                                      <span className="leading-snug">
                                        {item.text}
                                        {(item as any).note && (
                                          <span className="block text-[10px] md:text-xs italic opacity-75 mt-0.5">{(item as any).note}</span>
                                        )}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {servedOn && (
                                <div>
                                  <p className="text-[10px] md:text-xs uppercase tracking-wider font-bold text-primary-foreground/70 mb-1.5">
                                    {servedOnLabel}
                                  </p>
                                  <ul className="flex flex-col gap-1.5 md:gap-2 text-[11px] min-[380px]:text-xs md:text-base text-primary-foreground">
                                    {servedOn.map((item, i) => (
                                      <div key={i} className="flex flex-col gap-1.5">
                                        <li className="flex items-start gap-2.5">
                                          <span className={`w-1.5 h-1.5 md:w-2 md:h-2 mt-1.5 md:mt-2 rounded-full ${item.color} flex-shrink-0`} />
                                          <span className="leading-snug">{item.text}</span>
                                        </li>
                                        {servedOnSeparator && i < servedOn.length - 1 && (
                                          <p className="text-[10px] md:text-xs uppercase tracking-wider font-bold text-primary-foreground/70 pl-4">
                                            {servedOnSeparator}
                                          </p>
                                        )}
                                      </div>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {details && (
                                <div className="p-3 rounded-lg bg-black/25 border border-white/15">
                                  <p className="text-[10px] md:text-xs uppercase tracking-wider font-bold text-primary-foreground/70 mb-1.5">
                                    {t('Innehåller', 'Includes')}
                                  </p>
                                  <ul className="flex flex-col gap-1 text-[11px] min-[380px]:text-xs md:text-sm text-primary-foreground">
                                    {details.map((d, i) => (
                                      <li key={i} className="flex items-start gap-2">
                                        <span className="w-1 h-1 mt-1.5 rounded-full bg-primary-foreground/60 flex-shrink-0" />
                                        <span className="leading-snug">{d}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {allergens && (
                                <div className="space-y-1">
                                  <p className="text-[10px] md:text-xs uppercase tracking-wider font-bold text-primary-foreground/70">
                                    {t('Allergener:', 'Allergens:')}
                                  </p>
                                  <p className="text-[10px] md:text-xs text-primary-foreground/60 italic leading-snug whitespace-pre-line">
                                    {allergens}
                                  </p>
                                </div>
                              )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      );
                    })()}
                  </div>
                  </>);
                  })()}
                </motion.div>
                {!card.image && card.badge && (
                  <span className="absolute -top-2 -right-2 z-20 funky-gradient text-primary-foreground px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-xl ring-2 ring-white/40 whitespace-nowrap">
                    {card.badge}
                  </span>
                )}
                </div>
              ));
              })()}
             </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={allRevealed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 1.1 }}
              className="text-center mt-12 font-display text-2xl md:text-3xl font-extrabold text-primary-foreground uppercase tracking-wide"
            >
              Vegan, vegetarian, gluten free… we got you all!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={allRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="text-center mt-8"
            >
              <Button variant="hero" size="lg" asChild className="shadow-[0_4px_20px_hsla(22,95%,52%,0.5)]">
                <Link to="/boka-oss" onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}>{t('Boka catering i Malmö', 'Book catering in Malmö')}</Link>
              </Button>
            </motion.div>
          </div>
        </section>
        )}

        {view === 'catering' && (<>
        {/* ═══════════════════════════════════════════════════════════════
            CATERING MENU — pick-and-choose with basket & checkout
            ═══════════════════════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden pt-4 pb-12 md:py-20 animate-gradient-shift"
          style={{
            background: 'linear-gradient(135deg, #F07020 0%, #E8186D 35%, #7A1E9C 70%, #2A0A45 100%)',
            backgroundSize: '200% 200%',
          }}
        >
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, hsl(22 95% 35%) 1px, transparent 1px), radial-gradient(circle at 75% 75%, hsl(332 90% 48%) 1px, transparent 1px)',
            backgroundSize: '60px 60px, 40px 40px',
          }} />

          {/* Journey-style cinematic pattern overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)' }} />
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.img
              src={journeyPalm}
              alt=""
              className="absolute -top-10 -right-10 w-[55vw] max-w-[700px] opacity-[0.18] select-none"
              animate={{ rotate: [0, 8, -3, 0], y: [0, -15, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
              style={{ filter: 'brightness(1.4)' }}
            />
            <motion.img
              src={journeyBurst}
              alt=""
              className="absolute -bottom-16 -left-12 w-[45vw] max-w-[600px] opacity-[0.12] select-none"
              animate={{ rotate: [0, -10, 5, 0], y: [0, 10, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
              style={{ filter: 'brightness(1.4)' }}
            />
            <motion.img
              src={journeyTribal}
              alt=""
              className="absolute top-[30%] -left-16 w-[35vw] max-w-[500px] opacity-[0.10] select-none"
              animate={{ rotate: [0, 6, -4, 0], x: [0, 12, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
              style={{ filter: 'brightness(1.4)' }}
            />
            <motion.img
              src={journeyMask}
              alt=""
              className="absolute top-[55%] right-[8%] w-[28vw] max-w-[420px] opacity-[0.12] select-none"
              animate={{ rotate: [0, -8, 6, 0], y: [0, -10, 0] }}
              transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
              style={{ filter: 'brightness(1.4)' }}
            />
            <motion.img
              src={journeySun}
              alt=""
              className="absolute top-[8%] left-[10%] w-[22vw] max-w-[340px] opacity-[0.10] select-none"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              style={{ filter: 'brightness(1.4)' }}
            />
            <motion.img
              src={journeyDancer}
              alt=""
              className="absolute bottom-[12%] right-[18%] w-[20vw] max-w-[300px] opacity-[0.12] select-none"
              animate={{ rotate: [0, 10, -6, 0], y: [0, -12, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
              style={{ filter: 'brightness(1.4)' }}
            />
            <motion.img
              src={journeyZigzag}
              alt=""
              className="absolute top-[45%] left-[42%] w-[24vw] max-w-[360px] opacity-[0.07] select-none"
              animate={{ rotate: [0, -5, 4, 0] }}
              transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
              style={{ filter: 'brightness(1.4)' }}
            />
            <motion.img
              src={journeyWave1}
              alt=""
              className="absolute top-[75%] left-[30%] w-[26vw] max-w-[380px] opacity-[0.09] select-none"
              animate={{ x: [0, 14, -10, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
              style={{ filter: 'brightness(1.4)' }}
            />
            <motion.img
              src={journeyNote}
              alt=""
              className="absolute top-[20%] right-[28%] w-[16vw] max-w-[240px] opacity-[0.10] select-none"
              animate={{ rotate: [0, 12, -8, 0], y: [0, -8, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              style={{ filter: 'brightness(1.4)' }}
            />
            <motion.img
              src={journeyHut}
              alt=""
              className="absolute bottom-[28%] left-[20%] w-[18vw] max-w-[260px] opacity-[0.10] select-none"
              animate={{ rotate: [0, -6, 4, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
              style={{ filter: 'brightness(1.4)' }}
            />
            <img src={patternWhiteImg} alt="" className="absolute top-[40%] left-[5%] w-[22%] opacity-[0.04] -rotate-6" />
            <img src={patternOrangeImg} alt="" className="absolute top-[18%] right-[40%] w-[18%] opacity-[0.05] rotate-12" />
            <img src={patternGreenImg} alt="" className="absolute bottom-[8%] right-[12%] w-[20%] opacity-[0.04]" />
          </div>

          {/* Dancing pattern icons background */}
          {floatingPatterns.map((icon, i) => (
            <motion.img
              key={`cat-pattern-${i}`}
              src={icon.src}
              alt=""
              className="absolute pointer-events-none select-none"
              style={{
                left: icon.x,
                top: icon.y,
                width: icon.size,
                height: icon.size,
                objectFit: 'contain',
                opacity: 0.35,
                filter: 'brightness(1.3) drop-shadow(0 2px 8px rgba(0,0,0,0.15))',
                zIndex: 1,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 0.35,
                scale: 1,
                y: [0, -18, 5, -12, 0],
                x: [0, 10, -8, 12, 0],
                rotate: [0, 20, -15, 25, -10, 0],
              }}
              transition={{
                opacity: { duration: 0.6, delay: icon.delay },
                scale: { duration: 0.6, delay: icon.delay },
                y: { duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: icon.delay },
                x: { duration: 5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: icon.delay },
                rotate: { duration: 3.5 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: icon.delay },
              }}
            />
          ))}

          <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 md:px-8">
            {/* ── MOBILE HERO (single image, text + toggle overlay, fits above fold) ── */}
            <div className="lg:hidden relative mb-6">
              <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl ring-2 ring-white/20" style={{ height: 'min(58svh, 460px)' }}>
                <img
                  src={cateringHeroMobileAsset}
                  alt=""
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="inline-flex items-center bg-black/50 backdrop-blur-md rounded-full p-1 shadow-lg border border-white/25 mb-4">
                    <button
                      type="button"
                      onClick={() => { setView('festival'); window.scrollTo({ top: 0, behavior: 'auto' }); }}
                      className="px-4 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider text-white/80 hover:text-white transition-all"
                    >
                      {t('Festival', 'Festival')}
                    </button>
                    <button
                      type="button"
                      className="px-4 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider bg-primary text-primary-foreground shadow transition-all"
                    >
                      {t('Catering', 'Catering')}
                    </button>
                  </div>
                  <h2 className="text-[2rem] leading-[1.05] font-display font-extrabold uppercase text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                    {t('Boka din catering upplevelse', 'Book your catering experience')}
                  </h2>
                  <p className="mt-3 text-white text-sm max-w-xs mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                    {t(
                      'Välj rätterna ni vill ha — justera antal och skicka en offertförfrågan.',
                      'Pick the dishes you want — adjust quantities and send an inquiry.'
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* ── DESKTOP HERO (unchanged: three images with overlay) ── */}
            <div className="hidden lg:block relative mb-4 md:mb-0 sm:px-6 md:px-10">
              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {[cateringHeroLeftAsset, cateringHeroMiddleAsset, cateringHeroRightAsset].map((src, i) => (
                    <motion.img
                      key={i}
                      src={src}
                      alt=""
                      loading="eager"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="w-full aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/5] object-cover rounded-2xl shadow-2xl ring-2 ring-white/20"
                    />
                  ))}
                </div>

                {/* Overlay: toggle + heading + subtitle, centered over the image row */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                >
                  <div className="flex justify-center mb-6 pointer-events-auto">
                    <div className="inline-flex items-center bg-black/50 backdrop-blur-md rounded-full p-1 shadow-lg border border-white/25">
                      <button
                        type="button"
                        onClick={() => { setView('festival'); window.scrollTo({ top: 0, behavior: 'auto' }); }}
                        className="px-5 py-2 rounded-full text-sm font-display font-bold uppercase tracking-wider text-white/80 hover:text-white transition-all"
                      >
                        {t('Festival', 'Festival')}
                      </button>
                      <button
                        type="button"
                        className="px-5 py-2 rounded-full text-sm font-display font-bold uppercase tracking-wider bg-primary text-primary-foreground shadow transition-all"
                      >
                        {t('Catering', 'Catering')}
                      </button>
                    </div>
                  </div>

                  <h2 className="text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[7rem] leading-[1.05] md:leading-[0.9] font-display font-extrabold uppercase text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]">
                    {t('Boka din catering upplevelse', 'Book your catering experience')}
                  </h2>
                  <p className="mt-4 md:mt-6 text-white text-base md:text-lg max-w-xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    {t(
                      'Välj rätterna ni vill ha — justera antal och skicka en offertförfrågan.',
                      'Pick the dishes you want — adjust quantities and send an inquiry.'
                    )}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Category navigation buttons */}
            <motion.nav
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="mt-4 md:mt-12 mb-16 md:mb-20 flex flex-wrap justify-center gap-x-6 gap-y-10 md:gap-x-14 md:gap-y-16"
              aria-label={t('Kategorinavigering', 'Category navigation')}
            >
              {cateringSections.map(cat => {
                const moved = movedCateringSectionIds.includes(cat.id);
                const meta: Record<string, { img: string; Icon: typeof Utensils }> = {
                  boxes: { img: cateringNavBuffeAsset, Icon: Utensils },
                  snacks: { img: menuSweetFlavorsDeluxeAsset, Icon: Cookie },
                  snack_erbjudanden: { img: cateringSamosaMikatéSnackAsset, Icon: Cookie },
                  bulk: { img: cateringNavBulk, Icon: Boxes },
                  packages: { img: cateringNavPaketAsset, Icon: Crown },
                  experiences: { img: cateringNavUpplevelserAsset, Icon: Sparkles },
                  staff: { img: cateringNavStaffAsset, Icon: Utensils },
                  entertainment: { img: cateringNavEntertainmentAsset, Icon: Utensils },
                  decoration: { img: cateringNavDecorationAsset, Icon: Sparkles },
                };
                const m = cat.id === 'logistics'
                  ? { img: cateringLogisticsNavAsset, Icon: Truck }
                  : meta[cat.id] ?? { img: menuCarousel1, Icon: Utensils };
                const Icon = m.Icon;
                const commonClass = 'group relative flex flex-col items-center w-20 md:w-36 transition-transform hover:-translate-y-1';
                const inner = (
                  <>
                    <div className="relative w-20 h-20 md:w-36 md:h-36 rounded-full overflow-hidden bg-white border-[3px] md:border-4 border-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] ring-2 ring-white/40 ring-offset-2 ring-offset-transparent">
                      <img
                        src={m.img}
                        alt=""
                        loading="eager"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span
                      className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 inline-flex items-center gap-1 md:gap-1.5 px-2 py-1 md:px-3 md:py-1.5 rounded-full text-white text-[9px] md:text-xs font-extrabold uppercase tracking-wider shadow-lg whitespace-nowrap"
                      style={{ background: '#ff632b' }}
                    >
                      <Icon className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      {lang === 'sv' ? cat.title.sv : cat.title.en}
                    </span>
                  </>
                );
                if (moved) {
                  return (
                    <Link key={cat.id} to={`/upplevelser#cat-${cat.id}`} className={commonClass}>
                      {inner}
                    </Link>
                  );
                }
                return (
                  <button key={cat.id} type="button" onClick={() => scrollToCategory(cat.id)} className={commonClass}>
                    {inner}
                  </button>
                );
              })}
            </motion.nav>

            {/* Categorized items — frosted glass cards */}
            {cateringSections.filter(s => !movedCateringSectionIds.includes(s.id)).map((sec, secIdx) => (
              <div key={sec.id}>
                {secIdx > 0 && secIdx % 3 === 0 && (
                  <HungerCarousel label={t('Mer smak på vägen', 'More flavor along the way')} />
                )}
                <div id={`cat-${sec.id}`} className="mb-14 scroll-mt-32">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="h-px flex-1 bg-white/30" />
                    <h3 className="text-xl md:text-3xl font-display font-extrabold uppercase text-white text-center drop-shadow whitespace-nowrap px-2">
                      [ {lang === 'sv' ? sec.title.sv : sec.title.en} ]
                    </h3>
                    <div className="h-px flex-1 bg-white/30" />
                  </div>
                  {(lang === 'sv' ? sec.subtitle.sv : sec.subtitle.en) && (
                    <p className="text-center text-white/70 text-xs md:text-sm mb-6 max-w-xl mx-auto italic">
                      {lang === 'sv' ? sec.subtitle.sv : sec.subtitle.en}
                    </p>
                  )}
                  {renderSectionBody(sec)}
                </div>
              </div>
            ))}
          </div>

          {/* Floating Basket Button — top-right, follows scroll, clear of navbar */}
          <button
            type="button"
            onClick={() => setBasketOpen(true)}
            aria-label={t('Visa korg', 'View basket')}
            className="fixed top-24 right-6 z-40 w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center text-white transition-all hover:scale-105 ring-2 ring-white/40"
            style={{ background: 'linear-gradient(135deg, #E8186D, #F07020)' }}
          >
            <ShoppingBasket className="w-7 h-7" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-surface-yellow text-foreground text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-md border-2 border-white">
                {totalItems}
              </span>
            )}
          </button>

          {/* Basket Drawer */}
          {basketOpen && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4" onClick={() => setBasketOpen(false)}>
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                onClick={e => e.stopPropagation()}
                className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
              >
                <div className="flex items-center justify-between p-5 border-b border-border">
                  <h3 className="font-display font-extrabold uppercase text-xl flex items-center gap-2">
                    <ShoppingBasket className="w-5 h-5 text-primary" />
                    {t('Din korg', 'Your basket')}
                  </h3>
                  <button onClick={() => setBasketOpen(false)} aria-label={t('Stäng', 'Close')} className="p-2 hover:bg-muted rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-5 space-y-3">
                  {selectedEntries.length === 0 ? (
                    <p className="text-center text-foreground/60 py-12">
                      {t('Korgen är tom. Lägg till rätter för att fortsätta.', 'Your basket is empty. Add dishes to continue.')}
                    </p>
                  ) : (
                    selectedEntries.map(it => (
                      <div key={it.id} className="flex items-center gap-3 bg-muted/50 rounded-xl p-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm truncate">{it.title}</p>
                          <p className="text-xs text-foreground/60">{t('Antal', 'Quantity')}: {it.qty}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => dec(it.id)} className="w-7 h-7 rounded-full bg-white shadow flex items-center justify-center"><Minus className="w-3.5 h-3.5" /></button>
                          <input
                            type="number"
                            min={0}
                            value={it.qty}
                            onChange={e => setQty(it.id, parseInt(e.target.value, 10))}
                            className="w-12 text-center font-bold text-sm bg-transparent border border-border rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <button onClick={() => inc(it.id)} className="w-7 h-7 rounded-full bg-primary text-primary-foreground shadow flex items-center justify-center"><Plus className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-5 border-t border-border bg-muted/30">
                  <button
                    type="button"
                    disabled={selectedEntries.length === 0 || !meetsMinimum}
                    onClick={() => { setBasketOpen(false); setCheckoutOpen(true); }}
                    className="w-full h-12 rounded-xl font-display font-bold uppercase tracking-wide text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(90deg, #E8186D, #F07020)' }}
                  >
                    {t('Fortsätt vidare', 'Continue')}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  {selectedEntries.length > 0 && !meetsMinimum && (
                    <p className="mt-2 text-xs text-center text-destructive font-semibold">
                      {t(
                        `Vår minsta order är ${MIN_ORDER_VALUE} kr. Lägg till några rätter till för att fortsätta.`,
                        `Our minimum order is ${MIN_ORDER_VALUE} kr. Add a few more items to continue.`,
                      )}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          )}

          {/* Checkout / Survey Modal */}
          {checkoutOpen && (
            <div
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4"
              onMouseDown={(e) => {
                if (!offerSent && e.target === e.currentTarget) setCheckoutOpen(false);
              }}
            >
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                onMouseDown={e => e.stopPropagation()}
                onClick={e => e.stopPropagation()}
                className="bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
              >
                <div className="flex items-center justify-between p-5 border-b border-border">
                  <h3 className="font-display font-extrabold uppercase text-xl">
                    {t('Offertförfrågan', 'Inquiry details')}
                  </h3>
                  <button onClick={() => setCheckoutOpen(false)} aria-label={t('Stäng', 'Close')} className="p-2 hover:bg-muted rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {offerSent ? (
                  <div className="p-10 text-center flex-1 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center mb-4">
                      <Send className="w-7 h-7" />
                    </div>
                    <h4 className="font-display font-extrabold text-2xl uppercase mb-2">{t('Tack!', 'Thank you!')}</h4>
                    <p className="text-foreground/70">{t('Vi återkommer med en offert inom kort.', 'We will get back to you with an offer shortly.')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSendOffer} className="flex-1 overflow-y-auto p-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="block">
                        <span className="text-xs font-bold block mb-1">{t('Namn', 'Name')}</span>
                        <input required value={offerForm.name} onChange={e => setOfferForm({ ...offerForm, name: e.target.value })} className="w-full h-11 px-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm" />
                      </label>
                      <label className="block">
                        <span className="text-xs font-bold block mb-1">{t('Antal gäster', 'Number of guests')}</span>
                        <input type="number" min="1" required value={offerForm.guests} onChange={e => setOfferForm({ ...offerForm, guests: e.target.value })} className="w-full h-11 px-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm" />
                      </label>
                      <label className="block">
                        <span className="text-xs font-bold block mb-1">{t('E-post', 'Email')}</span>
                        <input type="email" required value={offerForm.email} onChange={e => setOfferForm({ ...offerForm, email: e.target.value })} className="w-full h-11 px-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm" />
                      </label>
                      <label className="block">
                        <span className="text-xs font-bold block mb-1">{t('Telefon', 'Phone')}</span>
                        <input type="tel" value={offerForm.phone} onChange={e => setOfferForm({ ...offerForm, phone: e.target.value })} className="w-full h-11 px-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm" />
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="text-xs font-bold block mb-1">{t('Datum för eventet', 'Event date')}</span>
                        <input type="date" required min={new Date().toISOString().split('T')[0]} value={offerForm.date} onChange={e => setOfferForm({ ...offerForm, date: e.target.value })} className="w-full h-11 px-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm" />
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="text-xs font-bold block mb-1">{t('Typ av event', 'Event type')}</span>
                        <select required value={offerForm.eventType} onChange={e => setOfferForm({ ...offerForm, eventType: e.target.value })} className="w-full h-11 px-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm bg-card">
                          <option value="">{t('Välj...', 'Choose...')}</option>
                          <option value="privat">{t('Privat fest', 'Private party')}</option>
                          <option value="företag">{t('Företagsevent', 'Corporate event')}</option>
                          <option value="bröllop">{t('Bröllop', 'Wedding')}</option>
                          <option value="födelsedag">{t('Födelsedag', 'Birthday')}</option>
                          <option value="studentfest">{t('Studentfest', 'Graduation party')}</option>
                          <option value="festival">Festival</option>
                          <option value="annat">{t('Annat', 'Other')}</option>
                        </select>
                      </label>
                    </div>
                    <label className="block">
                      <span className="text-xs font-bold block mb-1">{t('Allergier', 'Allergies')}</span>
                      <input value={offerForm.allergies} onChange={e => setOfferForm({ ...offerForm, allergies: e.target.value })} placeholder={t('T.ex. nötter, gluten, laktos...', 'E.g. nuts, gluten, lactose...')} className="w-full h-11 px-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm" />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold block mb-1">{t('Anteckningar', 'Notes')}</span>
                      <textarea rows={3} value={offerForm.notes} onChange={e => setOfferForm({ ...offerForm, notes: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:border-primary text-sm resize-none" />
                    </label>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-xs font-bold mb-1">{t('Sammanfattning', 'Summary')}</p>
                      <ul className="text-xs text-foreground/70 space-y-0.5">
                        {selectedEntries.map(it => (
                          <li key={it.id} className="flex justify-between"><span>{it.title}</span><span className="font-bold">×{it.qty}</span></li>
                        ))}
                      </ul>
                    </div>
                    <button
                      type="submit"
                      className="w-full h-12 rounded-xl font-display font-bold uppercase tracking-wide text-white flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                      style={{ background: 'linear-gradient(90deg, #E8186D, #F07020)' }}
                    >
                      <Send className="w-4 h-4" />
                      {t('Skicka offert', 'Send inquiry')}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </section>
        </>)}
              <TrustQuotes seed="meny" count={3} variant="light" headingSv="Vad våra kunder säger" headingEn="What Our Clients Say" />
      </main>
    </>
  );
};

export default Meny;
