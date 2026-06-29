import { aiSettingsService } from "@/services/ai/ai-settings-service";
import { aiCacheService } from "@/services/ai/ai-cache-service";
import type { AiProviderRegistry } from "@/services/ai/ai-provider";
import { anthropicProvider } from "@/services/ai/providers/anthropic";
import { geminiProvider } from "@/services/ai/providers/gemini";
import { ollamaProvider } from "@/services/ai/providers/ollama";
import { openaiProvider } from "@/services/ai/providers/openai";
import { buildPrompt } from "@/services/ai/prompt-builder";
import { parseAiResponse } from "@/services/ai/response-parser";
import {
  AiServiceError,
  type AiMessage,
  type AiParsedResponse,
  type AiPromptRequest,
  type AiRunOptions,
} from "@/types/ai";

const providers: AiProviderRegistry = {
  gemini: geminiProvider,
  openai: openaiProvider,
  anthropic: anthropicProvider,
  ollama: ollamaProvider,
};

function normalizeError(error: unknown): AiServiceError {
  if (error instanceof AiServiceError) {
    return error;
  }

  return new AiServiceError("unknown", "AI request failed.");
}

async function runAction(
  request: AiPromptRequest,
  messages?: AiMessage[],
  options: AiRunOptions = {},
): Promise<AiParsedResponse> {
  const settings = aiSettingsService.getSettings();
  const provider = providers[settings.provider] ?? providers.gemini;
  const prompt = buildPrompt(request);

  if (settings.cache && !options.refresh) {
    const cached = aiCacheService.get(request, settings);

    if (cached) {
      return {
        ...cached.response,
        metadata: {
          provider:
            cached.response.metadata?.provider ?? settings.provider,
          model:
            cached.response.metadata?.model ??
            (settings.provider === "gemini"
              ? settings.geminiModel
              : "default"),
          generationTimeMs:
            cached.response.metadata?.generationTimeMs,
          estimatedTokens:
            cached.response.metadata?.estimatedTokens,
          cached: true,
          generatedAt: cached.createdAt,
        },
      };
    }
  }

  try {
    if (settings.streaming && provider.stream && options.onChunk) {
      let content = "";
      let metadata;

      for await (const chunk of provider.stream({
        prompt,
        settings,
        messages,
      })) {
        content += chunk.content;
        metadata = chunk.metadata ?? metadata;
        options.onChunk(content);
      }

      const parsed = parseAiResponse(content, metadata);

      if (settings.cache) {
        aiCacheService.set(request, settings, parsed);
      }

      return parsed;
    }

    const response = await provider.generate({
      prompt,
      settings,
      messages,
    });

    const parsed = parseAiResponse(
      response.content,
      response.metadata,
    );

    if (settings.cache) {
      aiCacheService.set(request, settings, parsed);
    }

    return parsed;
  } catch (error) {
    throw normalizeError(error);
  }
}

export const aiService = {
  runAction,
  normalizeError,
  getProviders() {
    return Object.values(providers);
  },
};