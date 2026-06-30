import type { AnalyticsDashboardData } from "@/types/analytics";
import type { ChallengeDefinition, ChallengeProgress } from "@/types/gamification";

export const weeklyChallengeDefinition: ChallengeDefinition = {
  id: "weekly-module-focus",
  title: "Finish Module",
  target: 1,
  metric: "modules",
  rewardXp: 300,
};

function getEndOfWeekIso() {
  const date = new Date();
  const daysUntilSunday = 7 - date.getDay();
  date.setDate(date.getDate() + daysUntilSunday);
  date.setHours(23, 59, 59, 999);
  return date.toISOString();
}

function getWeeklyChallenge(analytics: AnalyticsDashboardData): ChallengeProgress {
  const current = Number(
    analytics.metrics.find((metric) => metric.id === "modules-completed")?.value ?? 0,
  );

  return {
    ...weeklyChallengeDefinition,
    current,
    completed: current >= weeklyChallengeDefinition.target,
    progressPercentage: Math.min(
      Math.round((current / weeklyChallengeDefinition.target) * 100),
      100,
    ),
    endsAt: getEndOfWeekIso(),
  };
}

export const challengeService = {
  weeklyChallengeDefinition,
  getWeeklyChallenge,
};
