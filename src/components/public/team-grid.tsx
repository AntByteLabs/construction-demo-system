"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Linkedin, Twitter, Facebook, Mail } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import type { TeamMember } from "@prisma/client";

export function TeamGrid({ members }: { members: TeamMember[] }) {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const roleGroups = useMemo(() => {
    const groups: Record<string, string[]> = {
      All: [],
      Leadership: ["CEO", "COO", "Founder"],
      Design: ["Architect", "Design"],
      Engineering: ["Engineer", "Engineering"],
      Operations: ["Operations", "Construction", "Head"],
      "Client Success": ["Client", "Sustainability"],
    };
    return groups;
  }, []);

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const matchQuery =
        !query ||
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.role.toLowerCase().includes(query.toLowerCase()) ||
        m.bio.toLowerCase().includes(query.toLowerCase());
      const keywords = roleGroups[roleFilter] ?? [];
      const matchRole =
        roleFilter === "All" ||
        keywords.some((k) => m.role.toLowerCase().includes(k.toLowerCase()));
      return matchQuery && matchRole;
    });
  }, [members, query, roleFilter, roleGroups]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {Object.keys(roleGroups).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                roleFilter === r ? "text-white" : "text-ink-muted hover:text-ink"
              }`}
            >
              {roleFilter === r && (
                <motion.span
                  layoutId="role-pill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{r}</span>
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-80">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, role, or bio"
            className="w-full rounded-full border border-steel bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-amber focus:ring-4 focus:ring-amber/20"
          />
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((m, i) => (
            <motion.article
              key={m.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.55,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group overflow-hidden rounded-3xl border border-steel/70 bg-white p-3 transition duration-500 hover:-translate-y-1 hover:shadow-float"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <SmartImage
                  url={m.photoUrl}
                  label={m.photoLabel}
                  aspectRatio="portrait"
                  variant={i % 3 === 0 ? "default" : i % 3 === 1 ? "dark" : "mesh"}
                  rounded={false}
                  className="transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3 opacity-0 transition duration-500 group-hover:opacity-100">
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${m.name} LinkedIn`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink hover:bg-amber"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {m.twitter && (
                    <a
                      href={m.twitter}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${m.name} Twitter`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink hover:bg-amber"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                  {m.facebook && (
                    <a
                      href={m.facebook}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${m.name} Facebook`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink hover:bg-amber"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                  )}
                  {m.email && (
                    <a
                      href={`mailto:${m.email}`}
                      aria-label={`Email ${m.name}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink hover:bg-amber"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
              <div className="px-3 pb-3 pt-5">
                <p className="text-base font-bold text-ink">{m.name}</p>
                <p className="mt-1 text-sm text-amber-dark">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted line-clamp-3">
                  {m.bio}
                </p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 rounded-3xl border border-dashed border-steel bg-mist py-20 text-center">
          <p className="text-base font-semibold text-ink">No team members match your search.</p>
        </div>
      )}
    </div>
  );
}
