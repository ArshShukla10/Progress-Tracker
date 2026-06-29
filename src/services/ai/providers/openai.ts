import type { AiProvider } from "@/types/ai";

export const openaiProvider: AiProvider = {
  id: "openai",
  label: "OpenAI",
  disabled: true,
  async generate() {
    return {
      provider: "openai",
      model: "stub",
      content: "OpenAI provider is stubbed for future use.",
    };
  },
};
