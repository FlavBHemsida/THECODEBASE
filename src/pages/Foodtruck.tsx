import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';

// Official TikTok glyph (lucide doesn't ship it)
const TikTokIcon = ({ className = '' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.55a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.0Z" />
  </svg>
);

import linePattern from '@/assets/foodtruck-line-pattern.png';
import leaf1 from '@/assets/bananblad-1.png';
import leaf2 from '@/assets/bananblad-2.png';
import leaf3 from '@/assets/bananblad-3.png';

import foodtruck1 from '@/assets/foodtruck-1.jpg';
import foodtruck2 from '@/assets/foodtruck-2.jpg';
import foodtruck3 from '@/assets/foodtruck-3.jpg';

// Same half-set of "Vårt Äventyr" journey patterns used on the Grill page
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
import TrustQuotes from '@/components/TrustQuotes';

const journeyIcons = [
  { src: patternPalm, size: 120, x: '6%', y: '14%', delay: 0 },
  { src: patternArrow, size: 85, x: '86%', y: '10%', delay: 0.5 },
  { src: patternZigzag, size: 100, x: '14%', y: '74%', delay: 1.2 },
  { src: patternMask, size: 110, x: '80%', y: '72%', delay: 0.8 },
  { src: patternBurst, size: 95, x: '90%', y: '42%', delay: 1.5 },
  { src: patternDancer, size: 130, x: '4%', y: '46%', delay: 0.3 },
  { src: patternWave1, size: 130, x: '70%', y: '86%', delay: 1.0 },
  { src: patternNote, size: 110, x: '54%', y: '16%', delay: 0.6 },
  { src: patternTribal, size: 100, x: '92%', y: '26%', delay: 1.6 },
  { src: patternHut, size: 130, x: '60%', y: '6%', delay: 1.7 },
  { src: patternSun, size: 115, x: '48%', y: '50%', delay: 0.85 },
  { src: patternPalm3, size: 125, x: '74%', y: '36%', delay: 1.4 },
];

const photos = [foodtruck1, foodtruck2, foodtruck3];

const Foodtruck = () => {
  const { t, lang } = useLanguage();
  const [mode, setMode] = useState<'foretag' | 'privat'>('foretag');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title={t(
          'Foodtruck — Flavor-Boss Malmö & Skåne',
          'Food Truck — Flavor-Boss Malmö & Skåne'
        )}
        description={t(
          'Boka vår färgsprakande foodtruck för företagsevent, festival, bröllop eller invigning i Malmö & Skåne. Afro-karibisk smakupplevelse på plats.',
          'Book our colorful food truck for corporate events, festivals, weddings or openings in Malmö & Skåne. Afro-Caribbean taste experience on site.'
        )}
        canonical="https://www.flavorboss.se/foodtruck"
      />

      <div className="relative min-h-screen overflow-hidden">
        {/* Animated gradient base — #db4335 top → #eb8a35 bottom */}
        <div
          className="absolute inset-0 animate-gradient-shift"
          style={{
            backgroundImage: 'linear-gradient(180deg, #db4335 0%, #eb8a35 100%)',
            backgroundSize: '200% 200%',
          }}
        />

        {/* Floating "Vårt Äventyr" journey patterns — same set as Grill page */}
        {journeyIcons.map((icon, i) => (
          <motion.img
            key={i}
            src={icon.src}
            alt=""
            aria-hidden="true"
            className="absolute pointer-events-none select-none z-0"
            style={{
              left: icon.x,
              top: icon.y,
              width: icon.size,
              height: icon.size,
              objectFit: 'contain',
              opacity: 0.45,
              filter: 'brightness(1.2) drop-shadow(0 2px 8px rgba(0,0,0,0.15))',
            }}
            animate={{
              y: [0, -18, 5, -12, 0],
              x: [0, 10, -8, 12, 0],
              rotate: [0, 20, -15, 25, -10, 0],
            }}
            transition={{
              y: { duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: icon.delay },
              x: { duration: 5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: icon.delay },
              rotate: { duration: 3.5 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: icon.delay },
            }}
          />
        ))}

        {/* Main content */}
        <main className="relative z-10 container-site pt-32 pb-24 min-h-screen">
          {/* Företagsevent / Privat Event toggle */}
          <div className="relative z-20 flex justify-center pt-4">
            <div
              className="inline-flex items-center rounded-full p-1 shadow-lg backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,229,15,0.4)' }}
              role="tablist"
              aria-label={t('Välj event-typ', 'Choose event type')}
            >
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'foretag'}
                onClick={() => setMode('foretag')}
                className={`px-5 md:px-7 py-2 md:py-2.5 rounded-full font-display font-extrabold uppercase tracking-wide text-xs md:text-sm transition-all duration-300 ${
                  mode === 'foretag' ? 'text-[#9a1018] shadow-md' : 'text-white/85 hover:text-white'
                }`}
                style={mode === 'foretag' ? { backgroundColor: '#ffe50f' } : undefined}
              >
                {t('Företagsevent', 'Corporate Event')}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'privat'}
                onClick={() => setMode('privat')}
                className={`px-5 md:px-7 py-2 md:py-2.5 rounded-full font-display font-extrabold uppercase tracking-wide text-xs md:text-sm transition-all duration-300 ${
                  mode === 'privat' ? 'text-[#9a1018] shadow-md' : 'text-white/85 hover:text-white'
                }`}
                style={mode === 'privat' ? { backgroundColor: '#ffe50f' } : undefined}
              >
                {t('Privat Event', 'Private Event')}
              </button>
            </div>
          </div>

          {/* Top black-lined pattern (under navbar) — full bleed across viewport */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 top-24 h-10 md:h-14 mb-12 select-none pointer-events-none w-screen"
            style={{
              backgroundImage: `url(${linePattern})`,
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 100%',
              backgroundPosition: 'left center',
            }}
          />
          <div className="h-12 md:h-16 mb-6" />

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="text-center mb-10 max-w-3xl mx-auto px-4"
          >
            <h1
              className="font-display font-extrabold text-4xl md:text-7xl uppercase tracking-tight leading-none"
              style={{ color: '#ffe50f' }}
            >
              {t('FOODTRUCK-UPPLEVELSE', 'FOOD TRUCK EXPERIENCE')}
            </h1>
            <h2
              className="font-display font-extrabold text-2xl md:text-4xl uppercase tracking-tight mt-2"
              style={{ color: '#ffe50f' }}
            >
              {mode === 'foretag'
                ? t('FÖRETAGSEVENEMANG', 'CORPORATE EVENTS')
                : t('PRIVAT EVENT', 'PRIVATE EVENT')}
            </h2>
          </motion.div>

          {/* Body copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-2xl mx-auto text-center text-white/95 px-4 space-y-5 text-base md:text-lg leading-relaxed"
          >
            {mode === 'foretag' ? (
              <>
            <p>
              {t(
                'Med vår starka närvaro och etablerade kundbas i sociala medier – mer än 30 000 följare – kan vi även bidra till att öka er synlighet och skapa extra nyfikenhet kring ert arrangemang.',
                'With our strong presence and established customer base on social media — more than 30,000 followers — we can also help boost your visibility and spark extra curiosity around your event.'
              )}
            </p>
            <p>
              {t(
                'Som företag kan ni låta Flavor-Boss bli höjdpunkten på ert event, vare sig det handlar om butiksinvigning, kundevent, studentfest, födelsegagar, sommarfest eller nätverksträff. Våra menyer är flexibla och passar allt från smakportioner vid invigningar till större måltider för hela företaget eller byggarbetslaget.',
                'As a company you can let Flavor-Boss become the highlight of your event — whether it’s a store opening, customer event, student party, birthday party, summer party or networking meet-up. Our menus are flexible and suit everything from taster portions at openings to bigger meals for the whole company or construction crew.'
              )}
            </p>
              </>
            ) : lang === 'sv' ? (
              <>
                <p>
                  Vi förvandlar studentfiranden, födelsedagar, bröllop och sommarfester till en färgsprakande afro-karibisk upplevelse fylld av{' '}
                  <span className="font-display font-extrabold" style={{ color: '#ffe50f' }}>
                    SMAK, ENERGI OCH GLÄDJE
                  </span>
                  .
                </p>
                <p>
                  Från första servering till sista tuggan skapar vi en vibe där gästerna inte bara äter - de upplever, samlas och minns. Med våra prisbelönta menyer, där Flavor Boxen är publikfavoriten, levererar vi inte bara mat utan en helhetskänsla som sätter tonen för hela eventet.
                </p>
                <p className="font-display font-extrabold" style={{ color: '#ffe50f' }}>
                  MAT, MUSIK OCH SKÖNA VIBES
                </p>
                <p>- direkt från vår foodtruck till din fest.</p>
              </>
            ) : (
              <>
                <p>
                  We turn student celebrations, birthdays, weddings and summer parties into a vibrant Afro-Caribbean experience full of{' '}
                  <span className="font-display font-extrabold" style={{ color: '#ffe50f' }}>
                    FLAVOR, ENERGY AND JOY
                  </span>
                  .
                </p>
                <p>
                  From the first serving to the last bite we create a vibe where guests don't just eat - they experience, gather and remember. With our award-winning menus, where the Flavor Box is the crowd favorite, we deliver more than food - a whole feeling that sets the tone for the entire event.
                </p>
                <p className="font-display font-extrabold" style={{ color: '#ffe50f' }}>
                  FOOD, MUSIC AND GOOD VIBES
                </p>
                <p>- straight from our food truck to your party.</p>
              </>
            )}
          </motion.div>

          {/* Yellow brush-stroke highlight banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="relative max-w-2xl mx-auto mt-12 px-4"
          >
            <div
              className="relative mx-auto py-5 px-8 text-center"
              style={{
                backgroundColor: '#ffe50f',
                borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
                boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
                transform: 'rotate(-1.2deg)',
              }}
            >
              <p
                className="font-display font-extrabold uppercase text-base md:text-2xl tracking-tight leading-tight"
                style={{ color: '#9a1018' }}
              >
                {t(
                  'VI ERBJUDER INTE BARA MAT — VI LOCKAR MÄNNISKOR TILL ERT EVENT.',
                  'WE DON’T JUST OFFER FOOD — WE DRAW PEOPLE TO YOUR EVENT.'
                )}
              </p>
            </div>
          </motion.div>

          {/* Three photos in yellow frames */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto px-4">
            {photos.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -2 : 2 }}
                animate={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                whileHover={{ rotate: 0, scale: 1.03 }}
                className="rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  backgroundColor: '#ffe50f',
                  padding: '10px',
                }}
              >
                <img
                  src={src}
                  alt={t(
                    `Flavor-Boss foodtruck event ${i + 1}`,
                    `Flavor-Boss food truck event ${i + 1}`
                  )}
                  loading="eager"
                  className="w-full h-56 md:h-64 object-cover rounded-xl"
                />
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="flex justify-center px-4 mt-16"
          >
            <Link
              to="/boka-oss"
              className="relative z-20 inline-block font-display font-extrabold uppercase tracking-wide text-white text-lg md:text-2xl px-10 md:px-14 py-4 md:py-5 rounded-full shadow-2xl transition-transform duration-300 hover:scale-105 animate-cta-glow"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #fff200 0%, #ff7a00 35%, #b00018 100%)',
                backgroundSize: '200% 200%',
                backgroundColor: '#b00018',
                boxShadow:
                  '0 0 35px rgba(255,238,0,0.95), 0 0 70px rgba(201,0,26,0.85), 0 12px 40px rgba(201,0,26,0.7)',
                textShadow: '0 1px 2px rgba(0,0,0,0.35)',
                opacity: 1,
              }}
            >
              {t('BOKA OSS IDAG', 'BOOK US TODAY')}
            </Link>
          </motion.div>

          {/* TikTok link */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="flex justify-center px-4 mt-8"
          >
            <a
              href="https://www.tiktok.com/@flavorbosstrich"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display font-extrabold uppercase tracking-wide text-white text-sm md:text-base px-6 py-3 rounded-full bg-black/70 backdrop-blur-sm border border-white/30 shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-black/90"
            >
              <TikTokIcon className="w-5 h-5" />
              {t('Följ oss på TikTok', 'Follow us on TikTok')}
            </a>
          </motion.div>

          {/* Bottom banana leaves — anchored to the bottom of the content area */}
          <div className="relative mt-16 h-56 md:h-72 pointer-events-none select-none">
            <motion.img
              src={leaf1}
              alt=""
              aria-hidden="true"
              className="absolute -left-6 md:left-2 bottom-0 w-40 md:w-64 origin-bottom-left"
              style={{ transform: 'rotate(-18deg)' }}
              animate={{ rotate: [-18, -14, -20, -16, -18] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.img
              src={leaf2}
              alt=""
              aria-hidden="true"
              className="absolute left-1/2 -translate-x-1/2 bottom-0 w-32 md:w-48 origin-bottom"
              animate={{ rotate: [-3, 2, -2, 3, -3] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.img
              src={leaf3}
              alt=""
              aria-hidden="true"
              className="absolute -right-6 md:right-2 bottom-2 w-44 md:w-72 origin-bottom-right"
              style={{ transform: 'rotate(14deg)' }}
              animate={{ rotate: [14, 10, 18, 12, 14] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

      </main>

      {/* Full-bleed reviews — pulled out of the container so the panel reaches edge-to-edge,
          with the line-pattern stripe laid on top of its top edge (same placement as before,
          now spanning the full section since it's no longer trapped in the constrained container) */}
      <div className="relative z-10">
        <TrustQuotes seed="foodtruck" count={2} variant="light" headingSv="Vad våra kunder säger" headingEn="What Our Clients Say" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-10 md:h-14 z-20 select-none pointer-events-none"
          style={{
            backgroundImage: `url(${linePattern})`,
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%',
            backgroundPosition: 'left center',
          }}
        />
      </div>
      </div>
    </>
  );
};

export default Foodtruck;