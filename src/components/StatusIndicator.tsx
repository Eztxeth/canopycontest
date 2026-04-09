import { cn } from "@/lib/utils";

type Status = "online" | "syncing" | "offline" | "warning";

const statusConfig: Record<Status, { color: string; label: string }> = {
  online: { color: "bg-success", label: "Online" },
  syncing: { color: "bg-warning", label: "Syncing" },
  offline: { color: "bg-destructive", label: "Offline" },
  warning: { color: "bg-warning", label: "Warning" },
};

export function StatusIndicator({ status }: { status: Status }) {
  const config = statusConfig[status];
  return (
    <div className="flex items-center gap-2">
      <span className={cn("h-2.5 w-2.5 rounded-full animate-pulse-glow", config.color)} />
      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
        {config.label}
      </span>
    </div>
  );
}
