import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const StatsStrip = () => {
  const { t } = useLanguage();

  const stats = [
    { value: '2016', labelSv: 'Grundat', labelEn: 'Founded', link: null },
    { value: '4 år i rad', labelSv: 'Sverigemästare', labelEn: 'Swedish Champions', link: null },
    { value: '30 000+', labelSv: 'Följare', labelEn: 'Followers', link: 'https://www.instagram.com/flavorbosstrich/?hl=en' },
    { value: '100%', labelSv: 'Kärlek och vibes', labelEn: 'Love & vibes', link: null },
  ];

  return (
    <section className="warm-gradient py-10 md:py-14 relative overflow-hidden">
      {/* Wave pattern */}
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, white 40px, white 41px)',
      }} />

      <div className="container-site relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {stats.map((stat, i) => {
            const content = (
              <>
                <p className="text-3xl md:text-5xl font-display font-extrabold text-primary-foreground mb-1">{stat.value}</p>
                <p className="text-primary-foreground/80 text-xs md:text-sm uppercase tracking-widest font-body">{t(stat.labelSv, stat.labelEn)}</p>
              </>
            );

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                {stat.link ? (
                  <a href={stat.link} target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform cursor-pointer">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
