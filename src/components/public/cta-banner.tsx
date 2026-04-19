"use client";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";

export function CtaBanner() {
  return (
    <section className="bg-ink py-20 text-white lg:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center"
        >
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange">
              <span className="h-px w-8 bg-orange" />
              Ready to start?
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl">
              Let&apos;s turn your plan into a project.
            </h2>
            <p className="mt-4 text-base text-white/70">
              Free consultation. Fair quote. Honest answers.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-dark"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="tel:+15551234567"
              className="inline-flex items-center gap-2 rounded-md border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-ink"
            >
              <Phone className="h-4 w-4" />
              (913) 297-3000
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
