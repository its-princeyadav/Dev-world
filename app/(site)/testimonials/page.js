import { HiMiniStar } from "react-icons/hi2";

import PageHero from "@/components/layout/PageHero";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";
import FadeUp from "@/components/animations/FadeUp";
import Testimonials from "@/components/home/Testimonials";
import { GLASS_CARD } from "@/constants/theme";
import { testimonials } from "@/data/testimonials";

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
        title="What Our Clients Say"
        description="We measure success by how our clients talk about working with us, not just the metrics we hit."
      />

      <Testimonials title="In Their Own Words" />

      <Section>
        <SectionHeading eyebrow="Every review" title="The Full Wall" />
        <FadeUp className="mt-[5vw] grid grid-cols-3 gap-[1.6vw] max-[1025px]:mt-[10vw] max-[1025px]:grid-cols-2 max-[1025px]:gap-[3vw] max-md:grid-cols-1 max-md:gap-[5vw]">
          {testimonials.map((item) => (
            <figure
              key={item.author}
              className={`flex flex-col justify-between gap-[2vw] p-[2.2vw] transition-colors duration-500 hover:border-[#F16B0D]/60 max-[1025px]:gap-[5vw] max-[1025px]:p-[4vw] max-md:p-[6vw] ${GLASS_CARD}`}
            >
              <div>
                <p className="flex gap-1 text-[#ff6b00]" aria-label={`Rated ${item.rating} out of 5`}>
                  {Array.from({ length: item.rating }, (_, index) => (
                    <HiMiniStar key={index} aria-hidden="true" className="size-[1.1vw] max-[1025px]:size-[2.4vw] max-md:size-[4vw]" />
                  ))}
                </p>
                <blockquote className="mt-[1.4vw] text-[1.3vw] leading-[1.55] text-white/85 max-[1025px]:mt-[3vw] max-[1025px]:text-[2.6vw] max-md:text-[4.2vw]">
                  “{item.quote}”
                </blockquote>
              </div>
              <figcaption>
                <p className="text-[1.4vw] text-[#ff6b00] max-[1025px]:text-[3vw] max-md:text-[4.8vw]">{item.author}</p>
                <p className="text-[1vw] text-white/60 max-[1025px]:text-[2.2vw] max-md:text-[3.6vw]">
                  {item.role}, {item.company}
                </p>
              </figcaption>
            </figure>
          ))}
        </FadeUp>
      </Section>
    </>
  );
}
