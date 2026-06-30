export function LearningLoadingState() {
  return (
    <div className="space-y-3 rounded-md border border-border/70 bg-background/32 p-4">
      <div className="h-4 w-1/3 animate-pulse rounded bg-secondary" />
      <div className="h-20 animate-pulse rounded bg-secondary/70" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-secondary" />
    </div>
  );
}
