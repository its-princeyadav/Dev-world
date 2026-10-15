import { HiEnvelope, HiMapPin, HiPhone } from "react-icons/hi2";

import PageHero from "@/components/layout/PageHero";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";
import SocialLinks from "@/components/common/SocialLinks";
import ApiForm from "@/components/common/ApiForm";
import FadeUp from "@/components/animations/FadeUp";
import { CONTACT } from "@/constants/site";
import { GLASS_CARD } from "@/constants/theme";
import { contactFields } from "@/data/contactFields";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Dev World — tell us about your project and we'll respond within one business day.",
};

const CONTACT_DETAILS = [
  { icon: HiEnvelope, label: "Email", value: CONTACT.email, href: CONTACT.emailHref },
  { icon: HiPhone, label: "Phone", value: CONTACT.phone, href: CONTACT.phoneHref },
  { icon: HiMapPin, label: "Office", value: CONTACT.office },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Talk About Your Project"
        description="Tell us what you're building — we'll get back to you within one business day."
      />

      <Section className="pt-[3vw]">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-[4vw] max-[1025px]:grid-cols-1 max-[1025px]:gap-[10vw]">
          <div>
            <SectionHeading title="Reach Us Directly" size="md" className="w-full" />
            <FadeUp as="ul" className="mt-[3vw] space-y-[2vw] max-[1025px]:mt-[6vw] max-[1025px]:space-y-[5vw]">
              {CONTACT_DETAILS.map(({ icon: DetailIcon, label, value, href }) => (
                <li key={label} className="flex items-center gap-[1.2vw] max-[1025px]:gap-[3vw]">
                  <span className="flex size-[3.4vw] shrink-0 items-center justify-center rounded-full border border-white/20 text-[#F16B0D] max-[1025px]:size-[8vw] max-md:size-[12vw]">
                    <DetailIcon aria-hidden="true" className="size-[40%]" />
                  </span>
                  <div>
                    <p className="text-[0.95vw] uppercase tracking-[0.12em] text-white/50 max-[1025px]:text-[2vw] max-md:text-[3.2vw]">
                      {label}
                    </p>
                    {href ? (
                      <a href={href} className="under-multi-parent text-[1.4vw] max-[1025px]:text-[3vw] max-md:text-[4.6vw]">
                        <span className="under-multi">{value}</span>
                      </a>
                    ) : (
                      <p className="text-[1.4vw] max-[1025px]:text-[3vw] max-md:text-[4.6vw]">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </FadeUp>
            <div className="mt-[3vw] max-[1025px]:mt-[8vw]">
              <SocialLinks />
            </div>
          </div>

          <div className={`p-[3vw] max-[1025px]:p-8 max-md:p-6 ${GLASS_CARD}`}>
            <ApiForm
              endpoint="/api/contact"
              fields={contactFields}
              submitLabel="Send Message"
              successMessage="Thanks — we've received your message and will respond within one business day."
              errorMessage="Something went wrong. Please try again or email us directly."
            />
          </div>
        </div>
      </Section>
    </>
  );
}
