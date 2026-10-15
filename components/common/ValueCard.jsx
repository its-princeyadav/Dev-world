"use client";

import { useRef } from "react";

import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { ACCENT } from "@/constants/theme";
import Icon from "@/components/ui/Icon";

/**
 * Text card with an optional line icon (or number) and a divider at the bottom.
 * Hovering draws an accent underline in from the left; leaving sends it out to the right.
 * Used by "Why Dev World", values, perks and service capabilities.
 */
export default function ValueCard({ icon, number, title, description, className, children }) {
  const lineRef = useRef(null);

  function animateLine(show) {
    const line = lineRef.current;
    gsap.killTweensOf(line);
    gsap.set(line, { transformOrigin: show ? "left center" : "right center" });
    gsap.to(line, { scaleX: show ? 1 : 0, duration: 0.55, ease: "power2.out" });
  }

  return (
    <div
      onMouseEnter={() => animateLine(true)}
      onMouseLeave={() => animateLine(false)}
      className={cn("relative flex flex-col justify-between", className)}
    >
      <div>
        {icon && (
          <span style={{ color: ACCENT }} className="mb-[2.5vw] block max-[1025px]:mb-[4vw]">
            <Icon name={icon} variant="outline" size={50} />
          </span>
        )}
        {number && (
          <span
            style={{ color: ACCENT }}
            className="mb-[2vw] block text-[1.25vw] max-[1025px]:mb-[3vw] max-[1025px]:text-[2.6vw] max-md:text-[4vw]"
          >
            {number}
          </span>
        )}
        <h3 className="text-[2vw] font-normal mb-[1.5vw] leading-[1.2] max-[1025px]:text-[4.2vw] max-md:text-[5.8vw] max-[1025px]:mb-[2vw]">
          {title}
        </h3>
        {description && (
          <p className="text-[1.25vw] leading-normal text-white/80 max-[1025px]:text-[2.8vw] max-md:text-[4vw]">
            {description}
          </p>
        )}
        {children}
      </div>
      <div className="relative mt-[3vw] h-px w-full bg-white/20 max-[1025px]:mt-[5vw]">
        <span
          ref={lineRef}
          className="absolute inset-0 h-px w-full origin-left scale-x-0 will-change-transform"
          style={{ backgroundColor: ACCENT }}
        />
      </div>
    </div>
  );
}
