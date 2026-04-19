import { cn } from "@/lib/utils";

export function FormCard({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("rounded-2xl border border-steel/70 bg-white", className)}>
      <header className="border-b border-steel/70 px-6 py-5">
        <h3 className="text-base font-bold text-ink">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-ink-muted">{description}</p>
        )}
      </header>
      <div className="space-y-5 p-6">{children}</div>
    </section>
  );
}
