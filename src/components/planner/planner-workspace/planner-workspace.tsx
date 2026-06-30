"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { SectionHeader } from "@/components/academics/section-header";
import { StudyCalendar } from "@/components/planner/calendar/study-calendar";
import { GoalProgressPanel } from "@/components/planner/dashboard/goal-progress-panel";
import { RecommendationPanel } from "@/components/planner/dashboard/recommendation-panel";
import { RemainingTimePanel } from "@/components/planner/dashboard/remaining-time-panel";
import { PlannerStatCard } from "@/components/planner/widgets/planner-stat-card";
import { TaskList } from "@/components/planner/tasks/task-list";
import { StudyTimeline } from "@/components/planner/timeline/study-timeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { plannerService } from "@/services/planner/planner-service";
import { timeEstimationService } from "@/services/planner/time-estimation-service";
import type { PlannerDashboardData } from "@/types/planner";

export function PlannerWorkspace() {
  const [data, setData] = useState<PlannerDashboardData>(() => plannerService.getDashboardData());

  function refreshPlanner() {
    setData(plannerService.getDashboardData());
  }

  useEffect(() => {
    refreshPlanner();
  }, []);

  return (
    <motion.section
      className="mx-auto flex w-full max-w-7xl flex-col gap-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <SectionHeader
        eyebrow="Planner"
        title="Study Orchestration"
        description="A focused plan generated from your analytics, goals, progress, and learning history."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <PlannerStatCard
          label="Today's Focus"
          value={data.summary.todaysFocus}
          detail="Highest leverage subject"
        />
        <PlannerStatCard
          label="Suggested Next Topic"
          value={data.summary.suggestedNextTopic}
          detail="Top priority queue item"
        />
        <PlannerStatCard
          label="Upcoming Revision"
          value={data.summary.upcomingRevision}
          detail="Generated from analytics"
        />
        <PlannerStatCard
          label="Remaining Study Time"
          value={timeEstimationService.formatMinutes(data.summary.remainingStudyTimeMinutes)}
          detail="Across current semester"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <TaskList tasks={data.schedule.daily} onStatusChange={refreshPlanner} />
        <RecommendationPanel recommendations={data.recommendations} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <StudyCalendar days={data.calendar} />
        <StudyTimeline items={data.schedule.timeline} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <GoalProgressPanel goals={[...data.goals.today, ...data.goals.weekly]} />
        <RemainingTimePanel estimates={data.timeEstimates} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <PlanColumn title="Weekly Plan" tasks={data.schedule.weekly} />
        <PlanColumn title="Monthly Overview" tasks={data.schedule.monthly} />
        <PlanColumn title="Priority Queue" tasks={data.priorityQueue} />
      </div>
    </motion.section>
  );
}

function PlanColumn({ title, tasks }: { title: string; tasks: PlannerDashboardData["tasks"] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.slice(0, 6).map((task) => (
          <div key={task.id} className="rounded-md border border-border/70 bg-background/32 p-3">
            <p className="truncate text-sm font-medium text-foreground">{task.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {task.subject} / {task.estimatedMinutes}m / {task.priority}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
