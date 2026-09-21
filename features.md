# Features — Dev World (IT Services)

Feature inventory for the site. Status reflects the staged build plan.

Legend: ✅ built & verified (lint + build) · ⚠️ built, not yet tested against a live DB

> **Backend status:** all models, auth, and API routes below are implemented and pass `npm run build`, but have not been exercised against a live MongoDB instance yet — local install via winget failed (winget couldn't reach its package CDN in this environment, even though general internet access worked). Switching to MongoDB Atlas instead; waiting on a connection string. Public pages currently render from the `/data/*.js` files (the exact content the seed script loads into MongoDB) rather than live DB reads, so the site works fully today with zero setup. Once `MONGODB_URI` in `.env.local` points at a reachable database, run `npm run seed`, then admin login/CRUD can be verified end-to-end.

## Public Website

| Page | Route | Notes | Status |
|---|---|---|---|
| Home | `/` | Hero, services grid, why-us, process teaser, portfolio teaser, testimonial spotlight, tech marquee, CTA band | ✅ |
| About | `/about` | Story, stats, values, team grid | ✅ |
| Services (hub) | `/services` | All 18 services grid, links into SEO detail pages | ✅ |
| Technologies | `/technologies` | Stack grouped by category | ✅ |
| Industries | `/industries` | Industry verticals served | ✅ |
| Process | `/process` | 6-stage timeline with deliverables | ✅ |
| Portfolio | `/portfolio` | Client-filterable project grid | ✅ |
| Case Studies | `/case-studies`, `/case-studies/[slug]` | Index + deep-dive detail w/ metrics, SSG | ✅ |
| Testimonials | `/testimonials` | Full client quote wall | ✅ |
| Pricing | `/pricing` | Fixed Scope / Dedicated Team / Enterprise | ✅ |
| Careers | `/careers` | Culture, perks, open roles, application form (RHF → `/api/careers/apply`) | ✅ |
| Blog | `/blog`, `/blog/[slug]` | Listing + article page, SSG | ✅ |
| FAQs | `/faqs` | Categorized accordion | ✅ |
| Contact | `/contact` | Form (RHF → `/api/contact`), office info | ✅ |
| Privacy / Terms / Cookies | `/privacy` `/terms` `/cookies` | Legal pages | ✅ |
| Sitemap / Robots | `/sitemap.xml`, `/robots.txt` | `app/sitemap.js`, `app/robots.js` | ✅ |
| 404 | `not-found.js` | On-brand not-found page | ✅ |

## Service Detail Pages (SEO)

Single dynamic template `app/(site)/services/[slug]/page.js`, content from `data/services.js` + `data/serviceDetails.js` (mirrors the `Service` Mongoose model exactly — see `scripts/seed.mjs`), `generateStaticParams` + `generateMetadata` + JSON-LD Service schema. All 18 services below are live and statically generated.

`web-development` · `mobile-app-development` · `ui-ux-design` · `cloud-solutions` · `ai-integration` · `ai-chatbot-development` · `saas-product-development` · `crm-development` · `erp-development` · `ecommerce-development` · `api-development` · `devops-cloud-infrastructure` · `website-maintenance` · `performance-optimization` · `digital-product-consulting` · `business-automation` · `qa-testing` · `enterprise-software-development`

## Backend / Data Model (MongoDB via Mongoose)

| Model | Purpose | Status |
|---|---|---|
| `AdminUser` | Admin auth (email, hashed password, role) | ⚠️ |
| `Service` | Services hub + SEO detail pages + admin Services Management | ⚠️ |
| `Technology` | Tech stack entries | ⚠️ |
| `Project` | Portfolio entries (also backs Portfolio admin) | ⚠️ |
| `CaseStudy` | Long-form project write-up (challenge/solution/results, metrics) | ⚠️ |
| `BlogPost` | Blog articles | ⚠️ |
| `Testimonial` | Client quotes | ⚠️ |
| `TeamMember` | About page team grid | ⚠️ |
| `FAQ` | FAQ accordion entries | ⚠️ |
| `JobOpening` | Careers open roles | ⚠️ |
| `ContactSubmission` | Contact form submissions | ⚠️ |
| `CareerApplication` | Career applications | ⚠️ |
| `Media` | Uploaded file metadata — backs Media Library (`public/uploads`) | ⚠️ |
| `HeroBanner` | Per-page hero override | ⚠️ |
| `SeoMeta` | Per-page SEO overrides | ⚠️ |
| `NewsletterSubscriber` | Footer newsletter signups | ⚠️ |

`npm run seed` populates all of the above except `ContactSubmission`/`CareerApplication` (created by visitors) and `Media` (created by admin uploads) from the `/data/*.js` files, plus creates one `AdminUser` from `ADMIN_EMAIL`/`ADMIN_PASSWORD` in `.env.local`.

## Admin Panel

Route group `/admin`, protected by `proxy.js` (Next.js 16's middleware successor — Node.js runtime, JWT httpOnly cookie check). Solid, non-glass UI per design.md §11. All screens below are built as generic `ResourceManager` CRUD tables + slide-over forms, pending live-DB verification.

| Screen | Route | Notes | Status |
|---|---|---|---|
| Login | `/admin/login` | Email/password → `/api/admin/login` | ⚠️ |
| Dashboard | `/admin` | Submission/application counts, recent activity | ⚠️ |
| Projects Management | `/admin/projects` | CRUD `Project` | ⚠️ |
| Portfolio Management | `/admin/portfolio` | Same `Project` model; featured flag curated here | ⚠️ |
| Blog Management | `/admin/blog` | CRUD `BlogPost` | ⚠️ |
| Testimonials | `/admin/testimonials` | CRUD `Testimonial` | ⚠️ |
| Contact Submissions | `/admin/submissions` | Status-update only, no delete (archive instead) | ⚠️ |
| Career Applications | `/admin/applications` | Status-update only, no delete | ⚠️ |
| Team Members | `/admin/team` | CRUD `TeamMember` | ⚠️ |
| Services Management | `/admin/services` | CRUD core `Service` fields (title/slug/short/overview/order/published) | ⚠️ |
| Technologies Management | `/admin/technologies` | CRUD `Technology` | ⚠️ |
| FAQs | `/admin/faqs` | CRUD `FAQ` | ⚠️ |
| SEO Management | `/admin/seo` | CRUD `SeoMeta` per page key | ⚠️ |
| Media Library | `/admin/media` | Upload/browse/delete, local `public/uploads` storage | ⚠️ |
| Hero Banner Management | `/admin/hero-banners` | CRUD `HeroBanner` per page key | ⚠️ |

Note: `Service.keyFeatures`/`processSteps`/`technologies`/`faqs` (nested arrays) and `BlogPost.tags`/`coverImage` are seeded and API-editable via raw PATCH, but not yet exposed as structured fields in the admin form UI — only flat/simple fields are. Extending `ResourceFormPanel` with array-field editors would be the next increment there.

## Cross-cutting

- **SEO**: `generateMetadata` per page, OpenGraph/Twitter cards, JSON-LD Service schema on service detail pages, `app/sitemap.js`, `app/robots.js`.
- **Performance**: `next/font` subsetting, route-level code splitting, GSAP/Lenis client-only, CSS-gradient visuals instead of stock photography (no unoptimized image weight).
- **Accessibility**: skip-to-content link, landmarks, focus-visible rings, labeled form fields with `aria-describedby` errors — see design.md §19.
- **Forms**: Contact, Career Application, Newsletter signup — all React Hook Form → Route Handlers → MongoDB, with matching required-field validation client and server side.
