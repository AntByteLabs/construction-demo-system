import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHeader } from "@/components/public/page-header";
import { Container } from "@/components/ui/container";
import { CtaBanner } from "@/components/public/cta-banner";
import { SmartImage } from "@/components/ui/smart-image";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";
import { parseJSON } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

type IconName = keyof typeof LucideIcons;

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Six capabilities. One accountable team."
        description="From design to delivery, our in-house divisions combine like parts of a single engine — purpose-built for complex construction."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <Stagger className="space-y-8 lg:space-y-16">
            {services.map((service, i) => {
              const Icon =
                (LucideIcons[service.icon as IconName] as
                  | typeof LucideIcons.Home
                  | undefined) ?? LucideIcons.Building2;
              const features = parseJSON<string[]>(service.features, []);
              const reverse = i % 2 === 1;

              return (
                <StaggerItem key={service.id} index={i}>
                  <div className="grid gap-10 overflow-hidden rounded-3xl border border-steel/70 bg-white p-6 sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-12">
                    <div className={`lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}>
                      <SmartImage
                        url={service.imageUrl}
                        label={service.imageLabel}
                        aspectRatio="video"
                        variant={i % 3 === 0 ? "default" : i % 3 === 1 ? "cream" : "mesh"}
                      />
                    </div>
                    <div className="flex flex-col justify-center lg:col-span-6">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-amber">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-dark">
                          0{i + 1} · {service.title.split(" ")[0]}
                        </span>
                      </div>
                      <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                        {service.title}
                      </h2>
                      <p className="mt-4 text-lg text-ink-muted">{service.shortDesc}</p>

                      {features.length > 0 && (
                        <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber/15 text-amber-dark">
                                <Check className="h-3 w-3" />
                              </span>
                              {f}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-8">
                        <Link
                          href={`/services/${service.slug}`}
                          className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber hover:text-ink"
                        >
                          Explore {service.title}
                          <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      <FadeIn className="pb-8">
        <Container>
          <div className="rounded-3xl bg-gradient-to-br from-amber/10 via-white to-azure/5 p-10 text-center lg:p-14">
            <h3 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              Need a custom delivery model?
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-muted">
              We offer design-build, construction management, and traditional general contracting. Let&apos;s find the right fit.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber hover:text-ink"
            >
              Discuss your project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </FadeIn>

      <CtaBanner />
    </>
  );
}
