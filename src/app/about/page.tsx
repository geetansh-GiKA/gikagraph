import Navbar from "@/components/navbar";
import Footer from "@/sections/footer";
import AboutHero from "@/sections/about-hero";
import CTA from "@/sections/cta";
import FAQ from "@/sections/faq";

export default function AboutPage() {
  return (
    <>
      <div className="h-1"></div>
      <Navbar pill />
      <div className="px-4 xl:px-0 max-w-6xl mx-auto">
        <div className="absolute inset-x-0 top-0 h-[1600px] -z-10 pointer-events-none" />
        <AboutHero />
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
