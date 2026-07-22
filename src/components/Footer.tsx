import { Link } from 'react-router-dom';
import { Instagram, Facebook, Music, Mail, Phone, MapPin, Star } from 'lucide-react';
import logoImg from '@/assets/logo-cutout.png';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdventurePath } from '@/lib/adventureLaunch';

const Footer = () => {
  const { t } = useLanguage();
  const adventurePath = useAdventurePath();

  return (
    <footer className="bg-surface-dark py-16 relative overflow-hidden" aria-label="Footer">
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(60deg, hsl(var(--surface-dark-foreground)) 25%, transparent 25.5%, transparent 75%, hsl(var(--surface-dark-foreground)) 75.5%),
          linear-gradient(120deg, hsl(var(--surface-dark-foreground)) 25%, transparent 25.5%, transparent 75%, hsl(var(--surface-dark-foreground)) 75.5%)
        `,
        backgroundSize: '50px 86px',
      }} />

      {/* Top accent strip */}
      <div className="absolute top-0 left-0 right-0 h-1.5 funky-gradient opacity-70" />

      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 — Logo */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-surface-dark-foreground mb-3">
              <img src={logoImg} alt="Flavor-Boss logo" className="w-7 h-7 object-contain" />
              <span className="font-display text-lg font-extrabold uppercase">Flavor-Boss</span>
            </Link>
            <p className="text-body text-surface-dark-foreground/70 text-sm mb-4">
              {t('En Afro-Karibisk Upplevelse', 'An Afro-Caribbean Experience')}
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com/flavorboss" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-5 h-5 text-surface-dark-foreground/70 hover:text-primary transition-colors" />
              </a>
              <a href="https://facebook.com/flavorboss" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="w-5 h-5 text-surface-dark-foreground/70 hover:text-primary transition-colors" />
              </a>
              <a href="https://tiktok.com/@flavorboss" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <Music className="w-5 h-5 text-surface-dark-foreground/70 hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Col 2 — Nav */}
          <div>
            <h3 className="text-subheading text-surface-dark-foreground mb-4">{t('Navigation', 'Navigation')}</h3>
            <nav aria-label={t('Footer-navigation', 'Footer navigation')}>
              <ul className="space-y-2">
                {[
                  { to: '/', sv: 'Hem', en: 'Home' },
                  { to: '/meny', sv: 'Meny', en: 'Menu' },
                  { to: '/upplevelser', sv: 'Helhetsupplevelse', en: 'Complete Experience' },
                  { to: '/information', sv: 'Information', en: 'Info' },
                  { to: '/boka-oss', sv: 'Boka Oss', en: 'Book Us' },
                  { to: adventurePath, sv: 'Vårt Äventyr', en: 'Our Adventure' },
                  { to: '/faq', sv: 'FAQ', en: 'FAQ' },
                ].map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-surface-dark-foreground/70 hover:text-primary transition-colors text-sm">
                      {t(link.sv, link.en)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <h3 className="text-subheading text-surface-dark-foreground mb-4">{t('Kontakt', 'Contact')}</h3>
            <address className="not-italic space-y-3 text-sm text-surface-dark-foreground/70">
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> <a href="mailto:info@flavorboss.se" className="hover:text-primary transition-colors">info@flavorboss.se</a></p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> <a href="tel:+46700663611" className="hover:text-primary transition-colors">+46 700 66 36 11</a></p>
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Hantverkaregatan 4, Arlöv, Sverige</p>
            </address>
          </div>

          {/* Col 4 — Newsletter */}
          <div>
            <h3 className="text-subheading text-surface-dark-foreground mb-4">{t('Nyhetsbrev', 'Newsletter')}</h3>
            <p className="text-sm text-surface-dark-foreground/70 mb-3">
              {t('Missa aldrig våra festivaler, tävlingar, pop up, erbjudanden och events', 'Never miss our festivals, competitions, pop-ups, offers and events')}
            </p>
            <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder={t('Din e-post', 'Your email')}
                className="flex-1 h-10 px-3 rounded-lg bg-surface-dark-foreground/10 text-surface-dark-foreground text-sm placeholder:text-surface-dark-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label={t('E-postadress', 'Email address')}
              />
              <button
                type="submit"
                className="h-10 px-4 rounded-full bg-accent text-accent-foreground text-sm font-bold hover:bg-accent/90 transition-colors"
              >
                {t('Skicka', 'Send')}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-surface-dark-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-surface-dark-foreground/50">
          <p>© 2025 Flavor-Boss AB. {t('Alla rättigheter förbehållna.', 'All rights reserved.')}</p>
          <div className="flex gap-4">
            <span>{t('Integritetspolicy', 'Privacy Policy')}</span>
            <span>{t('Cookiepolicy', 'Cookie Policy')}</span>
            <a href="https://g.page/flavorboss" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
              <Star className="w-3 h-3" /> {t('Se oss på Google', 'See us on Google')}
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-surface-dark-foreground/30 mt-4">
          Flavor-Boss AB | Hantverkaregatan 4, Arlöv | +46 700 66 36 11 | info@flavorboss.se
        </p>
      </div>
    </footer>
  );
};

export default Footer;
