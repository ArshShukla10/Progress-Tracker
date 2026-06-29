"use client";

import { motion } from "framer-motion";

import { ContinueLearningButton } from "@/components/academics/continue-learning-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { SubjectSummary } from "@/types/academic";

type SubjectCardProps = {
  subject: SubjectSummary;
  index: number;
};

export function SubjectCard({ subject, index }: SubjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{subject.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">
              {subject.modulesCompleted} of {subject.totalModules} modules completed
            </span>
            <span className="text-sm font-medium text-foreground">
              {subject.progress.percentage}%
            </span>
          </div>
          <Progress value={subject.progress.percentage} className="mt-4 h-2.5" />
          <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-sm text-muted-foreground">Last studied: {subject.lastStudied}</p>
            <ContinueLearningButton target={subject.continueLearning} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
