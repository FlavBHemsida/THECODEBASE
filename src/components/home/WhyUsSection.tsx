import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdventurePath } from '@/lib/adventureLaunch';
import { Trophy } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const },
};

const timeline = [
  { year: '2016', sv: 'EVERY ENDING BECOMES A BEGINNING', en: 'EVERY ENDING BECOMES A BEGINNING' },
  { year: '2017', sv: 'RYKTET SPRIDER SIG',              en: 'WORD SPREADS' },
  { year: '2018', sv: 'DRÖMMEN TAR FORM',              en: 'THE DREAM TAKES SHAPE' },
  { year: '2019', sv: 'GENOMBROTTET',                  en: 'THE BREAKTHROUGH' },
  { year: '2020', sv: 'NÄR VÄRLDEN STANNADE… FORTSATTE VI', en: 'WHEN THE WORLD STOPPED… WE KEPT GOING' },
  { year: '2021', sv: 'MOD BELÖNAS',                   en: 'BOLDEST BET' },
  { year: '2022', sv: 'VÄRLDEN ÖPPNAR UPP IGEN',        en: 'THE WORLD OPENS UP AGAIN' },
  { year: '2023', sv: 'ALL IN. INGEN VÄG TILLBAKA.',    en: 'ALL IN. NO WAY BACK.' },
  { year: '2024', sv: 'STORMEN FÖRE NÄSTA NIVÅ',       en: 'THE STORM BEFORE THE NEXT LEVEL' },
  { year: '2025', sv: 'EN VÄRLD TAR FORM',              en: 'A WORLD TAKES SHAPE' },
  { year: '2026', sv: 'EN VÄRLD TAR FORM',              en: 'A WORLD TAKES SHAPE' },
];

const palette = ['bg-primary', 'bg-accent', 'bg-surface-green', 'bg-secondary'];
const trophyPalette = ['text-primary', 'text-accent', 'text-surface-green', 'text-secondary'];
const timelineColors = timeline.map((_, i) => palette[i % palette.length]);
const trophyColors  = timeline.map((_, i) => trophyPalette[i % trophyPalette.length]);

const WhyUsSection = () => {
  const { t } = useLanguage();
  const adventurePath = useAdventurePath();

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* African-inspired geometric pattern */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `
          repeating-linear-gradient(60deg, transparent, transparent 30px, hsl(var(--primary)) 30px, hsl(var(--primary)) 31px),
          repeating-linear-gradient(-60deg, transparent, transparent 30px, hsl(var(--accent)) 30px, hsl(var(--accent)) 31px),
          repeating-linear-gradient(0deg, transparent, transparent 40px, hsl(var(--secondary)) 40px, hsl(var(--secondary)) 41px)
        `,
      }} />

      {/* Floating color blobs */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-primary/15 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-accent/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-secondary/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />

      <div className="container-site relative z-10">
        <motion.h2 {...fadeUp} className="text-3xl md:text-5xl font-display font-extrabold text-center mb-3">
          {t('Vårt Äventyr', 'Our Adventure')}
        </motion.h2>
        <motion.p {...fadeUp} className="text-subheading text-primary text-center mb-12">
          {t('Priser & Utmärkelser', 'Awards & Achievements')}
        </motion.p>

        {/* Timeline grid - always fully visible */}
        {/* Flex-wrap + justify-center so partial last rows stay centered (textmaxing fix) */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 px-4">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] }}
                whileHover={{ y: -8 }}
                className="flex flex-col items-center group basis-[calc(50%-0.5rem)] sm:basis-[calc(25%-1.125rem)] lg:basis-[calc(20%-1.2rem)]"
              >
                <Link
                  to={adventurePath === '/var-resa' ? `${adventurePath}?year=${item.year}` : adventurePath}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
                  className="flex flex-col items-center cursor-pointer"
                  aria-label={t(`Gå till ${item.year} i Vårt Äventyr`, `Go to ${item.year} in Our Adventure`)}
                >
                  <Trophy className={`w-6 h-6 md:w-7 md:h-7 mb-2 ${trophyColors[i]}`} />
                  <motion.div
                    className={`w-5 h-5 rounded-full ${timelineColors[i]} mb-3 shadow-lg group-hover:scale-150 transition-transform`}
                  />
                  <span className="font-display text-3xl font-extrabold funky-gradient-text mb-2">{item.year}</span>
                  <p className="font-display uppercase tracking-tight text-foreground text-xs md:text-sm font-extrabold text-center max-w-[160px] leading-tight">{t(item.sv, item.en)}</p>
                </Link>
              </motion.div>
            ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            to={adventurePath}
            className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all text-lg group"
          >
            {t('Upplev hela äventyret', 'Experience the whole adventure')}
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
