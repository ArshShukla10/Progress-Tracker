import { MarkdownRenderer } from "@/components/ai/markdown-renderer";

type AiLoadingProps = {
  content?: string;
};

export function AiLoading({ content = "" }: AiLoadingProps) {
  return (
    <div className="rounded-md border border-border/70 bg-background/32 p-4 text-sm text-muted-foreground">
      {content ? (
        <MarkdownRenderer content={content} />
      ) : (
        <div className="space-y-3">
          <p>Preparing a context-aware response...</p>
          <div className="space-y-2">
            <div className="h-3 w-11/12 animate-pulse rounded bg-secondary" />
            <div className="h-3 w-8/12 animate-pulse rounded bg-secondary" />
            <div className="h-3 w-10/12 animate-pulse rounded bg-secondary" />
          </div>
        </div>
      )}
    </div>
  );
}
