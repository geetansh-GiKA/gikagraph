'use client'

import SlideEffect from "@/components/slide-effect"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const settings = {
  title: 'Start using our app today.',
  description: "Experience the power of entity-aware AI tailored specifically for your enterprise needs.",
  CTA: {
    content: 'Request Demo',
    href: 'https://cal.com/gikagraph/30-mins'
  }
}

export default function CTA() {
  return (
    <SlideEffect isSpring={false} className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 mx-auto text-center p-8 md:p-16 flex flex-col items-center justify-center rounded-2xl bg-secondary">
      {/* Title */}
      <h2 className=" text-2xl md:text-4xl lg:text-header capitalize font-medium leading-normal">
        {settings.title}
      </h2>

      {/* Description */}
      <p className="px-0 sm:px-10 md:px-0 w-full max-w-full md:max-w-3/4 mx-auto text-sm lg:text-base -mt-6">{settings.description}</p>

      {/* CTA */}
      <Link href={settings.CTA.href}>
        <Button className="w-full" size='lg'>{settings.CTA.content}</Button>
      </Link>
    </SlideEffect>
  )
}