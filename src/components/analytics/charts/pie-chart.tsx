import type { AnalyticsProgressItem } from "@/types/analytics";

type PieChartProps = {
  items: AnalyticsProgressItem[];
};

const colors = [
  "bg-primary",
  "bg-emerald-400",
  "bg-sky-400",
  "bg-amber-300",
  "bg-rose-400",
  "bg-violet-400",
];

export function PieChart({ items }: PieChartProps) {
  const total = items.reduce((sum, item) => sum + item.completed, 0);
  let currentOffset = 0;
  const gradient =
    total > 0
      ? items
          .map((item, index) => {
            const start = currentOffset;
            const slice = (item.completed / total) * 100;
            currentOffset += slice;

            return `hsl(var(--primary) / ${Math.max(0.35, 1 - index * 0.1)}) ${start}% ${currentOffset}%`;
          })
          .join(", ")
      : "hsl(var(--secondary)) 0% 100%";

  return (
    <div className="flex flex-col gap-5 rounded-md border border-border/70 bg-background/32 p-4 sm:flex-row sm:items-center">
      <div
        className="size-40 shrink-0 rounded-full border border-border"
        style={{ background: `conic-gradient(${gradient})` }}
      />
      <div className="grid flex-1 gap-2">
        {items.slice(0, 6).map((item, index) => (
          <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex min-w-0 items-center gap-2 text-muted-foreground">
              <span className={`size-2 rounded-full ${colors[index % colors.length]}`} />
              <span className="truncate">{item.label}</span>
            </span>
            <span className="font-medium text-foreground">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
