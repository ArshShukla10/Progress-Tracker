import { CheckCircle2, Circle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Achievement } from "@/types/gamification";

export function AchievementList({ achievements }: { achievements: Achievement[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {achievements.slice(0, 8).map((achievement) => {
            const Icon = achievement.unlocked ? CheckCircle2 : Circle;

            return (
              <div
                key={achievement.id}
                className="rounded-md border border-border/70 bg-background/32 p-4"
              >
                <div className="flex items-start gap-3">
                  <Icon
                    className={
                      achievement.unlocked
                        ? "mt-0.5 size-4 text-primary"
                        : "mt-0.5 size-4 text-muted-foreground"
                    }
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">{achievement.title}</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
