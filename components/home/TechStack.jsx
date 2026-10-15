"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { featuredTechnologies } from "@/data/technologies";
import { DESKTOP_MIN_WIDTH } from "@/constants/breakpoints";
import TextReveal from "@/components/animations/TextReveal";

/**
 * "Trusted technologies" (240vh tall).
 * While scrolling, technology wordmarks fly out of the distance in small random groups, pass the
 * statement and continue past the viewer. Everything is scrubbed to scroll position.
 */
export default function TechStack() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".grid__item", gridRef.current);
      if (items.length === 0) return;

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: sectionRef.current, start: "top 20%", end: "bottom center", scrub: true },
      });

      const isDesktop = window.innerWidth > DESKTOP_MIN_WIDTH;
      const flyInDuration = isDesktop ? 1.5 : 4;
      const flyOutDuration = isDesktop ? 1.5 : 3.5;
      const groupGap = flyInDuration + 0.4;
      const itemGap = isDesktop ? 0.4 : 0.5;
      const random = gsap.utils.random;

      // Split the logos into random groups of 2–3
      const groups = [];
      for (let start = 0; start < items.length;) {
        const size = Math.min(items.length - start, random(2, 3, 1));
        groups.push(items.slice(start, start + size));
        start += size;
      }

      groups.forEach((group, groupIndex) => {
        group.forEach((item, itemIndex) => {
          const startTime = groupIndex * groupGap + itemIndex * itemGap;

          // Start far away, blurred and slightly off-centre
          gsap.set(item, {
            transformOrigin: "0% 0%",
            opacity: 0,
            x: isDesktop ? random(-180, 180) : 0,
            y: random(-180, 180),
            filter: "blur(10px)",
            z: isDesktop ? random(-2200, -1600) : random(-550, -400),
          });

          timeline.to(item, { z: 0, opacity: 1, filter: "blur(0px)", duration: flyInDuration }, startTime).to(
            item,
            {
              filter: "blur(10px)",
              opacity: 0,
              z: isDesktop ? random(1400, 1800) : random(500, 700),
              duration: flyOutDuration,
            },
            startTime + flyInDuration,
          );
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="tech-stack" className="relative w-screen h-[240vh] text-center z-2 bg-[#070707]">
      <div className="sticky w-full top-0 h-screen flex items-center justify-center">
        <div className="w-3/5 max-lg:w-4/5">
          <TextReveal stagger={0.015}>
            <h2 className="text-[5.5vw] text-white leading-[1.2] max-lg:text-[7vw] max-md:text-[8vw]">
              Trusted by Ambitious Teams, Built on Proven Technology.
            </h2>
          </TextReveal>
        </div>
      </div>

      <div className="left-0 sticky mt-[-100vh] top-0 z-20 h-screen w-screen overflow-hidden flex items-center justify-center">
        <ul
          ref={gridRef}
          aria-label="Technologies we build with"
          className="grid grid-cols-5 gap-[3vw] perspective-[350vw] max-md:grid-cols-3 max-md:gap-[6vw]"
        >
          {featuredTechnologies.map((technology) => (
            <li
              key={technology}
              className="grid__item flex h-[8vw] w-[14vw] items-center justify-center max-md:h-[22vw] max-md:w-[26vw]"
            >
              <span className="whitespace-nowrap text-[2.4vw] font-medium tracking-tight text-white/85 max-md:text-[5.5vw]">
                {technology}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
