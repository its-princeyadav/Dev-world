"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { HiMiniStar } from "react-icons/hi2";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import getCircularOffset from "@/lib/getCircularOffset";
import { testimonials as clientTestimonials } from "@/data/testimonials";
import { GRADIENT } from "@/constants/theme";
import { ArrowIcon } from "@/components/common/Icons";
import TextReveal from "@/components/animations/TextReveal";

// Client quotes in the shape the slider uses; avatars without a photo show the person's initials
const testimonials = clientTestimonials.map((item) => ({
  quote: item.quote,
  name: item.author,
  role: `${item.role}, ${item.company}`,
  rating: item.rating,
  image: item.image,
  initials: item.author
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2),
}));

const TOTAL = testimonials.length;
const SWIPE_DISTANCE = 100; // px a drag must travel to change slide
const AVATAR_EASE = "power4.out"; // close to cubic-bezier(0.22, 1, 0.36, 1) used originally

/**
 * Testimonials slider. Navigate with the avatars, the arrow buttons, or by swiping the card.
 * The avatar row always keeps the active person in the middle.
 */
export default function Testimonials({ title = "Don't Take It from Us, Take It from Our Clients" }) {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index) => setActiveIndex((index + TOTAL) % TOTAL);
  const goNext = () => setActiveIndex((current) => (current + 1) % TOTAL);
  const goPrevious = () => setActiveIndex((current) => (current - 1 + TOTAL) % TOTAL);

  // Fade the card, avatars and arrows up when the section comes into view
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".testimonial-fade", { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        ".testimonial-fade",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="w-screen bg-[#070707] py-[7vw] px-[4vw] max-[1025px]:px-[5vw] max-[1025px]:py-[12vw]"
    >
      <div className="w-full flex flex-col gap-[6vw] max-[1025px]:gap-[12vw]">
        <div className="w-[65%] mx-auto max-[1025px]:w-full">
          <TextReveal stagger={0.015}>
            <h2 className="text-[5.2vw] leading-[1.2]! text-center max-[1025px]:text-[7vw] max-md:text-[9vw]">
              {title}
            </h2>
          </TextReveal>
        </div>

        <div className="relative max-md:mt-10">
          <QuoteCard activeIndex={activeIndex} onNext={goNext} onPrevious={goPrevious} />
          <AvatarRow activeIndex={activeIndex} onSelect={goTo} />

          <div className="testimonial-fade opacity-0 flex justify-center gap-3 mt-[3vw] max-md:mt-[8vw]">
            <ArrowButton direction="left" label="Previous testimonial" onClick={goPrevious} />
            <ArrowButton direction="right" label="Next testimonial" onClick={goNext} />
          </div>
        </div>
      </div>
    </section>
  );
}

/** The glass card showing one quote. Fades between quotes and supports swiping. */
function QuoteCard({ activeIndex, onNext, onPrevious }) {
  const slideRef = useRef(null);
  const [shownIndex, setShownIndex] = useState(activeIndex);
  const dragStartX = useRef(null);
  const item = testimonials[shownIndex];

  // When the active testimonial changes: fade the current quote out, then swap it
  useEffect(() => {
    if (activeIndex === shownIndex) return;
    gsap.killTweensOf(slideRef.current);
    gsap.to(slideRef.current, { opacity: 0, y: 0, duration: 0.25, onComplete: () => setShownIndex(activeIndex) });
  }, [activeIndex, shownIndex]);

  // …and fade the new quote in (also runs on first render)
  useGSAP(
    () => {
      gsap.fromTo(slideRef.current, { opacity: 0, y: 20, x: 0 }, { opacity: 1, y: 0, duration: 0.25 });
    },
    { dependencies: [shownIndex] },
  );

  function handlePointerDown(event) {
    dragStartX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event) {
    if (dragStartX.current === null) return;
    // Elastic follow: the card moves half as far as the pointer
    gsap.set(slideRef.current, { x: (event.clientX - dragStartX.current) * 0.5 });
  }

  function handlePointerUp(event) {
    if (dragStartX.current === null) return;
    const distance = event.clientX - dragStartX.current;
    dragStartX.current = null;
    gsap.to(slideRef.current, { x: 0, duration: 0.3, ease: "power2.out" });
    if (distance > SWIPE_DISTANCE) onPrevious();
    else if (distance < -SWIPE_DISTANCE) onNext();
  }

  return (
    <div className="testimonial-fade opacity-0 relative w-3/5 mx-auto rounded-[2vw] border border-white/10 bg-white/5 overflow-hidden max-[1025px]:w-full max-[1025px]:rounded-[5vw] h-[30vw] max-[1025px]:h-[52vw] max-md:h-[95vw]">
      <div
        ref={slideRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="pt-[8vw] pb-[4vw] px-[6vw] w-full h-full flex flex-col items-center justify-center gap-[2.5vw] text-center max-[1025px]:pt-[14vw] max-[1025px]:px-[8vw] max-[1025px]:gap-[4vw] max-md:pt-[22vw] max-md:px-[7vw] max-md:pb-[8vw] max-md:gap-[6vw] select-none touch-pan-y"
        style={{ opacity: 0 }}
        aria-live="polite"
      >
        <div className="flex flex-col items-center gap-[0.4vw] max-md:gap-2">
          <p className="flex gap-1 text-[#ff6b00]" aria-label={`Rated ${item.rating} out of 5`}>
            {Array.from({ length: item.rating }, (_, index) => (
              <HiMiniStar key={index} aria-hidden="true" className="size-[1.2vw] max-[1025px]:size-[2.4vw] max-md:size-[4vw]" />
            ))}
          </p>
          <p className="text-[2.6vw] text-[#ff6b00] max-[1025px]:text-[4vw] max-md:text-[6vw]">{item.name}</p>
          <p className="text-[1.145vw] text-white max-[1025px]:text-[2.2vw] max-md:text-[3.6vw]">{item.role}</p>
        </div>
        <p className="text-[1.145vw] leading-[1.6] text-white/70 w-[82%] max-[1025px]:text-[2.2vw] max-[1025px]:w-full max-md:text-[3.6vw]">
          “{item.quote}”
        </p>
      </div>
    </div>
  );
}

/** Row of avatars arranged around the active one, which is enlarged with a gradient ring. */
function AvatarRow({ activeIndex, onSelect }) {
  const buttonRefs = useRef([]);
  // Layout position of each avatar after the previous change (offsetLeft ignores transforms)
  const previousLefts = useRef(null);

  // When the active avatar changes, the row reorders. Animate each avatar from where it was
  // to where it is now (the FLIP technique) and scale the active one up.
  useLayoutEffect(() => {
    const buttons = buttonRefs.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lefts = buttons.map((button) => button.offsetLeft);

    buttons.forEach((button, index) => {
      const scale = index === activeIndex ? 1.6 : 1;
      if (!previousLefts.current || reduced) {
        gsap.set(button, { x: 0, scale });
        return;
      }
      const startX = previousLefts.current[index] - lefts[index] + gsap.getProperty(button, "x");
      gsap.fromTo(button, { x: startX }, { x: 0, scale, duration: 0.6, ease: AVATAR_EASE, overwrite: true });
    });

    previousLefts.current = lefts;
  }, [activeIndex]);

  // Keep the remembered positions correct when the window is resized
  useEffect(() => {
    const remember = () => {
      previousLefts.current = buttonRefs.current.map((button) => button.offsetLeft);
    };
    window.addEventListener("resize", remember);
    return () => window.removeEventListener("resize", remember);
  }, []);

  return (
    <div className="testimonial-fade opacity-0 flex w-full justify-center items-center absolute -top-[2vw] left-1/2 -translate-x-1/2 max-md:-top-[6vw]">
      {testimonials.map((person, index) => {
        const offset = getCircularOffset(index, activeIndex, TOTAL);
        const isActive = offset === 0;
        return (
          <button
            key={person.name}
            ref={(element) => {
              buttonRefs.current[index] = element;
            }}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Show testimonial from ${person.name}`}
            aria-current={isActive}
            style={{ order: offset, zIndex: isActive ? 10 : TOTAL - Math.abs(offset) }}
            className={cn(
              "w-[5vw] h-[5vw] rounded-full overflow-hidden [clip-path:circle(50%)] cursor-pointer max-[1025px]:w-[9vw] max-[1025px]:h-[9vw] max-md:w-[12vw] max-md:h-[12vw]",
              isActive
                ? cn(GRADIENT, "p-[0.3vw] mx-[2vw] max-md:mx-[4vw]")
                : cn("opacity-60 hover:opacity-100 border border-white/20", offset < 0 ? "-mr-[1vw]" : "-ml-[1vw]"),
            )}
          >
            {person.image ? (
              <Image
                src={person.image}
                alt={person.name}
                width={120}
                height={120}
                className="w-full h-full object-cover object-top rounded-full"
              />
            ) : (
              <span className="flex w-full h-full items-center justify-center rounded-full bg-[#1a1a1a] text-[1.3vw] text-white max-[1025px]:text-[2.6vw] max-md:text-[3.8vw]">
                {person.initials}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function ArrowButton({ direction, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="size-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer relative group overflow-hidden max-md:size-10"
    >
      <ArrowIcon direction={direction} className="relative z-2" />
      <div className="absolute inset-0 w-full h-full bg-linear-to-r from-[#F16B0D] to-[#E61416] group-hover:scale-100 scale-0 ease-in-out origin-center rounded-full duration-300" />
    </button>
  );
}
