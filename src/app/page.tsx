import CTA from "@/sections/cta";
import FAQ from "@/sections/faq";
import Features1 from "@/sections/features-1";
import Features4 from "@/sections/features-2";
import Footer from "@/sections/footer";
import Hero from "@/sections/hero";
import Testimonials from "@/sections/testimonials";
// import VelocityScroll from "@/sections/VelocityScroll";

export default function HomePage() {
  return (
  <>
      <div className="px-4 xl:px-0 max-w-5xl mx-auto space-y-20 sm:space-y-24 md:space-y-32 lg:space-y-40 scroll-smooth">
        <Hero />
        <Features1 />
      </div>

      {/* <VelocityScroll/> */}
      
      <div className="px-4 xl:px-0 max-w-5xl mx-auto space-y-20 sm:space-y-24 md:space-y-32 lg:space-y-40 scroll-smooth">
        <Features4 />
      </div>

      <div className="mt-8 px-4 xl:px-0 max-w-5xl mx-auto space-y-20 sm:space-y-24 md:space-y-32 lg:space-y-40">
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </>
  )
}
