"use client";

import { useEffect, useRef, useState } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible, animated dialog.
 * - Fades/scales in and out with GSAP.
 * - Closes on Esc or a click on the blurred backdrop.
 * - Keeps keyboard focus inside while open and returns it to the opener afterwards.
 * - Locks page scrolling (including Lenis, via data-lenis-prevent).
 *
 * Props: isOpen, onClose, labelledBy (id of the dialog's heading), contentClassName, children
 */
export default function Modal({ isOpen, onClose, labelledBy, contentClassName = "", children }) {
  const dialogRef = useRef(null);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);
  const timelineRef = useRef(null);
  const openerRef = useRef(null);

  // While the closing animation plays the dialog must stay "active"
  const [isClosing, setIsClosing] = useState(false);
  const [previousIsOpen, setPreviousIsOpen] = useState(isOpen);
  if (isOpen !== previousIsOpen) {
    setPreviousIsOpen(isOpen);
    setIsClosing(!isOpen && previousIsOpen);
  }
  const isActive = isOpen || isClosing;

  // Open / close animation
  useGSAP(
    () => {
      timelineRef.current?.kill();
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const duration = reduced ? 0.2 : isOpen ? 0.7 : 0.5;
      const ease = reduced ? "none" : isOpen ? "power3.out" : "power2.in";
      const hiddenScale = reduced ? 1 : 0.8;

      if (isOpen) {
        timelineRef.current = gsap
          .timeline()
          .fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration, ease })
          .fromTo(contentRef.current, { opacity: 0, scale: hiddenScale }, { opacity: 1, scale: 1, duration, ease }, 0);
        return;
      }

      timelineRef.current = gsap
        .timeline({ onComplete: () => setIsClosing(false) })
        .to(backdropRef.current, { opacity: 0, duration, ease })
        .to(contentRef.current, { opacity: 0, scale: hiddenScale, duration, ease }, 0);
    },
    { dependencies: [isOpen], revertOnUpdate: false },
  );

  useEffect(() => () => timelineRef.current?.kill(), []);

  // Focus trap, Esc to close, and scroll lock while the dialog is active
  useEffect(() => {
    if (!isActive) return;
    const dialog = dialogRef.current;
    openerRef.current = document.activeElement;
    dialog?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose?.();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = Array.from(dialog.querySelectorAll(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null || element === document.activeElement,
      );
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const focusIsInside = dialog.contains(document.activeElement);

      if (event.shiftKey && (document.activeElement === first || !focusIsInside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !focusIsInside)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus?.();
    };
  }, [isActive, onClose]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      tabIndex={-1}
      data-lenis-prevent
      inert={!isOpen}
      aria-hidden={!isOpen || undefined}
      className={cn("site-body fixed inset-0 z-9999", isOpen ? "pointer-events-auto" : "pointer-events-none")}
    >
      {/* Blurred backdrop — clicking it closes the dialog */}
      <button
        ref={backdropRef}
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        style={{ opacity: 0 }}
        className="absolute inset-0 cursor-pointer border-0 backdrop-blur-lg bg-black/10 will-change-[opacity]"
      />

      <div
        ref={contentRef}
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose?.();
        }}
        style={{ opacity: 0, transform: "scale(0.8)" }}
        className={cn(
          "relative z-1 flex h-screen w-screen items-center will-change-[transform,opacity] px-0 max-[1025px]:px-0 max-md:justify-center max-md:px-0",
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
