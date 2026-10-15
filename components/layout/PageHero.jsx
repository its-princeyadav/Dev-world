"use client";

import { useEffect, useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { HERO_BACKGROUND } from "@/constants/theme";
import { DESKTOP_MIN_WIDTH } from "@/constants/breakpoints";
import TextReveal from "@/components/animations/TextReveal";
import Eyebrow from "@/components/common/Eyebrow";

/**
 * Opening section of every inner page, built from the home hero: the same warm gradient stage,
 * a character-by-character headline reveal and a line-by-line description.
 * - Scroll: the text drifts up and fades as the page moves on.
 * - Desktop: the text follows the mouse slightly (same parallax as the home hero).
 *
 * Props: eyebrow, title, description, children (actions such as a button), meta (small line under the text)
 */
export default function PageHero({ eyebrow, title, description, meta, children }) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const innerRef = useRef(null);

  // Scroll: text drifts up and fades out
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(textRef.current, {
        yPercent: -25,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.fromTo(
        ".page-hero-fade",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.6 },
      );
    },
    { scope: sectionRef },
  );

  // Mouse parallax (desktop only, motion allowed)
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.innerWidth <= DESKTOP_MIN_WIDTH || reducedMotion) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame;

    function handleMouseMove(event) {
      target.x = -12 * ((event.clientX / window.innerWidth) * 2 - 1);
      target.y = -12 * ((event.clientY / window.innerHeight) * 2 - 1);
    }

    function tick() {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      gsap.set(innerRef.current, { x: current.x, y: current.y });
      frame = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", handleMouseMove);
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen min-h-[90vh] flex flex-col justify-end overflow-hidden px-[4vw] pb-[7vw] pt-[14vw] max-[1025px]:min-h-[70vh] max-[1025px]:px-[5vw] max-[1025px]:pb-[12vw] max-[1025px]:pt-[30vw] max-md:min-h-[85vh] max-md:pt-[40vw]"
      style={HERO_BACKGROUND}
    >
      <div ref={textRef} className="relative z-2">
        <div
          ref={innerRef}
          className="flex justify-between items-end gap-[4vw] max-[1025px]:flex-col max-[1025px]:items-start max-[1025px]:gap-[6vw]"
        >
          <div className="w-[66%] max-[1025px]:w-full">
            {eyebrow && (
              <div className="page-hero-fade mb-[1.8vw] max-[1025px]:mb-[4vw]">
                <Eyebrow className="text-white">{eyebrow}</Eyebrow>
              </div>
            )}
            <TextReveal stagger={0.015} animateOnScroll={false} delay={0.15}>
              <h1 className="text-[6vw] leading-[1.05]! text-white max-[1025px]:text-[9vw] max-md:text-[11vw]">{title}</h1>
            </TextReveal>
          </div>

          {(description || children || meta) && (
            <div className="w-[28%] max-[1025px]:w-[75%] max-md:w-full">
              {description && (
                <TextReveal splitBy="lines" animateOnScroll={false} delay={0.5}>
                  <p className="text-[1.25vw] leading-[1.45] text-white max-[1025px]:text-[2.6vw] max-md:text-[4.3vw]">
                    {description}
                  </p>
                </TextReveal>
              )}
              {meta && (
                <p className="page-hero-fade mt-[1.2vw] text-[1vw] text-white/70 max-[1025px]:mt-[3vw] max-[1025px]:text-[2.2vw] max-md:text-[3.8vw]">
                  {meta}
                </p>
              )}
              {children && <div className="page-hero-fade mt-[2vw] max-[1025px]:mt-[5vw]">{children}</div>}
            </div>
          )}
        </div>
      </div>

      {/* Fade into the dark page below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] bg-linear-to-b from-transparent to-[#070707]" />
    </section>
  );
}
