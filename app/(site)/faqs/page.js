import PageHero from "@/components/layout/PageHero";
import FAQ from "@/components/home/FAQ";
import { faqs } from "@/data/faqs";

export const metadata = {
  title: "FAQs",
  description: "Answers to common questions about working with Dev World — engagement, pricing, and process.",
};

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Questions, Answered"
        description="Can't find what you're looking for? Reach out and we'll get back to you within a day."
      />
      <FAQ title={null} groups={faqs.map((group) => ({ category: group.category, items: group.items }))} />
    </>
  );
}
