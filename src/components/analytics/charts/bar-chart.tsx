import type { AnalyticsChartPoint } from "@/types/analytics";

type BarChartProps = {
  data: AnalyticsChartPoint[];
};

export function BarChart({ data }: BarChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="flex h-56 items-end gap-3 rounded-md border border-border/70 bg-background/32 p-4">
      {data.map((item) => (
        <div key={item.label} className="flex h-full flex-1 flex-col justify-end gap-2">
          <div className="flex flex-1 items-end">
            <div
              className="w-full rounded-t-md bg-primary/80 transition-all"
              style={{ height: `${Math.max((item.value / maxValue) * 100, item.value > 0 ? 8 : 2)}%` }}
            />
          </div>
          <div className="text-center">
            <p className="text-xs font-medium text-foreground">{item.value}</p>
            <p className="text-[11px] text-muted-foreground">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
