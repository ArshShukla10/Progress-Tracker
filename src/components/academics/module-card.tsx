"use client";

import { motion } from "framer-motion";

import { ContinueLearningButton } from "@/components/academics/continue-learning-button";
import { TopicList } from "@/components/academics/topic-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { ModuleSummary } from "@/types/academic";

type ModuleCardProps = {
  module: ModuleSummary;
  index: number;
};

export function ModuleCard({ module, index }: ModuleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm text-muted-foreground">Module {index + 1}</p>
              <CardTitle className="mt-2">{module.title}</CardTitle>
            </div>
            <ContinueLearningButton target={module.continueLearning} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">Module progress</span>
            <span className="text-sm font-medium text-foreground">{module.progress.percentage}%</span>
          </div>
          <Progress value={module.progress.percentage} className="mt-4 h-2.5" />
          <details className="mt-6 rounded-md border border-border/70 bg-background/24 p-4">
            <summary className="cursor-pointer text-sm font-medium text-foreground">
              Topics and subtopics
            </summary>
            <div className="mt-4">
              <TopicList topics={module.topics} />
            </div>
          </details>
        </CardContent>
      </Card>
    </motion.div>
  );
}
