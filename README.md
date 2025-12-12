'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/sections/footer'
import SlideEffect from '@/components/slide-effect'
import FadeEffect from '@/components/fade-effect'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { getBlogPostBySlug, blogPosts, type BlogPost } from '@/data/blogData'
import ReactMarkdown from 'react-markdown'

export default function BlogDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<BlogPost | undefined>(undefined)

  useEffect(() => {
    const blogPost = getBlogPostBySlug(slug)
    setPost(blogPost)
  }, [slug])

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center space-y-4">
            <h1 className="text-2xl md:text-3xl font-medium">Blog post not found</h1>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all posts
            </Link>
          </div>
        </main>
        <div className="mt-16 px-4 xl:px-0 max-w-5xl mx-auto w-full">
          <Footer />
        </div>
      </div>
    )
  }

  // Related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.categorySlug === post.categorySlug && p.id !== post.id)
    .slice(0, 3)

  return (
    <>
      <Navbar />

      <main className="px-4 xl:px-0 max-w-5xl mx-auto pt-6 pb-24 space-y-10 sm:space-y-14 md:space-y-20">
        {/* Back link */}
        <SlideEffect>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-foreground/60 hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to all articles
          </Link>
        </SlideEffect>

        {/* Hero Card */}
        <section>
          <SlideEffect>
            <div className="overflow-hidden rounded-3xl border border-border bg-secondary/70 backdrop-blur-sm shadow-sm">
              <div className="grid gap-6 lg:gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.4fr)] items-stretch">
                {/* Left: text/meta */}
                <div className="p-6 sm:p-8 lg:p-10 flex flex-col gap-6 justify-between">
                  <div className="space-y-4">
                    {/* Category + meta row */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary text-black text-xs font-semibold tracking-wide uppercase">
                        {post.category}
                      </span>

                      <div className="flex items-center gap-4 text-xs sm:text-sm text-foreground/70">
                        <div className="inline-flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <span className="hidden sm:inline text-foreground/40">•</span>
                        <div className="inline-flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-foreground leading-tight tracking-tight">
                      {post.title}
                    </h1>

                    {/* Excerpt */}
                    <p className="text-sm sm:text-base md:text-lg text-foreground/75 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Author compact row */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border/60">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={44}
                      height={44}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{post.author.name}</p>
                      <p className="text-xs text-foreground/60">{post.author.role}</p>
                    </div>
                  </div>
                </div>

                {/* Right: cover image */}
                <div className="relative h-56 sm:h-72 lg:h-full min-h-[260px]">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover"
                  />
                  {/* Gradient overlay bottom for nice fade */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-background/0 to-transparent" />
                </div>
              </div>
            </div>
          </SlideEffect>
        </section>

        {/* Main Article + Author Card */}
        <section className="grid gap-10 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)]">
          {/* Article content */}
          <FadeEffect>
            <article
              className="rounded-3xl border border-border bg-background/80 shadow-sm px-5 py-6 sm:px-8 sm:py-10
              "
            >
              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-medium prose-headings:text-foreground
                  prose-p:text-foreground/80 prose-p:leading-relaxed
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-ul:text-foreground/80 prose-ol:text-foreground/80
                  prose-li:marker:text-primary
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                  prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-2xl
                  prose-blockquote:border-l-primary prose-blockquote:text-foreground/70
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                "
              >
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </article>
          </FadeEffect>

          {/* Sidebar: Author card + small meta recap */}
          <FadeEffect>
            <aside className="space-y-6">
              {/* Author card */}
              {/* <div className="rounded-3xl border border-border bg-secondary/70 backdrop-blur-sm p-6 sm:p-7 space-y-4">
                <div className="flex gap-4 items-start">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={70}
                    height={70}
                    className="rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-[0.16em] text-foreground/50 mb-1">
                      Written by
                    </p>
                    <h3 className="text-lg font-medium text-foreground truncate">
                      {post.author.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-primary mb-2">{post.author.role}</p>
                    <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed line-clamp-5">
                      {post.author.bio}
                    </p>
                  </div>
                </div>
              </div> */}

              {/* Quick facts */}
              {/* <div className="rounded-3xl border border-border bg-muted/70 p-5 space-y-4">
                <p className="text-xs uppercase tracking-[0.16em] text-foreground/50">
                  Article details
                </p>
                <div className="space-y-3 text-sm text-foreground/80">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-foreground/60" />
                    <span>
                      Published on{' '}
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-foreground/60" />
                    <span>Estimated {post.readTime} minute read</span>
                  </div>
                  <div>
                    <span className="text-xs text-foreground/60">Category</span>
                    <p className="text-sm font-medium">{post.category}</p>
                  </div>
                </div>
              </div> */}
            </aside>
          </FadeEffect>
        </section>

        {/* Related Posts */}
        {/* {relatedPosts.length > 0 && (
          <section className="space-y-6 sm:space-y-8">
            <SlideEffect>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground">
                  Related articles
                </h2>
                <Link
                  href="/blog"
                  className="text-xs sm:text-sm text-foreground/60 hover:text-primary transition-colors"
                >
                  View all
                </Link>
              </div>
            </SlideEffect>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <SlideEffect
                  key={relatedPost.id}
                  direction="top"
                  duration={0.6 + index * 0.08}
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="h-full rounded-2xl overflow-hidden bg-secondary group cursor-pointer border border-border/80 hover:border-primary/40 hover:shadow-lg transition-all">
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={relatedPost.coverImage}
                          alt={relatedPost.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/70 to-transparent" />
                      </div>
                      <div className="p-4 sm:p-5 space-y-3">
                        <span className="text-xs font-medium text-primary uppercase tracking-[0.16em]">
                          {relatedPost.category}
                        </span>
                        <h3 className="text-sm sm:text-base font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-foreground/60">
                          <span>{relatedPost.readTime} min read</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SlideEffect>
              ))}
            </div>
          </section>
        )} */}
      </main>

      <div className="px-4 xl:px-0 max-w-5xl mx-auto mt-10 md:mt-16">
        <Footer />
      </div>
    </>
  )
}
