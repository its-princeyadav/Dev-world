import PageHero from "@/components/sections/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";
import { HiMiniStar } from "react-icons/hi2";

export const metadata = {
  title: "Testimonials",
  description:
    "Hear from the founders and executives who've partnered with Dev World to build and scale their products.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="What our clients say"
        description="We measure success by how our clients talk about working with us, not just the metrics we hit."
      />

      <section className="bg-paper py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={0.04 * i}>
                <div className="flex h-full flex-col rounded-[20px] border border-paper-border bg-paper-soft p-8">
                  <div className="flex gap-1 text-accent">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <HiMiniStar key={idx} className="size-4" />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">
                    “{t.quote}”
                  </p>
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-ink-900">
                      {t.author}
                    </p>
                    <p className="text-xs text-ink-500">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
