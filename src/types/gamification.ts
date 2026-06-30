import type { AnalyticsDashboardData } from "@/types/analytics";

export type XpEventType =
  | "complete-topic"
  | "complete-module"
  | "complete-subject"
  | "complete-skill-topic"
  | "complete-quiz"
  | "complete-revision"
  | "use-ai"
  | "maintain-streak";

export type XpConfig = Record<XpEventType, number>;

export type LevelDefinition = {
  level: number;
  title: string;
  minimumXp: number;
};

export type LevelProgress = {
  currentLevel: LevelDefinition;
  nextLevel: LevelDefinition | null;
  currentXp: number;
  xpIntoLevel: number;
  xpNeededForNextLevel: number;
  progressPercentage: number;
};

export type BadgeTier = "bronze" | "silver" | "gold" | "diamond" | "custom";

export type AchievementCategory =
  | "academic"
  | "skill"
  | "ai"
  | "streak"
  | "xp"
  | "revision"
  | "future";

export type AchievementDefinition = {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  badgeTier: BadgeTier;
  isUnlocked: (analytics: AnalyticsDashboardData, xp: number) => boolean;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  badgeTier: BadgeTier;
  unlocked: boolean;
};

export type Badge = {
  id: string;
  label: string;
  tier: BadgeTier;
  description: string;
  unlocked: boolean;
};

export type StreakSummary = {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string | null;
  missedDays: number;
};

export type GoalCadence = "daily" | "weekly";

export type GoalDefinition = {
  id: string;
  title: string;
  cadence: GoalCadence;
  target: number;
  metric: "topics" | "minutes" | "quiz" | "dsa-problems" | "revision";
  rewardXp: number;
};

export type GoalProgress = GoalDefinition & {
  current: number;
  completed: boolean;
  progressPercentage: number;
  resetsAt: string;
};

export type ChallengeDefinition = {
  id: string;
  title: string;
  target: number;
  metric: "modules" | "minutes" | "questions" | "revision";
  rewardXp: number;
};

export type ChallengeProgress = ChallengeDefinition & {
  current: number;
  completed: boolean;
  progressPercentage: number;
  endsAt: string;
};

export type Reward =
  | { type: "xp"; value: number; label: string }
  | { type: "badge"; badge: Badge }
  | { type: "achievement"; achievement: Achievement }
  | { type: "cosmetic"; id: string; label: string; unlocked: boolean };

export type GamificationDashboardData = {
  xp: number;
  xpConfig: XpConfig;
  level: LevelProgress;
  streak: StreakSummary;
  achievements: Achievement[];
  badges: Badge[];
  dailyGoals: GoalProgress[];
  weeklyChallenge: ChallengeProgress;
  rewards: Reward[];
  learningProgress: {
    overallCompletion: number;
    currentSemesterProgress: number;
    strongestSubject: string;
    weakestSubject: string;
  };
};

export type GamificationAiContext = {
  xp: number;
  level: number;
  achievementsUnlocked: number;
  streak: StreakSummary;
  goals: GoalProgress[];
  challenge: ChallengeProgress;
  weakSubjects: string[];
};
