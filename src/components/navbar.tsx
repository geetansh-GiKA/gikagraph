"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlignJustify,
  ScrollText,
  BarChart,
  DollarSign,
  FileText,
  LayersIcon,
  Mail,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavGridCard,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavItemMobile,
  type NavItemType,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const productLinks: NavItemType[] = [
  {
    title: "Document Intelligence",
    href: "/platform",
    description:
      "The unified enterprise intelligence platform that extracts, structures, and connects insights across all your documents.",
    icon: LayersIcon,
  },
];

const rfpOverviewLink: NavItemType = {
  title: "Request for Proposal",
  href: "/request-for-proposal",
  description: "End-to-end RFP automation, from intake to submission.",
  icon: ScrollText,
};

const rfpLinks: NavItemType[] = [
  {
    title: "Pricing",
    href: "/pricing",
    description: "RFP plans that scale with your business",
    icon: DollarSign,
  },
  {
    title: "ROI",
    href: "/roi-calculator",
    description: "Estimate your return on investment",
    icon: BarChart,
  },
];

const companyLinks: NavItemType[] = [
  {
    title: "About Us",
    href: "/about",
    description:
      "Learn more about our story, our mission, and the team building the future of data-driven insights",
    icon: Users,
  },
  {
    title: "Blogs",
    href: "/docs",
    description:
      "Read our latest articles, product updates, and insights on data, analytics, and business intelligence",
    icon: FileText,
  },
];

const directLinks: NavItemType[] = [
  {
    title: "Contact",
    href: "https://cal.com/gikagraph/30-mins",
    description: "Book a call with our team",
    icon: Mail,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href.startsWith("http")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isRfpActive =
    isActive(rfpOverviewLink.href) ||
    rfpLinks.some((link) => isActive(link.href));
  const isProductsActive =
    productLinks.some((link) => isActive(link.href)) || isRfpActive;
  const isCompanyActive = companyLinks.some((link) => isActive(link.href));

  return (
    <nav
      className={cn(
        "w-full max-w-6xl px-4 xl:px-0 mx-auto sticky top-3 z-500 flex justify-center",
        mobileMenuOpen && "hidden",
      )}
    >
      <div className="w-full flex items-center justify-between gap-4 border rounded-xl border-border bg-background/95 px-4 sm:px-6 py-3">
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
        <NavigationMenu className="relative hidden md:flex" viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(isProductsActive && "text-primary")}
              >
                Products
              </NavigationMenuTrigger>
              <NavigationMenuContent className="left-auto right-0">
                <ul className="grid w-[min(36rem,calc(100vw-2rem))] grid-cols-2 gap-4 p-4">
                  <li key={rfpOverviewLink.href}>
                    <NavGridCard
                      link={rfpOverviewLink}
                      subLinks={rfpLinks}
                      className="min-h-36"
                    />
                  </li>
                  {productLinks.map((link) => (
                    <li key={link.href}>
                      <NavGridCard link={link} className="min-h-36" />
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(isCompanyActive && "text-primary")}
              >
                Company
              </NavigationMenuTrigger>
              <NavigationMenuContent className="left-auto right-0">
                <ul className="grid w-[min(36rem,calc(100vw-2rem))] grid-cols-2 gap-4 p-4">
                  {companyLinks.map((link) => (
                    <li key={link.href}>
                      <NavGridCard link={link} className="min-h-36" />
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {directLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <Link
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={cn(
                    "inline-flex w-max items-center justify-center rounded-md px-4 py-1 text-sm font-medium border border-transparent transition-[color,box-shadow,border-color] hover:border-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 outline-none",
                    isActive(link.href) && "text-primary",
                  )}
                >
                  {link.title}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* mobile menu */}
        <div className="flex items-center gap-2 md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full"
                aria-label="Toggle menu"
              >
                <AlignJustify className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              className="bg-background/95 supports-[backdrop-filter]:bg-background/80 w-full gap-0 backdrop-blur-lg"
              showClose={false}
            >
              <div className="flex h-14 items-center justify-end border-b px-4">
                <SheetClose asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full"
                    aria-label="Close menu"
                  >
                    <X className="size-5" />
                  </Button>
                </SheetClose>
              </div>
              <div className="container grid gap-y-1 overflow-y-auto px-4 pt-5 pb-12">
                <span className="px-2 text-xs font-medium text-muted-foreground uppercase">
                  Products
                </span>
                <ul className="grid gap-1 mb-4">
                  {productLinks.map((link) => (
                    <li key={link.href}>
                      <SheetClose asChild>
                        <NavItemMobile item={link} href={link.href} />
                      </SheetClose>
                    </li>
                  ))}
                  <li key={rfpOverviewLink.href}>
                    <SheetClose asChild>
                      <NavItemMobile
                        item={rfpOverviewLink}
                        href={rfpOverviewLink.href}
                      />
                    </SheetClose>
                  </li>
                  {rfpLinks.map((link) => (
                    <li key={link.href}>
                      <SheetClose asChild>
                        <NavItemMobile item={link} href={link.href} />
                      </SheetClose>
                    </li>
                  ))}
                </ul>

                <span className="px-2 text-xs font-medium text-muted-foreground uppercase">
                  Company
                </span>
                <ul className="grid gap-1 mb-4">
                  {companyLinks.map((link) => (
                    <li key={link.href}>
                      <SheetClose asChild>
                        <NavItemMobile item={link} href={link.href} />
                      </SheetClose>
                    </li>
                  ))}
                </ul>

                <ul className="grid gap-1">
                  {directLinks.map((link) => (
                    <li key={link.href}>
                      <SheetClose asChild>
                        <NavItemMobile
                          item={link}
                          href={link.href}
                          target={
                            link.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            link.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        />
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
