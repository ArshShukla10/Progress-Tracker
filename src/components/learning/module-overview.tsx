import { ContinueLearningButton } from "@/components/academics/continue-learning-button";
import { DifficultyBadge } from "@/components/learning/difficulty-badge";
import { PriorityBadge } from "@/components/learning/priority-badge";
import { ProgressRing } from "@/components/learning/progress-ring";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ModuleWorkspaceView } from "@/types/academic";

type ModuleOverviewProps = {
  view: ModuleWorkspaceView;
  moduleCompletion: number;
};

function formatMinutes(minutes?: number) {
  if (!minutes) {
    return "Not specified";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes} min`;
  }

  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

export function ModuleOverview({ view, moduleCompletion }: ModuleOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div>
            <p className="text-sm font-medium text-primary">{view.subject.name}</p>
            <CardTitle className="mt-3 text-3xl leading-tight">{view.module.title}</CardTitle>
            {view.module.description ? (
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                {view.module.description}
              </p>
            ) : null}
          </div>
          <ProgressRing value={moduleCompletion} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <OverviewMetric label="Estimated Study Time" value={formatMinutes(view.module.estimatedStudyTimeMinutes)} />
          <OverviewMetric label="Marks Weightage" value={view.module.marksWeightage ?? "Not specified"} />
          <OverviewMetric label="Topics Count" value={String(view.module.topics.length)} />
          <OverviewMetric
            label="Module Progress"
            value={`${view.moduleProgress.completedTopics} / ${view.moduleProgress.totalTopics} topics`}
          />
          <div className="rounded-md border border-border/70 bg-background/32 p-4">
            <p className="text-xs text-muted-foreground">Difficulty</p>
            <div className="mt-3">
              <DifficultyBadge difficulty={view.module.difficulty} />
            </div>
          </div>
          <div className="rounded-md border border-border/70 bg-background/32 p-4 sm:col-span-2 xl:col-span-1">
            <p className="text-xs text-muted-foreground">Priority</p>
            <div className="mt-3">
              <PriorityBadge priority={view.module.priority} />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <ContinueLearningButton target={{ href: "#topics", label: "Continue Learning" }} />
        </div>
      </CardContent>
    </Card>
  );
}

function OverviewMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border/70 bg-background/32 p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-3 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
