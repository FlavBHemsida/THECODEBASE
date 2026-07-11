import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Sparkles, Lock, ChevronDown } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';

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

// Test decoration images from Foodtruck (placeholders, easily swappable later)
import foodtruck1 from '@/assets/foodtruck-1.jpg';
import foodtruck2 from '@/assets/foodtruck-2.jpg';
import foodtruck3 from '@/assets/foodtruck-3.jpg';
import flavorBossKitchen from '@/assets/flavor-boss-kitchen.jpg';
import TrustQuotes from '@/components/TrustQuotes';

const eventBgImages = [foodtruck1, foodtruck2, foodtruck3];

// Per-event image overrides (by event name + place)
const eventImageOverrides: Record<string, string> = {
  'Jubileumsfest|Flavor-Boss Kitchen': flavorBossKitchen,
  'Kristianstaddagarna|Kristianstad': foodtruck3,
};

// Centered, evenly distributed pattern set — works on mobile and desktop
const floatingIcons = [
  { src: patternPalm, size: 90, x: '5%', y: '8%', delay: 0 },
  { src: patternArrow, size: 70, x: '85%', y: '6%', delay: 0.4 },
  { src: patternDancer, size: 100, x: '50%', y: '4%', delay: 0.2 },
  { src: patternMask, size: 85, x: '8%', y: '30%', delay: 0.8 },
  { src: patternSun, size: 90, x: '88%', y: '28%', delay: 0.6 },
  { src: patternBurst, size: 75, x: '50%', y: '32%', delay: 1.0 },
  { src: patternWave1, size: 95, x: '6%', y: '55%', delay: 0.5 },
  { src: patternDancer2, size: 100, x: '90%', y: '52%', delay: 0.9 },
  { src: patternNote, size: 80, x: '50%', y: '58%', delay: 1.2 },
  { src: patternHut, size: 95, x: '8%', y: '78%', delay: 0.7 },
  { src: patternPalm3, size: 90, x: '88%', y: '76%', delay: 1.1 },
  { src: patternMusic, size: 80, x: '50%', y: '82%', delay: 0.3 },
  { src: patternZigzag, size: 70, x: '30%', y: '18%', delay: 1.3 },
  { src: patternZigzag2, size: 70, x: '70%', y: '42%', delay: 1.5 },
  { src: patternTribal, size: 75, x: '28%', y: '68%', delay: 0.45 },
  { src: patternFace, size: 75, x: '72%', y: '88%', delay: 1.4 },
];

const PopUp = () => {
  const { t } = useLanguage();

  // Ordered by date (May → September). Secrets keep their slot in the timeline.
  const events = [
    { name: 'Österlen Gardenshow', date: '16–17 maj',           monthIdx: 4, firstDay: 16, place: 'Tomelilla',            secret: false, url: 'https://osterlengardenshow.se/' },
    { name: 'Streetfoodfestivalen', date: '29–30 maj',          monthIdx: 4, firstDay: 29, place: 'Jönköping',            secret: false, url: 'https://www.jonkoping.se/evenemangskalender/evenemangskalender/evenemang/2026-01-09-street-food-festivalen' },
    { name: 'Jubileumsfest',        date: 'Ons 10 juni',        monthIdx: 5, firstDay: 10, place: 'Flavor-Boss Kitchen',  secret: false, url: 'https://www.google.com/maps/dir//Flavor-Boss+Catering,+Foodtruck+och+Events,+Hantverkaregatan+4,+232+34+Arl%C3%B6v/@55.5974656,13.0023424,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x4653a384d94f0b8f:0xb3fe10397dd7fec2!2m2!1d13.0766103!2d55.6361508' },
    { name: 'Secret Pop-Up',        date: 'Ons 17 juni',        monthIdx: 5, firstDay: 17, place: '???',                  secret: true,  url: null },
    { name: 'Secret Pop-Up',        date: 'Ons 24 juni',        monthIdx: 5, firstDay: 24, place: '???',                  secret: true,  url: null },
    { name: 'Hampafestivalen',      date: '25–27 juni',         monthIdx: 5, firstDay: 25, place: 'Lund',                 secret: false, url: 'https://www.hampafestivalen.xyz/' },
    { name: 'Secret Pop-Up',        date: 'Fredag 3 juli',      monthIdx: 6, firstDay: 3,  place: '???',                  secret: true,  url: null },
    { name: 'Street Food Festivalen', date: '23–25 juli',       monthIdx: 6, firstDay: 23, place: 'Stockholm',            secret: false, url: 'https://streetfoodfestivalen.se/' },
    { name: 'Kristianstaddagarna', date: '30 juli – 1 augusti', monthIdx: 6, firstDay: 30, place: 'Kristianstad',         secret: false, url: 'https://www.kristianstadstadsfestival.com/' },
    { name: 'Reggaefestival',       date: '31 juli – 1 augusti', monthIdx: 6, firstDay: 31, place: 'Uppsala',             secret: false, url: 'https://uppsalareggaefestival.com/' },
    { name: 'Streetfoodfestivalen', date: '27–30 augusti',      monthIdx: 7, firstDay: 27, place: 'Göteborg',             secret: false, url: 'https://streetfoodfestivalen.se/goteborg/' },
    { name: 'NGBG Festival',        date: '4–6 september',      monthIdx: 8, firstDay: 4,  place: 'Malmö',                secret: false, url: 'https://gatufest.se/' },
  ];

  const monthNamesSV = ['Januari','Februari','Mars','April','Maj','Juni','Juli','Augusti','September','Oktober','November','December'];
  const monthNamesEN = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  // Group events by monthIdx, keep order of first appearance
  const grouped = useMemo(() => {
    const map = new Map<number, typeof events>();
    events.forEach((ev) => {
      if (!map.has(ev.monthIdx)) map.set(ev.monthIdx, [] as any);
      (map.get(ev.monthIdx) as any).push(ev);
    });
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, []);

  const today = new Date();
  const currentMonthIdx = today.getMonth();
  const currentYear = today.getFullYear();
  // Year used for events in the data above
  const eventYear = 2026;

  // All months are unlocked
  const isOpenable = (_m: number) => true;

  // For locked months, days until their first event
  const daysUntil = (m: number, day: number) => {
    const target = new Date(eventYear, m, day);
    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(diff, 0);
  };

  // Default open: every month
  const [openMonths, setOpenMonths] = useState<Record<number, boolean>>(() => {
    const init: Record<number, boolean> = {};
    grouped.forEach(([m]) => { init[m] = true; });
    return init;
  });

  const toggleMonth = (m: number) => {
    if (!isOpenable(m)) return;
    setOpenMonths((s) => ({ ...s, [m]: !s[m] }));
  };

  return (
    <>
      <SEOHead
        title={t('POP-UP — Flavor-Boss', 'POP-UP — Flavor-Boss')}
        description={t(
          'Schema och var du hittar Flavor-Boss pop-ups.',
          'Schedule and where to find Flavor-Boss pop-ups.'
        )}
        canonical="https://www.flavorboss.se/pop-up"
      />
      <main id="main-content" className="relative min-h-screen">
        <div
          className="fixed inset-0 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #ffae30, #ff612b)',
          }}
        >
          {floatingIcons.map((icon, i) => (
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
                transform: 'translate(-50%, -50%)',
                objectFit: 'contain',
                opacity: 0.35,
                filter: 'brightness(1.3) drop-shadow(0 2px 8px rgba(0,0,0,0.1))',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 0.35,
                scale: 1,
                y: [0, -10, 4, -7, 0],
                rotate: [0, 8, -6, 10, -4, 0],
              }}
              transition={{
                opacity: { duration: 0.6, delay: icon.delay },
                scale: { duration: 0.6, delay: icon.delay },
                y: { duration: 5 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: icon.delay },
                rotate: { duration: 4 + i * 0.15, repeat: Infinity, ease: 'easeInOut', delay: icon.delay },
              }}
            />
          ))}
        </div>

        <section className="relative z-10 max-w-6xl mx-auto px-4 pt-24 pb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative text-center mb-12"
          >
            {/* Patterns floating behind the title */}
            <motion.img
              src={patternSun}
              alt=""
              aria-hidden
              className="absolute -top-6 -left-2 sm:left-8 w-20 sm:w-28 pointer-events-none select-none opacity-70"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
            <motion.img
              src={patternBurst}
              alt=""
              aria-hidden
              className="absolute -top-4 right-0 sm:right-10 w-16 sm:w-24 pointer-events-none select-none opacity-70"
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            />
            <motion.img
              src={patternDancer}
              alt=""
              aria-hidden
              className="absolute top-16 -left-4 w-14 sm:w-20 pointer-events-none select-none opacity-60 hidden sm:block"
              animate={{ y: [0, -10, 0], rotate: [-6, 6, -6] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.img
              src={patternPalm}
              alt=""
              aria-hidden
              className="absolute top-12 right-2 w-14 sm:w-20 pointer-events-none select-none opacity-60 hidden sm:block"
              animate={{ y: [0, -8, 0], rotate: [4, -8, 4] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-7xl uppercase text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] tracking-tight leading-[0.95]">
              {t('Var hittar du oss?', 'Where to find us?')}
            </h1>
            <p className="mt-3 text-sm sm:text-base md:text-xl text-white/95 font-medium max-w-2xl mx-auto px-2">
              {t(
                'Hela vår turné — pop-ups, festivaler & events.',
                'Our full tour — pop-ups, festivals & events.'
              )}
            </p>
          </motion.div>

          {/* Months — accordion style */}
          <div className="space-y-5">
            {grouped.map(([monthIdx, monthEvents]) => {
              const openable = isOpenable(monthIdx);
              const isOpen = openable && !!openMonths[monthIdx];
              const monthLabel = t(monthNamesSV[monthIdx], monthNamesEN[monthIdx]);
              const firstDay = monthEvents[0].firstDay;
              const days = daysUntil(monthIdx, firstDay);
              return (
                <div key={monthIdx} className={`relative ${!openable ? 'opacity-50' : ''}`}>
                  <button
                    type="button"
                    onClick={() => toggleMonth(monthIdx)}
                    disabled={!openable}
                    aria-expanded={isOpen}
                    className={`w-full flex items-center justify-between gap-3 rounded-2xl px-5 py-4 backdrop-blur-md border-2 transition-all ${
                      openable
                        ? 'bg-white/15 border-white/40 hover:bg-white/25 cursor-pointer'
                        : 'bg-black/25 border-white/15 cursor-not-allowed'
                    }`}
                    style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.25)' }}
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-white shrink-0" strokeWidth={2.5} />
                      <span className="font-display font-extrabold uppercase text-2xl sm:text-3xl text-white tracking-tight drop-shadow">
                        {monthLabel}
                      </span>
                      <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full bg-black/35 text-white text-xs font-bold uppercase">
                        {monthEvents.length} {t('event', 'events')}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {!openable ? (
                        <span className="inline-flex items-center gap-1.5 text-white text-xs sm:text-sm font-bold uppercase">
                          <Lock className="w-3.5 h-3.5" strokeWidth={2.5} />
                          {days} {t('dagar kvar', 'days to go')}
                        </span>
                      ) : (
                        <span className="sm:hidden inline-flex items-center px-2.5 py-0.5 rounded-full bg-black/35 text-white text-xs font-bold uppercase">
                          {monthEvents.length}
                        </span>
                      )}
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <ChevronDown className="w-5 h-5 text-white" strokeWidth={2.5} />
                      </motion.span>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7 pt-5">
                          {monthEvents.map((ev, i) => {
                            const tilt = i % 2 === 0 ? -1 : 1;
                            const overrideKey = `${ev.name}|${ev.place}`;
                            const bg = ev.secret
                              ? null
                              : eventImageOverrides[overrideKey] ?? eventBgImages[i % eventBgImages.length];
                            return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.6) }}
                  whileHover={{ scale: 1.03, rotate: tilt, y: -4 }}
                  className="group relative"
                >
                  {/* Decorative canvas frame — outer offset color blocks */}
                  <div
                    aria-hidden
                    className="absolute -inset-2 rounded-[28px] -z-10"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(232,24,109,0.55), rgba(255,184,60,0.55))',
                      transform: `rotate(${tilt * 1.5}deg)`,
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute -inset-1 rounded-[24px] border-2 border-dashed border-white/40 -z-10"
                  />

                  <div className="relative aspect-square rounded-[22px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.35)] ring-2 ring-white/30">
                    {bg ? (
                      <img
                        src={bg}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            'repeating-linear-gradient(45deg, rgba(0,0,0,0.55) 0 16px, rgba(232,24,109,0.55) 16px 32px)',
                        }}
                      />
                    )}
                    {/* Dark overlay for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />

                    {ev.url ? (
                      <a
                        href={ev.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${ev.name} – ${ev.place}`}
                        className="absolute inset-0 z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                      />
                    ) : null}

                    {/* Content */}
                    <div className="relative z-10 h-full w-full flex flex-col justify-between p-4 sm:p-6">
                      {/* Date pill */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white shadow-md self-start">
                        <Calendar className="w-3.5 h-3.5" strokeWidth={2.5} />
                        <span className="font-display font-extrabold uppercase text-[11px] tracking-wider">
                          {ev.date}
                        </span>
                        {ev.secret && (
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase ml-1 pl-2 border-l border-white/40">
                            <Sparkles className="w-3 h-3" strokeWidth={2.5} /> {t('Hemligt', 'Secret')}
                          </span>
                        )}
                      </div>

                      <div>
                        {/* City — bold typography hero */}
                        <h3
                          className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl uppercase leading-[0.9] tracking-tight break-words text-white"
                          style={{
                            textShadow:
                              '3px 3px 0 rgba(232,24,109,0.95), 6px 6px 0 rgba(0,0,0,0.5)',
                          }}
                        >
                          {ev.place === '???' ? '???' : ev.place}
                        </h3>

                        {/* Event name with map pin */}
                        <div className="mt-2 inline-flex items-center gap-1.5 text-white/95">
                          <MapPin className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} />
                          <span className="text-[13px] sm:text-sm font-semibold uppercase tracking-wide">
                            {ev.name}
                          </span>
                        </div>

                        {/* Underline accent */}
                        <div
                          className="mt-3 h-1 w-16 rounded-full transition-all duration-300 group-hover:w-32"
                          style={{ background: 'linear-gradient(90deg, #FFFFFF, rgba(255,255,255,0.3))' }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.li>
                            );
                          })}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white/90 mt-8 text-sm sm:text-base font-medium italic"
          >
            {t('Fler datum släpps löpande — håll utkik!', 'More dates dropping soon — stay tuned!')}
          </motion.p>
        </section>
              <TrustQuotes seed="popup" count={2} variant="dark" headingSv="Vad våra kunder säger" headingEn="What Our Clients Say" />
      </main>
    </>
  );
};

export default PopUp;
