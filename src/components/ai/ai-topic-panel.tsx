"use client";

import { useState } from "react";

import { AiActionCard } from "@/components/ai/ai-action-card";
import { AiLearningWorkspace } from "@/components/ai/ai-learning-workspace";
import { aiActions } from "@/services/ai/ai-actions";
import type { AiContext } from "@/types/ai";

type AiTopicPanelProps = {
  context: AiContext;
};

export function AiTopicPanel({ context }: AiTopicPanelProps) {
  const [activeActionId, setActiveActionId] = useState(aiActions[0].id);
  const activeAction = aiActions.find((action) => action.id === activeActionId) ?? aiActions[0];

  return (
    <div className="space-y-5">
      <div className="grid gap-4 xl:grid-cols-2">
        {aiActions.map((action) => (
          <AiActionCard
            key={action.id}
            action={action}
            active={action.id === activeActionId}
            onRun={() => setActiveActionId(action.id)}
          />
        ))}
      </div>
      <AiLearningWorkspace context={context} action={activeAction} />
    </div>
  );
}
