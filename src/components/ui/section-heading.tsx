"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  tone?: "orange" | "ink";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  tone = "ink",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className={cn(
            "inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em]",
            light ? "text-orange" : "text-orange-dark"
          )}
        >
          <span className="h-px w-8 bg-orange" />
          {eyebrow}
          {align === "center" && <span className="h-px w-8 bg-orange" />}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className={cn(
          "mt-3 text-pretty font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl",
          light
            ? tone === "orange"
              ? "text-orange"
              : "text-white"
            : tone === "orange"
              ? "text-orange-dark"
              : "text-ink"
        )}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            light ? "text-white/70" : "text-ink-muted"
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
