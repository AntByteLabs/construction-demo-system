"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2, X, AlertTriangle } from "lucide-react";

export function DeleteButton({
  onDelete,
  label = "Are you sure?",
  description = "This action cannot be undone.",
  compact = false,
}: {
  onDelete: () => Promise<void> | void;
  label?: string;
  description?: string;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function confirm() {
    setBusy(true);
    try {
      await onDelete();
      setOpen(false);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          compact
            ? "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-steel text-ink-muted transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            : "inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
        }
        aria-label="Delete"
      >
        <Trash2 className="h-4 w-4" />
        {!compact && "Delete"}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
              onClick={() => !busy && setOpen(false)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
              >
                <button
                  onClick={() => !busy && setOpen(false)}
                  className="absolute right-3 top-3 rounded-lg p-1.5 text-ink-muted hover:bg-stone"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{label}</h3>
                <p className="mt-2 text-sm text-ink-muted">{description}</p>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    disabled={busy}
                    className="rounded-full border border-steel bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-stone"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={confirm}
                    disabled={busy}
                    className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                  >
                    {busy ? "Deleting..." : "Yes, delete"}
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
