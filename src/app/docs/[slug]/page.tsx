"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { getBlogPostBySlug, type BlogPost } from "@/app/docs/data/blogData";
import { Button } from "@/components/ui/button";
import MarkdownContent from "@/app/docs/components/markdown-content";

export default function DocPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | undefined>(undefined);

  useEffect(() => {
    setPost(getBlogPostBySlug(slug));
  }, [slug]);

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
          <Link href="/docs">
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to docs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article key={slug} className="min-w-0 space-y-6">
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="size-3.5" />
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-3.5" />
          {post.readTime} min read
        </span>
      </div>

      <h1 className="text-2xl md:text-4xl font-semibold tracking-tight text-foreground leading-tight">
        {post.title}
      </h1>

      <MarkdownContent content={post.content} />
    </article>
  );
}
