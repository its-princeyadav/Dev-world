import { HiPencilSquare, HiTrash } from "react-icons/hi2";

export default function DataTable({ columns, rows, onEdit, onDelete, getId = (r) => r._id }) {
  if (!rows.length) {
    return (
      <div className="rounded-[14px] border border-dashed border-paper-border p-12 text-center text-sm text-ink-500">
        No records yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-[14px] border border-paper-border bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-paper-border bg-paper-soft text-xs uppercase tracking-wide text-ink-500">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-medium">
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="px-4 py-3" />}
          </tr>
        </thead>
        <tbody className="divide-y divide-paper-border">
          {rows.map((row) => (
            <tr key={getId(row)} className="hover:bg-paper-soft/60">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-ink-700">
                  {col.render ? col.render(row) : String(row[col.key] ?? "—")}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(row)}
                        aria-label="Edit"
                        className="rounded-md p-1.5 text-ink-500 hover:bg-paper-border hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <HiPencilSquare className="size-4" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(row)}
                        aria-label="Delete"
                        className="rounded-md p-1.5 text-ink-500 hover:bg-danger/10 hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <HiTrash className="size-4" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
