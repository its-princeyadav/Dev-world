import Link from "next/link";
import { HiCheck } from "react-icons/hi2";

import PageHero from "@/components/layout/PageHero";
import Section from "@/components/common/Section";
import RollButton from "@/components/common/RollButton";
import FadeUp from "@/components/animations/FadeUp";
import { cn } from "@/lib/utils";
import { GLASS_CARD, GRADIENT, GRADIENT_CSS } from "@/constants/theme";
import { pricingPlans } from "@/data/pricing";

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
        title="Engagement Models That Fit How You Work"
        description="Every project is scoped individually — these are starting points, not a menu. Talk to us for an exact quote."
      />

      <Section className="pt-[3vw]">
        <FadeUp className="grid grid-cols-3 items-stretch gap-[1.6vw] max-[1025px]:grid-cols-1 max-[1025px]:gap-[5vw]">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col overflow-hidden p-[2.4vw] max-[1025px]:p-[5vw] max-md:p-[7vw]",
                GLASS_CARD,
                plan.highlighted && "border-transparent",
              )}
            >
              {plan.highlighted && <div aria-hidden="true" className={cn("absolute inset-0", GRADIENT)} />}
              <div className="relative flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-[2vw] max-[1025px]:text-[4.5vw] max-md:text-[6.5vw]">{plan.name}</h2>
                  {plan.highlighted && (
                    <span className="rounded-full bg-white px-[0.9vw] py-[0.3vw] text-[0.85vw] text-black max-[1025px]:px-[2vw] max-[1025px]:py-[0.8vw] max-[1025px]:text-[2vw] max-md:text-[3.2vw]">
                      Most popular
                    </span>
                  )}
                </div>
                <p className={cn("mt-[0.5vw] text-[1.05vw] max-[1025px]:mt-[1.5vw] max-[1025px]:text-[2.4vw] max-md:text-[3.8vw]", plan.highlighted ? "text-white/90" : "text-white/60")}>
                  {plan.tagline}
                </p>
                <p className="mt-[2.5vw] text-[3.6vw] font-light leading-none max-[1025px]:mt-[5vw] max-[1025px]:text-[8vw] max-md:text-[11vw]">
                  {plan.price}
                </p>
                <ul className="mt-[2.5vw] flex-1 space-y-[0.9vw] border-t border-white/20 pt-[2vw] max-[1025px]:mt-[5vw] max-[1025px]:space-y-[2vw] max-[1025px]:pt-[4vw]">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-[0.7vw] text-[1.1vw] max-[1025px]:gap-[2vw] max-[1025px]:text-[2.5vw] max-md:text-[4vw]">
                      <HiCheck aria-hidden="true" className={cn("mt-[0.2em] size-[1.1em] shrink-0", plan.highlighted ? "text-white" : "text-[#F16B0D]")} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <RollButton
                  href="/contact"
                  className="mt-[2.5vw] w-full max-[1025px]:mt-[6vw]"
                  textClassName="font-normal text-[1.1vw] max-[1025px]:text-[2.8vw] max-md:text-[4.2vw]"
                  {...(plan.highlighted
                    ? { bgColor: "#ffffff", dotColor: "#070707", textColor: "#111111", hoverTextColor: "#ffffff" }
                    : { bgColor: GRADIENT_CSS, dotColor: "#ffffff", textColor: "#ffffff", hoverTextColor: "#111111" })}
                >
                  Get a Quote
                </RollButton>
              </div>
            </div>
          ))}
        </FadeUp>

        <p className="mt-[4vw] text-center text-[1.15vw] text-white/60 max-[1025px]:mt-[10vw] max-[1025px]:text-[2.6vw] max-md:text-[4vw]">
          Have questions about scope or timing?{" "}
          <Link href="/faqs" className="under-multi-parent text-white">
            <span className="under-multi">Check our FAQs</span>
          </Link>{" "}
          or reach out directly.
        </p>
      </Section>
    </>
  );
}
