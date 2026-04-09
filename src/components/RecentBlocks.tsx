import { motion } from "framer-motion";
import { Box } from "lucide-react";

const blocks = [
  { number: 1284751, txCount: 182, gasUsed: "14.2M", time: "2s ago", validator: "cnpy1a2b...9f3e" },
  { number: 1284750, txCount: 156, gasUsed: "12.8M", time: "14s ago", validator: "cnpy4c5d...2a1b" },
  { number: 1284749, txCount: 201, gasUsed: "15.1M", time: "26s ago", validator: "cnpy7e8f...5c4d" },
  { number: 1284748, txCount: 143, gasUsed: "11.9M", time: "38s ago", validator: "cnpy2b3c...8e7f" },
  { number: 1284747, txCount: 178, gasUsed: "13.5M", time: "50s ago", validator: "cnpy6d7e...1a2b" },
  { number: 1284746, txCount: 165, gasUsed: "12.4M", time: "1m ago", validator: "cnpy9f0a...4c5d" },
];

export function RecentBlocks() {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="p-4 border-b border-border flex items-center gap-2">
        <Box className="h-4 w-4 text-primary" />
        <h2 className="font-semibold text-sm">Recent Blocks</h2>
      </div>
      <div className="divide-y divide-border">
        {blocks.map((block, i) => (
          <motion.div
            key={block.number}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="px-4 py-3 flex items-center justify-between text-xs font-mono hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-primary font-semibold">#{block.number.toLocaleString()}</span>
              <span className="text-muted-foreground">{block.txCount} txns</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">{block.gasUsed}</span>
              <span className="text-accent">{block.validator}</span>
              <span className="text-muted-foreground w-14 text-right">{block.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
