"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail } from "lucide-react";

const settings = {
  contactCards: [
    {
      icon: MapPin,
      title: "Find us",
      text: "1010 Avenue, SW 54321, Chandigarh",
    },
    {
      icon: Mail,
      title: "Mail us",
      text: "contact@gikagraph.ai",
    },
  ],
  description:
    "GIKA.AI turns fragmented enterprise data into grounded, entity-aware knowledge graphs — powering insights you can trust.",

  usefulLinks: [
    { name: "Home", href: "/" },
    { name: "Platform", href: "/platform" },
    { name: "Docs", href: "/docs" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/#faq" },
  ],
  legalLinks: [
    { name: "Terms", href: "#" },
    { name: "Privacy", href: "#" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 px-3 sm:px-6 pb-3 sm:pb-6">
      <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-card overflow-hidden">
        {/* Main content */}
        <div className="px-6 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Logo + description */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <Image
                src="/logo.png"
                alt="GIKA.AI Logo"
                width={42}
                height={16}
              />
              <span className="font-semibold text-base text-foreground">
                GiKA.AI
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              {settings.description}
            </p>
          </div>

          {/* Useful links */}
          <div className="md:col-span-3">
            <h3 className="font-semibold text-foreground mb-6 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-10 after:bg-primary">
              Useful Links
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {settings.usefulLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors capitalize"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="font-semibold text-foreground mb-6 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-10 after:bg-primary">
              Get In Touch
            </h3>
            <ul className="flex flex-col gap-4">
              {settings.contactCards.map((card) => (
                <li key={card.title} className="flex items-start gap-3">
                  <span className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {card.title}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {card.text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border">
          <div className="px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {year} GiKA.AI. All rights reserved.
            </p>
            <ul className="flex items-center gap-6">
              {settings.legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
