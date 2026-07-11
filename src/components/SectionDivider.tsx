import yummyAsset from "@/assets/yummy-in-your-tummy.png.asset.json";

const SectionDivider = ({ dark = false }: { dark?: boolean }) => {
  // Render many copies so the strip always covers the full viewport width
  // even on ultra-wide screens during the scroll loop.
  const copies = Array.from({ length: 16 });

  return (
    <div className="relative w-full overflow-hidden leading-[0] -my-px h-[31px] md:h-[47px]" aria-hidden="true">
      {/* Zig-zag divider */}
      <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <defs>
          <pattern id={`zigzag-${dark ? 'd' : 'l'}`} width="60" height="50" patternUnits="userSpaceOnUse">
            <polygon points="0,50 30,0 60,50" fill={dark ? 'hsl(280 30% 12%)' : 'hsl(45 100% 96%)'} opacity="0.15" />
            <polygon points="15,50 45,0 75,50" fill={dark ? 'hsl(332 90% 48%)' : 'hsl(22 95% 52%)'} opacity="0.08" />
          </pattern>
        </defs>
        <rect width="1440" height="50" fill={`url(#zigzag-${dark ? 'd' : 'l'})`} />
      </svg>

      {/* Spinning marquee overlaid on top of the SVG (fixed height — band grows around it) */}
      <div className="absolute inset-0 flex items-center overflow-hidden">
        <div className="flex w-max animate-yummy-marquee items-center">
          {copies.map((_, i) => (
            <img
              key={i}
              src={yummyAsset.url}
              alt=""
              className="h-[27px] md:h-[43px] w-auto select-none pointer-events-none mx-3 md:mx-5"
              draggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionDivider;
