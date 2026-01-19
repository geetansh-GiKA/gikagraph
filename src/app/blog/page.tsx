'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SlideEffect from '@/components/slide-effect'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/navbar'
import Footer from '@/sections/footer'
import { Search } from 'lucide-react'
import { ChevronDown } from 'lucide-react'
import { blogPosts, categories } from '@/app/blog/data/blogData'

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    
    const regularPosts = blogPosts.filter(post => !post.featured)

    const filteredPosts = regularPosts.filter(post => {
        const matchesCategory = selectedCategory === 'all' || post.categorySlug === selectedCategory
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <>
            <div className="px-4 xl:px-0 max-w-5xl mx-auto space-y-12 sm:space-y-16 md:space-y-20">
                <Navbar />

                {/* Hero Section */}
                <section className="space-y-6 md:space-y-8 text-center -mt-16">

                    <SlideEffect>
                        <h1 className="text-2xl md:text-4xl lg:text-header capitalize text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60 font-medium leading-normal">
                            BLOGS
                        </h1>
                    </SlideEffect>

                    <SlideEffect className="text-sm lg:text-base px-6 sm:px-10 md:px-0 md:max-w-3/4 mx-auto">
                        Discover the latest insights on AI, entity intelligence, and how data is transforming data into actionable decisions.
                    </SlideEffect>

                    {/* Search Bar */}
                    <SlideEffect className="max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">

                            {/* Search Bar - LEFT */}
                            <div className="relative w-full md:w-1/2">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={20} />

                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-5 py-2 pl-12 rounded-full bg-muted border border-border text-sm 
        font-medium text-foreground placeholder:text-foreground/40 
        hover:bg-muted/80 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            {/* Category Filter DROPDOWN - RIGHT */}
                            <div className="relative md:w-1/2 flex justify-end w-full">
                                <div className="group relative">

                                    {/* Trigger Button (Same style as search bar + filters) */}
                                    <button className="px-5 py-2 rounded-full bg-muted border border-border text-sm font-medium 
          hover:bg-muted/80 transition-all flex items-center gap-2">
                                        Filters
                                        <ChevronDown className="h-4 w-4" />
                                    </button>

                                    {/* Dropdown */}
                                    <div className="absolute right-0 mt-2 w-44 bg-background border border-border rounded-xl shadow-lg 
            opacity-0 invisible group-hover:opacity-100 group-hover:visible 
            transition-all duration-200 py-2 z-20">

                                        {categories.map(category => (
                                            <button
                                                key={category.slug}
                                                onClick={() => setSelectedCategory(category.slug)}
                                                className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-all ${selectedCategory === category.slug
                                                        ? "bg-primary/20 text-primary font-semibold"
                                                        : "text-foreground"
                                                    }`}
                                            >
                                                {category.name}
                                            </button>
                                        ))}

                                    </div>

                                </div>
                            </div>

                        </div>
                    </SlideEffect>

                </section>

                {/* Category Filters */}


                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post, index) => (
                        <SlideEffect
                            key={post.id}
                            direction={index % 2 === 0 ? 'right' : 'left'}
                            duration={0.8 + index * 0.1}
                            isSpring={false}
                        >
                            <Link
                                href={`/blog/${post.slug}`}
                            >
                                <div className="h-full rounded-2xl overflow-hidden bg-secondary group cursor-pointer hover:shadow-lg transition-shadow">
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={post.coverImage}
                                            alt={post.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 rounded-full bg-primary text-black text-xs font-medium">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col gap-3">
                                        <h3 className="text-lg font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-foreground/70 line-clamp-3 flex-1">
                                            {post.excerpt}
                                        </p>

                                        {/* Author & Meta */}
                                        <div className="flex items-center gap-3 mt-2 pt-4 border-t border-border">
                                            <Image
                                                src={post.author.avatar}
                                                alt={post.author.name}
                                                width={32}
                                                height={32}
                                                className="rounded-full"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium text-foreground truncate">{post.author.name}</p>
                                                <div className="flex items-center gap-2 text-xs text-foreground/60">
                                                    <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                                    <span>•</span>
                                                    <span>{post.readTime} min</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SlideEffect>
                    ))}
                </div>

                {/* Empty State */}
                {filteredPosts.length === 0 && (
                    <SlideEffect>
                        <div className="text-center py-16">
                            <p className="text-foreground/60 text-lg">No articles found matching your criteria.</p>
                            <Button
                                className="mt-4"
                                onClick={() => {
                                    setSelectedCategory('all')
                                    setSearchQuery('')
                                }}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    </SlideEffect>
                )}
            </div>

            {/* Footer */}
            <div className="mt-32 px-4 xl:px-0 max-w-5xl mx-auto">
                <Footer />
            </div>
        </>
    )
}
