"use client";

import { motion } from "framer-motion";

import { LearningBreadcrumbs } from "@/components/learning/learning-breadcrumbs";
import { LearningStatistics } from "@/components/learning/learning-statistics";
import { ModuleNavigator } from "@/components/learning/module-navigator";
import { ModuleOverview } from "@/components/learning/module-overview";
import { NotesPanel } from "@/components/learning/notes-panel";
import { PracticePanel } from "@/components/learning/practice-panel";
import { ResourcePanel } from "@/components/learning/resource-panel";
import { RevisionPanel } from "@/components/learning/revision-panel";
import { StudyChecklist } from "@/components/learning/study-checklist";
import { TopicAccordion } from "@/components/learning/topic-accordion";
import { useLearningWorkspace } from "@/hooks/use-learning-workspace";
import { buildAcademicAiContext } from "@/services/ai/context-builder";
import type { ModuleWorkspaceView } from "@/types/academic";

type LearningWorkspaceProps = {
  view: ModuleWorkspaceView;
};

export function LearningWorkspace({ view }: LearningWorkspaceProps) {
  const workspace = useLearningWorkspace(view);

  return (
    <motion.section
      className="mx-auto flex w-full max-w-7xl flex-col gap-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <LearningBreadcrumbs items={view.breadcrumbs} />
      <ModuleNavigator view={view} />
      <ModuleOverview view={view} moduleCompletion={workspace.statistics.moduleCompletion} />
      <LearningStatistics statistics={workspace.statistics} />

      <div className="grid gap-6 xl:grid-cols-[1fr_0.82fr]">
        <div className="space-y-6">
          <TopicAccordion
            topics={view.module.topics}
            state={workspace.state}
            onTopicStatusChange={workspace.setTopicStatus}
            onSubtopicStatusChange={workspace.setSubtopicStatus}
            onConfidenceChange={workspace.setTopicConfidence}
            onBookmarkToggle={workspace.toggleTopicBookmark}
            getAiContext={(topicId, subtopicId) =>
              buildAcademicAiContext(view, topicId, subtopicId)
            }
          />
          <RevisionPanel
            topics={view.module.topics}
            state={workspace.state}
            onMarkForRevision={workspace.markTopicForRevision}
            onRecordRevision={workspace.recordRevision}
          />
        </div>
        <div className="space-y-6">
          <StudyChecklist module={view.module} />
          <NotesPanel
            notes={workspace.state.notes}
            onCreateNote={workspace.createNote}
            onUpdateNote={workspace.updateNote}
            onDeleteNote={workspace.deleteNote}
          />
          <ResourcePanel module={view.module} />
          <PracticePanel
            module={view.module}
            state={workspace.state}
            onPracticeStatusChange={workspace.setPracticeStatus}
          />
        </div>
      </div>
    </motion.section>
  );
}
