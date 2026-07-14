import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

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

interface AdventureGateProps {
  onEnter: () => void;
  zIndexClass?: string;
}

const AdventureGate = ({ onEnter, zIndexClass = 'z-50' }: AdventureGateProps) => {
  const { t } = useLanguage();

  return (
    <motion.div
      className={`fixed inset-0 flex items-center justify-center ${zIndexClass} overflow-hidden`}
      style={{
        background: 'linear-gradient(135deg, #ffae30, #ff612b)',
      }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
    >
      {/* Dancing floating icons */}
      {floatingIcons.map((icon, i) => {
        const mobileSize = Math.max(32, Math.round(icon.size * 0.4));
        return (
        <motion.img
          key={i}
          src={icon.src}
          alt=""
          className="absolute pointer-events-none select-none w-[var(--icon-mobile)] h-[var(--icon-mobile)] md:w-[var(--icon-desktop)] md:h-[var(--icon-desktop)]"
          style={{
            left: icon.x,
            top: icon.y,
            objectFit: 'contain',
            opacity: 0.5,
            filter: 'brightness(1.3) drop-shadow(0 2px 8px rgba(0,0,0,0.1))',
            ['--icon-mobile' as string]: `${mobileSize}px`,
            ['--icon-desktop' as string]: `${icon.size}px`,
          } as CSSProperties}
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
        );
      })}

      <motion.button
        onClick={onEnter}
        className="relative z-10 max-w-[85vw] text-center whitespace-normal leading-snug px-6 py-3 text-base sm:px-9 sm:py-4 sm:text-xl md:px-12 md:py-5 md:text-3xl font-display font-extrabold uppercase tracking-wide md:tracking-wider text-white"
        style={{
          background: 'linear-gradient(135deg, #ff612b, #ffae30)',
          borderRadius: '2rem 1rem 2rem 1rem',
          boxShadow: '0 0 40px rgba(255, 97, 43, 0.5), 0 0 80px rgba(255, 174, 48, 0.3)',
        }}
        whileHover={{
          scale: 1.08,
          boxShadow: '0 0 60px rgba(255, 97, 43, 0.7), 0 0 120px rgba(255, 174, 48, 0.5)',
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {t('Follow The Adventure', 'Follow The Adventure')}
      </motion.button>
    </motion.div>
  );
};

export default AdventureGate;
