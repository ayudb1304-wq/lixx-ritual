"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "@/lib/hooks/useIsoLayoutEffect";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { splitWords } from "@/lib/utils/splitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type SplitTextProps = {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  /** When set, reveal is driven by a ScrollTrigger on the given element (or self). */
  trigger?: "self" | HTMLElement | null;
  /** ScrollTrigger start value, default "top 85%". */
  start?: string;
};

/**
 * Editorial word-mask reveal. Words translate yPercent 110 → 0 behind a
 * .split-line mask with overflow:hidden. Honors reduced motion by snapping
 * to the final state and skipping the tween entirely.
 */
export function SplitText({
  children,
  as: Tag = "span",
  className,
  delay = 0,
  duration = 1.2,
  stagger = 0.06,
  ease = "expo.out",
  trigger,
  start = "top 85%",
}: SplitTextProps): ReactNode {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = splitWords(el);
    if (words.length === 0) return;

    if (reduced) {
      gsap.set(words, { yPercent: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(words, { yPercent: 110 });

      const tweenVars: gsap.TweenVars = {
        yPercent: 0,
        duration,
        ease,
        stagger,
        delay,
      };

      if (trigger) {
        const target = trigger === "self" ? el : trigger;
        tweenVars.scrollTrigger = {
          trigger: target,
          start,
          once: true,
        };
      }

      gsap.to(words, tweenVars);
    }, el);

    return () => ctx.revert();
  }, [children, delay, duration, stagger, ease, trigger, start, reduced]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      className={className}
    >
      {children}
    </Tag>
  );
}
