import PageHero from "@/components/sections/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { processSteps } from "@/data/process";

export const metadata = {
  title: "Our Process",
  description:
    "A transparent, six-stage process from discovery to ongoing support — see exactly how Dev World delivers software.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our process"
        title="No black boxes, ever"
        description="Every engagement follows the same six stages — so you always know what's happening and why."
      />

      <section className="bg-paper py-20 lg:py-28">
        <Container width="text">
          <div className="relative">
            <div
              className="absolute left-6 top-2 bottom-2 hidden w-px bg-paper-border sm:block"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-10">
              {processSteps.map((step, i) => (
                <Reveal key={step.n} delay={0.05 * i}>
                  <div className="relative flex flex-col gap-4 sm:flex-row sm:gap-8 sm:pl-16">
                    <div className="absolute left-0 top-0 hidden size-12 shrink-0 items-center justify-center rounded-full border border-paper-border bg-paper font-mono text-sm font-semibold text-accent sm:flex">
                      {step.n}
                    </div>
                    <div className="flex-1 rounded-[20px] border border-paper-border p-8">
                      <span className="font-mono text-sm font-semibold text-accent sm:hidden">
                        {step.n}
                      </span>
                      <h2 className="mt-1 text-xl font-semibold text-ink-900 sm:mt-0">
                        {step.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">
                        {step.description}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {step.deliverables.map((d) => (
                          <li
                            key={d}
                            className="rounded-full bg-paper-soft px-3 py-1 text-xs font-medium text-ink-600"
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
