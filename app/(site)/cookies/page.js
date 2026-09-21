import LegalContent from "@/components/sections/LegalContent";

export const metadata = {
  title: "Cookie Policy",
  description: "How Dev World uses cookies and how you can manage your preferences.",
};

const sections = [
  {
    heading: "1. What Are Cookies",
    paragraphs: [
      "Cookies are small text files stored on your device that help websites function and collect usage information.",
    ],
  },
  {
    heading: "2. Types of Cookies We Use",
    paragraphs: [
      "Essential cookies: required for core site functionality (navigation, form submission). Analytics cookies: help us understand how visitors use our site so we can improve it. We do not use third-party advertising cookies.",
    ],
  },
  {
    heading: "3. Managing Cookies",
    paragraphs: [
      "You can control or delete cookies through your browser settings. Disabling essential cookies may affect site functionality.",
    ],
  },
  {
    heading: "4. Contact",
    paragraphs: [
      "Questions about our cookie usage can be directed to privacy@devworld.example.com.",
    ],
  },
];

export default function CookiesPage() {
  return (
    <LegalContent title="Cookie Policy" updated="September 2026" sections={sections} />
  );
}
