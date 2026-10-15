// Breakpoints shared with JavaScript. They mirror the Tailwind variants used in the markup:
// max-[1025px]: (tablet) and max-md: (phone, < 768px).

// Tablet and below
export const TABLET_QUERY = "(max-width: 1025px)";

// Small phones: the pill buttons switch from hover to tap behaviour below this width
export const SMALL_PHONE_QUERY = "(max-width: 639px)";

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// Widths used by scroll animations that pick different distances per device
export const DESKTOP_MIN_WIDTH = 1024;
export const TABLET_MAX_WIDTH = 1025;
export const PHONE_MAX_WIDTH = 541;
