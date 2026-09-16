"use client";

import {
  Search,
  Target,
  Bookmark,
  BellRing,
  Archive,
  ListChecks,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import SlideEffect from "@/components/slide-effect";
import Badge from "@/components/badge";
import CTA from "@/sections/cta";
import FAQ from "@/sections/faq";
import Footer from "@/sections/footer";
import {
  ContainerAnimated,
  ContainerStagger,
} from "@/components/blocks/hero-video";
import { GlobeCdn } from "@/components/ui/cobe-globe-cdn";
import FitScoreRadar, { fitFactors } from "@/components/fit-score-radar";

const topFitFactors = [...fitFactors]
  .sort((a, b) => b.fit - a.fit)
  .slice(0, 3);

const lifecycleStages = [
  {
    title: "Bookmark What Matters",
    description:
      "Found an opportunity worth exploring? Bookmark it. Your bookmarked bids become your active opportunity set, ready for your team to review, share, and monitor.",
    icon: Bookmark,
  },
  {
    title: "Monitor for Changes",
    description:
      "An RFP can change after it's published. GiKA checks your bookmarked opportunities for newly published addenda, amendments, FAQs, corrigenda, and other updates.",
    icon: BellRing,
  },
  {
    title: "Auto-Archive on Deadline",
    description:
      "Once an opportunity's deadline passes, GiKA automatically moves it to the archive, keeping your active set focused while preserving history for future reference.",
    icon: Archive,
  },
];

export default function RfpDiscoveryPage() {
  return (
    <>
      <div className="h-1"></div>
      <Navbar />
      <div className="px-4 xl:px-0 max-w-6xl mx-auto pt-16 pb-[10%]">
        <ContainerStagger className="flex flex-col items-center justify-center text-center gap-6">
          <SlideEffect delay={0.05}>
            <Badge text="RFP Discovery" Icon={Search} />
          </SlideEffect>

          <SlideEffect delay={0.075}>
            <ContainerAnimated animation="top">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
                Find the Right{" "}
                <span className="bg-gradient-to-br from-black via-[#9868a8] to-[#c9a8d4] bg-clip-text text-transparent">
                  RFPs
                </span>{" "}
                That Matter and Fast
              </h1>
            </ContainerAnimated>
          </SlideEffect>

          <SlideEffect delay={0.1}>
            <ContainerAnimated
              animation="blur"
              className="text-base text-muted-foreground max-w-2xl"
            >
              The right RFP is only valuable if you find it in time. GiKA
              continuously scans the opportunity landscape and surfaces RFPs
              that are genuinely relevant to your business, not simply matches
              to keywords.
            </ContainerAnimated>
          </SlideEffect>
        </ContainerStagger>

        <SlideEffect direction="top" delay={0.15} className="mt-12 md:mt-16">
          <div className="max-w-md mx-auto">
            <GlobeCdn />
          </div>
        </SlideEffect>
      </div>

      {/* Fit Score Section */}
      <div className="px-4 xl:px-0 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center gap-5">
          <SlideEffect>
            <Badge text="Contextual Fit Score" Icon={Target} />
          </SlideEffect>

          <SlideEffect
            direction="top"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter max-w-2xl mx-auto"
          >
            <h2 className="text-black">Beyond Keyword Matching</h2>
          </SlideEffect>

          <SlideEffect
            delay={0.1}
            className="px-2 sm:px-10 md:px-0 w-full md:max-w-2xl mx-auto text-sm lg:text-base text-muted-foreground"
          >
            GiKA reasons across your capabilities, strengths, past bids,
            customers, products, competitive position, resources, risks, and
            opportunities to identify where the strongest fit lies.
          </SlideEffect>
        </div>

        <SlideEffect direction="top" delay={0.15} className="mt-12 md:mt-16">
          <div className="relative overflow-hidden rounded-[28px] border border-border bg-card p-6 md:p-10 shadow-[0px_0px_15px_rgba(0,0,0,0.06)]">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] gap-8 lg:gap-12 items-center">
              <div className="flex flex-col gap-4 text-start">
                <div className="flex items-center justify-start gap-2.5">
                  <ListChecks
                    className="h-6 w-6 shrink-0 text-foreground"
                    strokeWidth={1.75}
                  />
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight leading-snug">
                    A Clear Breakdown, Every Time
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every opportunity receives a contextual fit score, with a
                  clear breakdown of the factors behind it, so your team can
                  quickly distinguish the RFPs worth pursuing from the noise,
                  and understand exactly why.
                </p>

                <div className="flex flex-col gap-3 pt-2">
                  {topFitFactors.map((item) => (
                    <div key={item.factor} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">
                          {item.factor}
                        </span>
                        <span className="text-muted-foreground">
                          {item.fit}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-foreground"
                          style={{ width: `${item.fit}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <FitScoreRadar />
            </div>
          </div>
        </SlideEffect>
      </div>

      {/* Discovery to Active Opportunity Intelligence */}
      <div className="px-4 xl:px-0 max-w-6xl mx-auto pt-16 md:pt-24">
        <div className="flex flex-col items-center text-center gap-5">
          <SlideEffect>
            <Badge text="Active Opportunity Intelligence" Icon={Bookmark} />
          </SlideEffect>

          <SlideEffect
            direction="top"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter max-w-2xl mx-auto"
          >
            <h2 className="text-black">
              From Discovery to Active Opportunity
            </h2>
          </SlideEffect>

          <SlideEffect
            delay={0.1}
            className="px-2 sm:px-10 md:px-0 w-full md:max-w-2xl mx-auto text-sm lg:text-base text-muted-foreground"
          >
            Discover what matters. Track what changes. Act in time.
          </SlideEffect>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16">
          {lifecycleStages.map((stage, index) => {
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
