# Lixx — Implementation Spec

Build instructions for the Lixx landing page. Read `design.md` first — it defines the narrative, voice, and visual system this document implements.

Target: a story-driven, scroll-as-narrative marketing site that runs on first `pnpm dev`. Production quality, $10K boutique build caliber.

---

## 1. Stack (non-negotiable)

- **Next.js 15** App Router + TypeScript
- **Tailwind CSS** (v3, with CSS variables wired into config)
- **GSAP + ScrollTrigger** — free plugins only. No SplitText, no ScrollSmoother.
- **Lenis** for smooth scroll
- **next/font** — Inter (sans), Fraunces (display), JetBrains Mono (mono)
- **next/image** for any raster assets
- **No Framer Motion** — GSAP only, for consistency
- **No shadcn** unless a beat genuinely needs it

```bash
pnpm create next-app@latest lixx --typescript --tailwind --app --no-src-dir --import-alias "@/*"
cd lixx
pnpm add gsap lenis
```

---

## 2. File Tree

```
app/
  layout.tsx              # fonts, metadata
  page.tsx                # imports beats in order, calls useLenis
  globals.css             # design tokens + reset + lenis styles
components/
  Nav.tsx                 # fades in after 80vh scroll
  beats/
    Beat01ColdOpen.tsx
    Beat02Diagnosis.tsx
    Beat03Reveal.tsx
    Beat04ThirdWave.tsx
    Beat05DayArc.tsx      # pinned, scrubbed, three sub-beats
    Beat06Science.tsx
    Beat07TenMinutes.tsx
    Beat08TheBox.tsx
    Beat09SignOff.tsx
  primitives/
    SplitText.tsx         # word-mask reveal component
    LollipopRender.tsx    # CSS gemstone placeholder, swappable
    CursorDot.tsx         # Beat 01 cursor follower
    MagneticButton.tsx    # Beat 07 CTAs
lib/
  hooks/
    useLenis.ts           # Lenis ↔ ScrollTrigger sync via gsap.ticker
    useIsoLayoutEffect.ts
    useReducedMotion.ts
  utils/
    splitText.ts          # DOM splitter, no paid plugins
tailwind.config.ts
README.md
```

---

## 3. Design Tokens → Code

All tokens from `design.md` § 4 and § 5 land in `app/globals.css` as CSS variables, then surface through `tailwind.config.ts`.

### `app/globals.css` requirements
- `:root` block with every color, type, spacing, and motion token
- Fluid type scale via `clamp()`
- Lenis classes (`html.lenis`, `.lenis.lenis-smooth`, etc.)
- Split-text primitive classes (`.split-line { overflow: hidden; display: block }`, `.split-word { display: inline-block; will-change: transform }`)
- Global `prefers-reduced-motion` override that snaps animation/transition durations to `0.01ms`
- Body defaults: `bg-ink text-bone font-sans`, antialiased

### `tailwind.config.ts` requirements
Wire CSS vars into Tailwind so they're usable as utilities:
- `colors`: ink, bone, char, mute, charge, zen, dream
- `fontFamily`: display, sans, mono
- `letterSpacing`: tightest (`-0.04em`), eyebrow (`+0.18em`)
- `content`: `./app/**/*.{ts,tsx}`, `./components/**/*.{ts,tsx}`

---

## 4. Core Hooks & Primitives

### `lib/hooks/useIsoLayoutEffect.ts`
SSR-safe `useLayoutEffect` shim. One-liner.

### `lib/hooks/useReducedMotion.ts`
Returns boolean. Reads `matchMedia("(prefers-reduced-motion: reduce)")`. Subscribes to changes.

### `lib/hooks/useLenis.ts`
Initializes Lenis once on mount. Pattern:
1. Bail early if reduced motion is on
2. Create Lenis instance with `duration: 1.2`, `easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))`
3. `lenis.on("scroll", ScrollTrigger.update)`
4. Add `lenis.raf` to `gsap.ticker` so ScrollTrigger and Lenis share one source of truth
5. `gsap.ticker.lagSmoothing(0)`
6. Cleanup: remove ticker, destroy lenis

### `lib/utils/splitText.ts`
Pure DOM utility. Takes an `HTMLElement`, splits its text into word spans wrapped in a line mask, returns the array of word spans for GSAP to animate.

```ts
export function splitWords(el: HTMLElement): HTMLElement[]
```

- Each word → `<span class="split-word">word</span>`
- All words wrapped in a single `<span class="split-line">` (overflow hidden)
- Whitespace preserved as text nodes
- Returns `Array.from(el.querySelectorAll(".split-word"))`

### `components/primitives/SplitText.tsx`
Client component. Wraps children in a div, runs `splitWords` in `useIsoLayoutEffect`, animates the resulting word spans:
- Initial state: `yPercent: 110`
- Animate to `yPercent: 0` with `expo.out`, configurable `duration`, `stagger`, `delay`
- Optional `trigger` prop for ScrollTrigger; default fires on mount
- Honors reduced motion (sets final state, skips tween)
- Wraps everything in `gsap.context()` with `ctx.revert()` cleanup

### `components/primitives/LollipopRender.tsx`
CSS gemstone placeholder. **Marked clearly as the swap point** for the real product asset.

```tsx
// SWAP POINT: replace with GLB via @react-three/fiber or PNG sprite sequence
//             when the product render is ready. Keep the same prop API.
```

Props: `color: 'charge' | 'zen' | 'dream'`, `size?: number`, `glow?: boolean`
Implementation: a circular div with radial gradient (highlight + base color), inset box-shadow for depth, drop-shadow for glow, slow CSS `@keyframes` rotation. Stick is a thin rounded rect below.

### `components/primitives/CursorDot.tsx`
Used by Beat 01 only. Fixed-position 8px dot, follows mouse with lerp smoothing inside a `requestAnimationFrame` loop. Hidden on touch devices and when reduced motion is on.

### `components/primitives/MagneticButton.tsx`
Used by Beat 07. Button that translates toward the cursor when hovered, within a small radius, with GSAP `quickTo`. Resets on mouseleave.

---

## 5. Beat-by-Beat Implementation Notes

Each beat is its own client component in `components/beats/`. All GSAP wrapped in `gsap.context()`. All ScrollTriggers cleaned up via `ctx.revert()` returned from the effect.

Refer to `design.md` § 3 for exact copy. Do not paraphrase. Do not invent new copy.

### Beat 01 — Cold Open
- `min-h-[100svh]`, flex center, `bg-ink`
- `<SplitText>` for headline (`expo.out`, `1.4s`, `0.08` stagger, `0.3s` delay) and sub (overlapping by `-0.8s`)
- `<CursorDot />` mounted here
- No nav, no logo, no CTA
- Headline uses `font-display`, `text-[length:var(--fs-h1)]`, `tracking-tightest`, `font-light`

### Beat 02 — Diagnosis
- Pinned section, `pin: true`, `scrub: 1`, `start: "top top"`, `end: "+=200%"`
- Background color tweens from `--color-ink` → `--color-bone` (text inverts to ink)
- Stat cards laid out in a horizontal flex, translated in via `xPercent` as scroll progresses
- Number count-up: ScrollTrigger fires a `gsap.to({val: 0}, {val: 52, ...})` with `onUpdate` writing `Math.round(proxy.val)` into the DOM
- After stats settle, sub fades in
- Mono font for the big numerals

### Beat 03 — Reveal
- Full-bleed, dark
- `<LollipopRender color="charge" />` center stage (any color works for the reveal — pick charge for visual punch)
- Slow CSS rotation always on
- Lenis slows here: use a ScrollTrigger `onEnter` to call `lenis.options.duration = 2.4` and `onLeave` to restore
- Headline + sub reveal via `<SplitText>`

### Beat 04 — Third Wave
- Pinned horizontal scroll-jack
- A wide flex track (3 wave panels, each `100vw`), translated via `x: -2 * window.innerWidth` over the pin range
- Waves 1 & 2 desaturated via `filter: grayscale(1) opacity(0.5)`, Wave 3 in full color when centered (use a sub-ScrollTrigger per panel to toggle a class)
- Use the `:root` SKU colors as accents on Wave 3

### Beat 05 — Day Arc (SPINE)
The most complex beat. **Build this last among the visible beats.**

- Single pinned section: `pin: true`, `scrub: 1`, long `end` (`+=400%`)
- Master timeline drives:
  - Background gradient: 3 keyframes (charge → zen → dream)
  - Time-rail label: 15:00 → 19:00 → 23:00 (mono font, big)
  - SKU lockups (eyebrow, headline, sub, flavor, lollipop) cross-fade through 3 states
  - Lollipop color swap and scale on Dream (slight upscale + glow on)
  - Viewport dim on Dream beat (overlay opacity 0 → 0.4)
- Each sub-beat has its own motion register from `design.md` § 5

### Beat 06 — Science
- Two-column grid on `lg:` breakpoint, stacked on mobile
- Left: a CSS gradient placeholder for the macro shot, marked SWAP POINT
- Right: 4 proof-points, each in a list item with a `<span>` underline that animates `scaleX 0 → 1` from left when scrolled into view
- Standard `from()` reveals for type, ScrollTrigger `start: "top 70%"` per item

### Beat 07 — 10-Minute Promise
- Punchy. Max 1 viewport tall.
- Big numerals "10" rendered in `--fs-mega`, `font-display`
- Three `<MagneticButton>` CTAs in a row (stacked on mobile)
- Pace whiplash from Beat 06: shorter durations, no scrub

### Beat 08 — The Box
- Box opens on scroll: scrub a `rotateX` on a "lid" div from `0deg` → `-110deg`, transform-origin top
- Inside the box: 3×5 grid of `<LollipopRender>` — 5 charge, 5 zen, 5 dream
- SWAP POINT comment for the real box asset
- CTA `Get the box →` styled as the primary button (bone bg, ink text, rounded-full)
- Microcopy in `--color-mute`, mono font, smaller

### Beat 09 — Sign-Off
- `min-h-[100svh]`, `bg-ink`, flex center
- One headline line, big, `<SplitText>`
- Sub fades in below
- "lixx" wordmark `font-display`, small, fixed bottom-center
- Footer below the fold: minimal flex row, links separated by `·`

---

## 6. Nav

`components/Nav.tsx`:
- Fixed top, hidden until `window.scrollY > window.innerHeight * 0.8`
- Fades in via opacity transition (700ms)
- Left: "lixx" wordmark
- Center (md+): Science · The Box · FAQ
- Right: `Get the box` pill button
- `aria-hidden` toggles with visibility

---

## 7. Code Hygiene Rules

- **All GSAP inside `gsap.context()`**, cleanup via `ctx.revert()` in effect return
- **All ScrollTriggers** auto-cleaned by `ctx.revert()` — do not manually `.kill()`
- **Components < 150 lines**. If a beat exceeds it, extract sub-components
- **No inline magic numbers** for color, spacing, duration — use tokens via Tailwind classes or `var(--token)`
- **Hydration safety**: set initial element states inline (or via Tailwind) so SSR matches client. Animate FROM final state in `useIsoLayoutEffect` using `gsap.from()` patterns, OR set initial state with `gsap.set()` in the same synchronous effect
- **Reduced motion**: every animated component checks `useReducedMotion()` and skips/snaps when true
- **Semantic HTML**: `<section>` per beat, proper heading hierarchy (h1 once, h2 per beat), `<nav>`, `<footer>`
- **Accessibility**: focus states on every interactive element, `aria-label` on icon buttons, keyboard nav verified
- **Mobile-first**: every beat designed for 375px first, scaled up

---

## 8. Performance Budget

- **LCP** < 2.0s
- **CLS** ~0
- **JS** < 200KB gzip on initial load
- Lenis and GSAP loaded once, in the root
- Fonts via `next/font` with `display: "swap"`
- No blocking third-party scripts
- Lighthouse target: 95+ Performance, 100 Accessibility

---

## 9. Swap Points (for future asset replacement)

Every placeholder is marked with a `// SWAP POINT:` comment. Locations:

| File | What to swap |
|---|---|
| `components/primitives/LollipopRender.tsx` | Replace CSS gemstone with GLB (`@react-three/fiber`) or PNG sprite sequence |
| `components/beats/Beat06Science.tsx` | Replace gradient placeholder with macro video/image of dissolving Isomalt |
| `components/beats/Beat08TheBox.tsx` | Replace box-lift CSS with real product photography or 3D box render |

When swapping, **keep the same prop API** so beats don't need to change.

---

## 10. Build Order

1. Scaffold Next.js, install deps
2. Build design system: `globals.css` + `tailwind.config.ts`
3. Build hooks: `useIsoLayoutEffect`, `useReducedMotion`, `useLenis`
4. Build utils: `splitText.ts`
5. Build primitives: `SplitText`, `LollipopRender`, `CursorDot`, `MagneticButton`
6. Build `Nav`
7. Build beats in order **01 → 02 → 03 → 04 → 06 → 07 → 08 → 09**, then **05** last (it's the most complex)
8. Test each beat in isolation before moving on
9. Final pass: reduced-motion audit, mobile pass at 375px, Lighthouse run, keyboard-nav check
10. Write `README.md` explaining narrative, swap points, and motion philosophy

---

## 11. README.md (deliverable)

Final `README.md` at project root must include:
- One-paragraph project framing (what Lixx is, what the page does)
- Quickstart (`pnpm install && pnpm dev`)
- Tour of the 9-beat narrative with one-line summaries
- Swap points table (copy from § 9)
- Motion philosophy (one paragraph from `design.md`)
- Tech stack
- Performance + accessibility notes

---

## 12. Definition of Done

- `pnpm install && pnpm dev` works on first try, zero errors, zero warnings
- All 9 beats render and animate correctly on desktop and mobile
- `prefers-reduced-motion: reduce` snaps everything to final state, page remains fully usable
- Keyboard navigation reaches every interactive element with visible focus
- Lighthouse Performance ≥ 95, Accessibility = 100
- Every SWAP POINT is commented and grep-able
- No `// rest of component` placeholders. Every file complete.
- README.md present and accurate
