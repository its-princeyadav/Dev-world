import Link from "next/link";
import { portfolioPreview } from "@/data/portfolioPreview";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

export default function PortfolioTeaser() {
  return (
    <section className="bg-ink py-20 lg:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Products we've helped build and scale"
            dark
          />
          <Reveal delay={0.1}>
            <Button href="/portfolio" variant="secondary-dark" size="md">
              View full portfolio
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {portfolioPreview.map((project, i) => (
            <Reveal key={project.slug} delay={0.08 * i}>
              <Link
                href={`/case-studies/${project.slug}`}
                className="group block overflow-hidden rounded-[20px] border border-ink-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div
                  className={`aspect-[4/3] bg-gradient-to-br ${project.gradient} transition-transform duration-400 group-hover:scale-105`}
                />
                <div className="bg-ink-soft p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
                    {project.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
