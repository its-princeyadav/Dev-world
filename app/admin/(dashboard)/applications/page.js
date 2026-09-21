"use client";

import ResourceManager from "@/components/admin/ResourceManager";

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role applied to" },
  { key: "status", label: "Status" },
  {
    key: "createdAt",
    label: "Applied",
    render: (r) => new Date(r.createdAt).toLocaleDateString(),
  },
];

const fields = [
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["new", "reviewing", "interviewing", "rejected", "hired"],
    required: true,
  },
];

export default function ApplicationsAdminPage() {
  return (
    <ResourceManager
      resource="applications"
      title="Career Applications"
      columns={columns}
      fields={fields}
      allowCreate={false}
      allowDelete={false}
    />
  );
}
