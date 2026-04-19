"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import type { Testimonial } from "@prisma/client";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [visible, setVisible] = useState(6);
  if (!items.length) return null;

  return (
    <section className="bg-cream-soft py-24 lg:py-28">
      <Container>
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-muted"
          >
            <span className="h-px w-8 bg-ink/30" />
            What clients say
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-3 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl"
          >
            Testimonials
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-base text-ink-muted"
          >
            Real feedback from homeowners we&apos;ve worked with.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, visible).map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: (i % 3) * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-lg border border-ink/10 bg-white p-6 sm:p-7"
            >
              <div className="flex items-center gap-0.5 text-orange">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-[14px] leading-relaxed text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-4">
                {t.photoUrl ? (
                  <span className="relative h-9 w-9 overflow-hidden rounded-full bg-stone">
                    <Image
                      src={t.photoUrl}
                      alt={t.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </span>
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone text-[11px] font-bold text-ink">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                )}
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  {t.role && (
                    <p className="text-[11px] text-ink-muted">{t.role}</p>
                  )}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {visible < items.length && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setVisible(items.length)}
              className="inline-flex items-center gap-2 rounded-md border border-ink/20 bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white"
            >
              Load more
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
