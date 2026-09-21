"use client";

import ResourceManager from "@/components/admin/ResourceManager";

const columns = [
  { key: "author", label: "Author" },
  { key: "company", label: "Company" },
  { key: "rating", label: "Rating" },
  { key: "featured", label: "Featured", render: (r) => (r.featured ? "Yes" : "No") },
];

const fields = [
  { name: "quote", label: "Quote", type: "textarea", required: true },
  { name: "author", label: "Author", type: "text", required: true },
  { name: "role", label: "Role", type: "text" },
  { name: "company", label: "Company", type: "text" },
  { name: "rating", label: "Rating (1-5)", type: "number" },
  { name: "order", label: "Order", type: "number" },
  { name: "featured", label: "Featured", type: "checkbox" },
];

export default function TestimonialsAdminPage() {
  return (
    <ResourceManager
      resource="testimonials"
      title="Testimonials"
      columns={columns}
      fields={fields}
    />
  );
}
