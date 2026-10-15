import { HiBriefcase, HiClock, HiMapPin } from "react-icons/hi2";

import PageHero from "@/components/layout/PageHero";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";
import ValueCard from "@/components/common/ValueCard";
import RowList from "@/components/common/RowList";
import FadeUp from "@/components/animations/FadeUp";
import ApiForm from "@/components/common/ApiForm";
import { GLASS_CARD } from "@/constants/theme";
import { jobOpenings, perks } from "@/data/jobOpenings";
import { careerFields } from "@/data/contactFields";

export const metadata = {
  title: "Careers",
  description:
    "Join Dev World — a remote-first team of senior engineers and designers building ambitious digital products.",
};

// Department · location · type, with small line icons
function JobMeta({ job }) {
  const details = [
    { icon: HiBriefcase, text: job.department },
    { icon: HiMapPin, text: job.location },
    { icon: HiClock, text: job.type },
  ];
  return (
    <div className="flex flex-wrap items-center justify-between gap-[2vw] max-[1025px]:gap-[4vw]">
      <ul className="flex flex-wrap gap-x-[1.6vw] gap-y-2 text-[1.05vw] text-white/65 max-[1025px]:gap-x-[4vw] max-[1025px]:text-[2.4vw] max-md:text-[3.8vw]">
        {details.map(({ icon: DetailIcon, text }) => (
          <li key={text} className="inline-flex items-center gap-[0.4vw] max-[1025px]:gap-[1vw]">
            <DetailIcon aria-hidden="true" className="size-[1.1em] text-[#F16B0D]" /> {text}
          </li>
        ))}
      </ul>
      <a
        href="#apply"
        className="under-multi-parent text-[1.15vw] text-white max-[1025px]:text-[2.6vw] max-md:text-[4.2vw]"
        aria-label={`Apply for ${job.title}`}
      >
        <span className="under-multi">Apply →</span>
      </a>
    </div>
  );
}

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build Your Best Work Here"
        description="We're a remote-first team of senior engineers and designers who care deeply about craft. If that's you, we'd love to talk."
      />

      <Section>
        <SectionHeading eyebrow="Life at Dev World" title="What You Get" />
        <FadeUp className="mt-[5vw] grid grid-cols-3 gap-x-[3vw] gap-y-[4vw] max-[1025px]:mt-[10vw] max-[1025px]:grid-cols-2 max-md:grid-cols-1 max-md:gap-y-[10vw]">
          {perks.map((perk, index) => (
            <ValueCard
              key={perk.title}
              number={String(index + 1).padStart(2, "0")}
              title={perk.title}
              description={perk.description}
            />
          ))}
        </FadeUp>
      </Section>

      <Section>
        <SectionHeading eyebrow="Open roles" title="Current Openings" />
        <RowList
          className="mt-[4vw] max-[1025px]:mt-[8vw]"
          rows={jobOpenings.map((job) => ({
            key: job.slug,
            title: job.title,
            aside: <JobMeta job={job} />,
          }))}
        />
      </Section>

      <Section id="apply" className="scroll-mt-[6vw]">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-[4vw] max-[1025px]:grid-cols-1 max-[1025px]:gap-[8vw]">
          <SectionHeading
            eyebrow="Apply now"
            title="Tell Us About Yourself"
            description="Fill out the form and we'll get back to you within a week."
            size="md"
            className="w-full"
          />
          <div className={`p-[3vw] max-[1025px]:p-8 max-md:p-6 ${GLASS_CARD}`}>
            <ApiForm
              endpoint="/api/careers/apply"
              fields={careerFields}
              submitLabel="Submit Application"
              loadingLabel="Submitting..."
              successMessage="Thanks — we've received your application and will be in touch."
              errorMessage="Something went wrong. Please try again or email us directly."
            />
          </div>
        </div>
      </Section>
    </>
  );
}
