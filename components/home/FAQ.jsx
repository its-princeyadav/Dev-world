"use client";

import { useRef, useState } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { GRADIENT } from "@/constants/theme";
import TextReveal from "@/components/animations/TextReveal";
import AccordionItem from "@/components/ui/Accordion";
import Eyebrow from "@/components/common/Eyebrow";
import RollButton from "@/components/common/RollButton";

/**
 * Frequently Asked Questions. One answer is open at a time; the first starts open.
 *
 * Props:
 * - groups: [{ category?, items: [{ q, a }] }] — a category label is shown when given
 * - title: section heading (pass null to hide it, e.g. under a page hero)
 * - action: { label, href } for a button under the list
 */
export default function FAQ({ groups, title = "Frequently Asked Questions", action }) {
  const sectionRef = useRef(null);
  const [openId, setOpenId] = useState("0-0");

  // Each question fades up as it scrolls into view
  useGSAP(
    () => {
      const items = gsap.utils.toArray(".faq-item");
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none none" },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="w-screen py-[6vw] px-[10vw] relative bg-[#070707] text-white max-[1025px]:px-[5vw] max-[1025px]:py-[12vw]"
    >
      {title && (
        <TextReveal stagger={0.015}>
          <h2 className="text-[5.5vw] text-center mb-[6vw] max-[1025px]:text-[7vw] max-md:text-[9vw]">{title}</h2>
        </TextReveal>
      )}

      <div className="w-full mx-auto flex flex-col gap-[5vw] max-[1025px]:gap-[10vw]">
        {groups.map((group, groupIndex) => (
          <div key={group.category ?? groupIndex}>
            {group.category && (
              <div className="faq-item opacity-0 mb-[1vw] max-[1025px]:mb-[3vw]">
                <Eyebrow>{group.category}</Eyebrow>
              </div>
            )}
            {group.items.map((faq, index) => {
              const id = `${groupIndex}-${index}`;
              const isOpen = openId === id;
              return (
                <div key={faq.q} className="faq-item opacity-0">
                  <AccordionItem
                    isOpen={isOpen}
                    onToggle={() => setOpenId((current) => (current === id ? null : id))}
                    className="border-b border-white/10 py-8 group max-md:py-5"
                    contentClassName="pt-4 pr-[3vw] w-[80%] max-[1025px]:w-full max-[1025px]:pr-0 max-md:w-full max-md:pr-0"
                    duration={0.5}
                    title={<Question text={faq.q} isOpen={isOpen} />}
                  >
                    <p className="text-[1.25vw] leading-[1.6] text-white/80 max-[1025px]:text-[2.2vw] max-md:text-[3.8vw]">
                      {faq.a}
                    </p>
                  </AccordionItem>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {action && (
        <div className="faq-item opacity-0 mt-[4vw] flex justify-center max-[1025px]:mt-[10vw]">
          <RollButton
            href={action.href}
            textClassName="font-normal text-[1.05vw] max-[1025px]:text-[2.6vw] max-md:text-[4.2vw]"
            bgColor="#ffffff"
            dotColor="#070707"
            hoverTextColor="#ffffff"
            textColor="#111111"
          >
            {action.label}
          </RollButton>
        </div>
      )}
    </section>
  );
}

// Question text with a plus/minus icon in a round button
function Question({ text, isOpen }) {
  return (
    <div className="flex items-center justify-between gap-6 w-full max-md:gap-4">
      <span className="text-[1.5vw] font-normal max-[1025px]:text-[2.6vw] max-md:text-[4.2vw]">{text}</span>
      <div
        aria-hidden="true"
        className="relative shrink-0 size-14 rounded-full overflow-hidden flex items-center justify-center transition-colors duration-300 ease-out border border-white/20 max-[1025px]:size-11 max-md:size-9"
      >
        {/* Horizontal bar */}
        <span className="absolute h-[2px] z-2 w-4 rounded-full bg-white max-md:w-3" />
        {/* Vertical bar: rotates flat when open, turning the plus into a minus */}
        <span
          className={cn(
            "absolute h-[2px] z-2 w-4 rounded-full bg-white transition-transform duration-300 ease-out max-md:w-3",
            isOpen ? "rotate-0" : "rotate-90",
          )}
        />
        <div
          className={cn(
            "absolute inset-0 w-full h-full group-hover:scale-100 scale-0 ease-in-out origin-center rounded-full duration-300",
            GRADIENT,
            isOpen ? "scale-100" : "scale-0",
          )}
        />
      </div>
    </div>
  );
}
