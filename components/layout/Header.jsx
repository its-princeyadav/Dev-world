"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { primaryNav } from "@/data/nav";
import RollButton from "@/components/common/RollButton";
import RollText from "@/components/common/RollText";
import ServicesMegaMenu from "@/components/layout/ServicesMegaMenu";
import MobileMenu from "@/components/layout/MobileMenu";
import { useContactModal } from "@/context/ContactModalContext";
import { GRADIENT } from "@/constants/theme";

/**
 * Fixed header. It starts invisible: on the home page the hero intro slides it in
 * (components/home/Hero.jsx); on every other page it slides in on load.
 * - Hides when scrolling down, comes back when scrolling up.
 * - Gets a background blur after the visitor scrolls 40% of the screen height.
 * - Desktop: navigation with a Services mega menu. Tablet/phone: full-screen menu.
 */
export default function Header() {
  const headerRef = useRef(null);
  const hiddenRef = useRef(false);
  const menuOpenRef = useRef(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useContactModal();
  const pathname = usePathname();
  const isHome = pathname === "/";

  // The scroll handler reads this to keep the header in view while a menu is open
  useEffect(() => {
    menuOpenRef.current = isMegaOpen || isMenuOpen;
  }, [isMegaOpen, isMenuOpen]);
  const closeMegaMenu = useCallback(() => setIsMegaOpen(false), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Close the menus whenever the route changes (state is adjusted during render, not in an effect)
  const [previousPathname, setPreviousPathname] = useState(pathname);
  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setIsMegaOpen(false);
    setIsMenuOpen(false);
  }

  // Off the home page there is no hero intro, so slide the header in here.
  useEffect(() => {
    const header = headerRef.current;
    if (isHome) return;
    if (Number(gsap.getProperty(header, "opacity")) < 1) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.fromTo(
        header,
        { yPercent: reduced ? 0 : -50, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: reduced ? 0.2 : 0.8, ease: "power3.out", delay: 0.2 },
      );
    }
  }, [isHome]);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const header = headerRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastScrollY = window.scrollY;

    // A new page starts with the header in view
    if (hiddenRef.current) {
      hiddenRef.current = false;
      gsap.to(header, { yPercent: 0, duration: 0.5, ease: "power3.out" });
    }

    function handleScroll() {
      const scrollY = window.scrollY;
      setIsBlurred(scrollY > 0.4 * window.innerHeight);

      if (!reducedMotion && !menuOpenRef.current) {
        const delta = scrollY - lastScrollY;
        if (delta > 0 && scrollY > 0 && !hiddenRef.current) {
          hiddenRef.current = true;
          gsap.to(header, { yPercent: -100, duration: 0.5, ease: "power3.out" });
        } else if (delta < 0 && hiddenRef.current) {
          hiddenRef.current = false;
          gsap.to(header, { yPercent: 0, duration: 0.5, ease: "power3.out" });
        }
      }
      lastScrollY = scrollY;
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Esc closes the mega menu
  useEffect(() => {
    if (!isMegaOpen) return;
    const handleKeyDown = (event) => event.key === "Escape" && setIsMegaOpen(false);
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMegaOpen]);

  return (
    <>
      <header
        ref={headerRef}
        id="header"
        onMouseLeave={() => setIsMegaOpen(false)}
        onBlur={(event) => {
          // Keyboard users: close the mega menu once focus leaves the header
          if (!event.currentTarget.contains(event.relatedTarget)) setIsMegaOpen(false);
        }}
        className={cn(
          "w-screen h-fit py-[1.5vw] flex items-center justify-between px-[4vw] fixed inset-0 z-99 opacity-0 transition-[backdrop-filter] duration-500 ease-out max-[1025px]:py-[3vw] max-[1025px]:px-[5vw] max-md:py-4",
          isBlurred || isMegaOpen ? "backdrop-blur-lg" : "backdrop-blur-none",
        )}
      >
        <Link href="/" aria-label="Dev World — home" className="relative z-2">
          <Image
            src="/images/logo.svg"
            width={442}
            height={77}
            alt="Dev World"
            priority
            className="w-[12vw] max-[1025px]:w-[25vw] max-md:w-[34vw]"
          />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="max-[1025px]:hidden">
          <ul className="flex items-center gap-[2.4vw]">
            {primaryNav.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li
                  key={item.href}
                  onMouseEnter={() => setIsMegaOpen(Boolean(item.megaMenu))}
                  onFocus={() => item.megaMenu && setIsMegaOpen(true)}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    aria-expanded={item.megaMenu ? isMegaOpen : undefined}
                    aria-haspopup={item.megaMenu ? "true" : undefined}
                    className="group relative flex items-center gap-[0.6vw] py-[0.5vw] text-[1.05vw] text-white"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-[0.4vw] rounded-full transition-transform duration-500 ease-out",
                        GRADIENT,
                        isActive ? "scale-100" : "scale-0",
                      )}
                    />
                    <RollText>{item.label}</RollText>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="relative z-2 flex items-center gap-[1vw] max-[1025px]:gap-[2.5vw]">
          <RollButton
            onClick={openModal}
            className="border border-white/20! max-md:hidden"
            textClassName="font-normal text-[1.15vw] max-[1025px]:text-[3vw] max-md:text-[4.2vw]"
            bgColor="#ffffff"
            dotColor="#070707"
            hoverTextColor="#ffffff"
            textColor="#111111"
          >
            Get in Touch
          </RollButton>
          <MenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)} />
        </div>

        <ServicesMegaMenu isOpen={isMegaOpen} onClose={closeMegaMenu} />
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}

// Round gradient button whose two bars turn into an "X" while the menu is open (tablet and phone)
function MenuButton({ isOpen, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      className="relative hidden shrink-0 size-[8vw] rounded-full overflow-hidden items-center justify-center cursor-pointer max-[1025px]:flex max-md:size-[12vw]"
    >
      <span className={cn("absolute inset-0", GRADIENT)} />
      <span
        className={cn(
          "absolute z-2 h-0.5 w-[35%] rounded-full bg-white transition-transform duration-500 ease-in-out",
          isOpen ? "rotate-45" : "-translate-y-[0.35em]",
        )}
      />
      <span
        className={cn(
          "absolute z-2 h-0.5 w-[35%] rounded-full bg-white transition-transform duration-500 ease-in-out",
          isOpen ? "-rotate-45" : "translate-y-[0.35em]",
        )}
      />
    </button>
  );
}
