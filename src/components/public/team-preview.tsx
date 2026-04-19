"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SmartImage } from "@/components/ui/smart-image";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@prisma/client";

export function TeamPreview({ members }: { members: TeamMember[] }) {
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
              Our team
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-3 font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl"
            >
              Builders, craftsmen, operators.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg"
            >
              Skilled, licensed, and invested in every project.
            </motion.p>
          </div>
          <Button href="/team" variant="outlineLight" size="md">
            Meet the team
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {members.slice(0, 4).map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group overflow-hidden rounded-lg border border-white/10 bg-[#1e1b17]"
            >
              <SmartImage
                url={m.photoUrl}
                label={m.photoLabel}
                aspectRatio="4/3"
                variant="default"
                rounded={false}
                className="transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="p-5">
                <p className="text-base font-bold text-white">{m.name}</p>
                <p className="mt-1 text-xs text-white/60">{m.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col items-start justify-between gap-4 rounded-lg border border-white/10 bg-[#1e1b17] p-6 sm:flex-row sm:items-center"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">
              We&apos;re hiring
            </p>
            <p className="mt-2 text-base text-white/80 sm:text-lg">
              Dependable team players who want long-term work in the trades.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-orange hover:text-white"
          >
            Apply now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
