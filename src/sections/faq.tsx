"use client";

import Link from "next/link";
import { ArrowRight, Plus, X } from "lucide-react";

import Badge from "@/components/badge";
import SlideEffect from "@/components/slide-effect";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const settings = {
  badge: { text: "FAQ" },
  headline: "Frequently asked questions",
  description: "These are some of our most frequently asked questions.",
  primaryCTA: {
    content: "Talk to sales",
    href: "#",
  },
  secondaryCTA: {
    content: "Get started",
    href: "https://cal.com/gikagraph/30-mins",
  },
  questions: [
    {
      question: "What is GiKA AI?",
      answer:
        "GiKA AI is an intelligent decision agent designed for faster decisions, better traceability, market analysis, and competitive intelligence risk, powered by specialized AI models tailored for enterprise-scale performance.",
    },
    {
      question: "How can GiKA AI benefit my business?",
      answer:
        "GiKA AI transforms fragmented data into actionable insights, helps detect market and competition shifts, ensures data ownership, and delivers quantifiable business impact with AI-powered decision intelligence.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes. We offer a guided pilot program that allows you to experience the power of entity-aware AI in your own environment. Our deployment team sets everything up, connects your data, and lets your users try GiKA in real-world scenarios—so you can see the value in days, not months.",
    },
    {
      question: "What type of support does GiKA AI provide?",
      answer:
        "With GiKA, you’re never onboarding alone. Our dedicated FDEs partner with your team end-to-end to deliver a seamless, stress-free deployment experience. We guide, configure, fine-tune, and support until everything is running flawlessly and value is flowing",
    },
  ],
};

export default function FAQ() {
  return (
    <div id="faq" className="space-y-12 mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-5">
        <SlideEffect>
          <Badge text={settings.badge.text} icon="/Faq.png" />
        </SlideEffect>

        <SlideEffect
          direction="top"
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-3xl mx-auto"
        >
          {settings.headline}
        </SlideEffect>

        <SlideEffect
          delay={0.1}
          className="px-2 sm:px-10 md:px-0 w-full md:max-w-xl mx-auto text-sm lg:text-base text-muted-foreground"
        >
          {settings.description}
        </SlideEffect>

        <SlideEffect delay={0.15}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href={settings.secondaryCTA.href}>
              <Button size="lg" variant="outline">
                {settings.secondaryCTA.content}
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </SlideEffect>
      </div>

      {/* Questions */}
      <SlideEffect delay={0.2} className="max-w-5xl mx-auto w-full">
        <Accordion
          type="single"
          collapsible
          defaultValue="item-0"
          className="w-full"
        >
          {settings.questions.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`}>
              <AccordionTrigger className="text-base md:text-lg font-semibold [&>svg]:hidden group">
                {item.question}
                <span className="text-muted-foreground shrink-0 translate-y-0.5">
                  <Plus className="size-4 group-data-[state=open]:hidden" />
                  <X className="size-4 hidden group-data-[state=open]:block" />
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SlideEffect>
    </div>
  );
}
