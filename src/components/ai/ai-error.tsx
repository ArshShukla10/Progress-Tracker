import { Button } from "@/components/ui/button";
import type { AiErrorCode } from "@/types/ai";

type AiErrorProps = {
  code?: AiErrorCode;
  message: string;
  onRetry?: () => void;
};

const errorTitles: Record<AiErrorCode, string> = {
  "missing-api-key": "AI provider is not configured",
  offline: "You are offline",
  "quota-exceeded": "Usage limit reached",
  "rate-limited": "Too many requests",
  timeout: "Request timed out",
  "malformed-response": "Response could not be read",
  "provider-failure": "AI provider failed",
  unknown: "AI request failed",
};

export function AiError({ code = "unknown", message, onRetry }: AiErrorProps) {
  return (
    <div className="rounded-md border border-destructive/35 bg-destructive/10 p-4 text-sm">
      <p className="font-medium text-destructive">{errorTitles[code]}</p>
      <p className="mt-1 text-destructive/85">{message}</p>
      {onRetry ? (
        <Button type="button" variant="secondary" className="mt-3" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  );
}
