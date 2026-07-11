import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import SectionDivider from '@/components/SectionDivider';
import TrustQuotes from '@/components/TrustQuotes';

const faqItems = [
  { qSv: 'Var kör ni?', qEn: 'Where do you operate?', aSv: 'Malmö, Skåne & Köpenhamn. Övriga Sverige vid större event.', aEn: 'Malmö, Skåne & Copenhagen. Rest of Sweden for larger events.' },
  { qSv: 'Vad kostar catering?', qEn: 'What does catering cost?', aSv: 'Offert skickas efter förfrågan baserat på eventtyp & gäster.', aEn: 'Quote is sent after inquiry based on event type & guests.' },
  { qSv: 'Har ni veganska alternativ?', qEn: 'Do you have vegan options?', aSv: 'Ja! Vi erbjuder veganskt, vegetariskt och glutenfritt. Alla ska kunna njuta av Flavor-Boss!', aEn: 'Yes! We offer vegan, vegetarian, and gluten-free options. Everyone should enjoy Flavor-Boss!' },
  { qSv: 'Är maten halal?', qEn: 'Is the food halal?', aSv: 'Ja, allt kött vi serverar är halalcertifierat.', aEn: 'Yes, all meat we serve is halal-certified.' },
  { qSv: 'Hur långt i förväg ska vi boka?', qEn: 'How far in advance should we book?', aSv: 'Vi rekommenderar minst 4–6 veckor i förväg.', aEn: 'We recommend at least 4–6 weeks in advance.' },
  { qSv: 'Vilken typ av event gör ni?', qEn: 'What types of events do you do?', aSv: 'Privata fester, bröllop, företagsevent, festivaler & mer.', aEn: 'Private parties, weddings, corporate events, festivals & more.' },
  { qSv: 'Kan ni köra både inne och ute?', qEn: 'Can you operate both indoors and outdoors?', aSv: 'Ja, med rätt el-tillgång eller gasol.', aEn: 'Yes, with proper power supply or gas.' },
  { qSv: 'Ingår DJ och dekoration?', qEn: 'Are DJ and decoration included?', aSv: 'Som tillägg — boka komplett eventpaket!', aEn: 'As add-ons — book the complete event package!' },
  { qSv: 'Hur kontaktar vi er?', qEn: 'How do we contact you?', aSv: 'info@flavorboss.se eller +46 700 66 36 11', aEn: 'info@flavorboss.se or +46 700 66 36 11' },
];

const AccordionItem = ({ q, a, color, index }: { q: string; a: string; color: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className={`rounded-2xl mb-3 overflow-hidden transition-all ${open ? 'shadow-lg' : 'shadow-sm'}`}
    >
      <button onClick={() => setOpen(!open)} className={`w-full flex items-center justify-between p-5 text-left ${open ? color : 'bg-surface-dark'}`} aria-expanded={open}>
        <span className={`font-display text-sm font-bold uppercase pr-4 ${open ? 'text-primary-foreground' : 'text-surface-dark-foreground'}`}>{q}</span>
        <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-primary-foreground' : 'text-surface-dark-foreground/60'}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden bg-surface-dark">
            <p className="text-body text-surface-dark-foreground/80 p-5 pt-0 text-sm">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const { t } = useLanguage();
  const half = Math.ceil(faqItems.length / 2);
  const left = faqItems.slice(0, half);
  const right = faqItems.slice(half);
  const colors = ['bg-primary', 'bg-accent', 'bg-surface-green', 'bg-surface-dark'];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.qSv,
      acceptedAnswer: { '@type': 'Answer', text: item.aSv },
    })),
  };

  return (
    <>
      <SEOHead
        title={t('Vanliga Frågor — Flavor-Boss Catering & Foodtruck', 'FAQ — Flavor-Boss Catering & Food Truck')}
        description={t(
          'Svar på vanliga frågor om Flavor-Boss catering, foodtruck-bokning, allergier, priser och vad som ingår i våra paket.',
          'Answers to common questions about Flavor-Boss catering, food truck booking, allergies, prices, and what\'s included in our packages.'
        )}
        canonical="https://www.flavorboss.se/faq"
        jsonLd={jsonLd}
      />
      <main id="main-content">
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-center justify-center pt-[72px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #ff612b, #ffae30)' }}>
          {/* Concentric ring pattern */}
          <div className="absolute inset-0 opacity-[0.08]" style={{
            backgroundImage: `radial-gradient(circle, transparent 30%, hsl(0 0% 100%) 31%, hsl(0 0% 100%) 33%, transparent 34%, transparent 55%, hsl(0 0% 100%) 56%, hsl(0 0% 100%) 57%, transparent 58%)`,
            backgroundSize: '70px 70px',
          }} />

          <div className="absolute top-20 right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-10 left-10 w-56 h-56 bg-accent/15 rounded-full blur-3xl animate-pulse-glow" />

          <div className="text-center px-4 relative z-10">
            <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="text-4xl md:text-6xl font-display font-extrabold text-primary-foreground uppercase mb-4">
              FAQ
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-subheading text-secondary">{t('Flavor-Boss Catering & Foodtruck', 'Flavor-Boss Catering & Food Truck')}</motion.p>
          </div>
        </section>

        <SectionDivider />

        {/* FAQ Content */}
        <section className="section-padding bg-surface-dark relative overflow-hidden">
          {/* Vertical line pattern */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 38px, hsl(var(--surface-dark-foreground)) 38px, hsl(var(--surface-dark-foreground)) 39px)`,
          }} />

          <div className="absolute top-10 left-10 w-44 h-44 bg-primary/8 rounded-full blur-3xl animate-float-y" />
          <div className="absolute bottom-20 right-20 w-52 h-52 bg-secondary/8 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />

          <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: 'linear-gradient(90deg, hsl(160 60% 28%), hsl(22 95% 52%), hsl(332 90% 48%), hsl(45 95% 55%))' }} />

          <div className="container-site relative z-10">
            <motion.h2 {...{
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
            }} className="text-3xl md:text-5xl font-display font-extrabold text-center mb-12 text-surface-dark-foreground">
              {t('Har du frågor? Vi har svaren.', 'Got questions? We have answers.')}
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                {left.map((item, i) => (
                  <AccordionItem key={i} q={t(item.qSv, item.qEn)} a={t(item.aSv, item.aEn)} color={colors[i % colors.length]} index={i} />
                ))}
              </div>
              <div>
                {right.map((item, i) => (
                  <AccordionItem key={i} q={t(item.qSv, item.qEn)} a={t(item.aSv, item.aEn)} color={colors[(i + 2) % colors.length]} index={i + half} />
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <p className="text-surface-dark-foreground/70 mb-4 text-lg">
                {t('Hittar du inte svaret? Kontakta oss direkt', 'Can\'t find the answer? Contact us directly')}
              </p>
              <Button variant="hero" size="lg" asChild className="shadow-[0_4px_20px_hsla(22,95%,52%,0.5)]">
                <Link to="/boka-oss">{t('Kontakta Oss', 'Contact Us')}</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-16 max-w-3xl mx-auto rounded-2xl p-6 md:p-8 bg-surface-dark-foreground/5 border border-surface-dark-foreground/10"
            >
              <h3 className="font-display font-extrabold uppercase text-lg md:text-xl text-surface-dark-foreground mb-4">
                {t('Information & reservationer', 'Information & Reservations')}
              </h3>
              <p className="text-sm md:text-base text-surface-dark-foreground/80 leading-relaxed mb-4">
                {t(
                  'Vi strävar alltid efter att all information på hemsidan ska vara korrekt och uppdaterad. Reservation görs dock för eventuella skrivfel, prisjusteringar, tekniska fel, produktförändringar, tillfälliga råvarubrister samt information som kan ha blivit felaktigt publicerad.',
                  'We always strive to keep all information on this website accurate and up to date. However, we reserve the right for any typos, price adjustments, technical errors, product changes, temporary ingredient shortages, or information that may have been published incorrectly.'
                )}
              </p>
              <p className="text-sm md:text-base text-surface-dark-foreground/80 leading-relaxed">
                {t(
                  'Flavor-Boss AB förbehåller sig rätten att korrigera sådana fel och att uppdatera information utan föregående meddelande. Vid avvikelser gäller alltid den information som bekräftats i offert, bokningsbekräftelse eller skriftlig kommunikation mellan kund och Flavor-Boss AB.',
                  'Flavor-Boss AB reserves the right to correct such errors and update information without prior notice. In case of discrepancies, the information confirmed in quotes, booking confirmations, or written communication between the customer and Flavor-Boss AB always applies.'
                )}
              </p>
            </motion.div>
          </div>
        </section>
              <TrustQuotes seed="faq" count={2} variant="light" headingSv="Vad våra kunder säger" headingEn="What Our Clients Say" />
      </main>
    </>
  );
};

export default FAQ;
