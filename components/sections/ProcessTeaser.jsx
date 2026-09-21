import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

const steps = [
  {
    n: "01",
    title: "Discover",
    description: "Align on goals, users, and constraints before writing a line of code.",
  },
  {
    n: "02",
    title: "Design",
    description: "Prototype and validate the experience with real users, fast.",
  },
  {
    n: "03",
    title: "Build",
    description: "Ship in weekly sprints with full visibility into progress.",
  },
  {
    n: "04",
    title: "Launch & Scale",
    description: "Deploy, monitor, and iterate with a partner who sticks around.",
  },
];

export default function ProcessTeaser() {
  return (
    <section className="bg-paper py-20 lg:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="How we work"
            title="A process built for clarity, not chaos"
            description="No black boxes. You see exactly what we're building and why, every step of the way."
          />
          <Reveal delay={0.1}>
            <Button href="/process" variant="secondary" size="md">
              See our full process
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={0.08 * i}>
              <div className="relative rounded-[20px] border border-paper-border p-8">
                <span className="font-mono text-sm font-semibold text-accent">
                  {step.n}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-ink-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
