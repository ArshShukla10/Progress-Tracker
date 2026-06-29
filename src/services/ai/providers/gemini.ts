import type { AiProvider } from "@/types/ai";

export const geminiProvider: AiProvider = {
  id: "gemini",
  label: "Gemini",
  async generate({ prompt, settings }) {
    const hasKey = Boolean(settings.apiKeys.gemini);

    return {
      provider: "gemini",
      model: settings.geminiModel,
      content: hasKey
        ? `Gemini response ready\n\n- Provider wiring is configured.\n- Prompt context was built successfully.\n\n${prompt}`
        : "AI provider not configured\n\n- Add a Gemini API key in Settings.\n- The prompt and context engine are ready.\n- No request was sent.",
    };
  },
};
