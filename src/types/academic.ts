export type LearningStatus = "not-started" | "in-progress" | "completed" | "revised" | "mastered";

export type CompletionStatus = LearningStatus;

export type ConfidenceLevel = 1 | 2 | 3 | 4 | 5;

export type Priority = "low" | "medium" | "high" | "exam-critical";

export type Difficulty = "easy" | "medium" | "hard";

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
  revisionCount?: number;
  lastRevisionDate?: string;
  nextSuggestedRevision?: string;
};

export type Subtopic = {
  id: string;
  title: string;
  status: CompletionStatus;
  confidence?: ConfidenceLevel;
  difficulty?: Difficulty;
  priority?: Priority;
  estimatedStudyTimeMinutes?: number;
  resources: Resource[];
};

export type Topic = {
  id: string;
  title: string;
  status: CompletionStatus;
  confidence?: ConfidenceLevel;
  difficulty?: Difficulty;
  priority?: Priority;
  estimatedStudyTimeMinutes?: number;
  subtopics: Subtopic[];
};

export type Module = {
  id: string;
  title: string;
  description?: string;
  estimatedStudyTimeMinutes?: number;
  difficulty?: Difficulty;
  marksWeightage?: string;
  priority?: Priority;
  practice?: PracticeItem[];
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

export type PracticeItem = {
  id: string;
  title: string;
  type: "practice-question" | "previous-year-question" | "coding-practice";
  status: CompletionStatus;
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
    href?: string;
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

export type LearningNote = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

export type LearningRevisionState = {
  markedForRevision: boolean;
  revisionCount: number;
  lastRevisionDate: string | null;
  nextSuggestedRevision: string | null;
};

export type LearningItemState = {
  status?: LearningStatus;
  confidence?: ConfidenceLevel;
  bookmarked?: boolean;
  revision?: LearningRevisionState;
};

export type LearningWorkspaceState = {
  topics: Record<string, LearningItemState>;
  subtopics: Record<string, LearningItemState>;
  practice: Record<string, LearningItemState>;
  notes: LearningNote[];
};

export type LastVisitedLearningLocation = {
  semesterId: string;
  subjectId: string;
  moduleId: string;
  topicId?: string;
  subtopicId?: string;
  updatedAt: string;
};

export type LearningStatistics = {
  topicsCompleted: number;
  topicsRemaining: number;
  moduleCompletion: number;
  subjectCompletion: number;
  semesterCompletion: number;
  estimatedRemainingStudyTimeMinutes: number;
};

export type ModuleWorkspaceView = {
  semester: Semester;
  subject: Subject;
  module: Module;
  breadcrumbs: ContinueLearningTarget[];
  moduleNavigation: {
    modules: ContinueLearningTarget[];
    previous: ContinueLearningTarget | null;
    next: ContinueLearningTarget | null;
  };
  moduleProgress: Progress;
  subjectProgress: Progress;
  semesterProgress: Progress;
  statistics: LearningStatistics;
};
