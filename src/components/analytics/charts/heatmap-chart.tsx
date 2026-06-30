import type { AnalyticsChartPoint } from "@/types/analytics";

type HeatmapChartProps = {
  data: AnalyticsChartPoint[];
};

export function HeatmapChart({ data }: HeatmapChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="grid grid-cols-7 gap-2 rounded-md border border-border/70 bg-background/32 p-4">
      {data.map((item) => {
        const intensity = item.value / maxValue;

        return (
          <div key={item.label} className="space-y-2 text-center">
            <div
              className="aspect-square rounded-md border border-border"
              style={{ backgroundColor: `hsl(var(--primary) / ${0.12 + intensity * 0.7})` }}
            />
            <p className="text-[11px] text-muted-foreground">{item.label}</p>
          </div>
        );
      })}
    </div>
  );
}
