import MetroHero from "@/components/ui/scroll-locked-video-hero";
import StatsRow from "@/components/sections/StatsRow";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyUs from "@/components/sections/WhyUs";
import TechMarquee from "@/components/sections/TechMarquee";
import ProcessTeaser from "@/components/sections/ProcessTeaser";
import PortfolioTeaser from "@/components/sections/PortfolioTeaser";
import TestimonialSpotlight from "@/components/sections/TestimonialSpotlight";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CtaBand from "@/components/sections/CtaBand";

const heroStats = [
  { value: "120+", label: "Products shipped" },
  { value: "98%", label: "Client retention" },
  { value: "40+", label: "Engineers & designers" },
  { value: "12", label: "Countries served" },
];

export default function Home() {
  return (
    <>
      <MetroHero
        title="DEV WORLD"
        tagline="Engineering exceptional software, end to end."
        scrollHint="SCROLL"
      />
      <StatsRow stats={heroStats} />
      <ServicesGrid />
      <WhyUs />
      <TechMarquee />
      <ProcessTeaser />
      <PortfolioTeaser />
      <TestimonialSpotlight />
      <FaqAccordion />
      <CtaBand />
    </>
  );
}
