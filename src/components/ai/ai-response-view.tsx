import { MarkdownRenderer } from "@/components/ai/markdown-renderer";
import { VisualizationPanel } from "@/components/visualization/visualization-panel";
import type { AiParsedResponse } from "@/types/ai";

type AiResponseViewProps = {
  response: AiParsedResponse;
};

export function AiResponseView({ response }: AiResponseViewProps) {
  return (
    <div className="space-y-3 rounded-md border border-border/70 bg-background/32 p-4">
      <MarkdownRenderer content={response.raw} />
      <VisualizationPanel response={response} />
      {response.metadata ? (
        <div className="border-t border-border/70 pt-3 text-xs text-muted-foreground">
          {response.metadata.provider} / {response.metadata.model}
          {response.metadata.generationTimeMs ? ` / ${response.metadata.generationTimeMs}ms` : ""}
          {response.metadata.estimatedTokens ? ` / ~${response.metadata.estimatedTokens} tokens` : ""}
          {response.metadata.cached ? " / cached" : ""}
        </div>
      ) : null}
    </div>
  );
}
