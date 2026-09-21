"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { services, featuredServiceSlugs } from "@/data/services";
import { megaMenuExplore } from "@/data/nav";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";

const featured = services.filter((s) => featuredServiceSlugs.includes(s.slug));

export default function ServicesMegaMenu({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
      className="absolute inset-x-0 top-full border-b border-ink-border bg-ink/95 backdrop-blur-lg"
    >
      <Container className="grid grid-cols-1 gap-10 py-10 lg:grid-cols-[1fr_260px]">
        <div>
          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-mist-400">
            Featured Services
          </p>
          <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
            {featured.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                onClick={onClose}
                className="group flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-accent/20 to-cyan/20 text-accent">
                  <Icon name={service.icon} size={18} />
                </span>
                <span>
                  <span className="block text-sm font-medium text-white">
                    {service.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-mist-400">
                    {service.short}
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/services"
            onClick={onClose}
            className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-bright"
          >
            View all services →
          </Link>
        </div>

        <div className="border-t border-ink-border pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-mist-400">
            Explore
          </p>
          <ul className="space-y-3">
            {megaMenuExplore.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="text-sm text-mist-200 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </motion.div>
  );
}
