'use client'

import Navbar from "@/components/navbar";
import SlideEffect from "@/components/slide-effect";
import TextBlurEffect from "@/components/text-blur-effect";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import AnimatedHeroDashboard from "@/components/animated-hero-dashboard";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

const settings = {
  headline: 'AI That Truly Understands Your Data',
  subheadline: 'An intelligent decision-making agent designed to support data-driven insights.',
  mainCTA: {
    content: 'Explore Platform',
    href: 'https://playground.gikagraph.ai'
  },
  secondaryCTA: {
    content: 'view live demo',
    href: '#'
  },
  illustration: '/illustration.svg',
  reviews: [
    {
      name: "John Doe",
    designation: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      name: "Robert Johnson",
      designation: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "Jane Smith",
      designation: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "Emily Davis",
      designation: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "Tyler Durden",
      designation: "Soap Developer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    }
  ]
}

export default function Hero() {
  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20 z-50 relative">
      <Navbar />
    
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        {/* Left Side - Hero Content */}
        <div className="flex-1 flex flex-col gap-6 lg:gap-8 text-center lg:text-left">
          <h1 className="text-foreground text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-none break-keep">
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

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center">
              <AnimatedTooltip items={settings.reviews} />

              <div className="flex flex-col items-center sm:items-start gap-1">
                <div className="flex gap-px">
                  <Star size={14} fill='oklch(0.795 0.184 86.047)' className="text-yellow-500" />
                  <Star size={14} fill='oklch(0.795 0.184 86.047)' className="text-yellow-500" />
                  <Star size={14} fill='oklch(0.795 0.184 86.047)' className="text-yellow-500" />
                  <Star size={14} fill='oklch(0.795 0.184 86.047)' className="text-yellow-500" />
                  <Star size={14} fill='oklch(0.795 0.184 86.047)' className="text-yellow-500" />
                </div>
                <span className="text-xs text-muted-foreground">Trusted by Customers</span>
              </div>
            </div>
          </SlideEffect>
        </div>
        
        {/* Right Side - Enhanced Dashboard */}
        <SlideEffect className="w-full lg:w-1/2 xl:w-auto xl:flex-shrink-0 xl:max-w-2xl" isSpring={false} duration={1.3}>
          <div className="bg-card/50 dark:bg-card/30 backdrop-blur-md rounded-2xl border border-border/60 p-3 sm:p-5 shadow-xl shadow-black/5 dark:shadow-black/20">
            <AnimatedHeroDashboard />
          </div>
        </SlideEffect>
      </section>
    </div>
  )
}
