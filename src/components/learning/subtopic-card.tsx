"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DifficultyBadge } from "@/components/learning/difficulty-badge";
import { PriorityBadge } from "@/components/learning/priority-badge";
import { cn } from "@/lib/utils";
import type { LearningStatus, Subtopic } from "@/types/academic";

type SubtopicCardProps = {
  subtopic: Subtopic;
  status: LearningStatus;
  onStatusChange: (status: LearningStatus) => void;
};

export function SubtopicCard({ subtopic, status, onStatusChange }: SubtopicCardProps) {
  const completed = status === "completed" || status === "revised" || status === "mastered";

  return (
    <div className="rounded-md border border-border/70 bg-secondary/24 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <label className="flex cursor-pointer items-start gap-3">
          <Checkbox
            checked={completed}
            onChange={() => onStatusChange(completed ? "not-started" : "completed")}
          />
          <span className={cn("text-sm font-medium text-foreground", completed && "text-muted-foreground line-through")}>
            {subtopic.title}
          </span>
        </label>
        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value as LearningStatus)}
          className="h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground"
        >
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="revised">Revised</option>
          <option value="mastered">Mastered</option>
        </select>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <DifficultyBadge difficulty={subtopic.difficulty} />
        <PriorityBadge priority={subtopic.priority} />
        {subtopic.estimatedStudyTimeMinutes ? (
          <span className="inline-flex h-7 items-center rounded-md border border-border bg-background px-2.5 text-xs text-muted-foreground">
            {subtopic.estimatedStudyTimeMinutes} min
          </span>
        ) : null}
      </div>
    </div>
  );
}
