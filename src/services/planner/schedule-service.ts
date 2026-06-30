import type { PlannerSchedule, PlannerTask, StudySessionLength } from "@/types/planner";

const defaultSessionLengths: StudySessionLength[] = [25, 45, 60, 90, 120];

function getBestSessionLength(minutes: number): StudySessionLength {
  return defaultSessionLengths.find((length) => length >= minutes) ?? 120;
}

function getPlannerSchedule(tasks: PlannerTask[]): PlannerSchedule {
  const daily = tasks.slice(0, 4);
  const weekly = tasks.slice(0, 10);
  const monthly = tasks.slice(0, 24);
  const today = new Date();

  return {
    daily,
    weekly,
    monthly,
    upcomingSessions: daily.map((task, index) => {
      const startsAt = new Date(today);
      startsAt.setHours(9 + index * 2, 0, 0, 0);

      return {
        id: `session-${task.id}`,
        label: task.title,
        taskId: task.id,
        startsAt: startsAt.toISOString(),
        durationMinutes: getBestSessionLength(task.estimatedMinutes),
      };
    }),
    timeline: daily.map((task, index) => ({
      id: `timeline-${task.id}`,
      time: `${9 + index * 2}:00`,
      title: task.title,
      description: `${task.subject ?? "Learning"} / ${task.module ?? "Study block"}`,
      status: task.status,
    })),
  };
}

export const scheduleService = {
  defaultSessionLengths,
  getPlannerSchedule,
};
