"use client";
import { useState } from "react";
import { ImagePlus, Upload } from "lucide-react";
import { Placeholder } from "@/components/ui/placeholder";

export function PlaceholderUpload({
  name,
  defaultValue,
  aspectRatio = "video",
  label = "Image placeholder",
}: {
  name: string;
  defaultValue?: string;
  aspectRatio?: string;
  label?: string;
}) {
  const [value, setValue] = useState(defaultValue ?? "");

  return (
    <div>
      <div className="rounded-2xl border border-dashed border-steel bg-mist/40 p-4">
        <Placeholder
          label={value || "No image selected"}
          aspectRatio={aspectRatio}
          variant="mesh"
        />
        <div className="mt-4 grid gap-3">
          <label className="flex items-center gap-3 rounded-xl border border-steel bg-white px-4 py-2.5">
            <ImagePlus className="h-4 w-4 text-ink-muted" />
            <input
              type="text"
              name={name}
              placeholder={label}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full border-0 bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
            />
          </label>
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-steel bg-white px-4 py-2.5 text-sm font-medium text-ink-muted"
          >
            <Upload className="h-4 w-4" />
            Upload file (demo — placeholder text is used)
          </button>
        </div>
      </div>
    </div>
  );
}
