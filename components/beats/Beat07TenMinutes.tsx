"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "@/lib/hooks/useIsoLayoutEffect";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { MagneticButton } from "@/components/primitives/MagneticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Beat 07 — The 10-Minute Promise
 *
 * Pace whiplash after Beat 06's slow editorial Science. One viewport,
 * big numerals, three magnetic Q-comm CTAs. No scrub, no pin — short
 * `power4.out` reveals fire on a single ScrollTrigger for a rapid-fire
 * feel.
 *
 * Copy verbatim from design.md § 3, Beat 07.
 */

// TODO(post-launch): swap each href for a Lixx product deep-link once
// the SKUs are live on each platform. Homepage URLs are the honest
// placeholder until then — they do take a user to the right platform.
const CTAS: ReadonlyArray<{ label: string; href: string; ariaLabel: string }> =
  [
    {
      label: "Order on Blinkit",
      href: "https://blinkit.com",
      ariaLabel: "Order Lixx on Blinkit",
    },
    {
      label: "Order on Zepto",
      href: "https://www.zeptonow.com",
      ariaLabel: "Order Lixx on Zepto",
    },
    {
      label: "Order on Instamart",
      href: "https://www.swiggy.com/instamart",
      ariaLabel: "Order Lixx on Swiggy Instamart",
    },
  ];

export function Beat07TenMinutes() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);

      gsap.from(targets, {
        y: 28,
        opacity: 0,
        duration: 0.55,
        ease: "power4.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      aria-label="Bangalore, right now"
      className="relative flex min-h-[100svh] flex-col items-center justify-center gap-md bg-ink px-md py-xl text-bone"
    >
      <p
        data-reveal
        className="font-mono text-eyebrow uppercase tracking-eyebrow text-mute"
      >
        BANGALORE, RIGHT NOW
      </p>

      {/* Mega "10" + "MINUTES" caption */}
      <div
        data-reveal
        className="flex items-end justify-center gap-sm leading-none"
      >
        <span
          className="font-display font-light tracking-tightest text-bone"
          style={{ fontSize: "var(--fs-mega)", lineHeight: 0.85 }}
        >
          10
        </span>
        <span className="mb-md font-mono text-eyebrow uppercase tracking-eyebrow text-mute">
          MINUTES
        </span>
      </div>

      <h2
        data-reveal
        className="max-w-4xl text-center font-display text-h2 font-light leading-[0.95] tracking-tightest"
      >
        From craving to mouth in ten minutes.
      </h2>

      <p
        data-reveal
        className="max-w-2xl text-center font-sans text-sub text-mute"
      >
        On Blinkit, Zepto, and Instamart across Koramangala, Indiranagar, HSR,
        and Whitefield. The 11 PM you is welcome.
      </p>

      {/* CTAs — stacked on mobile, row on md+ */}
      <div
        data-reveal
        className="mt-md flex flex-col items-stretch gap-sm md:flex-row md:items-center md:justify-center md:gap-md"
      >
        {CTAS.map((cta) => (
          <MagneticButton
            key={cta.href}
            href={cta.href}
            target="_blank"
            ariaLabel={cta.ariaLabel}
            className="inline-flex min-w-[14rem] items-center justify-center rounded-full bg-bone px-6 py-3 font-mono text-[0.75rem] uppercase tracking-eyebrow text-ink transition-colors hover:bg-charge"
          >
            {cta.label}
          </MagneticButton>
        ))}
      </div>
    </section>
  );
}
