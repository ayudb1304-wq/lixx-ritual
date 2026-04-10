"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "@/lib/hooks/useIsoLayoutEffect";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { SplitText } from "@/components/primitives/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Beat 09 — Sign-Off
 *
 * Closes the loop. One line full viewport; wordmark small, bottom-center;
 * real footer below. Absorbs the minimal inline footer that Phase 1 left
 * in app/page.tsx — this beat now owns the footer content.
 *
 * Copy verbatim from design.md § 3, Beat 09.
 */

export function Beat09SignOff() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      const sub = root.querySelector<HTMLElement>("[data-signoff-sub]");
      const mark = root.querySelector<HTMLElement>("[data-signoff-mark]");
      if (!sub || !mark) return;

      gsap.from([sub, mark], {
        y: 16,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.15,
        delay: 0.6,
        scrollTrigger: {
          trigger: root,
          start: "top 65%",
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <>
      <section
        ref={rootRef}
        aria-label="Sign-off"
        className="relative flex min-h-[100svh] flex-col items-center justify-center bg-ink px-md text-center"
      >
        <div className="flex max-w-5xl flex-col items-center gap-md">
          <SplitText
            as="h2"
            className="font-display text-h1 font-light leading-[0.95] tracking-tightest text-bone"
            trigger="self"
            start="top 75%"
            duration={1.6}
            stagger={0.07}
          >
            Sleep is a feature. Not a luxury.
          </SplitText>

          <p
            data-signoff-sub
            className="font-sans text-sub text-mute"
          >
            Lixx. Made in Bangalore for the people who built it.
          </p>
        </div>

        {/* Wordmark — small, bottom-center of the viewport */}
        <div
          data-signoff-mark
          className="pointer-events-none absolute inset-x-0 bottom-lg flex justify-center"
        >
          <span className="font-display text-h3 font-light tracking-tightest text-bone/70">
            lixx
          </span>
        </div>
      </section>

      {/* Real footer — below the sign-off viewport */}
      <footer
        aria-label="Site footer"
        className="border-t border-char bg-ink px-md py-lg"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-xs text-center font-mono text-[0.7rem] uppercase tracking-eyebrow text-mute md:flex-row md:flex-wrap md:gap-md">
          <a href="#box" className="transition-colors hover:text-bone">
            Shop
          </a>
          <span aria-hidden="true" className="hidden md:inline">·</span>
          <a href="#science" className="transition-colors hover:text-bone">
            Science
          </a>
          <span aria-hidden="true" className="hidden md:inline">·</span>
          {/* TODO(post-launch): /faq route */}
          <a href="#" className="transition-colors hover:text-bone">
            FAQ
          </a>
          <span aria-hidden="true" className="hidden md:inline">·</span>
          {/* TODO(post-launch): /press route */}
          <a href="#" className="transition-colors hover:text-bone">
            Press
          </a>
          <span aria-hidden="true" className="hidden md:inline">·</span>
          <a href="mailto:hello@lixx.in" className="transition-colors hover:text-bone">
            hello@lixx.in
          </a>
          <span aria-hidden="true" className="hidden md:inline">·</span>
          {/* TODO(pre-launch): replace [pending] with the real FSSAI Central License number */}
          <span>FSSAI Lic. No. [pending] · Nutraceutical</span>
        </div>
      </footer>
    </>
  );
}
