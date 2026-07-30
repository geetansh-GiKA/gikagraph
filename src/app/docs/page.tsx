"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Newspaper } from "lucide-react";
import { blogPosts } from "./data/blogData";
import Badge from "@/components/badge";
import SlideEffect from "@/components/slide-effect";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function DocsPage() {
  const filteredPosts = useMemo(
    () =>
      [...blogPosts].sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      ),
    [],
  );

  const [featuredPost, ...restPosts] = filteredPosts;

  return (
    <div className="px-4 xl:px-0 max-w-6xl mx-auto py-8 md:py-12">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-5">
        <SlideEffect>
          <Badge text="Blog" Icon={Newspaper} />
        </SlideEffect>

        <SlideEffect
          direction="top"
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-3xl mx-auto"
        >
          Insights on reasoning-first AI
        </SlideEffect>

        <SlideEffect
          delay={0.1}
          className="px-2 sm:px-10 md:px-0 w-full md:max-w-xl mx-auto text-sm lg:text-base text-muted-foreground"
        >
          Perspectives on knowledge graphs, entity-aware reasoning, and how
          GiKA is redefining strategic decision-making for the enterprise.
        </SlideEffect>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-border/60 bg-card p-10 text-center text-muted-foreground">
          No posts in this category yet.
        </div>
      ) : (
        <>
          {/* Featured post */}
          <Link
            href={`/docs/${featuredPost.slug}`}
            className="group mt-8 grid overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition-shadow hover:shadow-md lg:grid-cols-2"
          >
            <div className="relative min-h-[240px] lg:min-h-[320px] overflow-hidden">
              {featuredPost.coverImage && (
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              )}
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="inline-flex items-center rounded-full bg-[image:linear-gradient(135deg,#e5d3ec,#c9a8d4,white,#e5d3ec)] bg-[length:250%_250%] px-3 py-1 font-semibold tracking-wide text-foreground/90 uppercase shadow-sm">
                  {featuredPost.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="size-3.5" />
                  {formatDate(featuredPost.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="size-3.5" />
                  {featuredPost.readTime} min read
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground leading-snug transition-colors group-hover:text-muted-foreground">
                {featuredPost.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>
            </div>
          </Link>

          {/* Post grid */}
          {restPosts.length > 0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {restPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/docs/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {post.coverImage && (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div className="flex flex-wrap items-center gap-2.5 text-xs">
                      <span className="inline-flex items-center rounded-full bg-[image:linear-gradient(135deg,#e5d3ec,#c9a8d4,white,#e5d3ec)] bg-[length:250%_250%] px-2.5 py-1 font-semibold tracking-wide text-foreground/90 uppercase shadow-sm">
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <Clock className="size-3.5" />
                        {post.readTime} min
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground leading-snug transition-colors group-hover:text-muted-foreground line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-1.5 pt-2 text-xs text-muted-foreground">
                      <Calendar className="size-3.5" />
                      {formatDate(post.publishedAt)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
