"use client";

import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ConfidenceLevel } from "@/types/academic";

type ConfidenceRatingProps = {
  value?: ConfidenceLevel;
  onChange: (value: ConfidenceLevel) => void;
};

const confidenceValues = [1, 2, 3, 4, 5] as const;

export function ConfidenceRating({ value, onChange }: ConfidenceRatingProps) {
  return (
    <div className="flex items-center gap-1" aria-label="Confidence rating">
      {confidenceValues.map((item) => (
        <button
          key={item}
          type="button"
          className="rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-primary"
          onClick={() => onChange(item)}
          aria-label={`Set confidence to ${item}`}
        >
          <Star
            className={cn(
              "size-4",
              value && item <= value && "fill-primary text-primary",
            )}
          />
        </button>
      ))}
    </div>
  );
}
