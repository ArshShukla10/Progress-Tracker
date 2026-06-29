"use client";

import { useState } from "react";

import { AiError } from "@/components/ai/ai-error";
import { AiLoading } from "@/components/ai/ai-loading";
import { AiResponseView } from "@/components/ai/ai-response-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aiService } from "@/services/ai/ai-service";
import type { AiActionDefinition } from "@/services/ai/ai-actions";
import type { AiContext, AiParsedResponse } from "@/types/ai";

type AiActionCardProps = {
  action: AiActionDefinition;
  context: AiContext;
};

export function AiActionCard({ action, context }: AiActionCardProps) {
  const [response, setResponse] = useState<AiParsedResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runAction() {
    setLoading(true);
    setError(null);

    try {
      setResponse(await aiService.runAction({ action: action.id, context }));
    } catch {
      setError("AI action failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{action.label}</CardTitle>
        <p className="text-sm text-muted-foreground">{action.description}</p>
      </CardHeader>
      <CardContent>
        <Button type="button" variant="secondary" onClick={runAction}>
          Generate
        </Button>
        <div className="mt-4">
          {loading ? <AiLoading /> : null}
          {error ? <AiError message={error} onRetry={runAction} /> : null}
          {response ? <AiResponseView response={response} /> : null}
        </div>
      </CardContent>
    </Card>
  );
}
