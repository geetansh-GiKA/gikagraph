"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Bebas+Neue&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;

  /* Map to project's actual CSS variables */
  --fg: var(--color-foreground);
  --bg: var(--color-background);
  --accent: var(--color-muted-foreground);

  --pill-bg-1: color-mix(in oklch, var(--fg) 10%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--fg) 6%, transparent);
  --pill-shadow: color-mix(in oklch, var(--bg) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--fg) 20%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--bg) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--fg) 22%, transparent);

  --pill-bg-1-hover: color-mix(in oklch, var(--fg) 18%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--fg) 10%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--fg) 40%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--bg) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--fg) 35%, transparent);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--fg) 12%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--fg) 12%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
      0 10px 30px -10px var(--pill-shadow),
      inset 0 1px 1px var(--pill-highlight),
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
      0 20px 40px -10px var(--pill-shadow-hover),
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--fg);
}

.footer-giant-bg-text {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--fg) 20%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--fg) 35%, transparent) 0%, color-mix(in oklch, var(--fg) 20%, transparent) 60%, transparent 100%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, var(--fg) 0%, color-mix(in oklch, var(--fg) 40%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in oklch, var(--fg) 15%, transparent));
}

/* Entrance animations — pure CSS keyframes, play on mount */
@keyframes footer-rise-in {
  from { opacity: 0; transform: translateX(-50%) translateY(60px) scale(0.85); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
}
@keyframes footer-fade-up {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes footer-fade-up-late {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.footer-giant-text-enter {
  animation: footer-rise-in 1.2s cubic-bezier(0.16,1,0.3,1) both;
}
.footer-heading-enter {
  animation: footer-fade-up 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both;
}
.footer-links-enter {
  animation: footer-fade-up-late 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s both;
}
`;

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Entity Intelligence</span> <span className="text-primary/60">✦</span>
    <span>Knowledge Graphs</span> <span className="text-secondary/60">✦</span>
    <span>Grounded Insights</span> <span className="text-primary/60">✦</span>
    <span>Specialized SLMs</span> <span className="text-secondary/60">✦</span>
    <span>Fragmented Data, Unified</span>{" "}
    <span className="text-primary/60">✦</span>
  </div>
);

export function Footer() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div
        id="site-footer"
        ref={wrapperRef}
        className="relative h-screen w-full overflow-hidden"
      >
        <footer
          className="absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden cinematic-footer-wrapper"
          style={{ backgroundColor: "var(--bg)", color: "var(--fg)" }}
        >
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text — CSS transition driven */}
          <div className="footer-giant-bg-text footer-giant-text-enter absolute left-1/2 bottom-0 whitespace-nowrap z-0 pointer-events-none select-none">
            GIKAGRAPH
          </div>

          {/* Marquee */}
          <div
            className="absolute top-12 left-0 w-full overflow-hidden border-y py-4 z-10 -rotate-2 scale-110 shadow-2xl"
            style={{
              borderColor: "var(--pill-border)",
              backgroundColor: "var(--pill-bg-1)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <div
              className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] uppercase"
              style={{ color: "var(--accent)" }}
            >
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center justify-center flex-1 pt-32 pb-64 px-6 text-center footer-heading-enter">
            <div
              className="footer-glass-pill inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase"
              style={{ color: "var(--accent)" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
              Entity Intelligence Platform
            </div>

            {/* Headline */}
            <h2 className="footer-text-glow text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-3xl mb-4">
              Ready to turn your data
              <br />
              into a knowledge graph?
            </h2>
            <p
              className="text-sm md:text-base max-w-md mb-8"
              style={{ color: "var(--accent)" }}
            >
              Let&apos;s connect your fragmented data sources and ground your
              insights — together.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 footer-links-enter ">
              <Link href="#">
                <Button size="lg" className="capitalize" variant="outline">
                  Book a Call
                  <ArrowRight />
                </Button>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
