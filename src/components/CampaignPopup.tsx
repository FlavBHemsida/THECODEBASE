import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Facebook } from 'lucide-react';
import logoImg from '@/assets/logo-cutout.png';
import bananaPlant from '@/assets/popup-banana-plant.webp';

import patternPalm from '@/assets/journey/pattern-palm.png';
import patternArrow from '@/assets/journey/pattern-arrow.png';
import patternZigzag from '@/assets/journey/pattern-zigzag.png';
import patternMask from '@/assets/journey/pattern-mask.png';
import patternBurst from '@/assets/journey/pattern-burst.png';
import patternDancer from '@/assets/journey/pattern-dancer.png';
import patternWave1 from '@/assets/journey/pattern-wave1.png';
import patternNote from '@/assets/journey/pattern-note.png';
import patternSun from '@/assets/journey/pattern-sun.png';
import patternPalm3 from '@/assets/journey/pattern-palm3.png';

const floatingIcons = [
  { src: patternPalm, size: 70, x: '4%', y: '8%', delay: 0 },
  { src: patternArrow, size: 55, x: '88%', y: '6%', delay: 0.4 },
  { src: patternZigzag, size: 65, x: '10%', y: '82%', delay: 1.0 },
  { src: patternMask, size: 70, x: '82%', y: '78%', delay: 0.6 },
  { src: patternBurst, size: 60, x: '92%', y: '38%', delay: 1.3 },
  { src: patternDancer, size: 80, x: '2%', y: '48%', delay: 0.2 },
  { src: patternWave1, size: 75, x: '70%', y: '90%', delay: 0.9 },
  { src: patternNote, size: 65, x: '46%', y: '4%', delay: 0.5 },
  { src: patternSun, size: 70, x: '54%', y: '92%', delay: 0.8 },
  { src: patternPalm3, size: 75, x: '78%', y: '22%', delay: 1.2 },
];

const CampaignPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('fb-campaign-popup-shown') === '1') return;
    const timer = window.setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem('fb-campaign-popup-shown', '1');
    }, 6000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="campaign-popup-title"
        >
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden"
            style={{
              backgroundImage: 'linear-gradient(135deg, #F07020 0%, #eb8a35 45%, #db4335 100%)',
            }}
          >
            {/* Floating dancing icons */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              {floatingIcons.map((icon, i) => (
                <motion.img
                  key={i}
                  src={icon.src}
                  alt=""
                  aria-hidden="true"
                  className="absolute select-none"
                  style={{
                    left: icon.x,
                    top: icon.y,
                    width: icon.size,
                    height: icon.size,
                    objectFit: 'contain',
                    opacity: 0.35,
                    filter: 'brightness(1.2) drop-shadow(0 2px 6px rgba(0,0,0,0.15))',
                  }}
                  animate={{
                    y: [0, -14, 4, -10, 0],
                    x: [0, 8, -6, 10, 0],
                    rotate: [0, 18, -12, 22, -8, 0],
                  }}
                  transition={{
                    y: { duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: icon.delay },
                    x: { duration: 5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: icon.delay },
                    rotate: { duration: 3.5 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: icon.delay },
                  }}
                />
              ))}
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Stäng"
              className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logo top-left */}
            <div className="absolute top-4 left-4 z-20">
              <img src={logoImg} alt="Flavor-Boss" className="h-12 md:h-14 w-auto object-contain" />
            </div>

            {/* Banana plant anchored at bottom-left — fully inside the card, gently floating */}
            <motion.img
              src={bananaPlant}
              alt=""
              aria-hidden="true"
              className="absolute z-20 pointer-events-none select-none hidden md:block"
              style={{
                left: '8px',
                bottom: '8px',
                width: '190px',
                height: 'auto',
                filter: 'drop-shadow(0 8px 18px rgba(0,0,0,0.35))',
                transformOrigin: 'bottom left',
              }}
              animate={{
                y: [0, -6, 2, -4, 0],
                x: [0, 3, -2, 4, 0],
                rotate: [-8, -5, -10, -6, -8],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Content — fully centered */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-10 pt-20 md:pt-24 pb-10 md:pb-12">
              <h2
                id="campaign-popup-title"
                className="font-display font-extrabold uppercase tracking-tight leading-[0.95] text-2xl md:text-4xl"
                style={{ color: '#ffe50f', textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}
              >
                HUGO BOSS HOTAR MED STÄMNING FÖR VÅRT NAMN!
              </h2>

              <p className="font-kurriCaps text-white text-sm md:text-lg mt-5 md:mt-6 leading-tight">
                Hjälp oss samla kraft &amp; stötta oss med din röst &amp; ekonomiskt här:
              </p>

              <p className="font-kurriCaps text-white text-sm md:text-base mt-5 md:mt-6 leading-snug">
                Skriv under namninsamlingen &amp; dela din röst via länken här
                <br />
                <a
                  href="https://www.gofundme.com/f/small-business-vs-hugo-boss-stand-with-flavorboss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-2 underline-offset-4 hover:opacity-80 transition-opacity"
                >
                  Gofundme fundraiser
                </a>
              </p>

              <p className="font-kurriCaps text-white text-sm md:text-base mt-5 md:mt-6 leading-snug">
                Swish: 1234989554, Flavor-Boss
                <br />
                Märk gåvan med #GoFlavorboss
              </p>

              {/* Social CTA — tilted & floating */}
              <motion.div
                className="mt-6 md:mt-8"
                animate={{
                  y: [0, -6, 3, -4, 0],
                  rotate: [-4, -2, -5, -1, -4],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <p
                  className="font-kurriCaps font-extrabold uppercase text-white leading-tight text-sm md:text-base tracking-wide"
                  style={{ textShadow: '0 2px 6px rgba(0,0,0,0.4)' }}
                >
                  FÖLJ OSS PÅ SOCIALA MEDIER FÖR UPPDATERING KRING VÅR KAMP!
                </p>
                <div className="flex items-center justify-center gap-3 mt-2 text-white">
                  <Instagram className="w-5 h-5" />
                  <Facebook className="w-5 h-5" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CampaignPopup;