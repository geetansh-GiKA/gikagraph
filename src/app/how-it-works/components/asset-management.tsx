"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
} from "recharts";
import {
  PiggyBank,
  Send,
  ArrowRight,
  RefreshCcw,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  Lightbulb,
} from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import CountUp from "react-countup";

// --------------------
// Types
// --------------------

interface ConfettiParticleProps {
  color: string;
  left: number;
  delay: number;
  duration: number;
  size: string;
}

interface SectionVisibility {
  competitorAnalysis: boolean;
  customerEngagement: boolean;
  missedOpportunities: boolean;
  recommendations: boolean;
}

// --------------------
// Confetti components
// --------------------

const ConfettiParticle: React.FC<ConfettiParticleProps> = ({
  color,
  left,
  delay,
  duration,
  size,
}) => (
  <motion.div
    className="absolute top-0 rounded-full pointer-events-none"
    style={{
      left: `${left}%`,
      width: size,
      height: size,
      backgroundColor: color,
      zIndex: 10,
    }}
    initial={{ top: "-10%" }}
    animate={{
      top: "110%",
      rotate: [0, 360],
      x: [
        0,
        Math.random() > 0.5 ? 20 : -20,
        0,
        Math.random() > 0.5 ? -20 : 20,
        0,
      ],
    }}
    transition={{
      duration,
      delay,
      ease: [0.1, 0.25, 0.3, 1],
    }}
  />
);

const ConfettiEffect: React.FC = () => {
  const particles: React.ReactNode[] = [];
  const colors = [
    "#10B981",
    "#3B82F6",
    "#6366F1",
    "#F59E0B",
    "#EF4444",
    "#FBBF24",
  ];

  for (let i = 0; i < 50; i++) {
    particles.push(
      <ConfettiParticle
        key={i}
        color={colors[Math.floor(Math.random() * colors.length)]}
        left={Math.random() * 100}
        delay={Math.random() * 0.5}
        duration={2 + Math.random() * 2}
        size={`${Math.random() * 10 + 5}px`}
      />
    );
  }

  return <div className="absolute inset-0 overflow-hidden">{particles}</div>;
};

// --------------------
// Tooltip
// --------------------

interface CustomTooltipPayloadItem {
  color?: string;
  value?: number;
  dataKey?: string | number;
  name?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: CustomTooltipPayloadItem[];
  label?: string | number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="bg-background p-2 text-xs border border-border shadow-sm rounded">
      <p className="font-medium text-foreground">{label}</p>
      {payload.map((item, index: number) => (
        <p key={index} className="text-muted-foreground">
          <span style={{ color: item.color }}>
            {(item.dataKey as string) || item.name}:{" "}
          </span>
          {item.value}
          {typeof item.value === "number" && item.value < 0 ? "% ↓" : "% ↑"}
        </p>
      ))}
    </div>
  );
};

// --------------------
// Main component
// --------------------

const AssetManagementDemo: React.FC = () => {
  const [stage, setStage] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [showTyping, setShowTyping] = useState<boolean>(false);
  const [showResponse, setShowResponse] = useState<boolean>(false);
  const [typingComplete, setTypingComplete] = useState<boolean>(false);
  const [expandDashboard, setExpandDashboard] = useState<boolean>(false);
  const [showSection, setShowSection] = useState<SectionVisibility>({
    competitorAnalysis: false,
    customerEngagement: false,
    missedOpportunities: false,
    recommendations: false,
  });
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [userScrollingEnabled, setUserScrollingEnabled] =
    useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const [isMobileLayout, setIsMobileLayout] = useState<boolean>(false);
  // const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const dashboardContainerRef = useRef<HTMLDivElement | null>(null);

  // --------------------
  // Layout / scaling
  // --------------------

  useEffect(() => {
    const checkLayout = () => {
      const windowWidth = window.innerWidth;
      setIsMobileLayout(windowWidth < 768);

      if (windowWidth < 400) setScale(0.8);
      else if (windowWidth < 600) setScale(0.9);
      else setScale(1);
    };

    checkLayout();
    window.addEventListener("resize", checkLayout);
    return () => window.removeEventListener("resize", checkLayout);
  }, []);

  const scrollChatToBottom = (smooth = true) => {
    const container = chatContainerRef.current;
    if (!container) return;

    const scrollHeight = container.scrollHeight;
    if (smooth)
      container.scrollTo({ top: scrollHeight, behavior: "smooth" });
    else container.scrollTop = scrollHeight;
  };

  const scrollDashboardToBottom = (smooth = true) => {
    const container = dashboardContainerRef.current;
    if (!container) return;

    const scrollHeight = container.scrollHeight;
    if (smooth)
      container.scrollTo({ top: scrollHeight, behavior: "smooth" });
    else container.scrollTop = scrollHeight;
  };

  // auto-start animation
  useEffect(() => {
    const timer = setTimeout(() => {
      startAnimation();
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // observe chat DOM during animation
  useEffect(() => {
    if (!chatContainerRef.current || !isAnimating) return;

    const chatObserver = new MutationObserver(() => {
      if (isAnimating) setTimeout(() => scrollChatToBottom(), 10);
    });

    chatObserver.observe(chatContainerRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    return () => chatObserver.disconnect();
  }, [isAnimating]);

  // observe dashboard DOM during animation
  useEffect(() => {
    if (!dashboardContainerRef.current || !expandDashboard || !isAnimating)
      return;

    const dashboardObserver = new MutationObserver(() => {
      if (isAnimating) setTimeout(() => scrollDashboardToBottom(), 10);
    });

    dashboardObserver.observe(dashboardContainerRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    return () => dashboardObserver.disconnect();
  }, [expandDashboard, isAnimating]);

  // --------------------
  // Animation sequence
  // --------------------

  const startAnimation = () => {
    setIsAnimating(true);
    setUserScrollingEnabled(false);

    setStage(1);
    setInputValue(
      "How are our top competitors positioning aggressive hybrid funds compared to us, and is it affecting our customer engagement or AUM growth?"
    );

    setTimeout(() => {
      setShowTyping(true);
      setStage(2);
      setExpandDashboard(true);
      scrollChatToBottom(false);
    }, 300);

    setTimeout(() => {
      setShowTyping(false);
      setShowResponse(true);
      scrollChatToBottom(false);
    }, 1200);

    setTimeout(
      () =>
        setShowSection((prev) => ({ ...prev, competitorAnalysis: true })),
      2000
    );
    setTimeout(
      () =>
        setShowSection((prev) => ({ ...prev, customerEngagement: true })),
      3500
    );
    setTimeout(
      () =>
        setShowSection((prev) => ({ ...prev, missedOpportunities: true })),
      5000
    );
    setTimeout(
      () => setShowSection((prev) => ({ ...prev, recommendations: true })),
      6500
    );

    setTimeout(() => setShowConfetti(true), 7000);
    setTimeout(() => setShowConfetti(false), 9000);

    setTimeout(() => {
      setTypingComplete(true);
      scrollChatToBottom(false);
      scrollDashboardToBottom(false);

      setTimeout(() => {
        setUserScrollingEnabled(true);
        setIsAnimating(false);
      }, 500);
    }, 7000);
  };

  const resetDemo = () => {
    setUserScrollingEnabled(false);
    setIsAnimating(true);

    setStage(0);
    setInputValue("");
    setShowTyping(false);
    setShowResponse(false);
    setTypingComplete(false);
    setExpandDashboard(false);
    setShowSection({
      competitorAnalysis: false,
      customerEngagement: false,
      missedOpportunities: false,
      recommendations: false,
    });
    setShowConfetti(false);

    if (chatContainerRef.current) chatContainerRef.current.scrollTop = 0;
    if (dashboardContainerRef.current)
      dashboardContainerRef.current.scrollTop = 0;

    setTimeout(() => {
      startAnimation();
    }, 500);
  };

  // --------------------
  // Chart data
  // --------------------

  const competitorTrendsData = [
    { quarter: "Q1", our: 75, competitorB: 68, competitorC: 73 },
    { quarter: "Q2", our: 73, competitorB: 72, competitorC: 76 },
    { quarter: "Q3", our: 72, competitorB: 78, competitorC: 82 },
    { quarter: "Q4", our: 68, competitorB: 84, competitorC: 87 },
  ];

  const sipPerformanceData = [
    { metric: "SIP Initiations", our: -22, competitorB: 31, competitorC: 18 },
    {
      metric: "Engagement Rate",
      our: -18.6,
      competitorB: 42,
      competitorC: 28,
    },
    { metric: "Conversion Rate", our: -12, competitorB: 37, competitorC: 24 },
  ];

  const ageGroupData = [
    { age: "25-35", our: 15, competitors: 35, fill: "#3B82F6" },
    { age: "36-45", our: 25, competitors: 28, fill: "#10B981" },
    { age: "46-55", our: 30, competitors: 22, fill: "#F59E0B" },
    { age: "56+", our: 30, competitors: 15, fill: "#6366F1" },
  ];

  const contentPerformanceData = [
    {
      type: "SIP-focused articles",
      engagement: 3.2,
      topPerformer: "Competitor B",
      fill: "#10B981",
    },
    {
      type: "Goal-based tools",
      engagement: 2.8,
      topPerformer: "Competitor C",
      fill: "#3B82F6",
    },
    {
      type: "Risk calculators",
      engagement: 1.9,
      topPerformer: "Competitor B",
      fill: "#F59E0B",
    },
    {
      type: "Fund comparison",
      engagement: 1.5,
      topPerformer: "Our Platform",
      fill: "#EF4444",
    },
  ];

  // --------------------
  // Response text
  // --------------------

  const fullText =
    `Top competitors have repositioned aggressive hybrid funds toward younger, SIP-driven investors, emphasizing growth with downside protection. Our engagement on this category is down **18.6% QoQ**, SIP initiations fell **22%**, while Competitor B saw a **31% rise**. Estimated **$27M AUM opportunity lost** in the 25–35 age group. Competitors' content (e.g., 'Top hybrid funds under ₹5K/month') is driving 3× engagement. Recommend repositioning toward SIP-first users, refreshing content, and introducing goal-based fund discovery.\n\n` +
    `Key Findings:\n` +
    `* **Positioning Gap**: Competitors focus on low-cost SIP entry points (₹5K/month), while we emphasize lump sum investing.\n` +
    `* **Target Demographics**: 25-35 age group shows 35% higher conversion with competitor offerings.\n` +
    `* **Content Performance**: Competitor B's SIP-focused content drives 3× more engagement than our fund comparison tools.\n\n` +
    `Immediate Actions:\n` +
    `* Launch SIP-first landing pages with entry points under ₹5K/month.\n` +
    `* Develop goal-based fund discovery flow targeting career milestones.\n` +
    `* Create monthly SIP calculators with visual retirement projections.\n` +
    `* Introduce hybrid fund comparison specifically for first-time investors.\n\n` +
    `Expected Impact: 15-20% increase in SIP conversions and recovery of $17M AUM opportunity within Q1.`;

  // --------------------
  // Layout classes
  // --------------------

  const mainContainerClasses = `
    ${"min-h-[420px]"}
    bg-background flex items-center justify-center 
    ${"p-2 sm:p-4"}
    transition-all duration-300
  `;

  const demoContainerClasses = `
    bg-card rounded-2xl shadow-sm border border-border overflow-hidden 
    ${isMobileLayout ? "flex-col" : "flex"} 
    w-full 
    ${"max-w-[1000px] h-[80vh]"} 
    relative
    transform origin-center
  `;

  // --------------------
  // Render
  // --------------------

  return (
    <div className={mainContainerClasses} ref={containerRef}>
      <motion.div
        className={demoContainerClasses}
        style={{ transform: `scale(${scale})` }}
        layout
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Window controls */}
        <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 bg-background/90 border-b border-border flex items-center z-10">
          <div className="flex items-center mr-auto">
            <div className="flex space-x-2 mr-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="text-[11px] sm:text-xs font-medium text-muted-foreground hidden sm:block">
              Fund analytics intelligence
            </div>
            <div className="text-[11px] sm:text-xs font-medium text-muted-foreground sm:hidden">
              Fund analytics
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              title="no-title"
              onClick={resetDemo}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
            >
              <RefreshCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Left chat section */}
        <motion.div
          className="flex flex-col bg-muted/60"
          layout
          initial={{ width: isMobileLayout ? "100%" : "500px" }}
          animate={{
            width: isMobileLayout ? "100%" : stage >= 1 ? "50%" : "500px",
            height: isMobileLayout && expandDashboard ? "50%" : "auto",
          }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
        >
          {/* Header */}
          <div className="border-b border-border px-3 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between bg-background/80 backdrop-blur-sm mt-10 sm:mt-12">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <PiggyBank className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div className="text-left">
                <h1 className="font-medium text-foreground text-sm sm:text-base">
                  Fund analytics chat
                </h1>
                <p className="text-[11px] text-muted-foreground hidden sm:block">
                  Powered by real-time market intelligence
                </p>
              </div>
            </div>
          </div>

          {/* Chat messages */}
          <div
            className={`flex-grow p-3 sm:p-4 ${
              userScrollingEnabled ? "overflow-y-auto" : "overflow-hidden"
            }`}
            ref={chatContainerRef}
            style={{
              scrollBehavior: "smooth",
              pointerEvents: userScrollingEnabled ? "auto" : "none",
            }}
          >
            <div className="space-y-4 min-h-full flex flex-col justify-end">
              {/* Timestamp */}
              <div className="flex justify-center my-4">
                <div className="text-[10px] text-muted-foreground">
                  Today, 10:15 AM
                </div>
              </div>

              {/* Welcome copy */}
              <div className="flex justify-center mb-6">
                <div className="text-xs sm:text-sm text-center text-muted-foreground max-w-[85%]">
                  Ask about competitor positioning, hybrid fund performance,
                  customer segments, or SIP strategies — this is how your AI
                  assistant behaves on top of your data.
                </div>
              </div>

              {/* User query */}
              {stage >= 1 && (
                <div className="flex justify-end mb-6">
                  <div className="bg-primary text-primary-foreground px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-sm max-w-[85%] text-xs sm:text-sm">
                    {inputValue}
                  </div>
                </div>
              )}

              {/* Typing indicator */}
              {showTyping && (
                <div className="flex justify-center mb-6">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              )}

              {/* AI response */}
              {showResponse && (
                <div className="flex justify-center mb-6 px-4">
                  <div className="text-xs sm:text-sm text-foreground max-w-[90%] space-y-3">
                    {typingComplete ? (
                      <>
                        <p className="font-medium">
                          Top competitors have repositioned aggressive hybrid
                          funds toward younger, SIP-driven investors,
                          emphasizing growth with downside protection. Our
                          engagement on this category is down{" "}
                          <span className="text-red-500 font-semibold">
                            18.6% QoQ
                          </span>
                          , SIP initiations fell{" "}
                          <span className="text-red-500 font-semibold">
                            22%
                          </span>
                          , while Competitor B saw a{" "}
                          <span className="text-emerald-600 font-semibold">
                            31% rise
                          </span>
                          . Estimated{" "}
                          <span className="text-red-500 font-semibold">
                            $27M AUM opportunity lost
                          </span>{" "}
                          in the 25–35 age group.
                        </p>

                        <div>
                          <p className="mt-2 font-medium text-foreground">
                            Key findings
                          </p>
                          <ul className="list-disc pl-5 mt-1 space-y-1 text-muted-foreground">
                            <li>
                              <span className="font-semibold text-primary">
                                Positioning gap
                              </span>
                              : competitors focus on low-cost SIP entry points
                              (₹5K/month), while we emphasise lump-sum
                              investing.
                            </li>
                            <li>
                              <span className="font-semibold text-primary">
                                Target demographics
                              </span>
                              : 25–35 age group shows 35% higher conversion
                              with competitor offerings.
                            </li>
                            <li>
                              <span className="font-semibold text-primary">
                                Content performance
                              </span>
                              : Competitor B&apos;s SIP-focused content drives
                              3× more engagement than our fund comparison tools.
                            </li>
                          </ul>
                        </div>

                        <div>
                          <p className="mt-2 font-medium text-foreground">
                            Immediate actions
                          </p>
                          <ul className="list-disc pl-5 mt-1 space-y-1 text-muted-foreground">
                            <li>
                              Launch{" "}
                              <span className="font-semibold text-primary">
                                SIP-first landing pages
                              </span>{" "}
                              with entry points under ₹5K/month.
                            </li>
                            <li>
                              Develop{" "}
                              <span className="font-semibold text-primary">
                                goal-based fund discovery
                              </span>{" "}
                              flows targeting career milestones.
                            </li>
                            <li>
                              Create monthly{" "}
                              <span className="font-semibold text-primary">
                                SIP calculators
                              </span>{" "}
                              with visual retirement projections.
                            </li>
                            <li>
                              Introduce{" "}
                              <span className="font-semibold text-primary">
                                hybrid fund comparison
                              </span>{" "}
                              specifically for first-time investors.
                            </li>
                          </ul>
                        </div>

                        <p className="mt-2 text-muted-foreground">
                          <span className="font-medium text-foreground">
                            Expected impact:
                          </span>{" "}
                          <span className="font-semibold text-primary">
                            15–20% increase
                          </span>{" "}
                          in SIP conversions and recovery of{" "}
                          <span className="font-semibold text-primary">
                            $17M AUM opportunity
                          </span>{" "}
                          within Q1.
                        </p>

                        <div className="mt-2 flex justify-center">
                          <div className="text-[11px] flex items-center text-primary/80 animate-pulse">
                            <span>Analytics dashboard</span>
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <TypeAnimation
                        sequence={[fullText, () => {}]}
                        speed={99}
                        cursor
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input area */}
          <div className="border-t border-border px-3 py-2.5 bg-background/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about fund performance, competitor insights, or SIP strategies..."
                className="flex-grow border border-border rounded-lg px-3 py-2 text-xs sm:text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled
              />
              <button
                title="no-title"
                disabled
                className="bg-primary/40 text-primary-foreground p-2 rounded-lg opacity-60 cursor-not-allowed"
              >
                <Send className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right dashboard section */}
        <AnimatePresence>
          {expandDashboard && (
            <motion.div
              key="dashboard-panel"
              className={`${
                isMobileLayout ? "w-full h-1/2" : "w-1/2"
              } border-l border-border relative flex flex-col ${
                isMobileLayout ? "max-h-[50vh]" : "h-full"
              } overflow-hidden bg-muted/40`}
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{
                width: isMobileLayout ? "100%" : "50%",
                height: isMobileLayout ? "50%" : "100%",
                opacity: 1,
              }}
              exit={{ width: 0, height: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
            >
              {/* Dashboard header */}
              <div className="border-b border-border px-3 py-2.5 sm:px-4 sm:py-3 bg-background/80 backdrop-blur-sm flex items-center mt-10 sm:mt-12">
                <div className="text-[11px] sm:text-xs font-medium text-muted-foreground">
                  Hybrid fund competitive analysis
                </div>
                <div className="ml-auto flex items-center">
                  <div className="bg-primary/10 px-2 py-1 rounded text-[10px] font-medium text-primary flex items-center gap-1">
                    <span>LIVE</span>
                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <div
                className={`p-3 sm:p-5 space-y-4 sm:space-y-6 flex-1 relative ${
                  userScrollingEnabled ? "overflow-y-auto" : "overflow-hidden"
                }`}
                ref={dashboardContainerRef}
                style={{
                  scrollBehavior: "smooth",
                  pointerEvents: userScrollingEnabled ? "auto" : "none",
                  maxHeight: "100%",
                }}
              >
                {/* Confetti over dashboard when active */}
                {showConfetti && (
                  <div className="pointer-events-none absolute inset-0">
                    <ConfettiEffect />
                  </div>
                )}

                <AnimatePresence>
                  {/* Competitor Analysis section */}
                  {showSection.competitorAnalysis && (
                    <motion.div
                      key="section-competitor-analysis"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 1 }}
                      className="bg-card rounded-xl shadow-sm p-3 sm:p-4 border border-border/60 relative"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-3 flex items-center">
                        <span className="bg-primary/10 rounded-full w-5 h-5 flex items-center justify-center mr-2">
                          <TrendingUp className="h-3 w-3 text-primary" />
                        </span>
                        Competitor positioning trends
                      </h3>

                      <div className="h-40 sm:h-52">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={competitorTrendsData}
                            margin={{
                              top: 10,
                              right: 10,
                              left: 0,
                              bottom: 10,
                            }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              vertical={false}
                              opacity={0.2}
                            />
                            <XAxis
                              dataKey="quarter"
                              tick={{ fontSize: 10, fill: "#9CA3AF" }}
                            />
                            <YAxis
                              tick={{ fontSize: 10, fill: "#9CA3AF" }}
                              domain={[60, 90]}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                              type="monotone"
                              dataKey="our"
                              name="Our platform"
                              stroke="#3B82F6"
                              strokeWidth={2}
                              dot={{ fill: "#3B82F6", r: 3 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="competitorB"
                              name="Competitor B"
                              stroke="#10B981"
                              strokeWidth={2}
                              dot={{ fill: "#10B981", r: 3 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="competitorC"
                              name="Competitor C"
                              stroke="#6366F1"
                              strokeWidth={2}
                              dot={{ fill: "#6366F1", r: 3 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] px-1 sm:px-2 mt-2 space-y-1 sm:space-y-0">
                        <div className="font-medium text-foreground flex items-center">
                          <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1" />
                          <span className="text-red-500 mr-2">
                            Market share drag
                          </span>
                          <span className="text-muted-foreground">
                            Q3–Q4 2024
                          </span>
                        </div>
                        <div className="text-muted-foreground text-right">
                          Competitor B leads with SIP-first positioning
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Customer Engagement section */}
                  {showSection.customerEngagement && (
                    <motion.div
                      key="section-customer-engagement"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 1 }}
                      className="bg-card rounded-xl shadow-sm p-3 sm:p-4 border border-border/60 relative"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-3 flex items-center">
                        <span className="bg-destructive/10 rounded-full w-5 h-5 flex items-center justify-center mr-2">
                          <TrendingDown className="h-3 w-3 text-destructive" />
                        </span>
                        SIP performance &amp; engagement metrics
                      </h3>

                      <div className="grid grid-cols-1 gap-4 sm:gap-6">
                        <div>
                          <div className="text-xs font-medium text-muted-foreground mb-2">
                            Quarterly performance comparison
                          </div>
                          <div className="h-36 sm:h-44">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={sipPerformanceData}
                                layout="vertical"
                                margin={{
                                  top: 5,
                                  right: 20,
                                  left: 20,
                                  bottom: 5,
                                }}
                              >
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  horizontal
                                  vertical={false}
                                  opacity={0.2}
                                />
                                <XAxis
                                  type="number"
                                  domain={[-30, 45]}
                                  tickFormatter={(v) => `${v}%`}
                                  tick={{ fontSize: 10, fill: "#9CA3AF" }}
                                />
                                <YAxis
                                  dataKey="metric"
                                  type="category"
                                  tick={{ fontSize: 10, fill: "#9CA3AF" }}
                                  width={110}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                  dataKey="our"
                                  name="Our platform"
                                  fill="#EF4444"
                                />
                                <Bar
                                  dataKey="competitorB"
                                  name="Competitor B"
                                  fill="#10B981"
                                />
                                <Bar
                                  dataKey="competitorC"
                                  name="Competitor C"
                                  fill="#6366F1"
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-medium text-muted-foreground mb-2">
                            SIP conversions by age group
                          </div>
                          <div className="h-36 sm:h-44">
                            <ResponsiveContainer width="100%" height="100%">
                              <ComposedChart
                                data={ageGroupData}
                                margin={{
                                  top: 5,
                                  right: 20,
                                  left: 5,
                                  bottom: 5,
                                }}
                              >
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  vertical={false}
                                  opacity={0.2}
                                />
                                <XAxis
                                  dataKey="age"
                                  tick={{ fontSize: 10, fill: "#9CA3AF" }}
                                />
                                <YAxis
                                  tick={{ fontSize: 10, fill: "#9CA3AF" }}
                                  tickFormatter={(v) => `${v}%`}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                  dataKey="our"
                                  name="Our platform"
                                  fill="#EF4444"
                                />
                                <Bar
                                  dataKey="competitors"
                                  name="Competitors avg"
                                  fill="#10B981"
                                />
                              </ComposedChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 text-[11px]">
                        <div className="flex items-center">
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                          <span className="font-medium text-red-600">
                            Critical:
                          </span>
                          <span className="ml-1 text-muted-foreground">
                            25–35 age gap drives ~$27M AUM loss
                          </span>
                        </div>
                        <div className="text-muted-foreground text-right">
                          Based on Q3–Q4 2024 data
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Missed Opportunities section */}
                  {showSection.missedOpportunities && (
                    <motion.div
                      key="section-missed-opportunities"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 1 }}
                      className="bg-card rounded-xl shadow-sm p-3 sm:p-4 border border-border/60 relative"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-3 flex items-center">
                        <span className="bg-amber-100 rounded-full w-5 h-5 flex items-center justify-center mr-2">
                          <Target className="h-3 w-3 text-amber-700" />
                        </span>
                        Content performance &amp; missed opportunities
                      </h3>

                      <div className="space-y-3">
                        <div className="text-xs font-medium text-muted-foreground mb-1.5">
                          Competitive content performance
                        </div>
                        <div className="space-y-2">
                          {contentPerformanceData.map((item, index) => (
                            <div key={item.type}>
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-foreground">
                                    {item.type}
                                  </span>
                                  <span className="text-[11px] text-muted-foreground">
                                    ({item.topPerformer})
                                  </span>
                                </div>
                                <span
                                  className={`text-xs font-semibold ${
                                    item.engagement > 2
                                      ? "text-emerald-700"
                                      : "text-red-600"
                                  }`}
                                >
                                  {item.engagement}× engagement
                                </span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <motion.div
                                  className="h-2 rounded-full"
                                  style={{ backgroundColor: item.fill }}
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: `${(item.engagement / 4) * 100}%`,
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    delay: 0.5 + index * 0.2,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        <div className="bg-amber-50 dark:bg-amber-900/20 p-2.5 rounded-lg">
                          <div className="font-medium text-amber-700 dark:text-amber-300 flex items-center">
                            <span className="w-2 h-2 bg-amber-500 rounded-full mr-1" />
                            Missing content types
                          </div>
                          <ul className="text-muted-foreground mt-1 space-y-0.5">
                            <li>• SIP calculators with visual projections</li>
                            <li>• Goal-based fund discovery tools</li>
                            <li>• Monthly investment challenges</li>
                          </ul>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-900/20 p-2.5 rounded-lg">
                          <div className="font-medium text-amber-700 dark:text-amber-300 flex items-center">
                            <span className="w-2 h-2 bg-amber-500 rounded-full mr-1" />
                            Top performing examples
                          </div>
                          <ul className="text-muted-foreground mt-1 space-y-0.5">
                            <li>• “Top hybrid funds under ₹5K/month”</li>
                            <li>• “SIP for career milestones” series</li>
                            <li>• Interactive risk-return calculators</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Recommendations section */}
                  {showSection.recommendations && (
                    <motion.div
                      key="section-recommendations"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 1 }}
                      className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl shadow-sm p-3 sm:p-4 border border-primary/20 relative overflow-hidden mb-1"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-3 flex items-center">
                        <span className="bg-primary/20 rounded-full w-5 h-5 flex items-center justify-center mr-2">
                          <Lightbulb className="h-3 w-3 text-primary" />
                        </span>
                        Strategic action plan
                      </h3>

                      <div className="space-y-3">
                        <div className="bg-background/80 rounded-lg p-3 backdrop-blur-sm border border-border/40">
                          <h4 className="text-xs font-semibold text-foreground mb-1">
                            SIP-first landing page revamp
                          </h4>
                          <p className="text-[11px] text-muted-foreground">
                            Create dedicated landing pages for entry-level
                            investors with SIP starting points under
                            ₹5K/month, emphasising simplicity and goal
                            visualisation.
                          </p>
                          <div className="mt-1.5 flex items-center">
                            <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-l-full" />
                            <div className="h-1 w-8 bg-gradient-to-r from-emerald-400 to-blue-400" />
                            <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-r-full" />
                            <div className="ml-2 text-[10px] text-muted-foreground">
                              Priority: Urgent
                            </div>
                          </div>
                        </div>

                        <div className="bg-background/80 rounded-lg p-3 backdrop-blur-sm border border-border/40">
                          <h4 className="text-xs font-semibold text-foreground mb-1">
                            Goal-based fund discovery engine
                          </h4>
                          <p className="text-[11px] text-muted-foreground">
                            Build an intelligent fund recommendation flow that
                            maps users to hybrid funds based on life goals
                            (home purchase, retirement, child education).
                          </p>
                          <div className="mt-1.5 flex items-center">
                            <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-l-full" />
                            <div className="h-1 w-8 bg-gradient-to-r from-emerald-400 to-blue-400" />
                            <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-r-full" />
                            <div className="ml-2 text-[10px] text-muted-foreground">
                              Priority: High
                            </div>
                          </div>
                        </div>

                        <div className="bg-background/80 rounded-lg p-3 backdrop-blur-sm border border-border/40">
                          <h4 className="text-xs font-semibold text-foreground mb-1">
                            Interactive SIP impact visualiser
                          </h4>
                          <p className="text-[11px] text-muted-foreground">
                            Build a dynamic calculator that shows real-time
                            projections of wealth creation through hybrid fund
                            SIPs, with milestone celebrations and achievement
                            badges.
                          </p>
                          <div className="mt-1.5 flex items-center">
                            <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-l-full" />
                            <div className="h-1 w-8 bg-gradient-to-r from-emerald-400 to-blue-400" />
                            <div className="h-1 w-8 bg-muted rounded-r-full" />
                            <div className="ml-2 text-[10px] text-muted-foreground">
                              Priority: Medium
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 p-3 bg-background/80 rounded-lg border border-border/40 mb-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                          <div>
                            <div className="text-xs font-semibold text-foreground">
                              Projected impact
                            </div>
                            <div className="mt-1 flex items-center">
                              <span className="text-lg sm:text-xl font-bold text-primary">
                                <CountUp end={15} duration={3} />-
                                <CountUp end={20} duration={4} />%
                              </span>
                              <span className="ml-2 text-[11px] text-muted-foreground flex items-center">
                                <svg
                                  className="w-3 h-3 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                                  />
                                </svg>
                                SIP conversion uplift
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-semibold text-foreground">
                              AUM recovery potential
                            </div>
                            <div className="text-sm font-medium text-emerald-600">
                              $17M within Q1
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AssetManagementDemo;
