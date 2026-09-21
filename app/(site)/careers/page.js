import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CareerApplicationForm from "@/components/forms/CareerApplicationForm";
import { jobOpenings, perks } from "@/data/jobOpenings";
import { HiMapPin, HiClock, HiBriefcase } from "react-icons/hi2";

export const metadata = {
  title: "Careers",
  description:
    "Join Dev World — a remote-first team of senior engineers and designers building ambitious digital products.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build your best work here"
        description="We're a remote-first team of senior engineers and designers who care deeply about craft. If that's you, we'd love to talk."
      />

      <section className="bg-paper py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow="Life at Dev World" title="What you get" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((perk, i) => (
              <Reveal key={perk.title} delay={0.04 * i}>
                <div className="rounded-[20px] border border-paper-border p-8">
                  <h3 className="text-lg font-semibold text-ink-900">
                    {perk.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {perk.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper-soft py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow="Open roles" title="Current openings" />
          <div className="mt-10 divide-y divide-paper-border rounded-[20px] border border-paper-border bg-white">
            {jobOpenings.map((job, i) => (
              <Reveal key={job.slug} delay={0.03 * i}>
                <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-ink-900">
                      {job.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
                      <span className="inline-flex items-center gap-1">
                        <HiBriefcase className="size-3.5" /> {job.department}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <HiMapPin className="size-3.5" /> {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <HiClock className="size-3.5" /> {job.type}
                      </span>
                    </div>
                  </div>
                  <a
                    href="#apply"
                    className="text-sm font-medium text-accent hover:text-accent-bright"
                  >
                    Apply →
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="apply" className="bg-paper py-20 lg:py-28">
        <Container width="text">
          <SectionHeading
            eyebrow="Apply now"
            title="Tell us about yourself"
            description="Fill out the form below and we'll get back to you within a week."
          />
          <div className="mt-12">
            <CareerApplicationForm />
          </div>
        </Container>
      </section>
    </>
  );
}
