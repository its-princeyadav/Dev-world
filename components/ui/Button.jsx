"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-[14px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-accent text-white hover:bg-accent-bright shadow-elev-sm",
  secondary:
    "bg-transparent border border-paper-border text-ink-900 hover:bg-paper-soft",
  "secondary-dark":
    "bg-transparent border border-ink-border text-white hover:bg-ink-soft",
  ghost: "bg-transparent text-accent px-0 hover:text-accent-bright",
  "on-dark": "bg-white text-ink hover:bg-mist-200",
};

const sizes = {
  sm: "h-9 px-5 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  icon = true,
  className,
  children,
  ...props
}) {
  const classes = cn(
    base,
    variants[variant],
    variant !== "ghost" && sizes[size],
    variant === "ghost" && "text-base",
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <motion.span
          className="inline-flex"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
        >
          <HiArrowRight className="size-[1.1em]" aria-hidden="true" />
        </motion.span>
      )}
    </>
  );

  const motionProps =
    variant !== "ghost"
      ? { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } }
      : {};

  if (href) {
    return (
      <motion.div className="inline-block" {...motionProps}>
        <Link href={href} className={classes} {...props}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button className={classes} {...motionProps} {...props}>
      {content}
    </motion.button>
  );
}
