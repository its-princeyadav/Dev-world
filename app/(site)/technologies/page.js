import PageHero from "@/components/sections/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { technologyGroups } from "@/data/technologies";

export const metadata = {
  title: "Technologies",
  description:
    "The frameworks, languages, and platforms Dev World uses to build fast, reliable, and scalable software.",
};

export default function TechnologiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Technologies"
        title="A modern stack, chosen for the problem"
        description="We're framework-agnostic by principle — every project starts with the right tool for the job, not our favorite hammer."
      />

      <section className="bg-paper py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {technologyGroups.map((group, i) => (
              <Reveal key={group.category} delay={0.05 * i}>
                <div className="rounded-[20px] border border-paper-border p-8">
                  <h2 className="text-lg font-semibold text-ink-900">
                    {group.category}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-paper-border bg-paper-soft px-4 py-1.5 text-sm text-ink-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
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
