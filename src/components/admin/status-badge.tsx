import { cn } from "@/lib/utils";

type Variant = "active" | "inactive" | "featured" | "published" | "draft" | "read" | "unread";

const variants: Record<Variant, string> = {
  active: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  inactive: "bg-stone text-ink-muted ring-steel",
  featured: "bg-amber/15 text-amber-dark ring-amber/25",
  published: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  draft: "bg-amber/15 text-amber-dark ring-amber/25",
  read: "bg-stone text-ink-muted ring-steel",
  unread: "bg-azure/15 text-azure-dark ring-azure/25",
};

export function StatusBadge({
  variant,
  children,
}: {
  variant: Variant;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] ring-1 ring-inset",
        variants[variant]
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
