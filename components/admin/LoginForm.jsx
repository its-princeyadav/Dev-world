"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Label, Input, ErrorText } from "@/components/ui/FormField";
import Button from "@/components/ui/Button";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [error, setError] = useState("");

  async function onSubmit(data) {
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Login failed");
      router.push(searchParams.get("from") || "/admin");
      router.refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <Label htmlFor="email" required>
          Email
        </Label>
        <Input
          id="email"
          type="email"
          error={errors.email}
          {...register("email", { required: "Email is required" })}
        />
        <ErrorText id="email-error">{errors.email?.message}</ErrorText>
      </div>
      <div>
        <Label htmlFor="password" required>
          Password
        </Label>
        <Input
          id="password"
          type="password"
          error={errors.password}
          {...register("password", { required: "Password is required" })}
        />
        <ErrorText id="password-error">{errors.password?.message}</ErrorText>
      </div>

      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}

      <Button type="submit" icon={false} disabled={isSubmitting} className="w-full justify-center">
        {isSubmitting ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
