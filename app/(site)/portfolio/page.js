import PageHero from "@/components/layout/PageHero";
import Section from "@/components/common/Section";
import PortfolioGrid from "@/components/common/PortfolioGrid";
import { caseStudies } from "@/data/caseStudies";

export const metadata = {
  title: "Portfolio",
  description:
    "Explore products Dev World has designed, built, and scaled across fintech, healthtech, logistics, and more.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Products We've Helped Bring to Life"
        description="A selection of the platforms, apps, and systems our team has designed and shipped."
      />

      <Section className="pt-[3vw]">
        <PortfolioGrid projects={caseStudies} />
      </Section>
    </>
  );
}
