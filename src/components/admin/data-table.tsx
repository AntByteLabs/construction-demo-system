"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

type Column<T> = {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  accessor?: (row: T) => unknown;
  width?: string;
  align?: "left" | "right" | "center";
};

type Props<T> = {
  columns: Column<T>[];
  rows: T[];
  searchKeys?: string[];
  rowKey: (row: T) => string;
  editHref?: (row: T) => string;
  onDelete?: (row: T) => Promise<void>;
  pageSize?: number;
  empty?: React.ReactNode;
};

export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  searchKeys,
  rowKey,
  editHref,
  pageSize = 10,
  empty,
}: Props<T>) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!query) return rows;
    const q = query.toLowerCase();
    return rows.filter((row) => {
      if (!searchKeys) return true;
      return searchKeys.some((k) => {
        const v = (row as Record<string, unknown>)[k];
        return v !== null && v !== undefined && String(v).toLowerCase().includes(q);
      });
    });
  }, [query, rows, searchKeys]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="overflow-hidden rounded-2xl border border-steel/70 bg-white">
      {searchKeys && (
        <div className="flex items-center justify-between gap-3 border-b border-steel/70 bg-white px-5 py-4">
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search"
              className="w-full rounded-full border border-steel bg-white py-2 pl-10 pr-4 text-sm outline-none transition focus:border-amber focus:ring-4 focus:ring-amber/20"
            />
          </div>
          <p className="text-xs text-ink-muted">
            {filtered.length} {filtered.length === 1 ? "record" : "records"}
          </p>
        </div>
      )}

      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-mist/70 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={`px-5 py-3 whitespace-nowrap ${c.align === "right" ? "text-right" : c.align === "center" ? "text-center" : ""}`}
                  style={c.width ? { width: c.width } : undefined}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-steel/80">
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-14 text-center text-ink-muted">
                  {empty ?? "No records to display."}
                </td>
              </tr>
            ) : (
              pageRows.map((row) => {
                const key = rowKey(row);
                const href = editHref?.(row);
                return (
                  <tr key={key} className="group transition hover:bg-mist/50">
                    {columns.map((c) => {
                      const content = c.render
                        ? c.render(row)
                        : (c.accessor
                            ? String(c.accessor(row) ?? "")
                            : String((row as Record<string, unknown>)[c.key] ?? ""));
                      const cellClass = `px-5 py-3.5 align-middle ${c.align === "right" ? "text-right" : c.align === "center" ? "text-center" : ""}`;
                      if (href && c.key !== "actions") {
                        return (
                          <td key={c.key} className={cellClass}>
                            <Link href={href} className="block">
                              {content}
                            </Link>
                          </td>
                        );
                      }
                      return (
                        <td key={c.key} className={cellClass}>
                          {content}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-steel/70 bg-white px-5 py-3.5">
          <p className="text-xs text-ink-muted">
            Page <span className="font-semibold text-ink">{currentPage}</span> of {totalPages}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-steel bg-white text-ink transition hover:border-amber disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold transition ${
                  currentPage === i + 1
                    ? "bg-ink text-white"
                    : "bg-white text-ink hover:bg-stone"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-steel bg-white text-ink transition hover:border-amber disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
