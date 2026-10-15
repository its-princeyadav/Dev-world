"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { primaryNav, megaMenuExplore } from "@/data/nav";
import { services } from "@/data/services";
import { CONTACT } from "@/constants/site";
import { HERO_BACKGROUND } from "@/constants/theme";
import AccordionItem from "@/components/ui/Accordion";
import RollButton from "@/components/common/RollButton";
import SocialLinks from "@/components/common/SocialLinks";
import { useContactModal } from "@/context/ContactModalContext";

/**
 * Full-screen navigation for tablet and phone. The warm hero gradient wipes down from the top,
 * then the links slide up line by line. Services expand into the full service list.
 * Esc closes it; page scrolling is paused while it is open.
 */
export default function MobileMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { openModal } = useContactModal();
  const pathname = usePathname();
  const lenis = useLenis();

  useGSAP(
    () => {
      const menu = menuRef.current;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.killTweensOf([menu, ".menu-line", ".menu-fade"]);

      if (isOpen) {
        gsap.set(menu, { visibility: "visible" });
        if (reduced) {
          gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.2 });
          return;
        }
        gsap
          .timeline()
          .fromTo(
            menu,
            { opacity: 1, clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power4.inOut" },
          )
          .fromTo(
            ".menu-line",
            { yPercent: 110 },
            { yPercent: 0, duration: 0.7, stagger: 0.05, ease: "power3.out" },
            0.35,
          )
          .fromTo(".menu-fade", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.6);
        return;
      }

      gsap.to(menu, {
        ...(reduced ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }),
        duration: reduced ? 0.15 : 0.6,
        ease: "power4.inOut",
        onComplete: () => gsap.set(menu, { visibility: "hidden" }),
      });
    },
    { dependencies: [isOpen], scope: menuRef },
  );

  // Pause scrolling, close on Esc, and move focus into the menu while it is open
  useEffect(() => {
    if (!isOpen) return;
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const opener = document.activeElement;
    menuRef.current?.querySelector('a, button, [role="button"]')?.focus({ preventScroll: true });

    const handleKeyDown = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      opener?.focus?.({ preventScroll: true });
    };
  }, [isOpen, lenis, onClose]);

  return (
    <div
      ref={menuRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!isOpen}
      data-lenis-prevent
      style={{ ...HERO_BACKGROUND, visibility: "hidden" }}
      className="fixed inset-0 z-98 hidden overflow-y-auto px-[5vw] pt-[24vw] pb-[10vw] text-white max-[1025px]:block max-md:pt-[28vw]"
    >
      <nav aria-label="Mobile">
        <ul className="flex flex-col">
          {primaryNav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const lineClass = "text-[7vw] leading-[1.15] max-md:text-[10vw]";

            if (item.megaMenu) {
              return (
                <li key={item.href} className="overflow-hidden border-b border-white/20 py-[2vw]">
                  <div className="menu-line">
                    <AccordionItem
                      isOpen={isServicesOpen}
                      onToggle={() => setIsServicesOpen((open) => !open)}
                      title={
                        <span className={cn("flex items-center justify-between", lineClass)}>
                          {item.label}
                          <span
                            aria-hidden="true"
                            className={cn(
                              "text-[5vw] transition-transform duration-300 max-md:text-[7vw]",
                              isServicesOpen && "rotate-45",
                            )}
                          >
                            +
                          </span>
                        </span>
                      }
                    >
                      <ul className="grid grid-cols-2 gap-x-[4vw] gap-y-[2vw] pb-[3vw] pt-[2vw] max-md:grid-cols-1">
                        <li>
                          <Link href="/services" onClick={onClose} className="text-[2.6vw] text-white max-md:text-[4.2vw]">
                            All services →
                          </Link>
                        </li>
                        {services.map((service) => (
                          <li key={service.slug}>
                            <Link
                              href={`/services/${service.slug}`}
                              onClick={onClose}
                              className="text-[2.6vw] text-white/80 max-md:text-[4.2vw]"
                            >
                              {service.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionItem>
                  </div>
                </li>
              );
            }

            return (
              <li key={item.href} className="overflow-hidden border-b border-white/20 py-[2vw]">
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive ? "page" : undefined}
                  className={cn("menu-line block", lineClass)}
                >
                  {item.label}
                  {isActive && <span className="ml-[2vw] inline-block size-[1.6vw] rounded-full bg-white align-middle" />}
                </Link>
              </li>
            );
          })}
        </ul>

        <ul className="menu-fade mt-[6vw] flex flex-wrap gap-x-[5vw] gap-y-[2.5vw]">
          {[...megaMenuExplore, { label: "Contact", href: "/contact" }].map((item) => (
            <li key={item.href} className="under-multi-parent">
              <Link href={item.href} onClick={onClose} className="under-multi text-[2.8vw] max-md:text-[4.4vw]">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="menu-fade mt-[8vw] flex flex-col gap-[6vw]">
        <RollButton
          onClick={() => {
            onClose();
            openModal();
          }}
          textClassName="font-normal text-[3vw] max-md:text-[4.2vw]"
          bgColor="#ffffff"
          dotColor="#070707"
          hoverTextColor="#ffffff"
          textColor="#111111"
        >
          Get in Touch
        </RollButton>
        <div className="flex items-end justify-between gap-[4vw] max-md:flex-col max-md:items-start">
          <div className="text-[2.6vw] max-md:text-[4.2vw]">
            <a href={CONTACT.emailHref} className="block">
              {CONTACT.email}
            </a>
            <a href={CONTACT.phoneHref} className="block text-white/80">
              {CONTACT.phone}
            </a>
          </div>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
