import CTA from "@/sections/cta";
import Features1 from "@/sections/features-1";
import FAQ from "@/sections/faq";
import Footer from "@/sections/footer";
import Hero from "@/sections/hero";
import IntegrationsMarquee from "@/sections/integrations-marquee";

import Navbar from "@/components/navbar";
import Badge from "@/components/badge";
import SlideEffect from "@/components/slide-effect";
import TestimonialCard from "@/components/ui/testimonial-card";

const TESTIMONIALS = [
  {
    quote:
      "GikaGraph transformed how we handle product search and recommendations. The improved data quality and entity matching led to substantially better discovery rates for niche product searches.",
    emphasis: "substantially better discovery",
    author: "Divya Manjari",
    role: "Founder",
    company: "Drezily",
    image: "/Customers/Drezily.png",
    alt: "Portrait of Divya Manjari",
  },
  {
    quote:
      "GiKA AI didn’t just answer questions it demonstrated true intelligence: contextual accuracy across massive, constantly evolving knowledge, human-level negotiation, and real-time understanding at scale.",
    emphasis: "contextual accuracy",
    author: "Vineet Chaturvedi",
    role: "Ex CEO",
    company: "Edureka",
    image: "/Customers/Edureka.png",
    alt: "Portrait of Vineet Chaturvedi",
  },
];

export default function HomePage() {
  return (
    <>
      <div className="h-1"></div>
      <Navbar />
      <div className="px-4 xl:px-0 max-w-6xl mx-auto space-y-20 sm:space-y-24 md:space-y-32 lg:space-y-40 scroll-smooth">
        <div className="absolute inset-x-0 top-0 h-[1600px] -z-10 pointer-events-none" />
        <Hero />
        <Features1 />
        <IntegrationsMarquee />
      </div>

      <div className="px-4 xl:px-0 max-w-6xl mx-auto space-y-10 md:space-y-12 py-32">
        <div className="flex flex-col items-center text-center gap-5">
          <SlideEffect>
            <Badge text="Testimonials" icon="/Badges/userslove.png" />
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
            Our users are our best ambassadors. Discover why they trust GiKA GRAPH
            to turn scattered data into a knowledge graph.
          </SlideEffect>
        </div>

        <SlideEffect delay={0.2}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 w-fit mx-auto">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.author} {...testimonial} />
            ))}
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
