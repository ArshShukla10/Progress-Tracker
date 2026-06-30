import { Target } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { ChallengeProgress } from "@/types/gamification";

export function WeeklyChallengeCard({ challenge }: { challenge: ChallengeProgress }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Challenge</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
            <Target className="size-5" />
          </div>
          <div>
            <p className="font-medium text-foreground">{challenge.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Reward: {challenge.rewardXp} XP
            </p>
          </div>
        </div>
        <div className="mt-5">
          <div className="mb-2 flex justify-between text-sm text-muted-foreground">
            <span>{challenge.current} complete</span>
            <span>{challenge.target} target</span>
          </div>
          <Progress value={challenge.progressPercentage} />
        </div>
      </CardContent>
    </Card>
  );
}
