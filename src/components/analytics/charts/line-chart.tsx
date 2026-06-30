import type { AnalyticsChartPoint } from "@/types/analytics";

type LineChartProps = {
  data: AnalyticsChartPoint[];
};

export function LineChart({ data }: LineChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);
  const points = data
    .map((item, index) => {
      const x = data.length === 1 ? 0 : (index / (data.length - 1)) * 100;
      const y = 100 - (item.value / maxValue) * 88 - 6;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="rounded-md border border-border/70 bg-background/32 p-4">
      <svg viewBox="0 0 100 100" className="h-56 w-full overflow-visible">
        <polyline
          fill="none"
          points={points}
          stroke="hsl(var(--primary))"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        {data.map((item, index) => {
          const x = data.length === 1 ? 0 : (index / (data.length - 1)) * 100;
          const y = 100 - (item.value / maxValue) * 88 - 6;

          return <circle key={item.label} cx={x} cy={y} r="2.4" fill="hsl(var(--primary))" />;
        })}
      </svg>
      <div className="mt-2 grid grid-cols-6 gap-2 text-center text-[11px] text-muted-foreground">
        {data.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>
    </div>
  );
}
