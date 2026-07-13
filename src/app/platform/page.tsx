"use client";

import { PartyPopper } from "lucide-react";
import { Navbar } from "@/components/navbar";
import SlideEffect from "@/components/slide-effect";
import Badge from "@/components/badge";
import { changelogEntries } from "./data/changelog";
import { Changelog1 } from "@/components/ui/changelog-1";
import CTA from "@/sections/cta";
import Footer from "@/sections/footer";
import {
  ContainerAnimated,
  ContainerInset,
  ContainerScroll,
  ContainerStagger,
} from "@/components/blocks/hero-video";
import FAQ from "@/sections/faq";

const platformStats = [
  { value: "99.2%", label: "Response accuracy" },
  { value: "5+", label: "Data source connectors" },
  { value: "15-50x", label: "ROI on real outcomes" },
];

export default function PlatformPage() {
  return (
    <>
      <div className="h-1"></div>
      <Navbar pill />
      <div className="px-4 xl:px-0 max-w-6xl mx-auto">
        <div className="absolute inset-x-0 top-0 h-[1600px] -z-10 pointer-events-none" />

        {/* Hero Section */}
        <ContainerScroll className="pt-16">
          <ContainerStagger className="flex flex-col items-center justify-center text-center gap-6">
            <SlideEffect delay={0.05}>
              <ContainerAnimated animation="top">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-tight max-w-4xl">
                  Built for{" "}
                  <span className="bg-gradient-to-br from-black via-[#9868a8] to-[#c9a8d4] bg-clip-text text-transparent">
                    Enterprise
                  </span>{" "}
                  <span className="bg-gradient-to-br from-[#c9a8d4] via-[#c9a8d4] to-black bg-clip-text text-transparent">
                    Intelligence
                  </span>{" "}
                </h1>
              </ContainerAnimated>
            </SlideEffect>

            <SlideEffect delay={0.1}>
              <ContainerAnimated
                animation="blur"
                className="text-base text-muted-foreground max-w-2xl"
              >
                A unified platform that turns fragmented enterprise data into a
                connected knowledge graph, purpose-built for security, scale,
                and decision intelligence.
              </ContainerAnimated>
            </SlideEffect>

            <SlideEffect delay={0.15}>
              <ContainerAnimated
                animation="blur"
                className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 pt-2"
              >
                {platformStats.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center">
                    <span className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-black">
                      {stat.value}
                    </span>
                    <span className="text-xs md:text-sm text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </ContainerAnimated>
            </SlideEffect>
          </ContainerStagger>

          <ContainerInset
            insetYRange={[27, 0]}
            insetXRange={[10, 0]}
            roundednessRange={[16, 16]}
            className="max-w-6xl mx-auto mt-8 border"
          >
            <video
              width="100%"
              height="100%"
              loop
              playsInline
              autoPlay
              muted
              className="relative z-10 block h-auto max-h-full w-full object-cover align-middle"
            >
              <source
                src="https://videos.pexels.com/video-files/8084758/8084758-uhd_2560_1440_25fps.mp4"
                type="video/mp4"
              />
            </video>
          </ContainerInset>
        </ContainerScroll>
      </div>

      <div className="px-4 xl:px-0 max-w-6xl mx-auto pt-16">
        <div className="flex flex-col items-center text-center gap-5">
          <SlideEffect>
            <Badge text="Features" Icon={PartyPopper} />
          </SlideEffect>

          <SlideEffect
            direction="top"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter max-w-2xl mx-auto"
          >
            <h2 className="text-black">Everything You Need</h2>
          </SlideEffect>

          <SlideEffect
            delay={0.1}
            className="px-2 sm:px-10 md:px-0 w-full md:max-w-2xl mx-auto text-sm lg:text-base text-muted-foreground"
          >
            From connecting your data to automating your most complex workflows,
            explore the features that make GiKA a complete platform for
            enterprise intelligence.
          </SlideEffect>
        </div>
      </div>

      <Changelog1 entries={changelogEntries} />

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
