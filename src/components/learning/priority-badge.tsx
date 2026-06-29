import { cn } from "@/lib/utils";
import type { Priority } from "@/types/academic";

const priorityLabels: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  "exam-critical": "Exam Critical",
};

type PriorityBadgeProps = {
  priority?: Priority;
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  if (!priority) {
    return null;
  }

  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-md border px-2.5 text-xs font-medium",
        priority === "low" && "border-border bg-secondary/50 text-muted-foreground",
        priority === "medium" && "border-primary/35 bg-primary/12 text-primary",
        priority === "high" && "border-destructive/35 bg-destructive/12 text-destructive",
        priority === "exam-critical" && "border-destructive/60 bg-destructive/18 text-destructive",
      )}
    >
      {priorityLabels[priority]}
    </span>
  );
}
