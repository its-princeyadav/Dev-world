import Container from "@/components/ui/Container";
import PageHero from "@/components/sections/PageHero";

export default function LegalContent({ title, updated, sections }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} description={`Last updated: ${updated}`} />
      <section className="bg-paper py-16 lg:py-20">
        <Container width="text">
          <div className="mx-auto max-w-[65ch] space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-lg font-semibold text-ink-900">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="mt-3 text-sm leading-relaxed text-ink-600">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
