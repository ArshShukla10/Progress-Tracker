"use client";

import { ConfidenceRating } from "@/components/learning/confidence-rating";
import { DifficultyBadge } from "@/components/learning/difficulty-badge";
import { PriorityBadge } from "@/components/learning/priority-badge";
import { SubtopicCard } from "@/components/learning/subtopic-card";
import { Checkbox } from "@/components/ui/checkbox";
import type {
  ConfidenceLevel,
  LearningStatus,
  LearningWorkspaceState,
  Topic,
} from "@/types/academic";

type TopicAccordionProps = {
  topics: Topic[];
  state: LearningWorkspaceState;
  onTopicStatusChange: (topicId: string, status: LearningStatus) => void;
  onSubtopicStatusChange: (subtopicId: string, status: LearningStatus) => void;
  onConfidenceChange: (topicId: string, confidence: ConfidenceLevel) => void;
};

function isCompletedStatus(status: LearningStatus) {
  return status === "completed" || status === "revised" || status === "mastered";
}

export function TopicAccordion({
  topics,
  state,
  onTopicStatusChange,
  onSubtopicStatusChange,
  onConfidenceChange,
}: TopicAccordionProps) {
  return (
    <div id="topics" className="space-y-4">
      {topics.map((topic) => {
        const status = state.topics[topic.id]?.status ?? topic.status;
        const confidence = state.topics[topic.id]?.confidence ?? topic.confidence;
        const completed = isCompletedStatus(status);

        return (
          <details
            key={topic.id}
            className="rounded-lg border border-border/80 bg-card/72 p-5 shadow-shell"
          >
            <summary className="cursor-pointer list-none">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <label className="flex cursor-pointer items-start gap-4">
                  <Checkbox
                    checked={completed}
                    onChange={() => onTopicStatusChange(topic.id, completed ? "not-started" : "completed")}
                  />
                  <span>
                    <span className="block text-base font-semibold text-foreground">{topic.title}</span>
                    <span className="mt-2 flex flex-wrap gap-2">
                      <DifficultyBadge difficulty={topic.difficulty} />
                      <PriorityBadge priority={topic.priority} />
                      {topic.estimatedStudyTimeMinutes ? (
                        <span className="inline-flex h-7 items-center rounded-md border border-border bg-background px-2.5 text-xs text-muted-foreground">
                          {topic.estimatedStudyTimeMinutes} min
                        </span>
                      ) : null}
                    </span>
                  </span>
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <ConfidenceRating value={confidence} onChange={(value) => onConfidenceChange(topic.id, value)} />
                  <select
                    value={status}
                    onChange={(event) => onTopicStatusChange(topic.id, event.target.value as LearningStatus)}
                    className="h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground"
                  >
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="revised">Revised</option>
                    <option value="mastered">Mastered</option>
                  </select>
                </div>
              </div>
            </summary>
            <div className="mt-5 space-y-3 border-t border-border/70 pt-5">
              {topic.subtopics.map((subtopic) => (
                <SubtopicCard
                  key={subtopic.id}
                  subtopic={subtopic}
                  status={state.subtopics[subtopic.id]?.status ?? subtopic.status}
                  onStatusChange={(nextStatus) => onSubtopicStatusChange(subtopic.id, nextStatus)}
                />
              ))}
            </div>
          </details>
        );
      })}
    </div>
  );
}
