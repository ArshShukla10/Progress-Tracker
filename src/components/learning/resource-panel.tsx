import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Module } from "@/types/academic";

type ResourcePanelProps = {
  module: Module;
};

export function ResourcePanel({ module }: ResourcePanelProps) {
  const resources = module.topics.flatMap((topic) =>
    topic.subtopics.flatMap((subtopic) =>
      subtopic.resources.map((resource) => ({
        ...resource,
        topicTitle: topic.title,
        subtopicTitle: subtopic.title,
      })),
    ),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resources</CardTitle>
      </CardHeader>
      <CardContent>
        {resources.length === 0 ? (
          <p className="rounded-md border border-border/70 bg-background/32 p-4 text-sm text-muted-foreground">
            Books, videos, PDFs, and links can be attached through the Academic Engine.
          </p>
        ) : null}
        <div className="space-y-3">
          {resources.map((resource) => (
            <div key={resource.id} className="rounded-md border border-border/70 bg-background/32 p-4">
              <p className="text-sm font-medium text-foreground">{resource.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {resource.type} • {resource.topicTitle} • {resource.subtopicTitle}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
