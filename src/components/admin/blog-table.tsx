"use client";
import Link from "next/link";
import { Pencil, Star } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import type { BlogPost, BlogCategory } from "@prisma/client";
import { deletePost } from "@/app/admin/(console)/blog/actions";
import { formatDate } from "@/lib/utils";

type PostRow = BlogPost & { category: BlogCategory | null };

export function BlogTable({ rows }: { rows: PostRow[] }) {
  return (
    <DataTable<PostRow>
      rows={rows}
      rowKey={(r) => r.id}
      searchKeys={["title", "slug", "author", "excerpt"]}
      columns={[
        {
          key: "title",
          header: "Post",
          render: (row) => (
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-ink">{row.title}</p>
                {row.isFeatured && <Star className="h-3.5 w-3.5 fill-amber text-amber" />}
              </div>
              <p className="mt-0.5 text-xs text-ink-muted">By {row.author}</p>
            </div>
          ),
        },
        {
          key: "category",
          header: "Category",
          render: (row) =>
            row.category ? (
              <span className="rounded-full bg-stone px-2.5 py-0.5 text-xs font-semibold text-ink">
                {row.category.name}
              </span>
            ) : (
              <span className="text-xs text-ink-muted">—</span>
            ),
        },
        {
          key: "status",
          header: "Status",
          render: (row) => (
            <StatusBadge variant={row.status === "published" ? "published" : "draft"}>
              {row.status}
            </StatusBadge>
          ),
        },
        {
          key: "publishedAt",
          header: "Date",
          render: (row) => (
            <span className="text-sm text-ink-muted">
              {row.publishedAt ? formatDate(row.publishedAt) : "—"}
            </span>
          ),
        },
        {
          key: "actions",
          header: "",
          align: "right",
          render: (row) => (
            <div className="flex items-center justify-end gap-2">
              <Link
                href={`/admin/blog/${row.id}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-steel text-ink-muted hover:border-amber hover:text-ink"
                aria-label="Edit"
              >
                <Pencil className="h-4 w-4" />
              </Link>
              <DeleteButton compact onDelete={() => deletePost(row.id)} />
            </div>
          ),
        },
      ]}
    />
  );
}
