"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import useMediaQuery from "@/hooks/useMediaQuery";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { SMALL_PHONE_QUERY } from "@/constants/breakpoints";

const LETTER_EASE = "cubic-bezier(0.625, 0.05, 0, 1)";
const DOT_EASE = "cubic-bezier(0.785, 0.135, 0.15, 0.86)";

/**
 * Pill button with a dot that grows to fill it and letters that roll up on hover.
 * Renders a <Link> when `href` is given, a <button> otherwise.
 * On small phones there is no hover, so a tap plays the hover state for one second.
 */
export default function RollButton({
  children,
  href,
  type = "button",
  onClick,
  className = "",
  textClassName = "",
  bgColor = "#ff6b00",
  textColor = "#ffffff",
  hoverTextColor = "#ff6b00",
  dotColor = "#ffffff",
  ...rest
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isSmallPhone = useMediaQuery(SMALL_PHONE_QUERY);
  const reducedMotion = usePrefersReducedMotion();
  const tapTimer = useRef(null);

  useEffect(() => () => clearTimeout(tapTimer.current), []);

  function handlePointerDown(event) {
    if (!isSmallPhone || event.pointerType === "mouse") return;
    clearTimeout(tapTimer.current);
    setIsHovered(true);
    tapTimer.current = setTimeout(() => setIsHovered(false), 1000);
  }

  const label = String(children);
  const letters = [...label].map((letter, index) => (
    <span
      key={index}
      style={{
        display: "inline-block",
        position: "relative",
        whiteSpace: letter === " " ? "pre" : undefined,
        // A copy of the letter sits 1.3em below via text-shadow and rolls into view
        textShadow: "0px 1.3em currentColor",
        transform: isHovered ? "translateY(-1.3em) rotate(0.001deg)" : "translateY(0em) rotate(0.001deg)",
        transition: reducedMotion ? "none" : `transform 0.6s ${LETTER_EASE}, color 0.6s ${LETTER_EASE}`,
        transitionDelay: reducedMotion ? "0s" : `${0.01 * index}s`,
        willChange: "transform",
      }}
    >
      {letter}
    </span>
  ));

  const sharedProps = {
    ...rest,
    onClick,
    onMouseEnter: () => !isSmallPhone && setIsHovered(true),
    onMouseLeave: () => !isSmallPhone && setIsHovered(false),
    onPointerDown: handlePointerDown,
    className: cn(
      "group relative flex w-fit items-center justify-center gap-[0.9vw] h-[3.5vw] px-[2vw] rounded-full overflow-hidden whitespace-nowrap no-underline font-medium text-[1.5vw] transition-colors border-white/20! duration-500 motion-reduce:transition-none cursor-pointer",
      "max-[1025px]:gap-[1.6vw] max-[1025px]:h-[8vw] max-[1025px]:px-[3.5vw] max-[1025px]:text-[3vw] max-[1025px]:font-normal max-[1025px]:motion-reduce:transition-none",
      "max-md:gap-[2.4vw] max-md:h-[12vw] max-md:px-[5vw] max-md:text-[4.2vw] max-md:motion-reduce:transition-none",
      className,
    ),
    style: { background: bgColor, color: isHovered ? hoverTextColor : textColor },
  };

  const content = (
    <>
      {/* Dot that scales up to fill the whole pill on hover */}
      <span
        aria-hidden="true"
        className="relative z-10 flex shrink-0 items-center justify-center w-[0.5vw] h-[0.5vw] max-[1025px]:w-[1.5vw] max-[1025px]:h-[1.5vw] max-md:w-[2.3vw] max-md:h-[2.3vw]"
        style={{ marginTop: "0.08em" }}
      >
        <span
          className="absolute inset-0 rounded-full transition-transform duration-400 ease-in-out motion-reduce:transition-none"
          style={{
            background: dotColor,
            transform: isHovered ? "scale(120)" : "scale(1)",
            transitionTimingFunction: DOT_EASE,
          }}
        />
      </span>

      {/* Invisible copy of the label that gives the button its width */}
      <span aria-hidden="true" className={cn("invisible block h-[1.3em]", textClassName, "leading-[1.3]")}>
        {label}
      </span>

      {/* Visible rolling letters */}
      <span
        className={cn(
          "absolute left-1/2 top-1/2 z-20 block h-[1.3em] -translate-x-1/2 -translate-y-1/2 overflow-hidden",
          textClassName,
        )}
        style={{ marginTop: "0.08em" }}
      >
        <span className="block leading-[1.3]" aria-hidden="true">
          {letters}
        </span>
      </span>
      {/* Readable label for screen readers (the letters above are split into separate spans) */}
      <span className="sr-only">{label}</span>

      <span aria-hidden="true" className="block shrink-0 w-[0.5vw] max-[1025px]:w-[1.5vw] max-md:w-[2.3vw]" />
    </>
  );

  if (href) {
    return (
      <Link href={href} {...sharedProps}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} {...sharedProps}>
      {content}
    </button>
  );
}
