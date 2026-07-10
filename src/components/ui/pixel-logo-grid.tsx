"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef } from "react";

/* -----------------------------------------------------------------------------
 * Pixel canvas
 * Animated grid of pixels that ripples in from the center on hover and fades
 * out on leave. Colors are drawn from the card's brand palette.
 * -------------------------------------------------------------------------- */

type Pixel = {
  x: number;
  y: number;
  color: string;
  ctx: CanvasRenderingContext2D;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInt: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;
  draw: () => void;
  appear: () => void;
  disappear: () => void;
  shimmer: () => void;
};

function createPixel(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  color: string,
  baseSpeed: number,
  delay: number,
): Pixel {
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  const p: Pixel = {
    x,
    y,
    color,
    ctx,
    speed: rand(0.1, 0.9) * baseSpeed,
    size: 0,
    sizeStep: Math.random() * 0.4,
    minSize: 0.5,
    maxSizeInt: 2,
    maxSize: rand(0.5, 2),
    delay,
    counter: 0,
    counterStep: Math.random() * 4 + (canvas.width + canvas.height) * 0.01,
    isIdle: false,
    isReverse: false,
    isShimmer: false,
    draw() {
      const offset = p.maxSizeInt * 0.5 - p.size * 0.5;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x + offset, p.y + offset, p.size, p.size);
    },
    appear() {
      p.isIdle = false;
      if (p.counter <= p.delay) {
        p.counter += p.counterStep;
        return;
      }
      if (p.size >= p.maxSize) p.isShimmer = true;
      if (p.isShimmer) p.shimmer();
      else p.size += p.sizeStep;
      p.draw();
    },
    disappear() {
      p.isShimmer = false;
      p.counter = 0;
      if (p.size <= 0) {
        p.isIdle = true;
        return;
      }
      p.size -= 0.1;
      p.draw();
    },
    shimmer() {
      if (p.size >= p.maxSize) p.isReverse = true;
      else if (p.size <= p.minSize) p.isReverse = false;
      if (p.isReverse) p.size -= p.speed;
      else p.size += p.speed;
    },
  };

  return p;
}

type PixelCanvasProps = {
  colors: string[];
  gap?: number;
  speed?: number;
};

function PixelCanvas({ colors, gap = 5, speed = 30 }: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>(0);
  const lastFrameRef = useRef(performance.now());
  const reducedMotionRef = useRef(false);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = wrap.getBoundingClientRect();
    const w = Math.floor(width);
    const h = Math.floor(height);
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const effectiveSpeed = reducedMotionRef.current
      ? 0
      : Math.min(speed, 100) * 0.001;
    const pixels: Pixel[] = [];

    // Each pixel's delay is its distance from the canvas center, so the
    // animation ripples outward from the middle on hover.
    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const dx = x - w / 2;
        const dy = y - h / 2;
        const delay = reducedMotionRef.current
          ? 0
          : Math.sqrt(dx * dx + dy * dy);
        pixels.push(
          createPixel(ctx, canvas, x, y, color, effectiveSpeed, delay),
        );
      }
    }

    pixelsRef.current = pixels;
  }, [colors, gap, speed]);

  const animate = useCallback((mode: "appear" | "disappear") => {
    cancelAnimationFrame(animationRef.current);
    const frameInterval = 1000 / 60;

    const loop = () => {
      animationRef.current = requestAnimationFrame(loop);

      const now = performance.now();
      const elapsed = now - lastFrameRef.current;
      if (elapsed < frameInterval) return;
      lastFrameRef.current = now - (elapsed % frameInterval);

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pixels = pixelsRef.current;
      for (const pixel of pixels) pixel[mode]();

      if (pixels.every((p) => p.isIdle)) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    animationRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    init();

    const resizeObserver = new ResizeObserver(() => init());
    if (wrapRef.current) resizeObserver.observe(wrapRef.current);

    // Hover is tracked on the parent card, not the canvas, so that the canvas
    // itself never blocks pointer events on the logo above it.
    const card = wrapRef.current?.parentElement;
    const handleEnter = () => animate("appear");
    const handleLeave = () => animate("disappear");
    card?.addEventListener("mouseenter", handleEnter);
    card?.addEventListener("mouseleave", handleLeave);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationRef.current);
      card?.removeEventListener("mouseenter", handleEnter);
      card?.removeEventListener("mouseleave", handleLeave);
    };
  }, [init, animate]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Logo data
 * - brandLight is the color used in light mode (default).
 * - brandDark overrides it in dark mode for logos whose light-mode color
 *   would be invisible on a dark card background.
 * - Each card renders the company name as a wordmark (no brand SVGs on hand);
 *   row/col map onto the 4x2 grid.
 * -------------------------------------------------------------------------- */

type Logo = {
  name: string;
  brandLight: string;
  brandDark?: string;
  pixelColors: string[];
  row: number;
  col: number;
};

const LOGOS: Logo[] = [
  // Row 1
  {
    name: "Samsung",
    brandLight: "#1428A0",
    brandDark: "#4F6DFF",
    pixelColors: ["#1428A0", "#3B5BDB", "#4F6DFF"],
    row: 1,
    col: 1,
  },
  {
    name: "Microsoft",
    brandLight: "#737373",
    brandDark: "#737373",
    pixelColors: ["#F25022", "#7FBA00", "#00A4EF", "#FFB900"],
    row: 1,
    col: 2,
  },
  {
    name: "Razorpay",
    brandLight: "#072654",
    brandDark: "#2B7FFF",
    pixelColors: ["#072654", "#0F5BFF", "#2B7FFF"],
    row: 1,
    col: 3,
  },
  {
    name: "Uber",
    brandLight: "#000000",
    brandDark: "#000000",
    pixelColors: ["#000000", "#545454", "#FFFFFF"],
    row: 1,
    col: 4,
  },

  // Row 2
  {
    name: "Amazon",
    brandLight: "#8B5A2B",
    brandDark: "#000000",
    pixelColors: ["#146eb4", "#ff9900", "#000000"],
    row: 2,
    col: 1,
  },
  {
    name: "Rippling",
    brandLight: "#5B2A86",
    brandDark: "#000",
    pixelColors: ["#5B2A86", "#7B3FC7", "#A66BFF"],
    row: 2,
    col: 2,
  },
  {
    name: "Sprinklr",
    brandLight: "#FF6A39",
    brandDark: "#FF9A73",
    pixelColors: ["#FF6A39", "#FF8157", "#FF9A73"],
    row: 2,
    col: 3,
  },
  {
    name: "IBM",
    brandLight: "#052FAD",
    brandDark: "#4F6DFF",
    pixelColors: ["#052FAD", "#1261FE", "#4A90FF"],
    row: 2,
    col: 4,
  },
];

/* -----------------------------------------------------------------------------
 * Logo card
 * Combines the pixel shimmer with the company wordmark. On hover the
 * wordmark shifts from muted-foreground to the brand color, and the card
 * gains a brand-tinted shadow and outline glow.
 * -------------------------------------------------------------------------- */

function LogoCard({ logo }: { logo: Logo }) {
  const { name, brandLight, brandDark, pixelColors, row, col } = logo;

  return (
    <div
      className={cn(
        "group relative grid place-items-center overflow-hidden bg-card cursor-pointer select-none isolate",
        "transition-shadow duration-300 hover:z-[2]",
        // --brand resolves to --brand-light by default, or to --brand-dark when
        // an ancestor has the .dark class. Lets hover colors stay theme-aware.
        "[--brand:var(--brand-light)] dark:[--brand:var(--brand-dark)]",
        "hover:shadow-[0_8px_24px_-8px_color-mix(in_srgb,var(--brand)_25%,transparent),0_0_0_1px_color-mix(in_srgb,var(--brand)_40%,transparent)]",
      )}
      style={
        {
          "--brand-light": brandLight,
          "--brand-dark": brandDark ?? brandLight,
          gridRow: row,
          gridColumn: col,
        } as React.CSSProperties
      }
    >
      <PixelCanvas colors={pixelColors} gap={5} speed={30} />
      <span
        className={cn(
          "relative z-[1] text-lg md:text-xl font-semibold tracking-tight transition-all duration-300",
          "text-muted-foreground/60 group-hover:text-[var(--brand)] group-hover:scale-[1.06]",
        )}
      >
        {name}
      </span>
    </div>
  );
}

export const Component = () => {
  return (
    <div
      className="grid grid-cols-4 w-full max-w-[75.8rem] mx-auto gap-px bg-border border border-border rounded-xl overflow-hidden"
      style={{ gridTemplateRows: "repeat(2, 96px)" }}
    >
      {LOGOS.map((logo) => (
        <LogoCard key={logo.name} logo={logo} />
      ))}
      <div className="bg-card" style={{ gridRow: 2, gridColumn: 4 }} />
    </div>
  );
};
