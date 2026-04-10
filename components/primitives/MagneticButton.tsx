"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  radius?: number;
  strength?: number;
  onClick?: () => void;
  ariaLabel?: string;
};

/**
 * Button that subtly translates toward the cursor within a radius.
 * Used by Beat 07's order CTAs. Reduced-motion users get a static button.
 */
export function MagneticButton({
  children,
  href,
  className,
  radius = 120,
  strength = 0.35,
  onClick,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "expo.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "expo.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > radius) {
        xTo(0);
        yTo(0);
        return;
      }
      xTo(dx * strength);
      yTo(dy * strength);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [radius, strength, reduced]);

  const commonProps = {
    className,
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        {...commonProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      {...commonProps}
    >
      {children}
    </button>
  );
}
