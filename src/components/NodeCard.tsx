import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { StatusIndicator } from "./StatusIndicator";
import { Activity, Box, Users, Clock } from "lucide-react";

interface NodeCardProps {
  id: string;
  name: string;
  chain: string;
  status: "online" | "syncing" | "offline" | "warning";
  blockHeight: number;
  peers: number;
  uptime: string;
  latency: number;
}

export function NodeCard({ id, name, chain, status, blockHeight, peers, uptime, latency }: NodeCardProps) {
  return (
    <Link to={`/node/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-border bg-card p-5 hover:border-primary/40 transition-colors cursor-pointer hover:glow-primary"
      >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-card-foreground">{name}</h3>
          <p className="text-xs font-mono text-muted-foreground mt-0.5">{chain}</p>
        </div>
        <StatusIndicator status={status} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Stat icon={Box} label="Block Height" value={blockHeight.toLocaleString()} />
        <Stat icon={Users} label="Peers" value={peers.toString()} />
        <Stat icon={Clock} label="Uptime" value={uptime} />
        <Stat icon={Activity} label="Latency" value={`${latency}ms`} highlight={latency > 200} />
      </div>
      </motion.div>
    </Link>
}

function Stat({ icon: Icon, label, value, highlight }: { icon: any; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <div>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className={`text-sm font-mono font-semibold ${highlight ? "text-warning" : "text-foreground"}`}>
          {value}
        </p>
      </div>
    </div>
  );
}
