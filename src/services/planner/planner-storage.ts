import { localStorageService } from "@/lib/storage/local-storage";
import type { PlannerTaskState, PlannerTaskStatus } from "@/types/planner";

const plannerTaskStateKey = "nexus.planner.taskState";

function getTaskState() {
  return localStorageService.get<Record<string, PlannerTaskState>>(plannerTaskStateKey) ?? {};
}

function setTaskStatus(taskId: string, status: PlannerTaskStatus) {
  localStorageService.set<Record<string, PlannerTaskState>>(plannerTaskStateKey, {
    ...getTaskState(),
    [taskId]: {
      status,
      updatedAt: new Date().toISOString(),
    },
  });
}

export const plannerStorage = {
  getTaskState,
  setTaskStatus,
};
