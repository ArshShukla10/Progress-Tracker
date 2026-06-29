import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Module } from "@/types/academic";

type PracticePanelProps = {
  module: Module;
};

const practiceLabels = {
  "practice-question": "Practice Question",
  "previous-year-question": "Previous Year Question",
  "coding-practice": "Coding Practice",
};

export function PracticePanel({ module }: PracticePanelProps) {
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
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{practiceLabels[item.type]}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
