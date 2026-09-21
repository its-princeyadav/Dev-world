"use client";

import ResourceManager from "@/components/admin/ResourceManager";

const columns = [
  { key: "title", label: "Title" },
  { key: "slug", label: "Slug" },
  { key: "order", label: "Order" },
  { key: "published", label: "Published", render: (r) => (r.published ? "Yes" : "No") },
];

const fields = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "slug", label: "Slug", type: "text", required: true },
  { name: "short", label: "Short description", type: "text", required: true },
  { name: "overview", label: "Overview", type: "textarea", required: true },
  { name: "order", label: "Order", type: "number" },
  { name: "published", label: "Published", type: "checkbox" },
];

export default function ServicesAdminPage() {
  return (
    <ResourceManager resource="services" title="Services" columns={columns} fields={fields} />
  );
}
