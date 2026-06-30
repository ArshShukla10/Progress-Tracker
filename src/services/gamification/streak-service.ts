import type { AnalyticsDashboardData } from "@/types/analytics";
import type { StreakSummary } from "@/types/gamification";

function getStreakSummary(analytics: AnalyticsDashboardData): StreakSummary {
  return {
    currentStreak: analytics.insights.currentStreak,
    longestStreak: analytics.insights.longestStreak,
    lastStudyDate: null,
    missedDays: analytics.insights.currentStreak > 0 ? 0 : 1,
  };
}

export const streakService = {
  getStreakSummary,
};
