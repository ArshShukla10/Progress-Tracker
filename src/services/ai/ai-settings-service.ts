import { localStorageService } from "@/lib/storage/local-storage";
import type { AiSettings } from "@/types/ai";

const settingsKey = "nexus.ai.settings";

export const defaultAiSettings: AiSettings = {
  provider: "gemini",
  geminiModel: "gemini-1.5-flash",
  apiKeys: {},
  streaming: true,
  markdown: true,
  conversationMemory: true,
  cache: true,
  temperature: 0.4,
};

export const aiSettingsService = {
  getSettings(): AiSettings {
    return {
      ...defaultAiSettings,
      ...localStorageService.get<Partial<AiSettings>>(settingsKey),
      apiKeys: {
        ...defaultAiSettings.apiKeys,
        ...(localStorageService.get<Partial<AiSettings>>(settingsKey)?.apiKeys ?? {}),
      },
    };
  },

  saveSettings(settings: AiSettings) {
    localStorageService.set(settingsKey, settings);
  },
};
