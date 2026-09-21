"use client";

import { useRouter } from "next/navigation";
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";

export default function AdminTopbar({ title }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-paper-border bg-white px-6">
      <h1 className="text-sm font-medium text-ink-500">{title}</h1>
      <button
        type="button"
        onClick={handleLogout}
        className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-ink-600 hover:bg-paper-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <HiArrowRightStartOnRectangle className="size-4" />
        Log out
      </button>
    </header>
  );
}
