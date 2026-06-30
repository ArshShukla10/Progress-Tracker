"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { SectionHeader } from "@/components/academics/section-header";
import { FlashcardsPanel } from "@/components/learning/flashcards/flashcards-panel";
import { InterviewPanel } from "@/components/learning/interview/interview-panel";
import { LearningSidebar } from "@/components/learning/sidebar/learning-sidebar";
import { NotesPanel } from "@/components/learning/notes/notes-panel";
import { PyqPanel } from "@/components/learning/pyqs/pyq-panel";
import { RevisionPanel } from "@/components/learning/revision/revision-panel";
import { LearningSearchToolbar } from "@/components/learning/search/learning-search-toolbar";
import { LearningModeTabs } from "@/components/learning/toolbar/learning-mode-tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { learningService } from "@/services/learning/learning-service";
import type {
  FlashcardItem,
  InterviewQuestion,
  LearningFilters,
  LearningMode,
  LearningNote,
  PyqItem,
  RevisionItem,
} from "@/types/learning";

const defaultFilters: LearningFilters = {
  mode: "all",
  query: "",
  difficulty: "all",
  bookmarkedOnly: false,
};

export function LearningIntelligenceWorkspace() {
  const [activeMode, setActiveMode] = useState<LearningMode>("notes");
  const [filters, setFilters] = useState<LearningFilters>(defaultFilters);
  const workspaceData = useMemo(
    () => learningService.getWorkspaceData({ ...filters, mode: filters.mode === "all" ? activeMode : filters.mode }),
    [activeMode, filters],
  );

  const notes = workspaceData.items.filter((item): item is LearningNote => item.mode === "notes");
  const pyqs = workspaceData.items.filter((item): item is PyqItem => item.mode === "pyqs");
  const revision = workspaceData.items.filter(
    (item): item is RevisionItem => item.mode === "revision",
  );
  const flashcards = workspaceData.items.filter(
    (item): item is FlashcardItem => item.mode === "flashcards",
  );
  const interview = workspaceData.items.filter(
    (item): item is InterviewQuestion => item.mode === "interview",
  );

  return (
    <motion.section
      className="mx-auto flex w-full max-w-7xl flex-col gap-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <SectionHeader
        eyebrow="Learning Intelligence"
        title="Knowledge Workspace"
        description="A unified workspace for notes, PYQs, revision, flashcards, interviews, bookmarks, and search."
      />

      <div className="grid gap-6 xl:grid-cols-[18rem_1fr]">
        <LearningSidebar stats={workspaceData.stats} />
        <div className="space-y-5">
          <LearningModeTabs
            modes={workspaceData.modes}
            activeMode={activeMode}
            onModeChange={setActiveMode}
          />
          <LearningSearchToolbar filters={filters} onFiltersChange={setFilters} />
          <Card>
            <CardHeader>
              <CardTitle>{activeModeLabel(activeMode)}</CardTitle>
              <CardDescription>
                Content is ready to render from storage when real learning material is added.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeMode === "notes" ? <NotesPanel notes={notes} /> : null}
              {activeMode === "pyqs" ? <PyqPanel pyqs={pyqs} /> : null}
              {activeMode === "revision" ? <RevisionPanel revision={revision} /> : null}
              {activeMode === "flashcards" ? <FlashcardsPanel flashcards={flashcards} /> : null}
              {activeMode === "interview" ? <InterviewPanel questions={interview} /> : null}
            </CardContent>
          </Card>
          <IntegrationReadinessCard
            aiActions={workspaceData.aiActions.length}
            plannerTasks={workspaceData.plannerTasks.length}
          />
        </div>
      </div>
    </motion.section>
  );
}

function activeModeLabel(mode: LearningMode) {
  return {
    notes: "Notes",
    pyqs: "Previous Year Questions",
    revision: "Revision",
    flashcards: "Flashcards",
    interview: "Interview Practice",
  }[mode];
}

function IntegrationReadinessCard({
  aiActions,
  plannerTasks,
}: {
  aiActions: number;
  plannerTasks: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Engine Integrations</CardTitle>
        <CardDescription>
          Learning Intelligence extends existing engines instead of creating parallel systems.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-border/70 bg-background/32 p-4 text-sm">
            <p className="font-medium text-foreground">AI Actions</p>
            <p className="mt-2 text-muted-foreground">{aiActions} existing actions available</p>
          </div>
          <div className="rounded-md border border-border/70 bg-background/32 p-4 text-sm">
            <p className="font-medium text-foreground">Planner Tasks</p>
            <p className="mt-2 text-muted-foreground">{plannerTasks} learning tasks registered</p>
          </div>
          <div className="rounded-md border border-border/70 bg-background/32 p-4 text-sm">
            <p className="font-medium text-foreground">Analytics</p>
            <p className="mt-2 text-muted-foreground">Ready for content activity counters</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
