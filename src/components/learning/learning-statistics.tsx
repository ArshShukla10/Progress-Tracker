import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LearningStatistics as LearningStatisticsType } from "@/types/academic";

type LearningStatisticsProps = {
  statistics: LearningStatisticsType;
};

function formatMinutes(minutes: number) {
  if (minutes <= 0) {
    return "0 min";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return hours > 0 ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes} min`;
}

export function LearningStatistics({ statistics }: LearningStatisticsProps) {
  const items = [
    ["Topics Completed", String(statistics.topicsCompleted)],
    ["Topics Remaining", String(statistics.topicsRemaining)],
    ["Module Completion", `${statistics.moduleCompletion}%`],
    ["Subject Completion", `${statistics.subjectCompletion}%`],
    ["Semester Completion", `${statistics.semesterCompletion}%`],
    ["Remaining Study Time", formatMinutes(statistics.estimatedRemainingStudyTimeMinutes)],
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {items.map(([label, value]) => (
            <div key={label} className="rounded-md border border-border/70 bg-background/32 p-4">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="mt-2 text-xl font-semibold text-foreground">{value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
