# Design System — Dev World

The design rules for the public site (`app/(site)`) and the admin panel (`app/admin`), taken from the code as it is now. Every component in `/components` should follow a rule in this file. If you need a pattern that is not covered here, add it here first, then build it.

> **Two design languages live in this repo.**
> - **Public site**: dark, cinematic, orange→red gradient, Host Grotesk, sizes in `vw`, GSAP motion. Everything inside `.site-body`. This is most of this file (§1–§20).
> - **Admin panel**: light, data-dense, indigo accent, Geist, Tailwind tokens. See §21.
>
> Never mix them: no `bg-accent`, `text-ink-*` or `Button.jsx` on the public site, and no orange gradient in the admin.

---

## 1. Brand personality

Cinematic · Confident · Warm · Precise · Tactile.

- The page is **near-black**. One warm **orange→red gradient** carries the brand. White type does the rest.
- Quality comes from **big type, generous space and motion** (letters roll, masks open, lines draw, strings vibrate), not from decoration.
- Every interactive element reacts when touched: pills fill, arrows swap, underlines grow, dividers pluck.
- No purple/blue "SaaS" gradients, no drop-shadow cards, no stock icon clutter on the public site.

---

## 2. Color

### 2.1 Core palette (public site)

Shared values live in `constants/theme.js`. Page-level values live in `app/globals.css`.

| Role | Value | Where it is used |
|---|---|---|
| **Page / html background** | `#050505` | `html`, `body`, `.site-body`, `viewport.themeColor` |
| **Section background** | `#070707` | `Section`, every home section, footer, process preview, grid layer behind the hero |
| **Card surface** | `#161616` | `ServiceCard`, team cards, image placeholders (`ProjectCard`, blog cover) |
| **Avatar fallback surface** | `#1a1a1a` | Testimonial initials avatar |
| **Mega-menu panel** | `#0b0b0b` at 85% (`bg-[#0b0b0b]/85`) | `ServicesMegaMenu` |
| **Light image matte** | `#F4EFE9` | Behind the "Selected Work" stacked images |
| **Primary text** | `#ffffff` | All headings and primary copy |
| **Dark text on white** | `#111111` (button label), `#070707` (button dot), `#000`/`text-black` (badge, active arrow badge) | White pills, "Most popular" badge |

### 2.2 Brand orange & gradient

| Token | Value | Use |
|---|---|---|
| `GRADIENT` | `bg-linear-to-r from-[#F16B0D] to-[#E61416]` | Tailwind class: dots, fills, menu button, close button, active avatar ring, highlighted pricing card, "Selected Work" stage |
| `GRADIENT_CSS` | `linear-gradient(to right, #F16B0D, #E61416)` | Inline backgrounds: gradient `RollButton`s (Submit, Subscribe, Get a Quote), skip link |
| **Brand orange** | `#F16B0D` | Category labels, icons in circles, check marks, tag hover border, case-study result numbers, `::selection` bg, focus ring |
| `ACCENT` | `#E8620F` | Numbered labels ("01", "02"…), ValueCard icon and underline, legal section numbers. Always set inline: `style={{ color: ACCENT }}` |
| **Timeline dot** | `#F06A0E` | Unlit dots on the "Selected Work" list and the Process timeline |
| **Star / name orange** | `#ff6b00` | Rating stars, testimonial author names, `RollButton` default bg / hover text |
| **Input focus** | `#ff5f00` | `focus:border-[#ff5f00]` on all public form fields |

Gradient direction is always **left→right** (`to right`), orange first, red second. Never reverse it, never angle it, never add a third stop.

### 2.3 Hero background (`HERO_BACKGROUND`)

The warm layered gradient behind the home hero, every `PageHero`, the mobile menu and the 404 page:

```
background-color: #180d08;
radial-gradient(65% 55% at 92% 6%,  #F0640D 0%, transparent 65%)   ← top-right glow
radial-gradient(60% 55% at 4% 82%,  #EC690F 0%, transparent 65%)   ← bottom-left glow
radial-gradient(75% 80% at 48% 42%, #B01205 0%, transparent 70%)   ← deep red core
linear-gradient(180deg, #D8470A 0%, #C0300A 28%, #B01205 46%, #7A1C08 68%, #2A1108 88%, #180D08 100%)
```

Apply it with `style={HERO_BACKGROUND}`. Do not copy it into a class. Inner page heroes end with a fade into the page: `absolute bottom-0 h-[35%] bg-linear-to-b from-transparent to-[#070707]`.

### 2.4 White opacity scale (text, borders, fills on dark)

Every gray on the public site is **white at an opacity**. There are no gray hex values.

| Opacity | Text use | Border / fill use |
|---|---|---|
| `white` (100%) | Headings, nav links, primary copy, PageHero description | Progress lines, lit dots, white pill bg |
| `/90` | Tagline on the highlighted pricing card | — |
| `/85` | Blog body, testimonial wall quote, tags, tech wordmarks | — |
| `/80` | Section descriptions, FAQ answers, ValueCard text, eyebrow, timeline text, mobile sub-links | — |
| `/75` | Legal paragraphs, case-study summary | — |
| `/70` | Footer sub-copy, office address, PageHero meta, testimonial quote, inactive service description | — |
| `/65` | Blog excerpt, job meta | — |
| `/60` | Card client line, stat labels, team role, newsletter note, pricing tagline | — |
| `/55` | RowList description, mega-menu descriptions, case result labels | — |
| `/50` | Process row descriptions, small uppercase column / detail labels | Unlit dot border (`rgba(255,255,255,0.5)`) |
| `/45` | Blog meta (author · date), empty select text | Input placeholder `#ffffff73` (≈45%) |
| `/40` | — | String divider stroke `rgba(255,255,255,0.4)` |
| `/30` | — | Arrow badges, footer glass card border |
| `/25` | — | Team initials circle |
| `/20` | — | **Default border**: pills, tags, icon circles, filters, FAQ/arrow buttons, service card, progress rail, ValueCard base line |
| `/15` | — | Dividers in footer / legal / case list, input fill (`bg-white/15`) and input border, mega-menu border |
| `/10` | — | Glass card border, FAQ row divider, stat column divider |
| `/5` | — | Glass fill (`bg-white/5`), tag fill, hover fill in mega menu, social button fill |

### 2.5 Status colors (public forms)

- Success message: `text-green-500`, `text-sm`.
- Error message: `text-red-500`, `text-xs` (field) / `text-sm` (form).
- Error border: `border-red-400` (focus stays `red-400`).

### 2.6 Color rules

1. Orange appears in **small doses**: one dot, one label, one icon, one number per block. The only full-surface gradients are the menu button, the "Selected Work" stage, the highlighted pricing card, the hover fill of a card, and the mobile menu (hero background).
2. On a gradient surface all text and icons become **white** (e.g. active `ServiceCard`: icon `#F16B0D` → `white`, description `white/70` → `white`).
3. Text on a white pill is `#111111`. On hover the pill fills with the dot color and the text flips (see §9).
4. Sections are **all dark**. Rhythm comes from spacing, dividers and the warm hero/gradient moments, not from light/dark alternation. There are no light sections on the public site.
5. Selection: `::selection { color: #070707; background: #f16b0d; }`.

---

## 3. Typography

### 3.1 Font

- **Host Grotesk**, self-hosted from `styles/fonts/` via `next/font/local` (`lib/fonts.js`), exposed as `--font-host-grotesk`, `display: swap`.
- Loaded weights: **300 Light · 400 Regular · 500 Medium · 600 SemiBold**.
- `.site-body, .site-body *` force `font-family: var(--font-host-grotesk), sans-serif`. Do not set another family inside the site.
- Base: `font-weight: 400; color: #fff;` with `-webkit-font-smoothing: antialiased` and `text-rendering: optimizeLegibility`.
- Inside `.site-body` the weight utilities use `!important` (`font-light` 300, `font-normal` 400, `font-medium` 500, `font-bold` 700), so they always win.

### 3.2 Weight rules

| Weight | Use |
|---|---|
| **300 Light** (`font-light`) | Big numbers only: stat values, pricing price, case-study result values |
| **400 Regular** | **All headings** (H1–H3) and all body copy. Headings get their weight from size, not boldness |
| **500 Medium** (`font-medium`) | Tech wordmarks in TechStack, `RollButton` default label (usually overridden to `font-normal`) |
| 600 / 700 | Loaded but not used on the public site. Do not add bold headings |

### 3.3 Fluid sizing model

All public type is sized in **`vw`** with three steps:

| Step | Applies at | Prefix |
|---|---|---|
| Desktop | > 1025px | (none) |
| Tablet | ≤ 1025px | `max-[1025px]:` |
| Phone | < 768px | `max-md:` |

Write sizes as `text-[Xvw] max-[1025px]:text-[Yvw] max-md:text-[Zvw]`. Do not use fixed `text-xl` etc. on the site, except inside form controls and the copyright row (see 3.8).

### 3.4 Headings

All headings: **white, weight 400, normal tracking**, revealed with `TextReveal` (characters, `stagger={0.015}`) unless noted.

| Role | Desktop / Tablet / Phone | Line height | Where |
|---|---|---|---|
| 404 display | `7.5vw` / `12vw` / `14vw` | `1.05!` | `app/not-found.js` |
| Home hero H1 | `6.6vw` / `11vw` / `13vw` | `1.1!` | "Engineering Exceptional Software" |
| Page hero H1 | `6vw` / `9vw` / `11vw` | `1.05!` | `PageHero` (every inner page) |
| Section H2, large (`size="lg"`) | `5.5vw` / `7vw` / `9vw` | `1.15` (SectionHeading) · `1.2` (home sections) | SectionHeading, Services, Process, WhyUs, FAQ, TechStack (`max-lg:7vw`, `max-md:8vw`) |
| Testimonials H2 | `5.2vw` / `7vw` / `9vw` | `1.2!` | Testimonials |
| "Selected Work" H2 | `5.5vw` / `6.5vw` / `9vw` | default | Portfolio |
| Contact modal title | `4.8vw` / `5vw` / `8vw` | `1.1!` | "Get in Touch" popup |
| Section H2, medium (`size="md"`) | `4vw` / `6vw` / `8.5vw` | `1.15` | Contact, Careers form, "Built on Proven Technology" |
| Footer CTA | `3.4vw` / `5vw` / `7.5vw` | `1.15` | "Let's Build Something Exceptional" (right-aligned, center on tablet) |
| Timeline step title | `3.4vw` / `6vw` / `8.5vw` | `1.1` | Process page |
| Case-study list title | `3.2vw` / `6vw` / `8vw` | `1.15` | `/case-studies` (stagger `0.01`) |
| Service card title (H3) | `2.2vw` / `4.6vw` / `6.5vw` | `1.15` | `ServiceCard`, margin-bottom `1vw` |
| Value card title (H3) | `2vw` / `4.2vw` / `5.8vw` | `1.2` | `ValueCard`, margin-bottom `1.5vw` / `2vw` |
| Pricing plan name | `2vw` / `4.5vw` / `6.5vw` | default | Pricing |
| Legal section H2 | `1.9vw` / `3.8vw` / `5.6vw` | `1.25` | `LegalContent` (number in `ACCENT`) |
| Row title (H3) | `1.8vw` / `3.4vw` / `5.5vw` | `1.25` | `RowList`, home Process rows (line reveal) |
| Card title (H3) | `1.6vw` / `3.4vw` / `5.5vw` | `1.25` | `ProjectCard`, blog card, footer newsletter heading (`1.2`) |
| FAQ question | `1.5vw` / `2.6vw` / `4.2vw` | default | FAQ |
| Portfolio list client | `1.5vw` / `3.5vw` / `5.5vw` | default | "Selected Work" list |

Rules:
- **One H1 per page**: the hero (or PageHero) title only.
- Headings use **Title Case** ("Full-Stack Digital Services Under One Roof").
- Two-line section titles break with `<br />` on purpose; keep each line short.
- Big headings get no tracking changes and no weight changes.

### 3.5 Sub-headings, leads and body

| Role | Desktop / Tablet / Phone | Line height | Color |
|---|---|---|---|
| Section lead / description | `1.25vw` / `2.5vw` / `4.5vw` | `1.5` | `white/80` (home sections: `white`) — line reveal |
| Page hero description | `1.25vw` / `2.6vw` / `4.3vw` | `1.45` | `white` — line reveal, `delay 0.5` |
| Hero side labels | `1.25vw` / `3.5vw` / `4.5vw` | `1.15` | `white`, right-aligned on desktop |
| Article body (blog) | `1.35vw` / `2.6vw` / `4.2vw` | `1.7` | `white/85`, `mb-[1.8vw]` between paragraphs |
| Timeline description | `1.3vw` / `2.6vw` / `4.2vw` | `1.55` | `white/80` |
| Testimonial wall quote | `1.3vw` / `2.6vw` / `4.2vw` | `1.55` | `white/85` |
| Value card text | `1.25vw` / `2.8vw` / `4vw` | normal | `white/80` |
| FAQ answer | `1.25vw` / `2.2vw` / `3.8vw` | `1.6` | `white/80` |
| Row description | `1.25vw` / `2.4vw` / `4vw` | `1.5` | `white/55` (home Process: `white/50`, `tracking-wide`) |
| Case-study summary | `1.25vw` / `2.6vw` / `4.2vw` | `1.5` | `white/75` |
| Legal paragraph | `1.2vw` / `2.5vw` / `4vw` | `1.7` | `white/75` |
| Service card bullets | `1.15vw` / `2.8vw` / `4vw` | normal | `white`, with a `size-1.5` white dot |
| Service card description | `1.1vw` / `2.6vw` / `4vw` | normal | `white/70` → `white` when active |
| Testimonial quote (slider) | `1.145vw` / `2.2vw` / `3.6vw` | `1.6` | `white/70`, wrapped in “ ” |
| Blog excerpt | `1.05vw` / `2.4vw` / `4vw` | `1.5` | `white/65` |
| Small / meta line | `1vw` / `2.2vw` / `3.8vw` | normal | `white/60` (PageHero meta `white/70`) |
| Blog meta (author · date) | `0.95vw` / `2vw` / `3.4vw` | normal | `white/45` |

Reading width: long text sits in a centered column of **`w-[55%]`** (desktop) → `w-[80%]` (tablet) → `w-full` (phone). Section descriptions are at most `w-[80%]` of the heading block (`w-[55%]` when centered).

### 3.6 Labels & eyebrows

| Role | Desktop / Tablet / Phone | Style |
|---|---|---|
| **Eyebrow** (`Eyebrow.jsx`) | `1vw` / `2.2vw` / `3.4vw` | Uppercase, `tracking-[0.12em]`, `white/80` (white on heroes), preceded by a gradient dot `0.5vw` / `1.2vw` / `2vw`, gap `0.7vw` / `1.6vw` / `2.4vw`. Margin below `1.5vw` / `3vw` (`1.8vw` / `4vw` in PageHero) |
| Card category | `0.95vw` / `2vw` / `3.4vw` | Uppercase, `tracking-[0.12em]`, `#F16B0D`, `mt-[1.4vw]` under the image |
| Detail label (contact page) | `0.95vw` / `2vw` / `3.2vw` | Uppercase, `tracking-[0.12em]`, `white/50` |
| Footer column title | `1vw` / `2vw` / `3.4vw` | Uppercase, `tracking-wider`, `white/50`, `mb-5` |
| Mega-menu group title | `0.9vw` | Uppercase, `tracking-wider`, `white/50`, `mb-[1.5vw]` |
| Number label ("01") | `1.25vw` / `2.6vw` / `4vw` | `ACCENT` (`#E8620F`); inline before a title it's followed by `&nbsp;&nbsp;` |
| "Most popular" badge | `0.85vw` / `2vw` / `3.2vw` | White pill, black text, `px-[0.9vw] py-[0.3vw]` |

Eyebrow copy: 1–3 words ("Our values", "Open roles", "Keep exploring"). Sentence case in the source; CSS makes it uppercase.

### 3.7 Numbers

| Role | Desktop / Tablet / Phone | Style |
|---|---|---|
| Stat value | `6vw` / `10vw` / `13vw` | `font-light`, `leading-none`, `tabular-nums`, white; counts up (§15) |
| Stat label | `1.15vw` / `2.4vw` / `3.8vw` | `white/60`, shown **above** the number (`flex-col-reverse`) |
| Pricing price | `3.6vw` / `8vw` / `11vw` | `font-light`, `leading-none` |
| Case result value | `2.4vw` / `5vw` / `6.5vw` | `font-light`, `#F16B0D`; label `0.95vw`, `white/55` |

### 3.8 Fixed-size text (exceptions)

- Form controls: `text-sm` (inputs, selects, phone), errors `text-xs`, status `text-sm`.
- Copyright row: `text-lg` → `max-md:text-sm`.
- Social icons: `w-5 h-5` image in `p-2.5` circle.

---

## 4. Layout & grid

### 4.1 Page frame

- Everything is full-bleed: sections are `w-screen`; `body` is `width: 100vw; overflow-x: hidden`.
- **Side padding**: `px-[4vw]` desktop → `max-[1025px]:px-[5vw]` (tablet and phone). FAQ uses `px-[10vw]` on desktop for a narrower column.
- There is no `max-w-*` container on the public site. Width is controlled with percentages (`w-[60%]`, `w-[55%]`…).

### 4.2 Grids

| Pattern | Desktop | Tablet | Phone | Gap |
|---|---|---|---|---|
| Service grid | 3 cols | 2 | 1 | `1.6vw` / `2.5vw` / `5vw` |
| Portfolio / blog grid | 3 | 2 | 1 | x `2vw`/`3vw`, y `4vw`/`8vw`/`12vw` |
| Why-us cards | 4 | 1 | 1 | none (cards carry padding) |
| Values / capabilities / challenge-solution | 2 | 2 | 1 | `4vw` (y `10vw` on phone) |
| Perks | 3 | 2 | 1 | x `3vw`, y `4vw` |
| Industries | 4 | 2 | 1 | x `3vw`, y `5vw`/`10vw` |
| Team | 4 | 3 | 2 | `1.6vw` / `3vw` |
| Pricing | 3 | 1 | 1 | `1.6vw` / `5vw` |
| Testimonial wall | 3 | 2 | 1 | `1.6vw` / `3vw` / `5vw` |
| Stats | 4 (or 3) | 2 | 2 | column dividers `border-white/10` |
| Text + form | `minmax(0,1fr) minmax(0,1.4fr)` | 1 col | 1 col | `4vw` / `8–10vw` |
| Footer middle row | `minmax(0,1.1fr) minmax(0,1.6fr)` | 1 col | 1 col | `6vw` / `gap-12` |
| Case-study list | 2 cols, image side alternates | 1 | 1 | `4vw` / `6vw` |
| Tech wordmarks | 5 cols | 5 | 3 | `3vw` / `6vw` |

---

## 5. Breakpoints

Defined in `constants/breakpoints.js` and mirrored in class names:

| Name | Query | Used for |
|---|---|---|
| Tablet and below | `(max-width: 1025px)` → `max-[1025px]:` | Second size step, hamburger menu, single-column layouts |
| Phone | `< 768px` → `max-md:` | Third size step |
| Small phone | `(max-width: 639px)` | `RollButton` switches from hover to tap |
| Desktop (JS) | `innerWidth > 1024` | Mouse parallax, TechStack 3-D distances, curve travel |
| Phone (JS) | `≤ 541px` | Services row end offset |
| Reduced motion | `(prefers-reduced-motion: reduce)` | §17 |

Desktop is the design reference; tablet and phone override it with `max-*` variants. Hide/show with `max-[1025px]:hidden` and `hidden max-[1025px]:flex`.

---

## 6. Spacing

Spacing is also in `vw` and follows the same three steps.

| Context | Desktop | Tablet | Phone |
|---|---|---|---|
| Section padding (`Section`) | `py-[7vw]` | `py-[12vw]` | `py-[12vw]` |
| Section directly under a PageHero | `pt-[3vw]` (or `pt-[4vw]`) | — | — |
| Stacked sections (continuing content) | `pt-0` | — | — |
| Heading → content | `mt-[4vw]`–`mt-[5vw]` | `mt-[8vw]`–`mt-[10vw]` | — |
| Heading → description | `mt-[1.5vw]` | `mt-[4vw]` | — |
| Description → button | `mt-[2.5vw]` | `mt-[6vw]` | — |
| Section H2 bottom margin (home) | `mb-[4vw]`–`mb-[6vw]` | `mb-[8vw]` | — |
| Row padding (RowList) | `py-[2.2vw]` | `py-[6vw]` | — |
| Card padding | `p-[1.6vw]`–`p-[2.4vw]` | `p-[3vw]`–`p-[5vw]` | `p-[4vw]`–`p-[7vw]` |
| Glass form card | `p-[3vw]` | `p-8` | `p-6` |
| Footer top | `pt-[10vw]` | — | `pt-[20vw]` |
| PageHero | `pt-[14vw] pb-[7vw]`, `min-h-[90vh]` | `pt-[30vw] pb-[12vw]`, `min-h-[70vh]` | `pt-[40vw]`, `min-h-[85vh]` |

Rule: tablet values are about **2×** desktop, phone values about **3–4×** desktop (in `vw`).

---

## 7. Radius

| Shape | Value | Where |
|---|---|---|
| **Pill** | `rounded-full` | Buttons, tags, filters, inputs, icon circles, avatars, dots |
| Textarea | `rounded-3xl` | Contact / career message field |
| Card | `rounded-lg` | `ServiceCard`, team card, process preview image |
| Media frame | `rounded-xl` → `max-[1025px]:rounded-lg` | Project/blog covers, "Selected Work" images, `ParallaxImage` (ends at `0.75rem`) |
| Mega menu inner link | `rounded-[1vw]` | Featured service rows |
| Mega menu panel | `rounded-[1.5vw]` | `ServicesMegaMenu` |
| Glass card | `rounded-[2vw]` → `rounded-[4vw]` (tablet) → `rounded-3xl` (phone) | `GLASS_CARD`, contact modal (`max-md:rounded-3xl`) |
| Testimonial card | `rounded-[2vw]` → `rounded-[5vw]` | Slider card |
| Footer card | `rounded-4xl` | Footer glass panel |
| Skip link | `0 0 1rem 0` | Accessibility link |

No square corners on interactive elements.

---

## 8. Surfaces, glass & depth

- **No box shadows on the public site**, with two exceptions: the mega-menu panel and the process preview (`shadow-2xl`). Depth comes from blur, borders and layering.
- **Glass card** (`GLASS_CARD`): `rounded-[2vw] border border-white/10 bg-white/5 backdrop-blur-lg`. Used for the pricing cards, contact/career form wrappers, testimonial wall and contact modal.
- **Footer glass**: `rounded-4xl bg-black/5 border border-white/30 backdrop-blur-2xl px-12 py-12`, over `footer-bg.svg`.
- **Mega menu**: `bg-[#0b0b0b]/85 backdrop-blur-2xl border-white/15 p-[2.5vw]`.
- **Modal backdrop**: `bg-black/10 backdrop-blur-lg`.
- **Header**: transparent; adds `backdrop-blur-lg` after the page scrolls 40% of the viewport, or while the mega menu is open (`transition-[backdrop-filter] duration-500`).
- **Dark card**: `bg-[#161616] border border-white/20 rounded-lg`.

---

## 9. Buttons

### 9.1 `RollButton` (the only public CTA)

A pill with a small dot on the left. On hover the dot scales `×120` and fills the pill, and the letters roll up to a copy of themselves.

| Property | Desktop | Tablet | Phone |
|---|---|---|---|
| Height | `3.5vw` | `8vw` | `12vw` |
| Padding x | `2vw` | `3.5vw` | `5vw` |
| Gap | `0.9vw` | `1.6vw` | `2.4vw` |
| Dot size | `0.5vw` | `1.5vw` | `2.3vw` |
| Label size (usual) | `1.05vw`–`1.15vw`, `font-normal` | `2.6vw`–`3vw` | `4.2vw` |

Motion:
- Letters: `translateY(-1.3em)`, `0.6s cubic-bezier(0.625, 0.05, 0, 1)`, **10 ms stagger per letter**. The copy is a `text-shadow: 0 1.3em currentColor`.
- Dot: `scale(1) → scale(120)`, `400ms cubic-bezier(0.785, 0.135, 0.15, 0.86)`.
- Text color crossfades over `0.6s`.
- Small phones (≤ 639px): a tap plays the hover state for **1 s**.
- Screen readers get an `sr-only` copy of the label.

Two variants only:

| Variant | `bgColor` | `dotColor` | `textColor` | `hoverTextColor` | Use |
|---|---|---|---|---|---|
| **White** (default) | `#ffffff` | `#070707` | `#111111` | `#ffffff` | Navigation CTAs: Get in Touch, View All…, Start a Project, Back to Home |
| **Gradient** | `GRADIENT_CSS` | `#ffffff` | `#ffffff` | `#111111` | Form submits (Send Message, Subscribe, Submit Application), "Get a Quote" on regular pricing cards |

On the gradient (highlighted) pricing card the button flips to **White**. The header's "Get in Touch" adds `border border-white/20`.

Labels: 2–3 words, Title Case, verb first ("View All Work", "See Our Full Process"). Loading state swaps the label ("Sending...", "Subscribing...") and sets `aria-disabled`.

### 9.2 Round icon buttons

| Button | Size (D / T / P) | Look | Hover / state |
|---|---|---|---|
| Menu (tablet/phone) | `8vw` / `12vw` | Gradient circle, two white bars `h-0.5 w-[35%]` | Bars rotate `±45°` into an X, `500ms ease-in-out` |
| Close (modal) | `size-14` / `11` / `9` | Gradient circle, X of `w-4 h-0.5` bars | Bars spin to `225°`/`135°`, `500ms` |
| FAQ toggle | `size-14` / `11` / `9` | `border-white/20` circle, + icon | Gradient fills from center (`scale-0→100`, `300ms`) on hover **and** while open; vertical bar rotates `90°→0°` (plus → minus) |
| Slider arrows | `size-12` / `10` | `border-white/20`, `white/80` arrow | Gradient fills from center, arrow turns white |
| Arrow badge (cards) | `3vw` / `7vw` / `9–10vw` | `border-white/30`, white arrow (`bg-black/20 backdrop-blur-md` on images) | Arrow exits to top-right (`translate 150%`), copy enters from bottom-left, `300ms ease-out`. Active service card: `bg-white text-black` |
| Social | `p-2.5` | `border bg-white/5` | White disc scales in from center, icon inverts, button scales to `0.95`, `300ms` |

### 9.3 Text links

- `.under-multi` inside `.under-multi-parent`: a 1px white underline grows **from left to right** on hover/focus (`background-size 0% → 100% 1px`, `1s cubic-bezier(0.16, 1, 0.3, 1)`).
- Use for footer links, card titles, mega-menu "Explore" links, "Apply →", "Read the case study ↗", inline links.
- Arrow suffix: `→` for in-page actions, `ArrowUpRightIcon` for navigation to another page.

### 9.4 Filters (portfolio)

Pill `px-[1.5vw] py-[0.7vw] text-[1.05vw]`, `border-white/20 text-white/80`. Hover: gradient scales in at 30% opacity. Active: full gradient, transparent border, white text, `aria-pressed`. `500ms cubic-bezier(0.16,1,0.3,1)`.

### 9.5 Tags

`TagList`: pill `border-white/20 bg-white/5 px-[1.1vw] py-[0.45vw] text-[1vw] text-white/85`; hover `border-[#F16B0D] text-white` (`300ms`). Gap `0.6vw` / `1.5vw` / `2vw`.

---

## 10. Cards

| Card | Anatomy | Hover / active |
|---|---|---|
| **ServiceCard** (`row`: `27vw × 30vw` → `55×65vw` → `75×85vw`; `grid`: `min-h-[24vw]`) | `#161616`, `border-white/20`, `rounded-lg`, `p-[1.6vw]`. Top: outline icon (`2.6vw`, `#F16B0D`) + arrow badge. Bottom: H3 + bullets or description | **One card filled at a time**: the gradient floods in through a radial mask (`--reveal` −40% → 100%, `0.45s power2.out`). The first card starts filled. Icon and text turn white, arrow badge turns white |
| **ProjectCard** | Cover `aspect-[4/3]` (or `16/9`), `rounded-xl`, arrow badge top-right → category → title (`under-multi`) → client | Image `scale-105` over `700ms cubic-bezier(0.16,1,0.3,1)`; arrow swap; underline grows |
| **Blog card** | Cover `aspect-[16/10]` → category → title → excerpt → author · date | Same as ProjectCard |
| **ValueCard** | Optional outline icon (50px, `ACCENT`) or number → H3 → text → 1px `white/20` line at the bottom (`mt-[3vw]`) | An `ACCENT` line draws over the base line **from the left** on enter and leaves **to the right** on exit (`0.55s power2.out`) |
| **Team card** | `#161616`, `border-white/15`, `rounded-lg`; initials circle (`5vw`, `border-white/25`) → name (`1.4vw`) → role (`white/60`) | Gradient rises from the bottom (`translate-y-full → 0`, `500ms`); circle turns white with black text; role turns white |
| **Pricing card** | `GLASS_CARD`, `p-[2.4vw]`: name + badge → tagline → price → feature list (top border `white/20`, `HiCheck` in `#F16B0D`) → full-width button | Highlighted plan: full gradient fill, white checks, white button, "Most popular" badge |
| **Testimonial wall card** | `GLASS_CARD`, `p-[2.2vw]`: stars (`#ff6b00`) → quote → author (`#ff6b00`, `1.4vw`) → role | Border turns `#F16B0D/60` (`500ms`) |
| **Testimonial slider card** | `w-3/5`, `bg-white/5 border-white/10`, fixed height `30vw` / `52vw` / `95vw`; avatars overlap its top edge | Swipe to change (drag follows at 50%, threshold 100px) |

---

## 11. Icons

- **Service & industry icons**: Heroicons v2 through `components/ui/Icon.jsx`, always `variant="outline"` (thin line). Names come from data (`HiCloud`…) so content stays serializable.
- **UI icons**: inline Lucide SVGs in `components/common/Icons.jsx` (`ArrowUpRightIcon`, `ArrowIcon` with stroke `1.6`, `ChevronDownIcon`, Rocket, Sparkles, Zap). Stroke `currentColor`, round caps and joins, `aria-hidden`.
- **Inline detail icons**: `react-icons/hi2` solid (`HiEnvelope`, `HiPhone`, `HiMapPin`, `HiBriefcase`, `HiClock`, `HiCheck`, `HiMiniStar`), sized in `em` (`size-[1.1em]`) or `%` of their circle (`size-[40%]`).
- **Color**: brand orange `#F16B0D` (or `ACCENT` in ValueCards) on dark; white on gradient.
- **Icon in a circle**: `rounded-full border border-white/20`, icon centered, `#F16B0D`. Contact page `3.4vw` / `8vw` / `12vw`; mega menu `2.8vw` (gradient fills on hover and the icon turns white).
- Social icons are SVG files in `public/images/icons/` (`linkedin`, `twitter`, `github`).
- Decorative icons always get `aria-hidden="true"`.

---

## 12. Dividers & lines

| Line | Look | Behavior |
|---|---|---|
| **StringDivider** | 1px, `rgba(255,255,255,0.4)` | Draws in from the left (`scaleX 0→1`, `0.8s power2.inOut`, at `top 85%`). It is a **pluckable guitar string**: moving the mouse across bends it; leaving makes it vibrate (damping `0.95`/frame) and play a note (`lib/pluckSound.js`). The hover area grows from 40px to 150px. Used between RowList rows, home Process rows and around Stats |
| Static divider | `border-t border-white/15` (lists, footer, legal) · `border-b border-white/10` (FAQ rows) · `border-white/20` (mobile menu, pricing list) | — |
| Progress rail | `w-px bg-white/20` (portfolio) / `bg-white/15` (timeline) with a white `w-px` line growing over it (`scaleY`, origin top) | Scrubbed by scroll |
| Timeline / list dot | `10px` circle, `#F06A0E` fill, `white/50` border | Lights up: `#fff` fill and border, `scale 1.4` (timeline) |
| Active nav dot | `0.4vw` gradient circle before the label | `scale-0 → scale-100`, `500ms` |
| Vertical splitter | `border-l border-white/10` | Mega menu "Explore" column, stat columns |

---

## 13. Header & navigation

- `fixed inset-0 z-99 h-fit`, `py-[1.5vw] px-[4vw]` → `py-[3vw] px-[5vw]` → `py-4`. Starts at `opacity-0`.
- **Entrance**: home: slides in at the end of the hero intro (`yPercent -50→0`, `0.8s power3.out`, at 1.8 s). Other pages: same tween with `0.2s` delay.
- **Scroll**: hides on scroll down (`yPercent -100`) and returns on scroll up (`0.5s power3.out`); stays visible while a menu is open. Blur after `0.4 × innerHeight`.
- **Logo**: `logo.svg`, `w-[12vw]` → `25vw` → `34vw`, `priority`.
- **Desktop nav** (`> 1025px`): Services, Portfolio, About, Blog, Careers. `text-[1.05vw]`, gap `2.4vw`, `RollText` letter roll on hover/focus, gradient dot for the active page (`aria-current="page"`).
- **Right side**: "Get in Touch" white `RollButton` (hidden on phone) + gradient menu button (tablet/phone only).
- **Mega menu** (hover or focus on "Services"): 3-column featured services (icon circle, `1.05vw` title, `0.85vw white/55` description) + "Explore" column (`1.15vw` links). Opens `opacity 0→1, y -16→0, 0.5s power3.out` with items staggered `0.03s`; closes `0.3s power2.in`. Closes on Esc, mouse leave, focus leave, or route change.
- **Mobile menu** (≤ 1025px): full screen with `HERO_BACKGROUND`, `z-98`. Opens with a top-down clip-path wipe (`inset(0 0 100% 0) → inset(0)`, `0.8s power4.inOut`), then lines slide up (`yPercent 110→0`, `0.7s`, stagger `0.05`), then the bottom block fades (`0.6s`). Links `7vw` / `10vw`, `border-b border-white/20`. Services expands into an accordion with a rotating `+`. Includes Explore links, Get in Touch, email/phone, socials. Locks scroll (Lenis stop + `overflow: hidden`), traps focus, closes on Esc.

---

## 14. Footer

1. **Background**: `#070707` + `footer-bg.svg` pinned to the bottom (`-bottom-20`; `scale-[5]` on phone).
2. **Glass card** (drifts up `yPercent 12→0` while the footer scrolls in, desktop only):
   - **Top row**: logo (`22vw` / `34vw` / `46vw`) left; on the right a CTA heading (`3.4vw`), sub-copy (`1.15vw white/70`, "we'll respond within one business day") and a white "Start a Project" button. On tablet the order flips and everything centers.
   - **Middle row** (top border `white/15`): newsletter (heading `1.6vw`, note `1vw white/60`, pill input + gradient Subscribe) | 3 link columns (Company, Work, Resources).
   - **Bottom row**: "Reach Out" (uppercase `1.25vw`): phone, email (underline links), office (`white/70`) | social icons.
3. **Copyright row** outside the card: `© YEAR Dev World. All rights reserved.` + legal links, `text-lg`, `py-8 pt-12`; stacked and centered on phone.

---

## 15. Motion

### 15.1 Stack

- **GSAP 3** + ScrollTrigger + SplitText + `useGSAP`. Always import from `@/lib/gsap` (plugins are registered there).
- **Lenis** smooth scrolling for the whole site (`context/SmoothScrollProvider.jsx`, default settings). Stop it (`lenis.stop()`) for overlays and the hero intro, and restart it afterwards. Scrollable overlays use `data-lenis-prevent`.
- CSS transitions for small hover states.
- `framer-motion` is only used by the admin `Button.jsx`. Do not use it on the public site.

### 15.2 Easing & timing

| Name | Value | Use |
|---|---|---|
| Default site ease | `cubic-bezier(0.16, 1, 0.3, 1)` (`--default-ease`) | Underlines, image zoom, filter/team fills |
| Letter roll | `cubic-bezier(0.625, 0.05, 0, 1)`, 0.6 s | RollButton, RollText |
| Dot fill | `cubic-bezier(0.785, 0.135, 0.15, 0.86)`, 0.4 s | RollButton dot |
| GSAP entrances | `power2.out` (fades, fills), `power3.out` (text, header, menus, accordion) | Most tweens |
| Wipes | `power4.inOut` | Mobile menu |
| Scrubbed | `ease: "none"` | Progress lines, parallax, TechStack |
| Spring | `back.out(1.6)`, 0.65 s | Process preview following the hovered row |

Standard durations: **0.3 s** (small hover), **0.45–0.6 s** (fills, accordions, letter roll), **0.8 s** (fade-ups, header), **0.7 s** (image zoom), **1 s** (underline).

### 15.3 Patterns

| Pattern | Spec |
|---|---|
| **TextReveal (chars)** | SplitText into masked characters, each slides up from `yPercent 100`; `0.5s power3.out`; stagger `0.015` for headings (default `0.03`); starts at `top 85%`. Waits for the font so lines break correctly |
| **TextReveal (lines)** | Masked lines slide up, stagger `0.1` |
| **FadeUp** | Children `opacity 0, y 40 → 1, 0`, `0.8s power2.out`, stagger `0.08`, batched at `top 88%`, once |
| Section item fade | Same values, per item at `top 85%` (FAQ, timeline cards, testimonials `stagger 0.12` at `top 70%`) |
| **Stats count-up** | `1.6s power3.out`, snaps to integers, from 0 (years from value − 40), at `top 80%`, once |
| **ParallaxImage** | Frame un-clips `inset(12% 4% 0 4% round 1.5vw) → inset(0 round 0.75rem)`; image drifts `yPercent -8 → 8` |
| **Mouse parallax** (desktop) | Hero image ±30px, text ±12px, opposite to the cursor, eased `0.08` per frame. PageHero text ±12px |
| **PageHero exit** | Text `yPercent -25`, `opacity 0.15` as the hero scrolls away |
| **Accordion** | Height `0 ↔ auto`, `0.45s power3.out` (FAQ `0.5s`). One open at a time; first starts open |
| **Modal** | Backdrop fade + content `scale 0.8→1`; open `0.7s power3.out`, close `0.5s power2.in` |

### 15.4 Home page scroll story

1. **Hero** (`h-[300vh]`, sticky stage): intro — portrait revealed by a diagonal mask (`--reveal -40%→125%`, 3.5 s), title at 1 s, side labels at 1.5 s, header at 1.8 s, then Lenis starts. On scroll the stage scales to `0.5` and the screenshot grid behind it un-blurs (`blur 24px → 0`, `opacity 0.35 → 1`). The grid columns scroll upward forever (10 s and 18 s loops).
2. **Selected Work** (`90vh` per project, gradient stage): an orange curved shape narrows (`ellipse 150% → 60%`), each project image slides up over the previous one (the old one dims to `brightness 0.3`), the progress line grows and dots light up; scroll snaps to each project.
3. **Why Dev World**: 4 value cards fade up (`yPercent 10`, stagger `0.05`).
4. **Stats** between two string dividers.
5. **Services** (`h-[275vh]`): the card row slides sideways (`xPercent 70 → end`) while scrolling.
6. **Process**: rows with string dividers; on desktop a floating image preview springs to the hovered row and the new image pops in (`scale 0 → 1.05`).
7. **TechStack** (`h-[240vh]`): wordmarks fly out of depth in groups of 2–3 (`z -2200 → 0 → +1800`, blur 10px → 0 → 10px) past a sticky statement.
8. **Testimonials** slider, then **FAQ** (top 5 questions + "View All FAQs").

### 15.5 Motion rules

- Animate only `transform`, `opacity`, `filter`, `clip-path` and CSS variables (`--reveal`).
- Every scroll animation is set up inside `useGSAP` (auto cleanup). Hold animations with `start={false}` until their parent is ready.
- Every animation needs a reduced-motion branch (§17).

---

## 16. Imagery

- **Formats**: `.webp` for photos/screens, `.svg` for logo, icons and footer art. Use `next/image` with correct `sizes`.
- **Hero portrait**: `hero-man.webp`, `object-contain`, not draggable, `fetchPriority="high"`, decorative (`alt=""`).
- **Project covers**: full-bleed `object-cover` in rounded frames on `#161616` placeholders.
- **Screenshots** (`public/images/showcase`, `portfolio`): fill their frames edge to edge, no device mockups.
- Decorative images get `alt=""`; content images get real alt text (e.g. `"${title} cover"`).
- Avatars: circular, `object-cover object-top`. Without a photo show the initials on `#1a1a1a`.

---

## 17. Accessibility

- **Skip link** to `#main-content` (gradient, shows at top-left on focus).
- **Focus ring**: `outline: 2px solid #f16b0d; outline-offset: 3px` on `:focus-visible` across the site. Never remove it.
- **Reduced motion** (always check `prefers-reduced-motion`):
  - TextReveal becomes a single fade (`y 24 → 0`, 0.8 s).
  - Marquees stop; the strings can't be plucked; the Services row becomes a static 3/2/1 grid (`globals.css`); the Portfolio crossfades instead of sliding and does not snap; parallax, count-up and the header hide-on-scroll are off; menus and modal use short fades (0.15–0.2 s).
- **Split text**: letter-split labels are `aria-hidden` with an `sr-only` copy.
- **Dialogs** (modal, mobile menu): `role="dialog"`, `aria-modal`, focus trap or initial focus, Esc to close, focus returns to the opener, `inert` when closed.
- **ARIA**: `aria-current="page"` on active nav, `aria-expanded`/`aria-controls` on toggles, `aria-pressed` on filters, `aria-live="polite"` on form status, slider and filtered grid, `aria-label` on icon-only buttons, ratings as `aria-label="Rated N out of 5"`.
- **Forms**: every field has a label (`sr-only`; the label doubles as placeholder), `aria-invalid` + `aria-describedby` for errors.
- **Contrast**: body text on `#070707` stays at `white/55` or brighter. `white/45` is for meta text only.

---

## 18. Forms

- Wrap public forms in `.get-in-touch-form` (placeholders `#ffffff73`).
- **Text input / select**: `h-14 rounded-full pl-5 pr-4 text-sm text-white bg-white/15 border border-white/15`, `focus:border-[#ff5f00]`, `300ms`.
- **Textarea**: same, `rounded-3xl py-4 min-h-36`, resizable vertically.
- **Select**: custom white chevron at `right-5`; empty value shows in `white/45`; options are black text.
- **Phone**: pill with country picker (flag, dial code, chevron) + `h-6 w-px bg-gray-200` divider; the dropdown is a white list (`rounded-md`, `max-h-52`).
- **Layout**: 2-column grid (`gap-x-[1vw] gap-y-[1.2vw]`), `half: true` fields share a row; 1 column on phone.
- **Validation** on submit; an error clears as soon as the field is edited. Messages: "{Field} is required.", "Invalid email address.", "Enter a full URL, starting with https://", "Invalid phone number."
- **Submit**: gradient `RollButton`; status message shows for **7 s**.
- Newsletter: one pill input + gradient Subscribe, stacked on phone.

---

## 19. Copy & CTAs

- **Primary CTA everywhere**: "Get in Touch" → opens the contact modal (`useContactModal().openModal()`), never a page jump. The footer's version is "Start a Project".
- Section CTAs lead deeper: "View All Work", "View All Services", "See Our Full Process", "View All FAQs".
- Promise in contact copy: "we'll respond within one business day".
- Voice: confident and plain. Short sentences, no hype words, no exclamation marks in headings.

---

## 20. Code conventions

- **Files**: `PascalCase.jsx` components; folders `animations/` (motion wrappers), `common/` (reusable site blocks), `home/` (home sections), `layout/` (header, footer, hero), `ui/` (form controls, modal, accordion), `admin/`.
- **Class merging**: `cn()` from `lib/utils` (clsx + tailwind-merge).
- **Tokens**: import `GRADIENT`, `GRADIENT_CSS`, `ACCENT`, `HERO_BACKGROUND`, `GLASS_CARD` from `constants/theme.js`; breakpoints from `constants/breakpoints.js`. Do not retype the gradient.
- **Size class order**: base → `max-[1025px]:` → `max-md:`.
- **Data** lives in `/data`; components receive it through props. Icons are referenced by name strings.
- **Formatting**: Prettier, `printWidth: 120`.
- **Server first**: pages are Server Components; interactive pieces are `"use client"` leaves (`ContactButton`, `ApiForm` exist for that).

---

## 21. Admin panel design

The admin keeps a separate light, utility-first design. Tokens are in `:root` / `@theme inline` in `app/globals.css`.

| Token | Value | Use |
|---|---|---|
| `ink` / `ink-soft` / `ink-border` | `#0a0c10` / `#12151c` / `#22262f` | Sidebar background, hover, borders |
| `paper` / `paper-soft` / `paper-border` | `#fbfbfc` / `#f2f3f6` / `#e4e6eb` | Page bg (`bg-paper-soft`), hover rows, borders |
| `ink-900 … ink-500` | `#101317`, `#1a1e25`, `#2b303a`, `#454b57`, `#676e7a` | Text on light (900 = primary, 500 = muted) |
| `mist-200 … 400` | `#d7d9e0`, `#b4b8c4`, `#8b8fa3` | Text on the dark sidebar |
| `accent` / `accent-bright` | `#5b5fef` / `#7b7fff` | Primary buttons, focus rings, "Admin" in the logo |
| `success` / `danger` / `warning` | `#22c55e` / `#ef4444` / `#f59e0b` | Status, destructive actions, warnings |

- **Font**: Geist Sans (`--font-geist-sans`), Geist Mono for the logo and code-like values.
- **Layout**: dark sidebar `w-64` (hidden below `lg`) + white topbar `h-16 border-b` + content `p-6 lg:p-10`.
- **Radius**: `rounded-[14px]` buttons, `rounded-[8px]` inputs, `rounded-md` small controls. Tokens: `--radius-sm 8px`, `--radius-md 14px`, `--radius-lg 20px`, `--radius-xl 28px`.
- **Shadows**: `.shadow-elev-sm` `0 1px 2px / 6%`, `.shadow-elev-md` `0 8px 24px / 8%`, `.shadow-elev-lg` `0 20px 48px / 12%` (color `10,12,16`).
- **Buttons** (`components/ui/Button.jsx`): variants `primary`, `secondary`, `secondary-dark`, `ghost`, `on-dark`; sizes `sm h-9`, `md h-11`, `lg h-14`; arrow nudges `4px` on hover; scale `1.02`/`0.98`.
- **Fields** (`components/ui/FormField.jsx`): `rounded-[8px] border-paper-border bg-white px-4 py-3 text-sm`, focus `ring-2 ring-accent`; required star and errors in `danger`.
- **Text**: `text-sm` default, `text-2xl` page titles, `font-semibold` headings, `text-ink-500` for meta.

---

## 22. Known inconsistencies (clean up when touching these files)

1. **Five oranges** are in use: `#F16B0D` (brand), `#E8620F` (`ACCENT`), `#F06A0E` (dots), `#ff6b00` (stars, author names, RollButton defaults), `#ff5f00` (input focus). Target: `#F16B0D` for everything except `ACCENT` numbers; move the rest into `constants/theme.js`.
2. `GRADIENT` is retyped as `bg-linear-to-r from-[#F16B0D] to-[#E61416]` in `CloseButton` and the testimonial `ArrowButton`. Import `GRADIENT` instead.
3. Two section backgrounds: `#050505` (page) and `#070707` (sections). Keep both, but never use a third near-black.
4. Home section headings use `leading-[1.2]`; `SectionHeading` uses `1.15`. Pick one when the two meet on a page.
5. `RollButton` defaults (`#ff6b00` bg, `font-medium text-[1.5vw]`) are never used as-is. Always pass one of the two variants from §9.1.
