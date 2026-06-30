import type { LevelDefinition, LevelProgress } from "@/types/gamification";

export const levelDefinitions: LevelDefinition[] = [
  { level: 1, title: "Foundation", minimumXp: 0 },
  { level: 2, title: "Builder", minimumXp: 500 },
  { level: 3, title: "Explorer", minimumXp: 1200 },
  { level: 4, title: "Specialist", minimumXp: 2200 },
  { level: 5, title: "Scholar", minimumXp: 3600 },
  { level: 6, title: "Operator", minimumXp: 5400 },
  { level: 7, title: "Strategist", minimumXp: 7600 },
  { level: 8, title: "Mastery Track", minimumXp: 10000 },
];

function calculateLevel(currentXp: number): LevelProgress {
  const currentLevel =
    [...levelDefinitions].reverse().find((level) => currentXp >= level.minimumXp) ??
    levelDefinitions[0];
  const nextLevel =
    levelDefinitions.find((level) => level.minimumXp > currentXp) ?? null;
  const xpIntoLevel = currentXp - currentLevel.minimumXp;
  const xpNeededForNextLevel = nextLevel ? nextLevel.minimumXp - currentLevel.minimumXp : 0;

  return {
    currentLevel,
    nextLevel,
    currentXp,
    xpIntoLevel,
    xpNeededForNextLevel,
    progressPercentage:
      nextLevel && xpNeededForNextLevel > 0
        ? Math.round((xpIntoLevel / xpNeededForNextLevel) * 100)
        : 100,
  };
}

export const levelService = {
  levelDefinitions,
  calculateLevel,
};
