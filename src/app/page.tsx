import CTA from "@/sections/cta";
import Features1 from "@/sections/features-1";
import FAQ from "@/sections/faq";
import Footer from "@/sections/footer";
import Hero from "@/sections/hero";
import IntegrationsMarquee from "@/sections/integrations-marquee";

import Navbar from "@/components/navbar";
import Badge from "@/components/badge";
import SlideEffect from "@/components/slide-effect";
import ScrollReelTestimonials from "@/components/ui/scroll-reel-testimonials";

const TESTIMONIALS = [
  {
    quote:
      "GikaGraph completely changed how we explore our data. What used to take a data analyst hours now takes minutes.",
    author: "Jan Dittrich",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop",
    alt: "Portrait of Jan Dittrich",
  },
  {
    quote:
      "I'm building a new analytics workflow and it's absolutely ridiculous how valuable this has been for our team.",
    author: "Michael Riddering",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop",
    alt: "Portrait of Michael Riddering",
  },
  {
    quote:
      "Way too much value for the price to be honest — our whole team relies on it now.",
    author: "James Traf",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop",
    alt: "Portrait of James Traf",
  },
];

export default function HomePage() {
  return (
    <>
      <div className="h-1"></div>
      <Navbar />
      <div className="px-4 xl:px-0 max-w-6xl mx-auto space-y-20 sm:space-y-24 md:space-y-32 lg:space-y-40 scroll-smooth">
        <div className="absolute inset-x-0 top-0 h-[1600px] bg-grid -z-10 pointer-events-none" />
        <Hero />
        <Features1 />
        <IntegrationsMarquee />
      </div>

      <div className="px-4 xl:px-0 max-w-6xl mx-auto space-y-10 md:space-y-12 py-32">
        <div className="flex flex-col items-center text-center gap-5">
          <SlideEffect>
            <Badge text="Testimonials" icon="/userslove.png" />
          </SlideEffect>

          <SlideEffect
            direction="top"
            className="text-6xl font-bold tracking-tighter max-w-3xl mx-auto"
          >
            Don&apos;t just take our word for it
          </SlideEffect>

          <SlideEffect
            delay={0.1}
            className="px-2 sm:px-10 md:px-0 w-full md:max-w-xl mx-auto text-sm lg:text-base text-muted-foreground"
          >
            Our users are our best ambassadors. Discover why they trust
            GikaGraph to turn scattered data into a knowledge graph.
          </SlideEffect>
        </div>

        <SlideEffect delay={0.2}>
          <div className="flex justify-center">
            <ScrollReelTestimonials testimonials={TESTIMONIALS} />
          </div>
        </SlideEffect>
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
