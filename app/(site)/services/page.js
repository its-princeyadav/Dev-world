import PageHero from "@/components/layout/PageHero";
import Section from "@/components/common/Section";
import ServiceGrid from "@/components/common/ServiceGrid";
import { services } from "@/data/services";

export const metadata = {
  title: "Services",
  description:
    "Explore Dev World's full range of digital services — from custom web and mobile development to AI integration, cloud infrastructure, and enterprise software.",
};

const SERVICE_CARDS = services.map((service) => ({
  title: service.title,
  description: service.short,
  icon: service.icon,
  href: `/services/${service.slug}`,
}));

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Every Capability You Need, One Accountable Team"
        description="We cover the full product lifecycle so you're not stitching together vendors across design, engineering, and infrastructure."
      />

      <Section className="pt-[3vw]">
        <ServiceGrid items={SERVICE_CARDS} />
      </Section>
    </>
  );
}
