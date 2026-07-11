import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section
      className="relative flex items-start md:items-center justify-center overflow-hidden pt-32 md:pt-0"
      style={{ minHeight: 'calc(100svh - 3.5rem)' }}
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero-bg.mp4"
        onPlaying={() => window.dispatchEvent(new Event('flavorboss:hero-video-started'))}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, hsla(280,30%,12%,0.75) 0%, hsla(22,95%,52%,0.4) 50%, hsla(332,90%,48%,0.5) 100%)',
        }}
      />

      {/* Animated decorative shapes */}
      <div className="absolute top-16 right-12 w-32 h-32 bg-secondary/20 rounded-full blur-2xl animate-blob" />
      <div className="absolute bottom-40 left-10 w-48 h-48 bg-accent/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-blob" style={{ animationDelay: '5s' }} />

      {/* Diagonal pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, white 20px, white 21px)',
      }} />

      <div className="text-center px-4 max-w-5xl relative z-10 pb-16 md:pb-16 pt-8 md:pt-0">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-subheading text-secondary mb-3 md:mb-6 tracking-[0.14em] md:tracking-[0.2em] text-[0.68rem] leading-tight md:text-base max-w-[18rem] md:max-w-none mx-auto"
        >
          {t('EN AFRO-KARIBISK UPPLEVELSE — MALMÖ & SKÅNE', 'AN AFRO-CARIBBEAN EXPERIENCE — MALMÖ & SKÅNE')}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-[3.25rem] md:text-7xl lg:text-[7rem] font-display font-extrabold uppercase text-primary-foreground mb-4 md:mb-6 leading-[1.05] md:leading-[0.85] max-w-[21rem] md:max-w-none mx-auto"
          style={{ textWrap: 'balance' } as React.CSSProperties}
        >
          {t('SVERIGES BÄSTA STREETFOOD', "SWEDEN'S BEST STREET FOOD")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-primary-foreground/80 text-base md:text-xl font-body mb-8 md:mb-10 tracking-widest"
        >
          Catering / Foodtruck / Event
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            variant="hero"
            size="lg"
            asChild
            className="shadow-[0_4px_30px_hsla(22,95%,52%,0.5)] bg-gradient-to-r from-[hsl(45_95%_55%)] via-[hsl(22_95%_52%)] to-[hsl(332_90%_48%)] bg-[length:200%_100%] bg-left hover:bg-right transition-[background-position] duration-700 ease-in-out hover:shadow-[0_6px_40px_hsla(332,90%,48%,0.6)]"
          >
            <Link to="/boka-oss" onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}>{t('Boka Oss', 'Book Us')}</Link>
          </Button>
          <Button variant="heroOutline" size="lg" asChild>
            <Link to="/upplevelser">{t('Se Upplevelser', 'See Experiences')}</Link>
          </Button>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/30 to-transparent" />
    </section>
  );
};

export default HeroSection;
