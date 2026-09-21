"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNav } from "@/data/adminNav";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-ink-border bg-ink lg:flex lg:flex-col">
      <div className="flex h-16 items-center border-b border-ink-border px-6">
        <Link href="/admin" className="font-mono text-lg font-semibold text-white">
          Dev<span className="text-accent">Admin</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {adminNav.map((item) => {
          const active =
            item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-accent/15 text-accent"
                  : "text-mist-300 hover:bg-ink-soft hover:text-white"
              )}
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-ink-border p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-mist-400 hover:text-white"
        >
          ← Back to site
        </Link>
      </div>
    </aside>
  );
}
