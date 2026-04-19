import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

type PlaceholderProps = {
  label: string;
  aspectRatio?: "square" | "video" | "4/3" | "3/4" | "3/2" | "2/3" | "21/9" | "portrait" | string;
  variant?: "default" | "dark" | "cream" | "mesh" | "blueprint" | "azure" | "amber" | "orange";
  className?: string;
  rounded?: boolean;
  showIcon?: boolean;
};

const aspectMap: Record<string, string> = {
  square: "aspect-square",
  video: "aspect-video",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "3/2": "aspect-[3/2]",
  "2/3": "aspect-[2/3]",
  "21/9": "aspect-[21/9]",
  portrait: "aspect-[4/5]",
  fill: "h-full w-full",
};

export function Placeholder({
  label,
  aspectRatio = "video",
  variant = "default",
  className,
  rounded = true,
  showIcon = true,
}: PlaceholderProps) {
  const aspect = aspectMap[aspectRatio] ?? aspectRatio;

  const variantStyles = {
    default:
      "bg-gradient-to-br from-[#2a2620] to-[#171512] text-white/80",
    dark: "bg-ink text-white/80",
    orange: "bg-gradient-to-br from-orange to-orange-dark text-white",
    amber: "bg-gradient-to-br from-orange to-orange-dark text-white",
    cream: "bg-gradient-to-br from-cream-deep to-stone text-ink/70",
    mesh: "bg-gradient-to-br from-cream-deep to-steel/60 text-ink/70",
    blueprint: "bg-gradient-to-br from-[#2a2620] to-[#171512] text-white/80",
    azure: "bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-white/90",
  }[variant];

  const isLight = variant === "cream" || variant === "mesh";

  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        aspect,
        rounded && "rounded-lg",
        variantStyles,
        className,
      )}
      aria-label={label}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: isLight
            ? "linear-gradient(to right, rgba(23,21,18,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(23,21,18,0.07) 1px, transparent 1px)"
            : "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-6 text-center">
        {showIcon && (
          <ImageIcon className={cn("h-5 w-5 opacity-30")} />
        )}
        <p className="max-w-[80%] text-xs font-medium leading-snug opacity-70">
          {label}
        </p>
      </div>
    </div>
  );
}
