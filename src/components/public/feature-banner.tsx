"use client";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SmartImage } from "@/components/ui/smart-image";

export function FeatureBanner({
  imageUrl,
  label,
}: {
  imageUrl?: string | null;
  label: string;
}) {
  return (
    <section className="bg-cream-soft pb-16 lg:pb-24">
      <Container size="wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <SmartImage
            url={imageUrl}
            label={label}
            aspectRatio="21/9"
            variant="default"
            className="shadow-[0_30px_80px_-30px_rgba(23,21,18,0.35)]"
          />
        </motion.div>
      </Container>
    </section>
  );
}
