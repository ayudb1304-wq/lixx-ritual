"use client";

import { useRef, type RefObject } from "react";
import type Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "@/lib/hooks/useIsoLayoutEffect";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { SplitText } from "@/components/primitives/SplitText";
import { LollipopRender } from "@/components/primitives/LollipopRender";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Beat03Props = {
  lenisRef?: RefObject<Lenis | null>;
};

/**
 * Beat 03 — The Reveal
 *
 * Full-bleed dark. Single LollipopRender center stage, slow rotation.
 * Lenis slows to a crawl (duration 2.4) while the section is in view,
 * restores on exit. Copy verbatim from design.md § 3, Beat 03.
 */
export function Beat03Reveal({ lenisRef }: Beat03Props) {
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: "top 40%",
        end: "bottom 60%",
        onEnter: () => {
          const lenis = lenisRef?.current;
          if (lenis) lenis.options.duration = 2.4;
        },
        onLeave: () => {
          const lenis = lenisRef?.current;
          if (lenis) lenis.options.duration = 1.2;
        },
        onEnterBack: () => {
          const lenis = lenisRef?.current;
          if (lenis) lenis.options.duration = 2.4;
        },
        onLeaveBack: () => {
          const lenis = lenisRef?.current;
          if (lenis) lenis.options.duration = 1.2;
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced, lenisRef]);

  return (
    <section
      ref={rootRef}
      aria-label="Introducing Lixx"
      className="relative flex min-h-[100svh] flex-col items-center justify-center gap-lg bg-ink px-md py-xl"
    >
      <p className="font-mono text-eyebrow uppercase tracking-eyebrow text-mute">
        INTRODUCING LIXX
      </p>

      <LollipopRender color="charge" size={280} />

      <div className="max-w-4xl text-center">
        <SplitText
          as="h2"
          className="font-display text-h2 font-light leading-[0.95] tracking-tightest text-bone"
          trigger="self"
          start="top 75%"
          duration={1.2}
          stagger={0.06}
        >
          Not a gummy. Not a pill. A ritual.
        </SplitText>

        <SplitText
          as="p"
          className="mt-md block font-sans text-sub text-mute"
          trigger="self"
          start="top 85%"
          duration={1}
          stagger={0.025}
        >
          Hard-boiled. Sugar-free. Sublingual. Engineered in Bangalore for the
          people who built it.
        </SplitText>
      </div>

      <p className="font-mono text-eyebrow uppercase tracking-eyebrow text-mute">
        Isomalt matrix · Zero sugar · Dental-safe · Dissolves in 8 minutes
      </p>
    </section>
  );
}
