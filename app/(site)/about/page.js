import PageHero from "@/components/sections/PageHero";
import StatsRow from "@/components/sections/StatsRow";
import CtaBand from "@/components/sections/CtaBand";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { team, values } from "@/data/team";

export const metadata = {
  title: "About Us",
  description:
    "Dev World is a full-cycle software studio helping ambitious companies design, build, and scale digital products.",
};

const stats = [
  { value: "2016", label: "Founded" },
  { value: "120+", label: "Products shipped" },
  { value: "40+", label: "Team members" },
  { value: "12", label: "Countries served" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Dev World"
        title="We build the software behind ambitious companies"
        description="Founded by engineers who got tired of watching great products die to bad execution, Dev World pairs product strategy with senior engineering to ship things that actually work."
      />

      <StatsRow stats={stats} />

      <section className="bg-paper py-20 lg:py-28">
        <Container width="text">
          <SectionHeading
            eyebrow="Our values"
            title="What guides how we work"
          />
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={0.06 * i}>
                <div className="rounded-[20px] border border-paper-border p-8">
                  <h3 className="text-lg font-semibold text-ink-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper-soft py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Leadership"
            title="Meet the team"
            description="Senior operators and engineers who've built and scaled products at every stage."
          />
          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={0.04 * i}>
                <div className="text-center">
                  <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-cyan/20 font-mono text-lg font-semibold text-accent">
                    {member.initials}
                  </div>
                  <p className="mt-4 text-sm font-semibold text-ink-900">
                    {member.name}
                  </p>
                  <p className="text-xs text-ink-500">{member.role}</p>
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
