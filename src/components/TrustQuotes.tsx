import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickReviews } from '@/data/reviews';

interface TrustQuotesProps {
  /** Stable seed so different pages show different (but stable) reviews */
  seed: string;
  /** How many quotes to render (default 2) */
  count?: number;
  /** Visual variant */
  variant?: 'light' | 'dark';
  /** Optional eyebrow / heading shown above the quotes */
  eyebrowSv?: string;
  eyebrowEn?: string;
  headingSv?: string;
  headingEn?: string;
  className?: string;
}

const TrustQuotes = ({
  seed,
  count = 2,
  variant = 'light',
  eyebrowSv = 'Riktiga recensioner',
  eyebrowEn = 'Real Reviews',
  headingSv,
  headingEn,
  className = '',
}: TrustQuotesProps) => {
  const { t } = useLanguage();
  const items = pickReviews(seed, count);

  const isDark = variant === 'dark';
  // Both variants now use a warm afro-caribbean palette (deep green canvas
  // with orange/pink accents) — never cream/white, which clashes with the brand.
  const cardBase = 'bg-white/5 backdrop-blur-sm border-white/15 text-white';

  return (
    <section
      className={`section-padding relative overflow-hidden ${className}`}
      style={{
        background:
          'radial-gradient(circle at 20% 20%, hsl(var(--accent) / 0.35), transparent 55%), radial-gradient(circle at 85% 80%, hsl(var(--primary) / 0.4), transparent 55%), linear-gradient(135deg, #1a3d2e 0%, #2D6A4F 50%, #1f4a38 100%)',
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-10 -left-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-80 h-80 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

      <div className="container-site relative z-10">
        {(eyebrowSv || headingSv) && (
          <div className="text-center mb-8 md:mb-10">
            {eyebrowSv && (
              <p className="text-subheading text-accent mb-2">{t(eyebrowSv, eyebrowEn)}</p>
            )}
            {headingSv && (
              <h2 className="text-2xl md:text-4xl font-display font-extrabold text-white">
                {t(headingSv, headingEn || headingSv)}
              </h2>
            )}
          </div>
        )}

        <div
          className={`grid gap-6 ${
            count === 1 ? 'max-w-3xl mx-auto' : count >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
          }`}
        >
          {items.map((r, i) => (
            <motion.blockquote
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative rounded-3xl border p-6 md:p-8 ${cardBase}`}
            >
              <Quote className="absolute -top-3 left-6 w-8 h-8 text-white bg-primary rounded-full p-1.5 border-2 border-white/30 shadow-lg" />
              <div className="flex gap-1 mb-3 text-accent">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-body text-sm md:text-base leading-relaxed mb-4 text-white/90">
                {t(r.quoteSv, r.quoteEn)}
              </p>
              <footer className="text-xs uppercase tracking-wider font-display font-bold">
                <span className="text-accent">{r.name}</span>
                {r.title && (
                  <span className="block normal-case tracking-normal mt-1 font-body font-normal text-white/60">
                    {r.title}
                  </span>
                )}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustQuotes;
