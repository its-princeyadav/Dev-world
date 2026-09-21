"use client";

import ResourceManager from "@/components/admin/ResourceManager";

const columns = [
  { key: "pageKey", label: "Page key" },
  { key: "heading", label: "Heading" },
];

const fields = [
  { name: "pageKey", label: "Page key (e.g. home, about, contact)", type: "text", required: true },
  { name: "eyebrow", label: "Eyebrow", type: "text" },
  { name: "heading", label: "Heading", type: "text", required: true },
  { name: "subheading", label: "Subheading", type: "textarea" },
  { name: "mediaUrl", label: "Media URL", type: "text" },
  { name: "ctaLabel", label: "CTA label", type: "text" },
  { name: "ctaHref", label: "CTA link", type: "text" },
];

export default function HeroBannersAdminPage() {
  return (
    <ResourceManager
      resource="hero-banners"
      title="Hero Banners"
      columns={columns}
      fields={fields}
    />
  );
}
