import {
  Search,
  Eye,
  LayoutGrid,
  FileText,
  Users,
  MessageSquare,
  Paperclip,
  Send,
  ThumbsUp,
  ThumbsDown,
  Copy,
} from "lucide-react";
import { cn } from "@/lib/utils";

const chats = [
  "Deep Research",
  "Dashboard Generator",
  "Web Search",
  "Knowledge Base Chat",
  "Document Analysis",
];

const docs = [
  "DOC-CC-139.pdf",
  "DOC-PCERT-006.pdf",
  "DOC-CC-148.pdf",
  "DOC-BOND-00117.pdf",
  "DOC-CC-052.pdf",
  "DOC-CCC-030.pdf",
  "BOQ_and_Measurements_Contract_75.xlsx",
  "DOC-REF-008.pdf",
];

export function ChatScreen() {
  return (
    <div className="flex h-full w-full bg-[#0a0a0a] text-white">
      {/* Sidebar */}
      <div className="flex w-48 shrink-0 flex-col gap-5 border-r border-neutral-800 p-5">
        <div className="flex flex-col gap-1">
          <span className="px-2 text-xs font-semibold uppercase tracking-wide text-neutral-600">
            Top Actions
          </span>
          <div className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-neutral-400">
            <Search className="size-4" />
            Search
          </div>
          <div className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-neutral-400">
            <Eye className="size-4" />
            Overview
          </div>
          <div className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-neutral-400">
            <LayoutGrid className="size-4" />
            Dashboard
          </div>
          <div className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-neutral-400">
            <FileText className="size-4" />
            Knowledge Base
          </div>
          <div className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-neutral-400">
            <Users className="size-4" />
            Members
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="px-2 text-xs font-semibold uppercase tracking-wide text-neutral-600">
            Chats
          </span>
          {chats.map((c) => (
            <div
              key={c}
              className={cn(
                "flex items-center gap-2.5 truncate rounded-lg px-2 py-2 text-sm",
                c === "Knowledge Base Chat"
                  ? "bg-neutral-800/80 text-[#ff6b45]"
                  : "text-neutral-400",
              )}
            >
              <MessageSquare className="size-4 shrink-0" />
              <span className="truncate">{c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4 text-sm text-neutral-400">
          <span>Knowledge Base Analysis</span>
          <span className="rounded-md border border-neutral-700 px-3 py-1 text-neutral-300">
            Share
          </span>
        </div>

        <div className="flex-1 overflow-hidden px-6 py-5">
          <div className="flex justify-end">
            <div className="max-w-[70%] rounded-2xl rounded-tr-sm bg-neutral-800 px-4 py-2.5 text-sm text-neutral-100">
              List all documents in the Infrastructure knowledge base
            </div>
          </div>

          <div className="mt-4 text-[13px] leading-[1.8] text-neutral-400">
            <p className="text-neutral-300">
              Here are the documents currently indexed in the Infrastructure
              KB:
            </p>
            {docs.map((d, i) => (
              <div key={d} className="truncate">
                {i + 1}. {d}{" "}
                <span className="text-neutral-600">
                  [doc_{i}a1b2c3-{i}d4e5]
                </span>
              </div>
            ))}
            <p className="mt-3 text-neutral-300">
              If you&apos;d like the complete document list, I can export as
              CSV, show the full list here, or search/filter by pattern.
            </p>
            <div className="mt-3 flex items-center gap-3 text-neutral-600">
              <ThumbsUp className="size-4" />
              <ThumbsDown className="size-4" />
              <Copy className="size-4" />
            </div>
          </div>
        </div>

        <div className="mx-6 mb-6 flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3.5 text-sm text-neutral-500">
          <Paperclip className="size-4 shrink-0" />
          How can I help you today?
          <Send className="ml-auto size-4 shrink-0 text-neutral-300" />
        </div>
      </div>
    </div>
  );
}
