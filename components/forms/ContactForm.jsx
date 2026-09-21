"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { services } from "@/data/services";
import { Label, Input, Textarea, Select, ErrorText } from "@/components/ui/FormField";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [status, setStatus] = useState("idle");

  async function onSubmit(data) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" required>
            Full name
          </Label>
          <Input
            id="name"
            error={errors.name}
            {...register("name", { required: "Your name is required" })}
          />
          <ErrorText id="name-error">{errors.name?.message}</ErrorText>
        </div>
        <div>
          <Label htmlFor="email" required>
            Work email
          </Label>
          <Input
            id="email"
            type="email"
            error={errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
            })}
          />
          <ErrorText id="email-error">{errors.email?.message}</ErrorText>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="company">Company</Label>
          <Input id="company" {...register("company")} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" {...register("phone")} />
        </div>
      </div>

      <div>
        <Label htmlFor="service">Service you&apos;re interested in</Label>
        <Select id="service" defaultValue="" {...register("service")}>
          <option value="">Not sure yet</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="message" required>
          Tell us about your project
        </Label>
        <Textarea
          id="message"
          error={errors.message}
          {...register("message", { required: "Please add a few details" })}
        />
        <ErrorText id="message-error">{errors.message?.message}</ErrorText>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full justify-center sm:w-auto">
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>

      {status === "success" && (
        <p role="status" className="text-sm font-medium text-success">
          Thanks — we&apos;ve received your message and will respond within one business day.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-danger">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
