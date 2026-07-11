import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import splashImg from '@/assets/splash-button.png';

interface CTABannerProps {
  titleSv?: string;
  titleEn?: string;
  buttonSv?: string;
  buttonEn?: string;
  to?: string;
}

const CTABanner = ({
  titleSv = 'LÅT OSS GÖRA DITT EVENT LEGENDARISKT',
  titleEn = "LET'S MAKE YOUR EVENT LEGENDARY",
  buttonSv = 'BOKA OSS NU',
  buttonEn = 'BOOK US NOW',
  to = '/boka-oss',
}: CTABannerProps) => {
  const { t } = useLanguage();

  return (
    <section
      className="relative min-h-[50vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(135deg, hsla(22,95%,52%,0.85) 0%, hsla(332,90%,48%,0.8) 50%, hsla(280,60%,30%,0.85) 100%)',
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-accent/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />

      <div className="text-center px-4 relative z-10">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold uppercase text-primary-foreground mb-8" style={{ textWrap: 'balance' } as React.CSSProperties}>
          {t(titleSv, titleEn)}
        </h2>
        <Link
          to={to}
          onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
          className="relative inline-flex items-center justify-center group mx-auto w-52 h-52 md:w-60 md:h-60"
        >
          <img
            src={splashImg}
            alt=""
            className="absolute w-[calc(100%+20px)] h-[calc(100%+20px)] object-contain drop-shadow-[0_0_25px_hsla(50,100%,60%,0.6)] group-hover:drop-shadow-[0_0_40px_hsla(50,100%,60%,0.8)] group-hover:scale-110 transition-all duration-300 -translate-x-[11px] -translate-y-[7px]"
          />
          <span className="relative z-10 font-display font-extrabold uppercase tracking-wider text-sm md:text-base" style={{ color: '#ff632b' }}>
            {t(buttonSv, buttonEn)}
          </span>
        </Link>
      </div>
    </section>
  );
};

export default CTABanner;
