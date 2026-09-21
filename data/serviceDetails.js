// Extended per-service content for the SEO detail page template
// (app/services/[slug]/page.js). Keyed by slug; merged onto the base
// records in data/services.js. This is the exact shape Stage 4's
// `Service` Mongoose model and seed script mirror, so admin-managed
// content and this static fallback stay structurally identical.

const sharedProcess = [
  { title: "Discover", description: "Workshop your goals, users, and technical constraints." },
  { title: "Design & Architect", description: "Plan the technical approach and validate the experience." },
  { title: "Build", description: "Ship in weekly sprints with full visibility into progress." },
  { title: "Launch & Support", description: "Deploy, monitor, and iterate based on real usage." },
];

export const serviceDetails = {
  "web-development": {
    overview:
      "We design and build fast, accessible, SEO-friendly web applications on modern frameworks like Next.js and React — from marketing sites to complex, data-heavy dashboards. Every build is engineered for Core Web Vitals, maintainability, and long-term scale.",
    keyFeatures: [
      { title: "Server-rendered performance", description: "SSR/ISR architectures that load fast and rank well." },
      { title: "Design system driven", description: "Consistent, reusable components from day one." },
      { title: "Headless CMS integration", description: "Content teams get autonomy without touching code." },
      { title: "Full accessibility compliance", description: "WCAG 2.1 AA as a baseline, not an afterthought." },
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL"],
    faqs: [
      { q: "Do you work with our existing design system?", a: "Yes — we can build against your existing components or create a new design system from scratch." },
      { q: "Can you migrate our site from WordPress/Webflow?", a: "Yes, we regularly migrate legacy sites to modern frameworks with zero SEO regression." },
      { q: "How do you handle hosting and deployment?", a: "We typically deploy to Vercel or your cloud of choice, with CI/CD pipelines set up from day one." },
    ],
  },
  "mobile-app-development": {
    overview:
      "From cross-platform apps in React Native and Flutter to fully native Swift and Kotlin builds, we ship mobile products that feel fast, polished, and native to each platform — with App Store and Play Store launch handled end to end.",
    keyFeatures: [
      { title: "Native-grade performance", description: "Smooth animations and instant interactions on both platforms." },
      { title: "Offline-first architecture", description: "Apps that work reliably even with spotty connectivity." },
      { title: "Push notifications & deep linking", description: "Full engagement infrastructure built in." },
      { title: "App store launch support", description: "We handle submission, review, and release management." },
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "GraphQL"],
    faqs: [
      { q: "Should we build native or cross-platform?", a: "It depends on your performance needs and budget — we'll recommend the right approach after a technical discovery call." },
      { q: "Do you handle App Store/Play Store submission?", a: "Yes, end to end, including handling review feedback and re-submissions." },
      { q: "Can you maintain our existing app?", a: "Yes — see our Website Maintenance service, which also covers mobile app support retainers." },
    ],
  },
  "ui-ux-design": {
    overview:
      "We research, prototype, and validate interfaces before a single line of production code is written — so what we build is what users actually need. Our design process pairs user research with rapid, testable prototypes.",
    keyFeatures: [
      { title: "User research & testing", description: "Validate decisions with real users, not assumptions." },
      { title: "Interactive prototypes", description: "Click-through Figma prototypes before development starts." },
      { title: "Design systems", description: "Scalable component libraries your team can extend." },
      { title: "Accessibility-first design", description: "Inclusive design baked into every screen." },
    ],
    technologies: ["Figma", "Framer", "Maze", "Storybook", "Tailwind CSS"],
    faqs: [
      { q: "Do you do user research, or just visual design?", a: "Both — we typically start with lightweight research to validate direction before high-fidelity design." },
      { q: "Can you redesign our existing product?", a: "Yes, we frequently run redesigns alongside usage analytics review to prioritize what matters most." },
      { q: "Will we get the Figma source files?", a: "Yes, you retain full ownership of all design files." },
    ],
  },
  "cloud-solutions": {
    overview:
      "We architect and manage cloud infrastructure on AWS, GCP, and Azure that scales predictably and fails gracefully — with infrastructure as code, cost optimization, and security baked in from the start.",
    keyFeatures: [
      { title: "Infrastructure as code", description: "Reproducible environments via Terraform." },
      { title: "Auto-scaling architecture", description: "Handle traffic spikes without manual intervention." },
      { title: "Cost optimization audits", description: "Regular reviews to cut unnecessary cloud spend." },
      { title: "Multi-region resilience", description: "Architected for high availability and disaster recovery." },
    ],
    technologies: ["AWS", "Google Cloud", "Azure", "Terraform", "Kubernetes", "Docker"],
    faqs: [
      { q: "Which cloud provider do you recommend?", a: "It depends on your existing stack and compliance needs — we'll make a recommendation after reviewing your requirements." },
      { q: "Can you migrate us from on-prem to cloud?", a: "Yes, including phased migrations that minimize downtime." },
      { q: "Do you offer ongoing infrastructure management?", a: "Yes, via a DevOps retainer — see our DevOps & Cloud Infrastructure service." },
    ],
  },
  "ai-integration": {
    overview:
      "We embed LLMs and machine learning into real product workflows — from intelligent search to automated content generation — with a focus on reliability, cost control, and measurable business impact.",
    keyFeatures: [
      { title: "LLM-powered features", description: "Search, summarization, and generation built into your product." },
      { title: "RAG pipelines", description: "Ground AI responses in your own data, accurately." },
      { title: "Cost & latency optimization", description: "Model selection and caching tuned for your scale." },
      { title: "Human-in-the-loop safeguards", description: "Guardrails that keep AI output trustworthy." },
    ],
    technologies: ["OpenAI", "LangChain", "Python", "Pinecone", "PostgreSQL"],
    faqs: [
      { q: "Do we need our own AI/ML team?", a: "No — we handle the model selection, integration, and infrastructure end to end." },
      { q: "How do you keep AI costs predictable?", a: "Through model right-sizing, caching, and usage monitoring built into the architecture." },
      { q: "Can you integrate with our existing data?", a: "Yes, via RAG pipelines that ground responses in your proprietary data securely." },
    ],
  },
  "ai-chatbot-development": {
    overview:
      "We design and build conversational agents trained on your business data — for customer support, internal knowledge, or sales — with clear escalation paths to humans when the bot reaches its limits.",
    keyFeatures: [
      { title: "Trained on your data", description: "Grounded in your docs, FAQs, and support history." },
      { title: "Multi-channel deployment", description: "Web, WhatsApp, Slack, and more from one backend." },
      { title: "Human handoff", description: "Seamless escalation when the bot can't help." },
      { title: "Conversation analytics", description: "See exactly where the bot succeeds and struggles." },
    ],
    technologies: ["OpenAI", "LangChain", "Node.js", "Pinecone", "Twilio"],
    faqs: [
      { q: "Will the chatbot hallucinate answers?", a: "We ground responses in your verified data and add confidence thresholds that trigger human handoff instead of guessing." },
      { q: "Can it integrate with our CRM/helpdesk?", a: "Yes — we regularly integrate with tools like Zendesk, Intercom, and Salesforce." },
      { q: "How long does a chatbot build take?", a: "Typically 4–8 weeks depending on data complexity and integration scope." },
    ],
  },
  "saas-product-development": {
    overview:
      "From MVP to multi-tenant scale, we build SaaS products with the architecture decisions — billing, auth, permissions, multi-tenancy — handled correctly from day one so you don't have to re-platform later.",
    keyFeatures: [
      { title: "Multi-tenant architecture", description: "Built to scale from your first customer to your thousandth." },
      { title: "Billing & subscription logic", description: "Stripe-powered plans, trials, and usage-based billing." },
      { title: "Role-based access control", description: "Granular permissions for teams and enterprise customers." },
      { title: "Usage analytics built in", description: "Understand adoption from day one." },
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    faqs: [
      { q: "Can you help validate our idea before building?", a: "Yes, we can scope a lean MVP focused on testing your core hypothesis first." },
      { q: "Do you handle billing and subscriptions?", a: "Yes, including Stripe integration for plans, trials, and usage-based pricing." },
      { q: "What about multi-tenancy and enterprise features?", a: "We architect for multi-tenancy from the start so enterprise features are an extension, not a rebuild." },
    ],
  },
  "crm-development": {
    overview:
      "We build custom CRM systems and integrations tailored to your actual sales pipeline — not a generic template — so your team spends less time fighting the tool and more time closing deals.",
    keyFeatures: [
      { title: "Custom pipeline logic", description: "Modeled on how your sales team actually works." },
      { title: "Third-party integrations", description: "Connect email, calendar, and marketing tools natively." },
      { title: "Automation workflows", description: "Automate follow-ups, scoring, and task assignment." },
      { title: "Reporting dashboards", description: "Real-time visibility into pipeline health." },
    ],
    technologies: ["Node.js", "React", "PostgreSQL", "Salesforce API", "HubSpot API"],
    faqs: [
      { q: "Should we build custom or extend Salesforce/HubSpot?", a: "We'll help you decide — sometimes deep customization of an existing platform is more cost-effective than a custom build." },
      { q: "Can you migrate our existing CRM data?", a: "Yes, including data cleanup and deduplication during migration." },
      { q: "Do you integrate with our marketing stack?", a: "Yes, we regularly integrate CRMs with email, marketing automation, and analytics tools." },
    ],
  },
  "erp-development": {
    overview:
      "We build custom ERP systems that unify finance, inventory, and operations into one system of record — replacing spreadsheets and disconnected tools with a platform built around your actual processes.",
    keyFeatures: [
      { title: "Unified data model", description: "One source of truth across finance, inventory, and ops." },
      { title: "Custom workflow automation", description: "Approval chains and processes modeled to your business." },
      { title: "Role-based reporting", description: "The right visibility for finance, ops, and leadership." },
      { title: "Legacy system integration", description: "Connect to existing accounting and inventory tools." },
    ],
    technologies: ["Node.js", "PostgreSQL", "React", "REST APIs", "Docker"],
    faqs: [
      { q: "How long does an ERP build typically take?", a: "Most custom ERP projects run 4–9 months depending on module scope, often delivered in phased releases." },
      { q: "Can it integrate with our accounting software?", a: "Yes, we integrate with tools like QuickBooks, Xero, and NetSuite as needed." },
      { q: "Do you support on-prem deployment?", a: "Yes, for organizations with data residency or compliance requirements." },
    ],
  },
  "ecommerce-development": {
    overview:
      "We build high-converting storefronts and headless commerce architectures that handle real scale — fast checkout, robust inventory sync, and integrations with the payment and fulfillment tools you already use.",
    keyFeatures: [
      { title: "Headless commerce architecture", description: "Fast, flexible storefronts decoupled from the backend." },
      { title: "Payment & fulfillment integration", description: "Stripe, Shopify, and 3PL integrations done right." },
      { title: "Conversion-optimized checkout", description: "Reduce cart abandonment with a streamlined flow." },
      { title: "Inventory & catalog sync", description: "Real-time sync across channels and warehouses." },
    ],
    technologies: ["Next.js", "Shopify", "Stripe", "Node.js", "Algolia"],
    faqs: [
      { q: "Shopify, headless, or fully custom?", a: "We'll recommend the right architecture based on your catalog complexity, traffic, and customization needs." },
      { q: "Can you migrate us from our current platform?", a: "Yes, including product, customer, and order history migration with minimal downtime." },
      { q: "Do you handle multi-channel selling?", a: "Yes, including marketplace integrations like Amazon and social commerce channels." },
    ],
  },
  "api-development": {
    overview:
      "We design and build robust REST and GraphQL APIs, and handle the trickiest part of most projects — third-party integrations — with proper error handling, rate limiting, and documentation your team can actually use.",
    keyFeatures: [
      { title: "REST & GraphQL APIs", description: "Well-documented, versioned, and built to scale." },
      { title: "Third-party integrations", description: "Payment, CRM, and platform APIs connected reliably." },
      { title: "Webhook infrastructure", description: "Reliable event-driven communication between systems." },
      { title: "API security & rate limiting", description: "Protect your endpoints from abuse by design." },
    ],
    technologies: ["Node.js", "GraphQL", "REST", "PostgreSQL", "Redis"],
    faqs: [
      { q: "Do you provide API documentation?", a: "Yes, we deliver OpenAPI/GraphQL schema docs as a standard part of every API project." },
      { q: "Can you integrate with legacy systems?", a: "Yes, including SOAP and older systems that need a modern API layer in front of them." },
      { q: "How do you handle API versioning?", a: "We build versioning into the API from the start to avoid breaking existing consumers." },
    ],
  },
  "devops-cloud-infrastructure": {
    overview:
      "We build CI/CD pipelines, infrastructure as code, and observability stacks that let your team ship confidently and catch problems before your customers do.",
    keyFeatures: [
      { title: "CI/CD pipelines", description: "Automated testing and deployment on every push." },
      { title: "Infrastructure as code", description: "Reproducible, version-controlled environments." },
      { title: "Observability & alerting", description: "Know about issues before your customers report them." },
      { title: "Incident response setup", description: "Runbooks and on-call processes that actually work." },
    ],
    technologies: ["GitHub Actions", "Terraform", "Kubernetes", "Datadog", "Docker"],
    faqs: [
      { q: "Can you set this up alongside our existing team?", a: "Yes, we often work embedded alongside in-house engineers to transfer DevOps practices, not just hand off a black box." },
      { q: "Do you offer ongoing on-call support?", a: "Yes, via an SLA-backed support retainer." },
      { q: "What if we're not on the cloud yet?", a: "We can architect and execute a full cloud migration as part of this engagement." },
    ],
  },
  "website-maintenance": {
    overview:
      "Ongoing updates, security patching, and monitoring so your site stays fast, secure, and up to date — without you needing an in-house engineer watching it full time.",
    keyFeatures: [
      { title: "Proactive monitoring", description: "Uptime, performance, and error tracking around the clock." },
      { title: "Security patching", description: "Dependencies and CMS updates applied promptly." },
      { title: "Content & feature updates", description: "A dedicated queue for ongoing small requests." },
      { title: "Monthly health reports", description: "Clear visibility into site health and work completed." },
    ],
    technologies: ["Next.js", "WordPress", "Sentry", "Datadog", "GitHub Actions"],
    faqs: [
      { q: "What's included in a maintenance retainer?", a: "Monitoring, security patching, small feature requests, and a monthly health report — full scope is tailored to your site." },
      { q: "What if we need something urgent fixed?", a: "Retainer plans include defined response-time SLAs for urgent issues." },
      { q: "Can you take over a site you didn't build?", a: "Yes, we start with a technical audit to get familiar with the codebase before taking on ongoing maintenance." },
    ],
  },
  "performance-optimization": {
    overview:
      "We diagnose and fix what's actually slowing your product down — from bloated bundles to inefficient database queries — and tie every optimization back to Core Web Vitals and real user metrics.",
    keyFeatures: [
      { title: "Core Web Vitals audit", description: "Identify exactly what's hurting your scores." },
      { title: "Bundle & asset optimization", description: "Cut load times with code splitting and image optimization." },
      { title: "Database query tuning", description: "Fix the slow queries actually causing bottlenecks." },
      { title: "Real user monitoring", description: "Measure performance the way your users experience it." },
    ],
    technologies: ["Lighthouse", "Next.js", "PostgreSQL", "Redis", "Datadog"],
    faqs: [
      { q: "How fast will we see results?", a: "Most initial audits surface quick wins deliverable within the first 1–2 weeks." },
      { q: "Do you work on backend performance too?", a: "Yes — database query tuning and API latency are often bigger wins than frontend changes alone." },
      { q: "Can you set up ongoing performance monitoring?", a: "Yes, we implement real user monitoring so regressions get caught immediately." },
    ],
  },
  "digital-product-consulting": {
    overview:
      "Strategic guidance from roadmap to release — we help you make the hard calls on scope, architecture, and sequencing before you commit engineering resources to the wrong thing.",
    keyFeatures: [
      { title: "Product roadmap workshops", description: "Align stakeholders around a clear, prioritized plan." },
      { title: "Technical architecture review", description: "Catch costly mistakes before they're built." },
      { title: "Build vs. buy analysis", description: "Honest recommendations, not a sales pitch to build more." },
      { title: "Vendor & team evaluation", description: "Independent assessment of your current technical partners." },
    ],
    technologies: ["Figma", "Notion", "Linear", "Miro"],
    faqs: [
      { q: "Is this a one-time engagement or ongoing?", a: "Both are available — a single roadmap sprint, or an ongoing fractional CTO / product advisor arrangement." },
      { q: "Can you evaluate our current dev team or vendor?", a: "Yes, we offer independent technical and process audits." },
      { q: "Do you also implement the recommendations?", a: "Yes, consulting engagements often flow directly into a build engagement with the same team." },
    ],
  },
  "business-automation": {
    overview:
      "We automate the repetitive, manual workflows eating your team's time — connecting the tools you already use so data flows automatically instead of being copied between spreadsheets.",
    keyFeatures: [
      { title: "Workflow mapping", description: "Identify the highest-impact processes to automate first." },
      { title: "Cross-tool integrations", description: "Connect your CRM, helpdesk, and internal tools natively." },
      { title: "Custom internal tools", description: "Purpose-built dashboards for the workflows off-the-shelf tools can't handle." },
      { title: "Error monitoring & alerts", description: "Know immediately if an automation breaks." },
    ],
    technologies: ["Node.js", "Zapier", "n8n", "PostgreSQL", "REST APIs"],
    faqs: [
      { q: "What kinds of processes can you automate?", a: "Anything from lead routing and invoicing to reporting and internal approvals — if it's repetitive, it's likely automatable." },
      { q: "Do we need to replace our existing tools?", a: "Usually not — we connect and automate between the tools you already use." },
      { q: "How do you handle automation failures?", a: "Every automation ships with monitoring and alerting so failures are caught immediately, not discovered weeks later." },
    ],
  },
  "qa-testing": {
    overview:
      "Manual and automated testing that catches issues before your users do — from unit tests and end-to-end suites to structured manual QA cycles ahead of major releases.",
    keyFeatures: [
      { title: "Automated test suites", description: "Unit, integration, and end-to-end coverage that scales with your codebase." },
      { title: "Manual QA cycles", description: "Structured testing for edge cases automation misses." },
      { title: "Cross-browser & device testing", description: "Confidence across the real environments your users are on." },
      { title: "CI-integrated testing", description: "Tests run automatically on every pull request." },
    ],
    technologies: ["Playwright", "Jest", "Cypress", "GitHub Actions", "BrowserStack"],
    faqs: [
      { q: "Can you add testing to our existing codebase?", a: "Yes, we typically start with critical-path coverage and expand from there." },
      { q: "Do you do manual or only automated testing?", a: "Both — we combine automated regression coverage with manual QA for exploratory and edge-case testing." },
      { q: "Can this run as an ongoing QA retainer?", a: "Yes, for teams shipping frequently we offer an embedded QA retainer model." },
    ],
  },
  "enterprise-software-development": {
    overview:
      "We build mission-critical systems for organizations where compliance, security, and scale aren't optional — with the architecture, documentation, and process rigor enterprise environments require.",
    keyFeatures: [
      { title: "Compliance-aware architecture", description: "Built with SOC 2, HIPAA, or GDPR requirements in mind." },
      { title: "Legacy system integration", description: "Modern systems that work alongside what you already run." },
      { title: "Role-based security", description: "Granular access control across complex org structures." },
      { title: "Dedicated delivery governance", description: "Formal reporting and stakeholder processes at enterprise scale." },
    ],
    technologies: ["Java", "Node.js", "PostgreSQL", "Kubernetes", "Okta"],
    faqs: [
      { q: "Can you work within our existing compliance requirements?", a: "Yes, we regularly build within SOC 2, HIPAA, and GDPR constraints and can support your audit process." },
      { q: "How do you handle multi-stakeholder enterprise projects?", a: "With formal governance — steering committees, structured reporting, and clear escalation paths." },
      { q: "Do you integrate with our existing enterprise systems?", a: "Yes, including legacy systems, SSO providers, and internal APIs." },
    ],
  },
};

export function getServiceContent(slug) {
  const details = serviceDetails[slug];
  if (!details) return null;
  return { ...details, processSteps: sharedProcess };
}
