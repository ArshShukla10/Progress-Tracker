import type { AnalyticsDashboardData } from "@/types/analytics";
import type { PlannerRecommendation, PlannerTask } from "@/types/planner";

function getRecommendations(
  analytics: AnalyticsDashboardData,
  priorityQueue: PlannerTask[],
): PlannerRecommendation[] {
  const nextTask = priorityQueue[0];
  const efficientTask = priorityQueue.find((task) => task.estimatedMinutes <= 45) ?? nextTask;
  const revisionSubject = analytics.insights.upcomingRevisionSuggestions[0];

  return [
    {
      id: "recommended-next-topic",
      title: "Recommended Next Topic",
      description: nextTask ? `${nextTask.title} in ${nextTask.subject}` : "No topic available yet.",
      taskId: nextTask?.id,
      priority: nextTask?.priority ?? "medium",
    },
    {
      id: "weak-subject",
      title: "Weak Subject",
      description: `Prioritize ${analytics.insights.weakestSubject} to balance progress.`,
      priority: "high",
    },
    {
      id: "revision-due",
      title: "Revision Due",
      description: revisionSubject ? `Schedule revision for ${revisionSubject}.` : "No revision due.",
      priority: "medium",
    },
    {
      id: "efficient-next-task",
      title: "Most Efficient Next Task",
      description: efficientTask
        ? `${efficientTask.title} fits into a ${efficientTask.estimatedMinutes} minute block.`
        : "No efficient task found.",
      taskId: efficientTask?.id,
      priority: efficientTask?.priority ?? "low",
    },
  ];
}

export const recommendationService = {
  getRecommendations,
};
