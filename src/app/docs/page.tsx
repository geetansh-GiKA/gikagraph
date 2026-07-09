"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { blogPosts } from "./data/blogData";

export default function DocsPage() {
  const router = useRouter();

  useEffect(() => {
    if (blogPosts[0]) {
      router.replace(`/docs/${blogPosts[0].slug}`);
    }
  }, [router]);

  return null;
}
