import { PageHeader } from "@/components/public/page-header";
import { Container } from "@/components/ui/container";
import { GalleryGrid } from "@/components/public/gallery-grid";
import { CtaBanner } from "@/components/public/cta-banner";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function GalleryPage() {
  const projects = await prisma.project.findMany({
    where: { isActive: true },
    orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }],
  });

  return (
    <>
      <PageHeader
        eyebrow="Highlights"
        title="OUR GALLERY"
        description="A behind-the-scenes and finished-work showcase of recent Antbytelabs projects — residential, commercial, and everything between."
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />

      <section className="bg-cream-soft py-20 lg:py-24">
        <Container size="wide">
          <GalleryGrid projects={projects} />
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
