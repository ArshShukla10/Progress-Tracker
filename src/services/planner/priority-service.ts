import type { AnalyticsDashboardData, AnalyticsProgressItem } from "@/types/analytics";
import type { PlannerPriority, PlannerTask } from "@/types/planner";

function getSubjectProgress(analytics: AnalyticsDashboardData, subjectId?: string) {
  if (!subjectId) {
    return null;
  }

  return analytics.subjectProgress.find((subject) => subject.id === subjectId) ?? null;
}

function calculatePriority(task: PlannerTask, analytics: AnalyticsDashboardData): PlannerPriority {
  const subjectProgress = getSubjectProgress(analytics, task.subjectId);
  const isWeakSubject = task.subject === analytics.insights.weakestSubject;

  if (isWeakSubject || (subjectProgress && subjectProgress.percentage < 20)) {
    return "urgent";
  }

  if (task.estimatedMinutes >= 90 || (subjectProgress && subjectProgress.percentage < 50)) {
    return "high";
  }

  if (task.estimatedMinutes >= 45) {
    return "medium";
  }

  return "low";
}

function sortByPriority(tasks: PlannerTask[]) {
  const priorityRank: Record<PlannerPriority, number> = {
    urgent: 4,
    high: 3,
    medium: 2,
    low: 1,
  };

  return [...tasks].sort((first, second) => {
    const priorityDifference = priorityRank[second.priority] - priorityRank[first.priority];

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    return second.estimatedMinutes - first.estimatedMinutes;
  });
}

function getWeakestSubject(analytics: AnalyticsDashboardData): AnalyticsProgressItem | null {
  return (
    analytics.subjectProgress.find((subject) => subject.label === analytics.insights.weakestSubject) ??
    null
  );
}

export const priorityService = {
  calculatePriority,
  sortByPriority,
  getWeakestSubject,
};
