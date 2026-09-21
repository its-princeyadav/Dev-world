import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function PageHero({ eyebrow, title, description, children }) {
  return (
    <section className="bg-grid relative overflow-hidden bg-ink pb-16 pt-32 lg:pb-20 lg:pt-40">
      <div
        className="bg-radial-glow pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        aria-hidden="true"
      />
      <Container className="relative max-w-3xl text-center">
        {eyebrow && (
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-accent">
              {eyebrow}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.06}>
          <h1 className="text-balance mt-3 text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-mist-300">
              {description}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.18}>
            <div className="mt-8">{children}</div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
