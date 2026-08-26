import {
  Boxes,
  HelpCircle,
  Search,
  Shield,
  Users,
  Folder,
  Calendar,
  Plus,
  MoreVertical,
  LayoutGrid,
  List,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const workspaces = [
  {
    name: "GIKA'S WORKSPACE",
    members: 9,
    workgroups: 8,
    repos: 14,
    date: "Mon Mar 23 2026",
  },
  {
    name: "GEETANSH GOYAL'S...",
    members: 1,
    workgroups: 1,
    repos: 1,
    date: "Tue Aug 04 2026",
  },
  {
    name: "ADITYA BIRLA",
    members: 3,
    workgroups: 1,
    repos: 47,
    date: "Thu Aug 20 2026",
  },
  {
    name: "Benchmark Dataset",
    members: 4,
    workgroups: 2,
    repos: 17,
    date: "Fri Aug 07 2026",
  },
];

function StatRow({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-[13px] text-neutral-400">
      <Icon className="size-4 shrink-0" />
      {label}
    </div>
  );
}

export function WorkspacesScreen() {
  return (
    <div className="flex h-full w-full bg-[#0a0a0a] text-white">
      {/* Sidebar */}
      <div className="flex w-48 shrink-0 flex-col justify-between border-r border-neutral-800 py-5">
        <div>
          <div className="px-5 text-base font-bold tracking-widest text-[#ff6b45]">
            GRAFINO
          </div>
          <div className="mt-6 flex flex-col gap-1.5 px-3">
            <div className="flex items-center gap-2.5 rounded-lg bg-neutral-800/80 px-2 py-2.5 text-sm font-medium text-[#ff6b45]">
              <Boxes className="size-4" />
              Workspaces
            </div>
            <div className="flex items-center gap-2.5 px-2 py-2.5 text-sm text-neutral-500">
              <HelpCircle className="size-4" />
              Help & Support
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-2.5 text-sm text-neutral-500">
            <Search className="size-4" />
            Search Workspaces...
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <User className="size-4" />
            Geetansh
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-1.5 text-sm">
            {["All", "Owned", "Shared"].map((t, i) => (
              <span
                key={t}
                className={cn(
                  "rounded-full px-3.5 py-1.5",
                  i === 0
                    ? "bg-neutral-100 text-neutral-900"
                    : "text-neutral-500",
                )}
              >
                {t}
              </span>
            ))}
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
          {workspaces.map((ws) => (
            <div
              key={ws.name}
              className="flex flex-col gap-2.5 rounded-xl border border-neutral-800 bg-neutral-900/40 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="truncate text-sm font-semibold">
                  {ws.name}
                </span>
                <MoreVertical className="size-4 shrink-0 text-neutral-600" />
              </div>
              <StatRow icon={Shield} label="Admin" />
              <StatRow icon={Users} label={`${ws.members} Members`} />
              <StatRow icon={Users} label={`${ws.workgroups} Workgroups`} />
              <StatRow icon={Folder} label={`${ws.repos} Repositories`} />
              <StatRow icon={Calendar} label={ws.date} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
