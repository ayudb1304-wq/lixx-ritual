"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "@/lib/hooks/useIsoLayoutEffect";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Beat 02 — The Diagnosis
 *
 * Pinned section. Background tweens ink → bone, text inverts. Three stat
 * cards slide in horizontally on scroll. The 52% counter counts up from 0.
 * After the stats settle, the sub fades in.
 *
 * Copy verbatim from design.md § 3, Beat 02.
 * The 52% statistic traces to newindianexpress.com via Lixx doc 1.md § 1.2.
 */
export function Beat02Diagnosis() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (reduced) {
      // Snap to final state.
      root.style.backgroundColor = "var(--color-bone)";
      root.style.color = "var(--color-ink)";
      const counter = root.querySelector<HTMLElement>("[data-counter]");
      if (counter) counter.textContent = "52";
      return;
    }

    const ctx = gsap.context(() => {
      const pin = root;
      const counter = root.querySelector<HTMLElement>("[data-counter]");
      const stats = gsap.utils.toArray<HTMLElement>("[data-stat]");
      const sub = root.querySelector<HTMLElement>("[data-sub]");

      gsap.set(stats, { xPercent: 80, opacity: 0 });
      gsap.set(sub, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        },
      });

      // Background / color inversion.
      tl.to(
        pin,
        {
          backgroundColor: "var(--color-bone)",
          color: "var(--color-ink)",
          ease: "none",
          duration: 0.5,
        },
        0
      );

      // Stats stagger in as we scroll.
      tl.to(
        stats,
        {
          xPercent: 0,
          opacity: 1,
          stagger: 0.12,
          ease: "power2.out",
          duration: 0.6,
        },
        0.15
      );

      // Count-up on the numeric proxy.
      const proxy = { val: 0 };
      tl.to(
        proxy,
        {
          val: 52,
          ease: "none",
          duration: 0.6,
          onUpdate: () => {
            if (counter) counter.textContent = String(Math.round(proxy.val));
          },
        },
        0.15
      );

      // Sub fades in at the tail.
      tl.to(
        sub,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "expo.out",
        },
        0.75
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      aria-label="The Urban Millennial Paradox"
      className="relative flex min-h-[100svh] flex-col items-center justify-center gap-lg bg-ink px-md text-bone"
      style={{ transition: "none" }}
    >
      <div className="max-w-5xl text-center">
        <p className="font-mono text-eyebrow uppercase tracking-eyebrow">
          THE URBAN MILLENNIAL PARADOX
        </p>
        <h2 className="mt-md font-display text-h2 font-light leading-[0.95] tracking-tightest">
          Optimized everything. Sleeping six hours.
        </h2>
      </div>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-md md:grid-cols-3">
        <article
          data-stat
          className="border border-current/20 p-md text-left"
        >
          <p className="font-mono text-eyebrow uppercase tracking-eyebrow opacity-60">
            BENGALURU, 2025
          </p>
          <p className="mt-sm font-mono text-mega font-light leading-none">
            <span data-counter>0</span>
            <span>%</span>
          </p>
          <p className="mt-sm font-sans text-body">
            of Bengalureans sleep under six hours a night.
          </p>
        </article>

        <article
          data-stat
          className="border border-current/20 p-md text-left"
        >
          <p className="font-mono text-eyebrow uppercase tracking-eyebrow opacity-60">
            THE STANDUP
          </p>
          <p className="mt-sm font-mono text-mega font-light leading-none">
            3 PM
          </p>
          <p className="mt-sm font-sans text-body">
            when your focus dies and your standup starts.
          </p>
        </article>

        <article
          data-stat
          className="border border-current/20 p-md text-left"
        >
          <p className="font-mono text-eyebrow uppercase tracking-eyebrow opacity-60">
            THE SHUTDOWN
          </p>
          <p className="mt-sm font-mono text-mega font-light leading-none">
            11 PM
          </p>
          <p className="mt-sm font-sans text-body">
            when your brain finally clocks in.
          </p>
        </article>
      </div>

      <p
        data-sub
        className="max-w-3xl text-center font-sans text-sub"
      >
        You don&apos;t need a supplement aisle. You need a reset button you can
        actually keep in your pocket.
      </p>
    </section>
  );
}
