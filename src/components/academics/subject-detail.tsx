import { ModuleCard } from "@/components/academics/module-card";
import { SectionHeader } from "@/components/academics/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { SubjectView } from "@/types/academic";

type SubjectDetailProps = {
  view: SubjectView;
};

export function SubjectDetail({ view }: SubjectDetailProps) {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <SectionHeader
        eyebrow={view.semester.title}
        title={view.subject.name}
        description="Module-level progress with expandable topics and subtopics."
      />
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">Subject progress</span>
            <span className="text-sm font-medium text-foreground">{view.progress.percentage}%</span>
          </div>
          <Progress value={view.progress.percentage} className="mt-4" />
        </CardContent>
      </Card>
      <div className="space-y-5">
        {view.modules.length === 0 ? (
          <div className="rounded-lg border border-border/80 bg-card/72 p-6 text-sm text-muted-foreground shadow-shell">
            This topic has not been added yet.
          </div>
        ) : (
          view.modules.map((subjectModule, index) => (
            <ModuleCard key={subjectModule.id} module={subjectModule} index={index} />
          ))
        )}
      </div>
    </section>
  );
}
