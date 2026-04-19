import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, MapPin, Calendar, Briefcase, Building2 } from "lucide-react";
import { PageHeader } from "@/components/public/page-header";
import { Container } from "@/components/ui/container";
import { Placeholder } from "@/components/ui/placeholder";
import { SmartImage } from "@/components/ui/smart-image";
import { CtaBanner } from "@/components/public/cta-banner";
import { FadeIn } from "@/components/ui/motion";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
  if (!project || !project.isActive) notFound();

  const related = await prisma.project.findMany({
    where: {
      isActive: true,
      category: project.category,
      NOT: { id: project.id },
    },
    orderBy: { sortOrder: "asc" },
    take: 3,
  });

  const facts = [
    { icon: Briefcase, label: "Client", value: project.client },
    { icon: Building2, label: "Category", value: project.category },
    { icon: MapPin, label: "Location", value: project.location },
    { icon: Calendar, label: "Completed", value: formatDate(project.completionDate, { month: "long", year: "numeric" }) },
  ];

  return (
    <>
      <PageHeader
        eyebrow={project.category}
        title={project.title}
        description={project.description}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <FadeIn>
            <SmartImage
              url={project.coverUrl}
              label={project.coverLabel}
              aspectRatio="21/9"
              variant="blueprint"
              className="shadow-float"
            />
          </FadeIn>

          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <FadeIn>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-dark">
                  Project overview
                </p>
                <h2 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
                  A project built to set the standard.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-ink-muted text-pretty">
                  {project.content}
                </p>
              </FadeIn>

              {project.images.length > 0 && (
                <FadeIn delay={0.1} className="mt-14">
                  <h3 className="text-xl font-bold text-ink">Project gallery</h3>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {project.images.map((img, i) => (
                      <div
                        key={img.id}
                        className={i === 0 ? "sm:col-span-2" : ""}
                      >
                        <SmartImage
                          url={img.url}
                          label={img.label}
                          aspectRatio={i === 0 ? "21/9" : "4/3"}
                          variant={i % 2 === 0 ? "dark" : "mesh"}
                        />
                        {img.caption && (
                          <p className="mt-2 text-sm text-ink-muted">{img.caption}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </FadeIn>
              )}
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-5">
                <div className="overflow-hidden rounded-3xl border border-steel/70 bg-white p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-dark">
                    Project facts
                  </p>
                  <ul className="mt-5 divide-y divide-steel/80">
                    {facts.map((f) => (
                      <li key={f.label} className="flex items-start gap-3 py-3.5">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone text-ink">
                          <f.icon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                            {f.label}
                          </p>
                          <p className="mt-0.5 text-sm font-semibold text-ink">{f.value}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="overflow-hidden rounded-3xl bg-ink p-7 text-white">
                  <p className="font-display text-2xl font-bold leading-tight">
                    Have a similar project?
                  </p>
                  <p className="mt-3 text-sm text-white/70">
                    Let&apos;s talk scope, budget, and timeline. Free consultation.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-white"
                  >
                    Start the conversation
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <FadeIn className="mt-20 border-t border-steel pt-16">
              <h3 className="font-display text-2xl font-bold text-ink">
                More {project.category.toLowerCase()} projects
              </h3>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r, i) => (
                  <Link
                    key={r.id}
                    href={`/projects/${r.slug}`}
                    className="group relative block overflow-hidden rounded-3xl bg-ink"
                  >
                    <SmartImage
                      url={r.coverUrl}
                      label={r.coverLabel}
                      aspectRatio="4/3"
                      variant={i % 2 === 0 ? "default" : "dark"}
                      rounded={false}
                      className="transition duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <p className="text-xs uppercase tracking-wider text-amber">
                        {r.category}
                      </p>
                      <p className="mt-1 text-lg font-bold">{r.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </FadeIn>
          )}
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
