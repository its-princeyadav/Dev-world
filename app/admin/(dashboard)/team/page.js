"use client";

import ResourceManager from "@/components/admin/ResourceManager";

const columns = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "order", label: "Order" },
];

const fields = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "role", label: "Role", type: "text", required: true },
  { name: "photo", label: "Photo URL", type: "text" },
  { name: "bio", label: "Bio", type: "textarea" },
  { name: "order", label: "Order", type: "number" },
];

export default function TeamAdminPage() {
  return (
    <ResourceManager resource="team" title="Team Members" columns={columns} fields={fields} />
  );
}
