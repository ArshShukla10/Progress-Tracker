import type { AnalyticsDashboardData } from "@/types/analytics";
import type { GoalDefinition, GoalProgress } from "@/types/gamification";

export const dailyGoalDefinitions: GoalDefinition[] = [
  {
    id: "finish-2-topics",
    title: "Finish 2 Topics",
    cadence: "daily",
    target: 2,
    metric: "topics",
    rewardXp: 100,
  },
  {
    id: "study-2-hours",
    title: "Study 2 Hours",
    cadence: "daily",
    target: 120,
    metric: "minutes",
    rewardXp: 120,
  },
  {
    id: "complete-quiz",
    title: "Complete Quiz",
    cadence: "daily",
    target: 1,
    metric: "quiz",
    rewardXp: 75,
  },
  {
    id: "solve-dsa-problems",
    title: "Solve DSA Problems",
    cadence: "daily",
    target: 3,
    metric: "dsa-problems",
    rewardXp: 90,
  },
];

function getTomorrowIso() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow.toISOString();
}

function getCurrentValue(goal: GoalDefinition, analytics: AnalyticsDashboardData) {
  if (goal.metric === "topics") {
    return Number(analytics.metrics.find((metric) => metric.id === "topics-completed")?.value ?? 0);
  }

  if (goal.metric === "minutes") {
    return analytics.insights.averageStudyTimeMinutes;
  }

  return 0;
}

function getDailyGoals(analytics: AnalyticsDashboardData): GoalProgress[] {
  return dailyGoalDefinitions.map((goal) => {
    const current = getCurrentValue(goal, analytics);

    return {
      ...goal,
      current,
      completed: current >= goal.target,
      progressPercentage: Math.min(Math.round((current / goal.target) * 100), 100),
      resetsAt: getTomorrowIso(),
    };
  });
}

export const goalService = {
  dailyGoalDefinitions,
  getDailyGoals,
};
