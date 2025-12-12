import { Metadata } from 'next'
import { getBlogPostBySlug } from '@/app/blog/data/blogData'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = getBlogPostBySlug(params.slug)

    if (!post) {
        return {
            title: 'Blog Post Not Found | GikaGraph',
        }
    }

    return {
        title: `${post.title} | GikaGraph Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.publishedAt,
            authors: [post.author.name],
            images: [
                {
                    url: post.coverImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.coverImage],
        },
    }
}

export default function BlogDetailLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}