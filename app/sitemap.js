import { services } from "@/data/services";
import { caseStudies } from "@/data/caseStudies";
import { blogPosts } from "@/data/blogPosts";

const baseUrl = "https://devworld.example.com";

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/technologies",
  "/industries",
  "/process",
  "/portfolio",
  "/case-studies",
  "/testimonials",
  "/pricing",
  "/careers",
  "/blog",
  "/faqs",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
];

export default function sitemap() {
  const now = new Date();

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const serviceEntries = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const caseStudyEntries = caseStudies.map((c) => ({
    url: `${baseUrl}/case-studies/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogEntries = blogPosts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...serviceEntries, ...caseStudyEntries, ...blogEntries];
}
