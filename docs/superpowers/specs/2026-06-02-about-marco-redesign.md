# About Page — Marco Replica (Redesign)

- **Date:** 2026-06-02
- **Goal:** Faithfully replicate marco.fyi/about: bio (left) + interactive bento (right) + full-width iMessage. Replace the previous draggable canvas / experience timeline / photo wall.

## Layout
- Two columns on `lg+`, stacked on mobile.
- **Left:** `What I'm about.` heading + bio sections (reuse real Wix content) + a small icon row (email · X · resume · WeChat).
- **Right bento** (fixed grid, NOT draggable), with "Click around…" top-right:
  - Row 1: **X card** | **Music card**
  - Row 2: **Photo card** | **WeChat card**
  - Row 3 (spans full width): **iMessage card**
- Removed: experience timeline, separate photo gallery, draggable canvas.

## Cards
1. **X card** — avatar + `Lingkan Wang @handle` + one-liner ("designing AI products · prev @Ecovacs @Kwai @Varsity · CMU") + `Read my posts ↗` (links to X). Twitter→X.
2. **Music card** — embedded **Spotify public-playlist** player (click → 30s preview), Apple-Music-style card header. Falls back to a link card until a public playlist URL is provided (Liked Songs is private/non-embeddable).
3. **Photo card** — shows one photo; **click → next photo**; category pills (People / Places / Food / Pups) cycle within a category; Apple-Photos icon top-right. Uses the 15 curated photos in `public/about/`.
4. **WeChat card** — shows the QR directly + `Lynkan · scan to add`. QR at `public/about/wechat-qr.png` (graceful fallback until provided).
5. **iMessage card** (full width) — bot bubble "want to work together? or just say hi 👋", input + send → mailto.

## Keep
Emil type/spacing/motion + light/dark. Reduced-motion safe. Bio = real content.

## Pending assets (graceful fallbacks)
1. Public Spotify playlist URL → `lib/about.ts` `spotify.embed`.
2. WeChat QR → `public/about/wechat-qr.png`.
3. X handle → `lib/site.ts` `links.x`.
4. Resume PDF → `public/Lingkan-Wang-Resume.pdf` (owner adding).

## Components
- New: `components/about/photo-card.tsx` (client, cycle + category), `components/about/x-card.tsx`, `components/about/music-card.tsx` (embed-or-link).
- Keep: `wechat-card.tsx`, `imessage.tsx`.
- Remove: `draggable-canvas.tsx`, `cards.tsx`, `photo-gallery.tsx`.
- `app/about/page.tsx` rebuilt to the bento layout.
