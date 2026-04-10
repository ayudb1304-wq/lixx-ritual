"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "@/lib/hooks/useIsoLayoutEffect";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { LollipopRender } from "@/components/primitives/LollipopRender";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Beat 05 — The Day Arc (SPINE)
 *
 * The beat that justifies the whole brand. Three SKUs as one system.
 * Single pinned section, long scrub (+=400%). Master timeline cross-fades
 * three background palettes, three SKU lockups, three time stamps, and
 * fires a Dream climax that dims the viewport and powers up the lollipop
 * glow. Each sub-beat carries its own motion register from design.md § 5.
 *
 * Copy verbatim from design.md § 3, Beats 05a/05b/05c.
 */

type SkuKey = "charge" | "zen" | "dream";

type Sku = {
  key: SkuKey;
  time: string;
  eyebrow: string;
  headline: string;
  sub: string;
  flavor: string;
};

const SKUS: readonly Sku[] = [
  {
    key: "charge",
    time: "15:00",
    eyebrow: "THE 3 PM RESCUE",
    headline: "Focus that doesn't fold.",
    sub: "40mg caffeine. 80mg L-theanine. The clean half of a double espresso, none of the jitter tax.",
    flavor: "Electric Lemon",
  },
  {
    key: "zen",
    time: "19:00",
    eyebrow: "THE EVENING EXHALE",
    headline: "Take the edge off the day.",
    sub: "KSM-66 Ashwagandha and chamomile, in a lozenge you can hold through a difficult conversation.",
    flavor: "Lavender-Honey",
  },
  {
    key: "dream",
    time: "23:00",
    eyebrow: "THE 11 PM SHUTDOWN",
    headline: "Your brain. Off switch. Finally.",
    sub: "5mg melatonin and valerian root, dissolving under your tongue while your phone is still in your hand. You'll be asleep before the wrapper hits the bin.",
    flavor: "Midnight Berry",
  },
] as const;

const BG: Record<SkuKey, string> = {
  charge:
    "radial-gradient(ellipse 80% 60% at 32% 38%, rgba(245,213,71,0.22) 0%, rgba(10,10,12,0) 60%), #0a0a0c",
  zen:
    "radial-gradient(ellipse 80% 60% at 58% 48%, rgba(201,184,217,0.28) 0%, rgba(10,10,12,0) 60%), #0a0a0c",
  dream:
    "radial-gradient(ellipse 90% 70% at 50% 60%, rgba(42,44,95,0.65) 0%, rgba(10,10,12,0) 72%), #050508",
};

export function Beat05DayArc() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);

      const bg = {
        charge: q("[data-bg='charge']")[0],
        zen: q("[data-bg='zen']")[0],
        dream: q("[data-bg='dream']")[0],
      };
      const lockup = {
        charge: q("[data-lockup='charge']")[0],
        zen: q("[data-lockup='zen']")[0],
        dream: q("[data-lockup='dream']")[0],
      };
      const timeEl = {
        charge: q("[data-time='charge']")[0],
        zen: q("[data-time='zen']")[0],
        dream: q("[data-time='dream']")[0],
      };
      const lolli = {
        dream: q("[data-lolli='dream']")[0],
      };
      const dimmer = q("[data-dimmer]")[0];

      // Initial paint: only Charge visible. Zen/Dream layers hidden.
      // Done synchronously via gsap.set so there is no post-hydration flash.
      gsap.set(
        [bg.zen, bg.dream, lockup.zen, lockup.dream, timeEl.zen, timeEl.dream],
        { opacity: 0 }
      );
      gsap.set(dimmer, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // --- CHARGE: snappy entry, power4.out register -------------------
      tl.from(
        [timeEl.charge, lockup.charge],
        {
          y: 28,
          opacity: 0,
          duration: 0.6,
          ease: "power4.out",
          stagger: 0.06,
        },
        0
      );
      // Hold
      tl.to({}, { duration: 0.8 });

      // --- CHARGE → ZEN transition -------------------------------------
      tl.to(
        [bg.charge, lockup.charge, timeEl.charge],
        {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "+=0"
      );
      // Zen enters smoother, longer, "type breathes".
      // Using fromTo because gsap.set above parked these at opacity 0,
      // so a .from() would tween to the current (zero) state.
      tl.to(
        [bg.zen, timeEl.zen],
        {
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
        },
        "<+0.1"
      );
      tl.fromTo(
        lockup.zen,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
        },
        "<"
      );
      // Hold
      tl.to({}, { duration: 1.0 });

      // --- ZEN → DREAM transition --------------------------------------
      tl.to(
        [bg.zen, lockup.zen, timeEl.zen],
        {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "+=0"
      );
      // Dream is slow; this is the climax. Viewport dims, lollipop glows.
      tl.to(
        [bg.dream, timeEl.dream],
        {
          opacity: 1,
          duration: 1.8,
          ease: "expo.out",
        },
        "<+0.1"
      );
      tl.fromTo(
        lockup.dream,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.8,
          ease: "expo.out",
        },
        "<"
      );
      tl.to(
        dimmer,
        {
          opacity: 0.45,
          duration: 1.8,
          ease: "expo.out",
        },
        "<"
      );
      // Slight scale-up on the Dream lollipop so the climax lands
      tl.to(
        lolli.dream,
        {
          scale: 1.08,
          duration: 1.8,
          ease: "expo.out",
        },
        "<"
      );
      // Final Dream hold so the user lingers at the bottom of the scrub
      tl.to({}, { duration: 0.6 });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  // ------------------------------------------------------------------
  // Reduced motion: stack three full-height lockups, no pin, no scrub.
  // ------------------------------------------------------------------
  if (reduced) {
    return (
      <section
        ref={rootRef}
        aria-label="The Day Arc"
        className="relative flex flex-col bg-ink text-bone"
      >
        {SKUS.map((sku) => (
          <div
            key={sku.key}
            className="relative flex min-h-[100svh] items-center justify-center px-md py-xl"
            style={{ background: BG[sku.key] }}
          >
            {sku.key === "dream" ? (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-black"
                style={{ opacity: 0.45 }}
              />
            ) : null}
            <div className="relative">
              <SkuLockup sku={sku} />
            </div>
          </div>
        ))}
      </section>
    );
  }

  // ------------------------------------------------------------------
  // Full experience: single pinned stage, cross-fading layers.
  // ------------------------------------------------------------------
  return (
    <section
      ref={rootRef}
      aria-label="The Day Arc"
      className="relative h-[100svh] overflow-hidden bg-ink text-bone"
    >
      {/* Background gradient layers */}
      {SKUS.map((sku) => (
        <div
          key={sku.key}
          data-bg={sku.key}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: BG[sku.key] }}
        />
      ))}

      {/* Dream dimmer overlay */}
      <div
        data-dimmer
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black"
        style={{ opacity: 0 }}
      />

      {/* Time rail — three stacked labels, top-right */}
      <div className="pointer-events-none absolute right-0 top-0 p-md md:p-lg">
        <div className="relative h-[3rem] w-[6rem] md:h-[4rem] md:w-[8rem]">
          {SKUS.map((sku) => (
            <p
              key={sku.key}
              data-time={sku.key}
              className="absolute right-0 top-0 font-mono font-light text-bone"
              style={{ fontSize: "var(--fs-h3)", lineHeight: 1 }}
            >
              {sku.time}
            </p>
          ))}
        </div>
      </div>

      {/* SKU lockups — three absolutely-stacked lockups, cross-fade */}
      {SKUS.map((sku) => (
        <div
          key={sku.key}
          data-lockup={sku.key}
          className="absolute inset-0 flex items-center justify-center px-md"
        >
          <SkuLockup sku={sku} />
        </div>
      ))}
    </section>
  );
}

/* ----------------------------------------------------------------------- */

function SkuLockup({ sku }: { sku: Sku }) {
  const isDream = sku.key === "dream";

  return (
    <div className="flex max-w-4xl flex-col items-center gap-md text-center">
      <p className="font-mono text-eyebrow uppercase tracking-eyebrow text-mute">
        {sku.eyebrow}
      </p>
      <h2 className="font-display text-h2 font-light leading-[0.95] tracking-tightest text-bone">
        {sku.headline}
      </h2>

      <div data-lolli={sku.key} className="my-sm">
        <LollipopRender color={sku.key} size={170} glow={isDream} />
      </div>

      <p className="max-w-2xl font-sans text-body text-mute">{sku.sub}</p>
      <p className="font-mono text-eyebrow uppercase tracking-eyebrow text-mute">
        FLAVOR · {sku.flavor}
      </p>
    </div>
  );
}
