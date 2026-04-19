"use client";
import { motion } from "framer-motion";
import { MessageSquare, BadgeDollarSign, ShieldCheck, Home } from "lucide-react";
import { Container } from "@/components/ui/container";

const benefits = [
  {
    icon: MessageSquare,
    title: "Clear communication",
    desc: "We&apos;ll keep you updated at every step, so there are no surprises along the way.",
  },
  {
    icon: BadgeDollarSign,
    title: "Upfront pricing",
    desc: "We give fair, honest quotes, and stick to them. No hidden costs, ever.",
  },
  {
    icon: ShieldCheck,
    title: "Built to last",
    desc: "We follow the right methods and use strong materials that hold up over time.",
  },
  {
    icon: Home,
    title: "Respect for your home",
    desc: "We clean up, show up, and treat your space like it&apos;s our own.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-cream-soft pb-24 lg:pb-28">
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
            Why choose us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-3 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl"
          >
            Simple, honest, focused on what matters.
          </motion.h2>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="rounded-lg border border-ink/10 bg-white p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-orange">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-base font-bold text-ink">{b.title}</h3>
              <p
                className="mt-2 text-[13px] leading-relaxed text-ink-muted"
                dangerouslySetInnerHTML={{ __html: b.desc }}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
