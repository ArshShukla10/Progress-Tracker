import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { GamificationDashboardData } from "@/types/gamification";

export function LearningProgressCard({
  gamification,
}: {
  gamification: GamificationDashboardData;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium text-foreground">Overall Completion</span>
            <span className="text-muted-foreground">{gamification.learningProgress.overallCompletion}%</span>
          </div>
          <Progress value={gamification.learningProgress.overallCompletion} />
        </div>
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium text-foreground">Current Semester</span>
            <span className="text-muted-foreground">
              {gamification.learningProgress.currentSemesterProgress}%
            </span>
          </div>
          <Progress value={gamification.learningProgress.currentSemesterProgress} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-md border border-border/70 bg-background/32 p-4">
            <p className="text-xs text-muted-foreground">Strongest</p>
            <p className="mt-2 text-sm font-medium text-foreground">
              {gamification.learningProgress.strongestSubject}
            </p>
          </div>
          <div className="rounded-md border border-border/70 bg-background/32 p-4">
            <p className="text-xs text-muted-foreground">Focus Area</p>
            <p className="mt-2 text-sm font-medium text-foreground">
              {gamification.learningProgress.weakestSubject}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
