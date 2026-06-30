import { LearningEmptyState } from "@/components/learning/empty-state/learning-empty-state";
import type { InterviewQuestion } from "@/types/learning";

export function InterviewPanel({ questions }: { questions: InterviewQuestion[] }) {
  if (questions.length === 0) {
    return (
      <LearningEmptyState
        title="No interview questions yet"
        description="Technical, HR, viva, coding, subject-wise, and skill-wise interview practice will appear here."
      />
    );
  }

  return <div className="space-y-3">{questions.map((question) => <p key={question.id}>{question.title}</p>)}</div>;
}
