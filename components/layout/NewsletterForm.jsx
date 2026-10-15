"use client";

import { useState } from "react";

import RollButton from "@/components/common/RollButton";
import { GRADIENT_CSS } from "@/constants/theme";

/** Footer newsletter signup. Posts to /api/newsletter. */
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"

  async function handleSubmit(event) {
    event.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(response.ok ? "success" : "error");
      if (response.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="get-in-touch-form mt-[1.6vw] max-[1025px]:mt-6">
      <div className="flex items-center gap-3 max-md:flex-col max-md:items-stretch">
        <label htmlFor="footer-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          className="h-14 flex-1 min-w-0 rounded-full border border-white/15 bg-white/15 pl-5 pr-4 text-sm text-white outline-none transition-all duration-300 focus:border-[#ff5f00]"
        />
        <RollButton
          type="submit"
          aria-disabled={status === "loading"}
          className="max-md:w-full"
          textClassName="text-[1.05vw] max-[1025px]:text-[2.5vw] max-md:text-[4vw]"
          bgColor={GRADIENT_CSS}
          dotColor="#ffffff"
          textColor="#ffffff"
          hoverTextColor="#111111"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </RollButton>
      </div>
      <div role="status" aria-live="polite">
        {status === "success" && <p className="mt-3 ml-4 text-sm text-green-500">Thanks — you&apos;re subscribed.</p>}
        {status === "error" && <p className="mt-3 ml-4 text-sm text-red-500">Something went wrong. Please try again.</p>}
      </div>
    </form>
  );
}
