import { notFound } from "next/navigation";
import { caseStudies } from "@/data/caseStudies";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/sections/CtaBand";

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  return (
    <>
      <section className={`relative overflow-hidden bg-gradient-to-br ${study.gradient} bg-ink pb-20 pt-32 lg:pb-28 lg:pt-40`}>
        <Container className="relative max-w-3xl text-center">
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-white/80">
              {study.category}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="text-balance mt-3 text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl">
              {study.title}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
              {study.summary}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper py-20 lg:py-28">
        <Container width="text">
          <Reveal>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-paper-border bg-paper-border sm:grid-cols-3">
              {study.results.map((r) => (
                <div key={r.label} className="bg-white px-4 py-8 text-center">
                  <p className="font-mono text-3xl font-semibold text-accent">
                    {r.value}
                  </p>
                  <p className="mt-1 text-xs text-ink-500">{r.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <h2 className="text-xl font-semibold text-ink-900">
                  The Challenge
                </h2>
                <p className="mt-3 text-base leading-relaxed text-ink-600">
                  {study.challenge}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div>
                <h2 className="text-xl font-semibold text-ink-900">
                  The Solution
                </h2>
                <p className="mt-3 text-base leading-relaxed text-ink-600">
                  {study.solution}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-16 rounded-[20px] border border-paper-border bg-paper-soft p-8">
            <p className="text-sm text-ink-500">Client</p>
            <p className="mt-1 text-lg font-semibold text-ink-900">
              {study.client}
            </p>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
