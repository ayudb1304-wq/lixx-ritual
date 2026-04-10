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
 * Beat 06 — The Science
 *
 * Two-column grid. Left: a slow floating gradient placeholder standing in
 * for the dissolving-Isomalt macro shot (SWAP POINT). Right: four proof
 * points, each with a scaleX underline reveal and a subtle text fade-up as
 * it scrolls into view.
 *
 * Copy verbatim from design.md § 3, Beat 06.
 */

const PROOFS = [
  {
    index: "01",
    eyebrow: "THE MOUTH",
    title: "Sublingual absorption",
    body: "Active compounds enter the bloodstream through the mouth, not the gut. Faster, cleaner, lower dose required.",
  },
  {
    index: "02",
    eyebrow: "THE MATRIX",
    title: "Isomalt, not sugar",
    body: "Glycemic index of 2. Diabetic-safe. Keto-safe. Doesn't rot your teeth.",
  },
  {
    index: "03",
    eyebrow: "THE WEATHER",
    title: "Thermally stable",
    body: "Won't melt into a puddle in your bag in May.",
  },
  {
    index: "04",
    eyebrow: "THE PAPERWORK",
    title: "FSSAI Nutraceutical-licensed",
    body: "Not a candy pretending to be wellness. The paperwork backs it up.",
  },
] as const;

export function Beat06Science() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-proof]", root);

      if (reduced) {
        // Snap everything to the final state; no tweens, no triggers.
        items.forEach((item) => {
          const underline = item.querySelector<HTMLElement>("[data-underline]");
          if (underline) gsap.set(underline, { scaleX: 1 });
        });
        return;
      }

      items.forEach((item) => {
        const underline = item.querySelector<HTMLElement>("[data-underline]");
        const title = item.querySelector<HTMLElement>("[data-proof-title]");
        const body = item.querySelector<HTMLElement>("[data-proof-body]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 78%",
            once: true,
          },
        });

        if (underline) {
          tl.to(
            underline,
            {
              scaleX: 1,
              duration: 0.9,
              ease: "expo.out",
            },
            0
          );
        }

        if (title) {
          tl.from(
            title,
            {
              y: 18,
              opacity: 0,
              duration: 0.7,
              ease: "expo.out",
            },
            0.05
          );
        }

        if (body) {
          tl.from(
            body,
            {
              y: 14,
              opacity: 0,
              duration: 0.7,
              ease: "expo.out",
            },
            0.15
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="science"
      aria-label="The Engineering"
      className="relative bg-ink px-md py-2xl text-bone"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-xl flex flex-col gap-sm">
          <p className="font-mono text-eyebrow uppercase tracking-eyebrow text-mute">
            THE ENGINEERING
          </p>
          <h2 className="font-display text-h2 font-light leading-[0.95] tracking-tightest">
            We picked the harder format on purpose.
          </h2>
        </div>

        {/* Two-column body */}
        <div className="grid grid-cols-1 gap-xl lg:grid-cols-[1.05fr_1fr] lg:gap-2xl">
          {/* Left: macro placeholder */}
          {/* SWAP POINT: replace this gradient placeholder with a slow
              macro video or image of dissolving Isomalt when the asset
              exists. Keep the aspect-[4/5] and className shape. */}
          <div
            aria-hidden="true"
            className="relative aspect-[4/5] overflow-hidden rounded-sm"
            style={{
              background:
                "radial-gradient(120% 80% at 30% 20%, rgba(245,213,71,0.18) 0%, rgba(201,184,217,0.08) 35%, rgba(10,10,12,0) 70%), radial-gradient(90% 60% at 70% 85%, rgba(42,44,95,0.35) 0%, rgba(10,10,12,0) 60%), #0a0a0c",
            }}
          >
            <div className="science-blob" />
            <style jsx>{`
              .science-blob {
                position: absolute;
                inset: 10% 15% 10% 15%;
                border-radius: 50%;
                background: radial-gradient(
                  circle at 35% 30%,
                  rgba(244, 241, 234, 0.18) 0%,
                  rgba(244, 241, 234, 0.06) 35%,
                  rgba(10, 10, 12, 0) 70%
                );
                filter: blur(28px);
                animation: science-float 12s var(--ease-out-expo) infinite
                  alternate;
              }
              @keyframes science-float {
                0% {
                  transform: translate3d(-4%, -3%, 0) scale(1);
                }
                100% {
                  transform: translate3d(5%, 4%, 0) scale(1.08);
                }
              }
              @media (prefers-reduced-motion: reduce) {
                .science-blob {
                  animation: none;
                }
              }
            `}</style>
          </div>

          {/* Right: proof points */}
          <ol className="flex flex-col">
            {PROOFS.map((proof) => (
              <li
                key={proof.index}
                data-proof
                className="relative flex flex-col gap-sm py-lg first:pt-0"
              >
                <div className="flex items-baseline gap-md">
                  <span className="font-mono text-eyebrow uppercase tracking-eyebrow text-mute">
                    {proof.index} · {proof.eyebrow}
                  </span>
                </div>
                <h3
                  data-proof-title
                  className="font-display text-h3 font-light leading-[1.05] tracking-tightest text-bone"
                >
                  {proof.title}
                </h3>
                <p
                  data-proof-body
                  className="max-w-xl font-sans text-sub text-mute"
                >
                  {proof.body}
                </p>

                {/* Underline — initial scaleX(0) inline so SSR/CSR match.
                    The useIsoLayoutEffect either animates to scaleX(1) on
                    scroll or snaps to 1 synchronously under reduced motion. */}
                <span
                  data-underline
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 block h-px w-full bg-bone"
                  style={{
                    transform: "scaleX(0)",
                    transformOrigin: "left center",
                  }}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
