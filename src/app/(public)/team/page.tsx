import { PageHeader } from "@/components/public/page-header";
import { Container } from "@/components/ui/container";
import { TeamGrid } from "@/components/public/team-grid";
import { CtaBanner } from "@/components/public/cta-banner";
import { Counter } from "@/components/ui/counter";
import { FadeIn } from "@/components/ui/motion";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

const teamStats = [
  { to: 180, suffix: "+", label: "Full-time teammates" },
  { to: 42, suffix: "", label: "Licensed engineers" },
  { to: 24, suffix: "", label: "LEED APs" },
  { to: 18, suffix: " years", label: "Average tenure" },
];

export default async function TeamPage() {
  const members = await prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      <PageHeader
        eyebrow="Our people"
        title="The team that makes it happen."
        description="Designers, engineers, superintendents, and project leaders — united by a shared obsession with getting it right."
        crumbs={[{ label: "Home", href: "/" }, { label: "Team" }]}
      />

      <section className="bg-cream-soft py-10 lg:py-12">
        <Container>
          <FadeIn>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {teamStats.map((s, i) => (
                <div
                  key={s.label}
                  className={`${
                    i > 0 ? "lg:border-l lg:border-ink/10 lg:pl-6" : ""
                  }`}
                >
                  <p className="font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
                    <Counter to={s.to} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-ink-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="border-t border-ink/10 pt-10 pb-20 lg:pt-12 lg:pb-28">
        <Container>
          <TeamGrid members={members} />
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
