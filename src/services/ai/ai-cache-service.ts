import { localStorageService } from "@/lib/storage/local-storage";
import { buildPrompt } from "@/services/ai/prompt-builder";
import type { AiCacheEntry, AiPromptRequest, AiSettings } from "@/types/ai";

const cacheKey = "nexus.ai.cache";

function getCache() {
  return localStorageService.get<Record<string, AiCacheEntry>>(cacheKey) ?? {};
}

function createCacheKey(request: AiPromptRequest, settings: AiSettings) {
  return [
    settings.provider,
    settings.geminiModel,
    request.action,
    request.context.source,
    request.context.semester?.id,
    request.context.subject?.id,
    request.context.skill?.id,
    request.context.module?.id,
    request.context.topic?.id,
    request.context.subtopic?.id,
    request.question,
    buildPrompt(request),
  ]
    .filter(Boolean)
    .join("|");
}

export const aiCacheService = {
  get(request: AiPromptRequest, settings: AiSettings) {
    return getCache()[createCacheKey(request, settings)] ?? null;
  },

  set(request: AiPromptRequest, settings: AiSettings, response: AiCacheEntry["response"]) {
    const key = createCacheKey(request, settings);
    localStorageService.set(cacheKey, {
      ...getCache(),
      [key]: {
        key,
        response,
        createdAt: new Date().toISOString(),
      },
    });
  },

  createCacheKey,
};
