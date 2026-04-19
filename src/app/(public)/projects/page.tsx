import { PageHeader } from "@/components/public/page-header";
import { Container } from "@/components/ui/container";
import { ProjectsGrid } from "@/components/public/projects-grid";
import { CtaBanner } from "@/components/public/cta-banner";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { isActive: true },
    orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }],
  });

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Projects that shape skylines and neighborhoods."
        description="A curated selection of recent work — residential, commercial, industrial, and restoration."
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />

      <section className="py-20 lg:py-24">
        <Container>
          <ProjectsGrid projects={projects} />
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
