import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const },
};

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const socials = [
  {
    name: 'Instagram',
    icon: <Instagram className="w-8 h-8" />,
    url: 'https://www.instagram.com/flavorbosstrich/',
    gradient: 'from-[#f09433] via-[#e6683c] to-[#dc2743]',
    handle: '@flavorbosstrich',
  },
  {
    name: 'Facebook',
    icon: <FacebookIcon />,
    url: 'https://www.facebook.com/flavorbosstrich',
    gradient: 'from-[#1877F2] to-[#0C5DC7]',
    handle: 'Flavor-Boss',
  },
  {
    name: 'TikTok',
    icon: <TikTokIcon />,
    url: 'https://www.tiktok.com/@flavorbosstrich',
    gradient: 'from-[#010101] via-[#25F4EE] to-[#FE2C55]',
    handle: '@flavorbosstrich',
  },
  {
    name: 'LinkedIn',
    icon: <LinkedInIcon />,
    url: 'https://www.linkedin.com/company/flavor-boss-catering-foodtruck-events/posts/?feedView=all',
    gradient: 'from-[#0077B5] to-[#005885]',
    handle: 'Flavor-Boss Catering',
  },
];

interface InstagramFeedProps {
  /** Tighter spacing/sizing for contexts where vertical space is at a premium (e.g. the /var-resa intro screen). */
  compact?: boolean;
}

const InstagramFeed = ({ compact = false }: InstagramFeedProps) => {
  const { t } = useLanguage();

  return (
    <section className={`${compact ? 'pt-6 pb-10 md:section-padding' : 'section-padding'} bg-surface-dark relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle, hsl(var(--surface-dark-foreground)) 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }} />

      <div className="absolute top-10 left-20 w-48 h-48 bg-accent/8 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-36 h-36 bg-primary/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />

      <div className="container-site relative z-10">
        <motion.div {...fadeUp} className={compact ? 'text-center mb-4' : 'text-center mb-10'}>
          <h2 className={`${compact ? 'text-xl md:text-5xl mb-1' : 'text-3xl md:text-5xl mb-3'} font-display font-extrabold text-surface-dark-foreground`}>
            {t('Följ Oss', 'Follow Us')}
          </h2>
          <p className="text-subheading text-primary">@flavorbosstrich</p>
        </motion.div>

        <div className={`grid grid-cols-2 sm:grid-cols-4 ${compact ? 'gap-3 md:gap-6' : 'gap-6'} max-w-4xl mx-auto`}>
          {socials.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className={`aspect-square rounded-3xl bg-gradient-to-br ${social.gradient} flex flex-col items-center justify-center ${compact ? 'p-3 md:p-5' : 'p-5'} shadow-lg hover:shadow-2xl transition-shadow group relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
              <div className={`text-primary-foreground ${compact ? 'mb-1 md:mb-3' : 'mb-3'} relative z-10 group-hover:scale-110 transition-transform`}>
                {social.icon}
              </div>
              <p className="text-primary-foreground text-xs font-display font-bold uppercase text-center relative z-10">{social.name}</p>
              <p className="text-primary-foreground/70 text-[10px] text-center relative z-10 mt-1 truncate w-full">{social.handle}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
