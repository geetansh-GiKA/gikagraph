'use client'

import Badge from "@/components/badge"
import SlideEffect from "@/components/slide-effect"
import TextRevealEffect from "@/components/text-reveal-effect"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"

const settings = {
  badge: {
    number: 3,
    text: 'TESTIMONIALS',
  },
  title: 'Join Happy Customers',
  description: 'Discover how leading companies leverage GikaGraph to transform their data intelligence and drive measurable business impact.',
  testimonials: [
    {
      quote:
        "GikaGraph transformed how we handle product search and recommendations. The improved data quality and entity matching led to substantially better discovery rates for niche product searches.",
      name: "Divya Manjari",
      designation: "CEO, Drezily Inc.",
      src: "/customers/Divya.png",
    },
    // {
    //   quote: 
    //     "GikaGraph's entity matching capabilities have significantly improved our customer support. By linking customer queries to accurate product information, we've reduced response times and enhanced customer satisfaction.",
    //   name: "Shanti Mohan",
    //   designation: "Founder, LetsVenture",
    //   src: "/customers/Shanti.png",
    // }
  ]
}

export default function Testimonials() {
  return (
    <div id='testimonials' className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 mx-auto text-center">
      {/* Badge */}
      <SlideEffect>
        <Badge number={settings.badge.number} text={settings.badge.text} />
      </SlideEffect>

      {/* Title */}
      <TextRevealEffect className="text-2xl md:text-4xl lg:text-header text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60 font-medium leading-normal">{settings.title}</TextRevealEffect>

      {/* Description */}
      <SlideEffect className="px-2 sm:px-10 md:px-0 w-full md:max-w-3/4 mx-auto text-sm lg:text-base">{settings.description}</SlideEffect>

      {/* Testimonials */}
      <SlideEffect>
        <AnimatedTestimonials autoplay testimonials={settings.testimonials} />
      </SlideEffect>
    </div>
  )
}