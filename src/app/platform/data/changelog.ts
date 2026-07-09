import type { ChangelogEntry } from "@/components/ui/changelog-1";

export const changelogEntries: ChangelogEntry[] = [
  {
    version: "Version 1.3.0",
    date: "15 November 2024",
    title: "Enhanced Analytics Dashboard",
    description:
      "We've completely redesigned our analytics dashboard to provide deeper insights and improved visualizations of your knowledge graph.",
    items: [
      "Interactive data visualizations with real-time updates",
      "Customizable dashboard widgets",
      "Export analytics in multiple formats (CSV, PDF, Excel)",
      "New reporting templates for common use cases",
      "Improved data filtering and segmentation options",
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=60",
    button: {
      url: "https://gika.ai/platform",
      text: "Explore the dashboard",
    },
  },
  {
    version: "Version 1.2.5",
    date: "7 October 2024",
    title: "Automated RFP Responses",
    description:
      "We're excited to announce automated RFP response generation, powered by GiKA's knowledge graph and enterprise-grade access controls.",
    items: [
      "Hyper-precise RFP responses generated from your knowledge base",
      "Enterprise-grade security and access controls",
      "Reusable response templates for common questions",
      "Review and approval workflow before sending",
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=60",
    button: {
      url: "https://gika.ai/platform",
      text: "See how it works",
    },
  },
  {
    version: "Version 1.2.1",
    date: "23 September 2024",
    title: "New features and improvements",
    description:
      "Here are the latest updates and improvements to the GiKA platform. We are always working to improve your experience.",
    items: [
      "Added support for 50+ new data source connectors",
      "Improved knowledge graph query performance",
      "Fixed minor bugs and issues across the pipeline",
      "Added ability to import and export workgroup configurations",
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=60",
  },
  {
    version: "Version 1.0.0",
    date: "31 August 2024",
    title: "First version of our platform",
    description:
      "Introducing GiKA — a platform to transform your raw enterprise data into a unified knowledge graph and actionable intelligence. We are excited to launch and help you get started.",
    image:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&auto=format&fit=crop&q=60",
    button: {
      url: "https://gika.ai",
      text: "Learn more",
    },
  },
];
