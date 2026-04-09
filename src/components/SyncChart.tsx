import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  blocks: Math.floor(Math.random() * 50 + 250),
  peers: Math.floor(Math.random() * 10 + 20),
}));

export function SyncChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h2 className="font-semibold text-sm mb-4">Block Sync Rate (24h)</h2>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="blockGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(160, 100%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(160, 100%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
            <XAxis dataKey="time" tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 10 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 10 }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(220, 18%, 10%)",
                border: "1px solid hsl(220, 15%, 18%)",
                borderRadius: "8px",
                fontSize: 12,
                fontFamily: "JetBrains Mono",
              }}
            />
            <Area type="monotone" dataKey="blocks" stroke="hsl(160, 100%, 45%)" fill="url(#blockGradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
