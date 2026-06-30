import { analyticsService } from "@/services/analytics/analytics-service";
import { gamificationService } from "@/services/gamification/gamification-service";
import { learningService } from "@/services/learning/learning-service";
import { calendarService } from "@/services/planner/calendar-service";
import { goalPlanner } from "@/services/planner/goal-planner";
import { priorityService } from "@/services/planner/priority-service";
import { recommendationService } from "@/services/planner/recommendation-service";
import { scheduleService } from "@/services/planner/schedule-service";
import { taskService } from "@/services/planner/task-service";
import { timeEstimationService } from "@/services/planner/time-estimation-service";
import type { AnalyticsDashboardData } from "@/types/analytics";
import type { PlannerAiContext, PlannerDashboardData } from "@/types/planner";

function getDashboardData(
  analytics: AnalyticsDashboardData = analyticsService.getDashboardData(),
): PlannerDashboardData {
  const tasks = taskService.getPlannerTasks(analytics);
  const learningTasks = learningService.getPlannerTasks();
  const allTasks = [...tasks, ...learningTasks];
  const priorityQueue = priorityService
    .sortByPriority(allTasks)
    .filter((task) => task.status !== "completed");
  const schedule = scheduleService.getPlannerSchedule(priorityQueue);
  const goals = goalPlanner.getPlannerGoals(analytics);
  const recommendations = recommendationService.getRecommendations(analytics, priorityQueue);
  const timeEstimates = timeEstimationService.getSubjectTimeEstimates();
  const remainingStudyTimeMinutes = timeEstimates.reduce(
    (total, estimate) => total + estimate.remainingMinutes,
    0,
  );
  const todayGoalCount = goals.today.length;
  const completedTodayGoals = goals.today.filter((goal) => goal.progressPercentage >= 100).length;

  return {
    generatedAt: new Date().toISOString(),
    tasks: allTasks,
    priorityQueue,
    schedule,
    calendar: calendarService.getPlannerCalendar(allTasks),
    goals,
    recommendations,
    timeEstimates,
    summary: {
      todaysFocus: priorityQueue[0]?.subject ?? analytics.insights.weakestSubject,
      suggestedNextTopic: priorityQueue[0]?.title ?? "No topic queued",
      upcomingRevision: analytics.insights.upcomingRevisionSuggestions[0] ?? "No revision due",
      weeklyProgress: analytics.learningConsistency,
      currentGoalProgress:
        todayGoalCount > 0 ? Math.round((completedTodayGoals / todayGoalCount) * 100) : 0,
      remainingStudyTimeMinutes,
    },
  };
}

function getAiContext(
  analytics: AnalyticsDashboardData = analyticsService.getDashboardData(),
): PlannerAiContext {
  const dashboard = getDashboardData(analytics);

  return {
    currentPlan: dashboard.schedule.daily,
    upcomingTasks: dashboard.tasks.slice(0, 8),
    priorityQueue: dashboard.priorityQueue.slice(0, 8),
    goals: dashboard.goals,
    studyTime: dashboard.timeEstimates,
    recommendations: dashboard.recommendations,
    gamification: gamificationService.getAiContext(analytics),
  };
}

export const plannerService = {
  getDashboardData,
  getAiContext,
};
