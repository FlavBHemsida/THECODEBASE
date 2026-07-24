import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Instagram, Facebook, Linkedin, CalendarHeart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import patternWhite from '@/assets/pattern-white.png';
import patternOrange from '@/assets/pattern-orange.png';
import patternGreen from '@/assets/pattern-green.png';
import TimelineTransition from './TimelineTransition';

import patternPalm from '@/assets/journey/pattern-palm.png';
import patternBurst from '@/assets/journey/pattern-burst.png';
import patternMask from '@/assets/journey/pattern-mask.png';
import patternTribal from '@/assets/journey/pattern-tribal.png';
import patternZigzag from '@/assets/journey/pattern-zigzag.png';
import patternSun from '@/assets/journey/pattern-sun.png';
import patternDancer from '@/assets/journey/pattern-dancer.png';
import patternWave1 from '@/assets/journey/pattern-wave1.png';
import patternNote from '@/assets/journey/pattern-note.png';
import patternHut from '@/assets/journey/pattern-hut.png';

interface SourceItem {
  url: string;
  label: string;
}

// Parses inline markdown-style spans within a single line of text:
// links: [label](url), bold: **text**, and emphasized red-bold: ==text==
const parseInlineMarkdown = (line: string, keyPrefix: string): ReactNode[] => {
  const parts: ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|==([^=]+)==/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) parts.push(line.slice(lastIndex, match.index));
    if (match[1] !== undefined) {
      parts.push(
        <a
          key={`a-${keyPrefix}-${i++}`}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-2 underline-offset-4 font-bold text-yellow-300 hover:text-yellow-200"
        >
          {match[1]}
        </a>
      );
    } else if (match[3] !== undefined) {
      parts.push(
        <strong key={`b-${keyPrefix}-${i++}`} className="font-bold text-white">
          {match[3]}
        </strong>
      );
    } else if (match[4] !== undefined) {
      parts.push(
        <strong key={`r-${keyPrefix}-${i++}`} className="font-bold text-red-500">
          {match[4]}
        </strong>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < line.length) parts.push(line.slice(lastIndex));
  return parts;
};

// Renders an array of body-text lines, honoring inline "[[IMAGE]]" / "[[VIDEO]]"
// marker lines (consuming from bodyImages in order / rendering bodyVideo) and
// parsing inline markdown on ordinary text lines. Optionally emphasizes the
// last non-marker line to match the site's default "punchline" styling.
const renderTextLines = (
  lines: string[],
  keyPrefix: string,
  opts: { bodyImages?: string[]; bodyVideo?: string; boldLast?: boolean } = {}
): ReactNode[] => {
  const { bodyImages, bodyVideo, boldLast = false } = opts;
  let imageIdx = 0;
  const textLineCount = lines.filter((l) => l !== '[[IMAGE]]' && l !== '[[VIDEO]]').length;
  let textLineSeen = 0;
  return lines.map((line, i) => {
    if (line === '[[IMAGE]]' && bodyImages?.[imageIdx]) {
      return (
        <div key={`${keyPrefix}-img-${i}`} className="my-4 md:my-5">
          <img
            src={bodyImages[imageIdx++]}
            alt=""
            loading="lazy"
            className="w-full max-w-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.45)] border-4 border-white/40"
          />
        </div>
      );
    }
    if (line === '[[VIDEO]]' && bodyVideo) {
      return (
        <video
          key={`${keyPrefix}-vid-${i}`}
          src={bodyVideo}
          controls
          playsInline
          preload="metadata"
          className="w-full max-w-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.45)] border-4 border-white/40 my-3"
        />
      );
    }
    const isLast = boldLast && textLineSeen === textLineCount - 1;
    textLineSeen += 1;
    return (
      <p key={`${keyPrefix}-p-${i}`} className={isLast ? 'font-display font-bold uppercase text-lg md:text-xl tracking-wide' : ''}>
        {parseInlineMarkdown(line, `${keyPrefix}-${i}`)}
      </p>
    );
  });
};

type LayoutKind = 'imageLeft' | 'imageRight' | 'imageBackdrop' | 'twoUp' | 'centered';
type PatternKind = 'palms' | 'waves' | 'tribal' | 'burst' | 'mask' | 'notes' | 'sun' | 'zigzag' | 'dancer' | 'hut';

interface YearPageProps {
  year: string;
  description: string;
  title?: string;
  gradient?: string;
  accentColor?: string;
  pattern?: PatternKind;
  layout?: LayoutKind;
  uniformText?: boolean;
  bodyBackline?: boolean;
  leftAlignedContent?: boolean;
  bodyVideo?: string;
  bodyImages?: string[];
  centerVertically?: boolean;
  headerImage?: string;
  headerImageAlt?: string;
  headerImageDesktopSide?: boolean;
  yearIndex: number;
  totalYears: number;
  fromIndex?: number;
  fromYear?: string;
  onNext?: () => void;
  onPrev?: () => void;
  images?: string[];
  extraText?: string;
  expandableText?: string;
  expandableLabel?: string;
  expandableLabelOpen?: string;
  sources?: SourceItem[];
  isFinale?: boolean;
  inlineNext?: boolean;
  expandableImage?: string;
  expandableImageAlt?: string;
  expandableImages?: string[];
  expandableImageSizes?: ('sm' | 'md')[];
  expandableVideo?: string;
  expandableVideoSize?: 'sm' | 'md';
}

const patternMap: Record<PatternKind, string> = {
  palms: patternPalm,
  waves: patternWave1,
  tribal: patternTribal,
  burst: patternBurst,
  mask: patternMask,
  notes: patternNote,
  sun: patternSun,
  zigzag: patternZigzag,
  dancer: patternDancer,
  hut: patternHut,
};

const YearPage = ({
  year,
  description,
  title,
  gradient,
  accentColor = '#fde047',
  pattern = 'palms',
  layout = 'centered',
  uniformText = false,
  bodyBackline = false,
  leftAlignedContent = false,
  bodyVideo,
  bodyImages,
  centerVertically = false,
  headerImage,
  headerImageAlt,
  headerImageDesktopSide = false,
  yearIndex,
  totalYears,
  fromIndex,
  fromYear,
  onNext,
  onPrev,
  images,
  extraText,
  expandableText,
  expandableLabel,
  expandableLabelOpen,
  sources,
  isFinale,
  inlineNext,
  expandableImage,
  expandableImageAlt,
  expandableImages,
  expandableImageSizes,
  expandableVideo,
  expandableVideoSize = 'md',
}: YearPageProps) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const hasTransition = fromIndex !== undefined && fromYear !== undefined && fromIndex !== yearIndex;
  const [phase, setPhase] = useState<'timeline' | 'year-drop' | 'content'>(
    hasTransition ? 'timeline' : 'year-drop'
  );

  useEffect(() => {
    setPhase(hasTransition ? 'timeline' : 'year-drop');
    const timers: ReturnType<typeof setTimeout>[] = [];
    if (hasTransition) {
      timers.push(setTimeout(() => setPhase('year-drop'), 2600));
      timers.push(setTimeout(() => setPhase('content'), 2600 + 2800));
    } else {
      timers.push(setTimeout(() => setPhase('content'), 2800));
    }
    return () => timers.forEach(clearTimeout);
  }, [year, hasTransition]);

  const bgGradient = gradient || 'linear-gradient(135deg, #ffae30, #ff612b, #ffae30, #ff612b)';
  const patternSrc = patternMap[pattern];

  // Resolve a real layout. If the year has only one image, "twoUp" collapses to "imageRight".
  const effectiveLayout: LayoutKind =
    layout === 'twoUp' && (!images || images.length < 2) ? 'imageRight' : layout;

  // Split body text into emphasized first line + rest for visual hierarchy
  const bodyLines = extraText ? extraText.split('\n').filter(Boolean) : [];
  const lead = bodyLines[0];
  const restLines = bodyLines.slice(1);

  // Renders a paragraph, parsing inline markdown-style spans via parseInlineMarkdown
  const renderExpandableLine = (line: string, key: number, emphasis = false) => (
    <p key={key} className={emphasis ? 'font-display font-bold uppercase tracking-wide text-lg md:text-xl' : undefined}>
      {parseInlineMarkdown(line, `exp-${key}`)}
    </p>
  );

  // Render expandable text; supports [[IMAGE]], [[IMAGES]] (a side-by-side
  // pair consuming two images at once) and [[VIDEO]] markers that render
  // expandableImage(s)/expandableVideo inline between paragraph blocks. The
  // final line of the final segment is emphasized to match the body text's
  // bold closing line.
  const renderExpandableContent = () => {
    if (!expandableText) return null;
    const imagesList = expandableImages && expandableImages.length > 0
      ? expandableImages
      : (expandableImage ? [expandableImage] : []);
    const parts = expandableText.split(/\n?\[\[(IMAGE|IMAGES|VIDEO)\]\]\n?/);
    let imageIdx = 0;
    const elements: ReactNode[] = [];
    for (let idx = 0; idx < parts.length; idx += 2) {
      const segment = parts[idx];
      const marker = parts[idx + 1];
      const lines = segment.split('\n').filter(Boolean);
      const isLastSegment = idx + 2 >= parts.length;
      const currentImageIdx = marker === 'IMAGE' ? imageIdx++ : -1;
      const currentImage = marker === 'IMAGE' ? imagesList[currentImageIdx] : undefined;
      const currentImageSize = expandableImageSizes?.[currentImageIdx] === 'sm' ? 'max-w-xs' : 'max-w-md';
      const pairImages = marker === 'IMAGES' ? [imagesList[imageIdx++], imagesList[imageIdx++]] : undefined;
      elements.push(
        <div key={`seg-${idx}`}>
          <div className="space-y-3 text-white/95 text-base md:text-lg font-body leading-snug">
            {lines.map((line, i) => renderExpandableLine(line, i, isLastSegment && i === lines.length - 1))}
          </div>
          {marker === 'IMAGE' && currentImage && (
            <div className="my-5 md:my-7">
              <img
                src={currentImage}
                alt={expandableImageAlt || ''}
                loading="lazy"
                className={`w-full ${currentImageSize} mx-auto rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.45)] border-4 border-white/40`}
              />
            </div>
          )}
          {marker === 'IMAGES' && pairImages && (
            <div className="my-5 md:my-7 grid grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto">
              {pairImages.map((src, i) => src && (
                <img
                  key={i}
                  src={src}
                  alt={expandableImageAlt || ''}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.45)] border-4 border-white/40"
                />
              ))}
            </div>
          )}
          {marker === 'VIDEO' && expandableVideo && (
            <div className="my-5 md:my-7">
              <video
                src={expandableVideo}
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                preload="auto"
                className={`w-full ${expandableVideoSize === 'sm' ? 'max-w-[220px]' : 'max-w-md'} mx-auto rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.45)] border-4 border-white/40`}
              />
            </div>
          )}
        </div>
      );
    }
    return elements;
  };

  const expandableSlot = expandableText ? (
    <motion.div
      className="relative z-20 mt-4 md:mt-5 max-w-2xl w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.5 }}
    >
      <button
        type="button"
        onClick={() => setIsExpanded((v) => !v)}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 backdrop-blur-md text-white text-xs md:text-sm font-display font-bold uppercase tracking-wider border border-white/30 hover:bg-white/25 hover:scale-105 transition-all"
        aria-expanded={isExpanded}
      >
        {isExpanded
          ? (expandableLabelOpen || t('Visa mindre', 'Show less'))
          : (expandableLabel || t('Läs mer', 'Read more'))}
        <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="expandable"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4 text-white/95 text-base md:text-lg font-body leading-snug">
              {renderExpandableContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  ) : null;

  return (
    <motion.div
      className="absolute inset-0 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated cinematic gradient background — unique per year */}
      <div
        className="absolute inset-0"
        style={{
          background: bgGradient,
          backgroundSize: '400% 400%',
          animation: 'gradientShift 12s ease infinite',
        }}
      />

      {/* Vignette for cinematic depth */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)' }}
      />

      {/* Big floating accent pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.img
          src={patternSrc}
          alt=""
          className="absolute -top-10 -right-10 w-[55vw] max-w-[700px] opacity-[0.18] select-none"
          animate={{ rotate: [0, 8, -3, 0], y: [0, -15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'brightness(1.4)' }}
        />
        <motion.img
          src={patternSrc}
          alt=""
          className="absolute -bottom-16 -left-12 w-[45vw] max-w-[600px] opacity-[0.12] select-none"
          animate={{ rotate: [0, -10, 5, 0], y: [0, 10, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'brightness(1.4)' }}
        />
        <img src={patternWhite} alt="" className="absolute top-[40%] left-[5%] w-[28%] opacity-[0.04] rotate-[-8deg]" />
        <img src={patternOrange} alt="" className="absolute top-[20%] right-[35%] w-[20%] opacity-[0.05] rotate-[12deg]" />
        <img src={patternGreen} alt="" className="absolute bottom-[10%] right-[15%] w-[22%] opacity-[0.04]" />
      </div>

      {/* Tiny year text top-right after content phase */}
      <AnimatePresence>
        {phase === 'content' && (
          <motion.span
            className="absolute top-16 right-4 md:top-6 md:right-20 font-display text-3xl md:text-6xl font-extrabold text-white/25 z-50 select-none pointer-events-none"
            initial={{ opacity: 0, scale: 3, x: '-40vw', y: '30vh' }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            {year}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Phase 0: Timeline transition */}
      <AnimatePresence>
        {phase === 'timeline' && hasTransition && (
          <TimelineTransition
            key={`tl-${fromYear}-${year}`}
            fromIndex={fromIndex!}
            toIndex={yearIndex}
            totalYears={totalYears}
            fromYear={fromYear!}
            toYear={year}
          />
        )}
      </AnimatePresence>

      {/* Phase 1: Big year fade-in */}
      <AnimatePresence>
        {phase === 'year-drop' && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-30 pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.3, x: '35vw', y: '-35vh' }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <motion.h1
              className="font-display text-[25vw] md:text-[20vw] font-extrabold text-white leading-none select-none"
              style={{ textShadow: '0 0 80px rgba(255,255,255,0.3)' }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            >
              {year}
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Cinematic content */}
      <AnimatePresence>
        {phase === 'content' && (
          <motion.div
            className="absolute inset-0 z-10 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className={`min-h-full w-full px-4 pt-24 pb-32 md:px-12 lg:px-20 md:pt-16 md:pb-28 flex flex-col ${centerVertically ? 'justify-center' : ''}`}>
              <ContentLayout
                layout={effectiveLayout}
                title={title}
                lead={lead}
                restLines={restLines}
                uniformText={uniformText}
                bodyBackline={bodyBackline}
                leftAlignedContent={leftAlignedContent}
                bodyVideo={bodyVideo}
                bodyImages={bodyImages}
                images={images}
                accentColor={accentColor}
                expandableSlot={expandableSlot}
                headerImage={headerImage}
                headerImageAlt={headerImageAlt}
                headerImageDesktopSide={headerImageDesktopSide}
              />

              {/* Sources rendered inline, between body text and the "Nästa" CTA */}
              {sources && sources.length > 0 && (
                <div className="mt-6 md:mt-8 flex flex-wrap gap-2 justify-center max-w-md md:max-w-3xl mx-auto w-full">
                  {sources.map((s, i) => (
                    <motion.a
                      key={s.url}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] md:text-sm font-display font-bold uppercase tracking-wider border border-white/30 hover:bg-white/25 hover:scale-105 transition-all"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 + i * 0.08, duration: 0.5 }}
                    >
                      <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" aria-hidden="true" />
                      <span>{s.label}</span>
                    </motion.a>
                  ))}
                </div>
              )}

              {/* Inline Next CTA at end of scrollable content (used when text is long). */}
              {inlineNext && onNext && (
                <div className="mt-10 md:mt-12 flex justify-center">
                  <button
                    type="button"
                    onClick={onNext}
                    className="px-7 py-3 md:px-9 md:py-3.5 font-display font-extrabold uppercase tracking-wider text-white text-base md:text-lg flex items-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #ff612b, #ffae30)',
                      borderRadius: '2rem 1rem 2rem 1rem',
                      boxShadow: '0 12px 40px rgba(255,97,43,0.55)',
                    }}
                  >
                    {t('Nästa', 'Next')}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Finale CTA */}
            {isFinale && (
              <motion.div
                className="fixed left-0 right-0 bottom-24 md:bottom-28 z-30 flex flex-col items-center gap-3 px-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <p className="text-white/95 text-sm md:text-base font-display font-bold uppercase tracking-wider">
                  {t('Följ med på resan', 'Follow the journey')}
                </p>
                <div className="flex gap-3 justify-center">
                  <a href="https://www.instagram.com/flavorbosstrich/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2.5 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/30 hover:bg-white/25 hover:scale-110 transition-all">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://www.facebook.com/flavorbosstrich" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2.5 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/30 hover:bg-white/25 hover:scale-110 transition-all">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://www.tiktok.com/@flavorbosstrich" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="p-2.5 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/30 hover:bg-white/25 hover:scale-110 transition-all">
                    <span className="font-display font-extrabold text-sm leading-none">TT</span>
                  </a>
                  <a href="https://www.linkedin.com/company/flavor-boss-catering-foodtruck-events/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2.5 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/30 hover:bg-white/25 hover:scale-110 transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
                <Link
                  to="/upplevelser"
                  className="inline-flex items-center gap-2 mt-1 px-5 py-2.5 rounded-full text-white font-display font-bold uppercase tracking-wider text-sm md:text-base"
                  style={{
                    background: 'linear-gradient(135deg, #ff612b, #ffae30)',
                    boxShadow: '0 0 30px rgba(255, 97, 43, 0.4)',
                  }}
                >
                  <CalendarHeart className="w-4 h-4" aria-hidden="true" />
                  {t('Boka en magisk upplevelse', 'Book a magical experience')}
                </Link>
              </motion.div>
            )}

            {/* Top-left Back button (sibling to "Hem" rendered by TimelineJourney) */}
            {onPrev && (
              <motion.button
                onClick={onPrev}
                aria-label={t('Tillbaka', 'Back')}
                className="fixed top-4 left-4 z-[60] flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md text-white font-display font-bold uppercase tracking-wider text-xs border border-white/30 hover:bg-white/25 hover:scale-105 transition-all shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <ChevronLeft className="w-4 h-4" />
                {t('Tillbaka', 'Back')}
              </motion.button>
            )}
            {onNext && !inlineNext && (
              <>
                {/* Bottom pulsing Next CTA — kept consistent across years */}
                <motion.button
                  onClick={onNext}
                  className="fixed left-1/2 -translate-x-1/2 bottom-5 md:bottom-6 z-40 px-7 py-3 md:px-9 md:py-3.5 font-display font-extrabold uppercase tracking-wider text-white text-base md:text-lg flex items-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #ff612b, #ffae30)',
                    borderRadius: '2rem 1rem 2rem 1rem',
                    animation: 'ctaPulse 2.4s ease-in-out infinite',
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  {t('Nästa', 'Next')}
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 0 25px rgba(255,238,0,0.55), 0 0 55px rgba(255,97,43,0.55), 0 12px 40px rgba(255,97,43,0.55); transform: translate(-50%, 0) scale(1); }
          50% { box-shadow: 0 0 50px rgba(255,238,0,0.95), 0 0 100px rgba(255,97,43,0.85), 0 14px 50px rgba(255,97,43,0.85); transform: translate(-50%, 0) scale(1.04); }
        }
      `}</style>
    </motion.div>
  );
};

/* ----------------------------- Layout Renderer ----------------------------- */

interface ContentLayoutProps {
  layout: LayoutKind;
  title?: string;
  lead?: string;
  restLines: string[];
  uniformText?: boolean;
  bodyBackline?: boolean;
  leftAlignedContent?: boolean;
  bodyVideo?: string;
  bodyImages?: string[];
  images?: string[];
  accentColor: string;
  expandableSlot?: ReactNode;
  headerImage?: string;
  headerImageAlt?: string;
  headerImageDesktopSide?: boolean;
}

// Renders the whole main text as one continuous block — same size/weight for
// every line, no emphasized lead or last line. Used when uniformText is set.
// A line equal to the literal marker "[[VIDEO]]" renders bodyVideo inline
// instead of a paragraph.
const UniformBody = ({ lines, bodyVideo }: { lines: string[]; bodyVideo?: string }) => {
  if (lines.length === 0) return null;
  return (
    <motion.div
      className="relative z-20 space-y-2 md:space-y-3 text-white/95 text-base md:text-lg lg:text-xl font-body leading-snug max-w-2xl"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
    >
      {lines.map((line, i) => (
        line === '[[VIDEO]]' && bodyVideo ? (
          <video
            key={i}
            src={bodyVideo}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            preload="auto"
            className="w-full max-w-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.45)] border-4 border-white/40 my-3"
          />
        ) : (
          <p key={i}>{line}</p>
        )
      ))}
    </motion.div>
  );
};

// A header image with its natural aspect ratio, a soft orange fade wash
// over it, and a slight tilt for a cinematic feel.
const HeaderBadge = ({ src, alt = '', tint = 'orange' }: { src: string; alt?: string; tint?: 'orange' | 'dark' }) => (
  <motion.div
    className="relative z-20 mx-auto mb-6 md:mb-8 w-full max-w-md md:max-w-xl lg:max-w-2xl rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
    animate={{ opacity: 1, scale: 1, rotate: -2 }}
    transition={{ type: 'spring', stiffness: 160, damping: 16, delay: 0.3 }}
  >
    <img src={src} alt={alt} className="relative w-full h-auto object-contain" />
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: tint === 'dark'
          ? 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 40%, transparent 75%)'
          : 'linear-gradient(180deg, rgba(249,115,22,0.55) 0%, rgba(249,115,22,0.3) 40%, transparent 75%)',
      }}
    />
  </motion.div>
);

const TitleBlock = ({ title, accentColor }: { title?: string; accentColor: string }) => {
  if (!title) return null;
  return (
    <motion.h2
      className="relative z-20 font-display font-extrabold uppercase text-white leading-[0.9] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 md:mb-6"
      style={{
        textShadow: '0 4px 30px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4)',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
    >
      {title.split(' ').map((word, i) => (
        <span key={i} className="inline-block mr-3" style={i === 1 ? { color: accentColor } : undefined}>
          {word}
        </span>
      ))}
    </motion.h2>
  );
};

const LeadBlock = ({ lead, accentColor, noBackline = false }: { lead?: string; accentColor: string; noBackline?: boolean }) => {
  if (!lead) return null;
  return (
    <motion.p
      className="relative z-20 font-display font-bold uppercase text-white text-xl md:text-2xl lg:text-3xl leading-tight mb-4 md:mb-6"
      style={noBackline ? undefined : { borderLeft: `4px solid ${accentColor}`, paddingLeft: '1rem' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
    >
      {parseInlineMarkdown(lead, 'lead-block')}
    </motion.p>
  );
};

const BodyBlock = ({ restLines, backline = false, accentColor }: { restLines: string[]; backline?: boolean; accentColor?: string }) => {
  if (restLines.length === 0) return null;
  return (
    <motion.div
      className="relative z-20 space-y-2 md:space-y-3 text-white/95 text-base md:text-lg lg:text-xl font-body leading-snug max-w-2xl"
      style={backline && accentColor ? { borderLeft: `4px solid ${accentColor}`, paddingLeft: '1rem' } : undefined}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6 }}
    >
      {restLines.map((line, i) => (
        <p key={i} className={i === restLines.length - 1 ? 'font-display font-bold uppercase text-lg md:text-xl tracking-wide' : ''}>
          {parseInlineMarkdown(line, `bl-${i}`)}
        </p>
      ))}
    </motion.div>
  );
};

const ImageOne = ({ src, rotate = -3, delay = 0.6 }: { src: string; rotate?: number; delay?: number }) => (
  <motion.div
    className="relative z-0 w-full h-full"
    initial={{ opacity: 0, scale: 0.6, rotate: rotate * 4 }}
    animate={{ opacity: 1, scale: 1, rotate }}
    transition={{ type: 'spring', stiffness: 180, damping: 16, delay }}
  >
    <img
      src={src}
      alt=""
      className="w-full h-full object-cover rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] border-4 border-white/40"
    />
  </motion.div>
);

const ContentLayout = ({ layout, title, lead, restLines, uniformText, bodyBackline, leftAlignedContent, bodyVideo, bodyImages, images, accentColor, expandableSlot, headerImage, headerImageAlt, headerImageDesktopSide }: ContentLayoutProps) => {
  const firstImage = images?.[0];
  const secondImage = images?.[1];

  // When uniformText is set, the main text is rendered as one continuous block
  // instead of the lead + body split. When bodyBackline is set, the accent
  // "backline" bar moves off the lead line and onto the body block.
  const allLines = lead ? [lead, ...restLines] : restLines;
  const textBlock = uniformText ? (
    <UniformBody lines={allLines} bodyVideo={bodyVideo} />
  ) : (
    <>
      <LeadBlock lead={lead} accentColor={accentColor} noBackline={bodyBackline} />
      <BodyBlock restLines={restLines} backline={bodyBackline} accentColor={accentColor} />
    </>
  );

  if (layout === 'imageBackdrop' && firstImage) {
    return (
      <div className="relative w-full max-w-6xl mx-auto self-center my-auto">
        <motion.img
          src={firstImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-40"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          style={{ filter: 'saturate(1.1) blur(1px)' }}
        />
        <div className="relative z-10 p-6 md:p-12 lg:p-16 backdrop-blur-[2px]">
          <TitleBlock title={title} accentColor={accentColor} />
          {textBlock}
          {expandableSlot}
        </div>
      </div>
    );
  }

  if (layout === 'twoUp' && firstImage && secondImage) {
    return (
      <div className="w-full max-w-7xl mx-auto self-center grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="grid grid-cols-2 gap-3 md:gap-5 h-44 md:h-[420px] order-1 lg:order-1">
          <ImageOne src={firstImage} rotate={-3} delay={0.6} />
          <ImageOne src={secondImage} rotate={4} delay={0.8} />
        </div>
        <div className="order-2 lg:order-2">
          <TitleBlock title={title} accentColor={accentColor} />
          {textBlock}
          {expandableSlot}
        </div>
      </div>
    );
  }

  if ((layout === 'imageLeft' || layout === 'imageRight') && firstImage) {
    const imageEl = (
      <div className="h-72 sm:h-80 md:h-[460px] lg:h-[560px] lg:sticky lg:top-12">
        <ImageOne src={firstImage} rotate={layout === 'imageLeft' ? -2 : 2} delay={0.6} />
      </div>
    );
    const textEl = (
      <div className="mt-4 lg:mt-0 lg:max-w-xl">
        <TitleBlock title={title} accentColor={accentColor} />
        {textBlock}
        {expandableSlot}
      </div>
    );
    return (
      <div className="w-full max-w-7xl mx-auto self-start lg:self-center grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start lg:items-center">
        {layout === 'imageLeft' ? (
          <>
            {imageEl}
            {textEl}
          </>
        ) : (
          <>
            <div className="order-2 lg:order-1">{textEl}</div>
            <div className="order-1 lg:order-2">{imageEl}</div>
          </>
        )}
      </div>
    );
  }

  // centered (no images, or fallback)
  const centeredInner = (
    <>
      {title && (
        <motion.h2
          className="font-display font-extrabold uppercase text-white leading-[0.9] tracking-tight text-5xl md:text-7xl lg:text-8xl xl:text-9xl mb-6 md:mb-8"
          style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          {title.split(' ').map((word, i) => (
            <span key={i} className="inline-block mr-3" style={i % 2 === 1 ? { color: accentColor } : undefined}>
              {word}
            </span>
          ))}
        </motion.h2>
      )}
      {lead && (
        leftAlignedContent ? (
          <motion.div
            className="text-left max-w-3xl mx-auto mb-5 md:mb-7"
            style={{ borderLeft: `4px solid ${accentColor}`, paddingLeft: '1rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <p className="font-display font-bold uppercase text-white text-2xl md:text-3xl lg:text-4xl leading-tight">
              {parseInlineMarkdown(lead, 'lead-la')}
            </p>
          </motion.div>
        ) : (
          <motion.p
            className="font-display font-bold uppercase text-white text-2xl md:text-3xl lg:text-4xl leading-tight mb-5 md:mb-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {parseInlineMarkdown(lead, 'lead-c')}
          </motion.p>
        )
      )}
      {restLines.length > 0 && (
        leftAlignedContent ? (
          bodyBackline ? (
            <>
              <motion.div
                className="text-left max-w-3xl mx-auto mb-3 md:mb-4"
                style={{ borderLeft: `4px solid ${accentColor}`, paddingLeft: '1rem' }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <p className="font-display font-bold uppercase text-white text-xl md:text-2xl tracking-wide">
                  {parseInlineMarkdown(restLines[0], 'la-backline')}
                </p>
              </motion.div>
              {restLines.length > 1 && (
                <motion.div
                  className="space-y-3 text-white/95 text-lg md:text-xl lg:text-2xl font-body leading-snug max-w-3xl mx-auto text-left"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                >
                  {renderTextLines(restLines.slice(1), 'la', { bodyImages, bodyVideo })}
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              className="space-y-3 text-white/95 text-lg md:text-xl lg:text-2xl font-body leading-snug max-w-3xl mx-auto text-left"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {renderTextLines(restLines, 'la', { bodyImages, bodyVideo })}
            </motion.div>
          )
        ) : bodyBackline ? (
          <>
            <motion.div
              className="text-left max-w-3xl mx-auto mb-3 md:mb-4"
              style={{ borderLeft: `4px solid ${accentColor}`, paddingLeft: '1rem' }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <p className="font-display font-bold uppercase text-white text-xl md:text-2xl tracking-wide">
                {restLines[0]}
              </p>
            </motion.div>
            {restLines.length > 1 && (
              <motion.div
                className="space-y-3 text-white/95 text-lg md:text-xl lg:text-2xl font-body leading-snug max-w-3xl mx-auto text-left"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                {restLines.slice(1).map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            className="space-y-3 text-white/95 text-lg md:text-xl lg:text-2xl font-body leading-snug max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {restLines.map((line, i) => (
              <p key={i} className={i === restLines.length - 1 ? 'font-display font-bold uppercase text-xl md:text-2xl tracking-wide' : ''}>
                {line}
              </p>
            ))}
          </motion.div>
        )
      )}
      {expandableSlot && (
        leftAlignedContent ? (
          <div className="mt-6 max-w-3xl mx-auto text-left">{expandableSlot}</div>
        ) : (
          <div className="mt-6 flex justify-center">{expandableSlot}</div>
        )
      )}
    </>
  );

  if (headerImageDesktopSide && headerImage) {
    return (
      <div className="w-full max-w-6xl mx-auto self-center">
        <div className="lg:hidden">
          <HeaderBadge src={headerImage} alt={headerImageAlt} tint="dark" />
        </div>
        <div className="relative z-20 text-center lg:grid lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-12 lg:items-center">
          <div className="hidden lg:block h-[480px] lg:sticky lg:top-12">
            <ImageOne src={headerImage} rotate={-2} delay={0.6} />
          </div>
          <div>{centeredInner}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-20 w-full max-w-4xl mx-auto self-center text-center">
      {headerImage && <HeaderBadge src={headerImage} alt={headerImageAlt} />}
      {centeredInner}
    </div>
  );
};

export default YearPage;