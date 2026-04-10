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
 * Beat 08 — The Box
 *
 * Anchor-the-value moment. A 3D box sits at center stage; its lid rotates
 * open as the user scrolls, revealing fifteen lollipops inside arranged
 * like ammunition — five Charge, five Zen, five Dream.
 *
 * Copy verbatim from design.md § 3, Beat 08.
 *
 * SWAP POINT: the CSS/3D box below is the placeholder geometry. When a
 * real box render or product photography is ready, replace the stage
 * markup inside `[data-box]` keeping the same prop shape and IDs so the
 * lid-lift tween still binds.
 */

type SkuKey = "charge" | "zen" | "dream";

// 15 lollipops arranged in three rows of five: charge, zen, dream.
const GRID: readonly SkuKey[] = [
  "charge", "charge", "charge", "charge", "charge",
  "zen",    "zen",    "zen",    "zen",    "zen",
  "dream",  "dream",  "dream",  "dream",  "dream",
] as const;

export function Beat08TheBox() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const lid = root.querySelector<HTMLElement>("[data-lid]");
    const grid = root.querySelector<HTMLElement>("[data-grid]");
    if (!lid || !grid) return;

    if (reduced) {
      // Snap to fully-open state.
      gsap.set(lid, { rotateX: -110 });
      gsap.set(grid, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(lid, { rotateX: 0 });
      gsap.set(grid, { opacity: 0.35 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      tl.to(
        lid,
        {
          rotateX: -110,
          ease: "none",
        },
        0
      );
      tl.to(
        grid,
        {
          opacity: 1,
          ease: "power2.out",
        },
        0.2
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="box"
      aria-label="The Starter Box"
      className="relative flex min-h-[140svh] flex-col items-center justify-center gap-lg bg-ink px-md py-2xl text-bone"
    >
      {/* Heading */}
      <div className="flex flex-col items-center gap-sm text-center">
        <p className="font-mono text-eyebrow uppercase tracking-eyebrow text-mute">
          THE STARTER BOX
        </p>
        <h2 className="max-w-4xl font-display text-h2 font-light leading-[0.95] tracking-tightest">
          15 days. Three states. One box.
        </h2>
      </div>

      {/* 3D box stage */}
      <div
        data-box
        className="relative mx-auto w-full max-w-2xl"
        style={{
          perspective: "1500px",
          perspectiveOrigin: "50% 30%",
        }}
      >
        <div
          className="relative aspect-[4/3] w-full md:aspect-[3/2]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Box interior */}
          <div
            className="absolute inset-0 overflow-hidden rounded-sm border border-bone/15 bg-char"
            style={{
              boxShadow:
                "inset 0 30px 60px rgba(0,0,0,0.75), inset 0 -10px 30px rgba(0,0,0,0.5)",
            }}
          >
            <div
              data-grid
              className="grid h-full w-full grid-cols-5 grid-rows-3 items-center justify-items-center gap-1 p-3 md:gap-xs md:px-md md:py-sm"
            >
              {GRID.map((sku, i) => (
                <div
                  key={`${sku}-${i}`}
                  className="flex items-center justify-center"
                  style={{
                    // Slight depth shadow under each lollipop
                    filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.55))",
                  }}
                >
                  {/* Mobile: smaller so the 5x3 grid fits a 311-wide box */}
                  <div className="md:hidden">
                    <LollipopRender color={sku} size={34} />
                  </div>
                  {/* Desktop */}
                  <div className="hidden md:block">
                    <LollipopRender color={sku} size={48} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lid — rotates open */}
          <div
            data-lid
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden rounded-sm border border-bone/20"
            style={{
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              background:
                "linear-gradient(180deg, #16161a 0%, #0a0a0c 100%)",
              boxShadow:
                "0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <div className="flex h-full items-center justify-center">
              <span className="font-display text-h3 font-light tracking-tightest text-bone">
                lixx
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub + CTA */}
      <div className="flex flex-col items-center gap-md text-center">
        <p className="max-w-2xl font-sans text-sub text-mute">
          Five Charge. Five Zen. Five Dream. ₹499. Free delivery above ₹599.
          Subscribe and we&apos;ll keep you stocked.
        </p>

        <a
          href="#box"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-bone px-8 py-3 font-mono text-[0.8rem] uppercase tracking-eyebrow text-ink transition-colors hover:bg-charge"
        >
          Get the box <span aria-hidden="true">→</span>
        </a>

        <p className="max-w-xl font-mono text-[0.7rem] uppercase tracking-eyebrow text-mute">
          Not for children. Not for pregnancy. Caffeinated confectionery. Read
          the label like an adult.
        </p>
      </div>
    </section>
  );
}
