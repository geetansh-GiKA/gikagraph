"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Badge from "@/components/badge";
import SlideEffect from "@/components/slide-effect";
import { MacbookFrame } from "@/components/ui/macbook-frame";
import { ScaledScreen } from "@/components/ui/onboarding-screens/scaled-screen";
import { SignInScreen } from "@/components/ui/onboarding-screens/sign-in-screen";
import { WorkspacesScreen } from "@/components/ui/onboarding-screens/workspaces-screen";
import { KnowledgeBaseScreen } from "@/components/ui/onboarding-screens/knowledge-base-screen";
import { ChatScreen } from "@/components/ui/onboarding-screens/chat-screen";
import { LogIn, LayoutGrid, FolderOpen, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Sign In", icon: LogIn, Screen: SignInScreen },
  { label: "Workspaces", icon: LayoutGrid, Screen: WorkspacesScreen },
  { label: "Knowledge Base", icon: FolderOpen, Screen: KnowledgeBaseScreen },
  { label: "Ask Questions", icon: MessageSquare, Screen: ChatScreen },
];

const STEP_DURATION = 3500;

export default function OnboardingFlowDemo() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, STEP_DURATION);
    return () => clearInterval(interval);
  }, []);

  const ActiveScreen = steps[activeIndex].Screen;

  return (
    <div className="py-16 md:py-24 px-4">
      <div className="flex flex-col items-center text-center gap-5 max-w-3xl mx-auto">
        <SlideEffect>
          <Badge text="Get Started in Minutes" Icon={LogIn} />
        </SlideEffect>

        <SlideEffect
          direction="top"
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter"
        >
          <h2 className="text-foreground">From Sign-In to Insight</h2>
        </SlideEffect>

        <SlideEffect
          delay={0.1}
          className="px-2 sm:px-10 md:px-0 w-full md:max-w-xl mx-auto text-sm lg:text-base text-muted-foreground"
        >
          A quick look at the onboarding flow — sign in, spin up a workspace,
          build your knowledge base, and start asking questions.
        </SlideEffect>
      </div>

      <SlideEffect delay={0.2} className="mt-10">
        <MacbookFrame>
          <ScaledScreen>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <ActiveScreen />
              </motion.div>
            </AnimatePresence>
          </ScaledScreen>
        </MacbookFrame>
      </SlideEffect>

      <SlideEffect
        delay={0.25}
        className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto"
      >
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = i === activeIndex;
          return (
            <button
              key={step.label}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2 text-xs md:text-sm font-medium transition-colors",
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-3.5" strokeWidth={2} />
              {step.label}
            </button>
          );
        })}
      </SlideEffect>
    </div>
  );
}
