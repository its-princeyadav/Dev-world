import { cn } from "@/lib/utils";
import TextReveal from "@/components/animations/TextReveal";
import Eyebrow from "@/components/common/Eyebrow";

const TITLE_SIZES = {
  lg: "text-[5.5vw] max-[1025px]:text-[7vw] max-md:text-[9vw]",
  md: "text-[4vw] max-[1025px]:text-[6vw] max-md:text-[8.5vw]",
};

/**
 * Section title in the site's style: an optional eyebrow, a large heading whose characters
 * slide up on scroll, and an optional paragraph revealed line by line.
 *
 * Props: eyebrow, title, description, align ("left" | "center"), size ("lg" | "md"),
 * as (heading tag), className, children (e.g. a button under the text)
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  size = "lg",
  as: Heading = "h2",
  className,
  children,
}) {
  const isCentered = align === "center";

  return (
    <div className={cn(isCentered ? "mx-auto text-center" : "w-[60%] max-[1025px]:w-[85%] max-md:w-full", className)}>
      {eyebrow && <Eyebrow className={cn("mb-[1.5vw] max-[1025px]:mb-[3vw]", isCentered && "justify-center")}>{eyebrow}</Eyebrow>}
      <TextReveal stagger={0.015}>
        <Heading className={cn(TITLE_SIZES[size], "leading-[1.15]")}>{title}</Heading>
      </TextReveal>
      {description && (
        <div
          className={cn(
            "mt-[1.5vw] max-[1025px]:mt-[4vw]",
            isCentered ? "w-[55%] mx-auto max-[1025px]:w-[80%] max-md:w-full" : "w-[80%] max-[1025px]:w-full",
          )}
        >
          <TextReveal splitBy="lines">
            <p className="text-[1.25vw] leading-[1.5] text-white/80 max-[1025px]:text-[2.5vw] max-md:text-[4.5vw]">
              {description}
            </p>
          </TextReveal>
        </div>
      )}
      {children && <div className={cn("mt-[2.5vw] max-[1025px]:mt-[6vw] flex", isCentered && "justify-center")}>{children}</div>}
    </div>
  );
}
