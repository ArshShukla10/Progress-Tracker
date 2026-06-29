import type { Module, Semester, Skill, Subject, Subtopic, Topic } from "@/types/academic";

export type AiProviderId = "gemini" | "openai" | "anthropic" | "ollama";

export type AiActionId =
  | "explain"
  | "summary"
  | "simplify"
  | "exam"
  | "examples"
  | "quiz"
  | "flashcards"
  | "interview"
  | "coding"
  | "ask";

export type AiSettings = {
  provider: AiProviderId;
  geminiModel: string;
  apiKeys: Partial<Record<AiProviderId, string>>;
  streaming: boolean;
  markdown: boolean;
  conversationMemory: boolean;
  cache: boolean;
  temperature: number;
};

export type AiContext = {
  source: "academic" | "skill";
  semester?: Semester;
  subject?: Subject;
  skill?: Skill;
  module?: Module;
  topic?: Topic;
  subtopic?: Subtopic;
};

export type AiPromptRequest = {
  action: AiActionId;
  context: AiContext;
  question?: string;
};

export type AiMessage = {
  role: "user" | "assistant";
  content: string;
};

export type AiProviderRequest = {
  prompt: string;
  settings: AiSettings;
  messages?: AiMessage[];
  signal?: AbortSignal;
};

export type AiProviderResponse = {
  content: string;
  model: string;
  provider: AiProviderId;
  metadata?: AiResponseMetadata;
};

export type AiStreamChunk = {
  content: string;
  done?: boolean;
  metadata?: AiResponseMetadata;
};

export type AiResponseMetadata = {
  provider: AiProviderId;
  model: string;
  generationTimeMs?: number;
  estimatedTokens?: number;
  cached?: boolean;
  generatedAt?: string;
};

export type AiErrorCode =
  | "missing-api-key"
  | "offline"
  | "quota-exceeded"
  | "rate-limited"
  | "timeout"
  | "malformed-response"
  | "provider-failure"
  | "unknown";

export class AiServiceError extends Error {
  code: AiErrorCode;

  constructor(code: AiErrorCode, message: string) {
    super(message);
    this.name = "AiServiceError";
    this.code = code;
  }
}

export type AiResponseSection =
  | { type: "title"; content: string }
  | { type: "heading"; content: string }
  | { type: "paragraph"; content: string }
  | { type: "bullet-list"; items: string[] }
  | { type: "code"; language?: string; content: string }
  | { type: "tip"; content: string }
  | { type: "warning"; content: string };

export type AiParsedResponse = {
  title: string;
  sections: AiResponseSection[];
  raw: string;
  metadata?: AiResponseMetadata;
};

export type AiProvider = {
  id: AiProviderId;
  label: string;
  disabled?: boolean;
  generate: (request: AiProviderRequest) => Promise<AiProviderResponse>;
  stream?: (request: AiProviderRequest) => AsyncGenerator<AiStreamChunk>;
};

export type AiCacheEntry = {
  key: string;
  response: AiParsedResponse;
  createdAt: string;
};

export type AiRunOptions = {
  refresh?: boolean;
  onChunk?: (content: string) => void;
};
