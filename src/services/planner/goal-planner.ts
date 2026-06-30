import type { AnalyticsDashboardData } from "@/types/analytics";
import type { PlannerGoal } from "@/types/planner";

function createGoal({
  id,
  title,
  cadence,
  target,
  current,
}: {
  id: string;
  title: string;
  cadence: PlannerGoal["cadence"];
  target: number;
  current: number;
}): PlannerGoal {
  return {
    id,
    title,
    cadence,
    target,
    current,
    progressPercentage: Math.min(Math.round((current / target) * 100), 100),
  };
}

function getPlannerGoals(analytics: AnalyticsDashboardData) {
  const topicsCompleted = Number(
    analytics.metrics.find((metric) => metric.id === "topics-completed")?.value ?? 0,
  );
  const modulesCompleted = Number(
    analytics.metrics.find((metric) => metric.id === "modules-completed")?.value ?? 0,
  );

  return {
    today: [
      createGoal({ id: "today-topics", title: "Complete 2 topics", cadence: "daily", target: 2, current: topicsCompleted }),
      createGoal({
        id: "today-study-time",
        title: "Study 120 minutes",
        cadence: "daily",
        target: 120,
        current: analytics.insights.averageStudyTimeMinutes,
      }),
    ],
    weekly: [
      createGoal({ id: "weekly-module", title: "Finish 1 module", cadence: "weekly", target: 1, current: modulesCompleted }),
      createGoal({
        id: "weekly-consistency",
        title: "Study 5 days",
        cadence: "weekly",
        target: 5,
        current: analytics.weeklyActivity.filter((item) => item.value > 0).length,
      }),
    ],
    monthly: [
      createGoal({
        id: "monthly-progress",
        title: "Reach 20% semester progress",
        cadence: "monthly",
        target: 20,
        current: analytics.currentSemesterProgress,
      }),
    ],
    semester: [
      createGoal({
        id: "semester-completion",
        title: "Complete semester syllabus",
        cadence: "semester",
        target: 100,
        current: analytics.currentSemesterProgress,
      }),
    ],
  };
}

export const goalPlanner = {
  getPlannerGoals,
};
