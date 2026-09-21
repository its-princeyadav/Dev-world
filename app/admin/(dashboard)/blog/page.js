"use client";

import ResourceManager from "@/components/admin/ResourceManager";

const columns = [
  { key: "title", label: "Title" },
  { key: "author", label: "Author" },
  { key: "category", label: "Category" },
  { key: "published", label: "Published", render: (r) => (r.published ? "Yes" : "No") },
];

const fields = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "slug", label: "Slug", type: "text", required: true },
  { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
  { name: "content", label: "Content", type: "textarea", required: true },
  { name: "author", label: "Author", type: "text", required: true },
  { name: "category", label: "Category", type: "text" },
  { name: "published", label: "Published", type: "checkbox" },
];

export default function BlogAdminPage() {
  return <ResourceManager resource="blog" title="Blog Posts" columns={columns} fields={fields} />;
}
