import LegalContent from "@/components/sections/LegalContent";

export const metadata = {
  title: "Privacy Policy",
  description: "How Dev World collects, uses, and protects your information.",
};

const sections = [
  {
    heading: "1. Information We Collect",
    paragraphs: [
      "We collect information you provide directly to us, such as your name, email address, company, and project details when you submit a contact or careers form. We also collect standard technical data (IP address, browser type, pages visited) via analytics tools to improve our site.",
    ],
  },
  {
    heading: "2. How We Use Your Information",
    paragraphs: [
      "We use the information you provide to respond to inquiries, evaluate job applications, deliver requested services, and improve our website. We do not sell your personal information to third parties.",
    ],
  },
  {
    heading: "3. Data Retention",
    paragraphs: [
      "We retain contact and application data for as long as reasonably necessary to fulfill the purposes described above, or as required by law.",
    ],
  },
  {
    heading: "4. Your Rights",
    paragraphs: [
      "Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data. Contact us at privacy@devworld.example.com to make a request.",
    ],
  },
  {
    heading: "5. Cookies",
    paragraphs: [
      "We use cookies for essential site functionality and analytics. See our Cookies policy for details on how to manage your preferences.",
    ],
  },
  {
    heading: "6. Contact",
    paragraphs: [
      "Questions about this policy can be directed to privacy@devworld.example.com.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalContent title="Privacy Policy" updated="September 2026" sections={sections} />
  );
}
