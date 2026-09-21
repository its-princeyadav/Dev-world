# Product Requirements Document — Dev World Website & Admin Platform

| | |
|---|---|
| **Status** | Draft — reflects the build as implemented through Stage 5 |
| **Owner** | Dev World (product/marketing) |
| **Last updated** | 2026-09-21 |
| **Related docs** | [`design.md`](./design.md) (design system) · [`features.md`](./features.md) (build/feature status) |

## 1. Overview

Dev World needs a premium, enterprise-grade marketing website that establishes credibility with prospective clients across 18 distinct service lines, plus a self-service admin panel so non-technical staff can keep content (services, portfolio, blog, team, FAQs, job postings) current without engineering involvement.

This document defines *what* the product must do and *why*. Implementation details live in `design.md` (visual/UX system) and `features.md` (current build status).

## 2. Problem Statement

Most IT-services agencies run on templated site builders that (a) look interchangeable with every competitor, (b) can't be extended with agency-specific content structures (18 service lines, case studies, careers), and (c) require a developer for every content change. Dev World needs a site that reads as top-tier custom engineering work — because it *is* Dev World's own portfolio piece — while remaining editable day-to-day by marketing staff, not engineers.

## 3. Goals & Success Metrics

| Goal | Metric |
|---|---|
| Establish premium credibility on first impression | Bounce rate on home page < industry benchmark; qualitative stakeholder sign-off on design |
| Generate qualified inbound leads | Contact form submissions/month; conversion rate from service pages → contact |
| Rank for service-specific search terms | Organic impressions/clicks per `/services/[slug]` page (18 pages targeting distinct keywords) |
| Support hiring | Career applications/month via `/careers` |
| Eliminate developer dependency for content updates | % of content changes (blog, portfolio, FAQs, team, services copy) made by non-engineering staff via `/admin` |
| Ship fast without technical debt | Clean `npm run build` / `npm run lint` maintained throughout; no blocking regressions between stages |

## 4. Target Users

| Persona | Needs |
|---|---|
| **Prospective client** (founder, CTO, product lead evaluating vendors) | Fast answers to "can they do X," proof via case studies/testimonials, low-friction way to start a conversation |
| **Job candidate** | Understand culture/perks, see open roles, apply without friction |
| **Marketing/content admin** (internal, non-technical) | Update services, publish blog posts, manage testimonials/team/FAQs, review leads — without touching code |
| **Site administrator** (internal, semi-technical) | Manage media assets, SEO metadata, hero banners; review and triage contact/career submissions |

## 5. Scope

### 5.1 In scope
- Public marketing site: Home, About, Services hub + 18 SEO-optimized service detail pages, Technologies, Industries, Process, Portfolio, Case Studies, Testimonials, Pricing, Careers (with application form), Blog, FAQs, Contact, legal pages (Privacy/Terms/Cookies), sitemap/robots.
- Admin panel (`/admin`): authenticated dashboard + CRUD management for Projects, Portfolio, Blog, Testimonials, Team, Services, Technologies, FAQs, SEO metadata, Media Library, Hero Banners; read/status-update for Contact Submissions and Career Applications.
- Backend: MongoDB-backed data model for all the above, REST-style API routes, JWT-based admin authentication.
- SEO fundamentals: per-page metadata, OpenGraph, JSON-LD structured data on service pages, sitemap, robots.
- Accessibility: WCAG-aligned forms, focus states, semantic landmarks, `prefers-reduced-motion` support.

### 5.2 Out of scope (this phase)
- Payment processing / e-commerce checkout on the marketing site itself (Pricing page is informational, not transactional).
- Multi-language / i18n.
- Third-party analytics, CRM, or marketing-automation integrations (structurally not precluded, just not implemented).
- Role-based permissions beyond a single `admin`/`editor` distinction on the `AdminUser` model (no granular per-resource permissions yet).
- Native mobile apps (the site itself is responsive web only).
- Automated resume parsing or applicant-tracking workflow beyond capturing and listing applications.

## 6. Functional Requirements

### 6.1 Public website
- Every page must be reachable from primary navigation or footer within 2 clicks of the home page.
- Services hub links to 18 individually addressable, SEO-indexable service detail pages, each with: overview, key capabilities, delivery process, technologies used, related case studies, FAQs.
- Contact form captures name, email, phone, company, service interest, and message; submission is persisted and visible in `/admin/submissions`.
- Career application form captures name, email, role applied to, LinkedIn/portfolio URL, and a cover note; submission is persisted and visible in `/admin/applications`.
- Footer newsletter field captures an email address for later marketing use.
- Portfolio supports client-side filtering by category without a full page reload.
- Blog and Case Studies each support an index view and an individually addressable detail view per entry.

### 6.2 Admin panel
- Access to any `/admin` route (other than `/admin/login`) requires a valid session; unauthenticated requests redirect to login.
- Dashboard surfaces: count of new contact submissions, count of new career applications, and totals for projects/blog posts/services, plus the 5 most recent submissions and applications.
- Each content type (Services, Technologies, Projects/Portfolio, Blog, Testimonials, Team, FAQs, SEO metadata, Hero Banners) supports create, edit, and delete through a consistent list + form UI.
- Contact Submissions and Career Applications support status transitions (e.g., new → read/archived, new → reviewing/interviewing/hired/rejected) but not deletion, so lead/candidate history is never silently lost.
- Media Library supports uploading a file, viewing all uploaded files, and deleting a file (removing both the database record and the stored file).
- Logging out invalidates the admin session cookie immediately.

### 6.3 Backend / data
- All content types listed in §6.2 are backed by a MongoDB collection with a corresponding REST-style API route requiring admin authentication for write operations.
- Public-facing content (service pages, blog, portfolio, etc.) is seedable from a single source of truth (`/data/*.js`) so the live site and a freshly seeded database never disagree on initial content.
- Passwords are never stored in plaintext; sessions use httpOnly, signed tokens.

## 7. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Performance** | Static generation for all public content pages where content doesn't require per-request freshness; no unoptimized image weight (gradient/CSS visuals in place of unsourced stock photography) |
| **Accessibility** | WCAG 2.1 AA color contrast; visible focus states on every interactive element; labeled form fields with programmatically associated error messages; `prefers-reduced-motion` respected across Framer Motion/GSAP/Lenis |
| **SEO** | Unique title/description per page; OpenGraph + Twitter card metadata; JSON-LD structured data on service pages; machine-readable sitemap and robots file |
| **Responsive design** | Fully usable from 375px mobile viewport through desktop; admin data tables remain usable on tablet+ |
| **Security** | Admin routes protected server-side (not just hidden client-side); JWT secret and DB credentials via environment variables, never committed; uploaded media restricted to the app's own storage directory |
| **Browser support** | Latest two versions of Chrome, Firefox, Safari, Edge |
| **Maintainability** | No dead code paths; shared CRUD logic (`lib/crudHandlers.js`) rather than per-resource duplication; a documented design system (`design.md`) governing all new UI |

## 8. Technical Architecture (summary)

Next.js (App Router, JavaScript) full-stack application — no separate backend service. Public pages and the admin UI are both served from the same Next.js app; Route Handlers under `app/api/**` talk directly to MongoDB via Mongoose. Styling via Tailwind CSS; motion via Framer Motion (component-level) and GSAP + ScrollTrigger (scroll-driven sequences), smooth-scrolled via Lenis. Authentication is a custom JWT-in-httpOnly-cookie scheme, enforced by `proxy.js` (Next.js's middleware layer) on all `/admin/*` routes and independently by each `/api/admin/*` handler. See `design.md` for the full design system and `features.md` for the current implementation/build status of every item in this document.

## 9. Key User Flows

1. **Prospective client inquiry**: Home/Service page → Contact → form submit → confirmation message shown → submission appears in `/admin/submissions` as "new."
2. **Job candidate application**: Careers page → open role → application form → submit → confirmation message shown → application appears in `/admin/applications` as "new."
3. **Admin content update**: Admin login → select content type from sidebar → edit or create a record via slide-over form → save → change reflected immediately in the admin list (and, for DB-backed public reads, on the live site).
4. **Admin triage**: Admin dashboard → recent submissions/applications → resource screen → update status as the lead/candidate is worked.

## 10. Milestones (as delivered)

| Stage | Scope | Status |
|---|---|---|
| 1 | Docs, scaffold, design system, global shell, Home page | ✅ |
| 2 | Remaining core public pages | ✅ |
| 3 | 18 SEO service detail pages | ✅ |
| 4 | MongoDB models, auth, API routes, seed script | ✅ built, ⚠️ pending live-DB verification |
| 5 | Admin panel (dashboard + CRUD for all content types) | ✅ built, ⚠️ pending live-DB verification |
| 6 | Polish: metadata sweep, accessibility/responsive QA, live-DB smoke test | ⏳ pending MongoDB connection |

## 11. Assumptions & Dependencies

- A reachable MongoDB instance (local or Atlas) is required for the admin panel and any DB-backed reads to function; the public site itself runs from static data with zero external dependencies.
- Single-tenant deployment: one Dev World site, one admin team — no multi-site or white-label requirement.
- Content volume (18 services, a handful of case studies/blog posts/team members) fits comfortably in MongoDB's free/starter tiers.

## 12. Open Questions

- Should `Service.keyFeatures` / `processSteps` / `technologies` / `faqs` (currently nested-array fields editable only via direct API PATCH, not the admin form UI) get dedicated structured editors in the admin panel, or is direct-record editing an acceptable long-term workflow for that lower-frequency content?
- Is a second admin role (e.g., "editor" with restricted permissions) needed before launch, or is a single shared admin login sufficient for the initial team size?
- Will Dev World want analytics (e.g., page views, form conversion tracking) surfaced in the admin dashboard in a future phase?
