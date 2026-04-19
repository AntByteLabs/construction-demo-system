import Link from "next/link";
import {
  Plus,
  ArrowUpRight,
  CircleDot,
  Clock,
  Building2,
} from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function DashboardPage() {
  const [
    serviceCount,
    teamCount,
    projectCount,
    postCount,
    inquiryCount,
    mediaCount,
    unreadInquiries,
    latestInquiries,
    latestPosts,
    latestProjects,
  ] = await Promise.all([
    prisma.service.count(),
    prisma.teamMember.count(),
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.contactInquiry.count(),
    prisma.media.count(),
    prisma.contactInquiry.count({ where: { isRead: false } }),
    prisma.contactInquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.blogPost.findMany({
      orderBy: { updatedAt: "desc" },
      take: 4,
      include: { category: true },
    }),
    prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
      take: 4,
    }),
  ]);

  const stats = [
    { title: "Services", value: serviceCount, iconName: "Hammer" as const, href: "/admin/services", accent: "ink" as const, trend: "All active" },
    { title: "Team Members", value: teamCount, iconName: "Users" as const, href: "/admin/team", accent: "amber" as const, trend: "+2 this quarter" },
    { title: "Projects", value: projectCount, iconName: "Building2" as const, href: "/admin/projects", accent: "azure" as const, trend: "5 featured" },
    { title: "Blog Posts", value: postCount, iconName: "FileText" as const, href: "/admin/blog", accent: "emerald" as const, trend: "3 drafts" },
    { title: "Inquiries", value: inquiryCount, iconName: "Mail" as const, href: "/admin/inquiries", accent: "amber" as const, trend: `${unreadInquiries} unread` },
    { title: "Media Assets", value: mediaCount, iconName: "Image" as const, href: "/admin/media", accent: "ink" as const, trend: "Library ready" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink via-ink-soft to-slate-900 p-8 text-white sm:p-12">
        <div className="pointer-events-none absolute inset-0 hero-grid-bg opacity-[0.06]" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber/20 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber">
              <CircleDot className="h-3 w-3" />
              System healthy
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              Welcome back, Demo Admin.
            </h2>
            <p className="mt-3 max-w-xl text-white/70">
              You have {unreadInquiries} unread {unreadInquiries === 1 ? "inquiry" : "inquiries"}. Everything else is up to date.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-white"
            >
              <Plus className="h-4 w-4" /> New post
            </Link>
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-amber hover:bg-amber/10"
            >
              <Plus className="h-4 w-4" /> New project
            </Link>
          </div>
        </div>
      </section>

      {/* Stats grid */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s, i) => (
          <StatCard key={s.title} {...s} index={i} />
        ))}
      </section>

      {/* Recent activity */}
      <section className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-steel/70 bg-white p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-ink">Recent inquiries</h3>
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-dark hover:text-ink"
            >
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <ul className="mt-5 divide-y divide-steel/80">
            {latestInquiries.length === 0 && (
              <li className="py-8 text-center text-sm text-ink-muted">
                No inquiries yet.
              </li>
            )}
            {latestInquiries.map((inq) => (
              <li key={inq.id} className="flex items-start gap-4 py-4">
                <span className="mt-1 flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                  <span
                    className={`h-2 w-2 rounded-full ${inq.isRead ? "bg-steel" : "bg-amber animate-pulse"}`}
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <p className="text-sm font-semibold text-ink">{inq.name}</p>
                    <span className="text-xs text-ink-muted">
                      &middot; {inq.email}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm font-medium text-ink">
                    {inq.subject}
                  </p>
                  <p className="mt-1 line-clamp-1 text-sm text-ink-muted">
                    {inq.message}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 shrink-0 text-xs text-ink-muted">
                  <Clock className="h-3 w-3" />
                  {formatDate(inq.createdAt, { month: "short", day: "numeric" })}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-steel/70 bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink">Latest posts</h3>
              <Link
                href="/admin/blog"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-dark hover:text-ink"
              >
                Manage <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <ul className="mt-5 space-y-3">
              {latestPosts.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/admin/blog/${p.id}`}
                    className="group flex items-start gap-3 rounded-xl p-2 -mx-2 transition hover:bg-mist"
                  >
                    <span
                      className={`mt-1.5 inline-flex h-2 w-2 shrink-0 rounded-full ${p.status === "published" ? "bg-emerald-500" : "bg-amber"}`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">
                        {p.title}
                      </p>
                      <p className="mt-0.5 text-[11px] uppercase tracking-wider text-ink-muted">
                        {p.status} {p.category?.name ? `· ${p.category.name}` : ""}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-steel/70 bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink">Recent projects</h3>
              <Link
                href="/admin/projects"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-dark hover:text-ink"
              >
                Manage <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <ul className="mt-5 space-y-3">
              {latestProjects.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/admin/projects/${p.id}`}
                    className="group flex items-center gap-3 rounded-xl p-2 -mx-2 transition hover:bg-mist"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone text-ink">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">
                        {p.title}
                      </p>
                      <p className="text-[11px] text-ink-muted">
                        {p.category} &middot; {p.location}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
