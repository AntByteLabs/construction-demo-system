import { Target, Compass, Heart, Award, ShieldCheck, Leaf, Users, Wrench } from "lucide-react";
import { PageHeader } from "@/components/public/page-header";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Placeholder } from "@/components/ui/placeholder";
import { SmartImage } from "@/components/ui/smart-image";
import { Counter } from "@/components/ui/counter";
import { CtaBanner } from "@/components/public/cta-banner";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

const values = [
  { icon: Target, title: "Uncompromising Quality", desc: "Every weld, every finish, every detail — we build it like we'll live in it." },
  { icon: Compass, title: "Design-Led Thinking", desc: "In-house architects ensure engineering serves the vision, not the other way around." },
  { icon: Heart, title: "Client Partnership", desc: "Transparent communication, fair contracts, and a genuine investment in your success." },
  { icon: ShieldCheck, title: "Safety as Culture", desc: "Zero-incident operations through engineered processes, not posters." },
  { icon: Leaf, title: "Sustainable by Default", desc: "Every project designed to exceed energy code. LEED Gold minimum." },
  { icon: Wrench, title: "Craft & Execution", desc: "Self-performing core trades means tighter schedules and better quality control." },
];

const certifications = [
  { title: "LEED Accredited Professional", org: "USGBC", year: "Since 2008", badge: "LEED" },
  { title: "ISO 9001:2015", org: "Quality Management", year: "Certified since 2012", badge: "ISO" },
  { title: "ISO 45001:2018", org: "Occupational Health & Safety", year: "Certified since 2019", badge: "OH&S" },
  { title: "DBIA Certified", org: "Design-Build Institute", year: "Since 2015", badge: "DBIA" },
  { title: "OSHA VPP Star", org: "Voluntary Protection Program", year: "Since 2017", badge: "VPP" },
  { title: "AGC Member", org: "Associated General Contractors", year: "Member since 2001", badge: "AGC" },
];

const milestones = [
  { year: "2000", title: "Antbytelabs founded", desc: "Marcus Chen starts the firm in a 400 sq ft office with two project managers." },
  { year: "2005", title: "First commercial build", desc: "Delivered our first ground-up commercial project — a 60,000 sq ft office building." },
  { year: "2010", title: "Residential division launched", desc: "Expanded into custom residential construction to complement commercial portfolio." },
  { year: "2015", title: "LEED Platinum milestone", desc: "First LEED Platinum certified project — Verdant Tech Headquarters." },
  { year: "2019", title: "250,000 sq ft year", desc: "Delivered a record year spanning hotel, tower, and industrial projects." },
  { year: "2023", title: "National expansion", desc: "Licensed and operating in all 50 states with regional offices in 8 cities." },
  { year: "2026", title: "250+ projects delivered", desc: "Milestone year — 25 years and a quarter-thousand landmark projects." },
];

export default async function AboutPage() {
  const team = await prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="25 years of building what matters most."
        description="We're a vertically-integrated construction firm that treats every project like a signature — because to us, every one is."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Company story */}
      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <FadeIn className="lg:col-span-5">
              <div className="relative">
                <Placeholder
                  label="Founders on the first project site"
                  aspectRatio="4/5"
                  variant="mesh"
                />
                <div className="absolute -bottom-6 -right-6 rounded-2xl bg-amber p-5 shadow-float sm:-right-10">
                  <p className="font-display text-5xl font-bold text-ink leading-none">
                    <Counter to={25} suffix="+" />
                  </p>
                  <p className="mt-1 text-xs font-medium text-ink">Years of craft</p>
                </div>
              </div>
            </FadeIn>

            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Our story"
                title="Started in 2000 with a simple promise."
                description="Build it right the first time. Treat clients like partners. Pay trades fairly. Tell the truth — always."
              />
              <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink-muted text-pretty">
                <p>
                  When <strong className="text-ink">Marcus Chen</strong> founded Antbytelabs in 2000, he had 12 years of field experience at a national general contractor and one conviction: construction could be done with more integrity than the industry had settled for.
                </p>
                <p>
                  Twenty-five years later, that conviction has become an operating system. We&apos;ve delivered 250+ projects across 14 states, grown to 180 full-time teammates, and become one of the most respected mid-market construction firms in the country.
                </p>
                <p>
                  What hasn&apos;t changed: we still answer the phone when clients call. We still send an executive to every ribbon-cutting. And we still measure our success by how many clients come back — which, last we checked, was 78 percent of them.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission / Vision */}
      <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
        <div className="pointer-events-none absolute inset-0 hero-grid-bg opacity-[0.05]" />
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <FadeIn className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 lg:p-14">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber text-ink">
                <Target className="h-7 w-7" />
              </div>
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-amber">
                Our mission
              </p>
              <h3 className="mt-4 font-display text-3xl font-bold leading-snug sm:text-4xl">
                To build landmark projects that clients trust and communities respect.
              </h3>
              <p className="mt-6 text-lg leading-relaxed text-white/70">
                We deliver the engineering excellence of a global firm with the attention and accountability of a boutique studio — at every scale.
              </p>
            </FadeIn>

            <FadeIn delay={0.1} className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 lg:p-14">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-azure text-white">
                <Compass className="h-7 w-7" />
              </div>
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-azure">
                Our vision
              </p>
              <h3 className="mt-4 font-display text-3xl font-bold leading-snug sm:text-4xl">
                The industry&apos;s most-referred construction partner by 2030.
              </h3>
              <p className="mt-6 text-lg leading-relaxed text-white/70">
                We measure success by repeat business and referrals — not bid wins. Our goal: to be the firm clients recommend without being asked.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Core values */}
      <section className="py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow="What drives us"
            title="Six values we actually live by."
            description="Not a poster on the wall — the operating principles that shape every hire, decision, and project."
            align="center"
            className="mb-14"
          />

          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <StaggerItem key={v.title} index={i}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-steel/70 bg-white p-7 transition duration-500 hover:-translate-y-1 hover:border-amber/40 hover:shadow-float">
                  <div className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full bg-amber/0 transition duration-700 group-hover:bg-amber/10" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-amber transition group-hover:bg-amber group-hover:text-ink">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="relative mt-6 text-xl font-bold text-ink">{v.title}</h3>
                  <p className="relative mt-3 text-[15px] leading-relaxed text-ink-muted">
                    {v.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden bg-mist py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow="The journey"
            title="Twenty-five years of milestones."
            description="From a 400 sq ft office to 250+ projects nationwide."
            align="center"
            className="mb-16"
          />

          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-steel sm:left-1/2" aria-hidden />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <FadeIn
                  key={m.year}
                  delay={i * 0.05}
                  className={`relative grid gap-6 sm:grid-cols-2 sm:gap-12 ${i % 2 === 0 ? "" : "sm:[direction:rtl]"}`}
                >
                  <div className={`sm:text-right sm:[direction:ltr] ${i % 2 === 1 ? "sm:order-2 sm:text-left" : ""}`}>
                    <div className="inline-flex items-center gap-3 rounded-full bg-ink px-4 py-2 text-sm font-bold text-amber">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                      {m.year}
                    </div>
                    <h4 className="mt-4 font-display text-2xl font-bold text-ink">{m.title}</h4>
                    <p className="mt-2 text-ink-muted">{m.desc}</p>
                  </div>
                  <div className={`absolute left-[3px] top-1 h-6 w-6 rounded-full border-4 border-mist bg-amber sm:left-1/2 sm:-translate-x-1/2`} />
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow="Leadership"
            title="The people behind the builds."
            description="Our leadership combines decades of field expertise, design vision, and operational discipline."
            align="center"
            className="mb-14"
          />

          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.slice(0, 8).map((m, i) => (
              <StaggerItem key={m.id} index={i}>
                <div className="group overflow-hidden rounded-3xl border border-steel/70 bg-white p-3 transition duration-500 hover:-translate-y-1 hover:shadow-float">
                  <SmartImage
                    url={m.photoUrl}
                    label={m.photoLabel}
                    aspectRatio="portrait"
                    variant={i % 3 === 0 ? "default" : i % 3 === 1 ? "dark" : "mesh"}
                    className="transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="px-3 pb-3 pt-5">
                    <p className="text-base font-bold text-ink">{m.name}</p>
                    <p className="mt-1 text-sm text-amber-dark">{m.role}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Certifications */}
      <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
        <div className="pointer-events-none absolute inset-0 hero-grid-bg opacity-[0.05]" />
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="Credentials"
                title="Certified, accredited, trusted."
                description="Independent verification of the standards we hold ourselves to every day."
                light
              />
              <div className="mt-10 flex items-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber text-ink">
                  <Award className="h-8 w-8" />
                </div>
                <div>
                  <p className="font-display text-3xl font-bold">
                    <Counter to={42} suffix="+" />
                  </p>
                  <p className="text-sm text-white/60">Industry awards since 2010</p>
                </div>
              </div>
            </div>

            <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
              {certifications.map((c, i) => (
                <StaggerItem key={c.title} index={i}>
                  <div className="flex h-full items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-amber/40 hover:bg-amber/5">
                    <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber font-display text-sm font-bold text-ink">
                      {c.badge}
                    </div>
                    <div>
                      <p className="text-base font-bold">{c.title}</p>
                      <p className="mt-1 text-sm text-white/60">{c.org}</p>
                      <p className="mt-0.5 text-xs text-amber">{c.year}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
