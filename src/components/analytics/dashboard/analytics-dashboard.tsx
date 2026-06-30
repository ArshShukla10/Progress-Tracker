"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { SectionHeader } from "@/components/academics/section-header";
import { BarChart } from "@/components/analytics/charts/bar-chart";
import { HeatmapChart } from "@/components/analytics/charts/heatmap-chart";
import { LineChart } from "@/components/analytics/charts/line-chart";
import { PieChart } from "@/components/analytics/charts/pie-chart";
import { ProgressRingChart } from "@/components/analytics/charts/progress-ring-chart";
import { InsightCard } from "@/components/analytics/widgets/insight-card";
import { MetricCard } from "@/components/analytics/widgets/metric-card";
import { GamificationDashboardSection } from "@/components/gamification/dashboard/gamification-dashboard-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { analyticsService } from "@/services/analytics/analytics-service";
import { gamificationService } from "@/services/gamification/gamification-service";
import type { AnalyticsDashboardData, AnalyticsInsight } from "@/types/analytics";

function toInsights(data: AnalyticsDashboardData): AnalyticsInsight[] {
  return [
    {
      id: "strongest-subject",
      label: "Strongest Subject",
      value: data.insights.strongestSubject,
      detail: "Based on topic completion",
    },
    {
      id: "weakest-subject",
      label: "Weakest Subject",
      value: data.insights.weakestSubject,
      detail: "Best candidate for focused revision",
    },
    {
      id: "current-streak",
      label: "Current Streak",
      value: `${data.insights.currentStreak} day`,
      detail: `${data.insights.longestStreak} day longest streak`,
    },
    {
      id: "topics-remaining",
      label: "Topics Remaining",
      value: String(data.insights.topicsRemaining),
      detail: "Across current semester subjects",
    },
  ];
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsDashboardData>(() =>
    analyticsService.getDashboardData(),
  );
  const gamification = gamificationService.getDashboardData(data);

  useEffect(() => {
    setData(analyticsService.getDashboardData());
  }, []);

  return (
    <motion.section
      className="mx-auto flex w-full max-w-7xl flex-col gap-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <SectionHeader
        eyebrow="Analytics"
        title="Learning Intelligence"
        description="A quiet command center for progress, consistency, and future study recommendations."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <GamificationDashboardSection gamification={gamification} />

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <ProgressRingChart label="Overall Completion" value={data.overallCompletion} />
          <ProgressRingChart label="Current Semester Progress" value={data.currentSemesterProgress} />
          <ProgressRingChart label="Learning Consistency" value={data.learningConsistency} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Subject Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.subjectProgress.map((subject) => (
              <div key={subject.id}>
                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-foreground">{subject.label}</span>
                  <span className="text-muted-foreground">
                    {subject.completed}/{subject.total}
                  </span>
                </div>
                <Progress value={subject.percentage} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={data.weeklyActivity} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={data.monthlyActivity} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Skills Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart items={data.skillProgress} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Learning Consistency</CardTitle>
          </CardHeader>
          <CardContent>
            <HeatmapChart data={data.weeklyActivity} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {toInsights(data).map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revision Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            {data.insights.upcomingRevisionSuggestions.map((suggestion) => (
              <div
                key={suggestion}
                className="rounded-md border border-border/70 bg-background/32 p-4 text-sm text-muted-foreground"
              >
                {suggestion}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
