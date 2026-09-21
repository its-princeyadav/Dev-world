import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 lg:py-32">
      <div
        className="bg-radial-glow pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <Container className="relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            Let&apos;s build something exceptional
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-4 max-w-xl text-lg text-mist-300">
            Tell us about your project — we&apos;ll respond within one
            business day with next steps.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-8">
            <Button href="/contact" variant="on-dark" size="lg">
              Start a project
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
