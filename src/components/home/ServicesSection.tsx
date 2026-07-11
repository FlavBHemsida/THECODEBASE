import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import foodtruck1 from '@/assets/foodtruck-1.jpg';
import foodtruck2 from '@/assets/foodtruck-2.jpg';
import foodtruck3 from '@/assets/foodtruck-3.jpg';
import servicesBg from '@/assets/services-bg.png';
import grill1 from '@/assets/grill-1.jpg';
import grill2 from '@/assets/grill-2.jpg';
import event3 from '@/assets/event-3.jpg';
import buffe1 from '@/assets/cateringbuffe-1.png';
import buffe2 from '@/assets/cateringbuffe-2.png';
import buffe3 from '@/assets/cateringbuffe-3.png';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const },
};

const ImageAlbum = ({ images, alt }: { images: string[]; alt: string }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[2500ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}
    </div>
  );
};

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      sv: 'Cateringpaket', en: 'Catering Package',
      descSv: 'Buffé, portioner eller grill. Vi kommer till dig i hela Skåne. Perfekt för bröllop, företagsevent och privata fester.',
      descEn: 'Buffet, portions, or grill. We come to you throughout Skåne. Perfect for weddings, corporate events, and private parties.',
      accent: 'border-primary', images: [buffe1, buffe2, buffe3], link: '/cateringpaket',
    },
    {
      sv: 'Foodtruck', en: 'Food Truck',
      descSv: 'Boka vår truck för festival, bröllop eller företagsevent. En upplevelse som sticker ut.',
      descEn: 'Book our truck for festivals, weddings, or corporate events. An experience that stands out.',
      accent: 'border-primary', images: [foodtruck1, foodtruck2, foodtruck3], link: '/foodtruck',
    },
    {
      sv: 'Grill', en: 'Grill',
      descSv: 'Live grillmaster med jamaican fusion – jerk chicken & Jerk Cauliflower direkt från grillen till din tallrik.',
      descEn: 'Live grillmaster with Jamaican fusion – jerk chicken & jerk cauliflower straight from the grill to your plate.',
      accent: 'border-primary', images: [grill1, grill2], link: '/grill',
    },
    {
      sv: 'Helhetsupplevelse', en: 'Complete Experience',
      descSv: 'Mat + DJ + Dekoration + Värdinna. Allt på ett ställe. Vi skapar minnen som varar.',
      descEn: 'Food + DJ + Decoration + Host. All in one place. We create memories that last.',
      accent: 'border-primary', images: [event3], link: '/upplevelser',
    },
  ];

  return (
    <section className="relative overflow-hidden py-6 md:py-16 lg:py-20" style={{ backgroundImage: `url(${servicesBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Animated blobs */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-secondary/15 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />

      {/* African-inspired geometric pattern — layered triangles & diamonds */}
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: `
          linear-gradient(60deg, hsl(var(--primary-foreground)) 25%, transparent 25.5%, transparent 75%, hsl(var(--primary-foreground)) 75.5%),
          linear-gradient(120deg, hsl(var(--primary-foreground)) 25%, transparent 25.5%, transparent 75%, hsl(var(--primary-foreground)) 75.5%)
        `,
        backgroundSize: '40px 70px',
      }} />

      {/* Zigzag pattern overlay */}
      <div className="absolute inset-0 opacity-[0.06]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="african-zigzag" x="0" y="0" width="60" height="30" patternUnits="userSpaceOnUse">
              <polyline points="0,15 15,0 30,15 45,0 60,15" fill="none" stroke="hsl(0 0% 100%)" strokeWidth="2" />
              <polyline points="0,30 15,15 30,30 45,15 60,30" fill="none" stroke="hsl(0 0% 100%)" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#african-zigzag)" />
        </svg>
      </div>

      {/* Diamond dot pattern */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: `
          radial-gradient(circle, hsl(var(--primary-foreground)) 2px, transparent 2px),
          radial-gradient(circle, hsl(var(--primary-foreground)) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px, 30px 30px',
        backgroundPosition: '0 0, 15px 15px',
      }} />

      {/* Decorative border strip top */}
      <div className="absolute top-0 left-0 right-0 h-2 funky-gradient opacity-60" />

      <div className="container-site relative z-10">
        <motion.h2 {...fadeUp} className="text-2xl md:text-5xl font-display font-extrabold text-surface-green-foreground text-center mb-1 md:mb-3">
          {t('Våra upplevelser', 'Our Experiences')}
        </motion.h2>
        <motion.p {...fadeUp} className="text-sm md:text-subheading text-center mb-4 md:mb-12 text-primary">
          {t('Eventcatering Skåne', 'Event Catering Skåne')}
        </motion.p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-7">
          {services.map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              className={`bg-surface-green-foreground/10 backdrop-blur-sm rounded-xl md:rounded-3xl overflow-hidden border-l-4 ${item.accent} hover:-translate-y-1 transition-all duration-200 group flex flex-col h-full`}
            >
              {item.images.length > 0 && (
                <div className="h-24 md:h-48 overflow-hidden">
                  {item.images.length > 1 ? (
                    <ImageAlbum images={item.images} alt={t(item.sv, item.en)} />
                  ) : (
                    <img
                      src={item.images[0]}
                      alt={t(item.sv, item.en)}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
              )}
              <div className="p-3 md:p-7 flex flex-col flex-1">
                <h3 className="font-display text-base md:text-2xl font-bold text-surface-green-foreground uppercase mb-1 md:mb-2 leading-tight">
                  {t(item.sv, item.en)}
                </h3>
                <p className="text-surface-green-foreground/80 text-[11px] md:text-sm text-body mb-2 md:mb-4 leading-snug">{t(item.descSv, item.descEn)}</p>
                <Link
                  to={item.link}
                  className="mt-auto self-start inline-flex items-center gap-1 md:gap-2 px-3 md:px-5 py-1.5 md:py-2.5 rounded-full bg-primary text-primary-foreground font-display font-bold text-[10px] md:text-sm uppercase tracking-wider hover:gap-3 transition-all"
                >
                  {t('Läs mer', 'Read more')} <span>&rarr;</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div {...fadeUp} className="text-center mt-6 md:mt-10">
          <Link to="/boka-oss" className="inline-flex items-center gap-2 font-bold hover:gap-3 transition-all text-lg group text-primary">
            {t('Boka ditt event', 'Book your event')} <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </motion.div>
      </div>

    </section>
  );
};

export default ServicesSection;
