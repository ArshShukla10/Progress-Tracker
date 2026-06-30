import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PlannerCalendarDay } from "@/types/planner";

const statusClassName: Record<PlannerCalendarDay["status"], string> = {
  completed: "border-primary/40 bg-primary/12 text-foreground",
  planned: "border-border bg-secondary/45 text-foreground",
  missed: "border-destructive/35 bg-destructive/10 text-destructive",
  today: "border-primary bg-primary/20 text-foreground",
  empty: "border-border/55 bg-background/24 text-muted-foreground",
};

export function StudyCalendar({ days }: { days: PlannerCalendarDay[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => (
            <div
              key={day.date}
              className={cn(
                "min-h-16 rounded-md border p-2 text-xs transition-colors",
                statusClassName[day.status],
              )}
            >
              <p className="font-medium">{day.dayNumber}</p>
              <p className="mt-1 text-[11px] opacity-75">{day.label}</p>
              {day.tasksCount > 0 ? <p className="mt-2 text-[11px]">{day.tasksCount} tasks</p> : null}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
