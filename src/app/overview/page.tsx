import Navbar from "@/components/navbar";
import Footer from "@/sections/footer";
import DataArchitecture from "@/sections/data-architecture";
import DataPipelineBeam from "@/sections/data-pipeline-beam";
import PipelineStages from "@/sections/pipeline-stages";
import OnboardingFlowDemo from "@/sections/onboarding-flow-demo";
import FAQ from "@/sections/faq";
import CTA from "@/sections/cta";

export default function OverviewPage() {
  return (
    <>
      <div className="h-1"></div>
      <Navbar />
      <div className="px-4 xl:px-0 max-w-6xl mx-auto pt-4 pb-16 md:pt-6">
        <DataArchitecture />
        <DataPipelineBeam />
        <PipelineStages />
        <OnboardingFlowDemo />
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
