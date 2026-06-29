import { SectionHeader } from "@/components/academics/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { SkillView } from "@/types/academic";

type SkillDetailProps = {
  view: SkillView;
};

export function SkillDetail({ view }: SkillDetailProps) {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <SectionHeader
        eyebrow="Skills"
        title={view.skill.name}
        description={view.skill.description ?? "Long-term learning workspace."}
      />
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">Skill progress</span>
            <span className="text-sm font-medium text-foreground">{view.progress.percentage}%</span>
          </div>
          <Progress value={view.progress.percentage} className="mt-4" />
        </CardContent>
      </Card>
      <div className="rounded-lg border border-border/80 bg-card/72 p-6 text-sm text-muted-foreground shadow-shell">
        Skill modules will appear here when DSA content is added.
      </div>
    </section>
  );
}
