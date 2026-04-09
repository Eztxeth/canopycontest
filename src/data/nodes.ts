export type NodeStatus = "online" | "syncing" | "offline" | "warning";

export interface NodeData {
  id: string;
  name: string;
  chain: string;
  status: NodeStatus;
  blockHeight: number;
  peers: number;
  uptime: string;
  latency: number;
  endpoint: string;
  diskUsage: string;
  memoryUsage: string;
  cpuUsage: string;
  version: string;
  network: string;
  syncProgress?: number;
}

export const nodes: NodeData[] = [
  { id: "canopy-validator-1", name: "Canopy Validator #1", chain: "Canopy • v1.0.0", status: "online", blockHeight: 1284751, peers: 47, uptime: "99.97%", latency: 42, endpoint: "https://validator-1.canopynetwork.org:8545", diskUsage: "120 GB / 500 GB", memoryUsage: "14.2 GB / 32 GB", cpuUsage: "38%", version: "canopy/v1.0.0-stable/linux-amd64/go1.21.6", network: "betanet" },
  { id: "canopy-validator-2", name: "Canopy Validator #2", chain: "Canopy • v1.0.0", status: "syncing", blockHeight: 1284200, peers: 31, uptime: "98.12%", latency: 156, endpoint: "https://validator-2.canopynetwork.org:8545", diskUsage: "89 GB / 500 GB", memoryUsage: "24.8 GB / 64 GB", cpuUsage: "72%", version: "canopy/v1.0.0-stable/linux-amd64/go1.21.5", network: "betanet", syncProgress: 97.2 },
  { id: "canopy-full-1", name: "Canopy Full Node", chain: "Canopy • v1.0.0", status: "online", blockHeight: 1284751, peers: 52, uptime: "99.85%", latency: 38, endpoint: "https://full-1.canopynetwork.org:8545", diskUsage: "280 GB / 1 TB", memoryUsage: "12.1 GB / 32 GB", cpuUsage: "29%", version: "canopy/v1.0.0-stable/linux-amd64", network: "betanet" },
  { id: "canopy-seed-1", name: "Canopy Seed Node", chain: "Canopy • v1.0.0", status: "warning", blockHeight: 1284012, peers: 18, uptime: "97.34%", latency: 245, endpoint: "https://seed-1.canopynetwork.org:8547", diskUsage: "160 GB / 500 GB", memoryUsage: "28.4 GB / 32 GB", cpuUsage: "89%", version: "canopy/v1.0.0-stable/linux-amd64", network: "betanet" },
  { id: "canopy-validator-3", name: "Canopy Validator #3", chain: "Canopy • v1.0.0", status: "online", blockHeight: 1284751, peers: 39, uptime: "99.91%", latency: 55, endpoint: "https://validator-3.canopynetwork.org:8545", diskUsage: "130 GB / 500 GB", memoryUsage: "15.7 GB / 32 GB", cpuUsage: "44%", version: "canopy/v1.0.0-stable/linux-amd64", network: "betanet" },
  { id: "canopy-archive-1", name: "Canopy Archive Node", chain: "Canopy • v1.0.0", status: "offline", blockHeight: 1234567, peers: 0, uptime: "0%", latency: 0, endpoint: "https://archive-1.canopynetwork.org:8545", diskUsage: "780 GB / 2 TB", memoryUsage: "0 GB / 32 GB", cpuUsage: "0%", version: "canopy/v1.0.0-stable/linux-amd64", network: "betanet" },
];

export function getNodeById(id: string): NodeData | undefined {
  return nodes.find((n) => n.id === id);
}
