"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import type { Project } from "@prisma/client";

const spans = [
  "col-span-2 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
];

export function GalleryGrid({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const filtered = useMemo(() => {
    if (category === "All") return projects;
    return projects.filter((p) => p.category === category);
  }, [projects, category]);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`relative rounded-md px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
              category === c ? "text-white" : "text-ink hover:text-orange-dark"
            }`}
          >
            {category === c && (
              <motion.span
                layoutId="gallery-pill"
                className="absolute inset-0 rounded-md bg-orange"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">{c}</span>
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-3 grid-cols-4 [grid-auto-rows:140px] sm:gap-4 sm:[grid-auto-rows:180px] lg:[grid-auto-rows:200px]">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.5,
                delay: (i % 6) * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={spans[i % spans.length]}
            >
              <Link
                href={`/projects/${p.slug}`}
                className="group relative block h-full w-full overflow-hidden rounded-lg"
              >
                <SmartImage
                  url={p.coverUrl}
                  label={p.coverLabel}
                  aspectRatio="fill"
                  variant={i % 3 === 0 ? "default" : i % 3 === 1 ? "orange" : "dark"}
                  rounded={false}
                  className="transition duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-60 transition group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange">
                    {p.category}
                  </p>
                  <p className="mt-1 text-base font-bold leading-tight sm:text-lg">
                    {p.title}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-white/70">
                    <MapPin className="h-3 w-3" />
                    {p.location}
                  </p>
                </div>
                <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur transition group-hover:bg-orange group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
