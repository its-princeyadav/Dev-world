import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function StatsRow({ stats, dark = true }) {
  return (
    <section className={dark ? "bg-ink py-16" : "bg-paper-soft py-16"}>
      <Container>
        <Reveal>
          <div
            className={
              dark
                ? "grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-ink-border bg-ink-border sm:grid-cols-4"
                : "grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-paper-border bg-paper-border sm:grid-cols-4"
            }
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={
                  dark
                    ? "bg-ink-soft px-4 py-8 text-center"
                    : "bg-white px-4 py-8 text-center"
                }
              >
                <p
                  className={
                    dark
                      ? "font-mono text-3xl font-semibold text-white"
                      : "font-mono text-3xl font-semibold text-ink-900"
                  }
                >
                  {stat.value}
                </p>
                <p
                  className={
                    dark ? "mt-1 text-xs text-mist-400" : "mt-1 text-xs text-ink-500"
                  }
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
