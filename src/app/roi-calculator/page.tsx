import Navbar from "@/components/navbar";
import Footer from "@/sections/footer";
import RoiCalculator from "@/sections/roi-calculator";
import CTA from "@/sections/cta";

export default function RoiCalculatorPage() {
  return (
    <>
      <div className="h-1"></div>
      <Navbar />
      <div className="px-4 xl:px-0 max-w-6xl mx-auto py-16">
        <RoiCalculator />
      </div>
      <div className="px-4 xl:px-0 max-w-6xl mx-auto py-16">
        <CTA />
      </div>
      <Footer />
    </>
  );
}
