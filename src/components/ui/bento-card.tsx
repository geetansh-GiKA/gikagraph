"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";

export interface BentoCardItem {
  label: string;
  icon: IconSvgElement;
}

export interface BentoCardCategory {
  id: string;
  label: string;
  icon: IconSvgElement;
  items: BentoCardItem[];
}

export interface BentoCardProps {
  title: string;
  description: string;
  categories: BentoCardCategory[];
  stageNumber?: number;
  layout?: "sidebar" | "flat";
}

const BentoCard = ({
  title,
  description,
  categories,
  stageNumber,
  layout = "sidebar",
}: BentoCardProps) => {
  const [activeId, setActiveId] = useState(categories[0]?.id);
  const activeIndex = categories.findIndex((c) => c.id === activeId);
  const active = categories[activeIndex] ?? categories[0];
  const displayNumber = stageNumber ?? Math.max(activeIndex, 0) + 1;

  const flatItems = categories.flatMap((category) => category.items);

  return (
    <div className="flex items-center justify-center w-full h-full antialiased">
      <div className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card m-0">
        <div className="absolute -right-6 -top-8 flex h-24 w-24 items-end justify-start rounded-full bg-foreground pb-6 pl-7 text-background z-20">
          <span className="text-xl font-bold">
            {String(displayNumber).padStart(2, "0")}
          </span>
        </div>

        <div className="p-4 sm:p-6 pr-16 space-y-1.5 z-10 relative">
          <h2 className="text-xs text-muted-foreground uppercase ">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-foreground font-medium leading-snug max-w-[480px]">
            {description}
          </p>
        </div>

        <div className="relative w-full flex-1 min-h-[260px] overflow-hidden rounded-2xl sm:rounded-[2rem] ">
          <div className="absolute top-16 left-16 w-full h-full bg-muted rounded-3xl border border-border/50  opacity-80" />

          <div className="absolute top-8 left-24 w-full h-full bg-background rounded-tl-3xl shadow-xl flex flex-col overflow-hidden ring-6 ring-border">
            <div className="px-5 py-4 rounded-tl-3xl border-b border-border/70 flex items-center relative backdrop-blur-sm">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/20" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/20" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/20" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                <span className="text-xs  text-muted-foreground/50  uppercase">
                  Workspace
                </span>
              </div>
            </div>

            {layout === "flat" ? (
              <div className="flex-1 bg-background p-5 pt-6 flex flex-col gap-2 overflow-hidden relative">
                <ul className="flex flex-col gap-2">
                  {flatItems.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg border border-border/40 bg-background/50"
                    >
                      <HugeiconsIcon
                        icon={item.icon}
                        size={13}
                        className="shrink-0 text-muted-foreground"
                      />
                      <span className="text-[11px] text-foreground font-medium leading-tight">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-background to-transparent pointer-none z-20" />
              </div>
            ) : (
              <div className="flex flex-1 overflow-hidden">
                <div className="w-36 border-r border-border/30 p-2 flex flex-col gap-1 pt-6 bg-muted/5">
                  <LayoutGroup>
                    {categories.map((category) => {
                      const isActive = active?.id === category.id;
                      const Icon = category.icon;

                      return (
                        <button
                          key={category.id}
                          onClick={() => setActiveId(category.id)}
                          className={cn(
                            "relative flex items-center gap-1.5 p-2 rounded-xl text-xs transition-colors cursor-pointer",
                            isActive
                              ? "text-foreground"
                              : "text-muted-foreground hover:text-foreground",
                          )}
                        >
                          <HugeiconsIcon
                            icon={Icon}
                            size={14}
                            className="z-20 shrink-0 relative"
                          />
                          <span className="truncate z-20 relative font-medium">
                            {category.label}
                          </span>

                          {isActive && (
                            <motion.div
                              layoutId="sidebar-pill"
                              className="absolute left-0 w-[2px] h-4 rounded-full bg-foreground z-30 border border-foreground/20"
                              transition={{
                                type: "spring",
                                bounce: 0.2,
                                duration: 0.6,
                              }}
                            />
                          )}
                          {isActive && (
                            <motion.div
                              layoutId="backgroundIndicator"
                              className="absolute inset-0 rounded-lg bg-muted border border-border/40"
                              transition={{
                                type: "spring",
                                bounce: 0.2,
                                duration: 0.6,
                              }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </LayoutGroup>
                </div>

                <div className="flex-1 bg-background p-5 pt-6 flex flex-col gap-4 overflow-hidden relative">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={active?.id}
                      initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="flex-1"
                    >
                      <ul className="flex flex-col gap-2">
                        {active?.items.map((item) => (
                          <li
                            key={item.label}
                            className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg border border-border/40 bg-background/50"
                          >
                            <HugeiconsIcon
                              icon={item.icon}
                              size={13}
                              className="shrink-0 text-muted-foreground"
                            />
                            <span className="text-[11px] text-foreground font-medium leading-tight">
                              {item.label}
                            </span>
                            <span className="size-1.5 rounded-full bg-emerald-500 ml-auto" />
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-background to-transparent pointer-none z-20" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoCard;
