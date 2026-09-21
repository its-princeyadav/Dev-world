"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { jobOpenings } from "@/data/jobOpenings";
import { Label, Input, Textarea, Select, ErrorText } from "@/components/ui/FormField";
import Button from "@/components/ui/Button";

export default function CareerApplicationForm() {
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
      const res = await fetch("/api/careers/apply", {
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
            Email
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

      <div>
        <Label htmlFor="role" required>
          Role applying for
        </Label>
        <Select
          id="role"
          error={errors.role}
          defaultValue=""
          {...register("role", { required: "Please select a role" })}
        >
          <option value="" disabled>
            Select a role
          </option>
          {jobOpenings.map((job) => (
            <option key={job.slug} value={job.title}>
              {job.title}
            </option>
          ))}
          <option value="Other">Other / General application</option>
        </Select>
        <ErrorText id="role-error">{errors.role?.message}</ErrorText>
      </div>

      <div>
        <Label htmlFor="linkedin">LinkedIn or portfolio URL</Label>
        <Input id="linkedin" type="url" {...register("linkedin")} />
      </div>

      <div>
        <Label htmlFor="coverNote" required>
          Why Dev World?
        </Label>
        <Textarea
          id="coverNote"
          error={errors.coverNote}
          {...register("coverNote", { required: "Tell us a little about yourself" })}
        />
        <ErrorText id="coverNote-error">{errors.coverNote?.message}</ErrorText>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full justify-center sm:w-auto">
        {isSubmitting ? "Submitting…" : "Submit application"}
      </Button>

      {status === "success" && (
        <p role="status" className="text-sm font-medium text-success">
          Thanks — we&apos;ve received your application and will be in touch.
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
