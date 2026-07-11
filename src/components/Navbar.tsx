import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoImg from '@/assets/logo-cutout.png';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { path: '/', sv: 'Hem', en: 'Home' },
  { path: '/meny', sv: 'Meny', en: 'Menu' },
  
  { path: '/boka-oss', sv: 'Boka Oss', en: 'Book Us' },
  { path: '/aventyr-snart', sv: 'Vårt Äventyr', en: 'Our Adventure' },
  { path: '/pop-up', sv: 'POP-UP', en: 'POP-UP' },
  { path: '/faq', sv: 'FAQ', en: 'FAQ' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { lang, toggleLang, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onHide = () => setHidden(true);
    const onShow = () => setHidden(false);
    window.addEventListener('navbar:hide', onHide);
    window.addEventListener('navbar:show', onShow);
    return () => {
      window.removeEventListener('navbar:hide', onHide);
      window.removeEventListener('navbar:show', onShow);
    };
  }, []);

  // Always show navbar when changing routes
  useEffect(() => { setHidden(false); }, [location.pathname]);

  return (
    <>
      <a href="#main-content" className="skip-to-content">{t('Hoppa till innehåll', 'Skip to content')}</a>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-[72px] flex items-center ${
          scrolled ? 'bg-surface-dark shadow-lg' : 'bg-transparent'
        } ${hidden ? 'opacity-0 pointer-events-none -translate-y-full' : 'opacity-100 translate-y-0'}`}
        aria-label={t('Huvudnavigering', 'Main navigation')}
      >
        <div className="container-site flex items-center justify-between w-full">
          <Link to="/" className="flex items-center" aria-label="Flavor-Boss hem">
            <img src={logoImg} alt="Flavor-Boss logo" className="h-12 md:h-14 w-auto object-contain" />
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-subheading text-xs transition-colors hover:text-primary ${
                  location.pathname === item.path ? 'text-primary' : 'text-surface-dark-foreground'
                }`}
              >
                {lang === 'sv' ? item.sv : item.en}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="text-surface-dark-foreground text-xs font-display uppercase tracking-wider border border-surface-dark-foreground/30 rounded-full px-3 py-1.5 hover:bg-surface-dark-foreground/10 transition-colors"
              aria-label={t('Byt till engelska', 'Switch to Swedish')}
            >
              {lang === 'sv' ? 'EN' : 'SV'}
            </button>
            <Button variant="hero" size="sm" asChild className="shadow-[0_2px_15px_hsla(22,95%,52%,0.4)]">
              <Link to="/boka-oss">{t('Boka Nu', 'Book Now')}</Link>
            </Button>
          </div>

          <button className="lg:hidden text-surface-dark-foreground p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label={t('Öppna meny', 'Open menu')}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-surface-dark flex flex-col items-center justify-center gap-6"
          >
            {navItems.map((item, i) => (
              <motion.div key={item.path} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link
                  to={item.path}
                  className={`font-display text-3xl font-extrabold uppercase tracking-tight transition-colors hover:text-primary ${
                    location.pathname === item.path ? 'funky-gradient-text' : 'text-surface-dark-foreground'
                  }`}
                >
                  {lang === 'sv' ? item.sv : item.en}
                </Link>
              </motion.div>
            ))}
            <div className="flex items-center gap-4 mt-4">
              <button onClick={toggleLang} className="text-surface-dark-foreground text-sm font-display uppercase tracking-wider border border-surface-dark-foreground/30 rounded-full px-4 py-2 hover:bg-surface-dark-foreground/10 transition-colors">
                {lang === 'sv' ? 'EN' : 'SV'}
              </button>
              <Button variant="hero" asChild className="shadow-[0_4px_20px_hsla(22,95%,52%,0.5)]">
                <Link to="/boka-oss">{t('Boka Nu', 'Book Now')}</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
