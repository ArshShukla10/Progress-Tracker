import { learningStorage } from "@/services/learning/learning-storage";

export const interviewService = {
  getQuestions() {
    return learningStorage.getState().interview;
  },

  getPendingQuestions() {
    return this.getQuestions().filter((item) => item.status !== "completed");
  },
};
