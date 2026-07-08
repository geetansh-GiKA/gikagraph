"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SlideEffect from "@/components/slide-effect";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import { Search, ArrowRight, Clock, BookOpen } from "lucide-react";
import { blogPosts, categories } from "@/app/blog/data/blogData";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const regularPosts = blogPosts.filter((post) => !post.featured);

  const filteredPosts = regularPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.categorySlug === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="px-4 xl:px-0 max-w-5xl mx-auto space-y-12 sm:space-y-16">
        <Navbar />

        {/* Hero Section */}
        <section className="relative space-y-6 text-center -mt-10">
          <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full bg-primary/8 blur-[90px] -z-10" />

          <SlideEffect>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-[11px] uppercase tracking-[0.18em] text-primary font-medium">
              <BookOpen className="w-3 h-3" />
              Insights & Articles
            </div>
          </SlideEffect>

          <SlideEffect>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60 leading-tight">
              The GiKA Blog
            </h1>
          </SlideEffect>

          <SlideEffect className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Discover the latest insights on AI, entity intelligence, and how
            data transforms into actionable decisions.
          </SlideEffect>

          {/* Search + Category pills */}
          <SlideEffect className="space-y-4">
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-5 py-2.5 rounded-full bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
            </div>

            {/* Category pills */}
            <div className="flex items-center justify-center flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all border ${
                    selectedCategory === category.slug
                      ? "bg-primary text-primary-foreground border-transparent shadow-md shadow-primary/20"
                      : "bg-muted/50 text-muted-foreground border-border hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </SlideEffect>
        </section>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <SlideEffect
              key={post.id}
              direction={
                index % 3 === 0 ? "right" : index % 3 === 2 ? "left" : "top"
              }
              duration={0.7 + index * 0.1}
              isSpring={false}
            >
              <div className="h-full rounded-2xl overflow-hidden border border-border/60 bg-card group hover:shadow-xl hover:shadow-black/10 hover:border-border transition-all duration-300 flex flex-col">
                {/* Image */}
                <Link href={`/blog/${post.slug}`} className="block shrink-0">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 340px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground text-[10px] font-semibold tracking-wide">
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[10px] text-white/80 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      <Clock className="w-2.5 h-2.5" />
                      {post.readTime} min read
                    </div>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block group/title"
                  >
                    <h3 className="text-base font-semibold text-foreground line-clamp-2 group-hover/title:text-primary transition-colors leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-muted-foreground line-clamp-3 flex-1 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Date + Read link */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/60">
                    <p className="text-xs text-muted-foreground">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[10px] text-primary font-medium flex items-center gap-0.5 hover:gap-1.5 transition-all"
                    >
                      Read <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* CTA */}
                  {post.cta && (
                    <Link
                      href={post.cta.href}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-0.5 inline-flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary text-xs font-semibold transition-all"
                    >
                      {post.cta.label}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </SlideEffect>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <SlideEffect>
            <div className="text-center py-20 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto">
                <Search className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-base">
                No articles found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </SlideEffect>
        )}
      </div>
    </>
  );
}
