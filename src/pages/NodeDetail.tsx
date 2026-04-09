import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Activity, Box, Users, Clock, HardDrive, Cpu, MemoryStick, Globe, Terminal, AlertTriangle, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { getNodeById } from "@/data/nodes";
import logo from "@/assets/logo.png";
import { StatusIndicator } from "@/components/StatusIndicator";

const latencyData = Array.from({ length: 60 }, (_, i) => ({
  time: `${i}m`,
  latency: Math.floor(Math.random() * 80 + 20),
}));

const peerData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  peers: Math.floor(Math.random() * 20 + 25),
}));

const cpuMemData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  cpu: Math.floor(Math.random() * 30 + 25),
  memory: Math.floor(Math.random() * 15 + 40),
}));

const blockTimeData = Array.from({ length: 30 }, (_, i) => ({
  block: `#${19284720 + i}`,
  time: +(Math.random() * 4 + 10).toFixed(1),
}));

const logs = [
  { time: "14:32:18", level: "info", message: "Imported new chain segment blocks=1 txs=182 mgas=14.2 elapsed=128ms" },
  { time: "14:32:06", level: "info", message: "Chain head was updated number=19284751 hash=0xa3f2...8e1c" },
  { time: "14:31:54", level: "info", message: "New peer connected id=enode://4a2b...@185.22.14.7:30303 peers=47" },
  { time: "14:31:42", level: "warn", message: "Snapshot extension registration failed peer=0x7e8f...5c4d" },
  { time: "14:31:30", level: "info", message: "Imported new chain segment blocks=1 txs=156 mgas=12.8 elapsed=115ms" },
  { time: "14:31:18", level: "info", message: "Block synchronisation started head=19284750 target=19284751" },
  { time: "14:31:06", level: "info", message: "Looking for peers peercount=46 tried=12 static=4" },
  { time: "14:30:54", level: "error", message: "Failed to retrieve state trie node err='not found'" },
  { time: "14:30:42", level: "info", message: "Imported new chain segment blocks=2 txs=334 mgas=26.1 elapsed=241ms" },
  { time: "14:30:30", level: "info", message: "Deep froze chain segment blocks=1 elapsed=12ms number=19284698" },
  { time: "14:30:18", level: "warn", message: "Peer connection timeout peer=0x2b3c...8e7f duration=30s" },
  { time: "14:30:06", level: "info", message: "Regenerated local transaction journal transactions=4" },
];

const levelIcon = {
  info: <CheckCircle className="h-3 w-3 text-success" />,
  warn: <AlertTriangle className="h-3 w-3 text-warning" />,
  error: <XCircle className="h-3 w-3 text-destructive" />,
};

const chartTooltipStyle = {
  backgroundColor: "hsl(220, 18%, 10%)",
  border: "1px solid hsl(220, 15%, 18%)",
  borderRadius: "8px",
  fontSize: 11,
  fontFamily: "JetBrains Mono",
};

export default function NodeDetail() {
  const { id } = useParams<{ id: string }>();
  const node = getNodeById(id || "");

  if (!node) {
    return (
      <div className="min-h-screen grid-bg scanline flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground font-mono">Node not found</p>
          <Link to="/" className="text-primary text-sm mt-2 inline-block hover:underline">← Back to dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid-bg scanline">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <img src={logo} alt="NodeWatch" className="h-8 w-8 rounded-md object-cover" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-foreground text-glow">NodeWatch</h1>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Web3 Node Monitor</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Back + Title */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            Dashboard
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{node.name}</h2>
            <p className="text-sm font-mono text-muted-foreground">{node.chain}</p>
          </div>
          <StatusIndicator status={node.status} />
        </motion.div>

        {/* Key Metrics */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <MetricCard icon={Box} label="Block Height" value={node.blockHeight.toLocaleString()} />
          <MetricCard icon={Users} label="Peers" value={node.peers.toString()} />
          <MetricCard icon={Clock} label="Uptime" value={node.uptime} />
          <MetricCard icon={Activity} label="Latency" value={`${node.latency}ms`} highlight={node.latency > 200} />
          <MetricCard icon={Cpu} label="CPU" value={node.cpuUsage} highlight={parseInt(node.cpuUsage) > 80} />
          <MetricCard icon={MemoryStick} label="Memory" value={node.memoryUsage.split(" / ")[0]} />
        </motion.div>

        {/* System Info */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-semibold mb-3">System Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 text-xs font-mono">
            <InfoRow label="Endpoint" value={node.endpoint} />
            <InfoRow label="Version" value={node.version} />
            <InfoRow label="Network" value={node.network} />
            <InfoRow label="Disk Usage" value={node.diskUsage} />
            <InfoRow label="Memory" value={node.memoryUsage} />
            <InfoRow label="CPU" value={node.cpuUsage} />
          </div>
          {node.syncProgress !== undefined && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Loader2 className="h-3 w-3 animate-spin text-warning" />
                  Sync Progress
                </span>
                <span className="text-warning">{node.syncProgress}%</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${node.syncProgress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full bg-warning"
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Latency (60m)" delay={0.2}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={latencyData}>
                <defs>
                  <linearGradient id="latGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(185, 100%, 45%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(185, 100%, 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
                <XAxis dataKey="time" tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 9 }} tickLine={false} axisLine={false} interval={9} />
                <YAxis tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 9 }} tickLine={false} axisLine={false} unit="ms" />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Area type="monotone" dataKey="latency" stroke="hsl(185, 100%, 45%)" fill="url(#latGrad)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Peer Count (24h)" delay={0.25}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={peerData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
                <XAxis dataKey="time" tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 9 }} tickLine={false} axisLine={false} interval={3} />
                <YAxis tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 9 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Line type="monotone" dataKey="peers" stroke="hsl(160, 100%, 45%)" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="CPU & Memory (24h)" delay={0.3}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cpuMemData}>
                <defs>
                  <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(45, 100%, 50%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(45, 100%, 50%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(160, 100%, 45%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(160, 100%, 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
                <XAxis dataKey="time" tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 9 }} tickLine={false} axisLine={false} interval={3} />
                <YAxis tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 9 }} tickLine={false} axisLine={false} unit="%" />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Area type="monotone" dataKey="cpu" stroke="hsl(45, 100%, 50%)" fill="url(#cpuGrad)" strokeWidth={1.5} name="CPU" />
                <Area type="monotone" dataKey="memory" stroke="hsl(160, 100%, 45%)" fill="url(#memGrad)" strokeWidth={1.5} name="Memory" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Block Time (last 30 blocks)" delay={0.35}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={blockTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
                <XAxis dataKey="block" tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 8 }} tickLine={false} axisLine={false} interval={4} />
                <YAxis tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 9 }} tickLine={false} axisLine={false} unit="s" />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="time" fill="hsl(160, 100%, 45%)" radius={[2, 2, 0, 0]} opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Logs */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold">Node Logs</h3>
          </div>
          <div className="max-h-[360px] overflow-y-auto">
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.03 }}
                className="px-4 py-2 border-b border-border/50 font-mono text-[11px] flex items-start gap-3 hover:bg-secondary/30 transition-colors"
              >
                <span className="text-muted-foreground shrink-0 w-16">{log.time}</span>
                <span className="shrink-0 mt-0.5">{levelIcon[log.level as keyof typeof levelIcon]}</span>
                <span className={
                  log.level === "error" ? "text-destructive" :
                  log.level === "warn" ? "text-warning" :
                  "text-card-foreground"
                }>
                  {log.message}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, highlight }: { icon: any; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      </div>
      <p className={`text-lg font-mono font-bold ${highlight ? "text-warning" : "text-foreground text-glow"}`}>{value}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2 py-1">
      <span className="text-muted-foreground shrink-0">{label}:</span>
      <span className="text-card-foreground truncate">{value}</span>
    </div>
  );
}

function ChartCard({ title, delay, children }: { title: string; delay: number; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }} className="rounded-lg border border-border bg-card p-4">
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      <div className="h-[180px]">{children}</div>
    </motion.div>
  );
}
