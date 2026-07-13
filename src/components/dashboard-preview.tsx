"use client";

import { JetBrains_Mono } from "next/font/google";
import Image from "next/image";
import {
  Search,
  Eye,
  LayoutDashboard,
  BookOpen,
  Users,
  MessageSquare,
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

const queriesResolvedData = [
  { day: "Jul 4", resolved: 210 },
  { day: "Jul 5", resolved: 245 },
  { day: "Jul 6", resolved: 232 },
  { day: "Jul 7", resolved: 298 },
  { day: "Jul 8", resolved: 276 },
  { day: "Jul 9", resolved: 331 },
  { day: "Jul 10", resolved: 352 },
];

const queriesResolvedConfig = {
  resolved: {
    label: "Queries auto-resolved",
    color: "#9868a8",
  },
} satisfies ChartConfig;

const responseTimeData = [
  { query: "Security", manual: 4.5, gika: 0.6 },
  { query: "Technical", manual: 6.0, gika: 0.9 },
  { query: "Compliance", manual: 5.5, gika: 0.7 },
  { query: "Pricing", manual: 3.0, gika: 0.4 },
  { query: "Company Info", manual: 2.5, gika: 0.3 },
  { query: "Case Studies", manual: 3.5, gika: 0.5 },
  { query: "Legal Terms", manual: 4.0, gika: 0.6 },
];

const responseTimeConfig = {
  manual: {
    label: "Manual drafting",
    color: "#2a2a2a",
  },
  gika: {
    label: "With GIKA.AI",
    color: "#9868a8",
  },
} satisfies ChartConfig;

const hoursSavedTrendData = [
  { week: "W1", hours: 58 },
  { week: "W2", hours: 67 },
  { week: "W3", hours: 74 },
  { week: "W4", hours: 82 },
  { week: "W5", hours: 91 },
];

const hoursSavedTrendConfig = {
  hours: {
    label: "Hours saved",
    color: "#c9a8d4",
  },
} satisfies ChartConfig;

export default function DashboardPreview() {
  return (
    <div
      className={`pointer-events-none select-none ${jetBrainsMono.className}`}
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

        .gd-reminder-card{ background: linear-gradient(155deg, #180f1e 0%, #141414 55%); border-color:#9868a830; }
        .gd-reminder-card h3{ font-size:13.5px; margin-bottom:12px; }
        .gd-reminder-card .gd-evt{ font-size:14px; font-weight:700; margin-bottom:5px; }
        .gd-reminder-card .gd-time{ font-size:11px; color:var(--text-lo); margin-bottom:20px; }
        .gd-btn-start{ width:100%; padding:10px; border-radius:10px; border:none; background:var(--accent); color:#170900; font-weight:700; font-size:12px; display:flex; align-items:center; justify-content:center; gap:7px; }

        .gd-proj-list{ display:flex; flex-direction:column; gap:12px; }
        .gd-proj-item{ display:flex; align-items:center; gap:10px; }
        .gd-proj-ico{ width:30px;height:30px;border-radius:8px; flex:none; display:flex; align-items:center; justify-content:center; font-size:13px; border:1px solid var(--border); }
        .gd-proj-item .gd-pname{ font-size:12px; font-weight:600; }
        .gd-proj-item .gd-due{ font-size:10px; color:var(--text-lo); }

        .gd-grid-bottom{ display:grid; grid-template-columns: 1.6fr 1fr 1fr; gap:14px; }
        .gd-team-row{ display:flex; align-items:center; gap:10px; padding:14px 0; border-bottom:1px solid var(--border-soft); }
        .gd-team-row:last-child{ border-bottom:none; }
        .gd-team-avatar{ width:32px;height:32px;border-radius:50%; flex:none; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:11px; color:#0a0a0a; }
        .gd-team-info{ flex:1; min-width:0; }
        .gd-team-info .gd-n{ font-size:12px; font-weight:600; }
        .gd-team-info .gd-t{ font-size:10px; color:var(--text-lo); }
        .gd-team-info .gd-t b{ color:var(--text-mid); font-weight:600; }
        .gd-status{ font-size:9.5px; font-weight:700; padding:4px 9px; border-radius:20px; white-space:nowrap; }
        .gd-status.done{ background:#12241a; color:var(--ok); border:1px solid #1e3a29; }
        .gd-status.progress{ background:#1c1a0d; color:var(--amber); border:1px solid #3a3212; }
        .gd-status.pending{ background:#241414; color:#ff8a6b; border:1px solid #3a1e1e; }

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
        .gd-tracker-controls{ display:flex; gap:8px; }
        .gd-ctrl-btn{ width:38px;height:38px;border-radius:50%; border:none; display:flex; align-items:center; justify-content:center; font-size:13px; }
        .gd-ctrl-btn.play{ background:#fff; color:#0a0a0a; }
        .gd-ctrl-btn.stop{ background:var(--accent); color:#170900; }
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
                      <BookOpen size={14} />
                    </span>{" "}
                    Knowledge Base
                  </span>
                </div>
                <div className="gd-nav-item">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <Users size={14} />
                    </span>{" "}
                    Members
                  </span>
                </div>

                <div className="gd-nav-label gd-nav-label-row">
                  Chats <span className="gd-nav-label-line" />
                </div>
                <div className="gd-nav-item">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <MessageSquare size={14} />
                    </span>{" "}
                    GiKA Document A...
                  </span>
                </div>
                <div className="gd-nav-item">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <MessageSquare size={14} />
                    </span>{" "}
                    Processing Status...
                  </span>
                </div>
                <div className="gd-nav-item">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <MessageSquare size={14} />
                    </span>{" "}
                    Task Execution
                  </span>
                </div>
                <div className="gd-nav-item">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <MessageSquare size={14} />
                    </span>{" "}
                    Gmail
                  </span>
                </div>
                <div className="gd-nav-item">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <MessageSquare size={14} />
                    </span>{" "}
                    Customer Service...
                  </span>
                </div>

                <div className="gd-nav-label gd-nav-label-row">Threads</div>
                <div className="gd-nav-item">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <MessageSquare size={14} />
                    </span>{" "}
                    Q2 Churn Analysis
                  </span>
                </div>
                <div className="gd-nav-item">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <MessageSquare size={14} />
                    </span>{" "}
                    Revenue Forecast Model
                  </span>
                </div>
                <div className="gd-nav-item">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <MessageSquare size={14} />
                    </span>{" "}
                    Cohort Segmentation
                  </span>
                </div>
                <div className="gd-nav-item">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <MessageSquare size={14} />
                    </span>{" "}
                    Pricing Sensitivity
                  </span>
                </div>
                <div className="gd-nav-item">
                  <span className="gd-left">
                    <span className="gd-ico">
                      <MessageSquare size={14} />
                    </span>{" "}
                    Marketing Attribution
                  </span>
                </div>
              </div>
            </aside>
            <main className="gd-main">
              <div className="gd-topbar">
                <div className="gd-search">
                  Search workspace... <kbd>⌘ F</kbd>
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
                    Average response time vs. manual analysis
                  </div>
                  <div className="gd-hero-num">
                    <span>5x</span> Faster Responses
                  </div>
                  <div className="gd-stat-foot">
                    <span className="gd-up">↑</span> Up from 3.2x last quarter
                  </div>
                </div>
                <div className="gd-card gd-area-card">
                  <div className="gd-area-head">
                    <div>
                      <h3>Queries Auto-Resolved</h3>
                      <p>Daily volume handled without a human, last 7 days</p>
                    </div>
                    <div className="gd-area-tabs">
                      <span className="gd-area-tab">30 days</span>
                      <span className="gd-area-tab active">7 days</span>
                    </div>
                  </div>
                  <ChartContainer
                    config={queriesResolvedConfig}
                    className="gd-area-chart"
                  >
                    <AreaChart
                      data={queriesResolvedData}
                      margin={{ top: 6, right: 8, left: 8, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="gdAreaFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="var(--color-resolved)"
                            stopOpacity={0.45}
                          />
                          <stop
                            offset="100%"
                            stopColor="var(--color-resolved)"
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
                        dataKey="resolved"
                        type="monotone"
                        fill="url(#gdAreaFill)"
                        stroke="var(--color-resolved)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </div>

              <div className="gd-grid-mid">
                <div className="gd-card gd-rt-card">
                  <div className="gd-card-head">
                    <h3>RFP Response Time: Before vs GIKA</h3>
                    <span
                      style={{ fontSize: "10.5px", color: "var(--text-lo)" }}
                    >
                      Avg. days per RFP section
                    </span>
                  </div>
                  <ChartContainer
                    config={responseTimeConfig}
                    className="gd-rt-chart"
                  >
                    <BarChart
                      data={responseTimeData}
                      margin={{ top: 6, right: 8, left: 8, bottom: 0 }}
                    >
                      <CartesianGrid
                        vertical={false}
                        stroke="var(--border-soft)"
                      />
                      <XAxis
                        dataKey="query"
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
                        dataKey="manual"
                        fill="var(--color-manual)"
                        radius={4}
                        barSize={20}
                      />
                      <Bar
                        dataKey="gika"
                        fill="var(--color-gika)"
                        radius={4}
                        barSize={20}
                      />
                    </BarChart>
                  </ChartContainer>
                  <div className="gd-legend" style={{ marginTop: "10px" }}>
                    <span>
                      <span
                        style={{ background: "#2a2a2a" }}
                      ></span>
                      Manual analysis
                    </span>
                    <span>
                      <span style={{ background: "var(--accent)" }}></span>
                      With GIKA.AI
                    </span>
                  </div>
                  <div className="gd-rt-live">
                    <span className="gd-rt-live-dot" />
                    &quot;Draft the Security &amp; Compliance section&quot; —
                    resolved in 0.6 days, was ~4.5 days manually
                  </div>
                </div>
              </div>

              <div className="gd-grid-bottom">
                <div className="gd-card">
                  <div className="gd-card-head">
                    <h3>Team Time Reclaimed</h3>
                    <span className="gd-add-chip">＋</span>
                  </div>
                  <div className="gd-team-row">
                    <div
                      className="gd-team-avatar"
                      style={{ background: "#c9a8d4" }}
                    >
                      AD
                    </div>
                    <div className="gd-team-info">
                      <div className="gd-n">Alexandra Deff</div>
                      <div className="gd-t">
                        Analytics query · was <b>11s</b>
                      </div>
                    </div>
                    <span className="gd-status done">1.9s</span>
                  </div>
                  <div className="gd-team-row">
                    <div
                      className="gd-team-avatar"
                      style={{ background: "#9868a8" }}
                    >
                      EA
                    </div>
                    <div className="gd-team-info">
                      <div className="gd-n">Edwin Adenike</div>
                      <div className="gd-t">
                        Revenue report · was <b>14s</b>
                      </div>
                    </div>
                    <span className="gd-status done">2.3s</span>
                  </div>
                  <div className="gd-team-row">
                    <div
                      className="gd-team-avatar"
                      style={{ background: "#7fd88f" }}
                    >
                      IO
                    </div>
                    <div className="gd-team-info">
                      <div className="gd-n">Isaac Oluwatemilorun</div>
                      <div className="gd-t">
                        Cohort filter · was <b>8s</b>
                      </div>
                    </div>
                    <span className="gd-status done">1.5s</span>
                  </div>
                </div>

                <div className="gd-card">
                  <div className="gd-card-head">
                    <h3>Queries Resolved Without a Human</h3>
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
                        <div className="gd-lbl">Auto-resolved</div>
                      </div>
                    </div>
                    <div className="gd-meter-note">
                      8% escalated to an analyst
                    </div>
                  </div>
                </div>

                <div className="gd-card gd-tracker-card">
                  <div className="gd-card-head">
                    <h3>Hours Saved This Month</h3>
                  </div>
                  <div className="gd-tracker-time">318h 40m</div>
                  <ChartContainer
                    config={hoursSavedTrendConfig}
                    className="gd-tracker-spark"
                  >
                    <AreaChart
                      data={hoursSavedTrendData}
                      margin={{ top: 2, right: 2, left: 2, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="gdTrackerFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="var(--color-hours)"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="100%"
                            stopColor="var(--color-hours)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        dataKey="hours"
                        type="monotone"
                        fill="url(#gdTrackerFill)"
                        stroke="var(--color-hours)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ChartContainer>
                  <div className="gd-tracker-breakdown">
                    <div className="gd-tb-item">
                      <div className="gd-tb-val">214h</div>
                      <div className="gd-tb-lbl">Query drafting</div>
                    </div>
                    <div className="gd-tb-item">
                      <div className="gd-tb-val">104h 40m</div>
                      <div className="gd-tb-lbl">Manual review</div>
                    </div>
                  </div>
                  <div className="gd-stat-foot">
                    <span className="gd-up">↑</span> vs. manual analysis
                    baseline
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
