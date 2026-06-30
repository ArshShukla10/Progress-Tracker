import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StudyTimelineItem } from "@/types/planner";

export function StudyTimeline({ items }: { items: StudyTimelineItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-[4rem_1fr] gap-4">
              <p className="text-sm font-medium text-primary">{item.time}</p>
              <div className="border-l border-border pl-4">
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
