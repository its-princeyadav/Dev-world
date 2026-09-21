import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";

const points = [
  {
    icon: "HiUserGroup",
    title: "Senior-only teams",
    description:
      "Every engagement is staffed with senior engineers and designers — no learning on your budget.",
  },
  {
    icon: "HiRocketLaunch",
    title: "Product-first process",
    description:
      "We start with outcomes, not tickets. Strategy and design inform every technical decision.",
  },
  {
    icon: "HiShieldCheck",
    title: "Enterprise-grade rigor",
    description:
      "Code review, automated testing, and security practices baked into every sprint.",
  },
  {
    icon: "HiClock",
    title: "Predictable delivery",
    description:
      "Transparent sprints, weekly demos, and fixed-scope options so you always know where you stand.",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-paper-soft py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why Dev World"
          title="Built for teams who can't afford to get it wrong"
          description="We've helped funded startups and enterprise teams ship products that hold up under real-world scale."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point, i) => (
            <Reveal key={point.title} delay={0.06 * i}>
              <div>
                <span className="inline-flex size-11 items-center justify-center rounded-[14px] bg-white text-accent shadow-elev-sm">
                  <Icon name={point.icon} size={22} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink-900">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {point.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
