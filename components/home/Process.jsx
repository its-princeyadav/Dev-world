"use client";

import { Fragment, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

import { gsap, useGSAP } from "@/lib/gsap";
import { processOverview } from "@/data/process";
import { ACCENT } from "@/constants/theme";
import TextReveal from "@/components/animations/TextReveal";
import RollButton from "@/components/common/RollButton";
import StringDivider from "@/components/common/StringDivider";

/**
 * "A Process Built for Clarity".
 * Hovering the list shows a floating image (desktop) that springs to the hovered row.
 * The dividers draw in on scroll and can be plucked like guitar strings.
 */
export default function Process() {
  const sectionRef = useRef(null);
  const previewRef = useRef(null); // fades in/out
  const previewInnerRef = useRef(null); // moves to the hovered row
  const imageRefs = useRef([]);
  const rowRefs = useRef([]);
  const topZIndex = useRef(processOverview.length);
  const hoveredIndex = useRef(null);
  const pointer = useRef(null);

  const isReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Initial state of the preview images
  useGSAP(
    () => {
      gsap.set(previewInnerRef.current, { y: 0 });
      gsap.set(imageRefs.current, { opacity: 1 });
      imageRefs.current.forEach((image, index) => {
        gsap.set(image, { zIndex: index + 1, scale: index === 0 ? 1.05 : 0 });
      });
    },
    { scope: sectionRef },
  );

  // Move the preview so its centre lines up with row `index`, and pop that row's image in
  const showRow = useCallback((index) => {
    const row = rowRefs.current[index];
    const inner = previewInnerRef.current;
    const reduced = isReduced();

    if (row && inner) {
      const currentY = gsap.getProperty(inner, "y");
      const innerBox = inner.getBoundingClientRect();
      const restingCenter = innerBox.top + innerBox.height / 2 - currentY;
      const rowBox = row.getBoundingClientRect();
      const y = rowBox.top + rowBox.height / 2 - restingCenter;
      if (reduced) gsap.set(inner, { y });
      else gsap.to(inner, { y, duration: 0.65, ease: "back.out(1.6)" });
    }

    const image = imageRefs.current[index];
    if (image) {
      topZIndex.current += 1;
      gsap.set(image, { zIndex: topZIndex.current });
      gsap.killTweensOf(image);
      if (reduced) {
        gsap.set(image, { scale: 1.05 });
      } else {
        gsap.set(image, { scale: 0 });
        gsap.to(image, { scale: 1.05, duration: 0.45, ease: "power2.out" });
      }
    }
  }, []);

  // Find which row is under the pointer
  const checkPointer = useCallback(
    (x, y) => {
      const index = rowRefs.current.findIndex((row) => {
        const box = row?.getBoundingClientRect();
        return box && y >= box.top && y < box.bottom && x >= box.left && x < box.right;
      });
      if (index !== -1 && index !== hoveredIndex.current) {
        hoveredIndex.current = index;
        showRow(index);
      }
    },
    [showRow],
  );

  // Track the pointer on mouse move, and re-check on scroll (rows move under a still pointer)
  useEffect(() => {
    function handleMouseMove(event) {
      pointer.current = { x: event.clientX, y: event.clientY };
      checkPointer(event.clientX, event.clientY);
    }
    function handleScroll() {
      if (pointer.current) checkPointer(pointer.current.x, pointer.current.y);
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [checkPointer]);

  function fadePreview(visible) {
    if (!visible) hoveredIndex.current = null;
    gsap.to(previewRef.current, { opacity: visible ? 1 : 0, duration: isReduced() ? 0 : 0.4, ease: "power2.out" });
  }

  return (
    <section ref={sectionRef} className="relative w-screen bg-[#070707] text-white py-[7vw]" id="process">
      <div className="w-screen flex items-center px-[4vw] gap-[4vw] max-[1025px]:px-[5vw]">
        <div className="w-full">
          <TextReveal stagger={0.015}>
            <h2 className="mb-[4vw] max-[1025px]:mb-[8vw] text-[5.5vw] leading-[1.2] max-[1025px]:text-[7vw] max-md:text-[9vw]">
              A Process Built for
              <br />
              Clarity, Not Chaos
            </h2>
          </TextReveal>

          <div onMouseEnter={() => fadePreview(true)} onMouseLeave={() => fadePreview(false)}>
            {processOverview.map((step, index) => (
              <Fragment key={step.title}>
                {index !== 0 && <StringDivider />}
                <div
                  ref={(element) => {
                    rowRefs.current[index] = element;
                  }}
                  className="relative py-8 w-[48%] max-[1025px]:w-full"
                >
                  <TextReveal splitBy="lines">
                    <h3 className="text-[1.8vw] font-normal max-[1025px]:text-[3.4vw] max-md:text-[5.5vw]">
                      <span style={{ color: ACCENT }}>{step.n}</span>&nbsp;&nbsp;{step.title}
                    </h3>
                  </TextReveal>
                  <TextReveal splitBy="lines">
                    <p className="text-[1.25vw] tracking-wide text-white/50 mt-3 max-[1025px]:text-[2.2vw] max-md:text-[3.6vw]">
                      {step.description}
                    </p>
                  </TextReveal>
                </div>
              </Fragment>
            ))}
            <StringDivider />
          </div>

          <RollButton
            href="/process"
            className="mt-[3vw] max-[1025px]:mt-[8vw]"
            textClassName="font-normal text-[1.05vw] max-[1025px]:text-[2.6vw] max-md:text-[4.2vw]"
            bgColor="#ffffff"
            dotColor="#070707"
            hoverTextColor="#ffffff"
            textColor="#111111"
          >
            See Our Full Process
          </RollButton>
        </div>

        {/* Floating image preview (hidden on tablet and phone) */}
        <div
          ref={previewRef}
          className="w-[40vw] flex justify-center absolute right-[6%] pointer-events-none opacity-0 max-[1025px]:hidden"
          aria-hidden="true"
        >
          <div
            ref={previewInnerRef}
            className="w-[40vw] h-[22vw] relative bg-[#070707] rounded-lg overflow-hidden shadow-2xl will-change-transform"
          >
            {processOverview.map((step, index) => (
              <div
                key={step.title}
                ref={(element) => {
                  imageRefs.current[index] = element;
                }}
                className="absolute inset-0"
              >
                <Image
                  src={step.image}
                  alt=""
                  width={800}
                  height={450}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
