# Phase 2 — Build Plan

Phase 2 of the Lixx landing build. Scope is carved from `implementation (1).md` § 5 and § 10 and `design.md` § 3, Beats 04 and 06. Phase 2 drops two real beats into the placeholder slots established in Phase 1, leaving Phase 1's foundation (tokens, hooks, primitives, Nav, beats 01–03) untouched.

**Working branch:** `claude/plan-phase-1-NQBga` (continuing the existing PR flow).

**Phase 2 explicitly does NOT touch:**
- Beat 05 (the SPINE) — Phase 3, deliberately built last
- Beat 07 (10-Minute Promise / magnetic CTAs) — Phase 3
- Beat 08 / 09 (Box, Sign-Off) — Phase 4
- Performance / accessibility final polish — Phase 4

---

## 1. Why these two beats together

In the 9-beat arc, Beat 04 and Beat 06 do different narrative jobs but share a structural property: **both are pay-offs to hints dropped earlier**. Beat 04 names the category war the brand is entering (after Beat 03 teases "not a gummy, not a pill"). Beat 06 backs the product claims with engineering language (after Beat 04 gestures at "bypasses your liver").

Pairing them in one phase lets the scroll carry a complete mini-arc — *reveal → war → spine placeholder → proof* — even though the SPINE itself is still a stub. The user gets a demo-able middle act.

---

## 2. Definition of Done for Phase 2

1. `components/beats/Beat04ThirdWave.tsx` exists, exports `Beat04ThirdWave`, uses verbatim copy from design.md § 3 Beat 04.
2. `components/beats/Beat06Science.tsx` exists, exports `Beat06Science`, uses verbatim copy from design.md § 3 Beat 06.
3. `app/page.tsx` imports both and replaces `PlaceholderBeat id="04"` and `PlaceholderBeat id="06"` with the real components.
4. Beat 06's section carries `id="science"` so the Nav's `#science` anchor lands correctly.
5. Both beats honor `useReducedMotion()` with a non-animated fallback that remains fully readable.
6. All GSAP inside `gsap.context()`; cleanup via `ctx.revert()`.
7. No ScrollTrigger orphans on unmount (`ctx.revert()` handles this; spot-check via rapid navigation).
8. `pnpm build` clean, First Load JS ≤ 200 kB.
9. `pnpm lint` clean.
10. README "What ships" section updated to include Beats 04 and 06.
11. Commit on the feature branch; push.

---

## 3. Task breakdown

### Step 1 — Beat 04: Third Wave (horizontal scroll-jack)

**Copy (verbatim, design.md § 3 Beat 04):**
- Eyebrow: `A SHORT HISTORY OF FEELING BETTER`
- Headline: `Pills. Gummies. Lixx.`
- Wave 1 — The Pill Era: *Clinical. Reactive. Tasted like punishment.*
- Wave 2 — The Gummy Era: *Friendlier. Sugary. Melts in a Bangalore summer.*
- Wave 3 — The Lixx Era: *Sublingual delivery. Zero sugar. Bypasses your liver. Fits in your pocket.*
- Sub: *Hard-boiled confectionery holds in the mouth long enough for active compounds to absorb buccally — faster onset, no first-pass metabolism. Translation: it works before you finish it.*

**Structure:**
- Outer `<section>` is the scroll-trigger host.
- Inside: a sticky/pinned viewport (`100svh`) that holds the eyebrow + headline at the top and a horizontal `.track` below.
- The track is a flex row with **three 100vw panels** (Pills / Gummies / Lixx). Each panel has a giant `01 / 02 / 03` era numeral on the left, era label + copy on the right.
- Waves 1 & 2 desaturated via `filter: grayscale(1) opacity(0.45)`.
- Wave 3 ignites: a sub-ScrollTrigger per panel toggles an `is-active` class when centered; the active class removes the grayscale filter, switches the era numeral to `--color-charge`, and mounts a `<LollipopRender color="charge" />` in the panel's right corner.

**Motion:**
- Master tween: `gsap.to(track, { x: -(track.scrollWidth - window.innerWidth), ease: "none", scrollTrigger: { trigger: section, pin: true, scrub: 1, end: () => "+=" + (track.scrollWidth - window.innerWidth) }})`.
- Each panel gets a sub-ScrollTrigger with `containerAnimation: masterTween, start: "left center", end: "right center", toggleClass: "is-active"` so grayscale flips at the centering point.
- Closing sub-line fades in below the track near the end of the scrub.

**Reduced motion fallback:**
- If `useReducedMotion()` is true, render the three panels as a vertical stack (`flex-col gap-lg`), drop the pin, drop the scrub, and force all three into the non-desaturated state (Wave 3 still gets the charge accent to reinforce the narrative beat).

**Mobile consideration:**
- Horizontal scroll-jacks on a 375px viewport feel slow. Mitigation: still jack horizontally (mobile viewport width is the unit), but tune the scrub so the full sweep happens in one comfortable thumb-scroll session. Verify at 375px in dev before committing.

**Risks / traps:**
- **Lenis + horizontal pin**: the `useLenis` ↔ `gsap.ticker` bridge from Phase 1 is the known-working pattern. No extra work needed if we don't nest a second Lenis instance.
- **`scrollWidth` timing**: the track's `scrollWidth` must be measured *after* fonts load or the last panel may clip. Mitigation: use a `ScrollTrigger.refresh()` in a `requestAnimationFrame` after the initial context setup, and return the function-form `end` so recalculations on resize work.
- **`containerAnimation` scoping**: each panel's active-class trigger uses the master tween as its `containerAnimation`, not the page scroll, so `start: "left center"` is measured relative to the track, not the viewport. This is the canonical GSAP pattern for sub-triggers inside a scrub.

---

### Step 2 — Beat 06: Science (2-column, underline reveals)

**Copy (verbatim, design.md § 3 Beat 06):**
- Eyebrow: `THE ENGINEERING`
- Headline: `We picked the harder format on purpose.`
- Proof 1 — Sublingual absorption: *Active compounds enter the bloodstream through the mouth, not the gut. Faster, cleaner, lower dose required.*
- Proof 2 — Isomalt, not sugar: *Glycemic index of 2. Diabetic-safe. Keto-safe. Doesn't rot your teeth.*
- Proof 3 — Thermally stable: *Won't melt into a puddle in your bag in May.*
- Proof 4 — FSSAI Nutraceutical-licensed: *Not a candy pretending to be wellness. The paperwork backs it up.*

**Structure:**
- `<section id="science">` — anchor target for Nav's "Science" link.
- CSS grid: `lg:grid-cols-[1.1fr_1fr]`, stacked on mobile.
- Left column: a dark gradient placeholder div marked `// SWAP POINT: dissolving Isomalt macro` with slow CSS `@keyframes` float so it doesn't feel dead. Aspect ratio `aspect-[4/5]`, radial highlight, subtle noise via `background-blend-mode`.
- Right column: ordered list of 4 `<li data-proof>` items. Each item has an eyebrow (`01 · THE MOUTH`, etc.), a title in `font-display text-h3`, a one-line body, and a 1px-tall `<span>` underline pinned to the bottom.

**Motion (per proof, one ScrollTrigger each):**
- `start: "top 75%"`, fires once.
- Timeline:
  1. Underline: `scaleX: 0 → 1`, `transformOrigin: "left center"`, `0.8s`, `expo.out`.
  2. Title + body: `gsap.from(..., { y: 20, opacity: 0, duration: 0.7, ease: "expo.out", stagger: 0.06 })`.
- Stagger between proofs via `0.1s` natural offset from scroll distance (not timeline delay — each proof is its own ScrollTrigger so it fires independently on scroll).

**Reduced motion fallback:**
- Underlines rendered at `scaleX(1)` by default; `gsap.set` confirms this.
- No `from()` tweens — items are visible immediately.
- Layout is unchanged (it's a grid, not a motion-dependent layout).

**Risks / traps:**
- **Hydration**: the underline initial state must match server render. Rendering underline as `scaleX(0)` inline and tweening to 1 is safe; rendering with no inline style and `gsap.set` on mount risks a visible flash. Use an inline `style={{ transform: "scaleX(0)" }}` plus `transformOrigin: "left"` so SSR and client agree.
- **`next/image` temptation**: the left column is a CSS gradient placeholder per spec. No `next/image` needed until the macro asset exists. The SWAP POINT comment must be grep-able.

---

### Step 3 — Page assembly

`app/page.tsx` currently:

```tsx
<Beat03Reveal lenisRef={lenisRef} />
<PlaceholderBeat id="04" title="The Third Wave" hint="..." />
<PlaceholderBeat id="05" title="The Day Arc" hint="..." />
<PlaceholderBeat id="06" title="The Science" hint="..." />
```

After Phase 2:

```tsx
<Beat03Reveal lenisRef={lenisRef} />
<Beat04ThirdWave />
<PlaceholderBeat id="05" title="The Day Arc" hint="..." />
<Beat06Science />
```

Beat 07/08/09 placeholders unchanged.

Nav already links to `#science`; Beat 06's `id="science"` makes the anchor resolve. No Nav changes.

---

### Step 4 — QA pass

- Reduced-motion audit on Beats 04 and 06 (DevTools Rendering → Emulate CSS media feature).
- 375px viewport check for Beat 04 horizontal sweep.
- Keyboard tab order: Beat 06's proof items have no interactive elements, but tab should pass through without trapping.
- Grep for `SWAP POINT:` — should now be two hits (`LollipopRender`, `Beat06Science`).
- `pnpm build` clean, First Load JS delta ≤ +15 kB (two new beats, no new deps).
- `pnpm lint` clean.

---

## 4. File tree delta

```
components/
  beats/
    Beat04ThirdWave.tsx    NEW
    Beat06Science.tsx      NEW
app/
  page.tsx                 MODIFIED (two placeholder swaps)
README.md                  MODIFIED (What ships section)
docs/
  phase-2-plan.md          NEW (this file)
```

Zero new dependencies. Zero token changes. Zero primitive changes.

---

## 5. What Phase 3 will inherit

Phase 2 leaves the middle act complete but the climax still stubbed:

| Phase | Scope |
|---|---|
| **Phase 3** | Beat 05 (Day Arc SPINE — pinned, 3-register cross-fade, climax) + Beat 07 (10-Minute Promise, magnetic CTAs, real Q-comm URLs) |
| **Phase 4** | Beat 08 (The Box), Beat 09 (Sign-Off), Lighthouse ≥ 95/100, OG image, favicon, FSSAI number, analytics |

Phase 3's Beat 05 is the most complex beat in the whole build. It's deliberately isolated into its own phase so it gets focused attention.
