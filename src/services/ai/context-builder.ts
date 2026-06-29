import type { ModuleWorkspaceView } from "@/types/academic";
import type { AiContext } from "@/types/ai";

export function buildAcademicAiContext(
  view: ModuleWorkspaceView,
  topicId?: string,
  subtopicId?: string,
): AiContext {
  const topic = topicId ? view.module.topics.find((item) => item.id === topicId) : undefined;
  const subtopic = subtopicId
    ? topic?.subtopics.find((item) => item.id === subtopicId)
    : undefined;

  return {
    source: "academic",
    semester: view.semester,
    subject: view.subject,
    module: view.module,
    topic,
    subtopic,
  };
}

export function stringifyAiContext(context: AiContext) {
  const lines = [
    context.source === "academic" ? `Semester: ${context.semester?.title ?? "Unknown"}` : null,
    context.subject ? `Subject: ${context.subject.name}` : null,
    context.skill ? `Skill: ${context.skill.name}` : null,
    context.module ? `Module: ${context.module.title}` : null,
    context.topic ? `Topic: ${context.topic.title}` : null,
    context.subtopic ? `Subtopic: ${context.subtopic.title}` : null,
  ].filter(Boolean);

  return lines.join("\n");
}
