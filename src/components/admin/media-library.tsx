"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Trash2, Upload, X, Check, Loader2, ImageOff } from "lucide-react";
import type { Media } from "@prisma/client";
import { deleteMedia } from "@/app/admin/(console)/media/actions";
import { useRouter } from "next/navigation";

const categoryList = [
  "all",
  "hero",
  "team",
  "project",
  "service",
  "blog",
  "branding",
  "general",
];

export function MediaLibrary({ rows }: { rows: Media[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [uploadCategory, setUploadCategory] = useState("general");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = filter === "all" ? rows : rows.filter((r) => r.category === filter);

  async function onFiles(files: FileList) {
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("category", uploadCategory);
        fd.append("label", file.name);
        await fetch("/api/admin/upload", { method: "POST", body: fd });
      }
      router.refresh();
    } finally {
      setUploading(false);
    }
  }

  async function copy(url: string) {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categoryList.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`relative rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition ${
                filter === c ? "bg-ink text-white" : "bg-stone text-ink hover:bg-steel/80"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <select
            value={uploadCategory}
            onChange={(e) => setUploadCategory(e.target.value)}
            className="rounded-md border border-steel bg-white px-3 py-2 text-xs font-semibold outline-none focus:border-orange focus:ring-4 focus:ring-orange/20"
          >
            {categoryList.filter((c) => c !== "all").map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink-soft disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Upload
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) onFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.length === 0 && (
          <div className="col-span-full rounded-lg border border-dashed border-steel bg-cream-soft py-16 text-center">
            <ImageOff className="mx-auto h-8 w-8 text-ink-muted opacity-40" />
            <p className="mt-3 text-sm font-semibold text-ink">No media in this category</p>
            <button
              onClick={() => inputRef.current?.click()}
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-orange-dark"
            >
              <Upload className="h-4 w-4" />
              Upload your first image
            </button>
          </div>
        )}
        {filtered.map((m) => (
          <motion.div
            key={m.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="group relative overflow-hidden rounded-lg border border-steel bg-white"
          >
            <div className="relative aspect-video overflow-hidden bg-stone">
              {m.url ? (
                <Image
                  src={m.url}
                  alt={m.label}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-ink-muted">
                  <ImageOff className="h-6 w-6 opacity-40" />
                </div>
              )}
              <div className="absolute inset-0 flex items-start justify-end gap-1.5 p-2 opacity-0 transition group-hover:opacity-100">
                {m.url && (
                  <button
                    onClick={() => copy(m.url!)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/95 text-ink backdrop-blur hover:bg-orange hover:text-white"
                    aria-label="Copy URL"
                  >
                    {copied === m.url ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                )}
                <button
                  onClick={() => {
                    if (confirm("Delete this asset? This cannot be undone.")) {
                      deleteMedia(m.id);
                    }
                  }}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/95 text-red-600 backdrop-blur hover:bg-red-50"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="truncate text-sm font-semibold text-ink" title={m.label}>
                {m.label}
              </p>
              <p className="mt-0.5 text-[11px] uppercase tracking-wider text-ink-muted">
                {m.category}
                {m.sizeBytes > 0 && ` · ${(m.sizeBytes / 1024).toFixed(0)} KB`}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
