"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SmartImage } from "@/components/ui/smart-image";
import { Button } from "@/components/ui/button";
import type { Service } from "@prisma/client";

export function ServicesShowcase({ services }: { services: Service[] }) {
  return (
    <section className="bg-ink py-24 text-white lg:py-28">
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
              What we do
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-3 font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl"
            >
              Our services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg"
            >
              We handle a wide range of residential and commercial projects —
              from framing and siding to custom decks, porches, and full-scope remodels.
            </motion.p>
          </div>
          <Button href="/services" variant="outlineLight" size="md">
            View all services
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: (i % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-[#1e1b17] transition duration-300 hover:border-white/20"
              >
                <SmartImage
                  url={service.imageUrl}
                  label={service.imageLabel}
                  aspectRatio="video"
                  variant="default"
                  rounded={false}
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold leading-tight text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                    {service.shortDesc}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-orange transition group-hover:gap-2.5">
                    Read more
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
