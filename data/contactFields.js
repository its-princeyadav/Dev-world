// Form field definitions, in display order (rendered by components/ui/ContactForm.jsx).
// type: "text" | "email" | "url" | "phone" | "textarea" | "select". Fields are required unless `required: false`.
import { services } from "./services.js";
import { jobOpenings } from "./jobOpenings.js";

const serviceOptions = services.map((service) => ({ value: service.title, label: service.title }));

// Contact page form → /api/contact
export const contactFields = [
  { type: "text", name: "name", label: "Full Name*", half: true },
  { type: "email", name: "email", label: "Work Email*", half: true },
  { type: "text", name: "company", label: "Company", required: false, half: true },
  { type: "phone", name: "phone", label: "Phone", required: false, defaultCountry: "US", half: true },
  { type: "select", name: "service", label: "Service you're interested in", required: false, options: serviceOptions },
  { type: "textarea", name: "message", label: "Tell us about your project*" },
];

// "Get in Touch" popup → /api/contact (a shorter version of the contact page form)
export const quickContactFields = [
  { type: "text", name: "name", label: "Your Name*", half: true },
  { type: "email", name: "email", label: "Email Address*", half: true },
  { type: "select", name: "service", label: "Service you're interested in", required: false, options: serviceOptions },
  { type: "textarea", name: "message", label: "Your Message*" },
  { type: "phone", name: "phone", label: "Phone Number", required: false, defaultCountry: "US" },
];

// Careers application form → /api/careers/apply
export const careerFields = [
  { type: "text", name: "name", label: "Full Name*", half: true },
  { type: "email", name: "email", label: "Email*", half: true },
  {
    type: "select",
    name: "role",
    label: "Role applying for*",
    options: [
      ...jobOpenings.map((job) => ({ value: job.title, label: job.title })),
      { value: "Other", label: "Other / General application" },
    ],
  },
  { type: "url", name: "linkedin", label: "LinkedIn or portfolio URL", required: false },
  { type: "textarea", name: "coverNote", label: "Why Dev World?*" },
];
