"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HiTrash, HiArrowUpTray } from "react-icons/hi2";

export default function MediaManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/media", { credentials: "include" });
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    load();
  }, [load]);

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/media", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      await load();
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this file? This can't be undone.")) return;
    await fetch(`/api/admin/media/${id}`, { method: "DELETE", credentials: "include" });
    await load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ink-900">Media Library</h1>
        <div>
          <input
            ref={fileRef}
            id="media-upload"
            type="file"
            className="hidden"
            onChange={handleUpload}
          />
          <label
            htmlFor="media-upload"
            className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-[14px] bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent-bright"
          >
            <HiArrowUpTray className="size-4" />
            {uploading ? "Uploading…" : "Upload file"}
          </label>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-ink-500">Loading…</p>
      ) : items.length === 0 ? (
        <div className="rounded-[14px] border border-dashed border-paper-border p-12 text-center text-sm text-ink-500">
          No files uploaded yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((item) => (
            <div
              key={item._id}
              className="group relative overflow-hidden rounded-[14px] border border-paper-border bg-white"
            >
              {item.mimetype?.startsWith("image/") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.url}
                  alt={item.filename}
                  className="aspect-square w-full object-cover"
                />
              ) : (
                <div className="flex aspect-square w-full items-center justify-center bg-paper-soft text-xs text-ink-500">
                  {item.mimetype || "file"}
                </div>
              )}
              <div className="p-2">
                <p className="truncate text-xs text-ink-600">{item.filename}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(item._id)}
                aria-label="Delete file"
                className="absolute right-2 top-2 rounded-md bg-white/90 p-1.5 text-danger opacity-0 shadow-elev-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <HiTrash className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
