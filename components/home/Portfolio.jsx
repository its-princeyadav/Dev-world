"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { caseStudies } from "@/data/caseStudies";
import { featuredWorkImages } from "@/data/showcase";
import { DESKTOP_MIN_WIDTH } from "@/constants/breakpoints";
import { GRADIENT } from "@/constants/theme";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import TextReveal from "@/components/animations/TextReveal";
import RollButton from "@/components/common/RollButton";

const STEPS = caseStudies.length - 1;

/**
 * "Selected Work" (a sticky stage, 90vh of scrolling per project).
 * Scrolling slides each project image over the previous one, grows the progress line
 * and lights up the matching dot. Scrolling snaps to each project.
 */
export default function Portfolio() {
  const sectionRef = useRef(null);
  const progressRef = useRef(null);
  const curveRef = useRef(null);
  const dotRefs = useRef([]);
  const panelRefs = useRef([]);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const dots = dotRefs.current;
      const panels = panelRefs.current;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "10% top",
          end: "bottom bottom",
          scrub: true,
          ...(reduced ? {} : { snap: { snapTo: 1 / STEPS, duration: { min: 0.2, max: 0.6 }, ease: "power1.inOut" } }),
        },
      });

      // Starting state: first project visible, others waiting below (or hidden with reduced motion)
      gsap.set(progressRef.current, { scaleY: 0 });
      gsap.set(dots[0], { backgroundColor: "#ffffff", borderColor: "#ffffff" });
      gsap.set(dots.slice(1), { backgroundColor: "#F06A0E", borderColor: "rgba(255,255,255,0.5)" });
      gsap.set(panels, { filter: "brightness(1)" });
      gsap.set(panels.slice(1), reduced ? { opacity: 0 } : { yPercent: 100 });

      timeline.to(progressRef.current, { scaleY: 1, ease: "none", duration: STEPS }, 0);

      for (let i = 0; i < STEPS; i += 1) {
        timeline.to(
          panels[i + 1],
          reduced ? { opacity: 1, ease: "none", duration: 1 } : { yPercent: 0, ease: "power2.inOut", duration: 1 },
          i,
        );
        timeline.to(panels[i], { filter: "brightness(0.3)", ease: "power2.inOut", duration: 1 }, i);
        timeline.set(dots[i + 1], { backgroundColor: "#ffffff", borderColor: "#ffffff" }, i + 1);
      }

      if (reduced) return;

      // Curved orange shape at the top narrows as the section scrolls in
      const curveTrigger = { trigger: sectionRef.current, start: "top bottom", end: "30% bottom", scrub: true };
      gsap.to(curveRef.current, {
        yPercent: window.innerWidth > DESKTOP_MIN_WIDTH ? -70 : -50,
        ease: "none",
        scrollTrigger: curveTrigger,
      });
      gsap.set(curveRef.current, { clipPath: "ellipse(150% 100% at 50% 100%)" });
      gsap.to(curveRef.current, {
        clipPath: "ellipse(60% 100% at 50% 100%)",
        ease: "power2.out",
        scrollTrigger: curveTrigger,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className={cn("relative w-screen text-white pt-[8vw]", !reducedMotion && "max-[1025px]:pt-[30vw]")}
      style={{ height: `${caseStudies.length * 90}vh`, "--steps": STEPS }}
    >
      <div
        ref={curveRef}
        className={cn("w-full h-[50vh] absolute top-0 left-0 z-2 circle-clip will-change-[clip-path]", GRADIENT)}
      />

      <div
        className={cn(
          "w-screen h-screen sticky top-0 z-3 flex flex-col items-center justify-center px-[4vw] gap-[5vw] overflow-hidden max-md:gap-[12vw] max-[1025px]:gap-12 max-[1025px]:px-[5vw]",
          GRADIENT,
        )}
      >
        <TextReveal stagger={0.015}>
          <h2 className="text-[5.5vw] text-center max-[1025px]:text-[6.5vw] max-md:text-[9vw]">Selected Work</h2>
        </TextReveal>

        <div className="w-full flex items-center gap-[4vw] max-[1025px]:flex-col max-md:gap-[12vw] max-[1025px]:items-start max-[1025px]:gap-16">
          {/* Project list with progress line */}
          <div className="w-[32%] relative max-md:w-full max-[1025px]:w-[50%]">
            <div className="absolute left-1 bg-white/20 top-[2.5vw] max-[1025px]:top-[1vw] h-[calc(var(--steps)*7vw)] max-[1025px]:h-[calc(var(--steps)*11vw)] max-md:h-[calc(var(--steps)*20.7vw)] w-px" />
            <div
              ref={progressRef}
              className="absolute left-1 bg-white origin-top top-[2.5vw] max-[1025px]:top-[1vw] h-[calc(var(--steps)*7vw)] max-[1025px]:h-[calc(var(--steps)*11vw)] max-md:h-[calc(var(--steps)*20.7vw)] w-px"
            />
            <ul className="flex flex-col max-[1025px]:gap-[4vw] max-md:gap-[14vw]">
              {caseStudies.map((study, index) => (
                <li
                  key={study.slug}
                  className="relative flex items-center gap-[1.2vw] max-md:gap-[5vw]"
                  style={{ height: "7vw" }}
                >
                  <span
                    ref={(element) => {
                      dotRefs.current[index] = element;
                    }}
                    className="w-[10px] h-[10px] mt-[-1.5vw] bg-[#F06A0E] rounded-full border shrink-0 max-md:mt-[-7vw] max-[1025px]:mt-[-4vw]"
                  />
                  <Link href={`/case-studies/${study.slug}`} className="under-multi-parent">
                    <h3 className="text-[1.5vw] font-normal max-[1025px]:text-[3.5vw] max-md:text-[5.5vw]">
                      <span className="under-multi">{study.client}</span>
                    </h3>
                    <p className="text-[1vw] max-[1025px]:text-[2.5vw] max-md:text-[4.2vw]">
                      {study.category.split(" · ").join("  •  ")}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            <RollButton
              href="/portfolio"
              className="mt-[2.5vw] max-[1025px]:mt-[5vw] max-md:hidden"
              textClassName="font-normal text-[1.05vw] max-[1025px]:text-[2.6vw]"
              bgColor="#ffffff"
              dotColor="#070707"
              hoverTextColor="#ffffff"
              textColor="#111111"
            >
              View All Work
            </RollButton>
          </div>

          {/* Stacked project images */}
          <div className="w-full h-[38vw] relative rounded-xl overflow-hidden max-[1025px]:w-full max-[1025px]:h-[52vw] max-[1025px]:rounded-lg">
            {caseStudies.map((study, index) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                tabIndex={-1}
                aria-hidden="true"
                ref={(element) => {
                  panelRefs.current[index] = element;
                }}
                className="absolute inset-0 bg-[#F4EFE9] flex items-center justify-center rounded-xl overflow-hidden max-[1025px]:rounded-lg"
                style={{ zIndex: index + 1 }}
              >
                <Image
                  src={featuredWorkImages[study.slug] ?? study.coverImage}
                  alt=""
                  width={800}
                  height={400}
                  sizes="(max-width: 1025px) 90vw, 60vw"
                  className="w-full h-full object-cover"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Soft gradient glow that blends the section into the next one */}
      <div className="absolute w-screen h-[60vh] bottom-[-10%] left-0 overflow-hidden max-[1025px]:bottom-[-13%]">
        <div
          className={cn(
            "w-[115%] h-[40vh] absolute bottom-[35%] left-[-7.5%] z-2 blur-2xl max-[1025px]:bottom-[50%] max-[1025px]:w-[120%] max-[1025px]:left-[-10%] max-[1025px]:blur-lg",
            GRADIENT,
          )}
        />
      </div>
    </section>
  );
}
