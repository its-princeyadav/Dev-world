"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiChevronDown } from "react-icons/hi2";
import { faqs } from "@/data/faqs";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function FaqAccordion() {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="bg-paper py-20 lg:py-28">
      <Container width="text">
        <div className="space-y-12">
          {faqs.map((group) => (
            <div key={group.category}>
              <h2 className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-accent">
                {group.category}
              </h2>
              <div className="divide-y divide-paper-border rounded-[20px] border border-paper-border">
                {group.items.map((item, i) => {
                  const id = `${group.category}-${i}`;
                  const isOpen = openId === id;
                  return (
                    <Reveal key={id} delay={0.02 * i}>
                      <div>
                        <button
                          type="button"
                          onClick={() => setOpenId(isOpen ? null : id)}
                          aria-expanded={isOpen}
                          aria-controls={`${id}-panel`}
                          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-medium text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          {item.q}
                          <HiChevronDown
                            className={`size-5 shrink-0 text-ink-500 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={`${id}-panel`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.3, 0, 0, 1] }}
                              className="overflow-hidden"
                            >
                              <p className="px-6 pb-5 text-sm leading-relaxed text-ink-600">
                                {item.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
