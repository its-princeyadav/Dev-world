import { notFound } from "next/navigation";

import { services } from "@/data/services";
import { getServiceContent } from "@/data/serviceDetails";
import { caseStudies } from "@/data/caseStudies";
import { SITE_NAME } from "@/constants/site";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";
import ValueCard from "@/components/common/ValueCard";
import RowList from "@/components/common/RowList";
import TagList from "@/components/common/TagList";
import ProjectCard from "@/components/common/ProjectCard";
import ContactButton from "@/components/common/ContactButton";
import FadeUp from "@/components/animations/FadeUp";
import FAQ from "@/components/home/FAQ";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  const content = getServiceContent(slug);
  if (!service || !content) return {};
  return {
    title: service.title,
    description: content.overview,
    openGraph: {
      title: `${service.title} | ${SITE_NAME}`,
      description: content.overview,
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  const content = getServiceContent(slug);
  if (!service || !content) notFound();

  const relatedCaseStudies = caseStudies.slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: content.overview,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero eyebrow="Service" title={service.title} description={content.overview}>
        <ContactButton>Start a Project</ContactButton>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="What's included" title="Key Capabilities" />
        <FadeUp className="mt-[5vw] grid grid-cols-2 gap-x-[4vw] gap-y-[4vw] max-[1025px]:mt-[10vw] max-md:grid-cols-1 max-md:gap-y-[10vw]">
          {content.keyFeatures.map((feature) => (
            <ValueCard key={feature.title} icon={service.icon} title={feature.title} description={feature.description} />
          ))}
        </FadeUp>
      </Section>

      <Section>
        <SectionHeading eyebrow="How we deliver" title="Our Approach" />
        <RowList
          className="mt-[4vw] max-[1025px]:mt-[8vw]"
          rows={content.processSteps.map((step, index) => ({
            label: String(index + 1).padStart(2, "0"),
            title: step.title,
            description: step.description,
          }))}
        />
      </Section>

      <Section>
        <div className="flex items-start justify-between gap-[4vw] max-[1025px]:flex-col max-[1025px]:gap-[8vw]">
          <SectionHeading eyebrow="Tech we use" title="Built on Proven Technology" size="md" className="w-[45%]" />
          <FadeUp className="w-[45%] pt-[1vw] max-[1025px]:w-full">
            <TagList items={content.technologies} />
          </FadeUp>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Related work" title="See It in Action" />
        <FadeUp className="mt-[5vw] grid grid-cols-2 gap-[2vw] max-[1025px]:mt-[10vw] max-md:grid-cols-1 max-md:gap-[12vw]">
          {relatedCaseStudies.map((study) => (
            <ProjectCard key={study.slug} study={study} aspect="aspect-[16/9]" />
          ))}
        </FadeUp>
      </Section>

      <FAQ title="Common Questions" groups={[{ items: content.faqs }]} />
    </>
  );
}
