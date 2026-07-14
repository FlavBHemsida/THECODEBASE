import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import linePattern from '@/assets/grill-line-pattern.png';
import stampDancer from '@/assets/grill-stamp-dancer.png';
import accentDashesLeft from '@/assets/grill-accent-dashes-left.png';
import accentDashesRight from '@/assets/grill-accent-dashes-right.png';
import overlayPattern from '@/assets/grill-overlay-pattern.png';

// Extra hero photos shown directly under the main image collage
import photoGrillExtra3 from '@/assets/grill-extra-3.jpg';
import photoGrillExtra4 from '@/assets/grill-extra-4.jpg';
import photoGrillTshirtBack from '@/assets/grill-tshirt-back.jpg';
import grillSolidSilhouette from '@/assets/grill-solid-silhouette.png';
import grillCenterAsset from '@/assets/grill-center.webp';
import grillBbqPalmAsset from '@/assets/grill-bbq-palm.webp';
import grillFlavorbossTeeAsset from '@/assets/grill-flavorboss-tee.webp';
import grillWingsFireNewAsset from '@/assets/grill-wings-fire-new.webp';
const grillUser2 = { url: photoGrillExtra4 };
const grillUser3 = { url: grillCenterAsset };
const grillUser4 = { url: grillFlavorbossTeeAsset };

// Half-set of "Vårt Äventyr" journey patterns — keeps the background lively without overcrowding
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

const Grill = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title={t(
          'Grill — Flavor-Boss Malmö & Skåne',
          'Grill — Flavor-Boss Malmö & Skåne'
        )}
        description={t(
          'Live grillmaster med jamaican fusion — jerk chicken & Jerk Cauliflower direkt från grillen till din tallrik. Boka grillupplevelsen i Malmö & Skåne.',
          'Live grillmaster with Jamaican fusion — jerk chicken & Jerk Cauliflower straight from the grill to your plate. Book the grill experience in Malmö & Skåne.'
        )}
        canonical="https://www.flavorboss.se/grill"
      />

      <div className="relative min-h-screen overflow-hidden">
        {/* Animated gradient base — orange to red */}
        <div
          className="absolute inset-0 animate-gradient-shift"
          style={{
            backgroundImage:
              'linear-gradient(180deg, #e98339 0%, #d93a39 100%)',
            backgroundSize: '200% 200%',
          }}
        />

        {/* Orange zigzag pattern overlay — above gradient, below decorations */}
        <div
          className="absolute inset-0 pointer-events-none opacity-70 mix-blend-overlay"
          style={{
            backgroundImage: `url(${overlayPattern})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '320px auto',
          }}
        />

        {/* Fixed-in-place dancing "stamped" mascot in the background — does not scroll */}
        <motion.img
          src={stampDancer}
          alt=""
          aria-hidden="true"
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[640px] opacity-[0.07] z-0 pointer-events-none select-none"
          animate={{
            rotate: [0, 4, -4, 3, 0],
            scale: [1, 1.04, 0.98, 1.03, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating "Vårt Äventyr" journey patterns — half-set to avoid overfilling */}
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
        <main className="relative z-10 container-site pt-20 md:pt-24 pb-24 min-h-screen">
          {/* RANDOMISED PHOTO BUNDLE — scattered, tilted photos right under the navbar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="relative max-w-5xl mx-auto h-[340px] sm:h-[420px] md:h-[520px] mb-10"
          >
            {[
                { src: grillUser3.url,        x: '38%', y: '28%', w: 'w-[44%] sm:w-[36%] md:w-[32%]', rot: -3, z: 30, ring: '0 0 0 6px #ffee00, 0 0 0 10px #b00018' },
                { src: grillUser2.url,        x: '6%',  y: '14%', w: 'w-[36%] sm:w-[28%] md:w-[24%]', rot: -8, z: 20, ring: '0 0 0 5px #ff7a00' },
                { src: grillUser4.url,        x: '70%', y: '8%',  w: 'w-[34%] sm:w-[26%] md:w-[22%]', rot: 7,  z: 20, ring: '0 0 0 5px #ff7a00' },
                { src: grillWingsFireNewAsset, x: '2%',  y: '60%', w: 'w-[32%] sm:w-[24%] md:w-[20%]', rot: 5,  z: 15, ring: '0 0 0 4px #ffee00' },
                { src: grillBbqPalmAsset, x: '76%', y: '58%', w: 'w-[30%] sm:w-[22%] md:w-[20%]', rot: -6, z: 15, ring: '0 0 0 4px #ffee00' },
                { src: photoGrillExtra3,      x: '24%', y: '70%', w: 'w-[28%] sm:w-[20%] md:w-[18%]', rot: 9,  z: 12, ring: '0 0 0 4px #ff7a00' },
            ].map((p, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -6, 4, -3, 0], rotate: [p.rot, p.rot + 1.5, p.rot - 1.5, p.rot] }}
                transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                whileHover={{ scale: 1.06, zIndex: 50 }}
                className={`absolute ${p.w} aspect-square rounded-2xl overflow-hidden`}
                style={{
                  left: p.x,
                  top: p.y,
                  zIndex: p.z,
                  boxShadow: `0 18px 40px rgba(0,0,0,0.45), ${p.ring}`,
                }}
              >
                <img
                  src={p.src}
                  alt={t(`Flavor-Boss grill upplevelse ${i + 1}`, `Flavor-Boss grill experience ${i + 1}`)}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none mix-blend-multiply"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(233,131,57,0.18) 0%, rgba(217,58,57,0.28) 100%)',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Top line pattern — separator under the photo bundle */}
          <img
            src={linePattern}
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain object-center mb-12 select-none pointer-events-none"
          />

          {/* Title + intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="text-center mb-16"
          >
            <div className="relative inline-flex items-center justify-center gap-4 md:gap-8 mb-4">
              {/* Left stamped accent — yellow tinted */}
              <motion.img
                src={accentDashesLeft}
                alt=""
                aria-hidden="true"
                className="hidden sm:block w-14 md:w-24 select-none pointer-events-none"
                style={{
                  filter:
                    'brightness(0) saturate(100%) invert(92%) sepia(64%) saturate(2476%) hue-rotate(357deg) brightness(108%) contrast(106%)',
                }}
                animate={{ rotate: [0, -8, 6, -4, 0], y: [0, -4, 0, 3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />

              <h1
                className="font-display font-extrabold text-4xl md:text-7xl uppercase tracking-tight"
                style={{ color: '#ffee00' }}
              >
                {t('GRILLUPPLEVELSE', 'GRILL EXPERIENCE')}
              </h1>

              {/* Right stamped accent — yellow tinted */}
              <motion.img
                src={accentDashesRight}
                alt=""
                aria-hidden="true"
                className="hidden sm:block w-12 md:w-20 select-none pointer-events-none"
                style={{
                  filter:
                    'brightness(0) saturate(100%) invert(92%) sepia(64%) saturate(2476%) hue-rotate(357deg) brightness(108%) contrast(106%)',
                }}
                animate={{ rotate: [0, 8, -6, 4, 0], y: [0, 4, 0, -3, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto text-center leading-snug">
              {t(
                'Föreställ dig den ultimata takterrass eller trädgårdsfesten. Vår grillmaster bjuder inte bara på mat utan på en väldoftande upplevelse. Från den rykande grillen sprider sig doften av kanelkryddad, Jamaican fusioned jerk. Oavsett om vi grillar på vår färgsprakande grill eller din egen, serverar vi rykande läckerheter med ett varmt leende.',
                'Imagine the ultimate rooftop or garden party. Our grillmaster serves not just food but a fragrant experience. From the smoking grill drifts the aroma of cinnamon spiced, Jamaican fusioned jerk. Whether we grill on our colorful grill or your own, we serve smoking delicacies with a warm smile.'
              )}
            </p>
          </motion.div>

          {/* Three info tiles */}
          <div className="flex flex-col gap-12 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="px-4"
            >
            <div className="text-center max-w-2xl mx-auto">
                <h2
                  className="font-display font-extrabold text-3xl md:text-5xl uppercase mb-4 tracking-tight"
                  style={{ color: '#ffee00' }}
                >
                  {t('DETTA INGÅR', 'WHAT IS INCLUDED')}
                </h2>
                <p className="text-sm md:text-base text-white/90 leading-relaxed whitespace-pre-line">
                  {t(
                  'Njut av en komplett grillupplevelse med egen personal på plats.\nAlla tillbehör och leverans ingår.\n3 timmars service, varav 1 till 1,5 timmes grillning.\nTillgängligt för både små och stora sällskap.',
                  'Enjoy a complete grill experience with our own staff on site.\nAll sides and delivery included.\n3 hours of service, of which 1 to 1.5 hours of grilling.\nAvailable for both small and large groups.'
                  )}
                </p>
              </div>
            </motion.div>

            {/* Dancing grill line pattern — separator above the polaroid trio */}
            <div className="relative -mb-2">
              <img
                src={linePattern}
                alt=""
                aria-hidden="true"
                className="w-full h-auto object-contain object-center select-none pointer-events-none"
              />
            </div>

            {/* Polaroid trio — closing taste-tease before CTA */}
            <div className="relative">
              {/* Left background silhouette */}
              <img
                src={grillSolidSilhouette}
                alt=""
                aria-hidden="true"
                className="hidden md:block absolute -left-32 lg:-left-40 top-1/2 -translate-y-1/2 w-56 lg:w-72 opacity-100 pointer-events-none select-none z-0"
              />
              {/* Right t-shirt photo */}
              <img
                src={photoGrillTshirtBack}
                alt={t('Flavor-Boss t-shirt', 'Flavor-Boss t-shirt')}
                className="hidden md:block absolute -right-28 lg:-right-40 top-1/2 -translate-y-1/2 w-56 lg:w-72 rounded-2xl shadow-2xl rotate-3 pointer-events-none select-none z-0"
                style={{ boxShadow: '0 18px 40px rgba(0,0,0,0.4), 0 0 0 4px #ffee00' }}
              />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              className="relative z-10 grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto px-2"
            >
              {[
                { src: grillUser2.url,         rot: -4, label: t('Afro-Caribbean', 'Afro-Caribbean') },
                { src: grillUser3.url,         rot: 3,  label: t('Back Yard', 'Back Yard') },
                { src: grillUser4.url,         rot: -2, label: t('BBQ Party', 'BBQ Party') },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10, rotate: 0, scale: 1.05 }}
                  animate={{ rotate: [p.rot, p.rot + 1, p.rot - 1, p.rot] }}
                  transition={{ rotate: { duration: 6 + i, repeat: Infinity, ease: 'easeInOut' } }}
                  className="bg-white p-2 md:p-3 pb-6 md:pb-10 shadow-2xl"
                >
                  <div className="aspect-square overflow-hidden">
                    <img src={p.src} alt={p.label} className="w-full h-full object-cover" loading="eager" />
                  </div>
                  <div className="text-center mt-2 font-display font-extrabold uppercase text-xs md:text-sm tracking-wider text-[#b00018]">
                    {p.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="flex justify-center px-4 mt-4"
            >
              <Link
                to="/boka-oss"
                onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
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
          </div>

          {/* Bottom line pattern — right above the footer */}
          <div className="relative mt-20">
            <img
              src={linePattern}
              alt=""
              aria-hidden="true"
              className="w-full h-auto object-contain object-center select-none pointer-events-none relative z-10"
            />
          </div>
        </main>

        {/* Full-bleed reviews — pulled out of the container so the panel reaches edge-to-edge */}
        <div className="relative z-10">
          <TrustQuotes seed="grill" count={2} variant="light" headingSv="Vad våra kunder säger" headingEn="What Our Clients Say" />
        </div>
      </div>
    </>
  );
};

export default Grill;