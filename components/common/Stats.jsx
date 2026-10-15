"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import StringDivider from "@/components/common/StringDivider";

// Splits "120+" into { prefix: "", number: 120, suffix: "+" }
function parseValue(value) {
  const match = String(value).match(/^(\D*)(\d+)(.*)$/);
  return match ? { prefix: match[1], number: Number(match[2]), suffix: match[3] } : null;
}

/**
 * Row of headline numbers between two pluckable dividers.
 * Each number counts up once when the row scrolls into view.
 *
 * Props: stats ([{ value, label }]), className
 */
export default function Stats({ stats, className }) {
  const rowRef = useRef(null);
  const numberRefs = useRef([]);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      stats.forEach((stat, index) => {
        const element = numberRefs.current[index];
        const parsed = parseValue(stat.value);
        if (!element || !parsed || reduced) return;

        // Years count from just below their value; everything else from zero
        const counter = { value: parsed.number >= 1000 ? parsed.number - 40 : 0 };
        element.textContent = `${parsed.prefix}${counter.value}${parsed.suffix}`;
        gsap.to(counter, {
          value: parsed.number,
          duration: 1.6,
          ease: "power3.out",
          snap: { value: 1 },
          onUpdate: () => {
            element.textContent = `${parsed.prefix}${counter.value}${parsed.suffix}`;
          },
          scrollTrigger: { trigger: rowRef.current, start: "top 80%", once: true },
        });
      });

      if (!reduced) {
        gsap.fromTo(
          ".stat-item",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: rowRef.current, start: "top 85%", once: true },
          },
        );
      }

      // Put the real values back when the animation is torn down
      return () => {
        stats.forEach((stat, index) => {
          if (numberRefs.current[index]) numberRefs.current[index].textContent = stat.value;
        });
      };
    },
    { scope: rowRef },
  );

  return (
    <div ref={rowRef} className={cn("w-full", className)}>
      <StringDivider />
      <dl className={cn("grid max-[1025px]:grid-cols-2", stats.length === 3 ? "grid-cols-3" : "grid-cols-4")}>
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              "stat-item flex flex-col-reverse gap-[0.8vw] px-[2vw] py-[3.5vw] max-[1025px]:px-[4vw] max-[1025px]:py-[7vw] max-md:gap-[2vw]",
              index > 0 && "border-l border-white/10",
              "max-[1025px]:[&:nth-child(3)]:border-l-0 max-[1025px]:[&:nth-child(n+3)]:border-t max-[1025px]:[&:nth-child(n+3)]:border-white/10",
            )}
          >
            <dt className="text-[1.15vw] text-white/60 max-[1025px]:text-[2.4vw] max-md:text-[3.8vw]">{stat.label}</dt>
            <dd
              ref={(element) => {
                numberRefs.current[index] = element;
              }}
              className="text-[6vw] font-light leading-none tabular-nums max-[1025px]:text-[10vw] max-md:text-[13vw]"
            >
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
      <StringDivider />
    </div>
  );
}
