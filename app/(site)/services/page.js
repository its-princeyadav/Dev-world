import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { services } from "@/data/services";

export const metadata = {
  title: "Services",
  description:
    "Explore Dev World's full range of digital services — from custom web and mobile development to AI integration, cloud infrastructure, and enterprise software.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Every capability you need, one accountable team"
        description="We cover the full product lifecycle so you're not stitching together vendors across design, engineering, and infrastructure."
      />

      <section className="bg-paper py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={0.03 * (i % 6)}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full rounded-[20px] border border-paper-border bg-paper-soft p-8 shadow-elev-sm transition-all duration-250 hover:-translate-y-1 hover:shadow-elev-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-accent/15 to-cyan/15 text-accent">
                    <Icon name={service.icon} size={22} />
                  </span>
                  <h2 className="mt-5 text-xl font-semibold text-ink-900">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {service.short}
                  </p>
                  <span className="mt-5 inline-flex items-center text-sm font-medium text-accent">
                    Learn more
                    <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
