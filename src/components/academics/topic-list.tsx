import { ProgressBadge } from "@/components/academics/progress-badge";
import type { Topic } from "@/types/academic";

type TopicListProps = {
  topics: Topic[];
};

export function TopicList({ topics }: TopicListProps) {
  return (
    <div className="space-y-3">
      {topics.map((topic) => (
        <div key={topic.id} className="rounded-md border border-border/70 bg-background/30 p-4">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-sm font-medium text-foreground">{topic.title}</p>
            <ProgressBadge label={topic.status} />
          </div>
          <div className="mt-4 space-y-2">
            {topic.subtopics.map((subtopic) => (
              <div
                key={subtopic.id}
                className="flex items-center justify-between gap-3 rounded-md bg-secondary/35 px-3 py-2"
              >
                <span className="text-sm text-muted-foreground">{subtopic.title}</span>
                <span className="text-xs font-medium text-muted-foreground">{subtopic.status}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
