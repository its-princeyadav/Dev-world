"use client";

import ResourceManager from "@/components/admin/ResourceManager";

// Portfolio shares the Project model with /admin/projects — this view is
// where the "featured" flag (what surfaces on the public Portfolio page) is
// curated day to day.
const columns = [
  { key: "title", label: "Title" },
  { key: "category", label: "Category" },
  { key: "featured", label: "Featured", render: (r) => (r.featured ? "Yes" : "No") },
  { key: "order", label: "Order" },
];

const fields = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "slug", label: "Slug", type: "text", required: true },
  { name: "client", label: "Client", type: "text" },
  { name: "category", label: "Category", type: "text", required: true },
  { name: "summary", label: "Summary", type: "textarea", required: true },
  { name: "coverImage", label: "Cover image URL", type: "text" },
  { name: "order", label: "Order", type: "number" },
  { name: "featured", label: "Featured on Portfolio", type: "checkbox" },
];

export default function PortfolioAdminPage() {
  return (
    <ResourceManager resource="projects" title="Portfolio" columns={columns} fields={fields} />
  );
}
