import { Lock } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { SkillSummary } from "@/types/academic";

type SkillCardProps = {
  skill: SkillSummary;
};

export function SkillCard({ skill }: SkillCardProps) {
  const locked = skill.status === "locked";
  const card = (
    <Card className={cn("h-full transition-colors hover:border-primary/45", locked && "opacity-70")}>
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>{skill.name}</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            {locked ? "Coming Soon" : skill.description ?? "Unlocked"}
          </p>
        </div>
        {locked ? <Lock className="size-4 text-muted-foreground" /> : null}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{locked ? "Locked" : "Unlocked"}</span>
          <span className="font-medium text-foreground">{skill.progress.percentage}%</span>
        </div>
        <Progress value={skill.progress.percentage} className="mt-4 h-2.5" />
      </CardContent>
    </Card>
  );

  if (locked) {
    return card;
  }

  return <Link href={`/skills/${skill.id}`}>{card}</Link>;
}
