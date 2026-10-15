"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { gsap, useGSAP } from "@/lib/gsap";
import { CONTACT, SITE_NAME } from "@/constants/site";
import { TABLET_MAX_WIDTH } from "@/constants/breakpoints";
import { footerNav } from "@/data/nav";
import RollButton from "@/components/common/RollButton";
import SocialLinks from "@/components/common/SocialLinks";
import NewsletterForm from "@/components/layout/NewsletterForm";
import { useContactModal } from "@/context/ContactModalContext";

const COLUMNS = [
  { title: "Company", items: footerNav.company },
  { title: "Work", items: footerNav.work },
  { title: "Resources", items: footerNav.resources },
];

/** Footer: call to action, newsletter, site links, contact details, social links and copyright. */
export default function Footer() {
  const footerRef = useRef(null);
  const cardRef = useRef(null);
  const { openModal } = useContactModal();

  // On desktop the glass card drifts up into place as the footer scrolls in.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(cardRef.current, { opacity: 1, yPercent: 0 });
        return;
      }
      if (window.innerWidth <= TABLET_MAX_WIDTH) return;

      gsap.fromTo(
        cardRef.current,
        { yPercent: 12 },
        {
          yPercent: 0,
          ease: "power1.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 60%", end: "bottom bottom", scrub: true },
        },
      );
    },
    { scope: footerRef },
  );

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative overflow-hidden bg-[#070707] px-[4vw] pt-[10vw] max-[1025px]:px-[5vw] max-md:pt-[20vw]"
    >
      <Image
        src="/images/footer-bg.svg"
        width={1920}
        height={900}
        alt=""
        className="absolute -bottom-20 left-0 right-0 w-full max-md:scale-[5] max-md:bottom-0"
      />

      <div className="relative z-[1]">
        <div
          ref={cardRef}
          className="rounded-4xl bg-black/5 border border-white/30 backdrop-blur-2xl px-12 py-12 flex flex-col gap-16 justify-between max-[1025px]:items-center max-[1025px]:gap-12 max-[1025px]:px-8 max-[1025px]:py-15 max-md:px-6 max-md:gap-10"
        >
          {/* Top row: logo + call to action */}
          <div className="flex justify-between items-start gap-24 w-full max-[1025px]:gap-10 max-md:gap-16 max-[1025px]:flex-col-reverse max-[1025px]:items-center">
            <Link href="/" aria-label={`${SITE_NAME} — home`}>
              <Image
                src="/images/logo.svg"
                width={442}
                height={77}
                alt={SITE_NAME}
                className="w-[22vw] max-[1025px]:w-[34vw] max-md:w-[46vw]"
              />
            </Link>
            <div className="flex flex-col gap-[2vw] items-end max-[1025px]:items-center max-[1025px]:text-center max-md:gap-[7vw]">
              <p className="text-[3.4vw] text-end w-[80%] leading-[1.15] max-[1025px]:text-[5vw] max-[1025px]:w-full max-[1025px]:text-center max-md:text-[7.5vw]">
                Let&apos;s Build Something Exceptional
              </p>
              <p className="text-[1.15vw] text-white/70 text-end w-[70%] max-[1025px]:text-[2.4vw] max-[1025px]:w-full max-[1025px]:text-center max-md:text-[4vw]">
                Tell us about your project — we&apos;ll respond within one business day with next steps.
              </p>
              <RollButton
                onClick={openModal}
                textClassName="font-normal text-[1.15vw] max-[1025px]:text-[3vw] max-md:text-[4.2vw]"
                bgColor="#ffffff"
                dotColor="#070707"
                hoverTextColor="#ffffff"
                textColor="#111111"
              >
                Start a Project
              </RollButton>
            </div>
          </div>

          {/* Middle row: newsletter + site links */}
          <div className="w-full grid grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)] gap-[6vw] border-t border-white/15 pt-[3vw] max-[1025px]:grid-cols-1 max-[1025px]:gap-12 max-[1025px]:pt-10">
            <div>
              <h2 className="text-[1.6vw] leading-[1.2] max-[1025px]:text-[3.4vw] max-md:text-[5.5vw]">
                Get product &amp; engineering insights in your inbox
              </h2>
              <p className="mt-[0.6vw] text-[1vw] text-white/60 max-[1025px]:mt-2 max-[1025px]:text-[2.2vw] max-md:text-[3.8vw]">
                One email a month. No spam, unsubscribe anytime.
              </p>
              <NewsletterForm />
            </div>

            <nav aria-label="Footer" className="grid grid-cols-3 gap-[2vw] max-md:grid-cols-2 max-md:gap-8">
              {COLUMNS.map((column) => (
                <div key={column.title}>
                  <h2 className="uppercase mb-5 text-[1vw] text-white/50 tracking-wider max-[1025px]:text-[2vw] max-md:text-[3.4vw]">
                    {column.title}
                  </h2>
                  <ul className="space-y-3 text-[1.15vw] max-[1025px]:text-[2.4vw] max-md:text-[4vw]">
                    {column.items.map((item) => (
                      <li key={item.href} className="under-multi-parent">
                        <Link href={item.href} className="under-multi">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom row: contact details + social links */}
          <div className="flex w-full items-end justify-between gap-36 h-auto max-[1025px]:items-center max-[1025px]:text-center max-[1025px]:gap-10 max-[1025px]:flex-col">
            <div className="w-fit">
              <h2 className="uppercase mb-5 text-[1.25vw] max-[1025px]:text-[2.4vw] max-md:text-[4vw]">Reach Out</h2>
              <ul className="space-y-2 text-[1.25vw] max-[1025px]:text-[2.4vw] max-md:text-[4vw]">
                <li className="under-multi-parent">
                  <a href={CONTACT.phoneHref} className="under-multi">
                    {CONTACT.phone}
                  </a>
                </li>
                <li className="under-multi-parent">
                  <a href={CONTACT.emailHref} className="under-multi">
                    {CONTACT.email}
                  </a>
                </li>
                <li className="text-white/70">{CONTACT.office}</li>
              </ul>
            </div>
            <div className="flex flex-col justify-between h-fit">
              <SocialLinks />
            </div>
          </div>
        </div>

        {/* Copyright + legal links */}
        <div className="flex justify-between py-8 pt-12 text-lg max-md:flex-col max-md:gap-3 max-md:text-sm max-md:text-center max-md:py-6 max-md:pt-8">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <ul className="flex gap-6 max-md:justify-center max-md:gap-4">
            {footerNav.legal.map((item) => (
              <li key={item.href} className="under-multi-parent">
                <Link href={item.href} className="under-multi">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
