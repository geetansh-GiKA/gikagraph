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
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const time = Number(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  };

  React.useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 1 && !Number.isNaN(video.duration)) {
      setDuration(video.duration);
    }
  }, []);

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
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
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

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-30 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 opacity-0 transition-opacity group-hover:opacity-100",
        )}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <span className="min-w-10 text-xs tabular-nums text-white">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.01}
          value={currentTime}
          onChange={handleSeek}
          className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/30 accent-white [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          aria-label="Seek video"
        />
        <span className="min-w-10 text-xs tabular-nums text-white">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}
