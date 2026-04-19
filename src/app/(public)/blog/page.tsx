import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { PageHeader } from "@/components/public/page-header";
import { Container } from "@/components/ui/container";
import { SmartImage } from "@/components/ui/smart-image";
import { BlogExplorer } from "@/components/public/blog-explorer";
import { CtaBanner } from "@/components/public/cta-banner";
import { FadeIn } from "@/components/ui/motion";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    prisma.blogPost.findMany({
      where: { status: "published" },
      include: { category: true },
      orderBy: { publishedAt: "desc" },
    }),
    prisma.blogCategory.findMany(),
  ]);

  const featured = posts.find((p) => p.isFeatured) ?? posts[0];
  const rest = featured ? posts.filter((p) => p.id !== featured.id) : posts;

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="From the Antbytelabs newsroom."
        description="Field notes, industry perspectives, and behind-the-scenes stories from our studios and jobsites."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      {featured && (
        <section className="py-14 lg:py-20">
          <Container>
            <FadeIn>
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid gap-8 rounded-3xl border border-steel/70 bg-white p-4 transition duration-500 hover:-translate-y-1 hover:shadow-float sm:p-6 lg:grid-cols-12 lg:gap-12 lg:p-10"
              >
                <div className="lg:col-span-7">
                  <SmartImage
                    url={featured.coverUrl}
                    label={featured.coverLabel}
                    aspectRatio="video"
                    variant="blueprint"
                    className="transition duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-col justify-center lg:col-span-5">
                  <p className="inline-flex w-fit items-center gap-2 rounded-full bg-amber/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-dark">
                    Featured · {featured.category?.name}
                  </p>
                  <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-base text-ink-muted">{featured.excerpt}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-ink-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {featured.publishedAt ? formatDate(featured.publishedAt) : "Draft"}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {featured.readMinutes} min read
                    </span>
                    <span className="font-semibold text-ink">{featured.author}</span>
                  </div>
                  <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-amber group-hover:text-ink">
                    Read article
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          </Container>
        </section>
      )}

      <section className="pb-24 lg:pb-32">
        <Container>
          <BlogExplorer posts={rest} categories={categories} />
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
