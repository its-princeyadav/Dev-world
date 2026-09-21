"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HiOutlineSparkles } from "react-icons/hi2";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const stats = [
  { value: "120+", label: "Products shipped" },
  { value: "98%", label: "Client retention" },
  { value: "40+", label: "Engineers & designers" },
  { value: "12", label: "Countries served" },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="bg-grid relative overflow-hidden bg-ink pb-24 pt-32 lg:pb-32 lg:pt-44"
    >
      <div
        className="bg-radial-glow pointer-events-none absolute inset-x-0 top-0 h-[560px]"
        aria-hidden="true"
      />

      <Container className="relative">
        <motion.div
          style={{ y, opacity }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.3, 0, 0, 1] }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-ink-border bg-ink-soft px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.08em] text-mist-300"
          >
            <HiOutlineSparkles className="size-4 text-accent" />
            Full-cycle digital product studio
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.3, 0, 0, 1] }}
            className="text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl"
          >
            Engineering{" "}
            <span className="bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent">
              exceptional
            </span>{" "}
            software, end to end
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.3, 0, 0, 1] }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-mist-300"
          >
            We design, build, and scale web, mobile, cloud, and AI-powered
            products for startups and enterprises — combining senior
            engineering talent with a product-led design process.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.3, 0, 0, 1] }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button href="/contact" size="lg">
              Start a project
            </Button>
            <Button href="/portfolio" size="lg" variant="secondary-dark">
              View our work
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.3, 0, 0, 1] }}
          className="relative mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-ink-border bg-ink-border sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-ink-soft px-4 py-6 text-center sm:px-6"
            >
              <p className="font-mono text-3xl font-semibold text-white">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-mist-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </Container>

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-[140%] -translate-x-1/2 rounded-[100%] bg-ink blur-2xl" aria-hidden="true" />
    </section>
  );
}
