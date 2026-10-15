// Brand colours and gradients shared by the site sections.

// Orange → red brand gradient (Tailwind classes)
export const GRADIENT = "bg-linear-to-r from-[#F16B0D] to-[#E61416]";

// Same gradient as a CSS value, for inline styles and RollButton backgrounds
export const GRADIENT_CSS = "linear-gradient(to right, #F16B0D, #E61416)";

export const ACCENT = "#E8620F";

// Layered warm gradient used behind the home hero and the inner page heroes
export const HERO_BACKGROUND = {
  backgroundColor: "#180d08",
  backgroundImage: `
    radial-gradient(65% 55% at 92% 6%, #F0640D 0%, rgba(240,100,13,0) 65%),
    radial-gradient(60% 55% at 4% 82%, #EC690F 0%, rgba(236,105,15,0) 65%),
    radial-gradient(75% 80% at 48% 42%, #B01205 0%, rgba(176,18,5,0) 70%),
    linear-gradient(180deg, #D8470A 0%, #C0300A 28%, #B01205 46%, #7A1C08 68%, #2A1108 88%, #180D08 100%)
  `,
};

// Frosted glass panel used for cards on dark sections (testimonial card, pricing, contact details)
export const GLASS_CARD = "rounded-[2vw] border border-white/10 bg-white/5 backdrop-blur-lg max-[1025px]:rounded-[4vw] max-md:rounded-3xl";
