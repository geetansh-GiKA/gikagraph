export 
const layers = [
  {
    id: 1,
    label: "Layer 1",
    title: "Data ingestion",
    tldr: "Normalize everything into a single stream.",
    points: [
      "Connect Drive, Notion, email, internal APIs, and databases.",
      "Extract text, metadata, permissions, and change history.",
      "Normalize into a versioned, queryable store with stable IDs.",
    ],
  },
  {
    id: 2,
    label: "Layer 2",
    title: "Knowledge graph",
    tldr: "Turn raw content into entities and relationships.",
    points: [
      "Typed schema for users, documents, tickets, and services.",
      "Entity linking across tools and duplicates.",
      "Graph edges capture ownership, impact, and mentions over time.",
    ],
  },
  {
    id: 3,
    label: "Model",
    title: "Model",
    tldr: "LLM tuned for your org, not the whole internet.",
    points: [
      "Retrieval-augmented generation over your graph and documents.",
      "Domain prompts and guardrails for consistent answers.",
      "Tool calls into your infra (incidents, metrics, deploys).",
    ],
  },
  {
    id: 4,
    label: "Layer 4",
    title: "Query & inference",
    tldr: "One query interface across graph, text, and tools.",
    points: [
      "Intent detection for search, Q&A, and summaries.",
      "Routes between graph lookup, full-text search, and tools.",
      "Returns answers with citations and execution trace.",
    ],
  },
] as const
