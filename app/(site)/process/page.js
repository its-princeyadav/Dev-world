import PageHero from "@/components/layout/PageHero";
import Section from "@/components/common/Section";
import ProcessTimeline from "@/components/common/ProcessTimeline";
import { processSteps } from "@/data/process";

export const metadata = {
  title: "Our Process",
  description:
    "A transparent, six-stage process from discovery to ongoing support — see exactly how Dev World delivers software.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our process"
        title="No Black Boxes, Ever"
        description="Every engagement follows the same six stages — so you always know what's happening and why."
      />

      <Section className="pt-[4vw]">
        <ProcessTimeline steps={processSteps} />
      </Section>
    </>
  );
}
