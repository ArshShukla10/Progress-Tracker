import { academicService } from "@/services/academic-service";
import { plannerStorage } from "@/services/planner/planner-storage";
import { priorityService } from "@/services/planner/priority-service";
import type { AnalyticsDashboardData } from "@/types/analytics";
import type { PlannerTask, PlannerTaskStatus } from "@/types/planner";

function getModuleHref(semesterId: string, subjectId: string, moduleId: string) {
  const subjectModule = academicService.getModule(subjectId, moduleId, semesterId);

  return subjectModule
    ? `/academics/${semesterId}/${subjectId}/${academicService.getModuleRouteSegment(subjectModule)}`
    : "/academics";
}

function getBaseTasks(analytics: AnalyticsDashboardData): PlannerTask[] {
  const currentSemester = academicService.getCurrentSemester();

  return academicService
    .getSubjects(currentSemester.id)
    .flatMap((subject) =>
      subject.modules.flatMap((subjectModule) =>
        subjectModule.topics
          .filter((topic) => topic.status === "not-started" || topic.status === "in-progress")
          .slice(0, 2)
          .map<PlannerTask>((topic) => {
            const estimatedMinutes =
              topic.estimatedStudyTimeMinutes ??
              topic.subtopics.reduce((total, subtopic) => total + (subtopic.estimatedStudyTimeMinutes ?? 0), 0) ??
              45;

            return {
              id: `${subject.id}-${subjectModule.id}-${topic.id}`,
              title: topic.title,
              source: "academic",
              subject: subject.name,
              subjectId: subject.id,
              module: subjectModule.title,
              moduleId: subjectModule.id,
              topic: topic.title,
              topicId: topic.id,
              estimatedMinutes,
              priority: "medium",
              status: "pending",
              href: getModuleHref(currentSemester.id, subject.id, subjectModule.id),
              reason:
                subject.name === analytics.insights.weakestSubject
                  ? "Weak subject focus"
                  : "Remaining syllabus",
            };
          }),
      ),
    );
}

function applyStoredState(tasks: PlannerTask[]) {
  const taskState = plannerStorage.getTaskState();

  return tasks.map((task) => ({
    ...task,
    status: taskState[task.id]?.status ?? task.status,
  }));
}

function getPlannerTasks(analytics: AnalyticsDashboardData): PlannerTask[] {
  const prioritizedTasks = getBaseTasks(analytics).map((task) => ({
    ...task,
    priority: priorityService.calculatePriority(task, analytics),
  }));

  return applyStoredState(priorityService.sortByPriority(prioritizedTasks));
}

function setTaskStatus(taskId: string, status: PlannerTaskStatus) {
  plannerStorage.setTaskStatus(taskId, status);
}

export const taskService = {
  getPlannerTasks,
  setTaskStatus,
};
