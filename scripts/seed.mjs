// Seeds MongoDB with the same content already shipped as static data in
// /data, so the admin panel and DB-backed pages start with real content
// instead of an empty database.
//
// Usage: npm run seed   (reads MONGODB_URI from .env.local via --env-file)

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import Service from "../models/Service.js";
import Technology from "../models/Technology.js";
import TeamMember from "../models/TeamMember.js";
import Testimonial from "../models/Testimonial.js";
import FAQ from "../models/FAQ.js";
import JobOpening from "../models/JobOpening.js";
import CaseStudy from "../models/CaseStudy.js";
import BlogPost from "../models/BlogPost.js";
import AdminUser from "../models/AdminUser.js";

import { services } from "../data/services.js";
import { getServiceContent } from "../data/serviceDetails.js";
import { technologyGroups } from "../data/technologies.js";
import { team } from "../data/team.js";
import { testimonials } from "../data/testimonials.js";
import { faqs } from "../data/faqs.js";
import { jobOpenings } from "../data/jobOpenings.js";
import { caseStudies } from "../data/caseStudies.js";
import { blogPosts } from "../data/blogPosts.js";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set. Add it to .env.local before seeding.");
  process.exit(1);
}

async function seedServices() {
  const docs = services.map((s, i) => {
    const content = getServiceContent(s.slug);
    return {
      title: s.title,
      slug: s.slug,
      short: s.short,
      icon: s.icon,
      overview: content.overview,
      keyFeatures: content.keyFeatures,
      processSteps: content.processSteps,
      technologies: content.technologies,
      faqs: content.faqs,
      order: i,
      published: true,
    };
  });
  await Service.deleteMany({});
  await Service.insertMany(docs);
  console.log(`Seeded ${docs.length} services`);
}

async function seedTechnologies() {
  const docs = technologyGroups.flatMap((group) =>
    group.items.map((name, i) => ({ name, category: group.category, order: i }))
  );
  await Technology.deleteMany({});
  await Technology.insertMany(docs);
  console.log(`Seeded ${docs.length} technologies`);
}

async function seedTeam() {
  const docs = team.map((member, i) => ({
    name: member.name,
    role: member.role,
    order: i,
  }));
  await TeamMember.deleteMany({});
  await TeamMember.insertMany(docs);
  console.log(`Seeded ${docs.length} team members`);
}

async function seedTestimonials() {
  const docs = testimonials.map((t, i) => ({
    quote: t.quote,
    author: t.author,
    role: t.role,
    company: t.company,
    rating: t.rating,
    featured: i < 3,
    order: i,
  }));
  await Testimonial.deleteMany({});
  await Testimonial.insertMany(docs);
  console.log(`Seeded ${docs.length} testimonials`);
}

async function seedFaqs() {
  const docs = faqs.flatMap((group) =>
    group.items.map((item, i) => ({
      question: item.q,
      answer: item.a,
      category: group.category,
      order: i,
    }))
  );
  await FAQ.deleteMany({});
  await FAQ.insertMany(docs);
  console.log(`Seeded ${docs.length} FAQs`);
}

async function seedJobOpenings() {
  const docs = jobOpenings.map((job) => ({
    title: job.title,
    slug: job.slug,
    department: job.department,
    location: job.location,
    type: job.type,
    published: true,
  }));
  await JobOpening.deleteMany({});
  await JobOpening.insertMany(docs);
  console.log(`Seeded ${docs.length} job openings`);
}

async function seedCaseStudies() {
  const docs = caseStudies.map((c) => ({
    title: c.title,
    slug: c.slug,
    client: c.client,
    category: c.category,
    summary: c.summary,
    challenge: c.challenge,
    solution: c.solution,
    results: c.results,
    published: true,
  }));
  await CaseStudy.deleteMany({});
  await CaseStudy.insertMany(docs);
  console.log(`Seeded ${docs.length} case studies`);
}

async function seedBlogPosts() {
  const docs = blogPosts.map((p) => ({
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    content: p.content,
    author: p.author,
    category: p.category,
    published: true,
    publishedAt: new Date(p.date),
  }));
  await BlogPost.deleteMany({});
  await BlogPost.insertMany(docs);
  console.log(`Seeded ${docs.length} blog posts`);
}

async function seedAdminUser() {
  const email = (process.env.ADMIN_EMAIL || "admin@devworld.example.com").toLowerCase();
  const existing = await AdminUser.findOne({ email });
  if (existing) {
    console.log(`Admin user already exists (${email}), skipping`);
    return;
  }
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const passwordHash = await bcrypt.hash(password, 10);
  await AdminUser.create({ name: "Admin", email, passwordHash, role: "admin" });
  console.log(`Created admin user ${email} — set ADMIN_PASSWORD env var to control the password`);
}

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  await seedServices();
  await seedTechnologies();
  await seedTeam();
  await seedTestimonials();
  await seedFaqs();
  await seedJobOpenings();
  await seedCaseStudies();
  await seedBlogPosts();
  await seedAdminUser();

  await mongoose.disconnect();
  console.log("Seed complete");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
