"use client";

import ResourceManager from "@/components/admin/ResourceManager";

const columns = [
  { key: "title", label: "Title" },
  { key: "client", label: "Client" },
  { key: "category", label: "Category" },
  { key: "featured", label: "Featured", render: (r) => (r.featured ? "Yes" : "No") },
];

const fields = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "slug", label: "Slug", type: "text", required: true },
  { name: "client", label: "Client", type: "text" },
  { name: "category", label: "Category", type: "text", required: true },
  { name: "summary", label: "Summary", type: "textarea", required: true },
  { name: "coverImage", label: "Cover image URL", type: "text" },
  { name: "externalLink", label: "External link", type: "text" },
  { name: "order", label: "Order", type: "number" },
  { name: "featured", label: "Featured", type: "checkbox" },
  { name: "published", label: "Published", type: "checkbox" },
];

export default function ProjectsAdminPage() {
  return (
    <ResourceManager resource="projects" title="Projects" columns={columns} fields={fields} />
  );
}
