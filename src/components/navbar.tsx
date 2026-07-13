"use client";

import Image from "next/image";
import Link from "next/link";
import { AlignJustify, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-m";
import { useState } from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const settings = {
  navLinks: [
    { name: "home", href: "/" },
    { name: "Platform", href: "/platform" },
    { name: "Pricing", href: "/pricing" },
    { name: "About Us", href: "/about" },
    { name: "Blogs", href: "/docs" },
    { name: "Contact", href: "https://cal.com/gikagraph/30-mins" },
  ] as const,
  loginCTA: {
    content: "Login",
    href: "https://playground.GIKA.AI.ai",
  },
  mainCTA: {
    content: "Book a Call",
    href: "#",
  },
};

// All your documentation links for the dropdown
const docsLinks = [
  {
    title: "Blogs",
    href: "/blog",
    description: "Read our latest articles and insights.",
  },
  {
    title: "FAQ",
    href: "/#faq",
    description: "Find answers to common questions.",
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`w-[75.8rem] mx-auto sticky top-3 z-500 flex justify-center transition-all duration-300 ease-out translate-y-0 opacity-100"
      }`}
    >
      <motion.div
        className={
          "min-w-6xl flex items-center justify-between gap-4 border transition-colors duration-500 ease-out mt-0 rounded-xl border-border bg-background/95 px-4 sm:px-6 py-3"
        }
      >
        {/* Logo */}
        <Link
          href="/"
          title="Home"
          id="Logo"
          className="flex items-center gap-2 shrink-0"
        >
          <Image
            src="/Company/Company.png"
            alt="GIKA.AI Logo"
            width={42}
            height={16}
            priority
          />
          <span className="font-semibold text-base text-foreground hidden sm:inline">
            GiKA.AI
          </span>
        </Link>

        {/* desktop menu */}
        <div className="items-center justify-center gap-6 hidden md:flex">
          {/* Nav Links */}
          <ul className="flex items-center justify-center gap-1 text-foreground font-medium select-none text-link rounded-full p-1">
            {settings.navLinks.map((link) => {
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    title={link.name}
                    target={link.name === "Contact" ? "_blank" : undefined}
                    rel={
                      link.name === "Contact"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="relative block transition-all capitalize rounded-full px-3 py-1.5 after:content-[''] after:absolute after:left-3 after:right-3 after:-bottom-0 after:h-0.5 after:bg-primary after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <AnimatedThemeToggler className="text-foreground hover:opacity-80 transition-opacity" />
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="inline-flex items-center justify-center size-9 rounded-full hover:bg-accent transition-colors"
          >
            {isOpen ? (
              <X className="size-5" />
            ) : (
              <AlignJustify className="size-5" />
            )}
          </button>
        </div>
      </motion.div>

      {/* mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-6xl mt-2 md:hidden"
          >
            <div className="rounded-2xl border border-border bg-background/95 backdrop-blur-md shadow-lg shadow-black/10 p-4">
              <ul className="flex flex-col text-foreground font-medium select-none text-link">
                {settings.navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      title={link.name}
                      target={link.name === "Contact" ? "_blank" : undefined}
                      rel={
                        link.name === "Contact"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      onClick={() => setIsOpen(false)}
                      className="block py-2.5 capitalize hover:opacity-80 transition-all"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                {docsLinks.map((doc) => (
                  <li key={doc.href}>
                    <Link
                      href={doc.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-2.5 pl-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {doc.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
