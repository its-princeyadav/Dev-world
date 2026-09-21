import { cn } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-accent">
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2
          className={cn(
            "mt-3 text-balance text-3xl font-semibold leading-[1.15] tracking-[-0.01em] sm:text-4xl",
            dark ? "text-white" : "text-ink-900"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-4 text-lg leading-relaxed",
              dark ? "text-mist-300" : "text-ink-600"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
