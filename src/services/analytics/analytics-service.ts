import { academicService } from "@/services/academic-service";
import { analyticsPredictionService } from "@/services/analytics/prediction-service";
import { analyticsProgressService } from "@/services/analytics/progress-service";
import { analyticsStudyService } from "@/services/analytics/study-service";
import type { AnalyticsDashboardData, AnalyticsMetric } from "@/types/analytics";

function formatMinutes(minutes: number) {
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

function getDashboardData(): AnalyticsDashboardData {
  const subjectProgress = analyticsProgressService.getCurrentSubjectProgress();
  const skillProgress = analyticsProgressService.getSkillProgress();
  const overall = analyticsProgressService.getOverallProgress();
  const study = analyticsStudyService.getStudyActivitySummary();
  const insights = analyticsPredictionService.getLearningInsights();
  const currentSemesterProgress = academicService.calculateSemesterProgress().percentage;
  const learningConsistency = Math.round((study.activeDaysThisWeek / 7) * 100);

  const metrics: AnalyticsMetric[] = [
    {
      id: "study-time",
      label: "Study Time",
      value: formatMinutes(study.totalStudyTimeMinutes),
      detail: "Estimated from completed topics",
    },
    {
      id: "topics-completed",
      label: "Topics Completed",
      value: String(overall.completedTopics),
      detail: `${overall.totalTopics - overall.completedTopics} remaining`,
    },
    {
      id: "modules-completed",
      label: "Modules Completed",
      value: String(overall.completedModules),
      detail: `${overall.totalModules} total modules`,
    },
    {
      id: "average-daily-study",
      label: "Average Daily Study Time",
      value: formatMinutes(study.averageDailyStudyTimeMinutes),
      detail: "Seven-day rolling estimate",
    },
  ];

  return {
    metrics,
    subjectProgress,
    skillProgress,
    weeklyActivity: study.weeklyActivity,
    monthlyActivity: study.monthlyActivity,
    overallCompletion: overall.percentage,
    currentSemesterProgress,
    learningConsistency,
    insights,
  };
}

export const analyticsService = {
  getDashboardData,
};
