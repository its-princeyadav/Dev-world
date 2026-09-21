"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "@/components/ui/Container";

const techs = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Python",
  "AWS",
  "Kubernetes",
  "PostgreSQL",
  "MongoDB",
  "GraphQL",
  "Flutter",
  "Swift",
  "Kotlin",
  "Docker",
  "OpenAI",
  "Terraform",
];

export default function TechMarquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !trackRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 30,
        ease: "none",
        repeat: -1,
      });
    }, trackRef);

    return () => ctx.revert();
  }, []);

  const list = [...techs, ...techs];

  return (
    <section className="border-y border-ink-border bg-ink py-12">
      <Container className="overflow-hidden">
        <p className="mb-6 text-center font-mono text-xs font-semibold uppercase tracking-[0.08em] text-mist-400">
          Trusted technologies we build with
        </p>
        <div className="relative overflow-hidden">
          <div ref={trackRef} className="flex w-max gap-14">
            {list.map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="whitespace-nowrap text-2xl font-semibold text-mist-400/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
