import Image from "next/image";
import { Placeholder } from "@/components/ui/placeholder";
import { cn } from "@/lib/utils";

type Props = {
  url?: string | null;
  label: string;
  aspectRatio?: "square" | "video" | "4/3" | "3/4" | "portrait" | "21/9" | "fill" | string;
  variant?: "default" | "dark" | "cream" | "mesh" | "blueprint" | "orange" | "amber" | "azure";
  rounded?: boolean;
  className?: string;
};

const aspectMap: Record<string, string> = {
  square: "aspect-square",
  video: "aspect-video",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  portrait: "aspect-[4/5]",
  "21/9": "aspect-[21/9]",
};

export function SmartImage({
  url,
  label,
  aspectRatio = "video",
  variant = "default",
  rounded = true,
  className,
}: Props) {
  if (!url) {
    return (
      <Placeholder
        label={label}
        aspectRatio={aspectRatio === "fill" ? "video" : aspectRatio}
        variant={variant}
        rounded={rounded}
        className={className}
      />
    );
  }

  const aspect = aspectRatio === "fill" ? "h-full w-full" : aspectMap[aspectRatio] ?? aspectRatio;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-stone",
        aspect,
        rounded && "rounded-lg",
        className,
      )}
    >
      <Image
        src={url}
        alt={label}
        fill
        unoptimized
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}
