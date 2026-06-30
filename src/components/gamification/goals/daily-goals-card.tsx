import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { GoalProgress } from "@/types/gamification";

export function DailyGoalsCard({ goals }: { goals: GoalProgress[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Goals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id}>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-foreground">{goal.title}</span>
              <span className="text-muted-foreground">
                {goal.current}/{goal.target}
              </span>
            </div>
            <Progress value={goal.progressPercentage} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
