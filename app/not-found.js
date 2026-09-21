import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-grid relative flex min-h-[70vh] items-center overflow-hidden bg-ink">
      <div
        className="bg-radial-glow pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        aria-hidden="true"
      />
      <Container className="relative text-center">
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.08em] text-accent">
          404
        </p>
        <h1 className="text-balance mt-3 text-4xl font-semibold text-white sm:text-5xl">
          This page doesn&apos;t exist
        </h1>
        <p className="mx-auto mt-4 max-w-md text-mist-300">
          The page you&apos;re looking for may have been moved or removed.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/" variant="on-dark" size="lg">
            Back to home
          </Button>
        </div>
      </Container>
    </section>
  );
}
