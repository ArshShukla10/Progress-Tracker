import type { GamificationAiContext } from "@/types/gamification";

export type PlannerTaskStatus = "pending" | "in-progress" | "completed" | "skipped" | "rescheduled";

export type PlannerPriority = "low" | "medium" | "high" | "urgent";

export type PlannerViewMode = "daily" | "weekly" | "monthly";

export type StudySessionLength = 25 | 45 | 60 | 90 | 120;

export type PlannerTaskSource =
  | "academic"
  | "skill"
  | "revision"
  | "quiz"
  | "pyq"
  | "flashcards"
  | "interview"
  | "notes";

export type PlannerTask = {
  id: string;
  title: string;
  source: PlannerTaskSource;
  subject?: string;
  subjectId?: string;
  module?: string;
  moduleId?: string;
  topic?: string;
  topicId?: string;
  skill?: string;
  estimatedMinutes: number;
  priority: PlannerPriority;
  status: PlannerTaskStatus;
  href?: string;
  reason: string;
};

export type PlannerTaskState = {
  status: PlannerTaskStatus;
  updatedAt: string;
};

export type PlannerCalendarDayStatus = "completed" | "planned" | "missed" | "today" | "empty";

export type PlannerCalendarDay = {
  date: string;
  label: string;
  dayNumber: number;
  status: PlannerCalendarDayStatus;
  tasksCount: number;
};

export type PlannerSchedule = {
  daily: PlannerTask[];
  weekly: PlannerTask[];
  monthly: PlannerTask[];
  upcomingSessions: StudySession[];
  timeline: StudyTimelineItem[];
};

export type StudySession = {
  id: string;
  label: string;
  taskId: string;
  startsAt: string;
  durationMinutes: StudySessionLength;
};

export type StudyTimelineItem = {
  id: string;
  time: string;
  title: string;
  description: string;
  status: PlannerTaskStatus;
};

export type PlannerGoal = {
  id: string;
  title: string;
  cadence: PlannerViewMode | "semester";
  target: number;
  current: number;
  progressPercentage: number;
};

export type PlannerRecommendation = {
  id: string;
  title: string;
  description: string;
  taskId?: string;
  priority: PlannerPriority;
};

export type SubjectTimeEstimate = {
  subjectId: string;
  subject: string;
  remainingMinutes: number;
};

export type PlannerDashboardData = {
  generatedAt: string;
  tasks: PlannerTask[];
  priorityQueue: PlannerTask[];
  schedule: PlannerSchedule;
  calendar: PlannerCalendarDay[];
  goals: {
    today: PlannerGoal[];
    weekly: PlannerGoal[];
    monthly: PlannerGoal[];
    semester: PlannerGoal[];
  };
  recommendations: PlannerRecommendation[];
  timeEstimates: SubjectTimeEstimate[];
  summary: {
    todaysFocus: string;
    suggestedNextTopic: string;
    upcomingRevision: string;
    weeklyProgress: number;
    currentGoalProgress: number;
    remainingStudyTimeMinutes: number;
  };
};

export type PlannerAiContext = {
  currentPlan: PlannerTask[];
  upcomingTasks: PlannerTask[];
  priorityQueue: PlannerTask[];
  goals: PlannerDashboardData["goals"];
  studyTime: SubjectTimeEstimate[];
  recommendations: PlannerRecommendation[];
  gamification: GamificationAiContext;
};
