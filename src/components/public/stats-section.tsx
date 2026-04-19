"use client";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";

const stats = [
  { to: 250, suffix: "+", label: "Projects completed", sub: "Across 14 states" },
  { to: 25, suffix: "+", label: "Years of experience", sub: "Founded 2000" },
  { to: 320, suffix: "+", label: "Happy clients", sub: "78% repeat business" },
  { to: 1800, suffix: "K sqft", label: "Delivered last year", sub: "Commercial & residential" },
];

export function StatsSection() {
  return (
    <section className="relative -mt-16 overflow-hidden pb-4 lg:-mt-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-white px-6 py-12 shadow-float ring-1 ring-steel/70 sm:px-12 lg:px-16 lg:py-14"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-amber/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-azure/10 blur-3xl" />

          <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                {i > 0 && (
                  <div className="absolute -left-5 top-2 hidden h-16 w-px bg-steel lg:block" />
                )}
                <p className="font-display text-5xl font-bold tracking-tight text-ink sm:text-6xl">
                  <Counter to={s.to} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-sm font-semibold text-ink">{s.label}</p>
                <p className="mt-1 text-xs text-ink-muted">{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
