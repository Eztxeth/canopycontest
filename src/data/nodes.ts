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
  { id: "eth-mainnet-1", name: "ETH Mainnet #1", chain: "Ethereum • Geth v1.13.14", status: "online", blockHeight: 19284751, peers: 47, uptime: "99.97%", latency: 42, endpoint: "https://eth-node-1.example.com:8545", diskUsage: "1.2 TB / 2 TB", memoryUsage: "14.2 GB / 32 GB", cpuUsage: "38%", version: "Geth/v1.13.14-stable/linux-amd64/go1.21.6", network: "mainnet" },
  { id: "eth-mainnet-2", name: "ETH Mainnet #2", chain: "Ethereum • Erigon v2.59", status: "syncing", blockHeight: 19284200, peers: 31, uptime: "98.12%", latency: 156, endpoint: "https://eth-node-2.example.com:8545", diskUsage: "890 GB / 2 TB", memoryUsage: "24.8 GB / 64 GB", cpuUsage: "72%", version: "erigon/2.59.0/linux-amd64/go1.21.5", network: "mainnet", syncProgress: 97.2 },
  { id: "polygon-node", name: "Polygon Node", chain: "Polygon • Bor v1.2.7", status: "online", blockHeight: 54892103, peers: 52, uptime: "99.85%", latency: 38, endpoint: "https://polygon-node.example.com:8545", diskUsage: "2.8 TB / 4 TB", memoryUsage: "12.1 GB / 32 GB", cpuUsage: "29%", version: "bor/v1.2.7-stable/linux-amd64", network: "mainnet" },
  { id: "arbitrum-node", name: "Arbitrum Node", chain: "Arbitrum • Nitro v3.0.1", status: "warning", blockHeight: 187294012, peers: 18, uptime: "97.34%", latency: 245, endpoint: "https://arb-node.example.com:8547", diskUsage: "1.6 TB / 2 TB", memoryUsage: "28.4 GB / 32 GB", cpuUsage: "89%", version: "nitro/v3.0.1/linux-amd64", network: "arbitrum-one" },
  { id: "bsc-validator", name: "BSC Validator", chain: "BNB Chain • Geth v1.3.10", status: "online", blockHeight: 37128456, peers: 39, uptime: "99.91%", latency: 55, endpoint: "https://bsc-node.example.com:8545", diskUsage: "3.1 TB / 4 TB", memoryUsage: "15.7 GB / 32 GB", cpuUsage: "44%", version: "geth/v1.3.10-stable/linux-amd64", network: "bsc-mainnet" },
  { id: "optimism-node", name: "Optimism Node", chain: "Optimism • Op-Geth v1.101", status: "offline", blockHeight: 118234567, peers: 0, uptime: "0%", latency: 0, endpoint: "https://op-node.example.com:8545", diskUsage: "780 GB / 2 TB", memoryUsage: "0 GB / 32 GB", cpuUsage: "0%", version: "op-geth/v1.101.0/linux-amd64", network: "optimism-mainnet" },
];

export function getNodeById(id: string): NodeData | undefined {
  return nodes.find((n) => n.id === id);
}
