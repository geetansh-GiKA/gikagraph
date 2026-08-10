"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";

import { cn } from "@/lib/utils";

interface HeroVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

export function HeroVideoPlayer({
  src,
  poster,
  className,
}: HeroVideoPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const scrollUntilSettled = () => {
    const container = containerRef.current;
    const scrollSection = container?.closest("section");
    if (!scrollSection) return;

    const rect = scrollSection.getBoundingClientRect();
    const sectionBottom = window.scrollY + rect.bottom;
    const target = sectionBottom - window.innerHeight;

    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      scrollUntilSettled();
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div ref={containerRef} className={cn("group relative", className)}>
      <video
        ref={videoRef}
        width="100%"
        height="100%"
        loop
        playsInline
        poster={poster}
        className="relative z-10 block h-auto max-h-full w-full cursor-pointer object-cover align-middle"
        onClick={togglePlayback}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        className={cn(
          "absolute inset-0 z-20 flex items-center justify-center transition-opacity",
          isPlaying
            ? "opacity-0 group-hover:opacity-100"
            : "bg-black/20 opacity-100",
        )}
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-105">
          {isPlaying ? (
            <Pause className="size-6 fill-black text-black" />
          ) : (
            <Play className="ml-1 size-6 fill-black text-black" />
          )}
        </span>
      </button>
    </div>
  );
}
