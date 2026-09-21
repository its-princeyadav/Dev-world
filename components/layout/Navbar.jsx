"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { HiBars3 } from "react-icons/hi2";
import { primaryNav } from "@/data/nav";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ServicesMegaMenu from "@/components/layout/ServicesMegaMenu";
import MobileNav from "@/components/layout/MobileNav";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || mobileOpen
            ? "bg-ink/80 backdrop-blur-lg border-b border-ink-border"
            : "bg-transparent border-b border-transparent"
        }`}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <Container>
          <nav
            className="flex h-16 items-center justify-between lg:h-20"
            aria-label="Primary"
          >
            <Link
              href="/"
              className="font-mono text-lg font-semibold tracking-tight text-white"
            >
              Dev <span className="text-accent">World</span>
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              {primaryNav.map((item) => (
                <div
                  key={item.href}
                  onMouseEnter={() => item.megaMenu && setMegaOpen(true)}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className="rounded-md px-4 py-2 text-sm font-medium text-mist-200 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-expanded={item.megaMenu ? megaOpen : undefined}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>

            <div className="hidden lg:block">
              <Button href="/contact" size="sm" variant="primary">
                Get in Touch
              </Button>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-white lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <HiBars3 className="size-7" />
            </button>
          </nav>
        </Container>

        <AnimatePresence>
          {megaOpen && <ServicesMegaMenu onClose={() => setMegaOpen(false)} />}
        </AnimatePresence>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
