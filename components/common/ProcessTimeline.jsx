"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { ACCENT } from "@/constants/theme";
import TextReveal from "@/components/animations/TextReveal";
import TagList from "@/components/common/TagList";

/**
 * Vertical timeline for the full process. As the page scrolls, a white progress line grows
 * down the rail (like the "Selected Work" progress line) and each step's dot lights up as
 * the line reaches it. Step cards fade up as they arrive.
 *
 * Props: steps ([{ n, title, description, deliverables }])
 */
export default function ProcessTimeline({ steps }) {
  const listRef = useRef(null);
  const progressRef = useRef(null);
  const dotRefs = useRef([]);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const dots = dotRefs.current;

      if (reduced) {
        gsap.set(progressRef.current, { scaleY: 1 });
        gsap.set(dots, { backgroundColor: "#ffffff", borderColor: "#ffffff" });
        return;
      }

      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: listRef.current, start: "top 60%", end: "bottom 60%", scrub: true },
        },
      );

      dots.forEach((dot) => {
        gsap.fromTo(
          dot,
          { backgroundColor: "#F06A0E", borderColor: "rgba(255,255,255,0.5)", scale: 1 },
          {
            backgroundColor: "#ffffff",
            borderColor: "#ffffff",
            scale: 1.4,
            duration: 0.3,
            scrollTrigger: { trigger: dot, start: "top 60%", toggleActions: "play none none reverse" },
          },
        );
      });

      gsap.utils.toArray(".timeline-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
          },
        );
      });
    },
    { scope: listRef },
  );

  return (
    <ol ref={listRef} className="relative pl-[6vw] max-[1025px]:pl-[9vw] max-md:pl-[10vw]">
      {/* Rail and progress line */}
      <span aria-hidden="true" className="absolute left-[1vw] top-[1vw] bottom-[1vw] w-px bg-white/15 max-[1025px]:left-[2vw]" />
      <span
        ref={progressRef}
        aria-hidden="true"
        className="absolute left-[1vw] top-[1vw] bottom-[1vw] w-px origin-top bg-white max-[1025px]:left-[2vw]"
      />

      {steps.map((step, index) => (
        <li key={step.n} className="relative pb-[5vw] last:pb-0 max-[1025px]:pb-[10vw]">
          <span
            ref={(element) => {
              dotRefs.current[index] = element;
            }}
            aria-hidden="true"
            className="absolute -left-[5vw] top-[0.9vw] size-[10px] -translate-x-1/2 rounded-full border bg-[#F06A0E] max-[1025px]:-left-[7vw] max-[1025px]:top-[1.4vw] max-md:-left-[8vw] max-md:top-[2.4vw]"
          />
          <div className="timeline-card grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-[4vw] max-[1025px]:grid-cols-1 max-[1025px]:gap-[3vw]">
            <div>
              <span style={{ color: ACCENT }} className="text-[1.25vw] max-[1025px]:text-[2.6vw] max-md:text-[4vw]">
                {step.n}
              </span>
              <TextReveal stagger={0.015}>
                <h2 className="mt-[0.5vw] text-[3.4vw] leading-[1.1] max-[1025px]:text-[6vw] max-md:text-[8.5vw]">{step.title}</h2>
              </TextReveal>
            </div>
            <div className="pt-[1.6vw] max-[1025px]:pt-0">
              <p className="text-[1.3vw] leading-[1.55] text-white/80 max-[1025px]:text-[2.6vw] max-md:text-[4.2vw]">
                {step.description}
              </p>
              <TagList items={step.deliverables} className="mt-[1.6vw] max-[1025px]:mt-[4vw]" />
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
