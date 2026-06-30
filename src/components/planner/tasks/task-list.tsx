"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { taskService } from "@/services/planner/task-service";
import type { PlannerTask, PlannerTaskStatus } from "@/types/planner";

const statusOptions: PlannerTaskStatus[] = [
  "pending",
  "in-progress",
  "completed",
  "skipped",
  "rescheduled",
];

export function TaskList({
  tasks,
  onStatusChange,
}: {
  tasks: PlannerTask[];
  onStatusChange: () => void;
}) {
  function updateStatus(taskId: string, status: PlannerTaskStatus) {
    taskService.setTaskStatus(taskId, status);
    onStatusChange();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task List</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.slice(0, 8).map((task) => (
          <div key={task.id} className="rounded-md border border-border/70 bg-background/32 p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{task.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {task.subject} / {task.module}
                </p>
                <p className="mt-2 text-xs text-primary">{task.reason}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  value={task.status}
                  onChange={(event) => updateStatus(task.id, event.target.value as PlannerTaskStatus)}
                  className="h-9 rounded-md border border-border bg-background px-3 text-xs text-foreground"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                {task.href ? (
                  <Button asChild variant="secondary">
                    <Link href={task.href}>Open</Link>
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
