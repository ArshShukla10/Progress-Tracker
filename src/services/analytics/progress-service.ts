import { academicService } from "@/services/academic-service";
import { learningStorageService } from "@/services/learning-storage-service";
import { skillService } from "@/services/skill-service";
import type { LearningStatus, Module, Progress, Subject, Topic } from "@/types/academic";
import type { AnalyticsProgressItem } from "@/types/analytics";

function isCompletedStatus(status: LearningStatus) {
  return status === "completed" || status === "revised" || status === "mastered";
}

function getTopicStatus(
  semesterId: string,
  subjectId: string,
  subjectModule: Module,
  topic: Topic,
) {
  const state = learningStorageService.getWorkspaceState(
    semesterId,
    subjectId,
    subjectModule.id,
  );

  return state.topics[topic.id]?.status ?? topic.status;
}

function calculateSubjectProgress(subject: Subject): Progress {
  const topics = subject.modules.flatMap((subjectModule) =>
    subjectModule.topics.map((topic) =>
      getTopicStatus(subject.semesterId, subject.id, subjectModule, topic),
    ),
  );
  const completedTopics = topics.filter(isCompletedStatus).length;

  return {
    completedTopics,
    totalTopics: topics.length,
    percentage: topics.length > 0 ? Math.round((completedTopics / topics.length) * 100) : 0,
  };
}

function getCompletedModules(subject: Subject) {
  return subject.modules.filter((subjectModule) => {
    if (subjectModule.topics.length === 0) {
      return false;
    }

    return subjectModule.topics.every((topic) =>
      isCompletedStatus(getTopicStatus(subject.semesterId, subject.id, subjectModule, topic)),
    );
  }).length;
}

function getCurrentSubjectProgress(): AnalyticsProgressItem[] {
  return academicService.getSubjects().map((subject) => {
    const progress = calculateSubjectProgress(subject);

    return {
      id: subject.id,
      label: subject.name,
      completed: progress.completedTopics,
      total: progress.totalTopics,
      percentage: progress.percentage,
    };
  });
}

function getSkillProgress(): AnalyticsProgressItem[] {
  return skillService.getAllSkills().map((skill) => ({
    id: skill.id,
    label: skill.name,
    completed: skill.progress.completedTopics,
    total: skill.progress.totalTopics,
    percentage: skill.progress.percentage,
  }));
}

function getOverallProgress() {
  const subjects = academicService.getSubjects();
  const subjectProgress = subjects.map(calculateSubjectProgress);
  const completedTopics = subjectProgress.reduce((total, progress) => total + progress.completedTopics, 0);
  const totalTopics = subjectProgress.reduce((total, progress) => total + progress.totalTopics, 0);

  return {
    completedTopics,
    totalTopics,
    completedModules: subjects.reduce((total, subject) => total + getCompletedModules(subject), 0),
    totalModules: subjects.reduce((total, subject) => total + subject.modules.length, 0),
    percentage: totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0,
  };
}

export const analyticsProgressService = {
  getCurrentSubjectProgress,
  getSkillProgress,
  getOverallProgress,
};
