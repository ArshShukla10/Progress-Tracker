import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { GamificationDashboardData } from "@/types/gamification";

export function XpProgressCard({ gamification }: { gamification: GamificationDashboardData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>XP Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-4xl font-semibold text-foreground">{gamification.xp}</p>
            <p className="mt-2 text-sm text-muted-foreground">Current XP</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">
              {gamification.level.nextLevel
                ? `${gamification.level.nextLevel.minimumXp - gamification.xp} XP needed`
                : "Max level"}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Level {gamification.level.currentLevel.level} / {gamification.level.currentLevel.title}
            </p>
          </div>
        </div>
        <Progress value={gamification.level.progressPercentage} className="mt-6" />
      </CardContent>
    </Card>
  );
}
