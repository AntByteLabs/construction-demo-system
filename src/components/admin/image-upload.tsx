"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2, ImageIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  defaultValue?: string | null;
  labelName?: string;
  defaultLabel?: string | null;
  aspectRatio?: "video" | "square" | "4/3" | "3/4" | "portrait" | "21/9";
  category?: string;
  hint?: string;
};

const aspectClass: Record<string, string> = {
  video: "aspect-video",
  square: "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  portrait: "aspect-[4/5]",
  "21/9": "aspect-[21/9]",
};

export function ImageUpload({
  name,
  defaultValue = "",
  labelName,
  defaultLabel = "",
  aspectRatio = "video",
  category = "general",
  hint,
}: Props) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [label, setLabel] = useState(defaultLabel ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUrl(defaultValue ?? "");
  }, [defaultValue]);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      if (label) fd.append("label", label);
      fd.append("category", category);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Upload failed");
      setUrl(data.url);
      if (!label) setLabel(file.name);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={url} />
      {labelName && <input type="hidden" name={labelName} value={label} />}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        className={cn(
          "relative rounded-lg border-2 border-dashed bg-cream-soft transition",
          drag ? "border-orange bg-orange-soft" : "border-steel"
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-md m-2 bg-stone",
            aspectClass[aspectRatio] ?? "aspect-video"
          )}
        >
          {url ? (
            <Image
              src={url}
              alt={label || "Uploaded"}
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-ink-muted">
                <ImageIcon className="mx-auto h-8 w-8 opacity-40" />
                <p className="mt-2 text-xs">
                  {drag ? "Drop image here" : "No image yet"}
                </p>
              </div>
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
              <Loader2 className="h-6 w-6 animate-spin text-ink" />
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 px-3 pb-3">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 text-xs font-semibold text-white transition hover:bg-ink-soft disabled:opacity-60"
          >
            <Upload className="h-3.5 w-3.5" />
            {url ? "Replace image" : "Upload image"}
          </button>
          {url && (
            <>
              <button
                type="button"
                onClick={() => setUrl("")}
                className="inline-flex items-center gap-1.5 rounded-md border border-steel bg-white px-3 py-2 text-xs font-semibold text-ink-muted hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-3.5 w-3.5" />
                Remove
              </button>
              <span className="inline-flex items-center gap-1 text-xs text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Uploaded
              </span>
            </>
          )}
          <span className="ml-auto text-[10px] uppercase tracking-wider text-ink-muted">
            or drag & drop
          </span>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>

      {labelName && (
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Image description / alt text"
          className="mt-3 w-full rounded-md border border-steel bg-white px-3 py-2 text-sm outline-none focus:border-orange focus:ring-4 focus:ring-orange/20"
        />
      )}

      {error && (
        <p className="mt-2 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="mt-2 text-xs text-ink-muted">{hint}</p>
      )}
    </div>
  );
}
