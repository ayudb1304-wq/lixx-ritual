"use client";

import { useEffect, useState } from "react";

/**
 * Fixed top nav. Hidden until the user has scrolled past 80% of the
 * viewport height, then fades in. Keeps Beat 01's Cold Open uncluttered.
 */
export function Nav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      const threshold = window.innerHeight * 0.8;
      setVisible(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-hidden={!visible}
      style={{ height: "var(--nav-h)" }}
      className={`fixed inset-x-0 top-0 z-40 border-b border-bone/5 bg-ink/70 backdrop-blur-md transition-opacity duration-700 ease-out-expo ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 md:px-md">
        <a
          href="#top"
          className="font-display text-[1.25rem] tracking-tightest text-bone sm:text-[1.5rem]"
        >
          lixx
        </a>

        <ul className="hidden items-center gap-lg font-mono text-[0.72rem] uppercase tracking-eyebrow text-bone md:flex">
          <li>
            <a href="#science" className="transition-colors hover:text-charge">
              Science
            </a>
          </li>
          <li>
            <a href="#box" className="transition-colors hover:text-charge">
              The Box
            </a>
          </li>
          <li>
            <a href="#faq" className="transition-colors hover:text-charge">
              FAQ
            </a>
          </li>
        </ul>

        <a
          href="#box"
          className="rounded-full bg-bone px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-eyebrow text-ink transition-transform hover:scale-[1.03] sm:px-4 sm:py-2 sm:text-[0.7rem]"
        >
          Get the box
        </a>
      </div>
    </nav>
  );
}
