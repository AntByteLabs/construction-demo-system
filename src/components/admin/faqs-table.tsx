"use client";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import type { Faq } from "@prisma/client";
import { deleteFaq } from "@/app/admin/(console)/faqs/actions";

export function FaqsTable({ rows }: { rows: Faq[] }) {
  return (
    <DataTable<Faq>
      rows={rows}
      rowKey={(r) => r.id}
      searchKeys={["question", "answer"]}
      columns={[
        {
          key: "question",
          header: "Question",
          render: (row) => (
            <p className="text-sm font-semibold text-ink">{row.question}</p>
          ),
        },
        {
          key: "answer",
          header: "Answer",
          render: (row) => (
            <p className="line-clamp-2 max-w-md text-sm text-ink-muted">
              {row.answer}
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
                href={`/admin/faqs/${row.id}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-steel text-ink-muted hover:border-orange hover:text-ink"
                aria-label="Edit"
              >
                <Pencil className="h-4 w-4" />
              </Link>
              <DeleteButton compact onDelete={() => deleteFaq(row.id)} />
            </div>
          ),
        },
      ]}
    />
  );
}
