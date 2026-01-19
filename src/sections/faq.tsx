'use client'

import SlideEffect from "@/components/slide-effect"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const settings = {
  title: 'Frequently asked questions',
  faqs: [
    {
      question: 'What is GiKA AI?',
      answer: 'GiKA AI is an intelligent decision agent designed for faster decisions, better traceability, market analysis, and competitive intelligence risk, powered by specialized AI models tailored for enterprise-scale performance.',
    },
    {
      question: 'How can GiKA AI benefit my business?',
      answer: 'GiKA AI transforms fragmented data into actionable insights, helps detect market and competition shifts, ensures data ownership, and delivers quantifiable business impact with AI-powered decision intelligence.',
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes. We offer a guided pilot program that allows you to experience the power of entity-aware AI in your own environment. Our deployment team sets everything up, connects your data, and lets your users try GiKA in real-world scenarios—so you can see the value in days, not months.'
    },
    {
      question: 'What type of support does GiKA AI provide?',
      answer: 'With GiKA, you’re never onboarding alone. Our dedicated FDEs partner with your team end-to-end to deliver a seamless, stress-free deployment experience. We guide, configure, fine-tune, and support until everything is running flawlessly and value is flowing'
    },
  ],
}


export default function FAQ() {
  return (
    <div id='faq' className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 mx-auto text-center">
      {/* Title */}
      <SlideEffect>
        <h2 className="text-2xl md:text-4xl lg:text-header capitalize text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60 font-medium leading-normale">{settings.title}</h2>
      </SlideEffect>

      {/* Accordion */}
      <SlideEffect>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto text-base text-foreground">
          {settings.faqs.map((faq, index) => (
            <AccordionItem key={index} value={index + '-item'}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SlideEffect>
    </div>
  )
}