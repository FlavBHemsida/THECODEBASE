import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import aboutBg from '@/assets/about-bg.png';
import aboutPortrait from '@/assets/about-portrait.png';

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
  { src: patternPalm, size: 70, x: '4%', y: '6%', delay: 0 },
  { src: patternArrow, size: 50, x: '88%', y: '4%', delay: 0.5 },
  { src: patternZigzag, size: 60, x: '8%', y: '78%', delay: 1.2 },
  { src: patternMask, size: 65, x: '82%', y: '74%', delay: 0.8 },
  { src: patternBurst, size: 55, x: '90%', y: '40%', delay: 1.5 },
  { src: patternDancer, size: 75, x: '2%', y: '42%', delay: 0.3 },
  { src: patternWave1, size: 70, x: '70%', y: '88%', delay: 1.0 },
  { src: patternWave2, size: 55, x: '34%', y: '3%', delay: 1.8 },
  { src: patternNote, size: 55, x: '60%', y: '12%', delay: 0.6 },
  { src: patternMusic, size: 55, x: '38%', y: '84%', delay: 1.3 },
  { src: patternDancer2, size: 75, x: '22%', y: '32%', delay: 0.4 },
  { src: patternDancer3, size: 50, x: '66%', y: '52%', delay: 1.1 },
  { src: patternPalm2, size: 60, x: '48%', y: '92%', delay: 0.7 },
  { src: patternTribal, size: 55, x: '92%', y: '22%', delay: 1.6 },
  { src: patternZigzag2, size: 50, x: '18%', y: '58%', delay: 0.9 },
  { src: patternPalm3, size: 70, x: '76%', y: '32%', delay: 1.4 },
  { src: patternPalm4, size: 55, x: '10%', y: '24%', delay: 0.2 },
  { src: patternHut, size: 70, x: '58%', y: '2%', delay: 1.7 },
  { src: patternFace, size: 50, x: '88%', y: '58%', delay: 0.55 },
  { src: patternPalm5, size: 60, x: '34%', y: '62%', delay: 1.05 },
  { src: patternSun, size: 65, x: '50%', y: '46%', delay: 0.85 },
  { src: patternNotes2, size: 50, x: '82%', y: '90%', delay: 1.35 },
  { src: patternDancer4, size: 75, x: '42%', y: '20%', delay: 0.15 },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const },
};

const AboutSection = () => {
  const { t, lang } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  const firstHalfSv = [
    'Patricia Dianda “Flavor-Boss Trich”',
    'Från sitt hemmakök i Malmö till en av Sveriges mest prisbelönta streetfood-entreprenörer – med en tillväxt på över 800% de senaste åren.',
    'Sedan 2016 har hon byggt Flavor-Boss till ett afro-karibiskt smakimperium och en mobil mötesplats där mat, kultur och människor möts.',
    'Det som började med matlådor växte snabbt till backyard BBQs, foodtruck-events och catering över hela Sverige och internationellt.',
    'Flavor-Boss är mer än mat. Det är en rörelse.',
    'Med över 30 000 följare följer communityn resan i realtid – från Sveriges längsta festivalköer, priser och TV-framträdanden till dans, energi och minnesvärda upplevelser.',
    'Hon står inte bara bakom maten. Hon står för sin vision. Sin röst. Sin community.',
    '@flavorbosstrich',
  ];
  const firstHalfEn = [
    'Patricia Dianda “Flavor-Boss Trich”',
    'From her home kitchen in Malmö to one of Sweden’s most award-winning streetfood entrepreneurs – with growth of over 800% in recent years.',
    'Since 2016 she has built Flavor-Boss into an Afro-Caribbean flavor empire and a mobile meeting place where food, culture and people come together.',
    'What started as meal boxes quickly grew into backyard BBQs, food truck events and catering across all of Sweden and internationally.',
    'Flavor-Boss is more than food. It is a movement.',
    'With over 30,000 followers the community follows the journey in real time – from Sweden’s longest festival queues, awards and TV appearances to dance, energy and memorable experiences.',
    'She doesn’t just stand behind the food. She stands for her vision. Her voice. Her community.',
    '@flavorbosstrich',
  ];
  const secondHalfSv: string[] = [];
  const secondHalfEn: string[] = [];

  const firstHalf = lang === 'sv' ? firstHalfSv : firstHalfEn;
  const secondHalf = lang === 'sv' ? secondHalfSv : secondHalfEn;

  return (
    <section className="section-padding relative overflow-hidden" style={{ backgroundImage: `url(${aboutBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      {/* Subtle diagonal lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 30px, hsl(var(--foreground)) 30px, hsl(var(--foreground)) 31px)',
      }} />

      {/* Mobile-only dancing floating icons */}
      <div className="md:hidden absolute inset-0 pointer-events-none z-0" aria-hidden="true">
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
              opacity: { duration: 0.6, delay: icon.delay },
              scale: { duration: 0.6, delay: icon.delay },
              y: { duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: icon.delay },
              x: { duration: 5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: icon.delay },
              rotate: { duration: 3.5 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: icon.delay },
            }}
          />
        ))}
      </div>

      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Portrait image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden border-4 border-white/20 shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              <img
                src={aboutPortrait}
                alt="Patricia Dianda — Flavor-Boss Trich"
                className="w-full h-auto object-cover aspect-[4/5]"
                loading="lazy"
              />
            </div>
            {/* Decorative leaf accents */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary rounded-full blur-2xl opacity-40 pointer-events-none" />
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-accent rounded-full blur-2xl opacity-30 pointer-events-none" />
          </motion.div>

          {/* Text content */}
          <motion.div {...fadeUp}>
            <p className="text-subheading text-accent mb-3">{t('Afro-Karibisk Catering Malmö', 'Afro-Caribbean Catering Malmö')}</p>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-5">
              {t('Om Flavor-Boss', 'About Flavor-Boss')}
            </h2>
            {firstHalf.map((p, i) => (
              <p key={`f-${i}`} className="text-body text-white font-semibold mb-4 text-base md:text-lg drop-shadow-lg">
                {p}
              </p>
            ))}

            {secondHalf.length > 0 && (
              <>
                <motion.div
                  initial={false}
                  animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-2">
                    {secondHalf.map((p, i) => (
                      <p key={`s-${i}`} className="text-body text-white font-semibold mb-4 text-base md:text-lg drop-shadow-lg">
                        {p}
                      </p>
                    ))}
                  </div>
                </motion.div>

                <button
                  type="button"
                  onClick={() => setExpanded(v => !v)}
                  aria-expanded={expanded}
                  aria-label={expanded ? t('Visa mindre', 'Show less') : t('Visa mer', 'Show more')}
                  className="my-4 inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform"
                >
                  <ChevronRight
                    className={`w-6 h-6 transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`}
                  />
                </button>
              </>
            )}

            <div>
              <Link to="/aventyr-snart" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all text-lg group">
                {t('Vårt Äventyr', 'Our Adventure')} <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
