import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cateringSections, type SectionData, type CardData } from '@/data/cateringMenuStructured';
import { Send, X, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { brochuresByCardId, type Brochure } from '@/data/brochures';

const festivalMenuBrochure = `${import.meta.env.BASE_URL}brochures/00_FlavBoss_MenySV_A5_2026_DIG.pdf`;

const MOVED_IDS = ['bulk', 'packages', 'experiences', 'decoration', 'entertainment', 'staff', 'logistics'];

export const movedCateringSectionIds = MOVED_IDS;

const peopleify = (txt: string) =>
  txt
    .replace(/\bportioner\b/gi, 'personer')
    .replace(/\bportions\b/gi, 'people')
    .replace(/\bportion\b/gi, 'person');

const Card = ({ card, lang }: { card: CardData; lang: 'sv' | 'en' }) => {
  const pick = (s: { sv: string; en: string }) => (lang === 'sv' ? s.sv : s.en);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md p-5 md:p-6 flex flex-col gap-3 shadow-[0_8px_28px_rgba(0,0,0,0.18)]"
    >
      <span className="self-start text-[10px] md:text-xs uppercase tracking-wider font-bold text-white bg-white/15 border border-white/25 rounded-full px-2.5 py-1">
        {pick(card.tag)}
      </span>
      <h4 className="font-display font-extrabold uppercase text-white text-xl md:text-2xl drop-shadow leading-tight">
        {pick(card.name)}
      </h4>
      <p className="text-white/85 text-sm leading-snug -mt-1">{pick(card.tagline)}</p>

      {card.hero && card.hero.length > 0 && (
        <ul className="flex flex-col gap-1">
          {card.hero.map((h, i) => (
            <li key={i} className="text-white font-medium text-[15px] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 inline-block" />
              {pick(h)}
            </li>
          ))}
        </ul>
      )}

      {card.contents && card.contents.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {card.contents.map((c, i) => (
            <li key={i} className="text-white/85 text-sm flex items-start gap-2 leading-snug">
              <span className="w-1 h-1 rounded-full bg-white/60 mt-2 flex-shrink-0" />
              <span>{peopleify(pick(c))}</span>
            </li>
          ))}
        </ul>
      )}

      {card.servedWith && card.servedWith.length > 0 && (
        <div>
          <p className="text-[10px] md:text-xs uppercase tracking-wider font-bold text-white/60 mb-1.5">
            {lang === 'sv' ? 'Serveras med' : 'Served with'}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {card.servedWith.map((p, i) => (
              <span key={i} className="text-[11px] md:text-xs text-white/90 bg-white/10 border border-white/20 rounded-full px-2.5 py-0.5">
                {pick(p)}
              </span>
            ))}
          </div>
        </div>
      )}

      {card.twoColumn && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
          {card.twoColumn.included.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-white/60 mb-1.5">
                {lang === 'sv' ? 'Ingår' : 'Included'}
              </p>
              <ul className="flex flex-col gap-1">
                {card.twoColumn.included.map((c, i) => (
                  <li key={i} className="text-white/85 text-xs leading-snug">• {pick(c)}</li>
                ))}
              </ul>
            </div>
          )}
          {card.twoColumn.addons.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-white/60 mb-1.5">
                {lang === 'sv' ? 'Tillval' : 'Add-ons'}
              </p>
              <ul className="flex flex-col gap-1">
                {card.twoColumn.addons.map((c, i) => (
                  <li key={i} className="text-white/85 text-xs leading-snug">• {pick(c)}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {card.rightFor && (
        <p className="text-white/70 text-xs italic mt-1">{pick(card.rightFor)}</p>
      )}
      {card.smallNote && (
        <p className="text-white/55 text-[11px] italic">{peopleify(pick(card.smallNote))}</p>
      )}
      {card.infoNote && (
        <p className="text-white/65 text-[11px] leading-snug border-t border-white/10 pt-2 mt-auto">
          {pick(card.infoNote)}
        </p>
      )}
    </motion.div>
  );
};

const BrochureCard = ({ brochure, onOpen }: { brochure: Brochure; onOpen: () => void }) => (
  <motion.button
    type="button"
    onClick={onOpen}
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.5 }}
    className="group relative block w-full overflow-hidden rounded-2xl border border-white/25 bg-white shadow-[0_8px_28px_rgba(0,0,0,0.25)] hover:scale-[1.02] transition-transform"
    aria-label={brochure.title}
  >
    <img
      src={brochure.thumb}
      alt={brochure.title}
      loading="lazy"
      className="w-full h-auto block"
      style={{ aspectRatio: '148 / 210', objectFit: 'cover' }}
    />
    <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
      {brochure.title}
    </span>
  </motion.button>
);

const BrochureModal = ({ brochure, onClose }: { brochure: Brochure; onClose: () => void }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 z-[101] w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-110 transition"
      >
        <X className="w-5 h-5" />
      </button>
      <div
        className="relative w-full h-full max-w-5xl max-h-[95vh] bg-white rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`${brochure.pdf}#view=FitH&toolbar=0&navpanes=0`}
          title={brochure.title}
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
};

const CateringExtras = () => {
  const { lang, t } = useLanguage();
  const sections: SectionData[] = cateringSections.filter(s => MOVED_IDS.includes(s.id));
  const pick = (s: { sv: string; en: string }) => (lang === 'sv' ? s.sv : s.en);
  const [activeBrochure, setActiveBrochure] = useState<Brochure | null>(null);

  const orderCards = (cards: CardData[]) => {
    const withBrochure = cards.filter(c => brochuresByCardId[c.id]);
    const without = cards.filter(c => !brochuresByCardId[c.id]);
    return [...withBrochure, ...without];
  };

  return (
    <section className="container-site py-16 md:py-24 space-y-16 md:space-y-20">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-display font-extrabold uppercase text-3xl md:text-5xl text-white drop-shadow">
          {t('Bygg din helhet', 'Build your full experience')}
        </h2>
        <p className="mt-3 text-white/85 text-sm md:text-base">
          {t(
            'Paket, upplevelser, dekoration, underhållning, personal och logistik — välj det som passar ert event.',
            'Packages, experiences, decoration, entertainment, staff and logistics — pick what fits your event.'
          )}
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 pt-2">
        <Link
          to="/boka-oss"
          onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
          className="inline-flex items-center gap-2 font-display font-extrabold uppercase tracking-wide text-white text-sm md:text-base px-8 py-4 rounded-full shadow-xl transition-transform duration-300 hover:scale-105"
          style={{
            backgroundImage: 'linear-gradient(135deg, #ff632b 0%, #E8186D 50%, #ff632b 100%)',
          }}
        >
          <Send className="w-4 h-4" />
          {t('Skicka offertförfrågan', 'Send quote request')}
        </Link>
        <a
          href={festivalMenuBrochure}
          download="Flavor-Boss-Festival-Meny.pdf"
          className="inline-flex items-center gap-2 font-display font-extrabold uppercase tracking-wide text-white text-sm md:text-base px-8 py-4 rounded-full shadow-xl transition-transform duration-300 hover:scale-105 border-2 border-white/60"
          style={{
            backgroundImage: 'linear-gradient(135deg, #2D6A4F 0%, #1a3c2a 100%)',
          }}
        >
          <Download className="w-4 h-4" />
          {t('Se Vår Festival Meny', 'Se Vår Festival Meny')}
        </a>
      </div>
      {activeBrochure && (
        <BrochureModal brochure={activeBrochure} onClose={() => setActiveBrochure(null)} />
      )}
    </section>
  );
};

export default CateringExtras;