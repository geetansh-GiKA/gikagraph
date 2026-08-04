"use client";

import Image from "next/image";
import {
  ClipboardCheck,
  FileSearch,
  PartyPopper,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import SlideEffect from "@/components/slide-effect";
import Badge from "@/components/badge";
import CTA from "@/sections/cta";
import Footer from "@/sections/footer";
import {
  ContainerAnimated,
  ContainerStagger,
} from "@/components/blocks/hero-video";
import { HeroVideoPlayer } from "@/components/blocks/hero-video-player";
import FAQ from "@/sections/faq";

const rfpStats = [
  { value: "10x", label: "Faster response drafting" },
  { value: "100%", label: "Requirements coverage" },
  { value: "15-50x", label: "ROI on real outcomes" },
];

const rfpStages = [
  {
    title: "Intake & Requirements Extraction",
    description:
      "Upload any RFP document and GiKA automatically extracts every requirement, deadline, and evaluation criterion.",
    icon: FileSearch,
  },
  {
    title: "Evidence Gathering & Win Themes",
    description:
      "GiKA maps requirements to your knowledge graph, gathers supporting evidence, and drafts win-theme-aligned responses.",
    icon: Sparkles,
  },
  {
    title: "Review & Submission-Ready Package",
    description:
      "Human-reviewed at every step, with reject, revise, or approve controls, then assembled into a final submission package.",
    icon: ClipboardCheck,
  },
];

export default function RequestForProposalPage() {
  return (
    <>
      <div className="h-1"></div>
      <Navbar />
      <div className="px-4 xl:px-0 max-w-6xl mx-auto">
        <div className="absolute inset-x-0 top-0 h-[1600px] -z-10 pointer-events-none" />

        {/* Hero Section */}
        <div className="pt-16 pb-[10%]">
          <ContainerStagger className="flex flex-col items-center justify-center text-center gap-6">
            <SlideEffect delay={0.05}>
              <Badge text="Request for Proposal" Icon={Trophy} />
            </SlideEffect>

            <SlideEffect delay={0.075}>
              <ContainerAnimated animation="top">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-tight max-w-4xl">
                  Win More{" "}
                  <span className="bg-gradient-to-br from-black via-[#9868a8] to-[#c9a8d4] bg-clip-text text-transparent">
                    RFPs
                  </span>{" "}
                  <span className="bg-gradient-to-br from-[#c9a8d4] via-[#c9a8d4] to-black bg-clip-text text-transparent">
                    Faster
                  </span>
                </h1>
              </ContainerAnimated>
            </SlideEffect>

            <SlideEffect delay={0.1}>
              <ContainerAnimated
                animation="blur"
                className="text-base text-muted-foreground max-w-2xl"
              >
                An end-to-end RFP workflow that takes a document from intake
                to a final, submission-ready package &mdash; with human
                review built in at every step.
              </ContainerAnimated>
            </SlideEffect>

            <SlideEffect delay={0.15}>
              <ContainerAnimated
                animation="blur"
                className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 pt-2"
              >
                {rfpStats.map((stat) => (
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

          <div
            className="max-w-6xl mt-8 rounded-[28px] overflow-hidden"
            style={{
              padding: "32px",
              background:
                "radial-gradient(circle at 15% 10%, rgba(201,168,212,0.35), transparent 45%), radial-gradient(circle at 90% 85%, rgba(122,78,136,0.3), transparent 55%), linear-gradient(155deg, rgba(152,104,168,0.22) 0%, rgba(122,78,136,0.12) 40%, rgba(152,104,168,0.06) 100%)",
            }}
          >
            <div className="rounded-2xl overflow-hidden">
              <HeroVideoPlayer
                src="/Videos/RFP-demo-web.mp4"
                poster="/Videos/RFPPoster.png"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 xl:px-0 max-w-6xl mx-auto pt-16">
        <div className="flex flex-col items-center text-center gap-5">
          <SlideEffect>
            <Badge text="How It Works" Icon={PartyPopper} />
          </SlideEffect>

          <SlideEffect
            direction="top"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter max-w-2xl mx-auto"
          >
            <h2 className="text-black">From Intake to Submission</h2>
          </SlideEffect>

          <SlideEffect
            delay={0.1}
            className="px-2 sm:px-10 md:px-0 w-full md:max-w-2xl mx-auto text-sm lg:text-base text-muted-foreground"
          >
            GiKA automates the entire RFP lifecycle, so your team can focus on
            winning strategy instead of manual drafting.
          </SlideEffect>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16">
          {rfpStages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <SlideEffect
                key={stage.title}
                direction="top"
                delay={0.08 * index}
                isSpring={false}
                className="h-full"
              >
                <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-[0px_0px_15px_rgba(0,0,0,0.06)]">
                  <div className="absolute -right-6 -top-8 flex h-24 w-24 items-end justify-start rounded-full bg-foreground pb-6 pl-7">
                    <span className="text-xl font-bold text-background">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4 text-start">
                    <div className="flex h-12 w-12 items-center text-foreground">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold tracking-tight leading-snug">
                      {stage.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </SlideEffect>
            );
          })}
        </div>
      </div>

      <div className="px-4 xl:px-0 max-w-6xl mx-auto pt-16 md:pt-24">
        <SlideEffect
          isSpring={false}
          className="relative overflow-hidden rounded-[28px] border border-border"
        >
          <Image
            src="/Features/RFP.png"
            alt="GiKA RFP automation workflow"
            width={1600}
            height={900}
            className="w-full h-auto"
          />
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
