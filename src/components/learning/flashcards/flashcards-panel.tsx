"use client";

import { useState } from "react";

import { LearningEmptyState } from "@/components/learning/empty-state/learning-empty-state";
import type { FlashcardItem } from "@/types/learning";

export function FlashcardsPanel({ flashcards }: { flashcards: FlashcardItem[] }) {
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  if (flashcards.length === 0) {
    return (
      <LearningEmptyState
        title="No flashcards yet"
        description="AI-generated and personal flashcards will appear here after real flashcard content is added."
      />
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {flashcards.map((flashcard) => (
        <button
          key={flashcard.id}
          type="button"
          onClick={() => setFlippedCardId(flippedCardId === flashcard.id ? null : flashcard.id)}
          className="min-h-36 rounded-md border border-border/70 bg-background/32 p-4 text-left text-sm text-foreground"
        >
          {flippedCardId === flashcard.id ? flashcard.back : flashcard.front}
        </button>
      ))}
    </div>
  );
}
