'use client'

import Badge from "@/components/badge"
import FlipCard from "@/components/flip-card"
import Carousel from "@/components/carousel"
import SlideEffect from "@/components/slide-effect"

const settings = {
  badge: {
    number: 1,
    text: 'Domain-Specific AI',
  },
  title: 'Purpose-Driven',
  description: 'Engineered for enterprise-scale performance, our platform transforms fragmented data into grounded, actionable insights that business can trust using our specialized AI platform.',
  card_1: {
    title: 'LLM\'s Aren\'t Enough',
    content: 'Off-the-shelf LLMs lack the depth, precision, and adaptability required for real business impact. Missing Business Context, High Hallucination Risk, Generic Cookie-cutter output, High Operational Costs.',
    solutionTitle: 'Domain-Tuned SLMs',
    solutionPoints: [
      'Industry-specific fine-tuning',
      '99.2% accuracy rate',
      'Minimal hallucination',
      '10x cost reduction',
    ],
    carousel_images: [
      // "https://upload.wikimedia.org/wikipedia/commons/e/e6/Mistral_AI_logo_%282025%E2%80%93%29.svg",
      "https://upload.wikimedia.org/wikipedia/commons/6/66/OpenAI_logo_2025_%28symbol%29.svg",
      "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
      "https://upload.wikimedia.org/wikipedia/commons/1/14/Anthropic.png",
    ]
  },
  card_2: {
    title: 'Own Your Data',
    content: 'Businesses suffer due to: Fragmented & Inconsistent Data, No unified Intelligence, Knowledge is scattered, no clear ownership.',
    solutionTitle: 'Unified Knowledge Graph',
    solutionPoints: [
      'Full data ownership',
      'Entity resolution',
      'Single source of truth',
      'Connected data sources',
    ],
  },
  card_3: {
    title: 'All Data, One Brain',
    content: 'Enterprises struggle because: Information is fragmented and scattered, No Unified View – impacts strategic decisions quality, Missing External Context – Competitor moves and market shifts.',
    solutionTitle: 'Entity Intelligence Engine',
    solutionPoints: [
      'Unified internal & external data',
      'Real-time market intelligence',
      'Competitor tracking',
      '360° business view',
    ],
  },
  card_4: {
    title: 'Built for Business Impact',
    content: 'Generic AI solutions fail to deliver ROI. They lack domain expertise, require extensive customization, and produce insights that don\'t align with business objectives.',
    solutionTitle: 'Measurable Outcomes',
    solutionPoints: [
      '15-50x ROI',
      'Automated workflows',
      'Intelligent alerts',
      'AI recommendations',
    ],
    carousel_images: [
      
    ]
  },
}

export default function Features1() {
  return (
    <div id='features' className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 mx-auto text-center -mt-16">
      {/* Badge */}
      <SlideEffect>
        <Badge number={settings.badge.number} text={settings.badge.text} />
      </SlideEffect>

      {/* Title */}
      <SlideEffect>
        <h2 className="text-2xl md:text-4xl lg:text-header capitalize font-medium leading-none text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60">{settings.title}</h2>
      </SlideEffect>

      {/* Description */}
      <SlideEffect className="px-2 sm:px-10 md:px-0 w-full md:max-w-3/4 mx-auto text-sm lg:text-base">{settings.description}</SlideEffect>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* card 1 */}
        <SlideEffect direction="right" className="col-span-1 lg:col-span-3 min-h-[320px]" isSpring={false}>
          <FlipCard
            frontTitle={settings.card_1.title}
            frontContent={settings.card_1.content}
            solutionTitle={settings.card_1.solutionTitle}
            solutionPoints={settings.card_1.solutionPoints}
            carousel={<Carousel images={settings.card_1.carousel_images} />}
          />
        </SlideEffect>

        {/* card 2 */}
        <SlideEffect direction="left" duration={1.3} className="col-span-1 lg:col-span-2 min-h-[320px]" isSpring={false}>
          <FlipCard
            frontTitle={settings.card_2.title}
            frontContent={settings.card_2.content}
            solutionTitle={settings.card_2.solutionTitle}
            solutionPoints={settings.card_2.solutionPoints}
          />
        </SlideEffect>

        {/* card 3 */}
        <SlideEffect direction="right" duration={1} className="col-span-1 lg:col-span-2 min-h-[320px]" isSpring={false}>
          <FlipCard
            frontTitle={settings.card_3.title}
            frontContent={settings.card_3.content}
            solutionTitle={settings.card_3.solutionTitle}
            solutionPoints={settings.card_3.solutionPoints}
          />
        </SlideEffect>

        {/* card 4 */}
        <SlideEffect direction="left" className="col-span-1 lg:col-span-3 min-h-[320px]" isSpring={false}>
          <FlipCard
            frontTitle={settings.card_4.title}
            frontContent={settings.card_4.content}
            solutionTitle={settings.card_4.solutionTitle}
            solutionPoints={settings.card_4.solutionPoints}
            // carousel={<Carousel images={settings.card_4.carousel_images} />}
          />
        </SlideEffect>
      </div>
    </div>
  )
}
