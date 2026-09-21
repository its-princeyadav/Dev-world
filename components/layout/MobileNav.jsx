"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { HiXMark, HiChevronDown } from "react-icons/hi2";
import { primaryNav, megaMenuExplore } from "@/data/nav";
import { services } from "@/data/services";
import Button from "@/components/ui/Button";

export default function MobileNav({ open, onClose }) {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-ink lg:hidden"
        >
          <div className="flex h-16 items-center justify-between px-6">
            <span className="font-mono text-lg font-semibold text-white">
              Dev <span className="text-accent">World</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-md p-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <HiXMark className="size-7" />
            </button>
          </div>

          <nav className="flex h-[calc(100%-4rem)] flex-col overflow-y-auto px-6 pb-10 pt-4">
            <ul className="flex flex-col divide-y divide-ink-border">
              {primaryNav.map((item) =>
                item.megaMenu ? (
                  <li key={item.href} className="py-2">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-3 text-lg font-medium text-white"
                      onClick={() => setServicesOpen((v) => !v)}
                      aria-expanded={servicesOpen}
                    >
                      {item.label}
                      <HiChevronDown
                        className={`size-5 transition-transform ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-2"
                        >
                          {services.map((service) => (
                            <li key={service.slug}>
                              <Link
                                href={`/services/${service.slug}`}
                                onClick={onClose}
                                className="block py-2 text-sm text-mist-300 hover:text-white"
                              >
                                {service.title}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={item.href} className="py-2">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block py-3 text-lg font-medium text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>

            <ul className="mt-4 flex flex-col gap-3">
              {megaMenuExplore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="text-sm text-mist-400 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <Button href="/contact" onClick={onClose} className="w-full">
                Get in Touch
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
