import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Insights | GIKA.AI",
  description:
    "Discover the latest insights on AI, entity intelligence, and how data is transforming data into actionable decisions.",
  openGraph: {
    title: "Blog & Insights | GIKA.AI",
    description:
      "Discover the latest insights on AI, entity intelligence, and how data is transforming data into actionable decisions.",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
