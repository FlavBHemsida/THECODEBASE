import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import leaf1 from '@/assets/leaf-1.png';
import leaf2 from '@/assets/leaf-2.png';
import leaf3 from '@/assets/leaf-3.png';
import yellowWave from '@/assets/pattern-yellow-wave.png';
import greenZigzag from '@/assets/pattern-green-zigzag.png';
import buffe1 from '@/assets/cateringbuffe-1.png';
import buffe2 from '@/assets/cateringbuffe-2.png';
import buffe3 from '@/assets/cateringbuffe-3.png';
import yellowCircleMerAnMat from '@/assets/yellow-circle-mer-an-mat.png';
import TrustQuotes from '@/components/TrustQuotes';

const carouselImages = [buffe1, buffe2, buffe3];

const Cateringpaket = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title={t(
          'Cateringpaket — Flavor-Boss Malmö & Skåne',
          'Catering Package — Flavor-Boss Malmö & Skåne'
        )}
        description={t(
          'Skräddarsydda cateringpaket för bröllop, företagsevent & privata fester. Buffé, portioner eller grill — vi kommer till dig i hela Skåne.',
          'Tailored catering packages for weddings, corporate events & private parties. Buffet, portions or grill — we come to you across Skåne.'
        )}
        canonical="https://www.flavorboss.se/cateringpaket"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Catering',
          name: 'Flavor-Boss Cateringpaket',
          description:
            'Skräddarsydda afro-karibiska cateringpaket för bröllop, företagsevent och privata fester i Malmö och Skåne. Buffé, portioner eller grill.',
          provider: {
            '@type': 'FoodEstablishment',
            name: 'Flavor-Boss',
            url: 'https://flavorboss-ab.lovable.app/',
            telephone: '+46700663611',
            email: 'info@flavorboss.se',
          },
          areaServed: ['Malmö', 'Skåne', 'Lund', 'Köpenhamn'],
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            url: 'https://flavorboss-ab.lovable.app/boka-oss',
          },
        }}
      />

      {/* Animated themed background — green gradient with floating leaves */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Animated green gradient base */}
        <div
          className="absolute inset-0 animate-gradient-shift"
          style={{
            backgroundImage:
              'linear-gradient(135deg, #46905c 0%, #4f965c 50%, #64a453 100%)',
            backgroundSize: '200% 200%',
          }}
        />

        {/* Green zigzag pattern overlay — above gradient, below leaves */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
          style={{
            backgroundImage: `url(${greenZigzag})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '320px auto',
          }}
        />

        {/* Leaf 1 — right edge, upper area */}
        <motion.img
          src={leaf1}
          alt=""
          aria-hidden="true"
          className="absolute top-24 right-0 w-40 md:w-64 pointer-events-none select-none opacity-80 drop-shadow-lg translate-x-1/3"
          animate={{ y: [0, -20, 10, 0], rotate: [0, 6, -4, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Leaf 2 — left edge */}
        <motion.img
          src={leaf2}
          alt=""
          aria-hidden="true"
          className="absolute top-1/3 left-0 w-48 md:w-72 pointer-events-none select-none opacity-80 drop-shadow-lg -translate-x-1/3"
          animate={{ y: [0, 15, -10, 0], rotate: [0, -5, 4, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Leaf 3 — right edge, lower area */}
        <motion.img
          src={leaf3}
          alt=""
          aria-hidden="true"
          className="absolute bottom-24 right-0 w-44 md:w-60 pointer-events-none select-none opacity-80 drop-shadow-lg translate-x-1/3"
          animate={{ y: [0, -12, 18, 0], rotate: [0, 4, -6, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Main content */}
        <main className="relative z-10 container-site pt-32 pb-24 min-h-screen">
          {/* Top yellow wave pattern — under the navbar */}
          <img
            src={yellowWave}
            alt=""
            aria-hidden="true"
            className="w-full h-6 md:h-8 object-cover object-center mb-12 select-none pointer-events-none"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="text-center mb-16"
          >
            <h1
              className="font-display font-extrabold text-4xl md:text-7xl uppercase mb-4 tracking-tight"
              style={{ color: '#ffeb02' }}
            >
              {t('CATERING-BUFFEUPPLEVELSE', 'CATERING BUFFET EXPERIENCE')}
            </h1>
            <p className="text-lg md:text-2xl text-white/85 max-w-2xl mx-auto">
              {t(
                'Njut av en varm och riklig buffé med en fusion av smaker från Västafrika, Centralafrika och Karibien. Välj ditt önskade leveranssätt så vi tar hand om resten.',
                'Enjoy a warm and generous buffet with a fusion of flavors from West Africa, Central Africa and the Caribbean. Choose your preferred delivery method and we take care of the rest.'
              )}
            </p>
          </motion.div>

          {/* Horizontally scrolling photo strip — thin, edge-to-edge */}
          <div className="relative -mx-4 md:-mx-8 mb-16 overflow-hidden">
            <div
              className="flex animate-scroll-photos"
              style={{ width: 'max-content' }}
            >
              {[...carouselImages, ...carouselImages].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  loading="eager"
                  className="h-[130px] w-auto object-cover flex-shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Two title tiles + yellow circle attachment — stacked vertically */}
          <div className="flex flex-col gap-12 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="text-center px-4"
            >
              <h2
                className="font-display font-extrabold text-3xl md:text-5xl uppercase mb-4 tracking-tight"
                style={{ color: '#ffeb02' }}
              >
                {t('FULL SERVICE-BESTÄLLNING', 'FULL SERVICE ORDER')}
              </h2>
              <p className="text-sm md:text-base text-white/90 leading-relaxed whitespace-pre-line">
                {t(
                  'Vi levererar och dukar upp buffén och bjuder därefter på en energifylld presentation av \nsmakupplevelsen som väntar er i samband med leveransen - sedan är det bara att njuta!',
                  'We deliver and set up the buffet and then treat you to an energetic presentation of \nthe flavor experience awaiting you upon delivery — then just enjoy!'
                )}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="text-center px-4"
            >
              <h2
                className="font-display font-extrabold text-3xl md:text-5xl uppercase mb-4 tracking-tight"
                style={{ color: '#ffeb02' }}
              >
                {t('ENKEL LEVERANS', 'SIMPLE DELIVERY')}
              </h2>
              <p className="text-sm md:text-base text-white/90 leading-relaxed whitespace-pre-line">
                {t(
                  'Maten levereras varm i engångsförpackningar och ni tar själva hand om uppdukningen \npå plats. Perfekt för er som vill styra upplägget själva. Cateringbox kan lånas för längre\n värmehållning av maten för att sedan returneras till vår adress inom en vecka.',
                  'The food is delivered hot in disposable packaging and you handle the setup \non site yourselves. Perfect for those who want to manage the arrangement themselves. A catering box can be borrowed for longer\n heat retention of the food and then returned to our address within a week.'
                )}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="flex justify-center px-4"
            >
              <img
                src={yellowCircleMerAnMat}
                alt={t(
                  'Mer än bara mat — Afro-Karibiska dukar och lyktor ingår i alla beställningar för att förstärka känslan och helhetsupplevelsen.',
                  'More than just food — Afro-Caribbean tablecloths and lanterns are included in all orders to enhance the feeling and overall experience.'
                )}
                className="w-64 md:w-96 h-auto select-none pointer-events-none drop-shadow-xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="text-center px-4"
            >
              <h2
                className="font-display font-extrabold text-3xl md:text-5xl uppercase mb-4 tracking-tight"
                style={{ color: '#ffeb02' }}
              >
                {t('TILLKOMMANDE KOSTNADER', 'ADDITIONAL COSTS')}
              </h2>
              <p className="text-sm md:text-base text-white/90 leading-relaxed">
                {t(
                  'Leverans tillkommer för enkel beställning med 299 KR inom Malmö/Burlöv. Leveranskostnaden varierar beroende på avstånd. Avhämtning är kostnadsfritt.',
                  'Delivery is added for simple orders at 299 SEK within Malmö/Burlöv. Delivery cost varies depending on distance. Pickup is free of charge.'
                )}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="flex justify-center px-4"
            >
              <Link
                to="/boka-oss"
                className="inline-block font-display font-extrabold uppercase tracking-wide text-white text-lg md:text-2xl px-10 md:px-14 py-4 md:py-5 rounded-full shadow-2xl transition-transform duration-300 hover:scale-105 hover:shadow-[0_15px_40px_rgba(240,112,32,0.5)]"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #F07020 0%, #E8186D 50%, #F07020 100%)',
                  backgroundSize: '200% 200%',
                }}
              >
                {t('BOKA OSS IDAG', 'BOOK US TODAY')}
              </Link>
            </motion.div>
          </div>

          {/* Bottom yellow wave pattern — right before the footer */}
          <img
            src={yellowWave}
            alt=""
            aria-hidden="true"
            className="w-full h-6 md:h-8 object-cover object-center mt-20 select-none pointer-events-none"
          />
        </main>
        <TrustQuotes seed="cateringpaket" count={2} variant="light" headingSv="Vad våra kunder säger" headingEn="What Our Clients Say" />
      </div>
    </>
  );
};

export default Cateringpaket;