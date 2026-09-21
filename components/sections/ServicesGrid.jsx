import Link from "next/link";
import { services, featuredServiceSlugs } from "@/data/services";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";

const featured = services.filter((s) => featuredServiceSlugs.includes(s.slug));

export default function ServicesGrid() {
  return (
    <section className="bg-paper py-20 lg:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What we do"
            title="Full-stack digital services, under one roof"
            description="From first sketch to production scale — we cover the entire product lifecycle so you don't have to stitch together vendors."
          />
          <Reveal delay={0.1}>
            <Button href="/services" variant="secondary" size="md">
              View all services
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service, i) => (
            <Reveal key={service.slug} delay={0.05 * (i % 3)}>
              <Link
                href={`/services/${service.slug}`}
                className="group block h-full rounded-[20px] border border-paper-border bg-paper-soft p-8 shadow-elev-sm transition-all duration-250 hover:-translate-y-1 hover:shadow-elev-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-accent/15 to-cyan/15 text-accent">
                  <Icon name={service.icon} size={22} />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-ink-900">
                  {service.title}
                </h3>
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
  );
}
