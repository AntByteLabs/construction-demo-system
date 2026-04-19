import { cn } from "@/lib/utils";

export function FormField({
  label,
  hint,
  required,
  className,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
        {label} {required && <span className="text-amber">*</span>}
      </span>
      <div className="mt-2">{children}</div>
      {hint && <p className="mt-1.5 text-xs text-ink-muted">{hint}</p>}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-steel bg-white px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-muted focus:border-amber focus:ring-4 focus:ring-amber/20";

export function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return <input {...props} className={cn(inputClass, props.className)} />;
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      rows={4}
      {...props}
      className={cn(inputClass, "resize-y", props.className)}
    />
  );
}

export function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement>
) {
  return (
    <select
      {...props}
      className={cn(inputClass, "appearance-none pr-10", props.className)}
    />
  );
}

export function Toggle({
  name,
  defaultChecked,
  label,
}: {
  name: string;
  defaultChecked?: boolean;
  label: string;
}) {
  return (
    <label className="flex items-center justify-between rounded-xl border border-steel bg-white px-4 py-3">
      <span className="text-sm font-medium text-ink">{label}</span>
      <span className="relative inline-flex">
        <input
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          className="peer sr-only"
        />
        <span className="h-6 w-11 rounded-full bg-steel transition peer-checked:bg-amber" />
        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:left-[1.375rem]" />
      </span>
    </label>
  );
}
