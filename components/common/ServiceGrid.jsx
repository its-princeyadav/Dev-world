"use client";

import { cn } from "@/lib/utils";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import useActiveFill from "@/hooks/useActiveFill";
import FadeUp from "@/components/animations/FadeUp";
import ServiceCard from "@/components/common/ServiceCard";

/**
 * Grid of ServiceCards. The first card starts filled with the brand gradient and the fill
 * follows the hovered card, like the home page's services row.
 *
 * Props: items ([{ title, href, description?, items?, icon? }]), className (grid columns)
 */
export default function ServiceGrid({ items, className }) {
  const reducedMotion = usePrefersReducedMotion();
  const { activeIndex, activate, getFillRef } = useActiveFill(items.length, reducedMotion);

  return (
    <FadeUp
      className={cn(
        "grid grid-cols-3 gap-[1.6vw] max-[1025px]:grid-cols-2 max-[1025px]:gap-[2.5vw] max-md:grid-cols-1 max-md:gap-[5vw]",
        className,
      )}
    >
      {items.map((item, index) => (
        <ServiceCard
          key={item.href ?? item.title}
          {...item}
          layout="grid"
          isActive={index === activeIndex}
          onHover={() => activate(index)}
          fillRef={getFillRef(index)}
        />
      ))}
    </FadeUp>
  );
}
