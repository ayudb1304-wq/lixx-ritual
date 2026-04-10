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
 * Beat 04 — The Third Wave
 *
 * Pinned horizontal scroll-jack. A track of three 100vw panels translates
 * leftward as the user scrolls vertically. Waves 1 & 2 render desaturated;
 * Wave 3 ignites in charge yellow as it centers in the viewport.
 *
 * Copy verbatim from design.md § 3, Beat 04. Reduced motion snaps the
 * three panels into a vertical stack.
 */

const WAVES = [
  {
    index: "01",
    era: "WAVE 1 · THE PILL ERA",
    body: "Clinical. Reactive. Tasted like punishment.",
  },
  {
    index: "02",
    era: "WAVE 2 · THE GUMMY ERA",
    body: "Friendlier. Sugary. Melts in a Bangalore summer.",
  },
  {
    index: "03",
    era: "WAVE 3 · THE LIXX ERA",
    body: "Sublingual delivery. Zero sugar. Bypasses your liver. Fits in your pocket.",
  },
] as const;

export function Beat04ThirdWave() {
  const rootRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    // Reduced motion: force the active state on every panel, drop the pin.
    if (reduced) {
      const panels = track.querySelectorAll<HTMLElement>("[data-panel]");
      panels.forEach((p) => p.classList.add("is-active"));
      return;
    }

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", track);

      // Distance the track must translate to expose the last panel.
      const distance = () => track.scrollWidth - window.innerWidth;

      const masterTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Per-panel activation via containerAnimation — measured relative to
      // the master tween's progress, not the page scroll. The active panel
      // sheds its grayscale filter.
      panels.forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          containerAnimation: masterTween,
          start: "left center",
          end: "right center",
          toggleClass: { targets: panel, className: "is-active" },
        });
      });

      // Fonts can still load after the first layout; refresh once they're in
      // so the track's scrollWidth is accurate.
      const refresh = () => ScrollTrigger.refresh();
      if (document.fonts?.ready) {
        document.fonts.ready.then(refresh);
      }
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  // Reduced-motion fallback: stack panels vertically, no pin, no scrub.
  if (reduced) {
    return (
      <section
        ref={rootRef}
        aria-label="A Short History of Feeling Better"
        className="relative flex min-h-[100svh] flex-col items-center gap-lg bg-ink px-md py-xl text-bone"
      >
        <Header />
        <div
          ref={trackRef}
          className="flex w-full max-w-6xl flex-col gap-lg"
        >
          {WAVES.map((wave) => (
            <Panel key={wave.index} wave={wave} stacked />
          ))}
        </div>
        <Closer />
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      aria-label="A Short History of Feeling Better"
      className="relative h-[100svh] overflow-hidden bg-ink text-bone"
    >
      <Header fixed />
      <div
        ref={trackRef}
        className="flex h-full items-center will-change-transform"
        style={{ width: "max-content" }}
      >
        {WAVES.map((wave) => (
          <Panel key={wave.index} wave={wave} />
        ))}
      </div>
      <Closer fixed />
    </section>
  );
}

/* --------------------------------------------------------------------- */

function Header({ fixed = false }: { fixed?: boolean }) {
  return (
    <div
      className={
        fixed
          ? "pointer-events-none absolute left-0 right-0 top-0 z-10 flex flex-col items-center gap-sm px-md pt-xl text-center"
          : "flex flex-col items-center gap-sm px-md text-center"
      }
    >
      <p className="font-mono text-eyebrow uppercase tracking-eyebrow text-mute">
        A SHORT HISTORY OF FEELING BETTER
      </p>
      <h2 className="font-display text-h2 font-light leading-[0.95] tracking-tightest text-bone">
        Pills. Gummies. Lixx.
      </h2>
    </div>
  );
}

function Closer({ fixed = false }: { fixed?: boolean }) {
  return (
    <p
      className={
        fixed
          ? "pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto max-w-3xl px-md pb-lg text-center font-sans text-body text-mute"
          : "max-w-3xl px-md text-center font-sans text-body text-mute"
      }
    >
      Hard-boiled confectionery holds in the mouth long enough for active
      compounds to absorb buccally — faster onset, no first-pass metabolism.
      Translation: it works before you finish it.
    </p>
  );
}

type Wave = (typeof WAVES)[number];

function Panel({ wave, stacked = false }: { wave: Wave; stacked?: boolean }) {
  const isLixx = wave.index === "03";

  return (
    <article
      data-panel
      data-wave={wave.index}
      className={
        stacked
          ? "wave-panel is-active flex flex-col gap-md border-t border-char py-lg"
          : "wave-panel flex h-full w-screen shrink-0 items-center justify-center px-md md:px-lg lg:px-xl"
      }
    >
      <div
        className={
          stacked
            ? "flex items-center gap-md"
            : "grid w-full max-w-6xl grid-cols-1 items-center gap-md md:grid-cols-[1fr_1fr]"
        }
      >
        <div className="wave-numeral">
          <span className="font-display font-light leading-none tracking-tightest">
            {wave.index}
          </span>
          <span className="mt-xs block font-mono text-eyebrow uppercase tracking-eyebrow text-mute">
            / 03
          </span>
        </div>

        <div className="flex flex-col gap-sm">
          <p className="font-mono text-eyebrow uppercase tracking-eyebrow text-mute">
            {wave.era}
          </p>
          <p className="font-display text-h3 font-light leading-[1.05] tracking-tightest">
            {wave.body}
          </p>
          {isLixx && !stacked ? (
            <div className="wave-lollipop mt-md self-start">
              <LollipopRender color="charge" size={140} />
            </div>
          ) : null}
        </div>
      </div>

      <style jsx>{`
        .wave-panel {
          filter: grayscale(1) opacity(0.45);
          transition: filter 0.6s var(--ease-out-expo);
        }
        .wave-panel.is-active {
          filter: none;
        }
        .wave-numeral span:first-child {
          font-size: clamp(7rem, 16vw, 14rem);
          color: var(--color-bone);
          transition: color 0.6s var(--ease-out-expo);
        }
        .wave-panel[data-wave="03"].is-active .wave-numeral span:first-child {
          color: var(--color-charge);
        }
        .wave-lollipop {
          opacity: 0;
          transform: translateY(12px);
          transition:
            opacity 0.8s var(--ease-out-expo),
            transform 0.8s var(--ease-out-expo);
        }
        .wave-panel.is-active .wave-lollipop {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </article>
  );
}
