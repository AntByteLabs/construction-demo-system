"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoStatic } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({
  logoUrl,
  companyName,
  phone,
}: {
  logoUrl?: string | null;
  companyName?: string;
  phone?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const phoneNum = phone ?? "+15551234567";
  const phoneDisplay = phone ?? "(913) 297-3000";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-cream-soft/95 backdrop-blur-md border-b border-ink/5 shadow-[0_1px_0_rgba(23,21,18,0.04)]"
            : "bg-cream-soft border-b border-transparent"
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <LogoStatic logoUrl={logoUrl} companyName={companyName} />

          <nav className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3.5 py-2 text-[13px] font-semibold transition",
                    active ? "text-ink" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3.5 -bottom-[2px] h-[2px] rounded-full bg-orange"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${phoneNum.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-orange-dark"
            >
              <Phone className="h-4 w-4 text-orange" />
              {phoneDisplay}
            </a>
            <Button href="/contact" variant="dark" size="sm">
              Get a Quote
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-ink/15 bg-white text-ink lg:hidden"
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col bg-cream-soft lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-5">
              <LogoStatic logoUrl={logoUrl} companyName={companyName} />
              <button
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-stone text-ink"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col px-5 py-4">
              {nav.map((item, idx) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 + 0.08 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between border-b border-ink/10 py-3.5 text-base font-semibold transition",
                        active ? "text-orange-dark" : "text-ink hover:text-orange-dark"
                      )}
                    >
                      {item.label}
                      <ArrowRight className="h-4 w-4 opacity-40" />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <div className="mt-auto border-t border-ink/10 p-5">
              <Button href="/contact" variant="dark" size="md" className="w-full">
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </Button>
              <a
                href={`tel:${phoneNum.replace(/[^0-9+]/g, "")}`}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-ink/20 px-4 py-2.5 text-sm font-semibold text-ink"
              >
                <Phone className="h-4 w-4 text-orange" />
                {phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
