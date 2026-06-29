import type { AiActionId } from "@/types/ai";

export type AiActionDefinition = {
  id: AiActionId;
  label: string;
  description: string;
  codingOnly?: boolean;
};

export const aiActions: AiActionDefinition[] = [
  { id: "explain", label: "Explain", description: "Deep explanation" },
  { id: "summary", label: "Summary", description: "Revision summary" },
  { id: "simplify", label: "Explain Simply", description: "Beginner-friendly view" },
  { id: "exam", label: "Exam View", description: "Answer-writing perspective" },
  { id: "examples", label: "Real World Example", description: "Practical examples" },
  { id: "coding", label: "Coding Example", description: "Programming examples", codingOnly: true },
  { id: "flashcards", label: "Flashcards", description: "Active recall cards" },
  { id: "quiz", label: "Quiz", description: "Practice questions" },
  { id: "interview", label: "Interview Questions", description: "Interview preparation" },
  { id: "ask", label: "Ask AI", description: "Ask a follow-up question" },
];
