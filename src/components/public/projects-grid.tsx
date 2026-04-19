"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MapPin, Search } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import { formatDate } from "@/lib/utils";
import type { Project } from "@prisma/client";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.location.toLowerCase().includes(query.toLowerCase());
      const matchCat = category === "All" || p.category === category;
      return matchQuery && matchCat;
    });
  }, [projects, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                category === c
                  ? "text-white"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {category === c && (
                <motion.span
                  layoutId="cat-pill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{c}</span>
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects"
            className="w-full rounded-full border border-steel bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-amber focus:ring-4 focus:ring-amber/20"
          />
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.5,
                delay: i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={`/projects/${p.slug}`}
                className="group relative block overflow-hidden rounded-3xl bg-ink"
              >
                <SmartImage
                  url={p.coverUrl}
                  label={p.coverLabel}
                  aspectRatio="4/3"
                  variant={i % 3 === 0 ? "default" : i % 3 === 1 ? "dark" : "blueprint"}
                  rounded={false}
                  className="transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                  {p.category}
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white sm:p-6">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl">
                      {p.title}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-2 text-xs text-white/70">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{p.location}</span>
                      <span className="h-1 w-1 shrink-0 rounded-full bg-white/40" />
                      <span className="shrink-0">
                        {formatDate(p.completionDate, { year: "numeric" })}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber text-ink transition group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 rounded-3xl border border-dashed border-steel bg-mist py-20 text-center">
          <p className="text-base font-semibold text-ink">No projects match your search.</p>
          <p className="mt-2 text-sm text-ink-muted">Try a different category or keyword.</p>
        </div>
      )}
    </div>
  );
}
