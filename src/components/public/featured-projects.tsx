"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SmartImage } from "@/components/ui/smart-image";
import { formatDate } from "@/lib/utils";
import type { Project } from "@prisma/client";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Recent work"
            title="Projects that define skylines."
            description="A selection of landmark projects delivered by Antbytelabs in the past 24 months."
            className="max-w-2xl"
          />
          <Link
            href="/projects"
            className="group hidden items-center gap-3 text-sm font-semibold text-ink sm:inline-flex"
          >
            View portfolio
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition group-hover:bg-amber group-hover:text-ink">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-6">
          {projects.slice(0, 4).map((p, i) => {
            const span =
              i === 0
                ? "lg:col-span-4"
                : i === 1
                  ? "lg:col-span-2"
                  : i === 2
                    ? "lg:col-span-2"
                    : "lg:col-span-4";
            const aspect = i === 0 || i === 3 ? "video" : "4/3";
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={span}
              >
                <Link
                  href={`/projects/${p.slug}`}
                  className="group relative block overflow-hidden rounded-3xl bg-ink"
                >
                  <SmartImage
                    url={p.coverUrl}
                    label={p.coverLabel}
                    aspectRatio={aspect}
                    variant={i % 2 === 0 ? "default" : "dark"}
                    rounded={false}
                    className="transition duration-700 group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />

                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                    {p.category}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-7">
                    <div className="min-w-0 flex-1 text-white">
                      <h3 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
                        {p.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-3 text-sm text-white/70">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {p.location}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-white/40" />
                        <span>{formatDate(p.completionDate, { month: "long", year: "numeric" })}</span>
                      </div>
                    </div>
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber text-ink transition group-hover:rotate-45">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 sm:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 text-sm font-semibold text-ink"
          >
            View portfolio
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
