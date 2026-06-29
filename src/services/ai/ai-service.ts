import { aiSettingsService } from "@/services/ai/ai-settings-service";
import type { AiProviderRegistry } from "@/services/ai/ai-provider";
import { anthropicProvider } from "@/services/ai/providers/anthropic";
import { geminiProvider } from "@/services/ai/providers/gemini";
import { ollamaProvider } from "@/services/ai/providers/ollama";
import { openaiProvider } from "@/services/ai/providers/openai";
import { buildPrompt } from "@/services/ai/prompt-builder";
import { parseAiResponse } from "@/services/ai/response-parser";
import type { AiMessage, AiParsedResponse, AiPromptRequest } from "@/types/ai";

const providers: AiProviderRegistry = {
  gemini: geminiProvider,
  openai: openaiProvider,
  anthropic: anthropicProvider,
  ollama: ollamaProvider,
};

async function runAction(request: AiPromptRequest, messages?: AiMessage[]): Promise<AiParsedResponse> {
  const settings = aiSettingsService.getSettings();
  const provider = providers[settings.provider] ?? providers.gemini;
  const prompt = buildPrompt(request);
  const response = await provider.generate({ prompt, settings, messages });

  return parseAiResponse(response.content);
}

export const aiService = {
  runAction,
  getProviders() {
    return Object.values(providers);
  },
};
