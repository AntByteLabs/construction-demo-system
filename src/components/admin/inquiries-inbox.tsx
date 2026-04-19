"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Mail,
  CheckCheck,
  Download,
  Trash2,
  Circle,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { ContactInquiry } from "@prisma/client";
import {
  markRead,
  markAllRead,
  deleteInquiry,
} from "@/app/admin/(console)/inquiries/actions";

export function InquiriesInbox({ rows }: { rows: ContactInquiry[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [selectedId, setSelectedId] = useState<string | null>(rows[0]?.id ?? null);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const q = query.toLowerCase();
      const matchQ =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.subject.toLowerCase().includes(q) ||
        r.message.toLowerCase().includes(q);
      const matchF =
        filter === "all" ||
        (filter === "unread" && !r.isRead) ||
        (filter === "read" && r.isRead);
      return matchQ && matchF;
    });
  }, [rows, query, filter]);

  const selected = rows.find((r) => r.id === selectedId) ?? filtered[0];

  function exportCSV() {
    const header = ["Name", "Email", "Phone", "Subject", "Message", "Date", "Read"];
    const lines = rows.map((r) =>
      [r.name, r.email, r.phone ?? "", r.subject, r.message.replace(/\n/g, " "), r.createdAt.toISOString(), r.isRead ? "yes" : "no"]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [header.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const unreadCount = rows.filter((r) => !r.isRead).length;

  return (
    <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
      <aside className="rounded-2xl border border-steel/70 bg-white lg:col-span-5 xl:col-span-4">
        <div className="border-b border-steel/70 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-ink">
              Inbox {unreadCount > 0 && <span className="ml-1 text-amber">({unreadCount})</span>}
            </h3>
            <div className="flex items-center gap-1">
              <button
                onClick={exportCSV}
                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-ink-muted hover:bg-stone hover:text-ink"
                title="Export CSV"
              >
                <Download className="h-3.5 w-3.5" />
                CSV
              </button>
              <button
                onClick={() => markAllRead()}
                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-ink-muted hover:bg-stone hover:text-ink"
                title="Mark all as read"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                All read
              </button>
            </div>
          </div>
          <div className="relative mt-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search inquiries"
              className="w-full rounded-full border border-steel bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-amber focus:ring-4 focus:ring-amber/20"
            />
          </div>
          <div className="mt-3 flex gap-1">
            {(["all", "unread", "read"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setFilter(v)}
                className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-semibold capitalize transition ${
                  filter === v ? "bg-ink text-white" : "bg-stone text-ink hover:bg-steel/80"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <ul className="max-h-[640px] overflow-y-auto divide-y divide-steel/80 scrollbar-thin">
          {filtered.length === 0 && (
            <li className="p-10 text-center text-sm text-ink-muted">No inquiries.</li>
          )}
          {filtered.map((inq) => (
            <li key={inq.id}>
              <button
                onClick={() => {
                  setSelectedId(inq.id);
                  if (!inq.isRead) markRead(inq.id, true);
                }}
                className={`group flex w-full items-start gap-3 p-4 text-left transition ${
                  selected?.id === inq.id ? "bg-amber/10" : "hover:bg-mist"
                }`}
              >
                <span className="mt-1 flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                  <span
                    className={`h-2 w-2 rounded-full ${inq.isRead ? "bg-steel" : "bg-amber"}`}
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`truncate text-sm ${inq.isRead ? "font-medium text-ink" : "font-bold text-ink"}`}>
                      {inq.name}
                    </p>
                    <span className="shrink-0 text-xs text-ink-muted">
                      {formatDate(inq.createdAt, { month: "short", day: "numeric" })}
                    </span>
                  </div>
                  <p className={`mt-0.5 truncate text-sm ${inq.isRead ? "text-ink-muted" : "text-ink"}`}>
                    {inq.subject}
                  </p>
                  <p className="mt-1 line-clamp-1 text-xs text-ink-muted">{inq.message}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="rounded-2xl border border-steel/70 bg-white lg:col-span-7 xl:col-span-8">
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <header className="flex flex-wrap items-start justify-between gap-4 border-b border-steel/70 p-6">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-amber font-display text-base font-bold">
                      {selected.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                    <div>
                      <p className="text-base font-bold text-ink">{selected.name}</p>
                      <a href={`mailto:${selected.email}`} className="text-sm text-amber-dark hover:underline">
                        {selected.email}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => markRead(selected.id, !selected.isRead)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-steel bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:border-amber"
                  >
                    {selected.isRead ? (
                      <>
                        <Circle className="h-3.5 w-3.5" /> Mark unread
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" /> Mark read
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Delete this inquiry?")) deleteInquiry(selected.id);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </header>

              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Subject
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold text-ink">
                  {selected.subject}
                </h2>

                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-amber" />
                    {selected.email}
                  </span>
                  {selected.phone && (
                    <span className="inline-flex items-center gap-1.5">
                      <Phone className="h-4 w-4 text-amber" />
                      {selected.phone}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4 text-amber" />
                    {formatDate(selected.createdAt, {
                      weekday: "short",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="mt-6 rounded-2xl bg-mist/60 p-6 text-ink">
                  <p className="whitespace-pre-wrap leading-relaxed text-pretty">
                    {selected.message}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${selected.email}?subject=RE: ${encodeURIComponent(selected.subject)}`}
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber hover:text-ink"
                  >
                    Reply via email <ArrowUpRight className="h-4 w-4" />
                  </a>
                  {selected.phone && (
                    <a
                      href={`tel:${selected.phone}`}
                      className="inline-flex items-center gap-2 rounded-full border border-steel bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:border-amber"
                    >
                      <Phone className="h-4 w-4" />
                      Call
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex h-[500px] items-center justify-center text-center">
              <div>
                <Mail className="mx-auto h-12 w-12 text-steel" />
                <p className="mt-4 text-sm font-semibold text-ink">Select an inquiry to view</p>
                <p className="mt-1 text-xs text-ink-muted">Or search to narrow the list</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
