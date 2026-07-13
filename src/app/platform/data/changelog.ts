import type { ChangelogEntry } from "@/components/ui/changelog-1";

export const changelogEntries: ChangelogEntry[] = [
  {
    version: "Version 1.6.0",
    date: "13 July 2026",
    title: "Collaboration",
    description:
      "Create dedicated channels for your team and bring GiKA's AI directly into every shared conversation.",
    items: [
      "Create channels and add teammates to collaborate.",
      "Chat with AI directly inside a channel with full context",
      "Attach Chat sessions or RFP workflows to bring their context into the conversation",
      "Context carries across attached sessions so the AI always has the full picture",
    ],
    image: "/Features/Collab.png",
    button: {
      url: "https://gika.ai/platform",
      text: "Explore collaboration",
    },
  },
  {
    version: "Version 1.5.0",
    date: "2 June 2026",
    title: "Deep Research & Web Search",
    description:
      "Go beyond your knowledge base — GiKA can now run deep, multi-step research and pull live results from the web to ground its answers.",
    items: [
      "Deep research mode for multi-step, citation-backed investigations",
      "Real-time web search blended with your private knowledge graph",
      "Source tracing so you can verify every claim in an answer",
      "Configurable research depth for quick lookups or exhaustive reports",
    ],
    image: "/Features/Research.png",
    button: {
      url: "https://gika.ai/platform",
      text: "See how it works",
    },
  },
  {
    version: "Version 1.4.0",
    date: "14 April 2026",
    title: "End-to-End RFP Automation",
    description:
      "A complete, RFP workflow that takes a document from intake to a final, submission-ready package — with human review built in at every step.",
    items: [
      "Intake and automated requirements extraction from uploaded RFP documents",
      "Bidder selection and go/no-go decisioning",
      "Evidence gathering, context mapping, and specialist analysis stages",
      "Win theme analysis with editable, human-reviewed responses",
      "Proposal review and QA review with reject, revise, or approve controls",
      "Final package assembly into a submission-ready document",
    ],
    image: "/Features/RFP.png",
    button: {
      url: "https://gika.ai/platform",
      text: "See the RFP workflow",
    },
  },
  {
    version: "Version 1.2.1",
    date: "23 September 2025",
    title: "Data Connectors",
    description:
      "Connect GiKA directly to the systems you already use, so answers are always grounded in your live data.",
    items: [
      "Attach databases directly for real-time, queryable access",
      "Connect Gmail to bring email context into your knowledge graph",
      "Connect Google Drive to index documents, sheets, and slides automatically",
      "Sync files and folders as they're added or updated, with no manual re-uploads",
      "Support for 50+ new data source connectors",
      "Enterprise-grade security and access controls on every connection",
    ],
    image: "/Features/Data.png",
  },
  {
    version: "Version 1.3.0",
    date: "15 November 2025",
    title: "Dashboard Generation",
    description:
      "Turn any knowledge base or chat conversation into a live dashboard no manual setup required.",
    items: [
      "Generate dashboards and tiles directly from a knowledge base",
      "Create visualizations on the fly from within a chat conversation",
      "Customizable, reusable dashboard widgets",
      "Export analytics in multiple formats (CSV, PDF, Excel)",
      "Improved data filtering and segmentation options",
    ],
    image: "/Features/Dashboard.png",
    button: {
      url: "https://gika.ai/platform",
      text: "Explore the dashboard",
    },
  },
];
