"use client";

import { motion } from "framer-motion";
import {
  ArrowUp,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDotDashed,
  Clock3,
  FileQuestion,
  FileText,
  Flame,
  Layers,
  MessageSquareText,
  MoreHorizontal,
  PenLine,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { analyticsService } from "@/services/analytics/analytics-service";
import { gamificationService } from "@/services/gamification/gamification-service";
import { learningService } from "@/services/learning/learning-service";
import { plannerService } from "@/services/planner/planner-service";
import type { AnalyticsProgressItem } from "@/types/analytics";
import type { PlannerDashboardData } from "@/types/planner";

const quickActions = [
  { label: "Ask AI", href: "/knowledge", icon: Sparkles, color: "text-[#7C3AED]" },
  { label: "Create Note", href: "/knowledge", icon: PenLine, color: "text-[#22C55E]" },
  { label: "Solve PYQs", href: "/knowledge", icon: FileQuestion, color: "text-[#3B82F6]" },
  { label: "Flashcards", href: "/knowledge", icon: Layers, color: "text-[#F59E0B]" },
  { label: "Revision Queue", href: "/knowledge", icon: FileText, color: "text-[#EF4444]" },
  { label: "Interview Prep", href: "/knowledge", icon: MessageSquareText, color: "text-[#7C3AED]" },
];

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

function getMetricValue(metrics: ReturnType<typeof analyticsService.getDashboardData>["metrics"], id: string) {
  return metrics.find((metric) => metric.id === id)?.value ?? "0";
}

export function HomeDashboard() {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const analytics = useMemo(() => analyticsService.getDashboardData(), []);
  const gamification = useMemo(() => gamificationService.getDashboardData(analytics), [analytics]);
  const planner = useMemo(() => plannerService.getDashboardData(analytics), [analytics]);
  const learningStats = useMemo(() => learningService.getStats(), []);
  const greeting = useMemo(() => getGreeting(), []);
  const todaysTasks = planner.schedule.daily.slice(0, 4);
  const tasksDone = completedTasks.length;

  function toggleTask(taskId: string) {
    setCompletedTasks((currentTasks) =>
      currentTasks.includes(taskId)
        ? currentTasks.filter((id) => id !== taskId)
        : [...currentTasks, taskId],
    );
  }

  return (
    <motion.section
      className="mx-auto flex w-full max-w-[1400px] flex-col gap-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[32px] font-semibold tracking-[-0.02em] text-foreground md:text-[34px]">
            {greeting}, Arsh 👋
          </h1>
          <p className="mt-2 text-[15px] text-muted-foreground">
            Stay consistent. Progress today, success tomorrow.
          </p>
        </div>
        <button
          type="button"
          className="mt-1 hidden size-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:flex"
          aria-label="Dashboard options"
        >
          <MoreHorizontal className="size-5" />
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          icon={CircleDotDashed}
          iconClassName="bg-[#F3E8FF] text-[#7C3AED]"
          label="Study Streak"
          value={`${gamification.streak.currentStreak} days`}
          trend="2 days"
          trendClassName="bg-[#F3E8FF] text-[#7C3AED]"
        />
        <MetricCard
          icon={Zap}
          iconClassName="bg-[#DCFCE7] text-[#22C55E]"
          label="XP Today"
          value={`${gamification.xp}`}
          suffix="XP"
          trend="18%"
          trendClassName="bg-[#DCFCE7] text-[#16A34A]"
        />
        <MetricCard
          icon={Flame}
          iconClassName="bg-[#FFF7ED] text-[#F97316]"
          label="Level"
          value={`Level ${gamification.level.currentLevel.level}`}
          detail={`${gamification.xp.toLocaleString()} / ${gamification.level.nextLevel?.minimumXp.toLocaleString() ?? gamification.xp.toLocaleString()} XP`}
          progress={gamification.level.progressPercentage}
        />
        <MetricCard
          icon={Clock3}
          iconClassName="bg-[#DBEAFE] text-[#3B82F6]"
          label="Study Time"
          value={getMetricValue(analytics.metrics, "study-time")}
          trend="12% vs yesterday"
          trendClassName="bg-[#DBEAFE] text-[#2563EB]"
        />
        <MetricCard
          icon={CheckCircle2}
          iconClassName="bg-[#FFE4E6] text-[#EF4444]"
          label="Tasks Done"
          value={`${tasksDone} / ${Math.max(todaysTasks.length, 1)}`}
          trend="64%"
          trendClassName="bg-[#FFE4E6] text-[#E11D48]"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.08fr_1fr_1fr]">
        <TodaysPlanCard
          planner={planner}
          completedTasks={completedTasks}
          onToggleTask={toggleTask}
        />
        <UpcomingCard planner={planner} learningStats={learningStats} />
        <AiSuggestionsCard analytics={analytics} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.08fr_1fr_1fr]">
        <RecentSubjectsCard subjects={analytics.subjectProgress} />
        <LearningProgressCard />
        <QuickActionsCard />
      </div>
    </motion.section>
  );
}

type MetricCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  iconClassName: string;
  label: string;
  value: string;
  suffix?: string;
  detail?: string;
  trend?: string;
  trendClassName?: string;
  progress?: number;
};

function MetricCard({
  icon: Icon,
  iconClassName,
  label,
  value,
  suffix,
  detail,
  trend,
  trendClassName,
  progress,
}: MetricCardProps) {
  return (
    <Card className="min-h-[145px]">
      <CardContent className="flex h-full flex-col justify-between p-5">
        <div className="flex items-start gap-4">
          <div className={`flex size-11 shrink-0 items-center justify-center rounded-full ${iconClassName}`}>
            <Icon className="size-5" />
          </div>
          <div>
            <p className="text-[13px] font-medium text-muted-foreground">{label}</p>
            <p className="mt-2 text-[24px] font-semibold tracking-[-0.02em] text-foreground">
              {value}
              {suffix ? <span className="ml-1 text-[13px] text-muted-foreground">{suffix}</span> : null}
            </p>
          </div>
        </div>
        {detail ? <p className="mt-4 text-[13px] text-muted-foreground">{detail}</p> : null}
        {typeof progress === "number" ? <Progress value={progress} className="mt-2 h-1.5" /> : null}
        {trend ? (
          <div className={`mt-4 inline-flex w-fit items-center gap-1 rounded-lg px-2 py-1 text-[12px] font-medium ${trendClassName}`}>
            <ArrowUp className="size-3" />
            {trend}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function TodaysPlanCard({
  planner,
  completedTasks,
  onToggleTask,
}: {
  planner: PlannerDashboardData;
  completedTasks: string[];
  onToggleTask: (taskId: string) => void;
}) {
  const colors = ["bg-[#7C3AED]", "bg-[#3B82F6]", "bg-[#F59E0B]", "bg-[#22C55E]"];

  return (
    <Card className="min-h-[330px]">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-3">
          <CalendarDays className="size-5 text-foreground" />
          <CardTitle>Today&apos;s Plan</CardTitle>
        </div>
        <Link href="/planner" className="text-[13px] font-medium text-[#2563EB]">
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-0 pl-6 before:absolute before:left-[8px] before:top-3 before:h-[calc(100%-20px)] before:w-px before:bg-border">
          {planner.schedule.daily.slice(0, 4).map((task, index) => {
            const checked = completedTasks.includes(task.id);

            return (
              <div key={task.id} className="relative grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-border py-4 last:border-b-0">
                <span className={`absolute -left-[22px] top-5 size-3 rounded-full border-2 border-background ${colors[index % colors.length]}`} />
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold text-foreground">{task.title}</p>
                  <p className="mt-1 truncate text-[12px] text-muted-foreground">
                    {task.module ?? task.subject} • {task.reason}
                  </p>
                </div>
                <p className="hidden text-[12px] text-muted-foreground md:block">
                  {task.estimatedMinutes}m
                </p>
                <Checkbox checked={checked} onChange={() => onToggleTask(task.id)} />
              </div>
            );
          })}
        </div>
        <button type="button" className="mt-3 text-[13px] text-muted-foreground hover:text-foreground">
          + Add task
        </button>
      </CardContent>
    </Card>
  );
}

function UpcomingCard({
  planner,
  learningStats,
}: {
  planner: PlannerDashboardData;
  learningStats: ReturnType<typeof learningService.getStats>;
}) {
  const items = [
    {
      icon: Flame,
      title: planner.summary.upcomingRevision,
      subtitle: "Revision",
      meta: `${learningStats.revisionDue} due`,
      color: "bg-[#FFF7ED] text-[#F59E0B]",
    },
    {
      icon: FileText,
      title: "Notes Review",
      subtitle: "Learning",
      meta: `${learningStats.notesCount} notes`,
      color: "bg-[#DCFCE7] text-[#22C55E]",
    },
    {
      icon: BookOpen,
      title: planner.summary.suggestedNextTopic,
      subtitle: "Quick Revision",
      meta: "Today",
      color: "bg-[#DBEAFE] text-[#3B82F6]",
    },
    {
      icon: CalendarDays,
      title: "Weekly Planning",
      subtitle: "Planner",
      meta: `${planner.summary.weeklyProgress}%`,
      color: "bg-[#FFF7ED] text-[#F59E0B]",
    },
  ];

  return (
    <Card className="min-h-[330px]">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Upcoming</CardTitle>
        <Link href="/planner" className="text-[13px] font-medium text-[#2563EB]">
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-6 text-[13px]">
          <span className="border-b-2 border-primary pb-2 font-medium text-primary">Revision</span>
          <span className="pb-2 text-muted-foreground">Deadlines</span>
          <span className="pb-2 text-muted-foreground">Events</span>
        </div>
        <div className="divide-y divide-border">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 py-3">
                <div className={`flex size-9 items-center justify-center rounded-lg ${item.color}`}>
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 truncate text-[12px] text-muted-foreground">{item.subtitle}</p>
                </div>
                <p className="text-right text-[13px] text-muted-foreground">{item.meta}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function AiSuggestionsCard({ analytics }: { analytics: ReturnType<typeof analyticsService.getDashboardData> }) {
  const suggestions = [
    {
      icon: Target,
      title: `You're weak in ${analytics.insights.weakestSubject}. Want to revise?`,
      subtitle: "Based on your recent performance.",
      color: "bg-[#DCFCE7] text-[#22C55E]",
    },
    {
      icon: FileQuestion,
      title: "Practice pending PYQs",
      subtitle: "High weightage practice belongs here.",
      color: "bg-[#DBEAFE] text-[#3B82F6]",
    },
    {
      icon: Clock3,
      title: "Interview prep streak is low",
      subtitle: "Keep it going with a focused session.",
      color: "bg-[#FEF3C7] text-[#F59E0B]",
    },
  ];

  return (
    <Card className="min-h-[330px]">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>AI Suggestions</CardTitle>
        <Link href="/knowledge" className="text-[13px] font-medium text-[#2563EB]">
          View all
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map((suggestion) => {
          const Icon = suggestion.icon;

          return (
            <Link
              key={suggestion.title}
              href="/knowledge"
              className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 rounded-xl border border-border bg-background p-4 transition-colors hover:bg-secondary/60"
            >
              <div className={`flex size-11 items-center justify-center rounded-full ${suggestion.color}`}>
                <Icon className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[14px] font-semibold text-foreground">{suggestion.title}</p>
                <p className="mt-1 truncate text-[12px] text-muted-foreground">{suggestion.subtitle}</p>
              </div>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}

function RecentSubjectsCard({ subjects }: { subjects: AnalyticsProgressItem[] }) {
  const subjectColors = ["bg-[#7C3AED]", "bg-[#3B82F6]", "bg-[#22C55E]"];

  return (
    <Card className="min-h-[255px]">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Recent Subjects</CardTitle>
        <Link href="/academics" className="text-[13px] font-medium text-[#2563EB]">
          View all
        </Link>
      </CardHeader>
      <CardContent className="space-y-5">
        {subjects.slice(0, 3).map((subject, index) => (
          <div key={subject.id} className="grid grid-cols-[2rem_1fr_auto] items-center gap-4">
            <div className="flex size-8 items-center justify-center rounded-lg bg-secondary text-[#7C3AED]">
              <BookOpen className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[14px] font-medium text-foreground">{subject.label}</p>
            </div>
            <div className="flex w-40 items-center gap-3">
              <div className="h-1.5 flex-1 rounded-full bg-secondary">
                <div
                  className={`h-full rounded-full ${subjectColors[index % subjectColors.length]}`}
                  style={{ width: `${subject.percentage}%` }}
                />
              </div>
              <span className="w-8 text-right text-[12px] text-muted-foreground">
                {subject.percentage}%
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function LearningProgressCard() {
  const points = [
    [0, 88],
    [16, 80],
    [34, 62],
    [48, 56],
    [62, 42],
    [78, 28],
    [94, 22],
  ];
  const path = points.map(([x, y]) => `${x},${y}`).join(" ");

  return (
    <Card className="min-h-[255px]">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Learning Progress</CardTitle>
        <button type="button" className="text-[13px] text-muted-foreground">
          This Week⌄
        </button>
      </CardHeader>
      <CardContent>
        <div className="h-[160px] rounded-xl bg-background">
          <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
            {[20, 40, 60, 80].map((line) => (
              <line
                key={line}
                x1="0"
                x2="100"
                y1={line}
                y2={line}
                stroke="#E5E7EB"
                strokeDasharray="2 3"
                strokeWidth="0.6"
              />
            ))}
            <polygon points={`0,100 ${path} 100,100`} fill="rgba(124, 58, 237, 0.08)" />
            <polyline
              fill="none"
              points={path}
              stroke="#7C3AED"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
            />
            {points.map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" fill="#7C3AED" />
            ))}
          </svg>
        </div>
        <div className="grid grid-cols-7 text-center text-[12px] text-muted-foreground">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActionsCard() {
  return (
    <Card className="min-h-[255px]">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex h-[76px] flex-col items-center justify-center gap-2 rounded-xl border border-border bg-background text-center text-[13px] font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <Icon className={`size-5 ${action.color}`} />
                {action.label}
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
