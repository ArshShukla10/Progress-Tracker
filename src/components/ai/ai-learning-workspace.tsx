"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, RefreshCcw, RotateCcw, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

import { AiError } from "@/components/ai/ai-error";
import { AiLoading } from "@/components/ai/ai-loading";
import { AiResponseView } from "@/components/ai/ai-response-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AiActionDefinition } from "@/services/ai/ai-actions";
import { aiConversationService } from "@/services/ai/ai-conversation-service";
import { aiService } from "@/services/ai/ai-service";
import { aiSettingsService } from "@/services/ai/ai-settings-service";
import {
  AiServiceError,
  type AiContext,
  type AiErrorCode,
  type AiMessage,
  type AiParsedResponse,
} from "@/types/ai";

type AiLearningWorkspaceProps = {
  context: AiContext;
  action: AiActionDefinition;
};

export function AiLearningWorkspace({ context, action }: AiLearningWorkspaceProps) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [response, setResponse] = useState<AiParsedResponse | null>(null);
  const [streamContent, setStreamContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ code?: AiErrorCode; message: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const isAskAction = action.id === "ask";
  const contextTitle = useMemo(
    () =>
      context.subtopic?.title ??
      context.topic?.title ??
      context.module?.title ??
      context.subject?.name ??
      context.skill?.name ??
      "Current learning context",
    [context],
  );

  useEffect(() => {
    setResponse(null);
    setStreamContent("");
    setError(null);
    setCopied(false);
    setMessages(aiConversationService.getMessages(context));
  }, [action.id, context]);

  async function run(refresh = false) {
    const trimmedQuestion = question.trim();

    if (isAskAction && !trimmedQuestion) {
      setError({ message: "Ask a focused question before running Ask AI." });
      return;
    }

    const settings = aiSettingsService.getSettings();
    const nextMessages: AiMessage[] =
      isAskAction && trimmedQuestion
        ? [...messages, { role: "user", content: trimmedQuestion }]
        : messages;

    setLoading(true);
    setError(null);
    setResponse(null);
    setStreamContent("");
    setCopied(false);

    try {
      const nextResponse = await aiService.runAction(
        { action: action.id, context, question: isAskAction ? trimmedQuestion : undefined },
        nextMessages,
        {
          refresh,
          onChunk: setStreamContent,
        },
      );

      setResponse(nextResponse);

      if (isAskAction) {
        const updatedMessages = [
          ...nextMessages,
          { role: "assistant" as const, content: nextResponse.raw },
        ];
        setMessages(updatedMessages);

        if (settings.conversationMemory) {
          aiConversationService.saveMessages(context, updatedMessages);
        }

        setQuestion("");
      }
    } catch (caughtError) {
      if (caughtError instanceof AiServiceError) {
        setError({ code: caughtError.code, message: caughtError.message });
      } else {
        setError({ message: "The AI workspace could not complete this request." });
      }
    } finally {
      setLoading(false);
    }
  }

  function clearWorkspace() {
    setQuestion("");
    setResponse(null);
    setStreamContent("");
    setError(null);
    setCopied(false);
    setMessages([]);
    aiConversationService.clear(context);
  }

  async function copyResponse() {
    const content = response?.raw ?? streamContent;

    if (!content || typeof navigator === "undefined") {
      return;
    }

    await navigator.clipboard.writeText(content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-border/70">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-1">
            <CardTitle>{action.label}</CardTitle>
            <p className="text-sm text-muted-foreground">{action.description}</p>
            <p className="text-xs text-muted-foreground">Context: {contextTitle}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="secondary" onClick={() => run(true)} disabled={loading}>
              <RefreshCcw className="mr-2 size-4" />
              Refresh
            </Button>
            <Button type="button" variant="ghost" onClick={() => run(true)} disabled={loading}>
              <RotateCcw className="mr-2 size-4" />
              Regenerate
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={copyResponse}
              disabled={!response && !streamContent}
            >
              <Copy className="mr-2 size-4" />
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button type="button" variant="ghost" onClick={clearWorkspace}>
              <Trash2 className="mr-2 size-4" />
              Clear
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 pt-6">
        {isAskAction ? (
          <div className="flex flex-col gap-3 lg:flex-row">
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  void run();
                }
              }}
              placeholder="Ask a focused follow-up..."
              className="h-10 flex-1 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
            <Button type="button" onClick={() => run()} disabled={loading}>
              Ask
            </Button>
          </div>
        ) : (
          <Button type="button" onClick={() => run()} disabled={loading}>
            Generate {action.label}
          </Button>
        )}

        {messages.length > 0 ? (
          <div className="rounded-md border border-border/70 bg-background/32 p-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Conversation
            </p>
            <div className="space-y-3">
              {messages.slice(-4).map((message, index) => (
                <div key={`${message.role}-${index}`} className="text-sm">
                  <span className="mr-2 text-xs uppercase text-muted-foreground">
                    {message.role}
                  </span>
                  <span className="text-muted-foreground">{message.content}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {loading ? <AiLoading content={streamContent} /> : null}
        {error ? <AiError code={error.code} message={error.message} onRetry={() => run(true)} /> : null}
        {response ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
          >
            <AiResponseView response={response} />
          </motion.div>
        ) : null}
      </CardContent>
    </Card>
  );
}
