"use client";

import { useRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Fades its items up as they scroll into view, in staggered batches (cards, rows, list items).
 * By default the items are the direct children; pass `selector` to target nested elements.
 *
 *   <FadeUp className="grid grid-cols-3 gap-6">{cards}</FadeUp>
 */
export default function FadeUp({
  children,
  as: Tag = "div",
  selector = ":scope > *",
  stagger = 0.08,
  y = 40,
  className,
  ...rest
}) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(containerRef.current.querySelectorAll(selector));
      if (items.length === 0) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0, y });
      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, stagger, ease: "power2.out", overwrite: true }),
      });
    },
    { scope: containerRef },
  );

  return (
    <Tag ref={containerRef} className={className} {...rest}>
      {children}
    </Tag>
  );
}
