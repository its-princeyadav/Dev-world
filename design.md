# Design System — Dev World (IT Services)

Design handbook for a premium, futuristic, enterprise-grade IT services website. Every component in `/components` should trace back to a rule in this document. When a new pattern is needed that isn't covered here, add it here before shipping it in code.

## 1. Brand Personality
Premium · Precise · Confident · Minimal · Technically credible. We avoid generic "startup SaaS purple gradient" clichés by keeping color usage restrained (one accent, used deliberately) and leaning on typography, spacing, and motion for perceived quality rather than decoration.

## 2. Color Palette

Defined as CSS variables in `app/globals.css` under `@theme`, exposed as Tailwind utilities (`bg-ink`, `text-accent`, etc).

| Token | Hex | Usage |
|---|---|---|
| `--color-ink` | `#0A0C10` | Primary dark background (hero, footer, dark sections) |
| `--color-ink-soft` | `#12151C` | Elevated dark surface (cards on dark bg) |
| `--color-ink-border` | `#22262F` | Borders/dividers on dark surfaces |
| `--color-paper` | `#FBFBFC` | Primary light background |
| `--color-paper-soft` | `#F2F3F6` | Elevated light surface (cards on light bg) |
| `--color-paper-border` | `#E4E6EB` | Borders/dividers on light surfaces |
| `--color-ink-900` … `--color-ink-500` | grayscale ramp | Body text on light bg (900 darkest → 500 muted) |
| `--color-mist-400` … `--color-mist-200` | grayscale ramp | Body text / muted text on dark bg |
| `--color-accent` | `#5B5FEF` | Primary brand accent — CTAs, links, active states, key icons |
| `--color-accent-bright` | `#7B7FFF` | Hover/gradient partner for accent |
| `--color-cyan` | `#22D3EE` | Secondary accent for gradients, glow, data-viz highlights only — never as the only signal |
| `--color-success` | `#22C55E` | Form success states |
| `--color-danger` | `#EF4444` | Form errors, destructive admin actions |
| `--color-warning` | `#F59E0B` | Admin warnings |

Rules:
- Accent color (`--color-accent`) is used sparingly: primary buttons, active nav state, links inside body copy, key stat highlights. Never use it as a full-section background outside of a defined gradient CTA band.
- Gradients are the one place both accent and cyan appear together: `linear-gradient(135deg, var(--color-accent), var(--color-cyan))` at low opacity (8–16%) as background washes, or full-opacity on small elements (badges, icon chips, the CTA band).
- Dark sections (`bg-ink`) and light sections (`bg-paper`) alternate deliberately per page to create rhythm — see §12 Dark Section Strategy. Never place two dark sections back-to-back without a visual separator.

## 3. Typography

Font: **Geist Sans** (headings + body) and **Geist Mono** (labels, stats, code, eyebrow tags) — loaded via `next/font/google`, already wired in `app/layout.js`. No additional font families.

Type scale (Tailwind `text-*` sizes mapped via `@theme`):

| Role | Size / Line-height | Weight | Tracking |
|---|---|---|---|
| Display (hero H1) | `clamp(2.75rem, 5vw, 5rem)` / 1.05 | 600 | `-0.02em` |
| H1 (page title) | `clamp(2.25rem, 4vw, 3.5rem)` / 1.1 | 600 | `-0.02em` |
| H2 (section title) | `clamp(1.75rem, 3vw, 2.5rem)` / 1.15 | 600 | `-0.01em` |
| H3 (card/subsection) | `1.25rem–1.5rem` / 1.3 | 600 | normal |
| Body large | `1.125rem` / 1.6 | 400 | normal |
| Body | `1rem` / 1.65 | 400 | normal |
| Small / caption | `0.875rem` / 1.5 | 400–500 | normal |
| Eyebrow label | `0.75rem` / 1.4, uppercase | 600, Geist Mono | `0.08em` |

Rules: max one Display or H1 per page. Body copy max-width `65ch` for long-form (blog/case study) content. Eyebrow labels precede every section heading (e.g. "SERVICES", "WHY DEV WORLD") in accent color, mono font.

## 4. Grid & Containers

- Base grid: 12-column, `gap-6` (1.5rem) desktop, `gap-4` mobile.
- Container widths: `max-w-7xl` (1280px) default page container, `max-w-6xl` (1152px) for text-dense pages (blog post, legal), `max-w-screen-2xl` (1536px) for full-bleed showcase sections. Horizontal padding: `px-6` mobile, `px-8` tablet, `px-10` desktop (via `sm:` / `lg:`).

## 5. Responsive Breakpoints (Tailwind defaults, used as-is)
`sm` 640px · `md` 768px · `lg` 1024px · `xl` 1280px · `2xl` 1536px. Mobile-first authoring. Nav collapses to hamburger below `lg`. Admin data tables switch to stacked cards below `md`.

## 6. Spacing System
4px base unit (Tailwind default scale). Section vertical rhythm: `py-20` mobile → `py-28`/`py-32` desktop between major sections. Card internal padding: `p-6` (mobile) / `p-8` (desktop). Component gap defaults: `gap-4` tight, `gap-6` standard, `gap-10`/`gap-12` section-level.

## 7. Border Radius
`--radius-sm: 8px` (inputs, chips) · `--radius-md: 14px` (buttons, small cards) · `--radius-lg: 20px` (feature cards, modals) · `--radius-xl: 28px` (hero panels, large media frames) · `--radius-full` (pills, avatars, badges).

## 8. Shadow System
Shadows are soft and low-opacity — never default browser-black shadows.
- `--shadow-sm`: `0 1px 2px rgba(10,12,16,0.06)`
- `--shadow-md`: `0 8px 24px rgba(10,12,16,0.08)`
- `--shadow-lg`: `0 20px 48px rgba(10,12,16,0.12)`
- `--shadow-glow`: `0 0 60px rgba(91,95,239,0.25)` — used only on dark backgrounds behind hero visuals/CTA bands, never on cards.

## 9. Buttons

Variants (component: `components/ui/Button.jsx`):
- **Primary**: solid `bg-accent`, white text, `rounded-md` (14px), `hover:bg-accent-bright`, subtle scale (1.02) + shadow-md on hover, transition 200ms.
- **Secondary**: `bg-transparent border border-paper-border` (or `border-ink-border` on dark), hover fills `bg-paper-soft`/`bg-ink-soft`.
- **Ghost**: text-only with accent underline-on-hover, used for tertiary actions ("Learn more →").
- **On-dark primary**: white bg, ink text, for CTA bands with dark/gradient backgrounds.

Sizes: `sm` (h-9, text-sm), `md` (h-11, text-base, default), `lg` (h-14, text-lg, hero CTAs). All buttons: `px-6`–`px-8`, `font-medium`, icon-trailing arrow (react-icons `HiArrowRight`) animates `translate-x-1` on hover via Framer Motion.

## 10. Cards

- **Standard card**: `bg-paper-soft` (or `bg-ink-soft` on dark), `border border-paper-border/ink-border`, `rounded-lg` (20px), `p-8`, `shadow-sm` → `shadow-md` on hover, `-translate-y-1` on hover (Framer Motion), 250ms ease-out.
- **Feature/service card**: icon chip (44px, `rounded-md`, gradient wash bg) top-left, H3, 2-line description, ghost "Learn more" link.
- **Stat card**: large mono numeral (H1 scale) + small caption, used in About/Home stats row.
- **Glass card**: see §11.

## 11. Glassmorphism
Used sparingly, only over imagery/gradient backgrounds (hero panels, navbar-on-scroll, testimonial spotlight): `bg-white/8` (dark) or `bg-white/60` (light), `backdrop-blur-md`, `border border-white/15` (dark) / `border-white/40` (light). Never stack glass on glass. Never use on data-dense admin UI — admin stays solid/opaque for legibility.

## 12. Dark Section Strategy
Page rhythm alternates light → dark → light to create visual pacing and give premium "showcase" moments to key content:
- **Always dark**: Hero (every page), primary CTA band (footer-adjacent), footer.
- **Situationally dark**: one mid-page "spotlight" section per page (e.g., stats band, tech marquee, featured case study) to break monotony.
- **Always light**: dense content — pricing tables, forms, blog listing, FAQ accordion — for readability.
- Transition between dark/light sections uses a straight edge (no wave dividers/skew) — precision over decoration, consistent with brand personality.

## 13. Navbar Behaviour
- Transparent over hero on load (`absolute`, white/light text) → on scroll past hero height, becomes `fixed` with `bg-ink/80 backdrop-blur-lg border-b border-ink-border` (glass), animated via Framer Motion `useScroll`.
- Height: 80px desktop / 64px mobile. Logo left, nav links center/right, "Get in Touch" primary button far right.
- Services link opens a mega-menu panel (grid of service categories with icons) on hover/focus, desktop only; mobile nav is a full-screen slide-in panel (Framer Motion) with accordion for Services.
- Active route indicated by accent-colored 2px underline, animated with `layoutId` shared transition.

## 14. Footer Design
Dark (`bg-ink`), 4-column grid desktop (Company / Services / Company Links / Resources) collapsing to accordion on mobile, newsletter signup row above the column grid, bottom bar with logo, copyright, legal links (Privacy/Terms/Cookies), and social icons (react-icons). Top edge has a 1px `border-ink-border` and a subtle radial accent glow behind the newsletter row.

## 15. Animation Guidelines
- **Framer Motion**: component-level — page/section entrance (`opacity 0→1, y 24→0`, 0.6s ease-out, staggered children 0.08s), hover/tap micro-interactions, layout transitions (mega-menu, mobile nav, accordions), shared-layout active states.
- **GSAP + ScrollTrigger**: scroll-driven sequences only — hero text/visual parallax, pinned sections (process timeline, case study scroller), counter-up stat numbers, tech marquee auto-scroll. Register ScrollTrigger once in a client-only provider; always `gsap.context()` scoped to a ref and cleaned up on unmount.
- **Lenis**: wraps the whole app for smooth-scroll momentum (`lib/SmoothScrollProvider.jsx`), synced to GSAP ScrollTrigger's ticker so scroll-triggered animations stay in sync.
- Respect `prefers-reduced-motion`: disable Lenis smoothing and GSAP scroll parallax, keep Framer Motion transitions but reduce distance/duration, when the media query matches.
- No animation exceeds 800ms except pinned/scroll-scrubbed sequences. No bounce/elastic easing — only `ease-out`/custom cubic-beziers matching `--ease-fluid`/`--ease-snappy` from Tailwind theme.

## 16. Hover Effects
Cards: lift + shadow. Buttons: color shift + slight scale + arrow shift. Links in body copy: accent underline grows from left (`background-size` transition), never color-only. Images in portfolio/case study grids: subtle `scale-105` with `overflow-hidden` parent, 400ms.

## 17. Icon Usage
`react-icons` exclusively — primarily `Hi2` (Heroicons v2) for UI chrome and `Fi` (Feather) for a lighter line-icon feel in service/feature lists. Icon sizes: 20px inline-with-text, 24px nav/buttons, 32–40px inside icon chips. Icons always paired with text except in social/nav-utility contexts.

## 18. Illustration / Image Style
No stock-photo clichés (handshakes, generic laptop-in-cafe shots). Prefer: abstract geometric/gradient-mesh visuals, code-editor/UI-mockup screenshots in device frames, isometric or line-art tech diagrams for process/architecture sections, real team/office photography only on About/Careers (desaturated slightly, consistent grade). All images `rounded-lg`+, lazy-loaded via `next/image`.

## 19. Accessibility Rules
- Color contrast: body text ≥ 4.5:1, large text/UI ≥ 3:1 — verify accent-on-ink and accent-on-paper combos.
- All interactive elements keyboard-reachable with a visible focus ring (`focus-visible:ring-2 ring-accent ring-offset-2`), including custom nav/menu/accordion components.
- Every `next/image` has meaningful `alt` (or `alt=""` if purely decorative).
- Forms: every input has an associated `<label>`, errors announced via `aria-describedby` + `role="alert"` (React Hook Form + our `FormField` wrapper).
- Landmarks: one `<header>`, one `<main>`, one `<footer>` per page; skip-to-content link as the first focusable element.
- Respect `prefers-reduced-motion` per §15.

## 20. CTA Design
Two patterns only:
1. **Inline CTA**: within a section, primary button + optional secondary ghost button, left-aligned with the section's heading block.
2. **CTA band**: full-width dark/gradient section near the page end ("Let's build something exceptional") — centered H2, one-line subcopy, single primary button (on-dark variant), radial accent glow behind content, appears once per page max (usually just before footer, omitted on the Contact page itself).

## 21. Component Naming Standards
- Files: PascalCase per component (`ServiceCard.jsx`), colocated in `components/ui` (primitives: Button, Input, Badge, Card), `components/layout` (Navbar, Footer, MobileNav), `components/sections` (Hero, ServicesGrid, TestimonialSlider, CtaBand — page-section-scoped, often data-driven via props), `components/admin` (DataTable, AdminSidebar, StatCard, form fields for CRUD screens).
- Props: data-in via plain props/objects (no context for section components); shared UI state (mobile nav open, theme) via small dedicated context providers in `lib/providers`.
- Section components accept a `className` passthrough for spacing overrides but own their internal `py-*` rhythm by default.
- Tailwind class order: layout → spacing → sizing → typography → color → effects (roughly `clsx`/editor-default order); use `cn()` helper (`lib/utils.js`, clsx-based) for conditional classes, never string concatenation.
