import PageHero from "@/components/layout/PageHero";
import Section from "@/components/common/Section";
import FadeUp from "@/components/animations/FadeUp";
import { ACCENT } from "@/constants/theme";

/** Legal page: hero, then numbered sections in a readable column. */
export default function LegalContent({ title, updated, sections }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} description={`Last updated: ${updated}`} />
      <Section className="pt-[3vw]">
        <FadeUp className="mx-auto w-[55%] space-y-[3.5vw] max-[1025px]:w-[80%] max-[1025px]:space-y-[8vw] max-md:w-full">
          {sections.map((section) => {
            const [number, ...words] = section.heading.split(" ");
            return (
              <div key={section.heading} className="border-t border-white/15 pt-[2vw] max-[1025px]:pt-[5vw]">
                <h2 className="text-[1.9vw] leading-[1.25] max-[1025px]:text-[3.8vw] max-md:text-[5.6vw]">
                  <span style={{ color: ACCENT }}>{number}</span> {words.join(" ")}
                </h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="mt-[1vw] text-[1.2vw] leading-[1.7] text-white/75 max-[1025px]:mt-[3vw] max-[1025px]:text-[2.5vw] max-md:text-[4vw]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            );
          })}
        </FadeUp>
      </Section>
    </>
  );
}
