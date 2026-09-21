"use client";

import { useCallback, useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi2";
import { adminFetch } from "@/lib/adminApi";
import DataTable from "@/components/admin/DataTable";
import ResourceFormPanel from "@/components/admin/ResourceFormPanel";
import Button from "@/components/ui/Button";

export default function ResourceManager({
  resource,
  title,
  columns,
  fields,
  allowCreate = true,
  allowDelete = true,
}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminFetch(`/${resource}`);
      setRows(data.items || []);
    } finally {
      setLoading(false);
    }
  }, [resource]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setPanelOpen(true);
  }

  function openEdit(row) {
    setEditing(row);
    setPanelOpen(true);
  }

  async function handleSubmit(values) {
    if (editing) {
      await adminFetch(`/${resource}/${editing._id}`, {
        method: "PATCH",
        body: JSON.stringify(values),
      });
    } else {
      await adminFetch(`/${resource}`, {
        method: "POST",
        body: JSON.stringify(values),
      });
    }
    await load();
  }

  async function handleDelete(row) {
    if (!window.confirm("Delete this record? This can't be undone.")) return;
    await adminFetch(`/${resource}/${row._id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ink-900">{title}</h1>
        {allowCreate && (
          <Button icon={false} size="sm" onClick={openCreate}>
            <span className="inline-flex items-center gap-1.5">
              <HiPlus className="size-4" /> Add new
            </span>
          </Button>
        )}
      </div>

      {loading ? (
        <p className="text-sm text-ink-500">Loading…</p>
      ) : (
        <DataTable
          columns={columns}
          rows={rows}
          onEdit={openEdit}
          onDelete={allowDelete ? handleDelete : undefined}
        />
      )}

      <ResourceFormPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        fields={fields}
        initialValues={editing}
        onSubmit={handleSubmit}
        title={editing ? `Edit ${title.replace(/s$/, "")}` : `New ${title.replace(/s$/, "")}`}
      />
    </div>
  );
}
