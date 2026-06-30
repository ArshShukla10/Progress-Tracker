import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { timeEstimationService } from "@/services/planner/time-estimation-service";
import type { SubjectTimeEstimate } from "@/types/planner";

export function RemainingTimePanel({ estimates }: { estimates: SubjectTimeEstimate[] }) {
  const maxMinutes = Math.max(...estimates.map((estimate) => estimate.remainingMinutes), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Remaining Study Time</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {estimates.map((estimate) => (
          <div key={estimate.subjectId}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium text-foreground">{estimate.subject}</span>
              <span className="text-muted-foreground">
                {timeEstimationService.formatMinutes(estimate.remainingMinutes)}
              </span>
            </div>
            <Progress value={Math.round((estimate.remainingMinutes / maxMinutes) * 100)} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
