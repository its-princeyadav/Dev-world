import PageHero from "@/components/layout/PageHero";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";
import Stats from "@/components/common/Stats";
import ValueCard from "@/components/common/ValueCard";
import FadeUp from "@/components/animations/FadeUp";
import { GRADIENT } from "@/constants/theme";
import { aboutStats } from "@/data/stats";
import { team, values } from "@/data/team";

export const metadata = {
  title: "About Us",
  description:
    "Dev World is a full-cycle software studio helping ambitious companies design, build, and scale digital products.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Dev World"
        title="We Build the Software Behind Ambitious Companies"
        description="Founded by engineers who got tired of watching great products die to bad execution, Dev World pairs product strategy with senior engineering to ship things that actually work."
      />

      <Section className="pt-[4vw]">
        <Stats stats={aboutStats} />
      </Section>

      <Section>
        <SectionHeading eyebrow="Our values" title="What Guides How We Work" />
        <FadeUp className="mt-[5vw] grid grid-cols-2 gap-x-[4vw] gap-y-[4vw] max-[1025px]:mt-[10vw] max-md:grid-cols-1 max-md:gap-y-[10vw]">
          {values.map((value, index) => (
            <ValueCard
              key={value.title}
              number={String(index + 1).padStart(2, "0")}
              title={value.title}
              description={value.description}
            />
          ))}
        </FadeUp>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Leadership"
          title="Meet the Team"
          description="Senior operators and engineers who've built and scaled products at every stage."
        />
        <FadeUp
          as="ul"
          stagger={0.05}
          className="mt-[5vw] grid grid-cols-4 gap-[1.6vw] max-[1025px]:mt-[10vw] max-[1025px]:grid-cols-3 max-[1025px]:gap-[3vw] max-md:grid-cols-2"
        >
          {team.map((member) => (
            <li
              key={member.name}
              className="group relative overflow-hidden rounded-lg border border-white/15 bg-[#161616] p-[1.6vw] max-[1025px]:p-[3vw] max-md:p-[4vw]"
            >
              {/* Gradient that rises from the bottom on hover */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 ${GRADIENT}`}
              />
              <div className="relative">
                <span className="flex size-[5vw] items-center justify-center rounded-full border border-white/25 text-[1.5vw] transition-colors duration-500 group-hover:border-white group-hover:bg-white group-hover:text-black max-[1025px]:size-[11vw] max-[1025px]:text-[3.2vw] max-md:size-[16vw] max-md:text-[5vw]">
                  {member.initials}
                </span>
                <p className="mt-[3vw] text-[1.4vw] max-[1025px]:mt-[6vw] max-[1025px]:text-[3vw] max-md:text-[4.6vw]">
                  {member.name}
                </p>
                <p className="mt-[0.3vw] text-[1vw] text-white/60 transition-colors duration-500 group-hover:text-white max-[1025px]:text-[2.2vw] max-md:text-[3.6vw]">
                  {member.role}
                </p>
              </div>
            </li>
          ))}
        </FadeUp>
      </Section>
    </>
  );
}
