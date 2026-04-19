import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  size = "default",
}: {
  className?: string;
  children: React.ReactNode;
  size?: "sm" | "default" | "wide" | "full";
}) {
  const sizes = {
    sm: "max-w-4xl",
    default: "max-w-7xl",
    wide: "max-w-[1400px]",
    full: "max-w-[1600px]",
  };
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", sizes[size], className)}>
      {children}
    </div>
  );
}
