import { AiActionCard } from "@/components/ai/ai-action-card";
import { AskAiPanel } from "@/components/ai/ask-ai-panel";
import { aiActions } from "@/services/ai/ai-actions";
import type { AiContext } from "@/types/ai";

type AiTopicPanelProps = {
  context: AiContext;
};

export function AiTopicPanel({ context }: AiTopicPanelProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-2">
        {aiActions
          .filter((action) => action.id !== "ask")
          .map((action) => (
            <AiActionCard key={action.id} action={action} context={context} />
          ))}
      </div>
      <AskAiPanel context={context} />
    </div>
  );
}
