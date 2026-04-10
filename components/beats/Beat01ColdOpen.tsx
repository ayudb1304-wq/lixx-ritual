"use client";

import { SplitText } from "@/components/primitives/SplitText";
import { CursorDot } from "@/components/primitives/CursorDot";

/**
 * Beat 01 — Cold Open
 *
 * Copy is verbatim from design.md § 3, Beat 01. Do not paraphrase.
 * No nav, no logo, no CTA. The CursorDot is mounted here only.
 */
export function Beat01ColdOpen() {
  return (
    <section
      id="top"
      aria-label="Cold Open"
      className="relative flex min-h-[100svh] items-center justify-center bg-ink px-md"
    >
      <CursorDot />

      <div className="max-w-5xl text-center">
        <SplitText
          as="h1"
          className="font-display text-h1 font-light leading-[0.95] tracking-tightest text-bone"
          duration={1.4}
          stagger={0.08}
          delay={0.3}
        >
          You haven&apos;t slept properly since Q2.
        </SplitText>

        <SplitText
          as="p"
          className="mt-lg block font-sans text-sub text-mute"
          duration={1.2}
          stagger={0.03}
          delay={1.1}
        >
          A love letter to everyone running on cold brew and cortisol.
        </SplitText>
      </div>
    </section>
  );
}
