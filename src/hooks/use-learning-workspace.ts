"use client";

import { useEffect, useMemo, useState } from "react";

import { learningStorageService } from "@/services/learning-storage-service";
import type {
  ConfidenceLevel,
  LearningRevisionState,
  LearningStatus,
  LearningWorkspaceState,
  ModuleWorkspaceView,
} from "@/types/academic";

type WorkspaceIdentity = {
  semesterId: string;
  subjectId: string;
  moduleId: string;
};

function isCompletedStatus(status: LearningStatus) {
  return status === "completed" || status === "revised" || status === "mastered";
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate.toISOString();
}

export function useLearningWorkspace(view: ModuleWorkspaceView) {
  const identity: WorkspaceIdentity = {
    semesterId: view.semester.id,
    subjectId: view.subject.id,
    moduleId: view.module.id,
  };

  const [state, setState] = useState<LearningWorkspaceState>({
    topics: {},
    subtopics: {},
    practice: {},
    notes: [],
  });

  useEffect(() => {
    setState(
      learningStorageService.getWorkspaceState(
        identity.semesterId,
        identity.subjectId,
        identity.moduleId,
      ),
    );
  }, [identity.moduleId, identity.semesterId, identity.subjectId]);

  const statistics = useMemo(() => {
    const completedTopics = view.module.topics.filter((topic) => {
      const status = state.topics[topic.id]?.status ?? topic.status;
      return isCompletedStatus(status);
    }).length;
    const topicsRemaining = view.module.topics.length - completedTopics;
    const estimatedRemainingStudyTimeMinutes = view.module.topics.reduce((total, topic) => {
      const topicStatus = state.topics[topic.id]?.status ?? topic.status;

      if (isCompletedStatus(topicStatus)) {
        return total;
      }

      const topicEstimate = topic.estimatedStudyTimeMinutes ?? 0;
      const subtopicEstimate = topic.subtopics.reduce((subtopicTotal, subtopic) => {
        const status = state.subtopics[subtopic.id]?.status ?? subtopic.status;
        return subtopicTotal + (isCompletedStatus(status) ? 0 : subtopic.estimatedStudyTimeMinutes ?? 0);
      }, 0);

      return total + topicEstimate + subtopicEstimate;
    }, 0);
    const moduleCompletion =
      view.module.topics.length > 0 ? Math.round((completedTopics / view.module.topics.length) * 100) : 0;

    return {
      ...view.statistics,
      topicsCompleted: completedTopics,
      topicsRemaining,
      moduleCompletion,
      estimatedRemainingStudyTimeMinutes,
    };
  }, [state.subtopics, state.topics, view.module.topics, view.statistics]);

  function setTopicStatus(topicId: string, status: LearningStatus) {
    setState(
      learningStorageService.setTopicStatus(
        identity.semesterId,
        identity.subjectId,
        identity.moduleId,
        topicId,
        status,
      ),
    );
  }

  function setSubtopicStatus(subtopicId: string, status: LearningStatus) {
    setState(
      learningStorageService.setSubtopicStatus(
        identity.semesterId,
        identity.subjectId,
        identity.moduleId,
        subtopicId,
        status,
      ),
    );
  }

  function setTopicConfidence(topicId: string, confidence: ConfidenceLevel) {
    setState(
      learningStorageService.setTopicConfidence(
        identity.semesterId,
        identity.subjectId,
        identity.moduleId,
        topicId,
        confidence,
      ),
    );
  }

  function toggleTopicBookmark(topicId: string) {
    setState(
      learningStorageService.toggleTopicBookmark(
        identity.semesterId,
        identity.subjectId,
        identity.moduleId,
        topicId,
      ),
    );
  }

  function setPracticeStatus(practiceId: string, status: LearningStatus) {
    setState(
      learningStorageService.setPracticeStatus(
        identity.semesterId,
        identity.subjectId,
        identity.moduleId,
        practiceId,
        status,
      ),
    );
  }

  function markTopicForRevision(topicId: string) {
    const currentRevision = state.topics[topicId]?.revision;
    const now = new Date();
    const revision: LearningRevisionState = {
      markedForRevision: true,
      revisionCount: currentRevision?.revisionCount ?? 0,
      lastRevisionDate: currentRevision?.lastRevisionDate ?? null,
      nextSuggestedRevision: currentRevision?.nextSuggestedRevision ?? addDays(now, 2),
    };

    setState(
      learningStorageService.setTopicRevision(
        identity.semesterId,
        identity.subjectId,
        identity.moduleId,
        topicId,
        revision,
      ),
    );
  }

  function recordRevision(topicId: string) {
    const currentRevision = state.topics[topicId]?.revision;
    const now = new Date();
    const revision: LearningRevisionState = {
      markedForRevision: true,
      revisionCount: (currentRevision?.revisionCount ?? 0) + 1,
      lastRevisionDate: now.toISOString(),
      nextSuggestedRevision: addDays(now, 7),
    };

    setState(
      learningStorageService.setTopicRevision(
        identity.semesterId,
        identity.subjectId,
        identity.moduleId,
        topicId,
        revision,
      ),
    );
  }

  function createNote(title: string, body: string) {
    setState(
      learningStorageService.createNote(
        identity.semesterId,
        identity.subjectId,
        identity.moduleId,
        title,
        body,
      ),
    );
  }

  function updateNote(noteId: string, title: string, body: string) {
    setState(
      learningStorageService.updateNote(
        identity.semesterId,
        identity.subjectId,
        identity.moduleId,
        noteId,
        title,
        body,
      ),
    );
  }

  function deleteNote(noteId: string) {
    setState(
      learningStorageService.deleteNote(
        identity.semesterId,
        identity.subjectId,
        identity.moduleId,
        noteId,
      ),
    );
  }

  return {
    state,
    statistics,
    setTopicStatus,
    setSubtopicStatus,
    setTopicConfidence,
    toggleTopicBookmark,
    setPracticeStatus,
    markTopicForRevision,
    recordRevision,
    createNote,
    updateNote,
    deleteNote,
  };
}
