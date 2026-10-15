"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";

import { gsap, useGSAP } from "@/lib/gsap";
import { heroGrid } from "@/data/showcase";
import { DESKTOP_MIN_WIDTH, TABLET_QUERY } from "@/constants/breakpoints";
import { HERO_BACKGROUND } from "@/constants/theme";
import useMediaQuery from "@/hooks/useMediaQuery";
import TextReveal from "@/components/animations/TextReveal";

/**
 * Hero section (300vh tall with a sticky stage).
 * 1. Intro: the portrait is uncovered by a mask, the headline reveals, then the header slides in
 *    and smooth scrolling is switched on.
 * 2. Scroll: the stage shrinks to half size, revealing a scrolling grid of project screenshots.
 * 3. Desktop: the portrait and text drift with the mouse.
 */
export default function Hero() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const textRef = useRef(null);
  const maskRef = useRef(null);
  const imageRef = useRef(null);
  const gridRef = useRef(null);

  const [isTitleReady, setIsTitleReady] = useState(false);
  const [areLabelsReady, setAreLabelsReady] = useState(false);
  const isTablet = useMediaQuery(TABLET_QUERY);

  // Smooth scrolling stays off until the intro finishes.
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const introDoneRef = useRef(false);
  useEffect(() => {
    lenisRef.current = lenis;
    if (!introDoneRef.current) lenis?.stop();
  }, [lenis]);

  // Leaving the page before the intro finishes must not leave scrolling switched off.
  useEffect(() => () => lenisRef.current?.start(), []);

  // Always start at the top: the intro assumes the hero is in view.
  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  // 1. Intro timeline
  useGSAP(
    () => {
      const reveal = { value: -40 };
      gsap
        .timeline()
        .to(
          reveal,
          {
            value: 125,
            duration: 3.5,
            ease: "power2.out",
            onUpdate: () => maskRef.current?.style.setProperty("--reveal", `${reveal.value}%`),
          },
          0,
        )
        .fromTo(maskRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power2.out" }, 0)
        .call(() => setIsTitleReady(true), undefined, 1)
        .call(() => setAreLabelsReady(true), undefined, 1.5)
        .call(
          () => {
            // The header lives in the layout (outside this section's scope), so look it up directly.
            gsap.fromTo(
              document.getElementById("header"),
              { yPercent: -50, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                onComplete: () => {
                  introDoneRef.current = true;
                  lenisRef.current?.start();
                },
              },
            );
          },
          undefined,
          1.8,
        );

      return () => {
        setIsTitleReady(false);
        setAreLabelsReady(false);
      };
    },
    { scope: sectionRef },
  );

  // 2. Scroll: shrink the stage and sharpen the screenshot grid
  useGSAP(
    () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      timeline.to(stageRef.current, { scale: 0.5, ease: "power2.inOut", duration: 1 }, 0);
      gsap.set(gridRef.current, { filter: "blur(24px)", opacity: 0.35 });
      timeline.to(gridRef.current, { filter: "blur(0px)", opacity: 1, ease: "power2.out", duration: 0.18 }, 0.32);
    },
    { scope: sectionRef },
  );

  // 3. Mouse parallax (desktop only, motion allowed)
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.innerWidth <= DESKTOP_MIN_WIDTH || reducedMotion) return;

    // Image moves up to 30px, text up to 12px, both opposite to the cursor and eased per frame.
    const target = { imageX: 0, imageY: 0, textX: 0, textY: 0 };
    const current = { imageX: 0, imageY: 0, textX: 0, textY: 0 };
    let frame;

    function handleMouseMove(event) {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      target.imageX = -30 * x;
      target.imageY = -30 * y;
      target.textX = -12 * x;
      target.textY = -12 * y;
    }

    function tick() {
      for (const key in current) current[key] += (target[key] - current[key]) * 0.08;
      gsap.set(imageRef.current, { x: current.imageX, y: current.imageY });
      gsap.set(textRef.current, { x: current.textX, y: current.textY });
      frame = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", handleMouseMove);
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  const leftColumn = isTablet ? heroGrid.mobile : heroGrid.desktopLeft;
  const rightColumn = isTablet ? heroGrid.mobile : heroGrid.desktopRight;

  return (
    <section ref={sectionRef} className="relative w-screen h-[300vh]" id="hero">
      {/* Sticky stage with the portrait and headline */}
      <div
        ref={stageRef}
        className="w-screen h-screen sticky top-0 flex justify-between items-center hero-container px-[4vw] z-2 max-[1025px]:px-[5vw] max-[1025px]:items-start max-[1025px]:pt-[30vw] overflow-hidden"
        style={HERO_BACKGROUND}
      >
        <div ref={textRef} className="w-full h-fit flex justify-between max-[1025px]:flex-col max-[1025px]:gap-8">
          <div className="relative z-3 w-[45%] leading-30! max-[1025px]:w-[70%] max-md:w-full">
            <TextReveal stagger={0.015} start={isTitleReady}>
              <h1 className="text-[6.6vw] text-white max-[1025px]:text-[11vw] max-md:text-[13vw] leading-[1.1]!">
                Engineering Exceptional Software
              </h1>
            </TextReveal>
          </div>
          <div className="relative z-3 w-[13%] flex flex-col justify-between text-end text-[1.25vw] leading-[1.15] py-[2vw] max-[1025px]:w-[40%] max-[1025px]:text-[3.5vw] max-[1025px]:text-start max-[1025px]:flex-col-reverse max-md:w-[70%] max-md:text-[4.5vw] max-md:gap-[7vw] max-[1025px]:gap-20 max-md:py-0">
            <TextReveal splitBy="lines" start={areLabelsReady}>
              <p className="text-white">Full-cycle digital product studio</p>
            </TextReveal>
            <TextReveal splitBy="lines" start={areLabelsReady}>
              <p className="text-white">
                Web · Mobile
                <br />
                Cloud · AI
              </p>
            </TextReveal>
          </div>
        </div>

        <div
          ref={maskRef}
          className="absolute bottom-[-48%] left-1/2 translate-x-[-49.5%] size-[140%] max-[1025px]:w-full max-[1025px]:h-[180%] max-[1025px]:bottom-[-64%] max-[1025px]:translate-x-[-40%] max-md:w-[160%] max-md:top-auto max-md:bottom-[-30%] max-md:h-auto max-md:translate-x-[-40%] hero-av-img hero-mask-reveal opacity-0"
        >
          <div ref={imageRef} className="w-full h-full">
            <Image
              src="/images/hero-man.webp"
              alt=""
              width={1142}
              height={1377}
              draggable={false}
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 1280px"
              className="w-full h-full object-contain select-none pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Dark layer behind the stage: two endlessly scrolling columns of project screenshots */}
      <div ref={gridRef} className="absolute inset-0 w-full h-full bg-[#070707]">
        <div className="w-full h-screen sticky top-0 px-[4vw] flex gap-[2.5vw] overflow-hidden">
          <ScreenshotColumn images={leftColumn} className="marquee-1" />
          <ScreenshotColumn images={rightColumn} className="marquee-2" />
        </div>
      </div>
    </section>
  );
}

function ScreenshotColumn({ images, className }) {
  return (
    <div className={`w-[50%] h-fit flex flex-col gap-[2.5vw] ${className}`} aria-hidden="true">
      {images.map((src, index) => (
        <div key={index} className="w-full h-[27vw] max-[1025px]:h-[45vw] max-md:h-[55vw] overflow-hidden">
          <Image src={src} alt="" width={700} height={500} className="w-full h-full overflow-hidden object-cover" />
        </div>
      ))}
    </div>
  );
}
