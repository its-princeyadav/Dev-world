import { notFound } from "next/navigation";

import { caseStudies } from "@/data/caseStudies";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/common/Section";
import Stats from "@/components/common/Stats";
import ValueCard from "@/components/common/ValueCard";
import ProjectCard from "@/components/common/ProjectCard";
import SectionHeading from "@/components/common/SectionHeading";
import FadeUp from "@/components/animations/FadeUp";
import ParallaxImage from "@/components/animations/ParallaxImage";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    openGraph: { images: [study.coverImage] },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) notFound();

  const moreWork = caseStudies.filter((item) => item.slug !== study.slug).slice(0, 2);

  return (
    <>
      <PageHero eyebrow={study.category} title={study.title} description={study.summary} meta={`Client — ${study.client}`} />

      <Section className="pt-0">
        <ParallaxImage src={study.coverImage} alt={`${study.title} cover`} priority />
      </Section>

      <Section className="pt-0">
        <Stats stats={study.results.map((result) => ({ value: result.value, label: result.label }))} />
      </Section>

      <Section className="pt-0">
        <FadeUp className="grid grid-cols-2 gap-[4vw] max-md:grid-cols-1 max-md:gap-[12vw]">
          <ValueCard number="01" title="The Challenge" description={study.challenge} />
          <ValueCard number="02" title="The Solution" description={study.solution} />
        </FadeUp>
      </Section>

      <Section>
        <SectionHeading eyebrow="Keep exploring" title="More Work" className="mb-[4vw] max-[1025px]:mb-[8vw]" />
        <FadeUp className="grid grid-cols-2 gap-[2vw] max-md:grid-cols-1 max-md:gap-[12vw]">
          {moreWork.map((item) => (
            <ProjectCard key={item.slug} study={item} aspect="aspect-[16/9]" />
          ))}
        </FadeUp>
      </Section>
    </>
  );
}
