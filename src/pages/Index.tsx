import { motion } from "framer-motion";
import { Activity, Radio } from "lucide-react";
import { NodeCard } from "@/components/NodeCard";
import { NetworkStats } from "@/components/NetworkStats";
import { RecentBlocks } from "@/components/RecentBlocks";
import { SyncChart } from "@/components/SyncChart";

const nodes = [
  { name: "ETH Mainnet #1", chain: "Ethereum • Geth v1.13.14", status: "online" as const, blockHeight: 19284751, peers: 47, uptime: "99.97%", latency: 42 },
  { name: "ETH Mainnet #2", chain: "Ethereum • Erigon v2.59", status: "syncing" as const, blockHeight: 19284200, peers: 31, uptime: "98.12%", latency: 156 },
  { name: "Polygon Node", chain: "Polygon • Bor v1.2.7", status: "online" as const, blockHeight: 54892103, peers: 52, uptime: "99.85%", latency: 38 },
  { name: "Arbitrum Node", chain: "Arbitrum • Nitro v3.0.1", status: "warning" as const, blockHeight: 187294012, peers: 18, uptime: "97.34%", latency: 245 },
  { name: "BSC Validator", chain: "BNB Chain • Geth v1.3.10", status: "online" as const, blockHeight: 37128456, peers: 39, uptime: "99.91%", latency: 55 },
  { name: "Optimism Node", chain: "Optimism • Op-Geth v1.101", status: "offline" as const, blockHeight: 118234567, peers: 0, uptime: "0%", latency: 0 },
];

export default function Index() {
  return (
    <div className="min-h-screen grid-bg scanline">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-primary/20 flex items-center justify-center">
              <Radio className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground text-glow">NodeWatch</h1>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Web3 Node Monitor</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-success/10 border border-success/20">
              <Activity className="h-3 w-3 text-success" />
              <span className="text-xs font-mono text-success">4/6 Nodes Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <NetworkStats />
        </motion.div>

        {/* Nodes Grid */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Nodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {nodes.map((node) => (
              <NodeCard key={node.name} {...node} />
            ))}
          </div>
        </section>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SyncChart />
          <RecentBlocks />
        </div>
      </main>
    </div>
  );
}
