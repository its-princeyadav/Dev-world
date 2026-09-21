"use client";

import ResourceManager from "@/components/admin/ResourceManager";

const columns = [
  { key: "pageKey", label: "Page key" },
  { key: "title", label: "Title" },
  { key: "description", label: "Description" },
];

const fields = [
  { name: "pageKey", label: "Page key (e.g. home, about, contact)", type: "text", required: true },
  { name: "title", label: "Meta title", type: "text" },
  { name: "description", label: "Meta description", type: "textarea" },
  { name: "ogImage", label: "OG image URL", type: "text" },
];

export default function SeoAdminPage() {
  return (
    <ResourceManager resource="seo" title="SEO Management" columns={columns} fields={fields} />
  );
}
