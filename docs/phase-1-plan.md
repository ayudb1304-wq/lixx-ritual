# Lixx Landing — Phase 1 Build Plan

Phase 1 of the Lixx landing-page build. Scope is carved from `implementation (1).md` § 10 ("Build Order") and `design.md` § 3 ("The 9-Beat Scroll Narrative"). Phase 1 lands the foundation plus the opening act of the story so that the project is demo-able end-to-end on a single `pnpm dev`, with every later beat becoming an additive drop-in.

Working branch: `claude/plan-phase-1-NQBga`

---

## 1. Phase 1 goal

Ship a running Next.js 15 app with:
- Full design-system foundation (tokens, fonts, Lenis/GSAP wiring, reduced-motion plumbing)
- All shared primitives (`SplitText`, `LollipopRender`, `CursorDot`, `MagneticButton`)
- `Nav` component (hidden → fades in after 80vh)
- **Beats 01 → 03** built and polished: **Cold Open → Diagnosis → Reveal**

The opening three beats are the minimum that proves the narrative engine works: word-mask reveals, pinned scrubbed section with count-up stats, Lenis slowdown on the product reveal, and a cursor-aware background. Every later phase adds beats without touching foundation code.

### Out of scope for Phase 1
- Beats 04–09 (Third Wave, Day Arc, Science, 10-Minute Promise, The Box, Sign-Off)
- Real product art (stays on `LollipopRender` CSS placeholder)
- Analytics, CMS, forms, commerce links
- `/about`, `/faq` routes

---

## 2. Why these beats, in this order

The 9-beat scroll (design.md § 3) opens on a hook that has to land before the rest earns a read:

| # | Beat | Why it's in Phase 1 |
|---|---|---|
| 01 | Cold Open | Establishes voice, type system, cursor-dot primitive, bone-on-ink palette |
| 02 | Diagnosis | First pinned/scrubbed section — validates Lenis ↔ ScrollTrigger wiring and the count-up pattern |
| 03 | Reveal | First `LollipopRender` use, first Lenis slowdown trick, first SKU color in the page |

Beat 04 (horizontal scroll-jack) and Beat 05 (the SPINE, the most complex beat) are deliberately pushed to Phase 2/3. Per implementation doc § 10.7, Beat 05 is built last among visible beats.

---

## 3. Deliverables (Phase 1 DoD)

Phase 1 is done when all of the following are true:

1. `pnpm install && pnpm dev` runs with zero errors and zero warnings on a clean clone.
2. Design tokens from `design.md` § 4 all live in `app/globals.css` and surface through `tailwind.config.ts`.
3. `next/font` wires Inter, Fraunces, JetBrains Mono with `display: "swap"`.
4. Lenis is initialized once at the root and shares a ticker with GSAP.
5. `prefers-reduced-motion: reduce` snaps all Phase 1 animations to their final state; the page stays fully usable.
6. Beats 01, 02, 03 render and animate correctly at 375px, 768px, and 1440px.
7. Beats 04–09 exist as empty placeholder sections (`min-h-screen` with a debug label) so the scroll length is representative and future phases only swap content into place.
8. `Nav` is implemented and fades in after 80vh of scroll.
9. Keyboard navigation reaches every interactive element with visible focus.
10. Every `// SWAP POINT:` comment that Phase 1 touches is present and grep-able.
11. A lightweight `README.md` exists with quickstart and a pointer to `design.md` / `implementation (1).md`.
12. Lighthouse run on the dev build reports no accessibility failures and no major perf regressions (final ≥95/100 target is Phase 4 polish).

---

## 4. Task breakdown

### Step 1 — Scaffold
- `pnpm create next-app@latest lixx-web --typescript --tailwind --app --no-src-dir --import-alias "@/*"`
- `pnpm add gsap lenis`
- Commit: `chore: scaffold next.js app`

The Next.js app lives **at the repo root**. Docs live in `docs/`. (Initial draft defaulted to a `web/` subdirectory; we restructured to root so Vercel auto-detects Next.js without a Root Directory override.)

### Step 2 — Design system
Files:
- `app/globals.css` — every token from design.md § 4 and § 5 as CSS variables, fluid type scale via `clamp()`, Lenis classes, split-text primitive classes, global `prefers-reduced-motion` override, body defaults.
- `tailwind.config.ts` — colors (`ink`, `bone`, `char`, `mute`, `charge`, `zen`, `dream`), fontFamily (`display`, `sans`, `mono`), letterSpacing (`tightest -0.04em`, `eyebrow +0.18em`), content globs.
- `app/layout.tsx` — `next/font` for Inter / Fraunces / JetBrains Mono, metadata, body class `bg-ink text-bone font-sans antialiased`.

Verify by rendering a throwaway page that prints every color and type token.

### Step 3 — Hooks
All under `lib/hooks/`:
- `useIsoLayoutEffect.ts` — SSR-safe `useLayoutEffect` shim
- `useReducedMotion.ts` — reads `matchMedia("(prefers-reduced-motion: reduce)")` and subscribes to changes
- `useLenis.ts` — initializes Lenis once; bails on reduced motion; binds `lenis.on("scroll", ScrollTrigger.update)`; adds `lenis.raf` to `gsap.ticker`; `gsap.ticker.lagSmoothing(0)`; returns/cleans up properly

### Step 4 — Utils
- `lib/utils/splitText.ts` — pure DOM word splitter, preserves whitespace, wraps in `.split-line` / `.split-word`, returns the word-span array

### Step 5 — Primitives
All under `components/primitives/`:
- `SplitText.tsx` — client component; `gsap.context()`; `useIsoLayoutEffect`; animates `yPercent: 110 → 0` with `expo.out`; props: `children`, `trigger?`, `delay?`, `duration?`, `stagger?`; reduced-motion snap; `ctx.revert()` cleanup
- `LollipopRender.tsx` — CSS gemstone; `color: 'charge' | 'zen' | 'dream'`, `size?`, `glow?`; **SWAP POINT** comment for the future GLB/sprite asset
- `CursorDot.tsx` — fixed 8px dot, rAF lerp to cursor; hidden on touch and reduced motion
- `MagneticButton.tsx` — GSAP `quickTo` translate within radius; `onMouseLeave` resets. (Built in Phase 1 so Phase 3's Beat 07 doesn't need to backfill primitives.)

### Step 6 — Nav
- `components/Nav.tsx`: fixed top; hidden until `window.scrollY > window.innerHeight * 0.8`; 700ms opacity fade; left = `lixx` wordmark, center (md+) = Science · The Box · FAQ, right = `Get the box` pill; `aria-hidden` toggles with visibility.

### Step 7 — Beats 01, 02, 03 (full polish)
Under `components/beats/`.

**`Beat01ColdOpen.tsx`**
- `min-h-[100svh] bg-ink flex items-center justify-center`
- `<SplitText>` headline (exact copy from design.md § 3, Beat 01): *"You haven't slept properly since Q2."*, `expo.out`, `1.4s`, stagger `0.08`, delay `0.3s`
- Sub overlap `-0.8s`: *"A love letter to everyone running on cold brew and cortisol."*
- `<CursorDot />` mounted here only
- `font-display`, `text-[length:var(--fs-h1)]`, `tracking-tightest`, `font-light`
- No nav, no logo, no CTA rendered in this beat

**`Beat02Diagnosis.tsx`**
- Pinned: `pin: true`, `scrub: 1`, `start: "top top"`, `end: "+=200%"`
- Background tween `--color-ink` → `--color-bone`, text inverts to ink
- Eyebrow: `THE URBAN MILLENNIAL PARADOX`
- Headline: `Optimized everything. Sleeping six hours.`
- Three stat cards (horizontal flex, `xPercent` scroll-driven entry):
  - **52%** — Bengalureans sleeping under 6 hours a night
  - **3 PM** — focus dies / standup starts
  - **11 PM** — brain finally clocks in
- Count-up via `gsap.to({val: 0}, {val: 52, onUpdate: ...})` on a numeric proxy; static labels for `3 PM` / `11 PM`
- After stats settle: sub fades in — *"You don't need a supplement aisle. You need a reset button you can actually keep in your pocket."*
- Mono font for the big numerals

**`Beat03Reveal.tsx`**
- Full-bleed dark section
- `<LollipopRender color="charge" />` center, slow CSS rotation always-on
- ScrollTrigger `onEnter` → `lenis.options.duration = 2.4`; `onLeave` → restore default `1.2`
- Eyebrow: `INTRODUCING LIXX`
- Headline via `<SplitText>`: `Not a gummy. Not a pill. A ritual.`
- Sub: `Hard-boiled. Sugar-free. Sublingual. Engineered in Bangalore for the people who built it.`
- Microcopy row under product: `Isomalt matrix · Zero sugar · Dental-safe · Dissolves in 8 minutes` (mono, `--color-mute`)

### Step 8 — Placeholder beats 04–09
Single shared component `PlaceholderBeat.tsx` that renders `min-h-[100svh]`, section label in mono (`BEAT 04 — THIRD WAVE`, etc.), and a short note pulled from design.md § 3. This keeps the scroll length representative and exposes any Lenis/ScrollTrigger quirks now rather than in Phase 3.

### Step 9 — Page assembly
`app/page.tsx` imports beats in order and calls `useLenis()`:
```
<Beat01ColdOpen />
<Beat02Diagnosis />
<Beat03Reveal />
<PlaceholderBeat id="04" title="THIRD WAVE" />
...
<PlaceholderBeat id="09" title="SIGN-OFF" />
```

### Step 10 — QA pass
- Reduced-motion audit on beats 01–03 (devtools emulation)
- 375px / 768px / 1440px render check
- Keyboard tab order + visible focus
- Lighthouse run (note scores; final ≥95/100 target is Phase 4)
- Grep for `SWAP POINT:` — at least one hit (in `LollipopRender`)

---

## 5. Phase 1 file tree (new files)

```
/                         # Next.js app at repo root
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    Nav.tsx
    PlaceholderBeat.tsx
    beats/
      Beat01ColdOpen.tsx
      Beat02Diagnosis.tsx
      Beat03Reveal.tsx
    primitives/
      SplitText.tsx
      LollipopRender.tsx
      CursorDot.tsx
      MagneticButton.tsx
  lib/
    hooks/
      useIsoLayoutEffect.ts
      useReducedMotion.ts
      useLenis.ts
    utils/
      splitText.ts
  tailwind.config.ts
  README.md
  docs/                   # design & strategy docs (not shipped)
    design.md
    implementation (1).md
    Lixx doc 1.md
    phase-1-plan.md
```

---

## 6. Risks and open questions

1. **Repo layout** — Resolved: Next.js app lives at the repo root; strategy / design / plan docs live in `docs/`. Chosen so Vercel auto-detects Next.js without a Root Directory override.
2. **Font licensing** — Fraunces and Inter are OFL/Google-hosted, fine via `next/font`. JetBrains Mono likewise. No action needed.
3. **GSAP free-plugin constraint** — `implementation (1).md` § 1 forbids `SplitText` and `ScrollSmoother`. The custom `splitText.ts` utility satisfies this. Do NOT reach for `gsap/SplitText`.
4. **Lenis + ScrollTrigger pin behavior** — Pinning inside a Lenis-driven scroll has known footguns; the `gsap.ticker` bridge pattern in `useLenis.ts` is the required fix. Beat 02 is the first real test and must land before Beat 03 is trusted.
5. **Hydration mismatch risk on `SplitText`** — `splitWords` mutates the DOM. Mitigation: render children as plain text server-side, run the splitter inside `useIsoLayoutEffect` client-side, `gsap.set` the initial state synchronously so there is no visible flash.
6. **Claim discipline** — design.md § 2 forbids medical language and invented stats. Beat 02's "52%" traces to the business doc (newindianexpress source). Any other number must trace back to `Lixx doc 1.md`.

---

## 7. What Phase 2+ will inherit

After Phase 1, the foundation is frozen. Subsequent phases only add `components/beats/BeatXX*.tsx` files and swap out `PlaceholderBeat` entries in `page.tsx`.

Proposed downstream phasing (for context only — not committed in this plan):

| Phase | Scope |
|---|---|
| **Phase 2** | Beat 04 (Third Wave horizontal scroll-jack) + Beat 06 (Science two-column) |
| **Phase 3** | Beat 05 (Day Arc SPINE, the climax) + Beat 07 (10-Minute Promise, magnetic CTAs light up) |
| **Phase 4** | Beat 08 (The Box), Beat 09 (Sign-Off), full perf/a11y polish, README, Lighthouse ≥95/100, asset swap-point prep |

---

## 8. Immediate next action

Phase 1 shipped on branch `claude/plan-phase-1-NQBga` and was merged into `main`. The app was subsequently relocated from `web/` to the repo root so Vercel's Next.js auto-detection works without a Root Directory override. Phase 2 picks up with Beat 04 (horizontal scroll-jack) and Beat 06 (Science).
