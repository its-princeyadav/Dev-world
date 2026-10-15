import Hero from "@/components/home/Hero";
import Portfolio from "@/components/home/Portfolio";
import WhyUs from "@/components/home/WhyUs";
import Services from "@/components/home/Services";
import Process from "@/components/home/Process";
import TechStack from "@/components/home/TechStack";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import Section from "@/components/common/Section";
import Stats from "@/components/common/Stats";
import { homeStats } from "@/data/stats";
import { faqs } from "@/data/faqs";

// The five most common questions, shown without their categories
const homeFaqs = [{ items: faqs.flatMap((group) => group.items).slice(0, 5) }];

// The home page. A Server Component that only arranges the sections in order;
// each section handles its own content and animations.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Portfolio />
      <WhyUs />
      <Section className="pt-0! pb-[8vw]">
        <Stats stats={homeStats} />
      </Section>
      <Services />
      <Process />
      <TechStack />
      <Testimonials />
      <FAQ groups={homeFaqs} action={{ label: "View All FAQs", href: "/faqs" }} />
    </>
  );
}
