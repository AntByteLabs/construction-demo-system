"use client";
import Link from "next/link";
import { Pencil, Star } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import type { Testimonial } from "@prisma/client";
import { deleteTestimonial } from "@/app/admin/(console)/testimonials/actions";

export function TestimonialsTable({ rows }: { rows: Testimonial[] }) {
  return (
    <DataTable<Testimonial>
      rows={rows}
      rowKey={(r) => r.id}
      searchKeys={["name", "role", "quote"]}
      columns={[
        {
          key: "name",
          header: "Author",
          render: (row) => (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone text-xs font-bold text-ink">
                {row.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-ink">{row.name}</p>
                  {row.isFeatured && (
                    <Star className="h-3.5 w-3.5 fill-orange text-orange" />
                  )}
                </div>
                <p className="text-xs text-ink-muted">{row.role}</p>
              </div>
            </div>
          ),
        },
        {
          key: "quote",
          header: "Quote",
          render: (row) => (
            <p className="line-clamp-2 max-w-md text-sm text-ink-muted">
              {row.quote}
            </p>
          ),
        },
        {
          key: "rating",
          header: "Rating",
          align: "center",
          render: (row) => (
            <div className="flex justify-center gap-0.5 text-orange">
              {Array.from({ length: row.rating }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
            </div>
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
                href={`/admin/testimonials/${row.id}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-steel text-ink-muted hover:border-orange hover:text-ink"
                aria-label="Edit"
              >
                <Pencil className="h-4 w-4" />
              </Link>
              <DeleteButton compact onDelete={() => deleteTestimonial(row.id)} />
            </div>
          ),
        },
      ]}
    />
  );
}
