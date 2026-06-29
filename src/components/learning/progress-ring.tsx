type ProgressRingProps = {
  value: number;
};

export function ProgressRing({ value }: ProgressRingProps) {
  return (
    <div className="flex size-24 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
      <span className="text-2xl font-semibold text-foreground">{value}%</span>
    </div>
  );
}
