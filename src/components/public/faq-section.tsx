"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import type { Faq } from "@prisma/client";

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);
  if (!faqs.length) return null;

  return (
    <section className="bg-cream-soft py-24 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-muted"
            >
              <span className="h-px w-8 bg-ink/30" />
              Have questions?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-3 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl"
            >
              Frequently asked.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 text-base text-ink-muted"
            >
              Common questions we hear — and honest answers. Don&apos;t see
              yours? Just ask.
            </motion.p>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-orange-dark"
            >
              Contact us
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-lg border border-ink/10 bg-white">
              {faqs.map((f, i) => {
                const isOpen = open === f.id;
                return (
                  <div key={f.id} className={i > 0 ? "border-t border-ink/10" : ""}>
                    <button
                      onClick={() => setOpen(isOpen ? null : f.id)}
                      className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition hover:bg-cream-soft sm:px-7"
                    >
                      <span className="text-base font-semibold text-ink sm:text-lg">
                        {f.question}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                          isOpen ? "rotate-45 bg-ink text-white" : "bg-stone text-ink"
                        }`}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 pr-16 text-sm leading-relaxed text-ink-muted sm:px-7 sm:pb-6 sm:pr-20 sm:text-[15px] whitespace-pre-wrap">
                            {f.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
