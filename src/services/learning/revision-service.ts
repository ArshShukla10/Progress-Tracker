import { learningStorage } from "@/services/learning/learning-storage";

function isDueToday(date?: string) {
  if (!date) {
    return true;
  }

  return new Date(date).getTime() <= Date.now();
}

export const revisionService = {
  getRevisionItems() {
    return learningStorage.getState().revision;
  },

  getRevisionQueue() {
    return this.getRevisionItems().filter((item) => item.status !== "completed");
  },

  getTodaysRevision() {
    return this.getRevisionQueue().filter((item) => isDueToday(item.dueAt));
  },
};
