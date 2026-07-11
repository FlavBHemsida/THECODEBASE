import { useEffect, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { ChevronRight, MapPin } from 'lucide-react';
import pinkDividerPattern from '@/assets/pattern-06-pink.png';

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

const floatingIcons = [
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

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const },
};

const Information = () => {
  const { t } = useLanguage();

  // Always drop the user at the top of the page on mount
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);
  useEffect(() => {
    // Re-assert top scroll after layout & animations settle to avoid late shifts
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    const r1 = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }));
    const t1 = setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }), 60);
    const t2 = setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }), 250);
    return () => { cancelAnimationFrame(r1); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Operating-area states for the "Var vi kör" card — rendered as a dotted list
  const operatingAreas = [
    'Malmö', 'Burlöv', 'Lund', 'Staffanstorp', 'Höllviken',
    'Ystad', 'Båstad', 'Österlen', 'Skåne', t('Köpenhamn', 'Copenhagen'),
  ];

  return (
    <>
      <SEOHead
        title={t('Praktisk Info — Flavor-Boss Catering Skåne', 'Practical Info — Flavor-Boss Catering Skåne')}
        description={t(
          'Vi kör i Malmö, Lund, Ystad, Båstad, Österlen & Köpenhamn. Läs om el-krav, allergier & bokningsinfo för Flavor-Boss.',
          'We operate in Malmö, Lund, Ystad, Båstad, Österlen & Copenhagen. Read about power requirements, allergies & booking info.'
        )}
        canonical="https://www.flavorboss.se/information"
      />
      <main id="main-content">
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-center justify-center pt-[72px] overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(45 95% 55%), hsl(22 95% 52%), hsl(332 90% 48%))' }}>
{/* Organic scattered dots pattern - asymmetrical */}
<div className="absolute inset-0 opacity-[0.12]" style={{
  backgroundImage: `
    radial-gradient(circle at 15% 25%, hsl(0 0% 100%) 2px, transparent 2px),
    radial-gradient(circle at 65% 12%, hsl(0 0% 100%) 1.5px, transparent 1.5px),
    radial-gradient(circle at 42% 68%, hsl(0 0% 100%) 2.5px, transparent 2.5px),
    radial-gradient(circle at 78% 45%, hsl(0 0% 100%) 1px, transparent 1px),
    radial-gradient(circle at 28% 82%, hsl(0 0% 100%) 2px, transparent 2px),
    radial-gradient(circle at 88% 78%, hsl(0 0% 100%) 1.5px, transparent 1.5px),
    radial-gradient(circle at 5% 55%, hsl(0 0% 100%) 1px, transparent 1px),
    radial-gradient(circle at 92% 30%, hsl(0 0% 100%) 2px, transparent 2px),
    radial-gradient(circle at 35% 15%, hsl(0 0% 100%) 1.5px, transparent 1.5px),
    radial-gradient(circle at 55% 92%, hsl(0 0% 100%) 1px, transparent 1px)
  `,
  backgroundSize: '100% 100%',
}} />

          <div className="absolute top-20 left-20 w-48 h-48 bg-secondary/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float-y" />

          {/* Dancing floating icons (same as Vår Resa landing) */}
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
                objectFit: 'contain',
                opacity: 0.5,
                filter: 'brightness(1.3) drop-shadow(0 2px 8px rgba(0,0,0,0.1))',
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

          <div className="text-center px-4 relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 60, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
              className="text-4xl md:text-6xl font-display font-extrabold text-primary-foreground uppercase mb-4"
            >
              {t('Praktisk Info', 'Practical Info')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-subheading text-primary-foreground/80"
            >
              {t('Flavor-Boss Catering & Foodtruck Malmö', 'Flavor-Boss Catering & Food Truck Malmö')}
            </motion.p>
          </div>
        </section>

        <div className="relative h-0 z-20" aria-hidden="true">
          <img
            src={pinkDividerPattern}
            alt=""
            className="absolute left-0 right-0 bottom-[-1px] h-10 md:h-14 w-full object-cover object-top pointer-events-none select-none"
          />
        </div>

        {/* Info Cards */}
        <section className="section-padding bg-surface-dark relative overflow-hidden pt-12 md:pt-16">
          {/* Dotted diamond pattern */}
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: `
              radial-gradient(circle, hsl(var(--surface-dark-foreground)) 1.5px, transparent 1.5px),
              radial-gradient(circle, hsl(var(--surface-dark-foreground)) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px, 36px 36px',
            backgroundPosition: '0 0, 18px 18px',
          }} />

          <div className="absolute top-10 right-10 w-48 h-48 bg-primary/8 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-accent/8 rounded-full blur-3xl animate-blob" style={{ animationDelay: '3s' }} />

          {/* Floating gradient circles — each sphere contains all three brand colors and drifts around */}
          {[
            { size: 380, top: '-6%', left: '-8%', delay: '0s', duration: '16s' },
            { size: 300, top: '20%', left: '70%', delay: '2s', duration: '22s' },
            { size: 260, top: '60%', left: '8%', delay: '1s', duration: '18s' },
            { size: 340, top: '70%', left: '60%', delay: '3s', duration: '24s' },
            { size: 220, top: '35%', left: '38%', delay: '0.5s', duration: '20s' },
          ].map((orb, idx) => (
            <div
              key={idx}
              aria-hidden="true"
              className="absolute rounded-full pointer-events-none mix-blend-screen animate-orb-drift"
              style={{
                width: orb.size,
                height: orb.size,
                top: orb.top,
                left: orb.left,
                background:
                  'conic-gradient(from 140deg at 50% 50%, #f89b1a 0deg, #f86412 120deg, #e9106e 240deg, #f89b1a 360deg)',
                filter: 'blur(40px)',
                opacity: 0.55,
                animationDelay: orb.delay,
                animationDuration: orb.duration,
              }}
            />
          ))}

          <div className="container-site relative z-10">
            <motion.h2 {...fadeUp} className="text-3xl md:text-5xl font-display font-extrabold text-center mb-12 text-surface-dark-foreground">
              {t('Bra att veta', 'Good to Know')}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { titleSv: 'Var vi kör', titleEn: 'Where we operate', isAreas: true, footerSv: 'Övriga Sverige & Danmark vid större arrangemang.', footerEn: 'Rest of Sweden & Denmark for larger events.', bg: 'bg-primary text-primary-foreground' },
                { titleSv: 'El & Utrustning', titleEn: 'Power & Equipment', descSv: '3-fas el 32 eller 16A. Gasol möjligt vid begränsat personantal.', descEn: '3-phase power 32 or 16A. Gas possible with limited guest count.', bg: 'bg-surface-green text-surface-green-foreground' },
                { titleSv: 'Allergier & Kost', titleEn: 'Allergies & Diet', descSv: 'Veganska & vegetariska alternativ. Vi hanterar de flesta allergener.', descEn: 'Vegan & vegetarian options. We handle most allergens.', bg: 'bg-accent text-accent-foreground' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40, rotate: -3, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 1, 0.5, 1] }}
                  whileHover={{ y: -6, rotate: 1, scale: 1.02 }}
                  className={`${item.bg} rounded-3xl p-8 shadow-lg transition-shadow hover:shadow-2xl`}
                >
                  <h3 className="font-display text-xl font-bold uppercase mb-3">{t(item.titleSv, item.titleEn)}</h3>
                  {item.isAreas ? (
                    <>
                      <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm opacity-95 mb-3">
                        {operatingAreas.map((area, idx) => (
                          <motion.li
                            key={area}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + idx * 0.04, duration: 0.3 }}
                            className="flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                            <span>{area}</span>
                          </motion.li>
                        ))}
                      </ul>
                      <p className="text-xs opacity-80 italic">{t(item.footerSv!, item.footerEn!)}</p>
                    </>
                  ) : (
                    <p className="text-sm opacity-90">{t(item.descSv!, item.descEn!)}</p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Practical details — moved from the "Komplett Eventpaket" page */}
            <motion.div
              {...fadeUp}
              className="mt-12 md:mt-16 max-w-3xl mx-auto bg-surface-dark-foreground/5 border border-surface-dark-foreground/15 rounded-3xl p-6 md:p-10 text-surface-dark-foreground shadow-xl"
            >
              <h3 className="font-display text-xl md:text-2xl font-extrabold uppercase mb-6 text-center">
                {t('Leverans, upphämtning & service', 'Delivery, pickup & service')}
              </h3>
              <ul className="space-y-4 text-sm md:text-base leading-relaxed">
                {[
                  {
                    sv: 'Maten levereras varm i engångsförpackningar, redo att avnjutas.',
                    en: 'Food is delivered warm in disposable packaging, ready to enjoy.',
                  },
                  {
                    sv: 'Full-service-beställningar inkluderar uppdukning och presentation.',
                    en: 'Full-service orders include setup and presentation.',
                  },
                  {
                    sv: 'Fri upphämtning är möjlig på Flavor-Boss Kitchen, Hantverkaregatan 4, Arlöv.',
                    en: 'Free pickup is available at Flavor-Boss Kitchen, Hantverkaregatan 4, Arlöv.',
                  },
                  {
                    sv: 'Cateringboxar kan lånas för värmehållning och returneras inom en vecka.',
                    en: 'Catering boxes can be borrowed for heat retention and returned within a week.',
                  },
                  {
                    sv: 'Engångstallrikar, träbestick och servetter finns som tillval.',
                    en: 'Disposable plates, wooden cutlery and napkins are available as an add-on.',
                  },
                  {
                    sv: 'Afro-karibiska dukar och lyktor ingår som standard i alla cateringbeställningar.',
                    en: 'Afro-Caribbean tablecloths and lanterns are included as standard with all catering orders.',
                  },
                ].map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                    <span>{t(bullet.sv, bullet.en)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-surface-dark-foreground/15 flex items-center gap-3 text-sm md:text-base">
                <MapPin className="w-5 h-5 flex-shrink-0 text-primary" />
                <span className="font-medium">
                  Flavor-Boss Kitchen — Hantverkaregatan 4, Arlöv
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #ff612b, #ffae30)' }}>
          <div className="absolute inset-0 opacity-[0.08]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="info-waves" x="0" y="0" width="80" height="20" patternUnits="userSpaceOnUse">
                  <path d="M0,10 Q20,0 40,10 Q60,20 80,10" fill="none" stroke="hsl(0 0% 100%)" strokeWidth="1.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#info-waves)" />
            </svg>
          </div>

          <div className="container-site text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary-foreground font-display text-3xl md:text-4xl font-extrabold uppercase mb-6"
            >
              {t('Redo att boka oss?', 'Ready to book us?')}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <Button variant="hero" size="lg" asChild className="shadow-[0_4px_20px_hsla(22,95%,30%,0.5)]">
                <Link to="/boka-oss" onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}>{t('Boka Oss', 'Book Us')}</Link>
              </Button>
            </motion.div>
          </div>
        </section>
              <TrustQuotes seed="information" count={2} variant="dark" headingSv="Vad våra kunder säger" headingEn="What Our Clients Say" />
      </main>
    </>
  );
};

export default Information;
