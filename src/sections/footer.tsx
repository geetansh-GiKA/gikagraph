'use client'

import Image from "next/image"
import Link from "next/link"

const settings = {
  copyright: '© 2026 GiKA AI. All rights reserved.',
  columns: [
    {
      heading: 'Product',
      links: [
        { name: 'Platform', href: '/product' },
        { name: 'How It Works', href: '/how-it-works' },
        { name: 'Playground', href: 'https://playground.gikagraph.ai', external: true },
      ],
    },
    {
      heading: 'Resources',
      links: [
        { name: 'Blog', href: '/blog' },
        { name: 'FAQ', href: '/#faq' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { name: 'About', href: '/' },
        { name: 'Quick Call', href: 'https://cal.com/gikagraph/30-mins', external: true },
      ],
    },
  ],
}

export function Footer() {
  return (
    <footer className="w-full border-t border-border pt-12 pb-8 -mt-12 md:-mt-20 lg:-mt-24">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <Image src="/logo.png" alt="GiKA AI Logo" width={62} height={14} />
            <span className="font-semibold text-sm text-foreground">GiKA AI</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
            An intelligent decision-making platform built for enterprise data.
          </p>
        </div>

        {/* Nav columns */}
        {settings.columns.map((col) => (
          <div key={col.heading} className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{col.heading}</p>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    target={'external' in link && link.external ? '_blank' : undefined}
                    rel={'external' in link && link.external ? 'noopener noreferrer' : undefined}
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <p className="text-xs text-muted-foreground">{settings.copyright}</p>
      </div>
    </footer>
  )
}

export default Footer
