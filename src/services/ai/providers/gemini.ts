import {
  AiServiceError,
  type AiProvider,
  type AiProviderRequest,
  type AiProviderResponse,
} from "@/types/ai";

type GeminiPart = {
  text?: string;
};

type GeminiCandidate = {
  content?: {
    parts?: GeminiPart[];
  };
};

type GeminiResponse = {
  candidates?: GeminiCandidate[];
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
  usageMetadata?: {
    totalTokenCount?: number;
  };
};

const timeoutMs = 30000;

function mapGeminiError(status: number, message: string) {
  if (status === 400) {
    return new AiServiceError("malformed-response", message || "Gemini rejected the request.");
  }

  if (status === 401 || status === 403) {
    return new AiServiceError("missing-api-key", "Gemini API key is invalid or missing.");
  }

  if (status === 429) {
    return new AiServiceError("quota-exceeded", message || "Gemini quota or rate limit reached.");
  }

  if (status >= 500) {
    return new AiServiceError("provider-failure", "Gemini provider failure.");
  }

  return new AiServiceError("unknown", message || "Gemini request failed.");
}

function extractText(payload: GeminiResponse) {
  const text = payload.candidates
    ?.flatMap((candidate) => candidate.content?.parts ?? [])
    .map((part) => part.text)
    .filter(Boolean)
    .join("\n");

  if (!text) {
    throw new AiServiceError(
      "malformed-response",
      "Gemini returned an empty or malformed response.",
    );
  }

  return text;
}

async function requestGemini({
  prompt,
  settings,
  signal,
}: AiProviderRequest): Promise<AiProviderResponse> {
  const apiKey = settings.apiKeys.gemini;

  if (!apiKey) {
    throw new AiServiceError("missing-api-key", "Add a Gemini API key in Settings.");
  }

  if (typeof navigator !== "undefined" && !navigator.onLine) {
    throw new AiServiceError("offline", "You appear to be offline.");
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
  const startedAt = performance.now();

  signal?.addEventListener("abort", () => controller.abort());

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${settings.geminiModel}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: settings.temperature },
        }),
        signal: controller.signal,
      },
    );
    const payload = (await response.json().catch(() => null)) as GeminiResponse | null;

    if (!response.ok) {
      throw mapGeminiError(response.status, payload?.error?.message ?? response.statusText);
    }

    if (!payload) {
      throw new AiServiceError("malformed-response", "Gemini returned malformed JSON.");
    }

    return {
      provider: "gemini",
      model: settings.geminiModel,
      content: extractText(payload),
      metadata: {
        provider: "gemini",
        model: settings.geminiModel,
        generationTimeMs: Math.round(performance.now() - startedAt),
        estimatedTokens: payload.usageMetadata?.totalTokenCount,
        generatedAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    if (error instanceof AiServiceError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new AiServiceError("timeout", "Gemini request timed out.");
    }

    throw new AiServiceError("provider-failure", "Gemini network request failed.");
  } finally {
    window.clearTimeout(timeout);
  }
}

export const geminiProvider: AiProvider = {
  id: "gemini",
  label: "Gemini",
  generate: requestGemini,
  async *stream(request) {
    const response = await requestGemini(request);
    const words = response.content.split(/(\s+)/);

    for (const word of words) {
      yield { content: word };
    }

    yield { content: "", done: true, metadata: response.metadata };
  },
};
