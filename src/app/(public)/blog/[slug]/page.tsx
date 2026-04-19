import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Calendar, Clock, Tag } from "lucide-react";
import { PageHeader } from "@/components/public/page-header";
import { Container } from "@/components/ui/container";
import { SmartImage } from "@/components/ui/smart-image";
import { CtaBanner } from "@/components/public/cta-banner";
import { FadeIn } from "@/components/ui/motion";
import { formatDate, parseJSON } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!post || post.status !== "published") notFound();

  const related = await prisma.blogPost.findMany({
    where: {
      status: "published",
      NOT: { id: post.id },
      OR: post.categoryId ? [{ categoryId: post.categoryId }] : undefined,
    },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  const tags = parseJSON<string[]>(post.tags, []);

  return (
    <>
      <PageHeader
        eyebrow={post.category?.name ?? "Article"}
        title={post.title}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-white/70">
          <span className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {post.publishedAt ? formatDate(post.publishedAt) : "Unpublished"}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {post.readMinutes} min read
          </span>
          <span className="inline-flex items-center gap-2 text-amber">
            <span className="h-1 w-1 rounded-full bg-amber" />
            {post.author}, {post.authorRole}
          </span>
        </div>
      </PageHeader>

      <section className="py-16 lg:py-24">
        <Container size="sm">
          <FadeIn>
            <SmartImage
              url={post.coverUrl}
              label={post.coverLabel}
              aspectRatio="21/9"
              variant="blueprint"
              className="shadow-float"
            />
          </FadeIn>

          <FadeIn delay={0.1} className="mt-14">
            <p className="font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">
              {post.excerpt}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div
              className="prose-construction mt-10"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </FadeIn>

          {tags.length > 0 && (
            <FadeIn className="mt-14 flex flex-wrap items-center gap-2 border-t border-steel pt-8">
              <span className="mr-2 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                <Tag className="h-4 w-4 text-amber" />
                Tags
              </span>
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full bg-stone px-3 py-1 text-xs font-medium text-ink"
                >
                  #{t}
                </span>
              ))}
            </FadeIn>
          )}

          <FadeIn className="mt-14 rounded-3xl bg-ink p-8 text-white sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
              Written by
            </p>
            <div className="mt-4 flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber text-ink font-display text-lg font-bold">
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <p className="text-lg font-bold">{post.author}</p>
                <p className="text-sm text-white/60">{post.authorRole}</p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="border-t border-steel bg-mist py-20 lg:py-24">
          <Container>
            <h3 className="font-display text-3xl font-bold text-ink">Keep reading</h3>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-steel/70 bg-white transition duration-500 hover:-translate-y-1 hover:border-amber/40 hover:shadow-float"
                >
                  <SmartImage
                    url={r.coverUrl}
                    label={r.coverLabel}
                    aspectRatio="video"
                    variant={i % 2 === 0 ? "default" : "dark"}
                    rounded={false}
                    className="transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    {r.category && (
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-dark">
                        {r.category.name}
                      </p>
                    )}
                    <h4 className="mt-3 line-clamp-2 text-lg font-bold leading-snug text-ink">
                      {r.title}
                    </h4>
                    <div className="mt-auto flex items-center justify-between pt-4 text-sm text-ink-muted">
                      <span>{r.publishedAt ? formatDate(r.publishedAt) : ""}</span>
                      <ArrowUpRight className="h-4 w-4 text-ink transition group-hover:text-amber" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
