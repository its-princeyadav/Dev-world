"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { reasons } from "@/data/whyUs";
import TextReveal from "@/components/animations/TextReveal";
import ValueCard from "@/components/common/ValueCard";

/** "Why Dev World": four value cards that fade up together; hovering draws an underline. */
export default function WhyUs() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".work-card", { opacity: 1, yPercent: 0 });
        return;
      }

      gsap.fromTo(
        ".work-card",
        { opacity: 0, yPercent: 10 },
        {
          opacity: 1,
          yPercent: 0,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top top" },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="why-dev-world"
      className="relative w-screen bg-[#070707] text-white pt-[25vw] pb-[10vw] max-[1025px]:pt-[65vw]"
    >
      <div className="text-center mb-[5vw] px-[4vw] max-md:mb-[10vw] max-[1025px]:px-[5vw]">
        <TextReveal stagger={0.015}>
          <h2 className="text-[5.5vw] max-[1025px]:text-[7vw] max-md:text-[9vw]">Why Dev World?</h2>
        </TextReveal>
        <TextReveal splitBy="lines">
          <p className="text-[1.25vw] text-white mt-[1.5vw] max-[1025px]:text-[2.5vw] max-md:text-[4.5vw] max-md:mt-[2vw]">
            Built for teams who can&apos;t afford to get it wrong
          </p>
        </TextReveal>
      </div>

      <div className="grid grid-cols-4 max-[1025px]:grid-cols-1">
        {reasons.map((reason) => (
          <ValueCard
            key={reason.title}
            {...reason}
            className="work-card px-[2.8vw] pt-[2vw] pb-[3vw] h-[30vw] max-[1025px]:h-auto max-[1025px]:py-[6vw] max-[1025px]:px-[5vw]"
          />
        ))}
      </div>
    </section>
  );
}
