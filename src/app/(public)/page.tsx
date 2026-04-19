import { Hero } from "@/components/public/hero";
import { ServicesShowcase } from "@/components/public/services-showcase";
import { IntroSection } from "@/components/public/intro-section";
import { FeatureBanner } from "@/components/public/feature-banner";
import { WhyChoose } from "@/components/public/why-choose";
import { TeamPreview } from "@/components/public/team-preview";
import { Testimonials } from "@/components/public/testimonials";
import { GallerySection } from "@/components/public/gallery-section";
import { FaqSection } from "@/components/public/faq-section";
import { CtaBanner } from "@/components/public/cta-banner";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function HomePage() {
  const [
    homepage,
    settings,
    services,
    projects,
    team,
    testimonials,
    faqs,
  ] = await Promise.all([
    prisma.homepageContent.findUnique({ where: { id: "singleton" } }),
    prisma.settings.findUnique({ where: { id: "singleton" } }),
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      take: 6,
    }),
    prisma.project.findMany({
      where: { isActive: true },
      orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }],
      take: 9,
    }),
    prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      take: 4,
    }),
    prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }],
    }),
    prisma.faq.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  const content =
    homepage ??
    (await prisma.homepageContent.create({ data: { id: "singleton" } }));

  return (
    <>
      <Hero content={content} phone={settings?.phone} />
      <ServicesShowcase services={services} />
      <IntroSection />
      <FeatureBanner
        imageUrl={content.featureBannerImageUrl}
        label={content.featureBannerLabel}
      />
      <WhyChoose />
      <TeamPreview members={team} />
      <Testimonials items={testimonials} />
      <GallerySection projects={projects} />
      <FaqSection faqs={faqs} />
      <CtaBanner />
    </>
  );
}
