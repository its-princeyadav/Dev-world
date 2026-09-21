"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { HiMiniStar } from "react-icons/hi2";
import { testimonialsPreview } from "@/data/testimonialsPreview";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function TestimonialSpotlight() {
  return (
    <section className="bg-paper-soft py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Client voices"
          title="Don't just take our word for it"
          align="center"
        />

        <div className="mx-auto mt-14 max-w-3xl">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            spaceBetween={32}
            slidesPerView={1}
            className="pb-12 [&_.swiper-pagination-bullet-active]:bg-accent"
          >
            {testimonialsPreview.map((t) => (
              <SwiperSlide key={t.author}>
                <div className="rounded-[20px] border border-paper-border bg-white p-10 text-center shadow-elev-sm">
                  <div className="flex justify-center gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <HiMiniStar key={i} className="size-5" />
                    ))}
                  </div>
                  <p className="mx-auto mt-6 max-w-xl text-balance text-xl font-medium leading-relaxed text-ink-900">
                    “{t.quote}”
                  </p>
                  <p className="mt-6 text-sm font-semibold text-ink-900">
                    {t.author}
                  </p>
                  <p className="text-sm text-ink-500">
                    {t.role}, {t.company}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}
