# CLAUDE.md

Guidance for working in this repository. Read this first — it should save you from
having to scan the whole tree before making a change.

## What this is

Marketing website for **Flavor-Boss** (Afro-Caribbean streetfood / catering /
foodtruck brand, Malmö). Single-page React app, statically built and deployed to
GitHub Pages at **flavorboss.se**.

Stack: **Vite + React 18 + TypeScript + Tailwind CSS + shadcn/ui + framer-motion +
react-router-dom**. Built with Lovable (see `.lovable/`).

## Commands

```bash
npm run dev      # Vite dev server (defaults to :8080, falls back to :8081 if taken)
npm run build    # production build to dist/
npm run lint     # eslint
npm run test     # vitest (run once);  npm run test:watch to watch
npx tsc --noEmit -p tsconfig.app.json   # typecheck (no emit)
```

Before finishing a change, run typecheck + lint. `npm run build` is a good final
sanity check for anything structural.

## Layout

- `src/App.tsx` — routes (react-router). All page routes registered here.
- `src/pages/*` — one component per route (`Index`, `Meny`, `VarResa`, etc.).
- `src/components/*` — shared components; `components/home/*` are homepage sections,
  `components/journey/*` are the "Vårt Äventyr" timeline, `components/ui/*` is shadcn.
- `src/contexts/LanguageContext.tsx` — bilingual state.
- `src/index.css` — Tailwind layers + design tokens (CSS vars) + utility classes
  (`.funky-gradient`, `.text-subheading`, `.warm-gradient`, etc.).
- `src/assets/*` — imported images (bundled). `public/*` — static assets served as-is
  (videos, audio, brochures).

## Conventions

### Bilingual text (important)
All user-facing copy is Swedish + English via `useLanguage()`:

```tsx
const { t } = useLanguage();
t('Svenska texten', 'The English text')   // returns one based on current lang
```

Default language is `sv`. **Every string you add must be provided in both languages.**

### Styling
Tailwind utility classes + design tokens defined as HSL CSS vars in `index.css`
(`--primary`, `--accent`, `--surface-dark`, …). Reuse existing utility classes and
tokens rather than hardcoding colors. Fonts: `--font-display` (Barlow Condensed) for
headings, `--font-body` (DM Sans) for body.

### The "Vårt Äventyr" journey timeline
This is the most involved feature and the one most often edited.

- Route `/var-resa` → `pages/VarResa.tsx` has three steps: `landing` (AdventureGate)
  → `intro` → `journey`. Navbar and Footer are hidden on this route (see the
  `Conditional*` wrappers in `App.tsx`).
- The per-year content is a **data array (`years`) in `components/journey/TimelineJourney.tsx`**.
  Editing a slide's title/text usually means editing that array, NOT JSX. Fields:
  `titleSv/En`, `extraTextSv/En` (main body), `expandableTextSv/En` (the "Läs mer"
  block), `layout`, `gradient`, `accentColor`, `images`, `sources`, plus flags:
  - `uniformText` — render main text as one continuous block (no big lead line / no
    forced-bold last line). Currently on 2016 & 2017.
  - `bodyBackline` — move the accent-colored left "backline" bar from the lead line
    onto the body block. Currently on 2018.
  - `[[IMAGE]]` marker inside `expandableText*` renders `expandableImage(s)` inline.
- `components/journey/YearPage.tsx` renders a slide: title → main text → "Läs mer" →
  sources → next. Layout variants (`imageLeft/Right/twoUp/imageBackdrop/centered`)
  live in the `ContentLayout` component.
- **Layering principle:** all text sits at `z-20`, images (`ImageOne`) at `z-0`, so
  text always renders in front of overlapping images on narrow screens. Keep this when
  adding elements.

### Home page ↔ journey year titles
The homepage "Vårt Äventyr — Priser & Utmärkelser" strip in
`components/home/WhyUsSection.tsx` has its own `timeline` array of year titles. When a
year's title changes in `TimelineJourney.tsx`, **update the matching entry in
`WhyUsSection.tsx` too** so they stay consistent.

## Entry gate / music
`components/SiteEntryGate.tsx` shows a "Follow The Adventure" gate on first arrival
(gates music autoplay). It is intentionally skipped on `/var-resa`, which has its own
gate. `components/BackgroundMusic.tsx` handles audio.

## Deploy (read this before wondering why the site didn't update)
Deployment is **GitHub Pages via `.github/workflows/deploy.yml`, triggered on push to
`master`**. Nothing goes live until the commit reaches `origin/master`. Local commits
(including ones made via GitHub Desktop that weren't actually pushed) will not deploy.
`public/CNAME` = `flavorboss.se`.
