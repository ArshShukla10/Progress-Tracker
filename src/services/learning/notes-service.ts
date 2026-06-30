import { learningStorage } from "@/services/learning/learning-storage";

export const notesService = {
  getNotes() {
    return learningStorage.getState().notes;
  },

  getRecentNotes(limit = 4) {
    return [...this.getNotes()]
      .sort((first, second) => second.updatedAt.localeCompare(first.updatedAt))
      .slice(0, limit);
  },
};
