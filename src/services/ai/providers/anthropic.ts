import type { AiProvider } from "@/types/ai";

export const anthropicProvider: AiProvider = {
  id: "anthropic",
  label: "Anthropic",
  disabled: true,
  async generate() {
    return {
      provider: "anthropic",
      model: "stub",
      content: "Anthropic provider is stubbed for future use.",
    };
  },
};
