import { cn } from "@/lib/utils";

/** Row of outlined pills (technologies, deliverables, categories). */
export default function TagList({ items, className }) {
  return (
    <ul className={cn("flex flex-wrap gap-[0.6vw] max-[1025px]:gap-[1.5vw] max-md:gap-[2vw]", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-white/20 bg-white/5 px-[1.1vw] py-[0.45vw] text-[1vw] text-white/85 transition-colors duration-300 hover:border-[#F16B0D] hover:text-white max-[1025px]:px-[2.5vw] max-[1025px]:py-[1vw] max-[1025px]:text-[2.2vw] max-md:px-[3.5vw] max-md:py-[1.5vw] max-md:text-[3.6vw]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
