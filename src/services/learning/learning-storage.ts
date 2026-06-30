import { localStorageService } from "@/lib/storage/local-storage";
import type { LearningStorageState } from "@/types/learning";

const learningStorageKey = "nexus.learning-intelligence";

export const emptyLearningStorageState: LearningStorageState = {
  notes: [],
  pyqs: [],
  revision: [],
  flashcards: [],
  interview: [],
};

function getState(): LearningStorageState {
  const storedState = localStorageService.get<Partial<LearningStorageState>>(learningStorageKey);

  return {
    notes: storedState?.notes ?? [],
    pyqs: storedState?.pyqs ?? [],
    revision: storedState?.revision ?? [],
    flashcards: storedState?.flashcards ?? [],
    interview: storedState?.interview ?? [],
  };
}

function setState(state: LearningStorageState) {
  localStorageService.set(learningStorageKey, state);
}

export const learningStorage = {
  getState,
  setState,
};
