"use client";

import ResourceManager from "@/components/admin/ResourceManager";

const columns = [
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "order", label: "Order" },
];

const fields = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "category", label: "Category", type: "text", required: true },
  { name: "order", label: "Order", type: "number" },
];

export default function TechnologiesAdminPage() {
  return (
    <ResourceManager
      resource="technologies"
      title="Technologies"
      columns={columns}
      fields={fields}
    />
  );
}
