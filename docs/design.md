# Lixx — Design Spec

Story-driven landing page for an Isomalt-based functional lollipop brand from Bangalore. Three SKUs: **Charge** (3 PM energy), **Zen** (7 PM calm), **Dream** (11 PM sleep). Box of 15 at ₹499. Sold via Blinkit / Zepto / Instamart in 10 minutes.

This document defines the **what** and the **why**: voice, narrative, visual system, motion philosophy. The build spec lives in `implementation.md`.

---

## 1. Strategic Frame

### Protagonist
The burnt-out Bangalore professional. 26–38. Engineer, designer, PM, founder. Optimizes everything except sleep. Reads this page on a phone, in bed, at 11 PM.

### Tension
The Urban Millennial Paradox: acutely health-conscious, chronically time-poor. 52% of Bengalureans sleep under 6 hours a night. Pills feel medical. Gummies feel childish and melt in May.

### Resolution
Lixx as **ritual, not medicine**. The Third Wave after pills and gummies. Hard-boiled confectionery as a delivery format with real pharmacological advantages: sublingual absorption, thermal stability, zero sugar, dental-safe.

### What we are NOT
- Not wellness. Not "self-care." Not pastel.
- Not a gummy brand. We punch at gummies on purpose.
- Not making medical claims. FSSAI nutraceutical hygiene throughout.
- Not a brochure. Every section advances the story.

---

## 2. Voice & Copy Rules

**Embrace**: tactile verbs, sensory specifics, Bangalore cultural texture (3 PM standup, 11 PM Slack, Koramangala, Q-comm), provocative one-liners, dry confidence.

**Avoid**: empower, journey, holistic, mindful, wellness, your best self, glow, balance, "we believe," founder origin stories on the homepage.

**Hierarchy** for every section:
1. Eyebrow (uppercase, tracked, ≤4 words)
2. Headline (≤7 words, muscular)
3. Subhead (1 sentence, earns the headline)
4. Body (only if necessary)
5. CTA microcopy (only if the beat asks for action)

**Claim discipline**: every factual claim must trace to the project doc. No invented stats. No medical language ("cures," "treats," "heals"). Caffeine SKU carries "not for children" warning per FSSAI rules.

---

## 3. The 9-Beat Scroll Narrative

The page is a single scroll. Nine beats. Each beat creates a question the next beat answers.

| # | Beat | Purpose | Emotional Goal |
|---|---|---|---|
| 01 | Cold Open | Refuse to look like a wellness brand | Recognition |
| 02 | The Diagnosis | Name the paradox | Uncomfortable nod |
| 03 | The Reveal | Product enters as object of curiosity | "What *is* that?" |
| 04 | The Third Wave | Category creation, name the war | "Different game" |
| 05 | The Day Arc | Three SKUs as one system (SPINE) | "I want all three" |
| 06 | The Science | Pay off the hints | Trust |
| 07 | 10-Minute Promise | Collapse craving → hand | Itch to tap |
| 08 | The Box | Anchor value, sell the bundle | "₹499 is nothing" |
| 09 | Sign-Off | Close the loop, screenshottable line | "I'm telling someone" |

### Beat 01 — Cold Open
- **Eyebrow**: none
- **Headline**: You haven't slept properly since Q2.
- **Sub**: A love letter to everyone running on cold brew and cortisol.
- **No CTA, no nav, no logo.** Nav fades in only after 80vh of scroll.
- **Visual**: Near-black viewport. Type centered, generous negative space. A small pale dot follows the cursor.

### Beat 02 — The Diagnosis
- **Eyebrow**: THE URBAN MILLENNIAL PARADOX
- **Headline**: Optimized everything. Sleeping six hours.
- **Stats** (count up on scroll):
  - **52%** of Bengalureans sleep under 6 hours a night
  - **3 PM** is when your focus dies and your standup starts
  - **11 PM** is when your brain finally clocks in
- **Sub** (after stats): You don't need a supplement aisle. You need a reset button you can actually keep in your pocket.
- **Visual**: Pinned. Background morphs ink → bone as user scrolls. Stat cards scrub in horizontally.

### Beat 03 — The Reveal
- **Eyebrow**: INTRODUCING LIXX
- **Headline**: Not a gummy. Not a pill. A ritual.
- **Sub**: Hard-boiled. Sugar-free. Sublingual. Engineered in Bangalore for the people who built it.
- **Microcopy under product**: Isomalt matrix · Zero sugar · Dental-safe · Dissolves in 8 minutes
- **Visual**: Full-bleed. A single lollipop renders center, rotating slowly. Gemstone-clear, catching light. Lenis slows the scroll here on purpose.

### Beat 04 — The Third Wave
- **Eyebrow**: A SHORT HISTORY OF FEELING BETTER
- **Headline**: Pills. Gummies. Lixx.
- **Wave 1 — The Pill Era**: Clinical. Reactive. Tasted like punishment.
- **Wave 2 — The Gummy Era**: Friendlier. Sugary. Melts in a Bangalore summer.
- **Wave 3 — The Lixx Era**: Sublingual delivery. Zero sugar. Bypasses your liver. Fits in your pocket.
- **Sub**: Hard-boiled confectionery holds in the mouth long enough for active compounds to absorb buccally — faster onset, no first-pass metabolism. Translation: it works before you finish it.
- **Visual**: Horizontal scroll-jacked timeline. Waves 1 & 2 desaturated. Wave 3 ignites in color when centered.

### Beat 05 — The Day Arc (SPINE)
The beat that justifies the whole brand. Three SKUs as a single system: 15:00 → 19:00 → 23:00. Pinned section, scrubbed timeline, background gradient morphs through three palettes.

**05a — Charge / 15:00** · color `--color-charge`
- Eyebrow: THE 3 PM RESCUE
- Headline: Focus that doesn't fold.
- Sub: 40mg caffeine. 80mg L-theanine. The clean half of a double espresso, none of the jitter tax.
- Flavor: Electric Lemon
- Motion register: snappy, `power4.out`

**05b — Zen / 19:00** · color `--color-zen`
- Eyebrow: THE EVENING EXHALE
- Headline: Take the edge off the day.
- Sub: KSM-66 Ashwagandha and chamomile, in a lozenge you can hold through a difficult conversation.
- Flavor: Lavender-Honey
- Motion register: slower, `expo.out`, longer durations, type breathes

**05c — Dream / 23:00** · color `--color-dream` · **CLIMAX**
- Eyebrow: THE 11 PM SHUTDOWN
- Headline: Your brain. Off switch. Finally.
- Sub: 5mg melatonin and valerian root, dissolving under your tongue while your phone is still in your hand. You'll be asleep before the wrapper hits the bin.
- Flavor: Midnight Berry
- Motion register: viewport dims, type fades up slow, lollipop glows like a small moon. This beat should hurt a little.

### Beat 06 — The Science
- **Eyebrow**: THE ENGINEERING
- **Headline**: We picked the harder format on purpose.
- **Proof 1 — Sublingual absorption**: Active compounds enter the bloodstream through the mouth, not the gut. Faster, cleaner, lower dose required.
- **Proof 2 — Isomalt, not sugar**: Glycemic index of 2. Diabetic-safe. Keto-safe. Doesn't rot your teeth.
- **Proof 3 — Thermally stable**: Won't melt into a puddle in your bag in May.
- **Proof 4 — FSSAI Nutraceutical-licensed**: Not a candy pretending to be wellness. The paperwork backs it up.
- **Visual**: Two-column. Left: abstract slow-motion macro of dissolving Isomalt. Right: four proof-points reveal on scroll with a thin underline animation.

### Beat 07 — The 10-Minute Promise
- **Eyebrow**: BANGALORE, RIGHT NOW
- **Headline**: From craving to mouth in ten minutes.
- **Sub**: On Blinkit, Zepto, and Instamart across Koramangala, Indiranagar, HSR, and Whitefield. The 11 PM you is welcome.
- **CTAs**: `Order on Blinkit` · `Order on Zepto` · `Order on Instamart`
- **Visual**: Short, big numerals. Pace whiplash from Beat 06's slowness.

### Beat 08 — The Box
- **Eyebrow**: THE STARTER BOX
- **Headline**: 15 days. Three states. One box.
- **Sub**: Five Charge. Five Zen. Five Dream. ₹499. Free delivery above ₹599. Subscribe and we'll keep you stocked.
- **CTA**: Get the box →
- **Microcopy**: Not for children. Not for pregnancy. Caffeinated confectionery. Read the label like an adult.
- **Visual**: Box opens on scroll — slow lid-lift reveal. 15 lollipops inside, arranged like ammunition.

### Beat 09 — Sign-Off
- **Headline**: Sleep is a feature. Not a luxury.
- **Sub**: Lixx. Made in Bangalore for the people who built it.
- **Footer**: Shop · Science · FAQ · Press · hello@lixx.in · FSSAI Lic. No. [pending]
- **Visual**: Back to near-black. One line full viewport. "lixx" wordmark appears small, bottom-center.

### What's deliberately NOT on the page
- Founder story (lives on /about)
- Press logos (we don't have them)
- Testimonials carousel
- FAQ accordion (lives on /faq)
- Newsletter popup
- "As featured in"

---

## 4. Visual System

### Color tokens

| Token | Hex | Use |
|---|---|---|
| `--color-ink` | `#0a0a0c` | Base background, off-black |
| `--color-bone` | `#f4f1ea` | Primary text, warm off-white |
| `--color-char` | `#16161a` | Elevated surfaces |
| `--color-mute` | `#6b6b73` | Secondary text, microcopy |
| `--color-charge` | `#f5d547` | SKU 1, electric citrus |
| `--color-zen` | `#c9b8d9` | SKU 2, lavender-sage |
| `--color-dream` | `#2a2c5f` | SKU 3, midnight indigo |

Off-black, not pure black. Bone, not white. Saturation lives in the SKU palette and nowhere else. The page is monochrome until Beat 05 detonates color.

### Typography

| Family | Role | Notes |
|---|---|---|
| **Fraunces** | Display | Editorial serif, optical sizing, soft axis. Big, confident, slightly weird. |
| **Inter** | Sans / body | Workhorse. Tight tracking. |
| **JetBrains Mono** | Mono | Eyebrows, microcopy, stat counters, time labels |

**Fluid type scale** (clamp-based, all in `globals.css`):

| Token | Range |
|---|---|
| `--fs-eyebrow` | 0.7 → 0.8rem |
| `--fs-body` | 1 → 1.125rem |
| `--fs-sub` | 1.125 → 1.5rem |
| `--fs-h3` | 2 → 3.5rem |
| `--fs-h2` | 2.75 → 5.5rem |
| `--fs-h1` | 3.25 → 7.5rem |
| `--fs-mega` | 4 → 11rem |

**Tracking**:
- Display: `-0.04em` (tightest)
- Eyebrows: `+0.18em`
- Body: default

### Spacing rhythm
xs `0.5rem` · sm `1rem` · md `2rem` · lg `4rem` · xl `8rem` · 2xl `12rem`. Sections use xl/2xl vertically, generous breathing.

### Aesthetic direction
Editorial-meets-pharmaceutical. Big type, generous negative space, gemstone-clear product against moody gradients. Aesop × Liquid Death × Oatly. **Not** gummy-brand pastel. **Not** floating leaves, smiling models, water droplets, or any wellness-category visual cliché.

---

## 5. Motion Philosophy

**Motion serves narrative, never decorates.** Every animation has an in, a hold, and an out. No orphaned tweens.

### Motion tokens

| Token | Value | Use |
|---|---|---|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Default for slow, considered reveals |
| `--ease-out-power4` | `cubic-bezier(0.165, 0.84, 0.44, 1)` | Sharper, snappier (Charge SKU) |
| `--dur-fast` | 0.4s | Micro-interactions |
| `--dur-base` | 0.8s | Default reveal |
| `--dur-slow` | 1.6s | Climactic moments (Dream, Sign-Off) |

### Techniques used

- **Word-mask reveal**: each word in a `.split-word` span, parent `.split-line` with `overflow: hidden`. GSAP translates yPercent 110 → 0 with stagger.
- **Pinned scrubbed timelines**: Beats 02, 04, 05. ScrollTrigger with `pin: true, scrub: 1`.
- **Horizontal scroll-jack**: Beat 04, vertical scroll drives horizontal motion via `xPercent` tween on a wide track.
- **Background gradient morph**: Beat 05, three GSAP keyframes timed to the pinned scrub.
- **Number count-up**: Beat 02, ScrollTrigger fires a tween on a numeric proxy.
- **Magnetic CTAs**: Beat 07's order buttons pull subtly toward the cursor.
- **Cursor-aware dot**: Beat 01 only. Pale dot follows mouse with lerp.

### Per-SKU motion register
- **Charge**: snappy, `power4.out`, ~0.6s
- **Zen**: smooth, `expo.out`, ~1.0s
- **Dream**: slow, `expo.out`, ~1.6s, viewport dims

### Reduced motion
`prefers-reduced-motion: reduce` snaps all animations to final state. No fades, no transforms, no scroll-pinning. Tested in every component.

---

## 6. Constraints & Hygiene

- **FSSAI compliance**: no medical claims. "Not for children" + "Caffeinated confectionery" warnings on Beat 08.
- **Trademark**: "Lixx" used for Class 30 confectionery only. Domain candidates: lixx.in, getlixx.in, lixxclub.in.
- **Pricing anchor**: ₹499 for box of 15 is non-negotiable in copy.
- **Q-comm partners**: Blinkit, Zepto, Swiggy Instamart only. No Amazon/Flipkart on launch page.
- **Performance budget**: LCP < 2.0s, CLS ~0, JS < 200KB gzip on initial load.
- **Accessibility**: WCAG AA contrast on all text. Keyboard-navigable. Focus states visible. ARIA where needed.
- **Mobile-first**: the buyer reads this on a phone in bed at 11 PM. Test there first.
