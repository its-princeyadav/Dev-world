"use client";

import { ReactLenis } from "lenis/react";

/**
 * Smooth scrolling for the whole page (Lenis, default settings — same as the original site).
 * Any client component can get the Lenis instance with `useLenis()` from "lenis/react".
 */
export default function SmoothScrollProvider({ children }) {
  return <ReactLenis root>{children}</ReactLenis>;
}
