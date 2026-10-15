"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { GRADIENT_CSS } from "@/constants/theme";
import RollButton from "@/components/common/RollButton";
import TextField from "@/components/ui/TextField";
import PhoneInput from "@/components/ui/PhoneInput";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_PATTERN = /^https?:\/\/\S+\.\S+/i;
const MESSAGE_VISIBLE_MS = 7000;

// One empty value per field
function emptyValues(fields) {
  return Object.fromEntries(fields.map((field) => [field.name, ""]));
}

// Returns an error message for a field, or undefined if it is valid
function validateField(field, value) {
  const isRequired = field.required !== false;
  if (!value) return isRequired ? `${field.label.replace("*", "")} is required.` : undefined;
  if (field.type === "email" && !EMAIL_PATTERN.test(value)) return "Invalid email address.";
  if (field.type === "url" && !URL_PATTERN.test(value)) return "Enter a full URL, starting with https://";
  if (field.type === "phone" && value.replace(/\D/g, "").length < 7) {
    // An optional phone field that only holds the dialling code counts as empty
    if (!isRequired && !value.includes(" ")) return undefined;
    return "Invalid phone number.";
  }
  return undefined;
}

/**
 * Form built from a list of fields (see data/contactFields.js).
 * Validates on submit and calls `onSubmit(values)`; if that throws, an error message is shown.
 *
 * Field options: type ("text" | "email" | "url" | "phone" | "textarea" | "select"), name, label,
 * required (default true), half (sits beside the next half field on wider screens), options (select).
 *
 * Props: fields, onSubmit, submitLabel, loadingLabel, successMessage, errorMessage
 */
export default function ContactForm({
  fields,
  onSubmit,
  submitLabel = "Submit",
  loadingLabel = "Sending...",
  successMessage = "Form submitted successfully!",
  errorMessage = "Error sending message. Please try again.",
}) {
  const [values, setValues] = useState(() => emptyValues(fields));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // "idle" | "sending" | "success" | "error"
  const statusTimer = useRef(null);

  useEffect(() => () => clearTimeout(statusTimer.current), []);

  function handleChange(name, value) {
    setValues((current) => ({ ...current, [name]: value }));
    // Clear the field's error as soon as the user edits it
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function showStatus(nextStatus) {
    setStatus(nextStatus);
    clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => setStatus("idle"), MESSAGE_VISIBLE_MS);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "sending") return;

    const nextErrors = {};
    fields.forEach((field) => {
      const error = validateField(field, values[field.name]);
      if (error) nextErrors[field.name] = error;
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      await onSubmit(values);
      setValues(emptyValues(fields));
      showStatus("success");
    } catch {
      showStatus("error");
    }
  }

  const isSending = status === "sending";

  return (
    <div className="h-full w-full">
      <div className="w-full flex flex-col gap-[2vw]">
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-x-[1vw] gap-y-[1.2vw] max-[1025px]:gap-x-[2vw] max-[1025px]:gap-y-[4vw] max-md:grid-cols-1"
        >
          {fields.map((field) => (
            <div key={field.name} className={cn(field.half ? "col-span-1" : "col-span-2", "max-md:col-span-1")}>
              {field.type === "phone" ? (
                <PhoneInput
                  id={field.name}
                  label={field.label}
                  value={values[field.name]}
                  onChange={(value) => handleChange(field.name, value)}
                  defaultCountry={field.defaultCountry}
                  error={errors[field.name]}
                />
              ) : (
                <TextField
                  id={field.name}
                  label={field.label}
                  type={field.type}
                  options={field.options}
                  value={values[field.name]}
                  onChange={(event) => handleChange(field.name, event.target.value)}
                  error={errors[field.name]}
                />
              )}
            </div>
          ))}

          <div className="col-span-2 flex items-center justify-start max-md:col-span-1 max-md:mt-[6vw]">
            <RollButton
              type="submit"
              aria-disabled={isSending}
              className="mt-[1vw] max-md:mt-0 max-[1025px]:mt-[3vw]"
              textClassName="text-[1.2vw] max-md:text-[4vw] max-[1025px]:text-[2.5vw]"
              bgColor={GRADIENT_CSS}
              dotColor="#ffffff"
              textColor="#ffffff"
              hoverTextColor="#111111"
            >
              {isSending ? loadingLabel : submitLabel}
            </RollButton>
          </div>

          <div role="status" aria-live="polite" className="col-span-2 max-md:col-span-1">
            {status === "success" && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
            {status === "error" && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
