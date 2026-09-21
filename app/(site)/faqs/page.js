import PageHero from "@/components/sections/PageHero";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CtaBand from "@/components/sections/CtaBand";

export const metadata = {
  title: "FAQs",
  description:
    "Answers to common questions about working with Dev World — engagement, pricing, and process.",
};

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Questions, answered"
        description="Can't find what you're looking for? Reach out and we'll get back to you within a day."
      />
      <FaqAccordion />
      <CtaBand />
    </>
  );
}
