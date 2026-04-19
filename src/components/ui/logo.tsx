import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  light?: boolean;
  compact?: boolean;
  className?: string;
  logoUrl?: string | null;
  companyName?: string;
};

export async function Logo(props: LogoProps) {
  let logoUrl = props.logoUrl;
  let companyName = props.companyName;

  if (logoUrl === undefined || companyName === undefined) {
    const settings = await prisma.settings.findUnique({
      where: { id: "singleton" },
    });
    if (logoUrl === undefined) logoUrl = settings?.logoUrl ?? null;
    if (companyName === undefined)
      companyName = settings?.companyName ?? "Antbytelabs";
  }

  return (
    <LogoView
      href={props.href}
      light={props.light}
      compact={props.compact}
      className={props.className}
      logoUrl={logoUrl}
      companyName={companyName ?? "Antbytelabs"}
    />
  );
}

function LogoView({
  href = "/",
  light = false,
  compact = false,
  className,
  logoUrl,
  companyName,
}: {
  href?: string;
  light?: boolean;
  compact?: boolean;
  className?: string;
  logoUrl?: string | null;
  companyName: string;
}) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        className={cn(
          "relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md transition-transform group-hover:scale-105",
          logoUrl ? "bg-transparent" : light ? "bg-white text-ink" : "bg-ink text-orange"
        )}
      >
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={companyName}
            fill
            unoptimized
            className="object-contain"
          />
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 21 L12 5 L21 21" />
            <path d="M7 21 L12 12 L17 21" />
            <path d="M9.5 18 H14.5" />
          </svg>
        )}
      </span>
      {!compact && (
        <span className="flex flex-col leading-tight">
          <span
            className={cn(
              "font-display text-[17px] font-bold tracking-tight",
              light ? "text-white" : "text-ink"
            )}
          >
            {companyName.split(" ")[0] ?? "Antbytelabs"}
          </span>
          <span
            className={cn(
              "text-[10px] font-semibold uppercase tracking-[0.24em]",
              light ? "text-orange" : "text-ink-muted"
            )}
          >
            {companyName.split(" ").slice(1).join(" ") || "Construction"}
          </span>
        </span>
      )}
    </Link>
  );
}

// Synchronous variant for client components that already have data
export function LogoStatic(
  props: Omit<LogoProps, "logoUrl" | "companyName"> & {
    logoUrl?: string | null;
    companyName?: string;
  }
) {
  return (
    <LogoView
      href={props.href}
      light={props.light}
      compact={props.compact}
      className={props.className}
      logoUrl={props.logoUrl ?? null}
      companyName={props.companyName ?? "Antbytelabs Construction"}
    />
  );
}
