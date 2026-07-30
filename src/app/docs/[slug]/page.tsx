"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Link2, Twitter, Linkedin } from "lucide-react";
import {
  blogPosts,
  getBlogPostBySlug,
  type BlogPost,
} from "@/app/docs/data/blogData";
import { Button } from "@/components/ui/button";
import MarkdownContent from "@/app/docs/components/markdown-content";

function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function getTocItems(content: string) {
  return content
    .trim()
    .split("\n")
    .filter((line) => line.trim().startsWith("## "))
    .map((line) => {
      const text = line.trim().slice(3);
      return { text, id: createSlug(text) };
    });
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function DocPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPost(getBlogPostBySlug(slug));
    setCopied(false);
  }, [slug]);

  const toc = useMemo(() => (post ? getTocItems(post.content) : []), [post]);

  const moreToRead = useMemo(
    () => blogPosts.filter((p) => p.slug !== slug).slice(0, 2),
    [slug],
  );

  if (!post) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-medium text-foreground">
            Doc not found
          </h1>
          <p className="text-sm text-muted-foreground">
            The article you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>
      </div>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = async () => {
    if (typeof window === "undefined") return;
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-4 xl:px-0 max-w-6xl mx-auto py-8 md:py-12">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-32 h-72 w-72 rounded-full bg-[radial-gradient(circle,#c9a8d4,transparent_70%)] opacity-40 blur-3xl"
        />
        <div className="relative grid lg:grid-cols-2">
          <div className="flex flex-col justify-center p-6 md:p-10 gap-6">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="inline-flex items-center rounded-full bg-[image:linear-gradient(135deg,#e5d3ec,#c9a8d4,white,#e5d3ec)] bg-[length:250%_250%] px-3 py-1 font-semibold tracking-wide text-foreground/90 uppercase shadow-sm">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="size-3.5" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="size-3.5" />
                  {post.readTime} min read
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter text-foreground leading-[1.08]">
                {post.title}
              </h1>

              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </div>

          {post.coverImage && (
            <div className="relative min-h-[240px] lg:min-h-0 overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent lg:bg-gradient-to-l" />
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="mt-10 grid lg:grid-cols-[320px_1fr] gap-10 items-start">
        <aside className="space-y-6 lg:sticky lg:top-24 lg:order-1">
          {/* In this article */}
          {toc.length > 0 && (
            <div className="rounded-2xl border border-border/60 bg-card p-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-foreground">
                Table of Contents
              </p>
              <div className="mx-auto mb-4 mt-2 h-px w-8 bg-foreground/30" />

              <nav className="space-y-3">
                {toc.map((item, i) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="group flex items-center gap-x-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    <span className="truncate leading-snug">{item.text}</span>
                    <span
                      aria-hidden
                      className="min-w-[0.75rem] flex-1 border-b border-dotted border-foreground/30"
                    />
                    <span className="font-serif text-foreground/70">
                      {i + 1}
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* Share article */}
          <div className="rounded-2xl border border-border/60 bg-card p-5 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-foreground">
              Share article
            </p>
            <div className="mx-auto mb-4 mt-2 h-px w-8 bg-foreground/30" />
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/60 py-2 text-sm text-foreground transition-colors hover:bg-muted"
              >
                <Twitter className="size-4" />
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/60 py-2 text-sm text-foreground transition-colors hover:bg-muted"
              >
                <Linkedin className="size-4" />
                LinkedIn
              </a>
              <button
                type="button"
                onClick={handleCopyLink}
                className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl border border-border/60 py-2 text-sm text-foreground transition-colors hover:bg-muted"
              >
                <Link2 className="size-4" />
                {copied ? "Copied!" : "Copy link"}
              </button>
            </div>
          </div>

          {/* More to read */}
          {moreToRead.length > 0 && (
            <div className="rounded-2xl border border-border/60 bg-card p-5 ">
              <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-foreground">
                More to read
              </p>
              <div className="mx-auto mb-4 mt-2 h-px w-8 bg-foreground/30" />
              <div className="space-y-3">
                {moreToRead.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/docs/${p.slug}`}
                    className="group flex items-center gap-3"
                  >
                    <div className="relative size-12 flex-shrink-0 overflow-hidden rounded-lg border border-border/60 bg-muted">
                      {p.coverImage && (
                        <Image
                          src={p.coverImage}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-sm leading-snug text-foreground transition-colors group-hover:text-muted-foreground">
                        {p.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>

        <article
          key={slug}
          className="min-w-0 rounded-2xl border border-border/60 bg-card p-6 md:p-8 lg:order-2"
        >
          <MarkdownContent content={post.content} />
        </article>
      </div>
    </div>
  );
}
