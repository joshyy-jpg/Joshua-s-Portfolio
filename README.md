# Joshua Lee — portfolio (black edition)

A separate React + TypeScript + Vite site. It doesn't touch the current site in
`~/Documents/portfolio:website 1`; that folder was only read for content and assets.

## Preview locally

```bash
cd ~/Documents/joshua-portfolio-black
npm install        # first time only
npm run dev        # http://127.0.0.1:5180
```

Production check: `npm run build && npm run preview` (http://127.0.0.1:5181).

## Deploy

Netlify, at https://joshuarlee.com. `netlify.toml` sets the build (`npm run build` →
`dist`, Node 22) and response headers; `public/_redirects` sends every route to
`index.html` so deep links like `/work/off-the-top` load.

- **Contact form**: the "Start a project" form posts to Netlify Forms as
  `website-project`. Netlify finds it through the hidden copy in `index.html`, so a
  field added to the form in `src/pages/Home.tsx` must be added there too.
  Form detection and email notifications are turned on in the Netlify UI.
- **Share preview**: `public/og.png` (1200×630), referenced from `index.html`. Each page
  sets its canonical link from `site.url` in `src/content/site.ts`.
- **Sitemap**: `public/sitemap.xml` lists every route; add a line when you add a project.
- **Situ**: the Situ editor extension writes into `public/plugins/`. It is gitignored
  and stripped from `dist/` after each build (see `vite.config.ts`).

## Where things live

| What | File |
| --- | --- |
| Hero, navigation, opening statements, contact copy, links | `src/content/site.ts` |
| Projects and case studies (cards, facts, sections, media) | `src/content/projects.ts` |
| About copy, experience, leadership, education | `src/content/people.ts` |
| All styling and motion | `src/styles/global.css` |
| Images and video | `public/media/` (each image as `.webp` + `.jpg`) |
| Koi logo | `public/brand/koi-512.webp` (master: `source-photos/koi-logo.png`) |
| Project logos | `src/components/Logos.tsx`, `public/logos/off-the-top-stack.png` (from the old site) |
| Résumé | `public/Joshua_Lee_Resume.pdf` |

To change copy, edit the content files; the layout reads from them. In
`perspective` and other line arrays, `lines` are desktop breaks, `mobile` are
narrow-screen breaks, and `*word*` sets a word in the serif italic.

Case-study sections are typed (`text`, `list`, `decisions`, `evidence`,
`compare`, `quote`, `note`, `media`), so a new project only needs a new entry
in `projects.ts`.

## Hero and logo

The opening animation starts with a centered koi on black. J and L emerge on
either side, then the bottom-left movement, spread, page reveal, and
header-logo landing continue. Any key, click, scroll, or touch skips it; reduced
motion skips the sequence entirely.

The hero is two photographic koi swimming on black (`src/components/RealKoi.tsx`),
each drawn in thin strips along a bending spine, with a water surface and wakes
(`src/lib/waterSurface.ts`). It runs at about 30 fps, pauses when offscreen or in a
hidden tab, and holds still under reduced motion.

The name sits in the bottom-left corner with its J on the page margin; the roles
line and the buttons (View work, Résumé, Need a website?) start under the J's stem.
On hover a red box sweeps in behind the name from left to right (black type on red,
like the footer) and clears left to right when the pointer leaves.

Hero markup: `src/pages/Home.tsx`; styles: "Garden hero" in `src/styles/v3.css`;
intro timing: `src/lib/intro.ts`.

## Fonts

Geist (sans) and Instrument Serif (display), both SIL Open Font License,
self-hosted via `@fontsource`.

## Motion and accessibility notes

- Content is visible by default. `index.html` adds `motion` to `<html>` only
  when reduced motion is not requested, and removes it after 4s if the reveal
  system never starts.
- `prefers-reduced-motion: reduce` removes transforms, delays and video autoplay.
- The Spotify demo plays muted only while in view, has a Pause/Play button,
  and falls back to a still image.
- The dock menu traps focus while open; Escape, outside click, and choosing a
  destination close it.

## Content source

The original purple portfolio (`portfolio:website 1`) is the source of truth.
`src/content/original.ts` preserves its bio, résumé entries, education, leadership,
skills, project summaries, and the three original case-study narratives.
Both portfolios use the byte-identical résumé PDF.
