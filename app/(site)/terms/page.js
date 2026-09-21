import LegalContent from "@/components/sections/LegalContent";

export const metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the Dev World website and services.",
};

const sections = [
  {
    heading: "1. Acceptance of Terms",
    paragraphs: [
      "By accessing this website or engaging Dev World's services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our site or services.",
    ],
  },
  {
    heading: "2. Services",
    paragraphs: [
      "Specific project engagements are governed by a separate signed Statement of Work (SOW) or Master Services Agreement (MSA), which take precedence over these general terms for the scope, pricing, and deliverables of that engagement.",
    ],
  },
  {
    heading: "3. Intellectual Property",
    paragraphs: [
      "Unless otherwise agreed in a project SOW, all content on this website (design, copy, branding) is the property of Dev World. Client project deliverables and IP ownership are governed by the applicable SOW.",
    ],
  },
  {
    heading: "4. Limitation of Liability",
    paragraphs: [
      "Dev World is not liable for any indirect, incidental, or consequential damages arising from use of this website. Liability related to delivered services is governed by the applicable SOW.",
    ],
  },
  {
    heading: "5. Changes to These Terms",
    paragraphs: [
      "We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the updated terms.",
    ],
  },
  {
    heading: "6. Contact",
    paragraphs: [
      "Questions about these terms can be directed to legal@devworld.example.com.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalContent title="Terms of Service" updated="September 2026" sections={sections} />
  );
}
