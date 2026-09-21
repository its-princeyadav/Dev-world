"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HiXMark } from "react-icons/hi2";
import { useState } from "react";
import { Label, Input, Textarea, Select } from "@/components/ui/FormField";
import Button from "@/components/ui/Button";

function defaultValueFor(field) {
  if (field.type === "checkbox") return false;
  if (field.type === "number") return 0;
  return "";
}

function buildInitialValues(fields, initialValues) {
  const base = {};
  fields.forEach((f) => {
    base[f.name] = initialValues?.[f.name] ?? defaultValueFor(f);
  });
  return base;
}

// Owns the form's field state, initialized once from props at mount.
// ResourceFormPanel remounts this (via `key`) every time it opens for a
// different record, so there's no need to sync state via an effect.
function ResourceForm({ fields, initialValues, onSubmit, onClose, title }) {
  const [values, setValues] = useState(() => buildInitialValues(fields, initialValues));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSubmit(values);
      onClose();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
      className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto bg-white shadow-elev-lg"
    >
      <div className="flex items-center justify-between border-b border-paper-border px-6 py-4">
        <h2 className="text-lg font-semibold text-ink-900">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="rounded-md p-1.5 text-ink-500 hover:bg-paper-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <HiXMark className="size-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-6">
        {fields.map((field) => (
          <div key={field.name}>
            {field.type !== "checkbox" && (
              <Label htmlFor={field.name} required={field.required}>
                {field.label}
              </Label>
            )}

            {field.type === "textarea" && (
              <Textarea
                id={field.name}
                required={field.required}
                value={values[field.name] ?? ""}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [field.name]: e.target.value }))
                }
              />
            )}

            {field.type === "select" && (
              <Select
                id={field.name}
                required={field.required}
                value={values[field.name] ?? ""}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [field.name]: e.target.value }))
                }
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Select>
            )}

            {field.type === "checkbox" && (
              <label className="flex items-center gap-2 text-sm text-ink-700">
                <input
                  type="checkbox"
                  checked={!!values[field.name]}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, [field.name]: e.target.checked }))
                  }
                  className="size-4 rounded border-paper-border text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                />
                {field.label}
              </label>
            )}

            {(!field.type || field.type === "text" || field.type === "number") && (
              <Input
                id={field.name}
                type={field.type === "number" ? "number" : "text"}
                required={field.required}
                value={values[field.name] ?? ""}
                onChange={(e) =>
                  setValues((v) => ({
                    ...v,
                    [field.name]:
                      field.type === "number" ? Number(e.target.value) : e.target.value,
                  }))
                }
              />
            )}
          </div>
        ))}

        {error && (
          <p role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}

        <div className="flex gap-3 pt-2">
          <Button type="submit" icon={false} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </Button>
          <Button type="button" icon={false} variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

export default function ResourceFormPanel({ open, onClose, fields, initialValues, onSubmit, title }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/40"
            onClick={onClose}
          />
          <ResourceForm
            key={initialValues?._id ?? "new"}
            fields={fields}
            initialValues={initialValues}
            onSubmit={onSubmit}
            onClose={onClose}
            title={title}
          />
        </>
      )}
    </AnimatePresence>
  );
}
