// Images used by the home page (hero grid, Selected Work, process previews).
const P1 = "/images/portfolio/portfolio-1.webp";
const P2 = "/images/portfolio/portfolio-2.webp";
const P3 = "/images/portfolio/portfolio-3.webp";
const P4 = "/images/portfolio/portfolio-4.webp";

// Hero screenshot grid columns. Each list repeats so the CSS marquee can loop seamlessly
// (the keyframes in globals.css assume two images per desktop column and four on tablet/phone).
export const heroGrid = {
  desktopLeft: [P1, P3, P1, P3],
  desktopRight: [P2, P4, P2, P4],
  mobile: [P1, P2, P3, P4, P1, P2, P3, P4],
};

// Image shown for each case study in the home page's "Selected Work" stack, keyed by slug.
// The case study pages themselves keep their own `coverImage`.
export const featuredWorkImages = {
  "fintech-ledger-platform": P3,
  "healthcare-patient-app": P1,
  "logistics-ops-dashboard": P2,
};
