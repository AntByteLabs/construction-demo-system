import Link from "next/link";
import { notFound } from "next/navigation";
import * as LucideIcons from "lucide-react";
import { ArrowUpRight, Check, Phone } from "lucide-react";
import { PageHeader } from "@/components/public/page-header";
import { Container } from "@/components/ui/container";
import { SmartImage } from "@/components/ui/smart-image";
import { CtaBanner } from "@/components/public/cta-banner";
import { FadeIn } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { parseJSON } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

type IconName = keyof typeof LucideIcons;

const process = [
  { step: "01", title: "Discovery", desc: "We learn your goals, constraints, and success criteria before any drawings." },
  { step: "02", title: "Feasibility", desc: "Cost studies, zoning analysis, and schedule modeling to de-risk decisions." },
  { step: "03", title: "Design", desc: "In-house architects and engineers collaborate with construction leads from day one." },
  { step: "04", title: "Construction", desc: "Our self-performing trades execute with tight schedule and quality control." },
  { step: "05", title: "Handover", desc: "Structured commissioning, training, and a 2-year warranty on everything we build." },
];

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service || !service.isActive) notFound();

  const others = await prisma.service.findMany({
    where: { isActive: true, NOT: { id: service.id } },
    orderBy: { sortOrder: "asc" },
    take: 3,
  });

  const Icon =
    (LucideIcons[service.icon as IconName] as typeof LucideIcons.Home | undefined) ??
    LucideIcons.Building2;
  const features = parseJSON<string[]>(service.features, []);

  return (
    <>
      <PageHeader
        eyebrow="Service"
        title={service.title}
        description={service.shortDesc}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <FadeIn>
                <SmartImage
                  url={service.imageUrl}
                  label={service.imageLabel}
                  aspectRatio="video"
                  variant="blueprint"
                  className="shadow-float"
                />
              </FadeIn>

              <FadeIn delay={0.1} className="mt-14">
                <div className="inline-flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-amber">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-dark">
                    What&apos;s included
                  </p>
                </div>
                <h2 className="mt-5 font-display text-3xl font-bold text-ink sm:text-4xl">
                  Built for complex, high-stakes projects.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-ink-muted text-pretty">
                  {service.content}
                </p>
              </FadeIn>

              {features.length > 0 && (
                <FadeIn delay={0.2} className="mt-10">
                  <h3 className="text-xl font-bold text-ink">Capabilities</h3>
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                    {features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 rounded-xl border border-steel/70 bg-mist/60 p-4"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber text-ink">
                          <Check className="h-3 w-3" />
                        </span>
                        <span className="text-sm font-medium text-ink">{f}</span>
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              )}

              <FadeIn delay={0.3} className="mt-14">
                <h3 className="text-xl font-bold text-ink">Our process</h3>
                <div className="mt-6 grid gap-3">
                  {process.map((p) => (
                    <div
                      key={p.step}
                      className="flex items-start gap-5 rounded-2xl border border-steel/70 bg-white p-5 transition hover:border-amber/40"
                    >
                      <span className="font-display text-2xl font-bold text-amber-dark">
                        {p.step}
                      </span>
                      <div>
                        <p className="text-base font-bold text-ink">{p.title}</p>
                        <p className="mt-1 text-sm text-ink-muted">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <aside className="lg:col-span-5">
              <div className="sticky top-28 space-y-5">
                <div className="overflow-hidden rounded-3xl bg-ink p-8 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
                    Ready to start?
                  </p>
                  <p className="mt-3 font-display text-3xl font-bold leading-tight">
                    Let&apos;s scope your {service.title.toLowerCase()} project.
                  </p>
                  <p className="mt-4 text-white/70">
                    Free 30-minute consultation with our pre-construction team. No obligation.
                  </p>
                  <div className="mt-6 flex flex-col gap-3">
                    <Button href="/contact" variant="amber" className="w-full">
                      Request a Quote
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                    <a
                      href="tel:+15551234567"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-amber hover:bg-amber/10"
                    >
                      <Phone className="h-4 w-4 text-amber" />
                      Call +1 (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="rounded-3xl border border-steel/70 bg-white p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-dark">
                    Related services
                  </p>
                  <ul className="mt-5 divide-y divide-steel/80">
                    {others.map((o) => (
                      <li key={o.id}>
                        <Link
                          href={`/services/${o.slug}`}
                          className="group flex items-center justify-between py-3.5 text-sm font-medium text-ink"
                        >
                          <span>{o.title}</span>
                          <ArrowUpRight className="h-4 w-4 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-amber" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
