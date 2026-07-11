import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import AwardsStrip from '@/components/AwardsStrip';
import SectionDivider from '@/components/SectionDivider';
import CTABanner from '@/components/CTABanner';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import StatsStrip from '@/components/home/StatsStrip';
import WhyUsSection from '@/components/home/WhyUsSection';
import InstagramFeed from '@/components/home/InstagramFeed';


const Index = () => {
  const { t } = useLanguage();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name: 'Flavor-Boss',
    url: 'https://flavorboss.se',
    telephone: '+46700663611',
    email: 'info@flavorboss.se',
    address: { '@type': 'PostalAddress', streetAddress: 'Hantverkaregatan 4', addressLocality: 'Arlöv', addressCountry: 'SE' },
    servesCuisine: ['Afro-Caribbean', 'Jamaican', 'West African'],
    priceRange: '$$',
    areaServed: ['Malmö', 'Skåne', 'Lund', 'Ystad', 'Båstad'],
    sameAs: ['https://instagram.com/flavorboss', 'https://facebook.com/flavorboss', 'https://tiktok.com/@flavorboss'],
  };

  return (
    <>
      <SEOHead
        title={t('Flavor-Boss — Afro-Karibisk Catering & Foodtruck Malmö', 'Flavor-Boss — Afro-Caribbean Catering & Food Truck Malmö')}
        description={t(
          'Sveriges prisbelönta afro-karibiska catering, foodtruck & event. Boka Patricia Dianda\'s Flavor-Boss för ditt nästa event i Malmö & Skåne.',
          'Sweden\'s award-winning Afro-Caribbean catering, food truck & events. Book Flavor-Boss for your next event in Malmö & Skåne.'
        )}
        canonical="https://www.flavorboss.se/"
        jsonLd={jsonLd}
      />

      <main id="main-content">
        <HeroSection />
        <AwardsStrip />
        <ServicesSection />
        <div className="w-full bg-gradient-to-r from-[#F07020] to-[#E8186D] py-1 md:py-2">
          <div className="text-center px-4">
            <span className="font-kurri text-black text-lg md:text-2xl lg:text-3xl tracking-tight">
              Afro-Caribbean Streetfood At it's Best!
            </span>
          </div>
        </div>
        <AboutSection />
        <StatsStrip />

        <SectionDivider dark />
        <WhyUsSection />
        <CTABanner />
        <TestimonialsSection />
        <InstagramFeed />
      </main>
    </>
  );
};

export default Index;
