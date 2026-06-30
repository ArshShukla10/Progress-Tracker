import { academicService } from "@/services/academic-service";
import type { SubjectTimeEstimate } from "@/types/planner";

function formatMinutes(minutes: number) {
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

function getSubjectTimeEstimates(): SubjectTimeEstimate[] {
  return academicService.getSubjects().map((subject) => {
    const remainingMinutes = subject.modules.reduce(
      (moduleTotal, subjectModule) =>
        moduleTotal +
        subjectModule.topics.reduce((topicTotal, topic) => {
          if (topic.status === "completed" || topic.status === "revised" || topic.status === "mastered") {
            return topicTotal;
          }

          const subtopicMinutes = topic.subtopics.reduce(
            (total, subtopic) => total + (subtopic.estimatedStudyTimeMinutes ?? 0),
            0,
          );

          return topicTotal + (topic.estimatedStudyTimeMinutes ?? 0) + subtopicMinutes;
        }, 0),
      0,
    );

    return {
      subjectId: subject.id,
      subject: subject.name,
      remainingMinutes,
    };
  });
}

export const timeEstimationService = {
  formatMinutes,
  getSubjectTimeEstimates,
};
