'use client'

import Navbar from "@/components/navbar";
import SlideEffect from "@/components/slide-effect";
import TextBlurEffect from "@/components/text-blur-effect";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AnimatedHeroDashboard from "@/components/animated-hero-dashboard";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

const settings = {
  headline: 'AI That Truly Understands Your Data',
  subheadline: 'An intelligent decision-making platform that delivers better responses, reduces analytical burden, and drives measurable business outcomes.',
  mainCTA: {
    content: 'Explore Platform',
    href: 'https://playground.gikagraph.ai'
  },
  secondaryCTA: {
    content: 'view live demo',
    href: '#'
  },
}

export default function Hero() {
  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20 z-50 relative">
      <Navbar />

      <section className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center relative">
        {/* Hero background glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/10 blur-[100px] -z-10" />

        {/* Left Side - Hero Content */}
        <div className="flex-1 flex flex-col gap-6 lg:gap-8 text-center lg:text-left">
          <h1 className="text-foreground text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight break-keep">
            <TextBlurEffect className='text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60'>{settings.headline}</TextBlurEffect>
          </h1>

          <SlideEffect delay={0} className="text-sm lg:text-base text-muted-foreground max-w-xl mx-auto lg:mx-0">
            {settings.subheadline}
          </SlideEffect>

          <SlideEffect className="flex flex-col gap-5 items-center lg:items-start w-full">
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start w-full gap-3">
              <Link href={settings.mainCTA.href} className="w-full sm:w-auto">
                <Button size='lg' className="capitalize w-full">
                  {settings.mainCTA.content}
                  <ArrowRight />
                </Button>
              </Link>

              <HeroVideoDialog
                videoSrc="https://www.youtube.com/embed/rivJ6WXKzUA?autoplay=1"
                thumbnailSrc="/blog.png"
                thumbnailAlt="Live demo video"
                trigger={
                  <Button size='lg' className="capitalize w-full sm:w-auto" variant='secondary'>
                    {settings.secondaryCTA.content}
                  </Button>
                }
              />
            </div>

            <div className="flex items-start gap-3 max-w-sm text-left border border-border/50 rounded-xl px-4 py-3 bg-card/40">
              <span className="text-2xl leading-none text-muted-foreground/60 mt-0.5">&ldquo;</span>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground leading-relaxed">Improved data quality and entity matching led to substantially better discovery rates for niche product searches.</p>
                <div className="flex items-center gap-2 mt-2">
                  <Image src="/customers/Divya.png" alt="Divya Manjari" width={24} height={24} className="rounded-full object-cover" />
                  <p className="text-xs font-medium text-foreground">Divya Manjari &mdash; CEO, Drezily Inc.</p>
                </div>
              </div>
            </div>
          </SlideEffect>
        </div>
        
        {/* Right Side - Enhanced Dashboard */}
        <SlideEffect className="w-full lg:w-1/2 xl:w-auto xl:flex-shrink-0 xl:max-w-2xl" isSpring={false} duration={1.3}>
          <div className="mb-3 text-center">

            <h2 className="text-base font-semibold text-foreground">The Numbers Tell the Story</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Real impact metrics from enterprise deployments — not estimates.</p>
          </div>
          <div className="bg-card/50 dark:bg-card/30 backdrop-blur-md rounded-2xl border border-border/60 p-3 sm:p-5 shadow-xl shadow-black/5 dark:shadow-black/20">
            <AnimatedHeroDashboard />
          </div>
        </SlideEffect>
      </section>
    </div>
  )
}
