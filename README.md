# Lingkan Wang — Portfolio

Product-design portfolio. Next.js (App Router) + TypeScript + Tailwind v4 + Framer Motion. Emil-Kowalski-inspired: restrained, typographic, subtle motion, light/dark.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Add a project

1. Add `content/work/<slug>.mdx` with frontmatter (copy an existing file in `content/work/` and edit the fields). The filename is the URL slug.
2. Drop images in `public/work/<slug>/` and set `cover`, `thumbnail`, and the `<Figure src="...">` paths. Until then, tasteful placeholders render automatically.
3. Set `confidential: true` to blur the cover placeholder for NDA work.

## Test & build

```bash
npm test        # loader unit tests
npm run build   # production build (all routes static/SSG)
```

## Deploy

Push to GitHub and import the repo in Vercel (zero config). No env vars required.

## Customization

- Accent color and theme tokens: `app/globals.css` (`--color-accent` etc., in both `@theme` and `.dark`).
- Bio / contact / nav: `lib/site.ts`.
- Motion timings: `lib/motion.ts`.
