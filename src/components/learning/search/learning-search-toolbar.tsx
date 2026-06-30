"use client";

import type { LearningDifficulty, LearningFilters, LearningMode } from "@/types/learning";

const modeOptions: Array<LearningMode | "all"> = [
  "all",
  "notes",
  "pyqs",
  "revision",
  "flashcards",
  "interview",
];

const difficultyOptions: Array<LearningDifficulty | "all"> = ["all", "easy", "medium", "hard"];

export function LearningSearchToolbar({
  filters,
  onFiltersChange,
}: {
  filters: LearningFilters;
  onFiltersChange: (filters: LearningFilters) => void;
}) {
  return (
    <div className="grid gap-3 rounded-md border border-border/70 bg-background/32 p-4 lg:grid-cols-[1fr_auto_auto_auto]">
      <input
        value={filters.query}
        onChange={(event) => onFiltersChange({ ...filters, query: event.target.value })}
        placeholder="Search notes, PYQs, revision, flashcards, interview..."
        className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
      />
      <select
        value={filters.mode}
        onChange={(event) =>
          onFiltersChange({ ...filters, mode: event.target.value as LearningMode | "all" })
        }
        className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground"
      >
        {modeOptions.map((mode) => (
          <option key={mode} value={mode}>
            {mode}
          </option>
        ))}
      </select>
      <select
        value={filters.difficulty}
        onChange={(event) =>
          onFiltersChange({
            ...filters,
            difficulty: event.target.value as LearningDifficulty | "all",
          })
        }
        className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground"
      >
        {difficultyOptions.map((difficulty) => (
          <option key={difficulty} value={difficulty}>
            {difficulty}
          </option>
        ))}
      </select>
      <label className="flex h-10 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={filters.bookmarkedOnly}
          onChange={(event) =>
            onFiltersChange({ ...filters, bookmarkedOnly: event.target.checked })
          }
          className="size-4 accent-primary"
        />
        Bookmarks
      </label>
    </div>
  );
}
