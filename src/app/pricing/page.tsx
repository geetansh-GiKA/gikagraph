import Navbar from "@/components/navbar";
import Footer from "@/sections/footer";
import PricingHero from "@/sections/pricing-hero";
import PricingComparison from "@/sections/pricing-comparison";
import PricingAddons from "@/sections/pricing-addons";
import RoiCalculator from "@/sections/roi-calculator";
import CTA from "@/sections/cta";

export default function PricingPage() {
  return (
    <>
      <div className="h-1"></div>
      <Navbar />
      <div className="px-4 xl:px-0 max-w-6xl mx-auto py-16">
        <PricingHero />
      </div>

      <div className="px-4 xl:px-0 max-w-6xl mx-auto py-16">
        <PricingComparison />
      </div>

      <div className="px-4 xl:px-0 max-w-6xl mx-auto py-16">
        <PricingAddons />
      </div>

      <div className="px-4 xl:px-0 max-w-6xl mx-auto py-16">
        <RoiCalculator />
        <p className="mt-8 text-center text-lg md:text-xl font-semibold tracking-tight">
          Save $10+ in direct costs for every $1 spent on GiKA. You win more,
          you save more. That&apos;s GiKA — Your Generally Intelligent
          Knowledge Analyzer.
        </p>
      </div>

      <div className="px-4 xl:px-0 max-w-6xl mx-auto py-16">
        <CTA />
      </div>

      <Footer />
    </>
  );
}
