"use client";

import Badge from "@/components/badge";
import Card from "@/components/card";
import SlideEffect from "@/components/slide-effect";
import Spinner from "@/components/spinner";
import TextRevealEffect from "@/components/text-reveal-effect";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CheckCircle2,
  Zap,
  BarChart3,
  ShieldCheck,
  Globe2,
  Cpu,
} from "lucide-react";

const settings = {
  badge: {
    number: 2,
    text: "Data Intelligence",
  },
  title: "Where Advanced Engineering Meets Human Insight",
  description:
    "GiKA combines specialized small language models with dynamic entity graphs to create a powerful data layer.",
  card_1: {
    title: "Entity-Aware SLMs",
    content:
      "Purpose-built small language models engineered for deep domain expertise and precise recognition of business-specific entities.",
    CTA: {
      content: "Book a Demo",
      href: "https://cal.com/GIKA.AI/30-mins",
    },
    labels: [
      "Entity Relationship",
      "Knowledge Graph",
      "Relationship Mapping",
      "Output Layer",
      "Insight Generation",
    ],
    avatars: [
      "Entity Relationship",
      "Knowledge Graph",
      "Relationship Mapping",
      "Output Layer",
      "Insight Generation",
    ],
  },
  card_2: {
    title: "High-Precision Entity & Data Enrichment",
    content:
      "Accurately identifies key business-specific entities, enriching your data for smarter decisions.",
  },
  card_3: {
    title: "Domain-Tuned Intelligence",
    content:
      "Domain-Tuned, Knowledge-Centric Intelligence — a purpose-built language model tailored to your business context, delivering fast, accurate, and grounded insights for even the most complex queries.",
  },
};

export default function Features4() {
  return (
    <div className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 mx-auto text-center mt-12">
      {/* Badge */}
      <SlideEffect>
        <Badge number={settings.badge.number} text={settings.badge.text} />
      </SlideEffect>

      {/* Title */}
      <TextRevealEffect className="text-2xl md:text-4xl lg:text-header text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60 font-medium leading-normal">
        {settings.title}
      </TextRevealEffect>

      {/* Description */}
      <SlideEffect className="px-2 sm:px-10 md:px-0 w-full md:max-w-3/4 mx-auto text-sm lg:text-base">
        {settings.description}
      </SlideEffect>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* card 1 */}
        <SlideEffect
          direction="top"
          className="grid-cols-1 lg:col-span-2 h-full"
          isSpring={false}
        >
          <Card className="flex flex-col lg:flex-row justify-center items-center">
            <div className="space-y-3 md:space-y-5 flex-1">
              <h3 className="text-xl md:text-title text-foreground font-medium">
                {settings.card_1.title}
              </h3>
              <p className="mb-8 lg:mb-16">{settings.card_1.content}</p>
              <Link href={settings.card_1.CTA.href}>
                <Button className="bg-accent">
                  {settings.card_1.CTA.content}
                </Button>
              </Link>
            </div>

            <Spinner
              labels={settings.card_1.labels}
              avatars={settings.card_1.avatars}
            />
          </Card>
        </SlideEffect>

        {/* card 2 */}
        <SlideEffect
          direction="right"
          className="col-span-1 h-full"
          isSpring={false}
        >
          <Card>
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 flex items-center justify-center shrink-0">
              <BarChart3 className="w-5 h-5 text-sky-400" />
            </div>
            <h3 className="text-xl md:text-title text-foreground font-medium">
              {settings.card_2.title}
            </h3>
            <p className="text-muted-foreground">{settings.card_2.content}</p>
            <div className="w-full mt-auto pt-4 grid grid-cols-2 gap-2">
              {[
                {
                  icon: CheckCircle2,
                  label: "Entity deduplication",
                  color: "text-sky-400",
                },
                {
                  icon: Zap,
                  label: "Real-time enrichment",
                  color: "text-sky-400",
                },
                {
                  icon: ShieldCheck,
                  label: "Data validation",
                  color: "text-sky-400",
                },
                {
                  icon: Globe2,
                  label: "Cross-source linking",
                  color: "text-sky-400",
                },
              ].map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${color}`} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </Card>
        </SlideEffect>

        {/* card 3 */}
        <SlideEffect
          direction="left"
          delay={0.2}
          className="col-span-1 h-full"
          isSpring={false}
        >
          <Card>
            <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center shrink-0">
              <Cpu className="w-5 h-5 text-violet-400" />
            </div>
            <h3 className="text-xl md:text-title text-foreground font-medium">
              {settings.card_3.title}
            </h3>
            <p className="text-muted-foreground">{settings.card_3.content}</p>
            <div className="w-full mt-auto pt-4 flex flex-wrap gap-2">
              {[
                "Domain Fine-Tuned",
                "Low Latency",
                "Grounded Outputs",
                "Context-Aware",
                "Business Logic",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        </SlideEffect>
      </div>
    </div>
  );
}
