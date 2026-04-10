# Lixx — Landing (Phase 1)

Story-driven landing page for **Lixx**, an Isomalt-based functional lollipop brand from Bangalore. Three SKUs — **Charge** (3 PM energy), **Zen** (7 PM calm), **Dream** (11 PM sleep). Box of 15 for ₹499 on Blinkit, Zepto, Instamart.

This is Phase 1 of the build. See `docs/phase-1-plan.md` for scope and `docs/design.md` for the 9-beat narrative spec. `docs/implementation (1).md` is the canonical build spec. Strategic context lives in `docs/Lixx doc 1.md`.

## Quickstart

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## What ships in Phase 1

- Next.js 15 App Router + TypeScript + Tailwind
- Design tokens (color, fluid type, motion) from `design.md` § 4 & § 5
- `next/font` wiring for Inter, Fraunces, JetBrains Mono
- Lenis ↔ GSAP ScrollTrigger bridge via `useLenis()`
- Reduced-motion plumbing in every animated component
- Primitives: `SplitText`, `LollipopRender` (CSS placeholder, SWAP POINT), `CursorDot`, `MagneticButton`
- `Nav` (hidden → fades in after 80vh)
- **Beats 01 → 03 fully built**: Cold Open, Diagnosis (pinned/scrubbed with count-up), Reveal (Lenis slowdown)
- **Beats 04 → 09 as placeholder sections** so scroll length is representative

## Swap points

| File | What to swap |
|---|---|
| `components/primitives/LollipopRender.tsx` | CSS gemstone → GLB via `@react-three/fiber` or PNG sprite sequence |
| `components/beats/Beat06Science.tsx` (Phase 2) | Gradient placeholder → dissolving Isomalt macro shot |
| `components/beats/Beat08TheBox.tsx` (Phase 4) | Box-lift CSS → real box render |

Keep the same prop API when swapping.

## Tech stack

Next.js 15 · TypeScript · Tailwind 3 · GSAP + ScrollTrigger (free plugins only) · Lenis · `next/font`.

No Framer Motion, no paid GSAP plugins (`SplitText`, `ScrollSmoother`), no shadcn.

## Motion philosophy

Motion serves narrative, never decorates. Every animation has an in, a hold, and an out. Per-SKU motion registers: Charge is snappy (`power4.out`), Zen is smooth (`expo.out`), Dream is slow and dims the viewport. `prefers-reduced-motion: reduce` snaps everything to the final state.

## What's next

Phase 2 — Beat 04 (horizontal scroll-jack) + Beat 06 (Science)
Phase 3 — Beat 05 (Day Arc SPINE) + Beat 07 (10-Minute Promise)
Phase 4 — Beat 08 (Box), Beat 09 (Sign-Off), Lighthouse ≥95/100 polish
