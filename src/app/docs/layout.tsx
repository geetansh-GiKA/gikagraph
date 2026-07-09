"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlignJustify, Search, X } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { blogPosts } from "./data/blogData";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return blogPosts;
    return blogPosts.filter((post) => post.title.toLowerCase().includes(q));
  }, [query]);

  const searchInput = (
    <div className="relative mb-3">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search docs..."
        className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-foreground/40"
      />
    </div>
  );

  const NavList = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="space-y-2">
      {filteredPosts.length === 0 && (
        <p className="px-1 py-4 text-sm text-muted-foreground">
          No docs found.
        </p>
      )}
      {filteredPosts.map((post) => {
        const i = blogPosts.indexOf(post);
        const href = `/docs/${post.slug}`;
        const isActive = pathname === href;
        return (
          <Link
            key={post.slug}
            href={href}
            onClick={onNavigate}
            className={`group block rounded-xl border p-3  bg-[length:250%_250%] transition-[background-position,transform] duration-700 ease-out hover:-translate-y-0.5 ${
              isActive
                ? "border-border bg-[image:linear-gradient(to_bottom_right,theme(colors.white),theme(colors.white)_50%,#c9a8d4,theme(colors.white),#c9a8d4)] bg-[position:100%_100%] dark:bg-input/30"
                : "border-border/60 hover:border-border bg-transparent"
            }`}
          >
            <div className="flex items-start gap-2">
              <span
                className={`font-mono text-[11px] pt-0.5 shrink-0 ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground/60 group-hover:text-muted-foreground"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className={`text-sm leading-snug transition-colors ${
                  isActive
                    ? "text-foreground font-medium"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {post.title}
              </p>
            </div>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <div className="h-1"></div>
      <div className="pointer-events-none fixed inset-0 bg-grid -z-10" />
      <Navbar pill />

      <div className="px-4 xl:px-0 max-w-6xl mx-auto py-8 md:py-12 relative">
        {/* Mobile nav toggle */}
        <div className="mb-4 lg:hidden">
          <button
            type="button"
            onClick={() => setIsNavOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-lg border border-border/60 px-3 py-2 text-sm text-foreground"
          >
            {isNavOpen ? (
              <X className="size-4" />
            ) : (
              <AlignJustify className="size-4" />
            )}
            Docs menu
          </button>
          {isNavOpen && (
            <div className="mt-2 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm p-3">
              {searchInput}
              <NavList onNavigate={() => setIsNavOpen(false)} />
            </div>
          )}
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-10 lg:items-start">
          {/* Center content — panel is pinned; only its content scrolls */}
          <main className="no-scrollbar min-w-0 rounded-2xl border border-border/60 bg-card p-6 md:p-8 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto">
            {children}
          </main>

          {/* Right sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              {searchInput}
              <NavList />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
