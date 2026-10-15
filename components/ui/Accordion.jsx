"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";

import { gsap } from "@/lib/gsap";

/**
 * One expandable row. The parent decides which item is open (`isOpen`) and is told when the
 * row is clicked (`onToggle`). The answer's height animates with GSAP.
 *
 *   <AccordionItem isOpen={open} onToggle={toggle} title={<span>Question</span>}>
 *     <p>Answer</p>
 *   </AccordionItem>
 *
 * Props:
 * - title: content of the clickable row
 * - children: the answer
 * - className: classes for the row container
 * - contentClassName: classes for the answer's inner wrapper
 * - duration: open/close animation length in seconds
 */
export default function AccordionItem({
  isOpen,
  onToggle,
  title,
  children,
  className = "",
  contentClassName = "",
  duration = 0.45,
}) {
  const panelRef = useRef(null);
  const wasOpen = useRef(isOpen);
  // The panel's inline height is set from this once; after that GSAP owns it.
  // (If React kept updating the style, it would cut the closing animation short.)
  const [initiallyOpen] = useState(isOpen);
  const buttonId = useId();
  const panelId = useId();

  useLayoutEffect(() => {
    const panel = panelRef.current;
    // Only animate real changes (not the first render)
    if (wasOpen.current === isOpen) return;
    wasOpen.current = isOpen;

    gsap.killTweensOf(panel);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const time = reduced ? 0 : duration;

    if (isOpen) {
      // Measure the natural height, then grow from 0 to it
      gsap.set(panel, { overflow: "hidden", height: "auto" });
      const fullHeight = panel.scrollHeight;
      gsap.fromTo(
        panel,
        { height: 0 },
        {
          height: fullHeight,
          duration: time,
          ease: "power3.out",
          onComplete: () => gsap.set(panel, { height: "auto", overflow: "visible" }),
        },
      );
    } else {
      gsap.set(panel, { overflow: "hidden" });
      gsap.fromTo(panel, { height: panel.offsetHeight }, { height: 0, duration: time, ease: "power3.out" });
    }
  }, [isOpen, duration]);

  function handleClick(event) {
    // Let links or buttons inside the row work normally
    if (event.target.closest("a, button, input, textarea, select")) return;
    onToggle();
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle();
    }
  }

  return (
    <div
      id={buttonId}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-controls={panelId}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`cursor-pointer ${className}`}
    >
      <div className="flex w-full items-center justify-between gap-6">
        <div className="flex-1">{title}</div>
      </div>
      <div
        ref={panelRef}
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!isOpen}
        style={{ height: initiallyOpen ? "auto" : 0, overflow: initiallyOpen ? "visible" : "hidden" }}
      >
        <div className={contentClassName}>{children}</div>
      </div>
    </div>
  );
}
