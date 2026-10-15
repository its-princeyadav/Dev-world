"use client";

import { useRef, useState } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { GRADIENT } from "@/constants/theme";
import ProjectCard from "@/components/common/ProjectCard";

/**
 * Case study grid with category filters. Changing the filter fades the matching cards up
 * in a quick stagger.
 *
 * Props: projects (from data/caseStudies.js)
 */
export default function PortfolioGrid({ projects }) {
  const gridRef = useRef(null);
  const categories = ["All", ...new Set(projects.map((project) => project.category))];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((project) => project.category === active);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".portfolio-card");
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(cards, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power2.out" });
    },
    { dependencies: [active], scope: gridRef },
  );

  return (
    <div>
      <div role="group" aria-label="Filter portfolio by category" className="flex flex-wrap gap-[0.8vw] max-[1025px]:gap-[2vw]">
        {categories.map((category) => {
          const isActive = active === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={isActive}
              className={cn(
                "group relative overflow-hidden rounded-full border px-[1.5vw] py-[0.7vw] text-[1.05vw] transition-colors duration-300 cursor-pointer max-[1025px]:px-[3.5vw] max-[1025px]:py-[1.5vw] max-[1025px]:text-[2.4vw] max-md:text-[3.8vw]",
                isActive ? "border-transparent text-white" : "border-white/20 text-white/80 hover:text-white",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  GRADIENT,
                  isActive ? "scale-100" : "scale-0 group-hover:scale-100 group-hover:opacity-30",
                )}
              />
              <span className="relative">{category}</span>
            </button>
          );
        })}
      </div>

      <div
        ref={gridRef}
        aria-live="polite"
        className="mt-[4vw] grid grid-cols-3 gap-x-[2vw] gap-y-[4vw] max-[1025px]:mt-[8vw] max-[1025px]:grid-cols-2 max-[1025px]:gap-x-[3vw] max-[1025px]:gap-y-[8vw] max-md:grid-cols-1 max-md:gap-y-[12vw]"
      >
        {filtered.map((project) => (
          <ProjectCard key={project.slug} study={project} className="portfolio-card" />
        ))}
      </div>
    </div>
  );
}
