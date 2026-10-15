import Image from "next/image";
import Link from "next/link";

import PageHero from "@/components/layout/PageHero";
import Section from "@/components/common/Section";
import FadeUp from "@/components/animations/FadeUp";
import TextReveal from "@/components/animations/TextReveal";
import Eyebrow from "@/components/common/Eyebrow";
import { ArrowUpRightIcon } from "@/components/common/Icons";
import { caseStudies } from "@/data/caseStudies";

export const metadata = {
  title: "Case Studies",
  description:
    "Deep dives into how Dev World solved real business problems — the challenge, the solution, and the measurable results.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="The Challenge, the Build, the Results"
        description="A closer look at how we approach hard problems — and the measurable impact that followed."
      />

      <Section className="pt-[3vw]">
        <FadeUp className="flex flex-col gap-[6vw] max-[1025px]:gap-[14vw]">
          {caseStudies.map((study, index) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="group grid grid-cols-2 items-center gap-[4vw] max-[1025px]:grid-cols-1 max-[1025px]:gap-[6vw]"
            >
              <div
                className={`relative aspect-[16/10] overflow-hidden rounded-xl max-[1025px]:rounded-lg ${index % 2 ? "order-2 max-[1025px]:order-none" : ""}`}
              >
                <Image
                  src={study.coverImage}
                  alt=""
                  fill
                  sizes="(max-width: 1025px) 90vw, 46vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              </div>
              <div>
                <Eyebrow>{study.category}</Eyebrow>
                <TextReveal stagger={0.01}>
                  <h2 className="mt-[1.2vw] text-[3.2vw] leading-[1.15] max-[1025px]:mt-[3vw] max-[1025px]:text-[6vw] max-md:text-[8vw]">
                    {study.title}
                  </h2>
                </TextReveal>
                <p className="mt-[1.2vw] text-[1.25vw] leading-[1.5] text-white/75 max-[1025px]:mt-[3vw] max-[1025px]:text-[2.6vw] max-md:text-[4.2vw]">
                  {study.summary}
                </p>
                <dl className="mt-[2.5vw] grid grid-cols-3 gap-[1.5vw] border-t border-white/15 pt-[2vw] max-[1025px]:mt-[5vw] max-[1025px]:gap-[3vw] max-[1025px]:pt-[4vw]">
                  {study.results.map((result) => (
                    <div key={result.label} className="flex flex-col-reverse gap-[0.4vw]">
                      <dt className="text-[0.95vw] text-white/55 max-[1025px]:text-[2vw] max-md:text-[3.2vw]">{result.label}</dt>
                      <dd className="text-[2.4vw] font-light text-[#F16B0D] max-[1025px]:text-[5vw] max-md:text-[6.5vw]">
                        {result.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <span className="under-multi-parent mt-[2.5vw] inline-flex items-center gap-[0.6vw] text-[1.15vw] max-[1025px]:mt-[5vw] max-[1025px]:text-[2.6vw] max-md:text-[4.2vw]">
                  <span className="under-multi">Read the case study</span>
                  <ArrowUpRightIcon size={18} />
                </span>
              </div>
            </Link>
          ))}
        </FadeUp>
      </Section>
    </>
  );
}
