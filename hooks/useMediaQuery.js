"use client";

import { useSyncExternalStore } from "react";

/**
 * Returns true while the given CSS media query matches, and updates when it changes.
 * During server rendering it returns false.
 *
 * @example const isTablet = useMediaQuery("(max-width: 1025px)");
 */
export default function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
