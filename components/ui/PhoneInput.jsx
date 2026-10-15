"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { countries } from "@/data/countries";
import { ChevronDownIcon } from "@/components/common/Icons";

/**
 * Phone number input with a country dialling-code picker.
 * `value` / `onChange` use the full number including the code, e.g. "+971 50 123 4567".
 */
export default function PhoneInput({
  id = "phone",
  label = "Phone Number*",
  value = "",
  onChange,
  defaultCountry = "IN",
  error,
}) {
  const wrapperRef = useRef(null);
  const [country, setCountry] = useState(() => countries.find((item) => item.code === defaultCountry) ?? countries[0]);
  const [isListOpen, setIsListOpen] = useState(false);
  const errorId = `${id}-error`;

  // The input shows the number without the dialling code
  const localNumber = value.startsWith(country.dial) ? value.slice(country.dial.length).trim() : value;

  // Close the country list when clicking anywhere else
  useEffect(() => {
    function handlePointerDown(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) setIsListOpen(false);
    }
    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  function selectCountry(nextCountry) {
    setCountry(nextCountry);
    setIsListOpen(false);
    onChange?.(`${nextCountry.dial} ${localNumber}`.trim());
  }

  function handleNumberChange(event) {
    const digits = event.target.value.replace(/[^\d\s\-()]/g, "");
    onChange?.(`${country.dial} ${digits}`.trim());
  }

  return (
    <div ref={wrapperRef} className="w-full">
      <div
        className={cn(
          "flex h-14 items-center rounded-full border bg-white/15 transition-all duration-300 border-white/20 focus-within:border-[#ff5f00]",
          error && "border-red-400 focus-within:border-red-400",
        )}
      >
        {/* Country picker */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsListOpen((open) => !open)}
            aria-expanded={isListOpen}
            aria-haspopup="listbox"
            aria-label={`Country code: ${country.name} ${country.dial}`}
            className="flex h-full cursor-pointer items-center gap-1 pl-4 pr-2 text-sm text-white transition-colors"
          >
            <span className="text-base">{country.flag}</span>
            <span className="font-normal text-sm">{country.dial}</span>
            <ChevronDownIcon className={cn("transition-transform duration-200", isListOpen && "rotate-180")} />
          </button>

          {isListOpen && (
            <div
              role="listbox"
              aria-label="Country"
              className="absolute left-0 top-full z-50 mt-2 max-h-52 min-w-48 rounded-md border border-gray-200 bg-white py-1"
            >
              <div className="overflow-y-auto max-h-48">
                {countries.map((item) => {
                  const isSelected = item.code === country.code;
                  return (
                    <button
                      key={`${item.code}-${item.dial}`}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => selectCountry(item)}
                      className={cn(
                        "flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm text-black! transition-colors hover:bg-gray-50",
                        isSelected && "font-medium",
                      )}
                    >
                      <span>{item.flag}</span>
                      <span>{item.code}</span>
                      <span className="ml-auto text-gray-400">{item.dial}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <span className="h-6 w-px shrink-0 bg-gray-200" aria-hidden="true" />

        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <input
          id={id}
          type="tel"
          value={localNumber}
          onChange={handleNumberChange}
          placeholder={label}
          autoComplete="tel"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="h-full flex-1 rounded-r-full bg-transparent pl-4 pr-5 text-sm text-white outline-none"
        />
      </div>
      {error && (
        <p id={errorId} className="ml-4 mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
