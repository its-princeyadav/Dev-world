"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminFetch } from "@/lib/adminApi";

const statCards = [
  { key: "newSubmissions", label: "New submissions", href: "/admin/submissions" },
  { key: "newApplications", label: "New applications", href: "/admin/applications" },
  { key: "projectCount", label: "Projects", href: "/admin/projects" },
  { key: "blogCount", label: "Blog posts", href: "/admin/blog" },
  { key: "serviceCount", label: "Services", href: "/admin/services" },
];

export default function DashboardOverview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    adminFetch("/dashboard").then(setData).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink-900">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-500">
        A quick overview of what needs your attention.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="rounded-[14px] border border-paper-border bg-white p-6 transition-colors hover:border-accent"
          >
            <p className="font-mono text-3xl font-semibold text-ink-900">
              {data?.stats?.[card.key] ?? "—"}
            </p>
            <p className="mt-1 text-sm text-ink-500">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-[14px] border border-paper-border bg-white p-6">
          <h2 className="text-base font-semibold text-ink-900">
            Recent contact submissions
          </h2>
          <ul className="mt-4 divide-y divide-paper-border">
            {(data?.recentSubmissions || []).map((s) => (
              <li key={s._id} className="py-3 text-sm">
                <p className="font-medium text-ink-900">{s.name}</p>
                <p className="text-ink-500">{s.email}</p>
              </li>
            ))}
            {data && data.recentSubmissions.length === 0 && (
              <li className="py-3 text-sm text-ink-500">No submissions yet.</li>
            )}
          </ul>
        </div>

        <div className="rounded-[14px] border border-paper-border bg-white p-6">
          <h2 className="text-base font-semibold text-ink-900">
            Recent career applications
          </h2>
          <ul className="mt-4 divide-y divide-paper-border">
            {(data?.recentApplications || []).map((a) => (
              <li key={a._id} className="py-3 text-sm">
                <p className="font-medium text-ink-900">{a.name}</p>
                <p className="text-ink-500">{a.role}</p>
              </li>
            ))}
            {data && data.recentApplications.length === 0 && (
              <li className="py-3 text-sm text-ink-500">No applications yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
