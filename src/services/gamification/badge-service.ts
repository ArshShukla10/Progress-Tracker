import type { Achievement, Badge } from "@/types/gamification";

function getBadges(achievements: Achievement[]): Badge[] {
  return achievements.map((achievement) => ({
    id: `${achievement.id}-badge`,
    label: achievement.title,
    tier: achievement.badgeTier,
    description: achievement.description,
    unlocked: achievement.unlocked,
  }));
}

function getRecentBadges(achievements: Achievement[], count = 4) {
  return getBadges(achievements)
    .filter((badge) => badge.unlocked)
    .slice(0, count);
}

export const badgeService = {
  getBadges,
  getRecentBadges,
};
