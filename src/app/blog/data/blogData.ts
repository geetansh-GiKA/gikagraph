// Shared blog data used by both listing and detail pages
export interface BlogPost {
    id: number
    slug: string
    title: string
    excerpt: string
    category: string
    categorySlug: string
    author: {
        name: string
        avatar: string
        role: string
        bio: string
    }
    publishedAt: string
    readTime: number
    coverImage: string
    featured: boolean
    content: string
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        slug: 'ai-that-truly-understands-your-business',
        title: 'Redefining How Business Thinks',
        excerpt: 'Explore why neural networks alone are not enough for intelligent decision-making, and how GiKA\'s reasoning-first AI goes beyond workflow automation to augment analyst thinking.',
        category: 'AI & Technology',
        categorySlug: 'ai-technology',
        author: {
            name: 'Manoj Agarwal',
            avatar: '/GikaAI.png',
            role: 'Co-Founder, GiKA AI',
            bio: 'Manoj Agarwal is a co-founder at GiKA AI, leading the vision for reasoning-first AI systems that transform how businesses make decisions. Along with Prabhath Chellingi, Sayantan Kanjilal, and Aadey Shah, he is building the next generation of cognitive AI for enterprise.'
        },
        publishedAt: '2025-12-04',
        readTime: 12,
        coverImage: '/blog/blog.png',
        featured: false,
        content: `
## Introduction

Recently, Luis Pareras (MD, PhD) published an insightful paper on how AI agents will transform the venture capital and investment ecosystem as a whole. Pareras, an influential figure and VC, a neurosurgeon-turned-investor and the Managing Partner of Invivo Venture Partners, has been at the intersection of clinical, academic, and entrepreneurial innovation.

The key argument in his thesis was: **Agentic AI systems will first enter the VC workflow as "analysts"** — triaging deal flow, drafting diligence, mapping competitors, scoring risk, and producing memos in minutes.

He further predicts that over time, these AI agents will act — interviewing founders, observing data, suggesting actions, and eventually occupying traditional VC roles. He concludes that:

> Advantage will shift to those who wire agents into end-to-end workflows, build secure data and compute moats, and monetize superior decision-making.

We agree with several parts of Pareras' thesis:
- Process-driven roles like analysts will decline
- Multi-agent systems will collaborate to solve larger problems
- AI will increasingly drive structured decision workflows

But this is where existing Agentic AI stops. At GiKA Graph AI, our mission is to go beyond that.

## Why Neural Networks Alone Are Not Enough

Neural networks will not lead to conscious systems. And consciousness is only one dimension of intelligence. Human judgment involves:

- **Curiosity** — the drive to explore and question
- **Motivation** — the purpose behind decisions
- **Gut instinct** — pattern recognition beyond data
- **Bias and perception** — the lens through which we see
- **Emotions and trust** — the foundation of relationships
- **The ability to reject an idea** — critical thinking

These traits are all central to a VC or PE playbook. Today's AI can identify surface-level patterns and forecast outcomes using historical data, but venture investing goes beyond. It depends on subtleties which AI cannot capture, such as:

- Founder grit
- Contrarian market theses with no precedent
- Emotional intelligence
- Human relationships
- Trust

**AI cannot replace the final human decision.** Our thesis of building intelligent AI agents is fully aligned with this reality.

## What Is Intelligence, Really?

We use the term "intelligent AI agents", but rarely stop to define intelligence.

Most people subconsciously assume a digital twin of ourselves when we speak of intelligence — which has a vague meaning residing fully in our own mind — each having a different definition. Each of us has a different understanding of intelligence.

However, each of these definitions reside within the following key dimensions:
- **Objective vs. subjective**
- **Factual vs. experiential**

Without clearly understanding these dimensions, we cannot define the limits or possibilities of AI.

## The Rise of Agentic AI in Venture Investing

In recent months, several startups emerged building AI associates for PE/VC/Hedge funds and asset managers. However, the key distinction between such tools and GiKA lies in the **depth of intelligence and technical foundation**.

This is the only differentiator that will decide who leads the next generation of AI agents.

These existing or emerging tools automate the investment workflow: CIM → Model → IC Memo → CRM Update. In other words, they are agentic automation layers that help deal teams move faster.

However, **GiKA is a reasoning-first AI decision engine**. It doesn't just automate (which it does nevertheless) — it reasons over a living knowledge graph. It produces contextual, auditable decisions and recommendations across PE, credit, and investment use cases.

We don't build "AI Associates that help analysts do things faster." **We build a cognitive twin that helps analysts do the right things.**

## Core Differences: GiKA vs. Existing AI Agents

### 1. Scope of Intelligence

**Existing AI agents** automate execution tasks with specialized workflows.

**GiKA** performs cognitive work — risk evaluation, investment rationale, counterfactual reasoning — with built-in logic and auditability.

### 2. Technology Architecture

**Existing AI** is an agentic orchestration layer connecting firm data to task automations.

**GiKA** builds a living entity graph + domain intelligence services enabling:
- Stateful, temporal reasoning
- Explainability grounded in logic
- Dynamic context evolution

This is our real moat. No one else in this space is close.

## Why This Matters

While the current AI agents reduce analyst effort, **GiKA augments analyst thinking**.

For VCs, PEs, and investment firms, GiKA is not a workflow bot — it is a reproducible reasoning substrate that becomes part of their cognitive infrastructure.

The current agentic stacks and RAG pipelines hit limits in:
- Counterfactual reasoning
- Coherence
- Explainability

GiKA is built to solve exactly these limits.

## Workflow AI vs. Reasoning AI (GiKA)

| Workflow AI | Reasoning AI (GiKA) |
|-------------|---------------------|
| Automates tasks and processes | Performs cognitive decision-making |
| Linear pipeline: CIM → Model → Memo → CRM | Living knowledge graph + dynamic context |
| Outputs summaries and formatted insights | Generates defensible investment rationale |
| Mimics analyst workflows | Mimics analyst thinking |
| Executes instructions | Evaluates, critiques, and rejects bad assumptions |
| Provides faster throughput | Provides better decisions |
| Dependent on RAG + agentic orchestration | Built on entity graph + reasoning substrate |
| No counterfactual capability | Supports "what if?" and second-order reasoning |
| Limited explainability | Full audit trails and logic-based explanations |
| Helps analysts work faster | Helps analysts choose the right actions |
| Reduces workload | Augments judgment |

## Conclusion

Many startups are building to automate parts of the investment workflow. GiKA goes beyond — it is a **reasoning-first AI analyst**.

It's not about doing things faster. It's about ensuring the right decisions are made — with the same data.

---

## References

1. [Invivo Partners - AI in VC Paper](https://invivo.partners/wp-content/uploads/2025/09/FINAL_AImock.pdf)
2. [Brownloop Kairos AI](https://www.brownloop.com/kairos-ai/)
3. [AlphaSense - AI Tools for Financial Research](https://www.alpha-sense.com/resources/research-articles/ai-tools-for-financial-research/)
4. [KiteEdge - The Wealth Mosaic](https://www.thewealthmosaic.com/vendors/kiteedge/)
5. [Stardog](https://www.stardog.com/)
6. [Fluree](https://flur.ee/)
7. [Maximor AI](https://www.maximor.ai/)
8. [ZarnaAI](https://www.zarnaai.com/)
9. [Invivo Partners](https://invivo.partners/)
10. [Preprints.org - Neural Networks and Consciousness](https://www.preprints.org/manuscript/202502.1164)
11. [GiKA Graph AI](https://www.gikagraph.ai/)
        `
    },
    {
        id: 2,
        slug: 'copilot-for-the-business',
        title: 'AI Copilot for the Business: Bringing Structure to Enterprise Decision-Making',
        excerpt: 'Why has coding seen such a leap in AI performance and trust, while other domains grapple with hallucinations? The answer lies in structure — and GiKA is bringing that structure to enterprise decision-making.',
        category: 'AI & Technology',
        categorySlug: 'ai-technology',
        author: {
            name: 'GiKA AI Team',
            avatar: '/GikaAI.png',
            role: 'GiKA AI',
            bio: 'The GiKA AI team is building the next generation of reasoning-first AI for enterprise decision-making, transforming how businesses think through structured knowledge graphs and entity-aware reasoning.'
        },
        publishedAt: '2025-12-04',
        readTime: 6,
        coverImage: '/blog/blog.png',
        featured: false,
        content: `
## The Rise of AI-Assisted Coding

The most unambiguous success stories in generative AI have emerged in the domain of AI-assisted coding. AI-coding tools like GitHub Copilot and Cursor have rapidly reached — and in many cases exceeded — human-level performance in writing, completing, and even debugging code.

They have improved to the point where developers worldwide have developed trust in these systems and integrate them seamlessly into their workflows.

However, the question is: **Why has coding seen such a leap in AI performance and trust, while other domains grapple with hallucinations, brittleness, or limited strategic value?**

The answer lies in structure.

## Why Coding Works So Well for AI

Code is a highly structured language. It is governed by:

- **Well-defined syntax** (for, if, return, etc.)
- **Logical composition** and type hierarchies
- **Deterministic rules** that can be verified

These properties make it naturally compatible with both statistical pattern learning and symbolic reasoning. In essence, AI coding agents succeed because the domain data was already highly structured due to constraints.

**This is not true for most business data and decision-making spaces... yet.**

## The Missing Structure in Enterprise Data

In enterprises, most data and knowledge are:

- **Fragmented** across tools, teams, and time
- **Exist in different formats** (dashboards, documents, calls, notes)
- **Lacking semantic clarity** (what is a "customer", "conversion", or "churn" differs widely)

This is why LLMs fail to deliver consistent, trustworthy, or deeply contextual outputs in business settings. The other problems are inherent context window limitations and data privacy issues that businesses face.

> The lesson is clear: The path forward to build semantically more intelligent systems is to bring more structure to the input data.

**Knowledge Graphs are the way to structurally represent the data.** Though building KG is non-trivial, the key to unlocking true enterprise AI is imposing symbolic structure on unstructured domains — the same way code structure enables Copilot.

## Connecting the Dots: An Approach to Strategic Intelligence

This is where GiKA's approach shines. By transforming scattered business data into a **living Entity Graph** — representing business-specific entities, their relationships, taxonomy and logic — GiKA enables deep contextual grounding of responses, which are also integrated with external knowledge to further enrich internal entity understanding.

In this paradigm, "Marketing strategy" becomes a traversable object with dependencies on:

- **Product Mix**
- **Customer Segments**
- **Competitive Landscape**

## From Copilot for Code to Copilot for the Boardroom

Effectively, we're moving from Copilot for Code to **Copilot for the Boardroom** — serving analysts, product managers, data scientists and decision makers.

The way Copilot revolutionised software development, **GiKA revolutionises strategic business decision-making**, with a personalised, reasoning-first AI that is structurally aware of how your business works.

## The Future of Enterprise AI

The future of enterprise AI will not be built on ever-larger models guessing at the input data. If the same level of trust has to be built, it will be built on:

- **Structured knowledge**
- **First-order logic**
- **Entity-aware reasoning**

All grounded in how businesses think.

**This is not just a more effective AI — it is a more intelligent one.**
        `
    },
    {
        id: 3,
        slug: 'gikagraph-ai-intelligence-layer',
        title: 'AI that Truly Understands your Business',
        excerpt: 'GiKA blends your internal data with global knowledge, understands complex relationships between business entities, and reasons across multiple layers to deliver insights that drive smarter, strategic decisions.',
        category: 'Platform Insights',
        categorySlug: 'platform-insights',
        author: {
            name: 'GiKA AI Team',
            avatar: '/GikaAI.png',
            role: 'GiKA AI',
            bio: 'The GiKA AI team is building the next generation of reasoning-first AI for enterprise decision-making, transforming how businesses think through structured knowledge graphs and entity-aware reasoning.'
        },
        publishedAt: '2025-12-04',
        readTime: 5,
        coverImage: '/blog/blog.png',
        featured: false,
        content: `
## What is GiKaGraph?

GiKA blends your internal data with global knowledge, understands complex relationships between business entities, and reasons across multiple layers to deliver insights that drive smarter, strategic decisions.

## 1. Entity-Aware Reasoning Engine

At the heart is a **graph-based language model** that deeply understands business-specific entities and their interrelationships.

Not a generic chatbot — this is a **reasoning engine grounded in your unique operational and decision-making context**.

## 2. Business-Tuned Graph + Language Models

GiKaGraph creates a **customized knowledge graph** for each business, automatically mapping different entities.

Layered on top of this is a **small language model tailored to that graph**, enabling precise and context-rich responses.

## 3. Blended Knowledge: Internal + World Context

Strategic insights often require more than internal data. GiKaGraph blends enterprise data with world knowledge:

- **Market trends**
- **Regulations**
- **Benchmarks**
- **Macroeconomic factors**

This delivers truly comprehensive insights.

**Example:** "Why are sales down in Q1?" → Response considers product issues and market slowdowns, competitor moves, or changing consumer behavior.

## 4. Natural Language to Strategic Analysis

Converts vague or broad business questions into **multi-step analytical reasoning**.

**Think:** "Where are we losing margin?"

**Returns:** A traceable, data-backed breakdown by region, supplier cost trends, and pricing shifts — with citations and next steps.

## 5. Composable Intelligence Layer

Integrates with your existing stack:

- **Snowflake**
- **dbt**
- **BigQuery**
- **Salesforce**
- And more...

Acts as a **semantic and reasoning layer** — unifying fragmented data sources into one intelligent conversation layer.

## Why GiKaGraph is Different

GiKaGraph isn't vertical SaaS or a dashboard replacement — it's an **AI-native intelligence layer** that adapts to your business, not the other way around.

Our architecture allows us to train business-specific models quickly, giving companies **strategic foresight, not just rear-view metrics**.
        `
    },
//     {
//         id: 4,
//         slug: 'gika-knowledge-graph-ai-financial-services',
//         title: 'GIKA: Your Cognitive twin for financial services',
//         excerpt: 'GiKA combines domain-tuned small language models with a dynamic knowledge graph to unify scattered data and generate insights across PE, asset management, wealth management, equity research, and credit risk.',
//         category: 'Use Cases',
//         categorySlug: 'use-cases',
//         author: {
//             name: 'GiKA AI Team',
//             avatar: '/GikaAI.png',
//             role: 'GiKA AI',
//             bio: 'The GiKA AI team is building the next generation of reasoning-first AI for enterprise decision-making, transforming how businesses think through structured knowledge graphs and entity-aware reasoning.'
//         },
//         publishedAt: '2025-12-04',
//         readTime: 15,
//         coverImage: '/blog/blog.png',
//         featured: false,
//         content: `
// ## Overview

// GiKA's platform combines domain-tuned small language models (SLMs) with a dynamic knowledge graph to unify scattered data and generate insights. In finance use cases (private equity, asset/investment management, wealth management, equity research, credit risk), this approach addresses fragmented information and manual processes by linking internal records (CRM, portfolio systems, documents) with external sources (market data, news, filings) into one "entity graph".

// In practice, GiKA promises to **transform fragmented data into grounded, actionable insights** using its specialized AI and graph architecture.

// ## Segment Challenges & Solutions

// ### Private Equity

// PE firms juggle deals and portfolio data in siloed systems, spreadsheets and Virtual Data Rooms. GiKA graph links deals, companies, investors, financials, documents, competitors, market and news to support faster due diligence, synergy analysis and value tracking.

// Our dynamic knowledge graph connects companies, markets, investors, metrics, communication data, financial data and deal structures to continuously compound institutional knowledge and surface real-time risks/opportunities.

// **Key solutions:**
// - Data unification (linking CRM, fund/accounting systems, business data, market intelligence, competitor data, VDRs, internal communication, govt filing)
// - Decision support (automated diligence, KPIs monitoring, compliance readiness)
// - Agent assistants to draft investment memos and bring deeper insights

// ### Investment/Asset Management

// Asset managers need unified views of portfolio, mandates, benchmarks and research. Our platform fuses portfolio holdings, research reports, market data and client mandates.

// **Key problems solved:**
// - Aggregation of internal analyst notes with premium sources
// - Risk analysis and portfolio rebalancing
// - Answering complex questions like "What tail risks does this portfolio have, given the recent news on oil prices?"

// ### Wealth Management

// Advisors struggle to personalize advice due to scattered client data (CRM, accounts, communications). GiKA consolidates each client's profile, holdings, advisor notes and external market signals.

// **With GiKA, wealth teams can:**
// - Rapidly generate tailored portfolio strategies
// - Run compliance checks by querying the unified graph
// - Identify high-value prospects and concentrated risk factors

// ### Equity Research

// Analysts mine documents (filings, transcripts, news) manually. By linking company fundamentals, expert calls and news in a graph, our system accelerates report writing and insight discovery.

// GiKA's SLMs are fine-tuned on financial language to extract key facts, while the KG provides causal links (e.g. connecting a CEO change in the news to a firm's credit rating).

// ### Credit Risk

// Banks and lenders have siloed borrower data (loan books, credit reports), lagging risk signals, customer profile data. A knowledge graph links counterparties, subsidiaries, financials and external events to reveal hidden exposure.

// GiKA's platform uses graph analytics to uncover hidden risks, alerting on contagion risks or fraud by traversing multi-hop relationships in real time.

// ## Integration & Entry Points

// Onboarding starts by connecting GiKA to key data systems:

// **Internal systems:**
// - CRM (Salesforce, Dynamics)
// - Portfolio/fund administration tools
// - ERP/financial systems, data warehouses
// - Spreadsheets and internal document repositories (SharePoint, email, Slack)

// **External data feeds:**
// - Market/financial data (Bloomberg, Refinitiv, Capital IQ, FactSet)
// - News APIs, regulatory filings (SEC Edgar, global registries)
// - Industry research (Gartner, Preqin, PitchBook)

// **Unstructured content:**
// - Company reports, investment memos, analyst presentations
// - Call transcripts (PDFs, Word docs)

// **Domain sources:**
// - Economic indicators, sanctions lists, legal registries, ESG databases

// ## Product Offerings

// ### Unified Knowledge Graph
// A persistent, schema-flexible graph that links all enterprise data with public domain knowledge. It continuously enriches entities (companies, deals, people, products) via NER and relationship extraction.

// ### Domain-Specialized AI Agents
// AI assistants fine-tuned on business data and financial context. They answer complex queries and generate outputs like investment memos, regulatory reports or meeting summaries.

// ### Advanced Search & Q&A
// A conversational interface for natural-language questions about any linked data. Responses are precise, traceable, and hallucination-free.

// ### Analytics & Dashboards
// Pre-built financial dashboards (performance tracking, forecasting, cash flow models) and ad-hoc analytics with real-time KPI monitoring.

// ### Market & Competitive Insights
// Alerts and reports on market shifts, industry news, regulatory changes and peer moves with proactive intelligence.

// ### Secure, Scalable Deployment
// Enterprise-grade data governance (access controls, audit trails) with private cloud or on-prem options.

// ## Competitors & Market Landscape

// ### Brownloop (Kairos AI)
// A PE-focused intelligence platform. Kairos integrates CRMs, VDRs, fund accounting and external data.

// **How GiKA differs:** Brownloop is a workflow-focused AI assistant. GiKA is a reasoning-first AI agent that understands context, interprets complex data, and drives decisions.

// ### Wipro WealthAI
// A cloud "advise-the-advisor" platform for wealth management.

// **How GiKA differs:** WealthAI provides insights and recommendations. GiKA acts like the analyst itself — understanding context and driving decisions.

// ### KiteEdge (Apex)
// An AI-driven analytics platform for wealth/investment research using RAG-based AI.

// **How GiKA differs:** KiteEdge focuses on aggregating insights. GiKA draws conclusions and makes actionable decisions.

// ### Stardog (Voicebox)
// Provides "100% hallucination-free" answers by leveraging knowledge graphs.

// **How GiKA differs:** Stardog is "Ask your data". GiKA is "Think with your data and decide".

// ### Quantexa
// A platform for risk and customer analytics, exposing hidden fraud and credit risk.

// **How GiKA differs:** Quantexa powers risk detection. GiKA goes beyond relationships to reasoning — understanding context, intent, and decisions.

// ### AlphaSense
// AI-powered financial research platform aggregating broker research, transcripts, filings, news.

// **How GiKA differs:** AlphaSense is search and retrieval. GiKA is reasoning and decision — helping analysts think and arrive at actual decisions.

// ### Palantir (Foundry)
// Enterprise data integration platform enabling deeper analytics and "What-if" modeling.

// **How GiKA differs:** Foundry is a powerful operating system for analysts. GiKA goes one layer above, acting as the analyst itself.

// ## Why GiKA is Different

// These companies have a combination of core capabilities:
// - Aggregate/Integrate data
// - Surface level insights, KPI dashboards, retrieval
// - Automating analyst tasks

// **But the harder part is still left to human analysts:** interpreting context → reasoning → making the decision.

// **GiKA is fundamentally different** because it performs the interpretation and reasoning itself, turning raw data into a decision, not just insights.

// GiKA is a true AI analyst that takes the natural next step to be a cognitive partner — becoming the truly intelligent AI decision engine.

// **It is your Cognitive Twin!**
//         `
//     },

]

// Helper function to get a blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find(post => post.slug === slug)
}

// Helper function to get all slugs (useful for static generation)
export function getAllBlogSlugs(): string[] {
    return blogPosts.map(post => post.slug)
}

export const categories = [
    { name: 'All Posts', slug: 'all' },
    { name: 'AI & Technology', slug: 'ai-technology' },
    { name: 'Platform Insights', slug: 'platform-insights' },
    { name: 'Use Cases', slug: 'use-cases' }
]
