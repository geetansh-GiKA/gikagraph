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
    href: "https://playground.gikagraph.ai",
  },
  questions: [
    {
      question: "What is GikaGraph and how does it work?",
      answer:
        "GikaGraph is a domain-specific AI platform that unifies your fragmented business data into a single knowledge graph. It fine-tunes small language models on your own context, so agents can reason over your data with grounded, accurate answers instead of generic AI guesses.",
    },
    {
      question: "What makes GikaGraph different from other AI platforms?",
      answer:
        "Unlike off-the-shelf AI tools, GikaGraph is purpose-built for enterprise-scale accuracy. It combines entity resolution, a unified knowledge graph, and domain-tuned models to deliver 99.2% accuracy with minimal hallucination, at a fraction of the cost of generic LLM deployments.",
    },
    {
      question: "How much does GikaGraph cost and what's included?",
      answer:
        "Pricing depends on data volume, number of integrations, and deployment needs. Talk to our sales team for a tailored quote, or get started on the platform to explore core features firsthand.",
    },
    {
      question: "Can GikaGraph integrate with the tools my team already uses?",
      answer:
        "Yes. GikaGraph connects to sources like Slack, Notion, Google Drive, Salesforce, GitHub, Zendesk, Microsoft Teams, and more, unifying them into one connected knowledge graph without disrupting your existing workflows.",
    },
    {
      question:
        "Is GikaGraph suitable for enterprise and regulated industries?",
      answer:
        "GikaGraph is built for enterprise-scale document volume and RFP-grade precision, making it a strong fit for teams in sales, support, operations, and other data-intensive, high-stakes environments.",
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
