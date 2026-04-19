"use client";
import { usePathname } from "next/navigation";
import { Search, Bell, ChevronRight } from "lucide-react";

const titles: Record<string, { title: string; description: string; crumb: string }> = {
  "/admin": {
    title: "Dashboard",
    description: "Overview of your site content and activity.",
    crumb: "Dashboard",
  },
  "/admin/services": {
    title: "Services",
    description: "Manage the services displayed on your public website.",
    crumb: "Services",
  },
  "/admin/team": {
    title: "Team Members",
    description: "Manage bios, photos, and social links.",
    crumb: "Team",
  },
  "/admin/projects": {
    title: "Projects",
    description: "Manage your portfolio and case studies.",
    crumb: "Projects",
  },
  "/admin/blog": {
    title: "Blog Posts",
    description: "Compose, edit, and publish articles.",
    crumb: "Blog",
  },
  "/admin/inquiries": {
    title: "Inquiries",
    description: "Messages received via the contact form.",
    crumb: "Inquiries",
  },
  "/admin/media": {
    title: "Media Library",
    description: "Upload and manage images and assets.",
    crumb: "Media",
  },
  "/admin/settings": {
    title: "Settings",
    description: "Company info, SEO, social links, and branding.",
    crumb: "Settings",
  },
};

export function AdminTopbar() {
  const pathname = usePathname();
  const match = titles[pathname] ??
    Object.entries(titles).find(([k]) => k !== "/admin" && pathname.startsWith(k))?.[1] ?? {
      title: "Admin",
      description: "",
      crumb: "Admin",
    };

  return (
    <header className="sticky top-0 z-20 border-b border-steel/80 bg-white/80 backdrop-blur-xl">
      <div className="flex h-20 items-center gap-4 px-6 pl-20 lg:pl-8">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-xs text-ink-muted">
            <span>Admin</span>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-ink">{match.crumb}</span>
          </div>
          <h1 className="mt-0.5 truncate font-display text-xl font-bold text-ink sm:text-2xl">
            {match.title}
          </h1>
        </div>
        <div className="relative hidden w-72 md:block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            placeholder="Search..."
            className="w-full rounded-full border border-steel bg-white py-2 pl-10 pr-4 text-sm outline-none transition focus:border-amber focus:ring-4 focus:ring-amber/20"
          />
        </div>
        <button
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-steel bg-white text-ink transition hover:border-amber"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber" />
        </button>
        <div className="hidden items-center gap-3 rounded-full bg-stone px-3 py-1.5 sm:inline-flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[12px] font-bold text-amber">
            DA
          </div>
          <div className="pr-1">
            <p className="text-xs font-semibold text-ink">Demo Admin</p>
            <p className="text-[10px] text-ink-muted">admin@antbytelabs.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
