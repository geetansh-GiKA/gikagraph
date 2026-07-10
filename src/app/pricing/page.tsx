import Navbar from "@/components/navbar";
import Footer from "@/sections/footer";
import PricingHero from "@/sections/pricing-hero";
import PricingComparison from "@/sections/pricing-comparison";
import PricingAddons from "@/sections/pricing-addons";

export default function PricingPage() {
  return (
    <>
      <div className="h-1"></div>
      <Navbar pill />
      <div className="px-4 xl:px-0 max-w-6xl mx-auto py-16">
        <PricingHero />
      </div>

      <div className="px-4 xl:px-0 max-w-6xl mx-auto py-16">
        <PricingComparison />
      </div>

      <div className="px-4 xl:px-0 max-w-6xl mx-auto py-16">
        <PricingAddons />
      </div>

      <Footer />
    </>
  );
}
