import type { AnalyticsDashboardData } from "@/types/analytics";
import type { XpConfig } from "@/types/gamification";

export const defaultXpConfig: XpConfig = {
  "complete-topic": 50,
  "complete-module": 200,
  "complete-subject": 800,
  "complete-skill-topic": 60,
  "complete-quiz": 75,
  "complete-revision": 40,
  "use-ai": 15,
  "maintain-streak": 25,
};

function getCompletedSubjects(analytics: AnalyticsDashboardData) {
  return analytics.subjectProgress.filter((subject) => subject.percentage === 100).length;
}

function calculateXp(analytics: AnalyticsDashboardData, config: XpConfig = defaultXpConfig) {
  const topicsCompleted = Number(
    analytics.metrics.find((metric) => metric.id === "topics-completed")?.value ?? 0,
  );
  const modulesCompleted = Number(
    analytics.metrics.find((metric) => metric.id === "modules-completed")?.value ?? 0,
  );
  const skillTopicsCompleted = analytics.skillProgress.reduce(
    (total, skill) => total + skill.completed,
    0,
  );

  return (
    topicsCompleted * config["complete-topic"] +
    modulesCompleted * config["complete-module"] +
    getCompletedSubjects(analytics) * config["complete-subject"] +
    skillTopicsCompleted * config["complete-skill-topic"] +
    analytics.insights.currentStreak * config["maintain-streak"]
  );
}

export const xpService = {
  defaultXpConfig,
  calculateXp,
};
