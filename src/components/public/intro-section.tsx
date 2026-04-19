"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";

export function IntroSection() {
  return (
    <section className="bg-cream-soft py-24 lg:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-muted"
            >
              <span className="h-px w-8 bg-ink/30" />
              About us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-3 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl"
            >
              Honest work that speaks for itself.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6"
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-orange-dark"
              >
                Learn more about us
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              At Antbytelabs Construction, we believe in doing the work right
              the first time. Founded 25 years ago and family-run since,
              we&apos;ve grown into a reliable team of 25 running 11 active crews
              across the region. From day one, we&apos;ve focused on the basics:
              show up, communicate honestly, and build something that lasts.
            </motion.p>

            <div className="mt-12 grid gap-8 border-t border-ink/10 pt-10 sm:grid-cols-3">
              {[
                { to: 500, suffix: "+", label: "Projects completed" },
                { to: 4.8, decimals: 1, label: "Average review rating" },
                { to: 35, suffix: "+", label: "Years in construction" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                >
                  <p className="font-display text-5xl font-bold leading-none text-ink">
                    {s.decimals ? s.to.toFixed(1) : <Counter to={s.to} suffix={s.suffix ?? ""} />}
                  </p>
                  <p className="mt-3 text-sm text-ink-muted">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
