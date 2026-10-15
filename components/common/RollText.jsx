import { cn } from "@/lib/utils";

const LETTER_EASE = "cubic-bezier(0.625, 0.05, 0, 1)";

/**
 * Text whose letters roll up to reveal a copy when the nearest `group` parent is hovered or focused.
 * Same motion as the RollButton label, without the pill. Used by the header navigation.
 */
export default function RollText({ children, className }) {
  const label = String(children);

  return (
    <span className={cn("relative block h-[1.3em] overflow-hidden", className, "leading-[1.3]")}>
      <span aria-hidden="true" className="block">
        {[...label].map((letter, index) => (
          <span
            key={index}
            className="relative inline-block group-hover:-translate-y-[1.3em] group-focus-visible:-translate-y-[1.3em] motion-reduce:transition-none"
            style={{
              whiteSpace: letter === " " ? "pre" : undefined,
              // A copy of the letter sits 1.3em below via text-shadow and rolls into view
              textShadow: "0px 1.3em currentColor",
              transition: `transform 0.6s ${LETTER_EASE}`,
              transitionDelay: `${0.01 * index}s`,
            }}
          >
            {letter}
          </span>
        ))}
      </span>
      <span className="sr-only">{label}</span>
    </span>
  );
}
