# Mobile-only floating icons in "Om Flavor-Boss"

Yes — fully possible, and it meets all your requirements.

## What changes
- Add the same dancing floating icon set (the 23 patterns used on the "Follow The Adventure" landing in `VarResa.tsx` / `TestimonialsSection.tsx`) to `src/components/home/AboutSection.tsx`.
- Render them inside a wrapper with Tailwind class `md:hidden` so they only appear on phone screens (<768px) and are completely absent on tablet/desktop.
- Use `pointer-events-none` and `absolute` positioning inside the section so they float behind content without blocking taps.
- Lower opacity (~0.25–0.35) so the portrait + text stay fully readable on mobile.
- Same Framer Motion animation (gentle y/x/rotate loops with staggered delays) as the adventure landing.

## Desktop
No change at all — the icons are not rendered on `md+` viewports.

## Files
- `src/components/home/AboutSection.tsx` — import the 23 pattern PNGs from `@/assets/journey/`, add a `md:hidden` absolute-positioned layer with the mapped `motion.img` icons.

No new assets, no logic changes, no impact to other pages.
