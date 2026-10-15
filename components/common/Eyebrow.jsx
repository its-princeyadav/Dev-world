import { cn } from "@/lib/utils";
import { GRADIENT } from "@/constants/theme";

/** Small uppercase label with a gradient dot, shown above headings. */
export default function Eyebrow({ children, className }) {
  return (
    <p
      className={cn(
        "flex items-center gap-[0.7vw] text-[1vw] uppercase tracking-[0.12em] text-white/80 max-[1025px]:gap-[1.6vw] max-[1025px]:text-[2.2vw] max-md:gap-[2.4vw] max-md:text-[3.4vw]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-[0.5vw] shrink-0 rounded-full max-[1025px]:size-[1.2vw] max-md:size-[2vw]", GRADIENT)}
      />
      {children}
    </p>
  );
}
