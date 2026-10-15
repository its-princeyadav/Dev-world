"use client";

import { useRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { services, featuredServiceSlugs } from "@/data/services";
import { getServiceContent } from "@/data/serviceDetails";
import { PHONE_MAX_WIDTH, TABLET_MAX_WIDTH } from "@/constants/breakpoints";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import useActiveFill from "@/hooks/useActiveFill";
import TextReveal from "@/components/animations/TextReveal";
import RollButton from "@/components/common/RollButton";
import ServiceCard from "@/components/common/ServiceCard";

// Featured services, each listing its key capabilities
const FEATURED = services
  .filter((service) => featuredServiceSlugs.includes(service.slug))
  .map((service) => ({
    title: service.title,
    href: `/services/${service.slug}`,
    items: getServiceContent(service.slug).keyFeatures.map((feature) => feature.title),
  }));

/**
 * "Full-Stack Digital Services" (275vh tall).
 * The row of service cards slides sideways while scrolling. Hovering a card floods it with
 * the brand gradient (radial mask animated through the --reveal CSS variable).
 * With reduced motion the cards are shown as a static grid (see globals.css).
 */
export default function Services() {
  const rowRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const { activeIndex, activate, getFillRef } = useActiveFill(FEATURED.length, reducedMotion);

  // Horizontal scroll: the row starts off to the right and ends with its last card at the screen edge
  useGSAP(
    () => {
      // Layout changes when reduced motion toggles, so let ScrollTrigger re-measure.
      requestAnimationFrame(() => ScrollTrigger.refresh());

      if (reducedMotion) {
        gsap.set(rowRef.current, { clearProps: "transform" });
        return;
      }

      const width = window.innerWidth;
      const from = width > TABLET_MAX_WIDTH ? 70 : 50;
      const endPercent = () => {
        const row = rowRef.current;
        const fallback = width > TABLET_MAX_WIDTH ? -33 : width > PHONE_MAX_WIDTH ? -65 : -77;
        return row?.scrollWidth ? -((row.scrollWidth - window.innerWidth) / row.scrollWidth) * 100 : fallback;
      };
      gsap.fromTo(
        rowRef.current,
        { xPercent: from },
        {
          xPercent: endPercent,
          ease: "none",
          scrollTrigger: {
            trigger: "#services",
            start: "top 20%",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { dependencies: [reducedMotion], revertOnUpdate: true },
  );

  return (
    <section
      id="services"
      className={cn("services-section relative w-screen bg-[#070707] text-white", !reducedMotion && "h-[275vh]")}
    >
      <div className="relative pt-[6vw] px-[4vw] w-[60%] max-[1025px]:w-[85%] max-md:w-full max-[1025px]:px-[5vw] max-[1025px]:pt-[15vw]">
        <TextReveal stagger={0.015}>
          <h2 className="text-[5.5vw] leading-[1.2] max-[1025px]:text-[7vw] max-md:text-[9vw]">
            Full-Stack Digital Services
            <br />
            Under One Roof
          </h2>
        </TextReveal>
        <div className="w-[75%] max-[1025px]:w-full mt-[1.5vw] max-[1025px]:mt-[5vw]">
          <TextReveal splitBy="lines">
            <p className="text-[1.25vw] max-[1025px]:text-[2.5vw] max-md:text-[4.5vw]">
              From first sketch to production scale — we cover the entire product lifecycle so you don&apos;t have to
              stitch together vendors across design, engineering, and infrastructure.
            </p>
          </TextReveal>
        </div>
        <RollButton
          href="/services"
          className="mt-[2.5vw] max-[1025px]:mt-[6vw]"
          textClassName="font-normal text-[1.05vw] max-[1025px]:text-[2.6vw] max-md:text-[4.2vw]"
          bgColor="#ffffff"
          dotColor="#070707"
          hoverTextColor="#ffffff"
          textColor="#111111"
        >
          View All Services
        </RollButton>
      </div>

      <div
        className={cn(
          "services-sticky",
          reducedMotion
            ? "w-screen pb-[6vw]"
            : "w-screen h-screen sticky top-0 overflow-hidden flex flex-col max-md:mt-[-30vw]",
        )}
      >
        <div className={reducedMotion ? "" : "relative flex-1 flex items-center"}>
          <div
            ref={rowRef}
            className={cn(
              "services-row",
              reducedMotion
                ? "grid grid-cols-3 gap-[1.6vw] px-[4vw] pt-[5vw] max-[1025px]:grid-cols-2 max-md:grid-cols-1"
                : "flex w-max gap-[1.6vw] px-[4vw] will-change-transform max-[1025px]:gap-[2.5vw] max-md:gap-[6vw]",
            )}
          >
            {FEATURED.map((service, index) => (
              <ServiceCard
                key={service.title}
                {...service}
                isActive={index === activeIndex}
                onHover={() => activate(index)}
                fillRef={getFillRef(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
