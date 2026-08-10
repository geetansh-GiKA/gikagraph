"use client";

import {
  Check,
  ChevronLeft,
  ChevronRight,
  GripHorizontal,
  Sparkles,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface Highlight {
  id: string;
  icon?: React.ReactNode;
  title: string;
  description?: string;
}

interface Reveal2Props {
  badge?: {
    label: string;
    variant?: "default" | "secondary" | "outline";
  };
  heading?: string;
  description?: string;
  highlights?: Highlight[];
  beforeImage?: {
    src: string;
    alt: string;
  };
  afterImage?: {
    src: string;
    alt: string;
  };
  beforeContent?: React.ReactNode;
  afterContent?: React.ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
  showLabels?: boolean;
  orientation?: "horizontal" | "vertical";
  initialPosition?: number;
  dividerWidth?: number;
  className?: string;
}

export const reveal2Demo: Reveal2Props = {
  badge: { label: "Compare", variant: "secondary" },
  heading: "See the difference",
  description:
    "Drag the slider to compare the before and after states. Our solution delivers measurable improvements.",
  highlights: [
    {
      id: "highlight-1",
      icon: <Check className="size-5" />,
      title: "Performance boost",
      description: "Up to 3x faster load times with optimized rendering.",
    },
    {
      id: "highlight-2",
      icon: <Sparkles className="size-5" />,
      title: "Better clarity",
      description: "Enhanced visuals with improved contrast and sharpness.",
    },
    {
      id: "highlight-3",
      icon: <Zap className="size-5" />,
      title: "Reduced noise",
      description: "Cleaner output with advanced noise reduction algorithms.",
    },
  ],
  beforeImage: {
    src: "https://images.unsplash.com/photo-1558370781-d6196949e317?q=80&w=2958&auto=format&fit=crop&sat=-100",
    alt: "Before",
  },
  afterImage: {
    src: "https://images.unsplash.com/photo-1558370781-d6196949e317?q=80&w=2958&auto=format&fit=crop",
    alt: "After",
  },
  beforeLabel: "Before",
  afterLabel: "After",
  showLabels: true,
  orientation: "horizontal",
  initialPosition: 50,
  dividerWidth: 4,
};

export function Reveal2({
  badge,
  heading,
  description,
  highlights = [],
  beforeImage,
  afterImage,
  beforeContent,
  afterContent,
  beforeLabel = "Before",
  afterLabel = "After",
  showLabels = true,
  orientation = "horizontal",
  initialPosition = 50,
  dividerWidth = 4,
  className,
}: Reveal2Props) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isHorizontal = orientation === "horizontal";

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      if (isHorizontal) {
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setPosition(percentage);
      } else {
        const y = clientY - rect.top;
        const percentage = Math.max(0, Math.min(100, (y / rect.height) * 100));
        setPosition(percentage);
      }
    },
    [isHorizontal],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      handleMove(e.clientX, e.clientY);
    },
    [handleMove],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      const touch = e.touches[0];
      if (touch) {
        handleMove(touch.clientX, touch.clientY);
      }
    },
    [handleMove],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        const touch = e.touches[0];
        if (touch) {
          handleMove(touch.clientX, touch.clientY);
        }
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchend", handleEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, handleMove]);

  const hasContent = Boolean(
    badge || heading || description || highlights.length > 0,
  );

  return (
    <section className={cn("py-16 md:py-16 w-full", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* Slider */}
          <div
            className={cn(
              "rounded-[28px] overflow-hidden md:mt-2",
              hasContent ? "lg:col-span-7" : "lg:col-span-12",
            )}
            style={{
              padding: "20px",
              background:
                "radial-gradient(circle at 15% 10%, rgba(201,168,212,0.35), transparent 45%), radial-gradient(circle at 90% 85%, rgba(122,78,136,0.3), transparent 55%), linear-gradient(155deg, rgba(152,104,168,0.22) 0%, rgba(122,78,136,0.12) 40%, rgba(152,104,168,0.06) 100%)",
            }}
          >
            <div
              ref={containerRef}
              role="slider"
              aria-label="Before/After comparison slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={position}
              tabIndex={0}
              className={cn(
                "relative rounded-2xl overflow-hidden select-none shadow-[0px_0px_25px_rgba(0,0,0,0.12)]",
                "aspect-[16/10] cursor-ew-resize",
                !isHorizontal && "cursor-ns-resize",
              )}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              {/* After Content (Bottom layer - full) */}
              <div className="absolute inset-0 overflow-hidden">
                {afterContent ? (
                  afterContent
                ) : afterImage?.src ? (
                  <img
                    className="absolute inset-0 size-full object-cover"
                    src={afterImage.src}
                    alt={afterImage.alt}
                  />
                ) : (
                  <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">
                      {afterLabel} image
                    </span>
                  </div>
                )}
              </div>

              {/* Before Content (Top layer - clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: isHorizontal
                    ? `inset(0 ${100 - position}% 0 0)`
                    : `inset(0 0 ${100 - position}% 0)`,
                }}
              >
                {beforeContent ? (
                  beforeContent
                ) : beforeImage?.src ? (
                  <img
                    className="absolute inset-0 size-full object-cover"
                    src={beforeImage.src}
                    alt={beforeImage.alt}
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">
                      {beforeLabel} image
                    </span>
                  </div>
                )}
              </div>

              {/* Divider Line */}
              <div
                className={cn(
                  "absolute bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.25)] z-10",
                  isHorizontal
                    ? "top-0 bottom-0 transform -translate-x-1/2"
                    : "left-0 right-0 transform -translate-y-1/2",
                )}
                style={{
                  [isHorizontal ? "left" : "top"]: `${position}%`,
                  [isHorizontal ? "width" : "height"]: `${dividerWidth}px`,
                }}
              >
                {/* Handle */}
                <div
                  className={cn(
                    "absolute bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.25)]",
                    "flex items-center justify-center gap-0.5",
                    "w-11 h-11 ring-1 ring-black/5",
                    "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                    "transition-transform duration-150",
                    isDragging && "scale-110",
                  )}
                >
                  {isHorizontal ? (
                    <>
                      <ChevronLeft className="w-3.5 h-3.5 text-foreground/70 -mr-1" />
                      <ChevronRight className="w-3.5 h-3.5 text-foreground/70 -ml-1" />
                    </>
                  ) : (
                    <GripHorizontal className="w-5 h-5 text-foreground/70" />
                  )}
                </div>
              </div>

              {/* Labels */}
              {showLabels && (
                <>
                  <div
                    className={cn(
                      "absolute z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                      "bg-background text-foreground text-xs font-semibold tracking-wide",
                      "shadow-sm border border-border",
                      "top-4 left-4",
                    )}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                    {beforeLabel}
                  </div>
                  <div
                    className={cn(
                      "absolute z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                      "bg-background text-foreground text-xs font-semibold tracking-wide",
                      "shadow-sm border border-border",
                      isHorizontal ? "top-4 right-4" : "bottom-4 left-4",
                    )}
                  >
                    <Sparkles className="h-3 w-3" />
                    {afterLabel}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reveal2;
