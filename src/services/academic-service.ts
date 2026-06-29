import { academicData } from "@/data";
import { routes } from "@/constants/routes";
import type {
  ContinueLearning,
  DashboardData,
  ContinueLearningTarget,
  Module,
  ModuleSummary,
  ModuleWorkspaceView,
  Progress,
  QuickAction,
  Resource,
  Semester,
  SemesterStatus,
  SemesterSummary,
  SemesterView,
  Subject,
  SubjectView,
  Subtopic,
  Topic,
} from "@/types/academic";

const quickActions: QuickAction[] = [
  { label: "Resume Learning", href: routes.home },
  { label: "Open Notes", href: routes.knowledge },
  { label: "Planner", href: routes.planner },
  { label: "Academics", href: routes.academics },
];

function getAllSemesters(): Semester[] {
  return [...academicData.semesters];
}

function getSemester(semesterId: string): Semester | undefined {
  return getAllSemesters().find((semester) => semester.id === semesterId);
}

function getCurrentSemester(): Semester {
  const semester = getSemester(academicData.currentSemesterId);

  if (!semester) {
    throw new Error(`Current semester not found: ${academicData.currentSemesterId}`);
  }

  return semester;
}

function getSemesterStatus(semester: Semester): SemesterStatus {
  const currentSemester = getCurrentSemester();

  if (semester.number < currentSemester.number) {
    return "completed";
  }

  if (semester.id === currentSemester.id) {
    return "current";
  }

  return "locked";
}

function getSubjects(semesterId = academicData.currentSemesterId): Subject[] {
  return getSemester(semesterId)?.subjects ?? [];
}

function getSubject(id: string, semesterId = academicData.currentSemesterId): Subject | undefined {
  return getSubjects(semesterId).find((subject) => subject.id === id);
}

function getModules(subjectId: string, semesterId = academicData.currentSemesterId): Module[] {
  return getSubject(subjectId, semesterId)?.modules ?? [];
}

function getModule(
  subjectId: string,
  moduleId: string,
  semesterId = academicData.currentSemesterId,
): Module | undefined {
  return getModules(subjectId, semesterId).find(
    (module) => module.id === moduleId || getModuleRouteSegment(module) === moduleId,
  );
}

function getModuleRouteSegment(subjectModule: Module): string {
  const marker = "module-";
  const markerIndex = subjectModule.id.indexOf(marker);

  return markerIndex >= 0 ? subjectModule.id.slice(markerIndex) : subjectModule.id;
}

function getTopic(
  subjectId: string,
  moduleId: string,
  topicId: string,
  semesterId = academicData.currentSemesterId,
): Topic | undefined {
  return getModule(subjectId, moduleId, semesterId)?.topics.find((topic) => topic.id === topicId);
}

function isCompletedStatus(status: Topic["status"]) {
  return status === "completed" || status === "revised" || status === "mastered";
}

function getSubtopics(
  subjectId: string,
  moduleId: string,
  topicId: string,
  semesterId = academicData.currentSemesterId,
): Subtopic[] {
  return getTopic(subjectId, moduleId, topicId, semesterId)?.subtopics ?? [];
}

function getResources(
  subjectId: string,
  moduleId: string,
  topicId: string,
  subtopicId: string,
  semesterId = academicData.currentSemesterId,
): Resource[] {
  return (
    getSubtopics(subjectId, moduleId, topicId, semesterId).find(
      (subtopic) => subtopic.id === subtopicId,
    )?.resources ?? []
  );
}

function calculateProgressFromTopics(topics: Topic[]): Progress {
  const totalTopics = topics.length;
  const completedTopics = topics.filter((topic) => isCompletedStatus(topic.status)).length;
  const percentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return {
    completedTopics,
    totalTopics,
    percentage,
  };
}

function calculateSemesterProgress(semesterId = academicData.currentSemesterId): Progress {
  const topics = getSubjects(semesterId).flatMap((subject) =>
    subject.modules.flatMap((module) => module.topics),
  );

  return calculateProgressFromTopics(topics);
}

function calculateSubjectProgress(
  subjectId: string,
  semesterId = academicData.currentSemesterId,
): Progress {
  const topics =
    getSubject(subjectId, semesterId)?.modules.flatMap((module) => module.topics) ?? [];

  return calculateProgressFromTopics(topics);
}

function calculateModuleProgress(
  subjectId: string,
  moduleId: string,
  semesterId = academicData.currentSemesterId,
): Progress {
  return calculateProgressFromTopics(getModule(subjectId, moduleId, semesterId)?.topics ?? []);
}

function getCompletedModuleCount(subject: Subject): number {
  return subject.modules.filter((item) =>
    item.topics.length > 0 && item.topics.every((topic) => isCompletedStatus(topic.status)),
  ).length;
}

function getSemesterSummaries(): SemesterSummary[] {
  return getAllSemesters().map((semester) => ({
    id: semester.id,
    title: semester.title,
    number: semester.number,
    status: getSemesterStatus(semester),
    progress: calculateSemesterProgress(semester.id),
  }));
}

function getStudyTasks(semesterId = academicData.currentSemesterId) {
  return academicData.dashboard.semesterTasks[semesterId] ?? [];
}

function findContinueTopic(subject: Subject): { module: Module; topic: Topic } | null {
  for (const subjectModule of subject.modules) {
    const topic =
      subjectModule.topics.find((item) => item.status === "in-progress") ??
      subjectModule.topics.find((item) => item.status === "not-started");

    if (topic) {
      return { module: subjectModule, topic };
    }
  }

  return null;
}

function buildContinueLearningTarget(
  semesterId: string,
  subject: Subject,
  label = "Continue Learning",
): ContinueLearningTarget | null {
  const target = findContinueTopic(subject);

  if (!target) {
    return null;
  }

  return {
    href: `/academics/${semesterId}/${subject.id}/${getModuleRouteSegment(target.module)}`,
    label,
  };
}

function buildModuleTarget(
  semesterId: string,
  subjectId: string,
  subjectModule: Module,
  label = "Continue Module",
): ContinueLearningTarget {
  return {
    href: `/academics/${semesterId}/${subjectId}/${getModuleRouteSegment(subjectModule)}`,
    label,
  };
}

function getSubjectLastStudied(subjectId: string, semesterId: string): string {
  const task = getStudyTasks(semesterId).find((item) => item.subjectId === subjectId);

  return task?.lastStudiedAt ?? "Not started";
}

function getSemesterView(semesterId: string): SemesterView | null {
  const semester = getSemester(semesterId);

  if (!semester) {
    return null;
  }

  return {
    semester,
    status: getSemesterStatus(semester),
    subjects: semester.subjects.map((subject) => ({
      id: subject.id,
      name: subject.name,
      progress: calculateSubjectProgress(subject.id, semester.id),
      modulesCompleted: getCompletedModuleCount(subject),
      totalModules: subject.modules.length,
      continueLearning: buildContinueLearningTarget(semester.id, subject),
      lastStudied: getSubjectLastStudied(subject.id, semester.id),
    })),
  };
}

function getSubjectView(semesterId: string, subjectId: string): SubjectView | null {
  const semester = getSemester(semesterId);
  const subject = getSubject(subjectId, semesterId);

  if (!semester || !subject) {
    return null;
  }

  return {
    semester,
    subject,
    progress: calculateSubjectProgress(subject.id, semester.id),
    modules: subject.modules.map<ModuleSummary>((subjectModule) => ({
      id: subjectModule.id,
      title: subjectModule.title,
      progress: calculateModuleProgress(subject.id, subjectModule.id, semester.id),
      continueLearning: buildModuleTarget(semester.id, subject.id, subjectModule),
      topics: subjectModule.topics,
    })),
  };
}

function calculateEstimatedRemainingStudyTime(module: Module): number {
  return module.topics.reduce((total, topic) => {
    if (isCompletedStatus(topic.status)) {
      return total;
    }

    const topicEstimate = topic.estimatedStudyTimeMinutes ?? 0;
    const subtopicEstimate = topic.subtopics.reduce(
      (subtopicTotal, subtopic) =>
        subtopicTotal + (isCompletedStatus(subtopic.status) ? 0 : subtopic.estimatedStudyTimeMinutes ?? 0),
      0,
    );

    return total + topicEstimate + subtopicEstimate;
  }, 0);
}

function getModuleWorkspaceView(
  semesterId: string,
  subjectId: string,
  moduleId: string,
): ModuleWorkspaceView | null {
  const semester = getSemester(semesterId);
  const subject = getSubject(subjectId, semesterId);
  const subjectModule = getModule(subjectId, moduleId, semesterId);

  if (!semester || !subject || !subjectModule) {
    return null;
  }

  const moduleProgress = calculateModuleProgress(subject.id, subjectModule.id, semester.id);
  const subjectProgress = calculateSubjectProgress(subject.id, semester.id);
  const semesterProgress = calculateSemesterProgress(semester.id);

  return {
    semester,
    subject,
    module: subjectModule,
    moduleProgress,
    subjectProgress,
    semesterProgress,
    statistics: {
      topicsCompleted: moduleProgress.completedTopics,
      topicsRemaining: moduleProgress.totalTopics - moduleProgress.completedTopics,
      moduleCompletion: moduleProgress.percentage,
      subjectCompletion: subjectProgress.percentage,
      semesterCompletion: semesterProgress.percentage,
      estimatedRemainingStudyTimeMinutes: calculateEstimatedRemainingStudyTime(subjectModule),
    },
  };
}

function resolveContinueLearning(
  continueLearning: ContinueLearning | null,
  semesterId = academicData.currentSemesterId,
): DashboardData["continueLearning"] {
  if (!continueLearning) {
    return {
      subject: "No subject selected",
      module: "No module selected",
      topic: "No topic selected",
    };
  }

  const subject = getSubject(continueLearning.subjectId, semesterId);
  const learningModule = subject?.modules.find((item) => item.id === continueLearning.moduleId);
  const topic = learningModule?.topics.find((item) => item.id === continueLearning.topicId);

  return {
    subject: subject?.name ?? "Unknown subject",
    module: learningModule?.title ?? "Unknown module",
    topic: topic?.title ?? "Unknown topic",
  };
}

function getDashboardData(semesterId = academicData.currentSemesterId): DashboardData {
  const semester = getSemester(semesterId) ?? getCurrentSemester();
  const mission = getStudyTasks(semester.id);
  const continueLearning = academicData.dashboard.continueLearning[semester.id] ?? null;

  return {
    profile: {
      name: academicData.dashboard.profileName,
      semester: semester.title,
    },
    mission,
    continueLearning: resolveContinueLearning(continueLearning, semester.id),
    semesterProgress: calculateSemesterProgress(semester.id),
    quickActions,
  };
}

export const academicService = {
  getAllSemesters,
  getSemester,
  getSemesterSummaries,
  getSemesterStatus,
  getCurrentSemester,
  getSubjects,
  getSubject,
  getModules,
  getModule,
  getModuleRouteSegment,
  getTopic,
  getSubtopics,
  getResources,
  getSemesterView,
  getSubjectView,
  getModuleWorkspaceView,
  getDashboardData,
  calculateSemesterProgress,
  calculateSubjectProgress,
  calculateModuleProgress,
};
