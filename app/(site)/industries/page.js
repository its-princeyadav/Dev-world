import PageHero from "@/components/layout/PageHero";
import Section from "@/components/common/Section";
import ValueCard from "@/components/common/ValueCard";
import FadeUp from "@/components/animations/FadeUp";
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
        title="Domain Expertise That Shows Up in the Details"
        description="From compliance-heavy fintech to fast-moving e-commerce, we bring the context to make the right calls early."
      />

      <Section className="pt-[3vw]">
        <FadeUp className="grid grid-cols-4 gap-x-[3vw] gap-y-[5vw] max-[1025px]:grid-cols-2 max-[1025px]:gap-y-[10vw] max-md:grid-cols-1">
          {industries.map((industry) => (
            <ValueCard
              key={industry.title}
              icon={industry.icon}
              title={industry.title}
              description={industry.description}
              className="min-h-[22vw] max-[1025px]:min-h-0"
            />
          ))}
        </FadeUp>
      </Section>
    </>
  );
}
