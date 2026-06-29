import { Button } from "@/components/ui/button";

type AiErrorProps = {
  message: string;
  onRetry?: () => void;
};

export function AiError({ message, onRetry }: AiErrorProps) {
  return (
    <div className="rounded-md border border-destructive/35 bg-destructive/10 p-4 text-sm text-destructive">
      <p>{message}</p>
      {onRetry ? (
        <Button type="button" variant="secondary" className="mt-3" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  );
}
