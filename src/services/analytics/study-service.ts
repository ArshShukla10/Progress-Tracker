import { academicService } from "@/services/academic-service";
import { learningStorageService } from "@/services/learning-storage-service";
import type { LearningStatus, Module, Topic } from "@/types/academic";
import type { AnalyticsChartPoint, StudyActivitySummary } from "@/types/analytics";

function isCompletedStatus(status: LearningStatus) {
  return status === "completed" || status === "revised" || status === "mastered";
}

function formatDayLabel(date: Date) {
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

function formatMonthLabel(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short" });
}

function getTopicStatus(semesterId: string, subjectId: string, subjectModule: Module, topic: Topic) {
  const state = learningStorageService.getWorkspaceState(
    semesterId,
    subjectId,
    subjectModule.id,
  );

  return state.topics[topic.id]?.status ?? topic.status;
}

function getCompletedStudyTimeMinutes() {
  return academicService.getSubjects().reduce(
    (subjectTotal, subject) =>
      subjectTotal +
      subject.modules.reduce(
        (moduleTotal, subjectModule) =>
          moduleTotal +
          subjectModule.topics.reduce((topicTotal, topic) => {
            if (!isCompletedStatus(getTopicStatus(subject.semesterId, subject.id, subjectModule, topic))) {
              return topicTotal;
            }

            const subtopicMinutes = topic.subtopics.reduce(
              (total, subtopic) => total + (subtopic.estimatedStudyTimeMinutes ?? 0),
              0,
            );

            return topicTotal + (topic.estimatedStudyTimeMinutes ?? 0) + subtopicMinutes;
          }, 0),
        0,
      ),
    0,
  );
}

function buildWeeklyActivity(): AnalyticsChartPoint[] {
  const today = new Date();
  const activity = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));

    return {
      label: formatDayLabel(date),
      value: 0,
    };
  });

  const lastVisited = learningStorageService.getLastVisitedLocation();

  if (lastVisited?.updatedAt) {
    const visitedDate = new Date(lastVisited.updatedAt);
    const matchingDay = activity.find((item) => item.label === formatDayLabel(visitedDate));

    if (matchingDay) {
      matchingDay.value = 1;
    }
  }

  return activity;
}

function buildMonthlyActivity(): AnalyticsChartPoint[] {
  const today = new Date();

  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(today.getFullYear(), today.getMonth() - (5 - index), 1);

    return {
      label: formatMonthLabel(date),
      value: 0,
    };
  });
}

function getStudyActivitySummary(): StudyActivitySummary {
  const weeklyActivity = buildWeeklyActivity();
  const monthlyActivity = buildMonthlyActivity();
  const totalStudyTimeMinutes = getCompletedStudyTimeMinutes();
  const activeDaysThisWeek = weeklyActivity.filter((item) => item.value > 0).length;

  return {
    weeklyActivity,
    monthlyActivity,
    activeDaysThisWeek,
    averageDailyStudyTimeMinutes: Math.round(totalStudyTimeMinutes / 7),
    totalStudyTimeMinutes,
  };
}

export const analyticsStudyService = {
  getCompletedStudyTimeMinutes,
  getStudyActivitySummary,
};
