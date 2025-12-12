'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/sections/footer'
import SlideEffect from '@/components/slide-effect'
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, ChevronRight, Hash, ArrowUpRight, Sparkles, Check } from 'lucide-react'
import { getBlogPostBySlug, blogPosts, type BlogPost } from '@/app/blog/data/blogData'
import { Button } from '@/components/ui/button'
import MarkdownContent from '@/app/blog/components/markdown-content'



export default function BlogDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<BlogPost | undefined>(undefined)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    const blogPost = getBlogPostBySlug(slug)
    setPost(blogPost)
  }, [slug])

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isCopied])

  if (!post) {
    return (
      <div className="px-4 xl:px-0 max-w-5xl mx-auto space-y-20 sm:space-y-24 md:space-y-32 lg:space-y-40 scroll-smooth">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 -mt-32">
          <SlideEffect>
            <div className="text-center space-y-6">
              <h1 className="text-2xl md:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60">
                Blog post not found
              </h1>
              <p className="text-foreground/60">The article you&apos;re looking for doesn&apos;t exist or has been moved.</p>
              <Link href="/blog">
                <Button className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to all posts
                </Button>
              </Link>
            </div>
          </SlideEffect>
        </main>
        <Footer />
      </div>
    )
  }

  // Related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.categorySlug === post.categorySlug && p.id !== post.id)
    .slice(0, 3)

  // Extract table of contents from content (h2 headings)
  const tableOfContents = post.content
    .split('\n')
    .filter(line => line.trim().startsWith('## '))
    .map(line => {
      const text = line.replace('## ', '').trim()
      const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
      return { text, id }
    })

  // Share handlers
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = post.title

  const handleShareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank')
  }

  const handleShareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setIsCopied(true)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = shareUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setIsCopied(true)
    }
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Get other posts for "More to read" section
  const morePosts = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3)

  return (
    <div key={slug} className="px-4 xl:px-0 max-w-5xl mx-auto space-y-12 sm:space-y-16 md:space-y-20 scroll-smooth">
      <Navbar />

      {/* Breadcrumb */}
      <SlideEffect className="-mt-16">
        <nav className="flex items-center gap-2 text-sm text-foreground/60">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
        </nav>
      </SlideEffect>

      {/* Hero Section */}
      <section className="-mt-8">

          <div className="overflow-hidden rounded-3xl border border-border bg-secondary/50 backdrop-blur-sm">
            <div className="grid gap-0 lg:grid-cols-[1.5fr_1fr] items-stretch">
              {/* Left: Content */}
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col gap-6 justify-between order-2 lg:order-1">
                <div className="space-y-5">
                  {/* Category + Meta */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-4 py-1.5 rounded-full bg-primary text-black text-xs font-semibold tracking-wide uppercase">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-4 text-xs sm:text-sm text-foreground/60">
                      <div className="inline-flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <span className="text-foreground/30">•</span>
                      <div className="inline-flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70 leading-tight tracking-tight">
                    {post.title}
                  </h1>

                  {/* Excerpt */}
                  <p className="text-sm sm:text-base md:text-lg text-foreground/70 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Author + Actions */}
                <div className="flex items-center justify-between gap-4 pt-5 border-t border-border/50">
                  <div className="flex items-center gap-4">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={48}
                      height={48}
                      className="rounded-full ring-2 ring-border"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{post.author.name}</p>
                      <p className="text-xs text-foreground/60">{post.author.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full hover:bg-muted transition-colors" title="Share">
                      <Share2 className="w-4 h-4 text-foreground/60" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-muted transition-colors" title="Bookmark">
                      <Bookmark className="w-4 h-4 text-foreground/60" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Cover Image */}
              <div className="relative h-64 sm:h-80 lg:h-full min-h-[300px] order-1 lg:order-2">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-secondary/80 via-transparent to-transparent lg:block hidden" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent lg:hidden" />
              </div>
            </div>
          </div>
      </section>


      {/* Main Content */}
      <article className="grid lg:grid-cols-[1fr_300px] gap-10 lg:gap-12">
        {/* Article Body - No animation, visible immediately */}
        <div className="rounded-2xl bg-secondary/30 border border-border/50 p-6 sm:p-8 lg:p-10">
          <MarkdownContent key={slug} content={post.content} />
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
          {/* Table of Contents */}
          {tableOfContents.length > 0 && (
            <SlideEffect direction="right">
              <div className="rounded-2xl bg-secondary/50 border border-border p-5 space-y-4">
                <p className="text-xs uppercase tracking-wider text-foreground/50 font-medium flex items-center gap-2">
                  <Hash className="w-3.5 h-3.5" />
                  In this article
                </p>
                <nav className="space-y-2">
                  {tableOfContents.map((heading, index) => (
                    <button 
                      key={index}
                      onClick={() => scrollToSection(heading.id)}
                      className="w-full text-left text-sm text-foreground/70 hover:text-primary transition-colors cursor-pointer flex items-start gap-2 group"
                    >
                      <span className="text-foreground/30 group-hover:text-primary/50 text-xs mt-0.5">{String(index + 1).padStart(2, '0')}</span>
                      <span className="leading-snug">{heading.text}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </SlideEffect>
          )}

          {/* Author Card */}
          <SlideEffect direction="right" delay={0.1}>
            <div className="rounded-2xl bg-secondary/50 border border-border p-5 space-y-4">
              <p className="text-xs uppercase tracking-wider text-foreground/50 font-medium">Written by</p>
              <div className="flex items-center gap-3">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="rounded-full ring-2 ring-border"
                />
                <div>
                  <p className="font-medium text-foreground text-sm">{post.author.name}</p>
                  <p className="text-xs text-foreground/60">{post.author.role}</p>
                </div>
              </div>
              <p className="text-xs text-foreground/60 leading-relaxed">{post.author.bio}</p>
            </div>
          </SlideEffect>

          {/* Share Card */}
          <SlideEffect direction="right" delay={0.15}>
            <div className="rounded-2xl bg-secondary/50 border border-border p-5 space-y-4">
              <p className="text-xs uppercase tracking-wider text-foreground/50 font-medium">Share article</p>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={handleShareTwitter}
                  className="py-2 px-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-xs font-medium flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  Twitter
                </button>
                <button 
                  onClick={handleShareLinkedIn}
                  className="py-2 px-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-xs font-medium flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </button>
                <button 
                  onClick={handleCopyLink}
                  className={`py-2 px-3 rounded-xl transition-all text-xs font-medium flex items-center justify-center gap-1.5 col-span-2 ${
                    isCopied 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      Copy link
                    </>
                  )}
                </button>
              </div>
            </div>
          </SlideEffect>

          {/* CTA Card */}
          <SlideEffect direction="right" delay={0.2}>
            <div className="rounded-2xl bg-secondary/50 border border-border from-primary/10 via-primary/5 to-transparent border border-primary/20 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-foreground/50" />
                <p className="text-xs uppercase tracking-wider  text-foreground/50 font-medium">Try GikaGraph</p>
              </div>
              <p className="text-sm leading-relaxed text-foreground/60">
                Transform your data into actionable insights with AI-powered entity intelligence.
              </p>
              <Link href="https://playground.gikagraph.ai" target="_blank">
                <Button size="sm" className="w-full gap-1.5 mt-2 p-1">
                  Explore Platform
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </SlideEffect>

          {/* More to Read */}
          <SlideEffect direction="right" delay={0.25}>
            <div className="rounded-2xl bg-secondary/50 border border-border p-5 space-y-4">
              <p className="text-xs uppercase tracking-wider text-foreground/50 font-medium">More to read</p>
              <div className="space-y-3">
                {morePosts.map((morePost) => (
                  <Link 
                    key={morePost.id} 
                    href={`/blog/${morePost.slug}`}
                    className="block group"
                  >
                    <div className="flex gap-3 items-start">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={morePost.coverImage}
                          alt={morePost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                          {morePost.title}
                        </h4>
                        <p className="text-[10px] text-foreground/50 mt-1">{morePost.readTime} min read</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </SlideEffect>
        </aside>
      </article>


      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="space-y-8 pt-8 border-t border-border">
          <SlideEffect>
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60">
                Related Articles
              </h2>
              <Link href="/blog" className="text-sm text-primary hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </SlideEffect>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost, index) => (
              <SlideEffect key={relatedPost.id} delay={0.1 * (index + 1)} direction="bottom">
                <Link href={`/blog/${relatedPost.slug}`}>
                  <div className="h-full rounded-2xl overflow-hidden bg-secondary/50 border border-border group cursor-pointer hover:shadow-lg hover:border-primary/20 transition-all">
                    {/* Image */}
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-primary text-black text-xs font-medium">
                          {relatedPost.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col gap-3">
                      <h3 className="text-base font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-foreground/60 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-3 mt-auto pt-3 border-t border-border/50">
                        <Image
                          src={relatedPost.author.avatar}
                          alt={relatedPost.author.name}
                          width={28}
                          height={28}
                          className="rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-xs text-foreground/50">
                            <span className="truncate">{relatedPost.author.name}</span>
                            <span>•</span>
                            <span>{relatedPost.readTime} min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SlideEffect>
            ))}
          </div>
        </section>
      )}

      {/* Back to Blog CTA */}
      <SlideEffect>
        <div className="flex justify-center pb-8">
          <Link href="/blog">
            <Button variant="secondary" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </Button>
          </Link>
        </div>
      </SlideEffect>

      <Footer />
    </div>
  )
}
