const AwardsStrip = () => {
  const awards = [
    'Streetfood Mästare 2022',
    'Streetfood Mästare 2023',
    'Nordiska Mästare 2023',
    'Streetfood Mästare 2024',
    'Streetfood Mästare 2025',
    'Top 10 Unga Entreprenörer i Sverige',
  ];
  const items = [...awards, ...awards];
  return (
    <div className="funky-gradient overflow-hidden py-5" aria-label="Utmärkelser">
      <div className="flex animate-scroll-awards whitespace-nowrap">
        {items.map((award, i) => (
          <span key={i} className="text-primary-foreground font-display text-sm md:text-base uppercase tracking-wider mx-6 flex-shrink-0 font-bold">
            {award}
            <span className="mx-6 opacity-60">/</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default AwardsStrip;
