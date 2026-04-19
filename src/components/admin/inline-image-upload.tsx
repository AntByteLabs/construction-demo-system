"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";

type Props = {
  url: string | null;
  onChange: (url: string | null) => void;
  aspectRatio?: "video" | "4/3" | "square" | "portrait";
  category?: string;
};

const aspectClass: Record<string, string> = {
  video: "aspect-video",
  "4/3": "aspect-[4/3]",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
};

export function InlineImageUpload({
  url,
  onChange,
  aspectRatio = "4/3",
  category = "general",
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("category", category);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Upload failed");
      onChange(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div
        className={`relative overflow-hidden rounded-md border border-steel bg-stone ${aspectClass[aspectRatio]}`}
      >
        {url ? (
          <Image src={url} alt="" fill unoptimized className="object-cover" />
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center text-ink-muted hover:bg-cream-soft"
          >
            <div className="text-center">
              <ImageIcon className="mx-auto h-7 w-7 opacity-40" />
              <p className="mt-1.5 text-xs">Click to upload</p>
            </div>
          </button>
        )}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <Loader2 className="h-5 w-5 animate-spin text-ink" />
          </div>
        )}
      </div>

      {url ? (
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink-soft"
          >
            <Upload className="h-3 w-3" />
            Replace
          </button>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="inline-flex items-center gap-1.5 rounded-md border border-steel bg-white px-3 py-1.5 text-xs font-semibold text-ink-muted hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <X className="h-3 w-3" />
            Remove
          </button>
        </div>
      ) : null}

      {error && (
        <p className="mt-2 rounded-md bg-red-50 px-2 py-1 text-xs text-red-700">
          {error}
        </p>
      )}

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
  );
}
