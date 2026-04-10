# Lixx — Landing

Story-driven landing page for **Lixx**, an Isomalt-based functional lollipop brand from Bangalore. Three SKUs — **Charge** (3 PM energy), **Zen** (7 PM calm), **Dream** (11 PM sleep). Box of 15 for ₹499 on Blinkit, Zepto, Instamart.

Current state: Phase 2 — foundation + beats 01–04 + 06. Beats 05, 07, 08, 09 still placeholder. See `docs/phase-1-plan.md` and `docs/phase-2-plan.md` for scope. `docs/design.md` defines the 9-beat narrative; `docs/implementation (1).md` is the canonical build spec. Strategic context lives in `docs/Lixx doc 1.md`.

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

**Beats built**
- **01 Cold Open** — "You haven't slept properly since Q2." Word-mask reveal, cursor-following dot.
- **02 Diagnosis** — pinned, scrubbed, background ink → bone inversion, 52% count-up on three stat cards.
- **03 Reveal** — "Not a gummy. Not a pill. A ritual." LollipopRender at center, Lenis slows to 2.4s on enter.
- **04 Third Wave** — pinned horizontal scroll-jack across three panels; Waves 1 & 2 desaturated, Wave 3 ignites in charge yellow with a LollipopRender as it centers.
- **06 Science** — two-column, four proof points with `scaleX` underline reveals; SWAP POINT for the dissolving-Isomalt macro shot.

**Still placeholder:** Beats 05 (Day Arc SPINE — Phase 3), 07 (10-Minute Promise — Phase 3), 08 (Box — Phase 4), 09 (Sign-Off — Phase 4).

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

## What's next

Phase 3 — Beat 05 (Day Arc SPINE, the climax) + Beat 07 (10-Minute Promise, magnetic CTAs)
Phase 4 — Beat 08 (Box), Beat 09 (Sign-Off), Lighthouse ≥95/100 polish, OG image, favicon, real FSSAI number, analytics
