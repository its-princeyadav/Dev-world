import { Suspense } from "react";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Log in" };

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm rounded-[20px] border border-ink-border bg-ink-soft p-8">
        <div className="mb-6 text-center">
          <p className="font-mono text-lg font-semibold text-white">
            Dev<span className="text-accent">Admin</span>
          </p>
          <p className="mt-1 text-sm text-mist-400">Sign in to manage your site</p>
        </div>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
