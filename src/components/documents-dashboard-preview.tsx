"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { JetBrains_Mono } from "next/font/google";
import Image from "next/image";
import {
  Search,
  Eye,
  LayoutDashboard,
  FolderOpen,
  Users,
  FileText,
  FileSpreadsheet,
  ShieldCheck,
  Scale,
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const documentsIndexedData = [
  { day: "Jul 4", indexed: 18 },
  { day: "Jul 5", indexed: 26 },
  { day: "Jul 6", indexed: 24 },
  { day: "Jul 7", indexed: 34 },
  { day: "Jul 8", indexed: 31 },
  { day: "Jul 9", indexed: 42 },
  { day: "Jul 10", indexed: 48 },
];

const documentsIndexedConfig = {
  indexed: {
    label: "Documents indexed",
    color: "#9868a8",
  },
} satisfies ChartConfig;

const coverageByCategoryData = [
  { category: "Security", covered: 100 },
  { category: "Technical", covered: 96 },
  { category: "Compliance", covered: 100 },
  { category: "Pricing", covered: 92 },
  { category: "Company Info", covered: 100 },
  { category: "Case Studies", covered: 88 },
  { category: "Legal Terms", covered: 97 },
];

const coverageByCategoryConfig = {
  covered: {
    label: "Requirements covered",
    color: "#9868a8",
  },
} satisfies ChartConfig;

const sourcesGrowthData = [
  { week: "W1", sources: 64 },
  { week: "W2", sources: 78 },
  { week: "W3", sources: 92 },
  { week: "W4", sources: 111 },
  { week: "W5", sources: 128 },
];

const sourcesGrowthConfig = {
  sources: {
    label: "Sources indexed",
    color: "#c9a8d4",
  },
} satisfies ChartConfig;

const recentDocuments = [
  { name: "MSA_Template_v3.pdf", tag: "Contract", icon: FileText },
  { name: "Security_Whitepaper.pdf", tag: "Compliance", icon: ShieldCheck },
  { name: "Pricing_Matrix.xlsx", tag: "Pricing", icon: FileSpreadsheet },
];

const DASHBOARD_BASE_WIDTH = 1180;

export default function DocumentsDashboardPreview() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const measure = () => {
      const containerWidth = wrapper.offsetWidth;
      setScale(containerWidth / DASHBOARD_BASE_WIDTH);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  const scaledHeight = (contentRef.current?.offsetHeight ?? 0) * scale;

  return (
    <div ref={wrapperRef} style={{ height: scaledHeight || undefined }}>
      <div
        ref={contentRef}
        className={`pointer-events-none select-none ${jetBrainsMono.className}`}
        style={{
          width: DASHBOARD_BASE_WIDTH,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
      <style>{`
        .grafino-dash{
          --bg: #0a0a0a;
          --panel: #141414;
          --border: #232323;
          --border-soft: #1c1c1c;
          --text-hi: #f2f0ec;
          --text-mid: #a8a5a0;
          --text-lo: #6f6c68;
          --accent: #9868a8;
          --accent-soft: #c9a8d4;
          --amber: #ffb020;
          --ok: #7fd88f;
          --radius: 16px;
          --radius-sm: 8px;
          font-family: 'JetBrains Mono', 'SF Mono', Menlo, monospace;
          background:
            radial-gradient(circle at 1px 1px, #2a2a2a 1px, transparent 1px) 0 0/22px 22px,
            var(--bg);
          color: var(--text-hi);
          letter-spacing:0.1px;
          border-radius: 20px;
          overflow: hidden;
          font-size: 12px;
        }
        .grafino-dash *{ box-sizing:border-box; }
        .grafino-dash a{ color:inherit; text-decoration:none; }

        .gd-outer{
          padding: 32px;
          border-radius: 28px;
          background:
            radial-gradient(circle at 15% 10%, rgba(201,168,212,0.35), transparent 45%),
            radial-gradient(circle at 90% 85%, rgba(122,78,136,0.3), transparent 55%),
            linear-gradient(155deg, rgba(152,104,168,0.22) 0%, rgba(122,78,136,0.12) 40%, rgba(152,104,168,0.06) 100%);
        }
        .grafino-dash{
          border: 1px solid rgba(201,168,212,0.25);
        }

        .gd-app{ display:grid; grid-template-columns: 260px 1fr; min-height:640px; gap:16px; padding: 24px; align-items:start; }

        .gd-sidebar{
          background: radial-gradient(circle at 100% 0%, #c9a8d418, transparent 60%), var(--panel);
          border: 1px solid #c9a8d42a;
          border-radius: var(--radius);
          padding: 20px 10px 30px;
          display:flex; flex-direction:column;
          height:100%;
        }

        .gd-brand{ display:flex; align-items:center; gap:9px; padding: 8px 12px 14px; font-weight:800; font-size:14px; letter-spacing:0.3px; }
        .gd-brand .gd-mark{
          width:24px; height:24px; border-radius:50%;
          background: linear-gradient(145deg, var(--accent), #7a4e88);
          display:flex; align-items:center; justify-content:center; flex:none;
        }
        .gd-brand span.gd-tag{ color: var(--accent); }
        .gd-nav-item{
          display:flex; align-items:center; justify-content:space-between; gap:10px;
          padding:10px 14px; border-radius: 999px; font-size:12.5px; color: var(--text-mid); position:relative;
        }
        .gd-nav-item .gd-left{ display:flex; align-items:center; gap:9px; }
        .gd-nav-item .gd-ico{ width:15px; text-align:center; opacity:.85; }
        .gd-nav-item.active{ background: var(--panel); border:1px solid #c9a8d42a; color:var(--text-hi); }
        .gd-nav-item.active .gd-ico{ opacity:1; color:var(--accent-soft); }
        .gd-pill{ font-size:9.5px; background: var(--panel); border:1px solid var(--border); color:var(--text-mid); font-weight:700; padding:1px 6px; border-radius:20px; }
        .gd-nav-item.active .gd-pill{ background:var(--bg); color: var(--text-mid); }

        .gd-nav-divider{ height:1px; background: var(--border-soft); margin:6px 12px; }
        .gd-nav-foot{ display:flex; align-items:center; justify-content:space-around; padding:6px 4px 4px; }
        .gd-nav-foot .gd-nav-ico-btn{
          width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center;
          color:var(--text-mid); font-size:13px;
        }
        .gd-nav-label{ font-size:10px; font-weight:700; letter-spacing:0.6px; text-transform:uppercase; color:var(--text-hi); padding:14px 14px 6px; }
        .gd-nav-label-row{ display:flex; align-items:center; gap:8px; }
        .gd-nav-label-line{ flex:1; height:1px; background: var(--border-soft); }
        .gd-add-chip.small{ width:16px; height:16px; font-size:11px; flex:none; }
        .gd-nav{ display:flex; flex-direction:column; gap:4px; flex:1; }
        .gd-sidebar-foot{ margin-top:auto; padding:10px; border-radius:12px; background:var(--bg); border:1px solid var(--border-soft); display:flex; align-items:center; gap:9px; }
        .gd-sidebar-foot .gd-avatar{ width:28px;height:28px;font-size:10px; }
        .gd-sidebar-foot .gd-name{ font-size:11px; font-weight:600; }
        .gd-sidebar-foot .gd-mail{ font-size:9.5px; color:var(--text-lo); }

        .gd-main{ padding: 0; }
        .gd-topbar{ display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom:22px; }
        .gd-search{
          flex:1; max-width:340px; display:flex; align-items:center; gap:8px;
          background: var(--panel); border:1px solid #c9a8d42a; border-radius:11px; padding:9px 14px; color:var(--text-lo); font-size:12px;
        }
        .gd-search kbd{ margin-left:auto; font-size:10px; color:var(--text-lo); border:1px solid var(--border); border-radius:6px; padding:2px 5px; }
        .gd-top-actions{ display:flex; align-items:center; gap:12px; }
        .gd-icon-btn{
          width:32px; height:32px; border-radius:10px; background:var(--panel); border:1px solid var(--border);
          display:flex; align-items:center; justify-content:center; color:var(--text-mid); font-size:13px; position:relative;
        }
        .gd-icon-btn .gd-dot{ position:absolute; top:6px; right:6px; width:5px; height:5px; background:var(--accent); border-radius:50%;  }
        .gd-profile{
          display:flex; align-items:center; gap:9px;
          background: var(--panel); border:1px solid #c9a8d42a; border-radius:999px; padding:5px 14px 5px 5px;
        }
        .gd-avatar{
          width:32px;height:32px;border-radius:50%; background: linear-gradient(145deg, var(--accent), #6b3d78);
          display:flex; align-items:center; justify-content:center; font-weight:700; font-size:11px; color:#160800; flex:none;
          overflow:hidden;
        }
        .gd-avatar.gd-avatar-img img{ width:100%; height:100%; object-fit:cover; }
        .gd-profile .gd-name{ font-size:12px; font-weight:600; }
        .gd-profile .gd-mail{ font-size:10px; color:var(--text-lo); }

        .gd-page-head{ display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:22px; flex-wrap:wrap; gap:14px; }
        .gd-page-head h1{ font-size:22px; font-weight:800; letter-spacing:0.2px; }
        .gd-page-head p{ color:var(--text-lo); font-size:12px; margin-top:5px; }
        .gd-head-actions{ display:flex; gap:8px; }
        .gd-btn-primary{
          display:flex; align-items:center; gap:6px; background: var(--accent); color:#170900; font-weight:700; font-size:11.5px;
          border:none; padding:9px 15px; border-radius:10px;
        }
        .gd-btn-ghost{ background: transparent; color:var(--text-hi); font-weight:600; font-size:11.5px; border:1px solid var(--border); padding:9px 15px; border-radius:10px; }

        .gd-stats{ display:grid; grid-template-columns: 1fr 1.4fr; gap:14px; margin-bottom:16px; }
        .gd-stat-card{ background: radial-gradient(circle at 100% 0%, #c9a8d418, transparent 60%), var(--panel); border:1px solid #c9a8d42a; border-radius: var(--radius); padding:16px; }
        .gd-stat-card.hero{
          background: radial-gradient(circle at 12% 0%, #c9a8d42e, transparent 55%), radial-gradient(circle at 100% 100%, #9868a830, transparent 55%), var(--panel);
          border:1px solid #9868a850; display:flex; flex-direction:column; justify-content:center; padding:20px 22px;
        }
        .gd-stat-top{ display:flex; align-items:center; justify-content:space-between; color:var(--text-mid); font-size:12px; margin-bottom:14px; }
        .gd-stat-top .gd-arrow{ width:22px;height:22px;border-radius:50%; border:1px solid var(--border); display:flex;align-items:center;justify-content:center; font-size:11px; color:var(--text-mid); }
        .gd-stat-card.hero .gd-arrow{ border-color:#9868a855; color:var(--accent-soft); }
        .gd-stat-num{ font-size:26px; font-weight:800; margin-bottom:10px; }
        .gd-hero-label{ font-size:12px; color:var(--text-mid); margin-bottom:6px; }
        .gd-hero-num{ font-size:44px; font-weight:800; letter-spacing:-0.5px; line-height:1; margin-bottom:10px; }
        .gd-hero-num span{ color: var(--accent-soft); }
        .gd-stat-foot{ display:inline-flex; align-items:center; gap:5px; font-size:10.5px; color:var(--text-lo); background:#1a1a1a; border:1px solid var(--border); padding:4px 9px; border-radius:20px; }
        .gd-stat-card.hero .gd-stat-foot{ background:#1a1220; border-color:#9868a840; color:var(--accent-soft); width:fit-content; }
        .gd-stat-foot .gd-up{ color: var(--accent); }
        .gd-stat-spark{ width:100%; height:36px; margin-bottom:10px; }

        .gd-area-card{ display:flex; flex-direction:column; padding:18px 20px 14px; }
        .gd-area-head{ display:flex; align-items:flex-start; justify-content:space-between; gap:14px; margin-bottom:14px; }
        .gd-area-head h3{ font-size:14px; font-weight:700; margin-bottom:4px; }
        .gd-area-head p{ font-size:11px; color:var(--text-lo); }
        .gd-area-tabs{ display:flex; gap:2px; background:#1a1a1a; border:1px solid var(--border); border-radius:9px; padding:2px; flex:none; }
        .gd-area-tab{ font-size:10.5px; font-weight:600; color:var(--text-lo); padding:6px 10px; border-radius:7px; white-space:nowrap; }
        .gd-area-tab.active{ background:var(--panel); color:var(--text-hi); border:1px solid #c9a8d42a; }
        .gd-area-chart{ width:100%; height:120px; }

        .gd-grid-mid{ display:grid; grid-template-columns: 1fr; gap:14px; margin-bottom:14px; }
        .gd-rt-chart{ width:100%; height:220px; }
        .gd-rt-live{ display:flex; align-items:center; gap:8px; font-size:11px; color:var(--text-mid); background:#1a1a1a; border:1px solid var(--border); padding:9px 12px; border-radius:10px; margin-top:12px; }
        .gd-rt-live-dot{ width:6px; height:6px; border-radius:50%; background:var(--accent); flex:none; }
        .gd-card{ background: var(--panel); border:1px solid #c9a8d422; border-radius: var(--radius); padding:18px; }
        .gd-card-head{ display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
        .gd-card-head h3{ font-size:13.5px; font-weight:700; }
        .gd-add-chip{ width:22px;height:22px;border-radius:50%; background:#1c1c1c; border:1px solid var(--border); display:flex;align-items:center;justify-content:center; color:var(--accent); font-size:13px; }

        .gd-bars{ display:flex; align-items:flex-end; justify-content:space-between; height:120px; gap:8px; margin-bottom:8px; }
        .gd-bar-col{ flex:1; display:flex; flex-direction:column; align-items:center; gap:8px; height:100%; justify-content:flex-end; position:relative; }
        .gd-bar{ width:100%; max-width:22px; border-radius:4px 4px 0 0; background: repeating-linear-gradient(135deg, #1c1c1c 0 4px, #171717 4px 8px); border:1px solid var(--border); border-bottom:none; position:relative; }
        .gd-bar.filled{ background: var(--accent); border-color:#9868a8; }
        .gd-bar.filled.soft{ background: var(--accent-soft); border-color:#c9a8d4; }
        .gd-bar-tag{ position:absolute; top:-24px; left:50%; transform:translateX(-50%); background:var(--accent); color:#170900; font-size:9.5px; font-weight:700; padding:2px 6px; border-radius:6px; white-space:nowrap; }
        .gd-bar-labels{ display:flex; justify-content:space-between; }
        .gd-bar-labels span{ flex:1; text-align:center; font-size:10.5px; color:var(--text-lo); }

        .gd-rt-groups{ display:flex; justify-content:space-between; gap:10px; margin-bottom:6px; }
        .gd-rt-group{ flex:1; display:flex; flex-direction:column; align-items:center; }
        .gd-bars-pair{ height:104px; gap:6px; margin-bottom:10px; width:100%; }
        .gd-bars-pair .gd-bar-col{ gap:6px; }
        .gd-bar-val{ font-size:10px; font-weight:700; color:var(--text-mid); white-space:nowrap; }
        .gd-bar-val.accent{ color:var(--accent-soft); }
        .gd-rt-tag{ font-size:10px; color:var(--text-lo); text-align:center; line-height:1.4; }

        .gd-doc-list{ display:flex; flex-direction:column; gap:12px; }
        .gd-doc-item{ display:flex; align-items:center; gap:10px; }
        .gd-doc-ico{ width:30px;height:30px;border-radius:8px; flex:none; display:flex; align-items:center; justify-content:center; font-size:13px; border:1px solid var(--border); background:#1a1a1a; color:var(--accent-soft); }
        .gd-doc-item .gd-dname{ font-size:12px; font-weight:600; }
        .gd-doc-item .gd-dmeta{ font-size:10px; color:var(--text-lo); }
        .gd-doc-tag{ font-size:9.5px; font-weight:700; padding:4px 9px; border-radius:20px; white-space:nowrap; background:#1a1220; color:var(--accent-soft); border:1px solid #9868a840; }

        .gd-donut-wrap{ display:flex; flex-direction:column; align-items:center; }
        .gd-donut{ position:relative; width:150px; height:150px; margin: 2px 0 14px; }
        .gd-donut svg{ transform:rotate(-90deg); }
        .gd-donut-center{ position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; }
        .gd-donut-center .gd-pct{ font-size:22px; font-weight:800; }
        .gd-donut-center .gd-lbl{ font-size:10px; color:var(--text-lo); }
        .gd-legend{ display:flex; gap:12px; font-size:10.5px; color:var(--text-mid); flex-wrap:wrap; justify-content:center; }
        .gd-legend .gd-dot-sq{ width:8px;height:8px;border-radius:3px; display:inline-block; margin-right:5px; }
        .gd-meter-note{ font-size:11px; color:var(--text-lo); text-align:center; }

        .gd-tracker-card{ background: radial-gradient(circle at 20% 0%, #9868a82e, transparent 55%), var(--panel); border-color:#9868a830; display:flex; flex-direction:column; justify-content:space-between; }
        .gd-tracker-time{ font-size:28px; font-weight:800; letter-spacing:1px; margin: 14px 0 12px; text-align:center; }
        .gd-tracker-spark{ width:100%; height:34px; margin-bottom:12px; }
        .gd-tracker-breakdown{ display:flex; gap:8px; margin-bottom:12px; }
        .gd-tracker-breakdown .gd-tb-item{ flex:1; background:#1a1a1a; border:1px solid var(--border); border-radius:10px; padding:8px 10px; }
        .gd-tracker-breakdown .gd-tb-val{ font-size:14px; font-weight:800; color:var(--text-hi); }
        .gd-tracker-breakdown .gd-tb-lbl{ font-size:9.5px; color:var(--text-lo); margin-top:2px; }

        @media (max-width: 1100px){
          .gd-app{ grid-template-columns: 1fr; }
          .gd-stats{ grid-template-columns: repeat(2,1fr); }
          .gd-grid-mid, .gd-grid-bottom{ grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="gd-outer">
        <div className="grafino-dash">
          <div className="gd-app">
            <aside className="gd-sidebar">
              <div className="gd-nav">
                <div className="gd-nav-label">Top Actions</div>
                <div className="gd-nav-item">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <Search size={14} />
                    </span>{" "}
                    Search
                  </span>
                </div>
                <div className="gd-nav-item">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <Eye size={14} />
                    </span>{" "}
                    Overview
                  </span>
                </div>
                <div className="gd-nav-item active">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <LayoutDashboard size={14} />
                    </span>{" "}
                    Dashboard
                  </span>
                </div>
                <div className="gd-nav-item">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <FolderOpen size={14} />
                    </span>{" "}
                    Source Library
                  </span>
                </div>
                <div className="gd-nav-item">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <Users size={14} />
                    </span>{" "}
                    Team
                  </span>
                </div>

                <div className="gd-nav-label gd-nav-label-row">
                  Requirements <span className="gd-nav-label-line" />
                </div>
                <div className="gd-nav-item">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <ShieldCheck size={14} />
                    </span>{" "}
                    Security &amp; Compliance
                  </span>
                </div>
                <div className="gd-nav-item">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <FileText size={14} />
                    </span>{" "}
                    Technical Scope
                  </span>
                </div>
                <div className="gd-nav-item">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <FileSpreadsheet size={14} />
                    </span>{" "}
                    Pricing &amp; Terms
                  </span>
                </div>
                <div className="gd-nav-item">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <Scale size={14} />
                    </span>{" "}
                    Legal Terms
                  </span>
                </div>

                <div className="gd-nav-label gd-nav-label-row">Proposals</div>
                <div className="gd-nav-item">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <FileText size={14} />
                    </span>{" "}
                    Acme Corp RFP
                  </span>
                </div>
                <div className="gd-nav-item">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <FileText size={14} />
                    </span>{" "}
                    Globex Renewal
                  </span>
                </div>
                <div className="gd-nav-item">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <FileText size={14} />
                    </span>{" "}
                    Initech Onboarding
                  </span>
                </div>
              </div>
            </aside>
            <main className="gd-main">
              <div className="gd-topbar">
                <div className="gd-search">
                  Search documents... <kbd>⌘ F</kbd>
                </div>
                <div className="gd-top-actions">
                  <div className="gd-profile">
                    <div className="gd-avatar gd-avatar-img">
                      <Image
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=64&h=64&fit=crop&crop=faces"
                        alt="John Doe"
                        width={32}
                        height={32}
                      />
                    </div>
                    <div>
                      <div className="gd-name">John Doe</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="gd-stats">
                <div className="gd-stat-card hero">
                  <div className="gd-hero-label">
                    Requirements coverage across all sources
                  </div>
                  <div className="gd-hero-num">
                    <span>100%</span> Covered
                  </div>
                  <div className="gd-stat-foot">
                    <span className="gd-up">↑</span> Up from 62% manual
                    tracking
                  </div>
                </div>
                <div className="gd-card gd-area-card">
                  <div className="gd-area-head">
                    <div>
                      <h3>Documents Indexed Over Time</h3>
                      <p>Sources added to the knowledge graph, last 7 days</p>
                    </div>
                    <div className="gd-area-tabs">
                      <span className="gd-area-tab">30 days</span>
                      <span className="gd-area-tab active">7 days</span>
                    </div>
                  </div>
                  <ChartContainer
                    config={documentsIndexedConfig}
                    className="gd-area-chart"
                  >
                    <AreaChart
                      data={documentsIndexedData}
                      margin={{ top: 6, right: 8, left: 8, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="gdDocsAreaFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="var(--color-indexed)"
                            stopOpacity={0.45}
                          />
                          <stop
                            offset="100%"
                            stopColor="var(--color-indexed)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        vertical={false}
                        stroke="var(--border-soft)"
                      />
                      <XAxis
                        dataKey="day"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        fontSize={9.5}
                        stroke="var(--text-lo)"
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                      />
                      <Area
                        dataKey="indexed"
                        type="monotone"
                        fill="url(#gdDocsAreaFill)"
                        stroke="var(--color-indexed)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </div>

              <div className="gd-grid-mid">
                <div className="gd-card gd-rt-card">
                  <div className="gd-card-head">
                    <h3>Requirements Coverage by Category</h3>
                    <span
                      style={{ fontSize: "10.5px", color: "var(--text-lo)" }}
                    >
                      % of requirements matched to a source
                    </span>
                  </div>
                  <ChartContainer
                    config={coverageByCategoryConfig}
                    className="gd-rt-chart"
                  >
                    <BarChart
                      data={coverageByCategoryData}
                      margin={{ top: 6, right: 8, left: 8, bottom: 0 }}
                    >
                      <CartesianGrid
                        vertical={false}
                        stroke="var(--border-soft)"
                      />
                      <XAxis
                        dataKey="category"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        fontSize={10.5}
                        stroke="var(--text-lo)"
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                      />
                      <Bar
                        dataKey="covered"
                        fill="var(--color-covered)"
                        radius={4}
                        barSize={28}
                      />
                    </BarChart>
                  </ChartContainer>
                  <div className="gd-rt-live" style={{ marginTop: "12px" }}>
                    <span className="gd-rt-live-dot" />
                    &quot;Draft the Security &amp; Compliance section&quot; —
                    matched to 4 sources automatically
                  </div>
                </div>
              </div>

              <div className="gd-grid-bottom">
                <div className="gd-card">
                  <div className="gd-card-head">
                    <h3>Recently Indexed Documents</h3>
                    <span className="gd-add-chip">＋</span>
                  </div>
                  <div className="gd-doc-list">
                    {recentDocuments.map((doc) => (
                      <div className="gd-doc-item" key={doc.name}>
                        <div className="gd-doc-ico">
                          <doc.icon size={14} />
                        </div>
                        <div className="gd-team-info">
                          <div className="gd-dname">{doc.name}</div>
                          <div className="gd-dmeta">Indexed just now</div>
                        </div>
                        <span className="gd-doc-tag">{doc.tag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="gd-card">
                  <div className="gd-card-head">
                    <h3>Requirements Matched to a Source</h3>
                  </div>
                  <div className="gd-donut-wrap">
                    <div className="gd-donut">
                      <svg width="150" height="150" viewBox="0 0 180 180">
                        <circle
                          cx="90"
                          cy="90"
                          r="76"
                          fill="none"
                          stroke="#241a2b"
                          strokeWidth="16"
                        />
                        <circle
                          cx="90"
                          cy="90"
                          r="76"
                          fill="none"
                          stroke="#9868a8"
                          strokeWidth="16"
                          strokeDasharray="477.5"
                          strokeDashoffset="43.9"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="gd-donut-center">
                        <div className="gd-pct">92%</div>
                        <div className="gd-lbl">Auto-matched</div>
                      </div>
                    </div>
                    <div className="gd-meter-note">
                      8% flagged for manual review
                    </div>
                  </div>
                </div>

                <div className="gd-card gd-tracker-card">
                  <div className="gd-card-head">
                    <h3>Sources Indexed This Month</h3>
                  </div>
                  <div className="gd-tracker-time">128 sources</div>
                  <ChartContainer
                    config={sourcesGrowthConfig}
                    className="gd-tracker-spark"
                  >
                    <AreaChart
                      data={sourcesGrowthData}
                      margin={{ top: 2, right: 2, left: 2, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="gdDocsTrackerFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="var(--color-sources)"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="100%"
                            stopColor="var(--color-sources)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        dataKey="sources"
                        type="monotone"
                        fill="url(#gdDocsTrackerFill)"
                        stroke="var(--color-sources)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ChartContainer>
                  <div className="gd-tracker-breakdown">
                    <div className="gd-tb-item">
                      <div className="gd-tb-val">86</div>
                      <div className="gd-tb-lbl">Contracts &amp; MSAs</div>
                    </div>
                    <div className="gd-tb-item">
                      <div className="gd-tb-val">42</div>
                      <div className="gd-tb-lbl">Case studies</div>
                    </div>
                  </div>
                  <div className="gd-stat-foot">
                    <span className="gd-up">↑</span> vs. manual document
                    tracking
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
