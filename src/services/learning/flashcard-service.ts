import { learningStorage } from "@/services/learning/learning-storage";

export const flashcardService = {
  getFlashcards() {
    return learningStorage.getState().flashcards;
  },

  getDueFlashcards() {
    return this.getFlashcards().filter((item) => item.status !== "known");
  },
};
