"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { caseStudies } from "@/data/caseStudies";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export default function PortfolioGrid() {
  const categories = useMemo(() => {
    const set = new Set(caseStudies.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? caseStudies
      : caseStudies.filter((p) => p.category === active);

  return (
    <section className="bg-paper py-20 lg:py-28">
      <Container>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter portfolio by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                active === cat
                  ? "border-accent bg-accent text-white"
                  : "border-paper-border text-ink-600 hover:bg-paper-soft"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project) => (
            <motion.div
              layout
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.3, 0, 0, 1] }}
            >
              <Link
                href={`/case-studies/${project.slug}`}
                className="group block overflow-hidden rounded-[20px] border border-paper-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div
                  className={`aspect-[4/3] bg-gradient-to-br ${project.gradient} transition-transform duration-400 group-hover:scale-105`}
                />
                <div className="bg-paper-soft p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
                    {project.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-ink-900">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-500">{project.client}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
