import { localStorageService } from "@/lib/storage/local-storage";
import type { AiSettings } from "@/types/ai";

const settingsKey = "nexus.ai.settings";

export const defaultAiSettings: AiSettings = {
  provider: "gemini",
  geminiModel: "gemini-1.5-flash",
  apiKeys: {},
};

export const aiSettingsService = {
  getSettings(): AiSettings {
    return localStorageService.get<AiSettings>(settingsKey) ?? defaultAiSettings;
  },

  saveSettings(settings: AiSettings) {
    localStorageService.set(settingsKey, settings);
  },
};
