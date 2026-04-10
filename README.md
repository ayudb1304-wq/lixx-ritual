# Lixx — Landing

Story-driven landing page for **Lixx**, an Isomalt-based functional lollipop brand from Bangalore. Three SKUs — **Charge** (3 PM energy), **Zen** (7 PM calm), **Dream** (11 PM sleep). Box of 15 for ₹499 on Blinkit, Zepto, Instamart.

Current state: **complete** — all nine beats built, launch polish in place. See `docs/phase-1-plan.md` through `docs/phase-4-plan.md` for phase-by-phase scope. `docs/design.md` defines the 9-beat narrative; `docs/implementation (1).md` is the canonical build spec. Strategic context lives in `docs/Lixx doc 1.md`.

## Quickstart

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## What ships so far

**Foundation (Phase 1)**
- Next.js 15 App Router + TypeScript + Tailwind
- Design tokens (color, fluid type, motion) from `design.md` § 4 & § 5
- Inter / Fraunces / JetBrains Mono via `@fontsource-variable/*` (offline-capable, no runtime Google Fonts dependency)
- Lenis ↔ GSAP ScrollTrigger bridge via `useLenis()`
- Reduced-motion plumbing in every animated component
- Primitives: `SplitText`, `LollipopRender` (CSS placeholder, SWAP POINT), `CursorDot`, `MagneticButton`
- `Nav` (hidden → fades in after 80vh)

**All nine beats built**
- **01 Cold Open** — "You haven't slept properly since Q2." Word-mask reveal, cursor-following dot.
- **02 Diagnosis** — pinned, scrubbed, background ink → bone inversion, 52% count-up on three stat cards.
- **03 Reveal** — "Not a gummy. Not a pill. A ritual." LollipopRender at center, Lenis slows to 2.4s on enter.
- **04 Third Wave** — pinned horizontal scroll-jack across three panels; Waves 1 & 2 desaturated, Wave 3 ignites in charge yellow with a LollipopRender as it centers.
- **05 Day Arc (SPINE)** — pinned `+=400%` scrub. Three SKU lockups (Charge 15:00 → Zen 19:00 → Dream 23:00) cross-fade through three background palettes with three distinct motion registers. Dream climax dims the viewport and powers up the lollipop glow.
- **06 Science** — two-column, four proof points with `scaleX` underline reveals; SWAP POINT for the dissolving-Isomalt macro shot.
- **07 Ten Minutes** — pace whiplash. Mega "10", three magnetic Q-comm CTAs (Blinkit / Zepto / Instamart). Homepage URLs with a `TODO(post-launch)` for product deep-links.
- **08 The Box** — 3D box with `perspective: 1500px`; lid rotates 0° → -110° on a scrubbed scroll, revealing a 5×3 grid of lollipops arranged like ammunition. `Get the box →` CTA.
- **09 Sign-Off** — "Sleep is a feature. Not a luxury." full-viewport close, wordmark bottom-center, real footer below.

**Launch polish**
- Favicon (`app/icon.svg`) — dark square, charge-yellow dot
- Dynamic Open Graph image (`app/opengraph-image.tsx`) via `next/og`
- `app/robots.ts` + `app/sitemap.ts` metadata routes
- Full `metadataBase` / `openGraph` / `twitter` / `viewport` wiring in `app/layout.tsx`
- Skip-to-content link + `<main id="main-content" tabIndex={-1}>`
- `@vercel/analytics` mounted (no-ops unless enabled in the Vercel dashboard)

## Swap points

| File | What to swap |
|---|---|
| `components/primitives/LollipopRender.tsx` | CSS gemstone → GLB via `@react-three/fiber` or PNG sprite sequence |
| `components/beats/Beat06Science.tsx` (Phase 2) | Gradient placeholder → dissolving Isomalt macro shot |
| `components/beats/Beat08TheBox.tsx` (Phase 4) | Box-lift CSS → real box render |

Keep the same prop API when swapping.

## Tech stack

Next.js 15 · React 19 · TypeScript · Tailwind 3 · GSAP + ScrollTrigger (free plugins only) · Lenis · `@fontsource-variable/*`.

No Framer Motion, no paid GSAP plugins (`SplitText`, `ScrollSmoother`), no shadcn.

## Motion philosophy

Motion serves narrative, never decorates. Every animation has an in, a hold, and an out. Per-SKU motion registers: Charge is snappy (`power4.out`), Zen is smooth (`expo.out`), Dream is slow and dims the viewport. `prefers-reduced-motion: reduce` snaps everything to the final state.

## Pre-launch business TODOs

The code is done; these are the business-side items that remain for an actual public launch. Every one is a single-file swap against a grep-able marker.

| Marker | Location | Replace with |
|---|---|---|
| `SWAP POINT` (LollipopRender) | `components/primitives/LollipopRender.tsx` | Real GLB product render via `@react-three/fiber` or PNG sprite |
| `SWAP POINT` (Beat 06) | `components/beats/Beat06Science.tsx` | Real dissolving-Isomalt macro video/image |
| `TODO(post-launch)` (Beat 07) | `components/beats/Beat07TenMinutes.tsx` | Real Blinkit/Zepto/Instamart product deep-links |
| `TODO(pre-launch)` (Beat 09) | `components/beats/Beat09SignOff.tsx` | Real FSSAI Central License number in the footer |
| `TODO(post-launch)` (Beat 09) | `components/beats/Beat09SignOff.tsx` | `/faq` and `/press` routes |

Set `NEXT_PUBLIC_SITE_URL` in the Vercel dashboard to the real domain before launch so `robots.txt`, `sitemap.xml`, and metadata resolve correctly (default fallback is `https://lixx.in`).
