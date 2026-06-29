import { codingPrompt } from "@/services/ai/prompts/coding";
import { examPrompt } from "@/services/ai/prompts/exam";
import { examplesPrompt } from "@/services/ai/prompts/examples";
import { explainPrompt } from "@/services/ai/prompts/explain";
import { flashcardsPrompt } from "@/services/ai/prompts/flashcards";
import { interviewPrompt } from "@/services/ai/prompts/interview";
import { quizPrompt } from "@/services/ai/prompts/quiz";
import { simplifyPrompt } from "@/services/ai/prompts/simplify";
import { summaryPrompt } from "@/services/ai/prompts/summary";
import { stringifyAiContext } from "@/services/ai/context-builder";
import type { AiActionId, AiPromptRequest } from "@/types/ai";

const promptTemplates: Record<AiActionId, string> = {
  explain: explainPrompt,
  summary: summaryPrompt,
  simplify: simplifyPrompt,
  exam: examPrompt,
  examples: examplesPrompt,
  quiz: quizPrompt,
  flashcards: flashcardsPrompt,
  interview: interviewPrompt,
  coding: codingPrompt,
  ask: "Answer the student's question while preserving the learning context.",
};

export function buildPrompt(request: AiPromptRequest) {
  return [
    "You are NEXUS, a focused academic learning assistant.",
    "Use the supplied context. Do not assume unrelated syllabus content.",
    "",
    "Context:",
    stringifyAiContext(request.context),
    "",
    "Task:",
    promptTemplates[request.action],
    request.question ? `\nStudent question:\n${request.question}` : "",
    "",
    "Return a structured, study-friendly answer.",
  ].join("\n");
}
