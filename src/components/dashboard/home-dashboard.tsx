"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, CalendarDays, GraduationCap, NotebookText, Target } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { academicService } from "@/services/academic-service";
import { learningStorageService } from "@/services/learning-storage-service";
import { plannerService } from "@/services/planner/planner-service";
import { timeEstimationService } from "@/services/planner/time-estimation-service";
import { skillService } from "@/services/skill-service";
import type { DashboardData, SkillSummary } from "@/types/academic";
import type { PlannerDashboardData } from "@/types/planner";

const actionIcons = [BookOpen, NotebookText, CalendarDays, GraduationCap] as const;

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 17) {
    return "Good afternoon";
  }

  return "Good evening";
}

export function HomeDashboard() {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const greeting = useMemo(() => getGreeting(), []);
  const dashboardData = useMemo(() => academicService.getDashboardData(), []);
  const plannerData = useMemo(() => plannerService.getDashboardData(), []);
  const [continueLearning, setContinueLearning] = useState(dashboardData.continueLearning);

  useEffect(() => {
    const lastVisited = academicService.resolveLearningLocation(
      learningStorageService.getLastVisitedLocation(),
    );

    if (lastVisited) {
      setContinueLearning(lastVisited);
    }
  }, []);

  function toggleTask(taskId: string) {
    setCompletedTasks((currentTasks) =>
      currentTasks.includes(taskId)
        ? currentTasks.filter((id) => id !== taskId)
        : [...currentTasks, taskId],
    );
  }

  return (
    <motion.section
      className="mx-auto flex w-full max-w-7xl flex-col gap-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <GreetingSection greeting={greeting} profile={dashboardData.profile} />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <TodaysMission
          completedTasks={completedTasks}
          mission={dashboardData.mission}
          onToggleTask={toggleTask}
        />
        <ContinueLearning continueLearning={continueLearning} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SemesterProgress progress={dashboardData.semesterProgress} />
        <QuickActions quickActions={dashboardData.quickActions} />
      </div>

      <SkillsSection skills={skillService.getAllSkills()} />

      <PlannerSummary planner={plannerData} />
    </motion.section>
  );
}

function GreetingSection({
  greeting,
  profile,
}: {
  greeting: string;
  profile: DashboardData["profile"];
}) {
  return (
    <section className="rounded-lg border border-border/80 bg-card/60 px-6 py-7 shadow-shell sm:px-8">
      <p className="text-sm font-medium text-primary">{profile.semester}</p>
      <div className="mt-3 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
            {greeting}, {profile.name}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            Your study space is ready. Start with today&apos;s mission, then continue the next topic.
          </p>
        </div>
      </div>
    </section>
  );
}

function TodaysMission({
  completedTasks,
  mission,
  onToggleTask,
}: {
  completedTasks: string[];
  mission: DashboardData["mission"];
  onToggleTask: (taskId: string) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today&apos;s Mission</CardTitle>
        <CardDescription>{mission.length} focused study tasks for this session.</CardDescription>
      </CardHeader>
      <CardContent>
        {mission.length === 0 ? (
          <p className="rounded-md border border-border/70 bg-background/32 p-4 text-sm text-muted-foreground">
            Study tasks will appear here once official syllabus topics are added.
          </p>
        ) : (
          <div className="space-y-3">
            {mission.map((task) => {
            const checked = completedTasks.includes(task.id);

            return (
              <label
                key={task.id}
                className="flex min-h-14 cursor-pointer items-center gap-4 rounded-md border border-border/70 bg-background/32 px-4 transition-colors hover:bg-secondary/45"
              >
                <Checkbox checked={checked} onChange={() => onToggleTask(task.id)} />
                <span
                  className={cn(
                    "text-sm font-medium text-foreground transition-colors",
                    checked && "text-muted-foreground line-through",
                  )}
                >
                  {task.title}
                </span>
              </label>
            );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ContinueLearning({
  continueLearning,
}: {
  continueLearning: DashboardData["continueLearning"];
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Continue Learning</CardTitle>
        <CardDescription>The next study block waiting for you.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-border/70 bg-background/36 p-5">
          <p className="text-sm font-medium text-primary">{continueLearning.subject}</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-normal text-foreground">
            {continueLearning.topic}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{continueLearning.module}</p>
          <Button asChild className="mt-8 gap-2">
            <Link href={continueLearning.href ?? "/academics"}>
              Resume
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function SemesterProgress({ progress }: { progress: DashboardData["semesterProgress"] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Semester Progress</CardTitle>
        <CardDescription>Topic completion across the current semester.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-5xl font-semibold tracking-normal text-foreground">
              {progress.percentage}%
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {progress.completedTopics} of {progress.totalTopics} topics completed
            </p>
          </div>
        </div>
        <Progress value={progress.percentage} className="mt-8" />
      </CardContent>
    </Card>
  );
}

function QuickActions({ quickActions }: { quickActions: DashboardData["quickActions"] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Move directly into the next academic workflow.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {quickActions.map((action, index) => {
            const Icon = actionIcons[index];

            return (
              <Button
                key={action.label}
                asChild
                variant="secondary"
                className="h-14 justify-start gap-3 px-4"
              >
                <Link href={action.href}>
                  <Icon className="size-4 text-primary" />
                  {action.label}
                </Link>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function SkillsSection({ skills }: { skills: SkillSummary[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>Long-term learning outside semester coursework.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {skills.map((skill) => {
            const locked = skill.status === "locked";

            return locked ? (
              <div
                key={skill.id}
                className="rounded-md border border-border/70 bg-background/32 p-4 text-sm"
              >
                <p className="font-medium text-muted-foreground">{skill.name}</p>
                <p className="mt-2 text-xs text-muted-foreground">Coming Soon</p>
              </div>
            ) : (
              <Link
                key={skill.id}
                href={`/skills/${skill.id}`}
                className="rounded-md border border-primary/30 bg-primary/10 p-4 text-sm transition-colors hover:border-primary/55"
              >
                <p className="font-medium text-foreground">{skill.name}</p>
                <p className="mt-2 text-xs text-primary">Unlocked</p>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function PlannerSummary({ planner }: { planner: PlannerDashboardData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today&apos;s Plan</CardTitle>
        <CardDescription>A compact plan generated from your current progress.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-md border border-border/70 bg-background/32 p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
                <Target className="size-4" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today&apos;s Focus</p>
                <p className="font-medium text-foreground">{planner.summary.todaysFocus}</p>
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              {timeEstimationService.formatMinutes(planner.summary.remainingStudyTimeMinutes)} remaining
              across the current semester.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {planner.schedule.daily.slice(0, 4).map((task) => (
              <Link
                key={task.id}
                href={task.href ?? "/planner"}
                className="rounded-md border border-border/70 bg-background/32 p-4 transition-colors hover:border-primary/45"
              >
                <p className="truncate text-sm font-medium text-foreground">{task.title}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {task.subject} / {task.estimatedMinutes}m
                </p>
              </Link>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
