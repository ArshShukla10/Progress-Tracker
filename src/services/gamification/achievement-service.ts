import type { AnalyticsDashboardData } from "@/types/analytics";
import type { Achievement, AchievementDefinition } from "@/types/gamification";

export const achievementDefinitions: AchievementDefinition[] = [
  {
    id: "first-topic",
    title: "First Topic",
    description: "Complete your first academic topic.",
    category: "academic",
    badgeTier: "bronze",
    isUnlocked: (analytics) => analytics.metrics.find((metric) => metric.id === "topics-completed")?.value !== "0",
  },
  {
    id: "first-module",
    title: "First Module",
    description: "Complete your first module.",
    category: "academic",
    badgeTier: "bronze",
    isUnlocked: (analytics) => analytics.metrics.find((metric) => metric.id === "modules-completed")?.value !== "0",
  },
  {
    id: "semester-explorer",
    title: "Semester Explorer",
    description: "Reach 25% progress in the current semester.",
    category: "academic",
    badgeTier: "silver",
    isUnlocked: (analytics) => analytics.currentSemesterProgress >= 25,
  },
  {
    id: "java-explorer",
    title: "Java Explorer",
    description: "Make visible progress in Java Programming.",
    category: "academic",
    badgeTier: "silver",
    isUnlocked: (analytics) =>
      (analytics.subjectProgress.find((subject) => subject.label.includes("Java"))?.percentage ?? 0) > 0,
  },
  {
    id: "cloud-explorer",
    title: "Cloud Explorer",
    description: "Make visible progress in Cloud Computing.",
    category: "academic",
    badgeTier: "silver",
    isUnlocked: (analytics) =>
      (analytics.subjectProgress.find((subject) => subject.label.includes("Cloud"))?.percentage ?? 0) > 0,
  },
  {
    id: "dsa-beginner",
    title: "DSA Beginner",
    description: "Begin long-term DSA practice.",
    category: "skill",
    badgeTier: "bronze",
    isUnlocked: (analytics) =>
      (analytics.skillProgress.find((skill) => skill.label === "DSA")?.percentage ?? 0) > 0,
  },
  {
    id: "ai-explorer",
    title: "AI Explorer",
    description: "AI learning activity is ready to be tracked.",
    category: "ai",
    badgeTier: "bronze",
    isUnlocked: () => false,
  },
  {
    id: "seven-day-streak",
    title: "7 Day Streak",
    description: "Study for seven days in a row.",
    category: "streak",
    badgeTier: "gold",
    isUnlocked: (analytics) => analytics.insights.currentStreak >= 7,
  },
  {
    id: "thirty-day-streak",
    title: "30 Day Streak",
    description: "Study for thirty days in a row.",
    category: "streak",
    badgeTier: "diamond",
    isUnlocked: (analytics) => analytics.insights.currentStreak >= 30,
  },
  {
    id: "xp-1000",
    title: "1000 XP",
    description: "Earn your first 1000 XP.",
    category: "xp",
    badgeTier: "silver",
    isUnlocked: (_analytics, xp) => xp >= 1000,
  },
  {
    id: "xp-5000",
    title: "5000 XP",
    description: "Reach 5000 XP.",
    category: "xp",
    badgeTier: "gold",
    isUnlocked: (_analytics, xp) => xp >= 5000,
  },
  {
    id: "topics-100",
    title: "100 Topics Completed",
    description: "Complete 100 topics across NEXUS.",
    category: "academic",
    badgeTier: "diamond",
    isUnlocked: (analytics) =>
      Number(analytics.metrics.find((metric) => metric.id === "topics-completed")?.value ?? 0) >= 100,
  },
];

function getAchievements(analytics: AnalyticsDashboardData, xp: number): Achievement[] {
  return achievementDefinitions.map((achievement) => ({
    id: achievement.id,
    title: achievement.title,
    description: achievement.description,
    category: achievement.category,
    badgeTier: achievement.badgeTier,
    unlocked: achievement.isUnlocked(analytics, xp),
  }));
}

export const achievementService = {
  achievementDefinitions,
  getAchievements,
};
