import { learningStorage } from "@/services/learning/learning-storage";

export const pyqService = {
  getPyqs() {
    return learningStorage.getState().pyqs;
  },

  getPendingPyqs() {
    return this.getPyqs().filter((item) => item.status !== "solved");
  },
};
