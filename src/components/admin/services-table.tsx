"use client";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import type { Service } from "@prisma/client";
import { deleteService } from "@/app/admin/(console)/services/actions";
import { Pencil } from "lucide-react";

type IconName = keyof typeof LucideIcons;

export function ServicesTable({ rows }: { rows: Service[] }) {
  return (
    <DataTable<Service>
      rows={rows}
      rowKey={(r) => r.id}
      searchKeys={["title", "slug", "shortDesc"]}
      columns={[
        {
          key: "title",
          header: "Service",
          render: (row) => {
            const Icon =
              (LucideIcons[row.icon as IconName] as
                | typeof LucideIcons.Home
                | undefined) ?? LucideIcons.Building2;
            return (
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-amber">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{row.title}</p>
                  <p className="text-xs text-ink-muted">/{row.slug}</p>
                </div>
              </div>
            );
          },
        },
        {
          key: "shortDesc",
          header: "Short description",
          render: (row) => (
            <p className="max-w-sm truncate text-sm text-ink-muted">
              {row.shortDesc}
            </p>
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
                href={`/admin/services/${row.id}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-steel text-ink-muted transition hover:border-amber hover:text-ink"
                aria-label="Edit"
              >
                <Pencil className="h-4 w-4" />
              </Link>
              <DeleteButton compact onDelete={() => deleteService(row.id)} />
            </div>
          ),
        },
      ]}
    />
  );
}
