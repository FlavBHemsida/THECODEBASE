import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickReviews } from '@/data/reviews';

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

// Same dancing floating icons used on the Information ("Mer Info") page hero
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

const TestimonialsSection = () => {
  const { t } = useLanguage();

  const picked = pickReviews('home-testimonials', 5);
  const testimonials = picked.map((r) => ({
    quoteSv: r.quoteSv,
    quoteEn: r.quoteEn,
    nameSv: r.title ? `${r.name} — ${r.title}` : r.name,
    nameEn: r.title ? `${r.name} — ${r.title}` : r.name,
  }));

  return (
    <section className="section-padding bg-surface-dark relative overflow-hidden">
      {/* Accent blobs */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-10 left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />

      {/* Dancing floating icons (same as Mer Info hero) */}
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
            opacity: 0.35,
            filter: 'brightness(1.3) drop-shadow(0 2px 8px rgba(0,0,0,0.2))',
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

      <div className="container-site relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-display font-extrabold text-surface-dark-foreground text-center mb-3"
        >
          {t('Vad våra kunder säger', 'What Our Clients Say')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-subheading text-primary text-center mb-10 md:mb-14"
        >
          {t('Riktiga recensioner', 'Real Reviews')}
        </motion.p>

        {/* Big quote cards with pop-in animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.slice(0, 3).map((item, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, scale: 0.7, rotate: -3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.15, duration: 0.6, type: 'spring', stiffness: 120 }}
              whileHover={{ scale: 1.03, rotate: 1 }}
              className="bg-surface-dark-foreground/5 border border-surface-dark-foreground/10 rounded-3xl p-8 md:p-10 relative group"
            >
              <span className="absolute -top-5 left-6 text-6xl text-primary font-display leading-none opacity-80 group-hover:opacity-100 transition-opacity">"</span>
              <p className="text-surface-dark-foreground/90 text-base md:text-lg font-body leading-relaxed mb-6 pt-4">
                {t(item.quoteSv, item.quoteEn)}
              </p>
              <footer className="text-surface-dark-foreground/60 text-xs uppercase tracking-wider font-display font-bold">
                {t(item.nameSv, item.nameEn)}
              </footer>
            </motion.blockquote>
          ))}
        </div>

        {/* Two featured big quotes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {testimonials.slice(3).map((item, i) => (
            <motion.blockquote
              key={i + 3}
              initial={{ opacity: 0, x: i === 0 ? -60 : 60, scale: 0.85 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.7, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -6 }}
              className="bg-gradient-to-br from-primary/15 to-accent/10 border border-primary/20 rounded-3xl p-8 md:p-10 relative"
            >
              <span className="absolute -top-5 left-6 text-6xl text-accent font-display leading-none opacity-70">"</span>
              <p className="text-surface-dark-foreground text-lg md:text-xl font-body leading-relaxed mb-6 pt-4">
                {t(item.quoteSv, item.quoteEn)}
              </p>
              <footer className="text-primary text-xs uppercase tracking-wider font-display font-bold">
                {t(item.nameSv, item.nameEn)}
              </footer>
            </motion.blockquote>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.google.com/maps/place/Flavor-Boss+Catering,+Foodtruck+och+Events/@55.6365031,13.0761538,18z/data=!4m8!3m7!1s0x4653a384d94f0b8f:0xb3fe10397dd7fec2!8m2!3d55.6361508!4d13.0766103!9m1!1b1!16s%2Fg%2F11khzpm589?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-display font-bold text-sm md:text-base uppercase tracking-wider text-primary-foreground funky-gradient hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            {t('Gör en recension', 'Leave a Review')} <span>&rarr;</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
