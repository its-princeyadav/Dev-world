import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
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
        title="The challenge, the build, the results"
        description="A closer look at how we approach hard problems — and the measurable impact that followed."
      />

      <section className="bg-paper py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-8">
            {caseStudies.map((study, i) => (
              <Reveal key={study.slug} delay={0.05 * i}>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group grid grid-cols-1 gap-6 overflow-hidden rounded-[20px] border border-paper-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:grid-cols-2"
                >
                  <div
                    className={`aspect-[16/10] bg-gradient-to-br ${study.gradient} transition-transform duration-400 group-hover:scale-105`}
                  />
                  <div className="flex flex-col justify-center p-8">
                    <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
                      {study.category}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-ink-900">
                      {study.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">
                      {study.summary}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-6">
                      {study.results.slice(0, 3).map((r) => (
                        <div key={r.label}>
                          <p className="font-mono text-xl font-semibold text-accent">
                            {r.value}
                          </p>
                          <p className="text-xs text-ink-500">{r.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
