"use client";

import React, { useState, useEffect, useRef, memo, useMemo, useCallback } from "react";
import { gsap } from "gsap";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
  AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend,
} from "recharts";
import { TrendingUp, DollarSign, Target, Zap, Activity, PieChartIcon, BarChart3, LineChartIcon, Send, MessageCircle } from "lucide-react";

interface ImpactData { name: string; value: number; percentage: number; [key: string]: string | number; }
interface TrendData { month: string; value: number; projected?: number; }
interface SavingsData { name: string; value: number; growth: number; }
interface PerformanceData { subject: string; A: number; fullMark: number; }

type TabType = "overview" | "savings" | "trend" | "performance";
type AnimationPhase = 'dashboard' | 'cursor-move' | 'hover-graph' | 'cursor-to-chat' | 'chat-opening' | 'typing-question' | 'ai-thinking' | 'ai-response' | 'cursor-to-response' | 'dashboard-update';

const MetricCard = memo(function MetricCard({ title, value, icon: Icon, color, trend, trendUp = true }: {
  title: string; value: string; icon: React.ElementType; color: string; trend?: string; trendUp?: boolean;
}) {
  return (
    <div className="group flex items-center gap-2 p-2.5 rounded-lg bg-secondary/50 dark:bg-secondary/30 border border-border hover:border-primary/50 transition-all duration-300">
      <div className={`p-2 rounded-md ${color} group-hover:scale-105 transition-transform`}>
        <Icon className="h-3.5 w-3.5 text-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-muted-foreground font-medium truncate">{title}</p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-base font-bold text-foreground">{value}</span>
          {trend && <span className={`text-[10px] font-semibold ${trendUp ? "text-primary" : "text-red-500"}`}>{trend}</span>}
        </div>
      </div>
    </div>
  );
});

const CustomTooltip = memo(function CustomTooltip({ active, payload, label }: {
  active?: boolean; payload?: Array<{ value: number; color?: string }>; label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-background border border-border px-2.5 py-1.5 rounded-md shadow-lg">
      {label && <p className="text-[10px] text-muted-foreground mb-0.5">{label}</p>}
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-xs text-foreground font-semibold">${(entry.value / 1000000).toFixed(2)}M</span>
        </div>
      ))}
    </div>
  );
});

const TabButton = memo(function TabButton({ active, onClick, icon: Icon, label }: {
  active: boolean; onClick: () => void; icon: React.ElementType; label: string;
}) {
  return (
    <button onClick={onClick} className={`flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-medium rounded-md transition-all duration-200 ${active ? "bg-primary text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-secondary dark:hover:bg-muted"}`}>
      <Icon className="h-3 w-3" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
});



// Full screen chat overlay with auto-scroll
const FullScreenChat = memo(function FullScreenChat({
  isVisible, phase, typedQuestion, aiResponse
}: {
  isVisible: boolean; phase: AnimationPhase; typedQuestion: string; aiResponse: string;
}) {
  const messagesRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when content changes
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [typedQuestion, aiResponse, phase]);

  if (!isVisible) return null;
  const showThinking = phase === 'ai-thinking';
  const showResponse = phase === 'ai-response' || phase === 'cursor-to-response';
  
  return (
    <div className="absolute inset-0 z-40 bg-card dark:bg-card/99 backdrop-blur-md rounded-lg border border-border flex flex-col transition-all duration-500 ease-out">
      {/* Header */}
      <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 border-b border-border bg-primary/5 flex-shrink-0">
        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary/20 flex items-center justify-center">
          <TrendingUp className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-primary" />
        </div>
        <div>
          <p className="text-[9px] sm:text-[10px] font-medium text-foreground">GiKA Assistant</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          <span className="text-[7px] sm:text-[8px] text-muted-foreground">Online</span>
        </div>
      </div>

      {/* Messages - scrollable */}
      <div 
        ref={messagesRef}
        className="flex-1 p-2 sm:p-3 overflow-y-auto space-y-2 relative scroll-smooth min-h-0"
      >
        {/* User Question */}
        {typedQuestion && (
          <div className="flex justify-end">
            <div className="bg-primary text-primary-foreground px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg rounded-br-sm max-w-[80%] text-[8px] sm:text-[9px] leading-relaxed">
              {typedQuestion}
              {phase === 'typing-question' && <span className="inline-block w-0.5 h-2 sm:h-2.5 bg-primary-foreground ml-0.5 animate-pulse" />}
            </div>
          </div>
        )}

        {/* AI Thinking */}
        {showThinking && (
          <div className="flex justify-start">
            <div className="bg-muted px-2.5 py-1.5 rounded-lg rounded-bl-sm">
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {/* AI Response */}
        {showResponse && (
          <div className="flex justify-start">
            <div className={`bg-muted px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg rounded-bl-sm max-w-[90%] text-[8px] sm:text-[9px] text-foreground leading-relaxed transition-all duration-300 ${phase === 'cursor-to-response' ? 'ring-2 ring-primary bg-primary/10' : ''}`}>
              <p className="text-muted-foreground line-clamp-3">{aiResponse}</p>
              <div className="mt-1 pt-1 sm:mt-1.5 sm:pt-1.5 border-t border-border/50 flex items-center gap-1 flex-wrap">
                <div className="px-1 py-0.5 bg-primary/15 rounded text-[6px] sm:text-[7px] font-medium text-primary">+24% ROI</div>
                <div className="px-1 py-0.5 bg-blue-500/15 rounded text-[6px] sm:text-[7px] font-medium text-blue-600 dark:text-blue-400">4.5x</div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Input */}
      <div className="px-2 py-1 sm:py-1.5 border-t border-border bg-background/50 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <input type="text" placeholder="Ask..." className="flex-1 text-[8px] sm:text-[9px] bg-background border border-border rounded px-2 py-0.5 sm:py-1 focus:outline-none" disabled />
          <button className="p-0.5 sm:p-1 bg-primary rounded text-primary-foreground"><Send className="h-2 w-2 sm:h-2.5 sm:w-2.5" /></button>
        </div>
      </div>
    </div>
  );
});

const AnimatedHeroDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [phase, setPhase] = useState<AnimationPhase>('dashboard');
  const [typedQuestion, setTypedQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [dashboardVersion, setDashboardVersion] = useState(1);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const chatButtonRef = useRef<HTMLButtonElement>(null);

  const fullQuestion = "Show impact trend analysis.";
  const fullResponse = "Impact grows from ~0.8M to 14.5M, tracking above the 12.5M projection. Reinvest 25-30% surplus into highest-yield tracks.";


  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    let typeInterval: NodeJS.Timeout | null = null;
    
    const runAnimation = () => {
      timeouts.forEach(t => clearTimeout(t));
      if (typeInterval) clearInterval(typeInterval);
      timeouts.length = 0;

      // Reset
      setPhase('dashboard');
      setTypedQuestion('');
      setAiResponse('');
      setDashboardVersion(1);
      setActiveTab('overview');

      // Highlight chat button
      timeouts.push(setTimeout(() => {
        setPhase('cursor-to-chat');
      }, 1500));

      // Open chat
      timeouts.push(setTimeout(() => {
        setPhase('chat-opening');
      }, 2500));

      // Type question
      timeouts.push(setTimeout(() => {
        setPhase('typing-question');
        let charIndex = 0;
        typeInterval = setInterval(() => {
          if (charIndex <= fullQuestion.length) {
            setTypedQuestion(fullQuestion.slice(0, charIndex));
            charIndex++;
          } else {
            if (typeInterval) clearInterval(typeInterval);
          }
        }, 50);
      }, 3000));

      // AI thinking - only after question is complete
      timeouts.push(setTimeout(() => {
        setPhase('ai-thinking');
      }, 5300));

      // AI response
      timeouts.push(setTimeout(() => {
        setPhase('ai-response');
        setAiResponse(fullResponse);
      }, 6800));

      // Cursor to response
      timeouts.push(setTimeout(() => {
        setPhase('cursor-to-response');
      }, 9300));

      // Update dashboard
      timeouts.push(setTimeout(() => {
        setPhase('dashboard-update');
        setDashboardVersion(2);
        setActiveTab('trend');
      }, 10300));

      timeouts.push(setTimeout(() => {
        setPhase('dashboard');
      }, 12500));

      // Animation completes - no loop
    };

    runAnimation();
    return () => {
      timeouts.forEach(t => clearTimeout(t));
      if (typeInterval) clearInterval(typeInterval);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(chartRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    });
    return () => ctx.revert();
  }, [activeTab]);

  const impactData: ImpactData[] = useMemo(() => [
    { name: "Direct Savings", value: 3225000, percentage: 26 },
    { name: "Uplift", value: 9400000, percentage: 74 },
  ], []);

  const savingsData: SavingsData[] = useMemo(() => [
    { name: "Consultancy", value: 1250000, growth: 24 },
    { name: "Automation", value: 750000, growth: 18 },
    { name: "Integration", value: 625000, growth: 32 },
    { name: "Efficiency", value: 600000, growth: 15 },
  ], []);

  const trendData: TrendData[] = useMemo(() => [
    { month: "Jan", value: 800000, projected: 750000 },
    { month: "Feb", value: 1250000, projected: 1100000 },
    { month: "Mar", value: 1900000, projected: 1700000 },
    { month: "Apr", value: 2800000, projected: 2500000 },
    { month: "May", value: 4150000, projected: 3800000 },
    { month: "Jun", value: 5750000, projected: 5200000 },
    { month: "Jul", value: 7400000, projected: 6800000 },
    { month: "Aug", value: 9200000, projected: 8500000 },
    { month: "Sep", value: 10550000, projected: 10000000 },
    { month: "Oct", value: 11600000, projected: 11200000 },
    { month: "Nov", value: 12300000, projected: 12000000 },
    { month: "Dec", value: dashboardVersion === 2 ? 14500000 : 12625000, projected: 12500000 },
  ], [dashboardVersion]);

  const performanceData: PerformanceData[] = useMemo(() => [
    { subject: "Accuracy", A: 94, fullMark: 100 },
    { subject: "Speed", A: 88, fullMark: 100 },
    { subject: "Reliability", A: 96, fullMark: 100 },
    { subject: "Scalability", A: 85, fullMark: 100 },
    { subject: "Integration", A: 92, fullMark: 100 },
    { subject: "Support", A: 90, fullMark: 100 },
  ], []);

  const totalImpact = dashboardVersion === 2 ? 14500000 : 12625000;
  const totalSavings = 3225000;
  const totalEnhancement = 9400000;

  const formatCurrency = useCallback((value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return `${value}`;
  }, []);

  const COLORS = { primary: "#6ECE9D", accent: "#FFDA6E", savings: "#6ECE9D", enhancement: "#5BA3E0" };
  const AXIS_COLOR = "#888888";
  const tabs: { key: TabType; label: string; icon: React.ElementType }[] = [
    { key: "overview", label: "Overview", icon: PieChartIcon },
    { key: "savings", label: "Savings", icon: BarChart3 },
    { key: "trend", label: "Trend", icon: LineChartIcon },
    { key: "performance", label: "Performance", icon: Activity },
  ];

  const showChatOverlay = phase === 'chat-opening' || phase === 'typing-question' || phase === 'ai-thinking' || phase === 'ai-response' || phase === 'cursor-to-response';


  return (
    <div ref={containerRef} className="w-full relative overflow-hidden min-h-[350px]">
      {/* Chat Overlay */}
      <FullScreenChat 
        isVisible={showChatOverlay} 
        phase={phase} 
        typedQuestion={typedQuestion} 
        aiResponse={aiResponse} 
      />

      {/* Dashboard Content */}
      <div className={`transition-all duration-500 ease-out ${showChatOverlay ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="flex items-center justify-between mb-3 overflow-hidden">
          <div className="flex gap-0.5 p-0.5 bg-muted/50 dark:bg-muted/30 rounded-md">
            {tabs.map((tab) => (
              <TabButton key={tab.key} active={activeTab === tab.key} onClick={() => setActiveTab(tab.key)} icon={tab.icon} label={tab.label} />
            ))}
          </div>
          {/* Chat button in navbar */}
          <button 
            ref={chatButtonRef}
            className={`p-1.5 rounded-md transition-all duration-300 flex items-center justify-center
              ${(phase === 'hover-graph' || phase === 'cursor-to-chat') ? 'opacity-100' : 'opacity-70 hover:opacity-100'}
              ${phase === 'cursor-to-chat' ? 'bg-primary shadow-md' : 'bg-muted/50 dark:bg-muted/30 hover:bg-primary/10 border border-transparent hover:border-border'}`}
          >
            <MessageCircle className={`h-4 w-4 transition-transform duration-300 ${phase === 'cursor-to-chat' ? 'text-primary-foreground scale-110' : 'text-primary'}`} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <MetricCard title="Total Impact" value={formatCurrency(totalImpact)} icon={TrendingUp} color="bg-primary/20" trend={dashboardVersion === 2 ? "+32%" : "+24%"} />
          <MetricCard title="ROI Multiple" value="15-50x" icon={Zap} color="bg-accent/30" trend="+12%" />
          <MetricCard title="Direct Savings" value={formatCurrency(totalSavings)} icon={DollarSign} color="bg-primary/20" trend="+18%" />
          <MetricCard title="Enhancement" value={formatCurrency(totalEnhancement)} icon={Target} color="bg-accent/30" trend="+32%" />
        </div>

        <div ref={chartRef} className="bg-secondary/30 dark:bg-muted/20 rounded-lg border border-border p-3 min-h-[220px] min-w-[200px] relative overflow-hidden">
          {activeTab === "overview" && (
            <div>
              <div className="flex items-center gap-4">
                <div className="w-28 h-28 flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%" minWidth={100}>
                    <PieChart>
                      <Pie data={impactData} cx="50%" cy="50%" innerRadius={28} outerRadius={45} dataKey="value" strokeWidth={2} stroke="var(--color-background)">
                        <Cell fill={COLORS.savings} />
                        <Cell fill={COLORS.enhancement} />
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-2">
                  {impactData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-1.5 rounded bg-background/50 dark:bg-background/30 border border-border/50">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: i === 0 ? COLORS.savings : COLORS.enhancement }} />
                        <span className="text-[10px] text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="text-xs font-bold text-foreground">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border grid grid-cols-4 gap-2">
                {[{ label: "Sources", value: "50+", color: "text-primary" }, { label: "Reports", value: "200+", color: "text-[#5BA3E0]" }, { label: "Accuracy", value: "94%", color: "text-primary" }, { label: "Uptime", value: "99.9%", color: "text-accent" }].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className={`text-sm font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-[9px] text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "savings" && (
            <div className="h-[200px] min-w-[200px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={200}>
                <BarChart data={savingsData} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={75} tick={{ fontSize: 10, fill: AXIS_COLOR }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={false} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} fill={COLORS.savings}>
                    {savingsData.map((_, index) => (<Cell key={`cell-${index}`} fill={index % 2 === 0 ? COLORS.primary : COLORS.accent} />))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === "trend" && (
            <div className="h-[200px] min-w-[200px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={200}>
                <AreaChart data={trendData} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="trendGradientAnimated" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="projectedGradientAnimated" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.accent} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS.accent} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fontSize: 9, fill: AXIS_COLOR }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: AXIS_COLOR }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} width={50} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: "9px" }} formatter={(value) => <span className="text-muted-foreground">{value}</span>} />
                  <Area type="monotone" dataKey="projected" name="Projected" stroke={COLORS.accent} strokeWidth={1.5} strokeDasharray="4 4" fill="url(#projectedGradientAnimated)" />
                  <Area type="monotone" dataKey="value" name="Actual" stroke={COLORS.primary} strokeWidth={2} fill="url(#trendGradientAnimated)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === "performance" && (
            <div className="h-[200px] min-w-[200px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={200}>
                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={performanceData}>
                  <PolarGrid stroke={AXIS_COLOR} strokeOpacity={0.3} />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: AXIS_COLOR }} />
                  <Radar name="Performance" dataKey="A" stroke={COLORS.primary} fill={COLORS.primary} fillOpacity={0.4} strokeWidth={2} />
                  <Tooltip content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    return <div className="bg-background border border-border px-2 py-1 rounded shadow"><p className="text-xs font-semibold text-foreground">{payload[0].value}%</p></div>;
                  }} />
                </RadarChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-1">
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-primary" /><span className="text-[9px] text-muted-foreground">Avg: 91%</span></div>
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.accent }} /><span className="text-[9px] text-muted-foreground">Target: 90%</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeroDashboard;
