import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const fieldClasses =
  "w-full rounded-[8px] border border-paper-border bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export function Label({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink-800">
      {children}
      {required && <span className="text-danger"> *</span>}
    </label>
  );
}

export function ErrorText({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-danger">
      {children}
    </p>
  );
}

export const Input = forwardRef(function Input(
  { className, error, id, ...props },
  ref
) {
  return (
    <input
      id={id}
      ref={ref}
      className={cn(fieldClasses, error && "border-danger", className)}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
    />
  );
});

export const Textarea = forwardRef(function Textarea(
  { className, error, id, ...props },
  ref
) {
  return (
    <textarea
      id={id}
      ref={ref}
      className={cn(
        fieldClasses,
        "min-h-32 resize-y",
        error && "border-danger",
        className
      )}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
    />
  );
});

export const Select = forwardRef(function Select(
  { className, error, id, children, ...props },
  ref
) {
  return (
    <select
      id={id}
      ref={ref}
      className={cn(fieldClasses, error && "border-danger", className)}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
    >
      {children}
    </select>
  );
});
