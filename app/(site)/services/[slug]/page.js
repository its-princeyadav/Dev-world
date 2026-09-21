import { notFound } from "next/navigation";
import Link from "next/link";
import { services } from "@/data/services";
import { getServiceContent } from "@/data/serviceDetails";
import { caseStudies } from "@/data/caseStudies";
import PageHero from "@/components/sections/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { HiCheck } from "react-icons/hi2";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  const content = getServiceContent(slug);
  if (!service || !content) return {};
  return {
    title: service.title,
    description: content.overview,
    openGraph: {
      title: `${service.title} | Dev World`,
      description: content.overview,
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
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
      name: "Dev World",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero eyebrow="Service" title={service.title} description={content.overview}>
        <div className="flex justify-center">
          <Link
            href="/contact"
            className="inline-flex h-14 items-center justify-center rounded-[14px] bg-white px-8 text-lg font-medium text-ink transition-colors hover:bg-mist-200"
          >
            Start a project
          </Link>
        </div>
      </PageHero>

      <section className="bg-paper py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow="What's included" title="Key capabilities" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {content.keyFeatures.map((feature, i) => (
              <Reveal key={feature.title} delay={0.05 * i}>
                <div className="rounded-[20px] border border-paper-border p-8">
                  <span className="inline-flex size-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-accent/15 to-cyan/15 text-accent">
                    <Icon name={service.icon} size={22} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="How we deliver"
            title="Our approach"
            dark
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.processSteps.map((step, i) => (
              <Reveal key={step.title} delay={0.06 * i}>
                <div className="rounded-[20px] border border-ink-border p-8">
                  <span className="font-mono text-sm font-semibold text-accent">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist-300">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow="Tech we use" title="Built on proven technology" />
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-2">
              {content.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-paper-border bg-paper-soft px-4 py-1.5 text-sm text-ink-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper-soft py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow="Related work" title="See it in action" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {relatedCaseStudies.map((study, i) => (
              <Reveal key={study.slug} delay={0.06 * i}>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group block overflow-hidden rounded-[20px] border border-paper-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div
                    className={`aspect-[16/9] bg-gradient-to-br ${study.gradient} transition-transform duration-400 group-hover:scale-105`}
                  />
                  <div className="bg-white p-6">
                    <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
                      {study.category}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-ink-900">
                      {study.title}
                    </h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper py-20 lg:py-28">
        <Container width="text">
          <SectionHeading eyebrow="FAQs" title="Common questions" />
          <div className="mt-10 divide-y divide-paper-border rounded-[20px] border border-paper-border">
            {content.faqs.map((faq) => (
              <div key={faq.q} className="p-6">
                <h3 className="flex items-start gap-2 text-sm font-semibold text-ink-900">
                  <HiCheck className="mt-0.5 size-4 shrink-0 text-accent" />
                  {faq.q}
                </h3>
                <p className="mt-2 pl-6 text-sm leading-relaxed text-ink-600">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
