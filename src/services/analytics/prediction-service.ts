import { analyticsProgressService } from "@/services/analytics/progress-service";
import { analyticsStudyService } from "@/services/analytics/study-service";
import type { AnalyticsProgressItem, LearningInsights } from "@/types/analytics";

function byPercentageAsc(a: AnalyticsProgressItem, b: AnalyticsProgressItem) {
  return a.percentage - b.percentage;
}

function byPercentageDesc(a: AnalyticsProgressItem, b: AnalyticsProgressItem) {
  return b.percentage - a.percentage;
}

function getLearningInsights(): LearningInsights {
  const subjectProgress = analyticsProgressService.getCurrentSubjectProgress();
  const sortedAscending = [...subjectProgress].sort(byPercentageAsc);
  const sortedDescending = [...subjectProgress].sort(byPercentageDesc);
  const weakestSubject = sortedAscending[0]?.label ?? "No subject available";
  const strongestSubject = sortedDescending[0]?.label ?? "No subject available";
  const overall = analyticsProgressService.getOverallProgress();
  const study = analyticsStudyService.getStudyActivitySummary();

  return {
    mostStudiedSubject: strongestSubject,
    leastStudiedSubject: weakestSubject,
    weakestSubject,
    strongestSubject,
    currentStreak: study.activeDaysThisWeek > 0 ? 1 : 0,
    longestStreak: study.activeDaysThisWeek > 0 ? 1 : 0,
    topicsRemaining: overall.totalTopics - overall.completedTopics,
    averageStudyTimeMinutes: study.averageDailyStudyTimeMinutes,
    upcomingRevisionSuggestions: sortedAscending.slice(0, 3).map((item) => item.label),
  };
}

export const analyticsPredictionService = {
  getLearningInsights,
};
