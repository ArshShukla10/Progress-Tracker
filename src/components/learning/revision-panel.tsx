"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LearningWorkspaceState, Topic } from "@/types/academic";

type RevisionPanelProps = {
  topics: Topic[];
  state: LearningWorkspaceState;
  onMarkForRevision: (topicId: string) => void;
  onRecordRevision: (topicId: string) => void;
};

function formatDate(date: string | null | undefined) {
  if (!date) {
    return "Not scheduled";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function RevisionPanel({
  topics,
  state,
  onMarkForRevision,
  onRecordRevision,
}: RevisionPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revision</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topics.map((topic) => {
            const revision = state.topics[topic.id]?.revision;

            return (
              <div key={topic.id} className="rounded-md border border-border/70 bg-background/32 p-4">
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                  <div>
                    <p className="text-sm font-medium text-foreground">{topic.title}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Revision count: {revision?.revisionCount ?? 0} • Last revision:{" "}
                      {formatDate(revision?.lastRevisionDate)} • Next:{" "}
                      {formatDate(revision?.nextSuggestedRevision)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" variant="secondary" onClick={() => onMarkForRevision(topic.id)}>
                      Mark
                    </Button>
                    <Button type="button" onClick={() => onRecordRevision(topic.id)}>
                      Revised
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
