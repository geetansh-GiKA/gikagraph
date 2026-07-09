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
  Cell,
  ComposedChart,
  AreaChart,
  Area,
} from "recharts";
import {
  Send,
  ArrowRight,
  RefreshCcw,
  TrendingUp,
  Package,
  DollarSign,
  Target,
  AlertCircle,
  Database,
} from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import CountUp from "react-countup";

interface PrivateEquityDemoProps {
  embedded?: boolean;
  className?: string;
}

const PrivateEquityDemo: React.FC<PrivateEquityDemoProps> = ({
  embedded = false,
  className = "",
}) => {
  const [stage, setStage] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [showTyping, setShowTyping] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [expandDashboard, setExpandDashboard] = useState(false);
  const [showSection, setShowSection] = useState({
    categoryPerformance: false,
    customerSegments: false,
    inventoryOptimization: false,
    strategicInsights: false,
  });
  const [,setShowConfetti] = useState(false);
  const [userScrollingEnabled, setUserScrollingEnabled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scale, setScale] = useState(1);
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const [isFullscreen, ] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const dashboardContainerRef = useRef<HTMLDivElement | null>(null);

  // ----- layout detection -----
  useEffect(() => {
    const checkLayout = () => {
      const w = window.innerWidth;
      setIsMobileLayout(w < 768);

      if (w < 400) setScale(0.8);
      else if (w < 600) setScale(0.9);
      else setScale(1);
    };

    checkLayout();
    window.addEventListener("resize", checkLayout);
    return () => window.removeEventListener("resize", checkLayout);
  }, []);

  // ----- helpers -----
  const scrollChatToBottom = (smooth = true) => {
    if (!chatContainerRef.current) return;
    const container = chatContainerRef.current;
    const scrollHeight = container.scrollHeight;
    if (smooth) {
      container.scrollTo({ top: scrollHeight, behavior: "smooth" });
    } else {
      container.scrollTop = scrollHeight;
    }
  };

  const scrollDashboardToBottom = (smooth = true) => {
    if (!dashboardContainerRef.current) return;
    const container = dashboardContainerRef.current;
    const scrollHeight = container.scrollHeight;
    if (smooth) {
      container.scrollTo({ top: scrollHeight, behavior: "smooth" });
    } else {
      container.scrollTop = scrollHeight;
    }
  };

  // auto-start animation
  useEffect(() => {
    const timer = setTimeout(() => {
      startAnimation();
    }, 800);
    return () => clearTimeout(timer);
  });

  // observe chat content during animation
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

  // observe dashboard content
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

  // ----- main animation sequence -----
  const startAnimation = () => {
    setIsAnimating(true);
    setUserScrollingEnabled(false);

    setStage(1);
    setInputValue(
      "Analyze our Q4 portfolio performance across buyout and growth equity deals - which investments are generating the highest IRR and MOIC?"
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
      () => setShowSection((p) => ({ ...p, categoryPerformance: true })),
      2000
    );
    setTimeout(
      () => setShowSection((p) => ({ ...p, customerSegments: true })),
      3500
    );
    setTimeout(
      () => setShowSection((p) => ({ ...p, inventoryOptimization: true })),
      5000
    );
    setTimeout(
      () => setShowSection((p) => ({ ...p, strategicInsights: true })),
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
      categoryPerformance: false,
      customerSegments: false,
      inventoryOptimization: false,
      strategicInsights: false,
    });
    setShowConfetti(false);

    if (chatContainerRef.current) chatContainerRef.current.scrollTop = 0;
    if (dashboardContainerRef.current)
      dashboardContainerRef.current.scrollTop = 0;

    setTimeout(startAnimation, 400);
  };

  // ----- data -----
  const categoryPerformanceData = [
    {
      category: "Buyouts",
      revenue: 125000,
      clv: 2.8,
      margin: 31,
      repeatRate: 42,
    },
    {
      category: "Growth Equity",
      revenue: 310000,
      clv: 3.2,
      margin: 25,
      repeatRate: 35,
    },
    {
      category: "Venture Capital",
      revenue: 89000,
      clv: 4.5,
      margin: 38,
      repeatRate: 48,
    },
  ];

  const quarterlyTrendsData = [
    { month: "Jul", sustainable: 32000, regular: 78000 },
    { month: "Aug", sustainable: 38000, regular: 82000 },
    { month: "Sep", sustainable: 45000, regular: 85000 },
    { month: "Oct", sustainable: 52000, regular: 88000 },
    { month: "Nov", sustainable: 48000, regular: 102000 },
    { month: "Dec", sustainable: 56000, regular: 118000 },
  ];

  const customerSegmentData = [
    {
      segment: "Tech Sector",
      clv: 3.8,
      aov: 89,
      frequency: 4.2,
      fill: "#059669",
    },
    {
      segment: "Healthcare",
      clv: 2.9,
      aov: 45,
      frequency: 3.1,
      fill: "#F59E0B",
    },
    {
      segment: "Financial Services",
      clv: 4.2,
      aov: 134,
      frequency: 3.8,
      fill: "#3B82F6",
    },
    {
      segment: "Consumer Goods",
      clv: 2.5,
      aov: 42,
      frequency: 2.7,
      fill: "#94A3B8",
    },
  ];

  const inventoryOptimizationData = [
    {
      metric: "Due Diligence Time",
      normal: 12,
      enhanced: 8,
      improvement: 33,
      unit: " weeks",
    },
    {
      metric: "Deal Flow Quality",
      normal: 4.5,
      enhanced: 6.2,
      improvement: 38,
      unit: "/10",
    },
    {
      metric: "Portfolio Risk Score",
      normal: 18,
      enhanced: 14,
      improvement: 22,
      unit: "%",
    },
    {
      metric: "Value Creation Index",
      normal: 87,
      enhanced: 94,
      improvement: 8,
      unit: "%",
    },
  ];

  const marketInsightsData = [
    {
      insight:
        "Tech sector buyouts show 22% higher EBITDA margins post-acquisition",
      impact: "high",
      confidence: 92,
    },
    {
      insight:
        "Portfolio company operational improvements increase exit multiples by 31%",
      impact: "medium",
      confidence: 88,
    },
    {
      insight:
        "Healthcare investments respond well to add-on acquisition strategy",
      impact: "medium",
      confidence: 94,
    },
    {
      insight:
        "Geographic expansion opportunity in emerging market growth equity",
      impact: "high",
      confidence: 85,
    },
  ];

  // ----- tooltip -----
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 text-xs border border-border shadow-sm rounded">
          <p className="font-medium text-foreground">{label}</p>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-muted-foreground">
              <span style={{ color: item.color }}>
                {item.dataKey || item.name}:{" "}
              </span>
              {typeof item.value === "number" && item.value % 1 !== 0
                ? `${item.value.toFixed(1)}${item.payload.unit || ""}`
                : `${item.value}${item.payload.unit || ""}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // ----- typed content -----
  const fullText = `Based on Q4 analysis, venture capital investments demonstrate 27% higher MOIC compared to traditional buyout strategies. Key findings suggest shifting market dynamics toward technology-enabled growth opportunities.

Investment Performance:
* Venture Capital deals: Average MOIC 4.5x (+41% vs buyouts)
* Net IRR 31% (+6 percentage points)
* Successful exit rate 42% (+7 percentage points)

Sector Analysis:
* Tech sector deals: MOIC 3.8x, Average Deal Size $89M
* Investment frequency: 4.2x annually (vs 3.1x average)
* Financial services cross-sector opportunities: 48% value creation rate

Portfolio & Operational Insights:
* Enhanced data modeling reduces due diligence time by 33%
* Deal flow quality improved 38% with predictive analytics
* Portfolio risk exposure down 22% through optimized allocation

Strategic Recommendations:
1. Expand technology sector exposure targeting high-growth segments
2. Implement dynamic valuation models for growth equity opportunities
3. Develop cross-sector investment strategies leveraging high MOIC deals
4. Focus geographic expansion in high-performing emerging markets

Return Projections: 15-18% IRR improvement potential with optimized portfolio mix.`;

  // ----- layout classes with your design tokens -----
  const mainContainerClasses = `
    ${
      embedded
        ? ""
        : isFullscreen
        ? "fixed inset-0 z-50 bg-background"
        : "min-h-[420px] bg-background flex items-center justify-center p-2 sm:p-4"
    }
    w-full h-full
    ${className}
  `;

  const demoContainerClasses = `
    bg-card rounded-2xl shadow-sm border border-border overflow-hidden
    ${isMobileLayout ? "flex-col" : "flex"}
    w-full
    ${
      embedded
        ? "h-[360px] sm:h-[400px] lg:h-[580px]"
        : isFullscreen
        ? "max-w-none h-[90vh] sm:h-[80vh]"
        : "max-w-[1000px] h-[80vh]"
    }
    relative
    transform origin-center
  `;

  const wrapperStyle = embedded ? {} : { transform: `scale(${scale})` };

  return (
    <div className={mainContainerClasses} ref={containerRef}>
      <motion.div
        className={demoContainerClasses}
        style={wrapperStyle}
        layout
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* window controls only for full-page mode */}
        {!embedded && (
          <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 bg-background/90 border-b border-border flex items-center z-10">
            <div className="flex items-center mr-auto">
              <div className="flex space-x-2 mr-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="text-[11px] sm:text-xs font-medium text-muted-foreground">
                Private Equity Portfolio Intelligence
              </div>
            </div>
            <div className="flex items-center space-x-2">

              <button
                title="Reset Demo"
                onClick={resetDemo}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <RefreshCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* left/chat side */}
        <motion.div
          className="flex flex-col bg-muted/60"
          layout
          initial={{ width: isMobileLayout ? "100%" : "50%" }}
          animate={{
            width: isMobileLayout ? "100%" : "50%",
            height: isMobileLayout && expandDashboard ? "50%" : "auto",
          }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
        >
          {/* header */}
          <div
            className={`border-b border-border px-3 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between bg-background/80 backdrop-blur-sm ${
              embedded ? "" : "mt-10 sm:mt-12"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div className="text-left">
                <h1 className="font-medium text-foreground text-sm sm:text-base">
                  Portfolio analytics
                </h1>
                <p className="text-[11px] text-muted-foreground hidden sm:block">
                  Advanced investment intelligence powered by your data
                </p>
              </div>
            </div>
          </div>

          {/* chat body */}
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
              <div className="flex justify-center my-2">
                <div className="text-[10px] text-muted-foreground">
                  Today, 9:42 AM
                </div>
              </div>

              <div className="flex justify-center mb-4">
                <div className="text-xs sm:text-sm text-center text-muted-foreground max-w-[85%]">
                  Ask about portfolio performance, sector exposure, or IRR
                  scenarios — this is exactly what your production assistant
                  will do on top of your data.
                </div>
              </div>

              {stage >= 1 && (
                <div className="flex justify-end mb-4">
                  <div className="bg-primary text-primary-foreground px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-sm max-w-[85%] text-xs sm:text-sm">
                    {inputValue}
                  </div>
                </div>
              )}

              {showTyping && (
                <div className="flex justify-center mb-4">
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

              {showResponse && (
                <div className="flex justify-center mb-4 px-2">
                  <div className="text-xs sm:text-sm text-foreground max-w-[90%]">
                    {typingComplete ? (
                      <div className="space-y-3">
                        <p className="font-medium text-foreground">
                          Based on Q4 analysis,{" "}
                          <span className="text-primary font-semibold">
                            venture capital investments demonstrate 27% higher
                            MOIC
                          </span>{" "}
                          compared to traditional buyout strategies. Key
                          findings suggest shifting market dynamics toward
                          technology-enabled growth opportunities.
                        </p>

                        <div>
                          <p className="mt-2 font-medium text-foreground">
                            Investment performance
                          </p>
                          <ul className="list-disc pl-5 mt-1 space-y-1 text-muted-foreground">
                            <li>
                              Venture Capital deals: Average MOIC{" "}
                              <span className="font-semibold text-primary">
                                4.5x
                              </span>{" "}
                              (+41% vs buyouts)
                            </li>
                            <li>
                              Net IRR{" "}
                              <span className="font-semibold text-primary">
                                31%
                              </span>{" "}
                              (+6 percentage points)
                            </li>
                            <li>
                              Successful exit rate{" "}
                              <span className="font-semibold text-primary">
                                42%
                              </span>{" "}
                              (+7 percentage points)
                            </li>
                          </ul>
                        </div>

                        <div>
                          <p className="mt-2 font-medium text-foreground">
                            Sector analysis
                          </p>
                          <ul className="list-disc pl-5 mt-1 space-y-1 text-muted-foreground">
                            <li>
                              Tech sector deals: MOIC{" "}
                              <span className="font-semibold text-primary">
                                3.8x
                              </span>
                              , Avg deal size{" "}
                              <span className="font-semibold text-primary">
                                $89M
                              </span>
                            </li>
                            <li>
                              Investment frequency:{" "}
                              <span className="font-semibold text-primary">
                                4.2x annually
                              </span>{" "}
                              (vs 3.1x average)
                            </li>
                            <li>
                              Financial services cross-sector opportunities:{" "}
                              <span className="font-semibold text-primary">
                                48% value creation rate
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <p className="mt-2 font-medium text-foreground">
                            Portfolio &amp; operational insights
                          </p>
                          <ul className="list-disc pl-5 mt-1 space-y-1 text-muted-foreground">
                            <li>
                              Enhanced data modeling reduces due diligence time
                              by{" "}
                              <span className="font-semibold text-primary">
                                33%
                              </span>
                            </li>
                            <li>
                              Deal flow quality improved{" "}
                              <span className="font-semibold text-primary">
                                38%
                              </span>{" "}
                              with predictive analytics
                            </li>
                            <li>
                              Portfolio risk exposure down{" "}
                              <span className="font-semibold text-primary">
                                22%
                              </span>{" "}
                              through optimized allocation
                            </li>
                          </ul>
                        </div>

                        <div>
                          <p className="mt-2 font-medium text-foreground">
                            Strategic recommendations
                          </p>
                          <ol className="list-decimal pl-5 mt-1 space-y-1 text-muted-foreground">
                            <li>
                              Expand technology sector exposure targeting
                              high-growth segments
                            </li>
                            <li>
                              Implement dynamic valuation models for growth
                              equity opportunities
                            </li>
                            <li>
                              Develop cross-sector investment strategies
                              leveraging high-MOIC deals
                            </li>
                            <li>
                              Focus geographic expansion in high-performing
                              emerging markets
                            </li>
                          </ol>
                        </div>

                        <div className="mt-3 p-2.5 bg-card border border-border/60 rounded-lg">
                          <p className="font-medium text-foreground">
                            Return projections
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                            <span className="font-semibold text-primary">
                              15–18% IRR improvement potential
                            </span>{" "}
                            with an optimized portfolio mix.
                          </p>
                        </div>

                        <div className="mt-2 flex justify-center">
                          <div className="text-[11px] flex items-center text-primary/80 animate-pulse">
                            <span>Detailed analytics loading</span>
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

          {/* input bar (decorative) */}
          <div className="border-t border-border px-3 py-2.5 bg-background/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about portfolio performance, sectors, or investment insights..."
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

        {/* right/dashboard side */}
        <AnimatePresence>
          {expandDashboard && (
            <motion.div
              key="dashboard-panel"
              className={`${
                isMobileLayout ? "w-full h-1/2" : "w-1/2"
              } border-l border-border relative flex flex-col ${
                isMobileLayout ? "max-h-[50%]" : "h-full"
              } overflow-hidden bg-muted/40`}
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{
                width: isMobileLayout ? "100%" : "50%",
                height: isMobileLayout ? "50%" : "100%",
                opacity: 1,
              }}
              exit={{ width: 0, height: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
            >
              <div
                className={`border-b border-border px-3 py-2.5 sm:px-4 sm:py-3 bg-background/80 backdrop-blur-sm flex items-center ${
                  embedded ? "" : "mt-10 sm:mt-12"
                }`}
              >
                <div className="text-[11px] sm:text-xs font-medium text-muted-foreground">
                  Portfolio performance analysis
                </div>
                <div className="ml-auto flex items-center space-x-2">
                  <div className="bg-primary/10 px-2 py-1 rounded text-[10px] font-medium text-primary flex items-center gap-1">
                    <Database className="h-3 w-3" />
                    <span>ENHANCED</span>
                  </div>
                  <div className="bg-emerald-50 px-2 py-1 rounded text-[10px] font-medium text-emerald-700 flex items-center gap-1">
                    <span>LIVE</span>
                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>

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
                <AnimatePresence>
                  {/* section 1 */}
                  {showSection.categoryPerformance && (
                    <motion.div
                      key="section-categoryPerformance"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="bg-card rounded-xl shadow-sm p-3 sm:p-4 border border-border/60"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-3 flex items-center">
                        <span className="bg-primary/10 rounded-full w-5 h-5 flex items-center justify-center mr-2">
                          <DollarSign className="h-3 w-3 text-primary" />
                        </span>
                        Investment performance &amp; MOIC analysis
                      </h3>

                      <div className="grid grid-cols-1 gap-4 sm:gap-6">
                        <div>
                          <div className="text-xs font-medium text-muted-foreground mb-2">
                            MOIC by investment type
                          </div>
                          <div className="h-32 sm:h-40">
                            <ResponsiveContainer width="100%" height="100%">
                              <ComposedChart
                                data={categoryPerformanceData}
                                margin={{
                                  top: 5,
                                  right: 20,
                                  left: 5,
                                  bottom: 20,
                                }}
                              >
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  opacity={0.15}
                                />
                                <XAxis
                                  dataKey="category"
                                  tick={{ fontSize: 10, fill: "#9CA3AF" }}
                                />
                                <YAxis
                                  yAxisId="left"
                                  orientation="left"
                                  tick={{ fontSize: 10, fill: "#9CA3AF" }}
                                />
                                <YAxis
                                  yAxisId="right"
                                  orientation="right"
                                  tick={{ fontSize: 10, fill: "#9CA3AF" }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                  yAxisId="left"
                                  dataKey="clv"
                                  name="MOIC"
                                  fill="#059669"
                                />
                                <Bar
                                  yAxisId="left"
                                  dataKey="margin"
                                  name="Net IRR (%)"
                                  fill="#3B82F6"
                                />
                                <Bar
                                  yAxisId="right"
                                  dataKey="repeatRate"
                                  name="Exit rate (%)"
                                  fill="#F59E0B"
                                />
                              </ComposedChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-medium text-muted-foreground mb-2">
                            Q4 capital deployment trends
                          </div>
                          <div className="h-32 sm:h-40">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart
                                data={quarterlyTrendsData}
                                margin={{
                                  top: 5,
                                  right: 20,
                                  left: 5,
                                  bottom: 5,
                                }}
                              >
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  opacity={0.15}
                                />
                                <XAxis
                                  dataKey="month"
                                  tick={{ fontSize: 10, fill: "#9CA3AF" }}
                                />
                                <YAxis
                                  tick={{ fontSize: 10, fill: "#9CA3AF" }}
                                  tickFormatter={(v) => `${v / 1000}k`}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                  type="monotone"
                                  dataKey="sustainable"
                                  name="Growth equity"
                                  stackId="1"
                                  stroke="#059669"
                                  fill="#059669"
                                  opacity={0.65}
                                />
                                <Area
                                  type="monotone"
                                  dataKey="regular"
                                  name="Buyouts"
                                  stackId="1"
                                  stroke="#94A3B8"
                                  fill="#94A3B8"
                                  opacity={0.6}
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] px-1 sm:px-2 mt-2 space-y-1 sm:space-y-0">
                        <div className="font-medium text-foreground flex items-center">
                          <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-1" />
                          <span className="text-primary mr-1">
                            <CountUp end={27} duration={2} />%
                          </span>
                          <span className="text-muted-foreground">
                            higher MOIC for venture capital deals
                          </span>
                        </div>
                        <div className="text-[11px] text-muted-foreground text-right">
                          Derived from enriched deal attributes
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* section 2 */}
                  {showSection.customerSegments && (
                    <motion.div
                      key="section-customerSegments"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="bg-card rounded-xl shadow-sm p-3 sm:p-4 border border-border/60"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-3 flex items-center">
                        <span className="bg-primary/10 rounded-full w-5 h-5 flex items-center justify-center mr-2">
                          <TrendingUp className="h-3 w-3 text-primary" />
                        </span>
                        Sector performance analysis
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <div className="text-xs font-medium text-muted-foreground mb-2">
                            MOIC by sector
                          </div>
                          <div className="h-32 sm:h-40">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={customerSegmentData}
                                layout="vertical"
                                margin={{
                                  top: 5,
                                  right: 20,
                                  left: 40,
                                  bottom: 5,
                                }}
                              >
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  horizontal
                                  vertical={false}
                                  opacity={0.15}
                                />
                                <XAxis
                                  type="number"
                                  tick={{ fontSize: 10, fill: "#9CA3AF" }}
                                />
                                <YAxis
                                  dataKey="segment"
                                  type="category"
                                  tick={{ fontSize: 10, fill: "#9CA3AF" }}
                                  width={80}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                  dataKey="clv"
                                  name="MOIC"
                                  radius={[0, 4, 4, 0]}
                                >
                                  {customerSegmentData.map((entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={entry.fill}
                                    />
                                  ))}
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {customerSegmentData.map((segment) => (
                            <div
                              key={segment.segment}
                              className="bg-muted/60 p-2 rounded-lg text-[11px]"
                            >
                              <div
                                className="font-medium"
                                style={{ color: segment.fill }}
                              >
                                {segment.segment}
                              </div>
                              <div className="mt-1 space-y-0.5 text-muted-foreground">
                                <div>Avg deal: ${segment.aov}M</div>
                                <div>Deals/yr: {segment.frequency}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 bg-blue-50/60 dark:bg-blue-950/40 p-2.5 rounded-lg border border-blue-200/60 dark:border-blue-900/40">
                        <div className="text-[11px] font-medium text-blue-800 dark:text-blue-200 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          <span>Key insight</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Tech sector deals have 52% higher MOIC than consumer
                          goods investments. Enhanced analysis reveals
                          cross-sector value creation patterns.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* section 3 */}
                  {showSection.inventoryOptimization && (
                    <motion.div
                      key="section-inventoryOptimization"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="bg-card rounded-xl shadow-sm p-3 sm:p-4 border border-border/60"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-3 flex items-center">
                        <span className="bg-primary/10 rounded-full w-5 h-5 flex items-center justify-center mr-2">
                          <Package className="h-3 w-3 text-primary" />
                        </span>
                        Portfolio optimization metrics
                      </h3>

                      <div className="space-y-3">
                        {inventoryOptimizationData.map((metric) => (
                          <div
                            key={metric.metric}
                            className="flex items-center justify-between py-2 border-b border-border/40 last:border-0"
                          >
                            <div>
                              <div className="text-xs font-medium text-foreground">
                                {metric.metric}
                              </div>
                              <div className="text-[11px] text-muted-foreground mt-0.5">
                                <span className="text-red-500">
                                  Normal: {metric.normal}
                                  {metric.unit}
                                </span>
                                <span className="mx-2 text-muted-foreground">
                                  →
                                </span>
                                <span className="text-emerald-600">
                                  Enhanced: {metric.enhanced}
                                  {metric.unit}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-semibold text-emerald-600">
                                +{metric.improvement}%
                              </div>
                              <div className="text-[11px] text-muted-foreground">
                                improvement
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        <div className="bg-muted/60 p-2.5 rounded-lg">
                          <div className="font-medium text-emerald-700 dark:text-emerald-300">
                            Predictive analytics impact
                          </div>
                          <ul className="text-muted-foreground mt-1 space-y-0.5">
                            <li>• 38% higher deal flow quality</li>
                            <li>• 33% faster due diligence</li>
                            <li>• 22% reduced portfolio risk</li>
                          </ul>
                        </div>
                        <div className="bg-muted/60 p-2.5 rounded-lg">
                          <div className="font-medium text-emerald-700 dark:text-emerald-300">
                            Key optimization areas
                          </div>
                          <ul className="text-muted-foreground mt-1 space-y-0.5">
                            <li>• Sector allocation patterns</li>
                            <li>• Exit timing optimization</li>
                            <li>• Cross-sector value creation</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* section 4 */}
                  {showSection.strategicInsights && (
                    <motion.div
                      key="section-strategicInsights"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl shadow-sm p-3 sm:p-4 border border-primary/20 relative overflow-hidden mb-1"
                    >
                      {/* {showConfetti && <ConfettiEffect />} */}

                      <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-3 flex items-center">
                        <span className="bg-primary/20 rounded-full w-5 h-5 flex items-center justify-center mr-2">
                          <Target className="h-3 w-3 text-primary" />
                        </span>
                        Strategic market insights
                      </h3>

                      <div className="space-y-3">
                        {marketInsightsData.map((insight) => (
                          <div
                            key={insight.insight}
                            className="bg-background/70 rounded-lg p-3 backdrop-blur-sm border border-border/40"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="text-xs font-medium text-foreground">
                                  {insight.insight}
                                </h4>
                                <div className="mt-1 flex items-center space-x-2">
                                  <span
                                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                                      insight.impact === "high"
                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
                                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200"
                                    }`}
                                  >
                                    {insight.impact.toUpperCase()} IMPACT
                                  </span>
                                  <span className="text-[11px] text-muted-foreground">
                                    Confidence: {insight.confidence}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 p-3 bg-background/80 rounded-lg border border-border/40">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                          <div>
                            <div className="text-xs font-semibold text-foreground">
                              IRR improvement potential
                            </div>
                            <div className="mt-1 flex items-center">
                              <span className="text-lg sm:text-xl font-bold text-primary">
                                <CountUp end={15} duration={3} />-
                                <CountUp end={18} duration={4} />%
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
                                with optimized portfolio mix
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-semibold text-foreground">
                              Implementation timeline
                            </div>
                            <div className="text-sm font-medium text-muted-foreground">
                              6–8 weeks
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

export default PrivateEquityDemo;
