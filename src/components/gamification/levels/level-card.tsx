import { Award } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GamificationDashboardData } from "@/types/gamification";

export function LevelCard({ gamification }: { gamification: GamificationDashboardData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Level</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <div className="flex size-16 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
          <Award className="size-7" />
        </div>
        <div>
          <p className="text-3xl font-semibold text-foreground">
            Level {gamification.level.currentLevel.level}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {gamification.level.currentLevel.title}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
