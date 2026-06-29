"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProgressBadge } from "@/components/academics/progress-badge";
import { cn } from "@/lib/utils";
import type { SemesterSummary } from "@/types/academic";

type SemesterCardProps = {
  semester: SemesterSummary;
  index: number;
};

export function SemesterCard({ semester, index }: SemesterCardProps) {
  const isLocked = semester.status === "locked";
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <Card
        className={cn(
          "h-full transition-colors hover:border-primary/45",
          semester.status === "current" && "border-primary/45 bg-card/85",
          isLocked && "opacity-68 hover:border-border/80",
        )}
      >
        <CardHeader className="flex-row items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Semester {semester.number}</p>
            <CardTitle className="mt-2">{semester.title}</CardTitle>
          </div>
          {isLocked ? <Lock className="size-4 text-muted-foreground" /> : null}
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <ProgressBadge label={semester.status} status={semester.status} />
            <span className="text-sm font-medium text-foreground">
              {semester.progress.percentage}%
            </span>
          </div>
          <Progress value={semester.progress.percentage} className="mt-5 h-2.5" />
        </CardContent>
      </Card>
    </motion.div>
  );

  if (isLocked) {
    return content;
  }

  return <Link href={`/academics/${semester.id}`}>{content}</Link>;
}
