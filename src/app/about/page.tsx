import Navbar from "@/components/navbar";
import Footer from "@/sections/footer";
import AboutHero from "@/sections/about-hero";
import CTA from "@/sections/cta";
import FAQ from "@/sections/faq";
import Badge from "@/components/badge";
import SlideEffect from "@/components/slide-effect";
import { Component } from "@/components/ui/pixel-logo-grid";

export default function AboutPage() {
  return (
    <>
      <div className="h-1"></div>
      <Navbar pill />
      <div className="px-4 xl:px-0 max-w-6xl mx-auto">
        <div className="absolute inset-x-0 top-0 h-[1600px] -z-10 pointer-events-none" />
        <AboutHero />
      </div>
      <div className="px-4 xl:px-0 max-w-6xl mx-auto py-16 space-y-12">
        <div className="flex flex-col items-center text-center gap-5">
          <SlideEffect>
            <Badge text="Our Team" icon="/userslove.png" />
          </SlideEffect>

          <SlideEffect
            direction="top"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-3xl mx-auto"
          >
            Built by engineers who&apos;ve shipped at scale
          </SlideEffect>

          <SlideEffect
            delay={0.1}
            className="px-2 sm:px-10 md:px-0 w-full md:max-w-xl mx-auto text-sm lg:text-base text-muted-foreground"
          >
            Our team brings experience from top product companies and
            institutes, building GIKA.AI to solve real enterprise data problems.
          </SlideEffect>
        </div>

        <Component />
      </div>
      <div className="px-4 xl:px-0 max-w-6xl mx-auto py-16">
        <FAQ />
      </div>

      <div className="px-4 xl:px-0 max-w-6xl mx-auto py-16">
        <CTA />
      </div>
      <Footer />
    </>
  );
}
