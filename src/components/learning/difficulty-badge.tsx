import { cn } from "@/lib/utils";
import type { Difficulty } from "@/types/academic";

type DifficultyBadgeProps = {
  difficulty?: Difficulty;
};

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  if (!difficulty) {
    return null;
  }

  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-md border px-2.5 text-xs font-medium capitalize",
        difficulty === "easy" && "border-accent/35 bg-accent/12 text-accent",
        difficulty === "medium" && "border-primary/35 bg-primary/12 text-primary",
        difficulty === "hard" && "border-destructive/35 bg-destructive/12 text-destructive",
      )}
    >
      {difficulty}
    </span>
  );
}
