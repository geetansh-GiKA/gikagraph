export default function DashboardPreview() {
  return (
    <div className="pointer-events-none select-none">
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
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Arial, sans-serif;
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

        .gd-app{ display:grid; grid-template-columns: 220px 1fr; min-height:640px; }

        .gd-sidebar{
          background: linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%);
          border-right: 1px solid var(--border-soft);
          padding: 22px 16px;
          display:flex; flex-direction:column; position:relative;
        }
        .gd-brand{ display:flex; align-items:center; gap:10px; padding: 0 4px 22px 4px; font-weight:800; font-size:16px; letter-spacing:0.5px; }
        .gd-brand .gd-mark{
          width:26px; height:26px; border-radius:8px;
          background: linear-gradient(145deg, var(--accent), #7a4e88);
          display:flex; align-items:center; justify-content:center;
        }
        .gd-brand span.gd-tag{ color: var(--accent); }
        .gd-menu-label{ font-size:9.5px; letter-spacing:1.4px; color: var(--text-lo); text-transform:uppercase; padding: 14px 8px 6px; }
        .gd-nav-item{
          display:flex; align-items:center; justify-content:space-between; gap:10px;
          padding:9px 10px; border-radius: var(--radius-sm); font-size:12.5px; color: var(--text-mid); margin-bottom:2px; position:relative;
        }
        .gd-nav-item .gd-left{ display:flex; align-items:center; gap:9px; }
        .gd-nav-item .gd-ico{ width:15px; text-align:center; opacity:.85; }
        .gd-nav-item.active{ background: linear-gradient(90deg, #9868a814, transparent); color: var(--text-hi); }
        .gd-nav-item.active::before{
          content:""; position:absolute; left:-16px; top:7px; bottom:7px; width:3px;
          background: var(--accent); border-radius:0 3px 3px 0;
        }
        .gd-pill{ font-size:9.5px; background: var(--accent); color:#160800; font-weight:700; padding:1px 6px; border-radius:20px; }
        .gd-sidebar-bottom{ margin-top:auto; padding-top:16px; }
        .gd-app-promo{
          background: radial-gradient(circle at 30% 0%, #241108, #0c0c0c 70%);
          border:1px solid #9868a82e; border-radius: var(--radius); padding:14px 14px;
        }
        .gd-app-promo .gd-icon{
          width:28px;height:28px;border-radius:8px; background:#1c1c1c; border:1px solid var(--border);
          display:flex;align-items:center;justify-content:center; margin-bottom:10px; font-size:13px;
        }
        .gd-app-promo h4{ font-size:11.5px; margin-bottom:3px; }
        .gd-app-promo p{ font-size:10px; color:var(--text-lo); margin-bottom:12px; line-height:1.4; }
        .gd-btn-download{ width:100%; padding:8px; border-radius:8px; border:none; background: var(--accent); color:#170900; font-weight:700; font-size:11px; }

        .gd-main{ padding: 20px 26px 30px; }
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
        .gd-profile{ display:flex; align-items:center; gap:9px; }
        .gd-avatar{
          width:32px;height:32px;border-radius:50%; background: linear-gradient(145deg, var(--accent), #6b3d78);
          display:flex; align-items:center; justify-content:center; font-weight:700; font-size:11px; color:#160800;
        }
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

        .gd-stats{ display:grid; grid-template-columns: repeat(4, 1fr); gap:14px; margin-bottom:16px; }
        .gd-stat-card{ background: radial-gradient(circle at 100% 0%, #c9a8d418, transparent 60%), var(--panel); border:1px solid #c9a8d42a; border-radius: var(--radius); padding:16px; }
        .gd-stat-card.hero{ background: radial-gradient(circle at 100% 0%, #9868a826, transparent 60%), var(--panel); border:1px solid #9868a83d; }
        .gd-stat-top{ display:flex; align-items:center; justify-content:space-between; color:var(--text-mid); font-size:12px; margin-bottom:14px; }
        .gd-stat-top .gd-arrow{ width:22px;height:22px;border-radius:50%; border:1px solid var(--border); display:flex;align-items:center;justify-content:center; font-size:11px; color:var(--text-mid); }
        .gd-stat-card.hero .gd-arrow{ border-color:#9868a855; color:var(--accent-soft); }
        .gd-stat-num{ font-size:26px; font-weight:800; margin-bottom:10px; }
        .gd-stat-foot{ display:inline-flex; align-items:center; gap:5px; font-size:10.5px; color:var(--text-lo); background:#1a1a1a; border:1px solid var(--border); padding:4px 9px; border-radius:20px; }
        .gd-stat-card.hero .gd-stat-foot{ background:#1a1220; border-color:#9868a840; color:var(--accent-soft); }
        .gd-stat-foot .gd-up{ color: var(--accent); }

        .gd-grid-mid{ display:grid; grid-template-columns: 1.3fr 1fr 1fr; gap:14px; margin-bottom:14px; }
        .gd-card{ background: var(--panel); border:1px solid #c9a8d422; border-radius: var(--radius); padding:18px; }
        .gd-card-head{ display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
        .gd-card-head h3{ font-size:13.5px; font-weight:700; }
        .gd-add-chip{ width:22px;height:22px;border-radius:50%; background:#1c1c1c; border:1px solid var(--border); display:flex;align-items:center;justify-content:center; color:var(--accent); font-size:13px; }

        .gd-bars{ display:flex; align-items:flex-end; justify-content:space-between; height:120px; gap:8px; margin-bottom:8px; }
        .gd-bar-col{ flex:1; display:flex; flex-direction:column; align-items:center; gap:8px; height:100%; justify-content:flex-end; position:relative; }
        .gd-bar{ width:100%; max-width:22px; border-radius:7px; background: repeating-linear-gradient(135deg, #1c1c1c 0 4px, #171717 4px 8px); border:1px solid var(--border); position:relative; }
        .gd-bar.filled{ background: var(--accent); border-color:#9868a8; }
        .gd-bar.filled.soft{ background: var(--accent-soft); border-color:#c9a8d4; }
        .gd-bar-tag{ position:absolute; top:-24px; left:50%; transform:translateX(-50%); background:var(--accent); color:#170900; font-size:9.5px; font-weight:700; padding:2px 6px; border-radius:6px; white-space:nowrap; }
        .gd-bar-labels{ display:flex; justify-content:space-between; }
        .gd-bar-labels span{ flex:1; text-align:center; font-size:10.5px; color:var(--text-lo); }

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
        .gd-team-row{ display:flex; align-items:center; gap:10px; padding:9px 0; border-bottom:1px solid var(--border-soft); }
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

        .gd-tracker-card{ background: radial-gradient(circle at 20% 0%, #9868a82e, transparent 55%), var(--panel); border-color:#9868a830; display:flex; flex-direction:column; justify-content:space-between; }
        .gd-tracker-time{ font-size:28px; font-weight:800; letter-spacing:1px; margin: 14px 0 16px; }
        .gd-tracker-controls{ display:flex; gap:8px; }
        .gd-ctrl-btn{ width:38px;height:38px;border-radius:50%; border:none; display:flex; align-items:center; justify-content:center; font-size:13px; }
        .gd-ctrl-btn.play{ background:#fff; color:#0a0a0a; }
        .gd-ctrl-btn.stop{ background:var(--accent); color:#170900; }

        @media (max-width: 1100px){
          .gd-app{ grid-template-columns: 1fr; }
          .gd-sidebar{ display:none; }
          .gd-stats{ grid-template-columns: repeat(2,1fr); }
          .gd-grid-mid, .gd-grid-bottom{ grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="gd-outer">
        <div className="grafino-dash">
          <div className="gd-app">
            <aside className="gd-sidebar">
              <div className="gd-brand">GIKA.AI</div>

              <div className="gd-menu-label">Menu</div>
              <div className="gd-nav-item active">
                <div className="gd-left">
                  <span className="gd-ico">▦</span>Dashboard
                </div>
              </div>
              <div className="gd-nav-item">
                <div className="gd-left">
                  <span className="gd-ico">✓</span>Tasks
                </div>
                <span className="gd-pill">12+</span>
              </div>
              <div className="gd-nav-item">
                <div className="gd-left">
                  <span className="gd-ico">▤</span>Calendar
                </div>
              </div>
              <div className="gd-nav-item">
                <div className="gd-left">
                  <span className="gd-ico">◔</span>Analytics
                </div>
              </div>
              <div className="gd-nav-item">
                <div className="gd-left">
                  <span className="gd-ico">◎</span>Team
                </div>
              </div>

              <div className="gd-menu-label">General</div>
              <div className="gd-nav-item">
                <div className="gd-left">
                  <span className="gd-ico">⚙</span>Settings
                </div>
              </div>
              <div className="gd-nav-item">
                <div className="gd-left">
                  <span className="gd-ico">?</span>Help
                </div>
              </div>
              <div className="gd-nav-item">
                <div className="gd-left">
                  <span className="gd-ico">⏻</span>Logout
                </div>
              </div>

              <div className="gd-sidebar-bottom">
                <div className="gd-app-promo">
                  <div className="gd-icon">▣</div>
                  <h4>
                    Download our
                    <br />
                    Mobile App
                  </h4>
                  <p>Get easy access anywhere, another way to manage work.</p>
                  <button className="gd-btn-download" tabIndex={-1}>
                    Download
                  </button>
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
                    <div className="gd-avatar">GG</div>
                    <div>
                      <div className="gd-name">Geetansh Goyal</div>
                      <div className="gd-mail">geetansh@grafino.com</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="gd-page-head">
                <div>
                  <h1>Dashboard</h1>
                  <p>
                    Plan, prioritize, and accomplish your workspaces with ease.
                  </p>
                </div>
                <div className="gd-head-actions">
                  <button className="gd-btn-primary" tabIndex={-1}>
                    ＋ Add Project
                  </button>
                  <button className="gd-btn-ghost" tabIndex={-1}>
                    Import Data
                  </button>
                </div>
              </div>

              <div className="gd-stats">
                <div className="gd-stat-card hero">
                  <div className="gd-stat-top">
                    Total Workspaces <span className="gd-arrow">↗</span>
                  </div>
                  <div className="gd-stat-num">24</div>
                  <div className="gd-stat-foot">
                    <span className="gd-up">↑</span> Increased from last month
                  </div>
                </div>
                <div className="gd-stat-card">
                  <div className="gd-stat-top">
                    Owned Workspaces <span className="gd-arrow">↗</span>
                  </div>
                  <div className="gd-stat-num">10</div>
                  <div className="gd-stat-foot">
                    <span className="gd-up">↑</span> Increased from last month
                  </div>
                </div>
                <div className="gd-stat-card">
                  <div className="gd-stat-top">
                    Shared Workspaces <span className="gd-arrow">↗</span>
                  </div>
                  <div className="gd-stat-num">12</div>
                  <div className="gd-stat-foot">
                    <span className="gd-up">↑</span> Increased from last month
                  </div>
                </div>
                <div className="gd-stat-card">
                  <div className="gd-stat-top">
                    Pending Invites <span className="gd-arrow">↗</span>
                  </div>
                  <div className="gd-stat-num">2</div>
                  <div className="gd-stat-foot">On Discuss</div>
                </div>
              </div>

              <div className="gd-grid-mid">
                <div className="gd-card">
                  <div className="gd-card-head">
                    <h3>Workspace Analytics</h3>
                    <span
                      style={{ fontSize: "10.5px", color: "var(--text-lo)" }}
                    >
                      This week
                    </span>
                  </div>
                  <div className="gd-bars">
                    <div className="gd-bar-col">
                      <div className="gd-bar" style={{ height: "38%" }}></div>
                    </div>
                    <div className="gd-bar-col">
                      <div className="gd-bar" style={{ height: "62%" }}></div>
                    </div>
                    <div className="gd-bar-col">
                      <div className="gd-bar filled" style={{ height: "74%" }}>
                        <span className="gd-bar-tag">74%</span>
                      </div>
                    </div>
                    <div className="gd-bar-col">
                      <div
                        className="gd-bar filled soft"
                        style={{ height: "90%" }}
                      ></div>
                    </div>
                    <div className="gd-bar-col">
                      <div className="gd-bar" style={{ height: "30%" }}></div>
                    </div>
                    <div className="gd-bar-col">
                      <div className="gd-bar" style={{ height: "52%" }}></div>
                    </div>
                    <div className="gd-bar-col">
                      <div className="gd-bar" style={{ height: "44%" }}></div>
                    </div>
                  </div>
                  <div className="gd-bar-labels">
                    <span>S</span>
                    <span>M</span>
                    <span>T</span>
                    <span>W</span>
                    <span>T</span>
                    <span>F</span>
                    <span>S</span>
                  </div>
                </div>

                <div className="gd-card gd-reminder-card">
                  <h3>Reminders</h3>
                  <div className="gd-evt">Sync with GIKA&apos;S Workspace</div>
                  <div className="gd-time">Time: 02:00 pm – 04:00 pm</div>
                  <button className="gd-btn-start" tabIndex={-1}>
                    ▶ Start Meeting
                  </button>
                </div>

                <div className="gd-card">
                  <div className="gd-card-head">
                    <h3>Repositories</h3>
                    <span className="gd-add-chip">＋</span>
                  </div>
                  <div className="gd-proj-list">
                    <div className="gd-proj-item">
                      <div
                        className="gd-proj-ico"
                        style={{ background: "#241a12", color: "var(--amber)" }}
                      >
                        ◆
                      </div>
                      <div>
                        <div className="gd-pname">Develop API Endpoints</div>
                        <div className="gd-due">Due date: Jul 26, 2026</div>
                      </div>
                    </div>
                    <div className="gd-proj-item">
                      <div
                        className="gd-proj-ico"
                        style={{ background: "#12211f", color: "#5fd6c4" }}
                      >
                        ◈
                      </div>
                      <div>
                        <div className="gd-pname">Onboarding Flow</div>
                        <div className="gd-due">Due date: Jul 28, 2026</div>
                      </div>
                    </div>
                    <div className="gd-proj-item">
                      <div
                        className="gd-proj-ico"
                        style={{
                          background: "#241414",
                          color: "var(--accent)",
                        }}
                      >
                        ✦
                      </div>
                      <div>
                        <div className="gd-pname">Build Workgroup Panel</div>
                        <div className="gd-due">Due date: Aug 2, 2026</div>
                      </div>
                    </div>
                    <div className="gd-proj-item">
                      <div
                        className="gd-proj-ico"
                        style={{ background: "#241a12", color: "var(--amber)" }}
                      >
                        ◐
                      </div>
                      <div>
                        <div className="gd-pname">Optimize Page Load</div>
                        <div className="gd-due">Due date: Aug 6, 2026</div>
                      </div>
                    </div>
                    <div className="gd-proj-item">
                      <div
                        className="gd-proj-ico"
                        style={{ background: "#151f24", color: "#6bb7ff" }}
                      >
                        ◉
                      </div>
                      <div>
                        <div className="gd-pname">Cross-Browser Testing</div>
                        <div className="gd-due">Due date: Aug 6, 2026</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="gd-grid-bottom">
                <div className="gd-card">
                  <div className="gd-card-head">
                    <h3>Team Collaboration</h3>
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
                        Working on <b>Github Repository Sync</b>
                      </div>
                    </div>
                    <span className="gd-status done">Completed</span>
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
                        Working on <b>Auth for Shared Workspaces</b>
                      </div>
                    </div>
                    <span className="gd-status progress">In Progress</span>
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
                        Working on <b>Workgroup Filter Search</b>
                      </div>
                    </div>
                    <span className="gd-status pending">Pending</span>
                  </div>
                  <div className="gd-team-row">
                    <div
                      className="gd-team-avatar"
                      style={{ background: "#6bb7ff" }}
                    >
                      DO
                    </div>
                    <div className="gd-team-info">
                      <div className="gd-n">David Oshodi</div>
                      <div className="gd-t">
                        Working on <b>Responsive Workspace Cards</b>
                      </div>
                    </div>
                    <span className="gd-status progress">In Progress</span>
                  </div>
                </div>

                <div className="gd-card">
                  <div className="gd-card-head">
                    <h3>Workspace Progress</h3>
                  </div>
                  <div className="gd-donut-wrap">
                    <div className="gd-donut">
                      <svg width="150" height="150" viewBox="0 0 180 180">
                        <circle
                          cx="90"
                          cy="90"
                          r="76"
                          fill="none"
                          stroke="#1c1c1c"
                          strokeWidth="16"
                        />
                        <circle
                          cx="90"
                          cy="90"
                          r="76"
                          fill="none"
                          stroke="#ffb020"
                          strokeWidth="16"
                          strokeDasharray="477.5"
                          strokeDashoffset="330"
                          strokeLinecap="round"
                        />
                        <circle
                          cx="90"
                          cy="90"
                          r="76"
                          fill="none"
                          stroke="#9868a8"
                          strokeWidth="16"
                          strokeDasharray="477.5"
                          strokeDashoffset="418"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="gd-donut-center">
                        <div className="gd-pct">41%</div>
                        <div className="gd-lbl">Workspace Ended</div>
                      </div>
                    </div>
                    <div className="gd-legend">
                      <span>
                        <span
                          className="gd-dot-sq"
                          style={{ background: "var(--accent)" }}
                        ></span>
                        Completed
                      </span>
                      <span>
                        <span
                          className="gd-dot-sq"
                          style={{ background: "var(--amber)" }}
                        ></span>
                        In Progress
                      </span>
                      <span>
                        <span
                          className="gd-dot-sq"
                          style={{ background: "#2a2a2a" }}
                        ></span>
                        Pending
                      </span>
                    </div>
                  </div>
                </div>

                <div className="gd-card gd-tracker-card">
                  <div className="gd-card-head">
                    <h3>Time Tracker</h3>
                  </div>
                  <div className="gd-tracker-time">01:24:08</div>
                  <div className="gd-tracker-controls">
                    <button className="gd-ctrl-btn play" tabIndex={-1}>
                      ⏸
                    </button>
                    <button className="gd-ctrl-btn stop" tabIndex={-1}>
                      ■
                    </button>
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
