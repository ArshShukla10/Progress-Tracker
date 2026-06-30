import { analyticsService } from "@/services/analytics/analytics-service";
import { achievementService } from "@/services/gamification/achievement-service";
import { badgeService } from "@/services/gamification/badge-service";
import { challengeService } from "@/services/gamification/challenge-service";
import { goalService } from "@/services/gamification/goal-service";
import { levelService } from "@/services/gamification/level-service";
import { rewardService } from "@/services/gamification/reward-service";
import { streakService } from "@/services/gamification/streak-service";
import { xpService } from "@/services/gamification/xp-service";
import type { AnalyticsDashboardData } from "@/types/analytics";
import type { GamificationAiContext, GamificationDashboardData } from "@/types/gamification";

function getDashboardData(
  analytics: AnalyticsDashboardData = analyticsService.getDashboardData(),
): GamificationDashboardData {
  const xp = xpService.calculateXp(analytics);
  const achievements = achievementService.getAchievements(analytics, xp);
  const badges = badgeService.getBadges(achievements);
  const dailyGoals = goalService.getDailyGoals(analytics);
  const weeklyChallenge = challengeService.getWeeklyChallenge(analytics);

  return {
    xp,
    xpConfig: xpService.defaultXpConfig,
    level: levelService.calculateLevel(xp),
    streak: streakService.getStreakSummary(analytics),
    achievements,
    badges,
    dailyGoals,
    weeklyChallenge,
    rewards: rewardService.getRewards({
      achievements,
      badges,
      goals: dailyGoals,
      weeklyChallenge,
    }),
    learningProgress: {
      overallCompletion: analytics.overallCompletion,
      currentSemesterProgress: analytics.currentSemesterProgress,
      strongestSubject: analytics.insights.strongestSubject,
      weakestSubject: analytics.insights.weakestSubject,
    },
  };
}

function getAiContext(
  analytics: AnalyticsDashboardData = analyticsService.getDashboardData(),
): GamificationAiContext {
  const dashboard = getDashboardData(analytics);

  return {
    xp: dashboard.xp,
    level: dashboard.level.currentLevel.level,
    achievementsUnlocked: dashboard.achievements.filter((achievement) => achievement.unlocked).length,
    streak: dashboard.streak,
    goals: dashboard.dailyGoals,
    challenge: dashboard.weeklyChallenge,
    weakSubjects: [dashboard.learningProgress.weakestSubject],
  };
}

export const gamificationService = {
  getDashboardData,
  getAiContext,
};
