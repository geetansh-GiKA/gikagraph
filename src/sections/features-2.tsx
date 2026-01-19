'use client'

import Badge from "@/components/badge"
import Card from "@/components/card"
import SlideEffect from "@/components/slide-effect"
import Spinner from "@/components/spinner"
import TextRevealEffect from "@/components/text-reveal-effect"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const settings = {
  badge: {
    number: 2,
    text: 'Engineering Intelligence',
  },
  title: 'Where Advanced Engineering Meets Human Insight',
  description: 'GiKA combines specialized small language models with dynamic entity graphs to create a powerful data layer.',
  card_1: {
    title: 'Entity-Aware SLMs',
    content: "Purpose-built small language models engineered for deep domain expertise and precise recognition of business-specific entities.",
    CTA: {
      content: 'Book a Demo',
      href: 'https://cal.com/gikagraph/30-mins'
    },
    labels: [
      'Entity Relationship',
      'Knowledge Graph',
      'Relationship Mapping',
      'Output Layer',
      'Insight Generation'
    ],
    avatars: [
      'Entity Relationship',
      'Knowledge Graph',
      'Relationship Mapping',
      'Output Layer',
      'Insight Generation'
    ]
  },
  card_2: {
    title: 'High-Precision Entity & Data Enrichment',
    content: 'Accurately identifies key business-specific entities, enriching your data for smarter decisions.',
  },
  card_3: {
    title: 'Domain-Tuned Intelligence',
    content: 'Domain-Tuned, Knowledge-Centric Intelligence — a purpose-built language model tailored to your business context, delivering fast, accurate, and grounded insights for even the most complex queries.',
  },
}

export default function Features4() {
  return (
    <div className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 mx-auto text-center mt-12">
      {/* Badge */}
      <SlideEffect>
        <Badge number={settings.badge.number} text={settings.badge.text} />
      </SlideEffect>

      {/* Title */}
      <TextRevealEffect className="text-2xl md:text-4xl lg:text-header text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60 font-medium leading-normal">{settings.title}</TextRevealEffect>

      {/* Description */}
      <SlideEffect className="px-2 sm:px-10 md:px-0 w-full md:max-w-3/4 mx-auto text-sm lg:text-base">{settings.description}</SlideEffect>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* card 1 */}
        <SlideEffect direction="top" className="grid-cols-1 lg:col-span-2 h-full" isSpring={false}>
          <Card className="flex flex-col lg:flex-row justify-center items-center">
            <div className="space-y-3 md:space-y-5 flex-1">
              <h3 className="text-xl md:text-title text-foreground font-medium">{settings.card_1.title}</h3>
              <p className="mb-8 lg:mb-16">{settings.card_1.content}</p>
              <Link href={settings.card_1.CTA.href}>
                <Button className="bg-accent">{settings.card_1.CTA.content}</Button>
              </Link>
            </div>

            <Spinner labels={settings.card_1.labels} avatars={settings.card_1.avatars} />
          </Card>
        </SlideEffect>

        {/* card 2 */}
        <SlideEffect direction="right" className="col-span-1 h-full" isSpring={false}>
          <Card>
            <h3 className="text-xl md:text-title text-foreground font-medium">{settings.card_2.title}</h3>
            <p>{settings.card_2.content}</p>
          </Card>
        </SlideEffect>

        {/* card 3 */}
        <SlideEffect direction="left" delay={0.2} className="col-span-1 h-full" isSpring={false}>
          <Card>
            <h3 className="text-xl md:text-title text-foreground font-medium">{settings.card_3.title}</h3>
            <p>{settings.card_3.content}</p>
          </Card>
        </SlideEffect>

        
      </div>
    </div>
  )
}