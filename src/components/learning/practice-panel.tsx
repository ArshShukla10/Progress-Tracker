import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LearningStatus, LearningWorkspaceState, Module } from "@/types/academic";

type PracticePanelProps = {
  module: Module;
  state: LearningWorkspaceState;
  onPracticeStatusChange: (practiceId: string, status: LearningStatus) => void;
};

const practiceLabels = {
  "practice-question": "Practice Question",
  "previous-year-question": "Previous Year Question",
  "coding-practice": "Coding Practice",
};

export function PracticePanel({ module, state, onPracticeStatusChange }: PracticePanelProps) {
  const practice = module.practice ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Practice</CardTitle>
      </CardHeader>
      <CardContent>
        {practice.length === 0 ? (
          <p className="rounded-md border border-border/70 bg-background/32 p-4 text-sm text-muted-foreground">
            Practice questions, previous year questions, and coding practice can be added here.
          </p>
        ) : null}
        <div className="space-y-3">
          {practice.map((item) => (
            <div key={item.id} className="rounded-md border border-border/70 bg-background/32 p-4">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{practiceLabels[item.type]}</p>
                </div>
                <select
                  value={state.practice[item.id]?.status ?? item.status}
                  onChange={(event) =>
                    onPracticeStatusChange(item.id, event.target.value as LearningStatus)
                  }
                  className="h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground"
                >
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="revised">Revised</option>
                  <option value="mastered">Mastered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
