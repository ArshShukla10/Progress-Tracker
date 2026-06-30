import type { Achievement, Badge, ChallengeProgress, GoalProgress, Reward } from "@/types/gamification";

function getRewards({
  achievements,
  badges,
  goals,
  weeklyChallenge,
}: {
  achievements: Achievement[];
  badges: Badge[];
  goals: GoalProgress[];
  weeklyChallenge: ChallengeProgress;
}): Reward[] {
  const goalRewards: Reward[] = goals
    .filter((goal) => goal.completed)
    .map((goal) => ({ type: "xp", value: goal.rewardXp, label: goal.title }));
  const challengeRewards: Reward[] = weeklyChallenge.completed
    ? [{ type: "xp", value: weeklyChallenge.rewardXp, label: weeklyChallenge.title }]
    : [];
  const achievementRewards: Reward[] = achievements
    .filter((achievement) => achievement.unlocked)
    .map((achievement) => ({ type: "achievement", achievement }));
  const badgeRewards: Reward[] = badges
    .filter((badge) => badge.unlocked)
    .map((badge) => ({ type: "badge", badge }));

  return [...goalRewards, ...challengeRewards, ...achievementRewards, ...badgeRewards];
}

export const rewardService = {
  getRewards,
};
