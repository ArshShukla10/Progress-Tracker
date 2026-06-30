"use client";

import { cn } from "@/lib/utils";
import type { LearningMode } from "@/types/learning";

const modeLabels: Record<LearningMode, string> = {
  notes: "Notes",
  pyqs: "PYQs",
  revision: "Revision",
  flashcards: "Flashcards",
  interview: "Interview",
};

export function LearningModeTabs({
  modes,
  activeMode,
  onModeChange,
}: {
  modes: LearningMode[];
  activeMode: LearningMode;
  onModeChange: (mode: LearningMode) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {modes.map((mode) => (
        <button
          key={mode}
          type="button"
          onClick={() => onModeChange(mode)}
          className={cn(
            "h-10 rounded-md border border-border/70 px-4 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/45 hover:text-foreground",
            activeMode === mode && "border-primary/45 bg-primary/10 text-foreground",
          )}
        >
          {modeLabels[mode]}
        </button>
      ))}
    </div>
  );
}
