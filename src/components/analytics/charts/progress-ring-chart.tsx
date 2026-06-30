type ProgressRingChartProps = {
  label: string;
  value: number;
};

export function ProgressRingChart({ label, value }: ProgressRingChartProps) {
  const boundedValue = Math.min(Math.max(value, 0), 100);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (boundedValue / 100) * circumference;

  return (
    <div className="flex items-center gap-4 rounded-md border border-border/70 bg-background/32 p-4">
      <svg viewBox="0 0 100 100" className="size-24 -rotate-90">
        <circle
          cx="50"
          cy="50"
          fill="none"
          r={radius}
          stroke="hsl(var(--secondary))"
          strokeWidth="10"
        />
        <circle
          cx="50"
          cy="50"
          fill="none"
          r={radius}
          stroke="hsl(var(--primary))"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          strokeWidth="10"
        />
      </svg>
      <div>
        <p className="text-3xl font-semibold text-foreground">{boundedValue}%</p>
        <p className="mt-1 text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
