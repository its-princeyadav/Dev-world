import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/forms/ContactForm";
import Reveal from "@/components/ui/Reveal";
import { HiEnvelope, HiMapPin, HiPhone } from "react-icons/hi2";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Dev World — tell us about your project and we'll respond within one business day.",
};

const contactInfo = [
  { icon: HiEnvelope, label: "Email", value: "hello@devworld.example.com" },
  { icon: HiPhone, label: "Phone", value: "+1 (555) 012-3456" },
  { icon: HiMapPin, label: "Office", value: "148 Market St, San Francisco, CA" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your project"
        description="Tell us what you're building — we'll get back to you within one business day."
      />

      <section className="bg-paper py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.3fr]">
            <Reveal>
              <div>
                <h2 className="text-xl font-semibold text-ink-900">
                  Reach us directly
                </h2>
                <div className="mt-6 space-y-6">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-paper-soft text-accent">
                        <item.icon className="size-5" />
                      </span>
                      <div>
                        <p className="text-xs text-ink-500">{item.label}</p>
                        <p className="text-sm font-medium text-ink-900">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
