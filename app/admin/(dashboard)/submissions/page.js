"use client";

import ResourceManager from "@/components/admin/ResourceManager";

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "service", label: "Service" },
  { key: "status", label: "Status" },
  {
    key: "createdAt",
    label: "Received",
    render: (r) => new Date(r.createdAt).toLocaleDateString(),
  },
];

const fields = [
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["new", "read", "archived"],
    required: true,
  },
];

export default function SubmissionsAdminPage() {
  return (
    <ResourceManager
      resource="submissions"
      title="Contact Submissions"
      columns={columns}
      fields={fields}
      allowCreate={false}
      allowDelete={false}
    />
  );
}
