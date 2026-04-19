"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Counter } from "@/components/ui/counter";
import { cn } from "@/lib/utils";

type IconName = keyof typeof LucideIcons;

type Props = {
  title: string;
  value: number;
  iconName: IconName;
  href: string;
  trend?: string;
  accent?: "amber" | "azure" | "ink" | "emerald";
  index?: number;
};

const accents = {
  amber: "bg-amber text-ink",
  azure: "bg-azure text-white",
  ink: "bg-ink text-amber",
  emerald: "bg-emerald-500 text-white",
};

export function StatCard({
  title,
  value,
  iconName,
  href,
  trend,
  accent = "ink",
  index = 0,
}: Props) {
  const Icon =
    (LucideIcons[iconName] as typeof LucideIcons.Hammer | undefined) ??
    LucideIcons.Hammer;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Link
        href={href}
        className="group relative block overflow-hidden rounded-2xl border border-steel/70 bg-white p-6 transition hover:-translate-y-0.5 hover:border-amber/40 hover:shadow-float"
      >
        <div className="flex items-start justify-between gap-4">
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl transition group-hover:scale-105",
              accents[accent]
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <ArrowUpRight className="h-4 w-4 text-ink-muted opacity-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
        </div>
        <p className="mt-6 text-sm font-medium text-ink-muted">{title}</p>
        <p className="mt-1 font-display text-4xl font-bold text-ink">
          <Counter to={value} />
        </p>
        {trend && (
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </p>
        )}
      </Link>
    </motion.div>
  );
}
