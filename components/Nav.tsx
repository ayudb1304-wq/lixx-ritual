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
      className={`fixed inset-x-0 top-0 z-40 transition-opacity duration-700 ease-out-expo ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-sm py-sm md:px-md">
        <a
          href="#top"
          className="font-display text-[1.5rem] tracking-tightest text-bone"
        >
          lixx
        </a>

        <ul className="hidden items-center gap-lg font-mono text-[0.72rem] uppercase tracking-eyebrow text-bone md:flex">
          <li>
            <a href="#science" className="hover:text-charge">
              Science
            </a>
          </li>
          <li>
            <a href="#box" className="hover:text-charge">
              The Box
            </a>
          </li>
          <li>
            <a href="#faq" className="hover:text-charge">
              FAQ
            </a>
          </li>
        </ul>

        <a
          href="#box"
          className="rounded-full bg-bone px-4 py-2 font-mono text-[0.7rem] uppercase tracking-eyebrow text-ink transition-transform hover:scale-[1.03]"
        >
          Get the box
        </a>
      </div>
    </nav>
  );
}
