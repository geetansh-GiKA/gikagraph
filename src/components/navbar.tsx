"use client";

import Image from "next/image";
import Link from "next/link";
import { AlignJustify, X } from "lucide-react";
import {
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import * as motion from "motion/react-m";
import { useState } from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const settings = {
  navLinks: [
    { name: "home", href: "/" },
    { name: "Platform", href: "/platform" },
    { name: "Docs", href: "/docs" },
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

export function Navbar({ pill = false }: { pill?: boolean } = {}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(pill);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Scroll progress as a motion value — updates outside React's render
  // cycle, so no per-pixel re-renders (this was the source of the jank).
  const { scrollY } = useScroll();
  // Overshoot then settle: width bumps up briefly past 100% before
  // easing down to the pill size, driven by a spring for a natural feel.
  const widthRaw = useTransform(
    scrollY,
    [0, 8, 60],
    pill ? [95, 95, 95] : [100, 100, 95],
  );
  const width = useSpring(widthRaw, {
    stiffness: 220,
    damping: 24,
    mass: 0.6,
  });

  // Only used to toggle discrete classes (border/blur/shape), which is
  // cheap to re-render on since it's a boolean flip, not a scroll tick.
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (pill) return;
    setIsScrolled((prev) => {
      const next = latest > 1;
      return prev === next ? prev : next;
    });
  });

  return (
    <nav
      className={`w-[75.8rem] mx-auto sticky top-3 z-500 flex justify-center transition-all duration-300 ease-out translate-y-0 opacity-100"
      }`}
    >
      <motion.div
        style={{ width: useTransform(width, (w) => `${w}%`) }}
        className={`flex items-center justify-between gap-4 border transition-colors duration-500 ease-out ${
          isScrolled
            ? "mt-0 rounded-xl border-border bg-background/95 px-4 sm:px-6 py-3"
            : "mt-0 rounded-b-3xl border-t-0 border-transparent bg-transparent shadow-none px-4 sm:px-6 py-3"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          title="Home"
          id="Logo"
          className="flex items-center gap-2 shrink-0"
        >
          <Image
            src="/logo.png"
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
                    className="block transition-all capitalize rounded-full px-3 py-1.5"
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
