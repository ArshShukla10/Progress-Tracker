import { cn } from "@/lib/utils";
import type { SemesterStatus } from "@/types/academic";

type ProgressBadgeProps = {
  label: string;
  status?: SemesterStatus;
};

export function ProgressBadge({ label, status }: ProgressBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-md border px-2.5 text-xs font-medium",
        status === "current" && "border-primary/35 bg-primary/12 text-primary",
        status === "completed" && "border-accent/35 bg-accent/12 text-accent",
        status === "locked" && "border-border bg-secondary/60 text-muted-foreground",
        !status && "border-border bg-secondary/60 text-muted-foreground",
      )}
    >
      {label}
    </span>
  );
}
