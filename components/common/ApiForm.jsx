"use client";

import ContactForm from "@/components/ui/ContactForm";
import { submitForm } from "@/lib/submitForm";

/**
 * ContactForm that posts its values as JSON to `endpoint`.
 * Takes only serializable props, so Server Components can render it directly.
 */
export default function ApiForm({ endpoint, ...formProps }) {
  return (
    <div className="get-in-touch-form">
      <ContactForm onSubmit={(values) => submitForm(endpoint, values)} {...formProps} />
    </div>
  );
}
