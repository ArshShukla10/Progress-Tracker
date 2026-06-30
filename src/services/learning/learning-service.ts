import { aiActions } from "@/services/ai/ai-actions";
import { analyticsService } from "@/services/analytics/analytics-service";
import { gamificationService } from "@/services/gamification/gamification-service";
import { flashcardService } from "@/services/learning/flashcard-service";
import { interviewService } from "@/services/learning/interview-service";
import { notesService } from "@/services/learning/notes-service";
import { pyqService } from "@/services/learning/pyq-service";
import { revisionService } from "@/services/learning/revision-service";
import { searchService } from "@/services/learning/search-service";
import type { AiContext } from "@/types/ai";
import type {
  LearningFilters,
  LearningItem,
  LearningMode,
  LearningStats,
  LearningWorkspaceData,
} from "@/types/learning";
import type { PlannerTask } from "@/types/planner";

const learningModes: LearningMode[] = ["notes", "pyqs", "revision", "flashcards", "interview"];

const defaultAiContext: AiContext = {
  source: "academic",
};

function getAllItems(): LearningItem[] {
  return [
    ...notesService.getNotes(),
    ...pyqService.getPyqs(),
    ...revisionService.getRevisionItems(),
    ...flashcardService.getFlashcards(),
    ...interviewService.getQuestions(),
  ];
}

function getStats(): LearningStats {
  return {
    notesCount: notesService.getNotes().length,
    pyqsPending: pyqService.getPendingPyqs().length,
    revisionDue: revisionService.getTodaysRevision().length,
    interviewPending: interviewService.getPendingQuestions().length,
    flashcardsDue: flashcardService.getDueFlashcards().length,
    bookmarkedItems: getAllItems().filter((item) => item.bookmarked).length,
  };
}

function getPlannerTasks(): PlannerTask[] {
  return getAllItems().map((item) => ({
    id: `learning-${item.mode}-${item.id}`,
    title: item.title,
    source:
      item.mode === "notes"
        ? "notes"
        : item.mode === "pyqs"
          ? "pyq"
          : item.mode === "interview"
            ? "interview"
            : item.mode === "revision"
              ? "revision"
              : "flashcards",
    subject: item.subject,
    subjectId: item.subjectId,
    module: item.module,
    moduleId: item.moduleId,
    topic: item.topic,
    topicId: item.topicId,
    skill: item.skill,
    estimatedMinutes: item.mode === "flashcards" ? 20 : 45,
    priority: item.mode === "revision" ? "high" : "medium",
    status: "pending",
    href: "/knowledge",
    reason: `${item.mode} learning task`,
  }));
}

function getAnalyticsSnapshot() {
  const analytics = analyticsService.getDashboardData();

  return {
    analytics,
    learningStats: getStats(),
  };
}

function getGamificationContext() {
  return gamificationService.getDashboardData(getAnalyticsSnapshot().analytics);
}

function getWorkspaceData(filters?: LearningFilters): LearningWorkspaceData {
  const items = getAllItems();
  const filteredItems = filters
    ? searchService.search(items, filters).map((result) => result.item)
    : items;

  return {
    modes: learningModes,
    items: filteredItems,
    stats: getStats(),
    plannerTasks: getPlannerTasks(),
    aiActions: aiActions.map((action) => action.id),
    aiContext: defaultAiContext,
  };
}

export const learningService = {
  getAllItems,
  getStats,
  getPlannerTasks,
  getAnalyticsSnapshot,
  getGamificationContext,
  getWorkspaceData,
};
