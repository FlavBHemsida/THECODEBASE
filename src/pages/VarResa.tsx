import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import TimelineJourney from '@/components/journey/TimelineJourney';
import InstagramFeed from '@/components/home/InstagramFeed';
import AdventureGate from '@/components/AdventureGate';

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

const floatingIcons = [
  { src: patternPalm, size: 120, x: '8%', y: '12%', delay: 0 },
  { src: patternArrow, size: 85, x: '85%', y: '8%', delay: 0.5 },
  { src: patternZigzag, size: 100, x: '15%', y: '75%', delay: 1.2 },
  { src: patternMask, size: 110, x: '78%', y: '70%', delay: 0.8 },
  { src: patternBurst, size: 95, x: '90%', y: '40%', delay: 1.5 },
  { src: patternDancer, size: 130, x: '5%', y: '45%', delay: 0.3 },
  { src: patternWave1, size: 130, x: '70%', y: '85%', delay: 1.0 },
  { src: patternWave2, size: 100, x: '30%', y: '5%', delay: 1.8 },
  { src: patternNote, size: 110, x: '55%', y: '15%', delay: 0.6 },
  { src: patternMusic, size: 105, x: '40%', y: '80%', delay: 1.3 },
  { src: patternDancer2, size: 140, x: '25%', y: '35%', delay: 0.4 },
  { src: patternDancer3, size: 90, x: '65%', y: '55%', delay: 1.1 },
  { src: patternPalm2, size: 115, x: '48%', y: '90%', delay: 0.7 },
  { src: patternTribal, size: 100, x: '92%', y: '25%', delay: 1.6 },
  { src: patternZigzag2, size: 95, x: '20%', y: '60%', delay: 0.9 },
  { src: patternPalm3, size: 125, x: '75%', y: '35%', delay: 1.4 },
  { src: patternPalm4, size: 100, x: '12%', y: '28%', delay: 0.2 },
  { src: patternHut, size: 130, x: '60%', y: '8%', delay: 1.7 },
  { src: patternFace, size: 90, x: '88%', y: '60%', delay: 0.55 },
  { src: patternPalm5, size: 110, x: '35%', y: '65%', delay: 1.05 },
  { src: patternSun, size: 115, x: '50%', y: '45%', delay: 0.85 },
  { src: patternNotes2, size: 85, x: '82%', y: '88%', delay: 1.35 },
  { src: patternDancer4, size: 135, x: '42%', y: '22%', delay: 0.15 },
];

const VarResa = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState<'landing' | 'intro' | 'journey'>('landing');
  const [searchParams] = useSearchParams();
  const initialYear = searchParams.get('year') ?? undefined;

  useEffect(() => {
    if (initialYear) setStep('journey');
  }, [initialYear]);

  return (
    <>
      <SEOHead
        title={t('Vårt Äventyr — Flavor-Boss', 'Our Adventure — Flavor-Boss')}
        description={t(
          'Följ med Flavor-Boss äventyr från 2016 till idag.',
          'Follow the Flavor-Boss adventure from 2016 to today.'
        )}
        canonical="https://www.flavorboss.se/var-resa"
      />
      <main id="main-content" className="min-h-screen">
        <AnimatePresence mode="wait">
          {step === 'landing' ? (
            <AdventureGate key="landing" onEnter={() => setStep('intro')} />
          ) : step === 'intro' ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="relative min-h-screen overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #ffae30 0%, #ff612b 50%, #E8186D 100%)' }}
            >
              {/* Dancing floating icons behind content */}
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
                    opacity: 0.3,
                    filter: 'brightness(1.3) drop-shadow(0 2px 8px rgba(0,0,0,0.15))',
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 0.3,
                    scale: 1,
                    y: [0, -18, 5, -12, 0],
                    x: [0, 10, -8, 12, 0],
                    rotate: [0, 20, -15, 25, -10, 0],
                  }}
                  transition={{
                    opacity: { duration: 0.6, delay: icon.delay * 0.2 },
                    scale: { duration: 0.6, delay: icon.delay * 0.2 },
                    y: { duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: icon.delay },
                    x: { duration: 5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: icon.delay },
                    rotate: { duration: 3.5 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: icon.delay },
                  }}
                />
              ))}

              <div className="relative z-10 container-site py-8 md:py-24 flex flex-col items-center text-center">
                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                  className="text-subheading text-secondary mb-3 md:mb-6 tracking-[0.14em] md:tracking-[0.2em] text-[0.68rem] leading-tight md:text-base max-w-[18rem] md:max-w-none mx-auto"
                >
                  {t('Vårt Äventyr', 'Our Adventure')}
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.25, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                  className="font-display font-extrabold uppercase text-white text-5xl md:text-7xl lg:text-8xl leading-[0.95] drop-shadow-[0_6px_30px_rgba(0,0,0,0.25)] max-w-4xl"
                >
                  {t('Every queue has a story', 'Every queue has a story')}
                  <span className="block text-secondary">{t('This is ours', 'This is ours')}</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.6 }}
                  className="mt-5 md:mt-8 max-w-2xl text-white/95 text-sm md:text-lg leading-relaxed whitespace-pre-line"
                >
                  {t(
                    'Du står förmodligen i en av våra köer just nu.\nKanske har du redan hört musiken.\nKanske känner du doften från grillen.\nKanske undrar du varför människor väntar så länge på en Flavor-Box.\nSvaret handlar egentligen inte om maten.\nDet handlar om människorna.\nOm kulturen.\nOm känslan.\nOch om en resa som började långt innan den första foodtrucken rullade ut.\nFrån en dröm i ett hemmakök i Malmö.\nTill festivaler.\nTV.\nTre foodtrucks.\nFyra svenska mästerskap.\nNordiska mästare.\nTill internationella möten och arrangemang med människor från hela världen.\nOch en vision som fortfarande bara är i början.\nSå…\ninnan du tar första tuggan.\nFölj med tillbaka.\nDär äventyret började.',
                    'You\'re probably standing in one of our queues right now.\nMaybe you\'ve already heard the music.\nMaybe you can smell the grill.\nMaybe you\'re wondering why people wait so long for a Flavor-Box.\nThe answer isn\'t really about the food.\nIt\'s about the people.\nAbout the culture.\nAbout the feeling.\nAnd about a journey that began long before the first food truck rolled out.\nFrom a dream in a home kitchen in Malmö.\nTo festivals.\nTV.\nThree food trucks.\nFour Swedish championships.\nNordic champions.\nTo international meetings and events with people from all over the world.\nAnd a vision that is still only just beginning.\nSo…\nbefore you take the first bite.\nCome back with us.\nTo where the adventure began.'
                  )}
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setStep('journey')}
                  className="mt-6 md:mt-10 px-10 py-4 text-lg md:text-xl font-display font-extrabold uppercase tracking-wider text-white"
                  style={{
                    background: 'linear-gradient(135deg, hsl(22 95% 52%), hsl(332 90% 48%), hsl(280 60% 45%))',
                    borderRadius: '2rem 1rem 2rem 1rem',
                    boxShadow: '0 0 30px rgba(0,0,0,0.25), 0 10px 30px rgba(0,0,0,0.2)',
                  }}
                >
                  {t('Starta resan', 'Start the journey')}
                </motion.button>
              </div>

              {/* Socials block, same as Hem page — compact so it stays as close to the fold as possible */}
              <div className="relative z-10">
                <InstagramFeed compact />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="journey"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <TimelineJourney initialYear={initialYear} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default VarResa;
