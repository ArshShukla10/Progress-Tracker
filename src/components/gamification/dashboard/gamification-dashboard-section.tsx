import { AchievementList } from "@/components/gamification/achievements/achievement-list";
import { BadgeStrip } from "@/components/gamification/badges/badge-strip";
import { DailyGoalsCard } from "@/components/gamification/goals/daily-goals-card";
import { LearningProgressCard } from "@/components/gamification/dashboard/learning-progress-card";
import { WeeklyChallengeCard } from "@/components/gamification/dashboard/weekly-challenge-card";
import { LevelCard } from "@/components/gamification/levels/level-card";
import { StreakCard } from "@/components/gamification/streak/streak-card";
import { XpProgressCard } from "@/components/gamification/xp/xp-progress-card";
import type { GamificationDashboardData } from "@/types/gamification";

export function GamificationDashboardSection({
  gamification,
}: {
  gamification: GamificationDashboardData;
}) {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Gamification
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-normal text-foreground">
          Momentum System
        </h2>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <LevelCard gamification={gamification} />
        <XpProgressCard gamification={gamification} />
        <StreakCard streak={gamification.streak} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <DailyGoalsCard goals={gamification.dailyGoals} />
        <WeeklyChallengeCard challenge={gamification.weeklyChallenge} />
      </div>
      <LearningProgressCard gamification={gamification} />
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AchievementList achievements={gamification.achievements} />
        <BadgeStrip badges={gamification.badges} />
      </div>
    </section>
  );
}
