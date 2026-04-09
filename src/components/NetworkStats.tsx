import { motion } from "framer-motion";
import { TrendingUp, Zap, Shield, Cpu } from "lucide-react";

const stats = [
  { icon: TrendingUp, label: "Gas Price", value: "32 Gwei", change: "+5.2%" },
  { icon: Zap, label: "TPS", value: "1,247", change: "+12.8%" },
  { icon: Shield, label: "Finality", value: "12.4s", change: "-0.3s" },
  { icon: Cpu, label: "CPU Usage", value: "42%", change: "-2.1%" },
];

export function NetworkStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="rounded-lg border border-border bg-card p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <stat.icon className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
          </div>
          <p className="text-2xl font-mono font-bold text-foreground text-glow">{stat.value}</p>
          <p className="text-xs font-mono text-primary mt-1">{stat.change}</p>
        </motion.div>
      ))}
    </div>
  );
}
