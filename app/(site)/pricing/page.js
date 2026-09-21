import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { pricingPlans } from "@/data/pricing";
import { HiCheck } from "react-icons/hi2";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Pricing",
  description:
    "Dev World's engagement models — Fixed Scope, Dedicated Team, and Enterprise — built to fit how your project actually needs to run.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Engagement models that fit how you work"
        description="Every project is scoped individually — these are starting points, not a menu. Talk to us for an exact quote."
      />

      <section className="bg-paper py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan, i) => (
              <Reveal key={plan.name} delay={0.06 * i}>
                <div
                  className={cn(
                    "flex h-full flex-col rounded-[20px] border p-8",
                    plan.highlighted
                      ? "border-accent bg-ink shadow-elev-lg"
                      : "border-paper-border bg-paper-soft"
                  )}
                >
                  <h2
                    className={cn(
                      "text-lg font-semibold",
                      plan.highlighted ? "text-white" : "text-ink-900"
                    )}
                  >
                    {plan.name}
                  </h2>
                  <p
                    className={cn(
                      "mt-1 text-sm",
                      plan.highlighted ? "text-mist-300" : "text-ink-500"
                    )}
                  >
                    {plan.tagline}
                  </p>
                  <p
                    className={cn(
                      "mt-6 font-mono text-3xl font-semibold",
                      plan.highlighted ? "text-white" : "text-ink-900"
                    )}
                  >
                    {plan.price}
                  </p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className={cn(
                          "flex items-start gap-2 text-sm",
                          plan.highlighted ? "text-mist-200" : "text-ink-600"
                        )}
                      >
                        <HiCheck
                          className={cn(
                            "mt-0.5 size-4 shrink-0",
                            plan.highlighted ? "text-cyan" : "text-accent"
                          )}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button
                      href="/contact"
                      variant={plan.highlighted ? "on-dark" : "secondary"}
                      className="w-full justify-center"
                    >
                      Get a quote
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-10 text-center text-sm text-ink-500">
              Have questions about scope or timing?{" "}
              <Link href="/faqs" className="font-medium text-accent hover:text-accent-bright">
                Check our FAQs
              </Link>{" "}
              or reach out directly.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
