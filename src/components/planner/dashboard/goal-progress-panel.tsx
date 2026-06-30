import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { PlannerGoal } from "@/types/planner";

export function GoalProgressPanel({ goals }: { goals: PlannerGoal[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Goal Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id}>
            <div className="mb-2 flex justify-between gap-3 text-sm">
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
