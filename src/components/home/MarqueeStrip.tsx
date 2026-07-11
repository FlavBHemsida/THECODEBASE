import { useLanguage } from '@/contexts/LanguageContext';

const MarqueeStrip = () => {
  const { t } = useLanguage();

  const text = t(
    'Afro-Caribbean Street Food at It´s Best ',
    'Afro-Caribbean Street Food at Its Best '
  );

  return (
    <div className="w-full bg-white py-3 md:py-4">
      <div className="container-site flex items-center justify-center">
        <span className="font-display font-extrabold uppercase text-black text-lg md:text-2xl lg:text-3xl tracking-tight text-center">
          {text}
        </span>
      </div>
    </div>
  );
};

export default MarqueeStrip;

