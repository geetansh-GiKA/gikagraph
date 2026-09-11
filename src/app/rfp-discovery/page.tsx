import { Search } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/sections/footer";
import Badge from "@/components/badge";
import CTA from "@/sections/cta";
import FAQ from "@/sections/faq";

export default function RfpDiscoveryPage() {
  return (
    <>
      <div className="h-1"></div>
      <Navbar />
      <div className="px-4 xl:px-0 max-w-6xl mx-auto pt-16 pb-[10%]">
        <div className="flex flex-col items-center justify-center text-center gap-6">
          <Badge text="RFP Discovery" Icon={Search} />

          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
            Find the Right{" "}
            <span className="bg-gradient-to-br from-black via-[#9868a8] to-[#c9a8d4] bg-clip-text text-transparent">
              RFPs
            </span>{" "}
            Before Anyone Else
          </h1>

          <p className="text-base text-muted-foreground max-w-2xl">
            GiKA continuously scans and surfaces relevant RFP opportunities
            that match your business, so your team never misses a deal worth
            pursuing.
          </p>
        </div>
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
