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
};

export type AiProviderResponse = {
  content: string;
  model: string;
  provider: AiProviderId;
};

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
};

export type AiProvider = {
  id: AiProviderId;
  label: string;
  disabled?: boolean;
  generate: (request: AiProviderRequest) => Promise<AiProviderResponse>;
};
