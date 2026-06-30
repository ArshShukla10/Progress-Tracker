import { Flame } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StreakSummary } from "@/types/gamification";

export function StreakCard({ streak }: { streak: StreakSummary }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Streak</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <div className="flex size-16 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
          <Flame className="size-7" />
        </div>
        <div>
          <p className="text-3xl font-semibold text-foreground">{streak.currentStreak} day</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Longest streak: {streak.longestStreak} day
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
