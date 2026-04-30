'use client'

import SlideEffect from "@/components/slide-effect"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const settings = {
  title: 'Start Using Our Platform Today.',
  description: "Experience the power of entity-aware AI tailored specifically for your enterprise needs.",
  CTA: {
    content: 'Request Demo',
    href: 'https://cal.com/gikagraph/30-mins'
  }
}

export default function CTA() {
  return (
    <SlideEffect isSpring={false} className="relative mx-auto text-center">
      {/* Glow behind the card */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl blur-[80px] bg-primary/20" />

      {/* Gradient border wrapper */}
      <div className="rounded-3xl p-px bg-gradient-to-br from-primary/50 via-accent/30 to-primary/10">
        <div className="space-y-6 sm:space-y-7 md:space-y-8 p-8 md:p-16 flex flex-col items-center justify-center rounded-[calc(1.5rem-1px)] bg-secondary">
          {/* Title */}
          <h2 className="text-2xl md:text-4xl lg:text-header capitalize font-medium leading-normal text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70">
            {settings.title}
          </h2>

          {/* Description */}
          <p className="px-0 sm:px-10 md:px-0 w-full max-w-full md:max-w-3/4 mx-auto text-sm lg:text-base -mt-4 text-muted-foreground">{settings.description}</p>

          {/* CTA */}
          <Link href={settings.CTA.href}>
            <Button className="w-full shadow-lg shadow-primary/25" size='lg'>{settings.CTA.content}</Button>
          </Link>
        </div>
      </div>
    </SlideEffect>
  )
}