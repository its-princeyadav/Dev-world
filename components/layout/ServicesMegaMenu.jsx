"use client";

import { useRef } from "react";
import Link from "next/link";

import { gsap, useGSAP } from "@/lib/gsap";
import { services, featuredServiceSlugs } from "@/data/services";
import { megaMenuExplore } from "@/data/nav";
import Icon from "@/components/ui/Icon";
import { ArrowUpRightIcon } from "@/components/common/Icons";
import { GRADIENT } from "@/constants/theme";

const featured = services.filter((service) => featuredServiceSlugs.includes(service.slug));

/**
 * Glass panel that drops down from the header when "Services" is hovered or focused (desktop only).
 * Featured services on the left, the "Explore" links on the right.
 */
export default function ServicesMegaMenu({ isOpen, onClose }) {
  const panelRef = useRef(null);

  useGSAP(
    () => {
      const panel = panelRef.current;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.killTweensOf([panel, ".mega-item"]);

      if (isOpen) {
        gsap.set(panel, { visibility: "visible" });
        gsap.fromTo(
          panel,
          { opacity: 0, y: reduced ? 0 : -16 },
          { opacity: 1, y: 0, duration: reduced ? 0.15 : 0.5, ease: "power3.out" },
        );
        if (!reduced) {
          gsap.fromTo(
            ".mega-item",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.03, ease: "power3.out", delay: 0.05 },
          );
        }
        return;
      }

      gsap.to(panel, {
        opacity: 0,
        y: reduced ? 0 : -10,
        duration: reduced ? 0.1 : 0.3,
        ease: "power2.in",
        onComplete: () => gsap.set(panel, { visibility: "hidden" }),
      });
    },
    { dependencies: [isOpen], scope: panelRef },
  );

  return (
    <div
      ref={panelRef}
      inert={!isOpen}
      style={{ visibility: "hidden", opacity: 0 }}
      className="absolute left-[4vw] right-[4vw] top-full max-[1025px]:hidden"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_18vw] gap-[3vw] rounded-[1.5vw] border border-white/15 bg-[#0b0b0b]/85 backdrop-blur-2xl p-[2.5vw] shadow-2xl">
        <div>
          <p className="mb-[1.5vw] text-[0.9vw] uppercase tracking-wider text-white/50">Featured Services</p>
          <ul className="grid grid-cols-3 gap-[0.5vw]">
            {featured.map((service) => (
              <li key={service.slug} className="mega-item">
                <Link
                  href={`/services/${service.slug}`}
                  onClick={onClose}
                  className="group flex items-start gap-[1vw] rounded-[1vw] p-[1vw] transition-colors duration-300 hover:bg-white/5"
                >
                  <span className="relative flex size-[2.8vw] shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 text-[#F16B0D] transition-colors duration-300 group-hover:text-white">
                    <span
                      className={`absolute inset-0 scale-0 rounded-full transition-transform duration-300 ease-in-out group-hover:scale-100 ${GRADIENT}`}
                    />
                    <Icon name={service.icon} variant="outline" className="relative z-1 size-[1.3vw]" />
                  </span>
                  <span>
                    <span className="block text-[1.05vw] text-white">{service.title}</span>
                    <span className="mt-[0.2vw] block text-[0.85vw] leading-snug text-white/55">{service.short}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/services"
            onClick={onClose}
            className="mega-item under-multi-parent mt-[1.5vw] inline-flex items-center gap-[0.5vw] text-[1vw] text-white"
          >
            <span className="under-multi">View all services</span>
            <ArrowUpRightIcon size={16} />
          </Link>
        </div>

        <div className="border-l border-white/10 pl-[3vw]">
          <p className="mb-[1.5vw] text-[0.9vw] uppercase tracking-wider text-white/50">Explore</p>
          <ul className="space-y-[0.9vw]">
            {megaMenuExplore.map((item) => (
              <li key={item.href} className="mega-item under-multi-parent">
                <Link href={item.href} onClick={onClose} className="under-multi text-[1.15vw] text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
