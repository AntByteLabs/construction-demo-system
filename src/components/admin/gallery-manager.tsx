"use client";
import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { InlineImageUpload } from "@/components/admin/inline-image-upload";

type Item = { label: string; url: string | null; caption: string | null };

export function GalleryManager({
  name = "galleryJson",
  defaultItems = [],
}: {
  name?: string;
  defaultItems?: Item[];
}) {
  const [items, setItems] = useState<Item[]>(() =>
    defaultItems.length > 0
      ? defaultItems
      : [{ label: "", url: null, caption: null }]
  );

  const jsonValue = useMemo(() => JSON.stringify(items), [items]);

  function update(i: number, patch: Partial<Item>) {
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  }

  function remove(i: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  function move(i: number, direction: -1 | 1) {
    setItems((prev) => {
      const next = [...prev];
      const newIdx = i + direction;
      if (newIdx < 0 || newIdx >= next.length) return prev;
      [next[i], next[newIdx]] = [next[newIdx], next[i]];
      return next;
    });
  }

  function add() {
    setItems((prev) => [...prev, { label: "", url: null, caption: null }]);
  }

  return (
    <div>
      <input type="hidden" name={name} value={jsonValue} />

      <div className="space-y-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-lg border border-steel bg-cream-soft/40 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-stone text-[11px] font-bold text-ink">
                {i + 1}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="rounded-md border border-steel bg-white px-2 py-1 text-[11px] font-semibold text-ink hover:border-orange disabled:opacity-40"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === items.length - 1}
                  className="rounded-md border border-steel bg-white px-2 py-1 text-[11px] font-semibold text-ink hover:border-orange disabled:opacity-40"
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-2 py-1 text-[11px] font-semibold text-red-700 hover:bg-red-100"
                >
                  <Trash2 className="h-3 w-3" />
                  Remove
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <InlineImageUpload
                url={item.url}
                onChange={(url) => update(i, { url })}
                aspectRatio="4/3"
                category="project"
              />
              <div className="space-y-2">
                <label className="block">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Label / alt text
                  </span>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => update(i, { label: e.target.value })}
                    placeholder="e.g. Lobby at completion"
                    className="mt-1 w-full rounded-md border border-steel bg-white px-3 py-2 text-sm outline-none focus:border-orange focus:ring-4 focus:ring-orange/20"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Caption (optional)
                  </span>
                  <input
                    type="text"
                    value={item.caption ?? ""}
                    onChange={(e) => update(i, { caption: e.target.value || null })}
                    placeholder="Shown under the image"
                    className="mt-1 w-full rounded-md border border-steel bg-white px-3 py-2 text-sm outline-none focus:border-orange focus:ring-4 focus:ring-orange/20"
                  />
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-steel bg-cream-soft px-4 py-3 text-sm font-semibold text-ink hover:border-orange hover:bg-orange-soft/40"
      >
        <Plus className="h-4 w-4" />
        Add another image
      </button>
    </div>
  );
}
