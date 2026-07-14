import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import SectionDivider from '@/components/SectionDivider';
import { Mail, Phone, MapPin, Info, Route } from 'lucide-react';
import { Check } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import heroBooking from '@/assets/hero-booking.jpg';
import turkosDividerPattern from '@/assets/pattern-turkos-divider.png';
import TrustQuotes from '@/components/TrustQuotes';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const },
};

const BokaOss = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', date: '', maxGuests: '', minGuests: '', eventType: '', specialDiet: '', deliveryMethod: '', menu: '', message: '',
  });
  const [menus, setMenus] = useState<string[]>([]);
  const toggleMenu = (value: string) =>
    setMenus(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  const todayStr = new Date().toISOString().split('T')[0];
  const [extras, setExtras] = useState({
    djFullon: false,
    djBoost: false,
    popupMascot: false,
    fullMascot: false,
    decoMedium: false,
    decoLuxury: false,
    grillUpplevelse: false,
    foodtruckUpplevelse: false,
    bufféUpplevelse: false,
    boozeTruck: false,
    boozeBar: false,
    servingStaff: false,
    exklusivVardinna: false,
    bokaPatricia: false,
  });

  const toggleExtra = (key: keyof typeof extras) => setExtras(prev => ({ ...prev, [key]: !prev[key] }));

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        menus,
        extras: Object.entries(extras)
          .filter(([, v]) => v)
          .map(([k]) => k),
      };
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      };
      const res = await fetch('https://meggamind.app.n8n.cloud/webhook/CateringBokaOss', options);
      if (!res.ok) throw new Error('Request failed');
      setSent(true);
      setForm({ name: '', email: '', phone: '', address: '', date: '', maxGuests: '', minGuests: '', eventType: '', specialDiet: '', deliveryMethod: '', menu: '', message: '' });
      setMenus([]);
      setExtras({
        djFullon: false,
        djBoost: false,
        popupMascot: false,
        fullMascot: false,
        decoMedium: false,
        decoLuxury: false,
        grillUpplevelse: false,
        foodtruckUpplevelse: false,
        bufféUpplevelse: false,
        boozeTruck: false,
        boozeBar: false,
        servingStaff: false,
        exklusivVardinna: false,
        bokaPatricia: false,
      });
    } catch {
      alert(t('Något gick fel. Försök igen senare.', 'Something went wrong. Please try again later.'));
    } finally {
      setSubmitting(false);
    }
  }, [form, extras, t]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Flavor-Boss Catering Event',
    location: { '@type': 'Place', name: 'Flavor-Boss', address: { '@type': 'PostalAddress', streetAddress: 'Hantverkaregatan 4', addressLocality: 'Arlöv', addressCountry: 'SE' } },
    organizer: { '@type': 'Organization', name: 'Flavor-Boss', url: 'https://flavorboss.se' },
  };

  const inputClass = "h-[52px] px-4 rounded-xl bg-card shadow-[0_0_0_1px_hsl(var(--border))] focus:shadow-[0_0_0_2px_hsl(var(--ring))] focus:outline-none text-foreground text-sm font-body w-full transition-shadow";

  const menuOptions = [
    {
      value: 'flavor-box',
      label: 'Flavor Box',
      desc: t(
        'Vår signaturbox och vinnare i Streetfood-SM fyra år i rad: Grillad kaneldoftande Jamaican fusioned jerk chicken och jerk cauliflower serveras med smakrikt jollof rice, krämig coleslaw, grillad majs med vitlöksolja, krispiga västafrikanska samosas och våra Sweet Food Champion Donuts – söta kongolesiska donuts "Mikate". Serveras med Boss Garlic Sauce och FlavorHeat Dancing Hot Sauce.',
        'Our signature box and four-time Streetfood-SM winner: Grilled cinnamon-scented Jamaican fusioned jerk chicken and jerk cauliflower served with rich jollof rice, creamy coleslaw, grilled corn with garlic oil, crispy West African samosas and our Sweet Food Champion Donuts — sweet Congolese donuts "Mikate". Served with Boss Garlic Sauce and FlavorHeat Dancing Hot Sauce.'
      ),
    },
    {
      value: 'snack-box',
      label: 'Snack Box',
      desc: t(
        'En smakmeny av vår prisbelönta meny: Jamaican fusioned Jerk Chicken eller Jerk Cauliflower (vegan), serveras med smakrikt jollof rice, krämig coleslaw, våra Sweet Food Champion Donuts – söta kongolesiska donuts "Mikate". Serveras med Boss Garlic Sauce och FlavorHeat Dancing Hot Sauce',
        'A tasting menu from our award-winning menu: Jamaican fusioned Jerk Chicken or Jerk Cauliflower (vegan), served with rich jollof rice, creamy coleslaw, our Sweet Food Champion Donuts — sweet Congolese donuts "Mikate". Served with Boss Garlic Sauce and FlavorHeat Dancing Hot Sauce'
      ),
    },
    {
      value: 'jerk-jollof-box',
      label: t('Jerk & Jollof Box', 'Jerk & Jollof Box'),
      desc: t(
        'Swedish Champion Box 2022: Jamaican Fusioned Jerk Chicken eller Jerk Cauliflower (veganskt), serveras med smakrikt Jollof Rice (veganskt), krämig coleslaw, våra Sweet Food Champion Donuts – söta kongolesiska donuts "Mikate". Serveras med Boss Garlic Sauce och FlavorHeat Dancing Hot Sauce.',
        'Swedish Champion Box 2022: Jamaican Fusioned Jerk Chicken or Jerk Cauliflower (vegan), served with rich Jollof Rice (vegan), creamy coleslaw, our Sweet Food Champion Donuts — sweet Congolese donuts "Mikate". Served with Boss Garlic Sauce and FlavorHeat Dancing Hot Sauce.'
      ),
    },
    { value: 'custom', label: t('Anpassad meny', 'Custom menu'), desc: t('Berätta om dina önskemål i meddelandefältet nedan', 'Describe your wishes in the message field below') },
  ];

  const radioClass = (selected: boolean) =>
    `relative flex items-start gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all duration-200 ${
      selected
        ? 'border-primary bg-primary/10 shadow-md'
        : 'border-border bg-card hover:border-primary/40'
    }`;

  const checkboxClass = (checked: boolean) =>
    `w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
      checked ? 'bg-primary border-primary' : 'border-muted-foreground/40 bg-card'
    }`;

  return (
    <TooltipProvider delayDuration={200}>
      <SEOHead
        title={t('Boka Flavor-Boss — Catering & Foodtruck Malmö', 'Book Flavor-Boss — Catering & Food Truck Malmö')}
        description={t(
          'Boka Sveriges bästa afro-karibiska catering och foodtruck för ditt event. Välj datum, eventtyp och antal gäster direkt här.',
          'Book Sweden\'s best Afro-Caribbean catering and food truck for your event.'
        )}
        canonical="https://www.flavorboss.se/boka-oss"
        jsonLd={jsonLd}
      />
      <main id="main-content">
        {/* Hero */}
        <section
          className="relative min-h-[240px] md:min-h-[60vh] flex items-center justify-center overflow-hidden pt-[72px] md:pt-0"
          style={{
            backgroundImage: `linear-gradient(135deg, hsla(280,30%,12%,0.85), hsla(22,95%,52%,0.5)), url(${heroBooking})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute top-10 left-10 w-48 h-48 bg-accent/15 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: `radial-gradient(circle, hsl(0 0% 100%) 1.5px, transparent 1.5px)`,
            backgroundSize: '20px 20px',
          }} />

          <div className="text-center px-4 relative z-10">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-6xl font-display font-extrabold text-primary-foreground uppercase mb-4 max-w-[20rem] md:max-w-none mx-auto">
              {t('BOKA DIN AFRO-KARIBISKA UPPLEVELSE', 'BOOK YOUR AFRO-CARIBBEAN EXPERIENCE')}
            </motion.h1>
          </div>

          {/* Turquoise triangle pattern overlay — sits at the bottom of the hero so the photo shows through */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-10 md:h-14 z-20 pointer-events-none"
            style={{
              backgroundImage: `url(${turkosDividerPattern})`,
              backgroundRepeat: 'repeat-x',
              backgroundPosition: 'center',
              backgroundSize: 'auto 100%',
            }}
          />
        </section>

        {/* Form Section */}
        <section
          className="py-5 md:section-padding relative overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, hsl(22 95% 52%), hsl(332 90% 48%))',
          }}
        >
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: `
              linear-gradient(45deg, hsl(0 0% 100%) 2px, transparent 2px),
              linear-gradient(-45deg, hsl(0 0% 100%) 2px, transparent 2px)
            `,
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 0',
          }} />

          <div className="absolute -top-10 -right-10 w-52 h-52 bg-secondary/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-10 left-10 w-36 h-36 bg-primary/10 rounded-full blur-3xl animate-float-y" />

          <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: 'linear-gradient(90deg, hsl(22 95% 52%), hsl(332 90% 48%), hsl(280 60% 30%), hsl(160 60% 28%))' }} />

          <div className="container-site max-w-3xl relative z-10">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                className="bg-card rounded-2xl md:rounded-3xl p-8 md:p-16 shadow-xl text-center space-y-6"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 220, damping: 14 }}
                  className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-[hsl(150_60%_45%)] to-[hsl(170_70%_40%)] flex items-center justify-center shadow-[0_10px_40px_hsla(150,60%,45%,0.4)]"
                >
                  <motion.div
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <Check className="w-12 h-12 text-white" strokeWidth={3} />
                  </motion.div>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="font-display text-3xl md:text-4xl font-bold text-foreground"
                >
                  {t('Tack för din förfrågan!', 'Thank you for your inquiry!')}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                  className="text-muted-foreground text-base md:text-lg max-w-md mx-auto"
                >
                  {t('Vi har tagit emot din förfrågan och återkommer till dig så snart som möjligt.', 'We have received your inquiry and will get back to you as soon as possible.')}
                </motion.p>
              </motion.div>
            ) : (
            <motion.form initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.3 }} onSubmit={handleSubmit} className="bg-card rounded-2xl md:rounded-3xl p-4 md:p-12 shadow-xl space-y-5 md:space-y-6">

              {/* Namn */}
              <div>
                <label htmlFor="name" className="text-sm font-bold mb-1 block">{t('Namn', 'Name')}</label>
                <input id="name" type="text" required className={inputClass} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* E-post */}
                <div>
                  <label htmlFor="email" className="text-sm font-bold mb-1 block">{t('E-post', 'Email')}</label>
                  <input id="email" type="email" required className={inputClass} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                {/* Telefon */}
                <div>
                  <label htmlFor="phone" className="text-sm font-bold mb-1 block">{t('Telefon', 'Phone')}</label>
                  <input id="phone" type="tel" required className={inputClass} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>

              {/* Adress/stad */}
              <div>
                <label htmlFor="address" className="text-sm font-bold mb-1 block">{t('Adress/stad', 'Address/city')}</label>
                <input id="address" type="text" required className={inputClass} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Datum */}
                <div>
                   <label htmlFor="date" className="text-sm font-bold mb-1 block">{t('Datum', 'Date')}</label>
                  <input id="date" type="date" min={todayStr} className={inputClass} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                </div>
                {/* Typ av event */}
                <div>
                  <label htmlFor="eventType" className="text-sm font-bold mb-1 block">{t('Typ av event', 'Event type')}</label>
                  <select id="eventType" className={inputClass} value={form.eventType} onChange={e => setForm({ ...form, eventType: e.target.value })}>
                    <option value="">{t('Välj...', 'Choose...')}</option>
                    <option value="privat">{t('Privat fest', 'Private party')}</option>
                    <option value="företag">{t('Företagsevent', 'Corporate event')}</option>
                    <option value="bröllop">{t('Bröllop', 'Wedding')}</option>
                    <option value="studentfest">{t('Studentfest', 'Graduation party')}</option>
                    <option value="festival">Festival</option>
                    <option value="annat">{t('Annat', 'Other')}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Maxantal gäster */}
                <div>
                  <label htmlFor="maxGuests" className="text-sm font-bold mb-1 block">{t('Maxantal (gäster)', 'Max number of guests')}</label>
                  <input id="maxGuests" type="number" min={form.minGuests || "1"} className={inputClass} value={form.maxGuests} onChange={e => setForm({ ...form, maxGuests: e.target.value })} />
                </div>
                {/* Minimumantal gäster */}
                <div>
                  <label htmlFor="minGuests" className="text-sm font-bold mb-1 block">{t('Minimumantal (gäster)', 'Min number of guests')}</label>
                  <input id="minGuests" type="number" min="1" max={form.maxGuests || undefined} className={inputClass} value={form.minGuests} onChange={e => {
                    const val = e.target.value;
                    if (form.maxGuests && val && Number(val) > Number(form.maxGuests)) {
                      setForm({ ...form, minGuests: form.maxGuests });
                    } else {
                      setForm({ ...form, minGuests: val });
                    }
                  }} />
                </div>
              </div>

              {/* Specialkost */}
              <div>
                <label htmlFor="specialDiet" className="text-sm font-bold mb-1 block">{t('Specialkost', 'Special dietary needs')}</label>
                <input id="specialDiet" type="text" placeholder={t('T.ex. vegetariskt, glutenfritt, allergier...', 'E.g. vegetarian, gluten-free, allergies...')} className={inputClass} value={form.specialDiet} onChange={e => setForm({ ...form, specialDiet: e.target.value })} />
              </div>

              {/* Leveranssätt */}
              <div>
                <label htmlFor="deliveryMethod" className="text-sm font-bold mb-1 block">{t('Leveranssätt', 'Delivery method')}</label>
                <select id="deliveryMethod" className={inputClass} value={form.deliveryMethod} onChange={e => setForm({ ...form, deliveryMethod: e.target.value })}>
                  <option value="">{t('Välj leveranssätt...', 'Choose delivery method...')}</option>
                  <option value="fullservice">{t('Fullservice-beställning', 'Full-service order')}</option>
                  <option value="enkel">{t('Enkel leverans', 'Simple delivery')}</option>
                </select>
                <div className="mt-2 rounded-xl border-2 border-accent/30 bg-accent/10 p-3 space-y-1.5 text-xs text-foreground">
                  <p><span className="font-bold">{t('Fullservice-beställning:', 'Full-service order:')}</span> {t('Vi levererar och dukar upp buffén och bjuder därefter på en energifylld presentation av smakupplevelsen.', 'We deliver and set up the buffet, then give an energetic presentation of the tasting experience.')}</p>
                  <p><span className="font-bold">{t('Enkel leverans:', 'Simple delivery:')}</span> {t('Maten levereras varm i engångsförpackningar och ni tar själva hand om uppdukningen.', 'The food is delivered hot in disposable packaging and you handle the setup yourselves.')}</p>
                </div>
              </div>

              {/* ── Önskade menyer (Checkboxes — multi-select) ── */}
              <div>
                <p className="text-sm font-bold mb-3">{t('Önskade menyer', 'Desired menus')}</p>
                <div className="space-y-3">
                  {menuOptions.map(opt => {
                    const selected = menus.includes(opt.value);
                    return (
                      <label key={opt.value} className={radioClass(selected)}>
                        <span className={`mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all ${selected ? 'border-primary bg-primary' : 'border-muted-foreground/40'}`}>
                          {selected && <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                        </span>
                        <div>
                          <span className="font-bold text-sm">{opt.label}</span>
                          <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                        </div>
                        <input type="checkbox" value={opt.value} className="sr-only" checked={selected} onChange={() => toggleMenu(opt.value)} />
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* ── Extras Section with Orange Gradient ── */}
              <div className="rounded-2xl p-6 md:p-8 space-y-6" style={{ background: 'linear-gradient(135deg, hsl(22 95% 52% / 0.12) 0%, hsl(30 100% 72% / 0.15) 100%)' }}>
                <p className="text-lg font-display font-extrabold uppercase tracking-wide">
                  {t('Extraupplevelser', 'Extra Experiences')}
                </p>

                {/* The Vibe */}
                <div>
                  <p className="text-sm font-bold mb-2 flex items-center gap-2">
                    🎵 {t('The Vibe (Musik & Atmosfär)', 'The Vibe (Music & Atmosphere)')}
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <button type="button" onClick={() => toggleExtra('djFullon')} className={checkboxClass(extras.djFullon)}>
                        {extras.djFullon && <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </button>
                      <div>
                        <span className="text-sm font-semibold group-hover:text-primary transition-colors">DJ Full-on Flavor</span>
                        <p className="text-xs text-muted-foreground">{t('Professionellt klubb-setup med ljud & ljus', 'Professional club setup with sound & lights')}</p>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <button type="button" onClick={() => toggleExtra('djBoost')} className={checkboxClass(extras.djBoost)}>
                        {extras.djBoost && <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </button>
                      <div>
                        <span className="text-sm font-semibold group-hover:text-primary transition-colors">DJ Flavor Boost</span>
                        <p className="text-xs text-muted-foreground">{t('Musikvagn + high-energy mix', 'Music wagon + high-energy mix')}</p>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <button type="button" onClick={() => toggleExtra('popupMascot')} className={checkboxClass(extras.popupMascot)}>
                        {extras.popupMascot && <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </button>
                      <div>
                        <span className="text-sm font-semibold group-hover:text-primary transition-colors">{t('Pop-up Mascot Show', 'Pop-up Mascot Show')}</span>
                        <p className="text-xs text-muted-foreground">{t('Vår färgsprakande maskot dansar & skojar med gästerna och gör en show under cirka 20-30min', 'Our colorful mascot dances & jokes with guests, putting on a show for about 20-30 min')}</p>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <button type="button" onClick={() => toggleExtra('fullMascot')} className={checkboxClass(extras.fullMascot)}>
                        {extras.fullMascot && <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </button>
                      <div>
                        <span className="text-sm font-semibold group-hover:text-primary transition-colors">{t('Full Mascot Experience', 'Full Mascot Experience')}</span>
                        <p className="text-xs text-muted-foreground">{t('Maskoten minglar, dansar och sprider energi under eventet. På plats i 2h varav ca 1h är showtime och dans.', 'The mascot mingles, dances and spreads energy throughout the event. On site for 2h, of which about 1h is showtime and dancing.')}</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* The Look */}
                <div>
                  <p className="text-sm font-bold mb-2 flex items-center gap-2">
                    ✨ {t('The Look (Dekoration)', 'The Look (Decoration)')}
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <button type="button" onClick={() => toggleExtra('decoMedium')} className={checkboxClass(extras.decoMedium)}>
                        {extras.decoMedium && <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </button>
                      <div>
                        <span className="text-sm font-semibold group-hover:text-primary transition-colors">{t('Medium Dekoration', 'Medium Decoration')}</span>
                        <p className="text-xs text-muted-foreground">{t('Temadekor, lyktor & blomsterinslag', 'Themed decor, lanterns & floral touches')}</p>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <button type="button" onClick={() => toggleExtra('decoLuxury')} className={checkboxClass(extras.decoLuxury)}>
                        {extras.decoLuxury && <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </button>
                      <div>
                        <span className="text-sm font-semibold group-hover:text-primary transition-colors">{t('Lyxdekoration', 'Luxury Decoration')}</span>
                        <p className="text-xs text-muted-foreground">{t('Den kompletta afro-karibiska förvandlingen', 'The full Afro-Caribbean transformation')}</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Serveringssätt */}
                <div>
                  <p className="text-sm font-bold mb-2 flex items-center gap-2">
                    🔥 {t('Serveringssätt', 'Serving style')}
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <button type="button" onClick={() => toggleExtra('grillUpplevelse')} className={checkboxClass(extras.grillUpplevelse)}>
                        {extras.grillUpplevelse && <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </button>
                      <div>
                        <span className="text-sm font-semibold group-hover:text-primary transition-colors">{t('Grillupplevelse', 'Grill Experience')}</span>
                        <p className="text-xs text-muted-foreground">{t('Låt vår grillmaster bjuda på en väldoftande upplevelse; grillad Jamaican Fusioned Jerk direkt från grillen. Inkl. personal på plats och service.', 'Let our grill master offer a fragrant experience; grilled Jamaican Fusioned Jerk straight off the grill. Incl. staff on site and service.')}</p>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <button type="button" onClick={() => toggleExtra('foodtruckUpplevelse')} className={checkboxClass(extras.foodtruckUpplevelse)}>
                        {extras.foodtruckUpplevelse && <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </button>
                      <div>
                        <span className="text-sm font-semibold group-hover:text-primary transition-colors">{t('Foodtruckupplevelse', 'Food Truck Experience')}</span>
                        <p className="text-xs text-muted-foreground">{t('Upplev äkta Afro-Karibiska smaker serverade från vår färgstarka foodtruck. En levande kulinarisk resa, musik och energi som mättar alla era sinnen.', 'Experience genuine Afro-Caribbean flavors served from our colorful food truck. A lively culinary journey, music and energy that satisfies all your senses.')}</p>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <button type="button" onClick={() => toggleExtra('bufféUpplevelse')} className={checkboxClass(extras.bufféUpplevelse)}>
                        {extras.bufféUpplevelse && <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </button>
                      <div>
                        <span className="text-sm font-semibold group-hover:text-primary transition-colors">{t('Catering Bufféupplevelse', 'Catering Buffet Experience')}</span>
                        <p className="text-xs text-muted-foreground">{t('Njut av en varm och riklig buffé. Välj ditt önskade leveranssätt så tar vi hand om resten.', 'Enjoy a warm and generous buffet. Choose your preferred delivery method and we take care of the rest.')}</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Flavor-Booze Bar Experience */}
                <div>
                  <p className="text-sm font-bold mb-2 flex items-center gap-2">
                    🍹 {t('Flavor-Booze Bar Experience', 'Flavor-Booze Bar Experience')}
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <button type="button" onClick={() => toggleExtra('boozeTruck')} className={checkboxClass(extras.boozeTruck)}>
                        {extras.boozeTruck && <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </button>
                      <div>
                        <span className="text-sm font-semibold group-hover:text-primary transition-colors">{t('Flavor-Booze Truck Experience', 'Flavor-Booze Truck Experience')}</span>
                        <p className="text-xs text-muted-foreground">{t('Upplev vår färgsprakande bartruck fylld med Afro-Karibiska smaker, musik & good vibes!', 'Experience our colorful bar truck filled with Afro-Caribbean flavors, music & good vibes!')}</p>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <button type="button" onClick={() => toggleExtra('boozeBar')} className={checkboxClass(extras.boozeBar)}>
                        {extras.boozeBar && <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </button>
                      <div>
                        <span className="text-sm font-semibold group-hover:text-primary transition-colors">{t('Flavor-Booze Bar Experience', 'Flavor-Booze Bar Experience')}</span>
                        <p className="text-xs text-muted-foreground">{t('Smak, rytm & vibes - direkt från vår Flavor-Booze Bar!', 'Flavor, rhythm & vibes - straight from our Flavor-Booze Bar!')}</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* The Service */}
                <div>
                  <p className="text-sm font-bold mb-2 flex items-center gap-2">
                    🍽️ {t('The Service', 'The Service')}
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <button type="button" onClick={() => toggleExtra('servingStaff')} className={checkboxClass(extras.servingStaff)}>
                        {extras.servingStaff && <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </button>
                      <div className="flex items-start gap-1.5">
                        <div>
                          <span className="text-sm font-semibold group-hover:text-primary transition-colors">{t('Serveringspersonal', 'Serving Staff')}</span>
                          <p className="text-xs text-muted-foreground">{t('Professionellt team för mat & dryck', 'Professional team to handle food & drinks')}</p>
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="mt-0.5 cursor-help">
                              <Info className="w-3.5 h-3.5 text-primary/70" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-[220px] text-xs">
                            {t('Rekommenderas för 40+ gäster för en smidig bufféupplevelse.', 'Recommended for 40+ guests to ensure a smooth buffet flow.')}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <button type="button" onClick={() => toggleExtra('exklusivVardinna')} className={checkboxClass(extras.exklusivVardinna)}>
                        {extras.exklusivVardinna && <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </button>
                      <div>
                        <span className="text-sm font-semibold group-hover:text-primary transition-colors">{t('Exklusiv värdinna upplevelse', 'Exclusive Hostess Experience')}</span>
                        <p className="text-xs text-muted-foreground">{t('Boka en av våra professionella värdinnor för en mer avslappnad fest. Värdinnan tar hand om allt så att du kan njuta fullt ut.', 'Book one of our professional hostesses for a more relaxed party. The hostess takes care of everything so you can fully enjoy yourself.')}</p>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <button type="button" onClick={() => toggleExtra('bokaPatricia')} className={checkboxClass(extras.bokaPatricia)}>
                        {extras.bokaPatricia && <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </button>
                      <div>
                        <span className="text-sm font-semibold group-hover:text-primary transition-colors">{t('Boka Patricia Dianda #flavorbosstrich som exklusiv värdinna', 'Book Patricia Dianda #flavorbosstrich as exclusive hostess')}</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="text-sm font-bold mb-1 block">{t('Meddelande / Önskemål', 'Message / Requests')}</label>
                <textarea id="message" rows={4} className="px-4 py-3 rounded-xl bg-card shadow-[0_0_0_1px_hsl(var(--border))] focus:shadow-[0_0_0_2px_hsl(var(--ring))] focus:outline-none text-foreground text-sm font-body w-full transition-shadow resize-none" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full h-12 rounded-xl font-display font-bold uppercase tracking-wide text-primary-foreground shadow-[0_4px_20px_hsla(22,95%,52%,0.5)] transition-all duration-300 hover:shadow-[0_6px_28px_hsla(332,90%,48%,0.55)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed animate-gradient-shift-x"
                style={{
                  background:
                    'linear-gradient(90deg, hsl(45 95% 55%), hsl(22 95% 52%), hsl(332 90% 48%), hsl(280 60% 35%), hsl(22 95% 52%), hsl(45 95% 55%))',
                  backgroundSize: '300% 100%',
                }}
              >
                {submitting ? t('Skickar...', 'Sending...') : t('Skicka förfrågan', 'Send inquiry')}
              </button>
            </motion.form>
            )}

            <motion.div {...fadeUp} className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Mail, text: 'info@flavorboss.se', href: 'mailto:info@flavorboss.se', bg: 'bg-primary' },
                { icon: Phone, text: '+46 700 66 36 11', href: 'tel:+46700663611', bg: 'bg-accent' },
                { icon: MapPin, text: 'Hantverkaregatan 4, Arlöv', href: '#map', bg: 'bg-surface-yellow' },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`${item.bg} text-primary-foreground rounded-2xl p-4 text-center transition-all duration-200 shadow-md block ${i === 2 ? 'text-surface-yellow-foreground' : ''}`}
                >
                  <item.icon className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-bold">{item.text}</span>
                </motion.a>
              ))}
            </motion.div>

            <motion.a
              {...fadeUp}
              href="/aventyr-snart"
              className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-card/90 p-4 text-center font-display text-lg font-extrabold uppercase text-foreground shadow-md transition-all hover:-translate-y-1 hover:text-primary sm:hidden"
            >
              <Route className="h-5 w-5 text-primary" />
              {t('Vårt äventyr', 'Our adventure')}
            </motion.a>
          </div>
        </section>

        <section id="map" className="bg-muted py-0">
          <iframe
            title={t('Flavor-Boss Catering Malmö karta', 'Flavor-Boss Catering Malmö map')}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2254.5!2d13.07!3d55.63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDM4JzAuMCJOIDEzwrAwNCcwLjAiRQ!5e0!3m2!1ssv!2sse!4v1700000000000!5m2!1ssv!2sse&q=Hantverkaregatan+4,+Arlöv"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
              <TrustQuotes seed="bokaoss" count={2} variant="light" headingSv="Vad våra kunder säger" headingEn="What Our Clients Say" />
      </main>
    </TooltipProvider>
  );
};

export default BokaOss;
