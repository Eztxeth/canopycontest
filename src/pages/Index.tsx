import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { NodeCard } from "@/components/NodeCard";
import { NetworkStats } from "@/components/NetworkStats";
import logo from "@/assets/canopy-logo.png";
import { RecentBlocks } from "@/components/RecentBlocks";
import { SyncChart } from "@/components/SyncChart";
import { nodes } from "@/data/nodes";

export default function Index() {
  return (
    <div className="min-h-screen grid-bg scanline">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Canopy Network" className="h-8 w-8 object-contain" />
            <div>
              <h1 className="text-lg font-bold text-foreground text-glow">Canopy</h1>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Node Monitor</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-success/10 border border-success/20">
              <Activity className="h-3 w-3 text-success" />
              <span className="text-xs font-mono text-success">4/6 Nodes Online</span>
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
              <NodeCard key={node.id} {...node} />
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
