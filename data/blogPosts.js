export const blogPosts = [
  {
    slug: "scaling-nextjs-apps-to-millions-of-users",
    title: "Scaling Next.js Apps to Millions of Users",
    excerpt:
      "Lessons learned from taking a Next.js app from thousands to millions of monthly visitors without a rewrite.",
    category: "Engineering",
    author: "David Okafor",
    date: "2026-08-12",
    gradient: "from-accent/40 via-ink-soft to-cyan/30",
    content: `Scaling a Next.js application isn't just about adding servers — it's about making deliberate architectural choices early. In this post we walk through caching strategy, ISR tuning, and database connection pooling patterns that let one of our clients grow 40x without a full rewrite.

We start with the rendering strategy: mixing static generation for marketing pages with ISR for semi-dynamic content, and streaming server components for anything truly real-time. Then we cover edge caching, image optimization at scale, and how we instrument Core Web Vitals to catch regressions before users do.`,
  },
  {
    slug: "designing-ai-chatbots-that-users-trust",
    title: "Designing AI Chatbots That Users Actually Trust",
    excerpt:
      "The UX patterns that separate a chatbot users tolerate from one they rely on.",
    category: "AI",
    author: "Mei Lin",
    date: "2026-07-28",
    gradient: "from-cyan/30 via-ink-soft to-accent/40",
    content: `Trust in conversational AI is earned through predictability, not cleverness. We cover the design patterns that make AI assistants feel dependable: clear capability boundaries, graceful fallback to human support, and transparent citations when the bot pulls from your knowledge base.`,
  },
  {
    slug: "choosing-between-fixed-scope-and-dedicated-team",
    title: "Choosing Between Fixed-Scope and a Dedicated Team",
    excerpt:
      "A practical framework for deciding how to structure your next engagement.",
    category: "Product Strategy",
    author: "Aisha Rahman",
    date: "2026-06-15",
    gradient: "from-accent/30 via-ink-soft to-accent-bright/30",
    content: `Not every project fits the same engagement model. This post breaks down when a fixed-scope contract protects you, and when a dedicated team model gives you the flexibility a fast-moving product actually needs.`,
  },
];
