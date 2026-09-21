"use client";

import ResourceManager from "@/components/admin/ResourceManager";

const columns = [
  { key: "question", label: "Question" },
  { key: "category", label: "Category" },
  { key: "order", label: "Order" },
];

const fields = [
  { name: "question", label: "Question", type: "text", required: true },
  { name: "answer", label: "Answer", type: "textarea", required: true },
  { name: "category", label: "Category", type: "text" },
  { name: "order", label: "Order", type: "number" },
];

export default function FaqsAdminPage() {
  return <ResourceManager resource="faqs" title="FAQs" columns={columns} fields={fields} />;
}
