"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SmartImage } from "@/components/ui/smart-image";
import { Button } from "@/components/ui/button";
import type { Project } from "@prisma/client";

export function GallerySection({ projects }: { projects: Project[] }) {
  const items = projects.slice(0, 8);

  return (
    <section className="bg-ink py-24 lg:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange"
            >
              <span className="h-px w-8 bg-orange" />
              Highlights
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-3 font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl"
            >
              Recent work.
            </motion.h2>
          </div>
          <Button href="/gallery" variant="outlineLight" size="md">
            Full gallery
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 [grid-auto-rows:140px] sm:[grid-auto-rows:180px] lg:[grid-auto-rows:200px]">
          {items.map((p, i) => {
            const cls = layouts[i % layouts.length];
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: (i % 6) * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cls}
              >
                <Link
                  href={`/projects/${p.slug}`}
                  className="group relative block h-full w-full overflow-hidden rounded-lg"
                >
                  <SmartImage
                    url={p.coverUrl}
                    label={p.coverLabel}
                    aspectRatio="fill"
                    variant="default"
                    rounded={false}
                    className="transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent opacity-50 transition group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-white opacity-0 transition duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-orange">
                      {p.category}
                    </p>
                    <p className="mt-1 text-sm font-bold leading-tight">{p.title}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

const layouts = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
];
