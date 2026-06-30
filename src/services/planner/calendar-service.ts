import type { PlannerCalendarDay, PlannerTask } from "@/types/planner";

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getPlannerCalendar(tasks: PlannerTask[]): PlannerCalendarDay[] {
  const today = new Date();
  const todayKey = toDateKey(today);

  return Array.from({ length: 35 }, (_, index) => {
    const date = new Date(today.getFullYear(), today.getMonth(), 1);
    date.setDate(index + 1);
    const dateKey = toDateKey(date);
    const isToday = dateKey === todayKey;
    const tasksCount = index < 7 ? Math.ceil(tasks.length / 7) : 0;
    const hasCompletedTasks = tasks.some((task) => task.status === "completed") && index < 3;

    return {
      date: dateKey,
      label: date.toLocaleDateString("en-US", { weekday: "short" }),
      dayNumber: date.getDate(),
      tasksCount,
      status: isToday ? "today" : hasCompletedTasks ? "completed" : tasksCount > 0 ? "planned" : "empty",
    };
  });
}

export const calendarService = {
  getPlannerCalendar,
};
