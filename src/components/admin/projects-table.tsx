"use client";
import Link from "next/link";
import { Pencil, MapPin } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import type { Project } from "@prisma/client";
import { deleteProject } from "@/app/admin/(console)/projects/actions";
import { formatDate } from "@/lib/utils";

export function ProjectsTable({ rows }: { rows: Project[] }) {
  return (
    <DataTable<Project>
      rows={rows}
      rowKey={(r) => r.id}
      searchKeys={["title", "slug", "category", "location", "client"]}
      columns={[
        {
          key: "title",
          header: "Project",
          render: (row) => (
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-ink">{row.title}</p>
                {row.isFeatured && (
                  <StatusBadge variant="featured">Featured</StatusBadge>
                )}
              </div>
              <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-ink-muted">
                <MapPin className="h-3 w-3" />
                {row.location}
              </p>
            </div>
          ),
        },
        {
          key: "category",
          header: "Category",
          render: (row) => (
            <span className="rounded-full bg-stone px-2.5 py-0.5 text-xs font-semibold text-ink">
              {row.category}
            </span>
          ),
        },
        {
          key: "client",
          header: "Client",
          render: (row) => (
            <span className="text-sm text-ink-muted">{row.client}</span>
          ),
        },
        {
          key: "completionDate",
          header: "Completed",
          render: (row) => (
            <span className="text-sm text-ink-muted">
              {formatDate(row.completionDate, { month: "short", year: "numeric" })}
            </span>
          ),
        },
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
                href={`/admin/projects/${row.id}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-steel text-ink-muted hover:border-amber hover:text-ink"
                aria-label="Edit"
              >
                <Pencil className="h-4 w-4" />
              </Link>
              <DeleteButton compact onDelete={() => deleteProject(row.id)} />
            </div>
          ),
        },
      ]}
    />
  );
}
