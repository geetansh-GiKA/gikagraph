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
  ReferenceLine,
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
} from "recharts";
import {
  BookOpen,
  Send,
  ArrowRight,
  RefreshCcw,
  Users,
  TrendingUp,
} from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import CountUp from "react-countup";


interface SectionVisibility {
  marketInsights: boolean;
  audienceSegmentation: boolean;
  timeline: boolean;
  recommendations: boolean;
}

interface CustomTooltipProps {
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any[];
  label?: string | number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-background p-2 text-xs border border-border shadow-sm rounded">
      <p className="font-medium text-foreground">{label}</p>
      {payload.map((p, idx: number) => {
        const color = p.color as string | undefined;
        const value = p.value as number | string | undefined;
        const key = (p.dataKey as string) || p.name || `series-${idx}`;

        return (
          <p key={key} className="text-muted-foreground">
            <span style={{ color: color || "#0f172a" }}>{key}: </span>
            {value}
            {typeof value === "number" && value < 0 ? "% ↓" : ""}
            {typeof value === "number" && value >= 0 ? "% ↑" : ""}
          </p>
        );
      })}
    </div>
  );
};


const WealthManagementDemo: React.FC = () => {
  const [stage, setStage] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [showTyping, setShowTyping] = useState<boolean>(false);
  const [showResponse, setShowResponse] = useState<boolean>(false);
  const [typingComplete, setTypingComplete] = useState<boolean>(false);
  const [expandDashboard, setExpandDashboard] = useState<boolean>(false);
  const [showSection, setShowSection] = useState<SectionVisibility>({
    marketInsights: false,
    audienceSegmentation: false,
    timeline: false,
    recommendations: false,
  });
  // const [showConfetti, setShowConfetti] = useState<boolean>(false);
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

      if (windowWidth < 400) {
        setScale(0.8);
      } else if (windowWidth < 600) {
        setScale(0.9);
      } else {
        setScale(1);
      }
    };

    checkLayout();
    window.addEventListener("resize", checkLayout);
    return () => window.removeEventListener("resize", checkLayout);
  }, []);

  // Smooth scrolling helpers
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

  // Auto-start animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      startAnimation();
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // MutationObserver for chat container
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

  // MutationObserver for dashboard container
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
      "Given Sarah Mitchell's (Client ID: SM-2847) portfolio, current macro conditions, and historical performance data, what type of rebalancing or product move would minimize downside risk without breaching her risk profile?"
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
      () => setShowSection((prev) => ({ ...prev, marketInsights: true })),
      2000
    );
    setTimeout(
      () =>
        setShowSection((prev) => ({ ...prev, audienceSegmentation: true })),
      3500
    );
    setTimeout(
      () => setShowSection((prev) => ({ ...prev, timeline: true })),
      5000
    );
    setTimeout(
      () => setShowSection((prev) => ({ ...prev, recommendations: true })),
      6500
    );


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

  // Reset the demo
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
      marketInsights: false,
      audienceSegmentation: false,
      timeline: false,
      recommendations: false,
    });

    if (chatContainerRef.current) chatContainerRef.current.scrollTop = 0;
    if (dashboardContainerRef.current) dashboardContainerRef.current.scrollTop = 0;

    setTimeout(() => {
      startAnimation();
    }, 500);
  };

  // --------------------
  // Chart data
  // --------------------

  const marketTrendsData = [
    { month: "Jan", interest: 75 },
    { month: "Feb", interest: 78 },
    { month: "Mar", interest: 82 },
    { month: "Apr", interest: 85 },
    { month: "May", interest: 90 },
    { month: "Jun", interest: 94 },
  ];

  const audienceSegmentData = [
    { name: "Tech Professionals", value: 48, fill: "#8B5CF6" },
    { name: "Healthcare", value: 22, fill: "#6366F1" },
    { name: "Finance", value: 15, fill: "#3B82F6" },
    { name: "Education", value: 10, fill: "#10B981" },
    { name: "Other", value: 5, fill: "#14B8A6" },
  ];

  const conversionData = [
    { type: "Current Portfolio", likelihood: 180, fill: "#8B5CF6" },
    { type: "Rebalanced Portfolio", likelihood: 420, fill: "#10B981" },
    { type: "Target (Year 3)", likelihood: 520, fill: "#6366F1" },
  ];

  // --------------------
  // Typing text
  // --------------------

  const fullText = `Based on Sarah Mitchell's portfolio analysis and GiKA's enriched market intelligence, we recommend a strategic rebalancing approach.

Client Profile Insights:
* Sarah (age 58, tech sector executive) holds a $12.8M portfolio with 72% equity concentration, including $4.2M in employer stock (NVDA) acquired pre-IPO.
* Her historical trading patterns reveal a conservative risk tolerance, despite aggressive current allocation—likely due to inertia from appreciated positions.

Market & Risk Analysis:
* Current macro conditions (elevated rates, tech sector volatility) expose her portfolio to 28% downside risk in a correction scenario.
* Her risk profile assessment indicates a maximum 15% downside tolerance, creating a 13% breach risk under current allocation.

Recommendation: Implement a systematic rebalancing by reducing equity exposure to 55%, trimming concentrated NVDA position by 40%, and rotating into diversified fixed income (20%) and alternative assets (25%), protecting wealth while maintaining growth potential aligned with her true risk tolerance.`;

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
    bg-card rounded-2xl shadow-xl border border-border overflow-hidden 
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
        <div className="absolute top-0 left-0 right-0 p-4 bg-background/90 border-b border-border flex items-center z-10">
          <div className="flex items-center mr-auto">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="text-xs font-medium text-muted-foreground hidden sm:block">
              GiKA Wealth Management
            </div>
            <div className="text-xs font-medium text-muted-foreground sm:hidden">
              GiKA
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
          <div className="border-b border-border p-3 sm:p-4 flex items-center justify-between bg-background/80 backdrop-blur-sm mt-12">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground text-sm sm:text-base">
                  Chat Interface
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Powered by specialized small language models
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
              {/* Welcome message */}
              <div className="flex justify-center my-4">
                <div className="text-xs text-muted-foreground">Today, 11:42 AM</div>
              </div>

              <div className="flex justify-center mb-6">
                <div className="text-sm text-center text-muted-foreground max-w-[85%]">
                  Welcome to GiKA Wealth Management Intelligence. Ask me about
                  portfolio analysis, risk assessment, or investment strategies
                  for your clients.
                </div>
              </div>

              {/* User query */}
              {stage >= 1 && (
                <div className="flex justify-end mb-6">
                  <div className="bg-primary text-primary-foreground px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-sm max-w-[85%] text-xs sm:text-sm">
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
                  <div className="text-xs sm:text-sm text-foreground max-w-[90%]">
                    {typingComplete ? (
                      <div>
                        <p className="font-medium">
                          Based on Sarah Mitchell portfolio analysis and
                          GiKA enriched market intelligence, we recommend a
                          strategic rebalancing approach.
                        </p>

                        <p className="mt-4 font-medium text-primary">
                          Client Profile Insights:
                        </p>
                        <ul className="list-disc pl-5 mt-1 space-y-1 text-muted-foreground">
                          <li>
                            Sarah (age 58, tech sector executive) holds a{" "}
                            <span className="font-semibold text-primary">
                              $12.8M portfolio
                            </span>{" "}
                            with 72% equity concentration, including{" "}
                            <span className="font-semibold text-primary">
                              $4.2M in employer stock (NVDA)
                            </span>{" "}
                            acquired pre-IPO.
                          </li>
                          <li>
                            Her historical trading patterns reveal a{" "}
                            <span className="font-semibold text-primary">
                              conservative risk tolerance
                            </span>
                            , despite aggressive current allocation—likely due
                            to inertia from appreciated positions.
                          </li>
                        </ul>

                        <p className="mt-4 font-medium text-primary">
                          Market & Risk Analysis:
                        </p>
                        <ul className="list-disc pl-5 mt-1 space-y-1 text-muted-foreground">
                          <li>
                            Current macro conditions (elevated rates, tech
                            sector volatility) expose her portfolio to{" "}
                            <span className="font-semibold text-primary">
                              28% downside risk
                            </span>{" "}
                            in a correction scenario.
                          </li>
                          <li>
                            Her risk profile assessment indicates a maximum{" "}
                            <span className="font-semibold text-primary">
                              15% downside tolerance
                            </span>
                            , creating a{" "}
                            <span className="font-semibold text-primary">
                              13% breach risk
                            </span>{" "}
                            under current allocation.
                          </li>
                        </ul>

                        <p className="mt-4 text-muted-foreground">
                          <span className="font-medium text-primary">
                            Recommendation:
                          </span>{" "}
                          Implement a systematic rebalancing by reducing equity
                          exposure to{" "}
                          <span className="font-semibold text-primary">
                            55%
                          </span>
                          , trimming concentrated NVDA position by{" "}
                          <span className="font-semibold text-primary">
                            40%
                          </span>
                          , and rotating into diversified{" "}
                          <span className="font-semibold text-primary">
                            fixed income (20%)
                          </span>{" "}
                          and{" "}
                          <span className="font-semibold text-primary">
                            alternative assets (25%)
                          </span>
                          , protecting wealth while maintaining growth potential
                          aligned with her true risk tolerance.
                        </p>

                        <div className="mt-4 flex justify-center">
                          <div className="text-xs flex items-center text-primary animate-pulse">
                            <span>Visual insights generated</span>
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </div>
                        </div>
                      </div>
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
          <div className="border-t border-border p-3 bg-background/80 backdrop-blur-sm">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Ask about client portfolios, risk analysis, or rebalancing strategies..."
                className="flex-grow border border-border rounded-lg px-3 py-2 text-xs sm:text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled
              />
              <button
                title="no-title"
                disabled
                className="ml-2 bg-primary/50 text-primary-foreground p-2 rounded-lg opacity-50 cursor-not-allowed"
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
              <div className="border-b border-border p-3 sm:p-4 bg-background/80 backdrop-blur-sm flex items-center mt-12">
                <div className="flex items-center">
                  <div className="text-xs font-medium text-muted-foreground">
                    Portfolio Risk Analysis - Sarah Mitchell
                  </div>
                </div>
                <div className="ml-auto flex items-center">
                  <div className="bg-primary/10 px-2 py-1 rounded text-xs font-medium text-primary flex items-center">
                    <span>LIVE</span>
                    <div className="ml-1 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
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
                {/* Scroll hint */}
                {userScrollingEnabled && (
                  <div className="fixed bottom-4 right-4 opacity-30 hover:opacity-60 transition-opacity pointer-events-none">
                    <div className="text-xs text-muted-foreground bg-card px-2 py-1 rounded shadow-sm">
                      Scroll for more →
                    </div>
                  </div>
                )}

                <AnimatePresence>
                  {/* Market Insights section */}
                  {showSection.marketInsights && (
                    <motion.div
                      key="section-market-insights"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 1 }}
                      className="bg-card rounded-lg shadow-sm p-3 sm:p-4 border border-border"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-3 flex items-center">
                        <span className="bg-primary/10 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2">
                          <TrendingUp className="h-2 w-2 sm:h-3 sm:w-3 text-primary" />
                        </span>
                        Portfolio Downside Risk Exposure
                      </h3>

                      <div className="h-40 sm:h-52">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={marketTrendsData}
                            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              vertical={false}
                              opacity={0.3}
                              className="stroke-border"
                            />
                            <XAxis dataKey="month" tick={{ fontSize: 8 }} className="text-muted-foreground" />
                            <YAxis
                              tick={{ fontSize: 8 }}
                              domain={[60, 100]}
                              tickFormatter={(value) => `${value}%`}
                              className="text-muted-foreground"
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <ReferenceLine
                              y={75}
                              stroke="currentColor"
                              strokeDasharray="3 3"
                              className="text-muted-foreground"
                              label={{
                                value: "Baseline",
                                position: "right",
                                fontSize: 8,
                                fill: "currentColor",
                              }}
                            />
                            <Line
                              type="monotone"
                              dataKey="interest"
                              stroke="#8B5CF6"
                              strokeWidth={2}
                              dot={{ fill: "#8B5CF6", r: 3 }}
                              activeDot={{
                                fill: "#6D28D9",
                                r: 4,
                                strokeWidth: 2,
                              }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs px-2 mt-2 space-y-1 sm:space-y-0">
                        <div className="font-medium text-foreground flex items-center">
                          <span className="inline-block w-2 h-2 bg-primary rounded-full mr-1" />
                          <span className="text-primary mr-2">
                            <CountUp end={28} duration={4} />%
                          </span>
                          <span> downside risk in correction scenario</span>
                        </div>
                        <div className="text-muted-foreground">
                          Risk Tolerance: 15% max
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Target Audience / Allocation section */}
                  {showSection.audienceSegmentation && (
                    <motion.div
                      key="section-audience-segmentation"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 1 }}
                      className="bg-card rounded-lg shadow-sm p-3 sm:p-4 border border-border"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-3 flex items-center">
                        <span className="bg-primary/10 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2">
                          <Users className="h-2 w-2 sm:h-3 sm:w-3 text-primary" />
                        </span>
                        Current Portfolio Allocation
                      </h3>

                      <div className="grid grid-cols-1 gap-4 sm:gap-6">
                        <div>
                          <div className="text-xs font-medium text-foreground mb-2 text-center">
                            Asset Class Distribution
                          </div>
                          <div className="h-36 sm:h-44">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={audienceSegmentData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={28}
                                  outerRadius={48}
                                  paddingAngle={2}
                                  dataKey="value"
                                  label={({ name, percent = 0}) =>
                                    `${name} ${(percent * 100).toFixed(0)}%`
                                  }
                                  labelLine={{
                                    stroke: "#E5E7EB",
                                    strokeWidth: 1,
                                  }}
                                >
                                  {audienceSegmentData.map(
                                    (entry, index: number) => (
                                      <Cell
                                        key={`cell-asset-${index}`}
                                        fill={entry.fill}
                                      />
                                    )
                                  )}
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-medium text-foreground mb-2">
                            Annual Income Generation Forecast
                          </div>
                          <div className="h-36 sm:h-44">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={conversionData}
                                layout="vertical"
                                margin={{
                                  top: 5,
                                  right: 20,
                                  left: 10,
                                  bottom: 5,
                                }}
                              >
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  horizontal={false}
                                  opacity={0.3}
                                />
                                <XAxis
                                  type="number"
                                  domain={[0, 600]}
                                  tickFormatter={(value) => `$${value}K`}
                                  tick={{ fontSize: 8 }}
                                />
                                <YAxis
                                  dataKey="type"
                                  type="category"
                                  tick={{ fontSize: 8 }}
                                  width={80}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="likelihood" radius={[0, 4, 4, 0]}>
                                  {conversionData.map(
                                    (entry, index: number) => (
                                      <Cell
                                        key={`cell-conv-${index}`}
                                        fill={entry.fill}
                                      />
                                    )
                                  )}
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 text-xs flex items-center justify-center">
                        <div className="flex items-center px-2 py-1 bg-emerald-500/10 rounded">
                          <span className="font-medium text-emerald-600 dark:text-emerald-400">
                            Projected increase:
                          </span>
                          <span className="ml-1 text-foreground">
                            +133% annual income after rebalancing
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Implementation Timeline section */}
                  {showSection.timeline && (
                    <motion.div
                      key="section-timeline"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 1 }}
                      className="bg-card rounded-lg shadow-sm p-3 sm:p-4 border border-border"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-3 flex items-center">
                        <span className="bg-primary/10 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-primary">
                            ⏱
                          </span>
                        </span>
                        Rebalancing Implementation Timeline
                      </h3>

                      <div className="space-y-4 relative pl-4">
                        {/* Timeline vertical line */}
                        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-primary/20" />

                        {/* Phase 1 */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="relative"
                        >
                          <div className="absolute left-[-16px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-card" />
                          <div className="bg-primary/10 rounded-lg p-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-primary">
                                Phase 1: Assessment & Planning
                              </span>
                              <span className="text-[10px] text-muted-foreground bg-card px-2 py-0.5 rounded">
                                Weeks 1-2
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Complete tax analysis, identify tax-loss
                              harvesting opportunities, review unrealized gains
                              on NVDA position
                            </p>
                          </div>
                        </motion.div>

                        {/* Phase 2 */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          className="relative"
                        >
                          <div className="absolute left-[-16px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-card" />
                          <div className="bg-primary/10 rounded-lg p-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-primary">
                                Phase 2: Initial Rebalancing
                              </span>
                              <span className="text-[10px] text-muted-foreground bg-card px-2 py-0.5 rounded">
                                Months 1-3
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Begin systematic NVDA reduction (10-15%), initiate
                              fixed income ladder with municipal bonds
                            </p>
                          </div>
                        </motion.div>

                        {/* Phase 3 */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.9 }}
                          className="relative"
                        >
                          <div className="absolute left-[-16px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-card" />
                          <div className="bg-primary/10 rounded-lg p-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-primary">
                                Phase 3: Alternative Allocation
                              </span>
                              <span className="text-[10px] text-muted-foreground bg-card px-2 py-0.5 rounded">
                                Months 4-8
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Deploy capital to private equity, real estate
                              funds, and hedge fund strategies
                            </p>
                          </div>
                        </motion.div>

                        {/* Phase 4 */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 1.2 }}
                          className="relative"
                        >
                          <div className="absolute left-[-16px] top-1 w-3 h-3 rounded-full bg-emerald-600 border-2 border-card" />
                          <div className="bg-emerald-500/10 rounded-lg p-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                Phase 4: Final Optimization
                              </span>
                              <span className="text-[10px] text-muted-foreground bg-card px-2 py-0.5 rounded">
                                Months 9-12
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Complete NVDA trimming to target, review portfolio
                              performance, adjust allocations
                            </p>
                          </div>
                        </motion.div>
                      </div>

                      <div className="mt-4 p-2 bg-primary/5 rounded text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-primary">
                            Total Implementation Period
                          </span>
                          <span className="font-bold text-primary">
                            6-12 months
                          </span>
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
                      className="bg-primary/5 rounded-lg shadow-sm p-3 sm:p-4 border border-primary/20 relative overflow-hidden mb-2"
                    >
                      {/* {showConfetti && <ConfettiEffect />} */}

                      <h3 className="text-xs sm:text-sm font-semibold text-primary mb-3 flex items-center">
                        <span className="bg-primary/20 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-primary">
                            ✓
                          </span>
                        </span>
                        Portfolio Rebalancing Strategy
                      </h3>

                      <div className="space-y-3">
                        <div className="bg-card/60 rounded-lg p-3 backdrop-blur-sm">
                          <h4 className="text-xs font-semibold text-primary mb-1">
                            Reduce Equity Concentration to 55%
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Systematically trim NVDA position by 40% using
                            tax-loss harvesting opportunities in other holdings
                            to offset gains. Reduces single-stock risk while
                            managing tax impact.
                          </p>
                          <div className="mt-1.5 flex items-center">
                            <div className="h-1 w-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-l-full" />
                            <div className="h-1 w-8 bg-gradient-to-r from-purple-400 to-blue-400" />
                            <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-r-full" />
                            <div className="ml-2 text-[10px] text-muted-foreground">
                              Priority: Critical
                            </div>
                          </div>
                        </div>

                        <div className="bg-card/60 rounded-lg p-3 backdrop-blur-sm">
                          <h4 className="text-xs font-semibold text-primary mb-1">
                            Allocate 20% to Fixed Income
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Build diversified bond ladder with municipal and
                            investment-grade corporate bonds. Current elevated
                            rates provide attractive entry point for income
                            generation.
                          </p>
                          <div className="mt-1.5 flex items-center">
                            <div className="h-1 w-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-l-full" />
                            <div className="h-1 w-8 bg-gradient-to-r from-purple-400 to-blue-400" />
                            <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-r-full" />
                            <div className="ml-2 text-[10px] text-muted-foreground">
                              Priority: High
                            </div>
                          </div>
                        </div>

                        <div className="bg-card/60 rounded-lg p-3 backdrop-blur-sm">
                          <h4 className="text-xs font-semibold text-primary mb-1">
                            Diversify into Alternative Assets (25%)
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Allocate to private equity, real estate, and hedge
                            funds to reduce correlation with public equities
                            while maintaining growth potential suited to her
                            profile.
                          </p>
                          <div className="mt-1.5 flex items-center">
                            <div className="h-1 w-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-l-full" />
                            <div className="h-1 w-8 bg-gradient-to-r from-purple-400 to-blue-400" />
                            <div className="h-1 w-8 bg-muted rounded-r-full" />
                            <div className="ml-2 text-[10px] text-muted-foreground">
                              Priority: Medium
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-card/50 rounded-lg mb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                          <div>
                            <div className="text-xs font-semibold text-primary">
                              Downside Risk Reduction
                            </div>
                            <div className="mt-1 flex items-center">
                              <span className="text-lg sm:text-xl font-bold text-primary">
                                <CountUp end={28} duration={3} />% →{" "}
                                <CountUp end={12} duration={4} />%
                              </span>
                              <span className="ml-2 text-xs text-emerald-600 dark:text-emerald-400 flex items-center">
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
                                    strokeWidth={2}
                                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                                  />
                                </svg>
                                within risk tolerance
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-semibold text-primary">
                              Implementation Timeline
                            </div>
                            <div className="text-sm font-medium text-foreground">
                              6-12 months
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

const globalStyles = `
@keyframes typing {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}

.typing-animation span {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #6366F1;
  margin: 0 2px;
  animation: typing 1.4s infinite;
}

.typing-animation span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-animation span:nth-child(3) {
  animation-delay: 0.4s;
}

/* Hide scrollbar when overflow-hidden is applied */
.overflow-hidden::-webkit-scrollbar {
  display: none;
}

.overflow-hidden {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Custom scrollbar styling when enabled */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

@media (min-width: 640px) {
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c7d2fe;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #818cf8;
}

/* Ensure proper scrolling on mobile */
.overflow-y-auto {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

/* Fix for mobile viewport */
.dashboard-container {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

/* Ensure flex container works properly */
.flex-1 {
  flex: 1 1 0%;
}

/* Ensure content doesn't exceed bounds */
.space-y-4 > * + *,
.space-y-6 > * + * {
  margin-top: 1rem;
}

@media (min-width: 640px) {
  .space-y-6 > * + * {
    margin-top: 1.5rem;
  }
}

/* Ensure smooth scrolling */
.scroll-smooth {
  scroll-behavior: smooth;
}

/* Responsive typography */
@media (max-width: 640px) {
  html {
    font-size: 14px;
  }
}

/* Fix for mobile viewport height issues */
@supports (height: 100dvh) {
  .h-screen {
    height: 100dvh;
  }
}

/* Prevent horizontal scrolling on mobile */
body {
  overflow-x: hidden;
}

/* Adjust chart text sizes for mobile */
@media (max-width: 640px) {
  .recharts-text {
    font-size: 8px !important;
  }
}

/* Responsive scaling container */
.responsive-container {
  transition: transform 0.3s ease;
}

/* Fix confetti positioning in fullscreen mode */
.confetti-container {
  pointer-events: none;
  overflow: hidden;
}
`;

const WealthManagement: React.FC = () => (
  <>
    <style>{globalStyles}</style>
    <WealthManagementDemo />
  </>
);

export default WealthManagement;
