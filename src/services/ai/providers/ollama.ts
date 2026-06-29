import type { AiProvider } from "@/types/ai";

export const ollamaProvider: AiProvider = {
  id: "ollama",
  label: "Ollama",
  disabled: true,
  async generate() {
    return {
      provider: "ollama",
      model: "stub",
      content: "Ollama provider is stubbed for future use.",
    };
  },
};
