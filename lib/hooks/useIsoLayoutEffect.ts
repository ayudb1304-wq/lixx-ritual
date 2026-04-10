import { useEffect, useLayoutEffect } from "react";

/**
 * SSR-safe useLayoutEffect. Uses useEffect on the server to silence
 * React's warning, useLayoutEffect on the client so GSAP can set
 * initial styles synchronously before paint.
 */
export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
