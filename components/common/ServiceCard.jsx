import Link from "next/link";

import { cn } from "@/lib/utils";
import { GRADIENT } from "@/constants/theme";
import { ArrowUpRightIcon } from "@/components/common/Icons";
import Icon from "@/components/ui/Icon";

const LAYOUTS = {
  // Fixed-size card in the home page's sideways-scrolling row
  row: "w-[27vw] h-[30vw] shrink-0 max-[1025px]:w-[55vw] max-[1025px]:h-[65vw] max-md:w-[75vw] max-md:h-[85vw]",
  // Card in a responsive grid
  grid: "min-h-[24vw] max-[1025px]:min-h-[42vw] max-md:min-h-[70vw]",
};

/**
 * Dark card that floods with the brand gradient while active (see hooks/useActiveFill.js).
 * The arrow badge swaps its arrow on hover.
 *
 * Props: title, href, items (bullet list) or description, icon (react-icons/hi2 name),
 * isActive, onHover, fillRef, layout ("row" | "grid")
 */
export default function ServiceCard({
  title,
  href,
  items,
  description,
  icon,
  isActive,
  onHover,
  fillRef,
  layout = "row",
  className,
}) {
  return (
    <Link
      href={href}
      onMouseEnter={onHover}
      onFocus={onHover}
      className={cn(
        "services-card group relative rounded-lg p-[1.6vw] flex flex-col justify-between bg-[#161616] overflow-hidden border border-white/20 max-[1025px]:p-[3vw] max-md:p-[5vw]",
        LAYOUTS[layout],
        className,
      )}
    >
      {/* Gradient fill revealed by the radial mask */}
      <div ref={fillRef} className={cn("absolute inset-0 radial-mask-bg-fill", GRADIENT)} />

      <div className="relative flex items-start justify-between">
        {icon ? (
          <Icon
            name={icon}
            variant="outline"
            className={cn(
              "size-[2.6vw] transition-colors duration-300 max-[1025px]:size-[6vw] max-md:size-[9vw]",
              isActive ? "text-white" : "text-[#F16B0D]",
            )}
          />
        ) : (
          <span />
        )}

        {/* Arrow badge: on hover the arrow leaves top-right and a copy enters bottom-left */}
        <div
          className={cn(
            "w-[3vw] h-[3vw] rounded-full flex items-center justify-center border-white/30 border max-[1025px]:w-[7vw] max-[1025px]:h-[7vw] max-md:w-[9vw] max-md:h-[9vw] duration-300 ease-out overflow-hidden relative",
            isActive ? "bg-white text-black" : "text-white",
          )}
        >
          <div className="group-hover:translate-x-[150%] group-hover:translate-y-[-150%] duration-300 ease-out">
            <ArrowUpRightIcon size={20} />
          </div>
          <div className="absolute translate-x-[-150%] translate-y-[150%] group-hover:translate-x-0 group-hover:translate-y-0 duration-300 ease-out">
            <ArrowUpRightIcon size={20} />
          </div>
        </div>
      </div>

      <div className="relative">
        <h3 className="text-[2.2vw] font-normal leading-[1.15] mb-[1vw] max-[1025px]:text-[4.6vw] max-md:text-[6.5vw]">
          {title}
        </h3>
        {items && (
          <ul className="space-y-[0.4vw] max-[1025px]:space-y-[1vw] max-md:space-y-[1.8vw]">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-[0.7vw] text-[1.15vw] text-white max-[1025px]:text-[2.8vw] max-md:text-[4vw]"
              >
                <span className="size-1.5 shrink-0 bg-white rounded-full" /> <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {description && (
          <p
            className={cn(
              "text-[1.1vw] leading-normal transition-colors duration-300 max-[1025px]:text-[2.6vw] max-md:text-[4vw]",
              isActive ? "text-white" : "text-white/70",
            )}
          >
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
