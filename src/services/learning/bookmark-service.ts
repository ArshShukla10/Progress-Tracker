import { learningService } from "@/services/learning/learning-service";

export const bookmarkService = {
  getBookmarks() {
    return learningService.getAllItems().filter((item) => item.bookmarked);
  },
};
