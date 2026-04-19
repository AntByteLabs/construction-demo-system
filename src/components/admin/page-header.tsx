import Link from "next/link";
import { LucideIcon, Plus } from "lucide-react";

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: { label: string; href: string; icon?: LucideIcon };
}) {
  const Icon = action?.icon ?? Plus;
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-sm text-ink-muted">{description}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center gap-2 self-start rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber hover:text-ink"
        >
          <Icon className="h-4 w-4" />
          {action.label}
        </Link>
      )}
    </div>
  );
}
