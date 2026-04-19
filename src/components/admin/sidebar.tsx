"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  LayoutTemplate,
  Hammer,
  Users,
  Building2,
  FileText,
  MessageSquareQuote,
  HelpCircle,
  Mail,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { LogoStatic } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    label: "Pages",
    items: [
      { label: "Homepage", href: "/admin/homepage", icon: LayoutTemplate },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Services", href: "/admin/services", icon: Hammer },
      { label: "Team", href: "/admin/team", icon: Users },
      { label: "Projects", href: "/admin/projects", icon: Building2 },
      { label: "Blog Posts", href: "/admin/blog", icon: FileText },
      { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
      { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
    ],
  },
  {
    label: "Engagement",
    items: [
      { label: "Inquiries", href: "/admin/inquiries", icon: Mail },
      { label: "Media Library", href: "/admin/media", icon: ImageIcon },
    ],
  },
  {
    label: "System",
    items: [{ label: "Settings", href: "/admin/settings", icon: Settings }],
  },
];

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/5 px-6 py-6">
        <LogoStatic light />
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber">
          Admin Console
        </p>
      </div>

      <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6 scrollbar-thin">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
              {group.label}
            </p>
            <ul className="mt-3 space-y-1">
              {group.items.map((item) => {
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                        active
                          ? "bg-amber text-ink"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-4 w-4 shrink-0 transition",
                          active ? "text-ink" : "text-white/50 group-hover:text-amber"
                        )}
                      />
                      {item.label}
                      {active && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-ink" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="space-y-2 border-t border-white/5 px-4 py-5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="h-4 w-4 text-white/50" />
          View public site
        </Link>
        <form action="/api/admin/logout" method="post">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut className="h-4 w-4 text-white/50" />
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 overflow-hidden bg-ink text-white lg:flex lg:flex-col">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-white lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-ink text-white lg:hidden"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute right-3 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <SidebarContent pathname={pathname} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
