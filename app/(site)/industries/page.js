import PageHero from "@/components/sections/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { industries } from "@/data/industries";

export const metadata = {
  title: "Industries",
  description:
    "Dev World builds software for fintech, healthtech, e-commerce, logistics, and more — industries with real stakes and real compliance needs.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Domain expertise that shows up in the details"
        description="From compliance-heavy fintech to fast-moving e-commerce, we bring the context to make the right calls early."
      />

      <section className="bg-paper py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, i) => (
              <Reveal key={industry.title} delay={0.04 * i}>
                <div className="rounded-[20px] border border-paper-border p-8">
                  <span className="inline-flex size-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-accent/15 to-cyan/15 text-accent">
                    <Icon name={industry.icon} size={22} />
                  </span>
                  <h2 className="mt-5 text-lg font-semibold text-ink-900">
                    {industry.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {industry.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
