"use client";

import { useRef } from "react";
import Image from "next/image";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Wide rounded image whose picture drifts inside its frame while scrolling (image parallax),
 * and whose frame un-clips from the bottom the first time it scrolls into view.
 *
 * Props: src, alt, priority, aspect (Tailwind aspect class), className
 */
export default function ParallaxImage({ src, alt = "", priority = false, aspect = "aspect-[21/9]", className }) {
  const frameRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        frameRef.current,
        { clipPath: "inset(12% 4% 0% 4% round 1.5vw)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0.75rem)",
          ease: "power2.out",
          scrollTrigger: { trigger: frameRef.current, start: "top bottom", end: "top 35%", scrub: true },
        },
      );
      gsap.fromTo(
        imageRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: frameRef.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: frameRef },
  );

  return (
    <div
      ref={frameRef}
      className={cn("relative w-full overflow-hidden rounded-xl max-[1025px]:rounded-lg max-md:aspect-[4/3]", aspect, className)}
    >
      <div ref={imageRef} className="absolute -inset-y-[10%] inset-x-0">
        <Image src={src} alt={alt} fill priority={priority} sizes="92vw" className="object-cover" />
      </div>
    </div>
  );
}
