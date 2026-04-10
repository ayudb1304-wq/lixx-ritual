# Phase 4 — Build Plan (The Closer)

Phase 4 of the Lixx landing build. This is the last phase: the two closing beats plus launch-readiness polish. After Phase 4, the page is narratively and operationally complete.

**Working branch:** `claude/plan-phase-1-NQBga` (continuing the existing PR flow through the whole build).

---

## 1. Scope

### Part A — The closing beats

| Beat | File | Purpose |
|---|---|---|
| **08 The Box** | `components/beats/Beat08TheBox.tsx` | Anchor the value. 3D box lid lifts on scroll, 15 lollipops inside. ₹499 CTA. |
| **09 Sign-Off** | `components/beats/Beat09SignOff.tsx` | Close the loop. "Sleep is a feature. Not a luxury." + wordmark + real footer. |

Both use verbatim copy from design.md § 3 Beats 08 and 09. Beat 09 absorbs the minimal footer currently living directly in `app/page.tsx` — after Phase 4 the page has no inline footer, Beat 09 owns it.

### Part B — Launch polish

| Item | File | Notes |
|---|---|---|
| Favicon | `app/icon.svg` | Static SVG: dark square with a charge-yellow dot. Next.js 15 App Router picks this up automatically. |
| OG image | `app/opengraph-image.tsx` | Dynamic via `next/og`'s `ImageResponse`. 1200×630. Wordmark + tagline + dot. No font fetch (uses default). |
| robots.txt | `app/robots.ts` | Metadata route. Allow all, point at sitemap. |
| sitemap.xml | `app/sitemap.ts` | Metadata route. Single entry (the landing page). Uses `NEXT_PUBLIC_SITE_URL` with `https://lixx.in` fallback. |
| Expanded metadata | `app/layout.tsx` | `metadataBase`, `openGraph`, `twitter`, `themeColor`, `viewport`. Still no real FSSAI number — flagged with a grep-able TODO. |
| Skip-to-content | `app/page.tsx` | `sr-only focus:not-sr-only` skip link as first child of `<main>`; `<main>` gets `id="main-content" tabIndex={-1}` for programmatic focus. |
| Vercel Analytics | `app/layout.tsx` + dep | `pnpm add @vercel/analytics`, mount `<Analytics />` in layout. No-ops unless enabled in the Vercel dashboard — zero config. |

### Part C — What Phase 4 deliberately does NOT do

- **Real FSSAI license number** — the business doesn't have one yet; placeholder stays with a clear TODO.
- **Real Q-comm deep-links** — Beat 07's `TODO(post-launch)` from Phase 3 stays; upgrading requires real product listings.
- **/faq and /press routes** — design.md § 3 explicitly says these live on separate routes; not in the landing scope. Footer links to `#` with a TODO.
- **Hero 3D lollipop asset** — `LollipopRender`'s SWAP POINT stays. Real GLB comes when the product render is ready.
- **Beat 06 dissolving-Isomalt macro shot** — SWAP POINT stays. Real macro video/image comes when filmed.
- **Lighthouse 95/100 certification in CI** — we aim for it, but formal certification requires a real domain + crawlable deploy. We verify locally via `pnpm build` headline numbers + the First Load JS budget.

---

## 2. Definition of Done for Phase 4

1. `components/beats/Beat08TheBox.tsx` exists, exports `Beat08TheBox`, uses verbatim copy from design.md § 3 Beat 08, section has `id="box"` so the Nav's `#box` anchor resolves for the first time.
2. `components/beats/Beat09SignOff.tsx` exists, exports `Beat09SignOff`, uses verbatim copy from design.md § 3 Beat 09, owns the real footer.
3. `app/page.tsx` replaces the last two `PlaceholderBeat`s with the real beats AND removes the inline footer (which now lives inside Beat 09).
4. `app/icon.svg` exists and renders as favicon.
5. `app/opengraph-image.tsx` exists and produces a 1200×630 PNG at build time.
6. `app/robots.ts` and `app/sitemap.ts` exist as metadata routes.
7. `app/layout.tsx` sets `metadataBase`, `openGraph`, `twitter`, `themeColor`, and uses the Next 15 `viewport` export.
8. `<main id="main-content" tabIndex={-1}>` with a working skip-to-content link.
9. `@vercel/analytics` installed and mounted in `layout.tsx`.
10. `components/PlaceholderBeat.tsx` deleted — no longer referenced.
11. `pnpm build` clean, First Load JS ≤ 180 kB.
12. `pnpm lint` clean.
13. `tsc --noEmit` clean.
14. README updated to reflect a complete 9-beat narrative.
15. Commit on the feature branch; push.

---

## 3. Beat details

### Beat 08 — The Box

**Copy (verbatim, design.md § 3 Beat 08):**
- Eyebrow: `THE STARTER BOX`
- Headline: `15 days. Three states. One box.`
- Sub: *Five Charge. Five Zen. Five Dream. ₹499. Free delivery above ₹599. Subscribe and we'll keep you stocked.*
- CTA: `Get the box →`
- Microcopy: *Not for children. Not for pregnancy. Caffeinated confectionery. Read the label like an adult.*

**Structure:**
- `<section id="box">` taller than 100svh so the scrub has room.
- Centered flex column: eyebrow, headline, the 3D box stage, sub+CTA, microcopy.
- 3D stage: a `<div>` with inline `perspective: "1500px"` and `transform-style: preserve-3d`. Inside:
  - **Box interior**: an `aspect-[3/2]` `<div>` with `bg-char` + inner shadow + a 5×3 grid of `<LollipopRender size={55} />`. Rows: 5 Charge, 5 Zen, 5 Dream (that's the "arranged like ammunition" line in the spec).
  - **Box lid**: absolutely positioned over the interior, same size, with `transform-origin: "top center"`, `backface-visibility: hidden`. Lid face has a small mono `lixx` wordmark top-center.
- Below the stage: `Get the box →` pill button, bone background, ink text.

**Motion:**
- One scrubbed `gsap.to(lid, { rotateX: -110, ease: "none", scrollTrigger: { trigger, start: "top 75%", end: "bottom 75%", scrub: 1 }})`.
- That's it. The grid of lollipops fades in once the lid is 40%+ open, via a second tween on the grid container (`opacity 0.5 → 1`).

**Reduced motion fallback:**
- Lid rendered already-open (static `rotateX: -110deg`), grid fully visible.

**Risks / traps:**
- **3D clipping**: the parent needs `perspective` and the child needs `preserve-3d`; skipping either produces flat rotations. Tested pattern.
- **Lid z-order**: lid renders on top via absolute positioning, so it naturally covers the interior until rotated.
- **Mobile perspective strength**: `1500px` is a good compromise — too small (`500px`) looks cartoonish, too large (`5000px`) looks flat.

---

### Beat 09 — Sign-Off

**Copy (verbatim, design.md § 3 Beat 09):**
- Headline: `Sleep is a feature. Not a luxury.`
- Sub: *Lixx. Made in Bangalore for the people who built it.*
- Wordmark: `lixx` (small, font-display, bottom-center of viewport)
- Footer: `Shop · Science · FAQ · Press · hello@lixx.in · FSSAI Lic. No. [pending]`

**Structure:**
- `<section>` with `min-h-[100svh]`, `bg-ink`, flex column. Headline + sub vertically centered in the viewport. Wordmark absolutely positioned bottom-center of that viewport.
- `<footer>` below the section: single flex row on desktop, stacked on mobile, items separated by the middot.

**Motion:**
- `<SplitText>` for the headline, `expo.out`, slow (this is the climax close).
- Sub fades in below with a short delay via gsap.from.
- Wordmark fades in last.

**Footer link strategy:**
- `Shop` → `#box` (Beat 08) — works
- `Science` → `#science` (Beat 06) — works
- `FAQ` → `#` — placeholder, `TODO(post-launch): /faq route`
- `Press` → `#` — placeholder, `TODO(post-launch): /press route`
- `hello@lixx.in` → `mailto:hello@lixx.in`
- FSSAI — static text, `TODO(pre-launch): real license number`

**Reduced motion fallback:**
- No animation. SplitText primitive already honors reduced motion.

---

## 4. Launch polish details

### Favicon (`app/icon.svg`)

32×32 SVG. A charge-yellow dot on a near-black square, rounded corners. Matches the page's visual DNA without being product-specific.

### OG image (`app/opengraph-image.tsx`)

Uses `next/og`'s `ImageResponse`. Generated at build time (no runtime cost). No custom font fetch (default is fine for the sandbox environment and faster cold-starts in production):

- 1200×630 canvas, `#0a0a0c` background
- Big `lixx` wordmark (serif fallback), centered
- Tagline: `Not a gummy. Not a pill. A ritual.`
- Small charge-yellow dot below

### Metadata expansion (`app/layout.tsx`)

- `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://lixx.in")`
- `openGraph: { type: "website", title, description, siteName: "Lixx", locale: "en_IN" }`
- `twitter: { card: "summary_large_image", title, description }`
- Next 15 `viewport` export with `themeColor: "#0a0a0c"`, `colorScheme: "dark"`
- OG image is auto-discovered from `app/opengraph-image.tsx` — no manual wiring

### Robots + sitemap

Both are metadata routes (`app/robots.ts` and `app/sitemap.ts`). Point at `process.env.NEXT_PUBLIC_SITE_URL` with `https://lixx.in` fallback. Single-page site, single sitemap entry.

### Skip-to-content

- Skip link: first child of `<main>`, `sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50` with a bone background and ink text
- `<main id="main-content" tabIndex={-1}>` so focus lands and is visibly picked up
- Verified: tabbing from the address bar should hit the skip link first, then Enter jumps to main

### Vercel Analytics

`pnpm add @vercel/analytics`, mount `<Analytics />` at the bottom of `<body>` in `layout.tsx`. No env vars. No-ops if the dashboard doesn't have it enabled. Small bundle impact (~3 kB).

---

## 5. QA checklist

- `tsc --noEmit` clean
- `pnpm build` clean, First Load JS ≤ 180 kB
- `pnpm lint` clean
- `pnpm dev` boots, `/` returns 200
- HTML smoke: all 9 beats render (markers for every beat 01–09)
- `app/icon.svg` served at `/icon.svg` (Next.js auto-routes)
- `/opengraph-image.png` reachable
- `/robots.txt` and `/sitemap.xml` reachable
- Skip link visible on Tab, activates main
- Grep for `TODO(post-launch)` — multiple hits now (FAQ, Press, Q-comm deep-links, real FSSAI)
- Grep for `SWAP POINT` — still two hits

---

## 6. File tree delta

```
components/
  beats/
    Beat08TheBox.tsx       NEW
    Beat09SignOff.tsx      NEW
  PlaceholderBeat.tsx      DELETED (no more placeholders)
app/
  page.tsx                 MODIFIED (last two swaps, remove inline footer, skip link)
  layout.tsx               MODIFIED (metadata expansion, Analytics mount)
  icon.svg                 NEW
  opengraph-image.tsx      NEW
  robots.ts                NEW
  sitemap.ts               NEW
README.md                  MODIFIED (page is complete)
docs/
  phase-4-plan.md          NEW (this file)
package.json               MODIFIED (+@vercel/analytics)
pnpm-lock.yaml             MODIFIED
```

---

## 7. After Phase 4

The page is **done** as designed. What remains for an actual public launch is business-side, not code:

1. **Real FSSAI Central License** number dropped into Beat 09's footer + layout metadata description
2. **Real Q-comm product deep-links** in Beat 07's `CTAS` array (replaces the homepage placeholders from Phase 3)
3. **Real product render** swapped into `LollipopRender`
4. **Real dissolving-Isomalt macro shot** swapped into Beat 06's left column
5. **Domain** pointed at the Vercel deploy
6. **Vercel Analytics** toggled on in the dashboard
7. **Optional follow-ups**: /faq and /press sub-routes, a proper `robots.txt` deny during staging if needed

The codebase is structured so every one of those swaps is a single-file change against a grep-able marker.
