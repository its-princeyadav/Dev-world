import { Fragment } from "react";

import { cn } from "@/lib/utils";
import { ACCENT } from "@/constants/theme";
import TextReveal from "@/components/animations/TextReveal";
import StringDivider from "@/components/common/StringDivider";

/**
 * List of rows separated by pluckable string dividers (the home page's process list style).
 * Each row: an optional accent label, a title, an optional description, and optional content
 * on the right (`aside`, e.g. tags or a link).
 *
 * Props: rows ([{ key, label?, title, description?, aside? }]), titleAs, className
 */
export default function RowList({ rows, titleAs: Title = "h3", className }) {
  return (
    <div className={className}>
      <StringDivider />
      {rows.map((row) => (
        <Fragment key={row.key ?? row.title}>
          <div className="flex items-start justify-between gap-[4vw] py-[2.2vw] max-[1025px]:flex-col max-[1025px]:gap-[4vw] max-[1025px]:py-[6vw]">
            <div className={cn(row.aside ? "w-[45%]" : "w-[70%]", "max-[1025px]:w-full")}>
              <TextReveal splitBy="lines">
                <Title className="text-[1.8vw] font-normal leading-[1.25] max-[1025px]:text-[3.4vw] max-md:text-[5.5vw]">
                  {row.label && <span style={{ color: ACCENT }}>{row.label}&nbsp;&nbsp;</span>}
                  {row.title}
                </Title>
              </TextReveal>
              {row.description && (
                <TextReveal splitBy="lines">
                  <p className="mt-[0.8vw] text-[1.25vw] leading-[1.5] text-white/55 max-[1025px]:mt-[2vw] max-[1025px]:text-[2.4vw] max-md:text-[4vw]">
                    {row.description}
                  </p>
                </TextReveal>
              )}
            </div>
            {row.aside && <div className="w-[45%] max-[1025px]:w-full">{row.aside}</div>}
          </div>
          <StringDivider />
        </Fragment>
      ))}
    </div>
  );
}
