"use client";

import { useEffect, useRef } from "react";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { playPluck } from "@/lib/pluckSound";

/**
 * A 1px line that behaves like a guitar string: move the mouse up or down across it to bend it,
 * and when the mouse leaves it vibrates back to rest and plays a plucked note.
 */
export default function PluckString({ strokeColor = "#111111", strokeWidth = 2, sound = true }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const pullRef = useRef(0); // current bend in px
  const phaseRef = useRef(Math.PI / 2); // vibration phase
  const frameRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  // Draws the string as a quadratic curve whose middle is pulled by `offset` px
  function draw(offset) {
    const width = containerRef.current?.offsetWidth ?? 0;
    pathRef.current?.setAttribute("d", `M 0 50 Q ${0.5 * width} ${50 + offset} ${width} 50`);
  }

  function stopVibration() {
    if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
  }

  // Damped oscillation back to a straight line
  function vibrate() {
    draw(pullRef.current * Math.sin(phaseRef.current));
    pullRef.current *= 0.95;
    phaseRef.current += 0.5;
    if (Math.abs(pullRef.current) > 0.1) {
      frameRef.current = requestAnimationFrame(vibrate);
    } else {
      phaseRef.current = Math.PI / 2;
      pullRef.current = 0;
      frameRef.current = null;
    }
  }

  useEffect(() => {
    const redraw = () => draw(reducedMotion ? 0 : pullRef.current);
    redraw();
    window.addEventListener("resize", redraw);
    return () => {
      window.removeEventListener("resize", redraw);
      stopVibration();
    };
  }, [reducedMotion]);

  function handleMouseEnter() {
    stopVibration();
    phaseRef.current = Math.PI / 2;
  }

  function handleMouseMove(event) {
    pullRef.current += event.movementY / 2;
    draw(pullRef.current);
  }

  function handleMouseLeave() {
    stopVibration();
    if (sound) playPluck(pullRef.current);
    vibrate();
  }

  return (
    <div ref={containerRef} className="w-full">
      <div className="string-line lineDraw">
        <span
          className="box"
          onMouseEnter={reducedMotion ? undefined : handleMouseEnter}
          onMouseMove={reducedMotion ? undefined : handleMouseMove}
          onMouseLeave={reducedMotion ? undefined : handleMouseLeave}
        />
        <svg width="100%" height={100} aria-hidden="true">
          <path ref={pathRef} strokeWidth={strokeWidth} fill="none" style={{ stroke: strokeColor }} />
        </svg>
      </div>
    </div>
  );
}
