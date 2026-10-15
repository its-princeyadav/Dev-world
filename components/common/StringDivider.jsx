"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import PluckString from "@/components/ui/PluckString";

const STRING_COLOR = "rgba(255, 255, 255, 0.4)";

/** Divider line that draws in from the left when scrolled to. Its content is a pluckable string. */
export default function StringDivider({ className }) {
  const lineRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(lineRef.current, { scaleX: 1 });
      return;
    }
    gsap.to(lineRef.current, {
      scaleX: 1,
      duration: 0.8,
      ease: "power2.inOut",
      scrollTrigger: { trigger: lineRef.current, start: "top 85%", toggleActions: "play none none none" },
    });
  });

  return (
    <div ref={lineRef} className={cn("relative h-px w-full origin-left scale-x-0", className)}>
      <PluckString strokeColor={STRING_COLOR} />
    </div>
  );
}
