"use client";

import { useEffect, useRef } from "react";

import { gsap, SplitText } from "@/lib/gsap";

// Starting offsets for each reveal direction
const FROM = {
  top: { yPercent: -100, xPercent: 0, rotate: 0 },
  bottom: { yPercent: 100, xPercent: 0, rotate: 0 },
  left: { yPercent: 0, xPercent: -100, rotate: 0 },
  right: { yPercent: 0, xPercent: 100, rotate: 0 },
};

/**
 * Splits its child text into characters (default) or lines and slides them into view
 * when scrolled to. Wrap a single heading or paragraph:
 *
 *   <TextReveal stagger={0.015}><h2>Award Winning Work</h2></TextReveal>
 *   <TextReveal splitBy="lines"><p>…</p></TextReveal>
 *
 * Props:
 * - splitBy: "chars" | "lines"
 * - stagger: delay between pieces (default 0.03 for chars, 0.1 for lines)
 * - start: set to false to hold the animation until a parent is ready (used by the hero intro)
 * - direction, duration, delay, scrub, animateOnScroll: fine-tuning, rarely needed
 */
export default function TextReveal({
  children,
  splitBy = "chars",
  stagger,
  start = true,
  direction = "bottom",
  duration = 0.5,
  delay = 0,
  scrub = false,
  animateOnScroll = true,
  className = "",
}) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !start) return;

    let context;
    let fontTimer;
    let observer;
    let cancelled = false;
    const splits = [];

    function animate() {
      if (cancelled) return;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      context = gsap.context(() => {
        const pieces = [];
        Array.from(wrapper.children).forEach((element) => {
          if (splitBy === "lines") {
            const split = SplitText.create(element, {
              type: "lines",
              mask: "lines",
              linesClass: "line++",
              reduceWhiteSpace: false,
            });
            splits.push(split);
            pieces.push(...split.lines);
            return;
          }
          const split = SplitText.create(element, {
            type: "lines,chars",
            mask: "chars",
            charsClass: "char++",
            reduceWhiteSpace: false,
          });
          // Slightly widen each character mask so italics/overhangs aren't clipped
          split.masks?.forEach((mask) => {
            mask.style.paddingInline = "0.04em";
            mask.style.marginInline = "-0.04em";
            mask.style.boxSizing = "content-box";
          });
          splits.push(split);
          pieces.push(...split.chars);
        });

        const scrollTrigger = { trigger: wrapper, start: "top 85%", end: "bottom 68%", scrub };

        if (reducedMotion) {
          // No sliding: fade the whole block in instead
          gsap.set(pieces, { yPercent: 0, xPercent: 0, rotate: 0, opacity: 1 });
          gsap.set(wrapper, { opacity: 0, y: 24 });
          const fade = { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay };
          gsap.to(wrapper, animateOnScroll ? { ...fade, scrollTrigger: { ...scrollTrigger, once: true } } : fade);
          return;
        }

        gsap.set(wrapper, { opacity: 1 });
        const to = {
          yPercent: 0,
          xPercent: 0,
          rotate: 0,
          opacity: 1,
          duration,
          stagger: stagger ?? (splitBy === "lines" ? 0.1 : 0.03),
          ease: "power3.out",
          delay,
        };
        gsap.fromTo(
          pieces,
          { ...(FROM[direction] ?? FROM.bottom), willChange: "transform" },
          animateOnScroll ? { ...to, scrollTrigger } : to,
        );
      }, wrapper);
    }

    // Split only after the font has loaded, otherwise lines would break in the wrong places.
    function waitForFontThenAnimate() {
      let done = false;
      const run = () => {
        if (done) return;
        done = true;
        clearTimeout(fontTimer);
        animate();
      };
      const { fontFamily, fontWeight, fontSize } = getComputedStyle(wrapper);
      try {
        document.fonts.load(`${fontWeight} ${fontSize} ${fontFamily}`).then(run, run);
      } catch {
        document.fonts.ready.then(run, run);
      }
      fontTimer = setTimeout(run, 300);
    }

    // Elements far down the page are prepared only when they get close to the viewport.
    const rect = wrapper.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.5 && rect.bottom > -window.innerHeight) {
      waitForFontThenAnimate();
    } else {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          observer = null;
          waitForFontThenAnimate();
        },
        { rootMargin: "200% 0px" },
      );
      observer.observe(wrapper);
    }

    return () => {
      cancelled = true;
      clearTimeout(fontTimer);
      observer?.disconnect();
      context?.revert();
      splits.forEach((split) => split.revert());
    };
  }, [splitBy, stagger, start, direction, duration, delay, scrub, animateOnScroll]);

  return (
    <div ref={wrapperRef} data-copy-wrapper="true" className={`opacity-0 ${className}`.trim()}>
      {children}
    </div>
  );
}
