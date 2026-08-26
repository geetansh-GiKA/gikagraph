import {
  FileText,
  Users,
  Plug,
  Search,
  Plus,
  MoreVertical,
  HardDrive,
  CheckCircle2,
  LayoutGrid,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";

const files = [
  { name: "Manufacturing CC", docs: 44, size: "2.55 MB" },
  { name: "Manufacturing Performance", docs: 20, size: "919.08 KB" },
  { name: "Manufacturing OEM", docs: 7, size: "345.93 KB" },
  { name: "Manufacturing PPP", docs: 1, size: "47.74 KB" },
  { name: "Manufacturing ISO", docs: 4, size: "197.2 KB" },
];

export function KnowledgeBaseScreen() {
  return (
    <div className="flex h-full w-full bg-[#0a0a0a] text-white">
      {/* Sidebar */}
      <div className="flex w-48 shrink-0 flex-col border-r border-neutral-800 py-5">
        <div className="px-5 text-base font-bold tracking-widest text-[#ff6b45]">
          GRAFINO
        </div>
        <div className="mt-6 flex flex-col gap-1.5 px-3">
          <div className="flex items-center gap-2.5 rounded-lg bg-neutral-800/80 px-2 py-2.5 text-sm font-medium text-[#ff6b45]">
            <FileText className="size-4" />
            Knowledge Base
          </div>
          <div className="flex items-center gap-2.5 px-2 py-2.5 text-sm text-neutral-500">
            <Users className="size-4" />
            Workgroups
          </div>
          <div className="flex items-center gap-2.5 px-2 py-2.5 text-sm text-neutral-500">
            <Users className="size-4" />
            Members
          </div>
          <div className="flex items-center gap-2.5 px-2 py-2.5 text-sm text-neutral-500">
            <Plug className="size-4" />
            Connectors
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">
        <div className="flex items-center gap-1.5 text-sm text-neutral-500">
          <span>Workspaces</span>
          <span>›</span>
          <span className="text-[#ff6b45]">Benchmark Dataset</span>
          <span>›</span>
          <span className="text-neutral-200">Knowledge Base</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5 rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-2.5 text-sm text-neutral-500">
            <Search className="size-4" />
            Search Knowledge Bases...
          </div>
          <div className="flex items-center gap-2 text-neutral-500">
            <LayoutGrid className="size-4 text-neutral-200" />
            <List className="size-4" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="flex items-center justify-center rounded-xl border border-dashed border-neutral-700 py-8">
            <Plus className="size-6 text-[#ff6b45]" />
          </div>
          {files.map((f) => (
            <div
              key={f.name}
              className="flex flex-col gap-2 rounded-xl border border-neutral-800 bg-neutral-900/40 p-4"
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "rounded bg-[#ff6b45]/15 px-1.5 py-0.5 text-[11px] font-bold text-[#ff6b45]",
                  )}
                >
                  MA
                </span>
                <MoreVertical className="size-4 text-neutral-600" />
              </div>
              <span className="truncate text-sm font-medium">{f.name}</span>
              <div className="flex items-center gap-1.5 text-[13px] text-neutral-500">
                <FileText className="size-3.5" />
                {f.docs} Documents
              </div>
              <div className="flex items-center gap-1.5 text-[13px] text-neutral-500">
                <HardDrive className="size-3.5" />
                {f.size}
              </div>
              <div className="flex items-center gap-1.5 text-[13px] text-emerald-500">
                <CheckCircle2 className="size-3.5" />
                Completed
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
