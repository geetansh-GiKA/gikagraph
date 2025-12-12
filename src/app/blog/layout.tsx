import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blog & Insights | GikaGraph',
    description: 'Discover the latest insights on AI, entity intelligence, and how businesses are transforming data into actionable decisions.',
    openGraph: {
        title: 'Blog & Insights | GikaGraph',
        description: 'Discover the latest insights on AI, entity intelligence, and how businesses are transforming data into actionable decisions.',
        type: 'website',
    },
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
