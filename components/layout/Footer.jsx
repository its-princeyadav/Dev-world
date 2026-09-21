"use client";

import Link from "next/link";
import { useState } from "react";
import { FaLinkedin, FaXTwitter, FaGithub } from "react-icons/fa6";
import { footerNav, socialLinks } from "@/data/nav";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const socialIcons = {
  linkedin: FaLinkedin,
  x: FaXTwitter,
  github: FaGithub,
};

const columns = [
  { title: "Company", items: footerNav.company },
  { title: "Work", items: footerNav.work },
  { title: "Resources", items: footerNav.resources },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleSubscribe(e) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
    setEmail("");
  }

  return (
    <footer className="relative overflow-hidden border-t border-ink-border bg-ink">
      <div
        className="bg-radial-glow pointer-events-none absolute inset-x-0 top-0 h-96"
        aria-hidden="true"
      />
      <Container className="relative py-16 lg:py-20">
        <div className="flex flex-col gap-8 border-b border-ink-border pb-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <h2 className="text-2xl font-semibold text-white">
              Get product & engineering insights in your inbox
            </h2>
            <p className="mt-2 text-sm text-mist-400">
              One email a month. No spam, unsubscribe anytime.
            </p>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="h-12 flex-1 rounded-md border border-ink-border bg-ink-soft px-4 text-sm text-white placeholder:text-mist-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            />
            <Button
              type="submit"
              icon={false}
              size="md"
              disabled={status === "loading"}
            >
              {status === "success" ? "Subscribed" : "Subscribe"}
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-10 py-12 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/"
              className="font-mono text-lg font-semibold text-white"
            >
              Dev <span className="text-accent">World</span>
            </Link>
            <p className="mt-3 max-w-[220px] text-sm text-mist-400">
              Premium software engineering for ambitious digital products.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-mist-400">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-mist-300 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-ink-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-mist-400">
            © {new Date().getFullYear()} Dev World. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerNav.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-mist-400 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const SocialIcon = socialIcons[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-mist-400 hover:text-white"
                >
                  <SocialIcon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}
