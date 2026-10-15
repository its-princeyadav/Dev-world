import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "@/components/common/Icons";

/**
 * Case study card: a rounded cover image that slowly zooms on hover, with the category,
 * title and client underneath. The arrow badge swaps its arrow on hover.
 *
 * Props: study (from data/caseStudies.js), aspect (Tailwind aspect class), className
 */
export default function ProjectCard({ study, aspect = "aspect-[4/3]", className }) {
  return (
    <Link href={`/case-studies/${study.slug}`} className={cn("group block", className)}>
      <div className={cn("relative overflow-hidden rounded-xl bg-[#161616] max-[1025px]:rounded-lg", aspect)}>
        <Image
          src={study.coverImage}
          alt=""
          fill
          sizes="(max-width: 767px) 90vw, (max-width: 1025px) 45vw, 30vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        <div className="absolute right-[1.2vw] top-[1.2vw] flex size-[3vw] items-center justify-center overflow-hidden rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md max-[1025px]:right-[3vw] max-[1025px]:top-[3vw] max-[1025px]:size-[7vw] max-md:size-[10vw]">
          <div className="duration-300 ease-out group-hover:translate-x-[150%] group-hover:translate-y-[-150%]">
            <ArrowUpRightIcon size={20} />
          </div>
          <div className="absolute translate-x-[-150%] translate-y-[150%] duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0">
            <ArrowUpRightIcon size={20} />
          </div>
        </div>
      </div>
      <p className="mt-[1.4vw] text-[0.95vw] uppercase tracking-[0.12em] text-[#F16B0D] max-[1025px]:mt-[3vw] max-[1025px]:text-[2vw] max-md:text-[3.4vw]">
        {study.category}
      </p>
      <h3 className="mt-[0.5vw] text-[1.6vw] leading-[1.25] max-[1025px]:mt-[1.5vw] max-[1025px]:text-[3.4vw] max-md:text-[5.5vw]">
        <span className="under-multi-parent">
          <span className="under-multi">{study.title}</span>
        </span>
      </h3>
      <p className="mt-[0.4vw] text-[1vw] text-white/60 max-[1025px]:text-[2.2vw] max-md:text-[3.8vw]">{study.client}</p>
    </Link>
  );
}
