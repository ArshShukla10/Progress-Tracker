"use client";

import { useState } from "react";

import { AiError } from "@/components/ai/ai-error";
import { AiLoading } from "@/components/ai/ai-loading";
import { AiResponseView } from "@/components/ai/ai-response-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aiService } from "@/services/ai/ai-service";
import type { AiContext, AiMessage, AiParsedResponse } from "@/types/ai";

type AskAiPanelProps = {
  context: AiContext;
};

export function AskAiPanel({ context }: AskAiPanelProps) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [response, setResponse] = useState<AiParsedResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function ask() {
    if (!question.trim()) {
      return;
    }

    const nextMessages: AiMessage[] = [...messages, { role: "user", content: question.trim() }];
    setMessages(nextMessages);
    setLoading(true);
    setError(null);

    try {
      const nextResponse = await aiService.runAction(
        { action: "ask", context, question },
        nextMessages,
      );
      setResponse(nextResponse);
      setMessages([...nextMessages, { role: "assistant", content: nextResponse.raw }]);
      setQuestion("");
    } catch {
      setError("Ask AI failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ask AI</CardTitle>
        <p className="text-sm text-muted-foreground">Ask follow-up questions with the current topic context.</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask a follow-up..."
            className="h-10 flex-1 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
          <Button type="button" onClick={ask}>
            Ask
          </Button>
        </div>
        <div className="mt-4">
          {loading ? <AiLoading /> : null}
          {error ? <AiError message={error} onRetry={ask} /> : null}
          {response ? <AiResponseView response={response} /> : null}
        </div>
      </CardContent>
    </Card>
  );
}
