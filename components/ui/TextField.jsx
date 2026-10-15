"use client";

import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@/components/common/Icons";

const FIELD_CLASSES =
  "w-full pl-5 pr-4 text-sm text-white bg-white/15 border border-white/15 outline-none transition-all duration-300 focus:border-[#ff5f00]";

/**
 * Rounded form field with a visually hidden label and an error message underneath.
 * The label text doubles as the placeholder.
 *
 * type: any <input> type, or "textarea" / "select" (pass `options` as [{ value, label }]).
 */
export default function TextField({ id, label, type = "text", error, options = [], ...inputProps }) {
  const errorId = `${id}-error`;
  const sharedProps = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    ...inputProps,
  };

  let control;
  if (type === "textarea") {
    control = (
      <textarea
        placeholder={label}
        rows={5}
        className={cn(FIELD_CLASSES, "min-h-36 resize-y rounded-3xl py-4", error && "border-red-400")}
        {...sharedProps}
      />
    );
  } else if (type === "select") {
    control = (
      <div className="relative">
        <select
          className={cn(
            FIELD_CLASSES,
            "h-14 appearance-none rounded-full pr-12 cursor-pointer",
            !inputProps.value && "text-white/45",
            error && "border-red-400",
          )}
          {...sharedProps}
        >
          <option value="" className="text-black">
            {label}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-black">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon size={14} className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white" />
      </div>
    );
  } else {
    control = (
      <input
        type={type}
        placeholder={label}
        className={cn(FIELD_CLASSES, "h-14 rounded-full", error && "border-red-400")}
        {...sharedProps}
      />
    );
  }

  return (
    <div className="w-full">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {control}
      {error && (
        <p id={errorId} className="mt-1 ml-4 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
