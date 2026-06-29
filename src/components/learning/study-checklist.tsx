import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Module } from "@/types/academic";

type StudyChecklistProps = {
  module: Module;
};

export function StudyChecklist({ module }: StudyChecklistProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Checklist</CardTitle>
      </CardHeader>
      <CardContent>
        {module.topics.length === 0 ? (
          <p className="rounded-md border border-border/70 bg-background/32 p-4 text-sm text-muted-foreground">
            This topic has not been added yet.
          </p>
        ) : (
          <div className="space-y-3">
            {module.topics.map((topic) => (
            <div key={topic.id} className="rounded-md border border-border/70 bg-background/32 p-4">
              <p className="text-sm font-medium text-foreground">{topic.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {topic.subtopics.length} subtopics in this topic
              </p>
            </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
