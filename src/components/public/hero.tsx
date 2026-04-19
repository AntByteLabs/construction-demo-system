"use client";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/ui/smart-image";
import { Container } from "@/components/ui/container";
import type { HomepageContent } from "@prisma/client";

export function Hero({
  content,
  phone,
}: {
  content: HomepageContent;
  phone?: string;
}) {
  const phoneDisplay = phone ?? "(913) 297-3000";
  const phoneHref = `tel:${(phone ?? "+15551234567").replace(/[^0-9+]/g, "")}`;

  return (
    <section className="relative overflow-hidden bg-cream-soft pb-20 pt-14 lg:pb-28 lg:pt-20">
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            {content.heroEyebrow && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-muted"
              >
                <span className="h-px w-8 bg-ink/30" />
                {content.heroEyebrow}
              </motion.p>
            )}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-display text-[2.75rem] font-bold leading-[1.02] tracking-tight text-balance text-ink sm:text-6xl lg:text-[4rem]"
            >
              {content.heroTitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted text-pretty sm:text-lg"
            >
              {content.heroSubtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              {content.heroCtaLabel && content.heroCtaHref && (
                <Button href={content.heroCtaHref} variant="dark" size="lg">
                  {content.heroCtaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
              <a
                href={phoneHref}
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-orange-dark"
              >
                <Phone className="h-4 w-4 text-orange" />
                {phoneDisplay}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-12 flex flex-wrap items-center gap-6 border-t border-ink/10 pt-6"
            >
              <div>
                <p className="font-display text-2xl font-bold text-ink">
                  {content.heroStat1Value}
                </p>
                <p className="text-xs text-ink-muted">{content.heroStat1Label}</p>
              </div>
              <div className="h-10 w-px bg-ink/10" />
              <div>
                <p className="font-display text-2xl font-bold text-ink">
                  {content.heroStat2Value}
                </p>
                <p className="text-xs text-ink-muted">{content.heroStat2Label}</p>
              </div>
              <div className="h-10 w-px bg-ink/10" />
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-orange">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-ink-muted">
                  {content.heroStat3Value} {content.heroStat3Label}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="relative lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <SmartImage
                url={content.heroImageUrl}
                label={content.heroImageLabel}
                aspectRatio="4/3"
                variant="default"
                className="shadow-[0_24px_60px_-24px_rgba(23,21,18,0.35)]"
              />
            </motion.div>

            {content.heroTestimonialQuote && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="absolute -bottom-6 -left-4 max-w-[280px] rounded-lg border border-ink/10 bg-white p-4 shadow-[0_16px_40px_-20px_rgba(23,21,18,0.25)] sm:-left-8"
              >
                <div className="flex items-center gap-0.5 text-orange">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                </div>
                <p className="mt-2 text-[13px] leading-snug text-ink">
                  &ldquo;{content.heroTestimonialQuote}&rdquo;
                </p>
                <p className="mt-3 text-[11px] font-semibold text-ink-muted">
                  — {content.heroTestimonialName}
                  {content.heroTestimonialRole && `, ${content.heroTestimonialRole}`}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
