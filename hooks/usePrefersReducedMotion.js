"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import { REDUCED_MOTION_QUERY } from "@/constants/breakpoints";

/** True when the visitor has asked their OS to reduce motion. */
export default function usePrefersReducedMotion() {
  return useMediaQuery(REDUCED_MOTION_QUERY);
}
