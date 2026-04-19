"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SmartImage } from "@/components/ui/smart-image";
import { formatDate } from "@/lib/utils";
import type { BlogPost, BlogCategory } from "@prisma/client";

type Post = BlogPost & { category: BlogCategory | null };

export function BlogPreview({ posts }: { posts: Post[] }) {
  return (
    <section className="relative bg-white py-24 lg:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Latest insights"
            title="From our field, studio, and boardroom."
            description="Perspectives on sustainable building, project delivery, and the craft of construction."
            className="max-w-2xl"
          />
          <Link
            href="/blog"
            className="group hidden items-center gap-3 text-sm font-semibold text-ink sm:inline-flex"
          >
            Read the blog
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition group-hover:bg-amber group-hover:text-ink">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.1 }}
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
                    variant={i === 0 ? "default" : i === 1 ? "amber" : "dark"}
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
                      {post.readMinutes} min read
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold leading-tight text-ink transition group-hover:text-amber-dark">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-steel pt-4">
                    <p className="text-sm font-semibold text-ink">{post.author}</p>
                    <ArrowUpRight className="h-4 w-4 text-ink transition group-hover:text-amber" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
