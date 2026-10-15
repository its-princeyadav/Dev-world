// Inline SVG icons (Lucide designs, MIT licence). Decorative, so hidden from screen readers.
import { cn } from "@/lib/utils";

function LucideIcon({ name, size = 24, color = "currentColor", strokeWidth = 2, className, children }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide", `lucide-${name}`, className)}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function RocketIcon(props) {
  return (
    <LucideIcon name="rocket" {...props}>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" />
      <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />
    </LucideIcon>
  );
}

export function SparklesIcon(props) {
  return (
    <LucideIcon name="sparkles" {...props}>
      <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
      <path d="M20 2v4" />
      <path d="M22 4h-4" />
      <circle cx="4" cy="20" r="2" />
    </LucideIcon>
  );
}

export function ZapIcon(props) {
  return (
    <LucideIcon name="zap" {...props}>
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </LucideIcon>
  );
}

export function ArrowUpRightIcon(props) {
  return (
    <LucideIcon name="arrow-up-right" {...props}>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </LucideIcon>
  );
}

/** Thin arrow used by the testimonial prev/next buttons. */
export function ArrowIcon({ direction = "right", className }) {
  const path = direction === "left" ? "M19 12H5M5 12L12 19M5 12L12 5" : "M5 12H19M19 12L12 5M19 12L12 19";
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d={path} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Small chevron used by the phone country picker. */
export function ChevronDownIcon({ size = 12, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// Lets data files refer to icons by name (see data/workWithMe.js).
export const iconsByName = {
  rocket: RocketIcon,
  sparkles: SparklesIcon,
  zap: ZapIcon,
};
