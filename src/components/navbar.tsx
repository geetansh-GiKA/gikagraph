'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { AlignJustify, X } from "lucide-react"
import { AnimatePresence } from 'motion/react'
import * as motion from "motion/react-m"
import { useState } from "react"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

const settings = {
  navLinks: [
    { name: 'home', href: '/' },
    { name: 'Product', href: '/product' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Docs', href: '/docs' }, // base docs page
    // { name: 'Pricing', href: '/pricing' },
  ] as const,
  cta: {
    content: 'Quick Call',
    href: 'https://cal.com/gikagraph/30-mins',
    external: true,
  }
}

// All your documentation links for the dropdown
const docsLinks = [
  {
    title: "Blogs",
    href: "/blog",
    description: "Read our latest articles and insights."
  },
  {
    title: "FAQ",
    href: "/#faq",
    description: "Find answers to common questions."
  },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="w-full h-fit py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href='/' title="Home" id="Logo" className="flex items-center gap-2">
        <Image src="/logo.png" alt="GikaGraph Logo" width={103} height={24} priority />
      </Link>

      {/* desktop menu */}
      <div className="items-center justify-center gap-5 hidden md:flex">

        {/* Nav Links */}
        <ul className="flex items-center justify-center gap-5 text-foreground font-medium select-none text-link">
          {settings.navLinks.map(link => {
            // Special handling for Docs dropdown (desktop)
            if (link.name === 'Docs') {
              return (
                <li
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setIsDocsOpen(true)}
                  onMouseLeave={() => setIsDocsOpen(false)}
                >
                  {/* Trigger */}
                  <button
                    type="button"
                    className="hover:opacity-80 transition-all capitalize inline-flex items-center gap-1"
                  >
                    {link.name}
                    <span className="text-xs opacity-70">▾</span>
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {isDocsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50"
                      >
                        <div className="w-[320px] lg:w-[420px] rounded-xl border border-border bg-background/95 backdrop-blur shadow-lg shadow-black/10 p-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {docsLinks.map((doc) => (
                              <Link
                                key={doc.href}
                                href={doc.href}
                                className="rounded-md px-2 py-2 hover:bg-accent hover:text-accent-foreground transition-colors text-left dark:hover:text-black"
                              >
                                <p className="text-sm font-medium mb-0.5">
                                  {doc.title}
                                </p>
                                <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
                                  {doc.description}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            }

            // Default simple link
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  title={link.name}
                  className="hover:opacity-80 transition-all capitalize"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  target={(link as any).external ? '_blank' : undefined}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  rel={(link as any).external ? 'noopener noreferrer' : undefined}
                >
                  {link.name}
                </Link>
              </li>
            )
          })}

          <AnimatedThemeToggler />
        </ul>

        {/* Call To Action */}
        <Link
          href={settings.cta.href}
          title={settings.cta.content}
          onClick={toggleMenu}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="w-full capitalize">{settings.cta.content}</Button>
        </Link>

      </div>

      {/* mobile only - burger menu icon */}
      <motion.div
        initial={{ scale: 1, y: 0 }}
        whileTap={{ scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="bg-background shadow-none flex md:hidden cursor-pointer text-foreground"
        onClick={toggleMenu}
      >
        {!isOpen && <AlignJustify size={20} />}
        {isOpen && <X size={20} />}
      </motion.div>

      {/* mobile only - menu container with AnimatePresence for exit animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 1, y: -20 }}
            animate={{ height: '100vh', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 1, y: -20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed flex flex-col md:hidden top-16 left-0 w-full bg-background border-b border-border z-50 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-6">
              <ul className="flex flex-col space-y-2 text-foreground font-medium select-none text-base">
                {settings.navLinks.map(link => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      title={link.name}
                      onClick={toggleMenu}
                      className="block py-2 capitalize"
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      target={(link as any).external ? '_blank' : undefined}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      rel={(link as any).external ? 'noopener noreferrer' : undefined}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <Link href={settings.cta.href} title={settings.cta.content} onClick={toggleMenu}>
                <Button className="w-full capitalize">{settings.cta.content}</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar;