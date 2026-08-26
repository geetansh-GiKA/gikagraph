"use client";

import { useState } from "react";
import {
  Database,
  BarChart3,
  ShieldCheck,
  Sparkles,
  BrainCircuit,
  type LucideIcon,
} from "lucide-react";
import {
  DatabaseIcon,
  ApiIcon,
  File02Icon,
  Building06Icon,
  BrainCircuitIcon,
  LockIcon,
  UserCheckIcon,
  FileSecurityIcon,
  FileVerifiedIcon,
  SearchFocusIcon,
  Link01Icon,
  TagsIcon,
  MergeIcon,
  ChartBubbleIcon,
  AiBrainIcon,
  Alert01Icon,
  FileExportIcon,
  RocketIcon,
} from "@hugeicons/core-free-icons";
import Badge from "@/components/badge";
import SlideEffect from "@/components/slide-effect";
import { cn } from "@/lib/utils";
import { PipelineDiagram } from "@/sections/pipeline-diagram";
import BentoCard, { type BentoCardCategory } from "@/components/ui/bento-card";

interface Stage {
  key: string;
  label: string;
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
  activeInputs: string[];
  activeOutputs: string[];
  metric: { value: string; label: string };
  bentoCard: {
    title: string;
    description: string;
    categories: BentoCardCategory[];
    layout?: "sidebar" | "flat";
  };
}

export const stages: Stage[] = [
  {
    key: "ingestion",
    label: "Data Ingestion",
    icon: Database,
    title: "Data Ingestion",
    description:
      "Enterprise-grade connectors pull structured and unstructured data from every source you already use — no manual exports.",
    points: [
      "Databases, files, and cloud storage",
      "Live web search for market context",
      "ERP and CRM systems out of the box",
    ],
    activeInputs: ["databases", "files", "erp", "email", "websearch"],
    activeOutputs: [],
    metric: { value: "10+", label: "connectors supported" },
    bentoCard: {
      title: "Data Ingestion",
      description:
        "Enterprise-grade connectors pull structured and unstructured data from diverse sources — databases, APIs, files, and external tools.",
      categories: [
        {
          id: "databases",
          label: "Databases",
          icon: DatabaseIcon,
          items: [
            { label: "MySQL", icon: DatabaseIcon },
            { label: "PostgreSQL", icon: DatabaseIcon },
            { label: "MongoDB", icon: DatabaseIcon },
          ],
        },
        {
          id: "apis",
          label: "APIs",
          icon: ApiIcon,
          items: [
            { label: "REST APIs", icon: ApiIcon },
            { label: "GraphQL", icon: ApiIcon },
            { label: "WebSocket", icon: ApiIcon },
          ],
        },
        {
          id: "files",
          label: "Files",
          icon: File02Icon,
          items: [
            { label: "CSV", icon: File02Icon },
            { label: "Excel", icon: File02Icon },
            { label: "PDF", icon: File02Icon },
            { label: "JSON", icon: File02Icon },
          ],
        },
        {
          id: "crm",
          label: "CRM",
          icon: Building06Icon,
          items: [
            { label: "SAP", icon: Building06Icon },
            { label: "Salesforce", icon: Building06Icon },
            { label: "Oracle", icon: Building06Icon },
          ],
        },
      ],
    },
  },
  {
    key: "knowledge-graph",
    label: "Knowledge Graph",
    icon: BrainCircuit,
    title: "Knowledge Graph",
    description:
      "GiKAGraph resolves entities across sources and links them into a single, connected graph — your fragmented data becomes one source of truth.",
    points: [
      "Entity resolution across all sources",
      "Deduplication and conflict handling",
      "Relationships preserved, not flattened",
    ],
    activeInputs: ["databases", "files", "erp", "email", "websearch"],
    activeOutputs: [],
    metric: { value: "99.2%", label: "entity resolution accuracy" },
    bentoCard: {
      title: "Knowledge Graph",
      description:
        "GiKAGraph links every entity into a single connected graph, so your fragmented data becomes one grounded source of truth.",
      categories: [
        {
          id: "resolution",
          label: "Resolution",
          icon: BrainCircuitIcon,
          items: [
            {
              label: "Fuzzy name and address matching",
              icon: BrainCircuitIcon,
            },
            { label: "Cross-source identity linking", icon: BrainCircuitIcon },
            {
              label: "Confidence-scored entity merges",
              icon: BrainCircuitIcon,
            },
          ],
        },
        {
          id: "dedup",
          label: "Dedup",
          icon: BrainCircuitIcon,
          items: [
            { label: "Duplicate record detection", icon: BrainCircuitIcon },
            {
              label: "Field-level conflict resolution",
              icon: BrainCircuitIcon,
            },
            {
              label: "Source-of-truth precedence rules",
              icon: BrainCircuitIcon,
            },
          ],
        },
        {
          id: "relationships",
          label: "Relations",
          icon: BrainCircuitIcon,
          items: [
            {
              label: "Customer ↔ order ↔ invoice links",
              icon: BrainCircuitIcon,
            },
            {
              label: "Org hierarchy and ownership maps",
              icon: BrainCircuitIcon,
            },
            {
              label: "Multi-hop relationship traversal",
              icon: BrainCircuitIcon,
            },
          ],
        },
        {
          id: "graph",
          label: "Graph",
          icon: BrainCircuitIcon,
          items: [
            { label: "Unified schema across sources", icon: BrainCircuitIcon },
            { label: "Real-time graph updates", icon: BrainCircuitIcon },
            {
              label: "Versioned, queryable graph store",
              icon: BrainCircuitIcon,
            },
          ],
        },
      ],
    },
  },
  /* {
    key: "access-control",
    label: "Access Control",
    icon: ShieldCheck,
    title: "Access Control",
    description:
      "Enterprise-grade permissions travel with the data itself, so every user and agent only ever sees what they're allowed to.",
    points: [
      "Row- and field-level permissions",
      "SSO and role-based access",
      "Full audit trail on every query",
    ],
    activeInputs: [],
    activeOutputs: ["users", "agent"],
    metric: { value: "100%", label: "audit trail coverage" },
    bentoCard: {
      title: "Access Control",
      description:
        "Enterprise-grade permissions travel with the data itself, so every user and agent only ever sees what they're allowed to.",
      categories: [
        {
          id: "permissions",
          label: "Permissions",
          icon: LockIcon,
          items: [
            { label: "Row-level access rules", icon: LockIcon },
            { label: "Field-level data masking", icon: LockIcon },
            { label: "Scoped API key permissions", icon: LockIcon },
          ],
        },
        {
          id: "sso",
          label: "SSO",
          icon: UserCheckIcon,
          items: [
            { label: "SAML and OIDC single sign-on", icon: UserCheckIcon },
            { label: "Role-based access control (RBAC)", icon: UserCheckIcon },
            { label: "Just-in-time provisioning", icon: UserCheckIcon },
          ],
        },
        {
          id: "audit",
          label: "Audit",
          icon: FileSecurityIcon,
          items: [
            { label: "Immutable query audit logs", icon: FileSecurityIcon },
            { label: "Per-user access history", icon: FileSecurityIcon },
            { label: "Anomaly and access alerts", icon: FileSecurityIcon },
          ],
        },
        {
          id: "compliance",
          label: "Compliance",
          icon: FileVerifiedIcon,
          items: [
            { label: "Data residency controls", icon: FileVerifiedIcon },
            { label: "Encryption at rest and in transit", icon: FileVerifiedIcon },
            { label: "Configurable retention policies", icon: FileVerifiedIcon },
          ],
        },
      ],
    },
  }, */
  {
    key: "enrichment",
    label: "Data Enrichment",
    icon: Sparkles,
    title: "Data Enrichment",
    description:
      "Domain-tuned models enrich raw entities with context, classification, and scoring — turning records into decision-ready signals.",
    points: [
      "Automatic tagging and classification",
      "Business-context scoring",
      "Continuous re-enrichment as data changes",
    ],
    activeInputs: [],
    activeOutputs: ["reports", "dashboard"],
    metric: { value: "15-50x", label: "ROI on business outcomes" },
    bentoCard: {
      title: "Data Enrichment",
      description:
        "Our graph-native enrichment engine deeply parses and contextualizes your proprietary documents, dynamically extracting the precise entities and relationships required to auto-construct unassailable, compliant, and winning RFP responses in complex enterprise environments.",
      categories: [
        {
          id: "entity-discovery",
          label: "Entity",
          icon: SearchFocusIcon,
          items: [
            {
              label: "Graph-Native Entity Discovery (GNED)",
              icon: SearchFocusIcon,
            },
          ],
        },
        {
          id: "relationship-discovery",
          label: "Relations",
          icon: Link01Icon,
          items: [
            {
              label: "Knowledge Graph Relationship Discovery",
              icon: Link01Icon,
            },
          ],
        },
        {
          id: "attribute-extraction",
          label: "Attributes",
          icon: TagsIcon,
          items: [
            {
              label: "Deep Entity Property & Attribute Extraction",
              icon: TagsIcon,
            },
          ],
        },
        {
          id: "canonicalization",
          label: "Canonical",
          icon: MergeIcon,
          items: [
            { label: "Cross-Source Entity Canonicalization", icon: MergeIcon },
          ],
        },
      ],
      layout: "flat",
    },
  },
  {
    key: "intelligence",
    label: "Intelligence Layer",
    icon: BarChart3,
    title: "Intelligence Layer",
    description:
      "The finished graph powers dashboards, alerts, and agents — grounded answers and insights, delivered where your team already works.",
    points: [
      "Real-time dashboards and reports",
      "Proactive alerts on key changes",
      "Agents that act on grounded context",
    ],
    activeInputs: [],
    activeOutputs: ["dashboard", "alerts", "reports", "users", "agent"],
    metric: { value: "<100ms", label: "average query latency" },
    bentoCard: {
      title: "Intelligence Layer",
      description:
        "A unified interface that transforms complex data into clear, actionable insights with AI-powered recommendations for RFP preparation — ideal for executives to review the most critical elements.",
      categories: [
        {
          id: "graph-explorer",
          label: "Explorer",
          icon: ChartBubbleIcon,
          items: [{ label: "Interactive Graph Explorer", icon: ChartBubbleIcon }],
        },
        {
          id: "ai-insights",
          label: "Insights",
          icon: AiBrainIcon,
          items: [{ label: "AI-Powered Insights", icon: AiBrainIcon }],
        },
        {
          id: "alerts",
          label: "Alerts",
          icon: Alert01Icon,
          items: [{ label: "Smart Alerts & Heatmaps", icon: Alert01Icon }],
        },
        {
          id: "reports",
          label: "Reports",
          icon: FileExportIcon,
          items: [{ label: "Automated Reports", icon: FileExportIcon }],
        },
        {
          id: "rfp-automation",
          label: "RFP",
          icon: RocketIcon,
          items: [
            {
              label: "RFP Response Automation — precise, compliant, winning",
              icon: RocketIcon,
            },
          ],
        },
      ],
      layout: "flat",
    },
  },
];

export default function PipelineStages() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = stages[activeIndex];

  return (
    <div className="py-16 md:py-24 px-4">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-5 max-w-3xl mx-auto">
        <SlideEffect>
          <Badge text="Pipeline Stages" Icon={Sparkles} />
        </SlideEffect>

        <SlideEffect
          direction="top"
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter"
        >
          <h2 className="text-foreground">Explore Each Stage</h2>
        </SlideEffect>

        <SlideEffect
          delay={0.1}
          className="px-2 sm:px-10 md:px-0 w-full md:max-w-xl mx-auto text-sm lg:text-base text-muted-foreground"
        >
          Click through each stage to see how data moves from raw inputs to
          grounded, actionable intelligence.
        </SlideEffect>
      </div>

      {/* Stage tabs */}
      <SlideEffect
        delay={0.15}
        className="mt-10 flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto"
      >
        {stages.map((stage, i) => {
          const StageIcon = stage.icon;
          const isActive = i === activeIndex;
          return (
            <button
              key={stage.key}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2 text-xs md:text-sm font-medium transition-colors",
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              <StageIcon className="size-3.5" strokeWidth={2} />
              {stage.label}
            </button>
          );
        })}
      </SlideEffect>

      {/* Content */}
      <SlideEffect
        delay={0.2}
        className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch"
      >
        <PipelineDiagram
          activeInputs={active.activeInputs}
          activeOutputs={active.activeOutputs}
        />

        {/* Detail panel */}
        <BentoCard
          key={active.key}
          title={active.bentoCard.title}
          description={active.bentoCard.description}
          categories={active.bentoCard.categories}
          stageNumber={activeIndex + 1}
          layout={active.bentoCard.layout}
        />
      </SlideEffect>
    </div>
  );
}
