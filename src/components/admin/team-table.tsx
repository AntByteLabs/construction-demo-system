"use client";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import type { TeamMember } from "@prisma/client";
import { deleteMember } from "@/app/admin/(console)/team/actions";

export function TeamTable({ rows }: { rows: TeamMember[] }) {
  return (
    <DataTable<TeamMember>
      rows={rows}
      rowKey={(r) => r.id}
      searchKeys={["name", "role", "bio"]}
      columns={[
        {
          key: "name",
          header: "Name",
          render: (row) => (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-amber font-display text-sm font-bold">
                {row.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">{row.name}</p>
                <p className="text-xs text-ink-muted">{row.role}</p>
              </div>
            </div>
          ),
        },
        {
          key: "email",
          header: "Email",
          render: (row) => (
            <span className="text-sm text-ink-muted">{row.email ?? "—"}</span>
          ),
        },
        { key: "sortOrder", header: "Order", align: "center" },
        {
          key: "status",
          header: "Status",
          render: (row) => (
            <StatusBadge variant={row.isActive ? "active" : "inactive"}>
              {row.isActive ? "Active" : "Inactive"}
            </StatusBadge>
          ),
        },
        {
          key: "actions",
          header: "",
          align: "right",
          render: (row) => (
            <div className="flex items-center justify-end gap-2">
              <Link
                href={`/admin/team/${row.id}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-steel text-ink-muted hover:border-amber hover:text-ink"
                aria-label="Edit"
              >
                <Pencil className="h-4 w-4" />
              </Link>
              <DeleteButton compact onDelete={() => deleteMember(row.id)} />
            </div>
          ),
        },
      ]}
    />
  );
}
