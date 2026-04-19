"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Calendar, Clock, Search } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import { formatDate } from "@/lib/utils";
import type { BlogPost, BlogCategory } from "@prisma/client";

type Post = BlogPost & { category: BlogCategory | null };

export function BlogExplorer({
  posts,
  categories,
}: {
  posts: Post[];
  categories: BlogCategory[];
}) {
  const [query, setQuery] = useState("");
  const [catSlug, setCatSlug] = useState<string>("all");

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase());
      const matchCat = catSlug === "all" || p.category?.slug === catSlug;
      return matchQuery && matchCat;
    });
  }, [posts, query, catSlug]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCatSlug("all")}
            className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
              catSlug === "all" ? "text-white" : "text-ink-muted hover:text-ink"
            }`}
          >
            {catSlug === "all" && (
              <motion.span
                layoutId="blog-cat-pill"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">All</span>
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCatSlug(c.slug)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                catSlug === c.slug ? "text-white" : "text-ink-muted hover:text-ink"
              }`}
            >
              {catSlug === c.slug && (
                <motion.span
                  layoutId="blog-cat-pill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{c.name}</span>
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-80">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
            className="w-full rounded-full border border-steel bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-amber focus:ring-4 focus:ring-amber/20"
          />
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((post, i) => (
            <motion.article
              key={post.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.55,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-steel/70 bg-white transition duration-500 hover:-translate-y-1 hover:border-amber/40 hover:shadow-float"
              >
                <div className="relative overflow-hidden">
                  <SmartImage
                    url={post.coverUrl}
                    label={post.coverLabel}
                    aspectRatio="video"
                    variant={i % 3 === 0 ? "default" : i % 3 === 1 ? "amber" : "dark"}
                    rounded={false}
                    className="transition duration-700 group-hover:scale-[1.05]"
                  />
                  {post.category && (
                    <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
                      {post.category.name}
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-4 text-xs text-ink-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.publishedAt ? formatDate(post.publishedAt) : "Draft"}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readMinutes} min
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold leading-tight text-ink transition group-hover:text-amber-dark">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-muted">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-steel pt-4">
                    <p className="text-sm font-semibold text-ink">{post.author}</p>
                    <ArrowUpRight className="h-4 w-4 text-ink transition group-hover:text-amber" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 rounded-3xl border border-dashed border-steel bg-mist py-20 text-center">
          <p className="text-base font-semibold text-ink">No articles match your search.</p>
          <p className="mt-2 text-sm text-ink-muted">Try a different category or keyword.</p>
        </div>
      )}
    </div>
  );
}
