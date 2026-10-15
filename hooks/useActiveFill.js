"use client";

import { useCallback, useRef, useState } from "react";

import { gsap } from "@/lib/gsap";

// --reveal value of a card's gradient mask: 100% = fully filled, -40% = empty
const FILLED = 100;
const EMPTY = -40;

/**
 * One-card-at-a-time gradient flood for a group of cards (see ServiceCard).
 * The first card starts filled; hovering another card drains the old one and floods the new one
 * through the radial mask's --reveal CSS variable.
 *
 * @returns {{ activeIndex: number, activate: (index: number) => void, getFillRef: (index: number) => Function }}
 */
export default function useActiveFill(count, reducedMotion) {
  const fillRefs = useRef([]);
  const fillValues = useRef(Array.from({ length: count }, (_, index) => ({ value: index === 0 ? FILLED : EMPTY })));
  const [activeIndex, setActiveIndex] = useState(0);

  const animateFill = useCallback(
    (index, value) => {
      const state = fillValues.current[index];
      gsap.to(state, {
        value,
        duration: reducedMotion ? 0 : 0.45,
        ease: "power2.out",
        onUpdate: () => fillRefs.current[index]?.style.setProperty("--reveal", `${state.value}%`),
      });
    },
    [reducedMotion],
  );

  const activate = useCallback(
    (index) => {
      if (index === activeIndex) return;
      animateFill(activeIndex, EMPTY);
      animateFill(index, FILLED);
      setActiveIndex(index);
    },
    [activeIndex, animateFill],
  );

  const getFillRef = useCallback(
    (index) => (element) => {
      fillRefs.current[index] = element;
      element?.style.setProperty("--reveal", `${fillValues.current[index].value}%`);
    },
    [],
  );

  return { activeIndex, activate, getFillRef };
}
