"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  children,
  className,
  variant = "cream",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  className?: string;
  variant?: "cream" | "dark";
}) {
  const dark = variant === "dark";
  return (
    <section
      className={cn(
        "relative border-b pb-16 pt-14 lg:pb-20 lg:pt-20",
        dark
          ? "bg-ink text-white border-ink"
          : "bg-cream-soft text-ink border-ink/10",
        className
      )}
    >
      <Container className="relative">
        {crumbs && (
          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
              "mb-6 flex items-center gap-1.5 text-xs",
              dark ? "text-white/60" : "text-ink-muted"
            )}
          >
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {c.href ? (
                  <Link
                    href={c.href}
                    className={cn(
                      "transition",
                      dark ? "hover:text-orange" : "hover:text-orange-dark"
                    )}
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span
                    className={cn(
                      "font-semibold",
                      dark ? "text-white" : "text-ink"
                    )}
                  >
                    {c.label}
                  </span>
                )}
                {i < crumbs.length - 1 && (
                  <ChevronRight className="h-3 w-3 opacity-50" />
                )}
              </span>
            ))}
          </motion.nav>
        )}

        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {eyebrow && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em]",
                  dark ? "text-orange" : "text-ink-muted"
                )}
              >
                <span className={cn("h-px w-8", dark ? "bg-orange" : "bg-ink/30")} />
                {eyebrow}
              </motion.p>
            )}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className={cn(
                "mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl",
                dark ? "text-white" : "text-ink"
              )}
            >
              {title}
            </motion.h1>
          </div>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className={cn(
                "max-w-lg text-base leading-relaxed lg:col-span-4",
                dark ? "text-white/70" : "text-ink-muted"
              )}
            >
              {description}
            </motion.p>
          )}
        </div>
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}
