import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Compass, ArrowLeft } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { useLanguage } from '@/contexts/LanguageContext';

// Launch date — bump this when you want to shift the countdown.
// Currently set to 20 days from July 13, 2026.
export const ADVENTURE_LAUNCH_DATE = new Date('2026-08-02T12:00:00+02:00');

const pad = (n: number) => String(Math.max(0, n)).padStart(2, '0');

const useCountdown = (target: Date) => {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, done: diff === 0 };
};

const AventyrSnart = () => {
  const { t, lang } = useLanguage();
  const { days, hours, minutes, seconds, done } = useCountdown(ADVENTURE_LAUNCH_DATE);

  const units = useMemo(
    () => [
      { value: pad(days), label: t('DAGAR', 'DAYS') },
      { value: pad(hours), label: t('TIMMAR', 'HOURS') },
      { value: pad(minutes), label: t('MINUTER', 'MINUTES') },
      { value: pad(seconds), label: t('SEKUNDER', 'SECONDS') },
    ],
    [days, hours, minutes, seconds, lang]
  );

  const launchLabel = ADVENTURE_LAUNCH_DATE.toLocaleDateString(lang === 'sv' ? 'sv-SE' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <SEOHead
        title={t('Vårt Äventyr kommer snart — Flavor-Boss', 'Our Adventure is coming soon — Flavor-Boss')}
        description={t(
          'Något stort är på väg. Vårt Äventyr — en interaktiv resa genom Flavor-Boss historia — släpps snart.',
          'Something big is on its way. Our Adventure — an interactive journey through Flavor-Boss history — launches soon.'
        )}
        canonical="https://www.flavorboss.se/aventyr-snart"
      />
      <main
        id="main-content"
        className="relative min-h-screen overflow-hidden pt-24 pb-20"
        style={{
          background:
            'radial-gradient(1200px 600px at 15% 10%, hsl(var(--primary) / 0.35), transparent 60%),' +
            'radial-gradient(900px 600px at 90% 20%, hsl(var(--accent) / 0.35), transparent 60%),' +
            'radial-gradient(1100px 700px at 50% 110%, hsl(var(--surface-green) / 0.45), transparent 65%),' +
            'linear-gradient(160deg, #1a0d22 0%, #2a0f1f 55%, #0e1a14 100%)',
        }}
      >
        {/* Organic floating blobs */}
        <motion.div
          aria-hidden
          className="absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-primary/30 blur-3xl"
          animate={{ x: [0, 40, -20, 0], y: [0, 30, -10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="absolute top-1/3 -right-24 w-[460px] h-[460px] rounded-full bg-accent/30 blur-3xl"
          animate={{ x: [0, -30, 20, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-32 left-1/3 w-[520px] h-[520px] rounded-full bg-surface-green/40 blur-3xl"
          animate={{ x: [0, 25, -25, 0], y: [0, -25, 15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Subtle pattern overlay */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07] mix-blend-soft-light"
          style={{
            backgroundImage: `
              repeating-linear-gradient(60deg, transparent 0 30px, hsl(var(--primary)) 30px 31px),
              repeating-linear-gradient(-60deg, transparent 0 30px, hsl(var(--accent)) 30px 31px)
            `,
          }}
        />

        <div className="container-site relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs md:text-sm font-display uppercase tracking-[0.25em] text-white/90">
              {t('Kommer Snart', 'Coming Soon')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display font-extrabold uppercase tracking-tight text-white text-4xl sm:text-6xl md:text-7xl leading-[1.1] pt-2"
          >
            {t('Vårt Äventyr', 'Our Adventure')}
            <span className="block mt-3 pt-1 funky-gradient-text">
              {t('är på väg', 'is on the way')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base md:text-lg text-white/80"
          >
            {t(
              'En interaktiv resa genom Flavor-Boss historia — från första gnistan till idag. Vi finputsar de sista detaljerna. Räkna ner med oss.',
              'An interactive journey through Flavor-Boss history — from the first spark to today. We are polishing the final details. Count down with us.'
            )}
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 w-full max-w-3xl"
            aria-live="polite"
          >
            {units.map((u, i) => (
              <div
                key={u.label}
                className="relative rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] overflow-hidden"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-60"
                  style={{
                    background:
                      i % 2 === 0
                        ? 'linear-gradient(160deg, hsl(var(--primary) / 0.35), transparent 70%)'
                        : 'linear-gradient(160deg, hsl(var(--accent) / 0.35), transparent 70%)',
                  }}
                />
                <div className="relative px-3 py-6 sm:py-8 flex flex-col items-center">
                  <motion.span
                    key={u.value}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight funky-gradient-text tabular-nums"
                  >
                    {u.value}
                  </motion.span>
                  <span className="mt-2 text-[10px] sm:text-xs font-display uppercase tracking-[0.3em] text-white/80">
                    {u.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 text-sm md:text-base text-white/70 font-display uppercase tracking-[0.25em]"
          >
            {done
              ? t('Vi är live — kom tillbaka snart!', 'We are live — come back soon!')
              : t(`Lansering: ${launchLabel}`, `Launch: ${launchLabel}`)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 font-display uppercase tracking-wider text-sm text-white backdrop-blur-md transition-all hover:bg-white/20 hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('Tillbaka hem', 'Back home')}
            </Link>
            <Link
              to="/meny"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 font-display uppercase tracking-wider text-sm text-white shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.8)] transition-all hover:-translate-y-0.5"
            >
              <Compass className="w-4 h-4" />
              {t('Utforska menyn', 'Explore the menu')}
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default AventyrSnart;