export type CompletionStatus = "not-started" | "in-progress" | "completed";

export type Resource = {
  id: string;
  title: string;
  type: "textbook" | "lecture" | "documentation" | "practice" | "reference";
  href?: string;
  notes: Note[];
};

export type Note = {
  id: string;
  title: string;
  summary?: string;
  revision: Revision[];
};

export type Revision = {
  id: string;
  title: string;
  status: CompletionStatus;
};

export type Subtopic = {
  id: string;
  title: string;
  status: CompletionStatus;
  resources: Resource[];
};

export type Topic = {
  id: string;
  title: string;
  status: CompletionStatus;
  subtopics: Subtopic[];
};

export type Module = {
  id: string;
  title: string;
  description?: string;
  topics: Topic[];
};

export type Subject = {
  id: string;
  name: string;
  code?: string;
  semesterId: string;
  modules: Module[];
};

export type Semester = {
  id: string;
  number: number;
  title: string;
  academicYear?: string;
  subjects: Subject[];
};

export type StudyTask = {
  id: string;
  title: string;
  subjectId: string;
  moduleId?: string;
  topicId?: string;
  status: CompletionStatus;
  lastStudiedAt?: string;
};

export type ContinueLearning = {
  subjectId: string;
  moduleId: string;
  topicId: string;
};

export type Progress = {
  completedTopics: number;
  totalTopics: number;
  percentage: number;
};

export type QuickAction = {
  label: string;
  href: string;
};

export type DashboardData = {
  profile: {
    name: string;
    semester: string;
  };
  mission: StudyTask[];
  continueLearning: {
    subject: string;
    module: string;
    topic: string;
  };
  semesterProgress: Progress;
  quickActions: QuickAction[];
};

export type SemesterStatus = "completed" | "current" | "locked";

export type SemesterSummary = {
  id: string;
  title: string;
  number: number;
  status: SemesterStatus;
  progress: Progress;
};

export type SubjectSummary = {
  id: string;
  name: string;
  progress: Progress;
  modulesCompleted: number;
  totalModules: number;
  continueLearning: ContinueLearningTarget | null;
  lastStudied: string;
};

export type ContinueLearningTarget = {
  href: string;
  label: string;
};

export type ModuleSummary = {
  id: string;
  title: string;
  progress: Progress;
  continueLearning: ContinueLearningTarget | null;
  topics: Topic[];
};

export type SemesterView = {
  semester: Semester;
  status: SemesterStatus;
  subjects: SubjectSummary[];
};

export type SubjectView = {
  semester: Semester;
  subject: Subject;
  progress: Progress;
  modules: ModuleSummary[];
};
