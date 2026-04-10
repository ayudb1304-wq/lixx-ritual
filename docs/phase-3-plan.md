# Phase 3 — Build Plan

Phase 3 of the Lixx landing build. Scope is carved from `implementation (1).md` § 5 and § 10 and `design.md` § 3, Beats 05 and 07. This is the narrative climax: Beat 05 is the **SPINE** — the beat that justifies the whole brand — and Beat 07 is the hand-to-order hinge right after it.

**Working branch:** `claude/plan-phase-1-NQBga` (continuing the existing PR flow through Phase 3).

**Phase 3 explicitly does NOT touch:**
- Beats 08 (Box) and 09 (Sign-Off) — Phase 4
- Lighthouse polish, OG image, favicon, real FSSAI number, analytics — Phase 4
- Any existing beat 01–04 or 06 code

---

## 1. Why these two beats together

Beat 05 is the single most important beat in the entire page — it's where the three SKUs stop being a catalog and become **a system**. Three time stamps (15:00, 19:00, 23:00), three palettes, three motion registers, three moods. The pinned scrub forces the user to experience the arc at the designer's pace.

Beat 07 is deliberately the **opposite**: pace whiplash. After Beat 06's slow editorial Science and Beat 05's long contemplative scrub, Beat 07 hits like a slap — one viewport, big numerals, three hot buttons. The juxtaposition is the point: *you just felt the whole day; now tap one of these buttons*.

Pairing them in one phase keeps the emotional arc intact. A user scrolling the page in Phase 3 lands on a complete middle-to-late narrative: Science (engineering proof) → Day Arc (emotional payoff) → Ten Minutes (call to action).

---

## 2. Definition of Done for Phase 3

1. `components/beats/Beat05DayArc.tsx` exists, exports `Beat05DayArc`, uses verbatim copy from design.md § 3 Beats 05a/05b/05c.
2. `components/beats/Beat07TenMinutes.tsx` exists, exports `Beat07TenMinutes`, uses verbatim copy from design.md § 3 Beat 07.
3. `app/page.tsx` imports both and replaces `PlaceholderBeat id="05"` and `PlaceholderBeat id="07"` with the real components.
4. Beat 05 honors per-SKU motion registers (Charge snappy `power4.out`, Zen smooth `expo.out`, Dream slow `expo.out` with viewport dim).
5. Beat 05's Dream sub-beat dims the viewport via an overlay (0 → 0.4 opacity) and turns on the Dream lollipop's glow.
6. Beat 07 uses the `MagneticButton` primitive built in Phase 1 for all three Q-comm CTAs.
7. Beat 07's CTA hrefs point at Blinkit, Zepto, Instamart homepages with a clearly-commented TODO for post-launch deep-linking.
8. Both beats honor `useReducedMotion()` with fully readable, animation-free fallbacks.
9. All GSAP inside `gsap.context()`; cleanup via `ctx.revert()`.
10. `pnpm build` clean, First Load JS ≤ 180 kB (budget 200 kB).
11. `pnpm lint` clean.
12. README "What ships" section updated to include Beats 05 and 07.
13. Commit on the feature branch; push.

---

## 3. Task breakdown

### Step 1 — Beat 05: The Day Arc (SPINE)

**Copy (verbatim, design.md § 3 Beats 05a/05b/05c):**

| Sub | Time | Eyebrow | Headline | Sub | Flavor |
|---|---|---|---|---|---|
| 05a Charge | 15:00 | THE 3 PM RESCUE | Focus that doesn't fold. | 40mg caffeine. 80mg L-theanine. The clean half of a double espresso, none of the jitter tax. | Electric Lemon |
| 05b Zen | 19:00 | THE EVENING EXHALE | Take the edge off the day. | KSM-66 Ashwagandha and chamomile, in a lozenge you can hold through a difficult conversation. | Lavender-Honey |
| 05c Dream | 23:00 | THE 11 PM SHUTDOWN | Your brain. Off switch. Finally. | 5mg melatonin and valerian root, dissolving under your tongue while your phone is still in your hand. You'll be asleep before the wrapper hits the bin. | Midnight Berry |

**Structure:**
- Outer `<section>` is the trigger host — its height does not matter; the pin determines the scroll range.
- Inside: a pinned `100svh` stage with four absolutely-positioned layers:
  1. **Background gradient layers** — three radial-gradient divs (one per SKU color), stacked, cross-faded via opacity.
  2. **Time rail** — a single mono-font label (`15:00` / `19:00` / `23:00`) in a corner; switches via opacity cross-fade of three pre-rendered labels (cleaner than tweening text).
  3. **SKU lockup stack** — three absolutely-positioned lockups (eyebrow + headline + sub + flavor + lollipop), cross-faded via opacity + small y translation.
  4. **Dream dimmer** — a full-bleed black overlay that fades from 0 → 0.4 during the Dream sub-beat.

**Master timeline (scrubbed, `pin: true, scrub: 1, end: "+=400%"`):**

```
Progress:   0%           33%          66%          100%
           CHARGE        ZEN         DREAM        DREAM CLIMAX
Bg:        charge───▶   zen────▶   dream──────────────▶
Lockup:    charge in/out → zen in/out → dream in (slow) + glow
Dim:                                    0 ─────────── 0.4
Time:      15:00         19:00        23:00
```

Implementation: one `gsap.timeline` with `scrollTrigger: { trigger, pin: true, scrub: 1, end: "+=400%" }`. Tweens are positioned on the timeline using absolute time labels (`"charge"`, `"zen"`, `"dream"`), and each tween carries its own ease from the per-SKU motion register:

- Charge enters: `duration: 0.6, ease: "power4.out"` (snappy)
- Zen enters: `duration: 1.0, ease: "expo.out"` (smoother, type "breathes")
- Dream enters: `duration: 1.6, ease: "expo.out"` + glow ramp + dim ramp (slow, should "hurt a little")

On a scrubbed timeline, per-tween eases still take effect: gsap maps scroll progress linearly to timeline time, but each individual tween maps its slice of timeline time through its own ease curve. That's how we get distinct SKU registers inside one scrub.

**Lollipop handling:**
- Three `<LollipopRender />` instances (charge, zen, dream) absolutely positioned at the same slot.
- Only one visible at a time (opacity cross-fade).
- The Dream lollipop receives `glow={true}` (the prop already exists on the primitive from Phase 1).
- On Dream's entry, gsap also nudges its scale slightly (`1 → 1.08`) to reinforce the climax.

**Reduced motion fallback:**
- Render all three sub-beats as a vertical stack, one per viewport, no pin, no scrub.
- Each sub-beat shows its own background (no cross-fade), its lockup, and its lollipop statically.
- The Dream sub-beat's dimmer simply renders at 0.4 opacity by default.
- No scaling, no glow animation — the glow prop still applies to the Dream lollipop statically.

**Risks / traps:**
- **Pin + Lenis interaction**: we already proved this works in Beat 02 (and Beat 04's horizontal jack). The `useLenis` ↔ `gsap.ticker` bridge from Phase 1 handles it.
- **Absolute positioning inside a pinned container**: layout math must use `inset-0` on the stage, not `100vh` heights, so the pin calculations match the stage's actual size.
- **Scroll length vs perceived length**: `end: "+=400%"` is ~4 viewport heights of scroll for ~3 sub-beats. That's deliberate — it gives each sub-beat breathing room and makes the Dream climax feel earned. If QA testing suggests it's too long at 375px, we can scale down to `+=300%` in a follow-up, but the starting point stays at 400%.
- **Hydration**: the initial state of every cross-faded element must match SSR. Strategy: all three lockups start with `opacity: 1` in inline style so SSR renders all of them stacked; then `useIsoLayoutEffect` synchronously `gsap.set`s zen and dream to `opacity: 0` before paint so only Charge is visible on first frame.

**File size budget:** design.md hygiene rules ask for components <150 lines. Beat 05 will almost certainly exceed that — the spec itself declares this beat the most complex. Mitigation: extract a `DayArcLockup` sub-component in the same file for the shared eyebrow/headline/sub/flavor layout, so the main component stays legible.

---

### Step 2 — Beat 07: The 10-Minute Promise

**Copy (verbatim, design.md § 3 Beat 07):**
- Eyebrow: `BANGALORE, RIGHT NOW`
- Headline: `From craving to mouth in ten minutes.`
- Sub: *On Blinkit, Zepto, and Instamart across Koramangala, Indiranagar, HSR, and Whitefield. The 11 PM you is welcome.*
- CTAs: `Order on Blinkit` · `Order on Zepto` · `Order on Instamart`

**Structure:**
- `<section>` exactly `100svh`, `bg-ink`, centered flex column.
- Eyebrow at top.
- **Mega "10"** numeral — `text-mega`, `font-display`, `font-light`, next to "MINUTES" in mono caption beside it. Anchors the visual with the promised number.
- Headline below, `text-h2`.
- Sub paragraph, max-w-2xl.
- Three `<MagneticButton>` CTAs in a row at the bottom of the viewport (stacked vertical on mobile <md).

**CTA wiring:**
```ts
const CTAS = [
  { label: "Order on Blinkit",   href: "https://blinkit.com" },
  { label: "Order on Zepto",     href: "https://www.zeptonow.com" },
  { label: "Order on Instamart", href: "https://www.swiggy.com/instamart" },
];
// TODO(post-launch): swap each href for a product deep-link once Lixx is listed.
```

The MagneticButton primitive already supports `href`. Style: rounded-full, `bg-bone text-ink`, subtle hover lift via the built-in magnetic pull.

**Motion register: PACE WHIPLASH:**
- No scrub, no pin.
- Short durations (0.4–0.5s), `power4.out` ease for snappiness.
- Eyebrow, mega "10", headline, sub, CTAs reveal on a single ScrollTrigger fired at `top 75%`, staggered by `0.06s` to feel like a rapid-fire slap.
- No SplitText word-mask — too slow for the pace. Use simple `y: 24 → 0, opacity: 0 → 1` fade-ups.

**Reduced motion fallback:**
- Everything renders in final state. MagneticButton's built-in reduced-motion guard (already in Phase 1) disables the cursor-tracking on its own.

**Risks / traps:**
- **Viewport height on mobile iOS**: `100svh` (which we already use elsewhere) handles iOS Safari's dynamic chrome correctly. No extra work needed.
- **CTA href honesty**: using homepage URLs is a deliberate pre-launch choice. The TODO comment must be grep-able so Phase 4's launch checklist catches it.

---

### Step 3 — Page assembly

`app/page.tsx` currently (post-Phase 2):

```tsx
<Beat04ThirdWave />
<PlaceholderBeat id="05" ... />
<Beat06Science />
<PlaceholderBeat id="07" ... />
```

After Phase 3:

```tsx
<Beat04ThirdWave />
<Beat05DayArc />
<Beat06Science />
<Beat07TenMinutes />
```

Placeholders for 08 and 09 unchanged.

---

### Step 4 — QA pass

- Reduced-motion audit on Beats 05 and 07 (DevTools Rendering → Emulate CSS media feature).
- 375px viewport check for Beat 05's pinned scrub (most likely to feel wrong on mobile).
- Beat 07 CTA keyboard navigation: tab should reach all three buttons with visible focus.
- Beat 05 cross-fade timing smoke test: scroll through slowly, watch for flashes or overlaps.
- Grep for `SWAP POINT:` — still two hits.
- Grep for `TODO(post-launch)` — should be at least one hit (the CTA URLs).
- `pnpm build` clean, First Load JS delta ≤ +20 kB.
- `pnpm lint` clean.

---

## 4. File tree delta

```
components/
  beats/
    Beat05DayArc.tsx       NEW
    Beat07TenMinutes.tsx   NEW
app/
  page.tsx                 MODIFIED (two placeholder swaps)
README.md                  MODIFIED (What ships section)
docs/
  phase-3-plan.md          NEW (this file)
```

Zero new dependencies. Zero token changes. Zero primitive changes.

---

## 5. What Phase 4 will inherit

After Phase 3, only the two closing beats and launch-readiness polish remain:

| Phase | Scope |
|---|---|
| **Phase 4** | Beat 08 (The Box — lid lift, 5×3 lollipop grid), Beat 09 (Sign-Off — one-line close + wordmark), Lighthouse ≥95/100 pass, OG image, favicon, real FSSAI number, analytics, robots.txt, real Q-comm deep-links |

Phase 3 leaves a demo-able, **narratively complete** scroll from Cold Open through the Day Arc to the order CTAs. Everything after Beat 07 (the Box and Sign-Off) reinforces rather than introduces.
